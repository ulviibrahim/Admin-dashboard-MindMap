import React, {  useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utills/constanta.js';
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateService = ({ isOpen, onClose,url}) => {

    const navigate =useNavigate()
  // Initial form state
  const [formData, setFormData] = useState({
    // id: new Date().toLocaleDateString()+new Date().getMilliseconds(),
    title: '',
    link: '',
    image: null
  });


  // Error messages
  const [errors, setErrors] = useState({
    title: '',
    link: '',
    imageUrl: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
//  const submitForm=()=>{
// useEffect(()=>{

// })
//  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData((prevState) => ({
      ...prevState,
      image: file, // Store the file object
    }));
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.title) {
      newErrors.title = 'Title is required.';
    }
    if (!formData.link) {
      newErrors.link = 'link is not match.';
    }
   
    if (!formData.image) {
      newErrors.imageUrl = 'Image URL is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission

    const HandleSubmit =  async(e) => {
      console.log(formData);
        e.preventDefault();
        
        // Validate inputs before sending the request
        if (!validate()) {
          return; // If validation fails, prevent sending the request
        }
    
     
    
        try {
          // Send POST request with Axios
         
            const response = await axios.post(`${baseUrl}/${url}`, formData,{
                headers: {
                    'content-Type': 'multipart/form-data', // Important for file uploads
                  },
              });
              
          console.log(`${url}'posted successfully:`, response);
          onClose()
          navigate(`/${url}/`)
        
         
          // Reset the form after successful submission
          setFormData({
            id: '',
            title: '',
            link: '',
            
            image: null
          });
        } catch (error) {
          console.error('There was an error posting the service:', error);
        }
      };
      if (!isOpen) return null; 


  return (
    <div className="popup">
    <div className="service-form">
      <h2 className='text-yellow-400'>Create a New {url}</h2>
      <button type='button' className="btn-submit" onClick={onClose}>Close</button>

      <form onSubmit={HandleSubmit}>
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
          <label htmlFor="link">link:</label>
          <Input
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            className="form-control"
          />
          {errors.link && <p className="error">{errors.link}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <Input 
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control"
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </div>

        <button type="submit"  className="btn-submit">Submit</button>
      </form>
      </div></div>
  );
};

export default CreateService;
