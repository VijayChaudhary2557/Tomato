import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SidebarProvider } from './Context/SidebarContext.jsx'

createRoot(document.getElementById('root')).render(
    <SidebarProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </SidebarProvider>
)
