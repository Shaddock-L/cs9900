import React from "react";
import { DebouncedFunc, isEmpty } from "lodash-es";

import { VStack, Grid, Text } from "@chakra-ui/react";
import { MenuSearchBar } from "./Menu.SearchBar";
import { MenuItem } from "./Menu.Item";
import { useOrder } from "@src/stores";

type MenuProps = {
  menu: MenuItem[];
  onSearch: DebouncedFunc<(event: React.ChangeEvent<HTMLInputElement>) => void>;
};
export function Menu({ menu, onSearch }: MenuProps) {
  const { updateOrderItems } = useOrder();

  return (
    <VStack
      spacing="inherit"
      borderRadius="8px"
      padding="16px"
      background="#FFFFFF"
    >
      <MenuSearchBar onSearch={onSearch} />

      {isEmpty(menu) ? (
        <Text color="grey" textAlign="center">
          There is nothing here yet
        </Text>
      ) : (
        <Grid marginTop="30px" templateColumns="repeat(3, 1fr)" gap={5}>
          {menu.map((item) => {
            return (
              <MenuItem
                key={item.name}
                item={item}
                updateOrderItems={updateOrderItems}
              />
            );
          })}
        </Grid>
      )}
    </VStack>
  );
}
