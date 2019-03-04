<template>
  <el-card v-loading="this.$store.state.loading" class="box-card">
    <div class="block">
      <span class="demonstration">选择门店：</span>
      <el-select v-model="date_type" @change="storeID" placeholder="请选择">
        <el-option
          v-for="item in storeList"
          :key="item.date_type"
          :label="item.date_name"
          :value="item.date_type">
        </el-option>
      </el-select>
      <el-select v-if="date_type" v-model="lngshopid" placeholder="请选择">
        <el-option
          v-for="item in shopList"
          :key="item.lngshopid"
          :label="item.lngshopName"
          :value="item.lngshopid">
        </el-option>
      </el-select>
    </div>
    <div class="block">
      <span class="demonstration">筛选日期：</span>
      <el-date-picker
        v-model="before_time"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="开始日期">
      </el-date-picker>
      <el-date-picker
        v-model="end_time"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="结束日期">
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">选择条件：</span>
      <el-select v-model="money_sales" placeholder="请选择">
        <el-option
          v-for="item in moneyList"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="sort_order" placeholder="请选择">
        <el-option
          v-for="item in sortList"
          :key="item.value"
          :label="item.name"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="block">
      <el-button type="success" @click="requestInfo" round>确定</el-button>
    </div>
    <div>
      <el-table
        v-if="listShow==1"
        :data="tableData"
        border
        style="width: 100%; text-align: left">
        <el-table-column
          prop="total"
          :label="totals"
          width="230">
        </el-table-column>
        <el-table-column
          prop="proName"
          label="商品名称">
        </el-table-column>
      </el-table>
      <el-table
        v-if="listShow==2"
        :data="tableData"
        border
        style="width: 100%; text-align: left">
        <el-table-column
          prop="total"
          :label="totals"
          width="230">
        </el-table-column>
        <el-table-column
          prop="seatName"
          label="席位名称">
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
  import api from '../../api/api'
    export default {
        name: "ranking",
      data(){
          return{
            storeList: [],//初始数据
            date_type: '',//事业群
            lngshopid: '',//门店
            shopList: [], //门店数据
            moneyList: [{ //条件
              value: '1',
              name: '销售额'
            },{
              value: '2',
              name: '销量'
            }],
            money_sales: '',
            sortList: [{ //条件
              value: 'DESC',
              name: '从高到低'
            },{
              value: 'ASC',
              name: '从低到高'
            }],
            sort_order: '',
            before_time: '',
            end_time: '',
            requestJson: {},
            tableData: [],
            totals: '',
            listShow: 0
          }
      },
      created(){
          this.storeinfo();
      },
      methods:{
        storeinfo(){
          api.Store({
            success:res=>{
              //console.log(res);
              if(res.status == 200){
                this.storeList = res.data;
              }
            }
          })
        },
        storeID(e){
          this.shopList = [];
          this.lngshopid = '';
          const list = this.storeList.filter(item=>{
            return item.date_type == e;
          })
          this.shopList = list[0].store;
        },
        requestInfo(){//提交数据
          try{
            if(!this.date_type){ throw '请选择事业群！' }
            if(!this.lngshopid){ throw '请选择门店！' }
            if(!this.money_sales){ throw '请选筛选条件！' }
            if(new Date(this.before_time)>=new Date(this.end_time)){ throw `请选择开始时间早于结束时间的区间！`}
            if(!this.sort_order){ throw '请选排序条件！' }
            if(this.money_sales == 1){
              this.totals = '销售额';
            }else if(this.money_sales == 2){
              this.totals = '销量';
            }
            if(this.date_type == 1){
              this.listShow = 1;
            }else if(this.date_type == 2){
              this.listShow = 2;
            }
            this.requestJson.date_type = this.date_type;
            this.requestJson.lngshopid = this.lngshopid;
            this.requestJson.money_sales = this.money_sales;
            this.requestJson.sort_order = this.sort_order;
            this.requestJson.before_time = this.before_time;
            this.requestJson.end_time = this.end_time;
            this.tableList(this.requestJson)
          }catch (e) {
            this.$message.error(e);
          }
        },
        tableList(queryJson){
          api.GoodsList({
            query:queryJson,
            success:res=>{
              //console.log(res)
              if(res.status == 200){}
                this.tableData = res.data.data;
            }
          })
        }
      }
    }
</script>

<style scoped>
.block{
  line-height: 50px;
  text-align: left;
}
</style>
