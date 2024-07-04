'use client'

import React from "react";
import customTheme from "~/app/theme";
import NavigatorComp from "~/components/navigator/navigator";
import {ChakraProvider} from "@chakra-ui/react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={customTheme}>
      <div className="w-screen h-screen flex flex-col">
        <NavigatorComp />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </ChakraProvider>
  );
}
