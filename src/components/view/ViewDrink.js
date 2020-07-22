import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchProduct} from '../../actions';
export const ViewDrink=props=>{
    useEffect(() => {
        let id=props.match.params.id;
        props.fetchProduct(id); 
    }, []);
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
            <p style={{color:'#fff'}}>Price: {price}$ </p>
        </div>
    )
    
}
const mapStateToProps=(state)=>{
    return {
        product:state.products.product
    }
}
export default connect(mapStateToProps,{fetchProduct})(React.memo(ViewDrink));