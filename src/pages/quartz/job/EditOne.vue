<template>
  <div>
    <a-button @click="editOne">编辑</a-button>
    <a-modal title="编辑任务" v-model="visible" :maskClosable="false" wrapClassName="form-modal" :destroyOnClose="true">
      <a-form :form="form" :hideRequiredMark="false">
        <a-row>
          <a-col>
            <a-form-item>
              <a-input v-decorator="['jobClassName']" type="hidden"/>
            </a-form-item>
            <a-form-item>
              <a-input v-decorator="['jobGroup']" type="hidden"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item :labelCol="{span: 6}" :wrapperCol="{span: 18, offset: 0}">
              <a-textarea v-decorator="['cronExpression',{rules: [{required: false}],}]" :autosize="{ minRows: 2, maxRows: 10 }"/>
              <span slot="label">
              <a href="http://cron.qqe2.com/" target="_blank">CRON 表达式</a>
            </span>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="描述" :labelCol="{span: 6}" :wrapperCol="{span: 18, offset: 0}">
              <a-textarea v-decorator="['description',{rules: [{required: false}],}]" :autosize="{ minRows: 2, maxRows: 10 }"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button key="cancel" @click="onCancel">取消</a-button>
        <a-button key="ok" type="primary" @click="onOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
    import {basicNotification} from '../../../common/index.js'
    import {jobGetOneByJobClassNameAndJobGroup, jobSaveOne} from '../../../api/quartz.js'

    export default {
    name: 'EditOne',
    props: {
      tableSelectedRows: {type: Array, required: true}
    },
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this),
      }
    },
    methods: {
      editOne() {
        const tableSelectedRows = this.tableSelectedRows;
        if(tableSelectedRows && tableSelectedRows.length !== 1) {
          basicNotification.warning({message: '必须勾选一项'});
          return
        }
        this.jobGetOneByJobClassNameAndJobGroup(tableSelectedRows[0]);
        this.visible = true
      },
      onCancel() {
        this.visible = false;
        this.$emit('onCancel', this.visible)
      },
      onOk() {
        this.form.validateFieldsAndScroll((error, values) => {
          if (!error) {
              jobSaveOne(values).then((data) => {
              basicNotification.success({message: '操作成功'});
              this.visible = false;
              this.$emit('onOk', data)
            }).catch((error) => {
              console.log(error)
            })
          }
        });
      },
        jobGetOneByJobClassNameAndJobGroup(record) {
        jobGetOneByJobClassNameAndJobGroup(record.jobClassName, record.jobGroup).then((data) => {
          this.form.setFieldsValue(data)
        }).catch((error) => {
          console.log(error)
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  @import "../../../../static/less/common.less";
</style>
