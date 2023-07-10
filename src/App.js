import './App.css'
import {useEffect, useState} from 'react'
import SingleCard from './components/SingleCard'

const cardImages = [
  {"src" : "/img/helmet-1.png",matched : false},
  {"src" : "/img/potion-1.png",matched : false},
  {"src" : "/img/ring-1.png",matched : false},
  {"src" : "/img/shield-1.png",matched : false},
  {"src" : "/img/sword-1.png",matched : false},
  {"src" : "/img/scroll-1.png",matched : false},
]
let number = 0
function App() {
    const [cards, setCards] = useState([])
    const [turns, setturns] = useState(0)
    const [choiceone,setChoiceone] = useState(null)
    const [choicetwo, setchoicetwo] = useState(null)
    const [disabled,setDisabled] = useState(false)
    const [win,setWin] = useState(false)

  // console.log({cards})
  const suffledCards =() => {
    const sufflecard = [...cardImages,...cardImages]
    .sort(() => Math.random()-0.5)
    .map(card => ({...card,id:Math.random() }))

    setChoiceone(null)
    setchoicetwo(null)
    setCards(sufflecard)
    setturns(0)
    setWin(false)
  }

  const handler = (card)=>{
    choiceone ? setchoicetwo(card) : setChoiceone(card)
  }

  useEffect(()=>{
    if (choiceone && choicetwo){
      setDisabled(true)
      if (choiceone.src == choicetwo.src){
        setCards(cards.map(card =>{
          if (card.src === choiceone.src){
            return {...card,matched : true}
          }
          else{
            return card
          }
        }))}
      setTimeout(()=>reset(),1000)
    }
    number = 0
    for (const car of cards){
      if (car.matched){
        number += 1
      }
    }
    if (number===12){
      setWin(true)
      alert("You have won the with " + turns + " turns")
    }

  },[choiceone,choicetwo])

  console.log(cards)

  const reset = ()=>{
    setChoiceone(null)
    setchoicetwo(null)
    setturns(turns+1)
    setDisabled(false)
  }

  useEffect(()=>{
    suffledCards()
  },[setWin])
  


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={suffledCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card ={card}  
            handler = {handler} 
            flipped = {card===choiceone || card === choicetwo || card.matched}  
            disabled = {disabled}
          />
        ))}
      </div>
      <p>turns : {turns} </p>


    </div>
  );
}

export default App