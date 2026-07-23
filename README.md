# Gearline — Cricket & Football Gear Catalog

A small React product catalog built with Vite. Fetches real cricket/football
equipment from the DummyJSON API, renders it with a custom stadium-night
theme, and lets you add new gear via a POST request.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Where each concept lives

| Concept | File |
|---|---|
| `useState` for fetched data | `src/hooks/useProducts.js` (`products`, `isLoading`, `error`) |
| `useEffect` on first render | `src/hooks/useProducts.js` — loads `GET https://dummyjson.com/products/category/sports-accessories` on mount |
| Custom hook | `src/hooks/useProducts.js` — `useProducts()` |
| Component composition + props | `App.jsx` → `ProductGrid` → `ProductCard`, each card gets `id/title/price/description/category/thumbnail` as props |
| Rendering a list with `map` + `key` | `src/components/ProductGrid.jsx` |
| Loading indicator | `src/components/Loader.jsx` |
| Controlled form / user input | `src/components/AddProductForm.jsx` |
| POST request | `addProduct()` in `src/hooks/useProducts.js` — `POST https://dummyjson.com/products/add` |
| Custom CSS / animation | `src/App.css`, `src/index.css` |

## Notes on the data

DummyJSON's generic `/products` endpoint returns phones, skincare, etc. — not
sports gear — so this app calls its `sports-accessories` category instead,
which actually contains cricket and football equipment (helmets, bats,
footballs, gloves...). That keeps the fetched data honest to the "cricket and
football gear" brief while still hitting a real DummyJSON products endpoint.

DummyJSON's `/products/add` is a mock endpoint — it returns a fake "created"
response but doesn't persist anything server-side. So after a successful
POST, the new item is added to local React state so it visibly appears in
the catalog (with a "Just Added" badge), which is the intended student-project
behavior.

## Folder structure

```
sports-gear-catalog/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── hooks/
    │   └── useProducts.js
    └── components/
        ├── Header.jsx
        ├── Loader.jsx
        ├── ProductGrid.jsx
        ├── ProductCard.jsx
        ├── AddProductForm.jsx
        ├── SeamDivider.jsx
        └── SportIcons.jsx
```
