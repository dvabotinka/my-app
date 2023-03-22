import { applySnapshot, getSnapshot, onSnapshot } from "mobx-state-tree";
import { RootModel } from "."

export const setupRootStore = () => {
  const rootTree = RootModel.create({
    menu: {
      items: []
    },
  });
  onSnapshot(rootTree, snapshot => console.log("snapshot: ", snapshot));
  const currentRootTree = getSnapshot(rootTree);
  applySnapshot(rootTree, { 
    ...currentRootTree, 
    menu: {...currentRootTree.menu }
  });
  return { rootTree };
}