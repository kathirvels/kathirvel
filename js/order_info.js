if(dataAppConfig==null || userData==null) {
	window.location.href='index.html';
}
if(orderId!=null) {
	if(bokord==null) {
		headerHtml('Confirmation');	
	} else {
		headerHtml('Order Details');	
	}
	$('#orderList').hide();
	showOrderinfo();
}else{
	headerHtml('Order History');	
	$('#placOtheOrdId').hide();
	$('#orderDetList').hide();
	getOrderList();
}

function getOrderList() {		
	var store = 'Mw';
	var order_id = null;
	var user_id = userData.user_data.userid;
	//$('#orderList').remove();		
	//alert(serviceURL+'orderdet/'+order_id+'/'+store);
	$.getJSON(serviceURL+'orderdet/'+order_id+'/'+store+'/'+user_id, function(data) {
		
		var orderDets = data.order;
		//alert(orderDets);
		$.each(orderDets, function(index, item) {
			
			$('#orderList').append('<li><a class="ui-btn ui-btn-icon-right ui-icon-carat-r" href="order_info.html?orderId='+item.order_id+'&bokord=view"  rel="external">'+(index+1)+'. Order Id:'+item.order_id+' Amount:'+item.total_amount+' Delivery Time:'+item.delivery_time+'</a></li>');
		}); 
		//$('#orderList').listview('refresh');
	});
}


function showOrderinfo() {	
	var store = 'Mw';
	var order_id = orderId;
	var user_id = userData.user_data.userid;
	//alert(serviceURL+'orderdet/'+order_id+'/'+store);
	$.getJSON(serviceURL+'orderdet/'+order_id+'/'+store+'/'+user_id, function(data) {
		//alert(resData.restaurant_name);
		var orderDets = data.order;
		$.each(orderDets, function(index, item) {
				if(bokord==null) {
					htmlData='<h2>Your order has been confirmed, details are below:</h2>';
				} else {
					htmlData='<h2>Your order details</h2>';
				}
				htmlData+=' <div class="clearfix infowarps">';
				
				
				htmlData+='<div class="row_div"><label>Confirm No </label>';
				htmlData+='<p class="info_right">'+item.order_id+'</p></div>';    
				
				htmlData+='<div class="row_div"><label>Meal Ready Time </label>';
				htmlData+='<p class="info_right">'+item.delivery_time+'</p></div>';    
				
				htmlData+='<div class="row_div"><label>Cost </label>';
				htmlData+='<p class="info_right">$ '+item.gross_total+'</p></div>';    
				
				
				
				htmlData+='</div>';
				
				htmlData+=' <div class="clearfix infowarps">';
				
				//htmlData+='<h2>'+resData.restaurant_name+'</h2>';  
				
				htmlData+='<div class="row_div"><h2>Location</h2></div>';
				htmlData+='<div class="row_div"><label>Address </label>';
				htmlData+='<p class="info_right">';
				htmlData+=resData.address_line1+'<br>  '+(resData.address_line2!="" ? resData.address_line2+'<br>' :"")+resData.suburb+'<br> '+resData.state+' <br> '+resData.postcode; 
				htmlData+='</p></div>';
				
				htmlData+='<div class="row_div"><label>Phone </label>  ';           
						   htmlData+='<p class="info_right"> '+resData.phone+'</p></div> ';
				
				
				htmlData+='<div class="row_div getdirect" >';
					htmlData+='<a href="restaurant_details.html" id="restMap" class="ui-btn" style="background: none repeat scroll 0 0 #00AB21;color:#fff" rel="external">Get Directions</a>';
				htmlData+='</div>';
				
				htmlData+='</div>';
				//htmlData+='<div class="clearfix"><a class="ui-lfloat ui-btn ui-btn-corner-all ui-shadow ui-btn-up-a" data-theme="a" rel="external" data-role="button" id="storeDirection" href=""><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Directions to store</span></span></a>        	</div>';
			
			/*htmlData='<h2 style="text-align:left; color:#ffffff;font-sze:22px;">Your order has been confirmed, details are below:</h2>';
			htmlData+='<div style="margin:20px 0 0 0;text-shadow:0;"><h4 style="color:#000; text-shadow:none;font-size:21px;">Order number: '+item.order_id+'</h4></div>';      
			
			htmlData+='<p class="itemp" style="text-shadow:none;">Meal Ready Time: '+item.delivery_time+'</p>';
			htmlData+='<div style="margin:20px 0;"><h4 class="itemp" style="text-shadow:none;"><strong>Cost:</strong> $ '+item.total_amount+'</h4><h4 class="itemp" style="text-shadow:none;"><strong>Payment Status:</strong>'+item.payment_status+'</h4></div>';
			htmlData+=' <div style="margin:20px 0;">
			
			<h4 class="itemp" style="text-shadow:none;">Store Name: '+dataAppConfig.AppConfig.store_name+'</h4>
			<h4 class="itemp" style="text-shadow:none;">Store Address: '+userData.addr_data.address+' , '+userData.addr_data.street+' '+userData.addr_data.city+' '+userData.addr_data.post_code+'</h4></div>';*/
			
			$('#orderDetList').html(htmlData);
		}); 
		
	window.localStorage.removeItem('hoursinfo');	
	window.localStorage.removeItem('holidaypercnt');
	window.localStorage.removeItem('minorderamt');
	});
}