IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_call_type_list')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_call_type_list]
END
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_call_type_list] 
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

	declare @p_country_code varchar(5)


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

select distinct '' as custom_info_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' +  dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CALLTYPE',a.type_code_value)+ '",' +
				'"parent_code":"' + a.category_code_value + '",' +
				'"parent_id":"' + a.category_code_value + '"' +
			'}' as o_custom_info_json  /* unicode string */
		from category_type_link a, code_table b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.category_code_type = 'CALLCATG'
			and a.type_code_type != 'CALLPRIORITY'
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
