function SetTitle()
{
  $(document).attr('title','SIS - Sales Invoicing system');
}
function SetHeader()
{
	var header_html_snippet;
	
	if (login_profile.last_login_date != "")			
		header_html_snippet = '<h1 class="left1"><a href="index.html"><img src="/common/images/mservice_logo.png" alt="SIS"></a></h1><p class="right1"><label class="lbl" id="welcome">Welcome</label> #=title# #= first_name # | <label class="lbl" id="last_visit">Last Visited</label> : #= kendo.toString(new Date(parseInt(login_profile.last_login_date.substr(0,4)), parseInt(login_profile.last_login_date.substr(5,2)) - 1, parseInt(login_profile.last_login_date.substr(8,2)), parseInt(login_profile.last_login_hour), parseInt(login_profile.last_login_minute)),cultureInfo.calendar.patterns.g) # |  <label class="lbl" id="today">Today</label> : #= kendo.toString(new Date(), "d") # | [ <span><img id="head_notification" src="../images/Android_notifications_24.png"></img><span class="notification_count_bubble"></span> </span> ] | [ <span> <a id="head_logout" href=""><label class="lbl"  id="logout">Logout</label></a> </span> ]</p><div id="notification_child"/>';
	else
		header_html_snippet = '<h1 class="left"><a href="index.html"><img src="/common/images/mservice_logo.png" alt="SIS"></a></h1><p class="right"><label id="welcome">Welcome</label> #= title # #= first_name # |  <label id="today">Today</label> : #= kendo.toString(new Date(parseInt(current_date.substr(0,4)), parseInt(current_date.substr(5,2)) - 1, parseInt(current_date.substr(8,2))), "d") # | [ <span>  <div id="notification_child"/></span> ] | [ <span> <a id="head_logout" href=""><label id="logout">Logout</label></a> </span> ]</p><img id="head_notification" src="../images/Android_notifications_24.png"></img><span class="notification_count_bubble"></span>';
	return header_html_snippet;						
}
function SetFooter()
{
	var footer_html_snippet = '<div class="inside"><p class="left">&copy; All Rights Reserved. Powered by Selfservit</p><p class="right">SIS</p></div>';
	return footer_html_snippet;		
}