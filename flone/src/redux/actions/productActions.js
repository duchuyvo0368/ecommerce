import {getDetailProductById, getProductNewService} from "../../services/services";


export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});


const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});
const fetchDetailProductSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});


const fetchProductDetailFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});
// fetch products
export const fetchProducts = (limit) => {
  return async (dispatch) => {
    try {
      const response = await getProductNewService(limit);
     // alert(response.data)
      dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};
export const fetchDetailProductById = (id) => {
  return async (dispatch) => {
    try {
      const response = await getDetailProductById(id);
      dispatch(fetchDetailProductSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductDetailFailure(error.message));
    }
  };
};

