import React from 'react'
import { useStore } from '../lib/store'
import { formatPrice } from '../lib/products'

export default function Cart({ cart, onRemove, onUpdateQuantity }) {
  const { currency } = useStore()
  const total = cart.reduce((sum, item) => sum + (item.priceINR * item.quantity), 0)

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1>Your Cart is Empty</h1>
        <p className="text-muted">Start adding products to your cart!</p>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Shopping Cart</h1>
      <div className="row">
        <div className="col-lg-8">
          {cart.map(item => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <img src={item.image} className="img-fluid" alt={item.name} />
                  </div>
                  <div className="col-md-9">
                    <h5>{item.name}</h5>
                    <p className="text-muted">{item.seller}</p>
                    <h6>{formatPrice(item.priceINR, currency)}</h6>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control mx-2"
                        style={{ width: '50px', textAlign: 'center' }}
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                      />
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => onRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>{formatPrice(total, currency)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>{formatPrice(total, currency)}</strong>
              </div>
              <button className="btn btn-primary w-100">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
