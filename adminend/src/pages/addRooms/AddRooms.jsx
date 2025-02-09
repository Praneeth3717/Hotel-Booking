import './AddRooms.css'
import { useState } from 'react';
import uploadImg from '../../assets/Uploadimg.jpg'
import axios from 'axios'

const AddRooms = () => {
    const Add_Url="https://hotel-booking-backend-gne4.onrender.com/rooms/addRoom"
    const [image,setimage]=useState(false)
    const [formData, setFormData] = useState({
        room_type: "",
        description: "",
        price: "",
        rating: "",
        rooms_left: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const RoomData=new FormData();
        RoomData.append("room_type",formData.room_type)
        RoomData.append("description",formData.description)
        RoomData.append("price",Number(formData.price))
        RoomData.append("rating",Number(formData.rating))
        RoomData.append("rooms_left",Number(formData.rooms_left))
        RoomData.append("image",image)

        const response=await axios.post(Add_Url,RoomData)
        if(response.data.success){
            setMessage("Room added successfully!");
            setFormData({
                room_type: "",
                description: "",
                price: "",
                rating: "",
                rooms_left: "",
            });
            setimage(false)
        }else {
            setMessage("Error adding room.");
        }
    };
  return (
    <div className="add-room-container">
        <h2 className="form-title">Add a New Room</h2>
        {message && <p className="message">{message}</p>}
        <form className="add-room-form" onSubmit={handleSubmit}>
            <div className='add-image'>
                <p>Upload Image</p>
                <label htmlFor='image'>
                    <img src={image?URL.createObjectURL(image):uploadImg} alt="" />
                </label>
                <input onChange={(e)=>setimage(e.target.files[0])} type="file" id="image" hidden required/>
            </div>
            <label>Room Type:</label>
            <input type="text" name="room_type" value={formData.room_type} onChange={handleChange} required />

            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required />

            <label>Price:</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />

            <label>Rating (1-5):</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} min="1" max="5" required />

            <label>Rooms Left:</label>
            <input type="number" name="rooms_left" value={formData.rooms_left} onChange={handleChange} required />

            <button type="submit" className="submit-button">Add Room</button>
        </form>
    </div>
  )
}

export default AddRooms
