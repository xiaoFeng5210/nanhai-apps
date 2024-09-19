import React, {FC, useEffect} from 'react';
import {OrderList} from "~/api";

const PleasePickup: FC<{list: OrderList[]}> = ({list}) => {
  const titleStyle = 'bg-gradient-to-b from-red-500 via-red-600 to-red-800  \n' +
    '               border-none rounded-full text-white py-4 px-8 \n' +
    '               text-center no-underline inline-block font-bold \n' +
    '               cursor-pointer shadow-lg shadow-red-800/30 \n' +
    '               transition-all duration-300 ease-in-out'

  useEffect(() => {
    console.log('list:', list)
  }, [list])

  return (
    <div className="flex-[1] flex flex-col font-serif">
      <div className="flex justify-center w-full">
        <h1 className={`text-6xl flex justify-center w-[80%] ${titleStyle}`}>请 取 餐 Ready</h1>
      </div>

      <div className="flex-1 grid grid-cols-1 grid-rows-4 p-2">
        {
          list?.map(item => {
            return (
              <div key={item.rms_order_item_code} className="flex flex-col justify-center items-center w-full">
                <div className="w-[80%] h-auto text-white rounded-3xl font-sans font-bold text-[5rem] inline-flex justify-center items-center">{item?.rms_order_item_code}号</div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default PleasePickup;
