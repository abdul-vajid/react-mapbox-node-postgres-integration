import React, { useState } from 'react';
import './App.css'
import { useSelector } from 'react-redux'
import CurrentLocationCard from './components/CurrentLocationCard';
import ListItem from './components/ListItem';
import SearchField from './components/SearchField';
import Map from './components/Map';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const { address } = useSelector(state => state.mapReducer.currentLocation);

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };
  
  return (
    <div className='flex justify-between'>
      <div className='max-h-fit w-[28%] p-5 flex flex-col items-center'>
        <span className='text-blue-800 text-3xl font-bold'>Map Integration</span>
        <SearchField onSearch={handleSearchValue} />
        {address && <CurrentLocationCard />}
        <ListItem />
      </div>
      <div className='fixed right-0'>
        <Map search={searchValue} />
      </div>
    </div>
  );
}

export default App