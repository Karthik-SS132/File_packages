var manage_change_password = {
	constructScreen : function () {
		return true;
	},
	initializeWidgets : function () {
		$("#manage_change_password_old_password").initializeWTextbox({
			screenID : "manage_change_password",
			type: "password"
		});
		$("#manage_change_password_new_password").initializeWTextbox({
			screenID : "manage_change_password",
			type: "password"
		});
		$("#manage_change_password_confirm_new_password").initializeWTextbox({
			screenID : "manage_change_password",
			type: "password"
		});
	},
	widgetEventHandler : {
		old_password_change : function (element, event) {
			if ($("#manage_change_password_old_password").getVal() != "" && $("#manage_change_password_new_password").getVal() != "") {
				if ($("#manage_change_password_old_password").getVal() == $("#manage_change_password_new_password").getVal()) {
					alert("Old password and New password cannot be same.");
					$("#manage_change_password_old_password").focus();
					$("#manage_change_password_old_password").setVal("");
				}
			}
		},
		new_password_change : function (element, event) {
			if ($("#manage_change_password_old_password").getVal() != "" && $("#manage_change_password_new_password").getVal() != "") {
				if ($("#manage_change_password_old_password").getVal() == $("#manage_change_password_new_password").getVal()) {
					alert("Old password and New password cannot be same.");
					$("#manage_change_password_new_password").focus();
					$("#manage_change_password_new_password").setVal("");
				}
			}
			if ($("#manage_change_password_confirm_new_password").getVal() != "" && $("#manage_change_password_new_password").getVal() != "") {
				if ($("#manage_change_password_confirm_new_password").getVal() != $("#manage_change_password_new_password").getVal()) {
					alert("New password and Confirm New password must be same.");
					$("#manage_change_password_new_password").focus();
					$("#manage_change_password_new_password").setVal("");
				}
			}
		},
		confirm_new_password_change : function (element, event) {
			if ($("#manage_change_password_confirm_new_password").getVal() != "" && $("#manage_change_password_new_password").getVal() != "") {
				if ($("#manage_change_password_confirm_new_password").getVal() != $("#manage_change_password_new_password").getVal()) {
					alert("New password and Confirm New password must be same.");
					$("#manage_change_password_confirm_new_password").focus();
					$("#manage_change_password_confirm_new_password").setVal("");
				}
			}
		}
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var returnValue;
			returnValue = executeService_change_password({
				p_old_password: $("#manage_change_password_old_password").getVal(),
				p_new_password: $("#manage_change_password_new_password").getVal()
			});
			if(returnValue) {
				alert("Password changed successfully.");
				userSessionLogout();
				return true;
			} else {
				alert("Failed to change the password.");
				return false;
			}
		}
	},
	variable : {
		standard : {
			screenEditableIndicator : true,
			valueChangeIndicator : false,
			reorderParam : [{
					contentID : "content_1",
					columnLength : 1
				}
			],
		},
		custom : {},
	}
};