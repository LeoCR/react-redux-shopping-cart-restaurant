import React from "react";
import $ from 'jquery';
import {connect} from 'react-redux';
import {updateItemUnits,deleteFromCart} from '../../actions/cartActions';
class CartAddForm extends React.Component{
    checkout=(e)=>{
        e.preventDefault();
    }
    addToCart=(e)=>{
        e.preventDefault();
        var quantity=parseInt($('#quantity-cart').val()),
        tempName=$("#productName").val(),
        orders=this.props.orders.orders,
        editedOrder=false,
        _this_=this;
        $('.modal').css({'display':'none'});
        $('body').toggleClass('modal-opened');
        orders.forEach(function(element) {
            if(element.name===tempName){
                editedOrder=true; 
                element.quantity=quantity+element.quantity;
                _this_.props.updateItemUnits(element);
            } 
        });
        setTimeout(() => {
            if(!editedOrder){
                this.props.addToCart(quantity);
            }
        }, 400);
        this.props.calculateOrders();
    }
    decrement=(e)=>{
        e.preventDefault();
        var currentValue=parseInt($('#quantity-cart').val());
        if(currentValue>1){
            currentValue=parseInt($('#quantity-cart').val())-1;
        }
        $('#quantity-cart').val(currentValue);
        var totalPrice=parseFloat($('#quantity-cart').val())*parseFloat($("#pricePerUnit").val());
        $("#totalPrice").val(totalPrice);
        this.props.calculateOrders();
    }
    increment=(e)=>{
        e.preventDefault();
        var currentValue=parseInt($('#quantity-cart').val())+1;
        $('#quantity-cart').val(currentValue);
        var totalPrice=parseFloat($('#quantity-cart').val())*parseFloat($("#pricePerUnit").val());
        $("#totalPrice").val(totalPrice);
        this.props.calculateOrders();
    }
    render(){
        this.props.calculateOrders();
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
                        onClick={this.decrement} style={{float:'left'}}>-</button>
                        <input type="number" name="quantity" 
                            id="quantity-cart"   style={{width:'200px',float:'left'}} className="form-control"/>
                             <button type="button" className="btn btn-success" 
                        onClick={this.increment} style={{float:'left'}}>+</button>
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
                        onClick={(e)=>this.addToCart(e)}>Add to Cart</button>
                    <button type="button" className="btn btn-success" 
                        data-dismiss="modal" 
                        onClick={(e)=>this.checkout(e)}>Checkout</button>
                </div>
            </React.Fragment>        
        );
    }
}
const mapStateToProps=(state)=>{
    return{
      orders:state.orders
    }
}
export default connect(mapStateToProps,{updateItemUnits,deleteFromCart})(CartAddForm)