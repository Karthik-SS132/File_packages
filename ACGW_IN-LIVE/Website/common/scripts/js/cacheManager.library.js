var cacheManager = {
	getCachedDatasourceInput : function () {
		var returnValue;
		returnValue = "<inputparam>";
		returnValue += "<lov_code_type>" + cacheManager.variable.informationType + "</lov_code_type>";
		returnValue += "<search_field_1>" + cacheManager.variable.searchField1 + "</search_field_1>";
		returnValue += "<search_field_2>" + cacheManager.variable.searchField2 + "</search_field_2>";
		returnValue += "<search_field_3>" + cacheManager.variable.searchField3 + "</search_field_3>";
		returnValue += "<search_field_4>" + cacheManager.variable.searchField4 + "</search_field_4>";
		returnValue += "<search_field_5>" + cacheManager.variable.searchField5 + "</search_field_5>";
		returnValue += "</inputparam>";
		return returnValue;
	},
	getDataSet : function (dsObject) {
		var returnValue,
		informationTypeSet;
		for (var key in cacheManager.variable) {
			if (dsObject[key] != undefined) {
				cacheManager.variable[key] = dsObject[key];
			} else {
				cacheManager.variable[key] = "";
			};
		};
		cacheManager.updateCachedDatasource();
		informationTypeSet = $.grep(cacheManager.cachedDatasource.data(), function (element, index) {
				return ((element.informationType == cacheManager.variable.informationType) && (element.searchField1 == cacheManager.variable.searchField1) && (element.searchField2 == cacheManager.variable.searchField2) && (element.searchField3 == cacheManager.variable.searchField3) && (element.searchField4 == cacheManager.variable.searchField4) && (element.searchField5 == cacheManager.variable.searchField5));
			})[0];
		if (informationTypeSet != undefined) {
			if (dsObject.condition != undefined && dsObject.condition != "") {
				returnValue = $.grep(informationTypeSet.dataSet, function (element, index) {
						return eval(dsObject.condition.replace(/@/g, "element."));
					});
			} else {
				returnValue = informationTypeSet.dataSet;
			};
		} else {
			returnValue = [];
		};
		return returnValue;
	},
	getTransportParameter : function (inputParameter) {
		var contextSegment,
		currentInputParameter;
		contextSegment = {
			sessionId : login_profile.guid_val,
			userId : login_profile.user_id,
			client_id : login_profile.client_id,
			locale_id : login_profile.locale_id,
			country_code : login_profile.country_code
		};
		currentInputParameter = JSON.parse(JSON.stringify(inputParameter));
		if (currentInputParameter != undefined) {
			for (var nameValue in currentInputParameter) {
				for (var childNameValue in currentInputParameter[nameValue]) {
					currentInputParameter[nameValue][childNameValue] = mserviceUtilities.getActualValue(currentInputParameter[nameValue][childNameValue]);
				};
				contextSegment[nameValue] = currentInputParameter[nameValue];
			};
		};
		return JSON.stringify({
			context : contextSegment
		});
	},
	updateCachedDatasource : function () {
		if (typeof(cacheManager.cachedDatasource) == "undefined") {
			cacheManager.cachedDatasource = new kendo.data.DataSource({
					offlineStorage : "cachedData",
					transport : {
						read : {
							type : "POST",
							async : false,
							dataType : "json",
							contentType : "application/json; charset=utf-8",
							url : mserviceUtilities.getWebserverpath() + "JSONServiceEndpoint.aspx?appName=common_modules&serviceName=retrieve_listof_values_for_searchcondition&path=context/outputparam",
							complete : function (data, textstatus) {}

						},
						parameterMap : function (options, operation) {
							return cacheManager.getTransportParameter({
								inputparam : {
									p_inputparam_xml : "cacheManager.getCachedDatasourceInput()"
								}
							});
						}
					},
					requestStart : function (e) {
						if ($.grep(cacheManager.cachedDatasource.data(), function (element, index) {
								return ((element.informationType == cacheManager.variable.informationType) && (element.searchField1 == cacheManager.variable.searchField1) && (element.searchField2 == cacheManager.variable.searchField2) && (element.searchField3 == cacheManager.variable.searchField3) && (element.searchField4 == cacheManager.variable.searchField4) && (element.searchField5 == cacheManager.variable.searchField5));
							})[0] != undefined) {
							e.preventDefault();
						};
					},
					schema : {
						parse : function (response) {
							if (response.length != 0) {
								cacheManager.cachedDatasource.data().push({
									"informationType" : cacheManager.variable.informationType,
									"searchField1" : cacheManager.variable.searchField1,
									"searchField2" : cacheManager.variable.searchField2,
									"searchField3" : cacheManager.variable.searchField3,
									"searchField4" : cacheManager.variable.searchField4,
									"searchField5" : cacheManager.variable.searchField5,
									"dataSet" : response
								});
							};
							return cacheManager.cachedDatasource.data();
						}
					}
				});
		};
		cacheManager.cachedDatasource.read();
	},
	variable : {
		informationType : "",
		searchField1 : "",
		searchField2 : "",
		searchField3 : "",
		searchField4 : "",
		searchField5 : ""
	}
};