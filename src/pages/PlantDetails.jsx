import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlantById } from '../services/plantService';

const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const data = await getPlantById(id);
        if (!data || Object.keys(data).length === 0) {
          setError('Plant not found');
          navigate('/404');
          return;
        }
        setPlant(data);
      } catch (err) {
        setError('Failed to load plant details');
        navigate('/404');
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id, navigate]);

  if (loading) return <p className="text-center mt-10 text-green-700 font-semibold">Loading plant details...</p>;
  if (error) return <p className="text-center mt-10 text-red-600 font-semibold">{error}</p>;
  if (!plant) return <p className="text-center mt-10 text-gray-500">No plant data available.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-lg border border-green-100 mb-12">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-lg border border-green-300 shadow-sm"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-green-800 mb-4">{plant.name}</h1>
            <p className="mb-2">
              <span className="font-semibold text-green-700">Category:</span> {plant.category}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-green-700">Care Level:</span> {plant.careLevel}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-green-700">Watering Frequency:</span> {plant.wateringFrequency}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-green-700">Last Watered:</span>{' '}
              {plant.lastWateredDate ? new Date(plant.lastWateredDate).toLocaleDateString() : 'N/A'}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-green-700">Next Watering:</span>{' '}
              {plant.nextWateringDate ? new Date(plant.nextWateringDate).toLocaleDateString() : 'N/A'}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-green-700">Health Status:</span> {plant.healthStatus}
            </p>
            <p className="mb-2">
              <span className="font-semibold text-green-700">Description:</span> {plant.description}
            </p>
          </div>
          <p className="mt-6 text-sm text-green-600 italic">
            Added by: {plant.userName} ({plant.userEmail})
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
