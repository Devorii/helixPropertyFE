// Render Prop
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Paper from '@mui/material/Paper';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/material/styles';
import './expenseForm.css'
import dayjs from 'dayjs';
import { parseISO } from 'date-fns';
import dayjsPluginUTC from 'dayjs-plugin-utc'
import Grid from '@mui/material/Grid';
import { use } from 'react';
import { tabScrollButtonClasses } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import CancelIcon from '@mui/icons-material/Cancel';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useNavigate } from 'react-router-dom';

const Datepicker = ({ field, form }) => {
  const value = field.value || null;

  return (
    <DatePicker
      className='dt-picker'
      value={value}
      onChange={(date) => {
        form.setFieldValue(field.name, date);
      }}
      slotProps={{
        textField: {
          InputProps: {
            sx: { height: "36px" },
          },
        },
      }}
    />
  );
};





const ExpenseForm = () => {
  const token = localStorage.getItem('token')
  const property_id = localStorage.getItem('pid')
  const navigate = useNavigate()
  const [rawVendorList, setRawVendorList] = useState()
  const [categoryList, setCategoryList] = useState(
    [{ name: "No Categories Found!", id: "000" }])

  const [vendorList, setVendorList] = useState(
    [{ name: "Select a Category", id: "000" }])

  const [currencyList, setCurrencyList] = useState(
    [{ name: "Canada", id: "001" },
    { name: "USA", id: "002" }])

  const [itemsList, setItemsList] = useState(
    [
      {
        "item": null,
        "description": null,
        "quantity": 0,
        "price": 0,
        "amount": 0
      }
    ]
  )

  const [finalCalcObj, setFinalCalcObj] = useState({
    tax: 0,
    subtotal: 0,
    totalPaid: 0,
  });



  useEffect(() => {
    const get_attribute_data = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_HELIX_API}/expense/get-expense-attributes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
          body: JSON.stringify({ "prop_id": property_id })
        });

        if (response.ok) {
          const data = await response.json();
          const category_currated_list = data.categories.map((categories) => ({
            id: categories.id,
            name: categories.name
          })) || []
          setCategoryList(category_currated_list)

          const construct_raw_vendors = data.categories.map((categories) => ({
            categories_id: categories.id,
            vendors: categories.vendors
          }))

          setRawVendorList(construct_raw_vendors)

          // This currency portion is going to need to be modified for the future iterations.
          if (data.currency) {
            setCurrencyList([
              {
                id: data.currency.id,
                name: data.currency.iso
              }
            ]);
          }

          console.log("attributes:", data)
        }
        else {
          console.error(`Unexpected status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error during the request:', error.message);
      }

    }


    get_attribute_data()
  }, [])


  const run_vendor_selection = (category_id) => {
    rawVendorList.forEach(element => {
      if (element.categories_id == category_id) {
        setVendorList(element.vendors)
      }
    });
  }

  const addNewItem = () => {
    setItemsList(prevItems => [
      ...prevItems,
      { item: null, description: null, quantity: 0, price: 0, amount: 0 }
    ]);
  };

  const recalculateSubtotal = (items) => {
    const subtotal = items.reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0);
    setFinalCalcObj(prev => ({ ...prev, subtotal }));
  };


  const removeItems = (indexToRemove) => {
    if (itemsList.length > 1) {
      setItemsList(deleteItem => {
        // Filter out the item at the specified index
        return deleteItem.filter((_, index) => index !== indexToRemove);
      })
    }
  }


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    boxShadow: 'none',
    color: (theme.vars ?? theme).palette.text.secondary,
  }));


  const themeColor = process.env.REACT_APP_THEME_COLOR
  const subtotal = parseFloat(finalCalcObj.subtotal) || 0;
  const taxDecimal = parseFloat(finalCalcObj.tax) / 100 || 0;
  const total = subtotal + (subtotal * taxDecimal);
  const rawAmountDue = total - (parseFloat(finalCalcObj.totalPaid) || 0);
  const amountDue = Math.min(rawAmountDue, 999999.99) > 0 ? Math.min(rawAmountDue, 999999.99) : 0;

  return (

    <div>

      <Formik

        initialValues={{
          categorySelect: '',
          vendorSelect: '',
          currency: '',
          Date: null,
          poso: '',
          billnum: ''
        }}


        validate={values => {
          const errors = {};
          if (!values.categorySelect) errors.categorySelect = 'Required';
          if (!values.vendorSelect) errors.vendorSelect = 'Required'
          return errors;
        }}


        onSubmit={async (values, { setSubmitting }) => {
          const payload = {
            category: values.categorySelect,
            vendor: values.vendorSelect,
            currency: values.currency,
            dueDate: values.Date ? dayjs(values.Date).toISOString() : null,
            posoNumber: values.poso,
            billNumber: values.billnum,
            items: itemsList.map(item => ({
              item: item.item,
              description: item.description,
              quantity: item.quantity,
              price: item.price,
              amount: item.amount,
            })),
            calculations: {
              subtotal: subtotal.toFixed(2),
              taxPercent: parseFloat(finalCalcObj.tax),
              total: total.toFixed(2),
              totalPaid: parseFloat(finalCalcObj.totalPaid).toFixed(2),
              amountDue: amountDue.toFixed(2),
            },
            timestamp: new Date().toISOString(),
            propID: localStorage.getItem("pid")
          };

          // Call backend endpoint. 

          try {
            const response = await fetch(`${process.env.REACT_APP_HELIX_API}/expense/insert-report`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
              },
              body: JSON.stringify(payload)
            });

            // Check if the response status is 200 OK
            if (response.ok) {
              console.log('Submission successful:', payload);
              window.location.reload()

            }
            // Handle other non-200 responses (optional)
            else {
              console.error(`Unexpected status: ${response.status}`);
            }
          } catch (error) {
            console.error('Error during the request:', error.message);
          } finally {
            setSubmitting(false); // Make sure Formik knows submission ended
          }

      
          setTimeout(() => {
        setSubmitting(false);
          }, 400);
        }}
      >

      {({ isSubmitting }) => (
        <Form>
          <div>
            <div className='formHeader'>
              <div className='form-header'>
                <div>
                  <h1>Activity</h1>
                </div>
                <div className='save-btn-container'>
                  <>
                    <Button
                      variant="outlined"
                      startIcon={<CancelIcon style={{ width: "15", height: "15" }} />}
                      onClick={() => window.location.reload()}
                      sx={{
                        color: "black",
                        border: "1px solid black",
                        marginRight: "20px"
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type='submit'
                      variant="outlined"
                      startIcon={<BookmarkIcon style={{ width: "15", height: "15" }} />}
                      sx={{ color: "black", border: "1px solid black" }}
                      disabled={isSubmitting}
                    >
                      Save
                    </Button>
                  </>
                </div>
              </div>
              <div className='form-filters'>
                <div className='fieldContainer'>
                  <label htmlFor='vendorSelect'>Select a Category</label>
                  <Field name="categorySelect">
                    {({ field, form }) => (
                      <select
                        {...field} // this binds Formik value and onChange
                        style={{ width: "100%", padding: "8px" }}
                        onChange={(e) => {
                          const categoryId = e.target.value;

                          // Update Formik state
                          form.setFieldValue("categorySelect", categoryId);
                          form.setFieldValue("vendorSelect", ""); // reset vendor

                          // Update dependent vendor list
                          run_vendor_selection(categoryId);
                        }}
                      >
                        <option value="">--</option>
                        {categoryList.map((value) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </Field>
                  <ErrorMessage name="categorySelect" component="div" className="field-error" />
                </div>

                <div className='fieldContainer marginContainer'>
                  <label htmlFor='vendorSelect'>Choose a Vendor</label>
                  <Field as="select"
                    className="vendorSelect"
                    name="vendorSelect"
                    style={{ width: "140px", padding: "8px" }}
                  >
                    <option value="">--</option>
                    {
                      vendorList.map((value) => (
                        <option key={value.id} value={value.id}>{value.name}</option>
                      ))
                    }
                  </Field>
                  <ErrorMessage name="vendorSelect" component="div" className="field-error" />
                </div>



                <div className='fieldContainer marginContainer'>
                  <label htmlFor='vendorSelect'>Currency</label>
                  <Field as="select"
                    className="vendorSelect"
                    name="currency"
                    style={{ width: "140px", padding: "8px" }}
                  >
                    <option value="">--</option>
                    {
                      currencyList.map((value) => (
                        <option key={value.id} value={value.id}>{value.name}</option>
                      ))
                    }
                  </Field>
                </div>


                <div className='fieldContainer marginContainer'>
                  <label htmlFor='epx-date'>Due date</label>
                  <Field
                    className="exp-date"
                    name="Date"
                    component={Datepicker}
                    style={{ width: "140px", padding: "8px" }}
                  >
                  </Field>
                </div>

                {/* <div>
                
              </div> */}

                <div className='fieldContainer marginContainer'>
                  <label htmlFor='poso'>P.O/S.O</label>
                  <Field
                    as="input"
                    className="poso"
                    name="poso"
                    style={{ width: "140px", padding: "8px" }}
                  >
                  </Field>
                </div>
                <div className='fieldContainer marginContainer'>
                  <label htmlFor='billnum'>Bill #</label>
                  <Field
                    className="billnum"
                    name="billnum"
                    style={{ width: "140px", padding: "8px" }}
                  >
                  </Field>
                </div>

              </div>
            </div>
            {/* End of Form Header */}


          </div>

          <div className='itemHolder'>

            {
              itemsList.map((item, index) => {
                return (

                  <Grid className='create-exp-container adjust-item-container' container spacing={{ xs: 1, sm: 3, md: 6 }}>
                    <hr className="mobile-hr" />
                    <Grid className='mod-grid adjust-item-container' item xs={12} sm={2}>
                      <Item><strong>Item</strong></Item>
                      <input className="input-item"
                        type='text' name="item"
                        placeholder="Create an Item"
                        value={item.item || ''}
                        onChange={(e) => {
                          const updatedItems = [...itemsList];
                          updatedItems[index].item = e.target.value;
                          setItemsList(updatedItems);

                        }}></input>
                    </Grid>

                    <Grid className='rm-mobile mod-grid adjust-item-container' item xs={12} sm={5}>
                      <Item><strong>Description</strong></Item>
                      <textarea
                        className="input-item desc"
                        type='text' name="description"
                        placeholder="Write your description"
                        value={item.description}
                        onChange={(e) => {
                          const updatedItems = [...itemsList];
                          updatedItems[index].description = e.target.value;
                          setItemsList(updatedItems);

                        }}></textarea>
                    </Grid>

                    <Grid className='rm-mobile mod-grid adjust-item-container' item sm={1}>
                      <Item><strong>Quantity</strong></Item>
                      <input
                        className="input-item"
                        type='number'
                        name="quantity"
                        min="0"
                        placeholder="0"
                        value={item.quantity || ""}
                        onChange={(e) => {
                          const updatedItems = [...itemsList];
                          const quantity = parseInt(e.target.value) || 0;
                          const price = parseFloat(updatedItems[index].price) || 0;
                          updatedItems[index] = {
                            ...updatedItems[index],
                            quantity,
                            amount: quantity * price
                          };
                          setItemsList(updatedItems);
                          recalculateSubtotal(updatedItems);
                        }}
                      ></input>
                    </Grid>

                    <Grid className='rm-mobile mod-grid adjust-item-container' item sm={1}>
                      <Item><strong>Price</strong></Item>
                      <input
                        className="input-item"
                        type="number"
                        min="0.00"
                        max="10000.00"
                        step="0.01"
                        name="price"
                        placeholder="0"
                        value={item.price || ""}
                        onChange={(e) => {
                          const updatedItems = [...itemsList];
                          const price = parseFloat(e.target.value) || 0;
                          const quantity = parseInt(updatedItems[index].quantity) || 0;
                          updatedItems[index] = {
                            ...updatedItems[index],
                            price,
                            amount: quantity * price
                          };
                          setItemsList(updatedItems);
                          recalculateSubtotal(updatedItems);
                        }}

                      ></input>
                    </Grid>



                    <Grid className='rm-mobile mod-grid adjust-item-container' item sm={3}>

                      {
                        index < 1 &&
                        <Item className="input-item" sx={{ textAlign: 'right' }}>
                          <strong>Amount</strong>
                        </Item>
                      }
                      {
                        index >= 1 &&
                        <Item className="input-item" sx={{ textAlign: 'right' }}>
                          <strong>

                          </strong>
                        </Item>
                      }
                      <div className='couple-delete-amount'>
                        {itemsList.length > 1 && (
                          <DeleteIcon
                            className='delete-icon'
                            onClick={() => removeItems(index)}
                          />
                        )}


                        <input
                          className="totalAmountInput"
                          type="number" min="0.00"
                          max="10000.00" step="0.01"
                          placeholder="$0"
                          value={item.amount.toFixed(2)}
                          readOnly>
                        </input>
                      </div>

                    </Grid>

                  </Grid>

                )

              })
            }


          </div>
          <button className="AddnewItem-btm" type="button" onClick={addNewItem}>
            <AddBoxIcon className='addIcon' /> Add Line Item
          </button>

          <div className='totalContainer'>
            <div className='content-holder'>
              <div className='l-content'>

                <p>SubTotal:</p>
                <p className='total-input-label'>Tax %:</p>
                <p className='total-input-label'>Total:</p>
                <p style={{ marginTop: "27px" }}>Total Paid:</p>
                <p style={{ marginTop: "20px" }}>Amount Due:</p>
              </div>
              <div className='r-content'>
                <p>${finalCalcObj.subtotal.toFixed(2)}</p>
                <input
                  className="input-item tax-input"
                  type='number'
                  name="tax"
                  placeholder="0"
                  max="99"
                  min="00"
                  value={finalCalcObj.tax || ""}
                  onChange={(e) => {
                    const taxValue = e.target.value;
                    setFinalCalcObj(prev => ({ ...prev, tax: e.target.value }))
                  }}
                ></input>
                <p>${total.toFixed(2)}</p>
                <input
                  className="input-item tax-input"
                  type='number'
                  name="totalPaid"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  max="999999999"
                  value={finalCalcObj.totalPaid || 0}
                  onChange={(e) => {
                    setFinalCalcObj(prev => ({ ...prev, totalPaid: parseFloat(e.target.value) || 0 }))
                  }}
                />

                <p>${amountDue.toFixed(2)}</p>
              </div>
            </div>

          </div>
        </Form>
      )}
    </Formik>

    </div >



  )
};

export default ExpenseForm;