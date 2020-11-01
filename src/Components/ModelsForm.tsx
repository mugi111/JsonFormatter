import React from 'react';
import { Button, Input, Select } from 'antd';
import { InputTypes } from '../Types';
import '../Styles/models-form.scss';
import { CloseOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { modelsListState } from '../Recoil/atom';

const { Option } = Select;

interface Props {
  formIndex: number;
  modelIndex: number;
}

export const ModelsForm: React.FC<Props> = (props: Props) => {
  const [modelsList, setModelsList] = useRecoilState(modelsListState)

  const changeKeyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModelsList((prev) => {
      const prevContent = prev[props.formIndex].contents;
      return prev.slice(0, props.formIndex).concat([{ id: prev[props.formIndex].id, contents: prevContent.slice(0, props.modelIndex).concat({ key: e.target.value, type: prevContent[props.modelIndex].type }).concat(prevContent.slice(props.modelIndex + 1, prevContent.length)) }]).concat(prev.slice((props.formIndex + 1), prev.length));
    })
  }

  const changeTypeHandler = (val: InputTypes) => {
    setModelsList((prev) => {
      const prevContent = prev[props.formIndex].contents;
      return prev.slice(0, props.formIndex).concat([{ id: prev[props.formIndex].id, contents: prevContent.slice(0, props.modelIndex).concat({ key: prevContent[props.modelIndex].key, type: val }).concat(prevContent.slice(props.modelIndex + 1, prevContent.length)) }]).concat(prev.slice((props.formIndex + 1), prev.length));
    })
  }

  const deleteObjectHandler = () => {
    setModelsList((prev) => {
      const prevContent = prev[props.formIndex].contents;
      return prev.slice(0, props.formIndex).concat({ id: prev[props.formIndex].id, contents: prevContent.slice(0, props.modelIndex).concat(prevContent.slice(props.modelIndex + 1, prevContent.length)) }).concat(prev.slice((props.modelIndex + 1), prev.length));
    })
  }

  return (
    <div className="models-form">
      <Input className="models-form__input" placeholder="Key" value={modelsList[props.formIndex].contents[props.modelIndex].key} onChange={changeKeyHandler}></Input>
      <Select className="models-form__select" value={modelsList[props.formIndex].contents[props.modelIndex].type} defaultValue={InputTypes.string} onChange={changeTypeHandler}>
        <Option value={InputTypes.string}>{InputTypes.string}</Option>
        <Option value={InputTypes.number}>{InputTypes.number}</Option>
        <Option value={InputTypes.boolean}>{InputTypes.boolean}</Option>
      </Select>
      <Button danger className="models-form__button" onClick={deleteObjectHandler}>
        <CloseOutlined />
      </Button>
    </div >
  )
}