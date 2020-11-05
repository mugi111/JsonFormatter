import React from 'react';
import { Button, Checkbox, Input, Select } from 'antd';
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
      return prev.slice(0, props.formIndex).concat([{ name: prev[props.formIndex].name, id: prev[props.formIndex].id, contents: prevContent.slice(0, props.modelIndex).concat({ key: e.target.value, isArray: prevContent[props.modelIndex].isArray, type: prevContent[props.modelIndex].type }).concat(prevContent.slice(props.modelIndex + 1, prevContent.length)) }]).concat(prev.slice((props.formIndex + 1), prev.length));
    })
  }

  const changeTypeHandler = (val: InputTypes | string) => {
    setModelsList((prev) => {
      const prevContent = prev[props.formIndex].contents;
      return prev.slice(0, props.formIndex).concat([{ name: prev[props.formIndex].name, id: prev[props.formIndex].id, contents: prevContent.slice(0, props.modelIndex).concat({ key: prevContent[props.modelIndex].key, isArray: prevContent[props.modelIndex].isArray, type: val }).concat(prevContent.slice(props.modelIndex + 1, prevContent.length)) }]).concat(prev.slice((props.formIndex + 1), prev.length));
    })
  }

  const changeIsArrayHandler = (e: { target: { checked: boolean; }; }) => {
    setModelsList((prev) => {
      const prevContent = prev[props.formIndex].contents;
      return prev.slice(0, props.formIndex).concat([{ name: prev[props.formIndex].name, id: prev[props.formIndex].id, contents: prevContent.slice(0, props.modelIndex).concat({ key: prevContent[props.modelIndex].key, isArray: e.target.checked, type: prevContent[props.modelIndex].type }).concat(prevContent.slice(props.modelIndex + 1, prevContent.length)) }]).concat(prev.slice((props.formIndex + 1), prev.length));
    })
  }

  const deleteObjectHandler = () => {
    setModelsList((prev) => {
      const prevContent = prev[props.formIndex].contents;
      return prev.slice(0, props.formIndex).concat({ name: prev[props.formIndex].name, id: prev[props.formIndex].id, contents: prevContent.slice(0, props.modelIndex).concat(prevContent.slice(props.modelIndex + 1, prevContent.length)) }).concat(prev.slice((props.formIndex + 1), prev.length));
    })
  }

  return (
    <div className="models-form">
      <Input className="models-form__input" placeholder="Key" value={modelsList[props.formIndex].contents[props.modelIndex].key} onChange={changeKeyHandler}></Input>
      <Select className="models-form__select" value={modelsList[props.formIndex].contents[props.modelIndex].type} defaultValue={InputTypes.string} onChange={changeTypeHandler}>
        <Option value={InputTypes.string}>{InputTypes.string}</Option>
        <Option value={InputTypes.number}>{InputTypes.number}</Option>
        <Option value={InputTypes.boolean}>{InputTypes.boolean}</Option>
        {modelsList.map((_, i) => {
          return (
            (props.formIndex !== i) ? (<Option value={modelsList[i].id}>{modelsList[i].id}</Option>) : (<></>)
          )
        })}
      </Select>
      <Checkbox className="models-form__checkbox" checked={modelsList[props.formIndex].contents[props.modelIndex].isArray} onChange={changeIsArrayHandler}></Checkbox>
      <Button danger className="models-form__button" onClick={deleteObjectHandler}>
        <CloseOutlined />
      </Button>
    </div >
  )
}