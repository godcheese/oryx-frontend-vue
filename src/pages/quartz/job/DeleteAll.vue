<template>
  <div>
    <a-button @click="deleteAll">删除</a-button>
  </div>
</template>

<script>
    import {jobDeleteAll} from '../../../api/quartz.js'
    import {basicNotification} from '../../../common/index.js'

    export default {
    name: 'DeleteAll',
    props: {
      tableSelectedRows: {type: Array, required: true}
    },
    methods: {
      deleteAll() {
        const tableSelectedRows = this.tableSelectedRows;
        if(tableSelectedRows.length <= 0) {
          basicNotification.warning({message: '至少勾选一项'});
          return
        }
        this.$confirm({
          title: '确定操作',
          content: '确定删除吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            jobDeleteAll(this.tableSelectedRows).then((data) => {
              basicNotification.success({message: '操作成功'});
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
