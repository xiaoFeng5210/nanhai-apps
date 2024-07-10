"use client";

import React, {useMemo} from "react";
import ImageContainer from "~/components/ImageContainer/ImageContainer";
import PleasePickup from "~/components/please-pickup/PleasePickup";
import Doing from "~/components/doing/Doing";
import useOrders from "~/hooks/useOrders";

export default function Home() {
  const {orderList} = useOrders()
  const completeList = useMemo(() => {
    return orderList.filter(item =>  {
      if (item.status === 2) {
        return item
      }
    })
  }, [orderList])

  const preparingList = useMemo(() => {
    return orderList.filter(item => {
      if (item.status !== 2) {
        return item
      }
    })
  }, [orderList])
  return (
    <div className="w-screen h-screen flex">
      <ImageContainer/>
      <div className="flex-[2] p-4 flex flex-col w-full">
        <PleasePickup list={completeList} />
        {/*<hr className="hr-mid-circle"/>*/}
        {/*<hr className="hr-mid-square my-2"/>*/}
        {/*<hr className="hr-double-arrow"/>*/}
        <hr className="style-eight mb-4" />
        <Doing list={preparingList}/>
      </div>
    </div>
  );
}
