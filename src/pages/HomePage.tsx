import React, { useEffect, useState } from 'react';
import { getToken } from '../utils/tokenUtils';
import { verifyToken } from '../services/authService';
import logo from '../assets/logo.png';
import bed from '../assets/bed.png';
import child from '../assets/child.png';
import park from '../assets/park.png';
import pet from '../assets/pet.png';
import man from '../assets/man.png';

interface Property {
  id: number;
  property_name: string;
  property_code: string;
  check_in: string;
  check_out: string;
  bedrooms: number;
  adults: number;
  children: number;
  parking: number;
  pets: number;
  price: number;
  website: string;
  website_image: string;
}

interface ApiResponse {
  status: boolean;
  code: string;
  message: string;
  data: Property[];
}

const HomePage: React.FC = () => {
  const [message, setMessage] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const checkTokenAndFetchProperties = async () => {
      const token = getToken();
      if (!token) {
        setMessage('No token found. Please log in.');
        return;
      }

      try {
        const isValid = await verifyToken(token);
        if (isValid) {
          setMessage('Token is valid. Fetching properties...');
          fetchProperties();
        } else {
          setMessage('Token is invalid. Please log in again.');
        }
      } catch (err) {
        console.error('Token verification error:', err);
        setError('Token verification failed. Please log in again.');
      }
    };

    checkTokenAndFetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('https://skill-test.similater.website/api/v1/property/list', {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
        },
      });
      if (!response.ok) throw new Error(`Failed to fetch properties: ${response.status}`);
      const data: ApiResponse = await response.json();
      if (data.status && Array.isArray(data.data)) {
        setProperties(data.data);
        setMessage('Properties fetched successfully.');
      } else {
        setError('Received unexpected data structure from API');
      }
    } catch (err) {
      console.error('Fetch properties error:', err);
      setError(`Failed to fetch properties: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen mx-auto max-w-7xl">
      <div className=' mb-5'>
        <img src={logo} alt="" />
      </div>
      <hr />
      <h1 className="text-3xl font-bold my-6">Service apartments</h1>
      
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : 
      
      properties.length > 0 ? (
        <div className="mx-auto max-w-6xl">
          {properties.map((property) => (
            <div>
            <div key={property.id} className="bg-white shadow-md rounded-lg mb-5 mx-5 md:mx-auto md:p-8 md:flex items-center md:items-start space-x-6">
              <div className='relative'>
              <img src={property.website_image} alt={property.property_name} className="object-cover w-full md:w-auto  px-2 rounded-md" />
              <p className="absolute bottom-2 bg-[#FFFFFFE5] opacity-90 px-5 py-2 rounded-lg left-[35%] md:left-[20%] text-sm mt-2">
                  <a href={property.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    Visit website
                  </a>
                </p>
              </div>
              <div className="flex-grow">
                <h2 className="text-xl text-center font-semibold text-gray-800">{property.property_name}</h2>
                <p className="text-sm text-center  text-gray-600">Property code: {property.property_code}</p>
                <div className="grid  grid-cols-12 justify-between mt-4">
                  
                    <p className="text-sm col-span-6 md:col-span-4">Check-in: <span className="font-medium">{property.check_in}</span></p>
                    <p className="text-sm  col-span-6 md:col-span-4">Check-out: <span className="font-medium">{property.check_out}</span></p>
                    <p className="text-sm hidden md:inline col-span-4"> <span className="font-medium"></span></p>
                   
                 
                    <div className="flex col-span-2 mt-5 items-center">
                      <span className="mr-1">
                        <img src={bed} alt="" />
                      </span>
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex col-span-2 mt-5 items-center">
                      <span className="mr-1">
                      <img src={man} alt="" />
                      </span>
                      <span>{property.adults}</span>
                    </div>
                    <div className="flex col-span-2 mt-5 items-center">
                      <span className="mr-1">
                      <img src={child} alt="" />
                      </span>
                      <span>{property.children}</span>
                    </div>
                    <div className="flex col-span-2 mt-5 items-center">
                      <span className="mr-1">
                      <img src={park} alt="" />
                      </span>
                      <span>{property.parking}</span>
                    </div>
                    <div className="flex col-span-2 mt-5 items-center">
                      <span className="mr-1">
                      <img src={pet} alt="" />
                      </span>
                      <span>{property.pets}</span>
                    </div>
                 
                 
                
                </div>
               
              </div>
              
              <div className="text-right">
                <p className="text-lg flex mt-5 font-bold text-[#8C18FF]">USD {property.price.toFixed(2)}</p>
                <button className="md:mt-2 bg-[#F36F27] mt-[-30px] md:mt-20 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out">
                  Select
                </button>
              </div>
            
            </div>
            
            </div>
            
          ))}
        </div>
      ) : (
        <p className="text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default HomePage;