function fn_manage_asset_service_visit_schedule_generate_service_coupon()
{
	document_type = "Coupon";
	document_template = "asset_visit_schedule";
	retrieve_service_name="/mservice/retrieve_asset_service_visit_schedule_for_docgen";
	retrieve_request_xml = "<inputparam><p_inputparam_xml>" + getXmlString("<asset_id>" + manage_asset_service_visit_schedule_grid_1.dataSource.getByUid(manage_asset_service_visit_schedule_grid_1.select().data("uid")).asset_id + "</asset_id>") + "</p_inputparam_xml></inputparam>";
	output_file_path = "/content_store/dev/in/";
	output_file_name = manage_asset_service_visit_schedule_grid_1.dataSource.getByUid(manage_asset_service_visit_schedule_grid_1.select().data("uid")).asset_id;
	
	executeService_generate_pdf_document();
	if(pdf_update_status == "SP001")
	{
		var pdf_path = output_file_path + document_type + "/" + output_file_name +".pdf";
		$('#manage_asset_service_visit_schedule_generate_service_coupon_header_1').html("<embed src='"+ pdf_path +"' " +"style='width:100%;height:580px' />");
	}
}

