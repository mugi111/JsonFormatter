export class InputTypes {
  static readonly String = "String";
  static readonly Number = "Number";
  static readonly Boolean = "Boolean";
}

export interface IModelsElem {
  Key: string;
  type: InputTypes;
}

export interface IModelsList {
  id: string;
  contents: IModelsElem[];
}