export default function genDetailModal() {
  return `/* eslint-disable complexity */
  /* eslint-disable no-unused-expressions */
  import React, { useState } from 'react';
  import { Modal, Button, Steps, Descriptions } from 'antd';
  
  const { Step } = Steps;
  const DetailModal = props => {
    const [visible, setVisible] = useState(false);
  
    const onClose = () => setVisible(false);
  
    return (
      <>
        <a onClick={() => setVisible(true)}>查看详情</a>
        <Modal
          width={800}
          centered
          bodyStyle={{ maxHeight: 500, overflow: 'auto' }}
          title="详情"
          visible={visible}
          maskClosable={false}
          destroyOnClose={true}
          onCancel={onClose}
          footer={[
            <Button key="close" onClick={onClose}>
              关闭
            </Button>
          ]}
        >
          <Descriptions size="small" column={2}>
            <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
            <Descriptions.Item label="Association">421421</Descriptions.Item>
            <Descriptions.Item label="Creation Time">2017-01-10</Descriptions.Item>
            <Descriptions.Item label="Effective Time">2017-10-10</Descriptions.Item>
            <Descriptions.Item label="Remarks">Gonghu Road, Xihu District, Hangzhou, Zhejiang, China</Descriptions.Item>
          </Descriptions>
        </Modal>
      </>
    );
  };
  
  export default DetailModal;`
}