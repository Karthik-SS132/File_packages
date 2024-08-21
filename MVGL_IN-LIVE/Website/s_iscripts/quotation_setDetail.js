/* 
 * This file contains invocation code snippets for executing the API operation 'setDetail'.
 * These code snippets have been organized as seperate functions for preparing API request, invoking API and processing API response.
 * Include reference to this snippet file in the html page or javascript file from where the API operation 'setDetail' would be invoked.
 * Substitute USER CONTROL tokens in this file, with the corresponding user control references of the html page.
 * Substitute COLNO tokens in this file, with the column numbers of the respective html tables to which various list segment data values are bound.
 */

//A shortcut to store 'this' object represented by 'var salesinvoice_quotation_setDetail'
//Used for scoping methods of this object when they are invoked in a callback context
var _this;
var salesinvoice_quotation_setDetail = {
    /*
     * Resource: quotation
     * Description: Save Quotation
     * Http verb: POST
     * Request format: JSON
     * Response format: JSON
     * Requires authorization: No
     */
    invokeAPI: function (save_manage_quotation_object)
    {
        _this = this;
		_this.returnValue = {};
        var requestdata = _this.prepareAPIRequest(save_manage_quotation_object);
        
        var contentType = "application/json";
        var responseFormat = "json";
        var targetURL = WebAPIProxy.getWebserverpath() + "api/salesinvoice/save_manage_quotation";
        
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
    prepareAPIRequest: function (save_manage_quotation_object)
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
        request = request + '"p_txn_ref_no" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.p_txn_ref_no) + '"';  // Unicode string
        request += ',';
        request = request + '"p_txn_header_coref_xml" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.p_txn_header_coref_xml) + '"';  // Unlimited unicode string
        request += ',';
        request = request + '"p_txn_header_udf_xml" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.p_txn_header_udf_xml) + '"';  // Unlimited unicode string
        request += ',';
        request = request + '"p_rec_timestamp" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.p_rec_timestamp) + '"';  // UniqueIdentifier string
        request += ',';
        request = request + '"p_save_mode" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.p_save_mode) + '"';  // String
        request = request + "},";
        
        //Processing inputparam_detail1 segment
        //Here USER CONTROL refers to control from where dataitems of segment ('inputparam_detail1') should be bound
        var inputparam_detail1Control = 'USER CONTROL';
        var isFirstinputparam_detail1RowProcessed = false;
        request = request + '"inputparam_detail1" : [';
        for (var inputparam_detail1i = 0; inputparam_detail1i < save_manage_quotation_object.inputparam_detail1.length; inputparam_detail1i++)
        {
            if(isFirstinputparam_detail1RowProcessed)
                request = request + ',';
            else
                isFirstinputparam_detail1RowProcessed = true;
            
            request = request + '{';
            request = request + '"p_txn_detail1_sl_no" : ' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail1[inputparam_detail1i].p_txn_detail1_sl_no);  // Byte: 0 to 255
            request += ',';
            request = request + '"p_txn_detail1_coref_xml" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail1[inputparam_detail1i].p_txn_detail1_coref_xml) + '"';  // Unlimited unicode string
            request += ',';
            request = request + '"p_txn_detail1_udf_xml" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail1[inputparam_detail1i].p_txn_detail1_udf_xml) + '"';  // Unlimited unicode string
            request += ',';
            request = request + '"p_txn_detail1_crud_ind" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail1[inputparam_detail1i].p_txn_detail1_crud_ind) + '"';  // String
            request = request + '}';
        }
        request = request + "],";
        
        //Processing inputparam_detail2 segment
        //Here USER CONTROL refers to control from where dataitems of segment ('inputparam_detail2') should be bound
        var inputparam_detail2Control = 'USER CONTROL';
        var isFirstinputparam_detail2RowProcessed = false;
        request = request + '"inputparam_detail2" : [';
        for (var inputparam_detail2i = 0; inputparam_detail2i < save_manage_quotation_object.inputparam_detail2.length; inputparam_detail2i++)
        {
            if(isFirstinputparam_detail2RowProcessed)
                request = request + ',';
            else
                isFirstinputparam_detail2RowProcessed = true;
            
            request = request + '{';
            request = request + '"p_txn_detail2_sl_no" : ' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail2[inputparam_detail2i].p_txn_detail2_sl_no);  // Byte: 0 to 255
            request += ',';
            request = request + '"p_txn_detail2_coref_xml" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail2[inputparam_detail2i].p_txn_detail2_coref_xml) + '"';  // Unlimited unicode string
            request += ',';
            request = request + '"p_txn_detail2_udf_xml" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail2[inputparam_detail2i].p_txn_detail2_udf_xml) + '"';  // Unlimited unicode string
            request += ',';
            request = request + '"p_txn_detail2_crud_ind" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail2[inputparam_detail2i].p_txn_detail2_crud_ind) + '"';  // String
            request = request + '}';
        }
        request = request + "],";
        
        //Processing inputparam_detail3 segment
        //Here USER CONTROL refers to control from where dataitems of segment ('inputparam_detail3') should be bound
        var inputparam_detail3Control = 'USER CONTROL';
        var isFirstinputparam_detail3RowProcessed = false;
        request = request + '"inputparam_detail3" : [';
        for (var inputparam_detail3i = 0; inputparam_detail3i < save_manage_quotation_object.inputparam_detail3.length; inputparam_detail3i++)
        {
            if(isFirstinputparam_detail3RowProcessed)
                request = request + ',';
            else
                isFirstinputparam_detail3RowProcessed = true;
            
            request = request + '{';
            request = request + '"p_txn_detail3_sl_no" : ' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail3[inputparam_detail3i].p_txn_detail3_sl_no);  // Byte: 0 to 255
            request += ',';
            request = request + '"p_txn_detail3_coref_xml" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail3[inputparam_detail3i].p_txn_detail3_coref_xml) + '"';  // Unlimited unicode string
            request += ',';
            request = request + '"p_txn_detail3_udf_xml" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail3[inputparam_detail3i].p_txn_detail3_udf_xml) + '"';  // Unlimited unicode string
            request += ',';
            request = request + '"p_txn_detail3_crud_ind" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail3[inputparam_detail3i].p_txn_detail3_crud_ind) + '"';  // String
            request = request + '}';
        }
        request = request + "],";
        
        //Processing inputparam_detail4 segment
        //Here USER CONTROL refers to control from where dataitems of segment ('inputparam_detail4') should be bound
        var inputparam_detail4Control = 'USER CONTROL';
        var isFirstinputparam_detail4RowProcessed = false;
        request = request + '"inputparam_detail4" : [';
        for (var inputparam_detail4i = 0; inputparam_detail4i < save_manage_quotation_object.inputparam_detail4.length; inputparam_detail4i++)
        {
            if(isFirstinputparam_detail4RowProcessed)
                request = request + ',';
            else
                isFirstinputparam_detail4RowProcessed = true;
            
            request = request + '{';
            request = request + '"p_txn_detail4_sl_no" : ' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail4[inputparam_detail4i].p_txn_detail4_sl_no);  // Byte: 0 to 255
            request += ',';
            request = request + '"p_txn_detail4_coref_xml" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail4[inputparam_detail4i].p_txn_detail4_coref_xml) + '"';  // Unlimited unicode string
            request += ',';
            request = request + '"p_txn_detail4_udf_xml" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail4[inputparam_detail4i].p_txn_detail4_udf_xml) + '"';  // Unlimited unicode string
            request += ',';
            request = request + '"p_txn_detail4_crud_ind" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail4[inputparam_detail4i].p_txn_detail4_crud_ind) + '"';  // String
            request = request + '}';
        }
        request = request + "],";
        
        //Processing inputparam_detail5 segment
        //Here USER CONTROL refers to control from where dataitems of segment ('inputparam_detail5') should be bound
        var inputparam_detail5Control = 'USER CONTROL';
        var isFirstinputparam_detail5RowProcessed = false;
        request = request + '"inputparam_detail5" : [';
        for (var inputparam_detail5i = 0; inputparam_detail5i < save_manage_quotation_object.inputparam_detail5.length; inputparam_detail5i++)
        {
            if(isFirstinputparam_detail5RowProcessed)
                request = request + ',';
            else
                isFirstinputparam_detail5RowProcessed = true;
            
            request = request + '{';
            request = request + '"p_txn_detail5_sl_no" : ' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail5[inputparam_detail5i].p_txn_detail5_sl_no);  // Byte: 0 to 255
            request += ',';
            request = request + '"p_txn_detail5_coref_xml" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail5[inputparam_detail5i].p_txn_detail5_coref_xml) + '"';  // Unlimited unicode string
            request += ',';
            request = request + '"p_txn_detail5_udf_xml" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail5[inputparam_detail5i].p_txn_detail5_udf_xml) + '"';  // Unlimited unicode string
            request += ',';
            request = request + '"p_txn_detail5_crud_ind" : "' + WebAPIProxy.JSONEncode(save_manage_quotation_object.inputparam_detail5[inputparam_detail5i].p_txn_detail5_crud_ind) + '"';  // String
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