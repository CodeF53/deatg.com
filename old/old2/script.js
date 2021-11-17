<form name="random"><input type="text" name="random" size=78 value=""></form>
<SCRIPT LANGUAGE="JavaScript">
<!--
// Copyright 1996 - Tomer and Yehuda Shiran
// This example will appear in our forthcoming book on JavaScript.
// Feel free to "steal" this code provided that you leave this notice as is.
// Additional examples from the book can be found at //http://www.geocities.com/SiliconValley/9000/
// For more information contact Tomer or Yehuda Shiran <yshiran@iil.intel.com>

function getMessage() {
// create array of murphy laws
var ar = new Array(20)
ar[0] = "e"
ar[1] = "ee"
ar[2] = "eee"
ar[3] = "eeee"
ar[4] = "eeeee"
ar[5] = "eeeeee"
ar[6] = "eeeeeee"
ar[7] = "eeeeeeee"
ar[8] = "eeeeeeeee"
ar[9] = "eeeeeeeeee"
ar[10] = "eeeeeeeeeee"
ar[11] = "eeeeeeeeeeee"
ar[12] = "eeeeeeeeeeeee"
ar[13] = "eeeeeeeeeeeeee"
ar[14] = "eeeeeeeeeeeeeee"
ar[15] = "eeeeeeeeeeeeeeee"
ar[16] = "eeeeeeeeeeeeeeeee"
ar[17] = "eeeeeeeeeeeeeeeeee"
ar[18] = "eeeeeeeeeeeeeeeeeee"
ar[19] = "eeeeeeeeeeeeeeeeeeee"

var now = new Date()
var sec = now.getSeconds()
document.random.random.value="" + ar[sec % 20]
}
getMessage()
//-->
</SCRIPT>
<p align="center"><font face="arial" size="-2">This free script provided by</font><br>
<font face="arial, helvetica" size="-2"><a href="http://javascriptkit.com">JavaScript
Kit</a></font></p>