export default function genSingleTable() {
  return `import React from 'react';
  import { Button } from 'antd';
  import QueryTable, { useQueryTable } from '@linewell-components/query-table/lib/hooks';
  import { InputSearch, InputGroupSearch } from '@linewell-components/query-table';
  
  const SingleTable = () => {
    const { tableInstance, ...tableProps } = useQueryTable('xxx');
  
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
            selectChangeClearInputValue
            selectChangeToggleSearch
          />
        </div>
      );
    };
  
    return (
      <div style={{ padding: 16, backgroundColor: '#fff' }}>
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
  
  export default SingleTable;`
}