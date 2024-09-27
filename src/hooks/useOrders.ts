import {fetchGetOrderList, OrderList} from "~/api";
import {useEffect, useRef, useState} from "react";
import {useBroadcast} from "~/hooks/useBroadcast";

export default function useOrders() {
  const [orderList, setOrderList] = useState<OrderList[]>([])

  const {pushPlay, play} = useBroadcast()
  const pushBroadStack = useRef<Function>()
  const startBroadcast = useRef<Function>()
  const query = {
    count: 20,
  }

  const timerRef = useRef<NodeJS.Timer | null>(null)

  useEffect(() => {
    pushBroadStack.current = pushPlay
    startBroadcast.current = play
    // getOrderList();
    poll()

    return () => {
      clearTimer()
    }
  }, []);

  async function poll() {
    clearTimer()
    timerRef.current = setInterval(async () => {
      await getOrderList()
    }, 1000)
  }

  async function getOrderList() {
    const res = await fetchGetOrderList(query.count).catch(err => {
      throw new Error(err)
    })

    // const res: OrderList[] = [
    //   {order_id:1002, name:"面条", status: 2, soup_name: '红汤', time_left:60, time_expected:100, rms_order_item_code: 91, timeout: true, sideboard: 1},
    //   {order_id:1000, name:"面条", status: 2, soup_name: '红汤', time_left:60, time_expected:100, rms_order_item_code: 123, sideboard: 4},
    //   {order_id:1003, name:"面条", status: 2, soup_name: '红汤', time_left:60, time_expected:100, rms_order_item_code: 1, sideboard: 1},
    //   {order_id:1003, name:"面条", status: 1, soup_name: '红汤', time_left:60, time_expected:100, rms_order_item_code: 858},
    //   {order_id:1003, name:"面条", status: 1, soup_name: '红汤', time_left:60, time_expected:100, rms_order_item_code: 12},
    //   {order_id:1003, name:"面条", status: 1, soup_name: '红汤', time_left:60, time_expected:100, rms_order_item_code: 1000},
    // ]

    if (Array.isArray(res)) {
      const newList = res.map(item => ({
        ...item,
        renderCode: item.rms_order_item_code.toString().padStart(3, '0')
      }))

      for (let order of newList) {
        if (order?.status === 2) {
          pushBroadStack.current && (pushBroadStack.current as Function)(order.rms_order_item_code)
        }
      }

      setOrderList(newList)
    }
    startBroadcast.current && (startBroadcast.current as Function)()
  }

  function clearTimer() {
    if (timerRef.current) {
      // @ts-ignore
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  return {
    orderList,
  }
}
