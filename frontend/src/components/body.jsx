// src/BodyComponent.js

import React, { useState, useEffect, useMemo } from 'react';
import DrinkCounter from './drink-counter';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios'; // Import axios for the POST request
import { fetchDrinks } from '../services/drinks.service'; // Import the API function

function BodyComponent() {
  // Calculate the current date and month/year outside of useEffect
  const now = useMemo(() => new Date(), []);
  const options = { year: 'numeric', month: 'long' };
  const month = useMemo(() => now.toLocaleDateString('en-US', options), [now]);
  const year = useMemo(() => now.getFullYear(), [now]);

  // Initialize state with drinkCounters
  const [drinkCounters, setDrinkCounters] = useState([
    { title: 'Ivan', count: 0 },
    { title: 'Kosta', count: 0 },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelRequest = false; // Flag to cancel ongoing requests

    const loadDrinkCounts = async () => {
      setLoading(true);
      try {
        const ivanCount = await fetchDrinks('Ivan', now.getMonth() + 1, year);
        const kostaCount = await fetchDrinks('Kosta', now.getMonth() + 1, year);
        console.log(ivanCount, kostaCount)

        if (!cancelRequest) {
          setDrinkCounters([
            { title: 'Ivan', count: ivanCount?.drinks },
            { title: 'Kosta', count: kostaCount?.drinks },
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
    setDrinkCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.title === title
          ? { ...counter, count: counter.count + 1 }
          : counter
      )
    );

    // Call the API to update the drink count on the server
    try {
      await axios.post('http://localhost:8000/drinks', {
        user: title,
        month: now.getMonth() + 1,
        year: year,
        count: drinkCounters.find((counter) => counter.title === title).count + 1
      });
    } catch (error) {
      console.error('Failed to update drink count:', error);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center p-4">
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
            className="w-full max-w-[25%] mt-4"
            onClick={() => incrementDrink('Ivan')} // Change to 'Kosta' if needed
          >
            Add Drink
          </Button>
        </>
      )}
    </div>
  );
}

export default BodyComponent;
