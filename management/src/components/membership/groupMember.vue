<template>
  <div class="big_box">
    <div class="handle-box">
      <el-select v-model="select_cate" placeholder="筛选门店" class="handle-select mr10">
        <el-option key="1" label="百脑汇" value="百脑汇"></el-option>
        <el-option key="2" label="乐之" value="乐之"></el-option>
      </el-select>
      <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
      <el-button type="primary" icon="search">搜索</el-button>
    </div>
    <el-table class="box"
              :data="tableData"
              border
              style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="会员卡号"
        width="130">
      </el-table-column>
      <el-table-column
        prop="level"
        label="会员级别"
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
        prop="money"
        label="交易累计金额"
        width="130">
      </el-table-column>
      <el-table-column
        prop="num"
        label="交易笔数"
        width="110">
      </el-table-column>
      <el-table-column
        prop="mean"
        label="平均交易金额"
        width="110">
      </el-table-column>
      <el-table-column
        prop="time"
        label="最近交易时间"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="250"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleRecord(scope.$index, scope.row)">记录</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleDetails(scope.$index, scope.row)">详情</el-button>
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
        select_cate: '',
        select_word: '',
        tableData: [{
          id: '1801',
          level: '高级会员',
          transaction: '是',
          tag: ['文艺范','女性','20~30岁','回头客'],
          money: 5000,
          num: 1,
          mean: 5000,
          time: '2018-05-12'
        }, {
          id: '1802',
          level: '高级会员',
          transaction: '是',
          tag: ['壕无人性'],
          money: 8000,
          num: 2,
          mean: 4000,
          time: '2018-05-12'
        }, {
          id: '1803',
          level: '普通会员',
          transaction: '是',
          tag: ['小清新'],
          money: 38,
          num: 1,
          mean: 38,
          time: '2018-05-12'
        }, {
          id: '1804',
          level: '普通会员',
          transaction: '否',
          tag: ['未知'],
          money: 0,
          num: 0,
          mean: 0,
          time: 'null'
        },
          {
            id: '1805',
            level: '超级会员',
            transaction: '是',
            tag: ['佛系'],
            money: 888,
            num: 5,
            mean: 177.6,
            time: '2018-05-16'
          }]
      }
    },
    methods: {
      handleRecord(index, row) {
        console.log(index, row);
        this.$router.push('record');
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
  .handle-box {
    padding-top: 20px;
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .del-dialog-cnt{
    font-size: 16px;
    text-align: center
  }
  .tags>.cell{
    background-color: red;
  }
  .tag_cell{
    margin: 5px;
  }
</style>
