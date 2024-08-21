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
	postConstruct : function(){
		$("#manage_change_password_old_password_eye_icon").click(function(){
			if($("#manage_change_password_old_password").attr("type") == "password"){
				$("#manage_change_password_old_password").attr("type","text");
				$("#manage_change_password_old_password_eye_icon").html("");
			} else {
				$("#manage_change_password_old_password").attr("type","password");
				$("#manage_change_password_old_password_eye_icon").append("<font size='5'>/</font>");
			};
		});
		$("#manage_change_password_new_password_eye_icon").click(function(){
			if($("#manage_change_password_new_password").attr("type") == "password"){
				$("#manage_change_password_new_password").attr("type","text");
				$("#manage_change_password_new_password_eye_icon").html("");
			} else {
				$("#manage_change_password_new_password").attr("type","password");
				$("#manage_change_password_new_password_eye_icon").append("<font size='5'>/</font>");
			};
		});
		$("#manage_change_password_confirm_new_password_eye_icon").click(function(){
			if($("#manage_change_password_confirm_new_password").attr("type") == "password"){
				$("#manage_change_password_confirm_new_password").attr("type","text");
				$("#manage_change_password_confirm_new_password_eye_icon").html("");
			} else {
				$("#manage_change_password_confirm_new_password").attr("type","password");
				$("#manage_change_password_confirm_new_password_eye_icon").append("<font size='5'>/</font>");
			};
		});
	},
	buttonEventHandler : {
		submit_btn_click : function (element, event) {
			var returnValue,
			oldPassword,
			newPassword,
			confirmNewPassword;
			oldPassword = $("#manage_change_password_old_password").getVal();
			newPassword = $("#manage_change_password_new_password").getVal();
			confirmNewPassword = $("#manage_change_password_confirm_new_password").getVal();
			if (oldPassword !== "" && newPassword !== "" && confirmNewPassword !== "") {
				if (oldPassword !== newPassword) {
					if (newPassword === confirmNewPassword) {
						if (newPassword.length >= 8) {
							if (newPassword.match(/^(?=.*[!@#$%^&*])/) && newPassword.match(/[a-z]/g) && newPassword.match(/[A-Z]/g) && newPassword.match(/[0-9]/g)) {
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
							} else {
								alert("Your password must have minimum one lowercase, one uppercase, one special character and one numeric value.");
								return false;
							}
						} else {
							alert("New password length must be minimum 8 characters.");
							return false;
						}
					} else {
						alert("New password and Confirm New password must be same.");
						return false;
					}
				} else {
					alert("Old password and New password cannot be same.");
					return false;
				}
			} else {
				alert("Please enter a valid password.");
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