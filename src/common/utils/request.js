const request = ({ url, ...options }) => {
  if (url == null || options.method == null) { console.log("缺少参数"); return; }
  // method = method.toLowerCase();
  let defaultOptions;

  if (options.method.toLowerCase() === 'post') {
    defaultOptions = {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ ...options.data }),
      mode: 'cors',
      ...options
    }
  }else if (options.method.toLowerCase() === 'get') {
    defaultOptions = {
      method: 'get'
    }
  }else{
    defaultOptions = {};
  }

  return fetch(url, defaultOptions)
    .then(response => {
      console.log(response);
      if (defaultOptions.method.toLowerCase() === 'get') {
        return response;
      }
      return response.json();
    }).catch(err => {
      console.log(err);
    });
};

export default request;