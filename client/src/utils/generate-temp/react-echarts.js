export default function genReactECharts() {
  return `import React, { useRef } from 'react';
  import ReactEChartsCore from 'echarts-for-react/lib/core';
  import * as echarts from 'echarts';
  
  // Echarts配置文档 https://echarts.apache.org/zh/option.html#title
  
  const ReactECharts = () => {
    const echartRef = useRef({});
    const generateData = count => {
      let baseValue = Math.random() * 1000;
      let time = Number(new Date(2011, 0, 1));
      let smallBaseValue;
  
      function next(idx) {
        smallBaseValue = idx % 30 === 0 ? Math.random() * 700 : smallBaseValue + Math.random() * 500 - 250;
        baseValue += Math.random() * 20 - 10;
        return Math.max(0, Math.round(baseValue + smallBaseValue) + 3000);
      }
  
      let categoryData = [];
      let valueData = [];
  
      for (let i = 0; i < count; i++) {
        categoryData.push(echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', time));
        valueData.push(next(i).toFixed(2));
        time += 1000;
      }
  
      return {
        categoryData: categoryData,
        valueData: valueData
      };
    };
  
    let dataCount = 500;
    let data = generateData(dataCount);
  
    const options = {
      title: {
        text: echarts.format.addCommas(dataCount) + ' Data',
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
      // hover提示
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        bottom: 90
      },
      // 缩放工具
      dataZoom: [
        {
          type: 'slider' || 'inside', // inside 支持滚轮缩放
          start: 50,
          end: 100
        },
        {
          type: 'slider'
        }
      ],
      // x轴配置
      xAxis: {
        data: data.categoryData,
        silent: false,
        splitLine: {
          show: false
        },
        splitArea: {
          show: false
        }
      },
      // y轴配置
      yAxis: {
        splitArea: {
          show: false
        }
      },
      series: [
        {
          type: 'bar',
          data: data.valueData,
          // Set 'large' for large data amount
          large: true
        }
      ]
    };
  
    const EventsDict = {
      click: e => console.log(echartRef.current),
      datazoom: e => {
        let { dataZoom } = echartRef.current.getOption();
        // 数据下标
        let startValue = dataZoom[0].startValue;
        let endValue = dataZoom[0].endValue;
        // dataZoom位置百分比
        let start = dataZoom[0].start;
        let end = dataZoom[0].end;
        console.log(startValue, endValue, start, end);
      }
    };
  
    return (
      <ReactEChartsCore
        ref={e => {
          echartRef.current = e?.getEchartsInstance(); // 获取eachrts实例
        }}
        echarts={echarts}
        option={options}
        onEvents={EventsDict}
      />
    );
  };
  
  export default ReactECharts;`
}