export default function genDetailDrawer() {
  return `import React, { useState } from 'react';
  import { Button, Drawer, PageHeader, Tabs, Statistic, Descriptions } from 'antd';
  
  import styles from './index.less';
  
  const { TabPane } = Tabs;
  const DetailDrawer = props => {
    const [visible, setVisible] = useState(false);
    const [activeKey, setActiveKey] = useState('1');
  
    const onClose = () => setVisible(false);
  
    const Content = ({ children, extra }) => {
      return (
        <div className="content" style={{ display: 'flex', paddingBottom: 16 }}>
          <div className="main">{children}</div>
          <div className="extra">{extra}</div>
        </div>
      );
    };
  
    const extraContent = (
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          justifyContent: 'flex-end',
          paddingRight: 20
        }}
      >
        <Statistic
          title="Status"
          value="Pending"
          style={{
            marginRight: 32
          }}
        />
        <Statistic title="Price" prefix="$" value={568.08} />
      </div>
    );
  
    const renderContent = (column = 2) => (
      <Descriptions size="small" column={column}>
        <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
        <Descriptions.Item label="Association">421421</Descriptions.Item>
        <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
        <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
        <Descriptions.Item label="Remarks">Gonghu Road, Xihu District, Hangzhou, Zhejiang, China</Descriptions.Item>
      </Descriptions>
    );
  
    return (
      <>
        <a onClick={() => setVisible(true)}>查看详情</a>
        <Drawer
          width="calc(100% - 300px)"
          title="详情"
          placement="right"
          destroyOnClose={true}
          maskClosable={false}
          visible={visible}
          onClose={onClose}
          bodyStyle={{ padding: 0, height: 'calc(100vh - 55px)', overflow: 'auto', background: '#fff' }}
        >
          <PageHeader
            title="事项名称：xxx"
            extra={[
              <Button key="1" type="primary">
                Primary
              </Button>
            ]}
            footer={
              <Tabs activeKey={activeKey} onChange={setActiveKey}>
                <TabPane tab="基本信息" key="1" />
                <TabPane tab="表单信息" key="2" />
              </Tabs>
            }
          >
            <Content extra={extraContent}>{renderContent()}</Content>
          </PageHeader>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.table}>1</div>
            </div>
          </div>
        </Drawer>
      </>
    );
  };
  
  export default DetailDrawer;`
}