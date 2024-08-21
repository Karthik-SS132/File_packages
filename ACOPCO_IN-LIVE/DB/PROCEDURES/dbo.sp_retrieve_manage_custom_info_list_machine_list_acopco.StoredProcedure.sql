DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_list_machine_list_acopco]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_machine_list_acopco] 
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
			'"code":"' + a.asset_id + '",' +
			'"description":"' + a.asset_id + '",' +
			'"equipment_id":"' + a.equipment_id + '",' +
			'"customer_id":"' + a.customer_id  + '",' +
			'"equipment_category":"' + e.equipment_category  + '",' +
			'"equipment_type":"' + e.equipment_type  + '"' +
		'}'
	as o_custom_info_json
	from asset_master a, customer c, equipment e
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.asset_status ='A'
		and a.company_id = c.company_id
		and a.country_code = c.country_code
		and a.customer_id  = c.customer_id
		and a.equipment_id = e.equipment_id
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
