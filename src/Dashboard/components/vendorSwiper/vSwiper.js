// VendorSwipersComp.js
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';
import './vSlide.css'
import 'swiper/css';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CallIcon from '@mui/icons-material/Call';
import StarIcon from '@mui/icons-material/Star';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { useAddToFavorites } from '../../hooks/useAddToFavorites'

const VendorSwipersComp = ({ storesObj, selectedStore, setSelectedStore, updatePins }) => {
    const cachedStores = [...new Set(storesObj.map(storeP => storeP.properties))]
    const [filteredStores, setFilteredStores] = useState(cachedStores)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const categories = [...new Set(cachedStores.map(store => store.category))]
    const swiperRef = useRef(null)
    const { addToFavorites, alertBanner, alertMessage, alertSeverity } = useAddToFavorites()

    // Update filteredStores when storesObj changes
    useEffect(() => {
        const newCachedStores = [...new Set(storesObj.map(storeP => storeP.properties))]
        setFilteredStores(newCachedStores)
        setSelectedCategory('All')
    }, [storesObj])

    // Filter stores by category
    const filterStores = (event) => {
        const targetCategory = event.target.value
        let filtered
        let pins

        if (targetCategory !== 'All') {
            filtered = cachedStores.filter(store => store.category === targetCategory)
            pins = storesObj.filter(store => store.properties.category === targetCategory)
        } else {
            filtered = cachedStores
            pins = storesObj
        }

        setFilteredStores(filtered)
        updatePins(pins)
        setSelectedCategory(targetCategory)
        
        // Reset to first card after filtering
        if (swiperRef.current) {
            swiperRef.current.slideTo(0)
        }
    }

    // When a pin is selected, navigate to that card
    useEffect(() => {
        if (selectedStore && swiperRef.current) {
            const index = filteredStores.findIndex(
                store => store.name === selectedStore.properties.name
            )
            if (index !== -1) {
                swiperRef.current.slideTo(index)
            }
        }
    }, [selectedStore, filteredStores])

    // When user swipes, update selected store
    const handleSlideChange = (swiper) => {
        const currentIndex = swiper.activeIndex
        const store = filteredStores[currentIndex]
        const fullStore = storesObj.find(s => s.properties.name === store.name)
        setSelectedStore(fullStore)
    }

    return (
        <div className='slider-container'>
            {
                alertBanner && 
                <Stack sx={{ width: '100%' }} spacing={2} className='mb-3'>
                    <Alert severity={alertSeverity}>
                        {alertMessage}
                    </Alert>
                </Stack>
            }
            {/* Category Filter */}
            <Box sx={{ minWidth: 120, color: '#E76D5B', marginBottom: 2 }} className='w-100'>
                <FormControl fullWidth>
                    <InputLabel id="mobile-select-label">Category</InputLabel>
                    <Select
                        labelId="mobile-select-label"
                        id="mobile-select"
                        value={selectedCategory}
                        label="Category"
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
                            width: '100%',
                            borderRadius: '16px',
                            backgroundColor: '#ffffff',
                            boxShadow: '8px 8px 16px rgba(163, 177, 198, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.7)',
                            color: '#E76D5B',
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                            '& .MuiSvgIcon-root': {
                                color: '#E76D5B',
                            },
                        }}
                    >
                        <MenuItem key='All' value='All'>All Categories</MenuItem>
                        {categories.map(category => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Swiper */}
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={handleSlideChange}
                onSwiper={(swiper) => { swiperRef.current = swiper }}
            >
                {filteredStores.map((store) => {
                    const isSelected = store.name === selectedStore?.properties.name
                    return (
                        <SwiperSlide key={store.name} className='mobile-img-swiper-container'>
                            <div className={`card-soft ${isSelected ? 'selected' : ''}`}>
                                <div className='flex justify-between items-center mb-3'>
                                    <h1 className='text-[#2A493F] vendor-name'>{store.name}</h1>
                                    <span className='text-sm text-gray-500 text-[#2A493F]'>{store.category}</span>
                                </div>
                                <p className='vText'>{store.address}</p>
                                <p className='vText'>{store.city}, {store.state} {store.country}</p>
                                <p className='vText'>{store.phoneFormatted}</p>

                                <div className='mt-4'>
                                    <button className='vndr-card-btn mr-2 pl-5 bg-[#E76D5B]' onClick={() => addToFavorites(store)}><StarIcon sx={{width: 15}}/> Add to Favorites</button>
                                    <button className='vndr-card-btn bg-[#E76D5B]'><CallIcon sx={{width: 15}}/> Call</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
            
            <p className="text-sg-green text-center mt-3 vText">
                {filteredStores.length} vendor{filteredStores.length !== 1 ? 's' : ''} found
            </p>
        </div>
    )
}

export default VendorSwipersComp;