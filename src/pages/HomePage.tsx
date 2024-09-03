import React, { useEffect, useState } from "react";
import { getToken } from "../utils/tokenUtils";
import { verifyToken } from "../services/authService";
import logo from "../assets/logo.png";
import bed from "../assets/bed.png";
import child from "../assets/child.png";
import park from "../assets/park.png";
import pet from "../assets/pet.png";
import man from "../assets/man.png";
import night from "../assets/night.png";

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
  const [message, setMessage] = useState<string>("Loading...");
  const [error, setError] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const checkTokenAndFetchProperties = async () => {
      const token = getToken();
      if (!token) {
        setMessage("No token found. Please log in.");
        return;
      }

      try {
        const isValid = await verifyToken(token);
        if (isValid) {
          setMessage("Token is valid. Fetching properties...");
          fetchProperties();
        } else {
          setMessage("Token is invalid. Please log in again.");
        }
      } catch (err) {
        console.error("Token verification error:", err);
        setError("Token verification failed. Please log in again.");
      }
    };

    checkTokenAndFetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        "https://skill-test.similater.website/api/v1/property/list",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      if (!response.ok)
        throw new Error(`Failed to fetch properties: ${response.status}`);
      const data: ApiResponse = await response.json();
      if (data.status && Array.isArray(data.data)) {
        setProperties(data.data);
        setMessage("Properties fetched successfully.");
      } else {
        setError("Received unexpected data structure from API");
      }
    } catch (err) {
      console.error("Fetch properties error:", err);
      setError(`Failed to fetch properties: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen mx-auto my-auto font-inter max-w-6xl">
      <div className="shadow-sm bg-[#f8f8f8]  md:p-8 rounded-md lg:rounded-2xl mt-20">
        <div className="flex justify-center md:justify-start  mb-5">
          <img src={logo} alt="" />
        </div>
        <hr />
        <h1 className="md:text-3xl text-xl p-5 md:p-0 font-bold my-6">
          Service apartments
        </h1>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : properties.length > 0 ? (
          <div className="mx-auto  max-w-7xl">
            {properties.map((property) => (
              <div>
                <div
                  key={property.id}
                  className="bg-[#FFFFFF]  shadow-md rounded-lg mb-5 mx-5 md:mx-auto grid p-2  md:p-5 grid-cols-1  lg:grid-cols-12  items-center md:items-start lg:space-x-6"
                >
                  <div className="relative col-span-1 lg:col-span-2">
                    <img
                      src={property.website_image}
                      alt={property.property_name}
                      className=" object-cover w-full "
                    />
                    <p className="absolute bottom-2 bg-[#FFFFFFE5] opacity-90 px-5 py-2 rounded-lg left-[25%] sm:left-[40%] lg:left-[4%] xl:left-[12%] text-sm mt-2">
                      <a
                        href={property.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        www.imah.com
                      </a>
                    </p>
                  </div>

                  <div className="lg:flex-grow col-span-1 lg:col-span-10 sm:text-xl justify-center text-[12px] px-2 ">
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-6   lg:grid-cols-12 justify-center mt-4">
                      <div className="text-sm col-span-1 md:col-span-3 lg:col-span-6 ">
                        <h2 className="sm:text-xl text-[12px]  text-start font-semibold text-gray-800">
                          {property.property_name}
                        </h2>
                        <p className="sm:text-sm text-[12px] text-start  text-gray-600">
                          Property code: {property.property_code}
                        </p>
                      </div>
                      <div className="col-span-1  md:col-span-3 lg:col-span-6  justify-end">
                        <p className="text-lg flex text-end justify-end font-bold text-[#8C18FF]">
                          USD {property.price.toFixed(2)}
                        </p>
                      </div>

                      <p className="sm:text-xl text-[12px]  md:col-span-3  lg:col-span-4">
                        Check-in:{" "}
                        <span className="font-medium">
                          {new Date(property.check_in).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </p>
                      <p className="sm:text-xl text-[12px]  md:col-span-3  lg:col-span-4 ">
                        Check-out:{" "}
                        <span className="font-medium">
                          {new Date(property.check_out).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </p>
                      <div className="text-right flex-row sm:text-xl text-[12px] hidden lg:inline  space-y-4 col-span-4 ">
                        <button className=" bg-[#F36F27] mt-[-30px]  text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out">
                          Select
                        </button>
                      </div>
                      <hr className=" hidden lg:inline col-span-12 " />
                      <div className="flex col-span-1 md:col-span-2 lg:col-span-2 font-inter  items-center">
                        <span className="mr-2">
                          <img src={bed} alt="" />
                        </span>
                        <span className="grid font-inter grid-cols-1 ">
                          <span>Bedroom</span>
                          {property.bedrooms}
                        </span>
                      </div>
                      <div className="flex col-span-1 md:col-span-2 lg:col-span-2 font-inter  items-center">
                        <span className="mr-2">
                          <img src={night} alt="" />
                        </span>
                        <span className="grid font-inter grid-cols-1 ">
                          <span>Nights</span>
                          {property.adults}
                        </span>
                      </div>
                      <div className="flex col-span-1 md:col-span-2 lg:col-span-2  font-inter items-center">
                        <span className="mr-2">
                          <img src={man} alt="" />
                        </span>

                        <span className="grid font-inter grid-cols-1 ">
                          <span>Adults</span>
                          {property.adults}
                        </span>
                      </div>
                      <div className="flex col-span-1 md:col-span-2 lg:col-span-2 font-inter items-center">
                        <span className="mr-2">
                          <img src={child} alt="" />
                        </span>
                        <span className="grid font-inter grid-cols-1 ">
                          <span>Children</span>
                          {property.children}
                        </span>
                      </div>
                      <div className="flex col-span-1 md:col-span-2 lg:col-span-2  font-inter items-center">
                        <span className="mr-2">
                          <img src={park} alt="" />
                        </span>
                        <span className="grid font-inter grid-cols-1 ">
                          <span>Parking</span>
                          {property.parking}
                        </span>
                      </div>
                      <div className="flex col-span-1 lg:col-span-2  md:col-span-2 font-inter items-center">
                        <span className="mr-2">
                          <img src={pet} alt="" />
                        </span>
                        <span className="grid font-inter grid-cols-1 ">
                          <span>Pets</span>
                          {property.pets}
                        </span>
                      </div>
                      <div className="text-center justify-center flex-row sm:text-xl text-[12px] lg:hidden inline md:col-span-6  col-span-2 ">
                        <button className=" bg-[#F36F27] mt-[-30px]  text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out">
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
