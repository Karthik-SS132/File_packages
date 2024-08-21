DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_item_list]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_item_list] 
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
			'"code":"' + a.item_code + '",' +
			'"description":"' + a.item_code + '-'+ a.item_description+ '",' +
			'"description_1":"' + a.item_description  + '"' +
		'}'
	as o_custom_info_json
	from item_master a, item_rate c
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.company_id = c.company_id
		and a.country_code = c.country_code
		and a.item_code  = c.item_code 
		and a.item_variant_code = c.item_variant_code
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END

GO
