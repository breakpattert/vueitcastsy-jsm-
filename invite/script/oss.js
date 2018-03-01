
// var accessid= 'LTAId75kboNzzTOf',
// accesskey= 'zi6SbYilgU81XrrjzMOL2nwKpeYK8h',
var accessid= 'LTAId75kboNzzTOf',
accesskey= 'zi6SbYilgU81XrrjzMOL2nwKpeYK8h',
host = 'http://matepay-oss-bucket.oss-cn-hangzhou.aliyuncs.com',
// host = 'http://matepay-oss-bucket.oss-cn-hangzhou.aliyuncs.com',
g_dirname = '',
g_object_name = '${filename}',
g_object_name_type = '',
now = Date.parse(new Date()) / 1000; 

var policyText = {
    "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    "conditions": [
    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
};

var policyBase64 = Base64.encode(JSON.stringify(policyText)),
message = policyBase64
var bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
var signature = Crypto.util.bytesToBase64(bytes);
//获取当前时间yy-mm-dd
var nowDate = new Date();
var year = nowDate.getFullYear();
var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1): nowDate.getMonth() + 1;
var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
var dateStr = year + "-" + month + "-" + day;
console.log(dateStr);
var dir = 'test/matepay/activity/'+dateStr+'/';



function getOssObj(){
  var obj = {};
  obj = {
    dir,
    host,
    signature,
    policy: policyBase64,
    success_action_status: 200,
    OSSAccessKeyId: accessid,
    key: dir + "${filename}"
  }
  return obj;
}

/*对random的一个处理*/
function random_string(len) {
　　len = len || 32;
　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
　　var maxPos = chars.length;
　　var pwd = '';
　　for (let i = 0; i < len; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    var pos = filename.lastIndexOf('.'),
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix
}




 function get_random_filename(filename){
  
  var suff = get_suffix(filename);
  var str = random_string(15);
  return str + suff;
}
function get_dirname()
{
    dir = document.getElementById("fileId1").value;
    console.log(dir);
    if (dir != '' && dir.indexOf('/') != dir.length - 1)
    {
        dir = dir + '/'
    }
    //alert(dir)
    g_dirname = dir
}

function file_upload_success(res, file){
  var filename = get_random_filename(file.name);
  console.log('filename', filename);
}
// export get_random_filename;
// export default getOssObj;