function fn_manage_training_child(type, path) {
	screenChangeInd = "1";
	assignScreenName(divID, screenID);
	screenID = 'manage_training_child';
	divID = screenID;
	AddToNavigationMap(divID, screenID, displayLabel,  parentScreenID);
	if(type == "displayPDF") {
		$('#manage_training_child_video_position').prepend("<object data='" + path + "' width='100%' height='100%'><a href='" + path + "'></a></object>");
	}else {
		$.ajax({
			url: login_profile.protocol+ "//" + window.location.host + "/" + trainingVideoSource,
			type: 'HEAD',
			error: function() {
				$("#manage_training_child_video_position").hide();
				$("#manage_training_child_error_message").show();
			},
			success: function() {
				var video = document.createElement("video");			
				
				video.controls = true;
				document.getElementById("manage_training_child_video_position").appendChild(video);
				
				var source = document.createElement("source");
				source.src = "../../" + trainingVideoSource;
				source.type = trainingVideoType;
				
				video.appendChild(source);
				
				video.onloadstart = function() {
					$("video").hide();
					$("#manage_training_child_loading_message").show();
				};			
				
				video.onloadedmetadata = function() {
					$("video").show();				
					$("#manage_training_child_loading_message").hide();				
				};
				video.play();
				
				
			}
		});
	}
}