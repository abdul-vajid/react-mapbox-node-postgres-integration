import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import mapboxgl from 'mapbox-gl';
import { setLocation } from '../redux/mapSlice';

mapboxgl.accessToken =  import.meta.env.VITE_MAP_ACCESSTOKEN;

const MyMapNew = ({ search }) => {
    const currentLocation = useSelector(state => state.mapReducer.currentLocation);
    const locations = useSelector(state => state.mapReducer.locations);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(81.6629398752681);
    const [lat, setLat] = useState(21.25072033274379);
    const [searchAddress, setSearchAddress] = useState();
    const [zoom, setZoom] = useState(10);
    const marker = useRef(null);
    const dispatch = useDispatch()
    useEffect(() => {
        setSearchAddress(search)
    }, [search]);

    useEffect(() => {
        if (currentLocation.address) {
            setLng(currentLocation.lng);
            setLat(currentLocation.lat);
            setSearchAddress(currentLocation.address)
        } else if(locations.length > 0) {
            setLng(locations[0].lng);
            setLat(locations[0].lat);
            setSearchAddress(locations[0].address)
        }

    }, [locations, currentLocation]);


    useEffect(() => {
        const searchLocation = async () => {
            if (searchAddress) {
                const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchAddress}.json?access_token=${mapboxgl.accessToken}`);
                const data = await response.json();

                if (data.features && data.features.length > 0) {
                    const { center } = data.features[0];
                    const newLng = center[0];
                    const newLat = center[1];
                    // setLng(newLng);
                    // setLat(newLat);
                    dispatch(setLocation({ address: searchAddress, lat: newLat, lng: newLng }))

                    marker.current.remove();

                    marker.current = new mapboxgl.Marker({color: "red"})
                        .setLngLat([newLng, newLat])
                        .addTo(map.current);

                    map.current.setCenter([newLng, newLat]);
                    map.current.setZoom(10);
                } else {
                    console.log('Location not found.');
                }
            }
        };
        searchLocation();
    }, [searchAddress])

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        marker.current = new mapboxgl.Marker({color: "red"})
            .setLngLat([lng, lat])
            .addTo(map.current);

        map.current.on('click', async (e) => {
            const { lng, lat } = e.lngLat;

            setLng(lng);
            setLat(lat);

            marker.current.remove();
            marker.current = new mapboxgl.Marker({color: "red"})
                .setLngLat([lng, lat])
                .addTo(map.current);

            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`);
            const data = await response.json();

            const address = data.features[0].place_name;

            dispatch(setLocation({ address: address, lat: lat, lng: lng }))
            console.log(`Latitude: ${lat}, Longitude: ${lng}, Address: ${address}`);
        });
    }, [lng, lat]);

    return (
        <div>
            <div ref={mapContainer} style={{ height: "100vh", width: "70vw" }} />
        </div>
    )
}

export default MyMapNew;

