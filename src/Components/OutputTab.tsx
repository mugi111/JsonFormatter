import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import { objectsListState } from '../Recoil/atom';
import { useRecoilValue } from 'recoil';

const { Option } = Select;

export const OutputTab: React.FC = () => {
  const objectsList = useRecoilValue(objectsListState);
  const [selectedObj, setSelectedObj] = useState<string>("");

  const changeSelectObject = (v: string) => {
    setSelectedObj(v)
  }

  const output = () => {
    console.log(selectedObj);
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
      <Input value={selectedObj}></Input>
    </div>
  )
}