import React from 'react';
import './App.css';
import { Tabs } from 'antd';
import { ModelsTab } from './Components/ModelsTab';
import 'antd/dist/antd.css';

const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Models" key="1">
          <ModelsTab></ModelsTab>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
