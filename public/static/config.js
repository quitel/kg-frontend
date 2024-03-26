var $host = window.location.host
console.log($host,"$host")
let pathUrl = window.location.href
console.log(pathUrl,"pathUrl")
let projectIdIndex = pathUrl.indexOf("projectId")
let projectId = pathUrl.substring(projectIdIndex+10)
console.log(projectId,"projectId")
// debugger

if(projectId===null||projectId===undefined||isNaN(projectId)){
  projectId=0
}
// 本地环境
let local_Base_Urls = {
  0:"http://127.0.0.1:8080/",
  1:"http://127.0.0.1:8081/",
  2:"http://127.0.0.1:8082/",
  3:"http://127.0.0.1:8083/",
  4:"http://127.0.0.1:8084/"
}

// 校内测试环境
let test_Base_Urls = {
  0:"http://172.16.44.129:6888/kg/",
  1:"http://172.16.44.129:6999/kg/",
  2:"http://172.16.44.129:7000/kg/",
  3:"http://172.16.44.129:7111/kg/",
  4:"http://172.16.44.129:7333/kg/"
}
// 生产环境
let prod_Base_Urls = {
  0:"http://ydts.liaoning.net:6888/kg/",
  1:"http://ydts.liaoning.net:6999/kg/",
  2:"http://ydts.liaoning.net:7000/kg/",
  3:"http://156.7.248.143:6888/kg/",
  4:"http://156.7.248.143:6999/kg/",
  5:"http://156.7.248.143:7000/kg/",
  6:"http://156.7.248.144:6888/kg/",
  7:"http://156.7.248.144:6999/kg/",
  8:"http://156.7.248.144:7000/kg/",
}

// 当前环境：local  test  prod
let CURRENT_ENV = "local"
// 当前BASE_URL
let CURRENT_BASE_URL = ""
let node_length = 1
let node_index = 0

switch (CURRENT_ENV) {
  case 'local':
    queryInstanceMapping(local_Base_Urls[0],projectId,"RUNTIME_MOD",1).then(result => {
      route(result,local_Base_Urls)
    }).catch(error => {
      console.error(error);
    });

    break
  case 'test' :
    queryInstanceMapping(test_Base_Urls[0],projectId,"RUNTIME_MOD",1).then(result => {
      route(result,test_Base_Urls)
    }).catch(error => {
      console.error(error);
    });

    break
  case 'prod' :
    queryInstanceMapping(prod_Base_Urls[0],projectId,"RUNTIME_MOD",1).then(result => {
      route(result,prod_Base_Urls)
    }).catch(error => {
      console.error(error);
    });

    break
  default:
    CURRENT_BASE_URL = "http://ydts.liaoning.net:6888/kg/"
}



// window.global_config.BASE_URL = CURRENT_BASE_URL
// console.log(CURRENT_BASE_URL,'CURRENT_BASE_URL_final')
// window.global_config = {
//   // BASE_URL: 'http://172.16.44.129:6888/kg/' //配置所有axios api 全局地址，此项为线上部署地址，根据服务器ip修改
//   PHOTOPATH: 'http://szbxc.liaoning.net/',
//   EDGELENGTH: 180,
//   GRAVITY:0.15,
//   BASE_URL: CURRENT_BASE_URL //此项为本地测试地址
// }




async function queryInstanceMapping(url, projectId, type, version) {
  console.log("静态资源")
  const xhr = new XMLHttpRequest();
  url = url + "db/2neo4j/createInstanceMapping?projectId="+projectId+"&type="+type+"&version="+version
  xhr.open('get', url, false); // 第三个参数为是否开启异步请求
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send();
  const result = JSON.parse(xhr.responseText);
  console.log("createInstanceMapping_response",result)
  return result;
}

function route(result,env_Base_Urls) {
  node_index = result.data.instanceId
  console.log(node_index,"node_index")
  CURRENT_BASE_URL = env_Base_Urls[node_index]
  console.log(CURRENT_BASE_URL,'CURRENT_BASE_URL_final')
  window.global_config = {
    // BASE_URL: 'http://172.16.44.129:6888/kg/' //配置所有axios api 全局地址，此项为线上部署地址，根据服务器ip修改
    PHOTOPATH: 'http://szbxc.liaoning.net/',
    EDGELENGTH: 180,
    GRAVITY:0.15,
    BASE_URL: CURRENT_BASE_URL //此项为本地测试地址
  }
  console.log("result111",result)
  if(result.code === 201){
    // 强制刷新
    location.reload()
  }
}
