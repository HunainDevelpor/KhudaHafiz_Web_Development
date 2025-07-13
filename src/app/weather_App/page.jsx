// "use client";
// import { useState } from 'react';
// import Link from 'next/link';

// export default function WeatherApp() {
//   const [weather, setWeather] = useState(null);
//   const [city, setCity] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchWeather = async (city) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
//       const response = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${city},PK&appid=${apiKey}&units=metric`
//       );

//       if (!response.ok) {
//         throw new Error('City not found');
//       }

//       const data = await response.json();
//       setWeather(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gradient-to-tr from-gray-600 to-gray-900 flex flex-col items-center justify-start p-8">
//         <h1 className="text-3xl font-bold mb-6 text-white">Pakistan Weather App</h1>

//         <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
//           <input
//             type="text"
//             placeholder="Enter city name (e.g. Lahore)"
//             className="px-4 py-2 border rounded w-full"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//           />
//           <button
//             onClick={() => fetchWeather(city)}
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Search
//           </button>
//         </div>

//         {loading && <p className="mt-6 text-gray-300">Loading...</p>}
//         {error && <p className="mt-6 text-red-400">{error}</p>}

//         {weather && (
//           <div className="mt-8 p-6 bg-white rounded shadow-md text-center w-full max-w-md">
//             <h2 className="text-2xl font-semibold mb-2 text-blue-800">{weather.name}</h2>
//             <p className="text-lg">🌡️ Temp: {weather.main.temp} °C</p>
//             <p className="text-lg">💧 Humidity: {weather.main.humidity}%</p>
//             <p className="text-lg">🌬️ Wind: {weather.wind.speed} m/s</p>
//             <p className="text-lg">
//               🌤️ Condition: {weather.weather[0].main} ({weather.weather[0].description})
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Fixed Back Button */}
//       <div className="fixed bottom-4 left-4 z-50">
//         <Link
//           href="/"
//           className="bg-white border border-gray-300 text-blue-700 px-4 py-2 rounded shadow hover:bg-blue-50 transition duration-200"
//         >
//           ← Back to Home
//         </Link>
//       </div>
//     </>
//   );
// }




"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import NProgress from "nprogress";

export default function WeatherApp() {
  // States
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  // Start and stop loading bar
  const startLoading = () => NProgress.start();
  const stopLoading = () => NProgress.done();

  // Fetch weather by city
  const fetchWeather = async (q) => {
    startLoading();
    setError(null);
    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const url = q.lat
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${q.lat}&lon=${q.lon}&appid=${apiKey}&units=metric`
        : `https://api.openweathermap.org/data/2.5/weather?q=${q},PK&appid=${apiKey}&units=metric`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      stopLoading();
    }
  };

  // Fetch current location weather
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => fetchWeather({ lat: coords.latitude, lon: coords.longitude }),
        () => console.log("Geolocation permission denied"),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-gray-600 to-gray-800 flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-6 text-blue-600 drop-shadow">Pakistan Weather 🌤️</h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-6 animate-fadeIn">
          <input
            type="text"
            placeholder="Enter city name..."
            className="px-4 py-2 border-gray-50 outline rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={() => fetchWeather(city)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-600 mb-4 animate-fadeIn">{error}</p>}

        {weather && (
          <div className="bg-gradient-to-tr from-gray-700 to-gray-800  rounded-2xl shadow-lg p-6 mt-30 w-full max-w-sm animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-2">{weather.name}</h2>
            <div className="flex justify-center items-center mb-4">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="w-20 h-20"
              />
            </div>
            <p className="text-xl">🌡️ {weather.main.temp}°C</p>
            <p className="text-md">Humidity: {weather.main.humidity}%</p>
            <p className="text-md">Wind: {weather.wind.speed} m/s</p>
            <p className="text-md capitalize">{weather.weather[0].description}</p>
          </div>
        )}

         <div className="fixed bottom-8 left-4 z-50">
        <Link
          href="/"
          className="bg-gray-600 border border-gray-100 text-blue-500 px-4 py-2 rounded shadow hover:bg-gray-700 transition duration-200"
        >
          ← Back to Home
        </Link>
      </div>
      </div>

      {/* Custom FadeIn animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
