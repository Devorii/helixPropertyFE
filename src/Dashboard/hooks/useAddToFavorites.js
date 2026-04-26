import { useState } from 'react'

export const useAddToFavorites = () => {
  const [alertBanner, setAlertBanner] = useState(null)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState('success')

  const addToFavorites = async (vendor) => {
    const token = localStorage.getItem('token')
    
    try {
      const response = await fetch(`${process.env.REACT_APP_HELIX_API}/vendors/add-favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({
          vendor_id: vendor.id
        })
      });

      if (response.ok) {
        setAlertMessage('Successfully added to favorites!')
        setAlertSeverity('success')
        setAlertBanner(true)
      } else {
        setAlertMessage('Failed to add to favorites. Please try again.')
        setAlertSeverity('error')
        setAlertBanner(true)
      }
    } catch (error) {
      console.error('Error adding to favorites:', error.message)
      setAlertMessage('An error occurred while adding to favorites.')
      setAlertSeverity('error')
      setAlertBanner(true)
    }

    setTimeout(() => {
      setAlertBanner(null)
    }, 1500)
  }

  return {
    addToFavorites,
    alertBanner,
    setAlertBanner,
    alertMessage,
    alertSeverity
  }
}
