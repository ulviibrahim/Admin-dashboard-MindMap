import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import {baseUrl} from '../../../utills/constanta.js';
import { Input } from '@mui/material';



const PopupForm = ({ isOpen, onClose, id,componentUrl}) => {
    
  const [logo, setLogo] = useState({});

  useEffect(()=>{
    axios(`${baseUrl}/${componentUrl}`).then(((res)=>setLogo(res.data.data.logo)))
},[])


console.log(id);
const [errors, setErrors] = useState({
    logo: ''
  });

const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setLogo((prevState) => ({
      ...logo,
      logo: file, // Store the file object
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();


       // Validate inputs before sending the request
       if (!validate()) {
        return; // If validation fails, prevent sending the request
      }

    // const {  logo }= formData;

    // Create a FormData object to handle file uploads
    const formDataToSubmit = new FormData();
    if (logo) {
      formDataToSubmit.append('logo', logo);
    }

    try {
      // Send the PUT request
      
      const response = await axios.post(`${baseUrl}/logos`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
       
      });

      console.log('Form submitted successfully:', response.data);
      onClose(); // Close the popup after submission
    } catch (error) {
      console.error('Error submitting form:', formData.id);
    }
  };

  if (!isOpen) return null; // Render nothing if the popup is closed

  const validate = () => {
 
    if (!logo) {
      errors.logo = 'Image URL is required.';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="popup">
      <div className="service-form">
      <h2> {componentUrl}</h2>
        <button type='button' className="btn-submit" onClick={onClose}>Close</button>
       
      <form onSubmit={handleSubmit}>
      
        
        <div className="form-group">
          <label htmlFor="logo">Logo:</label>
          
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
           
            onChange={handleImageChange}
            className="form-control"
          />
          {errors.logo && <p className="error">{errors.logo}</p>}
          {logo && (
              <div>
                <img 
                  src={logo.url} 
                  alt="preview" 
                  style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} 
                />
              </div>
            )}
        </div>

        <button type="submit"  className="btn-submit">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default PopupForm;
