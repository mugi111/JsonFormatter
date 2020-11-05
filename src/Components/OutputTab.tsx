import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import { objectsListState } from '../Recoil/atom';
import { useRecoilValue } from 'recoil';
import { InputTypes, IObjectsList } from '../Types';

const { Option } = Select;

export const OutputTab: React.FC = () => {
  const objectsList = useRecoilValue(objectsListState);
  const [outputObj, setOutputObj] = useState<string>("");
  const [selectedObj, setSelectedObj] = useState<string>("");
  const [indentCount, setIndentCount] = useState<number>(0);

  const changeSelectObject = (v: string) => {
    setSelectedObj(v)
  }

  const output = () => {
    console.log(selectedObj);
    const obj = objectsList.find((e) => e.id === selectedObj);
    (obj != null) ? searchObject(obj) : console.log("undefined");
  }

  const searchObject = (obj: IObjectsList) => {
    obj.contents.forEach((e) => {
      switch (e.type) {
        case InputTypes.string:
          console.log("String");
          break;
        case InputTypes.number:
          console.log("number");
          break;
        case InputTypes.boolean:
          console.log("boolean");
          break;
        default:
          break;
      }
    })
  }

  const addIndent = () => {
    for (let i = 0; i < indentCount; i++) {
      setOutputObj((prev) => prev + "  ");
      setIndentCount((prev) => prev + 1);
    }
  }

  const reduceIndent = () => {
    for (let i = 0; i < indentCount; i++) {
      setOutputObj((prev) => prev + "  ");
      setIndentCount((prev) => prev - 1);
    }
  }

  const addBracketsOpen = (bracket: string) => {
    addIndent();
    setOutputObj((prev) => prev + bracket);
  }

  const addBracketsClose = (bracket: string) => {
    reduceIndent();
    setOutputObj((prev) => prev + bracket);
  }

  const addCurlyBracesOpen = () => {
    addBracketsOpen("{");
  }

  const addCurlyBracesClose = () => {
    addBracketsClose("}");
  }

  const addSquireBracketsOpen = () => {
    addBracketsOpen("[");
  }

  const addSquireBracketsClose = () => {
    addBracketsClose("]");
  }

  const addComma = () => {
    setOutputObj((prev) => prev + " ,");
  }

  const addKey = (key: string) => {
    setOutputObj((prev) => prev + `"${key}" : `);
  }

  const addString = (val: string) => {
    setOutputObj((prev) => prev + `"${val}"`);
  }

  const addNumber = (val: number) => {
    setOutputObj((prev) => prev + `${val}`);
  }

  const addBoolean = (val: boolean) => {
    setOutputObj((prev) => {
      return prev + (val ? ("true") : ("false"));
    });
  }

  return (
    <div className="models-tab">
      {objectsList.map((e) => {
        return (
          <Select onChange={changeSelectObject}>
            <Option value={e.id}>{e.name}</Option>
          </Select>
        )
      }
      )}
      <Button onClick={output}>Output</Button>
      <Input value={outputObj}></Input>
    </div>
  )
}