import React, { useState, useEffect, useMemo } from 'react';
import { fetchDrinksByUser, createDrink } from '../services/drinkService';
import { useUser } from "../context/user.context";
import DrinkForm from './drink-form';
import DrinkTable from './drink-table';
import useLocation from './location';
import { kostadinEmail, ivanEmail } from '../constants/auth.constants';
import { message } from 'antd';

const MAX_ALLOWED_DRINKS = 12;

function BodyComponent() {
  const { user } = useUser();
  const now = useMemo(() => new Date(), []);
  const monthForApi = useMemo(() => now.toISOString().slice(0, 7), [now]);
  const monthDisplay = useMemo(() => now.toLocaleDateString('en-US', { year: 'numeric', month: 'long' }), [now]);
  const [loading, setLoading] = useState(true);
  const [drinkType, setDrinkType] = useState('Beer');
  const [drinkNotes, setDrinkNotes] = useState('');
  const [tableData, setTableData] = useState([]);
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    let cancelRequest = false;

    const loadDrinkCounts = async () => {
      setLoading(true);
      try {
        const ivanDrinks = await fetchDrinksByUser('Ivan', monthForApi);
        const kostaDrinks = await fetchDrinksByUser(kostadinEmail, monthForApi);

        if (!cancelRequest) {
          setTableData([
            { key: '1', email: ivanEmail, name: 'Ivan', drinks: ivanDrinks?.length, allowedDrinks: MAX_ALLOWED_DRINKS },
            { key: '2', email: kostadinEmail, name: 'Kostadin', drinks: kostaDrinks?.length, allowedDrinks: MAX_ALLOWED_DRINKS }
          ]);
        }
      } catch (err) {
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
      messageApi.open({
        type: 'success',
        content: `Successfully registered a ${drinkType.toLowerCase()}.`,
        duration: 10,
      });
      setDrinkNotes('');
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
    <div className="flex flex-col gap-6 items-center p-4">
      {contextHolder} {/* Render contextHolder here */}
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
