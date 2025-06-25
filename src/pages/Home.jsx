import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import { getAllPlants } from '../services/plantService';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import Lottie from 'lottie-react';
import emptyAnimation from '../assets/empty.json';

const slides = [
  { image: banner1 },
  { image: banner2 },
  { image: banner3 },
];

const Home = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const data = await getAllPlants();
        setPlants(data);
      } catch (err) {
        setError('Failed to load plants');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading plants...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      {/* Banner / Slider */}
      <div>
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: current === index ? 1 : 0 }}
            transition={{ duration: 1 }}
            className={`relative ${current === index ? 'block' : 'hidden'}`}
          >
            <img src={slide.image} alt="Banner" className="w-full h-[500px] object-cover" />
          </motion.div>
        ))}
      </div>

      {/* New Plants by Category */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">New Arrivals</h2>
        {plants.length === 0 ? (
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow max-w-xl mx-auto">
            <Lottie animationData={emptyAnimation} loop={true} className="h-64 w-full mx-auto" />
            <p className="text-lg mt-4 text-white">No plants found</p>
          </div>
        ) : (
          Object.entries(
            plants.reduce((acc, plant) => {
              acc[plant.category] = acc[plant.category] || [];
              acc[plant.category].push(plant);
              return acc;
            }, {})
          ).map(([category, categoryPlants]) => (
            <div key={category} className="mb-12">
              <h3 className="text-3xl font-bold mb-4 text-green-700 dark:text-green-700">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categoryPlants.map((plant) => (
                  <div key={plant._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                    <img src={plant.image} alt={plant.name} className="h-48 w-full object-cover rounded" />
                    <h3 className="mt-2 font-bold text-lg dark:text-white">{plant.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{plant.category}</p>
                    <Link
                      to={`/plant/${plant._id}`}
                      className="inline-block mt-3 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Section 1: Top Plant Care Mistakes */}
      <section className="py-12 bg-green-100 dark:bg-green-900 px-4 mx-5">
        <h2 className="text-4xl font-bold text-center mb-6 text-black dark:text-white">Top Plant Care Mistakes</h2>
        <ul className="list-disc max-w-2xl mx-auto space-y-2 text-gray-700 dark:text-gray-300 text-lg pl-10 md:pl-36">
          <li>Overwatering or underwatering regularly.</li>
          <li>Not adjusting care based on seasonal changes.</li>
          <li>Ignoring signs of plant stress or disease.</li>
          <li>Using the wrong type of soil or fertilizer.</li>
          <li>Placing plants in unsuitable lighting conditions.</li>
        </ul>
      </section>

      {/* Section 2: Beginner-Friendly Plants */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Beginner-Friendly Plants</h2>
        <div className="flex flex-wrap justify-center gap-12">
          <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-md w-96">
            <h3 className="font-semibold text-2xl text-black dark:text-white">🪴 Snake Plant</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mt-5">
              Tolerates low light and infrequent watering. Very resilient.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-md w-96">
            <h3 className="font-semibold text-2xl text-black dark:text-white">🌿 Spider Plant</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-5">
              Adapts to a variety of conditions and grows rapidly.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-md w-96">
            <h3 className="font-semibold text-2xl text-black dark:text-white">🌱 Pothos</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-5">
              Great for beginners – hard to kill and thrives easily.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
