import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModelsFormList } from './ModelsFormList';
import { useRecoilState } from 'recoil';
import { modelsListState } from '../Recoil/atom';
import { v4 as uuidv4 } from 'uuid';
import '../Styles/models-tab.scss';

export const ModelsTab: React.FC = () => {
  const [modelsList, setModelsList] = useRecoilState(modelsListState)

  const addObjectHandler = () => {
    setModelsList((prev) => {
      return prev.concat({ name: "model", id: uuidv4(), contents: [] });
    })
  }

  return (
    <div className="models-tab">
      {modelsList.map((_, i) => {
        return (
          <ModelsFormList formIndex={i}></ModelsFormList>
        )
      }
      )}
      <Button className="models-tab__button" onClick={addObjectHandler}>
        <PlusOutlined />
      </Button>
    </div>
  )
}