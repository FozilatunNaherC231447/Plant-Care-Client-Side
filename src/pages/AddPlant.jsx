import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { createPlant } from '../services/plantService';
import { useNavigate } from 'react-router-dom';

const AddPlant = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image: '',
    name: '',
    category: 'Succulent',
    description: '',
    careLevel: 'Easy',
    wateringFrequency: '',
    lastWateredDate: '',
    nextWateringDate: '',
    healthStatus: '',
    userEmail: user?.email || '',
    userName: user?.displayName || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPlant(formData);
      toast.success('🌱 Plant added successfully!');
      navigate('/myplants');
    } catch (error) {
      console.error('Error adding plant:', error);
      toast.error('❌ Failed to add plant. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-green-50 border border-green-200 rounded-lg shadow-lg mt-12 mb-12">
      <h2 className="text-3xl font-extrabold text-green-900 mb-8 text-center font-serif tracking-wide">
        🌿 Add a New Plant to Your Garden
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold text-green-800 mb-2">Image URL</label>
          <input
            name="image"
            type="url"
            required
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-green-800 mb-2">Plant Name</label>
          <input
            name="name"
            required
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-green-800 mb-2">Category</label>
          <select
            name="category"
            required
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.category}
          >
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
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.careLevel}
          >
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
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.wateringFrequency}
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
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-green-800 mb-2">Health Status</label>
          <select
            name="healthStatus"
            required
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.healthStatus}
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
            onChange={handleChange}
            className="w-full border border-green-300 bg-white p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 bg-green-700 text-white py-3 rounded-full hover:bg-green-800 transition font-semibold tracking-wide shadow-lg"
        >
          🌱 Submit Plant
        </button>
      </form>
    </div>
  );
};

export default AddPlant;
