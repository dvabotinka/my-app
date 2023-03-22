import { inject, observer } from "mobx-react";
import { Component } from "react";
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

interface MenuComponentState {
  itemName: string,
  itemTitle: string,
  itemDescription: string,
  menuData: Item[],
  loading: boolean
}

@inject("rootTree")
@observer
class MenuComponent extends Component<
  MenuComponentProps, 
  MenuComponentState> 
{
  constructor(props: MenuComponentProps) {
    super(props);
    this.state = {
      itemName: '',
      itemTitle: '',
      itemDescription: '',
      menuData: [],
      loading: true
    };
  }

  async componentDidMount() {
    const { rootTree } = this.props;
    if (!rootTree) return <Spin size="large" />;
    
    this.setState({ loading: true });

    const items = await this.getItemsFromLocalStorage();
    rootTree.menu.setItems(items);
    this.setState({ menuData: [...rootTree.menu.items] });

    this.setState({ loading: false });
  }

  async getItemsFromLocalStorage(): Promise<Item[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const menu = localStorage.getItem('Menu');
        const items = menu ? JSON.parse(menu) : [];
        resolve(items);
      }, 2000);
    });
  }

  changeItemName = (e: any) => {
    const itemName = e.target.value;
    this.setState({ itemName });
  }

  changeItemTitle = (e: any) => {
    const itemTitle = e.target.value;
    this.setState({ itemTitle });
  }

  changeItemDescription = (e: any) => {
    const itemDescription = e.target.value;
    this.setState({ itemDescription });
  }

  onSubmit = (e: any) => {
    const { itemName, itemTitle, itemDescription } = this.state;
    const { rootTree } = this.props;
    
    if(!rootTree) return null;

    rootTree.menu.newItem(itemName, itemTitle, itemDescription);
    
    this.setState({ menuData: [...rootTree.menu.items] });

    localStorage.setItem('Menu', JSON.stringify([...rootTree.menu.items]));

    setTimeout(() => {
      message.success('Item was added');
    }, 300);
  }

  render() {
    const { rootTree } = this.props;
    const { itemName, itemTitle, itemDescription } = this.state;

    if (!rootTree) return null;

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

    const dataSource = this.state.menuData.map((item) => ({
      id: item.id,
      name: item.name,
      title: item.title,
      description: item.description
    }));

    return (
      <div>
        <Spin size="large" spinning={this.state.loading}></Spin>
        <h1>Menu</h1>
        <Form 
          color="red"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          onFinish={this.onSubmit}
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
              onChange={this.changeItemName} 
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
              onChange={this.changeItemTitle}
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
              onChange={this.changeItemDescription}
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
  }
}

export { MenuComponent };