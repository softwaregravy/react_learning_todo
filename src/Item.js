import React, { Component } from 'react'

export default class Item extends Component {
    static defaultProps = {
        myValue: "",
    }
    state = {
        myValue: this.props.myValue,
        displayValue: this.props.myValue,
        mode: (this.props.new ? "new" : "display")
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit = (evt) => {
        evt.preventDefault()
        console.log("Calling up")
        this.props.updateItem(this.props.id, this.state.myValue);
        this.setState({ displayValue: this.state.myValue, mode: "display" })
        //this.setState(state => ({ displayValue: state.value, mode: "display" }))
    }

    handleDelete = (evt) => {
        this.props.deleteItem(this.props.id);
    }

    handleEdit = (evt) => {
        this.setState({ mode: "edit" })
    }

    handleNew = (evt) => {
        evt.preventDefault()
        this.props.newItem(this.state.myValue);
        this.setState({ myValue: "" })
    }


    render() {
        let display =
            <div>
                {this.state.displayValue}
                <button onClick={this.handleEdit}>Edit</button>
                <button onClick={this.handleDelete}>Delete</button>
            </div>

        let edit =
            <form onSubmit={this.handleSubmit} >
                <input type="text"
                    id="myValue"
                    name="myValue"
                    value={this.state.myValue}
                    onChange={this.handleChange}
                />
                <button>Update</button>
            </form>

        let newItem =
            <form onSubmit={this.handleNew} >
                <input type="text"
                    id="myValue"
                    name="myValue"
                    value={this.state.myValue}
                    onChange={this.handleChange}
                />
                <button>Create</button>
            </form>

        let toRender;
        if (this.state.mode === "edit") {
            toRender = edit;
        } else if (this.state.mode === "new") {
            toRender = newItem;
        } else {
            toRender = display;
        }

        return (
            <div>
                {toRender}
            </div>
        )
    }
}
