import React, { useEffect, useState } from 'react';
import { getAllPlants } from '../services/plantService';
import { Link } from 'react-router-dom';

const AllPlants = () => {
  const [plants, setPlants] = useState([]);
  const [sortKey, setSortKey] = useState('');

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
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">All Plants</h2>

      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => handleSort('nextWateringDate')}
          className={`px-4 py-2 rounded text-white transition-colors duration-300 ${
            sortKey === 'nextWateringDate' ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Sort by Next Watering Date
        </button>
        <button
          onClick={() => handleSort('careLevel')}
          className={`px-4 py-2 rounded text-white transition-colors duration-300 ${
            sortKey === 'careLevel' ? 'bg-purple-800' : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          Sort by Care Level
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-collapse shadow-md">
          <thead className="bg-green-200">
            <tr>
              <th className="border p-3 text-left text-sm sm:text-base">Name</th>
              <th className="border p-3 text-left text-sm sm:text-base hidden sm:table-cell capitalize">Category</th>
              <th className="border p-3 text-left text-sm sm:text-base hidden md:table-cell">Watering Frequency</th>
              <th className="border p-3 text-left text-sm sm:text-base hidden md:table-cell capitalize">Care Level</th>
              <th className="border p-3 text-left text-sm sm:text-base hidden lg:table-cell">Next Watering Date</th>
              <th className="border p-3 text-left text-sm sm:text-base">Details</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant) => (
              <tr key={plant._id} className="hover:bg-gray-100">
                <td className="border p-3 text-sm sm:text-base">{plant.name}</td>
                <td className="border p-3 text-sm sm:text-base hidden sm:table-cell capitalize">{plant.category}</td>
                <td className="border p-3 text-sm sm:text-base hidden md:table-cell">{plant.wateringFrequency}</td>
                <td className="border p-3 text-sm sm:text-base hidden md:table-cell capitalize">{plant.careLevel}</td>
                <td className="border p-3 text-sm sm:text-base hidden lg:table-cell">
                  {plant.nextWateringDate
                    ? new Date(plant.nextWateringDate).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td className="border p-3 text-sm sm:text-base">
                  <Link
                    to={`/plant/${plant._id}`}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {plants.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No plants found.</p>
      )}
    </div>
  );
};

export default AllPlants;
