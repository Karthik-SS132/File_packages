﻿DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_listof_values_for_searchcondition_acopco]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*
 * Generic function to retrieve list of values for a search condition
 */
CREATE PROCEDURE [dbo].[sp_retrieve_listof_values_for_searchcondition_acopco] 
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
	@i_search_field_6 [uddt_nvarchar_60], 
	@i_search_field_7 [uddt_nvarchar_60], 
	@i_search_field_8 [uddt_nvarchar_60],
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
			and dealer_status = 1
			
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
	
	else if (@i_lov_code_type = 'LINKED_WITH_PE_BY_ASSET')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.call_ref_no + '",' +
				'"description":"' + a.call_ref_no + '"' +
			'}' as o_value_xml
		from call_register a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.call_category ='PE' 
			and a.won_lost_indicator = 1
			and a.asset_id in (select asset_id from call_register 
									where call_ref_no in 
										(select txn_ref_no from expdoc_header where expdoc_ref_no = @i_search_field_1)
								)
			except
				select '' as value_list,
				'{' +
					'"code":"' + udf_analysis_code2 + '",' +
					'"description":"' + udf_analysis_code2 + '"' +
				'}' as o_value_xml
			from expdoc_header 


		return
	end
	
else if (@i_lov_code_type = 'CUSTOMER_SEARCH_FORFLEET')
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

	

	if (@I_lov_code_type = 'CALL_ASSIGNTO_EMPLOYEE_LIST') 
	begin
		declare @org nvarchar(25)
		select @org = e.organogram_level_code from employee e, users u where u.user_id = @i_user_id and e.employee_id = u.employee_id
		select '' as value_list,
			'{' + 
				'"emp_id":"' + e.employee_id + '",' +
				'"emp_name":"' + e.employee_id +' ' + e.first_name + ' ' + ' ' + e.last_name + '"' +
			'}'
		as o_value_xml
			from employee e
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and e.organogram_level_code = @org and e.employee_status='A' and 
				e.employee_id = (select employee_id 
								 from users 
								 where company_id = @i_client_id
								   and country_code = @i_country_code
								   and user_id=@i_user_id)
				ORDER BY o_value_xml asc

			set @o_retrieve_status = 'SUCCESS'
		return
	end
	if (@i_lov_code_type = 'CALL_REGISTER_ACTIONS')
	begin

		if (@i_search_field_2 = 'PARTREQ')
		begin

			select '' as value_list,
				'{' + 
				'"equipment_category":"'+ isnull(a.product_group_code,'') +'",'+
				'"equipment_type":"'+ isnull(a.product_sub_group_code,'') +'",'+
				'"equipment_id":"'+ isnull(a.product_category,'') +'",'+
				'"item_code":"'+ isnull(a.product_code,'') +'",'+
				'"item_variant_code":"'+ isnull(a.product_sub_code,'') +'",'+
				'"uom_code":"'+ isnull(a.uom_code,'') +'",'+
				'"net_quantity":"'+ cast(cast(isnull(a.no_of_units,0.00) as decimal(16,2)) as varchar(19)) +'",'+
				'"std_rate":"'+ cast(cast(isnull(c.std_rate,0.00) as decimal(16,2)) as varchar(19)) +'",'+
				'"gross_amount":"'+ isnull(cast(cast((round(a.no_of_units * c.std_rate, 0)) as decimal(18,2)) as varchar(21)),0) +'",'+
				'"currency_code":"'+ isnull(c.currency_code,'') +'",'+
				'"action_seq_no":"'+ cast(ISNULL(a.action_seqno,0) as varchar(2)) +'",'+
				'"action_category":"'+ isnull(a.action_category,'') +'",'+
				'"action_type":"'+ isnull(a.action_type,'') +'",' + 	
				'"requirement":"'+ isnull(a.requirement,'') +'",' + 
				'"additional_information":"'+ isnull(a.additional_information,'') +'",'+
				'"requirement_entry_comments_block_1":"'+ isnull(a.comments_block_1,'') +'",'+
				'"comments_block_2":"'+ isnull(a.comments_block_2,'') +'",'+
				'"comments_block_3":"'+ isnull(a.comments_block_3,'') +'",'+
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
				'"udf_char_1":"'+ isnull(a.udf_char_1,'') +'",'+
				'"last_update_timestamp":"'+ cast(convert(uniqueidentifier,cast(a.last_update_timestamp as binary)) as varchar(36))+'"'+
				'}' as o_value_xml
					from call_register_actions a,item_master b,item_rate c
						where a.company_id				= @i_client_id
						and   a.country_code			= @i_country_code
						and   a.call_ref_no				= @i_search_field_1 
						and   a.action_category			in ('PARTREQ')
						and   a.action_type				in ('SALESLEAD')
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
				'"visit_attachments":"' + isnull((select STUFF((select ', ' + CAST(b.attachment_file_name as nvarchar(60)) [text()]
						 from call_user_attachments b
						where b.company_id = @i_client_id
							and b.country_code  = @i_country_code
							and b.call_ref_no = a.product_code	
							and b.attachment_file_name not like '%prospect_visit%'
						 for xml path(''), type)
						.value('.','NVARCHAR(MAX)'),1,2,' ')),'') + 
				'",'  +	
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
						and a.action_category in ('POCVISIT','DEMOVISIT','FINVISIT','QFOLWUP','LEADFOLWUP')

				union all

				select top(1) '' as value_list,
				'{' + 
				'"visit_type":"'+ isnull(a.action_type,'') +'",'+
				'"visit_no":"'+ isnull(a.call_ref_no,'') +'",'+
				'"visit_attachments":"' + isnull((select STUFF((select ', ' + CAST(b.attachment_file_name as nvarchar(60)) [text()]
						 from call_user_attachments b
						where b.company_id = @i_client_id
							and b.country_code  = @i_country_code
							and b.call_ref_no = a.product_code
							and b.attachment_file_name not like '%prospect_visit%'
						 for xml path(''), type)
						.value('.','NVARCHAR(MAX)'),1,2,' ')),'') + 
				'",'  +	
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
						and   a.action_category in ('PARTREQ')
						and   a.action_type in ('SALESVISIT')
		
		end
		else if (@i_search_field_2 = 'FINANCIER')
		begin
	
			if (@i_search_field_3 = 'SA')
			begin

				select '' as value_list,
				'{' + 
				'"product_group_code":"'+ isnull(a.product_group_code,'') +'",'+
				'"product_sub_group_code":"'+ isnull(a.product_sub_group_code,'') +'",'+
				'"product_code":"'+ isnull(a.product_code,'') +'",'+
				'"action_category":"'+ isnull(a.action_category,'') +'",'+
				'"action_type":"'+ isnull(a.action_type,'') +'"' + 
				'}' as o_value_xml
					from call_register_actions a
					where a.company_id			= @i_client_id
					    and   a.country_code	= @i_country_code
					    and   a.call_ref_no		= @i_search_field_1 
						and   a.action_category in ('FINANCIER')
						and   a.action_type		in ('SALESLEAD')
		
			end
			else
			begin
				select top(1) '' as value_list,
				'{' + 
				'"visit_type":"'+ isnull(a.action_type,'') +'",'+
				'"visit_no":"'+ isnull(a.call_ref_no,'') +'",'+
				'"financier_1":"'+ isnull(a.udf_analysis_code1,'') +'",'+
				'"financier_2":"'+ isnull(a.udf_analysis_code2,'') +'",'+
				'"financier_3":"'+ isnull(a.udf_analysis_code3,'') +'",'+
				'"visit_date":"'+ isnull((select CONVERT(varchar(10),cr.created_on_date,120) 
									from call_register cr
										where cr.company_id	= @i_client_id
											and cr.country_code = @i_country_code
											and cr.call_ref_no = a.call_ref_no),'') +'"'+
				'}' as o_value_xml
					from call_register_actions a
					where a.company_id				= @i_client_id
					    and   a.country_code			= @i_country_code
					    and   a.call_ref_no	= @i_search_field_1 
						and   a.action_category in ('PARTREQ')
						and   a.action_type in ('SALESLEAD')
		
			end
			
		end
		else
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

				union all

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
					and   a.sys_gen_call_ref_no	= @i_search_field_1
		end
			
		set @o_retrieve_status = 'SUCCESS'
		return
		
	END		
			
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
	
	else if (@i_lov_code_type = 'INACTIVE_ASSET_REASONCODES') 
	begin
		
		select '' as value_list,
				'<code>' + a.code + '</code>' +
				'<description>' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'INACTRESCODE',a.code)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'INACTRESCODE'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'ACTIVE_ASSET_REASONCODES') 
	begin
		
		select '' as value_list,
				'<code>' + a.code + '</code>' +
				'<description>' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ACTRESCODE',a.code)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'ACTRESCODE'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if (@i_lov_code_type = 'CALL_STATUSCHANGE_REASONCODES') 
	begin
		if @i_search_field_1 != 'STATUSCHANGE'
		begin
			if @i_search_field_4 != ''
			begin

				if @i_search_field_4 = 'FCLOSURE'
				begin		
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,@i_search_field_1+'REASCDFF',a.code)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = @i_search_field_1+'REASCDFF'
					and @i_search_field_4 ='FCLOSURE'
				end
				else
				begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,@i_search_field_1+'REASCDFO',a.code)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = @i_search_field_1+'REASCDFO'
				end
			end
			else
			begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,@i_search_field_1+'REASCD',a.code)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = @i_search_field_1+'REASCD'
			end
		end
		else 
		begin
			select '' as value_list,
				'<code>' + a.code + '</code>' +
				'<description>' + 
					(case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'SCHNGREASCD_'+@i_search_field_2+@i_search_field_3
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = 'SCHNGREASCD_'+@i_search_field_2+@i_search_field_3
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'SCHNGREASCD_'+@i_search_field_2+@i_search_field_3
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'SCHNGREASCD_'+@i_search_field_2+@i_search_field_3		
		end
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
	
	else if (@i_lov_code_type = 'GET_HSNGST_TAX_DETAILS')
	begin
	
		select '' as value_list,
			'{' + 
				'"charge_code":"' + c.charge_code + '",' +
				'"charge_description":"' + c.charge_description + '",' +
				'"addl_charge_ind":"' + c.additional_charges_ind + '",' +
				'"addl_charge_desc":"' + c.additional_charges_desc + '",' +
				'"applicable_percentage":"' + convert(varchar(8),isnull((c.applicable_percentage),0))+ '"' +
			'}' as o_value_xml
		from item_master a, product_customization_udf_value_mapping b, quotationinvoice_charge_code_master c
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.company_id = c.company_id
			and a.country_code = c.country_code
			and a.product_udf_char_1 = b.source_field_value
			and b.destination_field_value = c.charge_category
			and a.item_code = @i_search_field_1
			and a.item_variant_code = @i_search_field_2
		
		set @o_retrieve_status = 'SUCCESS'
		return	
	end
	else if (@i_lov_code_type = 'EQPT_SRCH_ON_ASST_AND_CUST')
	begin
		if (@i_search_field_1 != 'ZZZ' and @i_search_field_1 != '%' and @i_search_field_5 != '' and @i_search_field_4 = 'PE' and @i_search_field_6 = 'PARTENQ')
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
		else if (@i_search_field_3 != 'ZZZ' and @i_search_field_3 != '%' and @i_search_field_5 != '' and @i_search_field_4 = 'PE' and @i_search_field_6 = 'PARTENQ')
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
		else if ( @i_search_field_5 != '' and @i_search_field_4 = 'PE' and @i_search_field_6 = 'PARTENQ')
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
				and (
					a.equipment_id like '%' + @i_search_field_2 + '%'
					or a.description like '%' + @i_search_field_2 + '%'
					)
		end
		else if (@i_search_field_1 != 'ZZZ' and @i_search_field_1 != '%')
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
				and (
					a.equipment_id like '%' + @i_search_field_2 + '%'
					or a.description like '%' + @i_search_field_2 + '%'
					)
		end

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
		else if ( @i_lov_code_type = 'CAPP_CALL_CATEGORY_LIST' )
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
	
	else if ( @i_lov_code_type = 'CAPP_CALL_TYPE_LIST_LINKED' )
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
			and a.type_code_value not in ('AMCLABOR', 'COMM', 'FCLOSURE', 'SERV', 'SRVCMPGN')
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if ( @i_lov_code_type = 'CAPP_CALL_PRIORITY_LIST' )
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

	else if ( @i_lov_code_type = 'CAPP_ASSET_ID_LIST' )
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

	else if ( @i_lov_code_type = 'CAPP_STATE_LIST' )
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

	else if ( @i_lov_code_type = 'CAPP_DISTRICT_LIST' )
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

	else if ( @i_lov_code_type = 'CAPP_CUST_CONTACT_DETAILS' )
	begin
		select '' as value_list,
			'{' +
				'"cont_name":"' + a.first_name + ' ' + isnull(a.middle_name, '') + ' ' + a.last_name + '",' +
				'"cont_no":"' + isnull(a.contact_mobile_no, '') + '",' +
				'"cont_email":"' + isnull(a.email_id, '') + '",' +
				'"cust_id":"' + (
					select top(1) customer_id 
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

	else if ( @i_lov_code_type = 'CAPP_MY_MACHINES' )
	begin
		select '' as value_list,
			'{' +
				'"machineName":"' + asset_id + '",' +
				'"birthday_ind":"' + (
					case when datepart(year, sysdatetime()) - datepart(year, a.installation_date) <=3 then (
						case when ((convert(varchar(2), (datepart(day, sysdatetime()))) + convert(varchar(2), (datepart(month, sysdatetime())))) = 
							(convert(varchar(2), (datepart(day, a.installation_date))) + convert(varchar(2), (datepart(month, a.installation_date))))) then 
								(
									case (
										select 1 from equipment
										where company_id = a.company_id
											and country_code = a.country_code
											and equipment_id = a.equipment_id
											and equipment_type like 'WATERWELL%'
									) 
									when 1 then 'WC_' + convert(varchar(1), datepart(year, sysdatetime()) - datepart(year, a.installation_date))
									else 'AC_' + convert(varchar(1), datepart(year, sysdatetime()) - datepart(year, a.installation_date))
									end
								)
							else ''
						end)
					else ''
					end
					) + '",'+
				'"machineModel":"' + equipment_id + '",' +
				'"state_code":"' + udf_analysis_code4 + '",' +
				'"state_desc":"' + (
					select state from state
					where country_code = a.udf_analysis_code3
						and state_code = a.udf_analysis_code4
				) + '",' +
				'"country_code":"' + udf_analysis_code3 + '",' +
				'"country_desc":"' + (
					select country_name from country
					where country_code = a.udf_analysis_code3
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
			and a.asset_id in (
				select asset_id 
				from customer_user_mapping_to_assets
				where company_id = @i_client_id
					and country_code = @i_country_code
					and employee_id = @i_user_id
			)
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if ( @i_lov_code_type = 'CAPP_MY_USERS' )
	begin
		select '' as value_list,
			'{' +
				'"operatorName":"' + a.first_name + ' ' + isnull(a.middle_name, '') + ' ' + a.last_name + '",' +
				'"role":"' + isnull((
					select role_description from functional_role
					where company_id = @i_client_id
						and country_code = @i_country_code
						and functional_role_id = a.udf_char_1),'') + '",' +
				'"operatorNo":"' + isnull(a.contact_mobile_no,'') + '"' +
			'}' as o_value_xml
		from employee a, customer_user_mapping b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.user_id = a.employee_id
			and b.user_id != @i_user_id
			and b.customer_id in (
				select customer_id 
				from customer_user_mapping
				where company_id = @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id
			)
			and (a.udf_char_1 != '' or a.udf_char_1 is not null)
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if ( @i_lov_code_type = 'CAPP_MY_USERS_FOR_MACHINES' )
	begin
		select '' as value_list,
			'{' +
				'"operatorName":"' + a.first_name + ' ' + isnull(a.middle_name, '') + ' ' + a.last_name + '",' +
				'"operatorNo":"' + isnull(a.contact_mobile_no,'') + '",' +
				'"role":"' + isnull((
					select role_description from functional_role
					where company_id = @i_client_id
						and country_code = @i_country_code
						and functional_role_id = a.udf_char_1),'') + '",' +
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
			and b.customer_id in (
				select customer_id 
				from customer_user_mapping
				where company_id = @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id
			)
			and (a.udf_char_1 != '' or a.udf_char_1 is not null)
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if ( @i_lov_code_type = 'CAPP_MY_MACHINES_FOR_USERS' )
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
			and a.customer_id in (
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

	else if ( @i_lov_code_type = 'CAPP_MY_LOCATIONS' )
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
			and a.customer_id in (
				select customer_id 
				from customer_user_mapping
				where company_id = @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id
			)
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if ( @i_lov_code_type = 'CAPP_LOCATION_LIST' )
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.location_code + '",' +
				'"description":"' + a.location_name_short + '"' +
			'}' as o_value_xml
		from customer_location a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.customer_id in (
				select customer_id 
				from customer_user_mapping
				where company_id = @i_client_id
					and country_code = @i_country_code
					and user_id = @i_user_id
			)
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end


	else if ( @i_lov_code_type = 'COMPETITOR_NAME_LIST' )
	begin
		if (@i_search_field_1 !='')
		begin 

			select distinct'' as value_list,
				'{' +
					'"code":"' + a.field_value1 + '",' +
					'"description":"' + a.field_value1 + '"' +
				'}' as o_value_xml
			from product_customization_field_value_mapping a
				where company_id = @i_client_id
				and country_code = @i_country_code
				and value_mapping_code = 'EQSALECOMPETITOR'
				and field_value2 = @i_search_field_1 
		end 
		else 
		begin 
			select distinct'' as value_list,
				'{' +
					'"code":"' + a.field_value1 + '",' +
					'"description":"' + a.field_value1 + '"' +
				'}' as o_value_xml
			from product_customization_field_value_mapping a
				where company_id = @i_client_id
				and country_code = @i_country_code
				and value_mapping_code = 'EQSALECOMPETITOR'
		end

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if ( @i_lov_code_type = 'CAPP_DESIGNATION_LIST' )
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

	else if ( @i_lov_code_type = 'CAPP_CALL_TYPE_LIST' )
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

	else if ( @i_lov_code_type = 'CAPP_LANGUAGE_LIST' )
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
	else if (@i_lov_code_type = 'ASST_SRCH_ON_CUST_AND_EQPT')
	begin
		if(@i_search_field_3 = 'ZZZ')
		begin
			select '' as value_list,
			   '{' + 
				   '"id":"'+''+'",'+
					'"parent_id":"'+''+'",'+
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
		else if(@i_search_field_4 = 'SASSY')
		begin
			select '' as value_list,
			   '{' + 
				   '"id":"'+a.asset_id+'",'+
				   '"parent_id":"'+isnull(a.parent_asset_id,'')+'",'+
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
				and a.asset_id in (select child_asset_id from asset_master_boa 
										where company_id = @i_client_id 
											and country_code = @i_country_code
											and asset_id = @i_search_field_5)
				and a.equipment_id like '%' + (select case(@i_search_field_2) when 'ZZZ' then '' else @i_search_field_2 end) + '%'
				and a.customer_id like '%' + (select case(@i_search_field_3) when 'ZZZ' then '' else @i_search_field_3 end) + '%'
				and b.company_id = a.company_id
				and b.country_code = a.country_code
				and b.equipment_id = a.equipment_id

			set @o_retrieve_status = 'SUCCESS'
			return
		end
		else
		begin
			select '' as value_list,
			   '{' + 
				   '"id":"'+'ZZZ'+'",'+
					'"parent_id":"'+''+'",'+
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
					'"parent_id":"'+isnull(a.parent_asset_id,'')+'",'+						
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
				and a.asset_category like '%' + isnull(@i_search_field_4,'') + '%'
				and a.asset_type like '%' + isnull(@i_search_field_5,'') + '%'	   				
				and b.company_id = a.company_id		   
				and b.country_code = a.country_code
				and b.equipment_id = a.equipment_id

			set @o_retrieve_status = 'SUCCESS'
			return
		end
	end

	/*GEO Address*/
	
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
	--added against FCR-368 starts
	else if  @i_lov_code_type = 'PARTS_PURCHASE_SOURCE_BY_ASSET'
	begin
		select '' as value_list,
			'{' +
				'"code":"' + STUFF(a.code,1,2,'') + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'PARTSPURSOURCE'
							and f.code = a.code)
				when 1 then
					(select e.long_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'PARTSPURSOURCE'
						and e.code = a.code)
				else
					(select g.long_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'PARTSPURSOURCE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
        from code_table a
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.code_type = 'PARTSPURSOURCE'	
		order by a.code  

		select @o_retrieve_status = 'SUCCESS'

		return
	end
	else if  @i_lov_code_type = 'PARTS_PURCHASE_SOURCE_BY_DEALER'
	begin
		select '' as value_list,
			'{' +
				'"code":"' + dealer_id + '",' +
				'"description":"' +dealer_name_long+ '"' +
			'}' as o_value_xml
        from dealer_master 
		where company_id = @i_client_id
		and country_code = @i_country_code
		and dealer_status = 1 --active

		select @o_retrieve_status = 'SUCCESS'
		
		return
	end
	--added against FCR-368 ends

	else if (@i_lov_code_type = 'MACHINE_LOC')
	begin
		
	declare 
		    @p_state_filter nvarchar(60),
			@p_city_filter nvarchar(60),
			@p_locality_filter nvarchar(60),
			@p_sublocality_filter nvarchar(60),
			@p_dealer_id_filter nvarchar(60),
			@p_company_location_filter nvarchar(60)
				
		set @p_state_filter = (select paramval from #input_params where paramname = 'state_filter')
		set @p_city_filter = (select paramval from #input_params where paramname = 'city_filter')
		set @p_locality_filter = (select paramval from #input_params where paramname = 'locality_filter')
		set @p_sublocality_filter = (select paramval from #input_params where paramname = 'sublocality_filter')
		set @p_dealer_id_filter = (select paramval from #input_params where paramname = 'dealer_id_filter')
		set @p_company_location_filter = (select paramval from #input_params where paramname = 'company_location_filter')

		
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

		select '' as value_list,
		'{' + 
			'"p_lattitude_val":"' + isnull(b.latitude,'') + '",' +
		    '"p_longitude_val":"' + isnull(b.longitude,'') + '",' +
			'"asset_id":"' + b.asset_id + '",' +
			'"address":"'+isnull(b.address,'')+'",'+ /* update asset master with address */
			'"current_hmr":"' + isnull(convert(varchar(20),
				( select apl.parameter_value
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
				( select apl.parameter_updatedby_source
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
				( select apl.parameter_updatedby_source_ref_no
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
			
			'"previous_hmr":"' + isnull(convert(varchar(20),b.lastcheck_value),'' )+ '",' +
			'"service_due_interval":"' + 
				isnull(cast(cast(( select apl5.next_Service_interval
					from asset_parameter_log apl5
					where apl5.company_id = @i_client_id
					  and apl5.country_code = @i_country_code
					  and apl5.asset_id = b.asset_id
					  and datediff(hh, apl5.record_date, (select max(apl6.record_date)
											from asset_parameter_log apl6
											where apl6.company_id = @i_client_id
											  and apl6.country_code = @i_country_code
											  and apl6.asset_id = b.asset_id
											)) = 0
				) as int) as varchar(10)),'')
				+ '",' +
			'"service_due_date":"' + isnull(convert(varchar(10), 
				( select apl5.next_service_due_date
					from asset_parameter_log apl5
					where apl5.company_id = @i_client_id
					  and apl5.country_code = @i_country_code
					  and apl5.asset_id = b.asset_id
					  and datediff(hh, apl5.record_date, (select max(apl6.record_date)
											from asset_parameter_log apl6
											where apl6.company_id = @i_client_id
											  and apl6.country_code = @i_country_code
											  and apl6.asset_id = b.asset_id
											)) = 0
				)
				, 105),'') + '",' +
			'"service_overdue_ind":"' + 
				(case 
			     when datediff(dd, ( select apl5.next_service_due_date
					from asset_parameter_log apl5
					where apl5.company_id = @i_client_id
					  and apl5.country_code = @i_country_code
					  and apl5.asset_id = b.asset_id
					  and datediff(hh, apl5.record_date, (select max(apl6.record_date)
											from asset_parameter_log apl6
											where apl6.company_id = @i_client_id
											  and apl6.country_code = @i_country_code
											  and apl6.asset_id = b.asset_id
											)) = 0
				) ,  sysdatetimeoffset()) <= 0 then '0'
				else 
					(case 
							( select apl5.avg_runrate
							from asset_parameter_log apl5
							where apl5.company_id = @i_client_id
							  and apl5.country_code = @i_country_code
							  and apl5.asset_id = b.asset_id
							  and datediff(hh, apl5.record_date, (select max(apl6.record_date)
																	from asset_parameter_log apl6
																	where apl6.company_id = @i_client_id
																	  and apl6.country_code = @i_country_code
																	  and apl6.asset_id = b.asset_id
																	)
									) = 0
							)
					  when 0 then '0'
					  else '1'
					  end)
				end
			  )
			 + '",' +
			'"customer_id":"' + isnull(b.customer_id,'') + '",' +
			'"customer_address":"' + isnull((
				select address_line_1 
				from customer c
				where c.company_id = @i_client_id
				  and c.country_code = @i_country_code
				  and c.customer_id = b.customer_id
			), '') + '",' +
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
	else if  @i_lov_code_type = 'CUSTOMER_CATEGORY_LIST'
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + isnull(a.code,'') + '",' +
				'"description":"' + isnull(a.code,'') + '"' +
			'}' as o_value_xml
		from code_table a
		where  a.company_id = @i_client_id
		   and a.country_code = @i_country_code
		   and a.code_type = 'CUSTCATG'
		select @o_retrieve_status = 'SUCCESS'
				
		return
	end
	else if  @i_lov_code_type = 'CUSTOMER_TYPE_LIST'
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + isnull(a.code,'') + '",' +
				'"description":"' + isnull(a.code,'') + '"' +
			'}' as o_value_xml
		from code_table a
		where  a.company_id = @i_client_id
		   and a.country_code = @i_country_code
		   and a.code_type = 'CUSTTYPE'
		
		select @o_retrieve_status = 'SUCCESS'
				
		return
	end
	else if  @i_lov_code_type = 'CUSTOMER_TYPE_LIST_FOR_PE'
	begin
		select  '' as value_list,
			'{' +
				'"code":"' + 'Regular' + '",' +
				'"description":"' + 'Regular' + '"' +
			'}' as o_value_xml
		union all
		select distinct '' as value_list,
			'{' +
				'"code":"' + isnull(a.code,'') + '",' +
				'"description":"' + isnull(a.code,'') + '"' +
			'}' as o_value_xml
		from code_table a
		where  a.company_id = @i_client_id
		   and a.country_code = @i_country_code
		   and a.code_type = 'CUSTTYPE'
		
		select @o_retrieve_status = 'SUCCESS'
				
		return
	end
	else if ( @i_lov_code_type = 'ITEMCODE_LIST' )
	begin
		if ( @i_search_field_3 = 'EQUIPMENT_ITEM_LINK' )
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
										and link_type = 'EQPARTNO'
										and equipment_id = @i_search_field_4
										)
				and item_variant_code = 'EQUIPMENT'
				
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
				and item_code not in (select item_code 
									from equipment_item_link 
									where company_id = @i_client_id
										and country_code = @i_country_code
										and link_type = 'EQPARTNO')
				and item_variant_code = 'SPARE'
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
	

	else if (@i_lov_code_type = 'CUSTOMER_SEARCH_BYNAME')
        begin
          select '' as value_list,
            '{' +
             '"code":"' + a.customer_id + '",' +
			 '"description":"' + a.customer_name  +'",'+
			'"customer_address":"' +isnull(a.address_line_1,'')  +'",'+
			'"contact_person":"' +isnull(a.contact_person_1,'') +'",'+
			'"customer_city":"' +isnull(a.city,'') +'",'+
			'"customer_pincode":"' +isnull(a.pincode,'') +'",'+
			'"contact_person_mobile_no":"' +isnull(a.contact_person_1_mobile_no,'') +'",'+
			'"customer_fulladdress":"' +isnull(a.address_line_1,'') + ',' + isnull(a.city,'')+ '-' + isnull(a.state_code,'') +'",'+
			'"contact_person_1_email_id":"' +isnull(a.contact_person_1_email_id,'') +'"'+
			  '}' as o_value_xml
				 from customer a
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.customer_name like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%' 
				

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'PHONE_SEARCH_BYCUST')
        begin
			 select '' as value_list,
            '{' +
             '"code":"' + a.contact_person_1_mobile_no + '",' +
			 '"description":"' + a.customer_name  +'",'+
			 '"customer_id":"' + a.customer_id  +'",'+
			'"customer_address":"' +isnull(a.address_line_1,'')  +'",'+
			'"contact_person":"' +isnull(a.contact_person_1,'') +'",'+
			'"customer_city":"' +isnull(a.city,'') +'",'+
			'"customer_pincode":"' +isnull(a.pincode,'') +'",'+
			'"customer_fulladdress":"' +isnull(a.address_line_1,'') + ',' + isnull(a.city,'')+ '-' + isnull(a.state_code,'') +'",'+
			'"contact_person_1_email_id":"' +isnull(a.contact_person_1_email_id,'') +'"'+
			  '}' as o_value_xml
				 from customer a
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.contact_person_1_mobile_no like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
			
				
		set @o_retrieve_status = 'SUCCESS'
		return
	end


	

else if (@i_lov_code_type = 'CUSTOMER_SEARCH_ENQUIRY')
        begin
          select '' as value_list,
            '{' +
             '"code":"' + a.customer_id + '",' +
			 '"description":"' + a.customer_name + ','+ isnull(a.address_line_1,'') + ',' +
											isnull((select city_name from city_master   
													where country_code = @i_country_code
													and city_code = a.city_code),'')+ ',' + 
													isnull( (select state from state   
													where country_code = @i_country_code
													and state_code = a.state_code),'') + '-' + 
											        isnull(a.pincode,'')+'",'+
			'"customer_name":"' +isnull(a.customer_name,'') + '",'+
			'"customer_address":"' +isnull(a.address_line_1,'') + '",'+
			'"contact_person":"' +isnull(a.contact_person_1,'') +'",'+
			'"customer_city":"' +isnull(a.city,'') +'",'+
			'"customer_state":"' +isnull(a.state_code,'') +'",'+
			'"customer_pincode":"' +isnull(a.pincode,'') +'",'+
			'"contact_person_mobile_no":"' +isnull(a.contact_person_1_mobile_no,'') +'",'+
			'"customer_fulladdress":"' +isnull(a.address_line_1,'') + ',' + isnull(a.city,'')+ '-' + isnull(a.state_code,'') +'",'+
			'"customer_location":"' + isnull((select top(1) location_code from customer_location cl
										where a.company_id = @i_client_id
											and a.country_code = @i_country_code
											and a.customer_id = cl.customer_id
			),'')
			+'",'+
			'"customer_location_desc":"' + isnull((select top(1) cm.city_name from customer_location cl, city_master cm
													where a.company_id = @i_client_id
														and a.country_code = @i_country_code
														and cl.location_code = cm.city_code
														and a.customer_id = cl.customer_id),
														(select top(1) city from customer_location cl
																where a.company_id = @i_client_id
																	and a.country_code = @i_country_code
																	and a.customer_id = cl.customer_id)
													)
			+'",'+
			'"contact_person_1_email_id":"' +isnull(a.contact_person_1_email_id,'') +'"'+
			  '}' as o_value_xml
				 from customer a
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.customer_name like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
				

		UNION

			select '' as value_list,
           		 '{' +
             		'"code":"' + 'NEW PROSPECT'+ '",' +
			 '"description":"' + 'NEW PROSPECT'+'",'+
			'"customer_name":"' + '' + '",'+
			'"customer_address":"' + '' + '",'+
			'"contact_person":"' +'' +'",'+
			'"customer_city":"' + '' +'",'+
			'"customer_state":"' + '' +'",'+
			'"customer_pincode":"' + '' +'",'+
			'"contact_person_mobile_no":"' + '' +'",'+
			'"customer_fulladdress":"' + '' +'",'+
			'"customer_location":"' + '' +'",'+
			'"customer_location_desc":"' + '' +'",'+
			'"contact_person_1_email_id":"' + '' +'"'+
			  '}' as o_value_xml
			

		set @o_retrieve_status = 'SUCCESS'
		return
		end
	else if (@i_lov_code_type = 'ENQUIRY_SEARCH')
        begin
           select distinct'' as value_list,
            '{' +
             '"code":"' + a.call_ref_no + '",' +
			 '"description":"' + isnull(a.customer_name,'')+','+isnull(cl.address_line_1,'') +','+isnull((select city_name from city_master   
													where country_code = @i_country_code
													and city_code = cl.city_code),'')+'-'+isnull(a.problem_description,'')+'"'+
			  '}' as o_value_xml
				 from call_register a, customer cu, customer_location cl, call_assignment ca
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = cl.company_id
			
			
			
			and a.country_code = cl.country_code
				and a.customer_id = cl.customer_id
				and a.customer_id = cu.customer_id
				and cu.customer_id = cl.customer_id
				and a.call_category = 'SA'
				and a.call_status not in ('AU','OL','CD','CL')
				and a.company_id = ca.company_id
				and a.country_code = ca.country_code
				and a.call_ref_no = ca.call_ref_no
				and ca.resource_emp_id 
								in (select employee_id from users u 
								where u.company_id = @i_client_id
								and u.country_code = @i_country_code
								and u.user_id  = @i_user_id)
				and (
					cu.customer_name like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
					or
					a.call_ref_no like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
					or
					a.customer_contact_no like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
					)
				
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'ENQUIRY_SEARCH_QUOTE')
        begin
           select '' as value_list,
            '{' +
             '"code":"' + a.call_ref_no + '",' +
			 '"description":"' + isnull(a.customer_name,'')+','+isnull(cl.address_line_1,'') +','+isnull(cl.city,'')+'-'+isnull(a.problem_description,'')+'"'+
			  '}' as o_value_xml
				 from call_register a, customer_location cl, call_assignment ca
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = cl.company_id
				and a.country_code = cl.country_code
				and a.customer_id = cl.customer_id
				and a.call_category = 'SA'
				and a.call_status not in ('A','AU','AQ','CN','CL','OW','OL')
				and a.company_id = ca.company_id
				and a.country_code = ca.country_code
				and a.call_ref_no = ca.call_ref_no
				and ca.resource_emp_id 
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

	else if ( @i_lov_code_type = 'EQUIPMENT_ITEM_LINK_LIST' )
	begin
		
		select distinct '' as value_list,
				'{' +
					'"code":"' + a.equipment_id + '",' +
					'"description":"' + a.description + '"' +
				'}' as o_value_xml
			
			from equipment a, equipment_item_link b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = b.company_id
				and a.country_code = b.country_code
				and a.equipment_id = b.equipment_id
				and b.link_type = 'EQPARTNO'
				and b.equipment_type = @i_search_field_3
				and b.equipment_category = @i_search_field_2
				

		set @o_retrieve_status = 'SUCCESS'
		return
	end	

	else if (@i_lov_code_type = 'WAREHOUSE_LIST') 
	begin
	
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
						and b.dealer_id	 in (select a.dealer_id from dealer_organogram_mapping a, employee b
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

	else if (@i_lov_code_type = 'ENQUIRY_CLOSURE_MONTHYEAR')
	begin

		select distinct '' as value_list,
			'{' + 
				'"code":"' +  isnull(cast((CAST(DATENAME(month, expected_closure_date) AS CHAR(3)) +'-'+ FORMAT(expected_closure_date, 'yy')) as varchar(10)),'') + '",' +
				'"description":"' + isnull(cast((CAST(DATENAME(month, expected_closure_date) AS CHAR(3)) +'-'+ FORMAT(expected_closure_date, 'yy')) as varchar(10)),'') + '"' +
			'}'
		as o_value_xml
		from call_register
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_category = 'SA'
			and expected_closure_date != ''
			and expected_closure_date is not null

		set @o_retrieve_status = 'SUCCESS'
		return

	end
	
		else if (@i_lov_code_type = 'CUSTOMER_COMPETITOR_MACHINE_LIST')
        begin
           select distinct '' as value_list,
            '{' +

			 '"fleet_category":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'EQUIPCATG',a.fleet_category) + '",' +
			 '"fleet_type":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'EQUIPTYPE',a.fleet_type) + '",' +
			 '"oem":"' + isnull(a.oem,'') + '",' +
			 '"model":"' + isnull(a.model,'') + '",' +
			 '"no_of_units":"' + cast(cast(isnull(a.no_of_units,0) as int) as varchar(19))  + '",' +
			 '"customer_id":"' + isnull(a.customer_id,'') + '",' +
			 '"application_segment":"' + isnull(a.application_segment,'') + '"' +
			  '}' as o_value_xml
				 from asset_master_competitor a
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.customer_id = @i_search_field_1
				
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'CUSTOMER_MACHINE_LIST')
        begin
           select distinct '' as value_list,
            '{' +

			 '"fleet_category":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'EQUIPCATG',e.equipment_category) + '",' +
			 '"fleet_type":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'EQUIPTYPE',e.equipment_type) + '",' +
			 '"oem":"' + '' + '",' +
			 '"model":"' + isnull(a.equipment_id,'') + '",' +
			 '"no_of_units":"' + '1'  + '",' +
			 '"customer_id":"' + isnull(a.customer_id,'') + '",' +
			 '"application_segment":"' + '' + '"' +
			  '}' as o_value_xml
				 from asset_master a, equipment e
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = e.company_id
				and a.country_code = e.country_code
				and a.equipment_id = e.equipment_id
				and a.customer_id = @i_search_field_1
				
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code_type = 'CUSTOMER_ADDL_INFO')
	begin

		create table #customer_addl_info (
			customer_id nvarchar(15),
			customer_name nvarchar(100),
			customer_address_line_1 nvarchar(200),
			customer_address_line_2 nvarchar(200),
			customer_address_line_3 nvarchar(200),
			customer_city nvarchar(60),
			customer_state_desc nvarchar(60),
			customer_pincode nvarchar(10),
			customer_country_desc nvarchar (100)
		)

		insert #customer_addl_info (
				customer_id,
				customer_name,
				customer_address_line_1,
				customer_address_line_2,
				customer_address_line_3,
				customer_city,
				customer_state_desc,
				customer_pincode,
				customer_country_desc
			)
			select a.customer_id, 
				a.customer_name,
				a.address_line_1,
				isnull(a.address_line_2,''),
				isnull(a.address_line_3,''),
				isnull(a.city,''),
				(select isnull(s.state,'')
				  from state s
				  where a.company_id			= @i_client_id
				   and  s.country_code			= @i_country_code
				   and  s.state_code			= a.state_code
				),
				isnull(a.pincode,''),
				(select isnull(cu.country_name,'')
				  from country cu
				  where a.company_id			= @i_client_id
				   and  cu.country_code			= @i_country_code
				   and  cu.country_code			= a.country_code
				)
			from customer a
			where a.company_id =  @i_client_id
				and a.country_code = @i_country_code
				and a.customer_id = @i_search_field_1


		 select distinct '' as value_list,
            '{' +
			 '"customer_id":"' + customer_id + '",' +
			 '"customer_name":"' + customer_name + '",' +
			 '"addr_1":"' + customer_address_line_1 + '",' +
			 '"addr_2":"' + customer_address_line_2 + '",' +
			 '"addr_3":"' + customer_address_line_3 + '",' +
			 '"city":"' + customer_city + '",' +
			 '"pincode":"' + customer_pincode + '",' +
			 '"state_desc":"' + customer_state_desc + '",' +
			 '"country_desc":"' + customer_country_desc + '"' +
			  '}' as o_value_xml
				 from #customer_addl_info

		set @o_retrieve_status = 'SUCCESS'
		return

	end

	else if ( @i_lov_code_type = 'OEMITEMCODE_LIST' )
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + isnull(udf_char_2,'') + '",' +
				'"description":"' + isnull(udf_char_2,'') + '"' +
			'}' as o_value_xml
			
		from item_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and (udf_char_2 like '%' + @i_search_field_1 + '%')
		
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
	else if (@i_lov_code_type = 'REPORTYEAR_LIST')
	begin
		with yearlist as 
		(
			select (DATEPART(Year,sysdatetimeoffset())-10) as year
			union all
			select yl.year + 1 as year
			from yearlist yl
			where yl.year + 1 <= YEAR(sysdatetimeoffset())
		)
		select '' as value_list,
			'{' +
				'"code":"' + cast(year as varchar(4)) + '",' +
				'"description":"' + cast(year as varchar(4)) + '"' +
			'}' as o_value_xml
		from yearlist order by year desc;			
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end
    SET NOCOUNT OFF;
END







GO