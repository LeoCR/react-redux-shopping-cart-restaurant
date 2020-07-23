import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchProduct,fetchIngredients} from '../../actions';
export const ViewDish =props=> {
    useEffect(() => {
        var id=props.match.params.id;
        props.fetchProduct(id);
        props.fetchIngredients(id);  
    }, [props]); 
    const getIngredients=()=>{
        if(!props.ingredients){
            return(
                <React.Fragment>
                </React.Fragment>
            )
        }
        var titleHtml;
        if(props.ingredients.length>0){
            titleHtml=<h3 style={{color:'#fff'}}>Ingredients</h3>
        }
        return( 
            <React.Fragment>
                <ul id="ingredients-list">
                    {titleHtml}
                {
                    props.ingredients.map(ingredient =>
                        {
                            return(
                                <li>
                                    <span className="arrow-orange"></span>
                                    <p>{ingredient.name}</p>
                                    <img src={ingredient.img} alt={ingredient.name} style={{width:'50px'}}/>
                                </li>
                            )
                        }
                    )
                }
                </ul>
            </React.Fragment>
        )
    } 
    if(!props.product){
        return (
            <div>
                Loading
            </div>
        )
    }
    const {name,picture,price,description,id}=props.product;
    return(
        <div className="container" key={id} style={{background:'#000'}}>
            <Link to="/" className="btn btn-success">Back</Link>
            <h1 style={{color:'#fff'}}>{name}</h1>
            <img src={picture} alt={name} style={{maxWidth:'190px'}}/>
            <p style={{color:'#fff'}}>Description: {description}</p>
            <p style={{color:'#fff'}}>Price: ${price} </p>
            {getIngredients()}  
        </div>
    )
    
}
const mapStateToProps=(state)=>{
    return {
        product:state.products.product,
        ingredients:state.products.ingredients
    }
}
export default connect(mapStateToProps,{fetchProduct,fetchIngredients})(ViewDish);