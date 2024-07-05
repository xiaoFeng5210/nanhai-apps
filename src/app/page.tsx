"use client";

import React from "react";
import ImageContainer from "~/components/ImageContainer/ImageContainer";
import PleasePickup from "~/components/please-pickup/PleasePickup";
import Doing from "~/components/doing/Doing";

export default function Home() {
  return (
    <div className="w-screen h-screen flex">
      <ImageContainer/>
      <div className="flex-[2] p-4 flex flex-col w-full">
        <PleasePickup/>
        {/*<hr className="hr-mid-circle"/>*/}
        {/*<hr className="hr-mid-square my-2"/>*/}
        {/*<hr className="hr-double-arrow"/>*/}
        <hr className="style-eight mb-4" />
        <Doing/>
      </div>
    </div>
  );
}
