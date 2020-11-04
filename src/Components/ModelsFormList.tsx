import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { ModelsForm } from './ModelsForm';
import { useRecoilState } from 'recoil';
import { modelsListState } from '../Recoil/atom';
import '../Styles/models-tab.scss';
import { InputTypes } from '../Types';

interface Props {
  formIndex: number;
}

export const ModelsFormList: React.FC<Props> = (props: Props) => {
  const [modelsList, setModelsList] = useRecoilState(modelsListState);
  const [modelNameState, setModelNameState] = useState(false);

  const addFormHandler = () => {
    setModelsList((prev) => {
      return prev.slice(0, props.formIndex).concat([{ id: prev[props.formIndex].id, contents: [...prev[props.formIndex].contents, { key: "", isArray: false, type: InputTypes.string }] }]).concat(prev.slice((props.formIndex + 1), prev.length));
    })
  }

  const deleteObjectHandler = () => {
    if (modelsList.find((e) => e.contents.find((v) => v.type === modelsList[props.formIndex].id)) === undefined) {
      setModelsList((prev) => {
        return prev.slice(0, props.formIndex).concat(prev.slice((props.formIndex + 1), prev.length));
      })
    }
  }

  const SwitchModelName: React.FC = () => {
    if (modelNameState) {
      return <Input placeholder="Model Name" value={modelsList[props.formIndex].id}></Input>
    } else {
      return <text onClick={(_) => setModelNameState(true)}>{modelsList[props.formIndex].id}</text>
    }
  }

  return (
    <div className="models-tab">
      <SwitchModelName></SwitchModelName>
      {modelsList[props.formIndex].contents.map((_, i) => {
        return (
          <ModelsForm formIndex={props.formIndex} modelIndex={i}></ModelsForm>
        )
      }
      )}
      <Button className="models-tab__button" onClick={addFormHandler}>
        <PlusOutlined />
      </Button>
      <Button danger className="models-form__button" onClick={deleteObjectHandler}>
        <CloseOutlined />
      </Button>
    </div>
  )
}