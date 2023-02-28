import React from "react";

import { VStack } from "@chakra-ui/react";
import { NavBar } from "@src/components";
import Head from "next/head";

type ContainerProps = {
  pageTitle: string;
  children: React.ReactNode;
};
export function Container({ pageTitle, children }: ContainerProps) {
  return (
    <>
      <Head>
        <title>{`${pageTitle} | HungryTiger`}</title>
      </Head>
      <VStack alignItems="stretchh" minH="100vh" bg="gray.50">
        <VStack spacing="0">
          <NavBar />

          <VStack alignItems="stretch" width="clamp(62.5vw, 1200px, 90vw)">
            {children}
          </VStack>
        </VStack>
      </VStack>
    </>
  );
}
