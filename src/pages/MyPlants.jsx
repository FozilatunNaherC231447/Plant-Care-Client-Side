import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getPlantsByUser, deletePlant } from '../services/plantService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyPlants = () => {
  const { user } = useContext(AuthContext);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyPlants = async () => {
      if (!user) return;
      try {
        const data = await getPlantsByUser(user.email);
        setPlants(data);
      } catch (err) {
        console.error('Error fetching user plants:', err);
        toast.error('Failed to fetch your plants.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyPlants();
  }, [user]);

  const handleDeleteClick = (plant) => {
    setPlantToDelete(plant);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!plantToDelete) return;
    try {
      await deletePlant(plantToDelete._id);
      setPlants(plants.filter((p) => p._id !== plantToDelete._id));
      toast.success('Plant deleted successfully.');
    } catch (err) {
      console.error('Error deleting plant:', err);
      toast.error('Failed to delete plant.');
    } finally {
      setShowConfirm(false);
      setPlantToDelete(null);
    }
  };

  if (loading) return <p className="text-center mt-10 text-green-700 text-lg">🌿 Loading your plants...</p>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-green-50 rounded-lg shadow-lg mt-10 mb-10">
      <h2 className="text-4xl font-bold text-green-900 mb-6 text-center font-serif">🌼 My Garden</h2>

      {plants.length === 0 ? (
        <p className="text-center text-green-800">No plants added yet. Start growing your garden! 🌱</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <div key={plant._id} className="bg-white border border-green-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={plant.image}
                alt={plant.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-900">{plant.name}</h3>
                <p className="text-green-700 italic">{plant.category}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => navigate(`/update-plant/${plant._id}`)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm shadow"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDeleteClick(plant)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full border border-green-200">
            <h3 className="text-xl font-semibold text-green-900 mb-4">Confirm Deletion</h3>
            <p className="text-green-800">
              Are you sure you want to delete{' '}
              <span className="font-bold text-red-600">"{plantToDelete.name}"</span>?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPlants;
