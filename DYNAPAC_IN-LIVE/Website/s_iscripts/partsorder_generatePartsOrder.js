/* 
 * This file contains invocation code snippets for executing the API operation 'generatePartsOrder'.
 * These code snippets have been organized as seperate functions for preparing API request, invoking API and processing API response.
 * Include reference to this snippet file in the html page or javascript file from where the API operation 'generatePartsOrder' would be invoked.
 * Substitute USER CONTROL tokens in this file, with the corresponding user control references of the html page.
 * Substitute COLNO tokens in this file, with the column numbers of the respective html tables to which various list segment data values are bound.
 */

//A shortcut to store 'this' object represented by 'var salesinvoice_partsorder_generatePartsOrder'
//Used for scoping methods of this object when they are invoked in a callback context
var _this;
var salesinvoice_partsorder_generatePartsOrder = {
    /*
     * Resource: partsorder
     * Description: Generate Parts Order
     * Http verb: POST
     * Request format: JSON
     * Response format: JSON
     * Requires authorization: No
     */
    invokeAPI: function (generate_parts_order_document_object)
    {
        _this = this;
		_this.returnValue = {};
        var requestdata = _this.prepareAPIRequest(generate_parts_order_document_object);
        
        var contentType = "application/json";
        var responseFormat = "json";
        var targetURL = WebAPIProxy.getWebserverpath() + "/api/salesinvoice/generate_parts_order_document";
        
        WebAPIProxy.invokeAPI("POST", targetURL, requestdata, contentType, responseFormat, null, _this.processAPIResponseHandler);
        return _this.returnValue;
    },
    
    
    //Code for preparing input data for the api generatePartsOrder
    /* 
     * In the following code snippet, the code to get the user control values, viz., WebAPIProxy.JSONEncode, assumes 
     * that the user control values need to be json-encoded before forming the API request. If the values are 
     * already encoded while being read from the user controls, then the function WebAPIProxy.JSONEncode is not needed 
     * and the values as obtained from the controls must be directly used for forming the API request.
     */
    prepareAPIRequest: function (generate_parts_order_document_object)
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
        
        //Processing inputparam segment
        request = request + '"inputparam" : {';
        request = request + '"p_parts_order_reason_code" : "' + WebAPIProxy.JSONEncode(generate_parts_order_document_object.p_parts_order_reason_code) + '"';  // Unicode string
        request += ',';
        request = request + '"p_parts_order_reason_ref_no" : "' + WebAPIProxy.JSONEncode(generate_parts_order_document_object.p_parts_order_reason_ref_no) + '"';  // Unicode string
        request = request + "}";
        request = request + "}";
        request = request + "}";
        return request;
    },
    
    /**************************************************************************************************************************/
    /************************************************* PROCESSING RESPONSE ****************************************************/
    /**************************************************************************************************************************/
    /*
     * Response handler function of API operation 'generatePartsOrder'
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
    
    //Code for processing response data from the API operation 'generatePartsOrder'
    bindAPIResponseToUserControl: function (responseJSON)
    {
        //'context' segment has been excluded from API response
        
        //Processing segment - outputparam_header
		
		 var outoutputparam_header = responseJSON.outputparam_header;
		
        _this.returnValue.update_status = outoutputparam_header.p_update_status;   //p_update_status		
		_this.returnValue.parts_order_no = outoutputparam_header.p_parts_order_no;   //p_parts_order_no
			
    }
};
