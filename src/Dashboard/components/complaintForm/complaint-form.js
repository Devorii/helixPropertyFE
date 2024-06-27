
import React, { useEffect } from 'react';
import { Field, Formik } from 'formik';
import './complaint-form.css'



const ComplaintForm = ({ lsOfCategories }) => (


  <div>
    <Formik
      initialValues={{ category: '', user_issue: '', fullname: '' }}

      validate={values => {
        const errors = {};
        if (!values.category) {
          errors.category = 'Required';
        }
        if (!values.user_issue) {
          errors.user_issue = 'Required';
        }
        if (!values.fullname) {
          errors.fullname = 'Required';
        }
        return errors;
      }}

      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        console.log(JSON.stringify(values))
        setSubmitting(false);

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
              <label htmlFor="fullname">Enter your fullname</label>
              <Field
                id='fullname'
                as="input"
                type="text"
                name="fullname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullname}
              >
              </Field>
              {errors.fullname && touched.fullname && errors.fullname}
            </div>
          </div>






          <label htmlFor="user_issue">What is your issue?</label>
          <Field
            id='reportIssueArea'
            as="textarea"
            name="user_issue"
            rows={8}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.user_issue}
          >
          </Field>
          {errors.user_issue && touched.user_issue && errors.user_issue}



          <button type="submit">
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default ComplaintForm;
