
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

function post(url,json){
    return send_request('POST',url,json);
}


function send_request(method,url,body){
    var host='',
    token='fji30vbu89nifhj23er32jgk9875ij9',
    httpHeader=new Headers({
        zonybir:token
    }),
    config={
        method:method,
        credentials:'same-origin'
    };
    httpHeader.append('Content-Type','application/json');
    config.headers=httpHeader;
    if(method.toLocaleLowerCase()=='post') config.body=JSON.stringify(body);
    return new Promise(function(resolve,reject){
        fetch(host+url,config)
        .then(function(res){
            return res.json();
        })
        .then(function(res){
            if(res.code == 200) resolve(res);
            else if(res.code == 403){
                ls();
                location.hash='login';
            }
            else alert(res.message);
        })
        .catch(function(e){
            alert('服务器错误');
            console.log(e);
        })
    })
}
localStorage?'':document.body.innerHTML='请升级浏览器访问';
function ls(key,value){
    var result;
    typeof key == 'undefined' ? localStorage.clear() : typeof value == 'undefined' ? result=localStorage.getItem(key) : 
    typeof value == 'null' ? localStorage.removeItem(key) :localStorage.setItem(key,typeof value == 'object'?JSON.stringify(value):value);
    if(typeof result != 'undefined') return JSON.parse(result);
    return ls;
}

function d_id(key){
    return document.getElementById(key);
}
function create_dom(targetName,className,innerHtml){
    var dom = document.createElement(targetName);
    dom.className=className;
    dom.innerHTML=innerHtml;
    return dom;
}
function zero(num){
    return num<10?'0'+num:num;
}
function get_date(ms,split,type){

    var date=ms?new Date(ms-0):new Date();
    var date_obj={
        year:date.getFullYear(),
        month:date.getMonth()+1,
        date:date.getDate(),
        hour:date.getHours(),
        min:date.getMinutes(),
        sec:date.getSeconds()
    }
    split=split || '-';
    return get_time=type=='date'?date_obj.year+split+zero(date_obj.month)+split+zero(date_obj.date):
    type=='time'?zero(date_obj.hour)+':'+zero(date_obj.min)+':'+zero(date_obj.sec):
    date_obj.year+split+zero(date_obj.month)+split+zero(date_obj.date)+' '+zero(date_obj.hour)+':'+zero(date_obj.min)+':'+zero(date_obj.sec);
    
}