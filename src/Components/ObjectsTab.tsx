import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ObjectsForm } from './ObjectsForm';
import { useRecoilState } from 'recoil';
import { objectsListState } from '../Recoil/atom';
import { v4 as uuidv4 } from 'uuid';
import '../Styles/objects-tab.scss';

export const ObjectsTab: React.FC = () => {
  const [objectsList, setObjectsList] = useRecoilState(objectsListState);

  const addObjectHandler = () => {
    setObjectsList((prev) => {
      return prev.concat({ name: "Object", id: uuidv4(), modelId: "", contents: [] });
    })
  }

  return (
    <div className="objects-tab">
      {objectsList.map((_, i) => {
        return (
          <ObjectsForm formIndex={i}></ObjectsForm>
        );
      })}
      <Button className="objects-tab__button" onClick={addObjectHandler}>
        <PlusOutlined />
      </Button>
    </div>
  )
}