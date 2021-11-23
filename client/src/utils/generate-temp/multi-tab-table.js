export default function genMultiTabTable() {
  return `import React, { useState } from 'react';
  import { Tabs, Button } from 'antd';
  
  import QueryTable, { useQueryTable } from '@linewell-components/query-table/lib/hooks';
  import { InputSearch, InputGroupSearch } from '@linewell-components/query-table';
  
  const TabPane = Tabs.TabPane;
  
  /** 取件状态 */
  export enum PickUpStatus {
    /** 未取件 */
    UnCompleted = '0',
  
    /** 已取件 */
    Completed = '1'
  }
  
  const MultiTabTable = () => {
    const [activeKey, setActiveKey] = useState(PickUpStatus.UnCompleted);
    const [keyword, setKeyword] = useState({ projid: '' });
  
    const { tableInstance, ...tableProps } = useQueryTable('对应分页接口', {
      params: {
        hasTake: PickUpStatus.UnCompleted
      }
    });
  
    const columns = [
      {
        title: 'title1',
        dataIndex: 'dataIndex1',
        width: 80,
        align: 'center'
      },
      {
        title: 'title2',
        dataIndex: 'dataIndex2',
        width: 80,
        align: 'center'
      },
      {
        title: 'title3',
        dataIndex: 'dataIndex3',
        width: 80,
        align: 'center'
      },
      {
        title: '操作',
        key: 'action',
        width: 120,
        align: 'center',
        render(record) {
          return <a>操作1</a>;
        }
      }
    ];
  
    const renderLeftActions = (onSearch, lastSearch) => {
      return <Button type="primary">新增</Button>;
    };
  
    const renderSearchInput = (onSearch, lastSearch) => {
      return (
        <div style={{ float: 'right' }}>
          <InputGroupSearch
            value={keyword}
            options={[
              { label: '申报号', value: 'projid' },
              { label: '申报者', value: 'applicantName' },
              { label: '联系电话', value: 'applicantPhone' }
            ]}
            normalizePattern={['noSpecialCharacter']}
            selectProps={{ style: { width: 100 } }}
            onSearch={search => {
              onSearch({ ...lastSearch, ...search });
            }}
            onChange={v => setKeyword(v)}
            selectChangeClearInputValue
            selectChangeToggleSearch
          />
        </div>
      );
    };
  
    const handleChange = hasTake => {
      setActiveKey(hasTake);
      setKeyword({ projid: '' });
      tableInstance.run({
        params: {
          hasTake
        }
      });
    };
  
    return (
      <div style={{ padding: 16, backgroundColor: '#fff' }}>
        <Tabs activeKey={activeKey} onChange={handleChange}>
          <TabPane tab="待取件" key={PickUpStatus.UnCompleted} />
          <TabPane tab="已取件" key={PickUpStatus.Completed} />
        </Tabs>
        <QueryTable
          rowKey="unid"
          showIndex
          columns={columns}
          renderLeftActions={renderLeftActions}
          renderSearchInput={renderSearchInput}
          {...tableProps}
        />
      </div>
    );
  };
  
  export default MultiTabTable;`
}