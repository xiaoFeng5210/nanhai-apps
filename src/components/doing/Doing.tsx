import React, {FC} from 'react';
import {OrderList} from "~/api";


const Doing: FC<{list: OrderList[]}> = ({list}) => {
  const titleStyle = 'bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 \n' +
    '               border-none rounded-full text-white py-4 px-8 \n' +
    '               text-center no-underline inline-block font-bold \n' +
    '               cursor-pointer shadow-lg shadow-red-800/30 \n' +
    '               transition-all duration-300 ease-in-out'
  return (
    <div className="flex-[1] flex flex-col font-serif">
      <div className="flex justify-center w-full">
        <h1 className={`text-6xl flex justify-center w-[80%] text-[#4b4d50] ${titleStyle}`}>准 备 中 Preparing</h1>
      </div>

      <div className="flex-1 grid grid-cols-2 grid-rows-6">
        {
          list.map(item => {
              return (
                <div key={item.rms_order_item_code} className="flex flex-col justify-center items-center w-full">
                  <div
                    className=" w-[100%] h-24 rounded-3xl font-sans font-bold text-[3rem] inline-flex justify-evenly items-center text-white">
                    {/*<span>{item?.rms_order_item_code}号</span>*/}
                    <span>{item?.renderCode}号</span>

                    <div className="text-[3rem] inline-flex items-center">
                      {/*<img src="/images/wait_eat2.svg" className="h-[3rem]" alt=""/>*/}
                      <span>{item.time_left}s</span>
                    </div>
                  </div>
                </div>
              )
          })
        }
        </div>
      </div>
      );
      };

      export default Doing;
