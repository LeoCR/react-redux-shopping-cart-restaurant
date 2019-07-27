import {FETCH_PRODUCTS,FETCH_PRODUCT,FETCH_INGREDIENTS} from '../constants/productTypes';
import products from '../apis/api';
export const fetchProducts=()=>async dispatch=>{
    const response = await products.get('/api/getProducts');
    dispatch({
        type:FETCH_PRODUCTS,
        payload:response.data
    });
}
export const fetchProduct=(id)=>async dispatch=>{
    const response = await products.get(`/api/product/${id}`);
    dispatch({
        type:FETCH_PRODUCT,
        payload:response.data
    });
}
export const fetchIngredients=(id)=>async dispatch=>{
    const response = await products.get(`/api/product/ingredients/${id}`);
    dispatch({
        type:FETCH_INGREDIENTS,
        payload:response.data
    })
}