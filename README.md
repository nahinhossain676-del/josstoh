# Joss Toh — Next.js E-Commerce

Premium streetwear store built with **Next.js 14**, **React 18**, and **Tailwind CSS**.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Changes from original

- ✅ Removed "Classic Hoodie" and "Premium Jacket" (no blank product boxes)
- ✅ Removed color selection section from product cards and cart
- ✅ Sizes updated to: **M, L, XL, XXL**
- ✅ Racing Rider T-Shirt & Urban Street Tee: **৳550** (was ৳899)
- ✅ Oversized Tee & Paisley Classic Tee: **৳499** (was ৳899)
- ✅ Delivery: Inside Dhaka **৳80**, Outside Dhaka **৳120** (fixed from ৳130)
- ✅ bKash number corrected to **01316862386**
- ✅ WhatsApp seller notifications → **01340885012**
- ✅ Migrated from Vite/React to **Next.js 14 App Router**

## Project Structure

```
app/
  layout.tsx       — Root layout
  page.tsx         — Entry point
  globals.css      — Global styles + Tailwind
components/
  AppClient.tsx    — Main app state & logic
  Navbar.tsx
  TopBar.tsx
  Hero.tsx
  ProductsSection.tsx
  ProductCard.tsx
  CartDrawer.tsx
  CheckoutPage.tsx
  InvoicePage.tsx
  Footer.tsx
  AuthModal.tsx
data/
  products.ts      — Product catalog
public/
  Logo1.png
  Product_1.jpeg … Product_4.jpeg
```
