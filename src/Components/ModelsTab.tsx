import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModelsFormList } from './ModelsFormList';
import { useRecoilState } from 'recoil';
import { modelsListState } from '../Recoil/atom';
import '../Styles/models-tab.scss';

export const ModelsTab: React.FC = () => {
  const [modelsList, setModelsList] = useRecoilState(modelsListState)

  const addFormHandler = () => {
    setModelsList((prev) => {
      return prev.concat({ id: (prev.length + 1).toString(), contents: [] });
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
      <Button className="models-tab__button" onClick={addFormHandler}>
        <PlusOutlined />
      </Button>
    </div>
  )
}