import { Field, ErrorMessage } from "formik";
import { useFormInformation } from "../../context/authContext";
import { useEffect } from "react";




export const Landlord = ({ isSubmitting, handleChange, values }) => {
  const { formIdentity, formState, dispatch } = useFormInformation()
  const triggerNext = () => dispatch({ type: 'LandlordNext' })

  const country = [
    { value: 'canada', label: 'Canada' },
  ];
  const province = [
    { value: 'AB', label: 'Alberta' },
    { value: 'BC', label: 'British Columbia' },
    { value: 'MB', label: 'Manitoba' },
    { value: 'NB', label: 'New Brunswick' },
    { value: 'NL', label: 'Newfoundland and Labrador' },
    { value: 'NS', label: 'Nova Scotia' },
    { value: 'NT', label: 'Northwest Territories' },
    { value: 'NU', label: 'Nunavut' },
    { value: 'ON', label: 'Ontario' },
    { value: 'PE', label: 'Prince Edward Island' },
    { value: 'QC', label: 'Quebec' },
    { value: 'SK', label: 'Saskatchewan' },
    { value: 'YT', label: 'Yukon' },
  ];
  const city = [
    { value: 'toronto', label: 'Toronto' },
  ];
  const primaryOwners = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ];

  var identity;


  useEffect(() => {
    if (formIdentity != null) {
      identity = formIdentity
    }
    else {
      identity = localStorage.getItem("userStatus")

    }
  }, [formIdentity])


  return (
    <>
      {!formState ?
        <>
          <div id="name_wrapper">
            <div className="stack_info">
              <label htmlFor="firstname">Firstname</label>
              <Field className="nameField" onChange={handleChange} type="text" name="firstname" value={values.firstname} placeholder='Firstname' />
              <ErrorMessage className='inputError' name="firstname" component="div" />
            </div>

            <div className="stack_info">
              <label htmlFor="lastname">Lastname</label>
              <Field className="nameField" onChange={handleChange} id="nameField1" type="text" name="lastname" value={values.lastname} placeholder='Lastname' />
              <ErrorMessage className='inputError' name="lastname" component="div" />
            </div>
          </div>
          <label htmlFor="email">Email</label>
          <Field type="email" onChange={handleChange} name="email" value={values.email} placeholder='example@gmail.com' />
          <ErrorMessage className='inputError' name="email" component="div" />

          <label htmlFor="phone">Phone</label>
          <Field type="text" onChange={handleChange} name="phone" value={values.phone} placeholder='000-000-0000' />
          <ErrorMessage className='inputError' name="phone" component="div" />
          {formIdentity != "TE1" ?
            <>
              <label htmlFor="country">Country</label>
              <Field as="select"
                name="country"
                value={values.country}
                onChange={handleChange}
                style={{ width: "100%", padding: "8px" }}>
                <option value="" label="Select an option" />
                {country.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Field>
              <ErrorMessage className='inputError' name="country" component="div" />

              {/* <label htmlFor="province">Province</label>
        <Field type="text" onChange={handleChange} name="province" value={formInfo['province']}/>
        <ErrorMessage name="province" component="div" /> */}

              <div>
                <label htmlFor="province">Province</label>
                {console.log(values)}
                <Field as="select"
                  name="province"
                  value={values.province}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px" }}
                >
                  <option value="" label="Select an option" />
                  {province.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage className='inputError' name="province" component="div" />
              </div>

              <label htmlFor="city">City</label>
              <Field type="text" onChange={handleChange} name="city" value={values.city} placeholder='Toronto' />
              <ErrorMessage className='inputError' name="city" component="div" />

              <label htmlFor="address">Address</label>
              <Field type="text" onChange={handleChange} name="address" value={values.address} placeholder='111 address dr' />
              <ErrorMessage className='inputError' name="address" component="div" />
            </>
            :
            <>
              <label htmlFor="dob">Date of Birth</label>
              <Field type="text" onChange={handleChange} name="dob" value={values.dob} placeholder='yyyy-mm-dd' />
              <ErrorMessage className='inputError' name="dob" component="div" />

              <label htmlFor="occupation">Occupation</label>
              <Field type="text" onChange={handleChange} name="occupation" value={values.occupation} />
              <ErrorMessage className='inputError' name="occupation" component="div" />

              <label htmlFor="company">Company</label>
              <Field type="text" onChange={handleChange} name="company" value={values.company} />
              <ErrorMessage className='inputError' name="company" component="div" />

              <label htmlFor="salary">Annual Salary</label>
              <Field type="text" onChange={handleChange} name="salary" value={values.salary} placeholder='10000000' />
              <ErrorMessage className='inputError' name="salary" component="div" />

              <label htmlFor="code">Enter code Provided by Property Owner</label>
              <Field type="text" onChange={handleChange} name="code" value={values.code} />
              <ErrorMessage className='inputError' name="code" component="div" />
            </>
          }


          <label htmlFor="password">Password</label>
          <Field type="password" onChange={handleChange} name="password" value={values.password} />
          <ErrorMessage className='inputError' name="password" component="div" />


          {/* BUTTON */}

          {
            formIdentity !== "TE1" ?
              <button type="button" onClick={triggerNext}>
                Next
              </button>
              :
              <button type="submit" disabled={isSubmitting}>
                Create my Tenant account
              </button>

          }

        </>
        :
        <>
          <div>
            <label htmlFor="po">Primary Owner</label>
            <Field as="select"
              name="po"
              value={values.po}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="" label="Select an option" />
              {primaryOwners.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
            <ErrorMessage className='inputError' name="po" component="div" />
          </div>

          {
            values.po == "true" &&
            <>

              <div>
                <label htmlFor="propCountry">Country</label>
                <Field as="select"
                  name="propCountry"
                  value={values.propCountry}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px" }}>
                  <option value="" label="Select an option" />
                  {country.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage className='inputError' name="propCountry" component="div" />
              </div>


              <div>
                <label htmlFor="propProvince">Province</label>
                <Field as="select"
                  name="propProvince"
                  value={values.propProvince}
                  onChange={handleChange}
                  style={{ width: "100%", padding: "8px" }}
                >
                  <option value="" label="Select an option" />
                  {province.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage className='inputError' name="propProvince" component="div" />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="propCity">City</label>
                <Field type="text" name="propCity" value={values.propCity} onChange={handleChange} />
                <ErrorMessage className='inputError' name="propCity" component="div" />
              </div>


              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="propAddress">Address</label>
                <Field type="text" name="propAddress" value={values.propAddress} onChange={handleChange} />
                <ErrorMessage className='inputError' name="propAddress" component="div" />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="unit">Unit</label> 
                <Field type="text" name="unit" value={values.unit} onChange={handleChange} />
                <ErrorMessage className='inputError' name="unit" component="div" />
              </div>
              <button type="submit">
              Submit my Application
              </button>
            </>
          }
          {
            values.po == "false" &&
            <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="propCodeMngmt">Enter Property Code</label>
                <Field type="text" name="propCodeMngmt" value={values.propCodeMngmt} onChange={handleChange} />
                <ErrorMessage className='inputError' name="propCodeMngmt" component="div" />
              </div>
              <button type="submit">
              Request Access
              </button>
            </>
          }



        </>
      }
    </>
  )
}