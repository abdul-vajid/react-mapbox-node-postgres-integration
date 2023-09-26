import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axiosInstance from '../config/apiConfig';
import { pushLocation } from '../redux/mapSlice';

const CurrentLocationCard = () => {
    const [showbtn, setShowbtn] = useState(false);
    const [clng, setCLng] = useState(0);
    const [clat, setCLat] = useState(0);
    const [caddress, setCAddess] = useState("");
    const { address, lng, lat } = useSelector(state => state.mapReducer.currentLocation);
    const locations = useSelector(state => state.mapReducer.locations);
    const dispatch = useDispatch()

    useEffect(() => {
        setCLng(lng)
        setCLat(lat)
        setCAddess(address);
        const isCurrentLocationInLocations = locations.some(location => location.address === address);
        if (isCurrentLocationInLocations) {
            setShowbtn(false)
        } else {
            setShowbtn(true)
        }
    }, [address, lng, lat])

    const saveLocation = async () => {
        try {
            const response = await axiosInstance.post("location", {
                address,
                lat,
                lng
            })
            dispatch(pushLocation(response.data.savedLocation))
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="block w-full mt-5 p-6 rounded-lg shadow bg-gray-800 border-gray-700">
            <p className="font-normal text-gray-400 mb-5">Current Pin</p>
            <span className="text-2xl text-white font-bold tracking-tight">{caddress}</span>
            <p className="mt-2 font-normal  text-gray-400">Latitude: {clat}</p>
            <p className="font-normal text-gray-400">Longitude: {clng}</p>
            {
                showbtn && <button type="button" onClick={saveLocation} className="text-white mt-5 right-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">Save Location</button>
            }
        </div>
    )
}

export default CurrentLocationCard