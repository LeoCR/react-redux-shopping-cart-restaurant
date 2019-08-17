import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchProduct} from '../../actions';
class ViewDrink extends React.Component {
    componentDidMount(){
        this.props.fetchProduct(this.props.match.params.id);
    }
    render(){
        if(!this.props.product){
            return (
                <div>
                    Loading
                </div>
            )
        }
        const {name,picture,price,description,id}=this.props.product;
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
}
const mapStateToProps=(state)=>{
    return {
        product:state.products.product
    }
}
export default connect(mapStateToProps,{fetchProduct})(ViewDrink);