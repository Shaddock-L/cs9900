import React from "react";
import {
  GridItem,
  Image,
  VStack,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";

import { Icon } from "@src/components";
import { formatCurrency } from "@src/utils";

type MenuItemProps = {
  item: MenuItem;
  updateOrderItems: (item: MenuItem, method: 1 | -1) => void;
};
export function MenuItem({ item, updateOrderItems }: MenuItemProps) {
  const onAddItem = () => {
    updateOrderItems(item, 1);
  };

  const onRemoveItem = () => {
    updateOrderItems(item, -1);
  };

  return (
    <GridItem
      overflow="hidden"
      boxShadow="0 0 10px rgba(0,0,0,0.3)"
      borderRadius="8px"
    >
      <Image src={item.img} alt={item.name} />

      <VStack padding="8px" alignItems="stretch">
        <VStack alignItems="flex-start" spacing="0">
          <Text fontWeight="semibold">{item.name}</Text>

          <HStack>
            {item.recommended && <Icon variant="like" />}

            <Text color="red" fontWeight="bold">
              {formatCurrency(item.price)}
            </Text>
          </HStack>
        </VStack>

        <HStack>
          <Button onClick={onAddItem} size="xs">
            +
          </Button>
          <Button onClick={onRemoveItem} size="xs">
            -
          </Button>
        </HStack>

        <Text>{item.ingredients}</Text>
      </VStack>
    </GridItem>
  );
}
