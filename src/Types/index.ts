export enum InputTypes {
  string = "String",
  number = "Number",
  boolean = "Boolean",
}

export interface IModelsElem {
  key: string;
  type: InputTypes;
}

export interface IModelsList {
  id: string;
  contents: IModelsElem[];
}