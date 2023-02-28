import create from "zustand";
import { combine, devtools } from "zustand/middleware";
import { StoreActions } from "@src/stores";
import { updateElementInMap } from "@src/utils";
import { reduce } from "lodash-es";

export type OrderStoreState = {
  order: Order;
};

export type OrderStoreAction = {
  startOrder: (table: { id: number; label: string }) => void;
  updateOrderItems: (item: MenuItem, method?: 1 | -1) => void;
  finishOrder: () => void;
};

export enum OrderStore {
  Name = "OrderStore",
  StartOrder = "StartOrder",
  UpdateOrderItems = "UpdateOrderItems",
  FinishOrder = "FinishOrder",
  ToggleHelp = "ToggleHelp",
}

const name = OrderStore.Name;
const initialState: OrderStoreState = {
  order: {
    status: "CREATED",
    table: { id: -1, label: "undefined" },
    items: new Map<MenuItem, number>(),
    itemCount: 0,
    totalCost: 0,
  },
};
const actions: StoreActions<OrderStoreState, OrderStoreAction> = (set) => ({
  startOrder: (table) => {
    set(
      ({ order }) => ({ order: { ...order, table } }),
      false,
      OrderStore.StartOrder
    );
  },
  updateOrderItems: (item, method = 1) => {
    set(
      ({ order }) => {
        updateElementInMap(item, order.items, method);

        order.totalCost = reduce(
          [...order.items.keys()],
          (sum, item) => {
            return sum + item.price * order.items.get(item)!;
          },
          0
        );

        order.itemCount = reduce(
          [...order.items.values()],
          (sum, quantity) => sum + quantity,
          0
        );

        return { order };
      },
      false,
      OrderStore.UpdateOrderItems
    );
  },
  finishOrder: () => {
    set(
      () => ({
        order: { ...initialState.order, items: new Map<MenuItem, number>() },
      }),
      false,
      OrderStore.FinishOrder
    );
  },
});

const useStore = create(devtools(combine(initialState, actions), { name }));
export function useOrder() {
  return { ...useStore() };
}
