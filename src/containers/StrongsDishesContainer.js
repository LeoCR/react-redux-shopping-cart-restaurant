import React,{Component} from "react";
import StrongsDishes from "../components/StrongsDishes";
class StrongsDishesContainer extends Component{
    render(){
        return(
            <StrongsDishes 
                StrongsDishes={this.props.StrongsDishes} 
                addProductToCart={this.props.addProductToCart}
                setAddForm={this.props.setAddForm}
            />
        )
    }
}

export default StrongsDishesContainer