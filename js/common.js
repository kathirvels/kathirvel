var itemImgURL = "http://advantixcrm.com/prj/mitech/images/item/";
var defaultImgURL = "logo_miapps.png";
var serviceAppURL = "http://advantixcrm.com/prj/mitech/index.php/api/appconfig/Mw";

var store_id= 'Mw';
var serviceURL = "http://advantixcrm.com/prj/mitech/index.php/api/";

var resDatavl = window.localStorage.getItem('RestInfoDet');//alert(resDatavl);
if(resDatavl!=null) {	
	var resData = JSON.parse(resDatavl);
	restId = resData.id;
	tabId=getUrlVars()["tabId"];	
	if(tabId!=null) {
		menuId = tabId ;
	} else {
		//var dataAppConfig = window.localStorage.getItem('tabIdSess');
		getMenuTabDefId();
		menuId = window.localStorage.getItem('tabIdSess');
	}
	
	//alert(menuId+":"+restId);
	var serviceMenuURL = "http://advantixcrm.com/prj/mitech/index.php/api/catlist/Mw/"+restId+"/"+menuId;
}

var dataAppConfigval = window.localStorage.getItem('configData');
if(dataAppConfigval==null) {
	//alert('null');
	$.getJSON(serviceAppURL, function(data) {
		window.localStorage.setItem('configData',JSON.stringify(data)); // store local storage	
		var dataAppConfigval = window.localStorage.getItem('configData');
		var dataAppConfig = JSON.parse(dataAppConfigval);	
		history.go(0);
	});
}

if(dataAppConfigval!=null) {	
	var dataAppConfig = JSON.parse(dataAppConfigval);
	
	/*$("#bodyId").css("background-image", "url("+dataAppConfig.AppConfig.bg_image+")");
	$("#bodyId").css("background-repeat", "repeat-x");
	$("#bodyId").css("background-position", "top");
	$("#bodyId").css("background-color", "#000");*/
	$(document).ready(function() {
        document.title = dataAppConfig.AppConfig.store_name;
		headerHtml(dataAppConfig.AppConfig.store_name);
    });
	file_name=get_path_filename();
	
	
} 


function getMenuTabDefId() {
	$.getJSON(serviceURL+'tab/'+store_id+'/'+restId, function(data) {	
		var tabs = data.TabInfo;
		//alert(tabs);
		if(tabs[0]!=null) {
			var tabIdVal = tabs[0]['cat_id'];
			
		} else {
			var tabIdVal = 0;
		}
		window.localStorage.setItem('tabIdSess',tabIdVal); 	
	});
	
}

function headerHtml(titVal) {
	htmlData='<a href="../toolbar/" data-rel="back" class="ui-btn ui-btn-left ui-alt-icon ui-nodisc-icon ui-corner-all ui-btn-icon-notext ui-icon-back">Back</a>';
	htmlData+='<a href="#" data-rel="refresh" class="ui-btn ui-btn-right ui-alt-icon ui-nodisc-icon ui-corner-all ui-btn-icon-notext ui-icon-refresh" onclick="refresh();">Refresh</a>';
    htmlData+='<h1 class="ui-title" role="heading" aria-level="1">'+titVal+'</h1>';

	$('#headerContId').html(htmlData);
}
var userDataval = window.localStorage.getItem('userData');

var welcomeDiv = window.localStorage.getItem('welcomeDiv');

if(userDataval!=null) {
	var userData = JSON.parse(userDataval);
	var carDataGetcntval = window.localStorage.getItem('carDatas');
	var carDataGetDealCnt = window.localStorage.getItem('dealItemsId');
	
	
	if(carDataGetDealCnt!=null) {
		cartCount = 1;
	} else if(carDataGetcnt!=null) {
		var carDataGetcnt = JSON.parse(carDataGetcntval);
		var cartItemCntView=carDataGetcnt.items.length;
		cartCount = cartItemCntView;
	} else {
		cartCount = 0;
	}
		
	window.localStorage.setItem('welcomeDiv','<ul class="clearfix"><li>'+userData.user_data.fname+'</li><li>|</li><li><span ><a href="#" id="logoutBtnId" rel="external" style=" color:#fff;">logout</a></span></li><li>|</li><li><span><a href="checkout.html" id="cartBtnId" rel="external" style=" color:#fff;">Cart <span style="color:#ff0000">['+cartCount+']</span></a></span></li></ul><div  class="ui-menu-right"> <a href="myaccount.html" rel="external"><img src="img/icon_menu.png" alt=""></a></div>'); // store local storage
	var welcomeDiv = window.localStorage.getItem('welcomeDiv');
	
	$('#userName').html(welcomeDiv);
} else {
	var carDataGetcntval =window.localStorage.getItem('carDatas');
	var carDataGetDealCnt = window.localStorage.getItem('dealItemsId');
	
	
	if(carDataGetDealCnt!=null) {
		cartCount = 1;
	} else if(carDataGetcnt!=null) {
		var carDataGetcnt = JSON.parse(carDataGetcntval);
		var cartItemCntView=carDataGetcnt.items.length;
		cartCount = cartItemCntView;
	} else {
		cartCount = 0;
	}
	
	window.localStorage.setItem('welcomeDiv','<ul class="clearfix"><li>Guest <span style="color:#fff">User</span></li><li>|</li><li><span><a href="checkout.html" id="cartBtnId" rel="external" style=" color:#fff;">Cart <span style="color:#ff0000">['+cartCount+']</span></a></span></li><li>|</li><li><span ><a href="#" id="logoutBtnId" rel="external" style="color:#fff">Login</a></span></li></ul><div  class="ui-menu-right"><a href="myaccount.html" rel="external"><img src="img/icon_menu.png" alt=""></a></div>'); // store local storage
	var welcomeDiv = window.localStorage.getItem('welcomeDiv');
	$('#userName').html(welcomeDiv);
	
}

//$("#logoutBtnId").click(function() {
function logout() {
	//alert("dsf");
	window.localStorage.removeItem('userData');
	$("#loginFrmId").show();
	$("#registerFrmId").hide();	
	$("#addrFrmId").hide();
	$("#userName").hide();
	window.localStorage.setItem('form_active','#loginFrmId'); // store local storage
	//window.localStorage.setItem('form_inactive','#registerFrmId'); // store local storage
	window.location.href='register.html';
}
//});


function checkConnection() {
	var networkState = navigator.network.connection.type;

	var states = {};
	states[Connection.UNKNOWN]  = 'Unknown connection';
	states[Connection.ETHERNET] = 'Ethernet connection';
	states[Connection.WIFI]     = 'WiFi connection';
	states[Connection.CELL_2G]  = 'Cell 2G connection';
	states[Connection.CELL_3G]  = 'Cell 3G connection';
	states[Connection.CELL_4G]  = 'Cell 4G connection';
	states[Connection.NONE]     = 'No network connection';

	if(states[networkState] == 'Unknown connection' || states[networkState] == 'No network connection') {
		alert('Connection type: ' + states[networkState]);
		return false;
	} else {
		alert('Connection type: ' + states[networkState]);
		return true;
	}
}

catId=getUrlVars()["catId"];
itemId=getUrlVars()["itemId"];
itemType=getUrlVars()["type"];
orderId=getUrlVars()["orderId"];
delitemId=getUrlVars()["delitemId"];
dealId=getUrlVars()["dealId"];
chkitemid=getUrlVars()["chkitemid"];



function goPrevious() { // used in showMenu.html

	history.go(-1);
	
}

function refresh() { // used in showMenu.html
	$.getJSON(serviceAppURL, function(data) {		
		window.localStorage.setItem('configData',JSON.stringify(data)); // store local storage	
		var restDet = JSON.parse(window.localStorage.getItem('configData'));
		RestIndex = window.localStorage.getItem('RestInfoDetIndex');
		//alert(RestIndex);
		if(RestIndex!=null) {
			window.localStorage.setItem('RestInfoDet',JSON.stringify(restDet.RestInfo[RestIndex])); 
			// store local storage
		}
		history.go(0);
	});
	
	
}
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function get_path_filename() {
	var path=window.location.pathname;
	var Filename= path.split('/').pop();
	return Filename;
}
function capitalize (text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}