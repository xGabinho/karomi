'use client' // ¡Importante! Es un componente interactivo
import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

export default function StarRating() {
  const [rating, setRating] = useState(0)

  const handleRating = (rate: number) => {
    setRating(rate)
    console.log("Nueva valoración:", rate)
    // Aquí podrías hacer un fetch a tu base de datos
  }

  return (
    <div className="flex flex-col gap-2 mb-4 text-left">
      <h3 className="font-semibold">¿Qué te pareció este artículo?</h3>
      <Rating
        onClick={handleRating}
        initialValue={rating}
        size={20}
        transition
        fillColor="#f1c40f"
        emptyColor="#cccccc"
        SVGstyle={{ display: 'inline-block' }}
      />
      <p className="text-sm text-gray-400">Puntuación: {rating}</p>
    </div>
  )
}