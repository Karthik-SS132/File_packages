var manage_call_register_se_edit_child = {
	constructScreen : function () {
		$("#manage_call_register_se_edit_child").attr("style", "height: 90%; width: 100%;");
		if(manage_call_register_se_edit.variable.custom.attachmentTobeViewed.endsWith(".heic")){
			$("#manage_call_register_se_edit_child").find("hr").hide();
			$("#manage_call_register_se_edit_child_footer").hide();
			fetch("../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_call_register_se_edit.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime())
			.then((res) => res.blob())
			.then((blob) => heic2any({
					blob
				}))
			.then((conversionResult) => {
				var convertedImageUrl = URL.createObjectURL(conversionResult);
				$('#manage_call_register_se_edit_child').prepend(`<center style="height: 100%;"><img src="${convertedImageUrl}" style="height: 100%;"></img></center>`);
				$("#manage_call_register_se_edit_child").find("hr").show();
				$("#manage_call_register_se_edit_child_footer").show();
			})
			.catch((e) => {
				if(e.message == "ERR_USER Image is already browser readable: image/jpeg"){
					fetch("../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_call_register_se_edit.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime())
					.then((res) => res.blob())
					.then((blob) => {
						URL.revokeObjectURL(blob);
						blob = blob.slice(0, blob.size, "image/jpeg");
						var convertedImageUrl = URL.createObjectURL(blob);
						$('#manage_call_register_se_edit_child').prepend(`<center style="height: 100%;"><img src="${convertedImageUrl}" style="height: 100%;"></img></center>`);
						$("#manage_call_register_se_edit_child").find("hr").show();
						$("#manage_call_register_se_edit_child_footer").show();
					})
				} else {
					alert(e.message);
				}
			});
		} else {
			$('#manage_call_register_se_edit_child').prepend("<embed src='../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_call_register_se_edit.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime() + "' style='height: 100%; width: 100%;'></embed>");
		}
	},
	buttonEventHandler : {
		misc_btn_click : function (element, event) {
			if(manage_call_register_se_edit.variable.custom.attachmentTobeViewed.endsWith(".heic")){
				fetch("../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_call_register_se_edit.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime())
				.then((res) => res.blob())
				.then((blob) => heic2any({
						blob
					}))
				.then((conversionResult) => {
					var convertedImageUrl = URL.createObjectURL(conversionResult);
					$('#manage_call_register_se_edit_child').append(`<a href="${convertedImageUrl}"></a>`);
					$('#manage_call_register_se_edit_child a').attr("download", manage_call_register_se_edit.variable.custom.attachmentTobeViewed.split("/")[2].replace(".heic",".jpg"));
					$('#manage_call_register_se_edit_child a')[0].click();
					$('#manage_call_register_se_edit_child a').remove();
				})
				.catch((e) => {
					if(e.message == "ERR_USER Image is already browser readable: image/jpeg"){
						fetch("../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_call_register_se_edit.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime())
						.then((res) => res.blob())
						.then((blob) => {
							blob = blob.slice(0, blob.size, "image/jpeg");
							var convertedImageUrl = URL.createObjectURL(blob);
							$('#manage_call_register_se_edit_child').append(`<a href="${convertedImageUrl}"></a>`);
							$('#manage_call_register_se_edit_child a').attr("download", manage_call_register_se_edit.variable.custom.attachmentTobeViewed.split("/")[2].replace(".heic",".jpg"));
							$('#manage_call_register_se_edit_child a')[0].click();
							$('#manage_call_register_se_edit_child a').remove();
						})
					} else {
						alert(e.message);
					}
				});
			} else {
				var anchor;
				anchor = $("<a>").attr("href", "../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_call_register_se_edit.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime()).attr("download", manage_call_register_se_edit.variable.custom.attachmentTobeViewed.split("/")[2]).appendTo("#manage_call_register_se_edit_child");
				anchor[0].click();
				anchor.remove();
			}
		}
	},
	variable : {
		standard : {
			popupIndicator : true
		},
		custom : {},
	}
};