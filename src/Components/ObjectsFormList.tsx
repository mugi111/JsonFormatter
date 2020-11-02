import React from 'react';
import { Button, Checkbox, Input, InputNumber, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { modelsListState, objectsListState } from '../Recoil/atom';
import '../Styles/models-tab.scss';
import { InputTypes, IObjectsElem } from '../Types';
import { useRecoilValue } from 'recoil';

const { Option } = Select;

interface Props {
  formIndex: number;
}

export const ObjectsFormList: React.FC<Props> = (props: Props) => {
  const modelsList = useRecoilValue(modelsListState);
  const [objectsList, setObjectsList] = useRecoilState(objectsListState);

  const deleteObjectsFormList = () => {
    setObjectsList((prev) => {
      return prev.slice(0, props.formIndex).concat(prev.slice((props.formIndex + 1), prev.length));
    })
  }

  const changeModelTemplate = (v: number) => {
    setObjectsList((prev) => {
      const model = modelsList.find((e) => e.id === v);
      let object: IObjectsElem[] = [];
      model?.contents.map((e) => {
        object.push({ key: e.key, type: e.type, isArray: e.isArray, value: [] });
        return true;
      })
      return prev.slice(0, props.formIndex).concat({ id: prev[props.formIndex].id, model: object }).concat(prev.slice(props.formIndex + 1, prev.length));
    })
  }


  return (
    <div className="models-tab">
      <h3>{objectsList[props.formIndex].id}</h3>
      <Select className="objects-form__select" onChange={changeModelTemplate}>
        {modelsList.map((_, i) => {
          return (
            <Option value={modelsList[i].id}>{modelsList[i].id}</Option>
          );
        })}
      </Select>

      {objectsList[props.formIndex].model.map((e, i) => {
        console.log(e.type);
        const InputField: React.FC = () => {
          if (e.type === InputTypes.string) {
            return <Input placeholder="value"></Input>;
          } else if (e.type === InputTypes.number) {
            return <InputNumber placeholder="value"></InputNumber>;
          } else if (e.type === InputTypes.boolean) {
            return <Checkbox></Checkbox>;
          } else {
            return <Input placeholder="value"></Input>;
          }
        }

        return (
          <div>
            <label>{e.key} : </label>
            <InputField></InputField>
          </div>
        )
      }
      )}
      <Button danger className="models-form__button" onClick={deleteObjectsFormList}>
        <CloseOutlined />
      </Button>
    </div>
  )
}