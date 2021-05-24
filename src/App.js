import React, { useState } from 'react'
import {Helmet} from "react-helmet";
import './App.css';
import scissors from './images/scissors.png'
import paper from './images/paper.png'
import rock from './images/rock.png'

function App() {

  const [results, setResults] = useState({ winner: "", winnerChoice: "" })
  const [compChoice, setCompChoice] = useState(-1)
  const [selected, setSelected] = useState('')
  const [gameRan, setGameRan] = useState(false)

  const choices = [
    {
      src: rock,
      str: 'rock'
    },
    {
      src: scissors,
      str: 'scissors'
    },
    {
      src: paper,
      str: 'paper',
    }
  ]

  let restart = () => {
    setGameRan(false);
    setSelected("");
    setCompChoice(-1);
    setResults({
      winner: "",
      winnerChoice: "",
    });
  };

  let play = (e) => {

    setGameRan(true)
    setSelected(e.target.attributes.alt.value) // set selected to the aly value of  the event 
    let userChoice = Number(e.target.attributes.value.value)

    let start = Date.now(); // The current date (in miliseconds)
    let end = start + 5000; // 5 seconds afterwords

    function spinWheel() {
        start = Date.now(); // Get the date currently
        let currentCompChoice = (Math.round(Math.random() * 2)) 
        setCompChoice(currentCompChoice)

        if(start > end){ 

          while (currentCompChoice === userChoice) { // to avoid a tie
            currentCompChoice = (Math.round(Math.random() * 2)) 
            setCompChoice(currentCompChoice) 
          }

          if (userChoice === currentCompChoice - 1 || userChoice === 2 && currentCompChoice === 0){
            setResults({ winner: 'You', winnerChoice: choices[currentCompChoice].str })
          } else {
            setResults({ winner: "The computer", winnerChoice: choices[currentCompChoice].str })
          } 

          clearInterval(timer); // If we are 5 seconds later clear interval

        } 

    }

    let timer = setInterval(spinWheel, 100);

  }

  return (
    <div className="App">
      <Helmet>
        <title>Rock, Paper, Scissors</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&display=swap" rel="stylesheet"></link>
      </Helmet>
      <h1>Choose your weapon</h1>
      {
        results.winner === "" ?
          <p>Click to choose an option</p>
        :
          <>
          <p>{results.winner} won the game, with {results.winnerChoice}!</p> 
          <button onClick={restart} >Play Again?</button>
          </>
      }
      <div className='choices'>
        { 
          choices.map((choice) => {
              return (
              <img
                onClick={(e) => !gameRan && play(e) }
                className={`choice ${choice.str === selected ? 'selected' : '' }`}
                value={choices.indexOf(choice)}
                src={choice.src}
                alt={choice.str}
              ></img>
            )
          }) 
        }
      </div>
      {
       compChoice !== -1 &&
       <>
       <p>vs</p>
       <img className="comp_choice_img" src={choices[compChoice].src}></img>
       </>
      }
    </div>
  );
}

export default App;
