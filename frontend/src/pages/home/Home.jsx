import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import OurHotels from "../../components/ourHotels/OurHotels"
import Footer from "../../components/footer/Footer"

const Home = () => {
  return (
    <div className="Home">
      <Navbar/>
      <Header/>
      <OurHotels/>
      <Footer/>
    </div>
  )
}

export default Home
