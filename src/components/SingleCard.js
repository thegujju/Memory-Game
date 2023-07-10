import React from 'react'
import "./SingleCard.css"

function SingleCard({card,handler,flipped,disabled}) {

    const clickHandler = () =>{
        if (!disabled){
            handler(card)
        }
    }

  return (
    <div className='card' key={card.id}>
        <div className={flipped ? "flipped" : ""}>
            <img className='front' src={card.src} />
            <img className='back' src='/img/cover.png' onClick={clickHandler} />
        </div>
    </div>
  )
}

export default SingleCard