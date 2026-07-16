import React, { useState } from 'react'
import { useStore } from '../lib/store'
import { currencies } from '../lib/products'

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="position-relative">
      <button
        className="btn btn-sm btn-outline-secondary"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {currency} ▼
      </button>
      {isOpen && (
        <div 
          className="position-absolute bg-white border rounded shadow-sm mt-2 p-2"
          style={{ zIndex: 1000, minWidth: '200px', right: 0 }}
        >
          {Object.entries(currencies).map(([code, { label }]) => (
            <button
              key={code}
              className={`d-block w-100 text-start p-2 border-0 ${currency === code ? 'bg-light fw-bold' : ''}`}
              onClick={() => {
                setCurrency(code)
                setIsOpen(false)
              }}
              style={{ cursor: 'pointer' }}
            >
              {code} - {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
