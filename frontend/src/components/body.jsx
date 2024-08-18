import React, { useState, useEffect, useMemo } from 'react';
import { Button, Select, Input, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { fetchDrinksByUser, createDrink } from '../services/drinkService';
import { useUser } from "../context/user.context";

// Constants
const MAX_ALLOWED_DRINKS = 12;
const kostadinEmail = 'kostadin.g.devedzhiev@gmail.com';
const DRINK_TYPES = [
  { value: 'Beer', label: 'Beer' },
  { value: 'Wine', label: 'Wine' },
  { value: 'Cocktail', label: 'Cocktail' },
  { value: 'Spirit', label: 'Spirit' },
  { value: 'Liqueurs', label: 'Liqueurs' },
  { value: 'Other', label: 'Other' }
];

// Location Component
function useLocation() {
  const [location, setLocation] = useState({ latitude: null, longitude: null, error: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, error: null }),
        (error) => setLocation({ latitude: null, longitude: null, error: error.message })
      );
    } else {
      setLocation({ latitude: null, longitude: null, error: 'Geolocation is not supported by this browser.' });
    }
  }, []);

  return location;
}

// DrinkTable Component
const DrinkTable = ({ tableData, monthDisplay }) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Drinks', dataIndex: 'drinks', key: 'drinks' },
    { title: 'Maximum Allowed', dataIndex: 'allowedDrinks', key: 'allowedDrinks' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <span className="text-lg font-semibold">{monthDisplay}</span>
      <Table pagination={{ position: ['none', 'none'] }} columns={columns} dataSource={tableData} />
    </div>
  );
};

// DrinkForm Component
const DrinkForm = ({ drinkType, setDrinkType, drinkNotes, setDrinkNotes, onAddDrink }) => (
  <div className="flex items-center flex-col gap-2 w-full pr-3 pl-3">
    <div className="text-lg font-semibold justify-center flex">Register Drink</div>
    <div className="w-full max-w-[500px]">
      <Input.TextArea
        showCount
        maxLength={100}
        value={drinkNotes}
        onChange={(e) => setDrinkNotes(e.target.value)}
        placeholder="(Optional) notes"
        style={{ height: 80, resize: 'none' }}
      />
    </div>
    <div className="flex justify-between gap-3 w-full max-w-[500px]">
      <Select
        value={drinkType}
        style={{ width: 120 }}
        onChange={(value) => setDrinkType(value)}
        className="w-[50%] max-w-[150px] mt-4"
        size="large"
        options={DRINK_TYPES}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        size="large"
        className="w-[50%] max-w-[150px] mt-4"
        onClick={onAddDrink}
      >
        Add Drink
      </Button>
    </div>
  </div>
);

// Main BodyComponent
function BodyComponent() {
  const { user } = useUser();
  const now = useMemo(() => new Date(), []);
  const monthForApi = useMemo(() => now.toISOString().slice(0, 7), [now]);
  const monthDisplay = useMemo(() => now.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }), [now]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drinkType, setDrinkType] = useState('Beer');
  const [drinkNotes, setDrinkNotes] = useState('');
  const [tableData, setTableData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    let cancelRequest = false;

    const loadDrinkCounts = async () => {
      setLoading(true);
      try {
        const ivanDrinks = await fetchDrinksByUser('Ivan', monthForApi);
        const kostaDrinks = await fetchDrinksByUser(kostadinEmail, monthForApi);

        if (!cancelRequest) {
          setTableData([
            { key: '1', email: 'ivannikolov007@gmail.com', name: 'Ivan', drinks: ivanDrinks?.length, allowedDrinks: MAX_ALLOWED_DRINKS },
            { key: '2', email: kostadinEmail, name: 'Kostadin', drinks: kostaDrinks?.length, allowedDrinks: MAX_ALLOWED_DRINKS }
          ]);
        }
      } catch (err) {
        if (!cancelRequest) setError('Failed to load drink counts');
      } finally {
        if (!cancelRequest) setLoading(false);
      }
    };

    loadDrinkCounts();

    return () => { cancelRequest = true; };
  }, [monthForApi]);

  const incrementDrink = async () => {
    try {
      await createDrink(drinkType, drinkNotes, location);
      setTableData((prevCounters) =>
        prevCounters.map((counter) =>
          counter.email === user?.email ? { ...counter, drinks: counter.drinks + 1 } : counter
        )
      );
    } catch (error) {
      console.error('Failed to create drink:', error);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center p-4 h-full justify-between">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <DrinkTable tableData={tableData} monthDisplay={monthDisplay} />
          <DrinkForm
            drinkType={drinkType}
            setDrinkType={setDrinkType}
            drinkNotes={drinkNotes}
            setDrinkNotes={setDrinkNotes}
            onAddDrink={incrementDrink}
          />
        </>
      )}
    </div>
  );
}

export default BodyComponent;
