import React,{Component} from "react";
import $ from 'jquery';
import history from '../history';
class StrongsDishes extends Component{
    addStrongDish(idStrongDish){
        this.props.setAddForm();
        this.props.addProductToCart(idStrongDish);
    }
    goToMenu=(e,id)=>{
        e.preventDefault();
        history.push('/saucers/'+id);
        $('html,body').animate({
            scrollTop: $("#menu").offset().top-90
        }, 'slow');
    }
    render(){
        const {StrongsDishes}=this.props;
        if(!StrongsDishes){
            return(
                <React.Fragment>
                    Loading
                </React.Fragment>
            )
        }
        return(
            <React.Fragment>
            {
                 StrongsDishes.map(strongDish => 
                        <div className="menu-body menu-left menu-white" key={strongDish.id}> 
                            <div className="menu-thumbnail">
                                <img className="img-responsive center-block" src={strongDish.picture} alt={strongDish.name}/>
                            </div>  
                            <div className="menu-details"> 
                                <div className="menu-title clearfix">
                                <h4>{strongDish.name}</h4>
                                    <span className="price">$ {strongDish.price}</span>
                                </div>
                                <div className="menu-description">
                                    <p>{strongDish.description.substr(0,80)+'...'}</p>
                                </div>
                                <button type="button" className="btn btn-danger" onClick={()=>{this.addStrongDish(strongDish)}}><i className="fa fa-cart-plus fa-3"></i>Add </button>
                                <a type="button" className="btn btn-success" onClick={(e)=>this.goToMenu(e,strongDish.id)}><i className="fa fa-eye fa-3" aria-hidden="true"></i>Read More</a>
                            </div>
                        </div>
            )}
            </React.Fragment>
        );
    }
}

export default StrongsDishes;