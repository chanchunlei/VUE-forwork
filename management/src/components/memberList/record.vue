<template>
  <div>
    <el-table
      :data="tableData6"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="会员卡号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="transaction"
        label="交易单号">
      </el-table-column>
      <el-table-column
        prop="money"
        label="交易金额">
      </el-table-column>
      <el-table-column
        prop="kinds"
        label="交易品类">
      </el-table-column>
      <el-table-column
        prop="shops"
        label="交易门店">
      </el-table-column>
      <el-table-column
        prop="times"
        label="交易时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData6: [{
          id: '12987122',
          transaction: '321895213',
          money: 198,
          kinds: '3C数码',
          shops: '上海百脑汇',
          times: '2018-05-22'
        }, {
          id: '12987122',
          transaction: '123489651645',
          money: 165,
          kinds: '电竞外设',
          shops: '乐之上海',
          times: '2018-05-26'
        }]
      };
    },
    methods: {
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        //console.log(row);
        //console.log(column);
        //console.log(rowIndex);
        console.log(columnIndex);
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    }
  };
</script>
