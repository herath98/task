import React, { useEffect, useState } from 'react';
import { getPropertyList } from '../services/api';
import axios from 'axios';

interface Property {
  id: number;
  name: string;
  price: number;
  // Include other fields based on API response
}

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPropertyList();
        setProperties(data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          // Handle specific error response from server
          setError(err.response.data.message || 'Failed to fetch data.');
        } else {
          // Generic error handling
          setError('An unexpected error occurred. Please try again.');
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="property-list">
      {properties.length > 0 ? (
        properties.map((property) => (
          <div key={property.id} className="property-card">
            <h2>{property.name}</h2>
            <p>{`USD ${property.price}`}</p>
            {/* Add more details and styling as needed */}
          </div>
        ))
      ) : (
        <p>No properties available.</p>
      )}
    </div>
  );
};

export default PropertyList;
