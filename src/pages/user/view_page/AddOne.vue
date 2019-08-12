<template>
  <div>
    <a-button @click="addOne">新增</a-button>
    <a-modal title="新增视图页面" v-model="visible" :maskClosable="false" wrapClassName="form-modal" :destroyOnClose="true">
      <a-form :form="form" :hideRequiredMark="false">
        <a-row>
          <a-col :md="12" :sm="24">
            <a-form-item label="页面名称" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
              <a-input v-decorator="['name',{rules: [{required: true, message: '必填',}],}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="排序" :labelCol="{span: 7}" :wrapperCol="{span: 17, offset: 0}">
              <a-input-number style="width:100%" v-decorator="['sort',{rules: [{required: false, message: '必填',}],initialValue: 0}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="视图页面分类" :labelCol="{span: 11}" :wrapperCol="{span: 13, offset: 0}">
              <a-tree-select
                :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
                :treeData="viewPageCategory"
                treeDefaultExpandAll
                v-decorator="['viewPageCategoryId',{rules: [{required: true,message: '必填',}],}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="请求地址（url）" :labelCol="{span: 6}" :wrapperCol="{span: 18, offset: 0}">
              <a-textarea v-decorator="['url',{rules: [{required: true, message: '必填',}],}]" :autosize="{ minRows: 2, maxRows: 10 }"/>
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
            <a-form-item label="权限（authority）" :labelCol="{span: 6}" :wrapperCol="{span: 18, offset: 0}">
              <a-textarea v-decorator="['authority',{rules: [{required: true, message: '必填',}],}]" :autosize="{ minRows: 2, maxRows: 10 }"/>
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
        <a-button key="ok" type="primary" @click="onOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
    import {viewPageCategoryListAllAsAntdTreeNode} from '../../../api/viewPageCategory.js'
    import {basicNotification} from '../../../common/index.js'
    import {viewPageAddOne, viewPageGetOneByViewPageId} from "../../../api/viewPage.js"

    export default {
    name: 'AddOne',
    props: {
      TableSelectedRowKeys: {type: Array, required: true}
    },
    data() {
      return {
        visible: false,
        form: this.$form.createForm(this),
        viewPageCategory: [],
      }
    },
    methods: {
      addOne() {
        viewPageCategoryListAllAsAntdTreeNode().then((data) => {
          this.viewPageCategory = data
        }).catch((error) => {
          console.log(error)
        })
        const TableSelectedRowKeys = this.TableSelectedRowKeys
        if(TableSelectedRowKeys && TableSelectedRowKeys.length > 0) {
          this.viewPageGetOneByViewPageId(TableSelectedRowKeys[0]);
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
            viewPageAddOne(values).then((data) => {
              basicNotification.success({message: '操作成功'})
              this.onCancel()
              this.$emit('onOk', data)
            }).catch((error) => {
              console.log(error)
            })
          }
        });
      },
      viewPageGetOneByViewPageId(id) {
        viewPageGetOneByViewPageId(id).then((data) => {
          data.viewPageCategoryId = data.viewPageCategoryId !== undefined && data.viewPageCategoryId !== null ? data.viewPageCategoryId + '' : ''
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
