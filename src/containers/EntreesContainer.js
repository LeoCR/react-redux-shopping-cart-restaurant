import React,{Component} from "react";
import Entrees from "../components/Entrees";
class EntreesContainer extends Component{
    render(){
        return(
            <Entrees Entrees={this.props.Entrees} 
            setAddForm={this.props.setAddForm}
            addProductToCart={this.props.addProductToCart}/>
        )
    }
}
export default EntreesContainer