/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_security_purpose_code]  Script Date: 5/22/2023 7:13:38 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_retrieve_manage_custom_info_list_security_purpose_code]
GO
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_security_purpose_code]    Script Date: 5/22/2023 7:13:38 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to retrieve list of ciustom info records
 */
 
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_security_purpose_code] 
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

	declare @p_event varchar(60)
	declare @p_channel_id varchar(60), @p_by_employee_id nvarchar(12), @p_entity_type varchar(2)

	create table #inputparams 
	(
		paramname varchar(50) not null,
		paramval varchar(50) null
	)


	if (@i_inputparam_xml = '') 
	begin 
		set @i_inputparam_xml = '{}' 
	end

	insert #inputparams 
	(
		paramname, 
		paramval
	)
	select [key], [value]
	from openjson(@i_inputparam_xml)


	update #inputparams
	set paramval = null 
	where paramval = 'ALL'
		or paramval = ''


	select @p_event = paramval
	from #inputparams 
	where paramname = 'event'

	select @p_channel_id = paramval
	from #inputparams 
	where paramname = 'channel_id'

	select @p_by_employee_id = employee_id 
	from users 
	where company_id = @i_client_id
	  and country_code = @i_country_code
	  and user_id = @i_user_id

	select @p_entity_type = entity_type 
	from entity_organogram_mapping
	where company_id = @i_client_id
	  and country_code = @i_country_code
	  and cast(organogram_level_no as varchar(2))+ organogram_level_code = 
			(select cast(e.organogram_level_no as varchar(2))+e.organogram_level_code
			 from employee e
			 where e.company_id = @i_client_id
			   and e.country_code = @i_country_code
			   and e.employee_id = @p_by_employee_id)

	if ( @p_event = 'VISITOR_PROFILE_SUBMIT')
	begin

		select '' as custom_info_list,
			'{' +
				'"code":"VERIFYMOBILE"' +
			'}'
		as o_custom_info_json where 1 = 2
		union
		select '' as custom_info_list,
			'{' +
				'"code":"VERIFYEMAIL"' +
			'}'
		as o_custom_info_json 
		where 1 = 2

	end
	else if ( @p_event = 'VISITOR_PAGE_LOGIN')
	begin

		if ( @p_channel_id = 'web' and @p_entity_type = 'C')
		begin

			select '' as custom_info_list,
				'{' +
					'"code":"VERIFYEMAIL"' +
				'}'
			as o_custom_info_json
	    where 1 = 2
		end
		else if ( @p_channel_id = 'mobile' and @p_entity_type = 'C')
		begin
			
			select '' as custom_info_list,
				'{' +
					'"code":"VERIFYMOBILE"' +
				'}'
			as o_custom_info_json
		where 1 = 2	
		end
	end
	else if (@p_event = 'FUNCTIONAL_DRAWER_LOGIN')
	begin

		select '' as custom_info_list,
			'{' +
				'"code":"VERIFYMOBILE"' +
			'}'
		as o_custom_info_json
		where 1 = 2
		union
		select '' as custom_info_list,
			'{' +
				'"code":"VERIFYEMAIL"' +
			'}'
		as o_custom_info_json 
		where 1 = 2
		union
		select '' as custom_info_list,
			'{' +
				'"code":"AUTHUSERMOBILE"' +
			'}'
		as o_custom_info_json 
		where 1 = 2
		union
		select '' as custom_info_list,
			'{' +
				'"code":"AUTHUSEREMAIL"' +
			'}'
		as o_custom_info_json 
		where 1 = 2
	end


	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
