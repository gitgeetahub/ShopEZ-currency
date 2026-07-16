import React, { useState } from 'react'
import axios from 'axios'

const API_BASE = 'http://localhost:5000/api'

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const url = isLogin ? `${API_BASE}/auth/login` : `${API_BASE}/auth/register`
      const response = await axios.post(url, formData)
      
      localStorage.setItem('token', response.data.token)
      onLoginSuccess(response.data.user)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body p-5">
              <h2 className="card-title mb-4 text-center">
                {isLogin ? 'Login' : 'Sign Up'}
              </h2>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                </button>
              </form>

              <div className="text-center">
                <small>
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <a
                    href="#"
                    onClick={() => {
                      setIsLogin(!isLogin)
                      setError('')
                      setFormData({ name: '', email: '', password: '' })
                    }}
                  >
                    {isLogin ? 'Sign Up' : 'Login'}
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
