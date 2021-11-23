export default function genDynamicEditForm() {
  return `import React, { useState, useEffect } from 'react';
  import { Form, Modal, Input, Button, Row, Col, message, Table } from 'antd';
  
  const ValidateForm = props => {
    const { form } = props;
    const { getFieldDecorator, validateFields, setFieldsValue } = form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
  
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({ name: '张三', age: '19', grade: '77' });
  
    const formData = [data];
  
    useEffect(() => {
      if (!visible) return;
      setFieldsValue(data);
    }, [visible]);
  
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '年龄',
        dataIndex: 'age'
      },
      {
        title: '成绩',
        dataIndex: 'grade'
      },
      {
        title: '操作',
        render(value, record) {
          return (
            <a
              onClick={() => {
                setData(record);
                setVisible(true);
              }}
            >
              编辑
            </a>
          );
        }
      }
    ];
  
    const onClose = () => setVisible(false);
  
    const commit = () => {
      validateFields((err, values) => {
        if (!err) {
          setData(values);
          message.success('修改成功');
          onClose();
        }
      });
    };
    return (
      <>
        <Table columns={columns} dataSource={formData} />
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
                <Form.Item {...formItemLayout} label="姓名">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入姓名' }]
                  })(<Input placeholder="请输入姓名" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="年龄">
                  {getFieldDecorator('age', {
                    rules: [{ required: true, message: '请输入年龄' }]
                  })(<Input placeholder="请输入年龄" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item {...formItemLayout} label="成绩">
                  {getFieldDecorator('grade', {
                    rules: [{ required: true, message: '请输入成绩' }]
                  })(<Input placeholder="请输入成绩" />)}
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