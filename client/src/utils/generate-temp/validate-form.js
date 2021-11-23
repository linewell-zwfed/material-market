export default function genValidateForm() {
  return `import React, { useState } from 'react';
  import { Form, Modal, Input, Button, Row, Col, message, DatePicker } from 'antd';
  const { RangePicker } = DatePicker;
  
  const ValidateForm = props => {
    const { form } = props;
    const { getFieldDecorator, validateFields } = form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
  
    const [visible, setVisible] = useState(false);
  
    const onClose = () => setVisible(false);
  
    const commit = () => {
      validateFields((err, values) => {
        if (!err) {
          console.log(values);
          message.success('提交成功');
        }
      });
    };
    return (
      <>
        <a onClick={() => setVisible(true)}>提交信息</a>
        <Modal
          centered
          width={800}
          bodyStyle={{ maxHeight: 500, overflow: 'auto' }}
          title="提交信息"
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
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="事项名称">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入事项名称' }]
                  })(<Input placeholder="请输入事项名称" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="时间">
                  {getFieldDecorator('date', {
                    rules: [{ required: true, message: '请选择时间' }]
                  })(<RangePicker />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="部门名称">
                  {getFieldDecorator('dept', {
                    rules: [{ required: true, message: '请输入部门名称' }]
                  })(<Input placeholder="请输入部门名称" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="区域名称">
                  {getFieldDecorator('area', {
                    rules: [{ required: true, message: '请输入区域名称' }]
                  })(<Input placeholder="请输入区域名称" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </>
    );
  };
  
  export default Form.create()(ValidateForm);`
}