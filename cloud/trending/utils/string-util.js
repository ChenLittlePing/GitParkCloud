
  /* * 去掉字符串左右空格、换行 */
function trim( text ){
  if (typeof(text) == "string")  {
    return text.replace(/^\s*|\s*$/g, "");
  }
  else{
    return text;
  }
}

module.exports = {
  trim
}