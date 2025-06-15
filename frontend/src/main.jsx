import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import NotFound from './pages/NotFound.jsx'
import EventDetail from './pages/EventDetail.jsx'
import EventCreate from './pages/EventCreate.jsx'
import EventUpdate from './pages/EventUpdate.jsx'
import EventDelete from './pages/EventDelete.jsx'

const route = createBrowserRouter([

  {
    path : '/',
    element : <ProtectedRoute><App /></ProtectedRoute> ,
    errorElement : <NotFound />
  },
  {
    path : '/event/:id',
    element : <ProtectedRoute><EventDetail /></ProtectedRoute> ,
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
  {
    path : '/event/create',
    element : <EventCreate />,
    errorElement : <NotFound />
  },
  {
    path : '/event/update/:id',
    element : <ProtectedRoute><EventUpdate /></ProtectedRoute> ,
    errorElement : <NotFound />
  },
  {
    path : '/event/delete/:id',
    element : <ProtectedRoute><EventDelete /></ProtectedRoute> ,
    errorElement : <NotFound />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}/>
  </StrictMode>,
)
