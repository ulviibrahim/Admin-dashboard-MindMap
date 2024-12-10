import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {baseUrl} from "../../../utills/constanta.js"
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import PopupForm from '../logo-update/logo-update-form.jsx';
import Form from '../Logo-Form/logo-form.jsx';
import axios from 'axios'


 const  Index  =({SectionName,componentUrl}) =>{

  
// const navigate=useNavigate()
const [data,setData]=useState([])

// const [message,setMessage]=useState(false)


useEffect(() => {
    axios(`${baseUrl}/${componentUrl}`).then((res) => setData(res.data.data.logo));
}, []);
console.log(data);
const [isPopupOpen, setPopupOpen] = useState(false);
const [isformPopupOpen, setformPopupOpen] = useState(false);
  const [editId, setEditId] = useState(null); // Optional: ID for editing existing resource

  const serviceTable=document.querySelector('.service')

  function openPopup (id) {
    setEditId(id || null); 
    setPopupOpen(true);
     serviceTable?.classList.add('blur')
  };
  function openformPopup () {
    setformPopupOpen(true);
     serviceTable?.classList.add('blur')
  };
  const closePopup = () => {
    setPopupOpen(false);
    setformPopupOpen(false)
    serviceTable?.classList.remove('blur')
  };

// const deleteService=  () => {
//   Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//           try {
//             axios(`${baseUrl}/${componentUrl}`).then((response=>{
//               axios.delete(`${baseUrl}/${componentUrl}/${response.data.data.id}`)
//             }))
               
//               // console.log(`${componentUrl} with ID ${serviceId} deleted successfully.`);
              
//               navigate('/dashboard/')
//               // window.location.reload()
//             } catch (error) {
              
    
//             }
//         Swal.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success",
         
//         });
//       }
//     });

// }

return (
    <div className="container">
   <button className='create-button' onClick={() => openformPopup()}>Create</button>

   <div className="service">
   <h1>{SectionName} Table</h1>
 <table className="service-table">
      <thead>
        <tr>
          <th>№</th>
         
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {

            <tr  key={data.id}>
              <td>1</td>
              
            
            <td><img src={data.url} alt="" /></td>
            <td>
            {/* <ButtonGroup aria-label=" button group"> */}
            {/* <Tooltip title="Delete" size="lg"> */}
           <button  className='update-button' onClick={() => openPopup(data.id)}>Edit</button> {/* Example of editing */}
      
      

   </td>

        </tr>
         
      }
       
        
    </tbody>
</table>
   </div>
{
isPopupOpen&& (
 <PopupForm isOpen={isPopupOpen} onClose={closePopup} id={editId} componentUrl={componentUrl} />)
}
{ 
isformPopupOpen&& (
    <Form isOpen={isformPopupOpen} onClose={closePopup} componentUrl={componentUrl} />)
 }
</div>
  );
}
export default Index