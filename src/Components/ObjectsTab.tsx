import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ObjectsFormList } from './ObjectsFormList';
import { useRecoilState } from 'recoil';
import { objectsListState } from '../Recoil/atom';
import '../Styles/models-tab.scss';

export const ObjectsTab: React.FC = () => {
  const [objectsList, setObjectsList] = useRecoilState(objectsListState);

  return (
    <div className="objects-tab">
      {objectsList.map((_, i) => {
        return (
          <ObjectsFormList formIndex={i}></ObjectsFormList>
        );
      })}
      <Button className="objects-tab__button">
        <PlusOutlined />
      </Button>
    </div>
  )
}