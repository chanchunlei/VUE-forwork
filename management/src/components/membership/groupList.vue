<template>
  <div class="big_box">
    <el-table class="box"
              :data="tableData"
              border
              style="width: 100%">
      <el-table-column
        fixed
        prop="title"
        label="群名称"
        width="130">
      </el-table-column>
      <el-table-column
        prop="nums"
        label="会员人数"
        width="110">
      </el-table-column>
      <el-table-column
        prop="transaction"
        label="交易是否"
        width="110">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        width="280">
        <template slot-scope="scope">
          <el-tag class="tag_cell" v-for="item in scope.row.tag" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="times"
        label="创建时间"
        width="110">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="250"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleRecord(scope.$index, scope.row)">群成员</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleDetails(scope.$index, scope.row)">群详情</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleCoupon(scope.$index, scope.row)">送券</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    data() {
      return {
        tableData: [{
          title: '会员1群',
          nums: 600,
          transaction: '是',
          tag: ['文艺范'],
          times: '2018-05-01'
        }, {
          title: '会员2群',
          nums: 848,
          transaction: '是',
          tag: ['壕无人性'],
          times: '2018-05-01'
        }, {
          title: '会员3群',
          nums: 4566,
          transaction: '是',
          tag: ['小清新'],
          times: '2018-05-01'
        }, {
          title: '会员4群',
          nums: 6457,
          transaction: '否',
          tag: ['未知'],
          times: '2018-05-01'
        },
          {
            title: '会员5群',
            nums: 852,
            transaction: '是',
            tag: ['佛系'],
            times: '2018-05-01'
          }]
      }
    },
    methods: {
      handleRecord(index, row) {
        console.log(index, row);
        this.$router.push('groupmember');
      },
      handleDetails(index, row) {
        console.log(index, row);
        this.$router.push('details');
      },
      handleCoupon(index, row){
        console.log(index, row);
      }
    }
  }
</script>

<style scoped>
  .big_box{
    background-color: #fff;
  }
  .tag_cell{
    margin: 5px;
  }
</style>
