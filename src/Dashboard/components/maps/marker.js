import { useEffect, useRef } from "react"
import { createPortal } from "react-dom";
import mapboxgl from 'mapbox-gl'
import mapPin from './../../../artifacts/maPin.svg'
import redPin from './../../../artifacts/red-pin.svg'
import './vm.css'
// import FmdGoodIcon from '@mui/icons-material/FmdGood';




const Marker = ({ map, feature, selectedStore, setSelectedStore  }) => {
    const { geometry } = feature

    const contentRef = useRef(document.createElement("div"));
    const markerRef = useRef(null)
    const isSelected = feature.properties.name === selectedStore?.properties.name;


    useEffect(() => {
        markerRef.current = new mapboxgl.Marker(contentRef.current)
            .setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
            .addTo(map)

        return () => {
            if (markerRef.current) {
                markerRef.current.remove()
            }
        }
    }, [map, geometry.coordinates])

    return (
        <>
            {createPortal(
                <div 
                onClick={() => setSelectedStore(feature)}
                    className={'bg-contain bg-no-repeat cursor-pointer transition w-[37px] h-[40px] '}
                     style={{
                        backgroundImage: (
                            isSelected
                            ? `url(${mapPin})`
                            : `url(${redPin})`),
                    }}>
                </div>,
                contentRef.current
            )}
        </>
    )
}

export default Marker