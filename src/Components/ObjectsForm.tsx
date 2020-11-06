import React, { ChangeEvent, FocusEvent } from 'react';
import { Button, Checkbox, Input, InputNumber, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import { modelsListState, objectsListState } from '../Recoil/atom';
import { InputTypes, IObjectsElem } from '../Types';
import { useRecoilValue } from 'recoil';
import '../Styles/objects-form.scss';
import { SelectValue } from 'antd/lib/select';

const { Option } = Select;

interface Props {
  formIndex: number;
}

export const ObjectsForm: React.FC<Props> = (props: Props) => {
  const modelsList = useRecoilValue(modelsListState);
  const [objectsList, setObjectsList] = useRecoilState(objectsListState);

  const deleteObjectsFormList = () => {
    setObjectsList((prev) => {
      return prev.slice(0, props.formIndex).concat(prev.slice((props.formIndex + 1), prev.length));
    })
  }

  const changeModelTemplate = (v: string) => {
    setObjectsList((prev) => {
      const model = modelsList.find((e) => e.id === v);
      let object: IObjectsElem[] = [];
      model?.contents.map((e) => {
        object.push({ key: e.key, type: e.type, isArray: e.isArray, value: [""] });
        return true;
      })
      return prev.slice(0, props.formIndex).concat({ name: prev[props.formIndex].name, id: prev[props.formIndex].id, modelId: v, contents: object }).concat(prev.slice(props.formIndex + 1, prev.length));
    })
  }

  const changeArraySize = (v: string | number | undefined, i: number) => {
    setObjectsList((prev) => {
      if (Number(v) === prev[props.formIndex].contents[i].value.length) {
        return prev;
      } else if (Number(v) < prev[props.formIndex].contents[i].value.length) {
        const prevModel = prev[props.formIndex].contents[i];
        return prev.slice(0, props.formIndex).concat({
          name: prev[props.formIndex].name,
          id: prev[props.formIndex].id,
          modelId: prev[props.formIndex].modelId,
          contents: prev[props.formIndex].contents.slice(0, i).concat({
            key: prevModel.key,
            type: prevModel.type,
            isArray: prevModel.isArray,
            value: prevModel.value.slice(0, Number(v))
          }).concat(prev[props.formIndex].contents.slice(i + 1, prev[props.formIndex].contents.length))
        }).concat(prev.slice(props.formIndex + 1, prev.length));
      } else {
        const prevModel = prev[props.formIndex].contents[i];
        let addObj: Array<string | number | boolean> = Array<string | number | boolean>();
        [...Array(Number(v) - prev[props.formIndex].contents[i].value.length)].forEach((_) => addObj.push(""));
        return prev.slice(0, props.formIndex).concat({
          name: prev[props.formIndex].name,
          id: prev[props.formIndex].id,
          modelId: prev[props.formIndex].modelId,
          contents: prev[props.formIndex].contents.slice(0, i).concat({
            key: prevModel.key,
            type: prevModel.type,
            isArray: prevModel.isArray,
            value: prevModel.value.concat(addObj)
          }).concat(prev[props.formIndex].contents.slice(i + 1, prev[props.formIndex].contents.length))
        }).concat(prev.slice(props.formIndex + 1, prev.length));
      }
    });
  }

  const changeStringInputValue = (e: ChangeEvent<HTMLInputElement>, i: number, index: number) => {
    setObjectsList((prev) => {
      const prevModel = prev[props.formIndex].contents[i];
      return prev.slice(0, props.formIndex).concat({
        name: prev[props.formIndex].name,
        id: prev[props.formIndex].id,
        modelId: prev[props.formIndex].modelId,
        contents: prev[props.formIndex].contents.slice(0, i).concat({
          key: prevModel.key,
          type: prevModel.type,
          isArray: prevModel.isArray,
          value: prevModel.value.slice(0, index).concat(e.target.value).concat(prevModel.value.slice(index + 1, prevModel.value.length))
        }).concat(prev[props.formIndex].contents.slice(i + 1, prev[props.formIndex].contents.length))
      }).concat(prev.slice(props.formIndex + 1, prev.length));
    })
  }

  const changeNumberInputValue = (e: FocusEvent<HTMLInputElement>, i: number, index: number) => {
    setObjectsList((prev) => {
      const prevModel = prev[props.formIndex].contents[i];
      return prev.slice(0, props.formIndex).concat({
        name: prev[props.formIndex].name,
        id: prev[props.formIndex].id,
        modelId: prev[props.formIndex].modelId,
        contents: prev[props.formIndex].contents.slice(0, i).concat({
          key: prevModel.key,
          type: prevModel.type,
          isArray: prevModel.isArray,
          value: prevModel.value.slice(0, index).concat(Number(e.target.value)).concat(prevModel.value.slice(index + 1, prevModel.value.length))
        }).concat(prev[props.formIndex].contents.slice(i + 1, prev[props.formIndex].contents.length))
      }).concat(prev.slice(props.formIndex + 1, prev.length));
    })
  }

  const changeBooleanInputValue = (e: { target: { checked: boolean; }; }, i: number, index: number) => {
    setObjectsList((prev) => {
      const prevModel = prev[props.formIndex].contents[i];
      return prev.slice(0, props.formIndex).concat({
        name: prev[props.formIndex].name,
        id: prev[props.formIndex].id,
        modelId: prev[props.formIndex].modelId,
        contents: prev[props.formIndex].contents.slice(0, i).concat({
          key: prevModel.key,
          type: prevModel.type,
          isArray: prevModel.isArray,
          value: prevModel.value.slice(0, index).concat(e.target.checked).concat(prevModel.value.slice(index + 1, prevModel.value.length))
        }).concat(prev[props.formIndex].contents.slice(i + 1, prev[props.formIndex].contents.length))
      }).concat(prev.slice(props.formIndex + 1, prev.length));
    })
  }

  const changeCustomInputValue = (v: SelectValue, i: number, index: number) => {
    setObjectsList((prev) => {
      const prevModel = prev[props.formIndex].contents[i];
      return prev.slice(0, props.formIndex).concat({
        name: prev[props.formIndex].name,
        id: prev[props.formIndex].id,
        modelId: prev[props.formIndex].modelId,
        contents: prev[props.formIndex].contents.slice(0, i).concat({
          key: prevModel.key,
          type: prevModel.type,
          isArray: prevModel.isArray,
          value: prevModel.value.slice(0, index).concat(v.toString()).concat(prevModel.value.slice(index + 1, prevModel.value.length))
        }).concat(prev[props.formIndex].contents.slice(i + 1, prev[props.formIndex].contents.length))
      }).concat(prev.slice(props.formIndex + 1, prev.length));
    })
  }

  return (
    <div className="objects-form">
      <h3>{objectsList[props.formIndex].name}</h3>
      <Select className="objects-form__select" onChange={changeModelTemplate}>
        {modelsList.map((_, i) => {
          return (
            <Option value={modelsList[i].id}>{modelsList[i].name}</Option>
          );
        })}
      </Select>

      {objectsList[props.formIndex].contents.map((e, i) => {
        const ArraySize: React.FC = () => {
          if (e.isArray) {
            return (
              <>
                <label>ArraySize</label>
                <InputNumber placeholder="Array Size" min={0} value={e.value.length} onChange={(v) => changeArraySize(v, i)}></InputNumber>
              </>
            );
          } else {
            return <></>;
          }
        }

        const InputField: React.FC<{ index: number }> = (ifProps: { index: number }) => {
          if (e.type === InputTypes.string) {
            return <Input placeholder="value" defaultValue={objectsList[props.formIndex].contents[i].value[ifProps.index]?.toString()} onBlur={(e) => changeStringInputValue(e, i, ifProps.index)}></Input>;
          } else if (e.type === InputTypes.number) {
            return <InputNumber placeholder="value" defaultValue={Number(objectsList[props.formIndex].contents[i].value[ifProps.index])} onBlur={(e) => changeNumberInputValue(e, i, ifProps.index)}></InputNumber>;
          } else if (e.type === InputTypes.boolean) {
            return <Checkbox defaultChecked={!!objectsList[props.formIndex].contents[i].value[ifProps.index]} onChange={(e) => changeBooleanInputValue(e, i, ifProps.index)}></Checkbox>;
          } else {
            const matchList = objectsList.filter((e) => e.modelId === objectsList[props.formIndex].contents[i].type);
            return (
              <Select onChange={(v) => changeCustomInputValue(v, i, ifProps.index)}>
                {matchList.map((e) => {
                  return <Option value={e.id}>{e.name}</Option>;
                })}
              </Select>
            )
          }
        }

        return (
          <div>
            <ArraySize></ArraySize>
            <label>{e.key} : </label>
            {e.value.map((_, index) => {
              return (
                <>
                  <InputField index={index}></InputField>
                </>
              );
            })}
          </div>
        )
      }
      )}
      <Button danger className="objects-form__button" onClick={deleteObjectsFormList}>
        <CloseOutlined />
      </Button>
    </div >
  )
}