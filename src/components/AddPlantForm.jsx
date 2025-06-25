
import React, { useState } from 'react';
import { addPlant } from '../services/plantService';

const AddPlantForm = ({ onPlantAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    image: '',
    careLevel: '',
    wateringFrequency: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addPlant(formData);
    setFormData({
      name: '',
      category: '',
      description: '',
      image: '',
      careLevel: '',
      wateringFrequency: '',
    });
    if (onPlantAdded) onPlantAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Add a New Plant</h2>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="border p-2 mb-2 w-full" />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required className="border p-2 mb-2 w-full" />
      <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="border p-2 mb-2 w-full" />
      <input name="careLevel" value={formData.careLevel} onChange={handleChange} placeholder="Care Level" className="border p-2 mb-2 w-full" />
      <input name="wateringFrequency" value={formData.wateringFrequency} onChange={handleChange} placeholder="Watering Frequency" className="border p-2 mb-2 w-full" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 mb-2 w-full" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Plant</button>
    </form>
  );
};

export default AddPlantForm;
