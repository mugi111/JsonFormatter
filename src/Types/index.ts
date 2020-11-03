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

export interface IModelsListBase {
  contents: IModelsElem[];
}

export interface IModelsList extends IModelsListBase {
  // contents: IModelsElem[];
  id: string;
}

export interface IObjectsElem extends IModelsElem {
  // key: string;
  // isArray: boolean;
  // type: InputTypes | number;
  value: Array<string | number | boolean>;
}

export interface IObjectsList {
  id: string;
  modelId: string;
  model: IObjectsElem[];
}