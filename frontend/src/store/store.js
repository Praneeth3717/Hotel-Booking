import {create} from 'zustand'

const useAuthStore=create((set)=>({

    token:localStorage.getItem("token") || "",

    setToken:(newToken)=>{
        localStorage.setItem("token",newToken)
        set({token:newToken})
    },

    clearToken:()=>{
        localStorage.removeItem("token")
        set({token:""})
    }

}))

// const useOrderStore=create((set)=>({
//     orders:[],
//     addOrder:(order)=>set((state)=>({
//         orders:[...state.orders,order]
//     }))
// }))

const useBookingStore=create((set)=>({

    CheckIn: sessionStorage.getItem("CheckIn") || "",
    CheckOut: sessionStorage.getItem("CheckOut") || "",
    Guests: parseInt(sessionStorage.getItem("TotalGuests")) || 1,

    setCheckIn:(date)=>{
        sessionStorage.setItem("CheckIn",date)
        set({CheckIn:date})
    },

    setCheckOut:(date)=>{
        sessionStorage.setItem("CheckOut",date)
        set({CheckOut:date})
    },

    setTotalGuests:(number)=>{
        sessionStorage.setItem("TotalGuests",number)
        set({Guests:parseInt(number)})
    }

}))


export {useAuthStore,useBookingStore}