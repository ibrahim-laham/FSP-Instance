import axios from "axios";
import { AppDispatch } from "../store";
import { ordersActions } from "../slices/orders";

import { Album, Order } from "../../types/type";

export function createOrder(userId: string, cartList: Album[]) {
  const url = `http://localhost:8000/orders/${userId}`;
  const token = localStorage.getItem("Access_token");
  return async (dispatch: AppDispatch) => {
    await axios
      .post(url, cartList, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };
}

export function getUserOrders(userId: string) {
  const url = `http://localhost:8000/orders/${userId}`;

  return async (dispatch: AppDispatch) => {
    const token = localStorage.getItem("Access_token");
    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return dispatch(ordersActions.getOrderList(res.data));
      })
      .catch((error) => console.log(error));
  };
}
