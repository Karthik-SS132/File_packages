DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_dealer_list_dynapac]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_dealer_list_dynapac] 
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
			'"code":"' + 'CR' + '",' +
			'"description":"' + 'CR'+ '",' +
			'"dealer_address":"'+ 'address' +'",' +
			'"dealer_city":"'+ 'city'+'",' +
			'"dealer_state":"'+ 'state'+'",' +
			'"dealer_pincode":"'+ 'pincode'+'",' +
			'"parent_code":"' + 'in' + '",' +
			'"parent_id":"' + 'in' + '"' +
			'}'
			as o_custom_info_json 
	union 
	select '' as custom_info_list,
		'{' +
			'"code":"' + s.dealer_id + '",' +
			'"description":"'+ s.dealer_name_short+'",' +
			'"dealer_address":"'+ s.ho_address_line_1+','+isnull(s.ho_address_line_2,'')+','+isnull(s.ho_address_line_3,'') +'",' +
			'"dealer_city":"'+ s.ho_city+'",' +
			'"dealer_state":"'+ s.ho_state_code+'",' +
			'"dealer_pincode":"'+ s.ho_pincode+'",' +
			'"parent_code":"' + s.country_code + '",' +
			'"parent_id":"' + s.country_code + '"' +
		'}'
	as o_custom_info_json
	from dealer_master s
			where s.country_code = @i_country_code
			and s.company_id = @i_client_id
			
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
