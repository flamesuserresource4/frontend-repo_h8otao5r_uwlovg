import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function MenuGrid({ onAdd }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/products`)
        if (res.ok) {
          const data = await res.json()
          setItems(data)
        } else {
          setItems([])
        }
      } catch (e) {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const seed = async () => {
    try {
      await fetch(`${baseUrl}/api/seed`, { method: 'POST' })
      const res = await fetch(`${baseUrl}/api/products`)
      if (res.ok) setItems(await res.json())
    } catch {}
  }

  if (loading) return <p className="text-center text-gray-500">Memuat menu...</p>

  if (!items.length) {
    return (
      <div className="text-center text-gray-600">
        <p>Belum ada menu. Klik tombol di bawah untuk isi contoh.</p>
        <button onClick={seed} className="mt-3 px-4 py-2 rounded bg-gray-800 text-white">Isi Contoh Menu</button>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((it, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
          {it.image && (
            <img src={it.image} alt={it.title} className="h-40 w-full object-cover" />
          )}
          <div className="p-4">
            <h3 className="font-semibold text-lg">{it.title}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{it.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-bold text-pink-600">Rp {(it.price * 15000).toLocaleString('id-ID')}</span>
              <button onClick={() => onAdd(it)} className="px-3 py-1.5 rounded bg-pink-600 text-white text-sm hover:bg-pink-700">Tambah</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
