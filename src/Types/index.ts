export enum InputTypes {
  string = "String",
  number = "Number",
  boolean = "Boolean",
}

export interface IModelsElem {
  key: string;
  isArray: boolean;
  type: InputTypes | number;
}

export interface IModelsList {
  id: number;
  contents: IModelsElem[];
}

export interface IObjectsElem {
  model: IModelsElem;
  value: string | number | boolean;
}

export interface IObjectsList {
  id: number;
  contents: IObjectsElem[];
}