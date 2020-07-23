import React,{useEffect} from "react";
import $ from 'jquery';
import {connect} from 'react-redux';
import {updateItemUnits,deleteFromCart} from '../../actions/cartActions';
export const CartAddForm =props=>{
    useEffect(()=>{
        props.calculateOrders();
    },[props])
    const checkout=(e)=>{
        if(e){
            e.preventDefault();
        }
        props.checkout(); 
    }
    const addToCart=(e)=>{
        e.preventDefault();
        var quantity=parseInt($('#quantity-cart').val()),
        tempName=$("#productName").val(),
        orders=props.orders.orders,
        editedOrder=false;
        $('.modal').css({'display':'none'});
        $('body').toggleClass('modal-opened');
        orders.forEach(function(element) {
            if(element.name===tempName){
                editedOrder=true; 
                element.quantity=quantity+element.quantity;
                props.updateItemUnits(element);
            } 
        });
        setTimeout(() => {
            if(!editedOrder){
            props.addToCart(quantity);
            }
        }, 400);
        props.calculateOrders();
    }
    const decrement=(e)=>{
        e.preventDefault();
        var currentValue=parseInt($('#quantity-cart').val());
        if(currentValue>1){
            currentValue=parseInt($('#quantity-cart').val())-1;
        }
        $('#quantity-cart').val(currentValue);
        var totalPrice=parseFloat($('#quantity-cart').val())*parseFloat($("#pricePerUnit").val());
        $("#totalPrice").val(totalPrice);
        props.calculateOrders();
    }
    const increment=(e)=>{
        e.preventDefault();
        var currentValue=parseInt($('#quantity-cart').val())+1;
        $('#quantity-cart').val(currentValue);
        var totalPrice=parseFloat($('#quantity-cart').val())*parseFloat($("#pricePerUnit").val());
        $("#totalPrice").val(totalPrice);
        props.calculateOrders();
    } 
    
    return(
        <React.Fragment>
            <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="productName">Product Name:</label>
                    <input type="hidden" name="idProduct" 
                        id="idProduct" disabled/>
                    <input type="text" name="productName" 
                        id="productName" disabled className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity:</label>
                    <button type="button" className="btn btn-danger" 
                    onClick={decrement} style={{float:'left'}}>-</button>
                    <input type="number" name="quantity" 
                        id="quantity-cart"   style={{width:'200px',float:'left'}} className="form-control"/>
                            <button type="button" className="btn btn-success" 
                    onClick={increment} style={{float:'left'}}>+</button>
                </div>
                
                <div className="form-group">
                    <label htmlFor="pricePerUnit">Price per Unit:</label>
                    <input type="number" name="pricePerUnit" 
                        id="pricePerUnit" disabled/>
                </div>
                <div className="form-group">
                    <label htmlFor="totalPrice">Total Price:</label>
                    <input type="number" name="totalPrice" 
                        id="totalPrice" disabled  className="form-control"/>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" 
                    onClick={(e)=>addToCart(e)}>Add to Cart</button>
                <button type="button" className="btn btn-success" 
                    data-dismiss="modal" 
                    onClick={(e)=>checkout(e)}>Checkout</button>
            </div>
        </React.Fragment>        
    );
    
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders,
      user:state.user.user
    }
}
export default connect(mapStateToProps,{updateItemUnits,deleteFromCart})(React.memo(CartAddForm))