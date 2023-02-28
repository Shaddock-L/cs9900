export enum ApiEndpionts {
  GetTable = "http://localhost:8080/table",
  FinishOrder = "http://localhost:8080/table/order",
  ToggleHelp = "http://localhost:8080/table/{tableId}/help",
  ServeOrder = "http://localhost:8080/table/{tableId}/served",
  Checkout = "http://localhost:8080/table/{tableId}/checkout",
  GetMenu = "http://localhost:8080/menu",
  UpdateMenuItem = "http://localhost:8080/menu/modify",
  DeleteMenuItem = "http://localhost:8080/menu/delete",
}
