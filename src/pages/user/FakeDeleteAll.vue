<template>
  <div>
    <a-button @click="fakeDeleteAll">删除</a-button>
  </div>
</template>

<script>
    import {userFakeDeleteAll} from '../../api/user.js'
    import {basicNotification} from '../../common/index.js'

    export default {
    name: 'FakeDeleteAll',
    props: {
      TableSelectedRowKeys: {type: Array, required: true}
    },
    methods: {
      fakeDeleteAll() {
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
            userFakeDeleteAll(this.TableSelectedRowKeys).then((data) => {
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
