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
  name: string;
  id: string;
}

export interface IModelsList extends IModelsListBase {
  contents: IModelsElem[];
}

export interface IObjectsElem extends IModelsElem {
  // key: string;
  // isArray: boolean;
  // type: InputTypes | number;
  value: Array<string | number | boolean>;
}

export interface IObjectsList extends IModelsListBase {
  modelId: string;
  contents: IObjectsElem[];
}