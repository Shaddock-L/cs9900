import { useToast } from "@chakra-ui/react";
import { ApiEndpionts } from "@src/configs";
import { useOrder } from "@src/stores";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";

type useGetTableResponse = {
  tableList: Table[];
};
export function useGetTable() {
  const { isFetching: isFetchingTable, data: tables } = useQuery<
    AxiosResponse<useGetTableResponse>,
    AxiosError,
    Table[]
  >(
    ["GetTable"],
    async () => {
      return await axios.get(ApiEndpionts.GetTable);
    },
    {
      select: (data) => data.data.tableList,
      refetchInterval: 1000,
    }
  );

  return { isFetchingTable, tables };
}

type PostFinishOrderRequestPayload = {
  orderStatus: OrderStatus;
  tableId: number;
  items: object;
  totalCost: number;
  itemCount: number;
};
export function usePostFinishOrder() {
  const toast = useToast();
  const { finishOrder } = useOrder();
  const router = useRouter();

  const { isLoading, mutate } = useMutation(
    async (payload: PostFinishOrderRequestPayload) => {
      return await axios.post(ApiEndpionts.FinishOrder, payload);
    },
    {
      onSuccess: () => {
        finishOrder();
        toast({ status: "success", title: "Order finished" });
        router.push("/customer");
      },
      onError: () => {
        toast({ status: "error", title: "Error finishing order" });
      },
    }
  );

  return { isLoading, finishOrder: mutate };
}

export function useToggleHelp() {
  const toast = useToast();

  const {
    isLoading: isToggling,
    data,
    mutate: toggleHelp,
  } = useMutation<AxiosResponse<Table>, AxiosError, string>(
    async (tableId: string) =>
      await axios.post(ApiEndpionts.ToggleHelp.replace("{tableId}", tableId)),
    {
      onSuccess: (data) => {
        console.log(data.data.message)
		const title = data.data.message === 'need'
          ? "Help on the way"
          : "Okay, help no longer required";

        toast({ status: "success", title });
      },
      onError: (error) => {
        toast({ status: "error", title: error.message });
      },
    }
  );

  return { isToggling, isHelpNeeded: data?.data.helpNeeded, toggleHelp };
}

export function useServeOrder() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { isLoading: isServing, mutate: serveOrder } = useMutation(
    async (tableId: string) => {
      return await axios.post(
        ApiEndpionts.ServeOrder.replace("{tableId}", tableId)
      );
    },
    {
      onSuccess: () => {
        toast({ status: "success", title: "Order served" });
        queryClient.invalidateQueries(["GetTable"]);
      },
      onError: () => {
        toast({ status: "error", title: "Error serving order" });
      },
    }
  );

  return { isServing, serveOrder };
}

export function useCheckout() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { isLoading: isCheckingOut, mutate: checkout } = useMutation(
    async (tableId: string) => {
      return await axios.post(
        ApiEndpionts.Checkout.replace("{tableId}", tableId)
      );
    },
    {
      onSuccess: () => {
        toast({ status: "success", title: "Order Checked Out" });
        queryClient.invalidateQueries(["GetTable"]);
      },
      onError: () => {
        toast({ status: "error", title: "Error checking out order" });
      },
    }
  );

  return { isCheckingOut, checkout };
}
