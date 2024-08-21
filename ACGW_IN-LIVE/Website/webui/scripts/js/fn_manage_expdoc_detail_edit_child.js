var manage_expdoc_detail_edit_child = {
	constructScreen : function () {
		$("#manage_expdoc_detail_edit_child").attr("style", "height: 90%; width: 100%;");
		$('#manage_expdoc_detail_edit_child').prepend("<embed src='../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_expdoc_detail.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime() + "' style='height: 100%; width: 100%;'></embed>");
	},
	buttonEventHandler : {
		misc_btn_click : function (element, event) {
			var anchor;
			anchor = $("<a>").attr("href", "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_expdoc_detail.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime()).attr("download", manage_expdoc_detail.variable.custom.attachmentTobeViewed.split("/")[2]).appendTo("#manage_expdoc_detail_edit_child");
			anchor[0].click();
			anchor.remove();
		}
	},
	variable : {
		standard : {
			popupIndicator : true
		},
		custom : {},
	}
};