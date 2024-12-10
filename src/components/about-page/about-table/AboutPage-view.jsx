import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from "../../../utills/constanta.js";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import PopupForm from '../about-update/update-About.jsx';
import Form from '../about-create/AboutPage-create.jsx';
import axios from 'axios';

// Define types for props
// interface IndexProps {
//   SectionName: string;
//   url: string;
// }

// interface ServiceData {
//   id: string;
//   title: string;
//   content: string;
//   image: {
//     url: string;
//   };
// }

const Index = ({ SectionName, url }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); // Use the type defined above for the data state
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isFormPopupOpen, setFormPopupOpen] = useState(false);
  const [editId, setEditId] = useState(null); // Optional: ID for editing existing resource

  useEffect(() => {
    axios(`${baseUrl}/${url}`).then((res) => setData(res.data.data));
  }, [url]);

  const serviceTable = document.querySelector('.service');

  // Function to open the popup for editing
  const openPopup = (id) => {
    setEditId(id || null);
    setPopupOpen(true);
    serviceTable?.classList.add('blur');
  };

  // Function to open the form popup for creating
  const openFormPopup = () => {
    setFormPopupOpen(true);
    serviceTable?.classList.add('blur');
  };

  // Function to close all popups
  const closePopup = () => {
    setPopupOpen(false);
    setFormPopupOpen(false);
    serviceTable?.classList.remove('blur');
  };

  // Function to delete a service
  const deleteService = (serviceId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`${baseUrl}/${url}/${serviceId}/`);
          console.log(`${url} with ID ${serviceId} deleted successfully.`);
          navigate('/dashboard/');
        } catch (error) {
          console.error("Error deleting service:", error);
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="container">
      <button className="create-button" onClick={openFormPopup}>Create</button>

      <div className="service">
        <h1>{SectionName} Table</h1>
        <table className="service-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Title</th>
              <th>Content</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td><img src={item.image.url} alt="service" /></td>
                <td>
                  <button
                    onClick={() => deleteService(item.id)}
                    className="delete-button cursor-pointer font-semibold text-red-600"
                    type="button"
                  >
                    Delete
                  </button>
                  <button
                    className="update-button"
                    onClick={() => openPopup(item.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Forms */}
      {isPopupOpen && (
        <PopupForm isOpen={isPopupOpen} onClose={closePopup} id={editId} url={url} />
      )}
      {isFormPopupOpen && (
        <Form isOpen={isFormPopupOpen} onClose={closePopup} url={url} />
      )}
    </div>
  );
};

export default Index;
