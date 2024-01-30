import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import ChangeInfoModal from "./ChangeInfoModal";
import BackdropComp from "./BackdropComp";

import { RootState } from "../../redux/store";
import { UserData } from "../../types/type";
import { userActions } from "../../redux/slices/user";
import { GoldButton } from "../../App";

export default function ChangeUserInfo() {
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleBackdropClose = () => {
    setOpenBackdrop(false);
  };
  const handleBackdropOpen = () => {
    setOpenBackdrop(true);
  };

  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userData);
  const { firstName, lastName, email, password, _id, __v } = userData;
  const [userInput, setUserInput] = useState<UserData>({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    _id: _id,
    __v: __v,
  });
  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, password: e.target.value });
  };

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, email: e.target.value });
  };
  const firstNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, firstName: e.target.value });
  };

  const submitChangeHandler = async () => {
    const endpoint = `16.16.117.147/users/${userData._id}`;
    const token = localStorage.getItem("Access_token");
    let check = true;
    Object.values(userInput).map((input) =>
      input === "" ? (check = false) : null
    );
    if (check) {
      handleBackdropOpen();
      return await axios
        .put(endpoint, userInput, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(userActions.storeUserData(res.data.user));
            handleBackdropClose();
            return handleModalOpen();
          }
        })
        .catch((error) => console.log(error));
    } else {
      return null;
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "30vh",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField required label="Username" onChange={firstNameChangeHandler} />
      <TextField required label="Email" onChange={emailChangeHandler} />
      <TextField
        required
        label="password"
        type="password"
        autoComplete="current-password"
        onChange={passwordChangeHandler}
      />
      <GoldButton
        onClick={submitChangeHandler}
        variant="contained"
        sx={{ backgroundColor: "goldRush.main" }}
      >
        Submit Change
      </GoldButton>
      <ChangeInfoModal open={openModal} handleClose={handleModalClose} />
      <BackdropComp open={openBackdrop} handleClose={handleBackdropClose} />
    </Box>
  );
}
