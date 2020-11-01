import React from 'react';
import { Input, Select } from 'antd';
import { InputTypes } from '../Types';
import '../Styles/models-form.scss';

const { Option } = Select;

export const ModelsForm: React.FC = () => {
  return (
    <div className="models-form">
      <Input className="models-form__input" placeholder="Key"></Input>
      <Select className="models-form__select" defaultValue="String">
        <Option value={InputTypes.String}>{InputTypes.String}</Option>
        <Option value={InputTypes.Number}>{InputTypes.Number}</Option>
        <Option value={InputTypes.Boolean}>{InputTypes.Boolean}</Option>
      </Select>
    </div>
  )
}