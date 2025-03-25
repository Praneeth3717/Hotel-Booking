import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { lazy,Suspense } from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import StoreContextProvider from './context/StoreContext.jsx'

import Home from './pages/home/Home'
import SignIn from './components/signin/SignIn'
import SignUp from './components/signup/SignUp'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'
import Loading from './components/loading/Loading'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'

const HotelswrtPlaces=lazy(()=>import('./pages/hotelswrtPlaces/HotelswrtPlaces'))
const HotelBook=lazy(()=>import('./pages/hotelBook/HotelBook'))
const Payments=lazy(()=>import('./pages/payments/Payments'))

function App() {

  const router=createBrowserRouter([
    {path:"/", element: <Home/> },
    {path:"/SignIn", element:<SignIn/>},
    {path:"/SignUp",element:<SignUp/>},
    {path:"/:place_name",element:(
      <>
        <Navbar/>
        <Suspense fallback={<Loading/>}>
          <HotelswrtPlaces/>
        </Suspense>
        <Footer/>
      </>
    )},
    {path:"/:place_name/:hotel_location/Book",element:(
      <>
      <Navbar/>
      <Suspense fallback={<Loading/>}>
        <HotelBook/>
      </Suspense>
      <Footer/>
    </>
    )},
    {path:"/:place_name/:hotel_location/Book/:room_type/payment",element:(
      <>
      <Navbar/>
      <Suspense fallback={<Loading/>}>
        <Payments/>
      </Suspense>
      <Footer/>
    </>
    )},
    {path:"/About",element:<About/>},
    {path:"/Contact",element:<Contact/>},
  ])

  const queryClient=new QueryClient();
  return (
    <QueryClientProvider client={queryClient}> 
      <StoreContextProvider>
        <RouterProvider router={router}/>
      </StoreContextProvider>     
    </QueryClientProvider>
  )
}

export default App
