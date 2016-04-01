// 对ajax的封装
// data是一个对象格式
// http://www.baidu.com //?参数
// http://www.baidu.com?data=var&参数
function ajax (type,url,data,sucess,failed) {
    // 创建ajax对象
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    }else{
        xhr = new new ActiveXObject('Microsoft.XMLHTTP');
    }
    // 将type转为大写
    var type = type.toUpperCase();

    // 浏览器有一个缓存机制
    // 如何破解浏览器的缓存机制
    // 在链接上加上一个时间戳

    var timestamp = (new Date()).valueOf();

    // 将data转换为表单编码
    if (typeof data == 'object' ) {
        var str = '';
        for( var key in data ){
            str += key+'='+data[key]+'&';
        }
        data = str.replace(/&$/,'');
    };

    // 处理url，拼接数据和时间戳
    // 兼容本来具有?的url
    if (url.indexOf("?") >= 0) {
        // 请求方式为GET且有参数的情况
        if (type == 'GET' && data) {
            url = url + '&' + data + '&t=' + timestamp;
        }else{
            url = url+ '&t=' + timestamp;
        }
    }else{
        if (type == 'GET' && data) {
            url = url + '?' + data + '&t=' + timestamp;
        }else{
            url = url+ '?t=' + timestamp;
        }
    }

    // 发送请求
    if (type == 'GET') {
        xhr.open('GET',url);
        xhr.send();
    }else{
        xhr.open('POST',url);
        // 设置成表单编码格式
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencode");
        xhr.send(data);
    }

    // 接收和处理返回数据
    xhr.onreadystatechange = function (){
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert("in");
                sucess(xhr.responseText);
            }else{
                if (failed) {
                    failed(xhr.status);
                };
            }
        };
    }
}