'use client';
import Image from 'next/image';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
type WeatherData = {
   country: string;
   city: string;
   temp: number;
   humidity: number;
   wind: number;
   gust: number;
   visibility: number;
   condition: string;
   img: string | null;
};

export default function Home() {
   const [location, setLocation] = React.useState('');
   const [weather, setWeather] = React.useState<WeatherData | null>(null);

   const getWeather = async () => {
      const api_url = `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_API_KEY}&q=${location}`;
      if (location) {
         try {
            const res = await fetch(api_url);
            const data = await res.json();
            if (data) {
               const api_data = {
                  country: data.location.country,
                  city: data.current.name,
                  temp: data.current.temp_c,
                  humidity: data.current.humidity,
                  wind: data.current.wind_mph,
                  gust: data.current.gust_mph,
                  visiblity: data.current.vis_miles,
                  condition: data.current.condition.text,
                  img: data.current.condition.icon,
               };
               setWeather(api_data as any);
               console.log(data);
            }
         } catch (err) {
            console.log(err);
         }
      } else {
      }
   };

   return (
      <div className="w-[500px] h-[720px] mx-auto bg-slate-300 ">
         <div className="w-[400px] mx-[122px] pt-4 flex">
            <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" className="bg-white w-auto h-8 rounded-s-lg outline-none px-2" placeholder="cari" />
            <button onClick={getWeather} className="bg-blue-500 w-[25px] px-1 h-8 rounded-e-lg">
               <FiSearch />
            </button>
         </div>
         <div className="my-10 mx-auto  w-[250px] h-[250px] bg-slate-400 fill-transparent">
            <h1 className="text-3xl font-semibold text-center pt-6">{weather?.temp} C</h1>
            <div className="flex px-5">
               <p className="text-sm">Kecepatan Angin: {weather ? weather.wind : 'Tidak Tersedia'}</p>
               <p className="text-sm">Cuaca: {weather ? weather.condition : 'Tidak Tersedia'}</p>
            </div>
            <Image src={weather ? `https://${weather.img}` : ''} width={80} height={80} alt="condition" />
         </div>
      </div>
   );
}
