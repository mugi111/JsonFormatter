import React from 'react';
import { Button } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { ModelsForm } from './ModelsForm';
import { useRecoilState } from 'recoil';
import { objectsListState } from '../Recoil/atom';
import '../Styles/models-tab.scss';
import { InputTypes } from '../Types';
import { ObjectsForm } from './ObjectsForm';

interface Props {
  formIndex: number;
}

export const ObjectsFormList: React.FC<Props> = (props: Props) => {
  const [objectsList, setObjectsList] = useRecoilState(objectsListState);

  const addObjectsFormList = () => {
    setObjectsList((prev) => {
      return prev.slice(0, props.formIndex).concat([{ id: prev[props.formIndex].id, contents: [...prev[props.formIndex].contents, { model: { key: "", type: InputTypes.string, isArray: false }, value: "" }] }]).concat(prev.slice((props.formIndex + 1), prev.length));
    })
  }

  return (
    <div className="models-tab">
      <h3>{objectsList[props.formIndex].id}</h3>
      {objectsList[props.formIndex].contents.map((_, i) => {
        return (
          <ObjectsForm formIndex={props.formIndex} objectIndex={i}></ObjectsForm>
        )
      }
      )}
      <Button className="models-tab__button" onClick={addObjectsFormList}>
        <PlusOutlined />
      </Button>
      <Button danger className="models-form__button">
        <CloseOutlined />
      </Button>
    </div>
  )
}