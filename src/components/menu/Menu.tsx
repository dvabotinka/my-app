import { useEffect, useState } from "react";
import { Item, Root } from "../../store/menu";
import 'antd/dist/reset.css';
import { 
  Button, 
  Input, 
  Form,
  message,
  Table,
  Spin
} from 'antd';

interface MenuComponentProps {
  rootTree?: Root
}

const MenuComponent: React.FC<MenuComponentProps> = ({ rootTree }) =>  {
  const [itemName, setItemName] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [menuData, setMenuData] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      if (!rootTree) return <Spin size="large" />;

      setLoading(true);

      const items = await getItemsFromLocalStorage();
      rootTree.menu.setItems(items);
      setMenuData([...rootTree.menu.items]);

      setLoading(false);
    }
    fetchData();
  }, [rootTree]);

  async function getItemsFromLocalStorage(): Promise<Item[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const menu = localStorage.getItem('Menu');
        const items = menu ? JSON.parse(menu) : [];
        resolve(items);
      }, 2000);
    });
  }

  function changeItemName(e: any) {
    setItemName(e.target.value);
  }

  function changeItemTitle(e: any) {
    setItemTitle(e.target.value);
  }

  function changeItemDescription(e: any) {
    setItemDescription(e.target.value);
  }

  function onSubmit() {
    if (!rootTree) return null;

    rootTree.menu.newItem(itemName, itemTitle, itemDescription);

    setMenuData([...rootTree.menu.items]);

    localStorage.setItem('Menu', JSON.stringify([...rootTree.menu.items]));

    setTimeout(() => {
      message.success('Item was added');
    }, 300);
  }

  const columns = [
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
  ];

  const dataSource = menuData.map((item) => ({
    id: item.id,
    name: item.name,
    title: item.title,
    description: item.description
  }));

  return (
    <div>
      <Spin size="large" spinning={loading}></Spin>
      <h1>Menu</h1>
      <Form 
        color="red"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onSubmit}
      >
        <Form.Item 
          label="Name" 
          name="name"
          rules={[{ required: true, message: 'Please, input name' }]}
        >
          <Input 
            allowClear
            placeholder="input name" 
            value={itemName} 
            onChange={changeItemName} 
          >
          </Input>
        </Form.Item>
        <Form.Item 
          label="Title" 
          name="title"
          rules={[{ required: true, message: 'Please, input title' }]}
        >
          <Input
            allowClear
            placeholder="input title" 
            value={itemTitle} 
            onChange={changeItemTitle}
          >
          </Input>
        </Form.Item>
        <Form.Item 
          label="Description" 
          name="description"
          rules={[{ required: true, message: 'Please, input description' }]}
        >
          <Input
            allowClear
            placeholder="input description" 
            value={itemDescription} 
            onChange={changeItemDescription}
          >
          </Input>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button 
              block 
              type='primary' 
              htmlType="submit" 
            >
              Submit
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={dataSource} columns={columns} rowKey="id" />
    </div> 
  );
};

export { MenuComponent };