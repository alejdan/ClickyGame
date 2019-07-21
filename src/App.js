import React, { Component } from "react";
import Card from "./components/characterCard";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import characterCards from "./characterCards.json";

class App extends Component {
  // Setting this.state.characterCards to the characterCards json array
  state = {
    characterCards,
    score: 0,
    highscore: 0
  };
  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({highscore: this.state.score}, function() {
        console.log(this.state.highscore);
      });
    }
    this.state.characterCards.forEach(card => {
      card.count = 0;
    });
    document.getElementById("root").classList.add('imageAnimation');
    setTimeout(function () {
      document.getElementById("root").classList.remove('imageAnimation')
    }, 500)
    this.setState({score: 0});
    return true;
  }

  clickCount = id => {
    this.state.characterCards.find((o, i) => {
      if (o.id === id) {
        if(characterCards[i].count === 0){
          characterCards[i].count = characterCards[i].count + 1;
          this.setState({score : this.state.score + 1}, function(){
            console.log(this.state.score);
          });
          this.state.characterCards.sort(() => Math.random() - 0.5)
          return true; 
        } else {
          this.gameOver();
        }
      }
    });
  }
  // Map over this.state.characterCards and render a cardCard component for each card object
  render() {
    return (
      <Wrapper>
        <Header score={this.state.score} highscore={this.state.highscore}>Clicky Game</Header>
        {this.state.characterCards.map(card => (
          <Card
            clickCount={this.clickCount}
            id={card.id}
            key={card.id}
            image={card.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
