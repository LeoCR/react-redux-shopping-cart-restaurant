import React , {Component} from "react";
import Desserts from "../components/Desserts";
class DessertsContainer extends Component{
    render(){
        return(
            <Desserts 
                Desserts={this.props.Desserts} 
                addProductToCart={this.props.addProductToCart} 
                addDessert={this.props.addProductToCart}
                setAddForm={this.props.setAddForm}
            />
        )
    }
}
export default DessertsContainer