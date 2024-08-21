IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_file_extensions_allowed')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_file_extensions_allowed]
END
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_file_extensions_allowed] 
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
	
	declare @p_attachment_type varchar(50)


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

	
	/* GETTING THE INPUT PARAMETERS TO BE USED FURTHER IN THE PROGRAM */
	select @p_attachment_type = paramval
	from #inputparams 
	where paramname = 'attachment_type'


	select '' as custom_info_list,
		'{' +
			'"code":"' + a.type_code_value + '",' +
			'"parent_code":"' + a.category_code_value + '",' +
			'"description":"' + dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'FILEEXTNALLOWED', a.type_code_value) + '"' +
		'}'
	as o_custom_info_json
	from category_type_link a
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.link_type = 'FA'

	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
