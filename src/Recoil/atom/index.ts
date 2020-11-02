import { atom } from 'recoil';
import { IModelsList, IObjectsList } from '../../Types';

export const modelsListState = atom<IModelsList[]>({
  key: "modelsList",
  default: [],
});

export const objectsListState = atom<IObjectsList[]>({
  key: "objectsList",
  default: [],
})