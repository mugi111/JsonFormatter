import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import { objectsListState } from '../Recoil/atom';
import { useRecoilValue } from 'recoil';

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