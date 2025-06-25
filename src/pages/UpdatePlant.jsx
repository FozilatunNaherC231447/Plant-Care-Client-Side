import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { getPlantById, updatePlant } from '../services/plantService';

const UpdatePlant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    image: '',
    name: '',
    category: '',
    description: '',
    careLevel: '',
    wateringFrequency: '',
    lastWateredDate: '',
    nextWateringDate: '',
    healthStatus: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const plant = await getPlantById(id);
        if (!user || plant.userEmail !== user.email) {
          toast.error('You are not authorized to update this plant.');
          navigate('/my-plants');
          return;
        }

        setFormData({
          image: plant.image,
          name: plant.name,
          category: plant.category,
          description: plant.description,
          careLevel: plant.careLevel,
          wateringFrequency: plant.wateringFrequency,
          lastWateredDate: plant.lastWateredDate?.slice(0, 10),
          nextWateringDate: plant.nextWateringDate?.slice(0, 10),
          healthStatus: plant.healthStatus,
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch plant data:', err);
        toast.error('Failed to fetch plant data.');
        navigate('/my-plants');
      }
    };

    fetchPlant();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePlant(id, formData);
      toast.success('🌿 Plant updated successfully!');
      navigate('/my-plants');
    } catch (err) {
      console.error('Failed to update plant:', err);
      toast.error('Failed to update plant.');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-green-50 border border-green-200 rounded-lg shadow-lg mt-12 mb-12">
      <h2 className="text-3xl font-extrabold text-green-900 mb-8 text-center font-serif tracking-wide">
        🌿 Update Your Plant
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold text-green-800 mb-2">Image URL</label>
          <input
            name="image"
            type="url"
            required
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-green-800 mb-2">Plant Name</label>
          <input
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-green-800 mb-2">Category</label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Category</option>
            <option value="Succulent">Succulent</option>
            <option value="Fern">Fern</option>
            <option value="Flowering">Flowering</option>
            <option value="Bonsai">Bonsai</option>
            <option value="Cactus">Cactus</option>
            <option value="Herb">Herb</option>
            <option value="Tree">Tree</option>
            <option value="Tropical">Tropical</option>
            <option value="Ornamental">Ornamental</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-green-800 mb-2">Care Level</label>
          <select
            name="careLevel"
            required
            value={formData.careLevel}
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Care Level</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Difficult">Difficult</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-green-800 mb-2">Watering Frequency</label>
          <select
            name="wateringFrequency"
            required
            value={formData.wateringFrequency}
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Frequency</option>
            <option value="Daily">Daily</option>
            <option value="Every 2 days">Every 2 days</option>
            <option value="Every 3 days">Every 3 days</option>
            <option value="Weekly">Weekly</option>
            <option value="Every 10 days">Every 10 days</option>
            <option value="Bi-weekly">Bi-weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-green-800 mb-2">Last Watered Date</label>
          <input
            name="lastWateredDate"
            type="date"
            required
            value={formData.lastWateredDate}
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-green-800 mb-2">Next Watering Date</label>
          <input
            name="nextWateringDate"
            type="date"
            required
            value={formData.nextWateringDate}
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-green-800 mb-2">Health Status</label>
          <select
            name="healthStatus"
            required
            value={formData.healthStatus}
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Health Status</option>
            <option value="Healthy">Healthy</option>
            <option value="Needs Water">Needs Water</option>
            <option value="Overwatered">Overwatered</option>
            <option value="Underwatered">Underwatered</option>
            <option value="Pest Infestation">Pest Infestation</option>
            <option value="Wilting">Wilting</option>
            <option value="Yellowing Leaves">Yellowing Leaves</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-green-800 mb-2">Description</label>
          <textarea
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-green-700 text-white py-3 rounded-full hover:bg-green-800 transition font-semibold tracking-wide shadow-lg"
        >
          🌿 Update Plant
        </button>
      </form>
    </div>
  );
};

export default UpdatePlant;
