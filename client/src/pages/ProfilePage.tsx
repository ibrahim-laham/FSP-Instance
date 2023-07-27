import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import UserInfo from "../components/Profile/UserInfo";
import UserOrders from "../components/Profile/UserOrders";
import UserAvatar from "../components/Profile/UserAvatar";

import { AppDispatch, RootState } from "../redux/store";
import { getUserDetails } from "../redux/thunk/userDetails";
import { getUserOrders } from "../redux/thunk/order";




export default function ProfilePage() {
  const token = localStorage.getItem("Access_token");
  const userData = useSelector((state: RootState) => state.user.userData);
  const userOrders = useSelector((state: RootState) => state.orders.orders);

  
  const appDispatch = useDispatch<AppDispatch>();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    appDispatch(getUserDetails(userId as string));
    appDispatch(getUserOrders(userId as string));
  }, [appDispatch, userId]);

  

  if (token) {
    return (
      <Paper
        sx={{
          minHeight: "93vh",
          display: "flex",
          flexDirection: "column",
          padding: "5%",
          alignItems: "center",
        }}
      >
        <Grid
          container
          justifyContent="space-evenly"
          alignItems="flex-start"
          spacing={20}
        >
          <Grid item md={1}>
            <UserAvatar/>
          </Grid>
          <Grid item md={5}>
            <UserInfo userData={userData} />
          </Grid>
          <Grid item md={4}>
            <UserOrders userOrders={userOrders} />
          </Grid>
        </Grid>
      </Paper>
    );
  } else {
    return <div>please login or create a new account</div>;
  }
}
