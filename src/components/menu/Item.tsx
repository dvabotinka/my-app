import { useState } from "react";
import { Item } from "../../store/menu";
import { observer } from "mobx-react";
import 'antd/dist/reset.css';
import { Table } from 'antd';

interface ItemComponentProps {
  item: Item
}

const ItemComponent: React.FC<ItemComponentProps> = observer(({ item }) => {
  const [columns] = useState([
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }
  ]);

  return (
    <Table dataSource={[item]} columns={columns} pagination={false} />
  );
});

export { ItemComponent };