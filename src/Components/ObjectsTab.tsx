import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ModelsFormList } from './ModelsFormList';
import { useRecoilState } from 'recoil';
import { modelsListState } from '../Recoil/atom';
import '../Styles/models-tab.scss';

export const ObjectsTab: React.FC = () => {
  return (
    <div className="obects-tab">
      <Button className="objects-tab__button">
        <PlusOutlined />
      </Button>
    </div>
  )
}