import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAllPlants } from '../services/plantService';
import { ThemeContext } from '../context/ThemeContext';

const AllPlants = () => {
  const [plants, setPlants] = useState([]);
  const [sortKey, setSortKey] = useState('');
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const data = await getAllPlants();
        setPlants(data);
      } catch (error) {
        console.error('Failed to fetch plants:', error);
      }
    };
    fetchPlants();
  }, []);

  const handleSort = (key) => {
    setSortKey(key);
    const sorted = [...plants].sort((a, b) => {
      if (key === 'nextWateringDate') {
        return new Date(a.nextWateringDate) - new Date(b.nextWateringDate);
      } else if (key === 'careLevel') {
        const levelMap = { easy: 1, moderate: 2, difficult: 3 };
        return (levelMap[a.careLevel?.toLowerCase()] || 0) - (levelMap[b.careLevel?.toLowerCase()] || 0);
      }
      return 0;
    });
    setPlants(sorted);
  };

  return (
    <div className={`p-7 lg:px-20  mx-auto ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">All Plants</h2>
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => handleSort("nextWateringDate")}
          className={`px-4 py-2 rounded ${sortKey === 'nextWateringDate' ? 'bg-blue-800' : 'bg-green-700 hover:bg-green-600'} text-white`}
        >
          Sort by Next Watering Date
        </button>
        <button
          onClick={() => handleSort("careLevel")}
          className={`px-4 py-2 rounded ${sortKey === 'careLevel' ? 'bg-purple-800' : 'bg-green-500 hover:bg-green-400'} text-white`}
        >
          Sort by Care Level
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plants.map((plant) => (
          <div key={plant._id} className={`rounded-lg shadow hover:shadow-lg flex flex-col h-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <img
              src={plant.image || 'https://via.placeholder.com/300x200.png?text=No+Image'}
              alt={plant.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 flex flex-col flex-1">
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{plant.name}</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm mt-2 flex-1`}>
                {plant.description
                  ? plant.description.slice(0, 100) + (plant.description.length > 100 ? '...' : '')
                  : 'No description available.'}
              </p>
              <Link
                to={`/plant/${plant._id}`}
                className="mt-4 bg-green-700 text-white rounded-full text-center py-2 hover:bg-blue-700 transition"
              >
                See More
              </Link>
            </div>
          </div>
        ))}
      </div>
      {plants.length === 0 && <p className="text-center mt-6">No plants found.</p>}
    </div>
  );
};

export default AllPlants;
