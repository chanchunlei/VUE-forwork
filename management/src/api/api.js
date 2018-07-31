import axios from 'axios'
const url = 'http://jsonplaceholder.typicode.com/posts'
let request = (params,url) => {
  axios({
    method: 'post',
    url: url,
    data:params.query || {}
  })
    .then(function(res){
      params.success && params.success(res)
      // console.log(res)
    })
    .catch(function(err){
      console.log(err)
    })
}
const Test = params => {
  request(params,url)
}
export default{
  Test
}
