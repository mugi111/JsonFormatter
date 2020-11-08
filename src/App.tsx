import React from 'react';
import { Tabs } from 'antd';
import { ModelsTab } from './Components/ModelsTab';
import { ObjectsTab } from './Components/ObjectsTab';
import { OutputTab } from './Components/OutputTab';
import './App.css';
import 'antd/dist/antd.css';
import './Styles/header.scss';

const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="header__h1">Json Formmatter</h1>
      </header>
      <div className="body">
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
    </div>
  );
}

export default App;
