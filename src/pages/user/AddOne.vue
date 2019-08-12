<template>
  <div>
    <a-button @click="addOne">新增</a-button>
    <a-modal title="新增用户" v-model="visible" :maskClosable="false" wrapClassName="form-modal" :destroyOnClose="true">
      <a-form :form="form" :hideRequiredMark="false">
        <a-row>
          <a-col :md="24" :sm="24">
            <a-form-item>
              <a-avatar :size="64" :src="avatarSrc || '../../static/img/avatar.png'" style="vertical-align: middle"/>
              <a-input v-decorator="['avatar']" type="hidden"/>
              <ChangeAvatar @onOk="changeAvatarOnOk"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="用户名" :labelCol="{span: 7}" :wrapperCol="{span: 17, offset: 0}">
              <a-input v-decorator="['username',{rules: [{required: true, message: '必填',}],}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="密码" :labelCol="{span: 7}" :wrapperCol="{span: 17, offset: 0}">
              <a-input v-decorator="['password',{rules: [{required: true,message: '必填',}],}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="电子邮箱" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
              <a-input v-decorator="['email',{rules: [{required: true,message: '必填',}],}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="电子邮箱是否验证" :labelCol="{span: 15}" :wrapperCol="{span: 9, offset: 0}">
              <a-select v-decorator="['emailIsVerified',{rules: [{required: true,message: '必填',}],}]" :defaultActiveFirstOption="true">
                <a-select-option v-for="item in isOrNot" :key="item.value">{{item.valueName}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="所在部门" :labelCol="{span: 8}" :wrapperCol="{span: 16, offset: 0}">
              <a-tree-select
                :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
                :treeData="department"
                treeDefaultExpandAll
                allowClear
                v-decorator="['departmentId',{rules: [{required: true,message: '必填',}],}]"/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item label="是否启用" :labelCol="{span: 9}" :wrapperCol="{span: 15, offset: 0}">
              <a-select v-decorator="['enabled',{rules: [{required: true,message: '必填',}],}]" :defaultActiveFirstOption="true">
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
        <a-button key="ok" type="primary" @click="onOk">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
    import {dictionaryListAllByKey} from '../../api/dictionary.js'
    import {departmentListAllAsAntdTreeNode} from '../../api/department.js'
    import {userAddOne, userAvatar} from '../../api/user.js'
    import {basicNotification} from '../../common/index.js'
    import ChangeAvatar from './ChangeAvatar.vue'

    export default {
    name: 'AddOne',
    components: {ChangeAvatar},
    data() {
      return {
        visible: false,
        form: undefined,
        isOrNot: [],
        department: [],
        avatarSrc: '',
      }
    },
    created() {
      this.form = this.$form.createForm(this, {
        onValuesChange: (props, fields) => {
          this.avatarSrc = userAvatar(fields.avatar)
        }
      })
    },
    methods: {
      changeAvatarOnOk(data) {
        this.form.setFieldsValue({'avatar': data.guid})
      },
      addOne() {
        departmentListAllAsAntdTreeNode().then((data) => {
          this.department = data
        }).catch((error) => {
          console.log(error)
        })
        dictionaryListAllByKey('IS_OR_NOT').then((data) => {
          this.isOrNot = data;
        }).catch((error) => {
          console.log(error)
        })
        this.avatarSrc = undefined
        this.visible = true
      },
      onCancel() {
        this.visible = false
        this.$emit('onCancel', this.visible)
      },
      onOk() {
        this.form.validateFieldsAndScroll((error, values) => {
          if (!error) {
            userAddOne(values).then((data) => {
              basicNotification.success({message: '操作成功'})
              this.onCancel()
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
  @import "../../../static/less/common.less";
</style>
