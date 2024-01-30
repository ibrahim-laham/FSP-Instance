import axios from "axios";
import { AppDispatch } from "../store";
import { userActions } from "../slices/user";

export function getUserDetails(userId: string) {
  const url = `http://16.16.117.147/users/${userId}`;
  return async (dispatch: AppDispatch) => {
    try {
      const token = localStorage.getItem("Access_token");
      await axios
        .get(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => dispatch(userActions.storeUserData(res.data.user))
        )
    } catch (error) {
      localStorage.clear()
      console.log(error);
    }
  };
}
