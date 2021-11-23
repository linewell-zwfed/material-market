export default function genDynamicAddForm() {
  return `import React, { useState, useEffect } from 'react';
  import { Form, Modal, Input, Button, Row, Col, message, Table, Icon } from 'antd';
  
  let id = 1;
  
  const DynamicAddForm = props => {
    const { form } = props;
    const { getFieldDecorator, setFieldsValue, validateFieldsAndScroll } = form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
  
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({ name: '张三' });
    const [keys, setKeys] = useState([0]);
    const [context, setContext] = useState({});
  
    const remove = k => {
      if (keys.length === 1) {
        return;
      }
      setKeys(keys.filter(key => key !== k));
    };
  
    const add = () => {
      const nextKeys = keys.concat([id++]);
      setKeys(nextKeys);
    };
  
    useEffect(() => {
      if (!visible) return;
      if (context.record) setFieldsValue(context);
      setFieldsValue({ record: [data] });
    }, [visible]);
  
    const onClose = () => {
      setVisible(false);
    };
  
    const commit = () => {
      validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log(values);
          setContext(values);
          onClose();
        }
      });
    };
  
    return (
      <>
        <Button type="primary" onClick={() => setVisible(true)}>
          新增表单
        </Button>
        &nbsp;&nbsp;
        {JSON.stringify(context.record ? context : data)}
        <Modal
          centered
          width={800}
          bodyStyle={{ maxHeight: 500, overflow: 'auto' }}
          title="新增"
          visible={visible}
          maskClosable={false}
          destroyOnClose={true}
          onCancel={onClose}
          footer={
            <>
              <Button type="primary" key="commit" onClick={commit}>
                提交
              </Button>
              <Button key="close" onClick={onClose}>
                关闭
              </Button>
            </>
          }
        >
          <Form>
            <Button type="dashed" onClick={add}>
              新增表单
            </Button>
  
            {keys?.map((k, index) => {
              return (
                <Row gutter={24} key={index}>
                  <Col span={12}>
                    <Form.Item {...formItemLayout} label={\`姓名\${k}\`}>
                      {getFieldDecorator(\`record[\${k}].name\`, {
                        rules: [{ required: true, message: '请输入姓名' }]
                      })(<Input placeholder="请输入姓名" />)}
                    </Form.Item>
                  </Col>
                  <Col span={2}>{keys.length > 1 ? <Icon type="minus-circle-o" onClick={() => remove(k)} /> : null}</Col>
                </Row>
              );
            })}
          </Form>
        </Modal>
      </>
    );
  };
  
  export default Form.create()(DynamicAddForm);`
}