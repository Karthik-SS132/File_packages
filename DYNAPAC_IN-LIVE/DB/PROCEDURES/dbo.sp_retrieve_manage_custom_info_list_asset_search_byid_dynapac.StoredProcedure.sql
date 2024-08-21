DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_asset_search_byid_dynapac]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_asset_search_byid_dynapac] 
    @i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id], 
    @i_custom_info_code [uddt_varchar_60], 
    @i_inputparam_xml [uddt_nvarchar_max], 
    @o_retrieve_status [uddt_varchar_5] OUTPUT
AS
BEGIN
	
	select '' as custom_info_list,
            '{' +
			'"code":"' + a.asset_id + '",' +
			'"description":"' + a.asset_id + '",' +
			'"equipment_id":"' + a.equipment_id + '",' +
            '"customer_id":"' + a.customer_id + '",' +
			'"customer_name":"' + b.customer_name  +'",'+
			'"customer_address":"' +isnull(b.address_line_1,'')  +'",'+
			'"contact_person":"' +isnull(b.contact_person_1,'') +'",'+
			'"customer_city":"' +isnull(b.city,'') +'",'+
			'"customer_pincode":"' +isnull(b.pincode,'') +'",'+
			'"contact_person_mobile_no":"' +isnull(b.contact_person_1_mobile_no,'') +'",'+
			'"customer_fulladdress":"' +isnull(b.address_line_1,'') + ',' + isnull(b.city,'')+ '-' + isnull(b.state_code,'') +'",'+
			'"contact_person_1_email_id":"' +isnull(b.contact_person_1_email_id,'') +'"'+
			  '}' as o_custom_info_json
				 from asset_master a, customer b
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and b.company_id = @i_client_id
				and b.country_code = @i_country_code
				and a.company_id = b.company_id
				and a.country_code = b.country_code
				and a.customer_id =  b.customer_id
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
