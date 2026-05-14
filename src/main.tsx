import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Footer from './footer.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-screen flex flex-col w-full">
      <main className="flex-grow">
        <App />
      </main>
        <Footer />
    </div>
  </React.StrictMode>,
)
