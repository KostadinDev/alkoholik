import React from 'react';
import { Button, Select, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const DRINK_TYPES = [
  { value: 'Beer', label: 'Beer' },
  { value: 'Wine', label: 'Wine' },
  { value: 'Cocktail', label: 'Cocktail' },
  { value: 'Spirit', label: 'Spirit' },
  { value: 'Liqueurs', label: 'Liqueurs' },
  { value: 'Other', label: 'Other' }
];

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


export default DrinkForm;