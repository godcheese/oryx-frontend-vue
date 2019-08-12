<template>
  <div>
    <a-button @click="resumeAll">恢复</a-button>
  </div>
</template>

<script>
    import {jobResumeAll} from '../../../api/quartz.js'
    import {basicNotification} from '../../../common/index.js'

    export default {
    name: 'ResumeAll',
    props: {
      tableSelectedRows: {type: Array, required: true}
    },
    methods: {
        resumeAll() {
        const tableSelectedRows = this.tableSelectedRows;
        if(tableSelectedRows.length <= 0) {
          basicNotification.warning({message: '至少勾选一项'});
          return
        }
        this.$confirm({
          title: '确定操作',
          content: '确定恢复吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
              let tableSelectedRows = this.tableSelectedRows;
              let jobClassNameList = [];
              let jobGroupList = [];
              for(let i in tableSelectedRows) {
                  if (tableSelectedRows.hasOwnProperty(i)) {
                      jobClassNameList.push(tableSelectedRows[i].jobClassName);
                      jobGroupList.push(tableSelectedRows[i].jobGroup);
                  }
              }
              console.log(jobClassNameList);
              console.log(jobGroupList);
            jobResumeAll(jobClassNameList, jobGroupList).then((data) => {
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
