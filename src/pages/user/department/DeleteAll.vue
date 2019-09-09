<template>
    <div>
        <a-button @click="deleteAll">删除</a-button>
    </div>
</template>

<script>
    import {departmentDeleteAll} from '../../../api/department.js'
    import {basicNotification} from "../../../common/index.js"

    export default {
        name: 'DeleteAll',
        props: {
            tableSelectedRowKeys: {type: Array, required: true}
        },
        methods: {
            deleteAll() {
                const tableSelectedRowKeys = this.tableSelectedRowKeys
                if (tableSelectedRowKeys.length <= 0) {
                    basicNotification.warning({message: '至少勾选一项'})
                    return
                }
                this.$confirm({
                    title: '确定操作',
                    content: '确定删除吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        departmentDeleteAll(this.tableSelectedRowKeys).then((data) => {
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
