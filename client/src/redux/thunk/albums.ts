import axios from "axios";
import { AppDispatch } from "../store";
import { albumsActions } from "../slices/albums";

export function getAlbumsData() {
  const url = "http://localhost:8000/products";
  return async (dispatch: AppDispatch) => {
    try {
      await axios
        .get(url)
        .then((res) => {
          dispatch(albumsActions.displayAlbums(res.data.product))
          dispatch(albumsActions.isLoading())
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAlbumDetails(productId: string) {
  const url = `http://localhost:8000/products/${productId}`;
  return async (dispatch: AppDispatch) => {
    try {
      await axios
        .get(url)
        .then((res) =>
          dispatch(albumsActions.displayAlbumDetail(res.data.foundProduct))
        )
    } catch (error) {
      console.log(error);
    }
  };
}
