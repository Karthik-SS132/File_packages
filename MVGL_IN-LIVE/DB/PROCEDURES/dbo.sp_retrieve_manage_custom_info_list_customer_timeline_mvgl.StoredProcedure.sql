/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_customer_timeline_mvgl]    Script Date: 3/24/2023 3:24:22 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_manage_custom_info_list_customer_timeline_mvgl')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_customer_timeline_mvgl]
END
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



/*
 * Generic function to retrieve list
 */
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_customer_timeline_mvgl] 
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
     * Retrieves custom info detail
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    -- The following code raises a 'Not implemented' error. Remove this code after implementing this procedure.
    --RAISERROR( N'Procedure ''sp_retrieve_manage_custom_info_detail'' is yet to be implemented', 15, 1)

    -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
         @o_custom_info_header_json = '' /* unicode string */
     */

    /*
    -- The following SQL snippet illustrates selection of result sets expected from this stored procedure: 
    
    -- Result set 1: custom_info_detail_json

    SELECT
        '' as custom_info_detail_json, /* dummy column aliased by result set name */
        '' as o_custom_info_json /* unicode string */
    FROM <Table name>
    */	

	declare @p_employee_id nvarchar(12),
		@p_organogram_level_no tinyint,
		@p_organogram_level_code nvarchar(15),
		@p_company_location_code nvarchar(8),
		@p_customer_id nvarchar(15),
		@p_customer_location_code nvarchar(10),
		@p_cust_contact_person_1 nvarchar(60),
		@p_cust_contact_person_1_mobile_no varchar(20),
		@p_cust_contact_person_1_email_id nvarchar(60),
		@p_entity_type varchar(2),
		@p_inputparam_xml xml,
		@p_chkbox_filter nvarchar(100)
	
	create table #input_params
	(
		paramname varchar(50) not null,
		paramval varchar(50) null
	)

	set @p_inputparam_xml = CAST(@i_inputparam_xml as XML)

	insert #input_params
	(paramname, paramval)
	SELECT nodes.value('local-name(.)', 'varchar(50)'),
			nodes.value('(.)[1]', 'varchar(50)')
	FROM @p_inputparam_xml.nodes('/inputparam/*') AS Tbl(nodes)

	select @p_chkbox_filter = paramval from #input_params where paramname = 'chkbox_filter'

	update #input_params
	set paramval = null 
	where paramval = 'ALL'
	or paramval = ''

	select @p_employee_id = b.employee_id,
		@p_organogram_level_no = b.organogram_level_no,
		@p_organogram_level_code = b.organogram_level_code
	from users a, employee b
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.user_id = @i_user_id
		and b.company_id = a.company_id
		and b.country_code = a.country_code
		and b.employee_id = a.employee_id

	select @p_entity_type = entity_type
	from entity_organogram_mapping
	where company_id = @i_client_id
		and country_code = @i_country_code
		and organogram_level_no = @p_organogram_level_no
		and organogram_level_code = @p_organogram_level_code
	
	if (@p_entity_type = 'C')
	begin

		select @p_customer_id = customer_id,
			@p_customer_location_code = customer_location_code
		from customer_user_mapping
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = @i_user_id

		select @p_cust_contact_person_1 = contact_person_1,
			@p_cust_contact_person_1_email_id = contact_person_1_email_id,
			@p_cust_contact_person_1_mobile_no = contact_person_1_mobile_no
		from customer_location
		where company_id = @i_client_id
			and country_code = @i_country_code
			and customer_id = @p_customer_id
			and location_code = @p_customer_location_code

	end

	create table #custom_info_list
    (
		created_on_date datetimeoffset(7) null,
		list_xml nvarchar(max) not null
    )

	insert #custom_info_list ( created_on_date, list_xml)
	select a.created_on_date, '{' +
			'"event_category":"' + a.call_category + '",' +
			'"event_category_desc":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CALLCATG',a.call_category) + '",' +
			'"event_type":"' + a.call_type + '",' +
			'"event_type_desc":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CALLTYPE',a.call_type) + '",' +
			'"event_ref_no":"' + a.call_ref_no + '",' +
			'"event_date":"' + isnull(convert(varchar(10), a.created_on_date, 120),'') + '",' +
			'"event_hour":"' + isnull(substring(convert(varchar(10), a.created_on_date, 108), 1, 2),'') + '",' +
			'"event_minute":"' + isnull(substring(convert(varchar(10), a.created_on_date, 108), 4, 2),'') + '",' +
			'"event_finish_date":"' + isnull(convert(varchar(10), a.act_finish_date, 120),'') + '",' +
			'"event_finish_hour":"' + isnull(substring(convert(varchar(10), a.act_finish_date, 108), 1, 2),'') + '",' +
			'"event_finish_minute":"' + isnull(substring(convert(varchar(10), a.act_finish_date, 108), 4, 2),'') + '",' +
			'"event_equipment_category":"' + isnull((select equipment_category from equipment 
												where company_id = @i_client_id
													and country_code = @i_country_code
													and equipment_id = a.equipment_id),'NA') + '",' +
			'"event_equipment_type":"' + isnull((select equipment_type from equipment 
											where company_id = @i_client_id
												and country_code = @i_country_code
												and equipment_id = a.equipment_id),'NA') + '",' +
			'"event_equipment_id":"' + isnull(a.equipment_id,'NA') + '",' +
			'"event_asset_id":"' + isnull(a.asset_id,'NA') + '",' +
			'"attachments": ' + 
				'[' +
					isnull
					(
						(
							select STRING_AGG
							(
								'{'+ 
									'"category":"' + b.attachment_file_category + '",' +
									'"type":"' + b.attachment_file_type + '",' +
									'"path":"' + b.attachment_file_path + '/' + 
										b.call_ref_no + '/' + 
										b.attachment_file_name + '"' +	
								'}', ','
							) 
							from call_user_attachments b
							where b.company_id = a.company_id
								and b.country_code = a.country_code
								and b.call_ref_no = a.call_ref_no
							group by b.call_ref_no
							union 
							select STRING_AGG
							(
								'{'+ 
									'"category":"' + b.attachment_file_category + '",' +
									'"type":"' + b.attachment_file_type + '",' +
									'"path":"' + b.attachment_file_path + '/' + 
										b.call_ref_no + '/' + 
										b.attachment_file_name + '"' +	
								'}', ','
							) 
							from call_user_attachments_store b
							where b.company_id = a.company_id
								and b.country_code = a.country_code
								and b.call_ref_no = a.call_ref_no
							group by b.call_ref_no
						), ''
					) +
				']' +
		'}'
	as  o_custom_info_json
	from call_register a
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.customer_id = @p_customer_id
		and a.customer_location_code = @p_customer_location_code
		and a.call_category = 'SE'
		and a.call_status in ('CO','CL','A','I','O')
		and ( @p_chkbox_filter = ''
				or 'SE' in (select trim(value) from string_split(@p_chkbox_filter,','))
			)
		and a.asset_id = isnull((select paramval from #input_params where paramname = 'asset_id_filter') , a.asset_id)	
		and (isnull((select paramval from #input_params where paramname = 'equipment_id_filter'),'%') = '%'
			or
			a.equipment_id = isnull((select paramval from #input_params where paramname = 'equipment_id_filter'), a.equipment_id)
			)
		and (isnull((select paramval from #input_params where paramname = 'equipment_category_filter'),'%') = '%'
			or
			a.equipment_id in (select equipment_id from equipment 
								where company_id = @i_client_id
									and country_code = @i_country_code
									and equipment_category = (select paramval from #input_params 
																where  paramname = 'equipment_category_filter'))
			)
		and (isnull((select paramval from #input_params where paramname = 'equipment_type_filter'),'%') = '%'
			or
			a.equipment_id in (select equipment_id from equipment 
								where company_id = @i_client_id
									and country_code = @i_country_code
									and equipment_type = (select paramval from #input_params 
																where  paramname = 'equipment_type_filter'))
			)
		and (isnull((select paramval from #input_params where paramname = 'equipment_oem_filter'),'%') = '%'
			or
			a.equipment_id in (select equipment_id from equipment 
								where company_id = @i_client_id
									and country_code = @i_country_code
									and equipment_oem = (select paramval from #input_params 
																where  paramname = 'equipment_oem_filter'))
			)

	union

		select a.quotation_date, '{' +
			'"event_category":"' + a.quotation_category + '",' +
			'"event_category_desc":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'QUOTCATG',a.quotation_category) + '",' +
			'"event_type":"' + a.quotation_type + '",' +
			'"event_type_desc":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'QUOTTYPE',a.quotation_type) + '",' +
			'"event_ref_no":"' + a.quotation_no + '",' +
			'"event_date":"' + isnull(convert(varchar(10), a.quotation_date, 120),'') + '",' +
			'"event_hour":"' + isnull(substring(convert(varchar(10), a.quotation_date, 108), 1, 2),'') + '",' +
			'"event_minute":"' + isnull(substring(convert(varchar(10), a.quotation_date, 108), 4, 2),'') + '",' +
			'"event_finish_date":"' + isnull(convert(varchar(10), a.quotation_date, 120),'') + '",' +
			'"event_finish_hour":"' + isnull(substring(convert(varchar(10), a.quotation_date, 108), 1, 2),'') + '",' +
			'"event_finish_minute":"' + isnull(substring(convert(varchar(10), a.quotation_date, 108), 4, 2),'') + '",' +
			'"event_equipment_category":"' + 'Not Applicable' + '",' +
			'"event_equipment_type":"' + 'Not Applicable' + '",' +
			'"event_equipment_id":"' + 'Not Applicable' + '",' +
			'"event_asset_id":"' + 'Not Applicable' + '",' +
			'"attachments": ' + 
				'[' +
					isnull
					(
						(
							select STRING_AGG
							(
								'{'+ 
									'"category":"' + b.attachment_file_category + '",' +
									'"type":"' + b.attachment_file_type + '",' +
									'"path":"' + b.attachment_file_path + '/' + 
										replace(b.quotation_no,'/','-') + '/' + 
										b.attachment_file_name + '"' +	
								'}', ','
							) 
							from quotation_user_attachments b
							where b.company_id = a.company_id
								and b.country_code = a.country_code
								and b.quotation_no = a.quotation_no
							group by b.quotation_no
						), ''
					) +
				']' +
		'}'
	as  o_custom_info_json
	from quotation_header a
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.buyer_customer_id = @p_customer_id
		and a.buyer_customer_location_code = @p_customer_location_code
		and a.quotation_category = 'PQ'
		and ( @p_chkbox_filter = ''
				or 'PE' in (select trim(value) from string_split(@p_chkbox_filter,','))
			)


	union

		select a.invoice_date, '{' +
			'"event_category":"' + a.invoice_category + '",' +
			'"event_category_desc":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'SINVCATG',a.invoice_category) + '",' +
			'"event_type":"' + a.invoice_type + '",' +
			'"event_type_desc":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'SINVTYPE',a.invoice_type) + '",' +
			'"event_ref_no":"' + a.invoice_no + '",' +
			'"event_date":"' + isnull(convert(varchar(10), a.invoice_date, 120),'') + '",' +
			'"event_hour":"' + isnull(substring(convert(varchar(10), a.invoice_date, 108), 1, 2),'') + '",' +
			'"event_minute":"' + isnull(substring(convert(varchar(10), a.invoice_date, 108), 4, 2),'') + '",' +
			'"event_finish_date":"' + isnull(convert(varchar(10), a.invoice_date, 120),'') + '",' +
			'"event_finish_hour":"' + isnull(substring(convert(varchar(10), a.invoice_date, 108), 1, 2),'') + '",' +
			'"event_finish_minute":"' + isnull(substring(convert(varchar(10), a.invoice_date, 108), 4, 2),'') + '",' +
			'"event_equipment_category":"' + 'Not Applicable' + '",' +
			'"event_equipment_type":"' + 'Not Applicable' + '",' +
			'"event_equipment_id":"' + 'Not Applicable' + '",' +
			'"event_asset_id":"' + 'Not Applicable' + '",' +
			'"attachments": ' + 
				'[' +
					isnull
					(
						(
							select STRING_AGG
							(
								'{'+ 
									'"category":"' + b.attachment_file_category + '",' +
									'"type":"' + b.attachment_file_type + '",' +
									'"path":"' + b.attachment_file_path + '/' + 
										replace(b.invoice_no,'/','-') + '/' + 
										b.attachment_file_name + '"' +	
								'}', ','
							) 
							from salesinvoice_user_attachments b
							where b.company_id = a.company_id
								and b.country_code = a.country_code
								and b.invoice_no = a.invoice_no
							group by b.invoice_no
						), ''
					) +
				']' +
		'}'
	as  o_custom_info_json
	from salesinvoice_header a
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.buyer_customer_id = @p_customer_id
		and a.buyer_customer_location_code = @p_customer_location_code
		and a.invoice_category = 'SI'
		and ( @p_chkbox_filter = ''
				or 'SI' in (select trim(value) from string_split(@p_chkbox_filter,','))
			)

	union

	select a.act_start_date, '{' +
			'"event_category":"' + a.request_category + '",' +
			'"event_category_desc":"' + 'Operator Log' + '",' +
			'"event_type":"' + a.request_type + '",' +
			'"event_type_desc":"' + 'Operator Sheet' + '",' +
			'"event_ref_no":"' + a.request_ref_no + '",' +
			'"event_date":"' + isnull(convert(varchar(10), a.act_start_date, 120),'') + '",' +
			'"event_hour":"' + isnull(substring(convert(varchar(10), a.act_start_date, 108), 1, 2),'') + '",' +
			'"event_minute":"' + isnull(substring(convert(varchar(10), a.act_start_date, 108), 4, 2),'') + '",' +
			'"event_finish_date":"' + isnull(convert(varchar(10), a.act_finish_date, 120),'') + '",' +
			'"event_finish_hour":"' + isnull(substring(convert(varchar(10), a.act_finish_date, 108), 1, 2),'') + '",' +
			'"event_finish_minute":"' + isnull(substring(convert(varchar(10), a.act_finish_date, 108), 4, 2),'') + '",' +
			'"event_equipment_category":"' + ac.product_group_code + '",' +
			'"event_equipment_type":"' + ac.product_sub_group_code + '",' +
			'"event_equipment_id":"' + ac.product_category + '",' +
			'"event_asset_id":"' + ac.product_code + '",' +
			'"attachments": ' + 
				'[' +
					isnull
					(
						(
							select STRING_AGG
							(
								'{'+ 
									'"category":"' + b.attachment_file_category + '",' +
									'"type":"' + b.attachment_file_type + '",' +
									'"path":"' + b.attachment_file_path + '/' + 
										REPLACE(b.attachment_file_name, '_oplogbk.pdf', '') + '/' + 
										b.attachment_file_name + '"' +	
								'}', ','
							) 
							from ancillary_request_user_attachments b
							where b.company_id = a.company_id
								and b.country_code = a.country_code
								and b.request_ref_no = a.request_ref_no
							group by b.request_ref_no
						), ''
					) +
				']' +
		'}'
	as  o_custom_info_json
	from ancillary_request_register a, ancillary_request_register_actions ac
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and ac.company_id = @i_client_id
		and ac.country_code = @i_country_code
		and a.request_ref_no = ac.request_ref_no
		and ac.action_category = 'LINK' 
		and ac.action_type = 'OPLOG'
		and ac.last_update_id = @i_user_id
		and ( @p_chkbox_filter = ''
				or 'QU' in (select trim(value) from string_split(@p_chkbox_filter,','))
			)
		and ac.product_group_code = isnull((select paramval from #input_params where paramname = 'equipment_category_filter') , ac.product_group_code)
		and ac.product_sub_group_code = isnull((select paramval from #input_params where paramname = 'equipment_type_filter') , ac.product_sub_group_code)
		and ac.product_category = isnull((select paramval from #input_params where paramname = 'equipment_id_filter') , ac.product_category)
		and ac.product_code = isnull((select paramval from #input_params where paramname = 'asset_id_filter') , ac.product_code)
		and (isnull((select paramval from #input_params where paramname = 'equipment_oem_filter'),'%') = '%'
			or
			ac.product_category in (select equipment_id from equipment 
								where company_id = @i_client_id
									and country_code = @i_country_code
									and equipment_oem = (select paramval from #input_params 
																where  paramname = 'equipment_oem_filter'))
			)
		
	select '' as custom_info_list,			
			list_xml
			as o_custom_info_json
	from #custom_info_list	
    order by created_on_date desc

	select @o_retrieve_status = 'SP001'
		
    SET NOCOUNT OFF;
END


