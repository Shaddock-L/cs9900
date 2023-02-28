import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  Tag,
  TagLabel,
  Image,
  Text,
  Table as CKTable,
  Tr,
  Td,
  Thead,
  Th,
  Tfoot,
  Button,
  TagCloseButton,
} from "@chakra-ui/react";
import { Icon } from "@src/components/display";
import { convertMenuItemArrayToMap } from "@src/utils";
import { useAuth } from "@src/stores";
import { useCheckout, useServeOrder, useToggleHelp } from "@src/services";

type TableProps = {
  tables: Table[];
};
export function Table({ tables }: TableProps) {
  const { role } = useAuth();

  const { toggleHelp } = useToggleHelp();
  const onHelpedTable = (tableId: string) => toggleHelp(tableId);

  const { isServing, serveOrder } = useServeOrder();
  const onServeOrder = (tableId: number) => {
    console.log("serving order for table", tableId);
    serveOrder(tableId.toString());
  };

  const { isCheckingOut, checkout } = useCheckout();
  const onCheckout = (tableId: number) => {
    console.log("Checking out order for table", tableId);
    checkout(tableId.toString());
  };

  return (
    <Accordion marginTop="16px" borderRadius="8px" padding="16px" bg="#FFFFFF">
      {tables.map((table) => (
        <AccordionItem key={table.id}>
          <AccordionButton justifyContent="space-between">
            <HStack spacing="8px">
              <Text>{table.label}</Text>

              {table.available && (
                <Tag borderRadius="full" colorScheme="green" gap="4px">
                  <TagLabel>Available</TagLabel>
                  <Icon variant="available" />
                </Tag>
              )}

              {table.helpNeeded && (
                <Tag borderRadius="full" colorScheme="yellow" gap="4px">
                  <TagLabel>Need Help</TagLabel>
                  <Icon variant="attention" />
                  <TagCloseButton
                    onClick={() => onHelpedTable(table.id.toString())}
                  />
                </Tag>
              )}

              {table.order && (
                <Tag borderRadius="full" colorScheme="yellow" gap="4px">
                  <TagLabel>{table.order.orderStatus}</TagLabel>
                  <Icon variant="attention" />
                </Tag>
              )}
            </HStack>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {table.order ? (
              <CKTable alignItems="stretch">
                <Thead>
                  <Th>Image</Th>
                  <Th>Name</Th>
                  <Th>Quantity</Th>
                </Thead>
                {[...convertMenuItemArrayToMap(table.order.items).values()].map(
                  ({ item, quantity }) => (
                    <Tr key={crypto.randomUUID()}>
                      <Td>
                        <Image src={item.img} alt={item.name} width="100px" />
                      </Td>
                      <Td>
                        <Text flex={1} fontSize={12} fontWeight="bold">
                          {item.name}
                        </Text>
                      </Td>
                      <Td>
                        <Text>{`x ${quantity}`}</Text>
                      </Td>
                    </Tr>
                  )
                )}
                <Tfoot>
                  <Tr>
                    <Td>
                      {role === "kitchen" &&
                        table.order.orderStatus === "CREATED" && (
                          <Button
                            isLoading={isServing}
                            onClick={() => onServeOrder(table.id)}
                          >
                            Serve Order
                          </Button>
                        )}

                      {role === "waiter" &&
                        table.order.orderStatus === "SERVED" && (
                          <Button
                            isLoading={isCheckingOut}
                            onClick={() => onCheckout(table.id)}
                          >
                            Checkout
                          </Button>
                        )}
                    </Td>
                    <Td></Td>
                    <Td>${table.order.totalCost.toFixed(2)}</Td>
                  </Tr>
                </Tfoot>
              </CKTable>
            ) : (
              <Text>No order information available</Text>
            )}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
