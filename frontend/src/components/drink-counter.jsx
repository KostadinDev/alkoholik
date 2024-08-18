import React from 'react';
import { Card } from 'antd';
const TOTAL_ALLOWED = 12;
function DrinkCounter({ title, count }) {
  return (
    <Card title={title} bordered={false} style={{ width: 300 }}>
      <span>{count} / {TOTAL_ALLOWED} </span>
    </Card>
  );
}

export default DrinkCounter;
