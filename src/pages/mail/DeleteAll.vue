<template>
  <div>
    <a-button @click="deleteAll">删除</a-button>
  </div>
</template>

<script>
    import {basicNotification} from '../../common/index.js'
    import {mailDeleteAll} from "../../api/mail.js"

    export default {
    name: 'DeleteAll',
    props: {
      TableSelectedRowKeys: {type: Array, required: true}
    },
    methods: {
      deleteAll() {
        const TableSelectedRowKeys = this.TableSelectedRowKeys
        if(TableSelectedRowKeys.length <= 0) {
          basicNotification.warning({message: '至少勾选一项'})
          return
        }
        this.$confirm({
          title: '确定操作',
          content: '确定删除吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            mailDeleteAll(this.TableSelectedRowKeys).then((data) => {
              basicNotification.success({message: '操作成功'})
              this.$emit('onOk', data)
            }).catch((error) => {
              console.log(error)
            })
          },
          onCancel: () => {
            this.$emit('onCancel')
          }
        });
      },
    }
  }
</script>
