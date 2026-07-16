import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import Auth from './components/Auth'
import { StoreProvider, useStore } from './lib/store'

const API_BASE = 'http://localhost:5000/api'

function AppContent() {
  const { cart, removeFromCart, user, login, logout, addToCart } = useStore()
  const [page, setPage] = useState('products')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch products
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/products`)
      setProducts(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      // Update quantity through store
      removeFromCart(productId)
      for (let i = 0; i < quantity; i++) {
        addToCart(productId)
      }
    }
  }

  const handleLogin = (userData) => {
    login(userData.email, userData.name)
    setPage('products')
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar
        user={user}
        cartCount={cart.length}
        onCartClick={() => setPage('cart')}
        onProductsClick={() => setPage('products')}
        onAuthClick={() => setPage('auth')}
        onLogout={handleLogout}
      />

      <main className="flex-grow-1">
        {page === 'products' && (
          <ProductList
            products={products}
            loading={loading}
            onAddToCart={(p) => {}}
            user={user}
          />
        )}
        {page === 'cart' && (
          <Cart
            cart={cart.map(item => {
              const product = products.find(p => p.id === item.id)
              return { ...product, quantity: item.qty }
            })}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        )}
        {page === 'auth' && <Auth onLoginSuccess={handleLogin} />}
      </main>

      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p>&copy; 2024 ShopEZ. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  )
}
