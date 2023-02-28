import {
  Button,
  HStack,
  VStack,
  Text,
  Divider,
  Image,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { usePostFinishOrder, useToggleHelp } from "@src/services";
import { useOrder } from "@src/stores";
import { convertManuItemMapToArray, formatCurrency } from "@src/utils";
import { isEmpty } from "lodash-es";
import React from "react";

export function Cart() {
  const { order, updateOrderItems } = useOrder();

  const { finishOrder } = usePostFinishOrder();
  const onFinishOrder = () => {
    const transformdData = {
      ...order,
      items: convertManuItemMapToArray(order.items),
      orderStatus: order.status,
      tableId: order.table.id,
    };

    const { status, table, ...theActualPayload } = transformdData;
    finishOrder(theActualPayload);
  };

  const { isToggling, isHelpNeeded, toggleHelp } = useToggleHelp();
  const onHelpNeeded = () => toggleHelp(order.table.id.toString());

  return (
    <VStack
      flex={1}
      alignItems="stretch"
      borderRadius="8px"
      padding="16px"
      background="#FFFFFF"
    >
      <Text fontWeight="semibold">Order Details</Text>
      <Text>{`Table: ${order.table.label}`}</Text>

      <Divider padding="5px 0" />

      {isEmpty([...order.items.keys()]) ? (
        <Text color="grey">{`There's nothing here yet`}</Text>
      ) : (
        [...order.items.keys()].map((item) => (
          <CartItem
            key={item.id}
            item={item}
            quantity={order.items.get(item) ?? 0}
            updateOrderItems={updateOrderItems}
          />
        ))
      )}
      <Text textAlign="right">{`${order.itemCount} items`}</Text>

      <Divider padding="5px 0" />

      <HStack justifyContent="space-between" margin="20px 0">
        <Text fontWeight="bold">Total:</Text>
        <Text fontWeight="bold">{formatCurrency(order.totalCost)}</Text>
      </HStack>

      <HStack justifyContent="space-between" alignItems="center">
        <Button flex={1} colorScheme="teal" size="sm" onClick={onFinishOrder}>
          Finish Order
        </Button>

        <Button
          flex={1}
          isLoading={isToggling}
          colorScheme="teal"
          size="sm"
          onClick={onHelpNeeded}
        >
          {isHelpNeeded ? "Cancel Help" : "Need Help"}
        </Button>
      </HStack>
    </VStack>
  );
}

type CartItemProps = {
  item: MenuItem;
  quantity: number;
  updateOrderItems: (item: MenuItem, method: 1 | -1) => void;
};
function CartItem({ item, quantity, updateOrderItems }: CartItemProps) {
  const onAddItem = () => {
    updateOrderItems(item, 1);
  };

  const onRemoveItem = () => {
    updateOrderItems(item, -1);
  };

  return (
    <HStack margin="10px 0" justifyContent="space-between" alignItems="center">
      <HStack>
        <Image src={item.img} alt={item.name} width="50px" />
        <Text
          flex={1}
          fontSize={12}
          noOfLines={2}
          marginLeft={10}
          fontWeight="bold"
        >
          {item.name}
        </Text>
      </HStack>

      <HStack>
        <NumberInput
          isReadOnly
          value={quantity}
          margin="0 10px"
          width="60px"
          size="xs"
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper onClick={onAddItem} />
            <NumberDecrementStepper onClick={onRemoveItem} />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
    </HStack>
  );
}
