
import React, { useEffect, useState } from 'react';
import { Field, Formik } from 'formik';
import './complaint-form.css'
import { useIssueInformation } from "../../context/issueContext";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Stack from '@mui/material/Stack';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';


const ComplaintForm = ({ lsOfCategories }) => {
  const { formName } = useIssueInformation();
  const [alertBanner, setAlertBanner] = useState(null);
  const [images, setImages] = useState([])


  useEffect(() => {
    if (alertBanner !== null) {
      // Optionally handle any side effects if needed when alertBanner changes
    }
  }, [alertBanner]);

  return (
    <div>
      <Formik
        initialValues={{ category: '', description: '', title: '' }}

        validate={values => {
          const errors = {};
          if (!values.category) {
            errors.category = 'Required';
          }
          if (!values.description) {
            errors.user_issue = 'Required';
          }
          if (!values.title) {
            errors.title = 'Required';
          }
          return errors;
        }}

        onSubmit={(values, { setSubmitting }) => {
          const formData = new FormData();
          formData.append('category', `${formName} - ${values.category}`);
          formData.append('property_id', localStorage.getItem('pid'));
          formData.append('author', localStorage.getItem('fullname'));
          formData.append('author_id', 0);
          formData.append('description', values.description);
          formData.append('title', values.title);

          images.forEach((image, index) => {
            formData.append('images', image); // Adds each file to FormData
          });

          // values['category'] = `${formName} - ${values['category']}`
          // values['property_id'] = localStorage.getItem('pid')
          // values['author'] = localStorage.getItem('fullname')
          // values['author_id'] = 0
          // values['images'] = images


          // Define an async function to fetch data
          const createTicket = async () => {
            const token = localStorage.getItem('token')
            try {
              const response = await fetch(`${process.env.REACT_APP_HELIX_API}/support/create-ticket`, {
                method: 'POST',
                headers: {

                  'x-access-token': token,
                },
                body: formData
              });

              // Check if the response status is 200 OK
              if (response.status === 200) {
                setSubmitting(false);
                setAlertBanner(true)
              }
              // Handle other non-200 responses (optional)
              else {
                console.error(`Unexpected status: ${response.status}`);
              }
            } catch (error) {
              console.error('Error during the request:', error.message);
            }
          };

          // Call the async function
          createTicket();

          setTimeout(() => {
            setAlertBanner(false)
          }, 1500);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (



          <form id='issueForm' onSubmit={handleSubmit}>

            <div id='elementsWrapper'>

              <div className='ew-c' id='categoryWrapper'>
                <label htmlFor="category">Select a Category</label>
                <Field as="select"
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  style={{ width: "90%", padding: "8px" }}>
                  <option value="" label="Select an option" />
                  {lsOfCategories.map((option) => (
                    <option key={option.value} value={option.label}>
                      {option.label}
                    </option>
                  ))}
                </Field>
              </div>


              <div className='ew-c' id='fullnameWrapper'>
                <label htmlFor="title">Title</label>
                <Field
                  id='fullname'
                  as="input"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fullname}
                  placeholder='Eg. Broken shower head'
                >
                </Field>
                {errors.title && touched.title && errors.title}
              </div>
            </div>






            <label htmlFor="description">What is your issue?</label>
            <Field
              id='reportIssueArea'
              as="textarea"
              name="description"
              rows={8}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              placeholder='Detail description here...'
            >
            </Field>
            {errors.description && touched.description && errors.description}
            <h3>Upload your images (Maximum 4 Images) </h3>


            <div className='upload-img-container'>
              <div className='add-image-container'>
                <input className='file-btn'
                  name='file'
                  type='file'
                  accept='image/*'
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    if (images.length + files.length > 4) {
                      alert("You can only upload up to 4 images.");
                      return;
                    }
                    else {
                      setImages(prevImages => [...prevImages, ...files]);
                    }
                  }}
                />
                <AddAPhotoIcon sx={{ fontSize: 30 }} className='add-images-btn' />
              </div>

              <div className='name-container'>
                {
                  <div className='images-name-box'>
                    <ul className='img-name-display'>
                      {images.map((img, index) => (
                        <li style={{fontSize:"small"}} key={index}>{img.name}</li>
                      ))}
                    </ul>
                  </div>

                }
              </div>

            </div>



            <button type="submit">
              Submit
            </button>
          </form>
        )}
      </Formik>
      {
        alertBanner && // Only show the alert if alertBanner is true
        <Stack style={{ 'marginTop': '15px' }} sx={{ width: '49%' }} spacing={9}>
          <Alert
            iconMapping={{
              success: <CheckCircleOutlineIcon fontSize="inherit" />,
            }}
          >
            Ticket successfully created. Refresh page for this beta version.
          </Alert>
        </Stack>
      }
    </div>
  )
};

export default ComplaintForm;
