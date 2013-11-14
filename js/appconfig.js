var serviceURL = "http://advantixcrm.com/prj/mitech/index.php/api/appconfig/MQ";


$('#typography').live('pageshow', function(event) {	
	//if(checkConnection()) {
		$.getJSON(serviceURL, getAppConfig);
	//}
});
$.ajaxSetup({ cache: false });
function getAppConfig(data) {
	
	//$.getJSON(serviceURL, function(data) {
		//alert(data.AppConfig.delivery_btn);
		//$('#employeeList li').remove();
		//appconfigs = data.AppConfig;
		//alert(data.AppConfig.bg_image);
		$("#bodyId").css("background-image", "url("+data.AppConfig.bg_image+")");
		$("#bodyId").css("background-repeat", "no-repeat");
		$("#bodyId").css("background-position", "center");
		
		
		$('#appTitle').text(data.AppConfig.store_name);
		//$('#employeeList li').addClass("navbutton");
		var htmlIn='';
		
		if(data.AppConfig.deal_status=='A') {
			$("#dealDivId").append('<div class="ui-body ui-body-b ul-pizzaimg"><a href="showMenu.html" rel="external"><img src="'+data.AppConfig.deal_img+'" alt="" id="bannerId"></a></div>');		
		}
		
		if(data.AppConfig.delivery_btn=='A') {
			if(data.AppConfig.takeaway_btn=='A') {cssSt="ui-rfloat "} else {cssSt=""}
				htmlIn+='<a rel="external" class="'+cssSt+'ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-b" data-inline="true" data-role="button" href="showMenu.html" data-theme="b"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">'+data.GlobalConfig.delivery_label+'</span></span></a>';
		}
		if(data.AppConfig.takeaway_btn=='A') {
			htmlIn+='<a rel="external" class="ui-btn ui-btn-inline ui-btn-corner-all ui-shadow ui-btn-up-b" data-inline="true" data-role="button" href="showMenu.html" data-theme="b"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">'+data.GlobalConfig.takeaway_label+'</span></span></a>';
		}
		if(data.AppConfig.see_the_menu_btn=='A') {
			htmlIn+='<a rel="external" data-role="button" href="showMenu.html" data-theme="b" class="ui-btn ui-btn-corner-all ui-shadow ui-btn-up-b"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">'+data.GlobalConfig.see_the_menu_label+'</span></span></a>';
		}
	
		
		$('#employeeList').append(htmlIn);
		
		//$('#employeeList').listview('refresh');
	//});
}
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

	if(states[networkState] == 'Unknown connection' || states[Connection.NONE] == 'No network connection') {
		alert('Connection type: ' + states[networkState]);
		return false;
	} else {
		alert('Connection type: ' + states[networkState]);
		return true;
	}
}
function ShowMenu() {
window.location.href='showMenu.html';
}

function reloadHome() {
window.location.href='index.html';
}