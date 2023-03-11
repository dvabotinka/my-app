import { types, Instance, applySnapshot } from 'mobx-state-tree'; 
import { v4 } from 'uuid';

const ItemModel = types.model("Item", {
  id: types.identifier,
  name: types.string,
  title: types.string,
  description: types.string,
});

const MenuModel = types.model("Menu", {
  items: types.array(ItemModel)
})
.actions(self => {
  function newItem(name: string, title: string, description: string) {
    const id = v4();
    applySnapshot(self, {
      ...self, 
      items: [{ id, name, title, description }, ...self.items]
    });
  }
  
  function setItems(items: Array<Item>) {
    applySnapshot(self, {
      ...self,
      items: items
    });
  }

  return { newItem, setItems };
});

const RootModel = types.model("Root", {
  menu: MenuModel
});

export { RootModel }

export type Root = Instance<typeof RootModel>
export type Menu = Instance<typeof MenuModel>
export type Item = Instance<typeof ItemModel>