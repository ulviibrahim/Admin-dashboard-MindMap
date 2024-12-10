import React, {  useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../../../utills/constanta.js';
import { Input } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreatePartner = ({ isOpen, onClose,url}) => {

    const navigate =useNavigate()
  // Initial form state
  const [formData, setFormData] = useState({
    // id: new Date().toLocaleDateString()+new Date().getMilliseconds(),
    name: '',
    website: '',
    partnerLogo: null
  });


  // Error messages
  const [errors, setErrors] = useState({
    name: '',
    website: '',
    partnerLogoUrl: '',
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
  const handlepartnerLogoChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData((prevState) => ({
      ...prevState,
      partnerLogo: file, // Store the file object
    }));
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'name is required.';
    }
   
    
    if (!formData.website) {
      newErrors.website = 'Content is not match.';
    }
    if (!formData.partnerLogo) {
      newErrors.partnerLogoUrl = 'partnerLogo URL is required.';
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
         
            const response = await axios.post(`${baseUrl}/${url}`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                  },
              });
              
          console.log(`${url}'posted successfully:`, response);
          onClose()
          navigate(`/${url}/`)
        
         
          // Reset the form after successful submission
          setFormData({
            id: '',
            name: '',
            website: '',
            partnerLogo: null
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
            <label htmlFor="name" className="block text-lg font-medium">name:</label>
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
          <label htmlFor="website">website:</label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="form-control"
          />
          {errors.website && <p className="error">{errors.website}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="partnerLogo">partnerLogo:</label>
          <Input 
            type="file"
            id="partnerLogo"
            name="partnerLogo"
            accept="image/*"
            onChange={handlepartnerLogoChange}
            className="form-control"
          />
          {errors.partnerLogo && <p className="error">{errors.partnerLogo}</p>}
        </div>

        <button type="submit"  className="btn-submit">Submit</button>
      </form>
      </div></div>
  );
};


export default CreatePartner