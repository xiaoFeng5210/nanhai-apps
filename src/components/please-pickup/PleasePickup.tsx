import React, {FC} from 'react';
import {OrderList} from "~/api";

const PleasePickup: FC<{list: OrderList[]}> = ({list}) => {
  return (
    <div className="flex-[2] flex flex-col font-serif">
      <h1 className="text-8xl flex justify-center">请 取 餐</h1>
      <h2 className="text-4xl flex justify-center">READY</h2>

      <div className="flex-1 grid grid-cols-4 p-2">
        {
          list?.map(item => {
            return (
              <div key={item.order_id} className="flex flex-col justify-center items-center w-full">
                <div className="w-[80%] h-24 bg-[#38A16A] text-white rounded-3xl font-sans font-bold text-[3rem] inline-flex justify-center items-center">{item?.order_id}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default PleasePickup;
