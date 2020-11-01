import { atom } from 'recoil';
import { IModelsList } from '../../Types';

export const modelsListState = atom<IModelsList[]>({
  key: "modelsList",
  default: [],
});