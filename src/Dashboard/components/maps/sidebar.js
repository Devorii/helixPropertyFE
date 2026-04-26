import { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/base'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useAddToFavorites } from '../../hooks/useAddToFavorites'
import { useGetAllVendors } from '../../hooks/useGetAllVendors'
import './vm.css'





const Sidebar = ({ storesObj, updatePins, selectedStore, setSelectedStore }) => {
  const [storeObj, setStoreObj] = useState(Array.isArray(storesObj) ? storesObj : [])
  const storeRefs = useRef({})
  const [cachedStores, setCachedStores] = useState([...new Set((Array.isArray(storeObj) ? storeObj : []).map(storeP => storeP.properties))])
  const [stores, setStores] = useState(cachedStores)
  const [isAll, setIsAll] = useState(true)
  const [categories, setCategories] = useState([...new Set(cachedStores.map(store => store.category))])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { addToFavorites, alertBanner, alertMessage, alertSeverity } = useAddToFavorites()
  const { getAllVendors } = useGetAllVendors()


  // Scroll to the active location when it changes (desktop only)
  useEffect(() => {
    if (
      selectedStore &&
      storeRefs.current &&
      storeRefs.current[selectedStore.properties.name]
    ) {
      const element = storeRefs.current[selectedStore.properties.name];
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth', // Optionally smooth scrolling
          block: 'start' // Align the element to the top of the container
        });
      }
    }
  }, [selectedStore, isAll, stores, selectedCategory, storeObj])

  // const isAllSelected = (val) => {
  //   if (!val) {
  //     setIsAll(false)
  //   }
  //   else {
  //     setIsAll(true)
  //   }
  // }

  // Sync with storesObj prop changes
  useEffect(() => {
    if (Array.isArray(storesObj)) {
      setStoreObj(storesObj)
    }
  }, [storesObj])

  // Update cachedStores, categories, and stores whenever storeObj changes
  useEffect(() => {
    const newCachedStores = [...new Set((Array.isArray(storeObj) ? storeObj : []).map(storeP => storeP.properties))]
    setCachedStores(newCachedStores)
    setCategories([...new Set(newCachedStores.map(store => store.category))])
    setStores(newCachedStores)
    updatePins(storeObj)
  }, [storeObj, updatePins])

  const updateStores = () => { 
    setIsAll(false)
    setSelectedCategory('All')
    const getSavedVendors = localStorage.getItem('favorite_vendors')
    try {
      const parsed = JSON.parse(getSavedVendors)
      if (Array.isArray(parsed)) {
        setStoreObj(parsed)
      }
    } catch (error) {
      console.error('Error parsing favorite vendors:', error)
    }
  }

  const updateAll = () => {
    setIsAll(true)
    setSelectedCategory('All')
    setStoreObj(Array.isArray(storesObj) ? storesObj : [])
  }
  const filterStores = (event) => {
    const targetCategory = event.target.value
    let filteredStores;
    let pins;

    if (targetCategory != 'All') {
      filteredStores = [...new Set(cachedStores.filter(store => store.category == targetCategory))]
      pins = storesObj.filter(store => store.properties.category == targetCategory)
    }
    else {
      filteredStores = cachedStores
      pins = storesObj
      setIsAll(true)
    }

 
    updatePins(pins)
    setStores(filteredStores)
    setSelectedCategory(targetCategory)
  }

  return (
    <div className='w-100 flex left flex-col sidebar-mobile-display'>
      {
        alertBanner && 
        <Stack sx={{ width: '100%' }} spacing={2} className='mb-3'>
          <Alert severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Stack>
      }
      <p className="text-sg-green text-s mb-3 mt-0">
        {stores.length} - listings found
      </p>
      <div className='w-100 flex justify-between pr-5'>
        <Button className={`${isAll ? 'text-[white] bg-[#E76D5B] hover:bg-[#E76D5B]/80 ' : 'bg-transparent hover:bg-[#E76D5B]/10 '} w-48  pt-3 pb-3 mt-0  border-[#E76D5B] text-[#E76D5B] rounded-lg transition-all duration-200 cursor-pointer`}
          onClick={() =>{ 
            updateAll()
          }}
        >All</Button>
                <Button className={`${isAll ? 'bg-transparent hover:bg-[#E76D5B]/10' : 'bg-[#E76D5B] text-[white] hover:bg-[#E76D5B]/80'} w-48 pt-3 pb-3 mt-0  border-[#E76D5B] text-[#E76D5B] rounded-lg transition-all duration-200 cursor-pointer`}
          onClick={() => {
            setIsAll(false)
            updateStores()
          }}
        >Favorites</Button>

      </div>

      <Box sx={{ minWidth: 120, color: '#E76D5B' }} className='mt-5 w-100 mr-5'>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">Category</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={selectedCategory}
            label="Age"
            onChange={filterStores}
            MenuProps={{
              PaperProps: {
                sx: {
                  '& .MuiMenuItem-root:hover': {
                    backgroundColor: '#e76e5b0e',
                    color: '#282828ff',
                  },
                  '& .MuiMenuItem-root.Mui-selected': {
                    backgroundColor: '#E76D5B',
                    color: '#ffffff',
                    '&:hover': {
                      backgroundColor: '#E76D5B',
                    },
                  },
                },
              },
            }}
            sx={{
              color: '#E76D5B',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E76D5B',

              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E76D5B',

              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E76D5B',

              },
              '& .MuiSvgIcon-root': { // Dropdown arrow color
                color: '#E76D5B',
              },
            }}
          >
            <MenuItem key='All' value='All'>All</MenuItem>
            {categories.map(category => <MenuItem key={category} value={category}>{category}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      <div className="w-100 mt-5 p-4 overflow-y-auto bg-sg-light-green shadow-xl z-10">
        {stores.map((store) => {
          const isSelected = store.name === selectedStore?.properties.name;
          return (
            <div
              key={store.name}
              ref={(el) => { storeRefs.current[store.name] = el }}
              onClick={() => setSelectedStore(storesObj.find(s => s.properties.name === store.name))}
              className={`${isSelected ? 'bg-[#E76D5B] text-white hover:bg-[#E76D5B]/100 ' : 'bg-transparent'} hover:bg-[#E76D5B]/10 relative flex flex-col my-4 border border-sg-green rounded-lg transition-all duration-200 cursor-pointer p-4`}>
              <div className='w-100 flex justify-between'>
                <h4 className={`${isSelected ? 'text-white' : 'text-[#2A493F]'} mb-2 text-sg-green text-xl font-semibold`}>{store.name}</h4>
                <p className={`${isSelected ? 'text-white' : 'text-[#2A493F]'}`}>{store.category}</p>
              </div>

              <div className="text-sg-green leading-normal font-light">
                <div>
                  <span className="font-bold text-sm" >Address: </span>{store.address}
                </div>
                <div>
                  <span className="font-bold text-sm">Phone: </span>{store.phoneFormatted}
                </div>
                <Button className={`${isSelected ? 'bg-transparent text-white p-1.5' : 'bg-transparent border-[#E76D5B] text-[#E76D5B] p-1.5 '} `} onClick={() => addToFavorites(store)}>Add to Favorites</Button>
                {/* <Button className={`${isSelected ? 'bg-transparent text-white p-1.5 ml-3' : 'bg-transparent border-[#E76D5B] text-[#E76D5B] ml-3 p-1.5 '} `}>Contact</Button> */}
              </div>
            </div>
          )
        })}
      </div>
    </div>

  )
}

export default Sidebar