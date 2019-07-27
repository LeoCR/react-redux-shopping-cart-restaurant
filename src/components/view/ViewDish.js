import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchProduct,fetchIngredients} from '../../actions';
class ViewDish extends React.Component {
    componentDidMount(){
        var id=this.props.match.params.id;
        this.props.fetchProduct(id);
        this.props.fetchIngredients(id);
    }
    getIngredients(){
        if(!this.props.ingredients){
            return(
                <div>
                    Loading Ingredients
                </div>
            )
        }
        var titleHtml;
        if(this.props.ingredients.length>0){
            titleHtml=<h3>Ingredients</h3>
        }
        return( 
            <ul>
                {titleHtml}
            {
                this.props.ingredients.map(ingredient =>
                    {
                        return(
                            <li>
                                {ingredient.name} 
                                <img src={ingredient.img} alt={ingredient.name} style={{width:'50px'}}/>
                            </li>
                        )
                    }
                )
            }
            </ul>
        )
    }
    render(){
        if(!this.props.product){
            return (
                <div>
                    Loading
                </div>
            )
        }
        console.log(this.props);
        const {name,picture,price,description,id}=this.props.product;
        return(
            <div className="container" key={id}>
                <Link to="/" className="btn btn-success">Back</Link>
                <h1>{name}</h1>
                <img src={picture} alt={name} style={{maxWidth:'190px'}}/>
                <p>Description: {description}</p>
                <p>Price: {price}$ </p>
                
                {this.getIngredients()}  
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        product:state.products.product,
        ingredients:state.products.ingredients
    }
}
export default connect(mapStateToProps,{fetchProduct,fetchIngredients})(ViewDish);