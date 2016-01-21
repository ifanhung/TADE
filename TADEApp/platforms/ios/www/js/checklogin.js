var userToken = "";
userToken = window.localStorage.getItem("userToken");
var uid = "";
uid = window.localStorage.getItem("uid");

var loginOK = "";

//檢查是否登入並執行登入後或沒登入的function
function CheckUserToken(userToken,successFunctionName,successFunctionArgus,failFunctionName,failFunctionArgus){
	
	if(userToken != null || userToken != ""){
		$.ajax({
			  type : "GET",
			  dataType : "jsonp",
			  url : "http://www.tade.org.tw/TADE/SSO_Validate.aspx",
			  crossDomain: true,
			  contentType: "application/json; charset=utf-8",
			  data : {"tokenStr":userToken},
			  success: function(obj){
	                var jsonObjLogin = obj;

					if(jsonObjLogin != null && jsonObjLogin.datas.length > 0){
						if(jsonObjLogin.datas[0].tokenStatus == "OK"){
							//if(successFunctionName!="") window[successFunctionName](successFunctionArgus);
							loginStatus("ok",successFunctionName,successFunctionArgus,failFunctionName,failFunctionArgus);
		                }else{
		                	//if(failFunctionName!="") window[failFunctionName](failFunctionArgus);
		                	loginStatus("fail",successFunctionName,successFunctionArgus,failFunctionName,failFunctionArgus);
		                }
					}
			  },
			  error: function(xhr, status, error) { 
				  loginStatus("fail",successFunctionName,successFunctionArgus,failFunctionName,failFunctionArgus);
			  	},
			  async: false,
			  cache: false
			});		
	}

}
function loginStatus(prm_login,successFunctionName,successFunctionArgus,failFunctionName,failFunctionArgus){
	if(prm_login=="fail"){
		window.localStorage.removeItem("userToken");
		window.localStorage.removeItem("username");
		document.getElementById("sp_login").innerText = "會員登入";
		document.getElementById("sp_login").setAttribute( "onclick", "javascript: location='login.html';");
		if(failFunctionName!="") window[failFunctionName](failFunctionArgus);
		
		//document.getElementById("sp_join").style.display="";
        
        loginOK = "";
	}else{
		document.getElementById("sp_login").innerText = "會員登出";
		document.getElementById("sp_login").setAttribute( "onclick", "javascript: logout();");
		if(successFunctionName!="") window[successFunctionName](successFunctionArgus);
		
		//document.getElementById("sp_join").style.display="none";
        
        loginOK = "Y";

	}
	
} 
function logout(){
	window.localStorage.removeItem("userToken");
	window.localStorage.removeItem("username");
	document.getElementById("sp_login").innerText = "會員登入";
	document.getElementById("sp_login").setAttribute( "onclick", "javascript: location='login.html';");
	location = "index.html";
	//document.getElementById("sp_join").style.display="";
}