import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './Context/AuthContext.tsx'
import { OrderProvider } from './Context/OrderContext.tsx'
import { CartProvider } from './Features/Cart/index.ts'
import { MenuProvider } from './Context/MenuContext.tsx'

console.log('🏁 main.tsx Loading');

const root = createRoot(document.getElementById('root')!);
console.log('🏗️ Root Created, rendering App...');

root.render(
  <StrictMode>
    <AuthProvider>
      <MenuProvider>
      <OrderProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </OrderProvider>
      </MenuProvider>
    </AuthProvider>
  </StrictMode>,
)
