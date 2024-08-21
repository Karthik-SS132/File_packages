DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_equipment_category]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_equipment_category] 
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

	declare @p_country_code varchar(5), 
		@p_state_code nvarchar(10)


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


	select @p_country_code = paramval 
	from #inputparams 
	where paramname = 'country_code'

	select @p_state_code = paramval 
	from #inputparams 
	where paramname = 'state_code'

	
	select '' as custom_info_list,
			'{' +
				'"code":"' + a.equipment_category + '",' +
				'"description":"' + a.equipment_type + '",' +
				'"equipment_type":"' + a.equipment_type + '",' +
				'"model":"' + a.equipment_id + '"' +
			'}' as o_custom_info_json
		from equipment a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO


