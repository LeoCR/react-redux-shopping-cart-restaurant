import React from "react";
import $ from 'jquery';
import history from '../history';
export const Entrees=props=>{
    const addEntree=(idEntree)=>{
        props.setAddForm();
        props.addProductToCart(idEntree);
    }
    const goToMenu=(e,id)=>{
        e.preventDefault();
        history.push('/saucers/'+id);
        $('html,body').animate({
            scrollTop: $("#menu").offset().top-90
        }, 'slow');
    } 
    const {Entrees}=props;
    if(!Entrees){
        return(
            <React.Fragment>
                Loading
            </React.Fragment>
        )
    }
    return(
        <React.Fragment>
        {
                Entrees.map(entree => 
                    <div className="menu-body menu-left menu-white" key={entree.id}> 
                        <div className="menu-thumbnail">
                            <img className="img-responsive center-block" src={entree.picture} alt={entree.name}/>
                        </div>  
                        <div className="menu-details"> 
                            <div className="menu-title clearfix">
                            <h4>{entree.name}</h4>
                                <span className="price">$ {entree.price}</span>
                            </div>
                            <div className="menu-description">
                                <p>{entree.description.substr(0,80)+'...'}</p>
                            </div>
                            <button type="button" className="btn btn-danger" onClick={()=>{addEntree(entree)}}><i className="fa fa-cart-plus fa-3"></i>Add</button>
                            <a type="button" className="btn btn-success" onClick={(e)=>goToMenu(e,entree.id)}><i className="fa fa-eye fa-3" aria-hidden="true"></i>Read More</a>
                        </div>
                    </div>
        )
        }
        </React.Fragment>
    ); 
}
export default React.memo(Entrees);