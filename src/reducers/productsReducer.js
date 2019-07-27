import {FETCH_PRODUCTS,FETCH_PRODUCT,FETCH_INGREDIENTS} from '../constants/productTypes';
export default (state={},action)=>{
    switch(action.type){
        case FETCH_PRODUCTS:
        return {
            ...state,
            products: action.payload
        }
        case FETCH_PRODUCT:
            return {
                ...state,
                product:action.payload
            }
        case FETCH_INGREDIENTS:
            return{
                ...state,
                ingredients:action.payload
            }
        default:
            return state;
    }
}