import React, { Component } from 'react';

class ToyForm extends Component {//controlled form
  state = {
    toy: {
      name: "",
      image_url: "",
      likes: 0,
    }
  }

  addToy = (event) => {
    event.preventDefault()
    // debugger     // uncontrolled form
    // const toyName = event.target.parentElement.firstElementChild.querySelector('#name').value
    // const toyImage_url = event.target.parentElement.firstElementChild.querySelector('#image').value
    // const newtoy = {
    //   likes: 0,
    //   name: toyName,
    //   image: toyImage_url,
    // };

    fetch('http://localhost:3000/toys',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.toy)
    })
    .then(res => res.json())
    .then(toy => {
      console.log(toy)
      // this.setState({
      //   toys: [...this.state.toys, toy],
      // });
    })
  }
//controlled form to add new toy name
  handleToyName = (event) => {
    this.setState({
      toy: {
        ...this.state.toy,
        name: event.target.value
      }
    })
  }
//controlled form to add new toy image
  handleToyImage = (event) => {
    this.setState({
      toy: {
        ...this.state.toy,
        image_url: event.target.value
      }
    })
  }

  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   this.props.handleFiltering(this.state.selectedAnimalType)
  // }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form">
          <h3>Create a toy!</h3>
          <input type="text" name="name" id="name" placeholder="Enter a toy's name..." className="input-text" value={this.state.toy.name} onChange={event => this.handleToyName(event)}/>
          <br/>
          <input type="text" name="image" id="image" placeholder="Enter a toy's image URL..." className="input-text" value={this.state.toy.image_url} onChange={event => this.handleToyImage(event)}/>
          <br/>
          
        </form>
        <button onClick={(event) => this.addToy(event)}>Create New Toy</button>
      </div>
    );
  }

}

export default ToyForm;
