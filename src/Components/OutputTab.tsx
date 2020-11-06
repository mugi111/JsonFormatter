import React, { useState } from 'react';
import { Button, Input, Select } from 'antd';
import { objectsListState } from '../Recoil/atom';
import { useRecoilValue } from 'recoil';
import { InputTypes, IObjectsList } from '../Types';

const { Option } = Select;

export const OutputTab: React.FC = () => {
  const objectsList = useRecoilValue(objectsListState);
  const [outputObj, setOutputObj] = useState<string>("");
  const [selectedObj, setSelectedObj] = useState<string>("");
  const [indentCount, setIndentCount] = useState<number>(0);

  const changeSelectObject = (v: string) => {
    setSelectedObj(v);
  }

  const output = () => {
    const obj = objectsList.find((e) => e.id === selectedObj);
    (obj != null) ? searchObject(obj) : console.log("undefined");
  }

  const searchObject = (obj: IObjectsList) => {
    addCurlyBracesOpen();
    obj.contents.forEach((e) => {
      console.log(e);
      addKey(e.key);
      switch (e.type) {
        case InputTypes.string:
          console.log("String");
          addString(e.value as string[], e.isArray);
          break;
        case InputTypes.number:
          console.log("number");
          addNumber(e.value as number[], e.isArray);
          break;
        case InputTypes.boolean:
          console.log("boolean");
          addBoolean(e.value as boolean[], e.isArray);
          break;
        default:
          let tmp: IObjectsList[] = [];
          e.value.forEach((v) => {
            const finded = objectsList.find((v2) => v2.id === v);
            if (finded != null) {
              tmp.push(finded);
            }
          });
          if (e.isArray) {
            addSquireBracketsOpen();
            tmp.forEach((v) => {
              v != null ? searchObject(v) : console.log("undefined");
              addComma();
            })
            addSquireBracketsClose();
            addComma();
          } else {
            tmp != null ? searchObject(tmp[0]) : console.log("undefined");
          }
          console.log(e.value, tmp); break;
      }
    });
    addCurlyBracesClose();
  }

  const addIndent = () => {
    for (let i = 0; i < indentCount; i++) {
      setOutputObj((prev) => prev + "  ");
      setIndentCount((prev) => prev + 1);
    }
  }

  const reduceIndent = () => {
    for (let i = 0; i < indentCount; i++) {
      setOutputObj((prev) => prev + "  ");
      setIndentCount((prev) => prev - 1);
    }
  }

  const addBracketsOpen = (bracket: string) => {
    addIndent();
    setOutputObj((prev) => prev + bracket);
  }

  const addBracketsClose = (bracket: string) => {
    reduceIndent();
    setOutputObj((prev) => prev + bracket);
  }

  const addCurlyBracesOpen = () => {
    addBracketsOpen("{");
    addReturn();
  }

  const addCurlyBracesClose = () => {
    addBracketsClose("}");
  }

  const addSquireBracketsOpen = () => {
    addBracketsOpen("[");
  }

  const addSquireBracketsClose = () => {
    addBracketsClose("]");
  }

  const addComma = () => {
    setOutputObj((prev) => prev + ", ");
  }

  const addKey = (key: string) => {
    setOutputObj((prev) => prev + `"${key}" : `);
  }

  const addReturn = () => {
    setOutputObj((prev) => prev + "\n");
  }

  const addString = (val: string[], isArray: boolean = false) => {
    if (isArray) {
      let tmp: string = "";
      addSquireBracketsOpen();
      val.forEach((e) => {
        tmp += `"${e}" ,`;
      })
      setOutputObj((prev) => prev + tmp);
      addSquireBracketsClose();
    } else {
      setOutputObj((prev) => prev + `"${val[0]}"`);
    }
    addComma();
    addReturn();
  }

  const addNumber = (val: number[], isArray: boolean = false) => {
    if (isArray) {
      let tmp: string = "";
      addSquireBracketsOpen();
      val.forEach((e) => {
        tmp += `${e} ,`;
      })
      setOutputObj((prev) => prev + tmp);
      addSquireBracketsClose();
    } else {
      setOutputObj((prev) => prev + `${val[0]}`);
    }
    addComma();
    addReturn();
  }

  const addBoolean = (val: boolean[], isArray: boolean = false) => {
    if (isArray) {
      let tmp: string = "";
      addSquireBracketsOpen();
      val.forEach((e) => {
        tmp += e ? "true ," : "false ,";
      })
      setOutputObj((prev) => prev + tmp);
      addSquireBracketsClose();
    } else {
      setOutputObj((prev) => prev + (val[0] ? "true" : "false"));
    }
    addComma();
    addReturn();
  }

  return (
    <div className="models-tab">
      {objectsList.map((e) => {
        return (
          <Select onChange={changeSelectObject}>
            <Option value={e.id}>{e.name}</Option>
          </Select>
        )
      }
      )}
      <Button onClick={output}>Output</Button>
      <Input value={outputObj}></Input>
    </div>
  )
}