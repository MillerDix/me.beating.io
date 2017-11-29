const request = ({url, method, data = {}}) => {
  if(!(url && method)) {console.log("缺少参数");return;}
  return fetch(url, {
    method,
    data,
    mode: 'cors',
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  })
};

export default request;