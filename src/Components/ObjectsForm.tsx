import React from 'react';
import { Button, Checkbox, Input, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { objectsListState } from '../Recoil/atom';
import '../Styles/objects-tab.scss';
import { InputTypes } from '../Types';

const { Option } = Select;

interface Props {
  formIndex: number;
  objectIndex: number;
}

export const ObjectsForm: React.FC<Props> = (props: Props) => {
  const [objectsList, setObjectsList] = useRecoilState(objectsListState);

  return (
    <div className="objects-form">
      <Input className="objects-form__input" placeholder="Key" value={objectsList[props.formIndex].contents[props.objectIndex].model.key} ></Input>
      <Select className="objects-form__select" value={objectsList[props.formIndex].contents[props.objectIndex].model.type} defaultValue={InputTypes.string} >
        <Option value={InputTypes.string}>{InputTypes.string}</Option>
        <Option value={InputTypes.number}>{InputTypes.number}</Option>
        <Option value={InputTypes.boolean}>{InputTypes.boolean}</Option>
        {objectsList.map((_, i) => {
          return (
            (props.formIndex !== i) ? (<Option value={objectsList[i].id}>{objectsList[i].id}</Option>) : (<></>)
          )
        })}
      </Select>
      <Checkbox className="objects-form__checkbox" checked={objectsList[props.formIndex].contents[props.objectIndex].model.isArray} ></Checkbox>
      <Button danger className="objects-form__button">
        <CloseOutlined />
      </Button>
    </div >
  )
}