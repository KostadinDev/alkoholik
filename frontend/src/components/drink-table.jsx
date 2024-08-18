
import { Table } from 'antd';

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

export default DrinkTable;