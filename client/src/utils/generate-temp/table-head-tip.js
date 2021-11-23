export default function genTableHeadTip() {
  return `/* eslint-disable react-hooks/exhaustive-deps */
  import React, { useState, useEffect } from 'react';
  import { Input, Icon, Tooltip } from 'antd';
  import Card from '@linewell-components/card';
  import QueryTable, { useQueryTable } from '@linewell-components/query-table/lib/hooks';
  const { Search } = Input;
  
  const TableHeadTip = () => {
    // .tip {
    //   div::before {
    //     background-color: #a4c1e2; //提示框箭头样式
    //   }
    //  提示框背景样式
    //   div[role='tooltip'] {
    //     background-color: #fff;
    //     color: rgba(0, 0, 0, 0.85);
    //   }
    // }
  
    const boxStyle = {
      height: 58,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column'
    };
    const iconStyle = { transform: 'scale(0.7)', position: 'absolute', color: '#1890FF', top: -2, right: -2 };
  
    const { tableInstance, ...tableProps } = useQueryTable();
  
    const columns = [
      {
        title: '事项名称',
        dataIndex: 'dim01',
        ellipsis: true
      },
      {
        title: (
          <div title="事项材料总数">
            <div>事项材料</div>
            <div>总数</div>
          </div>
        ),
        dataIndex: 'metrics01',
        ellipsis: true,
        align: 'right'
      },
      {
        title: (
          <div style={boxStyle} title="配置共享材料数">
            <Tooltip overlayClassName={styles.tip} trigger="click" title="事项的材料中，配置了共享的材料数量">
              <Icon type="question-circle" style={iconStyle} />
            </Tooltip>
            <div>配置共享</div>
            <div>材料数</div>
          </div>
        ),
        dataIndex: 'metrics02',
        ellipsis: true,
        align: 'right'
      },
      {
        title: (
          <div style={boxStyle} title="共享材料比">
            <Tooltip
              overlayClassName={styles.tip}
              trigger="click"
              title="共享材料占比=配置共享材料数 /事项材料总数 X100%"
            >
              <Icon type="question-circle" style={iconStyle} />
            </Tooltip>
            <div>共享材料比</div>
          </div>
        ),
        dataIndex: 'metrics11',
        ellipsis: true,
        align: 'right',
        render: val => {
          return <>{val}%</>;
        }
      }
    ];
  
    return (
      <QueryTable
        style={{ backgroundColor: '#fff', padding: '0 0 0 16px' }}
        showRowSelectedTotal
        columns={columns}
        paginationType="simple"
        {...tableProps}
      />
    );
  };
  
  export default TableHeadTip;`
}