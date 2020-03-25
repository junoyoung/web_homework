import React, { Component } from "react";
import ListItem from "./ListItem";
import NewItem from "./NewItem";

class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {
            todoList: [
                {content: 'React practice', done: true},
                {content: 'React homework', done: true},
                {content: 'Text Clustering', done: false},
                {content: 'game time', done: false}
            ]
        }
    }
    addNewItem = (newItemContent) => {
        const newList = [...this.state.todoList, {content:newItemContent, done: false}];
        this.setState({
            todoList: newList
        })        
    }
    changeItem = (Content) =>{
        const newList = this.state.todoList
        for(var i=1;i<=newList.length-1;i++){
            if(newList[i].content === Content){
                newList[i].done = true
            }  
        }
        this.setState({
            todoList: newList
        })
    }
    render(){
        return(
            <div>
                {
                    this.state.todoList.map(item => <ListItem item = {item} changetheItem = {this.changeItem}/>)
                }
                <NewItem addItem = {this.addNewItem}/>
            </div>
        );
    }
}
export default TodoList;