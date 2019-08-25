
const antd = {
    namespaced: true,
    state: {
        table: {
            pagination:  {
                defaultCurrent: 1,
                defaultPageSize: 10,
                pageSizeOptions: ['10', '20', '30', '40'],
                showQuickJumper: true,
                showSizeChanger: true,
                showTotal: (total, range) => `当前显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
            },
        }
    },
};

export default antd;
