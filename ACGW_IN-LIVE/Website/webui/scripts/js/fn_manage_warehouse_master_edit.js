var manage_warehouse_master_edit={constructScreen:function(){manage_warehouse_master_edit.variable.custom.datasource_1=mserviceUtilities.getTransportDataSource({applicationName:"mservice",serviceName:"retrieve_manage_warehouse_details",outputPath:false,inputParameter:{p_warehouse_id:"$manage_warehouse_master.variable.custom.selectedRecord.warehouse_id",},pageSize:10,schemaModel:true,screenID:"manage_warehouse_master_edit",dataSourceName:"datasource_1",processResponse:true,parse:manage_warehouse_master_edit.customRequirementHandler.dataSourceParse});manage_warehouse_master_edit.variable.custom.datasource_2=mserviceUtilities.getTransportDataSource({applicationName:"common_modules",serviceName:"validate_key_field",outputPath:"context/outputparam",pageSize:10,inputParameter:{p_screen_name:"'WAREHOUSEMASTER'",p_validation_field_1:"#manage_warehouse_master_edit_warehouse_id",p_validation_field_2:"",p_validation_field_3:"",p_validation_field_4:"",p_validation_field_5:"",p_validation_field_6:"",p_validation_field_7:"",p_validation_field_8:"",p_validation_field_9:"",p_validation_field_10:"",},screenID:"manage_warehouse_master_edit",});if((manage_warehouse_master.variable.custom.crudIndicator=="U")||(manage_warehouse_master.variable.custom.crudIndicator=="V")){manage_warehouse_master_edit.variable.custom.datasource_1.read();manage_warehouse_master_edit.variable.custom.org_level_no_defaultValueDescription=mserviceUtilities.getDescriptionForCode("ORGLEVELNO_LIST",manage_warehouse_master_edit.variable.custom.datasource_1_record.organogram_level_no,"");manage_warehouse_master_edit.variable.custom.org_level_code_defaultValueDescription=mserviceUtilities.getDescriptionForCode("ORGLEVELCODE_LIST",manage_warehouse_master_edit.variable.custom.datasource_1_record.organogram_level_code,"");manage_warehouse_master_edit.variable.custom.warehouse_head_employee_defaultValueDescription=mserviceUtilities.getDescriptionForCode("EMPLOYEE_DESC",manage_warehouse_master_edit.variable.custom.datasource_1_record.warehouse_head_employee,"");}},postConstruct:function(){if((manage_warehouse_master.variable.custom.crudIndicator=="A")&&(login_profile.dealer_code!="")){var warehouseId=login_profile.dealer_org_level_code+"-WH-";$("#manage_warehouse_master_edit_warehouse_id").attr("value",warehouseId);$("#manage_warehouse_master_edit_warehouse_id").keydown(function(e){var prefixId=$(this).val();var idField=this;setTimeout(function(){if(idField.value.indexOf(warehouseId)!==0){$(idField).val(prefixId);}},1);});};if(manage_warehouse_master.variable.custom.crudIndicator=="V"){$("#manage_warehouse_master_edit_add_btn").hide();$("#manage_warehouse_master_edit_delete_btn").hide();}},initializeWidgets:function(){$("#manage_warehouse_master_edit_warehouse_id").initializeWTextbox({screenID:"manage_warehouse_master_edit",maxlength:"50",defaultValue:"$manage_warehouse_master_edit.variable.custom.datasource_1_record.warehouse_id",});$("#manage_warehouse_master_edit_warehouse_name").initializeWTextbox({screenID:"manage_warehouse_master_edit",maxlength:"60",defaultValue:"$manage_warehouse_master_edit.variable.custom.datasource_1_record.warehouse_name"});$("#manage_warehouse_master_edit_warehouse_location_code").initializeWTextbox({screenID:"manage_warehouse_master_edit",maxlength:"8",defaultValue:"$manage_warehouse_master_edit.variable.custom.datasource_1_record.warehouse_location_code"});$("#manage_warehouse_master_edit_warehouse_address").initializeWTextarea({screenID:"manage_warehouse_master_edit",maxlength:"200",defaultValue:"$manage_warehouse_master_edit.variable.custom.datasource_1_record.warehouse_address"});$("#manage_warehouse_master_edit_warehouse_city").initializeWTextbox({screenID:"manage_warehouse_master_edit",maxlength:"30",defaultValue:"$manage_warehouse_master_edit.variable.custom.datasource_1_record.warehouse_city"});$("#manage_warehouse_master_edit_warehouse_pincode").initializeWTextbox({screenID:"manage_warehouse_master_edit",maxlength:"10",defaultValue:"$manage_warehouse_master_edit.variable.custom.datasource_1_record.warehouse_pincode"});$("#manage_warehouse_master_edit_warehouse_country").initializeWDropdownlist({screenID:"manage_warehouse_master_edit",dataSource:{informationType:"'COUNTRY_LIST'"},dataTextField:"description",dataValueField:"code",template:"description",childFieldID:"manage_warehouse_master_edit_warehouse_state",defaultValue:"$manage_warehouse_master_edit.variable.custom.datasource_1_record.warehouse_country",defaultValueDescription:"$manage_warehouse_master_edit.variable.custom.datasource_1_record.warehouse_country_desc"});$("#manage_warehouse_master_edit_warehouse_state").initializeWDropdownlist({screenID:"manage_warehouse_master_edit",dataSource:{informationType:"'STATECODE_LIST'",searchField1:"#manage_warehouse_master_edit_warehouse_country",},dataTextField:"description",dataValueField:"code",template:"description",defaultValue:"$manage_warehouse_master_edit.variable.custom.datasource_1_record.warehouse_state",defaultValueDescription:"$manage_warehouse_master_edit.variable.custom.datasource_1_record.warehouse_state_desc"});$("#manage_warehouse_master_edit_warehouse_head_employee").initializeWCombobox({screenID:"manage_warehouse_master_edit",dataSource:{informationType:"'EMPLOYEE_DESC'"},dataTextField:"description",dataValueField:"code",serverFiltering:true,template:"description",defaultValue:"$manage_warehouse_master_edit.variable.custom.datasource_1_record.warehouse_head_employee",defaultValueDescription:"$manage_warehouse_master_edit.variable.custom.warehouse_head_employee_defaultValueDescription"});$("#manage_warehouse_master_edit_org_level_no").initializeWDropdownlist({screenID:"manage_warehouse_master_edit",dataSource:{informationType:"'ORGLEVELNO_LIST'"},dataTextField:"description",dataValueField:"code",template:"description",childFieldID:"manage_warehouse_master_edit_org_level_code",defaultValue:"$manage_warehouse_master_edit.variable.custom.header_1_record.organogram_level_no",defaultValueDescription:"$manage_warehouse_master_edit.variable.custom.org_level_no_defaultValueDescription"});$("#manage_warehouse_master_edit_org_level_code").initializeWDropdownlist({screenID:"manage_warehouse_master_edit",dataSource:{informationType:"'ORGLEVELCODE_LIST'",searchField1:"#manage_warehouse_master_edit_org_level_no",},dataTextField:"description",dataValueField:"code",template:"description",defaultValue:"$manage_warehouse_master_edit.variable.custom.header_1_record.organogram_level_code",defaultValueDescription:"$manage_warehouse_master_edit.variable.custom.org_level_code_defaultValueDescription"});manage_warehouse_master_edit.variable.custom.grid_1=$("#manage_warehouse_master_edit_grid_1").initializeWGrid({screenID:"manage_warehouse_master_edit",toolbar:"#manage_warehouse_master_edit_grid_1_toolbar_template",dataSource:manage_warehouse_master_edit.variable.custom.datasource_1,height:400,pageSize:10});manage_warehouse_master_edit.variable.custom.grid_1.refresh();},refreshScreen:function(){manage_warehouse_master_edit.variable.custom.grid_1.refresh();},buttonEventHandler:{crud_btn_click:function(element,event){if(manage_warehouse_master_edit.variable.custom.crudIndicator=="D"){manage_warehouse_master_edit.variable.custom.grid_1.dataSource.remove(manage_warehouse_master_edit.variable.custom.selectedRecord);}else if(mserviceUtilities.loadJSScripts(["../scripts/js/fn_manage_warehouse_master_edit_child.js"])){webNavigationController.gotoNextScreen({screenID:"manage_warehouse_master_edit",fieldID:"manage_warehouse_master_edit_child_window",nextScreenID:"manage_warehouse_master_edit_child",nextScreenName:manage_warehouse_master_edit.variable.custom.nextScreenName,execute:manage_warehouse_master_edit_child.constructScreen});}else{alert("Sorry. This feature is unavailable. Please contact your support desk.");return false;}},submit_btn_click:function(element,event){if(manage_warehouse_master_edit.variable.custom.grid_1.dataSource.data().length!=0){if($("#manage_warehouse_master_edit_warehouse_id").getVal()!=login_profile.employee_org_level_code+"-WH-"){var returnValue,inputparamWarehouseLocationMap,recordTimeStamp,detailRecordCounter;inputparamWarehouseLocationMap=[];recordTimeStamp="00000000-0000-0000-0000-000000000000";if(manage_warehouse_master.variable.custom.crudIndicator=="U"){recordTimeStamp=manage_warehouse_master_edit.variable.custom.datasource_1_record.rec_tstamp;};for(detailRecordCounter=0;detailRecordCounter<manage_warehouse_master_edit.variable.custom.grid_1.dataSource.data().length;detailRecordCounter++){inputparamWarehouseLocationMap.push({p_mapped_location_code:manage_warehouse_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].warehouse_mapped_location,p_warehouse_type:manage_warehouse_master_edit.variable.custom.grid_1.dataSource.data()[detailRecordCounter].warehouse_type});};returnValue=executeService_save_manage_warehouse_details({p_warehouse_id:$("#manage_warehouse_master_edit_warehouse_id").getVal(),p_warehouse_name:$("#manage_warehouse_master_edit_warehouse_name").getVal(),p_warehouse_loc_code:$("#manage_warehouse_master_edit_warehouse_location_code").getVal(),p_address_line_1:$("#manage_warehouse_master_edit_warehouse_address").getVal(),p_city:$("#manage_warehouse_master_edit_warehouse_city").getVal(),p_state_code:$("#manage_warehouse_master_edit_warehouse_state").getVal(),p_country:$("#manage_warehouse_master_edit_warehouse_country").getVal(),p_pincode:$("#manage_warehouse_master_edit_warehouse_pincode").getVal(),p_head_emp_id:$("#manage_warehouse_master_edit_warehouse_head_employee").getVal(),p_organogram_level_no:$("#manage_warehouse_master_edit_org_level_no").getVal(),p_organogram_level_code:$("#manage_warehouse_master_edit_org_level_code").getVal(),p_save_mode:manage_warehouse_master.variable.custom.crudIndicator,p_rec_tstamp:recordTimeStamp,inputparam_warehouse_location_map:inputparamWarehouseLocationMap});if(returnValue=="SP001"){alert("Warehouse Details is saved successfully");return true;}else{alert("Saving of Warehouse Details Failed");return false;}}else{alert("Please Enter Valid Warehouse Id.");return false;}}else{alert("Please Enter Mapping Locations.");return false;}}},widgetEventHandler:{warehouse_id_change:function(element,event){manage_warehouse_master_edit.customRequirementHandler.keyFieldValidation(element);}},customRequirementHandler:{setSelectedRecord:function(){manage_warehouse_master_edit.variable.custom.selectedRecord=manage_warehouse_master_edit.variable.custom.grid_1.dataSource.getByUid(manage_warehouse_master_edit.variable.custom.grid_1.select().data("uid"));},keyFieldValidation:function(element){manage_warehouse_master_edit.variable.custom.datasource_2.read();var keyValidation=manage_warehouse_master_edit.variable.custom.datasource_2.data();if(keyValidation[0].p_valid_ind=="true"){alert("Data already exists.");if(login_profile.dealer_code!=""){$(element).setVal(login_profile.dealer_org_level_code+"-WH-");}else{$(element).setVal("");}}},dataSourceParse:function(response){var parseResponse;if(response.document!=undefined){if(response.document.ApplicationException==undefined){manage_warehouse_master_edit.variable.custom.datasource_1_record=response.document.context.outputparam["#text"];if(response.document.context.outputparam_warehouse_location_map!=undefined){if(response.document.context.outputparam_warehouse_location_map.length!=undefined){parseResponse=response.document.context.outputparam_warehouse_location_map;}else{parseResponse=[response.document.context.outputparam_warehouse_location_map];}}else{parseResponse=[];}}else{parseResponse=response;}}else{parseResponse=response;};return parseResponse;}},variable:{standard:{screenEditableIndicator:true,valueChangeIndicator:false,reorderParam:[{contentID:"content_1",columnLength:3}],},custom:{customDelete:true,},}};