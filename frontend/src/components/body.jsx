import React from 'react';
import DrinkCounter from './drink-counter'; // Assuming DrinkCounter is already created

function BodyComponent() {
  const now = new Date();
  const options = { year: 'numeric', month: 'long' };
  const month = now.toLocaleDateString('en-US', options);

  const drinkCounters = [
    { title: 'Ivan', count: 3 },
    { title: 'Kosta', count: 3 },
  ];

  return (
    <div className="flex flex-col gap-10">
      <span>{month}</span>
      <div className="flex gap-5">
        {drinkCounters.map((counter, index) => (
          <DrinkCounter key={index} title={counter.title} count={counter.count} />
        ))}
      </div>
    </div>
  );
}

export default BodyComponent;
