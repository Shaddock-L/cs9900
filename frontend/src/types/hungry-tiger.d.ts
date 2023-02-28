type Category =
  | "all"
  | "pizzas"
  | "sides"
  | "chicken"
  | "drinks-and-shakes"
  | "desserts";

type CategoryItem = {
  id: Category;
  label: string;
};

type MenuItem = {
  id: number;
  name: string;
  ingredients: string;
  recommended: boolean;
  img: string;
  price: number;
  category: Category;
};

type Role = "waiter" | "chef" | "manager";

type Table = {
  id: number;
  label: string;
  helpNeeded: boolean;
  available: boolean;
  order?: {
    orderStatus: OrderStatus;
    items: Array<MenuItem>;
    tableId: number;
    totalCost: number;
  };
};

type OrderStatus = "CREATED" | "ORDERED" | "SERVED" | "PAID";
type Order = {
  status: OrderStatus;
  table: { id: number; label: string };
  items: Map<MenuItem, number>;
  itemCount: number;
  totalCost: number;
};
