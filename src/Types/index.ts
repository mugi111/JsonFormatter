export enum InputTypes {
  string = "String",
  number = "Number",
  boolean = "Boolean",
}

export interface IModelsElem {
  key: string;
  type: InputTypes | number;
}

export interface IModelsList {
  id: number;
  contents: IModelsElem[];
}