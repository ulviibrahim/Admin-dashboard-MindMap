import React, {  useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utills/constanta.js';
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateAbout = ({ isOpen, onClose,componentUrl}) => {

    const navigate =useNavigate()
  // Initial form state
  const [formData, setFormData] = useState({
    // id: new Date().toLocaleDateString()+new Date().getMilliseconds(),
    image: null
  });


  // Error messages
  const [errors, setErrors] = useState({
    
    imageUrl: '',
  });


//  const submitForm=()=>{
// useEffect(()=>{

// })
//  }
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};
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
   
    if (!formData.image) {
      newErrors.imageUrl = 'Image URL is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission

    const HandleSubmit =  async(e) => {
        e.preventDefault();
        
        // Validate inputs before sending the request
        if (!validate()) {
          return; // If validation fails, prevent sending the request
        }
    
     
    
        try {
          // Send POST request with Axios
         
            const response = await axios.post(`${baseUrl}/${componentUrl}`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                  },
              });
              
          console.log(`${componentUrl}'posted successfully:`, response);
          onClose()
          navigate(`/${componentUrl}/`)
        
         
          // Reset the form after successful submission
          setFormData({
            id: '',
          
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
      <h2 className='text-yellow-400'>Create a New {componentUrl}</h2>
      <button type='button' className="btn-submit" onClick={onClose}>Close</button>

      <form onSubmit={HandleSubmit}>
     

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

export default CreateAbout;
