import {createContext,useState,useEffect} from "react";
import { getUser } from "../api/Api";
import { useQuery } from "@tanstack/react-query";

export const StoreContext=createContext(null)

const StoreContextProvider=(props)=>{

    const Url_Host="https://hotel-booking-backend-gne4.onrender.com"
    const [Token,setToken]= useState("")
    const [checkIn, setCheckIn] = useState(sessionStorage.getItem("checkIn") || "");
    const [checkOut, setCheckOut] = useState(sessionStorage.getItem("checkOut") || "");
    const [guests, setGuests] = useState(sessionStorage.getItem("guests") || 1);

    const {data:User}=useQuery({
        queryKey:["user"],
        queryFn:getUser,
        enabled: !!localStorage.getItem("token"),
    })

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    },[])

    const contextValue={
        Url_Host,
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
