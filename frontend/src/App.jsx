import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './pages/home/Home'
import HotelswrtPlaces from './pages/hotelswrtPlaces/HotelswrtPlaces'
import HotelBook from './pages/hotelBook/HotelBook'
import SignIn from './components/signin/SignIn'
import SignUp from './components/signup/SignUp'
import Payments from './pages/payments/Payments'
import About from './pages/about/About'
import Contact from './pages/contact/Contact'

function App() {

  const router=createBrowserRouter([
    {path:"/", element: <Home/> },
    {path:"/SignIn", element:<SignIn/>},
    {path:"/SignUp",element:<SignUp/>},
    {path:"/:place_name",element:<HotelswrtPlaces/>},
    {path:"/:place_name/:hotel_location/Book",element:<HotelBook/>},
    {path:"/:place_name/:hotel_location/Book/:room_type/payment",element:<Payments/>},
    {path:"/About",element:<About/>},
    {path:"/Contact",element:<Contact/>}
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App
