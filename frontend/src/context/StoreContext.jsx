import {createContext,useState,useEffect} from "react";
import axios from 'axios'

export const StoreContext=createContext(null)

const StoreContextProvider=(props)=>{
    const Url_Host="https://hotel-booking-backend-gne4.onrender.com"

    const [Token,setToken]= useState("")
    const [Room_list,setRoom_list]=useState([])
    const [checkIn, setCheckIn] = useState(sessionStorage.getItem("checkIn") || "");
    const [checkOut, setCheckOut] = useState(sessionStorage.getItem("checkOut") || "");
    const [guests, setGuests] = useState(sessionStorage.getItem("guests") || 1);
    const [User,setUser]=useState({})

    const Url_getRoom=`${Url_Host}/rooms/getRooms`
    const Url_getUser=`${Url_Host}/user/getUser`

    const fetchData=async()=>{
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            const response_rooms=await axios.get(Url_getRoom)
            setRoom_list(response_rooms.data.data)
            if (token) {
                const response_user = await axios.get(Url_getUser, config);
                setUser(response_user.data.data);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        async function loadData() {
            await fetchData()
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])
    const contextValue={
        Url_Host,
        Room_list,
        Token,setToken,
        User,
        checkIn,setCheckIn,
        checkOut,setCheckOut,
        guests,setGuests
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider
