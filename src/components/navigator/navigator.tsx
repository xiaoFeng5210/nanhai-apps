"use client";
import * as React from 'react';
import {Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider} from '@chakra-ui/react'
import Link from "next/link";

type Props = {

};
const NavigatorComp = (props: Props) => {
  return (
      <div className="navigator_global p-2 flex justify-center">
        <Tabs variant='soft-rounded' colorScheme='green'>
          <TabList>
            <Link href="/home/order"><Tab>点 单</Tab></Link>
            <Link href="/home/scheduling"><Tab>调 度</Tab></Link>
            <Tab>菜 品</Tab>
          </TabList>
        </Tabs>
      </div>

  );
};

export default NavigatorComp
