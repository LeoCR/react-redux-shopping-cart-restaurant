import React from 'react';
import EntreesContainer from "./EntreesContainer";
import DessertsContainer from "./DessertsContainer";
import DrinksContainer from "./DrinksContainer";
import StrongsDishesContainer from "./StrongsDishesContainer";
import {connect} from 'react-redux';
import $ from 'jquery';
import CartContainer from "./CartContainer";
import {fetchProducts} from '../actions';
import {addToCart} from '../actions/cartActions';
import {Router, Route } from "react-router-dom";
import ViewDrink from "../components/view/ViewDrink";
import ViewDish from "../components/view/ViewDish";
import history from '../history';
class App extends React.Component {
  state={
    showModal:'showAddForm',
    product:null,
    hasOrders:false,
    totalOrders:0
  }
  setAddForm=()=>{
    $('body').removeClass('signup');
    $('body').toggleClass('modal-opened');
    this.setState({
      showModal:'showAddForm'
    })
  }
  setShowLogin=()=>{
    $('body').removeClass('signup');
    console.log('setShowLogin');
    this.setState({
      showModal:'showLogin'
    })
  }
  setShowSignUp=()=>{
    $('body').addClass('signup');
    console.log('setShowSignUpForm');
    this.setState({
      showModal:'showSignUpForm'
    })
  }
  setShowUserDetails=()=>{
    $('body').removeClass('signup');
    console.log('setShowUserDetails');
    this.setState({
      showModal:'showUserDetails'
    })
  }
  setShowOrders=()=>{
    $('body').removeClass('signup');
    this.setState({
      showModal:'showBasket'
    });
    this.calculateOrders();
    $('.modal').css({'display':'block'});
  }
  setShowUserCreated=()=>{
    $('body').removeClass('signup');
    this.setState({
      showModal:'showUserCreated'
    });
  }
  calculateOrders=()=>{
    var totalQuantity=0;
    try {
      this.props.orders.orders.forEach(function(element) {
          totalQuantity+=element.quantity;
      });
    } 
    catch (error) {
      console.log('An error occurs in App.calculateOrders');
      console.error(error);
    }
    finally{
      if(totalQuantity<10){
        this.setState({
          totalOrders:'0'+totalQuantity
        })
      }
      else{
        this.setState({
          totalOrders:totalQuantity
        })
      }
    }
    if(totalQuantity>=1){
        this.setState({
          hasOrders:true
        });
    }
  }
  componentDidMount(){
    this.calculateOrders();
    this.props.fetchProducts();
  }
  addProductToCart=(product)=>{
    var productObject=Object.assign({currency:'USD'},product);
    setTimeout(() => {
      $("#productName").val(product.name); 
      $("#quantity-cart").val(1);
      $("#pricePerUnit").val(product.price);
      $("#totalPrice").val(product.price); 
      $('.modal').css({'display':'block'});
    }, 300);
    this.setState({
      product:productObject
    });
    this.calculateOrders();
  }
  addToCart=(quantity)=>{
      var orderObject = Object.assign({quantity: quantity}, this.state.product);
      this.props.addToCart(orderObject);
      this.calculateOrders();
  }
  render() {
    if(!this.props.products.products){
      return (
        <div>
          Loading
        </div>
      )
    }
    return (
        <React.Fragment>
          <Router history={history}>
            <React.Fragment>
              <Route path='/' exact render={()=>
                <section className="our-menu white-bg  page-section-pt">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 col-md-12">
                        <div className="tabs clearfix"> 
                            <ul className="tabs-link white text-center">
                              <li className="tab-link">
                                <a href="#tab-entrees" data-toggle="tab" aria-expanded="false">
                                  <i className="glyph-icon flaticon-food-9"></i> 
                                  Appetizers
                                </a>
                              </li>
                              <li className="tab-link">
                                <a href="#tab-strong-dishes" data-toggle="tab" aria-expanded="false">
                                  <i className="glyph-icon flaticon-food-36"></i> 
                                  Main Courses
                                </a>
                              </li>
                              <li className="tab-link">
                              <a href="#tab-desserts" data-toggle="tab" aria-expanded="false">
                                <i className="glyph-icon flaticon-cake-box"></i>
                                Desserts
                              </a>
                              </li>
                              <li className="tab-link">
                                <a href="#tab-drinks" data-toggle="tab" aria-expanded="false">
                                  <i className="glyph-icon flaticon-foamy-beer-jar"></i> 
                                  Drinks
                                </a>
                              </li>
                            </ul>
                            <div className="tab-content">
                              <div role="tabpanel" className="tab-pane fade active in" id="tab-entrees">
                                <EntreesContainer 
                                addProductToCart={this.addProductToCart} 
                                setAddForm={this.setAddForm}
                                Entrees={this.props.products.products.entrees}/>
                              </div>
                              <div role="tabpanel" className="tab-pane fade" id="tab-strong-dishes">
                                <StrongsDishesContainer 
                                addProductToCart={this.addProductToCart} 
                                setAddForm={this.setAddForm}
                                StrongsDishes={this.props.products.products.strongsDishes}/>
                              </div>
                              <div role="tabpanel" className="tab-pane fade" id="tab-desserts">
                                <DessertsContainer 
                                addProductToCart={this.addProductToCart} 
                                setAddForm={this.setAddForm}
                                Desserts={this.props.products.products.desserts}/>
                              </div>
                              <div role="tabpanel" className="tab-pane fade" id="tab-drinks">
                                <DrinksContainer 
                                addProductToCart={this.addProductToCart} 
                                setAddForm={this.setAddForm}
                                Drinks={this.props.products.products.drinks}/>
                              </div>
                            </div> 
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              }/>
              <Route path='/saucers/:id' exact component={ViewDish}/>
              <Route path='/drinks/:id' exact component={ViewDrink}/>
            </React.Fragment>
          </Router>
          <CartContainer 
            setShowUserCreated={this.setShowUserCreated}
            setShowOrders={this.setShowOrders}
            setShowLogin={this.setShowLogin}
            setShowUserDetails={this.setShowUserDetails}
            setShowSignUp={this.setShowSignUp} 
            showModal={this.state.showModal} 
            hasOrders={this.state.hasOrders}
            totalOrders={this.state.totalOrders}
            addToCart={this.addToCart} 
            calculateOrders={this.calculateOrders}/>
        </React.Fragment>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    products:state.products,
    orders:state.orders
  }
}
export default connect(mapStateToProps,{fetchProducts,addToCart})(App)
