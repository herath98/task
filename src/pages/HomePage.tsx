import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../services/api';
import PropertyList from '../components/PropertyList';

const HomePage: React.FC = () => {
  const [userChecked, setUserChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const userData = await checkUser();
        console.log('User is authenticated:', userData);
        setUserChecked(true);
      } catch (error) {
        console.error('User is not authenticated:', error);
        navigate('/'); // Redirect to login page if not authenticated
      } finally {
        setLoading(false); // Stop loading
      }
    };

    verifyUser();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userChecked) {
    return null; // Render nothing or a fallback UI
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <PropertyList />
    </div>
  );
};

export default HomePage;
