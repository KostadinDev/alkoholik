import React from 'react';
import { Card } from 'antd';

function DrinkCounter({ title, count }) {
  const totalAllowed = 12;
  return (
    <Card title={title} bordered={false} style={{ width: 300 }}>
      <span>{count} / {totalAllowed} </span>
    </Card>
  );
}

export default DrinkCounter;
