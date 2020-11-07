import React, { useState } from 'react';
import { Button, Select, Input } from 'antd';
import { objectsListState } from '../Recoil/atom';
import { useRecoilValue } from 'recoil';
import { InputTypes, IObjectsList } from '../Types';

const { Option } = Select;
const { TextArea } = Input;

export const OutputTab: React.FC = () => {
  const objectsList = useRecoilValue(objectsListState);
  const [outputObj, setOutputObj] = useState<string>("");
  const [selectedObj, setSelectedObj] = useState<string>("");
  let indentCount = 0;

  const changeSelectObject = (v: string) => {
    setSelectedObj(v);
  }

  const output = () => {
    setOutputObj("");
    indentCount = 0;
    const obj = objectsList.find((e) => e.id === selectedObj);
    (obj != null) ? searchObject(obj) : console.log("undefined");
  }

  const searchObject = (obj: IObjectsList) => {
    addCurlyBracesOpen();
    obj.contents.forEach((e, i) => {
      addIndent();
      addKey(e.key);
      switch (e.type) {
        case InputTypes.string:
          addString(e.value as string[], e.isArray);
          if (i < obj.contents.length - 1) {
            addComma();
          }
          addReturn();
          break;
        case InputTypes.number:
          addNumber(e.value as number[], e.isArray);
          if (i < obj.contents.length - 1) {
            addComma();
          }
          addReturn();
          break;
        case InputTypes.boolean:
          addBoolean(e.value as boolean[], e.isArray);
          if (i < obj.contents.length - 1) {
            addComma();
          }
          addReturn();
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
            tmp.forEach((v, i) => {
              v != null ? searchObject(v) : console.log("undefined");
              if (i < tmp.length - 1) {
                addComma();
              }
            })
            addSquireBracketsClose();
            if (i < obj.contents.length - 1) {
              addComma();
            }
          } else {
            tmp != null ? searchObject(tmp[0]) : console.log("undefined");
            if (i < obj.contents.length - 1) {
              addComma();
              addReturn();
            }
          }
          break;
      }
    });
    addCurlyBracesClose();
  }

  const addIndent = () => {
    for (let i = 0; i < indentCount; i++) {
      setOutputObj((prev) => prev + '  ');
    }
  }

  const addBracketsOpen = (bracket: string) => {
    setOutputObj((prev) => prev + bracket);
  }

  const addBracketsClose = (bracket: string) => {
    setOutputObj((prev) => prev + bracket);
  }

  const addCurlyBracesOpen = () => {
    addIndent();
    addBracketsOpen("{");
    indentCount++;
    addReturn();
  }

  const addCurlyBracesClose = () => {
    indentCount--;
    addIndent();
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
      val.forEach((e, i) => {
        if (i < val.length - 1) {
          tmp += `"${e}" ,`;
        } else {
          tmp += `"${e}"`;
        }
      })
      setOutputObj((prev) => prev + tmp);
      addSquireBracketsClose();
    } else {
      setOutputObj((prev) => prev + `"${val[0]}"`);
    }
  }

  const addNumber = (val: number[], isArray: boolean = false) => {
    if (isArray) {
      let tmp: string = "";
      addSquireBracketsOpen();
      val.forEach((e, i) => {
        if (i < val.length - 1) {
          tmp += `${e} ,`;
        } else {
          tmp += `${e}`;
        }
      })
      setOutputObj((prev) => prev + tmp);
      addSquireBracketsClose();
    } else {
      setOutputObj((prev) => prev + `${val[0]}`);
    }
  }

  const addBoolean = (val: boolean[], isArray: boolean = false) => {
    if (isArray) {
      let tmp: string = "";
      addSquireBracketsOpen();
      val.forEach((e, i) => {
        if (i < val.length - 1) {
          tmp += e ? "true ," : "false ,";
        } else {
          tmp += e ? "true" : "false";
        }
      })
      setOutputObj((prev) => prev + tmp);
      addSquireBracketsClose();
    } else {
      setOutputObj((prev) => prev + (val[0] ? "true" : "false"));
    }
  }

  return (
    <div className="models-tab">
      <Select value={selectedObj} onChange={changeSelectObject}>
        {objectsList.map((e) => {
          return (
            <Option value={e.id}>{e.name}</Option>
          )
        }
        )}
      </Select>
      <Button onClick={output}>Output</Button>
      <TextArea value={outputObj}></TextArea>
    </div>
  )
}