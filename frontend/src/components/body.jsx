import React, { useState, useEffect, useMemo } from 'react';
import DrinkCounter from './drink-counter';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetchDrinksByUser, createDrink } from '../services/drinkService'; // Import the API functions
import { useUser } from "../context/user.context";

const kostadinEmail = 'kostadin.g.devedzhiev@gmail.com';

function BodyComponent() {

  const { user, setUser } = useUser();

  // Calculate the current UTC date and month
  const now = useMemo(() => new Date(), []);

  // Format the month for API requests (YYYY-MM)
  const monthForApi = useMemo(() => now.toISOString().slice(0, 7), [now]);

  // Format the month for display (e.g., "August 2024")
  const options = { year: 'numeric', month: 'long' };
  const monthDisplay = useMemo(() => now.toLocaleDateString('en-US', options), [now]);

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
        // Fetch drinks by user with month filter
        const ivanDrinks = await fetchDrinksByUser('Ivan', monthForApi);
        const kostaDrinks = await fetchDrinksByUser(kostadinEmail, monthForApi);
        if (!cancelRequest) {
          setDrinkCounters([
            { title: 'Ivan', count: ivanDrinks?.length || 0 },
            { title: kostadinEmail, count: kostaDrinks?.length || 0 },
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
  }, [monthForApi]); // Use 'monthForApi' as dependency to update when month changes

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
    <div className="flex flex-col gap-6 items-center p-4">
      <span className="text-lg font-semibold">{monthDisplay}</span>
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
    </div>
  );
}

export default BodyComponent;
