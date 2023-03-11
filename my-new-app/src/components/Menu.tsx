import { inject, observer } from "mobx-react";
import { Component } from "react";
import { Root } from "../store";
import 'antd/dist/reset.css';
import { 
  Button, 
  Input, 
  Form,
  message,
  Table
} from 'antd';

interface MenuComponentProps {
  rootTree?: Root
}

interface MenuComponentState {
  itemName: string,
  itemTitle: string,
  itemDescription: string,
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
      itemDescription: ''
    };
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
    e.preventDefault();

    const { itemName, itemTitle, itemDescription } = this.state;
    const { rootTree } = this.props;
    
    if(!rootTree) return null;

    rootTree.menu.newItem(itemName, itemTitle, itemDescription);

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

    const dataSource = rootTree.menu.items.map((item) => ({
      id: item.id,
      name: item.name,
      title: item.title,
      description: item.description
    }));

    return (
      <div>
        <h1>{rootTree.menu.name}</h1>
        <Form 
          color="red"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item 
            label="Name" 
            name="name"
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
              onClick={ this.onSubmit }
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