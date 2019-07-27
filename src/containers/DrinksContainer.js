import React , {Component} from "react";
import Drinks from "../components/Drinks";
class DrinksContainer extends Component{
    render(){
        return(
            <Drinks 
                Drinks={this.props.Drinks} 
                addProductToCart={this.props.addProductToCart} 
                setAddForm={this.props.setAddForm}/>
        )
    }
}

export default DrinksContainer
