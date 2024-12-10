import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import {baseUrl} from '../../utills/constanta.js';
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';


// interface PopupFormProps {
//   isOpen: boolean;
//   onClose: () => void;
//   id?: string; // Assuming we may want to edit an existing resource by ID
// }

const PopupForm = ({ isOpen, onClose, id,url}) => {
    
  const [formData, setFormData] = useState({});

  useEffect(()=>{
    axios(`${baseUrl}/${url}/${id}`).then(((res)=>setFormData(res.data.data)))
},[])

const [errors, setErrors] = useState({
    title: '',
    content: '',
    description: '',
    imageUrl: '',
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

    const { title, content, description, image }= formData;

    // Create a FormData object to handle file uploads
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', title);
    formDataToSubmit.append('content', content);
    formDataToSubmit.append('description', description);
    if (image) {
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
    if (!formData.content||formData.content.length<10) {
      newErrors.content = 'Content is not match.';
    }
    if (!formData.description||formData.description.length<10) {
      newErrors.description = 'Content is not match.';
    }
    if (!formData.image) {
      newErrors.imageUrl = 'Image URL is required.';
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
  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
</div>


        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <Input
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="form-control"
          />
          {errors.content && <p className="error">{errors.content}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control"
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
           
            onChange={handleImageChange}
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

export default PopupForm;
