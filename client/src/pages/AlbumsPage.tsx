import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAlbumsData } from "../redux/thunk/albums";
import { RootState, AppDispatch } from "../redux/store";
import AlbumCard from "../components/Albums/AlbumCard";
import Paper from "@mui/material/Paper";
import Grid from "@mui/system/Unstable_Grid";
import AlbumsForm from "../components/AlbumsForm/AlbumsForm";
import Stack from "@mui/material/Stack";
import { BiSolidUpArrowAlt, BiSolidDownArrowAlt } from "react-icons/bi";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

import { albumsActions } from "../redux/slices/albums";

export default function AlbumsPage() {
  const [userInput, setUserInput] = useState<string>("");
  const loading = useSelector((state: RootState) => state.albums.loading);
  const albumsData = useSelector((state: RootState) => state.albums.albums);
  const ordering = useSelector((state: RootState) => state.albums.ordering);
  const dispatch = useDispatch();

  const appDispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    appDispatch(getAlbumsData());
  }, [appDispatch, userInput]);

  function ToggleOrder() {
    ordering === "asc"
      ? dispatch(albumsActions.sortOrder("desc"))
      : dispatch(albumsActions.sortOrder("asc"));
    dispatch(albumsActions.sortAlbums());
  }

  let skeletonArray: JSX.Element[] = [];
  for (let i = 0; i < 30; i++) {
    skeletonArray.push(
      <Grid xs={12} sm={6} md={3} lg={2} justifyContent="center" key={i}>
        <Stack spacing={1}>
        <Skeleton variant="rounded" width={"100%"} height={120} />
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" width={"100%"} sx={{ fontSize: "1rem" }} />
          <Skeleton variant="rectangular" width={"100%"} height={60} />
        </Stack>
      </Grid>
    );
  }
  console.log(loading, "load");

  if (!loading) {
    return (
      <Paper
        elevation={1}
        square
        sx={{
          padding: "2vh",
          minHeight: "90vh",
          backgroundImage:
            "linear-gradient( 179deg,  rgba(0,0,0,0.2) 75%, rgba(135, 7, 7,0.55) 103% )",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={5} sx={{ width: "100%" }}> {skeletonArray} </Grid>
      </Paper>
    );
  } else {
    return (
      <Paper
        elevation={1}
        square
        sx={{
          padding: "2vh",
          minHeight: "90vh",
          backgroundImage:
            "linear-gradient( 179deg,  rgba(0,0,0,0.2) 75%, rgba(135, 7, 7,0.55) 103% )",
        }}
      >
        <Stack justifyContent="center" alignItems="center" spacing="4">
          <Stack direction="row" sx={{ minWidth: "25%" }}>
            <AlbumsForm userInput={userInput} setUserInput={setUserInput} />
            <Button
              onClick={ToggleOrder}
              startIcon={
                ordering === "asc" ? (
                  <BiSolidUpArrowAlt />
                ) : (
                  <BiSolidDownArrowAlt />
                )
              }
            >
              <Typography>Sort </Typography>{" "}
            </Button>
          </Stack>

          <Grid container spacing={5} sx={{ width: "100%" }}>
            {albumsData?.map((album) => (
              <Grid
                xs={12}
                sm={6}
                md={3}
                lg={2}
                justifyContent="center"
                key={album._id}
              >
                <AlbumCard album={album} />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Paper>
    );
  }
}
