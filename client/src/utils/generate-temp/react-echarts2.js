export default function genReactECharts2() {
  return `import React, { useRef, useState } from 'react';
  import ReactEChartsCore from 'echarts-for-react/lib/core';
  import { Checkbox } from 'antd';
  import * as echarts from 'echarts';
  
  const ReactECharts = () => {
    const echartRef = useRef({});
    const legend = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'];
    const [checked, setChecked] = useState(legend.slice(0, 1));
  
    let selected = {};
  
    for (let i of legend) {
      if (checked.includes(i)) selected[i] = true;
      else selected[i] = false;
    }
  
    const options = {
      title: {
        text: '外部绑定',
        left: 10
      },
      // 右上角工具箱
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: false
          },
          saveAsImage: {
            pixelRatio: 2
          }
        }
      },
      // 图例
      legend: {
        data: legend,
        selected // 图例选中设置
      },
      // hover提示
      tooltip: {
        trigger: 'axis'
        // axisPointer: {
        //   type: 'shadow'
        // }
      },
      grid: {
        bottom: 90
      },
      // 缩放工具
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100
        },
        {
          type: 'slider'
        }
      ],
      // x轴配置
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      // y轴配置
      yAxis: {
        splitArea: {
          show: false
        }
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '联盟广告',
          type: 'line',
          stack: '总量',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '视频广告',
          type: 'line',
          stack: '总量',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '直接访问',
          type: 'line',
          stack: '总量',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '搜索引擎',
          type: 'line',
          stack: '总量',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
  
    const onChange = e => {
      setChecked(e);
    };
  
    const EventsDict = {
      legendselectchanged: params => {
        let value = Object.keys(params.selected)
          .map(item => {
            if (params.selected[item]) return item;
            return params.selected[item];
          })
          .filter(item => item);
  
        setTimeout(() => setChecked(value), 16.6);
        selected = params.selected;
      }
    };
  
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <Checkbox.Group options={legend} value={checked} onChange={onChange} />
        </div>
        <br />
        <br />
        <ReactEChartsCore
          ref={e => {
            echartRef.current = e?.getEchartsInstance(); // 获取eachrts实例
          }}
          echarts={echarts}
          option={options}
          onEvents={EventsDict}
        />
      </>
    );
  };
  
  export default ReactECharts;`
}