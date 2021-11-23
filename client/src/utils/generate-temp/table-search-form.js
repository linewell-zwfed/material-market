export default function genTableSearchForm() {
  return `import React, { useState } from 'react';
  import { Badge, Button, Input } from 'antd';
  import QueryTable, { useQueryTable } from '@linewell-components/query-table/lib/hooks';
  import QueryForm from '@linewell-components/query-table/lib/QueryForm';
  import { InputGroupSearch } from '@linewell-components/query-table';
  
  const { Row, Item, More } = QueryForm;
  
  const App = () => {
    const { tableInstance, ...tableProps } = useQueryTable('####', {
      manual: true,
      hidePagination: false,
      initialSorter: {
        sortField: 'book_date',
        sortOrder: 'DESC'
      }
    });
    const [searchValue, setSearchValue] = useState('');
  
    const columns = [
      {
        title: '部门名称',
        dataIndex: 'deptName',
        width: 120,
        render(value) {
          return value;
        }
      },
      {
        title: '事项名称',
        dataIndex: 'serviceName',
        sorter: true,
        sortField: 'serviceName',
        render(value) {
          return value;
        }
      },
      {
        title: '预约人名称',
        dataIndex: 'bookerName'
      },
      {
        title: '手机号码',
        dataIndex: 'phone'
      },
      {
        title: '预约日期',
        dataIndex: 'bookDate'
      },
      {
        title: '预约号',
        dataIndex: 'bookNumber',
        render(value) {
          return value;
        }
      },
      {
        title: '状态',
        key: 'bookIsComplete',
        render({ bookIsComplete, statusText }) {
          return (
            <>
              <Badge status={bookIsComplete ? 'success' : 'error'} />
              {statusText}
            </>
          );
        }
      }
    ];
  
    const renderForm = onSearch => {
      return (
        <QueryForm onSearch={() => onSearch({ keyword: 'sdf' })} onReset={() => onSearch({})}>
          <>
            <Item span={8} label="事项名称">
              <Input type="text" placeholder="请输入事项名称" />
            </Item>
            <Item span={8} label="预约日期">
              <Input type="text" placeholder="请输入预约日期" />
            </Item>
            <Item span={8} label="预约号">
              <Input type="text" placeholder="请输入预约号" />
            </Item>
          </>
  
          <Row>
            <Item span={8} label="预约人">
              <Input type="text" placeholder="请输入预约人姓名" />
            </Item>
            <Item span={8} label="身份证号码">
              <Input type="text" placeholder="请输入身份证号码" />
            </Item>
            <Item span={8} label="手机号码">
              <Input type="text" placeholder="请输入手机号码" />
            </Item>
          </Row>
          <Row>
            <Item span={8} label="预约状态">
              <Input type="text" placeholder="请输入预约状态" />
            </Item>
            <Item span={8} label="预约方式">
              <Input type="text" placeholder="请输入预约方式" />
            </Item>
          </Row>
        </QueryForm>
      );
    };
  
    const renderSearchInput = (onSearch, lastSearch) => {
      return (
        <InputGroupSearch
          defaultValue={{ projid: '' }}
          options={[
            { label: '申报号', value: 'projid' },
            { label: '申报者', value: 'applicantName' },
            { label: '事项名称', value: 'serviceName' }
          ]}
          normalizePattern={['noSpecialCharacter']}
          selectProps={{ style: { width: 100 } }}
          onSearch={search => {
            onSearch({ condition: search });
          }}
          selectChangeClearInputValue
        />
      );
    };
  
    const renderLeftActions = () => {
      return (
        <>
          <Input value={searchValue} onChange={e => setSearchValue(e.target.value)} style={{ width: 200 }} />
          &nbsp;&nbsp;
          <Button type="primary" onClick={handleSearch}>
            search
          </Button>
        </>
      );
    };
  
    const handleSearch = () => {
      tableInstance.run({
        search: {},
        params: { userUnid: searchValue }
      });
    };
  
    return (
      <div>
        <QueryTable
          columns={columns}
          renderForm={renderForm}
          renderLeftActions={renderLeftActions}
          renderSearchInput={renderSearchInput}
          {...tableProps}
        />
      </div>
    );
  };
  
  export default App;`
}