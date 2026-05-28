import './vm.css'
import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import { StoreLocations } from './vendorData';
import 'mapbox-gl/dist/mapbox-gl.css';
import Marker from "./marker"
import Sidebar from './sidebar';
import VendorSwipersComp from '../vendorSwiper/vSwiper';
import { Button } from '@mui/base'
import { useGetAllVendors } from '../../hooks/useGetAllVendors'


const VendorMap = () => {
    const mapRef = useRef(null)
    const mapContainerRef = useRef()
    const [cachedStores, setCachedStores] = useState([])
    const [stores, setStores] = useState([])
    const [mapLoaded, setMapLoaded] = useState(false)
    const [selectedStore, setSelectedStore] = useState(null)
    const [isCollapsed, setIsCollapsed] = useState(false) // Add this state
    const [isAll, setIsAll] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const { getAllVendors, vendors } = useGetAllVendors()

    useEffect(() => {
        if (vendors && vendors.all_vendors) {
            setCachedStores(vendors.all_vendors)
            setStores(vendors.all_vendors)
            console.log('Vendors updated - cachedStores and stores:', vendors.all_vendors)
        }
    }, [vendors])

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2b3JpaSIsImEiOiJjbWw4b2YwOTMwOXdqM2ZxMWZhNTI2ODE3In0.1Xe5JAaUCvvZ_6jOoKW-aA'

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            center: [-81.5000, 40.0000],
            zoom: 5,
            config: {
                basemap: { theme: 'faded' }
            }
        });

        mapRef.current.on('load', () => {
            setMapLoaded(true)
        })

        return () => {
            mapRef.current.remove()
        }
    }, [])

    useEffect(() => {
        getAllVendors()
    }, [])

    useEffect(() => {
        if (vendors && vendors.favorite_vendors) {
            localStorage.setItem('favorite_vendors', JSON.stringify(vendors.favorite_vendors))
            console.log('Favorite vendors stored in localStorage:', vendors.favorite_vendors)
        }
    }, [vendors])

    useEffect(() => {
        if (!selectedStore) return

        mapRef.current.flyTo({
            center: [selectedStore.geometry.coordinates[0], selectedStore.geometry.coordinates[1]],
            zoom: 13,
            duration: 1000
        })
    }, [selectedStore, stores])

    const updateAll = () => {
        setIsAll(true)
        setSelectedCategory('All')
        setCachedStores(vendors?.all_vendors || [])
        setStores(vendors?.all_vendors || [])
    }

    const updateStores = () => {
        setIsAll(false)
        setSelectedCategory('All')
        const getSavedVendors = localStorage.getItem('favorite_vendors')
        try {
            const parsed = JSON.parse(getSavedVendors)
            if (Array.isArray(parsed)) {
                setCachedStores(parsed)
                setStores(parsed)
            }
        } catch (error) {
            console.error('Error parsing favorite vendors:', error)
        }
    }

    return (
        <div>
            <div className="flex mt-8 absolute h-3/4 w-3/4 mobile-map-position">
                <Sidebar
                    storesObj={cachedStores}
                    updatePins={setStores}
                    selectedStore={selectedStore}
                    setSelectedStore={setSelectedStore}
                />

                <div className="w-3/4 mobile-map-position-canvas-container">
                    <div className="h-full w-full mobile-canvas-margin-top" ref={mapContainerRef} />
                    {mapLoaded && stores.map(location => (
                        <Marker
                            key={location.properties.name}
                            feature={location}
                            map={mapRef.current}
                            setSelectedStore={setSelectedStore}
                            selectedStore={selectedStore}
                        />
                    ))}
                    
                    <div className={`mobileInformaitonContainer ${isCollapsed ? 'collapsed' : 'expanded'}`}>
                        {/* Collapse/Expand Tab */}
                        <div 
                            className='collapse-tab' 
                            onClick={() => setIsCollapsed(!isCollapsed)}
                        />
                        
                        {/* Content - only show when expanded */}
                        {!isCollapsed && (
                            <div className='mobile-content'>
                                <div className='md:hidden w-full flex justify-between mb-5'>
                                    <Button 
                                        className={`${isAll ? 'text-[white] bg-[#E76D5B] hover:bg-[#E76D5B]/80 ' : 'bg-transparent hover:bg-[#E76D5B]/10 '} w-[170px] pt-2 pb-2 mt-0 border-[#E76D5B] text-[#E76D5B] rounded-lg transition-all duration-200 cursor-pointer`}
                                        onClick={() => updateAll()}
                                    >
                                        All
                                    </Button>
                                    <Button 
                                        className={`${isAll ? 'bg-transparent hover:bg-[#E76D5B]/10' : 'bg-[#E76D5B] text-[white] hover:bg-[#E76D5B]/80'} w-[170px] pt-2 pb-2 mt-0 border-[#E76D5B] text-[#E76D5B] rounded-lg transition-all duration-200 cursor-pointer`}
                                        onClick={() => updateStores()}
                                    >
                                        Favorites
                                    </Button>
                                </div>
                
                                <VendorSwipersComp
                                    storesObj={cachedStores}
                                    updatePins={setStores}
                                    selectedStore={selectedStore}
                                    setSelectedStore={setSelectedStore}
                                    data={["Johns Plumbing", "Peter Industrial Incorporation Ltd."]}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorMap;