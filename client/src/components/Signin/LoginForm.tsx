import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";


import Container from "@mui/material/Container";
import { Copyright } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { userActions } from "../../redux/slices/user";

type UserInput = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState<UserInput>({
    email: "",
    password: "",
  });

  const storeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, email: e.target.value });
  };

  const storePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, password: e.target.value });
  };

  function clearStorage() {
    localStorage.clear();
    window.location.reload();
  }

  const loginHandler = async () => {
    const endpoint = "http://localhost:8000/users/login";

    await axios
      .post(endpoint, userInput)
      .then((res) => {
        localStorage.setItem("Access_token", res.data.token);
        setTimeout(clearStorage, 3600000);
        localStorage.setItem("userId", res.data.userData._id);
        dispatch(userActions.storeUserData(res.data.userData));
        navigate("/profile");
      })
      .catch((error) => console.log(error));
    setUserInput({ email: "", password: "" });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={storeEmail}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={storePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={loginHandler}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="#">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
