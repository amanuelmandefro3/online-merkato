import React from 'react'
import './card.css'

function Card({children, cardClass}) {
  return (
    <div className={`card ${cardClass}`} >
      {children}
    </div>
  )
}

export default Card
