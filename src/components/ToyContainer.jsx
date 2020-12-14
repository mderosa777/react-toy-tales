import React from 'react';
import ToyCard from './ToyCard';

class ToyContainer extends React.Component {
  state = {
    toys: [],
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => this.setState({ toys }))
  }

  // removetoy = (id) => {
  //   fetch(`http://localhost:3000/toys/${id}`,{
  //     method: "DELETE"
  //   }).then(res => res.json())

  //   const updatedtoys = [...this.state.toys].filter(toy => toy.id !== id)
  //   this.setState({
  //     toys: updatedtoys
  //   })
  // }

  deleteToy = (event) => {
    event.preventDefault()

    const deletedToy = [...this.state.toys].filter(toy => toy.name === event.target.parentElement.firstElementChild.innerText)
    const updatedtoys = [...this.state.toys].filter(toy => toy.name !== event.target.parentElement.firstElementChild.innerText)
    this.setState({
      toys: updatedtoys
    })

    fetch(`http://localhost:3000/toys/${deletedToy[0].id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
  }

  likeToy = (event) => {
    event.preventDefault()
    let likedToy = {}
    const newToys = [...this.state.toys].map((toy) => {
      if (toy.name === event.target.parentElement.firstElementChild.innerText) {
        toy.likes += 1
        likedToy = toy
      }
      return toy
    })

    this.setState({
      toys: newToys
    })

    fetch(`http://localhost:3000/toys/${likedToy.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": likedToy.likes
        })
    })
  }

  mapToys = () => {
    return (
      this.state.toys.map(toy => <ToyCard key={toy.id} toyInst={toy} likeToy={this.likeToy} deleteToy={this.deleteToy}/>)
    )
  }
  
  render() { 
    return(
      <div id="toy-collection">
        {/* Render the collection of ToyCards */
          this.mapToys()
        }
      </div>
    );
  }
}

export default ToyContainer;
