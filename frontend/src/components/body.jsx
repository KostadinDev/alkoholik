import React, { useState, useEffect, useMemo } from 'react';
import DrinkCounter from './drink-counter';
import { Button, Select, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetchDrinksByUser, createDrink } from '../services/drinkService'; // Import the API functions
import { useUser } from "../context/user.context";

const { TextArea } = Input;

const kostadinEmail = 'kostadin.g.devedzhiev@gmail.com';

const DRINK_TYPES = [
  { value: 'Beer', label: 'Beer' },
  { value: 'Wine', label: 'Wine' },
  { value: 'Cocktail', label: 'Cocktail' },
  { value: 'Spirit', label: 'Spirit' },
  { value: 'Liqueurs', label: 'Liqueurs' },
  { value: 'Other', label: 'Other' }];

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
    { title: 'Ivan', count: 0, email: 'Ivan' },
    { title: kostadinEmail, count: 0, email: kostadinEmail },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drinkType, setDrinkType] = useState(null);
  const [drinkNotes, setDrinkNotes] = useState('');

  const handleChangeDrinkType = (drinkType) => {
    setDrinkType(drinkType);
  };

  const onNotesChange = (notes) => {
    setDrinkNotes(notes.target.value);
  }

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
            { title: 'Ivan', email: 'Ivan', count: ivanDrinks?.length || 0 },
            { title: 'Kostadin', email: kostadinEmail, count: kostaDrinks?.length || 0 },
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
  const incrementDrink = async (email, drinkType, drinkNotes) => {
    // Call the API to create a new drink entry
    try {
      await createDrink(email, drinkType, drinkNotes); // Call the createDrink function
      setDrinkCounters((prevCounters) =>
        prevCounters.map((counter) =>
          counter.email === email
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
          <div className=" w-full pr-2 pl-2  max-w-[500px]">
            <TextArea
              showCount
              maxLength={100}
              className="pr-1 pl-1"
              onChange={onNotesChange}
              placeholder="(Optional) notes"
              style={{ height: 80, resize: 'none' }}
            />
          </div>
          <div className="flex justify-between gap-3 w-full pr-2 pl-2 max-w-[500px]">
            <Select
              defaultValue="Beer"
              style={{ width: 120 }}
              onChange={handleChangeDrinkType}
              className=" w-[50%] max-w-[150px] mt-4"
              size="large"
              options={DRINK_TYPES}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              className="w-[50%] max-w-[150px] mt-4"
              onClick={() => incrementDrink(user?.email, drinkType || 'Beer', drinkNotes)}
            >
              Add Drink
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default BodyComponent;
