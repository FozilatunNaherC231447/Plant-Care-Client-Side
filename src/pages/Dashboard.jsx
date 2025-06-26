import React, { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { getAllPlants, getPlantsByUser } from "../services/plantService.js";
import { User, List, Plus, Leaf, Sprout } from "lucide-react";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [stats, setStats] = useState({
    totalUsers: 0,  // no API for total users, set 0 or remove
    totalPlants: 0,
    myPlants: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // get all plants to count total plants
        const allPlants = await getAllPlants();
        // get plants for current user
        const myPlantList = user?.email ? await getPlantsByUser(user.email) : [];

        setStats({
          totalUsers: 1, // no API available, so 0
          totalPlants: allPlants.length,
          myPlants: myPlantList.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

  if (loading) {
    return <div className="p-8">Loading Dashboard...</div>;
  }
return (
  <div
    className={`min-h-screen p-6 ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
    }`}
  >
    <h1 className="text-3xl font-bold text-center mb-8">🌱 Dashboard</h1>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard title="Total Users" value={stats.totalUsers} icon={<User />} theme={theme} />
      <StatCard title="Total Plants" value={stats.totalPlants} icon={<Leaf />} theme={theme} />
      <StatCard title="My Plants" value={stats.myPlants} icon={<Sprout />} theme={theme} />
    </div>

    <div className="mt-10 flex justify-center space-x-6">
      <DashboardLink to="/all-plants" text="All Items" icon={<List />} theme={theme} />
      <DashboardLink to="/add-plant" text="Add Item" icon={<Plus />} theme={theme} />
      <DashboardLink to="/my-plants" text="My Items" icon={<Sprout />} theme={theme} />
    </div>

    <div className="mt-10">
      <Outlet />
    </div>
  </div>
);

};

const StatCard = ({ title, value, icon, theme }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 rounded-2xl shadow
      ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
    >
      <div className="text-3xl">{icon}</div>
      <h3 className="text-xl font-bold mt-2">{title}</h3>
      <p className="text-2xl mt-1">{value}</p>
    </div>
  );
};

const DashboardLink = ({ to, text, icon, theme }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full font-semibold
        ${
          theme === "dark"
            ? "bg-green-600 hover:bg-green-500 text-white"
            : "bg-green-700 hover:bg-green-800 text-white"
        }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

export default Dashboard;
