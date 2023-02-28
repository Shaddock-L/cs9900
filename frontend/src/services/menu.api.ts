import { useToast } from "@chakra-ui/react";
import { ApiEndpionts } from "@src/configs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { debounce } from "lodash-es";
import { useState } from "react";

export function useCategory() {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<Category>("all");

  const updateCategory = (_category: Category) => {
    if (_category !== category) {
      setCategory(_category);
      queryClient.invalidateQueries(["GetMenu", _category]);
    }
  };

  const { isFetching: isFetchingCategories, data: categories } = useQuery(
    ["GetCategory"],
    async () => await axios.get("/api/category"),
    {
      select: (data) => data.data,
    }
  );

  return {
    category,
    updateCategory,
    isFetchingCategories,
    categories,
  };
}

type useMenuProps = {
  category?: string;
};
export function useMenu({ category }: useMenuProps) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const searchMenu = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    queryClient.invalidateQueries(["GetMenu", category, search]);
  }, 500);

  const { isFetching: isFetchingMenu, data: menu } = useQuery<
    AxiosResponse<Array<MenuItem>>,
    AxiosError,
    Array<MenuItem>
  >(
    ["GetMenu", category, search],
    async () =>
      await axios.get(
        `/api/menu?${category && `category=${category}`}${
          search && `&search=${search}`
        }`
      ),
    {
      select: (data) => data.data,
    }
  );

  return { isFetchingMenu, menu, searchMenu };
}

export function useUpdateMenuItem() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateMenuItem } = useMutation(
    async (data: MenuItem) =>
      await axios.put(ApiEndpionts.UpdateMenuItem, {...data,price:parseInt(data.price,10)}),
    {
      onSuccess: () => {
        toast({ status: "success", title: "Item updated" });
        queryClient.invalidateQueries(["GetMenu"]);
      },
      onError: () => {
        toast({ status: "error", title: "Failed to update item" });
      },
    }
  );

  return { isUpdating, updateMenuItem };
}

export function useDeleteMenuItem() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteMenuItem } = useMutation(
    async (id: number) =>
      await axios.delete(`${ApiEndpionts.DeleteMenuItem}/${id}`),
    {
      onSuccess: () => {
        toast({ status: "success", title: "Item deleted" });
        queryClient.invalidateQueries(["GetMenu"]);
      },
      onError: () => {
        toast({ status: "error", title: "Failed to delete item" });
      },
    }
  );

  return { isDeleting, deleteMenuItem };
}
