<template>
  <div>
    <a-button @click="copyAndSendOne">新增发送邮件</a-button>
    <a-modal title="新增发送邮件" v-model="visible" :maskClosable="false" wrapClassName="form-modal" :destroyOnClose="true">
      <a-form :form="form" :hideRequiredMark="false">
        <a-row>
          <a-col :md="12" :sm="24">
            <a-form-item label="发件人" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
              <a-input v-decorator="['from',{rules: [{required: true, message: '必填',}],}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="收件人" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
              <a-input v-decorator="['to',{rules: [{required: true, message: '必填',}],}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="主题" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
              <a-input v-decorator="['subject',{rules: [{required: true, message: '必填',}],}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="内容" :labelCol="{span: 4}" :wrapperCol="{span: 20, offset: 0}">
              <a-textarea v-decorator="['text',{rules: [{required: false}],}]" :autosize="{ minRows: 2, maxRows: 10 }"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="是否为 HTML" :labelCol="{span: 15}" :wrapperCol="{span: 9, offset: 0}">
              <a-select v-decorator="['html',{rules: [{required: true, message: '必填',}]}]" :defaultActiveFirstOption="true">
                <a-select-option v-for="item in isOrNot" :key="item.value">{{item.valueName}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="备注" :labelCol="{span: 4}" :wrapperCol="{span: 20, offset: 0}">
              <a-textarea v-decorator="['remark',{rules: [{required: false}],}]" :autosize="{ minRows: 2, maxRows: 10 }"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template slot="footer">
        <a-button key="cancel" @click="onCancel">取消</a-button>
        <a-button key="ok" type="primary" @click="onOk">发送</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
    import {dictionaryListAllByKey} from '../../api/dictionary.js'
    import {basicNotification} from '../../common/index.js'
    import {mailGetOneByMailId} from '../../api/mail.js'
    import {mailAddOne} from "../../api/mail"

    export default {
    name: 'SendOne',
    props: {
      tableSelectedRowKeys: {type: Array, required: true}
    },
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this),
        isOrNot: []
      }
    },
    methods: {
       copyAndSendOne() {
         dictionaryListAllByKey('IS_OR_NOT').then((data) => {
           this.isOrNot = data;
         }).catch((error) => {
           console.log(error)
         })
         const tableSelectedRowKeys = this.tableSelectedRowKeys
         if(tableSelectedRowKeys && tableSelectedRowKeys.length > 0) {
           this.mailGetOneByMailId(tableSelectedRowKeys[0])
         }
        this.visible = true
      },
      onCancel() {
        this.visible = false
        this.$emit('onCancel', this.visible)
      },
      onOk() {
        this.form.validateFieldsAndScroll((error, values) => {
          if (!error) {
            mailAddOne(values).then((data) => {
              basicNotification.success({message: '操作成功'})
              this.visible = false
              this.$emit('onOk', data)
            }).catch((error) => {
              console.log(error)
            })
          }
        });
      },
      mailGetOneByMailId(id) {
        mailGetOneByMailId(id).then((data) => {
          data.html = data.html !== undefined && data.html !== null ? data.html + '' : ''
          this.form.setFieldsValue(data)
        }).catch((error) => {
          console.log(error)
        })
      },
    },
  }
</script>

<style lang="less" scoped>
  @import "../../assets/styles/common.less";
</style>
