import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './pages/home/Home';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import HotelswrtPlaces from './pages/hotelswrtPlaces/HotelswrtPlaces';
import HotelBook from './pages/hotelBook/HotelBook';
import Payments from './pages/payments/Payments';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/SignIn', element: <SignIn /> },
    { path: '/SignUp', element: <SignUp /> },
    {
      path: '/:place_name',
      element: (
        <>
          <Navbar />
          <HotelswrtPlaces />
          <Footer />
        </>
      ),
    },
    {
      path: '/:place_name/:hotel_location/Book',
      element: (
        <>
          <Navbar />
          <HotelBook />
          <Footer />
        </>
      ),
    },
    {
      path: '/:place_name/:hotel_location/Book/:room_type/payment',
      element: (
        <>
          <Navbar />
          <Payments />
          <Footer />
        </>
      ),
    },
    { path: '/About', element: <About /> },
    { path: '/Contact', element: <Contact /> },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

