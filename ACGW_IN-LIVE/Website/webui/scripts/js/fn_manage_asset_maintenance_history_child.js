var manage_asset_maintenance_history_child = {
	constructScreen : function () {
		$("#manage_asset_maintenance_history_child").attr("style", "height: 90%; width: 100%;");
		if(manage_asset_maintenance_history.variable.custom.attachmentTobeViewed.endsWith(".heic")){
			$("#manage_asset_maintenance_history_child").find("hr").hide();
			$("#manage_asset_maintenance_history_child_footer").hide();
			fetch("../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_asset_maintenance_history.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime())
			.then((res) => res.blob())
			.then((blob) => heic2any({
					blob
				}))
			.then((conversionResult) => {
				var convertedImageUrl = URL.createObjectURL(conversionResult);
				$('#manage_asset_maintenance_history_child').prepend(`<center style="height: 100%;"><img src="${convertedImageUrl}" style="height: 100%;"></img></center>`);
				$("#manage_asset_maintenance_history_child").find("hr").show();
				$("#manage_asset_maintenance_history_child_footer").show();
			})
			.catch((e) => {
				if(e.message == "ERR_USER Image is already browser readable: image/jpeg"){
				fetch("../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_asset_maintenance_history.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime())
				.then((res) => res.blob())
				.then((blob) => {
					URL.revokeObjectURL(blob);
					blob = blob.slice(0, blob.size, "image/jpeg");
					var convertedImageUrl = URL.createObjectURL(blob);
					$('#manage_asset_maintenance_history_child').prepend(`<center style="height: 100%;"><img src="${convertedImageUrl}" style="height: 100%;"></img></center>`);
					$("#manage_asset_maintenance_history_child").find("hr").show();
					$("#manage_asset_maintenance_history_child_footer").show();
				})
			} else {
				alert(e.message);
			}
			});
		} else {
			$('#manage_asset_maintenance_history_child').prepend("<embed src='../../content_store/" + login_profile.client_id + "/" + login_profile.country_code + "/" + manage_asset_maintenance_history.variable.custom.attachmentTobeViewed + "?state=" + new Date().getTime() + "' style='height: 100%; width: 100%;'></embed>");
		}
	},
	variable : {
		standard : {
			popupIndicator : true
		},
		custom : {},
	}
};