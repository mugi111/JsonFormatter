import React from 'react';
import { Button, Select } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { modelsListState, objectsListState } from '../Recoil/atom';
import '../Styles/models-tab.scss';
import { InputTypes } from '../Types';
import { ObjectsForm } from './ObjectsForm';
import { useRecoilValue } from 'recoil';

const { Option } = Select;

interface Props {
  formIndex: number;
}

export const ObjectsFormList: React.FC<Props> = (props: Props) => {
  const modelsList = useRecoilValue(modelsListState);
  const [objectsList, setObjectsList] = useRecoilState(objectsListState);

  const addObjectsFormList = () => {
    setObjectsList((prev) => {
      return prev.slice(0, props.formIndex).concat([{ id: prev[props.formIndex].id, model: [...prev[props.formIndex].model, { key: "", type: InputTypes.string, isArray: false, value: [] }] }]).concat(prev.slice((props.formIndex + 1), prev.length));
    })
  }

  const deleteObjectsFormList = () => {
    setObjectsList((prev) => {
      return prev.slice(0, props.formIndex).concat(prev.slice((props.formIndex + 1), prev.length));
    })
  }

  return (
    <div className="models-tab">
      <h3>{objectsList[props.formIndex].id}</h3>
      <Select className="objects-form__select" defaultValue={InputTypes.string} >
        {objectsList.map((_, i) => {
          return (
            <Option value={objectsList[i].id}>{objectsList[i].id}</Option>
          );
        })}
      </Select>

      {objectsList[props.formIndex].model.map((_, i) => {
        return (
          <ObjectsForm formIndex={props.formIndex} objectIndex={i}></ObjectsForm>
        )
      }
      )}
      <Button className="models-tab__button" onClick={addObjectsFormList}>
        <PlusOutlined />
      </Button>
      <Button danger className="models-form__button" onClick={deleteObjectsFormList}>
        <CloseOutlined />
      </Button>
    </div>
  )
}