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

  return (
    <div className="objects-form">
    </div >
  )
}