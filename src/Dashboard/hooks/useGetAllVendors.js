import { useState } from 'react'

export const useGetAllVendors = () => {
  const [vendors, setVendors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getAllVendors = async () => {
    const token = localStorage.getItem('token')
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.REACT_APP_HELIX_API}/vendors/load-all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVendors(data)
        console.log('All Vendors:', data)
        return data
      } else {
        setError('Failed to load vendors')
        console.error(`Failed to load vendors: ${response.status}`)
      }
    } catch (error) {
      console.error('Error loading vendors:', error.message)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    getAllVendors,
    vendors,
    loading,
    error
  }
}
