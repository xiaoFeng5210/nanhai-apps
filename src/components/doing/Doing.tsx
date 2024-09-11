import React, {FC} from 'react';
import {OrderList} from "~/api";


const Doing: FC<{list: OrderList[]}> = ({list}) => {
  return (
    <div className="flex-[3] flex flex-col font-serif">
      <h1 className="text-8xl flex justify-center">制 作 中</h1>
      <h2 className="text-4xl flex justify-center">PREPARING</h2>

      <div className="flex-1 grid grid-cols-4 grid-rows-3">
        {
          list.map(item => {
            return (
              <div key={item.rms_order_item_code} className="flex flex-col justify-center items-center w-full">
                <div className="w-[80%] h-24 rounded-3xl font-sans font-bold text-[3rem] inline-flex justify-center items-center bg-[#3183CE] text-white">{item?.rms_order_item_code}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Doing;
