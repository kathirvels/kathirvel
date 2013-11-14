var serviceURL = "http://advantixcrm.com/prj/mitech/index.php/api/menuadv/MQ";

$('#services').bind('pageinit', function(event) {
	//if(checkConnection()) {
		getMenuList();
	//}
});
$.ajaxSetup({ cache: false });
function getMenuList() {
	$.getJSON(serviceURL, function(data) {
		$('#employeeList li').remove();		
		$('#appTitle').text(data.AppConfig.store_name);
		$("#bodyId").css("background-image", "url("+data.AppConfig.bg_image+")");
		$("#bodyId").css("background-repeat", "no-repeat");
		$("#bodyId").css("background-position", "center");
		var menus = data.MenuInfo;
		$.each(menus, function(index, menu) {
			
			$('#employeeList').append('<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li ui-corner-top ui-btn-up-c"><div class="ui-btn-inner ui-li ui-corner-top"><div class="ui-btn-text"><a href="#" class="ui-link-inherit">' + menu.item_name + '</a></div><span class="ui-icon ui-icon-arrow-r"></span></div></li>');
		});
				
		$('#employeeList').listview('refresh');
	});
}
function ShowMenu() {
window.location.href='index.html';
}
function reloadMenu() {
window.location.href='showMenu.html';
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

	if(states[networkState] == 'Unknown connection' || states[networkState] == 'No network connection') {
		alert('Connection type: ' + states[networkState]);
		return false;
	} else {
		alert('Connection type: ' + states[networkState]);
		return true;
	}
}