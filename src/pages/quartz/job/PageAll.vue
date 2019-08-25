<template>
  <BasicPage>
    <div slot="container">
      <div class="table-operations">
        <AddOne v-has-any-authority="['/COMPONENT/QUARTZ/JOB/ADD_ONE']" @onOk="reloadTable"/>
        <EditOne v-has-any-authority="['/COMPONENT/QUARTZ/JOB/EDIT_ONE']" :tableSelectedRows="jobTableSelectedRows" @onOk="reloadTable"/>
        <DeleteAll v-has-any-authority="['/COMPONENT/QUARTZ/JOB/DELETE_ALL']" :tableSelectedRows="jobTableSelectedRowKeys" @onOk="() => {this.reloadTable()}"/>
        <PauseAll v-has-any-authority="['/COMPONENT/QUARTZ/JOB/PAUSE_ALL']" :tableSelectedRows="jobTableSelectedRows" @onOk="() => {this.reloadTable()}"/>
        <ResumeAll v-has-any-authority="['/COMPONENT/QUARTZ/JOB/RESUME_ALL']" :tableSelectedRows="jobTableSelectedRows" @onOk="() => {this.reloadTable()}"/>
        <a-button v-has-any-authority="['/COMPONENT/QUARTZ/JOB/REFRESH']" @click="() => {this.reloadTable()}">刷新</a-button>
      </div>
      <div style="overflow: scroll;height: 450px">
        <a-table :rowKey="(record) => (record.jobClassName + record.jobGroup)" @change="jobTableOnChange" :columns="jobTableColumns" size="middle" :pagination="jobTablePagination" :dataSource="jobTableDataSource" :loading="jobTableLoading" :customRow="jobTableCustomRow" :rowSelection="{selectedRowKeys: jobTableSelectedRowKeys, onChange: jobTableOnSelectChange}" :scroll="{ x: 1200, y: 0}" bordered>
        </a-table>
      </div>
    </div>
  </BasicPage>
</template>

<script>
    import BasicPage from '../../../components/BasicPage.vue'
    import {jobPageAll} from '../../../api/quartz.js'

    import DeleteAll from './DeleteAll.vue'
    import {dictionaryListAllByKey, dictionaryFormatter} from "../../../api/dictionary.js"
    import AddOne from './AddOne.vue'
    import EditOne from './EditOne.vue'
    import PauseAll from './PauseAll.vue'
    import ResumeAll from './ResumeAll.vue'

    export default {
        name: 'PageAll',
        components: {BasicPage, DeleteAll, AddOne, EditOne, PauseAll, ResumeAll},
        data() {
            return {
                quartzTriggerState: [],
                jobTableDataSource: [],
                jobTableColumns: [
                    {
                        title: '任务类名',
                        dataIndex: 'jobClassName',
                        sorter: true,
                    }, {
                        title: '任务分组',
                        dataIndex: 'jobGroup',
                        sorter: true,
                    }, {
                        title: '任务状态',
                        dataIndex: 'triggerState',
                        sorter: true,
                        customRender: (text, row, index) => dictionaryFormatter(text, this.quartzTriggerState)
                    }, {
                        title: 'CRON 表达式',
                        dataIndex: 'cronExpression',
                        sorter: true,
                    }, {
                        title: '时区 ID',
                        dataIndex:'timeZoneId',
                        sorter: true,
                    }, {
                        title: '描述',
                        dataIndex:'description',
                        sorter: true,
                    }
                ],
                jobTableSelectedRowKeys: [],
                jobTableSelectedRows: [],
                jobTableLoading: false,
                jobTablePagination: this.$store.state.antd.table.pagination,
                visible: false,
            }
        },
        created() {
            dictionaryListAllByKey('QUARTZ_TRIGGER_STATE').then((data) => {
                this.quartzTriggerState = data;
            }).catch((error) => {
                console.log(error)
            });
        },
        mounted() {
            this.getJobTableDataSource()
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
            jobTableCustomRow(record, index) {
                return {
                    on: {
                        click: () => {
                            this.jobTableSelectedRowKeys = [];
                            this.jobTableSelectedRowKeys.push(record.jobClassName + record.jobGroup)
                            this.jobTableSelectedRows = [];
                            this.jobTableSelectedRows.push(record)
                        },
                    },
                };
            },
            jobTableOnSelectChange (selectedRowKeys, selectedRows) {
                this.jobTableSelectedRowKeys = selectedRowKeys
                this.jobTableSelectedRows = selectedRows
            },
            jobTableOnChange(pagination, filters, sorter) {
                this.jobTablePagination = pagination;
                this.getJobTableDataSource({
                    page: pagination.current,
                    rows: pagination.pageSize,
                    sortField: sorter.field,
                    sortOrder: sorter.order ? sorter.order.replace('end', '') : undefined,
                    ...this.queryParams,
                })
            },
            getJobTableDataSource(params = {}) {
                this.jobTableLoading = true;
                const pagination = {...this.jobTablePagination};
                let page = pagination.current || pagination.defaultCurrent;
                let rows = pagination.pageSize || pagination.defaultPageSize;
                jobPageAll({
                    page: page, rows: rows, ...params,
                }).then((data) => {
                    this.jobTableLoading = false;
                    this.jobTableDataSource = data.rows;
                    pagination.total = data.total;
                    this.jobTablePagination = pagination
                }).catch((error) => {
                    this.jobTableLoading = false
                })
            },
            reloadTable() {
                this.jobTableSelectedRowKeys = [];
                this.jobTableSelectedRows = [];
                this.jobTableDataSource = [];
                this.getJobTableDataSource()
            }
        },
    }
</script>

<style lang="less" scoped>
  @import "../../../assets/styles/common.less";
  @import "../../../assets/styles/page.less";
</style>
