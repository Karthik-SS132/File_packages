var manage_item_rate_edit={constructScreen:function(){return true;},initializeWidgets:function(){$("#manage_item_rate_edit_uom_code").initializeWDropdownlist({screenID:"manage_item_rate_edit",dataSource:{informationType:"'ITEMUOM_LIST'"},dataTextField:"description",dataValueField:"code",template:"description"});$("#manage_item_rate_edit_std_rate").initializeWNumerictextbox({screenID:"manage_item_rate_edit",minimum:"'1'",maximum:"'9999999'",format:"n2",});$("#manage_item_rate_edit_currency_code").initializeWDropdownlist({screenID:"manage_item_rate_edit",dataSource:{informationType:"'CURRENCYCODE_LIST'"},dataTextField:"description",dataValueField:"code",template:"description"});},widgetEventHandler:{uom_code_change:function(element,event){var keyValidation=manage_item_rate.variable.custom.datasource_1.data();for(var i=0;i<keyValidation.length;i++){if(keyValidation[i].uom_code==$("#manage_item_rate_edit_uom_code").getVal()){alert("Data already exists.");$("#manage_item_rate_edit_uom_code").setVal("");}}}},buttonEventHandler:{submit_btn_click:function(element,event){manage_item_rate.variable.custom.grid_1.dataSource.add({uom_code:$("#manage_item_rate_edit_uom_code").getVal(),std_rate:$("#manage_item_rate_edit_std_rate").getVal(),currency_code:$("#manage_item_rate_edit_currency_code").getVal(),uom_code_description:mserviceUtilities.getDescriptionForCode("ITEMUOM_LIST",$("#manage_item_rate_edit_uom_code").getVal(),"")});return true;}},variable:{standard:{screenEditableIndicator:true,valueChangeIndicator:false,popupIndicator:true,reorderParam:[{contentID:"content_1",columnLength:1}],},custom:{},}}