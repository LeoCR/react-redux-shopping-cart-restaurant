import React from "react";
import $ from 'jquery';
import history from '../history';
export const Drinks=props=>{
    const addDrink=(idDrink)=>{
        props.setAddForm();
        props.addProductToCart(idDrink);
    }
    const goToMenu=(e,id)=>{
        e.preventDefault();
        history.push('/drinks/'+id);
        $('html,body').animate({
            scrollTop: $("#menu").offset().top-90
        }, 'slow');
    }
    const {Drinks}=props;
    if(!Drinks){
        return(
            <React.Fragment>
                Loading
            </React.Fragment>
        )
    }
    return(
        <React.Fragment>
        {
            Drinks.map(drink => 
                    <div className="menu-body menu-left menu-white" key={drink.id}> 
                        <div className="menu-thumbnail">
                            <img className="img-responsive center-block" src={drink.picture} alt={drink.name}/>
                        </div>  
                        <div className="menu-details"> 
                            <div className="menu-title clearfix">
                            <h4>{drink.name}</h4>
                                <span className="price">$ {drink.price}</span>
                            </div>
                            <div className="menu-description">
                                <p>{drink.description.substr(0,80)+'...'}</p>
                            </div>
                            <button type="button" className="btn btn-danger" 
                            onClick={()=>{addDrink(drink)}}>
                            <i className="fa fa-cart-plus fa-3"></i>
                            Add
                            </button>
                            <a type="button" className="btn btn-success" onClick={(e)=>goToMenu(e,drink.id)}>
                            <i className="fa fa-eye fa-3" aria-hidden="true"></i>
                            Read More
                            </a>
                        </div>
                    </div>
        )}
        </React.Fragment>
    );
    
}
export default React.memo(Drinks);