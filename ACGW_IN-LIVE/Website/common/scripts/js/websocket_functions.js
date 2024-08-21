var websocketConnectionAttempt = 0;

function ConnectToWebsocketServer() {
	websocketConnectionAttempt ++;
	websocketConnection = new WebSocket('ws://'+login_profile.domain_name+':'+login_profile.ws_portno);
	
	websocketConnection.onopen = function() {
		console.log("connected");
	};
	
	websocketConnection.onmessage = function(event) {
		if (event.data == "SEND SESSION DETAILS") {
			SendSessionDetails();
		}
		else if (event.data == "SEND YOUR LOCATION") {
			SendGeolocation();
		}
		console.log(event);
	};
	
	websocketConnection.onerror = function(event) {
	console.log("error");
		$.post(login_profile.protocol + "//" + login_profile.domain_name + ":90" + "/NotifyWebSocketException.aspx");
		if (websocketConnectionAttempt < 3) {
			ConnectToWebsocketServer();
		}
	}; 

	websocketConnection.onclose = function(event) {
		console.log("close");
	};
}

function SendGeolocation() {
	navigator.geolocation.getCurrentPosition(function(position) {
		var geolocationMessage = "<message><type>GeolocationDetails</type><content>"
		geolocationMessage += "<companyID>" + login_profile.client_id + "</companyID>";
		geolocationMessage += "<countryCode>" + login_profile.country_code + "</countryCode>";
		geolocationMessage += "<employeeID>" + login_profile.emp_id + "</employeeID>";
		geolocationMessage += "<employeeName>" + login_profile.title + ". " + login_profile.first_name + " " + login_profile.middle_name + " " + login_profile.last_name + "</employeeName>";
		geolocationMessage += "<latitude>" + parseFloat(position.coords.latitude).toFixed(7) + "</latitude>";
		geolocationMessage += "<longitude>" + parseFloat(position.coords.longitude).toFixed(7) + "</longitude>";
		geolocationMessage += "</content></message>";
		
		websocketConnection.send(geolocationMessage);
	});
}

function SendSessionDetails() {
	var sessionDetailsMessage = "<message><type>SessionDetails</type><content>";
	sessionDetailsMessage += "<companyID>" + login_profile.client_id + "</companyID>";
	sessionDetailsMessage += "<countryCode>" + login_profile.country_code + "</countryCode>";
	sessionDetailsMessage += "<userID>" + login_profile.user_id + "</userID>";
	sessionDetailsMessage += "<sessionID>" + login_profile.guid_val + "</sessionID>";
	sessionDetailsMessage += "<device>" + login_profile.device + "</device>";
	sessionDetailsMessage += "</content></message>";
	
	websocketConnection.send(sessionDetailsMessage);
}