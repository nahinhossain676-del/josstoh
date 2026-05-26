'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Check } from 'lucide-react';
import type { Product } from '@/data/products';

interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

function StockBadge({ qty }: { qty: number }) {
  if (qty === 0) return <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-red-900/60 text-red-400 rounded-full">Out of Stock</span>;
  if (qty <= 5) return <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-amber-900/60 text-amber-400 rounded-full">Limited</span>;
  return <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-green-900/60 text-green-400 rounded-full">In Stock</span>;
}

export default function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product, size: string) => void }) {
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [error, setError] = useState('');

  function handleAdd() {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    setError('');
    onAddToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 group flex flex-col">
      <div className="relative overflow-hidden aspect-[4/5]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-amber-400 text-zinc-950 text-[10px] font-black px-2 py-0.5 tracking-wider">
            -{discount}%
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <StockBadge qty={product.stockQty} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-900 to-transparent" />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="mb-1">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-amber-400">{product.category}</span>
        </div>
        <h3 className="text-white font-bold text-base mb-1 leading-tight">{product.name}</h3>
        <p className="text-zinc-500 text-xs mb-3 leading-relaxed flex-1">{product.description}</p>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-white font-black text-xl">৳{product.price}</span>
          <span className="text-zinc-600 text-sm line-through">৳{product.originalPrice}</span>
        </div>

        <div className="mb-4">
          <p className="text-zinc-500 text-[10px] uppercase tracking-widest mb-1.5">Size</p>
          <div className="flex gap-1.5 flex-wrap">
            {product.sizes.map(s => (
              <button
                key={s}
                onClick={() => { setSelectedSize(s); setError(''); }}
                disabled={product.stockQty === 0}
                className={`px-3 h-9 text-xs font-semibold border transition-all duration-150 ${
                  selectedSize === s
                    ? 'bg-amber-400 border-amber-400 text-zinc-950'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-red-400 text-xs mb-2">{error}</p>}

        <button
          onClick={handleAdd}
          disabled={product.stockQty === 0}
          className={`w-full py-3 text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 ${
            product.stockQty === 0
              ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              : added
              ? 'bg-green-500 text-white'
              : 'bg-amber-400 hover:bg-amber-300 text-zinc-950'
          }`}
        >
          {product.stockQty === 0 ? 'Out of Stock' : added ? <><Check size={16} /> Added</> : <><ShoppingBag size={16} /> Add to Cart</>}
        </button>
      </div>
    </div>
  );
}
