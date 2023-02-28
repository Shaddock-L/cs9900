import React from "react";
import { useCategory, useMenu } from "@src/services";

import { HStack, VStack } from "@chakra-ui/react";
import { Category } from "./Category/Category";
import { Menu } from "./Menu/Menu";
import { Cart } from "./Cart/Cart";

export function CustomerPanel() {
  const { category, updateCategory, categories } = useCategory();
  const { menu, searchMenu } = useMenu({ category });

  if (!categories) return <></>;

  return (
    <HStack
      justifyContent="space-between"
      alignItems="flex-start"
      spacing="16px"
      paddingY="16px"
      maxW="1200px"
    >
      <VStack flex={2} alignItems="stretch" spacing="16px">
        <Category categories={categories} onSelectCategory={updateCategory} />

        <Menu menu={menu} onSearch={searchMenu} />
      </VStack>

      <Cart />
    </HStack>
  );
}
