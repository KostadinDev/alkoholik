import React, { useState, useEffect, useMemo } from 'react';
import DrinkCounter from './drink-counter';
import { Button, Select, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetchDrinksByUser, createDrink } from '../services/drinkService';
import { useUser } from "../context/user.context";

const { TextArea } = Input;

const kostadinEmail = 'kostadin.g.devedzhiev@gmail.com';

const DRINK_TYPES = [
  { value: 'Beer', label: 'Beer' },
  { value: 'Wine', label: 'Wine' },
  { value: 'Cocktail', label: 'Cocktail' },
  { value: 'Spirit', label: 'Spirit' },
  { value: 'Liqueurs', label: 'Liqueurs' },
  { value: 'Other', label: 'Other' }
];

function BodyComponent() {
  const { user } = useUser();

  const now = useMemo(() => new Date(), []);
  const monthForApi = useMemo(() => now.toISOString().slice(0, 7), [now]);
  const monthDisplay = useMemo(() => now.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }), [now]);

  const [drinkCounters, setDrinkCounters] = useState([
    { title: 'Ivan', count: 0, email: 'Ivan' },
    { title: kostadinEmail, count: 0, email: kostadinEmail },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drinkType, setDrinkType] = useState('Beer');
  const [drinkNotes, setDrinkNotes] = useState('');

  useEffect(() => {
    let cancelRequest = false;

    const loadDrinkCounts = async () => {
      setLoading(true);
      try {
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

    return () => {
      cancelRequest = true;
    };
  }, [monthForApi]);

  const incrementDrink = async (email, drinkType, drinkNotes) => {
    try {
      await createDrink(email, drinkType, drinkNotes);
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

  const handleDrinkTypeChange = (value) => setDrinkType(value);
  const handleNotesChange = (e) => setDrinkNotes(e.target.value);

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
          <div className="flex items-center flex-col gap-2 w-full pr-3 pl-3">
            <div className="text-lg font-semibold justify-center flex">Register Drink</div>
            <div className="w-full max-w-[500px]">
              <TextArea
                showCount
                maxLength={100}
                onChange={handleNotesChange}
                placeholder="(Optional) notes"
                style={{ height: 80, resize: 'none' }}
              />
            </div>
            <div className="flex justify-between gap-3 w-full max-w-[500px]">
              <Select
                value={drinkType}
                style={{ width: 120 }}
                onChange={handleDrinkTypeChange}
                className="w-[50%] max-w-[150px] mt-4"
                size="large"
                options={DRINK_TYPES}
              />
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                className="w-[50%] max-w-[150px] mt-4"
                onClick={() => incrementDrink(user?.email, drinkType, drinkNotes)}
              >
                Add Drink
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BodyComponent;
