import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModelsForm } from './ModelsForm';
import { useRecoilState } from 'recoil';
import { modelsListState } from '../Recoil/atom';
import '../Styles/models-tab.scss';

export const ModelsTab: React.FC = () => {
  const [modelsList, setModelsList] = useRecoilState(modelsListState)

  const addFormHandler = () => {

  }

  return (
    <div>
      {modelsList.map((_, i) => <ModelsForm></ModelsForm>)}
      <Button className="models-tab__button" onClick={addFormHandler}>
        <PlusOutlined />
      </Button>
    </div>
  )
}