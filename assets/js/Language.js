function SelectedIndexChanged(s) {
  setCookie("Culture", s);
}
//to handle multi language
function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
