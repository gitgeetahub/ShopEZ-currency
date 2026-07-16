import React, { createContext, useContext, useEffect, useState } from 'react'

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [currency, setCurrencyState] = useState('INR')
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  // Load from localStorage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('shopez_currency')
    const savedCart = localStorage.getItem('shopez_cart')
    const savedUser = localStorage.getItem('shopez_user')
    
    if (savedCurrency) setCurrencyState(savedCurrency)
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedUser) setUser(JSON.parse(savedUser))
  }, [])

  // Save currency to localStorage
  useEffect(() => {
    localStorage.setItem('shopez_currency', currency)
  }, [currency])

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('shopez_cart', JSON.stringify(cart))
  }, [cart])

  // Save user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('shopez_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('shopez_user')
    }
  }, [user])

  const value = {
    currency,
    setCurrency: setCurrencyState,
    cart,
    addToCart: (id) => {
      setCart(prev => {
        const existing = prev.find(item => item.id === id)
        if (existing) {
          return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item)
        }
        return [...prev, { id, qty: 1 }]
      })
    },
    removeFromCart: (id) => setCart(prev => prev.filter(item => item.id !== id)),
    clearCart: () => setCart([]),
    user,
    login: (email, name) => setUser({ email, name }),
    logout: () => setUser(null),
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used within StoreProvider')
  return context
}
