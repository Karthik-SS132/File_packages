IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_machine_list_acgw')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_machine_list_acgw]
END
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_machine_list_acgw]    Script Date: 23-01-2024 15:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
 * Function to retrieve list of ciustom info records
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_machine_list_acgw] 
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
				'"description":"' + a.asset_id +'",'+
				'"asset_ind":"' + 
						(
							case (select 1 from asset_master
								where company_id = @i_client_id
									and country_code = @i_country_code
									and asset_id = a.asset_id
									and ( isnull(installation_date, '') != ''
										or
										(select count(*) from call_register
										where company_id = @i_client_id
											and country_code = @i_country_code
											and asset_id = a.asset_id
											and call_type in ('COMM', 'RCPCOMM') 
											) >= 1
										)
									)		
				when 1 then '1'
				else '0'
				end
						) 
				+'",'+
				'"model":"' + isnull(a.equipment_id,'' ) +'",'+
				isnull((select	'"customer_id":"'+ISNULL(c.customer_id,'')+'",'+
								'"customer_name":"'+ISNULL(c.customer_name,'')+'",'+
								'"customer_contact_name":"'+ISNULL(c.contact_person_1,'')+'",'+
								'"customer_contact_number":"'+ISNULL(c.contact_person_1_mobile_no,'')+'",'+
								'"customer_contact_email":"'+ISNULL (c.contact_person_1_email_id, '') + '",'
							from customer c
							where c.company_id = @i_client_id
							and  c.country_code	= @i_country_code
							and  c.customer_id	= a.customer_id
				),
				'"customer_id":"", "customer_name":"", "customer_contact_name":"", "customer_contact_number":"", "customer_contact_email":"",') + 
				'"asset_location":"' +a.asset_location_code +'"'+
			'}'
	as o_custom_info_json
	from asset_master a
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END