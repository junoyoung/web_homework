import React, { Component } from "react";
import './ListItem.css'
// const ListItem  = (props) =>{
//     const item = props.item;

//     if (item.done){
//         return <p className ="done-item">{item.content}</p>
//     }else{
//         return <p className ="item">{item.content}</p>
//     }
// }

class ListItem extends Component{
    constructor(props){
        super(props);
    }
   
    onAddcotClick = () =>{
        this.props.changetheItem(this.props.item.content)
    }


    render(){
        if (this.props.item.done){
            return <p className ="done-item">{this.props.item.content}</p>
        }else{
            return <p onClick={this.onAddcotClick} className ="item">{this.props.item.content}</p>
        }
    }

}

export default ListItem;