DROP PROCEDURE IF EXISTS [dbo].[sp_retrieve_manage_custom_info_list_my_machines]
GO
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_list_my_machines]    Script Date: 5/12/2023 5:58:17 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_list_my_machines] 
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

	declare @p_requester_employee_id nvarchar(12),
		@p_requester_org_level_no tinyint,
		@p_requester_org_level_code nvarchar(15),
		@p_requestor_type varchar(10)


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


	create table #temporary_table_asset_list
	(
		asset_id nvarchar(30),
		user_list nvarchar(max)
	)

	create table #temporary_table_mapped_user_list
	(
		asset_id nvarchar(30),
		user_list nvarchar(max)
	)


	if exists 
	(
		select 1 from entity_organogram_mapping
		where company_id = @i_client_id
			and country_code = @i_country_code
			and entity_type = 'O'
			and organogram_level_no = @p_requester_org_level_no
			and organogram_level_code = @p_requester_org_level_code
	)
	begin

		select @p_requestor_type = 'ENGINEER'

		insert #temporary_table_asset_list (asset_id)
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

		insert #temporary_table_asset_list (asset_id)
		select distinct asset_id
		from customer_user_mapping_to_assets
		where company_id = @i_client_id
			and country_code = @i_country_code
			and employee_id = @p_requester_employee_id

	end


	if (@p_requestor_type = 'CUSTOMER')
	begin
		
		insert #temporary_table_mapped_user_list
		(
			asset_id,
			user_list
		)
		select d.asset_id,
			'{' +
				'"title":"' + b.title + '",' +
				'"first_name":"' + b.first_name + '",' +
				'"middle_name":"' + isnull(b.middle_name, '') + '",' +
				'"last_name":"' + b.last_name + '",' +
				'"mobile_no":"' + isnull(b.contact_mobile_no, '') + '",' +
				'"email_id":"' + isnull(b.email_id, '') + '",' +
				'"functional_role_id":"' + c.functional_role_id + '",' +
				'"functional_role_name":"' + isnull((
					select role_description 
					from functional_role
					where company_id = a.company_id
						and country_code = a.country_code
						and functional_role_id = c.functional_role_id), '') + '",' +
				'"location_code":"' + a.customer_location_code + '",' +
				'"location_name":"' + isnull((
					select location_name_short 
					from customer_location
					where company_id = a.company_id
						and country_code = a.country_code
						and customer_id = a.customer_id
						and location_code = a.customer_location_code), '') + '",' +
				'"user_id":"' + a.user_id + '",' +
				'"employee_id":"' + b.employee_id + '",' +
				'"active_ind":"' + 
					case
						(
							select 1 from customer_user_mapping_to_assets
							where company_id = @i_client_id
								and country_code = @i_country_code
								and customer_id = a.customer_id
								and customer_location_code = a.customer_location_code
								and employee_id = b.employee_id
								and asset_id = d.asset_id
						) 
						when 1 then '1' 
						else '0' 
					end + '"' +
			'}' as o_custom_info_json 
		from customer_user_mapping a, employee b, functional_role_employee c, #temporary_table_asset_list d
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.user_id != @i_user_id
			and a.customer_id in 
			(
				select customer_id 
				from customer_user_mapping
				where company_id = a.company_id
					and country_code = a.country_code
					and user_id = @i_user_id
			)
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.employee_id = 
			(
				select employee_id 
				from users
				where company_id = a.company_id
					and country_code = a.country_code
					and user_id = a.user_id
			)
			and c.company_id = a.company_id
			and c.country_code = a.country_code
			and c.employee_id = b.employee_id


		update #temporary_table_asset_list
		set user_list = 
		(
			select string_agg
			(
				isnull(a.user_list, ''), ','
			)
			from #temporary_table_mapped_user_list a
			where a.asset_id = #temporary_table_asset_list.asset_id
			group by a.asset_id
		)

	end


	select '' as custom_info_list,
		'{' +
			'"asset_id":"' + a.asset_id + '",' +
			'"asset_location":"' + isnull(asset_location_code, '') + '",' +
			'"district_code":"' + isnull(a.asset_location_district_code, '') + '",' +
			'"district_desc":"' + isnull ((
				select district_name 
				from district_master
				where country_code = a.asset_location_country_code
					and state_code = a.asset_location_state_code
					and district_code = a.asset_location_district_code
			), '') + '",' +
			'"state_code":"' + isnull(a.asset_location_state_code, '') + '",' +
			'"state_desc":"' + isnull((
				select state 
				from state
				where country_code = a.asset_location_country_code
					and state_code = a.asset_location_state_code
			), '') + '",' +
			'"country_code":"' + isnull(a.asset_location_country_code, '') + '",' +
			'"country_desc":"' + isnull((
				select country_name 
				from country
				where country_code = a.asset_location_country_code
			), '') + '",' +
			'"locator_layout":"' + isnull(a.locator_layout, '') + '",' +
			'"installation_date":"' + isnull(convert(varchar(10), a.installation_date, 120), '') + '",' +
			'"lastcheck_call_jo_ind":"' + isnull(a.lastcheck_call_jo_ind, '') + '",' +
			'"lastcheck_call_jo_id":"' + isnull(a.lastcheck_call_jo_id, '') + '",' +
			'"lastcheck_date":"' + isnull(convert(varchar(10), a.lastcheck_date, 120), '') + '",' +
			'"lastcheck_value_uom":"' + isnull(dbo.code_description(a.company_id, a.country_code, @i_locale_id, 'EQPARAMUOM', a.lastcheck_value_uom), '') + '",' +
			'"lastcheck_value":"' + isnull(convert(varchar(20), (cast(a.lastcheck_value as numeric(14)))), '') + '",' +
			'"org_level_no":"' + cast(a.servicing_org_level_no as varchar(3)) + '",' +
			'"org_level_code":"' + a.servicing_org_level_code + '",' +
			'"equipment_id":"' + a.equipment_id + '",' +
			'"equipment_desc":"' + b.description + '",' +
			'"equipment_category":"' + b.equipment_category + '",' +
			'"equipment_type":"' + b.equipment_type  + '",' +
			'"customer_id":"' + a.customer_id + '",' +
			'"customer_name":"' + c.customer_name + '",' +
			'"cust_contact_name":"' + isnull(c.contact_person_1,'') + '",' +
			'"cust_contact_no":"' + isnull(c.contact_person_1_mobile_no,'') + '",' +
			'"cust_contact_email_id":"' + isnull(c.contact_person_1_email_id,'') + '",' +
			'"customer_address_line_1":"' + isnull(c.address_line_1,'') + '",'+
			'"customer_address_line_2":"' + isnull(c.address_line_2,'') + '",'+
			'"customer_address_line_3":"' + isnull(c.address_line_3,'') + '",'+
			'"customer_city":"' + isnull(c.city,'') + '",'+
			'"customer_state":"' + isnull(c.state_code,'') + '",'+
			'"customer_state_desc":"' + isnull((
				select state
				from state
				where state_code = c.state_code
					and country_code = c.country_code
			), '') + '",' +
			'"customer_pincode":"' + isnull(c.pincode,'') + '",'+
			'"customer_country":"' + isnull(c.country_code,'') + '",' +
			'"customer_country_desc":"' + isnull((
				select country_name
				from country
				where country_code = c.country_code
			), '') + '",' +
			'"active_service_contract":"' + isnull((
				select distinct contract_type + '-' + contract_doc_no
				from asset_service_contract
				where company_id = a.company_id
					and country_code = a.country_code
					and asset_id = a.asset_id
					and datediff(dd, sysdatetimeoffset(), effective_to_date) > 0
			), '') + '",' +
			'"warranty_end_date":"' + isnull((
				select top(1) convert(varchar(10), effective_to_date, 120)
				from asset_service_contract
				where company_id = a.company_id
					and country_code = a.country_code
					and asset_id = a.asset_id	
				order by effective_to_date desc	  
			), '') + '",' +
			'"time_since_lastservice":"' + cast(
				isnull(
					datediff(dd, isnull(a.lastcheck_date, isnull(a.installation_date, sysdatetimeoffset())), sysdatetimeoffset()), 0
				) as varchar(5)
			) + '",' +
			'"birthday_ind":"' + 
				(
					case 
						when datepart(year, sysdatetime()) - datepart(year, a.installation_date) <= 3 then 
						(
							case 
								when ((convert(varchar(2), (datepart(day, sysdatetime()))) + convert(varchar(2), (datepart(month, sysdatetime())))) = 
									(convert(varchar(2), (datepart(day, a.installation_date))) + convert(varchar(2), (datepart(month, a.installation_date))))) then 
								(
									case 
										when b.equipment_type like 'WATERWELL%' then 'WC_' + convert(varchar(1), datepart(year, sysdatetime()) - datepart(year, a.installation_date))
										else 'AC_' + convert(varchar(1), datepart(year, sysdatetime()) - datepart(year, a.installation_date))										
									end
								)
							else ''
						end)
						else ''
					end
				) + '",'+			
			'"user_list":[' + 
			(
				select isnull(user_list , '')
				from #temporary_table_asset_list
				where asset_id = a.asset_id
			) + ']' +
		'}'
	as o_custom_info_json
	from asset_master a, equipment b, customer c
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.asset_status = 'A'
		and a.asset_id in 
		(
			select asset_id
			from #temporary_table_asset_list
		)		
		and b.company_id = a.company_id
		and b.country_code = a.country_code
		and b.equipment_id = a.equipment_id
		and c.company_id = a.company_id
		and c.country_code = a.country_code
		and c.customer_id = a.customer_id
	
	select @o_retrieve_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
