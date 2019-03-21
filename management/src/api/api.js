import axios from 'axios'
const baseurl = '/gp';
//请求数据
let request = (params,baseurl,url) => {
  axios({
    method: 'post',
    baseURL:baseurl,
    url: url,
    headers: {'Content-Type': 'application/json'},
    data:params.query || {}
  })
    .then(function(res){
      params.success && params.success(res)
      // console.log(res)
    })
    .catch(function(error){
      params.error && params.error(error)
    })
}
//获取token
let requsetToken = (params,baseurl,url) =>{
  axios({
    method: 'post',
    baseURL:baseurl,
    url: url,
    auth:params.loginParams,
    data:params.query || {}
  })
    .then(function(res){
      params.success && params.success(res)
      // console.log(res)
    })
    .catch(function(error){
      params.error && params.error(error)
    })
}
//下载文件
let requsetFile = (params,baseurl,url) =>{
  axios({
    method: 'get',
    baseURL:baseurl,
    url: url,
    headers: {'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
    responseType: 'blob',
    data:params.query || {}
  })
    .then(function(res){
      params.success && params.success(res)
    })
    .catch(function(error){
      params.error && params.error(error)
    })
}

//上传文件
let uploadFile = (params,baseurl,url) =>{
  axios({
    method: 'post',
    baseURL:baseurl,
    url: url,
    responseType: 'blob',
    data:params.files.formData || {},
    file:params.files.file,
    processData:false,
    contentType:false,
  })
    .then(function(res){
      params.success && params.success(res)
    })
    .catch(function(error){
      params.error && params.error(error)
    })
}


const Token = params => {//获取token
  requsetToken(params,baseurl,'/token/get_token')
}
const File = params => {//下载会员信息文件
  requsetFile(params,baseurl,'/user/get_user_out')
}
const Order = params => {//下载订单文件
  requsetFile(params,baseurl,'/user/get_sale_detail_out')
}
const MemberDeal = params => {//下载会员交易信息
  requsetFile(params,baseurl,'/userdata/user_sale_repeat')
}
const Templet = params => {//下载模板文件
  requsetFile(params,baseurl,'/userdata/out_shangyi')
}
const UpFile = params => {//上传商益号
  uploadFile(params,baseurl,'/userdata/get_code_tel')
}
//设置
const AdminList = params => {//管理员列表
  request(params,baseurl,'/admin/admin_list')
}
const AdminRole = params => {//设置管理员角色
  request(params,baseurl,'/admin/set_admin_role')
}
const RoleList = params => {//角色列表
  request(params,baseurl,'/admin/role_list')
}
const AddRole = params => {//添加角色
  request(params,baseurl,'/admin/role_add')
}
const DeleteRole = params => {//删除角色
  request(params,baseurl,'/admin/role_del')
}
const EditRole = params => {//修改角色
  request(params,baseurl,'/admin/role_edit')
}
const AuthListCate = params => {//获取权限分类
  request(params,baseurl,'/admin/get_auth_cate')
}
const AuthList = params => {//获取权限列表
  request(params,baseurl,'/admin/get_auth_list')
}
const RoleAuth = params =>{//获取某个角色已有权限
  request(params,baseurl,'/admin/get_role_auth')
}
const SetRole = params =>{//设置角色权限
  request(params,baseurl,'/admin/set_role_auth')
}
//导航
const Sexual = params =>{//首页性别分布图
  request(params,baseurl,'/user/get_user_sex')
}
const Age = params =>{//首页年龄分布图
  request(params,baseurl,'/user/get_user_age')
}
const TagList = params =>{//获取标签
  request(params,baseurl,'/lab/get_lab_list')
}
const ProduceGroup = params =>{//创建人群
  request(params,baseurl,'/lab/create_crowd')
}
const DeleteGroup = params =>{//删除人群
  request(params,baseurl,'/lab/crowd_del')
}
const GroupList = params =>{//群列表
  request(params,baseurl,'/lab/get_crowd_list')
}
const GroupMemberList = params =>{//获取某个人群会员列表
  request(params,baseurl,'/lab/get_crowd_user_list')
}
const GroupMemberFile = params => {//下载某个人群会员列表手机号
  requsetFile(params,baseurl,`/crowd/out_crowd_phone/${params.query.cid}`)
}
const MemberList = params =>{//会员列表
  request(params,baseurl,'/user/get_user_list')
}
const MemberOrderDetail = params =>{//会员交易详情
  request(params,baseurl,'/user/get_one_sale_detail')
}
const MemberDetail = params =>{//某个会员详细信息
  request(params,baseurl,'/user/get_one_user')
}
const MemberData = params =>{//会员规模
  request(params,baseurl,'/userdata/get_user_data')
}
const MemberOffer = params =>{//会员贡献
  request(params,baseurl,'/userdata/get_user_order')
}
const checkTime = params =>{//成交时间统计
  request(params,baseurl,'/analysis/getorderdays')
}
const PurchaseFrequency = params =>{//购买频次
  request(params,baseurl,'/analysis/getordermonth')
}
const AnnualTransaction = params =>{//年成交占比
  request(params,baseurl,'/analysis/getorderyear')
}
const Gmv = params =>{//每月成交金额
  request(params,baseurl,'/analysis/getordermoney')
}
const Store = params =>{//有商品排行的门店信息
  request(params,baseurl,'/ranking/store')
}
const GoodsList = params =>{//有商品排行的门店信息
  request(params,baseurl,'/ranking/ranking_list')
}
const CouponList = params =>{//获取券列表
  request(params,baseurl,'/card/get_card_list')
}
const MsgPower = params =>{//发券短信通知权限
  request(params,baseurl,'/card/send_card_dxmsg')
}
const CouponSend = params =>{//发券
  request(params,baseurl,'/card/send_card')
}
const SingleCouponSend = params =>{//单个人发券
  request(params,baseurl,'/card/send_one_card')
}
const CardHistory = params => {//发券记录
  request(params,baseurl,'/card/send_card_log')
}
const CardHistoryDetail = params => {//发券记录详情
  request(params,baseurl,'/card/send_card_log_detail')
}
const CouponDistribution = params => {//优惠券分布
  request(params,baseurl,'/carddata/tc')
}
const BusinessGroup = params => {//事业群列表
  request(params,baseurl,'/carddata/teg_list')
}
const CouponDetailList = params => {//卡券数据列表
  request(params,baseurl,'/carddata/list')
}
const GetUserSource = params => {//注册来源
  request(params,baseurl,'/analysis/getusersource')
}
const Getnewintwo = params => {//新会员月份趋势
  request(params,baseurl,'/analysis/getnewintwo')
}
export default{
  Token,
  File,
  Order,
  MemberDeal,
  Templet,
  UpFile,
  AdminList,
  AdminRole,
  RoleList,
  AddRole,
  DeleteRole,
  EditRole,
  AuthListCate,
  AuthList,
  RoleAuth,
  SetRole,
  Sexual,
  Age,
  TagList,
  ProduceGroup,
  DeleteGroup,
  GroupList,
  GroupMemberList,
  GroupMemberFile,
  checkTime,
  PurchaseFrequency,
  AnnualTransaction,
  Gmv,
  MemberList,
  MemberOrderDetail,
  MemberDetail,
  MemberData,
  MemberOffer,
  Store,
  GoodsList,
  CouponList,
  MsgPower,
  CouponSend,
  SingleCouponSend,
  CardHistory,
  CardHistoryDetail,
  CouponDistribution,
  BusinessGroup,
  CouponDetailList,
  GetUserSource,
  Getnewintwo
}
