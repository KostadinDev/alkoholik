import React, { useState } from 'react';
import DrinkCounter from './drink-counter';
import { Button, Divider, Flex, Radio } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function BodyComponent() {
  const now = new Date();
  const options = { year: 'numeric', month: 'long' };
  const month = now.toLocaleDateString('en-US', options);

  // Initialize state with drinkCounters
  const [drinkCounters, setDrinkCounters] = useState([
    { title: 'Ivan', count: 3 },
    { title: 'Kosta', count: 3 },
  ]);

  // Increment drink count for a specific person
  const incrementDrink = (title) => {
    setDrinkCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.title === title
          ? { ...counter, count: counter.count + 1 }
          : counter
      )
    );
  };

  return (
    <div className="flex flex-col gap-10 items-center">
      <span>{month}</span>
      <div className="flex gap-5">
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
        className="w-[50%]"
        onClick={() => incrementDrink('Ivan')} // Change to 'Kosta' if needed
      >
        Add Drink
      </Button>
    </div>
  );
}

export default BodyComponent;
