import axios from "axios";
import { AppDispatch } from "../store";
import { albumsActions } from "../slices/albums";

export function getAlbumsData() {
  const url = "http://16.16.117.147/products";
  console.log(url, "productsList")
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
  const url = `http://16.16.117.147/products/${productId}`;
  console.log(url, "productDetail")
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
