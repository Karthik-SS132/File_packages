DROP PROCEDURE IF EXISTS [dbo].[sp_retrieve_manage_custom_info_list_location_list]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_location_list] 
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
	
	declare @p_skip varchar(10), 
		@p_take varchar(10), 
		@p_offset_count int, 
		@p_rowcount int


	if (@i_inputparam_xml = '') 
	begin 
		set @i_inputparam_xml = '{}' 
	end


	/* GETTING THE INPUT PARAMETERS TO BE USED FURTHER IN THE PROGRAM */
	select @p_skip = json_value(@i_inputparam_xml, '$.skip')
	select @p_take = json_value(@i_inputparam_xml, '$.take')
	

	if @p_skip is null
	begin
		select @p_skip = 0
	end
	
	if @p_take is null
	begin
		select @p_take = 0
	end
	
	select @p_offset_count = @p_skip	
    

	select '' as custom_info_list, /* dummy column aliased by result set name */
		'{' +
			'"code":"' + a.location_code + '",' +
			'"description":"' + a.location_name_short + '"' +
		'}'
	as o_custom_info_json /* unicode string */
	from customer_location a
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.customer_id in (
			select customer_id 
			from customer_user_mapping
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_id = @i_user_id
		)
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
