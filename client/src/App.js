import { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Collapse, Radio, message } from 'antd';
import { getSavePath, createFile, getDefaultPath } from './utils/extensionService'
import { AppContext } from './GlobalContext'
import temps from './utils/generate-temp'
import './App.css';

const { Panel } = Collapse;

function App() {
  const vscode = useContext(AppContext);
  let [filePath, setFilePath] = useState('');
  let [fileName, setFileName] = useState('');
  let [temp, setTemp] = useState();
  let [tempKey, setTempKey] = useState();

  useEffect(() => {
    getDefaultPath(vscode).then(event => {
      setFilePath(event.data.payload)
    })
  }, [vscode]);

  const browerFilePath = () => {
    getSavePath({
      canSelectFolders: true
    }, vscode).then(event => {
      if(event.data.payload && event.data.payload.length) {
        setFilePath(event.data.payload[0].path)
      }
    });
  }

  const saveFile = () => {
    if (!filePath || !temp || !fileName) {
      message.error('请设置存储路径，填写文件名，选择物料模板!!')
      return;
    }
    createFile({
      fileName: fileName + '.tsx',
      filePath: filePath,
      fileContent: temp.gen(),
    }, vscode)
  }

  const onTempChange = (obj, key) => {
    const v = obj[key]
    setFileName(v.fileName)
    setTemp(v)
    setTempKey(key)
  }

  return (
    <div className='App'>
      <Form layout='vertical'>
        <Form.Item label='物料存储路径：'>
          <Input value={filePath} readOnly onClick={browerFilePath} />
        </Form.Item>
        <Form.Item label='文件名：'>
          <Input value={fileName} onChange={(e) => setFileName(e.target.value)} />
        </Form.Item>
        <Form.Item label='选择物料：'>
          <Collapse>
            <Panel header='列表页' key='1'>
              <Radio.Group buttonStyle='solid' onChange={(e) => onTempChange(temps.list, e.target.value)} value={tempKey}>
                {
                  Object.entries(temps.list).map(([key, value]) => <Radio.Button value={key} key={key}>{value.label}</Radio.Button>)
                }
              </Radio.Group>
            </Panel>
            <Panel header='详情页' key='2'>
              <Radio.Group buttonStyle='solid' onChange={(e) => onTempChange(temps.details, e.target.value)} value={tempKey}>
                {
                  Object.entries(temps.details).map(([key, value]) => <Radio.Button value={key} key={key}>{value.label}</Radio.Button>)
                }
              </Radio.Group>
            </Panel>
            <Panel header='操作项' key='3'>
              <Radio.Group buttonStyle='solid' onChange={(e) => onTempChange(temps.operations, e.target.value)} value={tempKey}>
                {
                  Object.entries(temps.operations).map(([key, value]) => <Radio.Button value={key} key={key}>{value.label}</Radio.Button>)
                }
              </Radio.Group>
            </Panel>
            <Panel header='表单' key='4'>
              <Radio.Group buttonStyle='solid' onChange={(e) => onTempChange(temps.forms, e.target.value)} value={tempKey}>
                {
                  Object.entries(temps.forms).map(([key, value]) => <Radio.Button value={key} key={key}>{value.label}</Radio.Button>)
                }
              </Radio.Group>
            </Panel>
          </Collapse>
        </Form.Item>
        <Form.Item>
          <Button onClick={saveFile} type="primary">创建</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
