generate_service_coupon = {
	constructScreen : function () {
		$('#generate_service_coupon_header_1').html("<embed src = '" + generate_service_coupon.variable.custom.output_file_path + generate_service_coupon.variable.custom.document_type + "/" + generate_service_coupon.variable.custom.output_file_name + ".pdf?state=" + new Date().getTime() + "' style = 'width:100%; height:580px'/>");
	},
	variable : {
		standard : {
			popupIndicator : true
		},
		custom : {
			
		}
	}
};
