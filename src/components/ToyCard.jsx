import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    return (
      <div className="card">
        <h2>{this.props.toyInst.name}</h2>
        <img src={this.props.toyInst.image} alt={this.props.toyInst.name} className="toy-avatar" />
        <p>{this.props.toyInst.likes} Likes </p>
        <button className="like-btn" onClick={(event) => this.props.likeToy(event)}>Like {'<3'}</button>
        <button className="del-btn" onClick={(event) => this.props.deleteToy(event)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
