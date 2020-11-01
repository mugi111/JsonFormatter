import React from 'react';
import { Button, Select } from 'antd';
import { InputTypes } from '../Types';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

export const ModelsTab: React.FC = () => {
  return (
    <div>
      <Select defaultValue="String">
        <Option value={InputTypes.String}>{InputTypes.String}</Option>
        <Option value={InputTypes.Number}>{InputTypes.Number}</Option>
        <Option value={InputTypes.Boolean}>{InputTypes.Boolean}</Option>
      </Select>
      <Button>
        <PlusOutlined />
      </Button>
    </div>
  )
}