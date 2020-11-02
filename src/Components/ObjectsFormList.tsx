import React from 'react';
import { Button } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { ModelsForm } from './ModelsForm';
import { useRecoilState } from 'recoil';
import { objectsListState } from '../Recoil/atom';
import '../Styles/models-tab.scss';

interface Props {
  formIndex: number;
}

export const ObjectsFormList: React.FC<Props> = (props: Props) => {
  const [objectsList, setObjectsList] = useRecoilState(objectsListState);

  return (
    <div className="models-tab">
      <h3>{objectsList[props.formIndex]}</h3>
      {objectsList[props.formIndex].contents.map((_, i) => {
        return (
          <ModelsForm formIndex={props.formIndex} modelIndex={i}></ModelsForm>
        )
      }
      )}
      <Button className="models-tab__button">
        <PlusOutlined />
      </Button>
      <Button danger className="models-form__button">
        <CloseOutlined />
      </Button>
    </div>
  )
}