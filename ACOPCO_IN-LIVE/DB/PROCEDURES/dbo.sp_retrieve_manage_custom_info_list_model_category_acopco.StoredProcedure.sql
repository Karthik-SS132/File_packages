DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_model_category_acopco]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_model_category_acopco] 
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
	

	create table #inputparams 
	(
		paramname varchar(50) not null,
		paramval varchar(50) null
	)

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
		
	select '' as custom_info_list,
		'{' +
			'"code":"' + a.category_code_value + '",' +
			'"description":"' + (case (select 1 from code_table_mlingual_translation f
				where f.company_id = @i_client_id
					and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'EQUIPCATG'
					and f.code = a.category_code_value)
			when 1 then
				(select e.short_description from code_table_mlingual_translation e
				where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'EQUIPCATG'
					and e.code = a.category_code_value)
			else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'EQUIPCATG'
					and g.code = a.category_code_value)
			end) + '"' +
		'}'
	as o_custom_info_json
	from category_type_link a
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.link_type = 'EC'
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
