import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Landlord } from "./formHooks";
import { useFormInformation } from "../../context/authContext";
import "./auth.css"


const AuthLandlord = () => {

  const navigate = useNavigate()
  // const [landlordNext, setLandlordNext] = useState(null)
  const { formHeaderText, formIdentity, formState, dispatch } = useFormInformation()


  // const onChangeHandler = (e) => {
  //   const { name, value } = e.target;
  //   setInitFormState(prevValues => ({
  //     ...prevValues,
  //     [name]: value
  //   }));

  //   // Also, you might want to update the local storage here
  //   localStorage.setItem('signupState', JSON.stringify({
  //     ...initFormState,
  //     [name]: value
  //   }));
  // }




  useEffect(() => {
    const userSelection = localStorage.getItem('userStatus')
    const userInfoState = localStorage.getItem("signupState")
    if (userInfoState) {
      const uis = JSON.parse(userInfoState)
      setInitFormState(uis)
    }
    if (!userSelection) {
      navigate('/')
    }
    if (userSelection != "OW1") {
      dispatch({ type: "Tenant" })
    }
    else {
      dispatch({ type: "Landlord" })
    }
    document.querySelector('.intro-message')?.classList.add('show-msg');
    // need to validate the formIdentity and if not null do nothing else navigate back to home.
  }, [])



  const [initFormState, setInitFormState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    dob: '',
    occupation: '',
    company: '',
    salary: '',
    code: '',
    password: '',
    country: 'Canada',
    province: '',
    city: '',
    address: '',
    unit: '',
    propCountry: 'Canada',
    propProvince: '',
    propCity: '',
    propAddress: '',
    po: ''
  })

  return (
    <div>
      <div>
        <h4 className="intro-message">{formHeaderText} </h4>
        <div>
          <Formik
            initialValues={initFormState}
            validate={ values => {
              const error = {}
              if (!values.email) {
                error.email = '* Required';
              } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                error.email = "Invalid email address"
              }

              // GLOBAL REQUIREMENTS
              if (!values.firstname) {
                error.firstname = "Firstname required"
              }
              if (!values.lastname) {
                error.lastname = "Lastname required"
              }
              if (!values.phone) {
                error.phone = "Phone # required"
              }
              if (!values.password) {
                error.password = "Password required"
              }


              // TENANTS REQUIREMENTS
              if (localStorage.getItem('userStatus') !== "OW1") {
                if (!values.dob) {
                  error.dob = "D.O.B required"
                }
                if (!values.occupation) {
                  error.occupation = "Occupation required"
                }
                if (!values.company) {
                  error.company = "Company required"
                }
                if (!values.salary) {
                  error.salary = "Salary required"
                }
                if (!values.code) {
                  error.code = "Code required"
                }

              }
              else {
                if (!values.address) {
                  error.address = "Address required"
                }
                if (!values.city) {
                  error.city = "City required"
                }
                if (!values.country) {
                  error.country = "Country required"
                }
                if (!values.po) {
                  error.po = "Ownership required"
                }
                if (!values.propAddress) {
                  error.propAddress = "Address required"
                }
                if (!values.propCity) {
                  error.propCity = "City required"
                }
                if (!values.propCountry) {
                  error.propCountry = "Country required"
                }
                if (!values.propProvince) {
                  error.propProvince = "Province required"
                }
                if (!values.province) {
                  error.province = "Province required"
                }
                if (!values.unit) {
                  error.unit = "Unit required"
                }

              }
              return error;
              }
            }

            // ON SUBMIT FUNCTION
            onSubmit={(values, { setSubmitting }) => {
              // validate if its tenants of owners
                console.log(values)
                setSubmitting(true)
                alert("Your application has been submitted.")
              
            }}>
              
            {({ isSubmitting, values, handleChange }) => (
              <Form id="formik_layout">
                {Landlord({isSubmitting,  handleChange, values})}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AuthLandlord;

