import React,{useEffect} from "react";
import {connect} from 'react-redux';
import $ from 'jquery';
import api from '../apis/api';
import UserDetails from './user/UserDetails';
import LoginButtons from './user/LoginButtons';
import LoginForm from './user/LoginForm';
import SignUpForm from './user/SignUpForm';
import CartProducts from './shopping-cart/CartProducts';
import CartAddForm from './shopping-cart/CartAddForm';
import {setUser} from "../actions/userActions";
export const Modal =props=>{
    useEffect(() => {
        setUserData();
    }, []); 
    const setUserData=()=>{
        try {
            api.get('/api/user/info').then(function (res) {
                if(res.data){
                    props.setUser(res.data);
                }
            });
        } catch (error) {
            console.log('An error occurs in Modal.setUserData() '+error);
        }
    }
    const closeModal=(e)=>{
        if(e){
            e.preventDefault();
        }
        $('.modal').css({'display':'none'});
        $('body').toggleClass('modal-opened');
        $('body').removeClass('signup');
    }
    const checkout=async()=>{
        var isAuthenticathed=false;
        await api.get('/api/validate/authentication')
        .then(function (response) {
            isAuthenticathed=response.data.isAuthenticated;
            if(isAuthenticathed){
                window.location.replace("/checkout");
            }
            else{
                props.setShowLogin();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    } 
    var ModalContent;
    var titleModal;
    if(props.showModal==='showAddForm'){
        titleModal='Shopping Cart';
        ModalContent=<CartAddForm checkout={checkout} calculateOrders={props.calculateOrders} addToCart={props.addToCart}/>;
    }
    else if(props.showModal==='showLogin'){
        ModalContent=<React.Fragment>
            <LoginForm setShowUserDetails={props.setShowUserDetails} setShowSignUp={props.setShowSignUp} setShowUserDetails={props.setShowUserDetails}/>
            <LoginButtons/>
        </React.Fragment>;
        titleModal='Login';
    }
    else if(props.showModal==='showSignUpForm'){
        ModalContent=<React.Fragment>
            <SignUpForm setUserData={setUserData} setShowUserCreated={props.setShowUserCreated}/>
        </React.Fragment>;
        titleModal='Sign Up';
    }
    else if(props.showModal==='showUserDetails'){
        ModalContent=<UserDetails/>;
        titleModal='User Details';
    }
    else if(props.showModal==='showUserCreated'){
        titleModal='User Created';
        ModalContent=<React.Fragment>
            <p style={{padding:'30px 10px',textAlign:'center'}}>Your user was created successfully</p>
        </React.Fragment>
    }
    else{
        titleModal='Shopping Cart';
        ModalContent=<CartProducts calculateOrders={props.calculateOrders} checkout={checkout}/>;
    }
    return(
        <div className="modal" id="modal-shopping-cart">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{titleModal}</h5>
                        <button type="button" className="close" 
                            data-dismiss="modal" aria-label="Close" 
                            onClick={(e)=>closeModal(e)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    {ModalContent}
                </div>
            </div>
        </div>
    )
}
const mapStateToProps=(state)=>{
    return{
      user:state.user
    }
}
export default connect(mapStateToProps,{setUser})(React.memo(Modal))