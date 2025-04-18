/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_timecard_allocated_to_ind]    Script Date: 9/22/2023 3:47:26 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_timecard_allocated_to_ind')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_timecard_allocated_to_ind]
END
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_timecard_allocated_to_ind]    Script Date: 9/22/2023 3:47:26 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_timecard_allocated_to_ind] 
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
			'"code":"' + a.code + '",' +
			'"description":"' + dbo.code_description
			(
				@i_client_id, 
				@i_country_code, 
				@i_locale_id,
				'TIMEALLOCTOCD', 
				a.code
			) + '"' +
		'}'
	as o_custom_info_json
	from code_table a
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.code_type = 'TIMEALLOCTOCD'
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
