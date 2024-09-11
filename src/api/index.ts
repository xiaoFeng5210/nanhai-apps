import { service } from '~/config/request';

// const url = new URL(window.location.href);
// export const prepositionUrl = import.meta.env.DEV ? "api/action" : "/action";
const prepositionUrl = process.env.NODE_ENV === 'development' ? 'api/action' : '/action';


export interface OrderList {
  name: string
  display_name?: string
  order_id: number,
  status: number, // 2是成功
  time_left: number
  time_expected: number
  soup_name: string
  rms_order_item_code: number
}
/**
 * 列表请求
 * @param count 数量
 * @param date 日期 0为当天 30 为 30天
 */
export const fetchGetOrderList = (count: number, date = 0): Promise<OrderList> => {
  return service.get(prepositionUrl + `/order_list?count=${count}&date=${date}`);
}
