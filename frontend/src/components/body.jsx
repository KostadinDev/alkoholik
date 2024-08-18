import React, { useState, useEffect, useMemo } from 'react';
import DrinkCounter from './drink-counter';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetchDrinksByUser, createDrink } from '../services/drinkService'; // Import the API functions
import { useUser } from "../context/user.context";

const kostadinEmail = 'kostadin.g.devedzhiev@gmail.com';

const LoginPrompt = () => {
  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <p className="text-gray-500">Please log in to access the application.</p>
      </div>
    </div>
  );
};

function BodyComponent() {

  const { user, setUser } = useUser();

  // Calculate the current date and month/year outside of useEffect
  const now = useMemo(() => new Date(), []);
  const options = { year: 'numeric', month: 'long' };
  const month = useMemo(() => now.toLocaleDateString('en-US', options), [now]);
  const year = useMemo(() => now.getFullYear(), [now]);

  // Initialize state with drinkCounters
  const [drinkCounters, setDrinkCounters] = useState([
    { title: 'Ivan', count: 0 },
    { title: kostadinEmail, count: 0 },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelRequest = false; // Flag to cancel ongoing requests

    const loadDrinkCounts = async () => {
      setLoading(true);
      try {
        const ivanDrinks = await fetchDrinksByUser('Ivan');
        const kostaDrinks = await fetchDrinksByUser(kostadinEmail);
        if (!cancelRequest) {
          setDrinkCounters([
            { title: 'Ivan', count: ivanDrinks?.length },
            { title: kostadinEmail, count: kostaDrinks?.length },
          ]);
        }
      } catch (err) {
        if (!cancelRequest) {
          setError('Failed to load drink counts');
        }
      } finally {
        if (!cancelRequest) {
          setLoading(false);
        }
      }
    };

    loadDrinkCounts();

    // Cleanup function to set the cancel flag
    return () => {
      cancelRequest = true;
    };
  }, [now, year]); // Dependency array remains unchanged

  // Increment drink count for a specific person
  const incrementDrink = async (title) => {

    // Call the API to create a new drink entry
    try {
      await createDrink(title); // Call the createDrink function
      setDrinkCounters((prevCounters) =>
        prevCounters.map((counter) =>
          counter.title === title
            ? { ...counter, count: counter.count + 1 }
            : counter
        )
      );
    } catch (error) {
      console.error('Failed to create drink:', error);
    }
  };

  return (
    <div>
      {user ? <div className="flex flex-col gap-6 items-center p-4">
        <span className="text-lg font-semibold">{month}</span>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {error && <p>{error}</p>}
            <div className="flex flex-wrap justify-center gap-4">
              {drinkCounters.map((counter, index) => (
                <DrinkCounter
                  key={index}
                  title={counter.title}
                  count={counter.count}
                />
              ))}
            </div>
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="large"
              className="w-full max-w-[40%] mt-4"
              onClick={() => incrementDrink(user?.email)} // Change to 'Kosta' if needed
            >
              Add Drink
            </Button>
          </>
        )}
      </div> : <LoginPrompt />}
    </div>

  );
}

export default BodyComponent;
