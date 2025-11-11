import { useState } from 'react'
import Hero from './components/Hero'
import MenuGrid from './components/MenuGrid'
import Cart from './components/Cart'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function App() {
  const [showMenu, setShowMenu] = useState(false)
  const [cart, setCart] = useState([])

  const addToCart = (item) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.title === item.title)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 }
        return copy
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const removeFromCart = (i) => {
    setCart((prev) => prev.filter((_, idx) => idx !== i))
  }

  const checkout = async () => {
    if (cart.length === 0) return
    const payload = {
      customer_name: 'Tamu',
      customer_email: 'tamu@example.com',
      customer_phone: '',
      address: 'Pickup',
      notes: 'Dari landing page demo',
      items: cart.map((c) => ({
        product_id: '',
        title: c.title,
        price: c.price,
        quantity: c.qty,
      })),
    }
    try {
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        alert(`Pesanan terkirim! Total: Rp ${(data.total * 15000).toLocaleString('id-ID')}`)
        setCart([])
      } else {
        alert('Gagal membuat pesanan')
      }
    } catch (e) {
      alert('Gagal terhubung ke server')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-amber-50 to-pink-100">
      <nav className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍱</span>
            <span className="font-bold text-gray-800">Chibi Bento</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/test" className="text-sm text-gray-600 hover:text-gray-900">Status</a>
            <button onClick={() => setShowMenu(true)} className="px-3 py-1.5 rounded bg-pink-600 text-white text-sm">Pesan</button>
          </div>
        </div>
      </nav>

      {!showMenu ? (
        <Hero onExplore={() => setShowMenu(true)} />
      ) : (
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Menu Rekomendasi</h2>
              <MenuGrid onAdd={addToCart} />
            </div>
            <div>
              <Cart items={cart} onRemove={removeFromCart} onCheckout={checkout} />
            </div>
          </div>
        </div>
      )}

      <footer className="mt-20 border-t">
        <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-gray-500 flex flex-wrap items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Chibi Bento. Semua hak dilindungi.</p>
          <p>Inspirasi vibes chibi yang imut untuk pengalaman belanja yang fun.</p>
        </div>
      </footer>
    </div>
  )
}
