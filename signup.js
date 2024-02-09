function lol(str){
  return str[Math.floor(Math.random()*str.length)]
}
function sha512(str){
return crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str)).then(buf => {
return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
});
}
async function signup(){
  if (document.getElementById('username').value==""){
    alert('Fill in username!')
  }
  localStorage.authcode = document.getElementById('username').value + String.fromCodePoint(10000)

  for (i=0;i<100;i++){
    localStorage.authcode += lol('abcdefghijkmnlopqrstuvwxyzABCDEFGHIJKMNLOPQRSTUVWXYZ1234567890~!@#$R%^&*()_+{}|:"<>?`-=[]\;\',./`"')
  }
  fetch('/addhash?id=' + await sha512(encodeURIComponent(localStorage.authcode)))
  location.reload()
}  
//detection
if (localStorage.authcode){
  async function lol(){
  function httpGet(theUrl){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
  }
  tokens = httpGet('/tokens.txt').split('\n')
  hash = await sha512(encodeURIComponent(localStorage.authcode))
  if (tokens.indexOf(hash)!=-1){
    document.getElementsByClassName('welcomer').item(0).hidden = false
    document.getElementsByClassName('lol').item(0).hidden = true
    document.getElementsByClassName('welcome').item(0).innerText = "Welcome " + localStorage.authcode.split(String.fromCodePoint(10000))[0] + '!'
  }
  }
  lol()
}
document.getElementsByClassName('qrcode').item(0).src = '/qrcode?text=' + window.location.origin + '/qr.html' + '&readonly=true'