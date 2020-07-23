import React from "react";
import $ from 'jquery';
import history from '../history';
export const Desserts =props=>{  
    const addDessert=(dessert)=>{
        props.setAddForm();
        props.addProductToCart(dessert);
    }
    const goToMenu=(e,id)=>{
        e.preventDefault();
        history.push('/saucers/'+id);
        $('html,body').animate({
            scrollTop: $("#menu").offset().top-90
        }, 'slow');
    } 
    const {Desserts}=props;
    if(!Desserts){
        return(
            <React.Fragment>
                Loading
            </React.Fragment>
        )
    }
    return(
        <React.Fragment>
        {
                Desserts.map(dessert => 
                    <div className="menu-body menu-left menu-white" key={dessert.id}> 
                        <div className="menu-thumbnail">
                            <img className="img-responsive center-block" src={dessert.picture} alt={dessert.name}/>
                        </div>  
                        <div className="menu-details"> 
                            <div className="menu-title clearfix">
                            <h4>{dessert.name}</h4>
                                <span className="price">$ {dessert.price}</span>
                            </div>
                            <div className="menu-description">
                                <p>{dessert.description.substr(0,80)+'...'}</p>
                            </div>
                            <button type="button" className="btn btn-danger" onClick={()=>{addDessert(dessert)}}><i className="fa fa-cart-plus fa-3"></i>Add</button>
                            <button type="button" onClick={(e)=>goToMenu(e,dessert.id)} className="btn btn-success"><i className="fa fa-eye fa-3" aria-hidden="true"></i>Read More</button>
                        </div>
                    </div>
        )}
        </React.Fragment>
    );
}
export default React.memo(Desserts);