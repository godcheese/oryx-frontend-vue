<template>
  <a-form :form="searchForm" :hideRequiredMark="true">
    <a-row :gutter="24">
      <!--        <a-col :span="8" :style="{ display:'block'}">-->
      <a-col :span="8">
        <a-form-item label="用户名">
          <a-input v-decorator="['username',]"/>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="电子邮箱">
          <a-input v-decorator="['email',]"/>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="电子邮箱是否验证">
          <a-select v-decorator="['emailIsVerified']" allowClear>
            <a-select-option v-for="item in isOrNot" :key="item.value">{{item.valueName}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="所在部门">
          <a-tree-select
            :dropdownStyle="{ maxHeight: '200px', overflow: 'auto' }"
            :treeData="department"
            treeDefaultExpandAll
            allowClear
            v-decorator="['departmentId']"/>
        </a-form-item>

      </a-col>
      <a-col :span="8">
        <a-form-item label="是否启用">
          <a-select v-decorator="['enabled']" allowClear>
            <a-select-option v-for="item in isOrNot" :key="item.value">{{item.valueName}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :span="10">
        <a-form-item label="删除时间" :wrapperCol="{xs: { span: 24 },sm: { span: 16 },}">
          <a-range-picker v-decorator="['gmtDeleted',]" showTime format="YYYY-MM-DD HH:mm:ss"/>
        </a-form-item>
      </a-col>
      <a-col :span="10">
        <a-form-item label="创建时间" :wrapperCol="{xs: { span: 24 },sm: { span: 16 },}">
          <a-range-picker v-decorator="['gmtCreated',]" showTime format="YYYY-MM-DD HH:mm:ss"/>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="24" class="search-form-operations">
        <a-button type="primary" @click="searchFormOnSubmit">查询</a-button>
        <a-button style="margin-left: 8px" @click="searchFormOnReset">重置</a-button>
        <!--          <a style="margin-left:8px;font-size:12px">展开<a-icon :type="expand ? 'up' : 'down'"/></a>-->
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
  import { dictionaryListAllByKey } from '../../../api/dictionary.js'
  import { departmentListAllAsAntdTreeNode } from '../../../api/department.js'

  export default {
    name: 'SearchForm',
    data() {
      return {
        searchForm: this.$form.createForm(this),
        queryParams: {},
        isOrNot: [],
        department: [],
      }
    },
    created() {
      this.departmentListAllAsAntdTreeNode();
      dictionaryListAllByKey('IS_OR_NOT').then((data) => {
        this.isOrNot = data;
      }).catch((error) => {
        console.log(error)
      })
    },
    methods: {
      searchFormOnSubmit() {
        this.$emit('onSubmit', this.searchForm);
      },
      searchFormOnReset() {
        this.$emit('onReset', this.searchForm)
      },
      departmentListAllAsAntdTreeNode() {
        departmentListAllAsAntdTreeNode().then((data) => {
          this.department = data
        }).catch((error) => {
          console.log(error)
        })
      },
    },
  }
</script>

<style>
  @import "../../../../static/less/common.less";
</style>
