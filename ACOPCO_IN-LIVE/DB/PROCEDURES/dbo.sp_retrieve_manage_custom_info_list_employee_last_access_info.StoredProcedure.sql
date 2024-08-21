/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_employee_last_access_info]    Script Date: 3/24/2023 3:24:22 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_employee_last_access_info')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_employee_last_access_info]
END

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_employee_last_access_info] 
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
			'"txn_ind":"' + a.last_accessed_txn_ind + '",' +
			'"txn_ref_no":"' + a.last_accessed_txn_ref_no + '",' +
			'"txn_sub_ref_no":"' + cast(a.last_accessed_txn_subref_no as varchar(5)) + '",' +
			'"feature_id":"' + a.last_accessed_feature_id + '",' +
			'"allow_newtxn_ind":"' + 
			(
				case (a.allow_newtxn_ind) 
					when 1 then 'true' 
					else 'false' 
				end
			) + '",' +
			'"channel_id":"' + a.last_accessed_channel_id + '",' +
			'"date":"' + convert(varchar(10), a.last_accessed_datetime, 120) + '",' +
			'"hour":"' + substring(convert(varchar(10), a.last_accessed_datetime, 108), 1, 2) + '",' +
			'"minute":"' + substring(convert(varchar(10), a.last_accessed_datetime, 108), 4, 2) + '",' +
			'"session_id":"' + a.last_accessed_session_id + '"' +
		'}'
	as o_custom_info_json
	from employee_lastaccess_info a
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.employee_id = (
			select b.employee_id
			from users b
			where b.company_id = a.company_id
				and b.country_code = a.country_code
				and b.user_id = @i_user_id
		)
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
