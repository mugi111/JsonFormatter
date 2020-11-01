import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModelsForm } from './ModelsForm';
import '../Styles/models-tab.scss';

export const ModelsTab: React.FC = () => {
  return (
    <div>
      <ModelsForm></ModelsForm>
      <Button className="models-tab__button">
        <PlusOutlined />
      </Button>
    </div>
  )
}