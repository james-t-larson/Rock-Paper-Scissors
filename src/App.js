import React, { useState } from 'react'
import {Helmet} from "react-helmet";
import './App.css';
import scissors from './images/scissors.png'
import paper from './images/paper.png'
import rock from './images/rock.png'

function App() {

  const img_choices = [rock, scissors, paper]

  const [results, setResults] = useState({})
  const [comp_choice, setCompChoice] = useState(-1)

  let play = (e) => {

    e.target.classList.toggle("selected")

    let user_choice = (e.target.attributes.value.value)
    let choices = ["rock", "scissors", "paper"]

    let results = {
      winner: "",
      winner_choice:  "" 
    }

    let start = Date.now(); // The current date (in miliseconds)
    let end = start + 5000; // 5 seconds afterwords

    function spinWheel() {
        start = Date.now(); // Get the date currently
        let choice = (Math.round(Math.random() * 2)) 
        setCompChoice(choice)
        console.log(choice)
        
        if(start > end){ 

          while (choice == user_choice) {
            console.log("there was a tie")
            choice = (Math.round(Math.random() * 2)) 
            setCompChoice(choice) 
          }

          if (user_choice == choice - 1 || user_choice == 2 && choice == 0){
            results.winner = "You"
            results.winner_choice = choices[user_choice]
          } else {
            results.winner = "The computer"
            results.winner_choice = choices[choice]
          } 

          setResults(results)

          clearInterval(timer); // If we are 5 seconds later clear interval

        } 

    }

    let timer = setInterval(spinWheel, 200);

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
          Object.keys(results).length > 0 ?
          <>
          <p>{results.winner} won the game, with {results.winner_choice}!</p> 
          <button>Play Again?</button>
          </>
          :
          <p>Click to choose an option</p>
      }
      <div className='choices'>
        <img onClick={play} className='rock choice' value={0} src={rock}></img>
        <img onClick={play} className='paper choice' value={2} src={paper}></img>
        <img onClick={play} className='scissors choice' value={1} src={scissors}></img>
      </div>
      {
       comp_choice !== -1 &&
       <>
       <p>vs</p>
       <img className="comp_choice_img" src={img_choices[comp_choice]}></img>
       </>
      }
    </div>
  );
}

export default App;
