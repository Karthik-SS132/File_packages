/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_detail_machine_life]    Script Date: 3/31/2023 10:48:17 AM ******/
DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_detail_machine_life]
GO
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_detail_machine_life]    Script Date: 3/31/2023 10:48:18 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_detail_machine_life] 
   @i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id], 
    @i_custom_info_code [uddt_varchar_60], 
    @i_custom_info_ref_no1 [uddt_nvarchar_60], 
    @i_custom_info_ref_no2 [uddt_nvarchar_60], 
    @o_custom_info_header_json [uddt_nvarchar_max] OUTPUT
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

	if (charindex('{', @i_custom_info_ref_no1) = 0) --EXISTING LOGIC OF SEARCHING WITH DIRECT ASSET ID IN NON PATTERN SCREEN
	begin

		select @o_custom_info_header_json = '{}'

		select @o_custom_info_header_json = 
			'{' + 
				'"asset_id":"' + a.asset_id + '",' +
				'"equipment_id":"' + a.equipment_id + '",' +
				'"installation_date":"' + isnull(convert(varchar(10), a.installation_date, 120), '') + '",' +
				'"customer_id":"' + b.customer_id + '",' +
				'"customer_name":"' + b.customer_name + '",' +
				'"address_line_1":"' + b.address_line_1 + '",' +
				'"address_line_2":"' + isnull(b.address_line_2, '') + '",' +
				'"address_line_3":"' + isnull(b.address_line_3, '') + '",' +
				'"city":"' + b.city + '",' +
				'"state_code":"' + b.state_code + '",' +
				'"state_desc":"' + 
				(
					select state 
					from state c
					where c.country_code = b.country_code
						and c.state_code = b.state_code
				) + '",' +
				'"country_code":"' + b.country_code + '",' +
				'"country_desc":"' + 
				(
					select country_name 
					from country c
					where c.country_code = b.country_code
				) + '",' +
				'"pincode":"' + isnull(b.pincode, '') + '",' +			
				'"contact_person_name":"' + isnull(b.contact_person_1, '') + '",' +
				'"contact_person_no":"' + isnull(b.contact_person_1_mobile_no, '') + '",' +
				'"contact_person_email":"' + isnull(b.contact_person_1_email_id, '') + '"'  +
			'}' 
		from asset_master a, customer b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.asset_id = @i_custom_info_ref_no1
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.customer_id = a.customer_id	


		select '' as custom_info_detail_json,
			'{' +
				'"event_category":"' + a.call_category + '",' +
				'"event_category_desc":"' + 
					dbo.code_description
					(
						a.company_id, 
						a.country_code, 
						@i_locale_id, 
						'CALLCATG', 
						a.call_category
					) + '",' +
				'"event_type":"' + a.call_type + '",' +
				'"event_type_desc":"' + 
					dbo.code_description
					(
						a.company_id, 
						a.country_code, 
						@i_locale_id, 
						'CALLTYPE', 
						a.call_type
					) + '",' +
				'"event_ref_no":"' + a.call_ref_no + '",' +
				'"event_date":"' + isnull(convert(varchar(10), a.created_on_date, 120),'') + '",' +
				'"event_hour":"' + isnull(substring(convert(varchar(10), a.created_on_date, 108), 1, 2),'') + '",' +
				'"event_minute":"' + isnull(substring(convert(varchar(10), a.created_on_date, 108), 4, 2),'') + '",' +
				'"event_finish_date":"' + isnull(convert(varchar(10), a.act_finish_date, 120),'') + '",' +
				'"event_finish_hour":"' + isnull(substring(convert(varchar(10), a.act_finish_date, 108), 1, 2),'') + '",' +
				'"event_finish_minute":"' + isnull(substring(convert(varchar(10), a.act_finish_date, 108), 4, 2),'') + '",' +
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
			and a.asset_id = @i_custom_info_ref_no1
		order by a.created_on_date desc

	end
	else
	begin
		
		/* DECLARING VARIABLES */
		declare @p_retrieve_type varchar(10),
			@p_requester_employee_id nvarchar(12),
			@p_requester_org_level_no tinyint,
			@p_requester_org_level_code nvarchar(15),
			@p_requestor_type varchar(10),
			@p_request_filter_category varchar(50),
			@p_request_filter_text nvarchar(50),
			@p_asset_id_filter nvarchar(30)


		create table #inputparams 
		(
			paramname varchar(50) not null,
			paramval varchar(50) null
		)


		if (@i_custom_info_ref_no1 = '') 
		begin 
			set @i_custom_info_ref_no1 = '{}' 
		end

		if (@i_custom_info_ref_no2 = '') 
		begin 
			set @i_custom_info_ref_no2 = '{}' 
		end


		insert #inputparams 
		(
			paramname, 
			paramval
		)
		select [key], [value]
		from openjson(@i_custom_info_ref_no1)

		insert #inputparams 
		(
			paramname, 
			paramval
		)
		select [key], [value]
		from openjson(@i_custom_info_ref_no2)


		update #inputparams
		set paramval = null 
		where paramval = 'ALL'
			or paramval = ''

		create table #filtered_asset_list
		(
			asset_id nvarchar(30)
		)


		/* GETTING THE INPUT PARAMETERS TO BE USED FURTHER IN THE PROGRAM FROM THE REQUEST */
		select @p_retrieve_type = paramval
		from #inputparams 
		where paramname = 'type'


		select @p_requester_employee_id = a.employee_id,
				@p_requester_org_level_no = a.organogram_level_no,
				@p_requester_org_level_code = a.organogram_level_code
			from employee a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.employee_id = (
					select employee_id
					from users
					where company_id = a.company_id
						and country_code = a.country_code
						and user_id = @i_user_id
				)
			

		/* GETTING THE REQUESTOR TYPE AND ASSOCIATED ASSET LIST */
		if exists 
		(
			select 1 from entity_organogram_mapping
			where company_id = @i_client_id
				and country_code = @i_country_code
				and entity_type in ('O', 'D')
				and organogram_level_no = @p_requester_org_level_no
				and organogram_level_code = @p_requester_org_level_code
		)
		begin

			select @p_requestor_type = 'ENGINEER'

			insert #filtered_asset_list (asset_id)
			select asset_id 
			from asset_mapping_to_employee
			where company_id = @i_client_id
				and country_code = @i_country_code
				and mapping_category = 'SERVICE'
				and mapping_type = 'SERVICE'
				and employee_id = @p_requester_employee_id

		end
		else
		begin

			select @p_requestor_type = 'CUSTOMER'

			insert #filtered_asset_list (asset_id)
			select asset_id
			from customer_user_mapping_to_assets
			where company_id = @i_client_id
				and country_code = @i_country_code
				and employee_id = @p_requester_employee_id

		end
		
		if (@p_retrieve_type = 'list')
		begin

			select @p_request_filter_category = paramval
			from #inputparams 
			where paramname = 'filter_catg'

			select @p_request_filter_text = paramval
			from #inputparams 
			where paramname = 'filter_text'
						

			if (@p_request_filter_category = 'asset_id')
			begin

				delete from #filtered_asset_list
				where asset_id not in (
					select asset_id 
					from asset_master
					where company_id = @i_client_id
						and country_code = @i_country_code
						and asset_id like '%' + isnull(@p_request_filter_text, '') + '%'
				)

			end
			else if (@p_request_filter_category = 'equipment_id')
			begin

				delete from #filtered_asset_list
				where asset_id not in (
					select asset_id 
					from asset_master
					where company_id = @i_client_id
						and country_code = @i_country_code
						and equipment_id like '%' + isnull(@p_request_filter_text, '') + '%'
				)

			end
			else if (@p_request_filter_category = 'equipment_category')
			begin

				delete from #filtered_asset_list
				where asset_id not in (
					select asset_id 
					from asset_master a, equipment b
					where a.company_id = @i_client_id
						and a.country_code = @i_country_code
						and b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.equipment_id = a.equipment_id
						and b.equipment_category like '%' + isnull(@p_request_filter_text, '') + '%'
				)

			end
			else if (@p_request_filter_category = 'equipment_type')
			begin

				delete from #filtered_asset_list
				where asset_id not in (
					select asset_id 
					from asset_master a, equipment b
					where a.company_id = @i_client_id
						and a.country_code = @i_country_code
						and b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.equipment_id = a.equipment_id
						and b.equipment_type like '%' + isnull(@p_request_filter_text, '') + '%'
				)

			end
			else if (@p_request_filter_category = 'customer_name')
			begin

				delete from #filtered_asset_list
				where asset_id not in (
					select asset_id 
					from asset_master a, customer b
					where a.company_id = @i_client_id
						and a.country_code = @i_country_code
						and b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.customer_id = a.customer_id
						and b.customer_name like '%' + isnull(@p_request_filter_text, '') + '%'
				)

			end


			/* RETURNING THE ASSET LIST MATCHING THE FILTER CONDITION */
			select @o_custom_info_header_json = '{}'

			select '' as custom_info_detail_json,
				'{' +
					'"asset_id":"' + a.asset_id + '",' +
					'"equipment_id":"' + a.equipment_id + '",' +
					'"installation_date":"' + isnull(convert(varchar(10), a.installation_date, 120), '') + '",' +
					'"equipment_category":"' + b.equipment_category + '",' +
					'"equipment_type":"' + b.equipment_type + '",' +
					'"customer_id":"' + c.customer_id + '",' +
					'"customer_name":"' + c.customer_name + '"' +
				'}'
			as  o_custom_info_json
			from asset_master a, equipment b, customer c
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and b.company_id = a.company_id
				and b.country_code = a.country_code
				and b.equipment_id = a.equipment_id
				and c.company_id = a.company_id
				and c.country_code = a.country_code
				and c.customer_id = a.customer_id
				and a.asset_id in (
					select asset_id
					from #filtered_asset_list
				)

		end
		else if (@p_retrieve_type = 'detail')
		begin

			select @p_asset_id_filter = paramval
			from #inputparams 
			where paramname = 'asset_id'

			select @o_custom_info_header_json = '{}'

			select @o_custom_info_header_json = 
				'{' + 
					'"asset_id":"' + a.asset_id + '",' +
					'"equipment_id":"' + a.equipment_id + '",' +
					'"equipment_desc":"' + b.description + '",' +
					'"equipment_category":"' + b.equipment_category + '",' +
					'"equipment_type":"' + b.equipment_type  + '",' +
					'"installation_date":"' + isnull(convert(varchar(10), a.installation_date, 120), '') + '",' +
					'"customer_id":"' + c.customer_id + '",' +
					'"customer_name":"' + c.customer_name + '",' +
					'"address_line_1":"' + c.address_line_1 + '",' +
					'"address_line_2":"' + isnull(c.address_line_2, '') + '",' +
					'"address_line_3":"' + isnull(c.address_line_3, '') + '",' +
					'"city":"' + c.city + '",' +
					'"state_code":"' + c.state_code + '",' +
					'"state_desc":"' + 
					(
						select state 
						from state d
						where d.country_code = c.country_code
							and d.state_code = c.state_code
					) + '",' +
					'"country_code":"' + c.country_code + '",' +
					'"country_desc":"' + 
					(
						select country_name 
						from country d
						where d.country_code = c.country_code
					) + '",' +
					'"pincode":"' + isnull(c.pincode, '') + '",' +			
					'"contact_person_name":"' + isnull(c.contact_person_1, '') + '",' +
					'"contact_person_no":"' + isnull(c.contact_person_1_mobile_no, '') + '",' +
					'"contact_person_email":"' + isnull(c.contact_person_1_email_id, '') + '"'  +
				'}' 
			from asset_master a, equipment b, customer c
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.asset_id in (
					select asset_id 
					from #filtered_asset_list
				)
				and a.asset_id = @p_asset_id_filter
				and b.company_id = a.company_id
				and b.country_code = a.country_code
				and b.equipment_id = a.equipment_id
				and c.company_id = a.company_id
				and c.country_code = a.country_code
				and c.customer_id  =a.customer_id				


			select '' as custom_info_detail_json,
				'{' +
					'"event_category":"' + a.call_category + '",' +
					'"event_category_desc":"' + 
						dbo.code_description
						(
							a.company_id, 
							a.country_code, 
							@i_locale_id, 
							'CALLCATG', 
							a.call_category
						) + '",' +
					'"event_type":"' + a.call_type + '",' +
					'"event_type_desc":"' + 
						dbo.code_description
						(
							a.company_id, 
							a.country_code, 
							@i_locale_id, 
							'CALLTYPE', 
							a.call_type
						) + '",' +
					'"event_ref_no":"' + a.call_ref_no + '",' +
					'"event_date":"' + isnull(convert(varchar(10), a.created_on_date, 120),'') + '",' +
					'"event_hour":"' + isnull(substring(convert(varchar(10), a.created_on_date, 108), 1, 2),'') + '",' +
					'"event_minute":"' + isnull(substring(convert(varchar(10), a.created_on_date, 108), 4, 2),'') + '",' +
					'"event_finish_date":"' + isnull(convert(varchar(10), a.act_finish_date, 120),'') + '",' +
					'"event_finish_hour":"' + isnull(substring(convert(varchar(10), a.act_finish_date, 108), 1, 2),'') + '",' +
					'"event_finish_minute":"' + isnull(substring(convert(varchar(10), a.act_finish_date, 108), 4, 2),'') + '",' +
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
				and a.asset_id in (
					select asset_id 
					from #filtered_asset_list
				)
				and a.asset_id = @p_asset_id_filter
			order by a.created_on_date desc

		end
		
	end
	
	SET NOCOUNT OFF;
END

