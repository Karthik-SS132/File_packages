/****** Object:  StoredProcedure [dbo].[sp_retrieve_listof_values_for_searchcondition_acgw]    Script Date: 16/8/2023 10:48:00 AM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_listof_values_for_searchcondition_acgw')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_listof_values_for_searchcondition_acgw]
END
GO
/****** Object:  StoredProcedure [dbo].[sp_retrieve_listof_values_for_searchcondition_acgw]    Script Date: 16/8/2023 10:48:00 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_retrieve_listof_values_for_searchcondition_acgw]
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
	@i_lov_code_type [uddt_varchar_60], 
	@i_search_field_1 [uddt_nvarchar_60], 
	@i_search_field_2 [uddt_nvarchar_60], 
	@i_search_field_3 [uddt_nvarchar_60], 
	@i_search_field_4 [uddt_nvarchar_60], 
	@i_search_field_5 [uddt_nvarchar_60],
	@o_retrieve_status [uddt_varchar_10] OUTPUT
AS
BEGIN

	declare @p_from_date_filter varchar(50), @p_to_date_filter varchar(50),
			@p_company_location_filter varchar(50), @p_assigned_to_emp_id_filter varchar(50),
			@p_reporting_to_emp_id_filter varchar(50),@p_distributor_filter varchar(50), @p_executive_filter varchar(50),
			@p_shop_filter varchar(50), @p_dealer_id_filter varchar(30)

	select @p_from_date_filter = paramval from #input_params where paramname = 'from_date_filter'
	select @p_to_date_filter = paramval from #input_params where paramname = 'to_date_filter'
	select @p_company_location_filter = paramval from #input_params where paramname = 'company_location_filter'
	select @p_assigned_to_emp_id_filter = paramval from #input_params where paramname = 'assigned_to_emp_id_filter'
	select @p_reporting_to_emp_id_filter = paramval from #input_params where paramname = 'reporting_to_emp_id_filter'
	select @p_dealer_id_filter = paramval from #input_params where paramname = 'dealer_id_filter'
	

	if ( @i_lov_code_type = 'SECALLTYPE_LIST' )
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'CALLTYPE'
								and f.code = a.type_code_value)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'CALLTYPE'
								and e.code = a.type_code_value)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'CALLTYPE'
							and g.code = a.type_code_value)
					end) + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'CC'
			and a.category_code_value = 'SE'
			and a.type_code_type = 'CALLTYPE'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if (@i_lov_code_type = 'COUNTRYDIALCODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'COUNTRYDIALCODE'
						and f.code = a.code)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'COUNTRYDIALCODE'
					and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'COUNTRYDIALCODE'
					and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'COUNTRYDIALCODE'
		return
	end

	if (@i_lov_code_type = 'CUSTCONTTYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CUSTCONTTYPE'
						and f.code = a.code)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'CUSTCONTTYPE'
					and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'CUSTCONTTYPE'
					and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CUSTCONTTYPE'
		return
	end

	if (@i_lov_code_type = 'CUSTOMER_EQUIPMENTOEM_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EQUIPOEM'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EQUIPOEM'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EQUIPOEM'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EQUIPOEM'
			and a.code in (select b.equipment_oem from asset_master a, equipment b
							where a.company_id = @i_client_id
								and a.country_code = @i_country_code
								and b.company_id = a.company_id
								and b.country_code = a.country_code
								and b.equipment_id = a.equipment_id
								and a.customer_id = @i_search_field_1)
		return
	end

	if (@i_lov_code_type = 'CUSTOMER_EQUIPMENTCATEGORY_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EQUIPCATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EQUIPCATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EQUIPCATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EQUIPCATG'
			and a.code in (select b.equipment_category from asset_master a, equipment b
							where a.company_id = @i_client_id
								and a.country_code = @i_country_code
								and b.company_id = a.company_id
								and b.country_code = a.country_code
								and b.equipment_id = a.equipment_id
								and a.customer_id = @i_search_field_1)
		return
	end

	if (@i_lov_code_type = 'CUSTOMER_EQUIPMENTTYPE_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EQUIPTYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EQUIPTYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EQUIPTYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EQUIPTYPE'
			and a.code in (select b.equipment_type from asset_master a, equipment b
							where a.company_id = @i_client_id
								and a.country_code = @i_country_code
								and b.company_id = a.company_id
								and b.country_code = a.country_code
								and b.equipment_id = a.equipment_id
								and a.customer_id = @i_search_field_1)
		return
	end

	if (@i_lov_code_type = 'CUSTOMER_EQUIPMENT_LIST')
	begin
		select distinct '' as value_list,
		   '{' + 
			   '"id":"'+b.equipment_id+'",'+
			   '"desc":"'+b.description+'"'+
		   '}' as o_value_xml
		from asset_master a, equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.equipment_id = a.equipment_id
			and a.customer_id = @i_search_field_1
		return
	end

	if (@i_lov_code_type = 'CUSTOMER_ASSET_LIST')
	begin
		select distinct '' as value_list,
		   '{' + 
			   '"id":"'+a.asset_id+'",'+
			   '"desc":"'+a.asset_id+'"'+
		   '}' as o_value_xml
		from asset_master a, equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.equipment_id = a.equipment_id
			and a.customer_id = @i_search_field_1
		return
	end

	if (@i_lov_code_type = 'CUSTCONTTYPE_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CUSTCONTTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'CUSTCONTTYPE'
					and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'CUSTCONTTYPE'
					and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'CO'
			and a.category_code_value = @i_search_field_1
		return
	end

	if (@i_lov_code_type = 'CUSTCONTCATG_LIST')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'CUSTCONTCATG'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'CUSTCONTCATG'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'CUSTCONTCATG'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CUSTCONTCATG'
		return
	end

	if (@i_lov_code_type = 'GET_CUST_ASSET_MAP_DETAILS')
	begin

		create table #customer_contact_asset_mapping (
			asset_id nvarchar(30), 
			equipment_id nvarchar (30),
			customer_id nvarchar (30),
			applicable_ind bit
		)

		insert into #customer_contact_asset_mapping (asset_id, equipment_id, customer_id, applicable_ind)
		select asset_id, equipment_id, customer_id, 0 
		from asset_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and customer_id = @i_search_field_1
			and asset_status = 'A'

		select distinct '' as value_list,
		  '{' +
				'"customer_id":"' + isnull(a.customer_id, '')  + '",' +
				'"asset_id":"' + isnull(a.asset_id, '')  + '",' +
				'"equipment_id":"' + isnull(a.equipment_id, '')  + '",' +
				'"applicable_ind":"' + cast(ISNULL(a.applicable_ind,0) as varchar(1))   + '"' +
			'}' as o_value_xml
		from #customer_contact_asset_mapping a
		return
	end
	
	if (@i_lov_code_type = 'CUSTOMER_EQUIPMENTTYPE_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EQUIPTYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EQUIPTYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EQUIPTYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EQUIPTYPE'
			and a.code in (select b.equipment_type from asset_master a, equipment b
							where a.company_id = @i_client_id
								and a.country_code = @i_country_code
								and b.company_id = a.company_id
								and b.country_code = a.country_code
								and b.equipment_id = a.equipment_id
								and a.customer_id = @i_search_field_1)
		return
	end

	if (@i_lov_code_type = 'CUSTOMER_EQUIPMENTOEM_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EQUIPOEM'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EQUIPOEM'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EQUIPOEM'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EQUIPOEM'
			and a.code in (select b.equipment_oem from asset_master a, equipment b
							where a.company_id = @i_client_id
								and a.country_code = @i_country_code
								and b.company_id = a.company_id
								and b.country_code = a.country_code
								and b.equipment_id = a.equipment_id
								and a.customer_id = @i_search_field_1)
		return
	end

	if (@i_lov_code_type = 'CUSTOMER_EQUIPMENTCATEGORY_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EQUIPCATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EQUIPCATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EQUIPCATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EQUIPCATG'
			and a.code in (select b.equipment_category from asset_master a, equipment b
							where a.company_id = @i_client_id
								and a.country_code = @i_country_code
								and b.company_id = a.company_id
								and b.country_code = a.country_code
								and b.equipment_id = a.equipment_id
								and a.customer_id = @i_search_field_1)
		return
	end

	if (@i_lov_code_type = 'CUSTOMER_EQUIPMENTTYPE_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EQUIPTYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EQUIPTYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EQUIPTYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EQUIPTYPE'
			and a.code in (select b.equipment_type from asset_master a, equipment b
							where a.company_id = @i_client_id
								and a.country_code = @i_country_code
								and b.company_id = a.company_id
								and b.country_code = a.country_code
								and b.equipment_id = a.equipment_id
								and a.customer_id = @i_search_field_1)
		return
	end

	if (@i_lov_code_type = 'ASSETSERVICECONTRACT_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + contract_doc_no + '",' +
				'"description":"' + description + '"' +
			'}' as o_value_xml
		from asset_service_contract
		where company_id = @i_client_id 
			and country_code = @i_country_code
			and asset_id = @i_search_field_1
		return
	end

	if (@i_lov_code_type = 'CALLASSIGNTO_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + b.employee_id + '",' +
				'"description":"' + c.title + ' ' + c.first_name + ' ' + ISNULL(c.middle_name,'') + ' ' + c.last_name + '"' +
			'}' as o_value_xml
		from assignto_functional_role a, functional_role_employee b, employee c
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.assign_typecode = 'CALL'
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.functional_role_id = b.functional_role_id
			and b.company_id = c.company_id
			and b.country_code = c.country_code
			and b.employee_id = c.employee_id
			and c.employee_status = 'A'
		union
		select '' as value_list,
               '{' +
				'"code":"' + a.employee_id + '",' +
				'"description":"' + a.title + ' ' + a.first_name + ' ' + ISNULL(a.middle_name, '') + ' ' + a.last_name + '"' +
			'}' as o_value_xml
		from employee a, users b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.employee_id = b.employee_id
			and a.employee_status = 'A'
			and b.user_group_id = 'RSEM'
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else 	if ( @i_lov_code_type = 'DBENGINEER_LIST' )
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.employee_id + '",' +
				'"description":"' + 
					a.first_name+' '+a.last_name+ '"' +
			'}' as o_value_xml
		from employee a, functional_role_employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.employee_id = b.employee_id
			and b.functional_role_id = 'SEENG'
		order by a.first_name+' '+a.last_name

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else 	if ( @i_lov_code_type = 'CUSTOMER_STATE_LIST' )
	begin
		select distinct '' as value_list,
			 '{'+
				'"code":"' + b.state_code + '",' +
				'"description":"' + 
					b.state+ '"' +
			'}' as o_value_xml
		from state b
		where b.country_code = @i_country_code

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else 	if ( @i_lov_code_type = 'DBCUSTOMER_STATE_LIST_LINKED' )
	begin
		if @i_search_field_1 = '%' set @i_search_field_1 = null

		select distinct '' as value_list,
			 '{'+
				'"code":"' + b.state_code + '",' +
				'"description":"' + 
					b.state+ '"' +
			'}' as o_value_xml
		from state b
		where b.country_code = isnull(@i_search_field_1, b.country_code)

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else 	if ( @i_lov_code_type = 'CUSTOMER_CITY_LIST' )
	begin
		if @i_search_field_1 = '%' set @i_search_field_1 = null

		select distinct '' as value_list,
			'{'+
				'"code":"' + a.city + '",' +
				'"description":"' + 
					a.city+ '"' +
			'}' as o_value_xml
		from customer_location a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.state_code = isnull(@i_search_field_1, a.state_code)
			

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else 	if ( @i_lov_code_type = 'DBCUSTOMER_CITY_LIST_LINKED' )
	begin
		if @i_search_field_1 = '%' set @i_search_field_1 = null

		select distinct '' as value_list,
			'{'+
				'"code":"' + a.city + '",' +
				'"description":"' + 
					a.city+ '"' +
			'}' as o_value_xml
		from customer_location a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.state_code = isnull(@i_search_field_1, a.state_code)
			

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if ( @i_lov_code_type = 'VISITTEMPLATEID' ) /* Service Visit Status List */
	begin
		select '' as value_list,
			'<visittemplateid>' +isnull(b.visit_report_template_id,'')+ '</visittemplateid>'+
			'<visitreportno>'+ISNULL(visit_report_no, '')+'</visitreportno>'
		as o_value_xml
		from call_register a, asset_service_schedule b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.call_ref_no = @i_search_field_1
			and a.asset_id = b.asset_id
			and a.service_contract_doc_no = b.contract_doc_no
			and b.call_jo_ind = 'C'
			and b.call_ref_jo_no = a.call_ref_no
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code_type = 'CALL_LOGGEDBY_LIST')
	begin
		select '' as value_list,
		   '{' + 
			   '"id":"' + 'CUSTOMER' + '",' +
			   '"name":"' + 'Customer' + '"' +
		   '}' as o_value_xml
		union all
		select '' as value_list,
			'{' +
				'"id":"' + dealer_id + '",' +
				'"name":"' + dealer_name_short + '"' +
			'}' as o_value_xml
		from dealer_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if (@i_lov_code_type = 'MACHINEREGION_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + lower(isnull(product_udf_char_1,'')) + '",' +
				'"description":"' + lower(isnull(product_udf_char_1,'')) + '"' +
			'}' as o_value_xml
		from asset_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and product_udf_char_1 is not null
			
		return
	end
	
	else if (@i_lov_code_type = 'CALL_TAKENBY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"id":"' + employee_id + '",' +
				'"name":"' + title + '.' + first_name + ' ' + ISNULL(middle_name, '') + ' ' + last_name + '"' +
			'}' as o_value_xml
		from employee
		where company_id = @i_client_id
			and country_code = @i_country_code
			and organogram_level_no = (
				select organogram_level_no from employee
				where company_id = @i_client_id
					and country_code = @i_country_code
					and employee_id = @i_search_field_1)
			and organogram_level_code = (
				select organogram_level_code from employee
				where company_id = @i_client_id
					and country_code = @i_country_code
					and employee_id = @i_search_field_1)
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'CALL_CREATEDBY_LIST')
	begin
		
			select distinct '' as value_list,
						'{' +
							'"id":"' + created_by_employee_id + '",' +
							'"name":"' + title + '.' + first_name + ' ' + ISNULL(middle_name, '') + ' ' + last_name + '"' +
						'}' as o_value_xml
					from call_register a, employee b
					where  a.company_id = @i_client_id
							and a.country_code = @i_country_code
							and a.company_id = b.company_id
							and a.country_code = b.country_code
							and a.created_by_employee_id = b.employee_id
							and b.employee_status = 'A'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'TADA_CREATEDBY_LIST')
	begin
		
			select distinct '' as value_list,
						'{' +
							'"id":"' + created_by_employee_id + '",' +
							'"name":"' + title + '.' + first_name + ' ' + ISNULL(middle_name, '') + ' ' + last_name + '"' +
						'}' as o_value_xml
					from ancillary_request_register a, employee b
					where  a.company_id = @i_client_id
							and a.country_code = @i_country_code
							and a.company_id = b.company_id
							and a.country_code = b.country_code
							and a.created_by_employee_id = b.employee_id
							and b.employee_status = 'A'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
 
	else if (@i_lov_code_type = 'CALLBRAND_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'CALLBRAND'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLBRAND'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLBRAND'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLBRAND'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	if (@i_lov_code_type = 'CUSTOMERREGION_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
					case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'CUSTOMERREGION'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = 'CUSTOMERREGION'
							and e.code = a.code)
					else
						(select g.short_description from code_table_mlingual_translation g
							where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'CUSTOMERREGION'
							and g.code = a.code)
					end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CUSTOMERREGION'
		set @o_retrieve_status = 'SUCCESS'
		return
	end

if (@i_lov_code_type = 'CUSTOMERCOUNTRY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CUSTOMERCOUNTRY'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'CUSTOMERCOUNTRY'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'CUSTOMERCOUNTRY'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'CR'
			and a.category_code_value = @i_search_field_1
		set @o_retrieve_status = 'SUCCESS'
		return
	end	

	else if (@i_lov_code_type = 'CALLREGION_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'CALLREGION'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLREGION'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLREGION'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLREGION'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code_type = 'CALLBUSIUNIT_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'CALLBUSIUNIT'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLBUSIUNIT'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLBUSIUNIT'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLBUSIUNIT'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code_type = 'BUSINESSAREA_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'BUSINESSAREA'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'BUSINESSAREA'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'BUSINESSAREA'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'BUSINESSAREA'
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code_type = 'ACCTCODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'ACCTCODE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'ACCTCODE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'ACCTCODE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ACCTCODE'
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code_type = 'DIVISION_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'DIVISION'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'DIVISION'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'DIVISION'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'DIVISION'
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code_type = 'REGION_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'REGION'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'REGION'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'REGION'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'REGION'
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if ( @i_lov_code_type = 'SELLERLOCATION_LIST_LINKED') 

	begin
		select '' as value_list,
			'{' + 
				'"code":"' + a.location_code + '",' +
				'"description":"' + a.location_name_short + '",' +
				'"addr_1":"' + isnull(a.address_line_1,'') + '",' +
				'"addr_2":"' + isnull(a.address_line_2,'') + '",' +
				'"addr_3":"' + isnull(a.address_line_3,'') + '",' +
				'"city":"' + isnull(a.city,'') + '",' +
				'"state":"' + isnull(a.state_code,'') + '",' +
				(select '"state_desc":"' + ISNULL(s.state,'')
				  from state s
				  where a.company_id			= @i_client_id
				   and  s.country_code			= @i_country_code
				   and  s.state_code			= a.state_code ) + '",' +
				'"country":"' + isnull(a.country_code,'') + '",' +
				(select '"country_desc":"' + ISNULL(c.country_name,'')
				  from country c
				  where a.company_id			= @i_client_id
				   and  c.country_code			= @i_country_code
				   and  c.country_code			= a.country_code ) + '",' +
				'"pincode":"' + isnull(a.pincode,'') + '"' +
			'}' as o_value_xml
		from company_location a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.udf_char_1 = 'BU'
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	
	else if (@i_lov_code_type = 'EXPENSEHEADCODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EXPHEADCODE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EXPHEADCODE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EXPHEADCODE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EXPHEADCODE'
			and a.code != 'STDCHRGS'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code_type = 'CALL_LOGGING_LEADSOURCE')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'LEADSOURCE'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'LEADSOURCE'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'LEADSOURCE'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'LEADSOURCE'
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if ( @i_lov_code_type = 'EXPENSE_APPROVE_DEFAULT_VALUES' ) 
	begin
		select '' as value_list,
			'{' +
				'"bussiness_area":"' + udf_char_1 + '",' +
				'"region_code":"' + udf_char_2 + '",' +
				'"division_code":"' + udf_char_3 + '",' +
				'"acc_code":"' + udf_char_4 + '"' +
			'}' as o_value_xml
		from expdoc_header
		where expdoc_ref_no = @i_search_field_1
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'APPLICATION_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'APPLICATION'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'APPLICATION'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'APPLICATION'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'APPLICATION'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'ASSEMBLY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'ASSEMBLY'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'ASSEMBLY'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'ASSEMBLY'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ASSEMBLY'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	/*else if (@i_lov_code_type = 'ASST_SRCH_ON_CUST_AND_EQPT')
	begin

		declare @p_organogram_level_no tinyint, 
				@p_organogram_level_code nvarchar(20)

		if exists (select 1 from dealer_organogram_mapping a, employee b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = b.company_id
				and a.country_code  = b.country_code
				and	a.organogram_level_no = b.organogram_level_no
				and a.organogram_level_code = b.organogram_level_code
				and b.employee_id = (select employee_id from users
										where a.company_id = @i_client_id
										and a.country_code = @i_country_code
										and user_id =  @i_user_id))
		begin
			select  @p_organogram_level_no   = a.organogram_level_no,
					@p_organogram_level_code = a.organogram_level_code
			from employee a
			where  a.company_id = @i_client_id
				and a.country_code = @i_country_code 
				and a.employee_id = (select employee_id from users b
										where b.company_id = @i_client_id
										and b.country_code = @i_country_code
										and b.user_id =  @i_user_id)
		end
		else
		begin
			set @p_organogram_level_no = NULL
			set @p_organogram_level_code = NULL
		end

		if(@i_search_field_3 = 'ZZZ')
		begin
			select '' as value_list,
			   '{' + 
				   '"id":"'+''+'",'+
				   '"equip_id":"'+''+'",'+
				   '"cust_id":"'+''+'",'+
				   '"desc":"'+''+'",'+
				   '"org_no":"'+''+'",'+
				   '"org_code":"'+level1_code+'"'+
			   '}' as o_value_xml
			from level1_code
			where company_id = @i_client_id
				and country_code = @i_country_code

		set @o_retrieve_status = 'SUCCESS'
			return
		end
		else
		begin
			select '' as value_list,
			   '{' + 
				   '"id":"'+'ZZZ'+'",'+
				   '"equip_id":"'+'ZZZ'+'",'+
				   '"cust_id":"'+'ZZZ'+'",'+
				   '"desc":"'+'ZZZ'+'",'+
				   '"org_no":"'+'1'+'",'+
				   '"org_code":"'+level1_code+'"'+
			   '}' as o_value_xml
			from level1_code
			where company_id = @i_client_id
				and country_code = @i_country_code
			union all
			select '' as value_list,
			   '{' + 
				   '"id":"'+a.asset_id+'",'+
				   '"equip_id":"'+a.equipment_id+'",'+
				   '"cust_id":"'+a.customer_id+'",'+
				   '"desc":"'+b.description+'",'+
				   '"org_no":"'+convert(varchar(1), a.servicing_org_level_no)+'",'+
				   '"org_code":"'+a.servicing_org_level_code+'"'+
			   '}' as o_value_xml
			from asset_master a, equipment b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and (a.asset_id like '%' + @i_search_field_1 + '%'
					or
					b.description like '%' + @i_search_field_1 + '%'
					)
				and a.equipment_id like '%' + (select case(@i_search_field_2) when 'ZZZ' then '' else @i_search_field_2 end) + '%'
				and a.customer_id like '%' + (select case(@i_search_field_3) when 'ZZZ' then '' else @i_search_field_3 end) + '%'
				and b.company_id = a.company_id
				and b.country_code = a.country_code
				and b.equipment_id = a.equipment_id

			set @o_retrieve_status = 'SUCCESS'
		return
	end
	end*/
	else if (@i_lov_code_type = 'ASST_SRCH_ON_CUST_AND_EQPT')
	begin
		declare @p_organogram_level_no tinyint, 
				@p_organogram_level_code nvarchar(20)


		select '' as value_list,
		   '{' + 
			   '"id":"'+'ZZZ'+'",'+
			   '"location_code":"'+''+'",'+
			   '"equip_id":"'+'ZZZ'+'",'+
			   '"cust_id":"'+'ZZZ'+'",'+
			   '"desc":"'+'ZZZ'+'",'+
			   '"org_no":"'+'1'+'",'+
			   '"org_code":"'+level1_code+'"'+
		   '}' as o_value_xml
		from level1_code
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all
		select '' as value_list,
		   '{' + 
			   '"id":"'+a.asset_id+'",'+
			   '"location_code":"'+isnull(a.asset_location_code,'')+'",'+
			   '"equip_id":"'+a.equipment_id+'",'+
			   '"cust_id":"'+a.customer_id+'",'+
			   '"desc":"'+b.description+'",'+
			   '"org_no":"'+convert(varchar(1), a.servicing_org_level_no)+'",'+
			   '"org_code":"'+a.servicing_org_level_code+'"'+
		   '}' as o_value_xml
		from asset_master a, equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and (a.asset_id like '%' + @i_search_field_1 + '%'
				or
				b.description like '%' + @i_search_field_1 + '%'
				)
			and a.equipment_id like '%' + (select case(@i_search_field_2) when 'ZZZ' then '' else @i_search_field_2 end) + '%'
			and a.customer_id like '%' + (select case(@i_search_field_3) when 'ZZZ' then '' else @i_search_field_3 end) + '%'
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.equipment_id = a.equipment_id
			and a.asset_status = 'A'

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if (@i_lov_code_type = 'CUST_SRCH_ON_ASST_AND_EQPT')
	begin  
		if (@i_search_field_1 != 'ZZZ' and @i_search_field_1 != '%')
		begin
			select '' as value_list,
			   '{' + 
				   '"id":"'+'ZZZ'+'",'+
				   '"name":"'+'ZZZ'+'"'+
			   '}' as o_value_xml
			union all
			select '' as value_list,
			   '{' + 
				   '"id":"'+a.customer_id+'",'+
				   '"name":"'+a.customer_name+'"'+
			   '}' as o_value_xml
			from customer a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.customer_id = (
					select b.customer_id from asset_master b
					where b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.asset_id = @i_search_field_1
					)
		end
		else if (@i_search_field_2 != 'ZZZ' and @i_search_field_2 != '%')
		begin
			select '' as value_list,
			   '{' + 
				   '"id":"'+'ZZZ'+'",'+
				   '"name":"'+'ZZZ'+'"'+
			   '}' as o_value_xml
			union all
			select '' as value_list,
			   '{' + 
				   '"id":"'+a.customer_id+'",'+
				   '"name":"'+a.customer_name+'"'+
			   '}' as o_value_xml
			from customer a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.customer_id in (
					select distinct b.customer_id from asset_master b
					where b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.equipment_id = @i_search_field_2
					)
				and (
					a.customer_id like '%' + @i_search_field_3 + '%'
					or a.customer_name like '%' + @i_search_field_3 + '%'
					)
		end
		else
		begin
			
			declare @p_org_level_no tinyint, 
				@p_org_level_code nvarchar(20)

			if exists (select 1 from dealer_organogram_mapping a, employee b
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.company_id = b.company_id
					and a.country_code  = b.country_code
					and	a.organogram_level_no = b.organogram_level_no
					and a.organogram_level_code = b.organogram_level_code
					and b.employee_id = (select employee_id from users
											where a.company_id = @i_client_id
											and a.country_code = @i_country_code
											and user_id =  @i_user_id))
			begin
				select  @p_org_level_no   = a.organogram_level_no,
						@p_org_level_code = a.organogram_level_code
				from employee a
				where  a.company_id = @i_client_id
				and a.country_code = @i_country_code 
				and a.employee_id = (select employee_id from users b
										where b.company_id = @i_client_id
										and b.country_code = @i_country_code
										and b.user_id =  @i_user_id)
			end
			else
			begin
				set @p_org_level_no = NULL
				set @p_org_level_code = NULL
			end

			select '' as value_list,
			   '{' + 
				   '"id":"'+'ZZZ'+'",'+
				   '"name":"'+'ZZZ'+'"'+
			   '}' as o_value_xml
			union all
			select '' as value_list,
			   '{' + 
				   '"id":"'+a.customer_id+'",'+
				   '"name":"'+a.customer_name+'"'+
			   '}' as o_value_xml
			from customer a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.customer_id in (
					select b.customer_id from asset_master b
					where b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.servicing_org_level_no = isnull(@p_org_level_no, b.servicing_org_level_no)
						and b.servicing_org_level_code =  isnull(@p_org_level_code, b.servicing_org_level_code)
					)
				and (
					a.customer_id like '%' + @i_search_field_3 + '%'
					or a.customer_name like '%' + @i_search_field_3 + '%'
					)
		end

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'EQPT_SRCH_ON_ASST_AND_CUST')
	begin
		if (@i_search_field_1 != 'ZZZ' and @i_search_field_1 != '%')
		begin
			select '' as value_list,
			   '{' + 
				   '"id":"'+'ZZZ'+'",'+
				   '"desc":"'+'ZZZ'+'",'+
				   '"org_no":"'+'1'+'",'+
				   '"org_code":"'+level1_code+'"'+
			   '}' as o_value_xml
			from level1_code
			where company_id = @i_client_id
				and country_code = @i_country_code
			union all
			select '' as value_list,
			   '{' + 
				   '"id":"'+a.equipment_id+'",'+
				   '"desc":"'+a.description+'",'+
				   '"org_no":"'+convert(varchar(1), a.servicing_org_level_no)+'",'+
				   '"org_code":"'+a.servicing_org_level_code+'"'+
			   '}' as o_value_xml
			from equipment a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.equipment_id = (
					select b.equipment_id from asset_master b
					where b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.asset_id = @i_search_field_1
					)
		end
		else if (@i_search_field_3 != 'ZZZ' and @i_search_field_3 != '%')
		begin
			select '' as value_list,
			   '{' + 
				   '"id":"'+'ZZZ'+'",'+
				   '"desc":"'+'ZZZ'+'",'+
				   '"org_no":"'+'1'+'",'+
				   '"org_code":"'+level1_code+'"'+
			   '}' as o_value_xml
			from level1_code
			where company_id = @i_client_id
				and country_code = @i_country_code
			union all
			select '' as value_list,
			   '{' + 
				   '"id":"'+a.equipment_id+'",'+
				   '"desc":"'+a.description+'",'+
				   '"org_no":"'+convert(varchar(1), a.servicing_org_level_no)+'",'+
				   '"org_code":"'+a.servicing_org_level_code+'"'+
			   '}' as o_value_xml
			from equipment a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.equipment_id in (
					select distinct b.equipment_id from asset_master b
					where b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.customer_id = @i_search_field_3
					)
				and (
					a.equipment_id like '%' + @i_search_field_2 + '%'
					or a.description like '%' + @i_search_field_2 + '%'
					)
		end
		else
		begin

			declare @p_org_lvl_no tinyint, 
				@p_org_lvl_code nvarchar(20)

			if exists (select 1 from dealer_organogram_mapping a, employee b
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.company_id = b.company_id
					and a.country_code  = b.country_code
					and	a.organogram_level_no = b.organogram_level_no
					and a.organogram_level_code = b.organogram_level_code
					and b.employee_id = (select employee_id from users
											where a.company_id = @i_client_id
											and a.country_code = @i_country_code
											and user_id =  @i_user_id))
			begin
				select  @p_org_lvl_no   = a.organogram_level_no,
						@p_org_lvl_code = a.organogram_level_code
				from employee a
				where  a.company_id = @i_client_id
				and a.country_code = @i_country_code 
				and a.employee_id = (select employee_id from users b
										where b.company_id = @i_client_id
										and b.country_code = @i_country_code
										and b.user_id =  @i_user_id)
			end
			else
			begin
				set @p_org_lvl_no = NULL
				set @p_org_lvl_code = NULL
			end

			select '' as value_list,
			   '{' + 
				   '"id":"'+'ZZZ'+'",'+
				   '"desc":"'+'ZZZ'+'",'+
				   '"org_no":"'+'1'+'",'+
				   '"org_code":"'+level1_code+'"'+
			   '}' as o_value_xml
			from level1_code
			where company_id = @i_client_id
				and country_code = @i_country_code
			union all
			select '' as value_list,
			   '{' + 
				   '"id":"'+a.equipment_id+'",'+
				   '"desc":"'+a.description+'",'+
				   '"org_no":"'+convert(varchar(1), a.servicing_org_level_no)+'",'+
				   '"org_code":"'+a.servicing_org_level_code+'"'+
			   '}' as o_value_xml
			from equipment a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.equipment_id in (
					select b.equipment_id from asset_master b
					where b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.servicing_org_level_no = isnull(@p_org_lvl_no, b.servicing_org_level_no)
						and b.servicing_org_level_code =  isnull(@p_org_lvl_code, b.servicing_org_level_code)
					)
				and (
					a.equipment_id like '%' + @i_search_field_2 + '%'
					or a.description like '%' + @i_search_field_2 + '%'
					)
		end

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'ASSET_LIST_SEARCH_WO_ZZZ')
	begin

		declare @p_asset_org_lvl_no tinyint, 
				@p_asset_org_lvl_code nvarchar(20)

		if exists (select 1 from dealer_organogram_mapping a, employee b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = b.company_id
				and a.country_code  = b.country_code
				and	a.organogram_level_no = b.organogram_level_no
				and a.organogram_level_code = b.organogram_level_code
				and b.employee_id = (select employee_id from users
										where a.company_id = @i_client_id
										and a.country_code = @i_country_code
										and user_id =  @i_user_id))
		begin
			select  @p_asset_org_lvl_no   = a.organogram_level_no,
					@p_asset_org_lvl_code = a.organogram_level_code
			from employee a
			where  a.company_id = @i_client_id
				and a.country_code = @i_country_code 
				and a.employee_id = (select employee_id from users b
										where b.company_id = @i_client_id
										and b.country_code = @i_country_code
										and b.user_id =  @i_user_id)
		end
		else
		begin
			set @p_asset_org_lvl_no = NULL
			set @p_asset_org_lvl_code = NULL
		end

		select '' as value_list,
		   '{' + 
			   '"id":"'+a.asset_id+'",'+
			   '"equip_id":"'+a.equipment_id+'",'+
			   '"cust_id":"'+a.customer_id+'",'+
			   '"desc":"'+b.description+'",'+
			   '"org_no":"'+convert(varchar(1), a.servicing_org_level_no)+'",'+
			   '"org_code":"'+a.servicing_org_level_code+'"'+
		   '}' as o_value_xml
		from asset_master a, equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.asset_id like '%' + @i_search_field_1 + '%'
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.equipment_id = a.equipment_id
			and a.servicing_org_level_no = isnull(@p_asset_org_lvl_no, a.servicing_org_level_no)
			and a.servicing_org_level_code =  isnull(@p_asset_org_lvl_code, a.servicing_org_level_code)
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code_type = 'CUSTOMER_LIST_SEARCH_WO_ZZZ')
	begin
		select '' as value_list,
		   '{' + 
			   '"id":"'+'ZZZ'+'",'+
			   '"name":"'+'ZZZ'+'"'+
		   '}' as o_value_xml
		union all
		select '' as value_list,
		   '{' + 
			   '"id":"'+customer_id+'",'+
			   '"name":"'+customer_name+'"'+
		   '}' as o_value_xml
		from customer
		where company_id = @i_client_id
			and country_code = @i_country_code
			and (customer_id like '%' + @i_search_field_1 + '%' 
				or customer_name like '%' + @i_search_field_1 + '%')

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code_type = 'EQUIPMENT_LIST_SEARCH_WO_ZZZ')
	begin
		
		select '' as value_list,
		   '{' + 
			   '"id":"'+equipment_id+'",'+
			   '"desc":"'+description+'",'+
			   '"org_no":"'+convert(varchar(1), servicing_org_level_no)+'",'+
			   '"org_code":"'+servicing_org_level_code+'"'+
		   '}' as o_value_xml
		from equipment a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and (a.equipment_id like '%' + @i_search_field_1 + '%' 
				or a.description like '%' + @i_search_field_1 + '%')
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'DEALER_ID')
	begin
		
		select '' as value_list,
		   '{' + 
			   '"code":"'+ convert(varchar(1), a.organogram_level_no) +'",'+
			   '"parentCode":"'+ a.organogram_level_code +'",'+
			   '"description":"'+ a.dealer_id +'"'+
		   '}' as o_value_xml
		from dealer_organogram_mapping a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'HSNCODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + source_field_value + '",' +
				'"description":"' + source_field_value + '"' +
			'}' as o_value_xml
		from product_customization_udf_value_mapping
		where company_id = @i_client_id 
			and country_code = @i_country_code
			and source_field_name = 'HSNCODE'
			and source_field_value like '%' + @i_search_field_1 + '%'
			
		set @o_retrieve_status = 'SUCCESS'	
		return
	end
	
	else if ( @i_lov_code_type = 'ACCTSSPMCALLS' )
	begin
				
		select distinct '' as value_list,
			a.call_ref_no + '/' + REPLACE(a.attachment_file_name, '.pdf', '.xml') as o_value_xml
		from call_user_attachments a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and call_ref_no in 
				(
					select b.call_ref_no 
					from call_register b
					where b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.created_on_date between convert(datetimeoffset(7), @p_from_date_filter + ' 00:00:00', 120)
							and convert(datetimeoffset(7), @p_to_date_filter + ' 00:00:00', 120)
						and (b.company_location_code = @p_company_location_filter or 
							b.company_location_code like @p_company_location_filter)
						and (b.organogram_level_code = @p_dealer_id_filter or 
							b.organogram_level_code like @p_dealer_id_filter)
						/*and b.call_ref_no in 
						(
							select distinct c.call_ref_no
							from call_assignment c
							where c.company_id = b.company_id
								and c.country_code = b.country_code
								and c.resource_emp_id like @p_assigned_to_emp_id_filter
								and c.primary_resource_ind = 1
						)
						and b.call_ref_no in
						(
							select distinct d.call_ref_no 
							from call_assignment d, functional_role_employee e
							where d.company_id = b.company_id
								and d.country_code = b.country_code
								and e.company_id = d.company_id
								and e.country_code = d.country_code
								and e.reporting_to_employee_id like	@p_reporting_to_emp_id_filter
								and d.resource_emp_id = e.employee_id
								and d.primary_resource_ind = 1
						)*/
				)
			and attachment_file_name like '%_spm_form.%'
		
		return
	end	
	else if ( @i_lov_code_type = 'ACCTSFSRCALLS' )
	begin
				
		select distinct '' as value_list,
			a.call_ref_no + '/' + REPLACE(a.attachment_file_name, '.pdf', '.xml') as o_value_xml
		from call_user_attachments a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and call_ref_no in 
				(
					select b.call_ref_no 
					from call_register b
					where b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.created_on_date between convert(datetimeoffset(7), @p_from_date_filter + ' 00:00:00', 120)
							and convert(datetimeoffset(7), @p_to_date_filter + ' 00:00:00', 120)
							and (b.company_location_code = @p_company_location_filter or 
							b.company_location_code like @p_company_location_filter)
							and (b.organogram_level_code = @p_dealer_id_filter or 
							b.organogram_level_code like @p_dealer_id_filter)
						/*and b.company_location_code like @p_company_location_filter
						and b.call_ref_no in 
						(
							select distinct c.call_ref_no
							from call_assignment c
							where c.company_id = b.company_id
								and c.country_code = b.country_code
								and c.resource_emp_id like @p_assigned_to_emp_id_filter
								and c.primary_resource_ind = 1
						)
						and b.call_ref_no in
						(
							select distinct d.call_ref_no 
							from call_assignment d, functional_role_employee e
							where d.company_id = b.company_id
								and d.country_code = b.country_code
								and e.company_id = d.company_id
								and e.country_code = d.country_code
								and e.reporting_to_employee_id like	@p_reporting_to_emp_id_filter
								and d.resource_emp_id = e.employee_id
								and d.primary_resource_ind = 1
						)*/
				)
			and attachment_file_name like '%_visit_report_form.%'
		
		return
	end	

	else if (@i_lov_code_type = 'LABOURCODE_LIST')
	begin

		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'LABOURCODE'
							and f.code = a.code)
				when 1 then
					(select e.long_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'LABOURCODE'
						and e.code = a.code)
				else
					(select g.long_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'LABOURCODE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'LABOURCODE'
			and a.code like '%' + @i_search_field_1 + '%'
					
			
		set @o_retrieve_status = 'SUCCESS'	
		return
	end

	else if (@i_lov_code_type = 'PARTCODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'PARTCODE'
							and f.code = a.code)
				when 1 then
					(select e.long_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'PARTCODE'
						and e.code = a.code)
				else
					(select g.long_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'PARTCODE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'PARTCODE'
			and a.code like '%' + @i_search_field_1 + '%'
			
		set @o_retrieve_status = 'SUCCESS'	
		return
	end

	else if (@i_lov_code_type = 'my_team')
	begin
		select '' as value_list,
		'{' + 
			'"sl_no":"' + convert(varchar(3), ROW_NUMBER() over (order by a.employee_id)) + '",' +
			'"last_updated_time":"' + substring(convert(varchar(10),sysdatetimeoffset(), 108), 1, 5) + '",' +
			'"emp_id":"' + a.employee_id + '",' +
			'"emp_name":"' + (
				select c.first_name + ' ' + isnull(c.middle_name, '') + ' ' + c.last_name
				from employee c
				where c.company_id = a.company_id
					and c.country_code = a.country_code
					and c.employee_id = a.employee_id
			) + '",' +
			'"contact_mobile_no":"' + (
				select isnull(c.contact_mobile_no, '')
				from employee c
				where c.company_id = a.company_id
					and c.country_code = a.country_code
					and c.employee_id = a.employee_id
			) + '",' +
			'"contact_email_id":"' + (
				select isnull(c.email_id, '')
				from employee c
				where c.company_id = a.company_id
					and c.country_code = a.country_code
					and c.employee_id = a.employee_id
			) + '",' +		
			(
				select isnull(
				(
					select 
						case (d.finish_hour)
							when 0 then 
								'"punch_in_ind":"1",' +
								'"punch_out_ind":"0",' 
							else 
								'"punch_in_ind":"1",' +
								'"punch_out_ind":"1",' 
						end
					from timecard d 
					where d.company_id = a.company_id 
						and d.country_code = a.country_code 
						and d.employee_id = a.employee_id
						and convert(varchar(10), d.work_date, 120) = convert(varchar(10), sysdatetimeoffset(), 120)
				), '"punch_in_ind":"0","punch_out_ind":"0",')
			) +
			(
				select isnull(
				(
					select top 1
						case d.trip_start_datetime
							when null then 
								'"trip_ind":"0",' 
							else 
								'"trip_ind":"1",' 
							end
						from trip_sheet d 
						where d.company_id = a.company_id 
							and d.country_code = a.country_code 
							and d.employee_id = a.employee_id
							and convert(varchar(10), d.trip_start_datetime, 120) = convert(varchar(10), sysdatetimeoffset(), 120)
						order by trip_start_datetime desc
				), '"trip_ind":"0",')
			) +
			(
				select isnull(
				(
					select top 1
						case d.from_date
							when null then 
								'"work_ind":"0",' 
							else 
								'"work_ind":"1",'
						end
					from call_resource_utilisation_log d 
					where d.company_id = a.company_id 
						and d.country_code = a.country_code 
						and d.resource_emp_id = a.employee_id
						and convert(varchar(10), d.from_date, 120) = convert(varchar(10), sysdatetimeoffset(), 120)
					order by from_date desc
				), '"work_ind":"0",')
			) +
			'"device_id":"' + a.device_id + '"' +
		'}' as o_value_xml
		from device_register a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.employee_id in (
				select b.employee_id 
				from functional_role_employee b
				where b.company_id = a.company_id
					and b.country_code = a.country_code
					and b.reporting_to_employee_id = @i_search_field_1
			)
	
		return
	end
	
	 else if (@i_lov_code_type = 'my_team_punch_in')
	begin
		select '' as value_list,
		'{' + 
			'"date":"' + isnull(convert(varchar(10), a.work_date, 120), '') + '",' +
			'"hour":"' + isnull(convert(varchar(10), a.start_hour), '') + '",' +
			'"minute":"' + isnull(convert(varchar(10), a.start_minute), '') + '",' +
			'"address":"' + isnull(a.start_geotag_route, '') + '"' +
		'}' as o_value_xml
		from timecard a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.employee_id = @i_search_field_1
			and convert(varchar(10), a.work_date, 120) = convert(varchar(10), sysdatetimeoffset(), 120)
	
		return
	end
	
	 else if (@i_lov_code_type = 'my_team_punch_out')
	begin
		select '' as value_list,
		'{' + 
			'"date":"' + isnull(convert(varchar(10), a.work_date, 120), '') + '",' +
			'"hour":"' + isnull(convert(varchar(10), a.finish_hour), '') + '",' +
			'"minute":"' + isnull(convert(varchar(10), a.finish_minute), '') + '",' +
			'"address":"' + isnull(a.finish_geotag_route, '') + '"' +
		'}' as o_value_xml
		from timecard a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.employee_id = @i_search_field_1
			and convert(varchar(10), a.work_date, 120) = convert(varchar(10), sysdatetimeoffset(), 120)
	
		return
	end
	
    else if (@i_lov_code_type = 'my_team_trip_status')
	begin
		select '' as value_list,
		'{' + 
			'"trip_start_date":"' + convert(varchar(10), a.trip_start_datetime, 120) + '",' +
			'"trip_start_hour":"' + isnull(convert(varchar, datepart(hour, a.trip_start_datetime)), '') + '",' +
			'"trip_start_minute":"' + isnull(convert(varchar, datepart(minute, a.trip_start_datetime)), '') + '",' +
			'"trip_start_address":"' + isnull(a.start_geotag_route, '') + '",' +
			'"trip_finish_date":"' + convert(varchar(10), a.trip_finish_datetime, 120) + '",' +
			'"trip_finish_hour":"' + isnull(convert(varchar, datepart(hour, a.trip_finish_datetime)), '') + '",' +
			'"trip_finish_minute":"' + isnull(convert(varchar, datepart(minute, a.trip_finish_datetime)), '') + '",' +
			'"trip_finish_address":"' + isnull(a.finish_geotag_route, '') + '"' +
			
		'}' as o_value_xml
		from trip_sheet a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.employee_id = @i_search_field_1
			and convert(varchar(10), a.trip_start_datetime, 120) = convert(varchar(10), sysdatetimeoffset(), 120)
		return
	end
	
	else if (@i_lov_code_type = 'my_team_work_status')
	begin
		select '' as value_list,
		'{' + 
			'"call_ref_no":"' + call_ref_no + '",' +
			'"work_from_date":"' + convert(varchar(10), a.from_date, 120) + '",' +
			'"work_from_hour":"' + isnull(convert(varchar, datepart(hour, a.to_date)), '') + '",' +
			'"work_from_minute":"' + isnull(convert(varchar, datepart(minute, a.to_date)), '') + '",' +
			'"work_to_date":"' + convert(varchar(10), a.to_date, 120) + '",' +
			'"work_to_hour":"' + isnull(convert(varchar, datepart(hour, a.from_date)), '') + '",' +
			'"work_to_minute":"' + isnull(convert(varchar, datepart(minute, a.from_date)), '') + '"' +
		'}' as o_value_xml
		from call_resource_utilisation_log a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.resource_emp_id = @i_search_field_1
			and convert(varchar(10), a.from_date, 120) = convert(varchar(10), sysdatetimeoffset(), 120)
		
		return
	end
	
	else if (@i_lov_code_type = 'PWCLABOURCODE_LIST')
	begin

		select distinct '' as value_list,
			'{' +
				'"code":"' + a.field_value1 + '",' +
				'"description":"' + a.field_value2 + '"' +
			'}' as o_value_xml
		from product_customization_field_value_mapping a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.value_mapping_code = 'PWCLABOURHOURS'
			and a.field_name1 = 'LABORHOURCODE'				
			
		set @o_retrieve_status = 'SUCCESS'	
		return
	end

	else if (@i_lov_code_type = 'PWCLABOURTYPE_LIST')
	begin

		select '' as value_list,
			'{' +
				'"code":"' + a.field_value3 + '",' +
				'"description":"' + a.field_value3 + '"' +
			'}' as o_value_xml
		from product_customization_field_value_mapping a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.value_mapping_code = 'PWCLABOURHOURS'
			and a.field_value1 = @i_search_field_1
			and a.field_name1 = 'LABORHOURCODE'
			and a.field_name3 = 'MACHINECATEGORY'					
			
		set @o_retrieve_status = 'SUCCESS'	
		return
	end
	else if (@i_lov_code_type = 'INVOICE_NO_EXPENSE')
	begin

		select '' as value_list,
			'{' +
				'"description":"' +  isnull(a.udf_analysis_code1,'') + '"' +
			'}' as o_value_xml
		 from expdoc_header a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.expdoc_ref_no = @i_search_field_1			
			
		set @o_retrieve_status = 'SUCCESS'	
		return
	end

	else if (@i_lov_code_type = 'MACHINE_LOC')
		begin
		
	declare 
		    @p_state_filter nvarchar(60),
			@p_city_filter nvarchar(60),
			@p_locality_filter nvarchar(60),
			@p_sublocality_filter nvarchar(60),
			@p_asset_id_filter nvarchar(60),
			@p_customer_id_filter nvarchar(60)
				
		set @p_state_filter = (select paramval from #input_params where paramname = 'state_filter')
		set @p_city_filter = (select paramval from #input_params where paramname = 'city_filter')
		set @p_locality_filter = (select paramval from #input_params where paramname = 'locality_filter')
		set @p_sublocality_filter = (select paramval from #input_params where paramname = 'sublocality_filter')
		set @p_dealer_id_filter = (select paramval from #input_params where paramname = 'dealer_id_filter')
		set @p_company_location_filter = (select paramval from #input_params where paramname = 'company_location_filter')
		set @p_asset_id_filter = (select paramval from #input_params where paramname = 'asset_id_filter')
		set @p_customer_id_filter = (select paramval from #input_params where paramname = 'customer_id_filter')

		
		if @p_state_filter = '%'
		begin
			set @p_state_filter = null
		end
		
		if @p_city_filter = '%'
		begin
			set @p_city_filter = null
		end
		
		if @p_locality_filter = '%'
		begin
			set @p_locality_filter = null
		end
		
		if @p_sublocality_filter = '%'
		begin
			set @p_sublocality_filter = null
		end
		
		if @p_dealer_id_filter = '%'
		begin
			set @p_dealer_id_filter = null
		end

		if @p_company_location_filter = '%'
		begin
			set @p_company_location_filter = null
		end

		if @p_asset_id_filter = '%'
		begin
			set @p_asset_id_filter = null
		end

		if @p_customer_id_filter = '%'
		begin
			set @p_customer_id_filter = null
		end

		select '' as value_list,
		'{' + 
			'"p_lattitude_val":"' + isnull(b.latitude,'') + '",' +
		    '"p_longitude_val":"' + isnull(b.longitude,'') + '",' +
			'"asset_id":"' + b.asset_id + '",' +

			'"address":"'+isnull(b.address,'')+'",'+ /* update asset master with address */
			'"current_hmr":"' + isnull(convert(varchar(20),
				( select distinct apl.parameter_value
				  from asset_parameter_log apl
				  where apl.company_id = b.company_id
				    and apl.country_code = b.country_code
					and apl.asset_id = b.asset_id
					and datediff(hh, apl.record_date, (select max(apl1.record_date)
											from asset_parameter_log apl1
											where apl1.company_id = @i_client_id
											  and apl1.country_code = @i_country_code
											  and apl1.asset_id = b.asset_id
											)) = 0
				)),'' )+ '",' +
			'"current_hmr_source":"' + isnull(convert(varchar(20),
				( select distinct apl.parameter_updatedby_source
				  from asset_parameter_log apl
				  where apl.company_id = b.company_id
				    and apl.country_code = b.country_code
					and apl.asset_id = b.asset_id
					and datediff(hh, apl.record_date, (select max(apl1.record_date)
											from asset_parameter_log apl1
											where apl1.company_id = @i_client_id
											  and apl1.country_code = @i_country_code
											  and apl1.asset_id = b.asset_id
											)) = 0
				)),'' )+ '",' +
			'"current_hmr_source_ref_no":"' + isnull(convert(varchar(20),
				( select distinct apl.parameter_updatedby_source_ref_no
				  from asset_parameter_log apl
				  where apl.company_id = b.company_id
				    and apl.country_code = b.country_code
					and apl.asset_id = b.asset_id
					and datediff(hh, apl.record_date, (select max(apl1.record_date)
											from asset_parameter_log apl1
											where apl1.company_id = @i_client_id
											  and apl1.country_code = @i_country_code
											  and apl1.asset_id = b.asset_id
											)) = 0
				)),'' )+ '",' +

			'"current_hmr_date":"' + isnull(convert(varchar(10), 
											(select max(apl2.record_date)
											from asset_parameter_log apl2
											where apl2.company_id = @i_client_id
											  and apl2.country_code = @i_country_code
											  and apl2.asset_id = b.asset_id
											)
										, 105),'') + '",' +
			
			'"last_service_hmr":"' + isnull(convert(varchar(20),b.lastcheck_value),'' )+ '",' +
			'"last_service_date":"' + isnull(convert(varchar(10),b.lastcheck_date, 105),'' )+ '",' +
			'"warranty_ind":"' + isnull(
						(select distinct description
						from asset_service_contract asc2
						where asc2.asset_id = b.asset_id
						  and DATEDIFF(dd,sysdatetimeoffset(), asc2.effective_to_date) > 0
						 ),'Out of Warranty') + '",' +
			--'"next_service_due_interval":"' + 
			--	isnull(cast(cast(( select apl5.next_Service_interval
			--		from asset_parameter_log apl5
			--		where apl5.company_id = @i_client_id
			--		  and apl5.country_code = @i_country_code
			--		  and apl5.asset_id = b.asset_id
			--		  and datediff(hh, apl5.record_date, (select max(apl6.record_date)
			--								from asset_parameter_log apl6
			--								where apl6.company_id = @i_client_id
			--								  and apl6.country_code = @i_country_code
			--								  and apl6.asset_id = b.asset_id
			--								)) = 0
			--	) as int) as varchar(10)),'')
			--	+ '",' +
			--'"next_service_due_date":"' + isnull(convert(varchar(10), 
			--	( select apl5.next_service_due_date
			--		from asset_parameter_log apl5
			--		where apl5.company_id = @i_client_id
			--		  and apl5.country_code = @i_country_code
			--		  and apl5.asset_id = b.asset_id
			--		  and datediff(hh, apl5.record_date, (select max(apl6.record_date)
			--								from asset_parameter_log apl6
			--								where apl6.company_id = @i_client_id
			--								  and apl6.country_code = @i_country_code
			--								  and apl6.asset_id = b.asset_id
			--								)) = 0
			--	)
			--	, 105),'') + '",' +
			--'"service_overdue_ind":"' + 
			--	(case 
			--     when datediff(dd, ( select apl5.next_service_due_date
			--		from asset_parameter_log apl5
			--		where apl5.company_id = @i_client_id
			--		  and apl5.country_code = @i_country_code
			--		  and apl5.asset_id = b.asset_id
			--		  and datediff(hh, apl5.record_date, (select max(apl6.record_date)
			--								from asset_parameter_log apl6
			--								where apl6.company_id = @i_client_id
			--								  and apl6.country_code = @i_country_code
			--								  and apl6.asset_id = b.asset_id
			--								)) = 0
			--	) ,  sysdatetimeoffset()) <= 0 then 'No'
			--	else 
			--		(case 
			--				( select apl5.avg_runrate
			--				from asset_parameter_log apl5
			--				where apl5.company_id = @i_client_id
			--				  and apl5.country_code = @i_country_code
			--				  and apl5.asset_id = b.asset_id
			--				  and datediff(hh, apl5.record_date, (select max(apl6.record_date)
			--														from asset_parameter_log apl6
			--														where apl6.company_id = @i_client_id
			--														  and apl6.country_code = @i_country_code
			--														  and apl6.asset_id = b.asset_id
			--														)
			--						) = 0
			--				)
			--		  when 0 then 'No'
			--		  else 'Yes'
			--		  end)
			--	end
			--  )
			-- + '",' +
			'"customer_id":"' + isnull(b.customer_id,'') + '",' +
			'"customer_address":"' + isnull((
				select address_line_1 
				from customer c
				where c.company_id = @i_client_id
				  and c.country_code = @i_country_code
				  and c.customer_id = b.customer_id
			), '') + '",' +
			(select '"dealer_name":"'+dm.dealer_name_short
				  from dealer_master dm
				  where dm.company_id			= @i_client_id
				   and  dm.country_code			= @i_country_code
				   and  dm.dealer_id			= b.servicing_org_level_code
				)
			+'",'+
			'"customer_name":"' + isnull((
				select customer_name 
				from customer c
				where c.company_id = @i_client_id
				  and c.country_code = @i_country_code 
				  and c.customer_id = b.customer_id
			), '') + '"' +
		'}' as o_value_xml
		from asset_master b
		where b.company_id = @i_client_id
			and b.country_code = @i_country_code
			and b.latitude != ''
			and isnull(b.geotag_administrative_area_level_1, '') = (
				ISNULL(@p_state_filter, ISNULL(b.geotag_administrative_area_level_1, '')) 
			)
			and isnull(b.geotag_administrative_area_level_2, '') = (
				ISNULL(@p_city_filter, ISNULL(b.geotag_administrative_area_level_2, '')) 
			)
			and isnull(b.geotag_locality, '') = (isnull(@p_locality_filter, isnull(b.geotag_locality,'')))
			and isnull(b.geotag_sublocality_level_1, '') = (isnull(@p_sublocality_filter, isnull(b.geotag_sublocality_level_1,'')))
			and b.servicing_org_level_code  in 
							(select organogram_level_code from dealer_organogram_mapping d
							where d.company_id = @i_client_id
							  and d.country_code = @i_country_code
							  and d.dealer_id =isnull(@p_dealer_id_filter,isnull(d.dealer_id,''))
							)
			and b.asset_id in ( 
								select g.asset_id
								from dealer_company_location_mapping e, dealer_organogram_mapping f, asset_master g
								where e.company_id = @i_client_id
								  and e.country_code = @i_country_code
								  and e.dealer_id = isnull(@p_dealer_id_filter,isnull(e.dealer_id,''))
								  and e.company_location_code = isnull(@p_company_location_filter,isnull(e.company_location_code,''))
								  and e.company_id = f.company_id
								  and e.country_code = f.country_code
								  and e.dealer_id = f.dealer_id
								  and f.company_id = g.company_id
								  and f.country_code = g.country_code
								  and f.organogram_level_code = g.servicing_org_level_code
								)

			and isnull(b.asset_id, '') = (
				ISNULL(@p_asset_id_filter, ISNULL(b.asset_id, '')) 
			)
			and b.asset_id in ( 
								select g.asset_id
								from asset_master g
								where g.company_id = @i_client_id
								and g.country_code = @i_country_code
								and g.customer_id = isnull(@p_customer_id_filter,isnull(g.customer_id,''))
								)
	
		set @o_retrieve_status = 'SUCCESS'			
		return
			
	end
	
	else if ( @i_lov_code_type = 'MSTATE' )
	begin
		select distinct '' as value_list,
		'<code>' + geotag_administrative_area_level_1 + '</code>' +
		'<description>' + geotag_administrative_area_level_1 + '</description>'
		as o_value_xml
		from asset_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and geotag_administrative_area_level_1 is not null
			and geotag_administrative_area_level_1 != '' 
		return
	end	
	
	else if ( @i_lov_code_type = 'MCITY' )
	begin
		select distinct '' as value_list,
		'<code>' + geotag_administrative_area_level_2 + '</code>' +
		'<description>' + geotag_administrative_area_level_2 + '</description>'
		as o_value_xml
		from asset_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and geotag_administrative_area_level_2 is not null
			and geotag_administrative_area_level_2 != '' 
		return
	end	
	
	else if ( @i_lov_code_type = 'MLOCALITY' )
	begin
		select distinct '' as value_list,
		'<code>' + geotag_locality + '</code>' +
		'<description>' + geotag_locality + '</description>'
		as o_value_xml
		from asset_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and geotag_locality is not null
			and geotag_locality != '' 
		return
	end	

	else if ( @i_lov_code_type = 'CALL_SEARCH')
		begin
			select  '' as value_list,
			'{' +
					'"code":"' + a.call_ref_no+ '",' +
					'"description":"' + a.call_ref_no +' - '+ 
											isnull((select customer_name 
												from customer 
													where company_id = @i_client_id
													and country_code = @i_country_code
													and customer_id = a.customer_id
											),'')+ '"' +
				'}'
				 as o_value_xml
			
			from call_register a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.call_category = 'SE'
				and a.call_status in ('A','I')
				and a.call_ref_no like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
			set @o_retrieve_status = 'SUCCESS'
			return
		end	

		else if ( @i_lov_code_type = 'ENGG_SEARCH' )
		begin
			select distinct '' as value_list,
			'{' +
					'"code":"' + employee_id + '",' +
					'"description":"' + first_name+'"'+
				'}'
				 as o_value_xml
			
			from employee
			where company_id = @i_client_id
				and country_code = @i_country_code
				and (
						employee_id like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
						or first_name like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
					)
		  set @o_retrieve_status = 'SUCCESS'
			return
		end	
	
	else if ( @i_lov_code_type = 'MSUBLOCALITY' )
	begin
		select distinct '' as value_list,
		'<code>' + geotag_sublocality_level_1 + '</code>' +
		'<description>' + geotag_sublocality_level_1 + '</description>'
		as o_value_xml
		from asset_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and geotag_sublocality_level_1 is not null
			and geotag_sublocality_level_1 != '' 
		return
	end
	
	/* Parts Opportunity */

	else if (@i_lov_code_type = 'GET_HSNGST_TAX_DETAILS')
	begin		

		if exists (select * from item_master a, product_customization_field_value_mapping b
						where a.company_id =  @i_client_id
							and a.country_code = @i_country_code
							and a.company_id = b.company_id
							and a.country_code = b.country_code
							and a.item_code = @i_search_field_1
							and a.item_variant_code = @i_search_field_2
							and b.value_mapping_code = 'CUSTLOCITEMGST'
							and b.field_name1 = 'CUSTOMERID'
							and b.field_value1 = @i_search_field_3
							and b.field_name2 = 'CUSTOMERLOC'
							and b.field_value2 = @i_search_field_4
							and b.field_name3 = 'ITEMCODE'
							and b.field_value3 = @i_search_field_1
							and b.field_name4 = 'ITEMVARIANT'
							and b.field_value4 = @i_search_field_2
							)
		begin
			select '' as value_list,
					'{' + 
						'"charge_category":"' + c.charge_category + '",' +
						'"charge_type":"' + c.charge_code + '",' +
						'"charge_code":"' + c.charge_subcode + '",' +
						'"charge_description":"' + c.charge_description + '",' +
						'"addl_charge_ind":"' + 'T' + '",' +
						'"addl_charge_desc":"' + 'Tax' + '",' +
						'"applicable_percentage":"' + convert(varchar(8),isnull((c.applicable_percentage),0))+ '"' +
					'}' as o_value_xml
				from item_master a, product_customization_field_value_mapping b, sales_tax_code_master c
					where a.company_id =  @i_client_id
							and a.country_code = @i_country_code
							and a.company_id = b.company_id
							and a.country_code = b.country_code
							and a.company_id = c.company_id
							and a.country_code = c.country_code
							and a.item_code = @i_search_field_1
							and a.item_variant_code = @i_search_field_2
							and b.value_mapping_code = 'CUSTLOCITEMGST'
							and b.field_name1 = 'CUSTOMERID'
							and b.field_value1 = @i_search_field_3
							and b.field_name2 = 'CUSTOMERLOC'
							and b.field_value2 = @i_search_field_4
							and b.field_name3 = 'ITEMCODE'
							and b.field_value3 = @i_search_field_1
							and b.field_name4 = 'ITEMVARIANT'
							and b.field_value4 = @i_search_field_2
							and b.field_value6 = c.charge_code
							and c.charge_category = 'STD'
			
		end
		else
		begin
			select '' as value_list,
					'{' + 
						'"charge_category":"' + c.charge_category + '",' +
						'"charge_type":"' + c.charge_code + '",' +
						'"charge_code":"' + c.charge_subcode + '",' +
						'"charge_description":"' + c.charge_description + '",' +
						'"addl_charge_ind":"' + 'T' + '",' +
						'"addl_charge_desc":"' + 'Tax' + '",' +
						'"applicable_percentage":"' + convert(varchar(8),isnull((c.applicable_percentage),0))+ '"' +
					'}' as o_value_xml
				from item_master a, product_customization_udf_value_mapping b, sales_tax_code_master c
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.company_id = b.company_id
					and a.country_code = b.country_code
					and a.company_id = c.company_id
					and a.country_code = c.country_code
					and a.product_udf_char_1 = b.source_field_value
					and b.source_field_name = 'HSNCODE'
					and b.destination_field_value = c.charge_code
					and c.charge_category = 'STD'
					and a.item_code = @i_search_field_1
					and a.item_variant_code = @i_search_field_2
		end
			
		set @o_retrieve_status = 'SUCCESS'
		return	
	end
	else if (@i_lov_code_type = 'GET_HSNGST_TAX_DETAILS_ADDLCHRGS')
	begin

		declare @p_tax_code nvarchar(30), @p_tax_value nvarchar(30)

		select @p_tax_code = product_udf_char_1, 
			   @p_tax_value = product_udf_char_2
				from sales_addlcharge_code_master 
				where company_id = @i_client_id
					and country_code	= @i_country_code 
					and charge_category = @i_search_field_3

		if(@i_search_field_1 = 'OVERALL')
		begin
			select '' as value_list,
					'{' + 
						'"charge_category":"' + b.charge_category + '",' +
						'"charge_type":"' + b.charge_code + '",' +
						'"charge_code":"' + b.charge_subcode + '",' +
						'"charge_description":"' + b.charge_description + '",' +
						'"addl_charge_ind":"' + 'T' + '",' +
						'"addl_charge_desc":"' + 'Tax' + '",' +
						'"applicable_percentage":"' + convert(varchar(8),isnull((b.applicable_percentage),0))+ '"' +
					'}' as o_value_xml
				from product_customization_udf_value_mapping a, sales_tax_code_master b
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.company_id = b.company_id
					and a.country_code = b.country_code
					and a.source_field_name = @p_tax_code
					and a.source_field_value = @p_tax_value
					and a.destination_field_value = b.charge_code
					and b.charge_category = @i_search_field_3
		end
		else
		begin
			if (@p_tax_code = 'ITEMGST')
			begin
				if exists (select * from item_master a, product_customization_field_value_mapping b
							where a.company_id =  @i_client_id
							and a.country_code = @i_country_code
							and a.company_id = b.company_id
							and a.country_code = b.country_code
							and a.item_code = @i_search_field_1
							and a.item_variant_code = @i_search_field_2
							and b.value_mapping_code = 'CUSTLOCITEMGST'
							and b.field_name1 = 'CUSTOMERID'
							and b.field_value1 = @i_search_field_4
							and b.field_name2 = 'CUSTOMERLOC'
							and b.field_value2 = @i_search_field_5
							and b.field_name3 = 'ITEMCODE'
							and b.field_value3 = @i_search_field_1
							and b.field_name4 = 'ITEMVARIANT'
							and b.field_value4 = @i_search_field_2)

				begin
					select '' as value_list,
						'{' + 
							'"charge_category":"' + c.charge_category + '",' +
							'"charge_type":"' + c.charge_code + '",' +
							'"charge_code":"' + c.charge_subcode + '",' +
							'"charge_description":"' + c.charge_description + '",' +
							'"addl_charge_ind":"' + 'T' + '",' +
							'"addl_charge_desc":"' + 'Tax' + '",' +
							'"applicable_percentage":"' + convert(varchar(8),isnull((c.applicable_percentage),0))+ '"' +
						'}' as o_value_xml
					from item_master a, product_customization_field_value_mapping b, sales_tax_code_master c
						where a.company_id =  @i_client_id
							and a.country_code = @i_country_code
							and a.company_id = b.company_id
							and a.country_code = b.country_code
							and a.item_code = @i_search_field_1
							and a.item_variant_code = @i_search_field_2
							and b.value_mapping_code = 'CUSTLOCITEMGST'
							and b.field_name1 = 'CUSTOMERID'
							and b.field_value1 = @i_search_field_4
							and b.field_name2 = 'CUSTOMERLOC'
							and b.field_value2 = @i_search_field_5
							and b.field_name3 = 'ITEMCODE'
							and b.field_value3 = @i_search_field_1
							and b.field_name4 = 'ITEMVARIANT'
							and b.field_value4 = @i_search_field_2
							and b.field_value6 = c.charge_code
							and c.charge_category = @i_search_field_3
				end
				else
				begin
					select '' as value_list,
						'{' + 
							'"charge_category":"' + c.charge_category + '",' +
							'"charge_type":"' + c.charge_code + '",' +
							'"charge_code":"' + c.charge_subcode + '",' +
							'"charge_description":"' + c.charge_description + '",' +
							'"addl_charge_ind":"' + 'T' + '",' +
							'"addl_charge_desc":"' + 'Tax' + '",' +
							'"applicable_percentage":"' + convert(varchar(8),isnull((c.applicable_percentage),0))+ '"' +
						'}' as o_value_xml
					from item_master a, product_customization_udf_value_mapping b, sales_tax_code_master c
					where a.company_id = @i_client_id
						and a.country_code = @i_country_code
						and a.company_id = b.company_id
						and a.country_code = b.country_code
						and a.company_id = c.company_id
						and a.country_code = c.country_code
						and a.product_udf_char_1 = b.source_field_value
						and b.source_field_name = 'HSNCODE'
						and b.destination_field_value = c.charge_code
						and c.charge_category = @i_search_field_3
						and a.item_code = @i_search_field_1
						and a.item_variant_code = @i_search_field_2
				end
			end
			else
			begin
				select '' as value_list,
					'{' + 
						'"charge_category":"' + b.charge_category + '",' +
						'"charge_type":"' + b.charge_code + '",' +
						'"charge_code":"' + b.charge_subcode + '",' +
						'"charge_description":"' + b.charge_description + '",' +
						'"addl_charge_ind":"' + 'T' + '",' +
						'"addl_charge_desc":"' + 'Tax' + '",' +
						'"applicable_percentage":"' + convert(varchar(8),isnull((b.applicable_percentage),0))+ '"' +
					'}' as o_value_xml
				from product_customization_udf_value_mapping a, sales_tax_code_master b
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.company_id = b.company_id
					and a.country_code = b.country_code
					and a.source_field_name = @p_tax_code
					and a.source_field_value = @p_tax_value
					and a.destination_field_value = b.charge_code
					and b.charge_category = @i_search_field_3
			end		
		end

		set @o_retrieve_status = 'SUCCESS'
		return	
	end
	else if (@i_lov_code_type = 'QUOTATIONACCESSORY_ITEM_LINK')
	begin
		select '' as value_list,
			'{' +
				'"sl_no":"' + convert(nvarchar(5),row_number() over(order by case when isnull((select c.udf_char_1 
													from item_master c
													where c.company_id = @i_client_id
														and c.country_code = @i_country_code
														and c.item_code = a.item_code
														and c.item_variant_code = a.item_variant_code),'') = 'Standard Accessory' then '1'
									else isnull((select c.udf_char_1 
													from item_master c
													where c.company_id = @i_client_id
														and c.country_code = @i_country_code
														and c.item_code = a.item_code
														and c.item_variant_code = a.item_variant_code),'') end asc)) + '",' +
				'"quotation_item_code":"' + @i_search_field_1 + '",' +
				'"quotation_item_variant_code":"' + @i_search_field_2 + '",' +
				'"accessory_item_code":"' + a.item_code + '",' +
				'"accessory_item_variant_code":"' + a.item_variant_code + '",' +
				'"accessory_group":"' + isnull((select c.udf_char_1 
											from item_master c
											where c.company_id = @i_client_id
												and c.country_code = @i_country_code
												and c.item_code = a.item_code
												and c.item_variant_code = a.item_variant_code),'') + '",' +
				'"net_quantity":"' + convert(nvarchar(5),a.item_quantity_per) + '",' +
				'"uom_code":"' + b.uom_code + '",' +
				'"std_rate":"' + convert(nvarchar(18),b.std_rate) + '",' +
				'"currency_code":"' + b.currency_code + '",' +
				'"item_description":"' + isnull((select item_description 
											from item_master c
											where c.company_id = @i_client_id
												and c.country_code = @i_country_code
												and c.item_code = a.item_code
												and c.item_variant_code = a.item_variant_code),'') + '",' +
				'"variant_description":"' + isnull((select variant_description 
											from item_master c
											where c.company_id = @i_client_id
												and c.country_code = @i_country_code
												and c.item_code = a.item_code
												and c.item_variant_code = a.item_variant_code),'') + '",' +
				'"gross_amount":"' + convert(nvarchar(18),b.std_rate * a.item_quantity_per) + '",' +
				'"uom_code_description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ITEMUOM_LIST',b.uom_code) + '",' +
				'"currency_code_description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CURRENCYCODE_LIST',b.currency_code) + '",' +
				'"last_update_timestamp":"' + cast(convert(uniqueidentifier,cast(a.last_update_timestamp as binary)) as varchar(36))  + '"' +
			'}' as o_value_xml
		from equipment_item_link a, item_rate b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.item_code = b.item_code
			and a.item_variant_code = b.item_variant_code
			and a.link_type = 'EQACCESSORYPARTNO'
			and equipment_id = (select c.equipment_id 
								from equipment_item_link c 
									where c.company_id = @i_client_id
										and c.country_code = @i_country_code 
										and c.link_type = 'EQPARTNO' 
										and c.item_code = @i_search_field_1
										and c.item_variant_code = @i_search_field_2)
		order by case when isnull((select c.udf_char_1 
										from item_master c
										where c.company_id = @i_client_id
											and c.country_code = @i_country_code
											and c.item_code = a.item_code
											and c.item_variant_code = a.item_variant_code),'') = 'Standard Accessory' then '1'
						else isnull((select c.udf_char_1 
										from item_master c
										where c.company_id = @i_client_id
											and c.country_code = @i_country_code
											and c.item_code = a.item_code
											and c.item_variant_code = a.item_variant_code),'') end asc
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if (@i_lov_code_type = 'ORDERACCESSORY_ITEM_LINK')
	begin
		select '' as value_list,
			'{' +
				'"sl_no":"' + convert(nvarchar(5),row_number() over(order by case when isnull((select c.udf_char_1 
										from item_master c
										where c.company_id = @i_client_id
											and c.country_code = @i_country_code
											and c.item_code = a.item_code
											and c.item_variant_code = a.item_variant_code),'') = 'Standard Accessory' then '1'
						else isnull((select c.udf_char_1 
										from item_master c
										where c.company_id = @i_client_id
											and c.country_code = @i_country_code
											and c.item_code = a.item_code
											and c.item_variant_code = a.item_variant_code),'') end asc)) + '",' +
				'"customer_order_item_code":"' + @i_search_field_1 + '",' +
				'"customer_order_item_variant_code":"' + @i_search_field_2 + '",' +
				'"accessory_item_code":"' + a.item_code + '",' +
				'"accessory_item_variant_code":"' + a.item_variant_code + '",' +
				'"accessory_group":"' + isnull((select c.udf_char_1 
											from item_master c
											where c.company_id = @i_client_id
												and c.country_code = @i_country_code
												and c.item_code = a.item_code
												and c.item_variant_code = a.item_variant_code),'') + '",' +
				'"net_quantity":"' + convert(nvarchar(5),a.item_quantity_per) + '",' +
				'"uom_code":"' + b.uom_code + '",' +
				'"std_rate":"' + convert(nvarchar(18),b.std_rate) + '",' +
				'"currency_code":"' + b.currency_code + '",' +
				'"item_description":"' + isnull((select item_description 
											from item_master c
											where c.company_id = @i_client_id
												and c.country_code = @i_country_code
												and c.item_code = a.item_code
												and c.item_variant_code = a.item_variant_code),'') + '",' +
				'"variant_description":"' + isnull((select variant_description 
											from item_master c
											where c.company_id = @i_client_id
												and c.country_code = @i_country_code
												and c.item_code = a.item_code
												and c.item_variant_code = a.item_variant_code),'') + '",' +
				'"gross_amount":"' + convert(nvarchar(18),b.std_rate * a.item_quantity_per) + '",' +
				'"uom_code_description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ITEMUOM_LIST',b.uom_code) + '",' +
				'"currency_code_description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CURRENCYCODE_LIST',b.currency_code) + '",' +
				'"last_update_timestamp":"' + cast(convert(uniqueidentifier,cast(a.last_update_timestamp as binary)) as varchar(36))  + '"' +
			'}' as o_value_xml
		from equipment_item_link a, item_rate b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.item_code = b.item_code
			and a.item_variant_code = b.item_variant_code
			and a.link_type = 'EQACCESSORYPARTNO'
			and equipment_id = (select c.equipment_id 
								from equipment_item_link c 
									where c.company_id = @i_client_id
										and c.country_code = @i_country_code 
										and c.link_type = 'EQPARTNO' 
										and c.item_code = @i_search_field_1
										and c.item_variant_code = @i_search_field_2)

		order by case when isnull((select c.udf_char_1 
										from item_master c
										where c.company_id = @i_client_id
											and c.country_code = @i_country_code
											and c.item_code = a.item_code
											and c.item_variant_code = a.item_variant_code),'') = 'Standard Accessory' then '1'
						else isnull((select c.udf_char_1 
										from item_master c
										where c.company_id = @i_client_id
											and c.country_code = @i_country_code
											and c.item_code = a.item_code
											and c.item_variant_code = a.item_variant_code),'') end asc

		set @o_retrieve_status = 'SUCCESS'
		return
	end	
	else if (@i_lov_code_type = 'INVOICEACCESSORY_ITEM_LINK')
	begin
		select '' as value_list,
			'{' +
				'"sl_no":"' + convert(nvarchar(5),row_number() over(order by case when isnull((select c.udf_char_1 
										from item_master c
										where c.company_id = @i_client_id
											and c.country_code = @i_country_code
											and c.item_code = a.item_code
											and c.item_variant_code = a.item_variant_code),'') = 'Standard Accessory' then '1'
						else isnull((select c.udf_char_1 
										from item_master c
										where c.company_id = @i_client_id
											and c.country_code = @i_country_code
											and c.item_code = a.item_code
											and c.item_variant_code = a.item_variant_code),'') end asc)) + '",' +
				'"salesinvoice_item_code":"' + @i_search_field_1 + '",' +
				'"salesinvoice_item_variant_code":"' + @i_search_field_2 + '",' +
				'"accessory_item_code":"' + a.item_code + '",' +
				'"accessory_item_variant_code":"' + a.item_variant_code + '",' +
				'"accessory_group":"' + isnull((select c.udf_char_1 
											from item_master c
											where c.company_id = @i_client_id
												and c.country_code = @i_country_code
												and c.item_code = a.item_code
												and c.item_variant_code = a.item_variant_code),'') + '",' +
				'"net_quantity":"' + convert(nvarchar(5),a.item_quantity_per) + '",' +
				'"uom_code":"' + b.uom_code + '",' +
				'"std_rate":"' + convert(nvarchar(18),b.std_rate) + '",' +
				'"currency_code":"' + b.currency_code + '",' +
				'"item_description":"' + isnull((select item_description 
											from item_master c
											where c.company_id = @i_client_id
												and c.country_code = @i_country_code
												and c.item_code = a.item_code
												and c.item_variant_code = a.item_variant_code),'') + '",' +
				'"variant_description":"' + isnull((select variant_description 
											from item_master c
											where c.company_id = @i_client_id
												and c.country_code = @i_country_code
												and c.item_code = a.item_code
												and c.item_variant_code = a.item_variant_code),'') + '",' +
				'"gross_amount":"' + convert(nvarchar(18),b.std_rate * a.item_quantity_per) + '",' +
				'"uom_code_description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ITEMUOM_LIST',b.uom_code) + '",' +
				'"currency_code_description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CURRENCYCODE_LIST',b.currency_code) + '",' +
				'"last_update_timestamp":"' + cast(convert(uniqueidentifier,cast(a.last_update_timestamp as binary)) as varchar(36))  + '"' +
			'}' as o_value_xml
		from equipment_item_link a, item_rate b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.item_code = b.item_code
			and a.item_variant_code = b.item_variant_code
			and a.link_type = 'EQACCESSORYPARTNO'
			and equipment_id = (select c.equipment_id 
								from equipment_item_link c 
									where c.company_id = @i_client_id
										and c.country_code = @i_country_code 
										and c.link_type = 'EQPARTNO' 
										and c.item_code = @i_search_field_1
										and c.item_variant_code = @i_search_field_2)

		order by case when isnull((select c.udf_char_1 
										from item_master c
										where c.company_id = @i_client_id
											and c.country_code = @i_country_code
											and c.item_code = a.item_code
											and c.item_variant_code = a.item_variant_code),'') = 'Standard Accessory' then '1'
						else isnull((select c.udf_char_1 
										from item_master c
										where c.company_id = @i_client_id
											and c.country_code = @i_country_code
											and c.item_code = a.item_code
											and c.item_variant_code = a.item_variant_code),'') end asc

		set @o_retrieve_status = 'SUCCESS'
		return
	end	
	else if (@i_lov_code_type = 'GET_ACCESSORY_QTY')
	begin
		select '' as value_list,
			'{' + 
				'"accessory_quantity":"' + CONVERT(varchar(5), a.item_quantity_per) + '"' +
			'}' as o_value_xml
		from equipment_item_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.item_code = @i_search_field_1
			and a.item_variant_code = @i_search_field_2
			and a.link_type = 'EQACCESSORYPARTNO'

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	/* End*/


	/* Geo Address Storing*/

	if (@i_lov_code_type = 'GET_LATLNG_FOR_ADDRESS_STORE')
	begin
		create table #latlng_address_store (
			entity_name varchar(20),
			entity_key varchar(50),
			entity_sub_key varchar(50),
			latitude varchar(10),
			longitude varchar(10)
		)

		insert #latlng_address_store (
			entity_name,
			entity_key,
			entity_sub_key,
			latitude,
			longitude
		)
		select 'ASSET',
			asset_id,
			'NA',
			latitude,
			longitude
		from asset_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and isnull(latitude, '') != ''
			and isnull(longitude, '') != ''
			and isnull(geotag_route, '') = ''
		order by creation_date desc
	
	/*
	insert #latlng_address_store (
			entity_name,
			entity_key,
			entity_sub_key,
			latitude,
			longitude
		)
		select top(50)
			'STRIPSHEET',
			call_ref_no,
			cast(trip_seqno as varchar(10)),
			start_lattitude_value,
			start_longitude_value
		from trip_sheet
		where company_id = @i_client_id
			and country_code = @i_country_code
			and isnull(start_lattitude_value, '') != ''
			and isnull(start_longitude_value, '') != ''
			and isnull(start_geotag_route, '') = ''
			and trip_start_datetime >= convert(datetimeoffset, '2018-11-01')
		order by trip_start_datetime desc
		
		insert #latlng_address_store (
			entity_name,
			entity_key,
			entity_sub_key,
			latitude,
			longitude
		)
		select top(50)
			'FTRIPSHEET',
			call_ref_no,
			cast(trip_seqno as varchar(10)),
			finish_lattitude_value,
			finish_longitude_value
		from trip_sheet
		where company_id = @i_client_id
			and country_code = @i_country_code
			and isnull(finish_lattitude_value, '') != ''
			and isnull(finish_longitude_value, '') != ''
			and isnull(finish_geotag_route, '') = ''
			and trip_finish_datetime >= convert(datetimeoffset, '2018-11-01')
		order by trip_finish_datetime desc
		
		insert #latlng_address_store (
			entity_name,
			entity_key,
			entity_sub_key,
			latitude,
			longitude
		)
		select top(50)
			'STIMECARD',
			employee_id,
			cast(entry_seqno as varchar(10)),
			start_lattitude_value,
			start_longitude_value
		from timecard
		where company_id = @i_client_id
			and country_code = @i_country_code
			and isnull(start_lattitude_value, '') != ''
			and isnull(start_longitude_value, '') != ''
			and isnull(start_geotag_route, '') = ''
			and work_date >= convert(datetimeoffset, '')
		order by work_date desc
		
		insert #latlng_address_store (
			entity_name,
			entity_key,
			entity_sub_key,
			latitude,
			longitude
		)
		select top(50)
			'FTIMECARD',
			employee_id,
			cast(entry_seqno as varchar(10)),
			finish_lattitude_value,
			finish_longitude_value
		from timecard
		where company_id = @i_client_id
			and country_code = @i_country_code
			and isnull(finish_lattitude_value, '') != ''
			and isnull(finish_longitude_value, '') != ''
			and isnull(finish_geotag_route, '') = ''
			and work_date >= convert(datetimeoffset, '2018-11-01')
		order by work_date desc
		*/
		select '' as value_list,
			'{' +
				'"entity_name":"' + entity_name + '",' +
				'"entity_key":"' + entity_key + '",' +
				'"entity_subkey":"' + entity_sub_key + '",' +
				'"latitude":"' + latitude + '",' +
				'"longitude":"' + longitude + '",' +
				'"address":""' +
			'}' as o_value_xml		
		from #latlng_address_store
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	if (@i_lov_code_type = 'SET_LATLNG_FOR_ADDRESS_STORE')
	begin
		declare @p_entity_name varchar(30), 
			@p_entity_key varchar(30),
			@p_entity_subkey varchar(30),
			@p_latitude varchar(10),
			@p_longitude varchar(10),
			@p_geotag_postal_code nvarchar(500),
			@p_geotag_country nvarchar(500),
			@p_geotag_administrative_area_level_1 nvarchar(500),
			@p_geotag_administrative_area_level_2 nvarchar(500),
			@p_geotag_locality nvarchar(500),
			@p_geotag_sublocality_level_1 nvarchar(500),
			@p_geotag_sublocality_level_2 nvarchar(500),
			@p_geotag_sublocality_level_3 nvarchar(500),
			@p_geotag_route nvarchar(500)
			
		select @p_entity_name = paramval from #input_params where paramname = 'entity_name'
		select @p_entity_key = paramval from #input_params where paramname = 'entity_key'
		select @p_entity_subkey = paramval from #input_params where paramname = 'entity_subkey'
		select @p_latitude = paramval from #input_params where paramname = 'latitude'
		select @p_longitude = paramval from #input_params where paramname = 'longitude'
		select @p_geotag_postal_code = paramval from #input_params where paramname = 'postal_code'
		select @p_geotag_country = paramval from #input_params where paramname = 'country'
		select @p_geotag_administrative_area_level_1 = paramval from #input_params where paramname = 'administrative_area_level_1'
		select @p_geotag_administrative_area_level_2 = paramval from #input_params where paramname = 'administrative_area_level_2'
		select @p_geotag_locality = paramval from #input_params where paramname = 'locality'
		select @p_geotag_sublocality_level_1 = paramval from #input_params where paramname = 'sublocality_level_1'
		select @p_geotag_sublocality_level_2 = paramval from #input_params where paramname = 'sublocality_level_2'
		select @p_geotag_sublocality_level_3 = paramval from #input_params where paramname = 'sublocality_level_3'
		select @p_geotag_route = paramval from #input_params where paramname = 'route'
	
		if (@p_entity_name = 'ASSET')
		begin
		
			update asset_master
			set geotag_postal_code = @p_geotag_postal_code,
				geotag_country = @p_geotag_country,
				geotag_administrative_area_level_1 = @p_geotag_administrative_area_level_1,
				geotag_administrative_area_level_2 = @p_geotag_administrative_area_level_2,
				geotag_locality = @p_geotag_locality,
				geotag_sublocality_level_1 = @p_geotag_sublocality_level_1,
				geotag_sublocality_level_2 = @p_geotag_sublocality_level_2,
				geotag_sublocality_level_3 = @p_geotag_sublocality_level_3,
				geotag_route = @p_geotag_route
			where company_id = @i_client_id
				and country_code = @i_country_code
				and asset_id = @p_entity_key
				and latitude = @p_latitude
				and longitude = @p_longitude
				
			if @@ROWCOUNT != 0
			begin
				select '' as value_list,
					'{' +
						'"status":"true",' +
						'"message":"Geo tag successfully done."' +
					'}' as o_value_xml
			end
			else
			begin
				select '' as value_list,
					'{' +
						'"status":"false",' +
						'"message":"Failed to tag the location"' +
					'}' as o_value_xml
			end		
			
			set @o_retrieve_status = 'SUCCESS'			
			return
		end
		else if (@p_entity_name = 'CALLEVENT')
		begin
		
			update call_status_event_log
			set geotag_postal_code = @p_geotag_postal_code,
				geotag_country = @p_geotag_country,
				geotag_administrative_area_level_1 = @p_geotag_administrative_area_level_1,
				geotag_administrative_area_level_2 = @p_geotag_administrative_area_level_2,
				geotag_locality = @p_geotag_locality,
				geotag_sublocality_level_1 = @p_geotag_sublocality_level_1,
				geotag_sublocality_level_2 = @p_geotag_sublocality_level_2,
				geotag_sublocality_level_3 = @p_geotag_sublocality_level_3,
				geotag_route = @p_geotag_route
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_entity_key
				and event_id = @p_entity_subkey
				and lattitude_value = @p_latitude
				and longitude_value = @p_longitude
				
			if @@ROWCOUNT != 0
			begin
				select '' as value_list,
					'{' +
						'"status":"true",' +
						'"message":"Geo tag successfully done."' +
					'}' as o_value_xml
			end
			else
			begin
				select '' as value_list,
					'{' +
						'"status":"false",' +
						'"message":"Failed to tag the location"' +
					'}' as o_value_xml
			end		
			
			set @o_retrieve_status = 'SUCCESS'			
			return
		end
		else if (@p_entity_name = 'STRIPSHEET')
		begin
		
			update trip_sheet
			set start_geotag_postal_code = @p_geotag_postal_code,
				start_geotag_country = @p_geotag_country,
				start_geotag_administrative_area_level_1 = @p_geotag_administrative_area_level_1,
				start_geotag_administrative_area_level_2 = @p_geotag_administrative_area_level_2,
				start_geotag_locality = @p_geotag_locality,
				start_geotag_sublocality_level_1 = @p_geotag_sublocality_level_1,
				start_geotag_sublocality_level_2 = @p_geotag_sublocality_level_2,
				start_geotag_sublocality_level_3 = @p_geotag_sublocality_level_3,
				start_geotag_route = @p_geotag_route
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_entity_key
				and trip_seqno = @p_entity_subkey
				and start_lattitude_value = @p_latitude
				and start_longitude_value = @p_longitude
				
			if @@ROWCOUNT != 0
			begin
				select '' as value_list,
					'{' +
						'"status":"true",' +
						'"message":"Geo tag successfully done."' +
					'}' as o_value_xml
			end
			else
			begin
				select '' as value_list,
					'{' +
						'"status":"false",' +
						'"message":"Failed to tag the location"' +
					'}' as o_value_xml
			end		
			
			set @o_retrieve_status = 'SUCCESS'			
			return
		end
		else if (@p_entity_name = 'FTRIPSHEET')
		begin
		
			update trip_sheet
			set finish_geotag_postal_code = @p_geotag_postal_code,
				finish_geotag_country = @p_geotag_country,
				finish_geotag_administrative_area_level_1 = @p_geotag_administrative_area_level_1,
				finish_geotag_administrative_area_level_2 = @p_geotag_administrative_area_level_2,
				finish_geotag_locality = @p_geotag_locality,
				finish_geotag_sublocality_level_1 = @p_geotag_sublocality_level_1,
				finish_geotag_sublocality_level_2 = @p_geotag_sublocality_level_2,
				finish_geotag_sublocality_level_3 = @p_geotag_sublocality_level_3,
				finish_geotag_route = @p_geotag_route
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @p_entity_key
				and trip_seqno = @p_entity_subkey
				and finish_lattitude_value = @p_latitude
				and finish_longitude_value = @p_longitude
				
			if @@ROWCOUNT != 0
			begin
				select '' as value_list,
					'{' +
						'"status":"true",' +
						'"message":"Geo tag successfully done."' +
					'}' as o_value_xml
			end
			else
			begin
				select '' as value_list,
					'{' +
						'"status":"false",' +
						'"message":"Failed to tag the location"' +
					'}' as o_value_xml
			end		
			
			set @o_retrieve_status = 'SUCCESS'			
			return
		end
		else if (@p_entity_name = 'STIMECARD')
		begin
		
			update timecard
			set start_geotag_postal_code = @p_geotag_postal_code,
				start_geotag_country = @p_geotag_country,
				start_geotag_administrative_area_level_1 = @p_geotag_administrative_area_level_1,
				start_geotag_administrative_area_level_2 = @p_geotag_administrative_area_level_2,
				start_geotag_locality = @p_geotag_locality,
				start_geotag_sublocality_level_1 = @p_geotag_sublocality_level_1,
				start_geotag_sublocality_level_2 = @p_geotag_sublocality_level_2,
				start_geotag_sublocality_level_3 = @p_geotag_sublocality_level_3,
				start_geotag_route = @p_geotag_route
			where company_id = @i_client_id
				and country_code = @i_country_code
				and employee_id = @p_entity_key
				and entry_seqno = @p_entity_subkey
				and start_lattitude_value = @p_latitude
				and start_longitude_value = @p_longitude
				
			if @@ROWCOUNT != 0
			begin
				select '' as value_list,
					'{' +
						'"status":"true",' +
						'"message":"Geo tag successfully done."' +
					'}' as o_value_xml
			end
			else
			begin
				select '' as value_list,
					'{' +
						'"status":"false",' +
						'"message":"Failed to tag the location"' +
					'}' as o_value_xml
			end		
			
			set @o_retrieve_status = 'SUCCESS'			
			return
		end
		else if (@p_entity_name = 'FTIMECARD')
		begin
		
			update timecard
			set finish_geotag_postal_code = @p_geotag_postal_code,
				finish_geotag_country = @p_geotag_country,
				finish_geotag_administrative_area_level_1 = @p_geotag_administrative_area_level_1,
				finish_geotag_administrative_area_level_2 = @p_geotag_administrative_area_level_2,
				finish_geotag_locality = @p_geotag_locality,
				finish_geotag_sublocality_level_1 = @p_geotag_sublocality_level_1,
				finish_geotag_sublocality_level_2 = @p_geotag_sublocality_level_2,
				finish_geotag_sublocality_level_3 = @p_geotag_sublocality_level_3,
				finish_geotag_route = @p_geotag_route
			where company_id = @i_client_id
				and country_code = @i_country_code
				and employee_id = @p_entity_key
				and entry_seqno = @p_entity_subkey
				and finish_lattitude_value = @p_latitude
				and finish_longitude_value = @p_longitude
				
			if @@ROWCOUNT != 0
			begin
				select '' as value_list,
					'{' +
						'"status":"true",' +
						'"message":"Geo tag successfully done."' +
					'}' as o_value_xml
			end
			else
			begin
				select '' as value_list,
					'{' +
						'"status":"false",' +
						'"message":"Failed to tag the location"' +
					'}' as o_value_xml
			end		
						
			set @o_retrieve_status = 'SUCCESS'
			return
		end
	end
	if ( @i_lov_code_type = 'CAPP_CALL_CATEGORY_LIST' )
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'CALLCATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLCATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLCATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLCATG'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	if ( @i_lov_code_type = 'CAPP_CALL_TYPE_LIST_LINKED' )
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'CALLTYPE'
							and f.code = a.type_code_value)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLTYPE'
						and e.code = a.type_code_value)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLTYPE'
						and g.code = a.type_code_value)
				end + '",' +
				'"parent_code":"' + a.category_code_value + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'CC'
			and a.category_code_value = 'SE'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'CAPP_CALL_PRIORITY_LIST' )
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'CALLPRIORITY'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLPRIORITY'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLPRIORITY'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLPRIORITY'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'CAPP_ASSET_ID_LIST' )
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.equipment_id + '",' +
				'"description":"' + a.description + '"' +
			'}' as o_value_xml
		from equipment a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'CAPP_STATE_LIST' )
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.state_code + '",' +
				'"description":"' + a.state + '"' +
			'}' as o_value_xml
		from state a
		where a.country_code = @i_country_code

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'CAPP_DISTRICT_LIST' )
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.district_code + '",' +
				'"description":"' + a.district_name + '",' +
				'"state_code":"' + a.state_code + '"' +
			'}' as o_value_xml
		from district_master a
		where a.country_code = @i_country_code

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'CAPP_CUST_CONTACT_DETAILS' )
	begin
		select '' as value_list,
			'{' +
				'"cont_name":"' + a.first_name + ' ' + isnull(a.middle_name, '') + ' ' + a.last_name + '",' +
				'"cont_no":"' + isnull(a.contact_mobile_no, '') + '",' +
				'"cont_email":"' + isnull(a.email_id, '') + '",' +
				'"cust_id":"' + (
					select customer_id 
					from customer_user_mapping
					where company_id = @i_client_id
						and country_code = @i_country_code
						and user_id = @i_user_id
				) + '"' +
			'}' as o_value_xml
		from employee a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.employee_id = @i_user_id
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'CAPP_MY_MACHINES' )
	begin
		select '' as value_list,
			'{' +
				'"machineName":"' + asset_id + '",' +
				'"machineModel":"' + equipment_id + '",' +
				'"state_code":"' + udf_char_2 + '",' +
				'"state_desc":"' + (
					select state from state
					where country_code = a.udf_char_1
						and state_code = a.udf_char_2
				) + '",' +
				'"country_code":"' + udf_char_1 + '",' +
				'"country_desc":"' + (
					select country_name from country
					where country_code = a.udf_char_1
				) + '",' +
				'"machine_location":"' + isnull(asset_location_code, '') + '",' +
				'"machineDesp":"' + (
					select description 
					from equipment
					where company_id = @i_client_id
						and country_code = @i_country_code
						and equipment_id = a.equipment_id
				) + '"' +
			'}' as o_value_xml
		from asset_master a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.customer_id = (
				select customer_id 
				from customer_user_mapping
				where company_id = @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id
			)
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'CAPP_MY_USERS' )
	begin
		select '' as value_list,
			'{' +
				'"operatorName":"' + a.first_name + ' ' + isnull(a.middle_name, '') + ' ' + a.last_name + '",' +
				'"role":"' + (
					select role_description from functional_role
					where company_id = @i_client_id
						and country_code = @i_country_code
						and functional_role_id = a.udf_char_1) + '",' +
				'"operatorNo":"' + a.contact_mobile_no + '"' +
			'}' as o_value_xml
		from employee a, customer_user_mapping b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.user_id = a.employee_id
			and b.user_id != @i_user_id
			and b.customer_id = (
				select customer_id 
				from customer_user_mapping
				where company_id = @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id
			)
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'CAPP_MY_USERS_FOR_MACHINES' )
	begin
		select '' as value_list,
			'{' +
				'"operatorName":"' + a.first_name + ' ' + isnull(a.middle_name, '') + ' ' + a.last_name + '",' +
				'"operatorNo":"' + a.contact_mobile_no + '",' +
				'"role":"' + (
					select role_description from functional_role
					where company_id = @i_client_id
						and country_code = @i_country_code
						and functional_role_id = a.udf_char_1) + '",' +
				'"active_ind":"' + case(
					select 1 from customer_user_mapping_to_assets
					where company_id = @i_client_id
						and country_code = @i_country_code
						and customer_id = b.customer_id
						and customer_location_code = b.customer_location_code
						and employee_id = b.user_id
						and asset_id = @i_search_field_1
				) when 1 then '1' else '0' end + '"' +
			'}' as o_value_xml
		from employee a, customer_user_mapping b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.user_id = a.employee_id
			and b.user_id != @i_user_id
			and b.customer_id = (
				select customer_id 
				from customer_user_mapping
				where company_id = @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id
			)
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'CAPP_MY_MACHINES_FOR_USERS' )
	begin
		select '' as value_list,
			'{' +
				'"machineName":"' + a.asset_id + '",' +
				'"machineModel":"' + a.equipment_id + '",' +
				'"machineDesp":"' + b.description + '",' +
				'"active_ind":"' + case(
					select 1 from customer_user_mapping_to_assets
					where company_id = @i_client_id
						and country_code = @i_country_code
						and customer_id = a.customer_id
						and employee_id = @i_search_field_1
						and asset_id = a.asset_id
				) when 1 then '1' else '0' end + '"' +
			'}' as o_value_xml
		from asset_master a, equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.customer_id = (
				select customer_id 
				from customer_user_mapping
				where company_id = @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id
			)
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.equipment_id = a.equipment_id
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'CAPP_MY_LOCATIONS' )
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.location_code + '",' +
				'"name":"' + a.location_name_short + '",' +
				'"address":"' + a.address_line_1 + ' ' + isnull(a.address_line_2, '') + ' ' + isnull(a.address_line_3, '') + '",' +
				'"district":"' + (
					select district_name from district_master
					where country_code = @i_country_code
						and state_code = a.state_code
						and district_code = a.city) + '",' +
				'"state":"' + (
					select state from state
					where country_code = @i_country_code
						and state_code = a.state_code) + '"' +
			'}' as o_value_xml
		from customer_location a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.customer_id = (
				select customer_id 
				from customer_user_mapping
				where company_id = @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id
			)
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'CAPP_LOCATION_LIST' )
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.location_code + '",' +
				'"description":"' + a.location_name_short + '"' +
			'}' as o_value_xml
		from customer_location a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.customer_id = (
				select customer_id 
				from customer_user_mapping
				where company_id = @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id
			)
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'CAPP_DESIGNATION_LIST' )
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.functional_role_id + '",' +
				'"description":"' + a.role_description + '"' +
			'}' as o_value_xml
		from functional_role a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end


	if ( @i_lov_code_type = 'CAPP_CALL_TYPE_LIST' )
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'CALLTYPE'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'CALLTYPE'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'CALLTYPE'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLTYPE'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'CAPP_LANGUAGE_LIST' )
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.locale_id + '",' +
				'"description":"' + a.locale_name + '"' +
			'}' as o_value_xml
		from locale a
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if (@i_lov_code_type = 'TAG_COLLECTION')
	begin
		select '' as value_list,
		'{' + 
			'"tag_id":"' + tag_id + '"' +
		'}' as o_value_xml
		from tag_store
		where company_id = @i_client_id
			and country_code = @i_country_code

		return
	end

	if (@i_lov_code_type = 'DOCUMENT_COLLECTION')
	begin

		create table #input_params_multival (
			paramname varchar(50) not null,
			paramval varchar(50) not null
		)

		declare @p_logic_operator char(3), @p_tag_list nvarchar(500), @p_tag_list_string nvarchar(500)

		select @p_logic_operator = paramval from #input_params where paramname like '%search_field_1%'
		select @p_tag_list = paramval, @p_tag_list_string = paramval from #input_params where paramname like '%search_field_2%'		

		if @p_tag_list_string != '%'
		begin
	
			if charindex(',', @p_tag_list_string) = 0 and @p_tag_list_string != ''
			begin
				set @p_tag_list = @p_tag_list_string
				set @p_tag_list_string = ''
			end
			else
			begin
				set @p_tag_list = substring(@p_tag_list_string, 1, charindex(',', @p_tag_list_string)-1)
				set @p_tag_list_string = substring(@p_tag_list_string, charindex(',', @p_tag_list_string)+1, len(@p_tag_list_string))				
			end
							  
			while (@p_tag_list != '')
			begin 					  
				insert #input_params_multival (paramname, paramval) select 'tag_filter', @p_tag_list
							
				if charindex(',', @p_tag_list_string) = 0 
				begin
					set @p_tag_list = @p_tag_list_string
					set @p_tag_list_string = ''
				end
				else
				begin
					set @p_tag_list = substring( @p_tag_list_string, 1, charindex(',',@p_tag_list_string)-1)
					set @p_tag_list_string = substring(@p_tag_list_string, charindex(',',@p_tag_list_string)+1,LEN(@p_tag_list_string))
				end							
			end
			
			if @p_logic_operator = 'OR'
			begin
			
				select '' as value_list,
				'{' + 
					'"file_id":"' + file_id + '",' +
					'"file_sys_id":"' + convert(varchar(6), file_sysgen_id) + '",' +
					'"file_name":"' + file_name + '",' +
					'"file_category":"' + file_category + '",' +
					'"file_type":"' + file_type + '",' +
					'"file_path":"' + file_path + '",' +
					'"file_desc":"' + isnull(file_description, '') + '",' +
					'"file_tag_list":"' + (
						select substring ((select ',' + tag_id 
						from document_tag_mapping
						where company_id = @i_client_id
							and country_code = @i_country_code
							and file_sysgen_id = document_store.file_sysgen_id					
						for xml path ('')), 2, 1000)
					) + '"' +
				'}' as o_value_xml
				from document_store
				where company_id = @i_client_id
					and country_code = @i_country_code
					and file_sysgen_id in (
						select file_sysgen_id
						from document_tag_mapping
						where company_id = @i_client_id
							and country_code = @i_country_code
							and tag_id in (
								select paramval from #input_params_multival
								where paramname = 'tag_filter'
							)
					)

			end
			else
			begin

				select '' as value_list,
				'{' + 
					'"file_id":"' + file_id + '",' +
					'"file_sys_id":"' + convert(varchar(6), file_sysgen_id) + '",' +
					'"file_name":"' + file_name + '",' +
					'"file_category":"' + file_category + '",' +
					'"file_type":"' + file_type + '",' +
					'"file_path":"' + file_path + '",' +
					'"file_desc":"' + isnull(file_description, '') + '",' +
					'"file_tag_list":"' + (
						select substring ((select ',' + tag_id 
						from document_tag_mapping
						where company_id = @i_client_id
							and country_code = @i_country_code
							and file_sysgen_id = document_store.file_sysgen_id					
						for xml path ('')), 2, 1000)
					) + '"' +
				'}' as o_value_xml
				from document_store
				where company_id = @i_client_id
					and country_code = @i_country_code
					and file_sysgen_id in (
						select file_sysgen_id
						from document_tag_mapping
						where company_id = @i_client_id
							and country_code = @i_country_code
							and tag_id in (
								select paramval from #input_params_multival
								where paramname = 'tag_filter'
							)
						group by file_sysgen_id
						having count(*) >= (select count(*) from #input_params_multival where paramname = 'tag_filter')
					)			

			end						 	
		end
		else
		begin

			select '' as value_list,
			'{' + 
				'"file_id":"' + file_id + '",' +
				'"file_sys_id":"' + convert(varchar(6), file_sysgen_id) + '",' +
				'"file_name":"' + file_name + '",' +
				'"file_category":"' + file_category + '",' +
				'"file_type":"' + file_type + '",' +
				'"file_path":"' + file_path + '",' +
				'"file_desc":"' + isnull(file_description, '') + '",' +
				'"file_tag_list":"' + (
					select substring ((select ',' + tag_id 
					from document_tag_mapping
					where company_id = @i_client_id
						and country_code = @i_country_code
						and file_sysgen_id = document_store.file_sysgen_id					
					for xml path ('')), 2, 1000)
				) + '"' +
			'}' as o_value_xml
			from document_store
			where company_id = @i_client_id
				and country_code = @i_country_code

		end		
	end
	
	if (@i_lov_code_type = 'DOCCATG_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'DOCCATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'DOCCATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'DOCCATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'DOCCATG'

		return
	end
	
	if (@i_lov_code_type = 'DOCTYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"parent_code":"' + a.category_code_value + '",' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'DOCTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'DOCTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'DOCTYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'DC'
			
		return
	end
	
	/* Quality Report - Call Status Filter*/
	
	if (@i_lov_code_type = 'QUALITY_RPT_CALLSTATUS_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.status_code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLSTATUS'
						and f.code = a.status_code)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'CALLSTATUS'
				   and e.code = a.status_code)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'CALLSTATUS'
				   and g.code = a.status_code)
				end + '"' +
			'}' as o_value_xml
		from workflow_status_master a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.transaction_type_code = 'CALL'
			and a.request_category = 'SE'
		return
	end
	
	/* Call status filter */
	
	/*Check Invoice - through Call or PWC*/
	
	if (@i_lov_code_type = 'CLAIM_CATEGORY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'CLAIMCATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CLAIMCATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CLAIMCATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CLAIMCATG'
		return
	end
	
	if (@i_lov_code_type = 'CUSTOMER_SEARCH_FORFLEET')
        begin
           select distinct '' as value_list,
            '{' +
			 '"description":"' + c.customer_name +','+c.address_line_1+ isnull(c.address_line_2,'')+ isnull(c.address_line_3,'')+','+
			               
						   isnull((select cm.city_name  from city_master cm
						          where a.country_code = cm.country_code
								  and c.city = cm.city_code
						    ),'')+
						   
						   ','+ isnull((select cm.state  from state cm
						          where a.country_code = cm.country_code
								  and c.state_code = cm.state_code
						    ),'')+'-'+ isnull(c.pincode,'')+'",'+
			 '"code":"' + a.customer_id + '"' +
			  '}' as o_value_xml
				 from asset_master_competitor a, customer c
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = c.company_id
				and a.country_code = c.country_code
				and a.customer_id = c.customer_id
				and c.customer_name like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
				 
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if (@i_lov_code_type = 'CUSTOMER_SEARCH')
        begin
           select '' as value_list,
            '{' +
             '"code":"' + a.customer_id + '",' +
			 '"description":"' + a.customer_name +'",'+
			'"customer_address":"' +a.address_line_1 + isnull(a.address_line_2,'') +'",'+
			'"contact_person":"' +a.contact_person_1 +'",'+
			'"customer_city":"' +a.city +'",'+
			'"contact_person_mobile_no":"' +a.contact_person_1_mobile_no +'",'+
			'"contact_person_1_email_id":"' +a.contact_person_2_email_id +'"'+
			  '}' as o_value_xml
				 from customer a
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.customer_id like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
				 
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if (@i_lov_code_type = 'CUSTOMER_SEARCH_BYNAME')
        begin
          select '' as value_list,
            '{' +
             '"code":"' + a.customer_id + '",' +
			 '"description":"' + a.customer_name  +'",'+
			'"customer_address":"' +isnull(a.address_line_1,'') + ',' +isnull(a.address_line_2,'') +'",'+
			'"contact_person":"' +isnull(a.contact_person_1,'') +'",'+
			'"customer_city":"' +isnull(a.city,'') +'",'+
			'"customer_pincode":"' +isnull(a.pincode,'') +'",'+
			'"contact_person_mobile_no":"' +isnull(a.contact_person_1_mobile_no,'') +'",'+
			'"customer_fulladdress":"' +isnull(a.address_line_1,'') + ',' + isnull(a.city,'')+ '-' + isnull(a.state_code,'') +'",'+
			'"contact_person_1_email_id":"' +isnull(a.contact_person_2_email_id,'') +'"'+
			  '}' as o_value_xml
				 from customer a
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.customer_name like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%' 
				and a.customer_id in ( 
						select b1.customer_id from asset_master b1
						where b1.company_id = @i_client_id
						  and b1.country_code = @i_country_code
						  and cast(b1.servicing_org_level_no as varchar(2))+b1.servicing_org_level_code = 
							( select cast(b2.organogram_level_no as varchar(2))+b2.organogram_level_code
							  from dealer_organogram_mapping b2
							  where b2.company_id = @i_client_id
								and b2.country_code = @i_country_code
								and b2.dealer_id = (select organogram_level_code from employee where employee_id
														  in (select employee_id from users where user_id = @i_user_id)
												    )
							)
				)
				

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	if (@i_lov_code_type = 'MODEL_SEARCH')
        begin
           select '' as value_list,
            '{' +
             '"code":"' + a.equipment_id + '",' +
			 '"description":"' + a.description +'"'+
			  '}' as o_value_xml
				 from equipment a
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.equipment_id like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%' 
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if (@i_lov_code_type = 'ENQUIRY_SEARCH')
        begin
           select '' as value_list,
            '{' +
             '"code":"' + a.call_ref_no + '",' +
			 '"description":"' + isnull(a.customer_name,'') +'"'+
			  '}' as o_value_xml
				 from call_register a
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.call_category = 'SA'
				and a.call_status not in ('CN','CL','OW','OL','AR','DC','PG','CI','FI','CA','DR','MR','BD')
				and a.created_by_employee_id 
								in (select employee_id from users u 
								where u.company_id = @i_client_id
								and u.country_code = @i_country_code
								and u.user_id  = @i_user_id)
				and (
					a.customer_name like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
					or
					a.call_ref_no like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
					)
				
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	if (@i_lov_code_type = 'CONTACT_SEARCH_BYCUST')
        begin
           select '' as value_list,
            '{' +
             '"code":"' + a.first_name + '",' +
			 '"description":"' + a.customer_id +'"'+
			  '}' as o_value_xml
				 from customer_location_contacts a
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and (
					a.customer_id like '%' + @i_search_field_1 + '%'
					or a.first_name like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
					)
				
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	if (@i_lov_code_type = 'CONTACT_SEARCH_BYCUSTMAS')
        begin
           select '' as value_list,
            '{' +
             '"code":"' + a.first_name + '",' +
			 '"description":"' + a.customer_id +'"'+
			  '}' as o_value_xml
				 from customer_location_contacts a
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and (
					a.customer_id like '%' + @i_search_field_1 + '%'
					or a.first_name like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
					)
				
		set @o_retrieve_status = 'SUCCESS'
		return
	end 
	if (@i_lov_code_type = 'PHONE_SEARCH_BYCUST')
        begin
           select '' as value_list,
            '{' +
             '"code":"' + a.contact_phone_no + '",' +
			 '"description":"' + a.first_name +'"'+
			  '}' as o_value_xml
				 from customer_location_contacts a
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and (
					a.customer_id like '%' + @i_search_field_1 + '%'
					or a.contact_phone_no like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
					)
				
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	if ( @i_lov_code_type = 'ITEMCODE_SEARCH_SPARE' )
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + item_code + '",' +
				'"description":"' + item_description + '"' +
			'}' as o_value_xml
			
		from item_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and item_variant_code='SPARE'
			and (
					item_code like '%' + @i_search_field_1 + '%' 
				or item_description  like '%' + @i_search_field_1 + '%'
				)

        set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'ITEMCODE_SEARCH' )
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + item_code + '",' +
				'"description":"' + item_description + '"' +
			'}' as o_value_xml
			
		from item_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and (
					item_code like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
					or item_description like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
				)

        set @o_retrieve_status = 'SUCCESS'
		return
	end	
	if ( @i_lov_code_type = 'SELLER_STATE_LIST' )
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.state_code + '",' +
				'"description":"' + a.state + '"' +
			'}' as o_value_xml
		from state a
		where a.country_code = @i_country_code
		and (
			a.state like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
			or a.state_code like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
		)

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if (@i_lov_code_type = 'CALL_REGISTER_ACTIONS')
	begin
			if (@i_search_field_2 = 'SA')
			begin
					select '' as value_list,
					'{' + 
					'"equipment_category":"'+ isnull(a.product_group_code,'') +'",'+
					'"equipment_type":"'+ isnull(a.product_sub_group_code,'') +'",'+
					'"equipment_id":"'+ isnull(a.product_category,'') +'",'+
					'"item_code":"'+ isnull(a.product_code,'') +'",'+
					'"item_variant_code":"'+ isnull(a.product_sub_code,'') +'",'+
					'"uom_code":"'+ isnull(a.uom_code,'') +'",'+
					'"net_quantity":"'+ cast(ISNULL(a.no_of_units,0) as varchar(13)) +'",'+
					'"std_rate":"'+ cast(ISNULL(c.std_rate,0) as varchar(13)) +'",'+
					'"gross_amount":"'+ isnull(cast((round(a.no_of_units * c.std_rate, 0)) as varchar(19)),0) +'",'+
					'"currency_code":"'+ isnull(c.currency_code,'') +'",'+
					'"action_seq_no":"'+ cast(ISNULL(a.action_seqno,0) as varchar(2)) +'",'+
					'"action_category":"'+ isnull(a.action_category,'') +'",'+
					'"action_type":"'+ isnull(a.action_type,'') +'",' + 	
					'"requirement":"'+ isnull(a.requirement,'') +'",' + 
					'"item_code_description":"'+ isnull(b.item_description,'') +'",' + 
					'"item_variant_code_description":"'+ isnull(b.variant_description,'') +'",' +
					(select '"currency_code_description":"'+ISNULL(cd.description,'')
								from currency_code cd
								where cd.currency_code = c.currency_code
							)
						+'",'+
					'"equipment_category_description":"'+ dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'EQUIPCATG',a.product_group_code) +'",' +
					'"equipment_type_description":"'+ dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'EQUIPTYPE',a.product_sub_group_code) +'",' +
					'"uom_code_description":"'+ dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ITEMUOM',a.uom_code) +'",' +
					'"udf_char_2":"'+ isnull(a.udf_char_2,'') +'",'+
					'"requirement_entry_comments_block_1":"'+ isnull(a.comments_block_1,'') +'",'+
					'"last_update_timestamp":"'+ cast(convert(uniqueidentifier,cast(a.last_update_timestamp as binary)) as varchar(36))+'"'+
					'}' as o_value_xml
						from call_register_actions a,item_master b,item_rate c
							where a.company_id				= @i_client_id
							and   a.country_code			= @i_country_code
							and   a.call_ref_no				= @i_search_field_1 
							and   a.action_category			in ('PARTREC','PARTREQ')
							and   a.company_id				= b.company_id
							and   a.country_code			= b.country_code
							and   a.product_code			= b.item_code
							and   a.product_sub_code		= b.item_variant_code
							and   b.company_id				= c.company_id
							and   b.country_code			= c.country_code
							and   b.item_code				= c.item_code
							and   b.item_variant_code		= c.item_variant_code
							and   c.company_id				= a.company_id
							and   c.country_code			= a.country_code
							and   c.item_code				= a.product_code
							and   c.item_variant_code		= a.product_sub_code
							and   c.uom_code				= a.uom_code
				
			end
			else if (@i_search_field_2 = 'FOLLOWUP')
			begin
					select '' as value_list,
					'{' + 
					'"visit_type":"'+ isnull(a.action_category,'') +'",'+
					'"visit_no":"'+ isnull(a.product_code,'') +'",'+
					'"visit_date":"'+ isnull((select CONVERT(varchar(10),cr.created_on_date,120) 
										from call_register cr
											where cr.company_id	= @i_client_id
												and cr.country_code = @i_country_code
												and cr.call_ref_no = a.product_code),'') +'"'+
					'}' as o_value_xml
						from call_register_actions a
						where a.company_id				= @i_client_id
					      and   a.country_code			= @i_country_code
					      and   a.call_ref_no	   = @i_search_field_1 
						  and a.action_category in ('POCVISIT','DEMOVISIT','FINVISIT','QFOLWUP','LEADVISIT')

					union all

					select top(1) '' as value_list,
					'{' + 
					'"visit_type":"'+ isnull(a.action_type,'') +'",'+
					'"visit_no":"'+ isnull(a.call_ref_no,'') +'",'+
					'"visit_date":"'+ isnull((select CONVERT(varchar(10),cr.created_on_date,120) 
										from call_register cr
											where cr.company_id	= @i_client_id
												and cr.country_code = @i_country_code
												and cr.call_ref_no = a.call_ref_no),'') +'"'+
					'}' as o_value_xml
						from call_register_actions a
						where a.company_id				= @i_client_id
					      and   a.country_code			= @i_country_code
					      and   a.sys_gen_call_ref_no	= @i_search_field_1 
						 and   a.action_category in ('PARTREC')
					  and   a.action_type in ('SALESVISIT')
		
			end
			else
			begin
				select '' as value_list,
				'{' + 
				'"item_code":"'+ isnull(a.product_code,'') +'",'+
				'"item_variant_code":"'+ isnull(a.product_sub_code,'') +'",'+
				'"uom_code":"'+ isnull(a.uom_code,'') +'",'+
				'"net_quantity":"'+ cast(ISNULL(a.no_of_units,0) as varchar(13)) +'",'+
				'"std_rate":"'+ cast(ISNULL(c.std_rate,0) as varchar(13)) +'",'+
				'"gross_amount":"'+ isnull(cast((round(a.no_of_units * c.std_rate, 0)) as varchar(19)),0) +'",'+
				'"currency_code":"'+ isnull(c.currency_code,'') +'",'+
				'"action_seq_no":"'+ cast(ISNULL(a.action_seqno,0) as varchar(2)) +'",'+
				'"action_category":"'+ isnull(a.action_category,'') +'",'+
				'"action_type":"'+ isnull(a.action_type,'') +'",' + 	
				'"requirement":"'+ isnull(a.requirement,'') +'",' + 	
				'"item_code_description":"'+ isnull(b.item_description,'') +'",' + 
				'"item_variant_code_description":"'+ isnull(b.variant_description,'') +'",' + 	
				'"uom_code_description":"'+ dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ITEMUOM',a.uom_code) +'",' +
				(select '"currency_code_description":"'+ISNULL(cd.description,'')
							from currency_code cd
							where cd.currency_code = c.currency_code
						)
					+'",'+
				'"last_update_timestamp":"'+ cast(convert(uniqueidentifier,cast(a.last_update_timestamp as binary)) as varchar(36))+'"'+
				'}' as o_value_xml
					from call_register_actions a,item_master b,item_rate c
					where a.company_id				= @i_client_id
					and   a.country_code			= @i_country_code
					and   a.call_ref_no			= @i_search_field_1 
					and   a.company_id				= b.company_id
					and   a.country_code			= b.country_code
					and   a.product_code			= b.item_code
					--and   a.product_sub_code		= b.item_variant_code
					and   b.company_id				= c.company_id
					and   b.country_code			= c.country_code
					and   b.item_code				= c.item_code
				--	and   b.item_variant_code		= c.item_variant_code
					and   c.company_id				= a.company_id
					and   c.country_code			= a.country_code
					and   c.item_code				= a.product_code
				--	and   c.item_variant_code		= a.product_sub_code
				--	and   c.uom_code				= a.uom_code
		
		/*	union all
				select '' as value_list,
				'{' + 
				'"item_code":"'+ isnull(a.product_code,'') +'",'+
				'"item_variant_code":"'+ 'NA' +'",'+
				'"uom_code":"'+ isnull(a.uom_code,'') +'",'+
				'"net_quantity":"'+ cast(ISNULL(a.no_of_units,0) as varchar(13)) +'",'+
				'"std_rate":"'+ cast(ISNULL(b.std_rate,0) as varchar(13)) +'",'+
				'"gross_amount":"'+ isnull(cast((round(a.no_of_units * b.std_rate, 0)) as varchar(19)),0) +'",'+
				'"currency_code":"'+ isnull(b.currency_code,'') +'",'+
				'"action_seq_no":"'+ cast(ISNULL(a.action_seqno,0) as varchar(2)) +'",'+
				'"action_category":"'+ isnull(a.action_category,'') +'",'+
				'"action_type":"'+ isnull(a.action_type,'') +'",' + 	
				'"requirement":"'+ isnull(a.requirement,'') +'",' + 	
			--	'"item_code_description":"'+ isnull(b.product_description,'') +'",' + 
				'"item_variant_code_description":"'+ 'Not Applicable' +'",' + 	
				'"uom_code_description":"'+ dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'PRODUCTUOM',a.uom_code) +'",' +
				(select '"currency_code_description":"'+ISNULL(cd.description,'')
							from currency_code cd
							where cd.currency_code = b.currency_code
						)
					+'",'+
				'"last_update_timestamp":"'+ cast(convert(uniqueidentifier,cast(a.last_update_timestamp as binary)) as varchar(36))+'"'+
				'}' as o_value_xml
					from call_register_actions a,item_rate b
					where a.company_id				= @i_client_id
					and   a.country_code			= @i_country_code
					and   a.call_ref_no			= @i_search_field_1 
					and   a.company_id				= b.company_id
					and   a.country_code			= b.country_code
					and   a.product_code			= b.item_code
					and   a.uom_code				= b.uom_code*/
		end

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	if ( @i_lov_code_type = 'SELLER_DISTRICT_LIST' )
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.district_code + '",' +
				'"description":"' + a.district_name + '",' +
				'"state_code":"' + a.state_code + '"' +
			'}' as o_value_xml
		from district_master a
		where a.country_code = @i_country_code
		and (
			a.district_name like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
			or a. district_code like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
		)

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	/*Invoice - Expense Category*/
	if (@i_lov_code_type = 'WAREHOUSE_LIST') 
	begin
	
		declare @p_dealer_warehouse_org_lvl_no tinyint, 
				@p_dealer_warehouse_org_lvl_code nvarchar(20)

		if exists (select 1 from dealer_organogram_mapping a, employee b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = b.company_id
				and a.country_code  = b.country_code
				and	a.organogram_level_no = b.organogram_level_no
				and a.organogram_level_code = b.organogram_level_code
				and b.employee_id = (select employee_id from users
										where a.company_id = @i_client_id
										and a.country_code = @i_country_code
										and user_id =  @i_user_id))
		begin

			select  @p_dealer_warehouse_org_lvl_no   = a.organogram_level_no,
					@p_dealer_warehouse_org_lvl_code = a.organogram_level_code
			from employee a
			where  a.company_id = @i_client_id
				and a.country_code = @i_country_code 
				and a.employee_id = (select employee_id from users b
										where b.company_id = @i_client_id
										and b.country_code = @i_country_code
										and b.user_id =  @i_user_id)

			select '' as value_list,
						'{' +
							'"code":"' + a.warehouse_id + '",' +
							'"description":"' + a.warehouse_name + '",' +
							'"state":"' + a.state_code + '"' +
						'}' as o_value_xml
					from warehouse a,dealer_location_warehouse_mapping b
					where a.company_id		=  @i_client_id
						and a.country_code	=  @i_country_code
						and a.company_id	=  b.company_id
						and a.country_code	=  b.country_code
						and a.warehouse_id	=  b.warehouse_id 
						and b.dealer_id		=  @p_dealer_warehouse_org_lvl_code

		end
		else
		begin
			select '' as value_list,
				'{' +
					'"code":"' + warehouse_id + '",' +
					'"description":"' + warehouse_name + '",' +
					'"state":"' + state_code + '"' +
				'}' as o_value_xml
			from warehouse
			where company_id = @i_client_id
			and country_code = @i_country_code
			and (warehouse_id like '%' + @i_search_field_1 + '%' 
					or warehouse_name like '%' + @i_search_field_1 + '%')
		end
		set @o_retrieve_status = 'SUCCESS'
		return	

	end
	else if ( @i_lov_code_type = 'ITEMCODE_LIST' )
	begin
		if ( @i_search_field_3 = 'EQUIPMENT_ITEM_LINK' )
		begin

			/* select distinct '' as value_list,
				'{' +
					'"code":"' + a.equipment_id + '",' +
					'"description":"' + a.description + '"' +
				'}' as o_value_xml
			
			from equipment a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.equipment_id = @i_search_field_4 */

			select distinct '' as value_list,
				'{' +
					'"code":"' + item_code + '",' +
					'"description":"' + item_description + '"' +
				'}' as o_value_xml
			
			from item_master
			where company_id = @i_client_id
				and country_code = @i_country_code
				and item_code in (select item_code 
									from equipment_item_link 
									where company_id = @i_client_id
										and country_code = @i_country_code
										and link_type = 'EQPARTNO'
										and equipment_id = @i_search_field_4
										)
				and item_variant_code = 'SPARE'
				and (item_code like '%' + @i_search_field_1 + '%' 
					or item_description like '%' + @i_search_field_1 + '%')

		end
		else if (( @i_search_field_2 = 'PE' ) or ( @i_search_field_2 = 'PQ' ) or ( @i_search_field_2 = 'PO' ) or ( @i_search_field_2 = 'PI' ))
		begin
			select distinct '' as value_list,
				'{' +
					'"code":"' + item_code + '",' +
					'"description":"' + item_description + '"' +
				'}' as o_value_xml
			
			from item_master
			where company_id = @i_client_id
				and country_code = @i_country_code
				and item_variant_code = 'NA'
				and (item_code like '%' + @i_search_field_1 + '%' 
					or item_description like '%' + @i_search_field_1 + '%')
		end
		else if (( @i_search_field_2 = 'SA' ) or ( @i_search_field_2 = 'EQ' ) or ( @i_search_field_2 = 'EO' ) or ( @i_search_field_2 = 'EI' ))
		begin
			select distinct '' as value_list,
				'{' +
					'"code":"' + item_code + '",' +
					'"description":"' + item_description + '"' +
				'}' as o_value_xml
			
			from item_master
			where company_id = @i_client_id
				and country_code = @i_country_code
				and item_code in (select item_code 
									from equipment_item_link 
									where company_id = @i_client_id
										and country_code = @i_country_code
										and link_type = 'EQPARTNO')
				and item_variant_code = 'EQUIPMENT'
				and (item_code like '%' + @i_search_field_1 + '%' 
					or item_description like '%' + @i_search_field_1 + '%')
		end
		else
		begin
			select distinct '' as value_list,
				'{' +
					'"code":"' + item_code + '",' +
					'"description":"' + item_description + '"' +
				'}' as o_value_xml
			
			from item_master
			where company_id = @i_client_id
				and country_code = @i_country_code
				and (item_code like '%' + @i_search_field_1 + '%' 
					or item_description like '%' + @i_search_field_1 + '%')
		end
		set @o_retrieve_status = 'SUCCESS'
		return
	end	

	else if ( @i_lov_code_type = 'EQUIPMENT_ITEM_LINK_LIST' )
	begin
		
		select distinct '' as value_list,
				'{' +
					'"code":"' + a.equipment_id + '",' +
					'"description":"' + a.description + '"' +
				'}' as o_value_xml
			
			from equipment a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and (a.equipment_id like '%' + @i_search_field_1 + '%' 
					or a.description like '%' + @i_search_field_1 + '%')
				and a.equipment_category = @i_search_field_2
				and a.equipment_type = @i_search_field_3

		set @o_retrieve_status = 'SUCCESS'
		return
	end	
	else if ( @i_lov_code_type = 'EQUIPMENT_LIST_CATEGORY_TYPE_BRAND' )
	begin
		
		select distinct '' as value_list,
				'{' +
					'"code":"' + a.equipment_id + '",' +
					'"description":"' + a.description + '"' +
				'}' as o_value_xml
			
			from equipment a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and (a.equipment_id like '%' + @i_search_field_1 + '%' 
					or a.description like '%' + @i_search_field_1 + '%')
				and a.equipment_category like '%'+  @i_search_field_2+'%'
				and a.equipment_type  like '%'+ @i_search_field_3 +'%'
				and a.equipment_oem  like '%'+ @i_search_field_4 +'%'

		set @o_retrieve_status = 'SUCCESS'
		return
	end	

	else if ( @i_lov_code_type = 'ITEMVARIANTCODE_LIST_LINKED' )
	begin

		select '' as value_list,
				'{' +
					'"code":"' + item_variant_code + '",' +
					'"description":"' + variant_description + '",' +
					'"expiry_date_appl_ind":"' + convert(varchar(1), expiry_date_appl_ind) + '",' +
					'"lot_batch_no_appl_ind":"' + convert(varchar(1), lot_batch_no_appl_ind) + '"' +
				'}' as o_value_xml
			from item_master
			where company_id = @i_client_id
				and country_code = @i_country_code
				and item_code = @i_search_field_1

        set @o_retrieve_status = 'SUCCESS'
		return
	end	

	else if ( @i_lov_code_type = 'GET_ITEM_UOM') 
	begin

		if ( @i_search_field_2 = 'EQUIPMENT_ITEM_UOM' )
		begin

			select '' as value_list,
				'{' +
					'"code":"' + 'NOS' + '",' +
					'"description":"' + 'Numbers' + '"' +
				'}' as o_value_xml
			
		end
		else
		begin
			select '' as value_list,
				'{' + 
					'"code":"' + a.uom_code + '",' +
					'"description":"' + 
					case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'ITEMUOM'
								and f.code = a.uom_code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = 'ITEMUOM'
							and e.code = a.uom_code)
					else
						(select g.short_description from code_table_mlingual_translation g
							where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'ITEMUOM'
							and g.code = a.uom_code)
					end + '"' +
				'}' as o_value_xml
			from item_rate a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.item_code = @i_search_field_1
				and a.item_variant_code = @i_search_field_2
		end

		 set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if ( @i_lov_code_type = 'GET_PRODUCT_RATE_ACTION' )
	begin

		if ( @i_search_field_4 = 'EQUIPMENT_ITEM_RATE' )
		begin

			select '' as value_list,
				'{' +
					'"std_rate":"' + '1.00' + '",' +
					'"currency_code":"' + 'INR' + '",' +
					'"action_category":"' + 'PARTREQ' + '",' +
					'"action_type":"' + 'PARTREQ' + '"' +
				'}' as o_value_xml
			
		end
		else
		begin

			if exists (select '*' from item_rate
			where company_id = @i_client_id
				and country_code = @i_country_code
				and item_code = @i_search_field_1 
				and item_variant_code = @i_search_field_2
				and uom_code = @i_search_field_3
			)
			begin
				select '' as value_list,
					'{' + 
						'"std_rate":"' + CONVERT(varchar(14), a.std_rate) + '",' +
						'"currency_code":"' + a.currency_code + '",' +
						'"action_category":"' + 'PARTREQ' + '",' +
						'"action_type":"' + 'PARTREQ' + '"' +
					'}'
				as o_value_xml
				from item_rate a
				where company_id = @i_client_id
					and country_code = @i_country_code
					and a.item_code = @i_search_field_1
					and a.item_variant_code = @i_search_field_2
					and a.uom_code = @i_search_field_3
			 end
			 else
			 begin
				select '' as value_list,
					'{' + 
						'"std_rate":"' + CONVERT(varchar(14), b.std_rate) + '",' +
						'"currency_code":"' + b.currency_code + '",' +
						'"action_category":"' + 'OFFER' + '",' +
						'"action_type":"' + 'OFFER' + '"' +
					'}'
				as o_value_xml
				from offer_master b
				where company_id = @i_client_id
					and country_code = @i_country_code
					and b.product_code = @i_search_field_1
					and @i_search_field_2 = 'NA'
					and b.uom_code = @i_search_field_3
			 end
		end

		set @o_retrieve_status = 'SUCCESS'
		return
	end	

	else if (@i_lov_code_type = 'COMPETITOR_NAME_LIST')
	begin
		 if(@i_search_field_1 = 'PE')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.code + '",' +
					'"description":"' + 
					case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'COMPETITORNAME'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = 'COMPETITORNAME'
							and e.code = a.code)
					else
						(select g.short_description from code_table_mlingual_translation g
							where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'COMPETITORNAME'
							and g.code = a.code)
					end + '"' +
				'}' as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'COMPETITORNAME'
				
			set @o_retrieve_status = 'SUCCESS'
			return 
		end
		else
		begin

			declare @p_equip_catg nvarchar(15), @p_equip_type nvarchar(15), @p_equip_id nvarchar(30)

			select top(1) @p_equip_catg = product_group_code, 
				@p_equip_type = product_sub_group_code, 
				@p_equip_id = product_category 
			from call_register_actions
			where company_id = @i_client_id
				and  country_code = @i_country_code
				and call_ref_no = @i_search_field_1

			select '' as value_list,
				'{' + 
					'"code":"' + field_value4 + '",' +
					'"description":"' + field_value4 + '"' +
				'}'
			as o_value_xml
			from product_customization_field_value_mapping
			where company_id = @i_client_id
				and country_code = @i_country_code
				and value_mapping_code = 'COMPETITORMAPPING'
				and field_value1 = @p_equip_catg
				and field_value2 = @p_equip_type
				and field_value3 = @p_equip_id

			set @o_retrieve_status = 'SUCCESS'
			return
		end
	end
	else if (@i_lov_code_type = 'EQSALES_APPLICATION_LIST')
	begin

		select '' as value_list,
			'{' + 
				'"code":"' + field_value1 + '",' +
				'"description":"' + field_value1 + '"' +
			'}'
		as o_value_xml
		from product_customization_field_value_mapping
		where company_id = @i_client_id
			and country_code = @i_country_code
			and value_mapping_code = 'EQSALESAPPLICATION'

		set @o_retrieve_status = 'SUCCESS'
		return

	end
	else if (@i_lov_code_type = 'EQSALES_ATTACHMENT_LIST')
	begin

		select '' as value_list,
			'{' + 
				'"code":"' + field_value2 + '",' +
				'"description":"' + field_value2 + '"' +
			'}'
		as o_value_xml
		from product_customization_field_value_mapping
		where company_id = @i_client_id
			and country_code = @i_country_code
			and value_mapping_code = 'EQSALESATTACHMENT'

		set @o_retrieve_status = 'SUCCESS'
		return

	end
	if (@i_lov_code_type = 'CAMPAIGN_CODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.campaign_code + '",' +
				'"description":"' + a.campaign_name + '"' +
					
			'}' as o_value_xml
		from campaign_register a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and( a.campaign_code  like '%'+@i_search_field_1+'%'
			  or a.campaign_name like '%'+@i_search_field_1+'%')
		return
	end
	else if (@i_lov_code_type = 'TERRITORY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + source_field_value + '",' +
				'"description":"' + source_field_value + '"' +
			'}' as o_value_xml
		from product_customization_udf_value_mapping
		where company_id = @i_client_id 
			and country_code = @i_country_code
			and source_field_name = 'TERRITORY'
		set @o_retrieve_status = 'SUCCESS'	
		return
	end
	else if ( @i_lov_code_type = 'SYSCALC_TAXATION_LIST' )
	begin
		select '' as value_list,
			'{'+
				'"sales_category":"' + a.sales_category + '",' +
				'"sales_type":"' + a.sales_type + '",' +
				'"charge_ind":"' + a.charge_ind + '",' +
				'"lineitem_overall_level_ind":"' + a.lineitem_overall_level_ind + '",' +
				--'"formula_for_applicable_on_amount":"' + a.formula_for_applicable_on_amount + '",' +
				'"charge_category":"' + b.charge_category + '",' +
				'"charge_code":"' + b.charge_code + '",' +
				'"charge_subcode":"' + b.charge_subcode + '",' +
				'"charge_description":"' + b.charge_description + '",' +
				'"applicable_percentage":"' + convert(varchar(8),isnull((b.applicable_percentage),0)) + '",' +
				'"parent_code":"' + isnull(b.parent_code,'') + '",' +
				'"state_code":"' + c.state_code + '",' +
				'"applicable_to_locations_ind":"' + c.applicable_to_locations_ind + '"' +
			'}' as o_value_xml
		from sales_configuration_model a, sales_tax_code_master b, sales_configuration_model_applicability_matrix c
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.sales_category = @i_search_field_1
			and a.sales_type in ('ALL', @i_search_field_2)
			and a.charge_ind = 'T'
			and a.charge_category = 'STD'
			and a.charge_code != 'GST'
			and a.syscalc_ind = 1
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.charge_category = b.charge_category
			and a.charge_code = b.charge_code
			and a.company_id = c.company_id
			and a.country_code = c.country_code
			and a.sales_category = c.sales_category
			and a.sales_type = c.sales_type
			and a.charge_ind = c.charge_ind
			and a.charge_category = c.charge_category
			and a.charge_code = c.charge_code
			and c.district_code = 'ALL'
		end
		
		else if (@i_lov_code_type = 'DISTRICTCODE_LIST')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.district_code + '",' +
					'"description":"' + ISNULL(a.district_name, '') + '"' +
				'}' as o_value_xml
			from district_master a		
			where a.country_code = @i_search_field_1
				and a.state_code = @i_search_field_2
				and (district_name like '%' + @i_search_field_3 + '%' 
					or district_name like '%' + @i_search_field_3 + '%')

			set @o_retrieve_status = 'SUCCESS'
			return
		end
	/* Modified Address type */
	else if (@i_lov_code_type = 'ADDRESSTYPE_LIST')
	begin
		
			if (@i_search_field_1 = 'CUSTOMER')
			begin
					

					select '' as value_list,
					'{' +
						'"code":"' + 'SOLDTO' + '",' +
						'"description":"' +'Sold To' + '"' +
					'}' as o_value_xml
					from level1_code

			end
			else 
			begin
					select '' as value_list,
					'{' +
						'"code":"' + a.code + '",' +
						'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ADDRESSTYPE',a.code)
						+ '"' +
					'}' as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'ADDRESSTYPE'
			end

			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if (@i_lov_code_type = 'CALL_SUBTYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLSUBTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'CALLSUBTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'CALLSUBTYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'CS'
			and a.category_code_value = isnull(@i_search_field_2, a.category_code_value)
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if (@i_lov_code_type = 'DBCALL_SUBTYPE_LIST')
	begin
		if @i_search_field_1 = '%' set @i_search_field_1 = null

		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLSUBTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'CALLSUBTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'CALLSUBTYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'CS'
			and a.category_code_value = isnull(@i_search_field_1, a.category_code_value)
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if (@i_lov_code_type = 'BUSINESS_UNIT_LIST')
	begin

		select distinct '' as value_list,
			'{' + 
				'"code":"' + location_code + '",' +
				'"description":"' + location_code + '"' +
			'}'
		as o_value_xml
		from company_location
		where company_id = @i_client_id
			and country_code = @i_country_code
			and udf_char_1 ='BU'

		set @o_retrieve_status = 'SUCCESS'
		return

	end
	else if (@i_lov_code_type = 'COMPANYLOCATION_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + location_code + '",' +
				'"description":"' + location_name_short + '"' +
			'}' as o_value_xml
		from company_location
		where company_id = @i_client_id
			and country_code = @i_country_code
			and udf_char_1 !='BU'
			set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if (@i_lov_code_type = 'ASSET_REGION_LIST')
	begin

		select distinct '' as value_list,
			'{' + 
				'"code":"' + product_udf_char_1 + '",' +
				'"description":"' + product_udf_char_1 + '"' +
			'}'
		as o_value_xml
		from asset_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and product_udf_char_1 is not null and product_udf_char_1 !=''

		set @o_retrieve_status = 'SUCCESS'
		return

	end
	else if (@i_lov_code_type = 'DBCUSTOMER_LIST_LINKED')
	begin

		if @i_search_field_1 = '%' set @i_search_field_1 = null

		select distinct '' as value_list,
			'{' + 
				'"code":"' + a.customer_id + '",' +
				'"description":"' + a.customer_name +' ['+b.city+'-'+a.customer_id+']'+ '"' +
			'}'
		as o_value_xml
		from customer a, customer_location b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.customer_id = b.customer_id
			and b.city = isnull(@i_search_field_1, b.city)

		set @o_retrieve_status = 'SUCCESS'
		return

	end
	else if (@i_lov_code_type = 'DBEQUIPMENT_LIST_LINKED')
	begin

		if @i_search_field_1 = '%' set @i_search_field_1 = null

		select distinct '' as value_list,
			'{' + 
				'"code":"' + a.equipment_id + '",' +
				'"description":"' + a.description+ '"' +
			'}'
		as o_value_xml
		from equipment a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.equipment_type = isnull(@i_search_field_1, a.equipment_type)

		set @o_retrieve_status = 'SUCCESS'
		return

	end
	else if (@i_lov_code_type = 'DBCUSTOMER_REGION_LIST')
	begin

		select distinct '' as value_list,
			'{' + 
				'"code":"' + a.udf_char_7 + '",' +
				'"description":"' + case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CUSTOMERREGION'
						and f.code = a.udf_char_7)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'CUSTOMERREGION'
				   and e.code = a.udf_char_7)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'CUSTOMERREGION'
				   and g.code = a.udf_char_7)
				end + '"' +
			'}'
		as o_value_xml
		from customer a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code

		set @o_retrieve_status = 'SUCCESS'
		return

	end
	else if (@i_lov_code_type = 'DBCUSTOMER_COUNTRY_LIST_LINKED')
	begin
		if @i_search_field_1 = '%' set @i_search_field_1 = null

		select distinct '' as value_list,
			'{' + 
				'"code":"' + a.udf_char_8 + '",' +
				'"description":"' + case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CUSTOMERCOUNTRY'
						and f.code = a.udf_char_8)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'CUSTOMERCOUNTRY'
				   and e.code = a.udf_char_8)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'CUSTOMERCOUNTRY'
				   and g.code = a.udf_char_8)
				end + '"' +
			'}'
		as o_value_xml
		from customer a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and isnull(a.udf_char_7,'') = isnull(@i_search_field_1, isnull(a.udf_char_7,''))

		set @o_retrieve_status = 'SUCCESS'
		return

	end
		else if (@i_lov_code_type = 'WF_ACCESS_RESTRICT')
	begin

		select '' as value_list,
			'{'+
				'"code":"' + '[data-link-type = actions]' + '"' +
			'}' as o_value_xml

		set @o_retrieve_status = 'SUCCESS'
		return

	end
	else if (@i_lov_code_type = 'TADAACTIONCATG_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'TADAACTIONCATG',a.code)+ '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'TADAACTIONCATG'

		set @o_retrieve_status = 'SUCCESS'
		return
	end	

	else if (@i_lov_code_type = 'TADAACTIONTYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'TADAACTIONTYPE',a.code)+ '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'TADAACTIONTYPE'

		set @o_retrieve_status = 'SUCCESS'
		return
	end	

	else if (@i_lov_code_type = 'TADATRAVELMODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'TADATRAVELMODE',a.code)+ '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'TADATRAVELMODE'

		set @o_retrieve_status = 'SUCCESS'
		return
	end	

	else if (@i_lov_code_type = 'TADAUOM_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'TADAUOM',a.code)+ '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'TADAUOM'

		set @o_retrieve_status = 'SUCCESS'
		return
	end	
	
	else if (@i_lov_code_type = 'TADAGRADE')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = 'ALL'
								and f.code_type = 'TADAGRADE'
								and f.code = a.code)
					when 1 then
						(select e.long_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = 'ALL'
								and e.code_type = 'TADAGRADE'
								and e.code = a.code)
					else
					(select g.long_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'TADAGRADE'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'TADAGRADE'
		order by code desc

		set @o_retrieve_status = 'SUCCESS'
		return
	end	
	
	else if (@i_lov_code_type = 'TADACOSTCENTER')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = 'ALL'
								and f.code_type = 'TADACOSTCENTER'
								and f.code = a.code)
					when 1 then
						(select e.long_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = 'ALL'
								and e.code_type = 'TADACOSTCENTER'
								and e.code = a.code)
					else
					(select g.long_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'TADACOSTCENTER'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'TADACOSTCENTER'

		set @o_retrieve_status = 'SUCCESS'
		return
	end 
	else if ( @i_lov_code_type = 'ASSET_DETAIL' )
	begin
		 select '' as value_list,
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
			'}' as o_value_xml
         from asset_master a
        where a.company_id = @i_client_id
        and a.country_code = @i_country_code
        and a.asset_id like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
       set @o_retrieve_status = 'SUCCESS'
	   return
	end
	else if ( @i_lov_code_type = 'EQUIPMENT_DETAIL')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.equipment_id  + '",' +
				'"description":"' + a.description  + '"' +
			'}' as o_value_xml
		from equipment a, asset_master b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and b.company_id = @i_client_id
			and b.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and b.asset_id = @i_search_field_1	
			and a.equipment_id like  '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%' 
		union all
		select '' as value_list,
			'{' +
				'"code":"' + 'ZZZ'  + '",' +
				'"description":"' + 'ZZZ'  + '"' +
			'}' as o_value_xml
		set @o_retrieve_status = 'SUCCESS'
		return
	end
else if (@i_lov_code_type = 'GET_CAMPAIGN_DETAILS')
	begin

		declare @p_customer_id nvarchar(15),
			@p_customer_location_code nvarchar(10)

		select @p_customer_id = customer_id,
			@p_customer_location_code = customer_location_code
		from customer_user_mapping
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = @i_user_id

		select '' as value_list,
			'{' +
				'"code":"' + a.campaign_code + '",' +
				'"banner_img_src":"' + b.product_code + '"' +
			'}' as o_value_xml
		from campaign_register a, campaign_register_actions b, campaign_register_coverage c
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.company_id = c.company_id
			and a.country_code = c.country_code
			and a.campaign_code = b.request_ref_no
			and a.campaign_code = c.campaign_code
			and c.coverage_category = 'SALES'
			and c.coverage_type = 'CUSTLOC'
			and c.coverage_code in ('ALL', @p_customer_id)
			and c.coverage_sub_code in ('ALL', @p_customer_location_code)
			and SYSDATETIMEOFFSET() between a.plan_start_date and a.plan_finish_date
			and b.requirement = 'BANNER'
			and b.product_code is not null
			
		return	
	end
	else if (@i_lov_code_type = 'TADAREASON_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = 'ALL'
								and f.code_type = 'TADAREASON'
								and f.code = a.code)
					when 1 then
						(select e.long_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = 'ALL'
								and e.code_type = 'TADAREASON'
								and e.code = a.code)
					else
					(select g.long_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'TADAREASON'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'TADAREASON'

		set @o_retrieve_status = 'SUCCESS'
		return
	end	
    SET NOCOUNT OFF;
END