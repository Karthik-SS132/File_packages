/* Load employees on the page */
function LoadEmployees()
{
	employee_list_xml = loadXMLString(GetCurrentlyRunningShiftEmployeeList());
	var employee_list_xsl=loadXSLDoc("./employee_login",login_profile.client_id,login_profile.country_code);
	if (window.ActiveXObject)
	{
		if (login_profile.device == 'iswinOS')
		{
			ex = executeService_transform_xml_to_html(employee_list_xml, "./employee_login.xsl");
		}
		else
		{
			ex=employee_list_xml.transformNode(employee_list_xsl);
		}
		$("#employee_list_ul").html(ex);
	}
	else if(document.implementation && document.implementation.createDocument)
	{
		if (login_profile.device == 'Android' && (login_profile.opsys_version == '1.x' || login_profile.opsys_version == '2.x') )
		{
			resultDocument = executeService_transform_xml_to_html(employee_list_xml, "./employee_login.xsl");	
		}
		else
		{
			xsltProcessor=new XSLTProcessor();
			xsltProcessor.importStylesheet(employee_list_xsl);
			resultDocument = xsltProcessor.transformToFragment(employee_list_xml,document);
		}
		$("#employee_list_ul").html(resultDocument);
	}
	
	$('#employee_list_ul').listview('refresh');
	$('form').hide();
	var cur_date_split = getCurrentDate().split(' ')[0].split('-');
	var current_date = cur_date_split[2]+'/'+cur_date_split[1]+'/'+cur_date_split[0]
	$('#emp_login_date').text(current_date);
}
/* Return Currently Running Shift Employee List */
function GetCurrentlyRunningShiftEmployeeList() {
	var employee_list_Xml = "<list>";
	for(var i=0;i<shift_profile.length;i++)
	{
		if(shift_profile[i].state == "S")
		{
			for(var j=0;j<employee_list.documentElement.childNodes.length;j++)
			{
				if(shift_profile[i].shift_no == employee_list.documentElement.childNodes[j].childNodes[0].childNodes[0].nodeValue)
				{
					employee_list_Xml += XMLtoString(employee_list.documentElement.childNodes[j]);
				}
			}
		}
	}
	employee_list_Xml += "</list>";
	return employee_list_Xml;
}
/* Get Employee List from the server every 10 minute */
function RefreshEmployeeList() {

}
/* Start Shift */
function ShiftStart(s_no) {
	Shift_No = s_no;
	return executeService_update_shift_start();
}

/* Close Shift */
function ShiftEnd(s_no) {
	Shift_No = s_no;
	return executeService_update_shift_finish();
}

/* Automatically call shift start and shift end process ,it will run every one minute */
function ShiftHandler() {
    for (var i = 0; i < shift_profile.length; i++) {
        if (shift_profile[i].state == "NS") {
            var current_date = new Date();

            var from = new Date(shift_profile[i].from_date);
            from.setHours(shift_profile[i].from_hour, shift_profile[i].from_minute, 0, 0);

            var to = new Date(shift_profile[i].to_date);
            to.setHours(shift_profile[i].to_hour, shift_profile[i].duration_minutes, 0, 0);

            if (from <= current_date && to >= current_date) {
                if (ShiftStart(shift_profile[i].shift_no)) {
                    shift_profile[i].state = "S";
                }
            } else if (current_date >= to) {
                shift_profile[i].state = "E";
            }
        } else if (shift_profile[i].state == "S") {
            if (current_date >= to) {
                if (ShiftEnd(shift_profile[i].shift_no)) {
                    shift_profile[i].state = "C";
                }
            }
        }
    }

    var shift_completed_ind = 0;
    for (var j = 0; j < shift_profile.length; j++) {
        if (shift_profile[j].state == "S" || shift_profile[j].state == "NS") {
            shift_completed_ind = 1;
			break;
        }
    }
	
    if (shift_completed_ind == 0) {
        GetEmployeeList();
    }
}
/* Retrieve Employee And Shift List from the server */
function GetEmployeeList() {
    shiftNo = 0;
    var ws_profile = {};
    employee_list = "";

    ws_profile = executeService_retrieve_ws_employee_list();
    if (ws_profile != 1) {
        employee_list = loadXMLString(ws_profile.emp_details);
        var photo_ref = employee_list.getElementsByTagName("photo_reference");
        for (var i = 0; i < photo_ref.length; i++) {
            photo_ref[i].childNodes[0].nodeValue = GetFileSystemPath() + "/mservice/workshop/images/user/" + photo_ref[i].childNodes[0].nodeValue.substr(photo_ref[i].childNodes[0].nodeValue.lastIndexOf('/') + 1);
        }

        var shiftxml = loadXMLString(ws_profile.shift_details);
        var s_de = '[';
        for (var i = 0; i < shiftxml.documentElement.childNodes.length; i++) {
            if (i > 0) s_de += ',';
            var sc_de = '{';
            for (var j = 0; j < shiftxml.documentElement.childNodes[i].childNodes.length; j++) {
                if (j > 0) sc_de += ',';
                sc_de += '"' + shiftxml.documentElement.childNodes[i].childNodes[j].nodeName + '"' + ':' + '"' + shiftxml.documentElement.childNodes[i].childNodes[j].childNodes[0].nodeValue + '"';
            }
            sc_de += ',"state":"NS"';
            sc_de += '}';
            s_de += sc_de;
        }
        s_de += ']';
        shift_profile = $.parseJSON(s_de);
    }
}
// Function to get details on the device, browser details of the user 
function getUserAccessInfo() //used ufra
{
	var userAgent = navigator.userAgent;
	var isiPad=userAgent.match(/(iPad)/i);
	var isiPhone=userAgent.match(/(iPhone)/i);
	var isAndroid=userAgent.match(/(Android)/i);
	var isiPod=userAgent.match(/(iPod)/i);
	var iswebOS=userAgent.match(/(webOS)/i);
	var iswinOS=userAgent.match(/(Windows Phone OS)/i);

	login_profile.useragent = navigator.userAgent;
	
	if (isiPad) login_profile.device = 'iPad';
	else if (isiPhone) login_profile.device = 'iPhone';
	else if (isAndroid) 
	{
		login_profile.device = 'Android';
		if (userAgent.match(/(Android 1.)/i)) login_profile.opsys_version = '1.x';
		if (userAgent.match(/(Android 2.)/i)) login_profile.opsys_version = '2.x';
		if (userAgent.match(/(Android 3.)/i)) login_profile.opsys_version = '3.x';
		if (userAgent.match(/(Android 4.)/i)) login_profile.opsys_version = '4.x';
	}
	else if (isiPod) login_profile.device = 'iPod';
	else if (iswebOS) login_profile.device = 'webOS';
	else if(iswinOS) login_profile.device = 'iswinOS';
	else login_profile.device = 'Desktop';
 
	//note: userAgent in IE7 WinXP returns: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727)

	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
	{ 
		//test for MSIE x.x;
		var ieversion=new Number(RegExp.$1); // capture x.x portion and store as a number
		if (ieversion>=9)
			login_profile.browser= "IE9 or above";
		else if (ieversion>=8)
			login_profile.browser= "IE8 or above";
		else if (ieversion>=7)
			login_profile.browser = "IE7.x";
		else if (ieversion>=6)
			login_profile.browser = "IE6.x";
		else if (ieversion>=5)
			login_profile.browser = "IE5.x";
}
else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
{
 //Note: userAgent in FF2.0.0.13 WinXP returns: Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13

 //test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
	var ffversion=new Number(RegExp.$1); // capture x.x portion and store as a number
	if (ffversion>=5)
      login_profile.browser = "FF 5.x or above";
	else if (ffversion>=4)
		login_profile.browser = "FF 4.x or above";
	else if (ffversion>=3)
		login_profile.browser = "FF 3.x or above";
	else if (ffversion>=2)
		login_profile.browser = "FF 2.x";
	else if (ffversion>=1)
		login_profile.browser = "FF 1.x";
}
else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent))
{
 //Note: userAgent in Opera9.24 WinXP returns: Opera/9.24 (Windows NT 5.1; U; en)
 //         userAgent in Opera 8.5 (identified as IE) returns: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1) Opera 8.50 [en]
 //         userAgent in Opera 8.5 (identified as Opera) returns: Opera/8.50 (Windows NT 5.1; U) [en]
	 //test for Opera/x.x or Opera x.x (ignoring remaining decimal places);
		var oprversion=new Number(RegExp.$1); // capture x.x portion and store as a number
		if (oprversion>=10)
			login_profile.browser = "Opera 10.x or above";
		else if (oprversion>=9)
			login_profile.browser = "Opera 9.x";
		else if (oprversion>=8)
			login_profile.browser = "Opera 8.x";
		else if (oprversion>=7)
			login_profile.browser = "Opera 7.x";
}

}
function getCurrentDate() // used ufra
{
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();
	var hour = today.getHours();
	var minute = today.getMinutes();
	var second = today.getSeconds();
	if(date<10){date = "0"+date;}
	if(month<10){month = "0"+month;}
	if(hour<10){hour = "0"+hour;}
	if(minute<10){minute = "0"+minute;}

	return year+'-'+month+'-'+date+' '+hour+":"+minute+":"+second;
}
function userSessionLogout() // used ufra
{
	var today = new Date();
	var date = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();
	var hour = today.getHours();
	var minute = today.getMinutes();
	if(date<10){date = "0"+date;}
	if(month<10){month = "0"+month;}
	if(hour<10){hour = "0"+hour;}
	if(minute<10){minute = "0"+minute;}
			
	logout_date=year+"-"+month+"-"+date;
	logout_hour=hour;
	logout_minute=minute;
				
	$.cachedScript("../../s_iscripts/signout_user.js")
		.done(function(script, textStatus) {
			var logoutSuccess=executeService_signout_user();
			if (logoutSuccess == 0)
			{
				window.location.href = "../../index.html"+"?"+"client_id="+login_profile.client_id;
				initSessionContext();
				alert('You have been successfully logged out');
			}
		});
}
function initSessionContext() // used ufra
{
  	login_profile = new Object();
	login_profile.user_id = "";
	login_profile.title = "";
	login_profile.first_name = "";
	login_profile.middle_name = "";
	login_profile.last_name = "";
	login_profile.guid_val ="";
	login_profile.protocol ="";
	login_profile.client_id = ""; /* castrol, msvtest, schwingstetter, jcbmadurai */
	login_profile.app_mode = ""; /* MOBILE_NATIVE , MOBILE_BROWSER, WEB_BROWSER */
	login_profile.application_root = "";
	login_profile.domain_name = ""; /* eg. selfservit.net , mservice.in */
	login_profile.portno = ""; /* Default port 80 */
	login_profile.network_mode ="";  /*online or offline */
	login_profile.project_id = "";
	login_profile.locale_id = "";
	login_profile.country_code = "";
	login_profile.project_type = "";
	login_profile.software_product = "";
	login_profile.software_product_version ="";
	login_profile.software_product_subversion = "";
	login_profile.timezone_id = "";
	login_profile.location_code = "";
	login_profile.currency_code = "";
	login_profile.last_login_date = "";
	login_profile.last_login_hour = "";
	login_profile.last_login_minute = "";
	login_profile.user_group_id = "";
	login_profile.photo_reference = "";
	login_profile.useragent = "";
	login_profile.device="";
	login_profile.opsys="";
	login_profile.opsys_version="";
	login_profile.browser="";
	login_profile.def_pwd_ind = "";
	login_profile.guid_val = '';
	login_profile.print_grid_header="";
	login_profile.print_datasource_list="";
	login_profile.section_data="";
	login_profile.file_upload_or_delete_status = 0;
	login_profile.upload_file_name = "";
	
	access_profile = new Object();
	access_profile.user_functional_access=[{
		parent_feature_group : "",
		child_feature_id_or_group : "",
		child_feature_id_or_group_ind : "",
		parent_group_display_label : "",
		parent_level_no : "",
		parent_display_order :"",
		child_feature_display_label : "",
		child_level_no : "",
		child_display_order : "",
		child_screen_id : "",
		channel_id : "",
		feature_access : "",
		add_access :"",
		edit_access : "",
		delete_access : "",
		view_access : "",
		export_access : "",
		print_access : "",
		import_access : "",
		menu_display_ind: ""
	}];
	
	access_profile.user_data_access=[{
		access_for_event : "",
		level1_code : "",
		level2_code : "",
		level3_code : "",
		level4_code : "",
		level5_code :"",
		location_code : "",
		request_category : "",
		request_type : ""
	}];
	
	access_profile.data_access_panel = [{
			access_to_info_type : "",
			org_level_no : "",
			org_level_code : "",
			location_code : "",
			request_category : "",
			request_type : ""
		}
	];
	
	job_profile = new Object();
	job_profile.job_id = "";
	job_profile.narration = "";
	job_profile.customer_name = "";
	job_profile.customer_location = "";
	job_profile.asset_no = "";
	job_profile.eqpt_desc = "";
	job_profile.template_id = "";
	
	jobtask_profile = new Object();
	jobtask_profile.task_id = "";
	
	project_profile = new Object();
	project_profile.project_id = "";
	project_profile.template_id = "";
	
	task_profile = new Object();
	task_profile.task_id = "";
	
	navigation_map = new Object();
	navigation_map = [];
	navigation_map.push({screenID: 'home', parentScreenID: 'home',DisplayLabel:"Home"});
	
	// This only accessible in web browser -Edited by gopi 22-05-13
	var web_browser = navigator.userAgent.match(/(webOS)/i); 
	
	if(web_browser)
	{
		Object.preventExtensions(login_profile);
		Object.preventExtensions(job_profile);                 
		Object.preventExtensions(jobtask_profile);                 
		Object.preventExtensions(navigation_map);
		Object.preventExtensions(access_profile);
		Object.preventExtensions(project_profile);
		Object.preventExtensions(data_access_profile);
	}
}

function isValidSession()
{

 var myRegExp = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}?/;
 
	if (login_profile.guid_val == '7e9c274d-1c4b-4234-9eec-4f90971f998b')
		return 1
	else
	{
		if  (myRegExp.test(login_profile.guid_val) == false)
			return 1;
		else
			return 0;
	}
	
}
function setCookie(exdays)
{
 var expdate = new Date();
 expdate.setTime(expdate.getTime()+(exdays*24*60*60*1000));
 var expires = "; expires="+expdate.toGMTString();
 
 var c_value = escape(client_id+'_'+document.getElementById('countrycode').value+'_'+document.getElementById('username').value);
 document.cookie="mptrak_credo=" + c_value + expires;
}

function getCookie()
{
 var i,x,y,ARRcookies=document.cookie.split(";");
 for (i=0;i<ARRcookies.length;i++)	
 {
	x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	x=x.replace(/^\s+|\s+$/g,"");
	if (x=="mptrak_credo")
	{
		cookie_values = y.split("_");
		cookie_companyid = cookie_values[0];
		cookie_countrycode = cookie_values[1];
		cookie_userid = cookie_values[2];
	}
  }
}
 
function checkCookie()
{
	getCookie();
	if (cookie_companyid != "")
	{
	document.getElementById('countrycode').value = cookie_countrycode; 
	document.getElementById('username').value = cookie_userid; 	
	}
}

function loadXMLDoc(dname)
{
	if (window.XMLHttpRequest)
	{
		xhttp=new XMLHttpRequest();
	}
	else
	{
		xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",dname,false);
	xhttp.send();
	return xhttp.responseXML;
}
	
function loadXMLString(xmlstring)
{
	var es_xmlstring =xmlstring.replace(/&/g, "&amp;");
	if (window.DOMParser)
	{
		var xmlDoc;
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(es_xmlstring,'text/xml');
	}
	else // IE
	{
		var xmlDoc;
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.loadXML(es_xmlstring);
	}
	return xmlDoc;
}

function XMLtoString(elem)
{
	var serialized;
	try 
	{
		// XMLSerializer exists in current Mozilla browsers
		serializer = new XMLSerializer();
		serialized = serializer.serializeToString(elem);
	} 
	catch (e) 
	{
		// Internet Explorer has a different approach to serializing XML
		serialized = elem.xml;
	}
		return serialized;
} 

function loadXSLDoc(dname, company_id, country_code) 
{
	if (window.XMLHttpRequest) 
	{
		xhttp = new XMLHttpRequest();
	} 
	else 
	{
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	/*xhttp.open("GET", dname + '_' + company_id + '_' + country_code + '.xsl', false);
	xhttp.send();
	if (xhttp.status == 0 || xhttp.status == 404) 
	{
		xhttp.open("GET", dname + '_' + company_id + '.xsl', false);
		xhttp.send();
		if (xhttp.status == 0 || xhttp.status == 404) 
		{*/
			xhttp.open("GET", dname + '.xsl', false);
			xhttp.send();
		/*}
	}*/
	return xhttp.responseXML;
}
function loadJSScripts(jsScripts)
{
	jsLoadSuccess = 0;

	for (jsScriptNo = 0; jsScriptNo < jsScripts.length; jsScriptNo++)
	{
		$.cachedScript(login_profile.protocol+'//'+window.location.host+'/'+jsScripts[jsScriptNo]).fail(function(jqxhr, settings, exception){
			jsLoadSuccess = 1;
			})

		if (jsLoadSuccess == 1)		break;
	};
	if (jsLoadSuccess == 1)
	{
		return 1;
	}
}
 function ConvertToOption(opt_arr) // used ufra
{
	var code_list_data = "<option value=''>Choose one...</option>";
	for(i=0; i<opt_arr.length; i++)
	{
		code_list_data += "<option value='"+ opt_arr[i].value +"'>"+ opt_arr[i].value+"-"+opt_arr[i].text+"</option>";
	}
	return code_list_data;
}
function lang_conversion()
{
	var language = 'ch-ch';
	
	if(language == 'ar-ar')
	{
		//document.body.direction = 'rtl';
		$.mobile.activePage[0].style.direction = 'rtl';
		/*for ul li right to left alignment
		$.mobile.activePage[0].children[1].childNodes[2].children[0].children[0].style.text-Align = 'right';*/
	}
	
	array=new Array();
	array[0]=new Array(2);
	counter=0;
	for(i=0;i<$.mobile.activePage[0].childNodes[3].children.length;i++)
	{
		if($.mobile.activePage[0].childNodes[3].children[i].localName == "label")
		{
			var v = $.mobile.activePage[0].childNodes[3].children[i].innerHTML;
			var v_id = $.mobile.activePage[0].childNodes[3].children[i].id;
			array[counter]=new Array();
			array[counter][0]=v;
			array[counter][1]=v_id;
			counter++;
		}
	}
	xml=loadXMLDoc("../xsl/mptrak_label_selfservit_lang.xml");
	//path="/Screens/ScreenName/LabelName[2]/language";
	for(i=0;i<array.length;i++)
	{
		path="//LabelName[@id=\'" + array[i][0]+ "\']/Language[@id=\'" + language + "\']";
		//code for IE
		if (window.ActiveXObject)
		{
			xml.setProperty("SelectionLanguage","XPath");
			var nodes=xml.selectNodes(path);
	
			for (i=0;i<nodes.length;i++)
			{
			//alert(nodes.length);//alert(nodes[i].childNodes[0].nodeValue);//document.write("<br />");
			}
		}
	// code for Mozilla, Firefox, Opera, etc.
		else if (document.implementation && document.implementation.createDocument)
		{
			var nodes=xml.evaluate(path, xml, null, XPathResult.ANY_TYPE,null);
			var result=nodes.iterateNext();
	
			while (result)
			{
				document.getElementById(array[i][1]).innerHTML=result.childNodes[0].nodeValue;
				result=nodes.iterateNext();
			}
		}
	}
}
function error_msg_lang_conversion()
{
	//$('#login_error_msg').show();
	xml=loadXMLDoc("../../s_iscripts/mptrak_label_selfservit_lang.xml");
	value_array=new Array();
	for(i=0;i<new_array.length;i++)
	{
		path="//LabelName[@id=\'" + 	new_array[i]+ "\']/Language[@id='ch-ch']";
		alert(path+' : path');
		//code for IE
		if (window.ActiveXObject)
		{
			xml.setProperty("SelectionLanguage","XPath");
			var nodes=xml.selectNodes(path);
	
			for (i=0;i<nodes.length;i++)
			{
				document.write("<br />");
			}
		}
		// code for Mozilla, Firefox, Opera, etc.
		else if (document.implementation && document.implementation.createDocument)
		{
			var nodes=xml.evaluate(path, xml, null, XPathResult.ANY_TYPE,null);	
			var result=nodes.iterateNext();
		
			while (result)
			{					   
				value_array[i]=result.childNodes[0].nodeValue;
				result=nodes.iterateNext();
			}
		}
	}
	return value_array;
}
/* DATA ENTRY RESTRICTION SECTION -- BEGIN */
function AllowAlphabetsOnly(e)
{
	var charCode = (e.which) ? e.which : event.keyCode;
	if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))
	{
		return true;
	}	
	return false;
}
function AllowAlphabetsAndSpaceOnly(e)
{
	var charCode = (e.which) ? e.which : event.keyCode;
	if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode == 32))
	{
		return true;
	}	
	return false;
}
function AllowNumbersOnly(e)
{
	var charCode = (e.which) ? e.which : event.keyCode;
	if ((charCode >= 48 && charCode <= 57))
	{
		return true;
	}	
	return false;
}
/* DATA ENTRY RESTRICTION SECTION -- END */

/* Mobile Validation - Begin*/
function jquery_mobile_validator()
{
	var no_of_input_fields = $.mobile.activePage.find(':input').length;
	for(var i=0; i<no_of_input_fields; i++)
	{
		if($.mobile.activePage.find(':input')[i].required == true)
		{
			if($.mobile.activePage.find(':input')[i].value == '')
			{
				alert('Please Fill All The Details.');
				return false;
			}
			else
			{
				return true;
			}
		}
	}
}
/* Mobile Validation - End*/

/* Mobile Mandatory Fields - Start*/
$(document).on('pageshow',function(){
	if(typeof $.mobile.activePage != 'undefined')
	{
		var no_of_input_fields = $.mobile.activePage.find(':input').length;
		for(var i=0; i<no_of_input_fields; i++)
		{
			if($.mobile.activePage.find(':input')[i].required == true)
			{
				//label_text = $.mobile.activePage.find(':input')[i].parentNode.previousSibling.innerHTML;
				label_text = $.mobile.activePage.find(':input')[i].labels[0].innerHTML;
				$.mobile.activePage.find(':input')[i].labels[0].innerHTML = label_text+' <span style="color:red;">*</span>';	//sets red star along with the label text
			}
		}
	}
	$(this).find('li').css('font-size','18px');
	$(this).find('.ui-dialog-contain').css({'font-size':'20px','font-weight':'bold'});
	$(this).find('.ui-dialog-contain').find('label').css({'font-size':'16px','font-weight':'bold'});
});
/* Mobile Mandatory Fields - End*/

function sign_out()
{
	//clearTimeout(logoutTime);
	
	var d = new Date();
	var D = new Date();
	var date = d.getDate();
	var month = d.getMonth()+1;
	var year = d.getFullYear();
	var hour = D.getHours();
	var minute = D.getMinutes();
	if(date<10){date = "0"+date}
	if(month<10){month = "0"+month}
	if(hour<10){hour = "0"+hour}
	if(minute<10){minute = "0"+minute}
	logout_date = year+"-"+month+"-"+date;
	logout_hour = hour;
	logout_minute = minute;
	
	executeService_signout_user();
	if(exit_ind == 'N')
	{
		$.mobile.changePage("../../workshop_login.html", {transition: "none" });
		//$.mobile.back();
	}
	else if(exit_ind == 'Y')
	{
		navigator.app.exitApp();
	}
}
$( document ).on( "pagebeforecreate pageload pagehide", function() {
    /*var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
        html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: 'loading..',
            textVisible: true,
            theme: theme,
            textonly: textonly,
            html: html
    });*/
	$('.ui-loader').css('display','block');
})
.on( "pagechange",function() {
    //$.mobile.loading( "hide" );
	$('.ui-loader').css('display','none');
})
.on("pageshow",function() {
	$('img').on('click',function()
	{
		$('.ui-loader').css('display','block');
		setTimeout(function(){$('.ui-loader').css('display','none');},2000);
		$.mobile.loadingMessage = 'loading...';
		$.mobile.showPageLoadingMsg();
	});
	$('a.ui-btn-inline').on('click',function()
	{
		$('.ui-loader').css('display','block');
		setTimeout(function(){$('.ui-loader').css('display','none');},2000);
		$.mobile.loadingMessage = 'loading...';
		$.mobile.showPageLoadingMsg();
	});
});
/*$(document).on("pagebeforecreate",function(event){
  alert("pagebeforecreate event fired!");
 timer +=' pgb4 create: '+ getCurrentDate().split(' ')[1].split(':')[2];
}); 
$(document).on("pagecreate",function(event){
  alert("pagecreate event fired!");
 timer += ' pagecreate: '+getCurrentDate().split(' ')[1].split(':')[2];
});
$(document).on("pageinit",function(event){
  alert("pageinit event fired!")
 timer +=' pageinit: '+ getCurrentDate().split(' ')[1].split(':')[2];
});
$(document).on("pageload",function(event,data){
  alert("pageload event fired!\nURL: " + data.url);
  timer +=' pageload: '+ getCurrentDate().split(' ')[1].split(':')[2];
});
$(document).on("pageloadfailed",function(event,data){
  alert("Sorry, requested page does not exist.");
  timer += ' pageloadfailed: '+getCurrentDate().split(' ')[1].split(':')[2];
});
$(document).on("pagebeforeshow",function(){ // When entering pagetwo
  alert("pagebeforeshow");
  timer += ' pagebeforeshow: '+getCurrentDate().split(' ')[1].split(':')[2];
});
$(document).on("pageshow",function(){
  alert("pageshow");
  timer +=' pageshow: '+ getCurrentDate().split(' ')[1].split(':')[2];
});
$(document).on("pagebeforehide",function(){ // When leaving pagetwo
  alert("pagebeforehide");
  timer +=' pagebeforehide: '+ getCurrentDate().split(' ')[1].split(':')[2];
});
$(document).on("pagehide",function(){
  alert("pagehide");
  timer +=' pagehide: '+ getCurrentDate().split(' ')[1].split(':')[2];
});
$( document ).on( "pagebeforechange", function() {
 alert("pagebefore change");
 timer += ' pagebeforechange: '+getCurrentDate().split(' ')[1].split(':')[2];
});
$( document ).on( "pagebeforeload", function() {
 alert("pagebefore load");
 timer += ' pagebeforeload: '+getCurrentDate().split(' ')[1].split(':')[2];
});
$( document ).on( "pagechange", function() {
 alert("pagechange");
 timer +=' pagechange: '+ getCurrentDate().split(' ')[1].split(':')[2];
});*/