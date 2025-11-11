import { useMemo } from 'react'

export default function Cart({ items, onRemove, onCheckout }) {
  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items])

  return (
    <div className="bg-white rounded-xl shadow p-4 sticky top-6">
      <h3 className="text-lg font-semibold mb-3">Keranjang</h3>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada item.</p>
      ) : (
        <div className="space-y-3">
          {items.map((it, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">{it.title}</p>
                <p className="text-gray-500">x{it.qty}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Rp {(it.price * 15000 * it.qty).toLocaleString('id-ID')}</p>
                <button onClick={() => onRemove(idx)} className="text-red-600 hover:underline">Hapus</button>
              </div>
            </div>
          ))}
          <div className="pt-3 border-t flex items-center justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-pink-600">Rp {(total * 15000).toLocaleString('id-ID')}</span>
          </div>
          <button onClick={onCheckout} className="w-full mt-2 px-4 py-2 rounded bg-pink-600 text-white font-semibold hover:bg-pink-700">Checkout</button>
        </div>
      )}
    </div>
  )
}
