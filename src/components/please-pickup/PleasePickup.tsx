import React from 'react';

const PleasePickup = () => {
  return (
    <div className="flex-[2] flex flex-col font-serif">
      <h1 className="text-8xl flex justify-center">请 取 餐</h1>
      <h2 className="text-4xl flex justify-center">READY</h2>

      <div className="flex-1 grid grid-cols-4 p-2">
        {
          [212, 3 ,432].map(item => {
            return (
              <div key={item} className="flex flex-col justify-center items-center w-full">
                <div className="w-[80%] h-24 bg-[#38A16A] text-white rounded-3xl font-sans font-bold text-[3rem] inline-flex justify-center items-center">{item}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default PleasePickup;
