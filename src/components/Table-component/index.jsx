import React,{useEffect, useState} from 'react';

import { useNavigate } from 'react-router-dom';
import {baseUrl} from "../../utills/constanta.js"
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import PopupForm from '../Popup-form/index.jsx';
import Form from '../Form/index.jsx';


import axios from 'axios'


 const  Index=({SectionName,url}) =>{

  
const navigate=useNavigate()
const [data,setData]=useState([])

// const [message,setMessage]=useState(false)


useEffect(() => {
    axios(`${baseUrl}/${url}`).then((res) => setData(res.data.data));
}, []);

const [isPopupOpen, setPopupOpen] = useState(false);
const [isformPopupOpen, setformPopupOpen] = useState(false);
  const [editId, setEditId] = useState(null); // Optional: ID for editing existing resource

  const serviceTable=document.querySelector('.service')

  function openPopup (id) {
    setEditId(id || null); 
    setPopupOpen(true);
     console.log();
     serviceTable?.classList.add('blur')
  };
  function openformPopup () {
    setformPopupOpen(true);
     console.log();
     serviceTable?.classList.add('blur')
  };
  const closePopup = () => {
    setPopupOpen(false);
    setformPopupOpen(false)
    serviceTable?.classList.remove('blur')
  };

const deleteService=  (serviceId) => {
  Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
          try {
                axios.delete(`${baseUrl}/${url}/${serviceId}/`);
              console.log(`${url} with ID ${serviceId} deleted successfully.`);
              
              navigate('/dashboard/')
              // window.location.reload()
            } catch (error) {
              
    
            }
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
         
        });
      }
    });

}

return (
    <div className="container">
   <button className='create-button' onClick={() => openformPopup()}>Create</button>

   <div className="service">
   <h1>{SectionName} Table</h1>
 <table className="service-table">
      <thead>
        <tr>
          <th>№</th>
          <th>Title</th>
          <th>Description</th>
          <th>Content</th>
          <th>Image</th>
          <th>Actions</th>

        </tr>
      </thead>
      <tbody>
      {
        data.map((item,index)=>{
          return(

            <tr  key={item.id}>
              <td>{index+1}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td>{item.content}</td>
            <td><img src={item.image.url} alt="" /></td>
            <td>
            {/* <ButtonGroup aria-label=" button group"> */}
            {/* <Tooltip title="Delete" size="lg"> */}
            <button onClick={()=>deleteService(item.id)} className='delete-button cursor-pointer font-semibold text-red-600' type='button'>Delete</button>
           <button  className='update-button' onClick={() => openPopup(item.id)}>Edit</button> {/* Example of editing */}
      
      

   </td>

        </tr>
          )
        })
      }
       
        
    </tbody>
</table>
   </div>
{
isPopupOpen&& (
 <PopupForm isOpen={isPopupOpen} onClose={closePopup} id={editId} url={url} />)
}
{ 
isformPopupOpen&& (
    <Form isOpen={isformPopupOpen} onClose={closePopup} url={url} />)
 }
</div>
  );
}
export default Index