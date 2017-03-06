
//ObjectAssign.polyfill();
function get(url,json){
    var i,str='';
    if(json){
        for(i in json){
            if(json.hasOwnProperty(i)){
                if(!json[i]) continue;
                str+=i+'='+json[i]+'&';
            }
        }
    }
    url=str?url+'?'+str.splice(0,-1):url;
    return send_request('GET',url);
}

function send_request(method,url,body){
    var host='',
    token='fji30vbu89nifhj23er32jgk9875ij9',
    httpHeader={
        zonybir:token
    }
    config={
        method:method,
        headers:new Headers(httpHeader),
        credentials:'same-origin'
    }

    if(method.toLocaleLowerCase()=='post') config.body=body;

    return new Promise(function(resolve,reject){
        fetch(host+url,config)
        .then(function(res){
            return res.json();
        })
        .then(function(res){
            resolve(res);
        })
        .catch(function(e){
            alert('服务器错误');
            console.log(e);
        })
    })
}