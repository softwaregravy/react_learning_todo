import React, { Component } from 'react'
import Item from './Item'
import uuid from 'uuid/v4'

export default class ItemList extends Component {
    // 
    state = {
        items: [
            { id: "abc", myValue: "todo list item" },
            { id: "def", myValue: "todo list item2" },
        ]
    }

    handleUpdateItem = (id, myValue) => {
        console.log("setting state");
        this.setState(function (state) {
            let idx = state.items.findIndex(item => item.id === id);
            // this.updatedState(state, id, value)
            console.log("Updating: " + id + " to value: " + myValue + " at index: " + idx)
            return {
                items:
                    [
                        ...state.items.slice(0, idx),
                        {
                            id: { id }, myValue: { myValue }
                        },
                        ...state.items.slice(idx + 1, state.items.length)
                    ]
            }
        });
    }

    handleDeleteItem = (id) => {
        this.setState(state => (
            { items: state.items.filter(item => item.id !== id) }
        ))
    }

    handleNewItem = (value) => {
        let newItem = { id: uuid(), myValue: value }
        this.setState(state => (
            {
                items: [
                    ...state.items,
                    newItem
                ]
            }
        ))
    }

    render() {
        return (
            <div>
                {
                    this.state.items.map(item => (
                        <Item
                            id={item.id}
                            myValue={item.myValue}
                            updateItem={this.handleUpdateItem}
                            deleteItem={this.handleDeleteItem}
                        />
                    ))
                }
                <Item newItem={this.handleNewItem} new />
            </div>
        )
    }
}
