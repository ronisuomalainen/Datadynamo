import React from 'react'
import '../index.css'
const Store = () => {
  return (
    <div class="content">
    <div class="image-section">
      <img src="matto.webp" alt="Tuotekuva"/>
      <button>Lisää kuva</button>
    </div>
    <div class="details-section">
      <p>Lorem ipsum hyvä hiirimatto omalla kuvalla</p>
      <p>1,50€</p>
      <button>Osta</button>
    </div>
  </div>
  )
}

export default Store