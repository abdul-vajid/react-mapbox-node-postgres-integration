import React, { useEffect } from 'react'
import axiosInstance from '../config/apiConfig.js'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation, setLocations } from '../redux/mapSlice.js';

const ListItem = () => {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.mapReducer.locations);

  const handleClick = (address, lat, lng) => {
    dispatch(setLocation({ address, lat, lng }))
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get("/locations");
        console.log("response", response);
        dispatch(setLocations(response.data.locations));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [dispatch]);

  return (
    <div className='w-full mt-5 mb-2'>
      <span className='font-bold text-xl'>Saved locations</span>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {
          locations.map((item, i) => (
            <li className="py-2" key={i}>
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {item.address}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    lat: {item.lat}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    lng: {item.lng}
                  </p>
                </div>
                <button onClick={() => handleClick(item.address, item.lat, item.lng)} className="text-base font-semibold text-blue-900">
                  View
                </button>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default ListItem