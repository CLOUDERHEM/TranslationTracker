import React from "react";
import { Card, Tabs } from "antd";
import Main from "~src/components/main";
import Settings from "~src/components/settings";


const { TabPane } = Tabs;

const App: React.FC = () => {
    return (
        <Card size="default" title="Translation Recorder" style={{ width: 300 }}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Main" key="1">
                    <Main />
                </TabPane>
                <TabPane tab="Settings" key="2">
                    <Settings />
                </TabPane>
            </Tabs>
        </Card>
    );
};

export default App;
