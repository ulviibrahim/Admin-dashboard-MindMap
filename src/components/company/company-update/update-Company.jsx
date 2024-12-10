import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import {baseUrl} from '../../../utills/constanta.js';
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const updatePartner = ({ isOpen, onClose, id,url}) => {
    
  const [formData, setFormData] = useState({});

  useEffect(()=>{
    axios(`${baseUrl}/${url}/${id}`).then(((res)=>setFormData(res.data.data)))
},[])

console.log(id);
const [errors, setErrors] = useState({
   title: '',
    content: '',
    image: '',
  });

console.log(formData);
const handleInputChange = (e) => {
    const {name, value } = e.target;
    setFormData((prevState) => ({
      ...formData,
      [name]: value,
    }));
  };


const handlecontentChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData((prevState) => ({
      ...formData,
      image: file, // Store the file object
    }));
    console.log(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


       // Validate inputs before sending the request
       if (!validate()) {
        return; // If validation fails, prevent sending the request
      }

    const {title, content, image }= formData;

    // Create a FormData object to handle file uploads
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title',title);
    formDataToSubmit.append('content', content);
    if (content) {
      formDataToSubmit.append('image', image);
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
    if (!formData.title) {
      newErrors.title = 'Title is required.';
    }
    if (!formData.content) {
      newErrors.content = 'content required';
    }
    if (!formData.image) {
      newErrors.image = 'content URL is required.';
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
  <label htmlFor="title" className="block text-lg font-medium">Title:</label>
  <Input
    type="text"
    id="title"
   name="title"
    value={formData.title}
    onChange={handleInputChange}
    className="form-control mt-2 p-2 border rounded"
  />
  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
</div>
<div className="form-group mb-4">
  <label htmlFor="content" className="block text-lg font-medium">Content:</label>
  <Input
    type="text"
    id="content"
   name="content"
    value={formData.content}
    onChange={handleInputChange}
    className="form-control mt-2 p-2 border rounded"
  />
  {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
</div>
        
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          
          <input
            type="file"
            id="image"
           name="image"
            accept="image/*"
           
            onChange={handlecontentChange}
            className="form-control"
          />
          {errors.image && <p className="error">{errors.image}</p>}
          {formData.image && (
              <div>
                <img 
                  src={formData.image.url} 
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




export default updatePartner