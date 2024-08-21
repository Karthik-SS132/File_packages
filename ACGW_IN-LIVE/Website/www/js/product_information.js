var product_information = {
    page: {
        beforeShow: function () {
            try {
                $.ajax({
                    url: "www/content/product_information.html",
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        try {
                            $("main[data-ms-role='functionalMenuContainer'][data-ms-role-id='CPORTPRODINFO'] section div div").html(data);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function (e) {
                        try {
                            return true;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        init: function () {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        show: function () {
            try {
                return true;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        afterShow: function () {
            try {
				$.ajax({
					async: false,
					url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=common_modules&serviceName=retrieve_listof_values_for_searchcondition&path=context/outputparam",
					method: "POST",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					data: JSON.stringify({
						context: {
							"sessionId": mService.app.getSessionId(),
							"userId": mService.app.getUserId(),
							"client_id": mService.app.getClientId(),
							"locale_id": mService.app.getLocaleId(),
							"country_code": mService.app.getCountryCode(),
							"inputparam": {
								"p_inputparam_xml": "<inputparam><lov_code_type>GET_CAMPAIGN_DETAILS</lov_code_type></inputparam>"
							}
						}
					}),
					success: function (response) {
						try {
						   product_information.variable.bannerData = response;
						} catch (exception) {
							mService.exception.handle(exception);
						}
					},
					error: function () {
						mService.exception.handle(exception);
					}
				});
				if(product_information.variable.bannerData.length != 0){
					var bannerHTML = "";
					for(var counter=0; counter < product_information.variable.bannerData.length; counter++){
						bannerHTML += '<div class="ms_product_information_campaign_slides fade" data-campaignCode="' + product_information.variable.bannerData[counter].code + '" style="text-align: center; cursor: pointer; background-image: url(www/content/images/product_information/PRODUCTINFO_banner.jpg); border-radius: 10px;"><img class="ms_product_information_campaign_slides_img" src="content_store/accts/in/call_attachments/' + product_information.variable.bannerData[counter].code + '/' + product_information.variable.bannerData[counter].banner_img_src + '" style="padding: 1%; margin-left: 2.5%; height: 200px; cursor: pointer; "></div>';
					};
					$("#product_information_container").prepend('<!DOCTYPE html><html><head><style>.ms_product_information_campaign_slides { display: none; } .ms_product_information_campaign_slides_container{ margin-top: 3.5%; width: 80%; margin-left: 9%; border-radius: 0.5em; position: relative; background-color: #0099cc;} .ms_product_information_campaign_prev, .ms_product_information_campaign_next { cursor: pointer; position: absolute; top: 50%; width: auto; padding: 0.7%; margin-top: -22px; color: white; font-weight: bold; font-size: 18px; transition: 0.6s ease; border-radius: 0 3px 3px 0; user-select: none;} .ms_product_information_campaign_next {	right: 0; border-radius: 3px 0 0 3px; } .ms_product_information_campaign_prev:hover, .ms_product_information_campaign_next:hover {	background-color: rgba(0,0,0,0.7); } </style></head><body><div class="ms_product_information_campaign_slides_container">' + bannerHTML + '<a class="ms_product_information_campaign_prev" onclick="plusSlides(-1)">❮</a><a class="ms_product_information_campaign_next" onclick="plusSlides(1)">❯</a></div><script>var slideIndex = 1; showSlides(slideIndex); function plusSlides(index) { showSlides(slideIndex += index); }; function showSlides(index) { var slides = document.getElementsByClassName("ms_product_information_campaign_slides"); if (index > slides.length) {slideIndex = 1}	if (index < 1) {slideIndex = slides.length}	for (var counter = 0; counter < slides.length; counter++) {	slides[counter].style.display = "none"; }	slides[slideIndex-1].style.display = "block"; }; $(".ms_product_information_campaign_slides").css("opacity","1"); function autoShowSlides(){let index;let slides=document.getElementsByClassName("ms_product_information_campaign_slides");for(index=0;index<slides.length;index++){slides[index].style.display="none";};slideIndex++;if(slideIndex>slides.length){slideIndex=1};slides[slideIndex-1].style.display="block";setTimeout(autoShowSlides,75000);};autoShowSlides();</script></body></html>');
					$('.ms_product_information_campaign_prev').click(false);
					$('.ms_product_information_campaign_next').click(false);
					$(".ms_product_information_campaign_slides").click(function(){
						if($("[data-ms-link-role='CPORTACTLOGGING']").length != 0){
							product_information.variable.campaignCode = this.getAttribute("data-campaignCode");
							mServiceQueryByPassing = {
								"trans_ref_no" : product_information.variable.campaignCode,
								"trans_type" : "CAMPAIGN",
								"action_path" : "@INIT/@CAMPAIGN"
							};
							$("[data-ms-link-role='CPORTACTLOGGING']").click();
						};
					});
				}
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    button: {
        misc: {
            chat_click: function (ele, nData) {
                var key, subKey = "",
                    paramObj;

                if (nData !== undefined) {
                    mService.widgets.variable.msChat.variable["prod1_chat_popup_content"] = nData.data.msgBody;
                    subKey = nData.data.msgBody.subKey;
                };
                if (ele !== "") {
                    if ($(ele).attr("data-ms-containr-param") !== undefined) {
                        paramObj = JSON.parse($(ele).attr("data-ms-containr-param"));
                        key = paramObj.key;
                    }
                }
                if ($("#product_information_chat_popup").data("kendoWindow") === undefined) {
                    $("#product_information_chat_popup").kendoWindow({
                        width: ($(window).width() * 40) / (100),
                        height: ($(window).height() * 90) / (100),
                        title: {
                            text: "Log a Complaint",
                            encoded: false
                        },
                        close: function () {
                            try {
                                setTimeout(function () {
                                    try {
                                        $("#product_information_chat_popup_attachment_view_content").html("");
                                        $("#product_information_chat_popup_attachment_view").hide();
                                        var dialog1 = $("#product_information_chat_popup").data("kendoWindow");
                                        dialog1.setOptions({
                                            width: ($(window).width() * 40) / (100)
                                        });
                                        setTimeout(function () {
                                            try {
                                                $("#product_information_chat_popup").data("kendoWindow").center();
                                            } catch (exception) {
                                                mService.exception.handle(exception);
                                            }
                                        }, 100);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, 10);

                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        draggable: false,
                        modal: true,
                        resizable: false,
                        visible: false
                    });
                } else {
                    $("#product_information_chat_popup").data("kendoWindow").setOptions({
                        title: {
                            text: "Log a Complaint",
                            encoded: false
                        }
                    });
                    $("#product_information_chat_popup").html("");
                }
                $("#product_information_chat_popup").html(mService.config.template.getTransformedHtml("mschat_popup_content_template", ({
                    scrID: "product_information_chat"
                })));
                $("#product_information_chat_popup").data("kendoWindow").open().center();
                $("#product_information_chat_popup_content").msChat({
                    scrid: "product_information_chat",
                    key: key,
                    subKey: subKey
                });
            },
            tile_click: function (productID) {
                $.ajax({
                    url: "www/content/product_information_detail_" + productID + ".html",
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        try {
                            $("main[data-ms-role='functionalMenuContainer'][data-ms-role-id='CPORTPRODINFO'] section div div").html(data);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function (e) {
                        try {
                            return true;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            },
			sub_tile_click: function (productID) {
                $.ajax({
                    url: "www/content/product_information_detail_" + productID + ".html",
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        try {
                            $("main[data-ms-role='functionalMenuContainer'][data-ms-role-id='CPORTPRODINFO'] section div div").html(data);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function (e) {
                        try {
                            return true;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            },
            back_click: function (productID) {
                $.ajax({
                    url: "www/content/product_information_detail_" + productID + ".html",
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        try {
                            $("main[data-ms-role='functionalMenuContainer'][data-ms-role-id='CPORTPRODINFO'] section div div").html(data);
							product_information.page.afterShow();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function (e) {
                        try {
                            return true;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            },
			back_tile_click: function () {
                $.ajax({
                    url: "www/content/product_information.html",
                    dataType: "text",
                    async: false,
                    success: function (data) {
                        try {
                            $("main[data-ms-role='functionalMenuContainer'][data-ms-role-id='CPORTPRODINFO'] section div div").html(data);
							product_information.page.afterShow();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function (e) {
                        try {
                            return true;
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            }
        },
        crud: {
            edit_click: function () {
                var catalogID,
                    problemDescVal,
                    additionalDescVal;
                try {
                    catalogID = mService.page.navigation.get.pageCatalogID();
                    problemDescVal = {};
                    additionalDescVal = {};
                    problemDescVal[mService.user.profile.login.locale_id.substring(0, 2)] = product_information.variable.selectedRecord["problem_description_" + mService.user.profile.login.locale_id];
                    problemDescVal[mService.user.profile.login.default_locale_id.substring(0, 2)] = product_information.variable.selectedRecord["problem_description_" + mService.user.profile.login.default_locale_id];
                    additionalDescVal[mService.user.profile.login.locale_id.substring(0, 2)] = product_information.variable.selectedRecord["addn_desc_" + mService.user.profile.login.locale_id];
                    additionalDescVal[mService.user.profile.login.default_locale_id.substring(0, 2)] = product_information.variable.selectedRecord["addn_desc_" + mService.user.profile.login.default_locale_id];
                    mService.config.ui.render("product_information_" + catalogID + "_actions_detail_view", "crud_edit");
                    $("#product_information_" + catalogID + "_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                        buttonRegion: "edit"
                    }));
                    $("#product_information_" + catalogID + "_actions_detail_view_action_bar").html("");
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    $("#product_information_edit_customer_contact_name").setVal(product_information.variable.selectedRecord.cust_contact_name);
                    $("#product_information_edit_customer_contact_number").setVal(product_information.variable.selectedRecord.cust_contact_no);
                    $("#product_information_edit_customer_contact_email").setVal(product_information.variable.selectedRecord.cust_contact_email_id);
                    $("#product_information_edit_customer_name").setVal(product_information.variable.selectedRecord.customer_name);
                    $("#product_information_edit_customer_id").setVal(product_information.variable.selectedRecord.customer_id);
                    $("#product_information_edit_equipment_id").setVal(product_information.variable.selectedRecord.equipment_id);
                    $("#product_information_edit_asset_id").setVal(product_information.variable.selectedRecord.asset_id);
                    $("#product_information_edit_udf_char_1").setVal(product_information.variable.selectedRecord.udf_char_1);
                    $("#product_information_edit_udf_char_2").setVal(product_information.variable.selectedRecord.udf_char_2);
                    $("#product_information_edit_asset_location").setVal(product_information.variable.selectedRecord.asset_loc_reported);
                    $("#product_information_edit_call_type").setVal(product_information.variable.selectedRecord.call_type);
                    $("#product_information_edit_call_priority").setVal(product_information.variable.selectedRecord.priority_cd);
                    $("#product_information_edit_problem_description").setVal(problemDescVal);
                    $("#product_information_edit_additional_information").setVal(additionalDescVal);
                    product_information.variable.validator = mService.config.rule.apply("product_information_" + catalogID + "_actions_detail_view");
                    mService.config.label.resolve();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            retrieve_click: function () {
                try {
                    product_information.variable.selectedRecord = null;
                    product_information.customHandler.refreshListView();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        wflow_click: function (ele, evt) {
            var catalogID;
            try {
                catalogID = mService.page.navigation.get.pageCatalogID();
                product_information.variable.selectedEventverb = ele.attr("data-ms-wflow-eventverb");
                product_information.variable.selectedToStage = ele.attr("data-ms-wflow-tostage");
                product_information.variable.selectedToStatus = ele.attr("data-ms-wflow-tostatus");
                mService.config.ui.render("product_information_" + catalogID + "_actions_detail_view", "workflow_" + product_information.variable.selectedEventverb);
                $("#product_information_" + catalogID + "_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                    buttonRegion: "wflow"
                }));
                $("#product_information_" + catalogID + "_actions_detail_view_action_bar").html("");
                mService.util.pageSubCatalogDetailViewActionBar.hide();
                mService.config.label.resolve();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        form: {
            submit_click: function (ele, evt) {
                try {
                    if (ele.attr("data-ms-button-region") === "add") {
                        product_information.customHandler.addSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "edit") {
                        product_information.customHandler.editSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "wflow") {
                        product_information.customHandler.wflowSubmitClick();
                    } else if (ele.attr("data-ms-button-region") === "attachment") {
                        mService.home.userAttachment.submitAttachment("CALL", product_information.variable.selectedRecord.call_no);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            cancel_click: function (ele, evt) {
                try {
                    if (ele.attr("data-ms-button-region") === "add") {
                        mService.layout.pageCatalog.select("add");
                    } else if (ele.attr("data-ms-button-region") === "attachment") {
                        $("#home_user_attachment_add_popup").data("kendoWindow").close();
                    } else {
                        product_information.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    catalog: {
        add: {
            select: function () {
                try {
                    mService.config.ui.render("product_information_add_actions_detail_view", "crud_add");
                    $("#product_information_add_actions_detail_view").append(mService.config.template.getTransformedHtml("home_form_action_bar_template", {
                        buttonRegion: "add"
                    }));
                    $("#product_information_add_actions_detail_view_action_bar").html("");
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    product_information.variable.validator = mService.config.rule.apply("product_information_add_actions_detail_view");
                    if (mService.home.customerContactInfo.customerName !== "") {
                        $("#product_information_add_customer_name").setVal(mService.home.customerContactInfo.customerName);
                    };
                    if (mService.home.customerContactInfo.contactName !== "") {
                        $("#product_information_add_customer_contact_name").setVal(mService.home.customerContactInfo.contactName);
                    };
                    if (mService.home.customerContactInfo.contactNumber !== "") {
                        $("#product_information_add_customer_contact_number").setVal(mService.home.customerContactInfo.contactNumber);
                    };
                    if (mService.home.customerContactInfo.contactEmail !== "") {
                        $("#product_information_add_customer_contact_email").setVal(mService.home.customerContactInfo.contactEmail);
                    };
                    if (mService.home.customerContactInfo.customerID !== "") {
                        $("#product_information_add_customer_id").setVal(mService.home.customerContactInfo.customerID);
                    };
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        open: {
            select: function () {
                try {
                    $("#product_information_open_list_view").kendoListView({
                        selectable: true,
                        autoBind: false,
                        template: kendo.template($("#product_information_open_list_view_template").html()),
                        change: function (e) {
                            try {
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        product_information.variable.selectedRecord = $("#product_information_open_list_view").data("kendoListView").dataSource.view()[e.sender.select().index()];
                                        if (!product_information.msPageCatalogRefresh) {
                                            product_information.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        e.sender.select().removeClass("k-state-selected");
                                        e.sender.items().filter("[data-uid='" + product_information.variable.selectedRecord.uid + "']").addClass("k-state-selected");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                    product_information.button.crud.retrieve_click();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    if (product_information.variable.selectedRecord !== null) {
                        $("#product_information_open_actions_detail_view").html(mService.config.template.getTransformedHtml("product_information_open_detail_view_template", product_information.variable.selectedRecord));
                        product_information.customHandler.getWorkflowEvents(function (data) {
                            var html;
                            try {
                                html = "";
                                if (product_information.variable.selectedRecord.call_status === "OD" || product_information.variable.selectedRecord.call_status === "O") {
                                    html = mService.config.template.getTransformedHtml("home_crud_action_bar_template", {
                                        scrID: "product_information",
                                        crudName: "edit",
                                        buttonRegion: ""
                                    });
                                };
                                html += product_information.customHandler.getActionBarHtml(data);
                                $("#product_information_open_actions_detail_view_action_bar").html(html);
                                mService.util.pageSubCatalogDetailViewActionBar.show();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        mService.config.label.resolve();
                    } else {
                        $("#product_information_open_actions_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                        $("#product_information_open_actions_detail_view_action_bar").html("");
                        mService.util.pageSubCatalogDetailViewActionBar.hide();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            timeline: function () {
                var dSource;
                try {
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    if (product_information.variable.selectedRecord !== null) {
                        $("#product_information_open_timeline_detail_view").html(mService.config.template.getTransformedHtml("product_information_open_timeline_detail_view_template", product_information.variable.selectedRecord));
                        $("#product_information_open_timeline_widget").msTimeline({
                            scrid: mService.page.navigation.get.subMenuID(),
                            lblid: "",
                            lblgrpid: "",
                            eventtemplate: "product_information_open_timeline_detail_view_content_template",
                            datasrc: [],
                            orientation: "horizontal"
                        });
                        dSource = mService.dSource.getSource({
                            code: "'call_status_event_log'",
                            inputXml: "'" + JSON.stringify({
                                "call_ref_no": product_information.variable.selectedRecord.call_no,
                                "call_category": product_information.variable.callCategory
                            }) + "'"
                        });
                        dSource.read();
                        $("#product_information_open_timeline_widget").setDataSource(dSource.data());
                    } else {
                        $("#product_information_open_timeline_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            attachment: function () {
                var dSource,
                    index,
                    html;
                try {
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    if (product_information.variable.selectedRecord !== null) {
                        $("#product_information_open_attachment_detail_view").html(mService.config.template.getTransformedHtml("product_information_open_attachment_detail_view_template"));
                        dSource = mService.dSource.getSource({
                            code: "'user_attachments'",
                            inputXml: "'" + JSON.stringify({
                                "transaction_type": "CALL",
                                "transaction_ref_no": product_information.variable.selectedRecord.call_no
                            }) + "'"
                        });
                        dSource.read().then(function () {
                            try {
                                html = mService.config.template.getTransformedHtml("home_user_attachment_add_tile_template", {
                                    transaction_type: "CALL",
                                    transaction_ref_no: product_information.variable.selectedRecord.call_no
                                });
                                for (index = 0; index < dSource.data().length; index++) {
                                    html += mService.config.template.getTransformedHtml("home_user_attachment_list_tile_template", dSource.data()[index]);
                                };
                                $("#product_information_open_attachment_content").html(html);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        $("#product_information_open_attachment_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        },
        closed: {
            select: function () {
                try {
                    $("#product_information_closed_list_view").kendoListView({
                        selectable: true,
                        autoBind: false,
                        template: kendo.template($("#product_information_closed_list_view_template").html()),
                        change: function (e) {
                            try {
                                mService.page.navigation.isAllowed(function () {
                                    try {
                                        product_information.variable.selectedRecord = $("#product_information_closed_list_view").data("kendoListView").dataSource.view()[e.sender.select().index()];
                                        if (!product_information.msPageCatalogRefresh) {
                                            product_information.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                                        }
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function () {
                                    try {
                                        e.sender.select().removeClass("k-state-selected");
                                        e.sender.items().filter("[data-uid='" + product_information.variable.selectedRecord.uid + "']").addClass("k-state-selected");
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                    product_information.button.crud.retrieve_click();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            actions: function () {
                try {
                    if (product_information.variable.selectedRecord !== null) {
                        $("#product_information_closed_actions_detail_view").html(mService.config.template.getTransformedHtml("product_information_closed_detail_view_template", product_information.variable.selectedRecord));
                        product_information.customHandler.getWorkflowEvents(function (data) {
                            var html;
                            try {
                                html = product_information.customHandler.getActionBarHtml(data);
                                $("#product_information_closed_actions_detail_view_action_bar").html(html);
                                mService.util.pageSubCatalogDetailViewActionBar.show();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                        mService.config.label.resolve();
                    } else {
                        $("#product_information_closed_actions_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                        $("#product_information_closed_actions_detail_view_action_bar").html("");
                        mService.util.pageSubCatalogDetailViewActionBar.hide();
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            timeline: function () {
                var dSource;
                try {
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    if (product_information.variable.selectedRecord !== null) {
                        $("#product_information_closed_timeline_detail_view").html(mService.config.template.getTransformedHtml("product_information_closed_timeline_detail_view_template", product_information.variable.selectedRecord));
                        $("#product_information_closed_timeline_widget").msTimeline({
                            scrid: mService.page.navigation.get.subMenuID(),
                            lblid: "",
                            lblgrpid: "",
                            eventtemplate: "product_information_closed_timeline_detail_view_content_template",
                            datasrc: [],
                            orientation: "horizontal"
                        });
                        dSource = mService.dSource.getSource({
                            code: "'call_status_event_log'",
                            inputXml: "'" + JSON.stringify({
                                "call_ref_no": product_information.variable.selectedRecord.call_no,
                                "call_category": product_information.variable.callCategory
                            }) + "'"
                        });
                        dSource.read();
                        $("#product_information_closed_timeline_widget").setDataSource(dSource.data());
                    } else {
                        $("#product_information_closed_timeline_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            attachment: function () {
                var dSource,
                    index,
                    html;
                try {
                    mService.util.pageSubCatalogDetailViewActionBar.hide();
                    if (product_information.variable.selectedRecord !== null) {
                        $("#product_information_closed_attachment_detail_view").html(mService.config.template.getTransformedHtml("product_information_closed_attachment_detail_view_template"));
                        dSource = mService.dSource.getSource({
                            code: "'user_attachments'",
                            inputXml: "'" + JSON.stringify({
                                "transaction_type": "CALL",
                                "transaction_ref_no": product_information.variable.selectedRecord.call_no
                            }) + "'"
                        });
                        dSource.read().then(function () {
                            try {
                                html = mService.config.template.getTransformedHtml("home_user_attachment_add_tile_template", {
                                    transaction_type: "CALL",
                                    transaction_ref_no: product_information.variable.selectedRecord.call_no
                                });
                                for (index = 0; index < dSource.data().length; index++) {
                                    html += mService.config.template.getTransformedHtml("home_user_attachment_list_tile_template", dSource.data()[index]);
                                };
                                $("#product_information_closed_attachment_content").html(html);
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        $("#product_information_closed_attachment_detail_view").html(mService.config.template.getTransformedHtml("home_detail_view_no_data_template"));
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    customHandler: {
		addSubmitClick: function () {
            try {
                if (product_information.variable.validator.validate()) {
                    var problemDescXml,
                        additionalDescXml;
                    problemDescXml = "<problem_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#product_information_add_problem_description").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.default_locale_id + "><problem_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#product_information_add_problem_description").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.locale_id + ">";
                    additionalDescXml = "<additional_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#product_information_add_additional_information").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.default_locale_id + "><additional_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#product_information_add_additional_information").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.locale_id + ">";
                    $.ajax({
                        async: false,
                        url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=mservice&serviceName=save_manage_call_register&path=context/outputparam",
                        method: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            context: {
                                "sessionId": mService.app.getSessionId(),
                                "userId": mService.app.getUserId(),
                                "client_id": mService.app.getClientId(),
                                "locale_id": mService.app.getLocaleId(),
                                "country_code": mService.app.getCountryCode(),
                                "inputparam": {
                                    p_customer_id: $("#product_information_add_customer_id").getVal(),
                                    p_asset_id: $("#product_information_add_asset_id").getVal(),
                                    p_asset_location_reported: $("#product_information_add_asset_location").getVal(),
                                    p_problem_description: "",
                                    p_priority_code: $("#product_information_add_call_priority").getVal(),
                                    p_customer_contact_name: $("#product_information_add_customer_contact_name").getVal(),
                                    p_call_logged_by_userid: mService.app.getUserId(),
                                    p_call_logged_on_date: kendo.toString(new Date(), "yyyy-MM-dd"),
                                    p_call_logged_on_hour: kendo.toString(new Date(), "h"),
                                    p_call_logged_on_minute: kendo.toString(new Date(), "mm"),
                                    p_customer_location_code: (product_information.variable.customerInfoCustomerLocationCode !== undefined) ? (product_information.variable.customerInfoCustomerLocationCode) : ("ZZZ"),
                                    p_company_location_code: mService.user.profile.login.location_code,
                                    p_organogram_level_no: mService.user.profile.login.org_lvl_no,
                                    p_organogram_level_code: mService.user.profile.login.org_lvl_code,
                                    p_call_category: product_information.variable.callCategory,
                                    p_call_type: $("#product_information_add_call_type").getVal(),
                                    p_additional_description: "",
                                    p_customer_contact_no: $("#product_information_add_customer_contact_number").getVal(),
                                    p_customer_contact_email_id: $("#product_information_add_customer_contact_email").getVal(),
                                    p_equipment_id: $("#product_information_add_equipment_id").getVal(),
                                    p_billable_nonbillable_ind: "NB",
                                    p_charges_gross_amount: "0",
                                    p_charges_discount_amount: "0",
                                    p_charges_tax_amount: "0",
                                    p_charges_net_amount: "0",
                                    p_charges_currency_code: mService.user.profile.login.currency_code,
                                    p_contract_doc_no: "",
                                    p_contract_visit_no: "0",
                                    p_call_mapped_to_func_role: "",
                                    p_call_mapped_to_employee_id: "",
                                    p_inputparam_udf_xml: "<inputparam><user_locale>" + mService.user.profile.login.locale_id + "</user_locale><system_locale>" + mService.user.profile.login.default_locale_id + "</system_locale>" + problemDescXml + additionalDescXml + "<customer_name>" + mService.util.getXmlString($("#product_information_add_customer_name").getVal()) + "</customer_name><udf_char_1>" + $("#product_information_add_udf_char_1").getVal() + "</udf_char_1><udf_char_2>" + $("#product_information_add_udf_char_2").getVal() + "</udf_char_2></inputparam>",
                                    p_rec_timestamp: "00000000-0000-0000-0000-000000000000",
                                    p_save_mode: "A"
                                },
                                "outputparam": {
                                    "p_service_call_ref_no": ""
                                }
                            }
                        }),
                        success: function (response) {
                            try {
                                mService.app.alert("success", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_request_log",
                                    lblgrpid: "success",
                                    key: response[0].p_service_call_ref_no
                                });
                                product_information.customHandler.resetAddCatalogFields();
                                product_information.msPageValueChanged = false;
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        error: function (e) {
                            try {
                                mService.app.alert("error", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_request_log",
                                    lblgrpid: "error"
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        editSubmitClick: function () {
            try {
                if (product_information.variable.validator.validate()) {
                    var problemDescXml,
                        additionalDescXml;
                    problemDescXml = "<problem_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#product_information_edit_problem_description").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.default_locale_id + "><problem_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#product_information_edit_problem_description").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</problem_description_" + mService.user.profile.login.locale_id + ">";
                    additionalDescXml = "<additional_description_" + mService.user.profile.login.default_locale_id + ">" + mService.util.getXmlString($("#product_information_edit_additional_information").getVal()[mService.user.profile.login.default_locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.default_locale_id + "><additional_description_" + mService.user.profile.login.locale_id + ">" + mService.util.getXmlString($("#product_information_edit_additional_information").getVal()[mService.user.profile.login.locale_id.substring(0, 2)]) + "</additional_description_" + mService.user.profile.login.locale_id + ">";
                    $.ajax({
                        async: false,
                        url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=mservice&serviceName=save_manage_call_register&path=context/outputparam",
                        method: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify({
                            context: {
                                "sessionId": mService.app.getSessionId(),
                                "userId": mService.app.getUserId(),
                                "client_id": mService.app.getClientId(),
                                "locale_id": mService.app.getLocaleId(),
                                "country_code": mService.app.getCountryCode(),
                                "inputparam": {
                                    p_customer_id: $("#product_information_edit_customer_id").getVal(),
                                    p_asset_id: $("#product_information_edit_asset_id").getVal(),
                                    p_asset_location_reported: $("#product_information_edit_asset_location").getVal(),
                                    p_problem_description: "",
                                    p_priority_code: $("#product_information_edit_call_priority").getVal(),
                                    p_customer_contact_name: $("#product_information_edit_customer_contact_name").getVal(),
                                    p_call_logged_by_userid: mService.app.getUserId(),
                                    p_call_logged_on_date: kendo.toString(new Date(), "yyyy-MM-dd"),
                                    p_call_logged_on_hour: kendo.toString(new Date(), "h"),
                                    p_call_logged_on_minute: kendo.toString(new Date(), "mm"),
                                    p_customer_location_code: product_information.variable.selectedRecord.cust_location_code,
                                    p_company_location_code: mService.user.profile.login.location_code,
                                    p_organogram_level_no: product_information.variable.selectedRecord.org_level_no,
                                    p_organogram_level_code: product_information.variable.selectedRecord.org_level_code,
                                    p_call_category: product_information.variable.selectedRecord.call_category,
                                    p_call_type: $("#product_information_edit_call_type").getVal(),
                                    p_additional_description: "",
                                    p_customer_contact_no: $("#product_information_edit_customer_contact_number").getVal(),
                                    p_customer_contact_email_id: $("#product_information_edit_customer_contact_email").getVal(),
                                    p_equipment_id: $("#product_information_edit_equipment_id").getVal(),
                                    p_billable_nonbillable_ind: "NB",
                                    p_charges_gross_amount: "0",
                                    p_charges_discount_amount: "0",
                                    p_charges_tax_amount: "0",
                                    p_charges_net_amount: "0",
                                    p_charges_currency_code: mService.user.profile.login.currency_code,
                                    p_contract_doc_no: "",
                                    p_contract_visit_no: "0",
                                    p_call_mapped_to_func_role: "",
                                    p_call_mapped_to_employee_id: "",
                                    p_inputparam_udf_xml: "<inputparam><user_locale>" + mService.user.profile.login.locale_id + "</user_locale><system_locale>" + mService.user.profile.login.default_locale_id + "</system_locale>" + problemDescXml + additionalDescXml + "<customer_name>" + mService.util.getXmlString($("#product_information_edit_customer_name").getVal()) + "</customer_name><udf_char_1>" + $("#product_information_edit_udf_char_1").getVal() + "</udf_char_1><udf_char_2>" + $("#product_information_edit_udf_char_2").getVal() + "</udf_char_2></inputparam>",
                                    p_rec_timestamp: "00000000-0000-0000-0000-000000000000",
                                    p_save_mode: "U"
                                },
                                "outputparam": {
                                    "p_service_call_ref_no": product_information.variable.selectedRecord.call_no
                                }
                            }
                        }),
                        success: function (response) {
                            try {
                                mService.app.alert("success", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_details",
                                    lblgrpid: "success"
                                });
                                product_information.msPageValueChanged = false;
                                product_information.customHandler.refreshListView();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        },
                        error: function (e) {
                            try {
                                mService.app.alert("error", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_details",
                                    lblgrpid: "error"
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }
                    });
                }
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        wflowSubmitClick: function () {
            try {
                $.ajax({
                    async: false,
                    url: mService.app.clientURL + "/JSONServiceEndpoint.aspx?appName=mservice&serviceName=update_call_wfeventverb_status_change&path=context/outputparam",
                    method: "POST",
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify({
                        context: {
                            "sessionId": mService.app.getSessionId(),
                            "userId": mService.app.getUserId(),
                            "client_id": mService.app.getClientId(),
                            "locale_id": mService.app.getLocaleId(),
                            "country_code": mService.app.getCountryCode(),
                            "inputparam": {
                                p_call_ref_no: product_information.variable.selectedRecord.call_no,
                                p_wfeventverb_id: product_information.variable.selectedEventverb,
                                p_event_date: kendo.toString((new Date()), "yyyy-MM-dd"),
                                p_event_hour: kendo.toString((new Date()), "HH"),
                                p_event_minute: kendo.toString((new Date()), "mm"),
                                p_from_wf_stage_no: product_information.variable.selectedRecord.call_wf_stage,
                                p_to_wf_stage_no: product_information.variable.selectedToStage,
                                p_from_wf_status: product_information.variable.selectedRecord.call_status,
                                p_to_wf_status: product_information.variable.selectedToStatus,
                                p_channel_id: "WEB",
                                p_by_employee_id: mService.user.profile.login.employee_id,
                                p_to_employee_id_string: "",
                                p_reason_code: "",
                                p_comments: $("#product_information_workflow_comments").getVal(),
                                p_lattitude_value: "",
                                p_longitude_value: "",
                                p_attachment_xml: "",
                                p_inputparam_xml1: "",
                                p_inputparam_xml2: "",
                                p_inputparam_xml3: "",
                                p_rec_tstamp: product_information.variable.selectedRecord.rec_tstamp,
                                p_save_mode: "A"
                            }
                        }
                    }),
                    success: function (response) {
                        try {
                            if (response.document === undefined) {
                                mService.app.alert("success", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_" + product_information.variable.selectedEventverb,
                                    lblgrpid: "success"
                                });
                                product_information.msPageValueChanged = false;
                                product_information.customHandler.refreshListView();
                            } else {
                                mService.app.alert("error", {
                                    scrid: mService.page.navigation.get.subMenuID(),
                                    lblid: "call_" + product_information.variable.selectedEventverb,
                                    lblgrpid: "error"
                                });
                            }
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    },
                    error: function (e) {
                        try {
                            mService.app.alert("error", {
                                scrid: mService.page.navigation.get.subMenuID(),
                                lblid: "call_" + product_information.variable.selectedEventverb,
                                lblgrpid: "error"
                            });
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getActionBarHtml: function (eventVerbs) {
            var html,
                index;
            try {
                html = "";
                for (index = 0; index < eventVerbs.length; index++) {
                    eventVerbs[index].scrID = "product_information";
                    eventVerbs[index].buttonRegion = "";
                    html += mService.config.template.getTransformedHtml("home_workflow_action_bar_template", eventVerbs[index]);
                };
                return html;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        getWorkflowEvents: function (success) {
            try {
                mService.wflow.getWflowEvents({
                    code: "'call_workflow_event_verb'",
                    inputXml: "'" + JSON.stringify({
                        "call_category": product_information.variable.callCategory,
                    }) + "'",
                    record: product_information.variable.selectedRecord
                }, function (data) {
                    try {
                        success(data);
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        resetAddCatalogFields: function () {
            try {
                $("#product_information_add_call_type").setVal("");
                $("#product_information_add_customer_id").setVal("");
                $("#product_information_add_equipment_id").setVal("");
                $("#product_information_add_asset_id").setVal("");
                $("#product_information_add_udf_char_1").setVal("");
                $("#product_information_add_udf_char_2").setVal("");
                $("#product_information_add_asset_location").setVal("");
                $("#product_information_add_problem_description").setVal("");
                $("#product_information_add_additional_information").setVal("");
                $("#product_information_add_customer_contact_name").setVal("");
                $("#product_information_add_customer_contact_number").setVal("");
                $("#product_information_add_customer_contact_email").setVal("");
                $("#product_information_add_customer_name").setVal("");
                $("#product_information_add_call_priority").setVal("");
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        refreshListView: function () {
            var catalogID,
                listView,
                dSource;
            try {
                catalogID = mService.page.navigation.get.pageCatalogID();
                listView = $("#product_information_" + catalogID + "_list_view").data("kendoListView");
                dSource = mService.dSource.getSource({
                    code: "'call_register'",
                    inputXml: "'" + JSON.stringify({
                        "call_category": product_information.variable.callCategory,
                        "list_type": catalogID.toUpperCase(),
                        "search_string": $("#product_information_" + catalogID + "_list_search_box").val()
                    }) + "'"
                });
                dSource.read().then(function () {
                    var selectedItem;
                    try {
                        listView.dataSource.data(dSource.data());
                        if (product_information.variable.selectedRecord !== null) {
                            selectedItem = $.grep(listView.dataSource.data(), function (e, i) {
                                try {
                                    return e.call_no === product_information.variable.selectedRecord.call_no;
                                } catch (exception) {
                                    mService.exception.handle(exception);
                                }
                            })[0];
                            if (selectedItem !== undefined) {
                                listView.select(listView.items().filter("[data-uid='" + selectedItem.uid + "']"));
                            } else {
                                listView.select(listView.items().first());
                            }
                        } else {
                            listView.select(listView.items().first());
                        };
                        if (dSource.data().length === 0) {
                            mService.app.alert("info", {
                                scrid: mService.page.navigation.get.subMenuID(),
                                lblid: "no_data_found",
                                lblgrpid: "info"
                            });
                            product_information.variable.selectedRecord = null;
                            product_information.catalog[mService.page.navigation.get.pageCatalogID()][mService.page.navigation.get.pageSubCatalogID()]();
                        }
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }
    },
    widget: {
        change: {
            add_customer_id: function () {
                try {
                    $("#product_information_add_equipment_id").setVal("");
                    $("#product_information_add_asset_id").setVal("");
                    $("#product_information_add_equipment_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                        code: "'equipment_id'",
                        inputXml: "'" + JSON.stringify({
                            "customer_id": $("#product_information_add_customer_id").getVal()
                        }) + "'"
                    }));
                    $("#product_information_add_asset_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                        code: "'asset_id'",
                        inputXml: "'" + JSON.stringify({
                            "customer_id": $("#product_information_add_customer_id").getVal()
                        }) + "'"
                    }));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            },
            edit_customer_id: function () {
                try {
                    $("#product_information_edit_equipment_id").setVal("");
                    $("#product_information_edit_asset_id").setVal("");
                    $("#product_information_edit_equipment_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                        code: "'equipment_id'",
                        inputXml: "'" + JSON.stringify({
                            "customer_id": $("#product_information_edit_customer_id").getVal()
                        }) + "'"
                    }));
                    $("#product_information_edit_asset_id").data("kendoComboBox").setDataSource(mService.dSource.getSource({
                        code: "'asset_id'",
                        inputXml: "'" + JSON.stringify({
                            "customer_id": $("#product_information_edit_customer_id").getVal()
                        }) + "'"
                    }));
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }
        }
    },
    variable: {
        callCategory: "SE"
    }
};
