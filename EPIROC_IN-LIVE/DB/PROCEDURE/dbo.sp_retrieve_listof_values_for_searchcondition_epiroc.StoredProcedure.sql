DROP PROCEDURE IF EXISTS [dbo].[sp_retrieve_listof_values_for_searchcondition_epiroc]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*
 * Generic function to retrieve list of values for a search condition
 */
CREATE PROCEDURE [dbo].[sp_retrieve_listof_values_for_searchcondition_epiroc] 
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


	if ( @i_lov_code_type = 'VISITTEMPLATEID' ) /* Service Visit Status List */
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

	else if (@i_lov_code_type = 'CALL_REGISTER_ACTIONS')
	begin
			select '' as value_list,
				'{' + 
				'"item_code":"'+ isnull(a.product_code,'') +'",'+
				'"item_variant_code":"'+ isnull(a.product_sub_code,'') +'",'+
				'"uom_code":"'+ isnull(a.uom_code,'') +'",'+
				'"net_quantity":"'+ cast(ISNULL(a.no_of_units,0) as varchar(13)) +'",'+
				'"action_seq_no":"'+ cast(ISNULL(a.action_seqno,0) as varchar(2)) +'",'+
				'"action_category":"'+ isnull(a.action_category,'') +'",'+
				'"action_type":"'+ isnull(a.action_type,'') +'",' + 
				'"equipment":"'+ isnull(a.udf_char_2,'') +'",' +
				'"requirement":"'+ isnull(a.requirement,'') +'",' + 	
				'"uom_code_description":"'+ dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ITEMUOM',a.uom_code) +'",' +
				'"last_update_timestamp":"'+ cast(convert(uniqueidentifier,cast(a.last_update_timestamp as binary)) as varchar(36))+'"'+
				'}' as o_value_xml
					from call_register_actions a
					where a.company_id				= @i_client_id
					and   a.country_code			= @i_country_code
					and   a.call_ref_no			= @i_search_field_1
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code_type = 'CALLASSIGNTO_LIST_SPEC')
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
			and c.organogram_level_code like '%'+(select case(@i_search_field_1) when '' then '' else @i_search_field_1 end)+ '%'
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
	
	
	else if (@i_lov_code_type = 'SKILLSET_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'SKILLSET'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'SKILLSET'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'SKILLSET'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'SKILLSET'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'CALL_LOGGING_APPLICATION')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
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
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'APPLICATION'
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end


	/* parts Opportunity */

	else if ( @i_lov_code_type = 'WAREHOUSE_LIST' ) 
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

			select distinct '' as value_list,
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

	else if (@i_lov_code_type = 'CUSTOMER_LIST_SEARCH_WO_ZZZ')
	begin

		declare @p_cust_org_lvl_no tinyint, 
				@p_cust_org_lvl_code nvarchar(20),
				@p_employee_id nvarchar(12)

		select @p_employee_id = b.employee_id
			from users a, employee b 
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.user_id = @i_user_id
				and a.company_id = b.company_id
				and a.country_code = b.country_code
				and a.employee_id = b.employee_id

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
			select  @p_cust_org_lvl_no   = a.organogram_level_no,
					@p_cust_org_lvl_code = a.organogram_level_code
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
			set @p_cust_org_lvl_no = NULL
			set @p_cust_org_lvl_code = NULL
		end

		select '' as value_list,
		   '{' + 
			   '"id":"'+'ZZZ'+'",'+
			   '"name":"'+'ZZZ'+'"'+
		   '}' as o_value_xml
		union all
		select '' as value_list,
		   '{' + 
			   '"id":"'+ a.customer_id +'",'+
			   '"name":"'+ a.customer_name +'"'+
		   '}' as o_value_xml
		from customer a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			/*and a.customer_id in (
					select b.customer_id from asset_master b
					where b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.servicing_org_level_no = isnull(@p_cust_org_lvl_no, b.servicing_org_level_no)
						and b.servicing_org_level_code =  isnull(@p_cust_org_lvl_code, b.servicing_org_level_code)
					)*/
			and (a.customer_id like '%' + @i_search_field_1 + '%' 
				or a.customer_name like '%' + @i_search_field_1 + '%')
			and (created_by_employee_id = @p_employee_id
			   or
				(isnull( @p_cust_org_lvl_code , '') = ''
				 or 
				 (isnull( @p_cust_org_lvl_code , '') != ''
				  and 
				  customer_id in ( 
					select b1.customer_id from asset_master b1
					where b1.company_id = @i_client_id
					  and b1.country_code = @i_country_code
					  and cast(b1.servicing_org_level_no as varchar(2))+b1.servicing_org_level_code = 
						( select cast(b2.organogram_level_no as varchar(2))+b2.organogram_level_code
						  from dealer_organogram_mapping b2
						  where b2.company_id = @i_client_id
							and b2.country_code = @i_country_code
							and b2.dealer_id = isnull( @p_cust_org_lvl_code , '')
						)
					)
				  )			   
			   )
			 )
		
		
		set @o_retrieve_status = 'SUCCESS'
		return	
	end
	
	else if (@i_lov_code_type = 'CUSTOMER_LIST_SEARCH_FOR_PE_SA')
	begin

		select '' as value_list,
		   '{' + 
			   '"id":"'+'ZZZ'+'",'+
			   '"name":"'+'ZZZ'+'"'+
		   '}' as o_value_xml
		union all
		select '' as value_list,
		   '{' + 
			   '"id":"'+ a.customer_id +'",'+
			   '"name":"'+ a.customer_name +'"'+
		   '}' as o_value_xml
		from customer a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and (a.customer_id like '%' + @i_search_field_1 + '%' 
				or a.customer_name like '%' + @i_search_field_1 + '%')
			
		set @o_retrieve_status = 'SUCCESS'
		return	
	end
	

	

	else if (@i_lov_code_type = 'GET_HSNGST_TAX_DETAILS')
	begin
	
		if exists (select * from item_master a, product_customization_field_value_mapping b
						where a.company_id =  @i_client_id
							and a.country_code = @i_country_code
							and a.company_id = b.company_id
							and a.country_code = b.country_code
							and a.item_code = @i_search_field_1
							and a.item_variant_code = @i_search_field_2
							and b.field_name1 = 'CUSTOMER'
							and b.field_value1 = @i_search_field_3
							and b.field_name2 = 'HSNCODE'
							and a.product_udf_char_1 = b.field_value2)
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
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.company_id = b.company_id
					and a.country_code = b.country_code
					and a.company_id = c.company_id
					and a.country_code = c.country_code
					and a.item_code = @i_search_field_1
					and a.item_variant_code = @i_search_field_2
					and b.field_name1 = 'CUSTOMER'
					and b.field_value1 = @i_search_field_3
					and b.field_name2 = 'HSNCODE'
					and a.product_udf_char_1 = b.field_value2
					and b.field_value3 = c.charge_code
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
	
	
	else if (@i_lov_code_type = 'QUOTATIONACCESSORY_ITEM_LINK')
	begin
		select top(100) '' as value_list,
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
			'"net_quantity":"' + convert(nvarchar(5),0) + '",' +
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
				'"gross_amount":"' + convert(nvarchar(18),b.std_rate * 0) + '",' +
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
			/*and a.link_type = 'EQACCESSORYPARTNO'
			and equipment_id = (select c.equipment_id 
								from equipment_item_link c 
									where c.company_id = @i_client_id
										and c.country_code = @i_country_code 
										and c.link_type = 'EQPARTNO' 
										and c.item_code = @i_search_field_1
										and c.item_variant_code = @i_search_field_2) */
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
		select top(100) '' as value_list,
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
				'"net_quantity":"' + convert(nvarchar(5),0) + '",' +
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
				'"gross_amount":"' + convert(nvarchar(18),b.std_rate * 0) + '",' +
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
		/*	and a.link_type = 'EQACCESSORYPARTNO'
			and equipment_id = (select c.equipment_id 
								from equipment_item_link c 
									where c.company_id = @i_client_id
										and c.country_code = @i_country_code 
										and c.link_type = 'EQPARTNO' 
										and c.item_code = @i_search_field_1
										and c.item_variant_code = @i_search_field_2) */

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
		select top(100) '' as value_list,
			'{' +
				'"sl_no":"' + convert(nvarchar(6),row_number() over(order by case when isnull((select c.udf_char_1 
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
				'"net_quantity":"' + convert(nvarchar(5),0) + '",' +
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
				'"gross_amount":"' + convert(nvarchar(18),b.std_rate * 0) + '",' +
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
			and a.equipment_type = 'ALL'
		/*	and a.link_type = 'EQACCESSORYPARTNO'
			and equipment_id = (select c.equipment_id 
								from equipment_item_link c 
									where c.company_id = @i_client_id
										and c.country_code = @i_country_code 
										and c.link_type = 'EQPARTNO' 
										and c.item_code = @i_search_field_1
										and c.item_variant_code = @i_search_field_2) */

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
	else if (@i_lov_code_type = 'COMPETITOR_NAME_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.field_value1 + '",' +
				'"description":"' + a.field_value1 + '"' +
			'}' as o_value_xml
		from product_customization_field_value_mapping a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and value_mapping_code = 'EQSALECOMPETITOR'
		set @o_retrieve_status = 'SUCCESS'
		return	
	end
	else if (@i_lov_code_type = 'COPY_QUOTATION_LIST')
	begin

		declare @p_quotation_org_lvl_no tinyint, 
				@p_quotation_org_lvl_code nvarchar(20)

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

			select  @p_quotation_org_lvl_no   = a.organogram_level_no,
					@p_quotation_org_lvl_code = a.organogram_level_code
			from employee a
			where  a.company_id = @i_client_id
				and a.country_code = @i_country_code 
				and a.employee_id = (select employee_id from users b
										where b.company_id = @i_client_id
										and b.country_code = @i_country_code
										and b.user_id =  @i_user_id)

			select '' as value_list,
				'{' +
					'"code":"' + qh.quotation_no + '",' +
					'"description":"' + qh.quotation_no + '"' +
				'}' as o_value_xml
			from quotation_header qh	
			where qh.company_id = @i_client_id
				and qh.country_code = @i_country_code
				and (qh.quotation_no like '%' + @i_search_field_1 + '%')
				and qh.quotation_category = @i_search_field_2
				and qh.organogram_level_no = @p_quotation_org_lvl_no
				and qh.organogram_level_code = @p_quotation_org_lvl_code

		end
		else
		begin
			select '' as value_list,
				'{' +
					'"code":"' + qh.quotation_no + '",' +
					'"description":"' + qh.quotation_no + '"' +
				'}' as o_value_xml
			from quotation_header qh	
			where qh.company_id = @i_client_id
				and qh.country_code = @i_country_code
				and qh.quotation_category = @i_search_field_2
				and (qh.quotation_no like '%' + @i_search_field_1 + '%')
					
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
							and b.field_name1 = 'CUSTOMER'
							and b.field_value1 = @i_search_field_4
							and b.field_name2 = 'HSNCODE'
							and a.product_udf_char_1 = b.field_value2)
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
					where a.company_id = @i_client_id
						and a.country_code = @i_country_code
						and a.company_id = b.company_id
						and a.country_code = b.country_code
						and a.company_id = c.company_id
						and a.country_code = c.country_code
						and a.item_code = @i_search_field_1
						and a.item_variant_code = @i_search_field_2
						and b.field_name1 = 'CUSTOMER'
						and b.field_value1 = @i_search_field_4
						and b.field_name2 = 'HSNCODE'
						and a.product_udf_char_1 = b.field_value2
						and b.field_value3 = c.charge_code
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
				@p_org_level_code nvarchar(20),
				@p_emply_id nvarchar(12)
				
				
				
			select @p_emply_id = b.employee_id
				from users a, employee b 
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.user_id = @i_user_id
					and a.company_id = b.company_id
					and a.country_code = b.country_code
					and a.employee_id = b.employee_id

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
				/*and a.customer_id in (
					select b.customer_id from asset_master b
					where b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.servicing_org_level_no = isnull(@p_org_level_no, b.servicing_org_level_no)
						and b.servicing_org_level_code =  isnull(@p_org_level_code, b.servicing_org_level_code)
					)*/
					and (created_by_employee_id = @p_emply_id
					   or
						(isnull( @p_org_level_code , '') = ''
						 or 
						 (isnull( @p_org_level_code , '') != ''
						  and 
						  customer_id in ( 
							select b1.customer_id from asset_master b1
							where b1.company_id = @i_client_id
							  and b1.country_code = @i_country_code
							  and cast(b1.servicing_org_level_no as varchar(2))+b1.servicing_org_level_code = 
								( select cast(b2.organogram_level_no as varchar(2))+b2.organogram_level_code
								  from dealer_organogram_mapping b2
								  where b2.company_id = @i_client_id
									and b2.country_code = @i_country_code
									and b2.dealer_id = isnull( @p_org_level_code , '')
								)
							)
						  )			   
					   )
					 )	
					
				and (
					a.customer_id like '%' + @i_search_field_3 + '%'
					or a.customer_name like '%' + @i_search_field_3 + '%'
					)
		end

		set @o_retrieve_status = 'SUCCESS'
		return
	end



	else if (@i_lov_code_type = 'DEALER_LIST')
	begin

		declare @p_dealer_org_lvl_no tinyint, 
				@p_dealer_org_lvl_code nvarchar(20)

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

			select  @p_dealer_org_lvl_no   = a.organogram_level_no,
					@p_dealer_org_lvl_code = a.organogram_level_code
			from employee a
			where  a.company_id = @i_client_id
				and a.country_code = @i_country_code 
				and a.employee_id = (select employee_id from users b
										where b.company_id = @i_client_id
										and b.country_code = @i_country_code
										and b.user_id =  @i_user_id)

			select '' as value_list,
				'{' +
					'"code":"' + b.dealer_id + '",' +
					'"description":"' + b.dealer_name_short + '"' +
				'}' as o_value_xml
			from dealer_master b	
			where b.company_id = @i_client_id
				and b.country_code = @i_country_code
				and b.dealer_id = @p_dealer_org_lvl_code

		end
		else
		begin
			select '' as value_list,
				'{' +
					'"code":"' + b.dealer_id + '",' +
					'"description":"' + b.dealer_name_short + '"' +
				'}' as o_value_xml
			from dealer_master b	
			where b.company_id = @i_client_id
				and b.country_code = @i_country_code
				and (b.dealer_id like '%' + @i_search_field_1 + '%' 
					or b.dealer_name_short like '%' + @i_search_field_1 + '%')
		end
		set @o_retrieve_status = 'SUCCESS'
		return	
	end





	/* End */


	/*else if (@i_lov_code_type = 'ASST_SRCH_ON_CUST_AND_EQPT')
	begin
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
				and a.asset_status = 'A' 
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
			and a.servicing_org_level_no = isnull(@p_organogram_level_no, a.servicing_org_level_no)
			and a.servicing_org_level_code =  isnull(@p_organogram_level_code, a.servicing_org_level_code)
			and a.asset_status = 'A'
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	/*Geo Address*/

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
			return
		end
	end

	else if ( @i_lov_code_type = 'WAREHOUSE_LIST_STOCKENQ' ) 
	begin
		declare @p_dealer_warehouse_org_lvl_no_stenq tinyint, 
				@p_dealer_warehouse_org_lvl_code_stenq nvarchar(20)

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

			select  @p_dealer_warehouse_org_lvl_no_stenq   = a.organogram_level_no,
					@p_dealer_warehouse_org_lvl_code_stenq = a.organogram_level_code
			from employee a
			where  a.company_id = @i_client_id
				and a.country_code = @i_country_code 
				and a.employee_id = (select employee_id from users b
										where b.company_id = @i_client_id
										and b.country_code = @i_country_code
										and b.user_id =  @i_user_id)

			select distinct '' as value_list,
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
						and b.dealer_id		=  @p_dealer_warehouse_org_lvl_code_stenq

		end
		else
		begin
			select '' as value_list,
				'{' +
					'"code":"' + 'EPIROC-WH-%' + '",' +
					'"description":"' + 'All Epiroc Warehouse' + '",' +
					'"state":"' + '' + '"' +
				'}' as o_value_xml
			union all
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
	else if  @i_lov_code_type = 'CAMPAIGN_CODE_LIST'
	begin
	
		select distinct '' as value_list,
			'{' +
				'"code":"' + isnull(a.code,'') + '",' +
				'"description":"' + isnull(a.code,'')+'-'+
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'CAMPAIGNCODE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CAMPAIGNCODE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CAMPAIGNCODE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where  a.company_id = @i_client_id
		   and a.country_code = @i_country_code
		   and a.code_type = 'CAMPAIGNCODE'
		
		select @o_retrieve_status = 'SUCCESS'
				
		return
	end
	else if (@i_lov_code_type = 'COUNTRYDIALCODE_LIST')
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
	
	else if (@i_lov_code_type = 'CUSTCONTCATG_LIST')
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
	
	else if (@i_lov_code_type = 'CUSTCONTTYPE_LIST_LINKED')
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
	else if (@i_lov_code_type = 'CUSTOMER_EQUIPMENTOEM_LIST')
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
	else if (@i_lov_code_type = 'CUSTOMER_EQUIPMENTCATEGORY_LIST')
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

	else if (@i_lov_code_type = 'CUSTOMER_EQUIPMENTTYPE_LIST')
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

	else if (@i_lov_code_type = 'CUSTOMER_EQUIPMENT_LIST')
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

	else if (@i_lov_code_type = 'CUSTOMER_ASSET_LIST')
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
	

    SET NOCOUNT OFF;
END





GO
