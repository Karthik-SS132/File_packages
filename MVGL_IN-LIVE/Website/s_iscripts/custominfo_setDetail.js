/* 
 * This file contains invocation code snippets for executing the API operation 'setDetail'.
 * These code snippets have been organized as seperate functions for preparing API request, invoking API and processing API response.
 * Include reference to this snippet file in the html page or javascript file from where the API operation 'setDetail' would be invoked.
 * Substitute USER CONTROL tokens in this file, with the corresponding user control references of the html page.
 * Substitute COLNO tokens in this file, with the column numbers of the respective html tables to which various list segment data values are bound.
 */

//A shortcut to store 'this' object represented by 'var common_modules_custominfo_setDetail'
//Used for scoping methods of this object when they are invoked in a callback context
var _this;
var common_modules_custominfo_setDetail = {
    /*
     * Resource: custominfo
     * Description: Save Custom Info Detail
     * Http verb: POST
     * Request format: JSON
     * Response format: JSON
     * Requires authorization: No
     */
    invokeAPI: function (save_manage_custominfo_object)
    {
        _this = this;
		_this.returnValue = {};
        var requestdata = _this.prepareAPIRequest(save_manage_custominfo_object);
        
        var contentType = "application/json";
        var responseFormat = "json";
        var targetURL = WebAPIProxy.getWebserverpath() + "api/common_modules/save_manage_custom_info";
        
        WebAPIProxy.invokeAPI("POST", targetURL, requestdata, contentType, responseFormat, null, _this.processAPIResponseHandler);
        return _this.returnValue;
    },
    
    
    //Code for preparing input data for the api setDetail
    /* 
     * In the following code snippet, the code to get the user control values, viz., WebAPIProxy.JSONEncode, assumes 
     * that the user control values need to be json-encoded before forming the API request. If the values are 
     * already encoded while being read from the user controls, then the function WebAPIProxy.JSONEncode is not needed 
     * and the values as obtained from the controls must be directly used for forming the API request.
     */
    prepareAPIRequest: function (save_manage_custominfo_object)
    {
        var request;
        request = "{";
        
        //Processing context segment
        var context= WebAPIProxy.getContext();
        request = request + '"context" : {';
        if(context != null && context.hasOwnProperty("sessionId"))
            request += '"sessionId" : "' + context.sessionId + '",';
        if(context != null && context.hasOwnProperty("userId"))
            request += '"userId" : "' + context.userId + '",';
        if(context != null && context.hasOwnProperty("client_id"))
            request += '"client_id" : "' + context.client_id + '",';
        if(context != null && context.hasOwnProperty("locale_id"))
            request += '"locale_id" : "' + context.locale_id + '",';
        if(context != null && context.hasOwnProperty("country_code"))
            request += '"country_code" : "' + context.country_code + '",';
        
        //Processing inputparam_header segment
        request = request + '"inputparam_header" : {';
        request = request + '"p_custom_info_code" : "' + WebAPIProxy.JSONEncode(save_manage_custominfo_object.p_custom_info_code) + '"';  // String
        request += ',';
        request = request + '"p_custom_info_ref_no1" : "' + WebAPIProxy.JSONEncode(save_manage_custominfo_object.p_custom_info_ref_no1) + '"';  // Unicode string
        request += ',';
        request = request + '"p_custom_info_ref_no2" : "' + WebAPIProxy.JSONEncode(save_manage_custominfo_object.p_custom_info_ref_no2) + '"';  // Unicode string
        request += ',';
        request = request + '"p_inputparam_header_xml" : "' + WebAPIProxy.JSONEncode(save_manage_custominfo_object.p_inputparam_header_xml) + '"';  // Unlimited unicode string
        request += ',';
        request = request + '"p_rec_timestamp" : "' + WebAPIProxy.JSONEncode(save_manage_custominfo_object.p_rec_timestamp) + '"';  // UniqueIdentifier string
        request += ',';
        request = request + '"p_save_mode" : "' +WebAPIProxy.JSONEncode(save_manage_custominfo_object.p_save_mode) + '"';  // String
        request = request + "},";
        
        //Processing inputparam_detail segment
        //Here USER CONTROL refers to control from where dataitems of segment ('inputparam_detail') should be bound
        var inputparam_detailControl = 'USER CONTROL';
        var isFirstinputparam_detailRowProcessed = false;
        request = request + '"inputparam_detail" : [';
        for (var inputparam_detaili = 0; inputparam_detaili < save_manage_custominfo_object.inputparam_detail.length; inputparam_detaili++)
        {
            if(isFirstinputparam_detailRowProcessed)
                request = request + ',';
            else
                isFirstinputparam_detailRowProcessed = true;
            
            request = request + '{';
            request = request + '"p_sl_no" : ' + WebAPIProxy.JSONEncode(save_manage_custominfo_object.inputparam_detail[inputparam_detaili].p_sl_no);  // Byte: 0 to 255
            request += ',';
            request = request + '"p_inputparam_detail_xml" : "' + WebAPIProxy.JSONEncode(save_manage_custominfo_object.inputparam_detail[inputparam_detaili].p_inputparam_detail_xml) + '"';  // Unlimited unicode string
            request += ',';
            request = request + '"p_crud_ind" : "' + WebAPIProxy.JSONEncode(save_manage_custominfo_object.inputparam_detail[inputparam_detaili].p_crud_ind) + '"';  // String
            request = request + '}';
        }
        request = request + "]";
        request = request + "}";
        request = request + "}";
        return request;
		
    },
    
    /**************************************************************************************************************************/
    /************************************************* PROCESSING RESPONSE ****************************************************/
    /**************************************************************************************************************************/
    /*
     * Response handler function of API operation 'setDetail'
     */
    processAPIResponseHandler: function (responseJSON, textStatus)
    {
        if(textStatus == "success")
        {
            if (responseJSON.ApplicationException != null)
            {
                //Response contains error
                var errorNumber = "", errorDescription = "";
                
                var exception = responseJSON.ApplicationException;
                errorDescription = exception.errorDescription;
                
                if (exception.errorNumber != null)
                    errorNumber = exception.errorNumber;
                if (errorNumber != "")
                    errorNumber += ": ";
                alert(errorNumber + errorDescription);
                return false;
            }
            else
            {
                try {
                    _this.bindAPIResponseToUserControl(responseJSON);
                }
                catch (e) {
                    alert(e.message);
                    return false;
                }
            }
        }
        else
        {
            alert('Error encountered during API execution. ' + responseJSON);
        }
    },
    
    //Code for processing response data from the API operation 'setDetail'
    bindAPIResponseToUserControl: function (responseJSON)
    {
         var outcontext = responseJSON.outputparam;
		
		//var outoutputparam = outcontext.p_update_status;
        _this.returnValue.update_status = outcontext.p_update_status;   //p_update_status
    }
};