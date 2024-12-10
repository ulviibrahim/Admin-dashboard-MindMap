import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import {baseUrl} from '../../../utills/constanta.js';
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const PopupForm = ({ isOpen, onClose, id,url}) => {
    
  const [formData, setFormData] = useState({});

  useEffect(()=>{
    axios(`${baseUrl}/${url}/${id}`).then(((res)=>setFormData(res.data.data)))
},[])

const [errors, setErrors] = useState({
    name: '',
    website: '',
    partnerLogo: '',
  });


const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...formData,
      [name]: value,
    }));
  };


const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData((prevState) => ({
      ...formData,
      partnerLogo: file, // Store the file object
    }));
    console.log(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


       // Validate inputs before sending the request
       if (!validate()) {
        return; // If validation fails, prevent sending the request
      }

    const { name, website, partnerLogo }= formData;

    // Create a FormData object to handle file uploads
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('name', name);
    formDataToSubmit.append('website', website);
    if (partnerLogo) {
      formDataToSubmit.append('partnerLogo', partnerLogo);
    }

    try {
      // Send the PUT request
      
      const response = await axios.put(`${baseUrl}/${url}/${id}`, formDataToSubmit, {
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
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'name is required.';
    }
    if (!formData.website) {
      newErrors.content = 'website is not match.';
    }
    if (!formData.partnerLogo) {
      newErrors.partnerLogo = 'Image URL is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="popup">
      <div className="service-form">
      <h2>Update {url}</h2>
        <button type='button' className="btn-submit" onClick={onClose}>Close</button>
       
      <form onSubmit={handleSubmit}>
      <div className="form-group mb-4">
  <label htmlFor="name" className="block text-lg font-medium">Name:</label>
  <Input
    type="text"
    id="name"
    name="name"
    value={formData.name}
    onChange={handleInputChange}
    className="form-control mt-2 p-2 border rounded"
  />
  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
</div>


        <div className="form-group">
          <label htmlFor="content">website:</label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="form-control"
          />
          {errors.content && <p className="error">{errors.content}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          
          <input
            type="file"
            id="partnerLogo"
            name="partnerLogo"
            accept="image/*"
           
            onChange={handleImageChange}
            className="form-control"
          />
          {errors.partnerLogo && <p className="error">{errors.partnerLogo}</p>}
       
          {formData.partnerLogo && (
              <div>
                <img 
                  src={formData.partnerLogo.url} 
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
