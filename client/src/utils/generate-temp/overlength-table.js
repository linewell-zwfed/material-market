export default function genOverlengthTable() {
  return `/* eslint-disable react-hooks/exhaustive-deps */
  import React from 'react';
  import QueryTable, { useQueryTable } from '@linewell-components/query-table/lib/hooks';
  
  const OverlengthTable = () => {
    const { tableInstance, ...tableProps } = useQueryTable();
  
    const columns = [
      {
        title: '区域名称',
        width: 80,
        dataIndex: 'areaName',
        align: 'center'
      },
      {
        title: '总事项数',
        width: 100,
        dataIndex: 'serviceTotalNum',
        align: 'center'
      },
      {
        title: '事项材料提交方式分析',
        align: 'center',
        children: [
          {
            title: '支持邮递收取事项',
            dataIndex: 'submitMaterialByPost',
            align: 'center'
          },
          {
            title: '只能窗口收取事项',
            dataIndex: 'submitMaterialByWindow',
            align: 'center'
          },
          {
            title: '电子证照提交事项',
            dataIndex: 'submitMaterialByLicense',
            align: 'center'
          }
        ]
      },
      {
        title: '审批结果领取',
        align: 'center',
        children: [
          {
            title: '只能窗口领取事项',
            dataIndex: 'approvalResultsByWindow',
            align: 'center'
          },
          {
            title: '支持邮递送达事项',
            dataIndex: 'approvalResultsByPost',
            align: 'center'
          },
          {
            title: '支持邮递送达和窗口领取的事项',
            dataIndex: 'approvalResultsByPostWindow',
            align: 'center'
          },
          {
            title: '支持在线打印事项',
            dataIndex: 'approvalResultsPrint',
            align: 'center'
          },
          {
            title: '电子证照共享事项',
            dataIndex: 'approvalResultsByLicense',
            align: 'center'
          }
        ]
      },
      {
        title: '涉及中介服务事项',
        dataIndex: 'intermediaryMatters',
        align: 'center'
      },
      {
        title: '涉及特殊环节事项',
        dataIndex: 'specialLinkMatters',
        align: 'center'
      },
      {
        title: '开通预约服务事项',
        dataIndex: 'bookMatters',
        align: 'center'
      },
      {
        title: '必须现场办理事项',
        dataIndex: 'sceneHandleMatters',
        align: 'center'
      },
      {
        title: '支持网上支付事项',
        dataIndex: 'onlinePayMatters',
        align: 'center'
      }
    ];
  
    return (
      <QueryTable
        style={{ backgroundColor: '#fff', padding: '0 0 0 16px' }}
        showRowSelectedTotal
        columns={columns}
        paginationType="simple"
        scroll={{ x: 'calc(2000px + 50%)' }}
        {...tableProps}
      />
    );
  };
  
  export default OverlengthTable;`
}