<template>
  <BasicPage>
    <div slot="container">
      <div class="table-operations">
        <JobRuntimeLogClearAll v-has-any-authority="['/COMPONENT/QUARTZ/JOB_RUNTIME_LOG/CLEAR_ALL']" @onOk="() => {this.reloadTable()}"/>
        <a-button v-has-any-authority="['/COMPONENT/QUARTZ/JOB_RUNTIME_LOG/REFRESH']" @click="() => {this.reloadTable()}">刷新</a-button>
      </div>
      <div style="overflow: scroll;height: 450px">
        <a-table :rowKey="(record) => record.id" @change="jobRuntimeLogTableOnChange" :columns="jobRuntimeLogTableColumns" size="middle" :pagination="jobRuntimeLogTablePagination" :dataSource="jobRuntimeLogTableDataSource" :loading="jobRuntimeLogTableLoading" :customRow="jobRuntimeLogTableCustomRow" :rowSelection="{selectedRowKeys: jobRuntimeLogTableSelectedRowKeys, onChange: jobRuntimeLogTableOnSelectChange}" :scroll="{ x: 1000, y: 0}" bordered>
        </a-table>
      </div>
    </div>
  </BasicPage>
</template>

<script type="text/jsx">
    import BasicPage from '../../../components/BasicPage.vue'
    import {dictionaryListAllByKey} from '../../../api/dictionary.js'
    import {jobRuntimeLogPageAll} from '../../../api/quartz.js'
    import JobRuntimeLogClearAll from './ClearAll.vue'

    export default {
        name: 'PageAll',
        components: {BasicPage, JobRuntimeLogClearAll},
        data() {
            return {
                operationType: [],
                jobRuntimeLogTableDataSource: [],
                jobRuntimeLogTableColumns: [
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        sorter: true,
                        fixed: 'left',
                        width: 50
                    }, {
                        title: '任务类名',
                        dataIndex: 'jobClassName',
                        sorter: true,
                    }, {
                        title: '任务分组',
                        dataIndex: 'jobGroup',
                        sorter: true,
                    }, {
                        title: '日志',
                        dataIndex: 'log',
                        sorter: true,
                    }, {
                        title: '任务运行耗时（毫秒）',
                        dataIndex: 'jobRunTime',
                        sorter: true,
                    }, {
                        title: '创建时间',
                        dataIndex:'gmtCreated',
                        sorter: true,
                    }
                ],
                jobRuntimeLogTableSelectedRowKeys: [],
                jobRuntimeLogTableLoading: false,
                jobRuntimeLogTablePagination: {
                    defaultCurrent: 1,
                    defaultPageSize: 10,
                    pageSizeOptions: ['10', '20', '30', '40'],
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: (total, range) => `当前显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
                },
                visible: false,
            }
        },
        created() {
            dictionaryListAllByKey('OPERATION_TYPE').then((data) => {
                this.operationType = data;
            }).catch((error) => {
                console.log(error)
            })
        },
        mounted() {
            this.getJobRuntimeLogTableDataSource()
        },
        methods: {
            onCancel() {
                this.visible = false;
                this.$emit('onCancel', this.visible)
            },
            onOk() {
                this.visible = false;
                this.$emit('onOk')
            },
            jobRuntimeLogTableCustomRow(record, index) {
                return {
                    on: {
                        click: () => {
                            this.jobRuntimeLogTableSelectedRowKeys = [];
                            this.jobRuntimeLogTableSelectedRowKeys.push(record.id)
                        },
                    },
                };
            },
            jobRuntimeLogTableOnSelectChange (selectedRowKeys) {
                this.jobRuntimeLogTableSelectedRowKeys = selectedRowKeys
            },
            jobRuntimeLogTableOnChange(pagination, filters, sorter) {
                this.jobRuntimeLogTablePagination = pagination;
                this.getJobRuntimeLogTableDataSource({
                    page: pagination.current,
                    rows: pagination.pageSize,
                    sortField: sorter.field,
                    sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
                    ...this.queryParams,
                })
            },
            getJobRuntimeLogTableDataSource(params = {}) {
                this.jobRuntimeLogTableLoading = true;
                const pagination = {...this.jobRuntimeLogTablePagination};
                let page = pagination.current || pagination.defaultCurrent;
                let rows = pagination.pageSize || pagination.defaultPageSize;
                jobRuntimeLogPageAll({
                    page: page, rows: rows, ...params,
                }).then((data) => {
                    this.jobRuntimeLogTableLoading = false;
                    this.jobRuntimeLogTableDataSource = data.rows;
                    pagination.total = data.total;
                    this.jobRuntimeLogTablePagination = pagination
                }).catch((error) => {
                    console.log(error);
                    this.jobRuntimeLogTableLoading = false
                })
            },
            reloadTable() {
                this.jobRuntimeLogTableSelectedRowKeys = [];
                this.jobRuntimeLogTableDataSource = [];
                this.getJobRuntimeLogTableDataSource()
            }
        },
    }
</script>

<style lang="less" scoped>
  @import "../../../../static/less/common.less";
</style>
