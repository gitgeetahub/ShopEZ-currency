import React from 'react'
import { useStore } from '../lib/store'
import { formatPrice } from '../lib/products'

export default function ProductList({ products, loading, onAddToCart, user }) {
  const { currency, addToCart } = useStore()
  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Our Products</h1>
      <div className="row g-4">
        {products.map(product => (
          <div key={product.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <img src={product.image} className="card-img-top" alt={product.name} style={{ height: '250px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge bg-info">{product.category}</span>
                  <span className="badge bg-success">{product.discount}% OFF</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-0">{formatPrice(product.priceINR, currency)}</h6>
                    <small className="text-muted">by {product.seller}</small>
                  </div>
                  <div>
                    <small className="text-warning">★ {product.rating}</small>
                    <br />
                    <small className="text-muted">({product.reviews} reviews)</small>
                  </div>
                </div>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => {
                    addToCart(product.id)
                    onAddToCart(product)
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
