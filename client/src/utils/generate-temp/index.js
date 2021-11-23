import genSingleTable from './single-table'
import genMultiTabTable from './multi-tab-table'
import genTableHeadTip from './table-head-tip'
import genOverlengthTable from './overlength-table'
import genDetailDrawer from './detail-drawer'
import genDetailModal from './detail-modal'
import genTableSearchForm from './table-search-form'
import genValidateForm from './validate-form'
import genDynamicAddForm from './dynamic-add-form'
import genDynamicEditForm from './dynamic-edit-form'
import genReactECharts from './react-echarts'
import genReactECharts2 from './react-echarts2'

const configs = {
  list: {
    singleTable: {
      label: '简单的分页列表页面',
      fileName: 'SingleTable',
      gen: genSingleTable,
    },
    multiTabTable: {
      label: '多 Tab 的分页列表页面',
      fileName: 'MultiTabTable',
      gen: genMultiTabTable,
    },
    tableHeadTip: {
      label: '列表表头信息提示',
      fileName: 'TableHeadTip',
      gen: genTableHeadTip,
    },
    overlengthTable: {
      label: '超长表单',
      fileName: 'OverlengthTable',
      gen: genOverlengthTable,
    },
  },
  details: {
    detailDrawer: {
      label: '内容比较多的drawer',
      fileName: 'DetailDrawer',
      gen: genDetailDrawer,
    },
    detailModal: {
      label: '内容比较少的modal',
      fileName: 'DetailModal',
      gen: genDetailModal,
    },
  },
  operations: {
    reactECharts: {
      label: 'echart for react 图表',
      fileName: 'ReactECharts',
      gen: genReactECharts,
    },
    reactECharts2: {
      label: 'echart 图表外部绑定',
      fileName: 'ReactECharts2',
      gen: genReactECharts2,
    },
  },
  forms: {
    tableSearchForm: {
      label: '表格搜索表单',
      fileName: 'TableSearchForm',
      gen: genTableSearchForm,
    },
    validateForm: {
      label: '验证表单',
      fileName: 'ValidateForm',
      gen: genValidateForm,
    },
    dynamicEditForm: {
      label: '动态编辑表单',
      fileName: 'DynamicEditForm',
      gen: genDynamicEditForm,
    },
    dynamicAddForm: {
      label: '动态新增表单',
      fileName: 'DynamicAddForm',
      gen: genDynamicAddForm,
    },
  }
}

export default configs
