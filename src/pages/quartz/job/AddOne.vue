<template>
  <div>
    <a-button @click="addOne">新增</a-button>
    <a-modal title="新增任务" v-model="visible" :maskClosable="false" wrapClassName="form-modal" :destroyOnClose="true">
      <a-form :form="form" :hideRequiredMark="false">
        <a-row>
          <a-col :md="12" :sm="24">
            <a-form-item label="任务类名" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
              <a-input v-decorator="['jobClassName',{rules: [{required: true, message: '必填',}],}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="任务组名" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
              <a-input v-decorator="['jobGroup',{rules: [{required: true, message: '必填',}],}]"/>
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
    import {jobAddOne} from '../../../api/quartz.js'
    import {basicNotification} from '../../../common/index.js'

    export default {
        name: 'AddOne',
        data() {
            return {
                visible: false,
                form: this.$form.createForm(this),
            }
        },
        methods: {
            addOne() {
                this.visible = true
            },
            onCancel() {
                this.visible = false;
                this.$emit('onCancel', this.visible)
            },
            onOk() {
                this.form.validateFieldsAndScroll((error, values) => {
                    if (!error) {
                        jobAddOne(values).then((data) => {
                            basicNotification.success({message: '操作成功'})
                            this.onCancel();
                            this.$emit('onOk', data)
                        }).catch((error) => {
                            console.log(error)
                        })
                    }
                });
            },
        },
    }
</script>

<style lang="less" scoped>
  @import "../../../../static/less/common.less";
</style>
