DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_contact_search_byname_dynapac]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_contact_search_byname_dynapac] 
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
			'"code":"' + a.contact_person_1 + '",' + 
			'"description":"' + a.customer_name  +'",'+
			'"customer_address":"' +isnull(a.address_line_1,'')  +'",'+
			'"contact_person":"' +isnull(a.customer_id,'') +'",'+
			'"customer_city":"' +isnull(a.city,'') +'",'+
			'"customer_pincode":"' +isnull(a.pincode,'') +'",'+
			'"contact_person_mobile_no":"' +isnull(a.contact_person_1_mobile_no,'') +'",'+
			'"customer_fulladdress":"' +isnull(a.address_line_1,'') + ',' + isnull(a.city,'')+ '-' + isnull(a.state_code,'') +'",'+
			'"contact_person_1_email_id":"' +isnull(a.contact_person_1_email_id,'') +'"'+
		'}'
	as o_custom_info_json
	from customer a 
	where a.company_id = @i_client_id 
		  and a.country_code = @i_country_code
		 
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
