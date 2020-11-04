import React from 'react';
import './App.css';
import { Tabs } from 'antd';
import { ModelsTab } from './Components/ModelsTab';
import { ObjectsTab } from './Components/ObjectsTab';
import { OutputTab } from './Components/OutputTab';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Models" key="1">
          <ModelsTab></ModelsTab>
        </TabPane>
        <TabPane tab="Objects" key="2">
          <ObjectsTab></ObjectsTab>
        </TabPane>
        <TabPane tab="Output" key="3">
          <OutputTab></OutputTab>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
