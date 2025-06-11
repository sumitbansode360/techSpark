import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import NotFound from './pages/NotFound.jsx'

const route = createBrowserRouter([

  {
    path : '/',
    element : <App /> ,
    errorElement : <NotFound />
  },
    {
    path : '/login',
    element : <Login />,
    errorElement : <NotFound />
  },
  {
    path : '/register',
    element : <Register />,
    errorElement : <NotFound />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
