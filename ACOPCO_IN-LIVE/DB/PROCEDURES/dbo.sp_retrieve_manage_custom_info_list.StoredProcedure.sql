/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list]    Script Date: 10/25/2023 4:58:57 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_retrieve_manage_custom_info_list]
GO
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list]    Script Date: 10/25/2023 4:58:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list] 
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
    /*
     * Function to retrieve list of ciustom info records
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    -- The following code raises a 'Not implemented' error. Remove this code after implementing this procedure.
    

    -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
         @o_retrieve_status = '' /* string */
     */

    /*
    -- The following SQL snippet illustrates selection of result sets expected from this stored procedure: 
    
    -- Result set 1: custom_info_list

    SELECT
        '' as custom_info_list, /* dummy column aliased by result set name */
        '' as o_custom_info_json /* unicode string */
    FROM <Table name>
    */

	declare @p_SQLString nvarchar(max) ,	
			@p_ParmDefinition nvarchar(max),
			@p_error_msg nvarchar(max),
			@p_client_group nvarchar(max),
			@p_vertical nvarchar(max),
			@p_solution nvarchar(max)

	select @p_solution = isnull((
			select c.subscription_value2 
			from company_subscription_matrix c
			where c.company_id = a.company_id
				and c.country_code = a.country_code
				and c.subscription_code1 = 'SUBSCRIPTION_PROFILE'
				and c.subscription_code2 = 'SOLUTION'
		), '') from users a
	where a.company_id = @i_client_id
	and a.country_code = @i_country_code
	and a.user_id = @i_user_id

	select @p_vertical = isnull((
			select c.subscription_value2 
			from company_subscription_matrix c
			where c.company_id = a.company_id
				and c.country_code = a.country_code
				and c.subscription_code1 = 'SUBSCRIPTION_PROFILE'
				and c.subscription_code2 = 'VERTICAL'
		), '') from users a
	where a.company_id = @i_client_id
	and a.country_code = @i_country_code
	and a.user_id = @i_user_id

	select @p_client_group = isnull((
			select c.subscription_value2 
			from company_subscription_matrix c
			where c.company_id = a.company_id
				and c.country_code = a.country_code
				and c.subscription_code1 = 'SUBSCRIPTION_PROFILE'
				and c.subscription_code2 = 'CLIENTGROUP'
		), '') from users a
	where a.company_id = @i_client_id
	and a.country_code = @i_country_code
	and a.user_id = @i_user_id

	set @o_retrieve_status = ''


	if exists ( 
		select 1 from sys.objects
		where type = 'P' 
			and name = 'sp_retrieve_manage_custom_info_list_' + @i_custom_info_code + '_' + @i_client_id + '_' + @i_country_code
	)
	begin
		
		set @p_SQLString = 'execute ' + 'sp_retrieve_manage_custom_info_list_' + @i_custom_info_code + '_' +  @i_client_id + '_' + @i_country_code +
			N'	@i_client_id, 
				@i_country_code,
				@i_session_id, 
				@i_user_id, 				
				@i_locale_id,
				@i_custom_info_code, 
				@i_inputparam_xml, 
				@o_retrieve_status OUTPUT';

		set @p_ParmDefinition = N' @i_client_id [uddt_client_id], 
			@i_country_code [uddt_country_code], 
			@i_session_id [sessionid], 
			@i_user_id [userid],		
			@i_locale_id [uddt_locale_id],
			@i_custom_info_code [uddt_varchar_60],
			@i_inputparam_xml [uddt_nvarchar_max],
			@o_retrieve_status [uddt_varchar_5] OUTPUT';

		execute sp_executesql @p_SQLString, @p_ParmDefinition,
			@i_client_id = @i_client_id, 
			@i_country_code = @i_country_code,
			@i_session_id = @i_session_id, 
			@i_user_id = @i_user_id, 
			@i_locale_id = @i_locale_id,
			@i_custom_info_code = @i_custom_info_code, 
			@i_inputparam_xml = @i_inputparam_xml,
			@o_retrieve_status = @o_retrieve_status OUTPUT

	end
	else if exists ( 
		select 1 from sys.objects
		where type = 'P' 
			and name = 'sp_retrieve_manage_custom_info_list_' + @i_custom_info_code + '_' +  @i_client_id
	)
	begin
		
		set @p_SQLString = 'execute ' + 'sp_retrieve_manage_custom_info_list_' + @i_custom_info_code + '_' +  @i_client_id +
			N'	@i_client_id, 
				@i_country_code,
				@i_session_id, 
				@i_user_id, 				
				@i_locale_id,
				@i_custom_info_code, 
				@i_inputparam_xml, 
				@o_retrieve_status OUTPUT';

		set @p_ParmDefinition = N' @i_client_id [uddt_client_id], 
			@i_country_code [uddt_country_code], 
			@i_session_id [sessionid], 
			@i_user_id [userid],		
			@i_locale_id [uddt_locale_id],
			@i_custom_info_code [uddt_varchar_60],
			@i_inputparam_xml [uddt_nvarchar_max],
			@o_retrieve_status [uddt_varchar_5] OUTPUT';

		execute sp_executesql @p_SQLString, @p_ParmDefinition,
			@i_client_id = @i_client_id, 
			@i_country_code = @i_country_code,
			@i_session_id = @i_session_id, 
			@i_user_id = @i_user_id, 
			@i_locale_id = @i_locale_id,
			@i_custom_info_code = @i_custom_info_code, 
			@i_inputparam_xml = @i_inputparam_xml,
			@o_retrieve_status = @o_retrieve_status OUTPUT

	end
	else if exists ( 
		select 1 from sys.objects
		where type = 'P' 
			and name = 'sp_retrieve_manage_custom_info_list_' + @i_custom_info_code + '_' +  @p_client_group
	)
	begin
		
		set @p_SQLString = 'execute ' + 'sp_retrieve_manage_custom_info_list_' + @i_custom_info_code + '_' +  @p_client_group +
			N'	@i_client_id, 
				@i_country_code,
				@i_session_id, 
				@i_user_id, 				
				@i_locale_id,
				@i_custom_info_code, 
				@i_inputparam_xml, 
				@o_retrieve_status OUTPUT';

		set @p_ParmDefinition = N' @i_client_id [uddt_client_id], 
			@i_country_code [uddt_country_code], 
			@i_session_id [sessionid], 
			@i_user_id [userid],		
			@i_locale_id [uddt_locale_id],
			@i_custom_info_code [uddt_varchar_60],
			@i_inputparam_xml [uddt_nvarchar_max],
			@o_retrieve_status [uddt_varchar_5] OUTPUT';

		execute sp_executesql @p_SQLString, @p_ParmDefinition,
			@i_client_id = @i_client_id, 
			@i_country_code = @i_country_code,
			@i_session_id = @i_session_id, 
			@i_user_id = @i_user_id, 
			@i_locale_id = @i_locale_id,
			@i_custom_info_code = @i_custom_info_code, 
			@i_inputparam_xml = @i_inputparam_xml,
			@o_retrieve_status = @o_retrieve_status OUTPUT

	end
	else if exists ( 
		select 1 from sys.objects
		where type = 'P' 
			and name = 'sp_retrieve_manage_custom_info_list_' + @i_custom_info_code + '_' +  @p_vertical
	)
	begin
		
		set @p_SQLString = 'execute ' + 'sp_retrieve_manage_custom_info_list_' + @i_custom_info_code + '_' +  @p_vertical +
			N'	@i_client_id, 
				@i_country_code,
				@i_session_id, 
				@i_user_id, 				
				@i_locale_id,
				@i_custom_info_code, 
				@i_inputparam_xml, 
				@o_retrieve_status OUTPUT';

		set @p_ParmDefinition = N' @i_client_id [uddt_client_id], 
			@i_country_code [uddt_country_code], 
			@i_session_id [sessionid], 
			@i_user_id [userid],		
			@i_locale_id [uddt_locale_id],
			@i_custom_info_code [uddt_varchar_60],
			@i_inputparam_xml [uddt_nvarchar_max],
			@o_retrieve_status [uddt_varchar_5] OUTPUT';

		execute sp_executesql @p_SQLString, @p_ParmDefinition,
			@i_client_id = @i_client_id, 
			@i_country_code = @i_country_code,
			@i_session_id = @i_session_id, 
			@i_user_id = @i_user_id, 
			@i_locale_id = @i_locale_id,
			@i_custom_info_code = @i_custom_info_code, 
			@i_inputparam_xml = @i_inputparam_xml,
			@o_retrieve_status = @o_retrieve_status OUTPUT

	end
	else if exists ( 
		select 1 from sys.objects
		where type = 'P' 
			and name = 'sp_retrieve_manage_custom_info_list_' + @i_custom_info_code + '_' +  @p_solution
	)
	begin
		
		set @p_SQLString = 'execute ' + 'sp_retrieve_manage_custom_info_list_' + @i_custom_info_code + '_' +  @p_solution +
			N'	@i_client_id, 
				@i_country_code,
				@i_session_id, 
				@i_user_id, 				
				@i_locale_id,
				@i_custom_info_code, 
				@i_inputparam_xml, 
				@o_retrieve_status OUTPUT';

		set @p_ParmDefinition = N' @i_client_id [uddt_client_id], 
			@i_country_code [uddt_country_code], 
			@i_session_id [sessionid], 
			@i_user_id [userid],		
			@i_locale_id [uddt_locale_id],
			@i_custom_info_code [uddt_varchar_60],
			@i_inputparam_xml [uddt_nvarchar_max],
			@o_retrieve_status [uddt_varchar_5] OUTPUT';

		execute sp_executesql @p_SQLString, @p_ParmDefinition,
			@i_client_id = @i_client_id, 
			@i_country_code = @i_country_code,
			@i_session_id = @i_session_id, 
			@i_user_id = @i_user_id, 
			@i_locale_id = @i_locale_id,
			@i_custom_info_code = @i_custom_info_code, 
			@i_inputparam_xml = @i_inputparam_xml,
			@o_retrieve_status = @o_retrieve_status OUTPUT

	end
	else if exists ( 
		select 1 from sys.objects
		where type = 'P' 
			and name = 'sp_retrieve_manage_custom_info_list_' + @i_custom_info_code
	)
	begin
		
		set @p_SQLString = 'execute ' + 'sp_retrieve_manage_custom_info_list_' + @i_custom_info_code +
			N'	@i_client_id, 
				@i_country_code,
				@i_session_id, 
				@i_user_id, 				
				@i_locale_id,
				@i_custom_info_code, 
				@i_inputparam_xml, 
				@o_retrieve_status OUTPUT';

		set @p_ParmDefinition = N' @i_client_id [uddt_client_id], 
			@i_country_code [uddt_country_code], 
			@i_session_id [sessionid], 
			@i_user_id [userid],		
			@i_locale_id [uddt_locale_id],
			@i_custom_info_code [uddt_varchar_60],
			@i_inputparam_xml [uddt_nvarchar_max],
			@o_retrieve_status [uddt_varchar_5] OUTPUT';

		execute sp_executesql @p_SQLString, @p_ParmDefinition,
			@i_client_id = @i_client_id, 
			@i_country_code = @i_country_code,
			@i_session_id = @i_session_id, 
			@i_user_id = @i_user_id, 
			@i_locale_id = @i_locale_id,
			@i_custom_info_code = @i_custom_info_code, 
			@i_inputparam_xml = @i_inputparam_xml,
			@o_retrieve_status = @o_retrieve_status OUTPUT

	end

    SET NOCOUNT OFF;
END


GO
