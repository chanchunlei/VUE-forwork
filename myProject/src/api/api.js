//接入数据
//封装成公用的
import axios from 'axios';
const Testurl = 'http://192.168.168.166/index_chouactive_index/2';
let app = (params,url) => {
  axios({
    method: 'get',
    url: url,
    data: {
      // firstName: 'Fred'
      // lastName: 'Flintstone'
    }
  })
    .then(function(response){
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    })
}
const Test = params => {
    app(params,Testurl)
}
export default{
  Test
}
