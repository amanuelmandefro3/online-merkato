import React from 'react'
import './card.module.scss'

function Card({children, cardClass}) {
  return (
    <div className={`card ${cardClass}`} >
      {children}
    </div>
  )
}

export default Card
