const request = ({url, method, data = {}}) => {
  if(!(url && method)) {console.log("缺少参数");return;}
  method = method.toLowerCase();
  return fetch(url, {
    method,
    headers: { 
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({...data}),
    mode: 'cors'
  }).then(response => {
    return response.json();
  }).catch(err => {
    console.log(err);
  })
};

export default request;