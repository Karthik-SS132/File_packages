DROP PROCEDURE [dbo].[sp_retrieve_listof_values_for_searchcondition]

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



/*
 * Generic function to retrieve list of values for a search condition
 */
CREATE PROCEDURE [dbo].[sp_retrieve_listof_values_for_searchcondition] 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_inputparam_xml [uddt_nvarchar_1000]
AS
BEGIN
	
	declare @p_inputparam_xml xml, @p_noof_org_levels tinyint,@p_fiscal_year varchar(7)

	DECLARE @p_SQLString nvarchar(500) , @p_ParmDefinition nvarchar(500),
			@p_retrieve_status varchar(10), @p_execution_status varchar(10),
			@p_session_id [sessionid], 
			@p_user_id [userid], 
			@p_client_id [uddt_client_id], 
			@p_locale_id [uddt_locale_id], 
			@p_country_code [uddt_country_code], 
			@p_lov_code_type [uddt_varchar_60], 
			@p_search_field_1 [uddt_nvarchar_60], 
			@p_search_field_2 [uddt_nvarchar_60], 
			@p_search_field_3 [uddt_nvarchar_60], 
			@p_search_field_4 [uddt_nvarchar_60], 
			@p_search_field_5 [uddt_nvarchar_60],
			@p_search_field_6 [uddt_nvarchar_60],
			@p_search_field_7 [uddt_nvarchar_60],
			@p_search_field_8 [uddt_nvarchar_60]



			

	set @p_inputparam_xml = CAST(@i_inputparam_xml as XML)
	
if datepart(month,CONVERT(datetimeoffset,SYSDATETIMEOFFSET(),121)) <= 3
			select @p_fiscal_year=substring(convert(varchar(10),datepart(year, CONVERT(datetimeoffset,sysdatetimeoffset(),121))-1),3,2)+
					'-'+substring(convert(varchar(10),datepart(year,CONVERT(datetimeoffset,sysdatetimeoffset(),121))),3,2) 
			else if (DATEPART(month,CONVERT(datetimeoffset,sysdatetimeoffset(),121))) >= 4
			 select @p_fiscal_year= substring(convert(varchar(10),datepart(year,CONVERT(datetimeoffset,sysdatetimeoffset(),121))),3,2)+
				 '-'+ substring(convert(varchar(10),datepart(year,CONVERT(datetimeoffset,sysdatetimeoffset(),121))+1),3,2)


	  

	create table #input_params
		(paramname varchar(50) not null,
		paramval varchar(50) not null)
	  
	insert #input_params
		(paramname, paramval)
	SELECT nodes.value('local-name(.)', 'varchar(50)'),
		nodes.value('(.)[1]', 'varchar(50)')
	FROM @p_inputparam_xml.nodes('/inputparam/*') AS Tbl(nodes)

	update #input_params
	set paramval = '%' 
	where paramval = 'ALL'
		or paramval = ''

	select @p_lov_code_type = paramval from #input_params where paramname like '%lov_code%'
	select @p_search_field_1 = paramval from #input_params where paramname like '%search_field_1'
	select @p_search_field_2 = paramval from #input_params where paramname like '%search_field_2'
	select @p_search_field_3 = paramval from #input_params where paramname like '%search_field_3'
	select @p_search_field_4 = paramval from #input_params where paramname like '%search_field_4'
	select @p_search_field_5 = paramval from #input_params where paramname like '%search_field_5'
	select @p_search_field_6 = paramval from #input_params where paramname like '%search_field_6'
	select @p_search_field_7 = paramval from #input_params where paramname like '%search_field_7'
	select @p_search_field_8 = paramval from #input_params where paramname like '%search_field_8'
	
	
	if exists ( select 1 from sys.objects
				where type = 'P' 
				  and name = OBJECT_NAME(@@PROCID)+'_'+@i_client_id)
	begin
	
		/* Build the SQL string one time.*/
		SET @p_SQLString = 'execute '+OBJECT_NAME(@@PROCID)+'_'+@i_client_id+
			 N' @p_session_id , 
				@p_user_id , 
				@p_client_id , 
				@p_locale_id , 
				@p_country_code , 
				@p_lov_code_type , 
				@p_search_field_1 , 
				@p_search_field_2 , 
				@p_search_field_3 , 
				@p_search_field_4 , 
				@p_search_field_5 ,
				@p_retrieve_status OUTPUT ';

		SET @p_ParmDefinition = N'@p_session_id [sessionid], 
			@p_user_id [userid], 
			@p_client_id [uddt_client_id], 
			@p_locale_id [uddt_locale_id], 
			@p_country_code [uddt_country_code], 
			@p_lov_code_type [uddt_varchar_60], 
			@p_search_field_1 [uddt_nvarchar_60], 
			@p_search_field_2 [uddt_nvarchar_60], 
			@p_search_field_3 [uddt_nvarchar_60], 
			@p_search_field_4 [uddt_nvarchar_60], 
			@p_search_field_5 [uddt_nvarchar_60],
			@p_retrieve_status varchar(10) OUTPUT';
		    
		/* Execute the string with the first parameter value. */

		EXECUTE sp_executesql @p_SQLString, @p_ParmDefinition,
							  @p_session_id = @i_session_id, 
								@p_user_id = @i_user_id, 
								@p_client_id = @i_client_id, 
								@p_locale_id = @i_locale_id, 
								@p_country_code = @i_country_code, 
								@p_lov_code_type = @p_lov_code_type, 
								@p_search_field_1 = @p_search_field_1, 
								@p_search_field_2 = @p_search_field_2, 
								@p_search_field_3 = @p_search_field_3, 
								@p_search_field_4 = @p_search_field_4, 
								@p_search_field_5 = @p_search_field_5,
								@p_retrieve_status = @p_execution_status OUTPUT;
		
		if @p_execution_status = 'SUCCESS'
			return				
    
	end

	
	/* ACTUAL SNIPPETS */
	
	if ( @p_lov_code_type = 'ASSET' )
	begin
		select '' as value_list,
		'<code>' + a.asset_id + '</code>' +
		'<description>' + b.description + '</description>' +
		'<parent_code>' + a.equipment_id + '</parent_code>'
		as o_value_xml
		from asset_master a,equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.asset_id like @p_search_field_1
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.equipment_id = b.equipment_id
			
		union all
		select '' as value_list,
			'<code>' + 'ZZZ' + '</code>' +
			'<description>' + 'ZZZ' + '</description>' +
			'<parent_code>' + 'ZZZ' + '</parent_code>'
		as o_value_xml
		return
	end
	
	if (@p_lov_code_type = 'ASSETCONTRACTTYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'ASSETCONTRACTTYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'ASSETCONTRACTTYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'ASSETCONTRACTTYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ASSETCONTRACTTYPE'
		return
	end
	
	if (@p_lov_code_type = 'TIMECARD_CALL_SEARCH')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.call_ref_no + '",' +
				'"description":"' + a.call_ref_no +'"'+
			'}' as o_value_xml
		from call_register a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and (
				a.call_ref_no like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
			)
		return
	end

	if (@p_lov_code_type = 'ASSET_CONTRACT_TYPE_LIST')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'ASSETCONTRACTTYPE'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'ASSETCONTRACTTYPE'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'ASSETCONTRACTTYPE'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ASSETCONTRACTTYPE'
		return
	end
	
	if (@p_lov_code_type = 'ASSET_CUSTOMER_EQUIPMENT_LINK')
	begin
		select '' as value_list,
				'<asset_id>' + a.asset_id + '</asset_id>' +
				'<equip_id>' + a.equipment_id + '</equip_id>' +
				'<equip_desc>' + b.description + '</equip_desc>' +
				'<cust_id>' + a.customer_id + '</cust_id>' +
				'<cust_name>' + c.customer_name + '</cust_name>' +
				'<org_lvl_no>' + convert(varchar(1), a.servicing_org_level_no) + '</org_lvl_no>' +
				'<org_lvl_code>' + a.servicing_org_level_code + '</org_lvl_code>'
			as o_value_xml
			from asset_master a, equipment b, customer c
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and b.company_id = a.company_id
				and b.country_code = a.country_code
				and b.equipment_id = a.equipment_id
				and c.company_id = a.company_id
				and c.country_code = a.country_code
				and c.customer_id = a.customer_id
			return
	end	
	
	if (@p_lov_code_type = 'ASSET_LIST_FOR_MTNCE_HIST')
	begin
		select '' as value_list,
		   '{' + 
			   '"id":"' + a.asset_id + '",' +
			   '"desc":"' + b.description + '",' + 
			   '"inst_date":"' + isnull(convert(varchar(10), a.installation_date, 120), '') + '"' +
		   '}' as o_value_xml
		from asset_master a, equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.asset_id like '%' + @p_search_field_1 + '%'
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.equipment_id = a.equipment_id
		return
	end
	
	if (@p_lov_code_type = 'ASSET_LIST_SEARCH_W_ZZZ')
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
			and a.asset_id like '%' + @p_search_field_1 + '%'
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.equipment_id = a.equipment_id
		return
	end
	
	if (@p_lov_code_type = 'ASSET_LIST_SEARCH_WO_ZZZ')
	begin
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
			and a.asset_id like '%' + @p_search_field_1 + '%'
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.equipment_id = a.equipment_id
		return
	end
	
	if (@p_lov_code_type = 'ASSET_LIST_W_ZZZ')
	begin
		select '' as value_list,
		   '{' + 
			   '"id":"'+'ZZZ'+'",'+
			   '"desc":"'+'ZZZ'+'"'+
		   '}' as o_value_xml
		union all
		select '' as value_list,
		   '{' + 
			   '"id":"'+a.asset_id+'",'+
			   '"desc":"'+b.description+'"'+
		   '}' as o_value_xml
		from asset_master a, equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.equipment_id = a.equipment_id	
		return
	end
	
	if (@p_lov_code_type = 'ASSET_LIST_WO_ZZZ')
	begin
		select '' as value_list,
		   '{' + 
			   '"id":"'+a.asset_id+'",'+
			   '"desc":"'+b.description+'"'+
		   '}' as o_value_xml
		from asset_master a, equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.equipment_id = a.equipment_id	
		return
	end
	
	if (@p_lov_code_type = 'ASSET_SERVICE_CONTRACT') 
	begin
		select '' as value_list,
			'<code>' + contract_doc_no + '</code>' +
			'<description>' + description + '</description>' +
			'<parent_code>' + asset_id + '</parent_code>'
		as o_value_xml
		from asset_service_contract
		where company_id = @i_client_id
			and country_code = @i_country_code
			and contract_doc_no like  @p_search_field_1
			and asset_id like  @p_search_field_2
			
		return
	end
	
	if (@p_lov_code_type = 'ASSETSERVICECONTRACT_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + contract_doc_no + '",' +
				'"description":"' + description + '"' +
			'}' as o_value_xml
		from asset_service_contract
		where company_id = @i_client_id 
			and country_code = @i_country_code
			and asset_id = @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'ASST_SRCH_ON_CUST_AND_EQPT')
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
			and (a.asset_id like '%' + @p_search_field_1 + '%'
				or
				b.description like '%' + @p_search_field_1 + '%'
				)
			and a.equipment_id like '%' + (select case(@p_search_field_2) when 'ZZZ' then '' else @p_search_field_2 end) + '%'
			and a.customer_id like '%' + (select case(@p_search_field_3) when 'ZZZ' then '' else @p_search_field_3 end) + '%'
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and b.equipment_id = a.equipment_id
		return
	end
	
	if (@p_lov_code_type = 'CALL_ALLOWED_EVENTVERB_LIST') 
	begin
	
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>'+eventverb_id+'</event_verb>'
		as o_value_xml
		from workflow_eventverb_list
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and transaction_type_code = 'CALL'
		  and cast(request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and cast(from_workflow_stage as varchar(3)) like 
			case @p_search_field_3 when 'ALL' then '%' else @p_search_field_3 end
		  and from_status like 			
			case @p_search_field_4 when 'ALL' then '%' else @p_search_field_4 end
		union all
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>STATUSCHANGE</event_verb>'
		as o_value_xml
		from workflow_status_link b
		where b.company_id = @i_client_id
		  and b.country_code = @i_country_code
		  and b.transaction_type_code = 'CALL'
		  and cast(b.request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(b.request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and b.request_category+b.request_type+cast(b.from_workflow_stage as varchar(3))+b.from_status+
							cast(b.to_workflow_stage as varchar(3))+b.to_status 
					  not in ( select c.request_category+c.request_type+
									  cast(c.from_workflow_stage as varchar(3))+c.from_status+
									  cast(c.to_workflow_stage as varchar(3))+c.to_status
							   from workflow_eventverb_list c
							   where c.company_id = @i_client_id
							     and c.country_code = @i_country_code
							     and c.transaction_type_code = 'CALL'
								 and cast(c.request_category as varchar(10)) like 
									case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
								 and cast(c.request_type as varchar(10)) like 
									 case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  						)					
		return
	end
	
	if (@p_lov_code_type = 'CALL_ASSIGNTO_EMPLOYEE_LIST') 
	begin
		
		select '' as value_list,
			'{' + 
				'"emp_id":"' + b.employee_id + '",' +
				'"emp_name":"' + c.title + ' ' + c.first_name + ' ' + ISNULL(c.middle_name, '') + ' ' + c.last_name + '"' +
			'}'
		as o_value_xml
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
		
		return
	end
	
	if @p_lov_code_type = 'CALL_ASSIGNTO_LIST_FOR_REPORTINGTO'	
	begin
	
		if @p_search_field_1 = ''
		begin
			select '' as value_list,
			'{' +
				'"employee_id":"' + a.employee_id + '",' +
				'"device_id":"' + isnull(c.device_id, '') + '",' +
				'"description_field":"' + b.first_name + ' ' + b.last_name + '"' +
			'}'
			as o_value_xml
			from functional_role_employee a, employee b, device_register c
			where a.company_id = @i_client_id
				and a.country_code  = @i_country_code
				and a.company_id = b.company_id
				and a.country_code = b.country_code
				and a.employee_id = b.employee_id
				and a.company_id = c.company_id
				and a.country_code = c.country_code
				and a.employee_id = c.employee_id 
		end
		else 
		begin
			select '' as value_list,
			'{' + 
				'"employee_id":"' + a.employee_id + '",' +
				'"device_id":"' + isnull(c.device_id, '') + '",' +
				'"description_field":"' + b.first_name + ' ' + b.last_name + '"' + 
			'}' as o_value_xml
			from functional_role_employee a, employee b, device_register c
			where a.company_id = @i_client_id
				and a.country_code  = @i_country_code
				and a.reporting_to_employee_id = @p_search_field_1
				and a.company_id = b.company_id
				and a.country_code = b.country_code
				and a.employee_id = b.employee_id
				and a.company_id = c.company_id
				and a.country_code = c.country_code
				and a.employee_id = c.employee_id 
		end
		return
	end
	


if (@p_lov_code_type = 'CALL_REGISTER_ACTIONS')
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
			 and   a.call_ref_no			= @p_search_field_1 
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
		
		union all
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
			'"item_code_description":"'+ isnull(b.product_description,'') +'",' + 
			'"item_variant_code_description":"'+ 'Not Applicable' +'",' + 	
			'"uom_code_description":"'+ dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'PRODUCTUOM',a.uom_code) +'",' +
			(select '"currency_code_description":"'+ISNULL(cd.description,'')
					  from currency_code cd
					  where cd.currency_code = b.currency_code
					)
				+'",'+
			'"last_update_timestamp":"'+ cast(convert(uniqueidentifier,cast(a.last_update_timestamp as binary)) as varchar(36))+'"'+
			'}' as o_value_xml
			 from call_register_actions a,offer_master b
			 where a.company_id				= @i_client_id
			 and   a.country_code			= @i_country_code
			 and   a.call_ref_no			= @p_search_field_1 
			 and   a.company_id				= b.company_id
			 and   a.country_code			= b.country_code
			 and   a.product_code			= b.product_code
			 and   a.uom_code				= b.uom_code
		
		return
	end



	if (@p_lov_code_type = 'CALL_LOGGING_LEADSOURCE')
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
		return
	end
	
	if (@p_lov_code_type = 'CALL_STATUSCHANGE_REASONCODE_LIST')
	begin
		if @p_search_field_1 != 'STATUSCHANGE'
		begin		
			select '' as value_list,
				'{' +
					'"code":"' + a.code + '",' +
					'"desc":"' + (case (select 1 from code_table_mlingual_translation f
										where f.company_id = @i_client_id
											and f.country_code = @i_country_code
											and f.locale_id = @i_locale_id
											and f.code_type = @p_search_field_1 + 'REASCD'
											and f.code = a.code)
									when 1 then
										(select e.short_description from code_table_mlingual_translation e
										where e.company_id = @i_client_id
											and e.country_code = @i_country_code
											and e.locale_id = @i_locale_id
											and e.code_type = @p_search_field_1 + 'REASCD'
											and e.code = a.code)
									else
									(select g.short_description from code_table_mlingual_translation g
									where g.company_id = @i_client_id
										and g.country_code = @i_country_code
										and g.locale_id = 'ALL'
										and g.code_type = @p_search_field_1 + 'REASCD'
										and g.code = a.code)
									end) + '"' +
				'}' 
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = @p_search_field_1+'REASCD'
		end
		else 
		begin
			select '' as value_list,
				'{' + 
					'"code":"' + a.code + '",' +
					'"desc":"' + (case (select 1 from code_table_mlingual_translation f
										where f.company_id = @i_client_id
											and f.country_code = @i_country_code
											and f.locale_id = @i_locale_id
											and f.code_type = 'SCHNGREASCD_' + @p_search_field_2 + @p_search_field_3
											and f.code = a.code)
									when 1 then
										(select e.short_description from code_table_mlingual_translation e
										where e.company_id = @i_client_id
											and e.country_code = @i_country_code
											and e.locale_id = @i_locale_id
											and e.code_type = 'SCHNGREASCD_' + @p_search_field_2 + @p_search_field_3
											and e.code = a.code)
									else
									(select g.short_description from code_table_mlingual_translation g
									where g.company_id = @i_client_id
										and g.country_code = @i_country_code
										and g.locale_id = 'ALL'
										and g.code_type = 'SCHNGREASCD_' + @p_search_field_2 + @p_search_field_3
										and g.code = a.code)
									end) + '"' +
				'}'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'SCHNGREASCD_' + @p_search_field_2 + @p_search_field_3
		end		
		return
	end
	
	if (@p_lov_code_type = 'CALL_STATUSCHANGE_REASONCODES') 
	begin
		if @p_search_field_1 != 'STATUSCHANGE'
		begin		
			select '' as value_list,
				'<code>' + a.code + '</code>' +
				'<description>' + 
					(case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = @p_search_field_1+'REASCD'
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = @p_search_field_1+'REASCD'
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = @p_search_field_1+'REASCD'
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = @p_search_field_1+'REASCD'
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
							and f.code_type = 'SCHNGREASCD_'+@p_search_field_2+@p_search_field_3
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = 'SCHNGREASCD_'+@p_search_field_2+@p_search_field_3
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'SCHNGREASCD_'+@p_search_field_2+@p_search_field_3
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'SCHNGREASCD_'+@p_search_field_2+@p_search_field_3		
		end
		return
	end
	
	if (@p_lov_code_type = 'CALL_WF_EVENTVERB_LIST') 
	begin
		select '' as value_list,
			'{' + 
				'"req_catg":"' + request_category + '",' +
				'"req_type":"' + request_type + '",' +
				'"from_wf_stage":"' + CAST(from_workflow_stage as varchar(3)) + '",' +
				'"from_wf_status":"' + from_status + '",' +
				'"to_wf_stage":"' + CAST(to_workflow_stage as varchar(3)) + '",' +
				'"to_wf_status":"' + to_status + '",' +
				'"event_verb":"' + eventverb_id + '",' +
				'"feature_id":"' + (
					select isnull(feature_id, '')
					from company_feature a
					where a.company_id = @i_client_id
						and a.country_code = @i_country_code
						and a.screen_id = eventverb_id
						and a.channel_id = 'mobile'
				) + '"' +
			'}'
		as o_value_xml
		from workflow_eventverb_list
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and transaction_type_code = 'CALL'
		  and cast(request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and cast(from_workflow_stage as varchar(3)) like 
			case @p_search_field_3 when 'ALL' then '%' else @p_search_field_3 end
		  and from_status like 			
			case @p_search_field_4 when 'ALL' then '%' else @p_search_field_4 end
		union all
		select '' as value_list,
			'{' + 
				'"req_catg":"' + request_category + '",' +
				'"req_type":"' + request_type + '",' +
				'"from_wf_stage":"' + CAST(from_workflow_stage as varchar(3)) + '",' +
				'"from_wf_status":"' + from_status + '",' +
				'"to_wf_stage":"' + CAST(to_workflow_stage as varchar(3)) + '",' +
				'"to_wf_status":"' + to_status + '",' +
				'"event_verb":"STATUSCHANGE",' +
				'"feature_id":"' + (
					select isnull(feature_id, '')
					from company_feature a
					where a.company_id = @i_client_id
						and a.country_code = @i_country_code
						and a.screen_id = 'STATUSCHANGE'
						and a.channel_id = 'mobile'
				) + '"' +
			'}'
		as o_value_xml
		from workflow_status_link b
		where b.company_id = @i_client_id
		  and b.country_code = @i_country_code
		  and b.transaction_type_code = 'CALL'
		  and cast(b.request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(b.request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and b.request_category+b.request_type+cast(b.from_workflow_stage as varchar(3))+b.from_status+
							cast(b.to_workflow_stage as varchar(3))+b.to_status 
					  not in ( select c.request_category+c.request_type+
									  cast(c.from_workflow_stage as varchar(3))+c.from_status+
									  cast(c.to_workflow_stage as varchar(3))+c.to_status
							   from workflow_eventverb_list c
							   where c.company_id = @i_client_id
							     and c.country_code = @i_country_code
							     and c.transaction_type_code = 'CALL'
								 and cast(c.request_category as varchar(10)) like 
									case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
								 and cast(c.request_type as varchar(10)) like 
									 case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  						)									
		return
	end
	
	if (@p_lov_code_type = 'CALLASSIGNTO_LIST')
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
		return
	end
	
	if ( @p_lov_code_type = 'CALLASSIGNTOEMPLIST') 
	begin
		select '' as value_list,
			'<code>' + employee_id + '</code>' +
			'<description>' +
			title + '.' + first_name + ' ' + ISNULL(middle_name, '') + ' ' + last_name +
			'</description>'
		as o_value_xml
		from employee
		where company_id = @i_client_id
			and country_code  = @i_country_code
			and employee_id like  @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'CALLBNBIND' )
	begin
		select '' as value_list,
		'<code>' + a.code + '</code>' +
		'<description>' + 
			(case (select 1 from code_table_mlingual_translation f
				where f.company_id = @i_client_id
					and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'CALLBNBIND'
					and f.code = a.code)
			when 1 then
				(select e.short_description from code_table_mlingual_translation e
				where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'CALLBNBIND'
					and e.code = a.code)
			else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'CALLBNBIND'
					and g.code = a.code)
			end)
		+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLBNBIND'
			and a.code like  @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'CALLBNBIND_DESC')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'CALLBNBIND'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'CALLBNBIND'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'CALLBNBIND'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLBNBIND'
		return
	end
	
	if (@p_lov_code_type = 'CALLBNBIND_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'CALLBNBIND'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLBNBIND'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLBNBIND'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLBNBIND'
		return
	end
	
	if ( @p_lov_code_type = 'CALLCATEGORY' )
	begin
		select '' as value_list,
			'<code>' + 'ALL' + '</code>' +
			'<description>' + 'ALL' + '</description>' as o_value_xml
		union all
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
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
				end)
			+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLCATG'
			and a.code like  @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'CALLCATEGORY_DESC')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
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
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLCATG'
		return
	end
	
	if (@p_lov_code_type = 'CALLCATEGORY_LIST')
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
		return
	end
	
	if ( @p_lov_code_type = 'CALLCAUSE' )
	begin
		select '' as value_list,
		'<code>' + a.code + '</code>' +
		'<description>' + 
			(case (select 1 from code_table_mlingual_translation f
				where f.company_id = @i_client_id
					and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'CALLCAUSE'
					and f.code = a.code)
			when 1 then
				(select e.short_description from code_table_mlingual_translation e
				where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'CALLCAUSE'
					and e.code = a.code)
			else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'CALLCAUSE'
					and g.code = a.code)
			end)
		+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLCAUSE'
			and a.code like  @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'CALLCAUSE_DESC')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'CALLCAUSE'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'CALLCAUSE'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'CALLCAUSE'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLCAUSE'
		return
	end
	
	if (@p_lov_code_type = 'CHARGETYPE_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + additional_charges_ind + '",' +
				'"description":"' + additional_charges_desc + '"' +	
			'}' as o_value_xml
		from quotationinvoice_charge_code_master
		where company_id = @i_client_id
			and  country_code = @i_country_code
		return
	end

	
	if (@p_lov_code_type = 'CALLMAPPEDTO_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + b.mapped_to_employee_id + '",' +
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
			and isnull(b.mapped_to_employee_id,'') = c.employee_id
			and c.employee_status = 'A'
		return
	end
	
	if ( @p_lov_code_type = 'CALLMAPPEDTOEMPLIST')  /* Call Mapped To Employee List */
	begin
		select '' as value_list,
			'<code>' + employee_id + '</code>' +
			'<description>' +
			title + '.' + first_name + ' ' + ISNULL(middle_name, '') + ' ' + last_name +
			'</description>'
		as o_value_xml
		from employee
		where company_id = @i_client_id
			and country_code  = @i_country_code  
			and employee_id like  @p_search_field_1      
		return
	end
	
	if ( @p_lov_code_type = 'CALLPRIORITY' )
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
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
				end)
			+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLPRIORITY'
			and a.code like  @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'CALLPRIORITY_DESC')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
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
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLPRIORITY'
		return
	end
	
	if (@p_lov_code_type = 'CALLPRIORITY_LIST')
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
		return
	end
	
	if (@p_lov_code_type = 'CALLREPORTINGTO_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + b.reporting_to_employee_id + '",' +
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
			and isnull(b.reporting_to_employee_id,'') = c.employee_id
			and c.employee_status = 'A'
		return
	end
	
	if ( @p_lov_code_type = 'CALLREPOTOEMPLIST' )
	begin
		select '' as value_list,
			'<code>' + employee_id + '</code>' +
			'<description>' +
			title + '.' + first_name + ' ' + ISNULL(middle_name, '') + ' ' + last_name +
			'</description>'
		as o_value_xml
		from employee
		where company_id = @i_client_id
			and country_code  = @i_country_code
			and employee_id like  @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'CALLSLAUOM_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'CALLSLAUOM'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLSLAUOM'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLSLAUOM'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLSLAUOM'
		return
	end
	
	if ( @p_lov_code_type = 'CALLSTAGE' ) 
	begin
		select distinct '' as value_list,
			'<code>' +convert(varchar(10),workflow_stage_no)  + '</code>' +
			'<description>' + description + '</description>'
		as o_value_xml
		from workflow_stage_master
		where company_id = @i_client_id
			and country_code = @i_country_code
           --and workflow_stage_no like  @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'CALLSTAGE_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + convert(varchar(10), workflow_stage_no) + '",' +
				'"description":"' + description + '",' +
				'"parentCode":"' + request_category + '"' +
			'}'	as o_value_xml
		from workflow_stage_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and transaction_type_code = 'CALL'
		return
	end
	
	if ( @p_lov_code_type = 'CALLSTATUS' )
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLSTATUS'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLSTATUS'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'CALLSTATUS'
						and g.code = a.code)
				end)
		+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLSTATUS'
			and a.code like  @p_search_field_1
			and a.code like  @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'CALLSTATUS_DESC')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'CALLSTATUS'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'CALLSTATUS'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'CALLSTATUS'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLSTATUS'
		return
	end
	
	if (@p_lov_code_type = 'CALLSTATUS_LIST')
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
			and a.request_category = @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'CALLSUBTYPE' )
	begin
		select '' as value_list,
		'<code>' + a.code + '</code>' +
		'<description>' + 
			(case (select 1 from code_table_mlingual_translation f
				where f.company_id = @i_client_id
					and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'CALLSUBTYPE'
					and f.code = a.code)
			when 1 then
				(select e.short_description from code_table_mlingual_translation e
				where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'CALLSUBTYPE'
					and e.code = a.code)
			else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'CALLSUBTYPE'
					and g.code = a.code)
			end)
		+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLSUBTYPE'
			and a.code like  @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'CALLTYPE' )
	begin
		select '' as value_list,
			'<code>' + 'ALL' + '</code>' +
			'<description>' + 'ALL' + '</description>' +
			'<parent_code>' + 'ALL' + '</parent_code>' as o_value_xml
		union all
		select '' as value_list,
		'<code>'+a.type_code_value+'</code>'+
		'<description>' + 
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
			end)
		+ '</description>' +
		'<parent_code>' + a.category_code_value + '</parent_code>'
		as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'CC'
			and a.type_code_value like  @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'CALLTYPE_DESC')
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
		return
	end
	
	if (@p_lov_code_type = 'CALLTYPE_LIST')
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
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'CC'
			and a.category_code_value = @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'CATEGORYTYPELINK_DESC')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'CATGTYPELINK'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'CATGTYPELINK'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'CATGTYPELINK'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CATGTYPELINK'
		return
	end
	
	if (@p_lov_code_type = 'CATEGORYTYPELINK_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"category":"' + case(select a.code)
						when 'CC' then (select 'CALLCATG')
						when 'JC' then (select 'JOCATG')
						when 'FI' then (select 'FILECATG')
						when 'RC' then (select 'RESCATG')
						when 'EC' then (select 'EQUIPCATG')
					end + '",' +
				'"type":"' + case(select a.code)
						when 'CC' then (select 'CALLTYPE')
						when 'JC' then (select 'JOTYPE')
						when 'FI' then (select 'FILETYPE')
						when 'RC' then (select 'RESCODE')
						when 'EC' then (select 'EQUIPTYPE')
					end + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'CATGTYPELINK'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'CATGTYPELINK'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'CATGTYPELINK'
							and g.code = a.code)
					end) + '"' +
			'}'	as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CATGTYPELINK'		
		return
	end
	
	if ( @p_lov_code_type = 'CODETYPES' )
	begin
		select '' as value_list,
			'<code>' + code_type + '</code>' +
			'<description>' + isnull(description, '') + '</description>'
		as o_value_xml
		from code_type_properties
		where company_id = @i_client_id
			and country_code = @i_country_code
			and system_or_user_definable = 'U'
		return
	end	
	
	if (@p_lov_code_type = 'CODETYPES_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + code_type + '",' +
				'"description":"' + isnull(description, '') + '"' +
			'}'	as o_value_xml
		from code_type_properties
		where company_id = @i_client_id
			and country_code = @i_country_code
			and system_or_user_definable = 'U'
		return
	end
	
	if (@p_lov_code_type = 'CODETYPES_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code_type":"' + code_type + '",' +
				'"description":"' + isnull(description, '') + '",' +
				'"maxlength":"' + convert(varchar(10), code_value_max_allowed_size) + '"' +
			'}'	as o_value_xml
		from code_type_properties
		where company_id = @i_client_id
			and country_code = @i_country_code
			and system_or_user_definable = 'U'
		return
	end
	
	if (@p_lov_code_type = 'COMP_FEATURE_ACCESS_AUTH_LIST')
	begin
		select '' as value_list,
			'{' + 
				'"trans":"' + transaction_type_code + '",' +
				'"catg":"' + request_category + '",' +
				'"type":"' + request_type + '",' +
				'"feature":"' + feature_id + '",' +
				'"role_ind":"' + role_ind + '",' +
				'"role_id":"' + role_id + '",' +
				'"allow_rest_ind":"' + allow_restrict_ind + '"' +
			'}' as o_value_xml
		from company_feature_access_authorisation
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	if (@p_lov_code_type = 'COMPANY_FEATURE_ACCESS_ORDER_LIST') 
	begin
		select '' as value_list,
			'{' + 
				'"txn_type":"' + transaction_type_code + '",' +
				'"req_catg":"' + request_category + '",' +
				'"req_type":"' + request_type + '",' +
				'"req_stage":"' + convert(varchar(1), request_wf_stage_no) + '",' +
				'"req_status":"' + request_wf_status + '",' +
				'"from_feature_id":"' + current_feature_id + '",' +
				'"to_feature_id":"' + next_feature_id + '"' +
			'}'
		as o_value_xml
		from company_feature_access_order
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	if ( @p_lov_code_type = 'COMPANYLOCATION')
	begin
		select '' as value_list,
			'<code>' + 'ALL' + '</code>' +
			'<description>' + 'ALL' + '</description>' +
			'<parent_code>' + 'ALL' + '</parent_code>' as o_value_xml
		union all
		select '' as value_list,
			'<code>' + location_code + '</code>' +
			'<description>' + address_line_1 + ' - ' + city + '</description>' +
			'<parent_code>' + company_id + '</parent_code>'
		as o_value_xml
		from company_location
		where company_id = @i_client_id
			and country_code = @i_country_code
			and location_code like  @p_search_field_1
			
		return
	end
	
	if (@p_lov_code_type = 'COMPANYLOCATION_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + location_code + '",' +
				'"description":"' + address_line_1 + ' - ' + city + '"' +
			'}'	as o_value_xml
		from company_location
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	if (@p_lov_code_type = 'COMPANYLOCATION_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + location_code + '",' +
				'"description":"' + location_name_short + '"' +
			'}' as o_value_xml
		from company_location
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	if (@p_lov_code_type = 'COMPANY_FEATURE_INFO')
	begin
		select '' as value_list,
			'{' +
				'"item_variant_ind":"' + cast(item_variant_appl_ind as varchar(1)) + '",' +
				'"lot_batch_ind":"' + cast(inventory_lot_batch_no_appl_ind as varchar(1))+ '",' +
				'"expiry_date_ind":"' + cast(inventory_expiry_date_appl_ind as varchar(1)) + '",' +
				'"itemlevel_tax_ind":"' + cast(salesinvoicing_itemlevel_tax_appl_ind as  varchar(1)) + '"' +
			'}' as o_value_xml
		from company_configuration
		where company_id	= @i_client_id
		and   country_code  = @i_country_code
		return
	end


	if ( @p_lov_code_type = 'COUNTRY') 
	begin
		select '' as value_list,
			'<code>' + country_code + '</code>' +
			'<description>' + country_name + '</description>'
		as o_value_xml
		from country
		where country_code like @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'COUNTRY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + country_code + '",' +
				'"description":"' + country_name + '"' +
			'}'	as o_value_xml
		from country
		return
	end
	
	
	
	if ( @p_lov_code_type = 'CURRENCYCODE' )
	begin
		select '' as value_list,
			'<code>' + currency_code + '</code>' +
			'<description>' + description + '</description>'
		as o_value_xml
		from currency_code
		where currency_code like @p_search_field_1
		return
	end

	if (@p_lov_code_type = 'CURRENCYCODE_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + currency_code + '",' +
				'"description":"' + description + '"' +
			'}'	as o_value_xml
		from currency_code
		return
	end
	
	if (@p_lov_code_type = 'CURRENCYCODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + currency_code + '",' +
				'"description":"' + description + '"' +
			'}' as o_value_xml
		from currency_code
		return
	end
	

	if ( @p_lov_code_type = 'CUSTOMERLOCATION_LIST_LINKED') 
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
				( select '"state_desc":"' + ISNULL(s.state,'')
				  from state s
				  where a.company_id			= @i_client_id
				   and  s.country_code			= @i_country_code
				   and  s.state_code			= a.state_code
				   ) + '",' +
				'"country":"' + isnull(a.country_code,'') + '",' +
				(select '"country_desc":"' + ISNULL(c.country_name,'')
				  from country c
				  where a.company_id			= @i_client_id
				   and  c.country_code			= @i_country_code
				   and  c.country_code			= a.country_code 
				   ) + '",' +
				'"pincode":"' + isnull(a.pincode,'') + '"' +
			'}' as o_value_xml
		from customer_location a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.customer_id = @p_search_field_1
		return
	end

	
	
	if (@p_lov_code_type = 'CUST_SRCH_ON_ASST_AND_EQPT')
	begin  
		if (@p_search_field_1 != 'ZZZ' and @p_search_field_1 != '%')
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
						and b.asset_id = @p_search_field_1
					)
		end
		else if (@p_search_field_2 != 'ZZZ' and @p_search_field_2 != '%')
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
						and b.equipment_id = @p_search_field_2
					)
				and (
					a.customer_id like '%' + @p_search_field_3 + '%'
					or a.customer_name like '%' + @p_search_field_3 + '%'
					)
		end
		else
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
				and (
					a.customer_id like '%' + @p_search_field_3 + '%'
					or a.customer_name like '%' + @p_search_field_3 + '%'
					)
		end
		return
	end
	
	if ( @p_lov_code_type = 'CUSTOMER' ) 
	begin
		select '' as value_list,
			'<code>' + customer_id + '</code>' +
			'<description>' + customer_name + '</description>'
		as o_value_xml
		from customer
		where company_id = @i_client_id
			and country_code = @i_country_code
			and customer_id like  @p_search_field_1
		union all
		select '' as value_list,
			'<code>' + 'ZZZ' + '</code>' +
			'<description>' + 'ZZZ' + '</description>' +
			'<parent_code>' + 'ZZZ' + '</parent_code>'
		as o_value_xml
		return
	end
	
	if (@p_lov_code_type = 'CUSTOMERCITY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + city + '",' +
				'"description":"' + city + '"' +
			'}' as o_value_xml
		from customer_location
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	if ( @p_lov_code_type = 'CUSTOMERLOCATION') 
	begin
		select '' as value_list,
			'<code>' + location_code + '</code>' +
			'<description>' + address_line_1 + ' - ' + city + '</description>' +
			'<parent_code>' + customer_id + '</parent_code>'
		as o_value_xml
		from customer_location
		where company_id = @i_client_id
			and country_code = @i_country_code
			and location_code like  @p_search_field_1
			and customer_id like  @p_search_field_2
		return
	end
	
	if (@p_lov_code_type = 'CUSTOMER_LIST_SEARCH_W_ZZZ')
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
			and (customer_id like '%' + @p_search_field_1 + '%' 
				or customer_name like '%' + @p_search_field_1 + '%')
		return
	end
	
	if (@p_lov_code_type = 'CUSTOMER_LIST_SEARCH_WO_ZZZ')
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
			and (customer_id like '%' + @p_search_field_1 + '%' 
				or customer_name like '%' + @p_search_field_1 + '%')
		return
	end
	
	if (@p_lov_code_type = 'CUSTOMER_LIST_W_ZZZ')
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
		return
	end
	
	if (@p_lov_code_type = 'CUSTOMER_LIST_WO_ZZZ')
	begin
		select '' as value_list,
		   '{' + 
			   '"id":"'+customer_id+'",'+
			   '"name":"'+customer_name+'"'+
		   '}' as o_value_xml
		from customer
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end	
	
	if (@p_lov_code_type = 'CUSTOMERSTATE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.state_code + '",' +
				'"description":"' + b.state + '"' +
			'}' as o_value_xml
		from customer_location a, state b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.country_code = b.country_code
			and a.state_code = b.state_code
		return
	end
	
	if (@p_lov_code_type = 'DAPACCESSCODE_LIST')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'DPRF_ACCCD'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'DPRF_ACCCD'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'DPRF_ACCCD'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'DPRF_ACCCD'
		return
	end
	
	if (@p_lov_code_type = 'DAPCATEGORY_LIST')
	begin
		if(@p_search_field_1 = 'APPROVE-CALL')
		begin
			select '' as value_list,
				'{'+
					'"code":"' + a.code + '",' +
					'"description":"' + 
						(case (select 1 from code_table_mlingual_translation f
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
						end) + '"' +
				'}' as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'CALLCATG'
		end
		return
	end
	
	if (@p_lov_code_type = 'DAPIDTYPE_LIST')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'DAPIDTYPE'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'DAPIDTYPE'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'DAPIDTYPE'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'DAPIDTYPE'
		return
	end
	
	if (@p_lov_code_type = 'DAPIDVALUE_LIST')
	begin
		if(@p_search_field_1 = 'OR')
		begin
			if (@p_search_field_2 = '1')
			begin
				select '' as value_list,
					'{' +
						'"code":"' + level1_code + '",' +
						'"description":"' + level1_code_description + '"' +
					'}' as o_value_xml
					from level1_code
					where company_id = @i_client_id
						and country_code = @i_country_code
			end
			else if (@p_search_field_2 = '2')
			begin
				select '' as value_list,
					'{' +
						'"code":"' + level2_code + '",' +
						'"description":"' + level2_code_description + '"' +
					'}' as o_value_xml
					from level2_code
					where company_id = @i_client_id
						and country_code = @i_country_code
			end
			else if (@p_search_field_2 = '3')
			begin
				select '' as value_list,
					'{' +
						'"code":"' + level3_code + '",' +
						'"description":"' + level3_code_description + '"' +
					'}' as o_value_xml
					from level3_code
					where company_id = @i_client_id
						and country_code = @i_country_code
			end
			else if (@p_search_field_2 = '4')
			begin
				select '' as value_list,
					'{' +
						'"code":"' + level4_code + '",' +
						'"description":"' + level4_code_description + '"' +
					'}' as o_value_xml
					from level4_code
					where company_id = @i_client_id
						and country_code = @i_country_code
			end
			else if (@p_search_field_2 = '5')
			begin
				select '' as value_list,
					'{' +
						'"code":"' + level5_code + '",' +
						'"description":"' + level5_code_description + '"' +
					'}' as o_value_xml
					from level5_code
					where company_id = @i_client_id
						and country_code = @i_country_code
			end
			else
			begin
				select '' as value_list,
					'' as o_value_xml
				where 1 = 2
			end
		end
		else if(@p_search_field_1 = 'EI')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + employee_id + '",' +
					'"description":"' + title + '.' + first_name + ' ' + ISNULL(middle_name, '') + ' ' + last_name + '"' +
				'}'	as o_value_xml
			from employee
			where company_id = @i_client_id
				and country_code = @i_country_code	
		end
		else if(@p_search_field_1 = 'FR')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + functional_role_id + '",' +
					'"description":"' + role_description + '"' +
				'}' as o_value_xml
			from functional_role
			where company_id = @i_client_id 
				and country_code = @i_country_code	
		end
		return
	end
	
	if (@p_lov_code_type = 'DAPORGLEVELCODE_LIST') 
	begin
		if(@p_search_field_1 = '1')
		begin
			select '' as value_list,
				'{' + 
					'"code":"' + level1_code + '",' +
					'"description":"' + level1_code_description + '"' +
				'}'
			as o_value_xml
			from level1_code
			where company_id = @i_client_id
				and country_code = @i_country_code
		end
		else if(@p_search_field_1 = '2')
		begin
			select '' as value_list,
				'{' + 
					'"code":"' + level2_code + '",' +
					'"description":"' + level2_code_description + '"' +
				'}'
			as o_value_xml
			from level2_code
			where company_id = @i_client_id
				and country_code = @i_country_code
				and level1_code = @p_search_field_2
		end
		else if(@p_search_field_1 = '3')
		begin
			select '' as value_list,
				'{' + 
					'"code":"' + level3_code + '",' +
					'"description":"' + level3_code_description + '"' +
				'}'
			as o_value_xml
			from level3_code
			where company_id = @i_client_id
				and country_code = @i_country_code
				and level1_code = @p_search_field_2
				and level2_code = @p_search_field_3
		end
		else if(@p_search_field_1 = '4')
		begin
			select '' as value_list,
				'{' + 
					'"code":"' + level4_code + '",' +
					'"description":"' + level4_code_description + '"' +
				'}'
			as o_value_xml
			from level4_code
			where company_id = @i_client_id
				and country_code = @i_country_code
				and level1_code = @p_search_field_2
				and level2_code = @p_search_field_3
				and level3_code = @p_search_field_4
		end
		else if(@p_search_field_1 = '5')
		begin
			select '' as value_list,
				'{' + 
					'"code":"' + level5_code + '",' +
					'"description":"' + level5_code_description + '"' +
				'}'
			as o_value_xml
			from level5_code
			where company_id = @i_client_id
				and country_code = @i_country_code
				and level1_code = @p_search_field_2
				and level2_code = @p_search_field_3
				and level3_code = @p_search_field_4
				and level4_code = @p_search_field_5
		end
		return
	end
	
	if (@p_lov_code_type = 'DAPTYPE_LIST')
	begin
		if(@p_search_field_1 = 'APPROVE-CALL')
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
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'CC'
			and a.category_code_value = @p_search_field_2
		end
		return
	end
	
	if (@p_lov_code_type = 'DATEDISPLAYFORMAT_DESC')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'DTDISPFORMAT'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'DTDISPFORMAT'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'DTDISPFORMAT'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'DTDISPFORMAT'
		return
	end
	
	if (@p_lov_code_type = 'DATEDISPLAYFORMAT_LIST')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'DTDISPFORMAT'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'DTDISPFORMAT'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'DTDISPFORMAT'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'DTDISPFORMAT'
		return
	end
	
	
	if (@p_lov_code_type = 'DEALER_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + dealer_id + '",' +
				'"description":"' + dealer_name_short + '"' +
			'}' as o_value_xml
		from dealer_master	
		where company_id = @i_client_id
			and country_code = @i_country_code
			and (dealer_id like '%' + @p_search_field_1 + '%' 
				or dealer_name_short like '%' + @p_search_field_1 + '%')

		return	
	end

	if (@p_lov_code_type = 'UDAP_LOV_DEALER_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + dom.organogram_level_code + '",' +
				'"description":"' + dom.organogram_level_code + '"' +
			'}' as o_value_xml
		from  vu_dap_dealer vdd, dealer_organogram_mapping dom
		where vdd.company_id = @i_client_id
			and vdd.country_code = @i_country_code
			and vdd.company_id=dom.company_id
			and vdd.country_code=dom.country_code
			and vdd.session_id=@i_session_id
			and vdd.access_code_value1=dom.dealer_id
        union
		select distinct '' as value_list,
			'{' +
				'"code":"' + 'NA' + '",' +
				'"description":"' + 'NA' + '"' +
			'}' as o_value_xml
		return	
	end
	
	if (@p_lov_code_type = 'DEALERCODE_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + dealer_id + '",' +
				'"description":"' + dealer_name_short + '"' +
			'}'	as o_value_xml
		from dealer_master
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	if (@p_lov_code_type = 'DEVICEPLATFORM_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'DEVICEPLATFORM'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'DEVICEPLATFORM'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'DEVICEPLATFORM'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'DEVICEPLATFORM'
		return
	end
	if (@p_lov_code_type = 'DESPATCHMODE_LIST')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.code + '",' +
					'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'DESPATCHMODE',a.code)+ '"' +
				'}' as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'DESPATCHMODE'
			return
		end
	
	if (@p_lov_code_type = 'DISTRICTCODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.district_code + '",' +
				'"description":"' + ISNULL(a.district_name, '') + '"' +
			'}' as o_value_xml
		from district_master a		
		where a.country_code = @p_search_field_1
			and a.state_code = @p_search_field_2
		return
	end
	
	if (@p_lov_code_type = 'DOCUMENTSTORE_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + ISNULL(file_id, '') + '",' +
				'"description":"' + file_name + '"' +
			'}'	as o_value_xml
		from document_store
		where company_id = @i_client_id
			and country_code = @i_country_code
			and file_category = @p_search_field_1
			and file_type = @p_search_field_2
		return
	end
	
	if ( @p_lov_code_type = 'EMPLOYEE' )
	begin
		select '' as value_list,
			'<code>' + employee_id + '</code>' +
			'<description>' +
				title + '.' + first_name + ' ' + ISNULL(middle_name, '') + ' ' + last_name +
			'</description>'
		as o_value_xml
		from employee
		where company_id = @i_client_id
			and country_code  = @i_country_code
			and employee_id like @p_search_field_1
		return
	end	

	if (@p_lov_code_type = 'EMPLOYEE_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + employee_id + '",' +
				'"description":"' + title + '.' + first_name + ' ' + ISNULL(middle_name, '') + ' ' + last_name + '"' +
			'}'	as o_value_xml
		from employee
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	if (@p_lov_code_type = 'EMPLOYEE_LASTACCESS_INFO_LIST') 
	begin
		select '' as value_list,
			'{' + 
				'"txn_ind":"' + last_accessed_txn_ind + '",' +
				'"txn_ref_no":"' + last_accessed_txn_ref_no + '",' +
				'"txn_sub_ref_no":"' + CAST(last_accessed_txn_subref_no as varchar(5)) + '",' +
				'"feature_id":"' + last_accessed_feature_id + '",' +
				'"allow_newtxn_ind":"' + (
					case (allow_newtxn_ind) 
					when 1 then 'true' 
					else 'false' end
				) + '",' +
				'"channel_id":"' + last_accessed_channel_id + '",' +
				'"date":"' + CONVERT(varchar(10), last_accessed_datetime, 120) + '",' +
				'"hour":"' + substring(CONVERT(varchar(10), last_accessed_datetime, 108), 1, 2) + '",' +
				'"minute":"' + substring(CONVERT(varchar(10), last_accessed_datetime, 108), 4, 2) + '",' +
				'"session_id":"' + last_accessed_session_id + '"' +
			'}'
		as o_value_xml
		from employee_lastaccess_info
		where company_id = @i_client_id
			and country_code = @i_country_code
			and employee_id = @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'EMPLOYEE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + employee_id + '",' +
				'"description":"' + title + '.' + first_name + ' ' + ISNULL(middle_name, '') + ' ' + last_name + '"' +
			'}'	as o_value_xml
		from employee
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	if (@p_lov_code_type = 'EMPLOYEE_PROFILE_INFO')
	begin
		declare @o_udf_char_1 bit,	@o_udf_char_2 bit,	@o_udf_char_3 bit,	@o_udf_char_4  bit,
			@o_udf_char_5 bit,	@o_udf_char_6 bit,	@o_udf_char_7 bit,	@o_udf_char_8  bit,
			@o_udf_char_9 bit,	@o_udf_char_10 bit,	
			@o_udf_bit_1 bit,	@o_udf_bit_2 bit,	@o_udf_bit_3 bit,	@o_udf_bit_4 bit,
			@o_udf_float_1 bit,	@o_udf_float_2 bit,	@o_udf_float_3 bit,	@o_udf_float_4 bit,
			@o_udf_date_1 bit,	@o_udf_date_2 bit,	@o_udf_date_3  bit,	@o_udf_date_4  bit,
			@o_udf_analysis_code1 bit,	@o_udf_analysis_code2 bit,	@o_udf_analysis_code3 bit,
			@o_udf_analysis_code4 bit

		execute sp_retrieve_applicable_udfs @i_client_id , @i_country_code ,  @i_session_id , 
			@i_user_id ,  @i_locale_id , 'EMPLOYEEMAST',@o_udf_char_1 OUTPUT,
			@o_udf_char_2 OUTPUT,@o_udf_char_3 OUTPUT,	@o_udf_char_4  OUTPUT,
				@o_udf_char_5 OUTPUT,@o_udf_char_6 OUTPUT,@o_udf_char_7 OUTPUT,	
				@o_udf_char_8  OUTPUT, @o_udf_char_9  OUTPUT, @o_udf_char_10  OUTPUT,
				@o_udf_bit_1 OUTPUT,@o_udf_bit_2 OUTPUT,@o_udf_bit_3 OUTPUT,
				@o_udf_bit_4 OUTPUT,@o_udf_float_1 OUTPUT,	@o_udf_float_2 OUTPUT,
				@o_udf_float_3 OUTPUT,	@o_udf_float_4 OUTPUT,	@o_udf_date_1 OUTPUT,
				@o_udf_date_2 OUTPUT,@o_udf_date_3 OUTPUT,	@o_udf_date_4 OUTPUT,
				@o_udf_analysis_code1 OUTPUT,	@o_udf_analysis_code2 OUTPUT,
				@o_udf_analysis_code3 OUTPUT,	@o_udf_analysis_code4 OUTPUT

		select '' as value_list,
			'{' +				
				(case @o_udf_char_1 when 1 then '"udf_char_1":"'+ISNULL(a.udf_char_1,'')+'",' else '' end)+
				(case @o_udf_char_2 when 1 then '"udf_char_2":"'+ISNULL(a.udf_char_2,'')+'",' else '' end)+
				(case @o_udf_char_3 when 1 then '"udf_char_3":"'+ISNULL(a.udf_char_3,'')+'",' else '' end)+
				(case @o_udf_char_4 when 1 then '"udf_char_4":"'+ISNULL(a.udf_char_4,'')+'",' else '' end)+
				(case @o_udf_bit_1 when 1 then '"udf_bit_1":"'+cast(ISNULL(a.udf_bit_1,0) as varchar(1))+'",' else '' end)+
				(case @o_udf_bit_2 when 1 then '"udf_bit_2":"'+cast(ISNULL(a.udf_bit_2,0) as varchar(1))+'",' else '' end)+
				(case @o_udf_bit_3 when 1 then '"udf_bit_3":"'+cast(ISNULL(a.udf_bit_3,0) as varchar(1))+'",' else '' end)+
				(case @o_udf_bit_4 when 1 then '"udf_bit_4":"'+cast(ISNULL(a.udf_bit_4,0) as varchar(1))+'",' else '' end)+
				(case @o_udf_float_1 when 1 then '"udf_float_1":"'+cast(ISNULL(a.udf_float_1,0) as varchar(14))+'",' else '' end)+
				(case @o_udf_float_2 when 1 then '"udf_float_2":"'+cast(ISNULL(a.udf_float_2,0) as varchar(14))+'",' else '' end)+
				(case @o_udf_float_3 when 1 then '"udf_float_3":"'+cast(ISNULL(a.udf_float_3,0) as varchar(14))+'",' else '' end)+
				(case @o_udf_float_4 when 1 then '"udf_float_4":"'+cast(ISNULL(a.udf_float_4,0) as varchar(14))+'",' else '' end)+
				(case @o_udf_date_1 when 1 then 
					'"udf_date_1":"'+isnull(convert(varchar(10), a.udf_date_1, 120),'')+'",'+
					'"udf_date_1_hour":"'+isnull(substring(CONVERT(varchar(10), a.udf_date_1, 108),1,2),'')+'",'+
					'"udf_date_1_minute":"'+isnull(substring(CONVERT(varchar(10), a.udf_date_1, 108),4,2),'')+'",'       
					else '' end)+
				(case @o_udf_date_2 when 1 then 
					'"udf_date_2":"'+isnull(convert(varchar(10), a.udf_date_2, 120),'')+'",'+
					'"udf_date_2_hour":"'+isnull(substring(CONVERT(varchar(10), a.udf_date_2, 108),1,2),'')+'",'+
					'"udf_date_2_minute":"'+isnull(substring(CONVERT(varchar(10), a.udf_date_2, 108),4,2),'')+'",'       
					else '' end)+
				(case @o_udf_date_3 when 1 then
					'"udf_date_3":"'+isnull(convert(varchar(10), a.udf_date_3, 120),'')+'",'+
					'"udf_date_3_hour":"'+isnull(substring(CONVERT(varchar(10), a.udf_date_3, 108),1,2),'')+'",'+
					'"udf_date_3_minute":"'+isnull(substring(CONVERT(varchar(10), a.udf_date_3, 108),4,2),'')+'",'       
					else '' end)+
				(case @o_udf_date_4 when 1 then 
					'"udf_date_4":"'+isnull(convert(varchar(10), a.udf_date_4, 120),'')+'",'+
					'"udf_date_4_hour":"'+isnull(substring(CONVERT(varchar(10), a.udf_date_4, 108),1,2),'')+'",'+
					'"udf_date_4_minute":"'+isnull(substring(CONVERT(varchar(10), a.udf_date_4, 108),4,2),'')+'",' 
					else '' end)+
				(case @o_udf_analysis_code1 when 1 then '"udf_analysis_code1":"'+ISNULL(a.udf_analysis_code1,'')+'",' else '' end)+
				(case @o_udf_analysis_code2 when 1 then '"udf_analysis_code2":"'+ISNULL(a.udf_analysis_code2,'')+'",' else '' end)+
				(case @o_udf_analysis_code3 when 1 then '"udf_analysis_code3":"'+ISNULL(a.udf_analysis_code3,'')+'",' else '' end)+
				(case @o_udf_analysis_code4 when 1 then '"udf_analysis_code4":"'+ISNULL(a.udf_analysis_code4,'')+'",' else '' end)+ 
				(isnull((
					select	'"mapped_to_func_role":"' + isnull(b.mapped_to_functional_role_id, '') + '",' +
							'"reporting_to_func_role":"' + isnull(b.reporting_to_functional_role_id, '') + '",' +
							'"mapped_to_emp_id":"' + isnull(b.mapped_to_employee_id, '') + '",' +
							'"reporting_to_emp_id":"' + isnull(b.reporting_to_employee_id, '') + '",' +
							'"functional_role_id":"' + isnull(b.functional_role_id, '') + '",' 
					from functional_role_employee b
					where b.company_id = a.company_id
						and b.country_code = a.country_code
						and b.employee_id = a.employee_id), 
					'"mapped_to_func_role":"",' +
					'"reporting_to_func_role":"",' +
					'"mapped_to_emp_id":"",' +
					'"reporting_to_emp_id":"",' +
					'"functional_role_id":"",' 
				)) +
				'"company_name":"' + c.company_name_short + '",' + 
				'"prev_mservice_version":"' + isnull((select isnull(app_version, '') from device_register
				where company_id = @i_client_id
				and country_code = @i_country_code
				and employee_id = @p_search_field_1), '') + '",' +
				'"location_fetch_interval_in_seconds":"' + isnull((select isnull(CONVERT(varchar(10), location_fetch_interval_in_seconds), '0') from company_configuration
				where company_id = @i_client_id
				and country_code = @i_country_code
				and employee_id = @p_search_field_1), '') + '"' +
			'}' as o_value_xml
		from employee a, company_master c
		where a.company_id = @i_client_id 
			and a.country_code = @i_country_code
			and a.employee_id = @p_search_field_1
			and c.company_id = a.company_id
			and c.ho_country_code = a.country_code
		return
	end
	if (@p_lov_code_type = 'EMPLOYEETITLE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EMPTITLE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EMPTITLE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EMPTITLE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EMPTITLE'
		return
	end
	
	if (@p_lov_code_type = 'EMPLOYEEWOUSERID_LIST')
	begin
		select '' as value_list,
			'{' +
				'"emp_id":"' + a.employee_id + '",' +
				'"emp_name":"' + a.title + ' ' + a.first_name + ' ' + isnull(a.middle_name, '') + ' ' + a.last_name + '",' +
				'"location":"' + a.location_code + '",' +
				'"address":"' + c.address_line_1 + ' - ' + city + '",' +
				'"photo_ref":"' + isnull(a.photo_reference, '') + '"' +
			'}'	as o_value_xml
		from employee a, company_location c
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.employee_id not in (
				select employee_id from users b
				where b.company_id = @i_client_id
					and b.country_code = @i_country_code
			)
			and a.company_id = c.company_id
			and a.country_code = c.country_code
			and a.location_code = c.location_code
		return
	end
	
	
	
	if (@p_lov_code_type = 'EQPT_SRCH_ON_ASST_AND_CUST')
	begin
		if (@p_search_field_1 != 'ZZZ' and @p_search_field_1 != '%')
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
						and b.asset_id = @p_search_field_1
					)
		end
		else if (@p_search_field_3 != 'ZZZ' and @p_search_field_3 != '%')
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
						and b.customer_id = @p_search_field_3
					)
				and (
					a.equipment_id like '%' + @p_search_field_2 + '%'
					or a.description like '%' + @p_search_field_2 + '%'
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
					a.equipment_id like '%' + @p_search_field_2 + '%'
					or a.description like '%' + @p_search_field_2 + '%'
					)
		end
		return
	end
	
	if ( @p_lov_code_type = 'EQUIPMENT')
	begin
		select '' as value_list,
			'<code>' + a.equipment_id + '</code>'+
			'<description>' + a.description + '</description>'
		as o_value_xml
		from equipment a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.equipment_id like  @p_search_field_1
			
		union all
		select '' as value_list,
			'<code>' + 'ZZZ' + '</code>' +
			'<description>' + 'ZZZ' + '</description>'
		as o_value_xml
		return
	end
	
	if (@p_lov_code_type = 'EQUIPMENTCONTRACTTYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EQCONTRACTTYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EQCONTRACTTYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EQCONTRACTTYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EQCONTRACTTYPE'
		return
	end
	
	if (@p_lov_code_type = 'EQUIPMENT_LIST_SEARCH_W_ZZZ')
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
			   '"id":"'+equipment_id+'",'+
			   '"desc":"'+description+'",'+
			   '"org_no":"'+convert(varchar(1), servicing_org_level_no)+'",'+
			   '"org_code":"'+servicing_org_level_code+'"'+
		   '}' as o_value_xml
		from equipment
		where company_id = @i_client_id
			and country_code = @i_country_code
			and (equipment_id like '%' + @p_search_field_1 + '%' 
				or description like '%' + @p_search_field_1 + '%')
		return
	end
	
	if (@p_lov_code_type = 'EQUIPMENT_LIST_SEARCH_WO_ZZZ')
	begin
		select '' as value_list,
		   '{' + 
			   '"id":"'+equipment_id+'",'+
			   '"desc":"'+description+'",'+
			   '"org_no":"'+convert(varchar(1), servicing_org_level_no)+'",'+
			   '"org_code":"'+servicing_org_level_code+'"'+
		   '}' as o_value_xml
		from equipment
		where company_id = @i_client_id
			and country_code = @i_country_code
			and (equipment_id like '%' + @p_search_field_1 + '%' 
				or description like '%' + @p_search_field_1 + '%')
		return
	end
	
	if (@p_lov_code_type = 'EQUIPMENTCATEGORY_LIST')
	begin
		select '' as value_list,
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
		return
	end
	
	if (@p_lov_code_type = 'EQUIPMENTTYPE_LIST')
	begin
		select '' as value_list,
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
		return
	end
	
	if (@p_lov_code_type = 'EQUIPMENTTYPE_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'EQUIPTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'EQUIPTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'EQUIPTYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'EC'
			and a.category_code_value = @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'EXPENSE_ALLOWED_EVENTVERB_LIST') 
	begin
	
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>'+eventverb_id+'</event_verb>'
		as o_value_xml
		from workflow_eventverb_list
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and transaction_type_code = 'EXPENSE'
		  and cast(request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and cast(from_workflow_stage as varchar(3)) like 
			case @p_search_field_3 when 'ALL' then '%' else @p_search_field_3 end
		  and from_status like 			
			case @p_search_field_4 when 'ALL' then '%' else @p_search_field_4 end
		union all
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>STATUSCHANGE</event_verb>'
		as o_value_xml
		from workflow_status_link b
		where b.company_id = @i_client_id
		  and b.country_code = @i_country_code
		  and b.transaction_type_code = 'EXPENSE'
		  and cast(b.request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(b.request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and b.request_category+b.request_type+cast(b.from_workflow_stage as varchar(3))+b.from_status+
							cast(b.to_workflow_stage as varchar(3))+b.to_status 
					  not in ( select c.request_category+c.request_type+
									  cast(c.from_workflow_stage as varchar(3))+c.from_status+
									  cast(c.to_workflow_stage as varchar(3))+c.to_status
							   from workflow_eventverb_list c
							   where c.company_id = @i_client_id
							     and c.country_code = @i_country_code
							     and c.transaction_type_code = 'EXPENSE'
								 and cast(c.request_category as varchar(10)) like 
									case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
								 and cast(c.request_type as varchar(10)) like 
									 case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  						)					
		return
	end
	
	if (@p_lov_code_type = 'EXPENSE_STATUSCHANGE_REASONCODES')
	begin
		if @p_search_field_1 != 'STATUSCHANGE'
		begin		
			select '' as value_list,
				'<code>' + a.code + '</code>' +
				'<description>' + 
					(case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EXP' + @p_search_field_1+'REASCD'
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = 'EXP' + @p_search_field_1+'REASCD'
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EXP' + @p_search_field_1+'REASCD'
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'EXP' + @p_search_field_1+'REASCD'
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
							and f.code_type = 'EXPSCHNGREASCD_'+@p_search_field_2+@p_search_field_3
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = 'EXPSCHNGREASCD_'+@p_search_field_2+@p_search_field_3
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EXPSCHNGREASCD_'+@p_search_field_2+@p_search_field_3
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'EXPSCHNGREASCD_'+@p_search_field_2+@p_search_field_3
		end
		return		
	end

	if (@p_lov_code_type = 'PWCLAIM_STATUSCHANGE_REASONCODES')
	begin
		if @p_search_field_1 != 'STATUSCHANGE'
		begin		
			select '' as value_list,
				'<code>' + a.code + '</code>' +
				'<description>' + 
					(case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = @p_search_field_1+'REASCD'
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = @p_search_field_1+'REASCD'
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = @p_search_field_1+'REASCD'
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = @p_search_field_1+'REASCD'
		end
		return		
	end
	
	if (@p_lov_code_type = 'EXPENSECATEGORY_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EXPCATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EXPCATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EXPCATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EXPCATG'
		return
	end
	
	if (@p_lov_code_type = 'EXPENSECATEGORY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EXPCATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EXPCATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EXPCATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EXPCATG'
		return
	end
	
	if (@p_lov_code_type = 'EXPENSEHEADCODE_DESC')
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
		return
	end
	
	if (@p_lov_code_type = 'EXPENSEHEADCODE_LIST')
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
		return
	end
	
	if (@p_lov_code_type = 'EXPENSESTATUS_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EXPSTATUS'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EXPSTATUS'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EXPSTATUS'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EXPSTATUS'
		return
	end
	
	if (@p_lov_code_type = 'EXPENSESTATUS_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EXPSTATUS'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EXPSTATUS'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EXPSTATUS'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EXPSTATUS'
		return
	end
	
	if (@p_lov_code_type = 'EXPENSETYPE_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EXPTYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EXPTYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EXPTYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EXPTYPE'
		return
	end
	
	if (@p_lov_code_type = 'EXPENSETYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EXPTYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EXPTYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EXPTYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EXPTYPE'
		return
	end
	
	if (@p_lov_code_type = 'EXPENSETYPE_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'EXPTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'EXPTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'EXPTYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'EX'
			and a.category_code_value = @p_search_field_1
		return
	end

	
	if (@p_lov_code_type = 'FILECATEGORY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'FILECATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'FILECATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'FILECATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'FILECATG'
		return
	end
	
	if (@p_lov_code_type = 'FILEEXTNALLOWED')
	begin			
		select '' as value_list,
		'<code>'+a.type_code_value+'</code>'+
		'<description>' + 
			(case (select 1 from code_table_mlingual_translation f
				where f.company_id = @i_client_id
					and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'FILEEXTNALLOWED'
					and f.code = a.type_code_value)
			when 1 then
				(select e.short_description from code_table_mlingual_translation e
				where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'FILEEXTNALLOWED'
					and e.code = a.type_code_value)
			else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'FILEEXTNALLOWED'
					and g.code = a.type_code_value)
			end)
		+ '</description>' +
		'<parent_code>' + a.category_code_value + '</parent_code>'
		as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'FA'
		return
	end
	
	if (@p_lov_code_type = 'FILESIZEALLOWED')
	begin			
		select '' as value_list,
		'<code>'+a.type_code_value+'</code>'+
		'<description>' + 
			(case (select 1 from code_table_mlingual_translation f
				where f.company_id = @i_client_id
					and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'FILESIZE'
					and f.code = a.type_code_value)
			when 1 then
				(select e.short_description from code_table_mlingual_translation e
				where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'FILESIZE'
					and e.code = a.type_code_value)
			else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'FILESIZE'
					and g.code = a.type_code_value)
			end)
		+ '</description>' +
		'<parent_code>' + a.category_code_value + '</parent_code>'
		as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'FS'
		return
	end
	
	if (@p_lov_code_type = 'FILETYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'FILETYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'FILETYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'FILETYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'FILETYPE'
		return
	end
	
	if (@p_lov_code_type = 'FILETYPE_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'FILETYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'FILETYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'FILETYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'FI'
			and a.category_code_value = @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'FUNCROLE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + functional_role_id + '",' +
				'"description":"' + role_description + '"' +
			'}' as o_value_xml
		from functional_role
		where company_id = @i_client_id 
			and country_code = @i_country_code
		return
	end
	
	if (@p_lov_code_type = 'FUNCROLEEMPLOYEE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.employee_id + '",' +
				'"description":"' + b.title + ' ' + b.first_name + ' ' + ISNULL(b.middle_name,'') + ' ' + b.last_name + '"' +
			'}' as o_value_xml
		from functional_role_employee a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.functional_role_id = @p_search_field_1
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.employee_id = b.employee_id
		return	
	end
	
	if ( @p_lov_code_type = 'FUNCROLELIST')
	begin
		select '' as value_list,
			'<code>' + functional_role_id + '</code>'+
			'<description>' + role_description + '</description>'
		as o_value_xml
		from functional_role
		where company_id = @i_client_id
			and country_code = @i_country_code
			and functional_role_id like  @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'FUNCROLELIST_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + functional_role_id + '",' +
				'"description":"' + role_description + '"' +
			'}'	as o_value_xml
		from functional_role
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	if (@p_lov_code_type = 'FUNCTIONALROLE_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + functional_role_id + '",' +
				'"description":"' + role_description + '"' +
			'}'	as o_value_xml
		from functional_role
        where company_id = @i_client_id
			and country_code  = @i_country_code
		return
	end

	if ( @p_lov_code_type = 'GET_ITEM_UOM') 
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
			and a.item_code = @p_search_field_1
			and a.item_variant_code = @p_search_field_2
		return
	end
	
	if (@p_lov_code_type = 'GET_STANDARD_RATE')
	begin
		select '' as value_list,
			'{' + 
				'"std_rate":"' + CONVERT(varchar(14), a.std_rate) + '",' +
				'"currency_code":"' + a.currency_code + '"' +
			'}' as o_value_xml
		from item_rate a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.item_code = @p_search_field_1
			and a.item_variant_code = @p_search_field_2
			and a.uom_code = @p_search_field_3
	end
	
	if ( @p_lov_code_type = 'GET_PRODUCT_UOM' )
	begin
		if exists (select '*' from item_rate
			where company_id = @i_client_id
				and country_code = @i_country_code
				and item_code = @p_search_field_1 
				and item_variant_code = @p_search_field_2
			)
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
					'}'
				as o_value_xml
				from item_rate a
				where company_id = @i_client_id
					and country_code = @i_country_code
					and a.item_code = @p_search_field_1
					and a.item_variant_code = @p_search_field_2
			 end
			 else
			 begin
				select '' as value_list,
					'{' + 
						'"code":"' + b.uom_code + '",' +
						'"description":"' + 
							case (select 1 from code_table_mlingual_translation f
									where f.company_id = @i_client_id
										and f.country_code = @i_country_code
										and f.locale_id = @i_locale_id
										and f.code_type = 'PRODUCTUOM'
										and f.code = b.uom_code)
							when 1 then
								(select e.short_description from code_table_mlingual_translation e
									where e.company_id = @i_client_id
									and e.country_code = @i_country_code
									and e.locale_id = @i_locale_id
									and e.code_type = 'PRODUCTUOM'
									and e.code = b.uom_code)
							else
								(select g.short_description from code_table_mlingual_translation g
									where g.company_id = @i_client_id
									and g.country_code = @i_country_code
									and g.locale_id = 'ALL'
									and g.code_type = 'PRODUCTUOM'
									and g.code = b.uom_code)
							end + '"' +
					'}'
				as o_value_xml
				from offer_master b
				where company_id = @i_client_id
					and country_code = @i_country_code
					and b.product_code = @p_search_field_1
					and @p_search_field_2 = 'NA'
			 end
		return
	end	
	
	if ( @p_lov_code_type = 'GET_PRODUCT_RATE_ACTION' )
	begin
		if exists (select '*' from item_rate
			where company_id = @i_client_id
				and country_code = @i_country_code
				and item_code = @p_search_field_1 
				and item_variant_code = @p_search_field_2
				and uom_code = @p_search_field_3
			)
			begin
				select '' as value_list,
					'{' + 
						'"std_rate":"' + CONVERT(varchar(14), a.std_rate) + '",' +
						'"currency_code":"' + a.currency_code + '",' +
						'"action_type":"' + 'PARTREQ' + '"' +
					'}'
				as o_value_xml
				from item_rate a
				where company_id = @i_client_id
					and country_code = @i_country_code
					and a.item_code = @p_search_field_1
					and a.item_variant_code = @p_search_field_2
					and a.uom_code = @p_search_field_3
			 end
			 else
			 begin
				select '' as value_list,
					'{' + 
						'"std_rate":"' + CONVERT(varchar(14), b.std_rate) + '",' +
						'"currency_code":"' + b.currency_code + '",' +
						'"action_type":"' + 'OFFER' + '"' +
					'}'
				as o_value_xml
				from offer_master b
				where company_id = @i_client_id
					and country_code = @i_country_code
					and b.product_code = @p_search_field_1
					and @p_search_field_2 = 'NA'
					and b.uom_code = @p_search_field_3
			 end
		return
	end	


	if (@p_lov_code_type = 'INVADJ_REASON')
	begin
		select '' as value_list,
				'<code>' + a.code + '</code>' +
				'<description>' + 
					(case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'INVADJREASON'
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = 'INVADJREASON'
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'INVADJREASON'
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'INVADJREASON'
		return		
	end
	
	if (@p_lov_code_type = 'INVENTORYADJ_TRANS_TYPE')
	begin
		select '' as value_list,
				'<code>' + a.code + '</code>' +
				'<description>' + 
					(case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'INVADJTYPE'
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = 'INVADJTYPE'
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'INVADJTYPE'
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'INVADJTYPE'
		return		
	end
	
	if (@p_lov_code_type = 'INVENTORYADJUSTMENTREASONCODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'INVADJREASON'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'INVADJREASON'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'INVADJREASON'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVADJREASON'
		return
	end
	
	if (@p_lov_code_type = 'INVENTORYADJUSTMENTTYPE_LIST')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'INVADJTYPE'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'INVADJTYPE'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'INVADJTYPE'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVADJTYPE'
		return
	end
	
	if (@p_lov_code_type = 'INVENTORYTRANSSTATUS_LIST')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'INVENTORY_TRANS_STATUS'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'INVENTORY_TRANS_STATUS'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'INVENTORY_TRANS_STATUS'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVENTORY_TRANS_STATUS'
		return		
	end
	
	if (@p_lov_code_type = 'INVOICE_ALLOWED_EVENTVERB_LIST') 
	begin
	
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>'+eventverb_id+'</event_verb>'
		as o_value_xml
		from workflow_eventverb_list
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and transaction_type_code = 'INVOICE'
		  and cast(request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and cast(from_workflow_stage as varchar(3)) like 
			case @p_search_field_3 when 'ALL' then '%' else @p_search_field_3 end
		  and from_status like 			
			case @p_search_field_4 when 'ALL' then '%' else @p_search_field_4 end
		union all
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>STATUSCHANGE</event_verb>'
		as o_value_xml
		from workflow_status_link b
		where b.company_id = @i_client_id
		  and b.country_code = @i_country_code
		  and b.transaction_type_code = 'INVOICE'
		  and cast(b.request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(b.request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and b.request_category+b.request_type+cast(b.from_workflow_stage as varchar(3))+b.from_status+
							cast(b.to_workflow_stage as varchar(3))+b.to_status 
					  not in ( select c.request_category+c.request_type+
									  cast(c.from_workflow_stage as varchar(3))+c.from_status+
									  cast(c.to_workflow_stage as varchar(3))+c.to_status
							   from workflow_eventverb_list c
							   where c.company_id = @i_client_id
							     and c.country_code = @i_country_code
							     and c.transaction_type_code = 'INVOICE'
								 and cast(c.request_category as varchar(10)) like 
									case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
								 and cast(c.request_type as varchar(10)) like 
									 case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  						)					
		return
	end
	
	if (@p_lov_code_type = 'INVOICE_STATUSCHANGE_REASONCODES') 
	begin
		if @p_search_field_1 != 'STATUSCHANGE'
		begin		
			select '' as value_list,
				'<code>' + a.code + '</code>' +
				'<description>' + 
					(case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'INV' + @p_search_field_1+'REASCD'
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = 'INV' + @p_search_field_1+'REASCD'
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'INV' + @p_search_field_1+'REASCD'
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'INV' + @p_search_field_1+'REASCD'
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
							and f.code_type = 'INVSCHNGREASCD_'+@p_search_field_2+@p_search_field_3
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = 'INVSCHNGREASCD_'+@p_search_field_2+@p_search_field_3
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'INVSCHNGREASCD_'+@p_search_field_2+@p_search_field_3
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'INVSCHNGREASCD_'+@p_search_field_2+@p_search_field_3
		end
		return		
	end
	
	if (@p_lov_code_type = 'INVOICECATEGORY_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'INVOICECATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'INVOICECATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'INVOICECATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVOICECATG'
		return
	end
	
	if (@p_lov_code_type = 'INVOICECATEGORY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'INVOICECATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'INVOICECATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'INVOICECATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVOICECATG'
		return
	end
	
	if (@p_lov_code_type = 'INVOICESTATUS_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'INVOICESTATUS'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'INVOICESTATUS'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'INVOICESTATUS'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVOICESTATUS'
		return
	end
	
	if (@p_lov_code_type = 'INVOICESTATUS_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'INVOICESTATUS'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'INVOICESTATUS'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'INVOICESTATUS'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVOICESTATUS'
		return
	end
	
	if (@p_lov_code_type = 'INVOICETYPE_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'INVOICETYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'INVOICETYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'INVOICETYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVOICETYPE'
		return
	end
	
	if (@p_lov_code_type = 'INVOICETYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'INVOICETYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'INVOICETYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'INVOICETYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVOICETYPE'
		return
	end
	
	if ( @p_lov_code_type = 'ITEMCODE' )
	begin
		select distinct '' as value_list,
			'<code>' + item_code + '</code>' +
			'<description>' + item_description + '</description>'
		as o_value_xml
		from item_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and item_code like @p_search_field_1	
		return
	end
	
	if ( @p_lov_code_type = 'ITEMCODE_LIST' )
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + item_code + '",' +
				'"description":"' + item_description + '"' +
			'}' as o_value_xml

		from item_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and (item_code like '%' + @p_search_field_1 + '%' 
				or item_description like '%' + @p_search_field_1 + '%')

		return
	end	
	


if ( @p_lov_code_type = 'ITEMCODE_CHARGE_LIST' )
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + 'OVERALL' + '",' +
				'"description":"' + 'OVERALL' + '"' +
			'}' as o_value_xml
		union all
		select distinct '' as value_list,
			'{' +

				'"code":"' + item_code + '",' +
				'"description":"' + item_description + '"' +
			'}' as o_value_xml
			
		from item_master
		where company_id = @i_client_id
			and country_code = @i_country_code


		return
	end


	if ( @p_lov_code_type = 'ITEMTYPE' )
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'ITEMTYPE'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'ITEMTYPE'
						and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'ITEMTYPE'
					and g.code = a.code)
				end)
			+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ITEMTYPE'
			and a.code like  @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'ITEMTYPE_DESC')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'ITEMTYPE'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'ITEMTYPE'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'ITEMTYPE'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ITEMTYPE'
		return
	end
	

	if (@p_lov_code_type = 'ITEMCATG_LIST')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' +dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ITEMCATG',a.code)  + '"' +	
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ITEMCATG'
		return
	end






















	if (@p_lov_code_type = 'ITEMTYPE_LIST')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'ITEMTYPE'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'ITEMTYPE'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'ITEMTYPE'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ITEMTYPE'
		return
	end
	




if (@p_lov_code_type = 'ITEMTYPE_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'ITEMTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'ITEMTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'ITEMTYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'IC'
			and a.category_code_value = @p_search_field_1
		return
	end




	if ( @p_lov_code_type = 'ITEMUOM' ) 
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'ITEMUOM'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'ITEMUOM'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'ITEMUOM'
						and g.code = a.code)
				end)
		+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ITEMUOM'
			and a.code like  @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'ITEMUOM_DESC')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'ITEMUOM'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'ITEMUOM'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'ITEMUOM'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ITEMUOM'
		return
	end
	
	if (@p_lov_code_type = 'ITEMUOM_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'ITEMUOM'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'ITEMUOM'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'ITEMUOM'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ITEMUOM'
		return
	end
	

	if (@p_lov_code_type = 'ITEMUOM_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + b.uom_code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ITEMUOM',b.uom_code) + '"' +
			'}' as o_value_xml
		from item_master a, item_rate b
		where a.company_id				= @i_client_id
		and a.country_code				= @i_country_code
		and a.item_code					= @p_search_field_1
		and a.item_variant_code         = @p_search_field_2
		and a.company_id				= b.company_id
		and a.country_code				= b.country_code
		and  a.item_code				= b.item_code
		and  a.item_variant_code		= b.item_variant_code
	
		return
	end



	if ( @p_lov_code_type = 'ITEMVARIANTCODE')
	begin




		select '' as value_list,
			'<code>' + item_variant_code + '</code>' +
			'<description>' + variant_description + '</description>' +
			'<parent_code>' + item_code + '</parent_code>'
		as o_value_xml
		from item_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and item_variant_code like  @p_search_field_1
			and item_code like  @p_search_field_2
		return
	end
	
	if ( @p_lov_code_type = 'ITEMVARIANTCODE_LIST' )
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + item_variant_code + '",' +
				'"description":"' + variant_description + '"' +
			'}' as o_value_xml
		from item_master
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end	
	
	if ( @p_lov_code_type = 'ITEMVARIANTCODE_LIST_LINKED' )
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
			and item_code = @p_search_field_1
		return
	end	
	

if ( @p_lov_code_type = 'ITEMVARIANTCODE_CHARGE_LIST_LINKED' )
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + 'OVERALL' + '",' +
				'"description":"' + 'OVERALL' + '"' +
			'}' as o_value_xml
		union all
		select '' as value_list,
			'{' +
				'"code":"' + item_variant_code + '",' +
				'"description":"' + variant_description + '"' +
			'}' as o_value_xml
		from item_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and item_code = @p_search_field_1
		return
	end	
	if ( @p_lov_code_type = 'ITEMVARIANTCODE_CHARGE_LIST_LINKED' )
	begin
		if @p_search_field_1 = 'OVERALL'
		begin
			select distinct '' as value_list,
				'{' +
					'"code":"' + 'OVERALL' + '",' +
					'"description":"' + 'OVERALL' + '"' +
				'}' as o_value_xml
		end
		else
		begin
			select '' as value_list,
				'{' +
					'"code":"' + item_variant_code + '",' +
					'"description":"' + variant_description + '"' +
				'}' as o_value_xml
			from item_master
			where company_id = @i_client_id
				and country_code = @i_country_code
				and item_code = @p_search_field_1
		end
		return
	end	




	if ( @p_lov_code_type = 'ITEVARIANTCODE' )
	begin
		select '' as value_list,
			'<code>' + item_variant_code + '</code>' +
			'<description>' + variant_description + '</description>'
		as o_value_xml
		from item_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and item_variant_code like  @p_search_field_1
			and item_code like  @p_search_field_2
			 
		return
	end	
	
	if ( @p_lov_code_type = 'JOASSIGNTOEMPLIST') 
	begin
		select '' as value_list,
			'<code>' + employee_id + '</code>' +
			'<description>' +
			title + '.' + first_name + ' ' + ISNULL(middle_name, '') + ' ' + last_name +
			'</description>'
		as o_value_xml
		from employee
		where company_id = @i_client_id
			and country_code  = @i_country_code
			and employee_id like  @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'JOCATEGORY' ) 
	begin
		select '' as value_list,
			'<code>' + 'ALL' + '</code>' +
			'<description>' + 'ALL' + '</description>' as o_value_xml
		union all
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'JOCATG'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'JOCATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'JOCATG'
						and g.code = a.code)
				end)
			+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'JOCATG'
			and a.code like  @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'JOMAPPEDTOEMPLIST')  
	begin
		select '' as value_list,
			'<code>' + employee_id + '</code>' +
			'<description>' +
			title + '.' + first_name + ' ' + ISNULL(middle_name, '') + ' ' + last_name +
			'</description>'
		as o_value_xml
		from employee
		where company_id = @i_client_id
			and country_code  = @i_country_code  
			and employee_id like  @p_search_field_1      
		return
	end
	
	if ( @p_lov_code_type = 'JOPRIORITY' )
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'JOPRIORITY'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'JOPRIORITY'
						and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'JOPRIORITY'
					and g.code = a.code)
				end)
			+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'JOPRIORITY'
			and a.code like  @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'JOREPOTOEMPLIST' ) 
	begin
		select '' as value_list,
			'<code>' + employee_id + '</code>' +
			'<description>' +
			title + '.' + first_name + ' ' + ISNULL(middle_name, '') + ' ' + last_name +
			'</description>'
		as o_value_xml
		from employee
		where company_id = @i_client_id
			and country_code  = @i_country_code
			and employee_id like  @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'JOSTATUS' )
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'JOSTATUS'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'JOSTATUS'
						and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'JOSTATUS'
					and g.code = a.code)
				end)
			+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'JOSTATUS'
			and a.code like  @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'JOTYPE' )
	begin
		select '' as value_list,
			'<code>' + 'ALL' + '</code>' +
			'<description>' + 'ALL' + '</description>' +
			'<parent_code>' + 'ALL' + '</parent_code>' as o_value_xml
		union all
		select '' as value_list,
		'<code>'+a.type_code_value+'</code>'+
		'<description>' + 
			(case (select 1 from code_table_mlingual_translation f
				where f.company_id = @i_client_id
					and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'JOTYPE'
					and f.code = a.type_code_value)
			when 1 then
				(select e.short_description from code_table_mlingual_translation e
				where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'JOTYPE'
					and e.code = a.type_code_value)
			else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'JOTYPE'
					and g.code = a.type_code_value)
			end)
		+ '</description>' +
		'<parent_code>' + a.category_code_value + '</parent_code>'
		as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'JC'
			and a.type_code_value like  @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'LAST_ACCESSED_CALL_STATUS_EVENT')
	begin		
		select '' as value_list,
			'{' + 
				'"eventverb":"' + feature_id + '"' +
			'}' as o_value_xml  
		from company_feature
		where company_id = @i_client_id
			and country_code = @i_country_code
			and channel_id = 'Mobile'
			and screen_id = (
				select top(1) (case(eventverb_id)
					when null then ''
					when 'Trip start' then 'trip_start'
					when 'Trip finish' then 'trip_finish'
					when 'PROGRESSUPDATE' then 'START'
					when 'REPLAN' then 'START'
					when 'RELEASEHOLD' then 'START'
					when 'REASSIGN' then 'START'
					else eventverb_id
					end)
				from call_status_event_log
				where company_id = @i_client_id
					and country_code = @i_country_code
					and call_ref_no = @p_search_field_1
				order by event_date desc
			)	
		return
	end
	
	if ( @p_lov_code_type = 'LOCALE' )
	begin
		select '' as value_list,
			'<code>' + locale_id + '</code>' +
			'<description>' + locale_name + '</description>'
		as o_value_xml
		from locale 
		where  locale_id like @p_search_field_1
		return
	end	
	
	if (@p_lov_code_type = 'LOCALE_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + locale_id + '",' +
				'"description":"' + locale_name + '"' +
			'}'	as o_value_xml
		from locale
		return
	end
	
	if (@p_lov_code_type = 'LOCALE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + locale_id + '",' +
				'"description":"' + locale_name + '"' +
			'}'	as o_value_xml
		from locale
		return
	end
	if (@p_lov_code_type = 'MY_TEAM_STATUS')
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
			(
				select isnull(
				(
					select 
						case (d.finish_hour)
							when 0 then 
								'"p_ind":"I",' +
								'"p_time":"' + convert(varchar(2), d.start_hour) + ':' + convert(varchar(2), d.start_minute) + '",'
							else 
								'"p_ind":"O",' + 








								'"p_time":"' + convert(varchar(2), d.finish_hour) + ':' + convert(varchar(2), d.finish_minute) + '",'




						end
					from timecard d 
					where d.company_id = a.company_id 
						and d.country_code = a.country_code 
						and d.employee_id = a.employee_id
						and convert(varchar(10), d.work_date, 120) = convert(varchar(10), sysdatetimeoffset(), 120)
				), '"p_ind":"", "p_time":"",')
			) +
			(
				select isnull(




				(
					select 
						'"l_txn_no":"' + e.last_accessed_txn_ref_no + '",' +
						'"l_ftr":"' + e.last_accessed_feature_id + '",' +
						'"l_date":"' + convert(varchar(10), e.last_accessed_datetime, 120) + '",' +
						'"l_hour":"' + substring(convert(varchar(10), e.last_accessed_datetime, 108), 1, 2) + '",' +
						'"l_min":"' + substring(convert(varchar(10), e.last_accessed_datetime, 108), 4, 2) + '",' +
						'"sts_ind":"' + 							
								case(e.allow_newtxn_ind)
									when 0 then
										case (e.last_accessed_feature_id)
											when 'MTRIPSTART' then 'T'
											else 'W'
										end
									else 'I'
								end							
						+ '",'

					from employee_lastaccess_info e 
					where e.company_id = a.company_id 
						and e.country_code = a.country_code 
						and e.employee_id = a.employee_id					
				), '"l_txn_no":"", "l_ftr":"", "l_date":"", "l_hour":"", "l_min":"", "sts_ind":"I",')
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
					and b.reporting_to_employee_id = @p_search_field_1
			)

	
		return
	end
	
	if (@p_lov_code_type = 'NOTIFYMODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'NOTIFYMODE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'NOTIFYMODE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'NOTIFYMODE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'NOTIFYMODE'
		return
	end
	
	if (@p_lov_code_type = 'NOTIFYTEMPLATE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.notification_template_id + '",' +
				'"description":"' + a.description + '"' +
			'}' as o_value_xml
		from company_notification_template_master a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
		return
	end
	
	if ( @p_lov_code_type = 'NRATTACHTYPE' ) 
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'NRATTACHTYPE'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'NRATTACHTYPE'
						and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'NRATTACHTYPE'
					and g.code = a.code)
				end)
			+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'NRATTACHTYPE'
			and a.code like @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'ORGHIERARCHY') 
	begin	
	
		select @p_noof_org_levels = organogram_noof_levels 
		from company_configuration
		where company_id = @i_client_id
		  and country_code = @i_country_code
		
		if @p_noof_org_levels = 1
		begin
		
			select '' as value_list,
				'<level1_code>' + level1_code + '</level1_code>' +
				'<level2_code>NA</level2_code>' +
				'<level3_code>NA</level3_code>' +
				'<level4_code></level4_code>' +
				'<level5_code></level5_code>'		
				 as o_value_xml
			FROM level1_code
			where company_id = @i_client_id
				and country_code = @i_country_code
		
		end
		else if @p_noof_org_levels = 2
		begin
		
			select '' as value_list,
				'<level1_code>' + level1_code + '</level1_code>' +
				'<level2_code>'+level2_code+'</level2_code>' +
				'<level3_code>NA</level3_code>' +
				'<level4_code></level4_code>' +
				'<level5_code></level5_code>'		
				 as o_value_xml
			FROM level2_code
			where company_id = @i_client_id
				and country_code = @i_country_code
		end
		else if @p_noof_org_levels = 3
		begin
		
			select '' as value_list,
				'<level1_code>' + level1_code + '</level1_code>' +
				'<level2_code>'+level2_code+'</level2_code>' +
				'<level3_code>'+ level3_code+'</level3_code>' +
				'<level4_code></level4_code>' +
				'<level5_code></level5_code>'		
				 as o_value_xml
			FROM level3_code
			where company_id = @i_client_id
				and country_code = @i_country_code
		end
		else if @p_noof_org_levels = 4
		begin
		
			select '' as value_list,
				'<level1_code>' + level1_code + '</level1_code>' +
				'<level2_code>'+level2_code+'</level2_code>' +
				'<level3_code>'+ level3_code+'</level3_code>' +
				'<level4_code>'+level4_code+'</level4_code>' +
				'<level5_code></level5_code>'		
				 as o_value_xml
			FROM level4_code
			where company_id = @i_client_id
				and country_code = @i_country_code
		end	
		else if @p_noof_org_levels = 4
		begin
		
			select '' as value_list,
				'<level1_code>' + level1_code + '</level1_code>' +
				'<level2_code>'+level2_code+'</level2_code>' +
				'<level3_code>'+ level3_code+'</level3_code>' +
				'<level4_code>'+level4_code+'</level4_code>' +
				'<level5_code>'+level5_code+'</level5_code>'		
				 as o_value_xml
			FROM level5_code
			where company_id = @i_client_id
				and country_code = @i_country_code
		end
		return	
	end
	
	if (@p_lov_code_type = 'ORGLEVELCODE')
	begin
		select '' as value_list,
			'<code>' + 'ALL' + '</code>' +
			'<level_no>' + 'ALL' + '</level_no>' +
			'<description>' + 'ALL' + '</description>' +
			'<parent_code></parent_code>' as o_value_xml
		union all
		select '' as value_list,
			'<code>' + level1_code + '</code>' +
			'<level_no>1</level_no>' +
			'<description>' + level1_code_description + '</description>' +
			'<parent_code></parent_code>' as o_value_xml
		FROM level1_code
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all   
		select '' as value_list,
			'<code>' + level2_code + '</code>' +
			'<level_no>2</level_no>' +
			'<description>' + level2_code_description + '</description>' +
			'<parent_code>' + level1_code + '</parent_code>' 
		as o_value_xml
		FROM level2_code
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all   
		select '' as value_list,
			'<code>' + level3_code + '</code>' +
			'<level_no>3</level_no>' +
			'<description>' + level3_code_description + '</description>' +
			'<parent_code>' + level2_code + '</parent_code>'
		as o_value_xml
		FROM level3_code
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all   
		select '' as value_list,
			'<code>' + level4_code + '</code>' +
			'<level_no>4</level_no>' +
			'<description>' + level4_code_description + '</description>' +
			'<parent_code>' + level3_code + '</parent_code>' 
		as o_value_xml
		FROM level4_code
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all   
		select '' as value_list,
			'<code>' + level5_code + '</code>' +
			'<level_no>5</level_no>' +
			'<description>' + level5_code_description + '</description>' +
			'<parent_code>' + level4_code + '</parent_code>' 
		as o_value_xml
		FROM level5_code
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	if (@p_lov_code_type = 'ORGLEVELCODE_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + level1_code + '",' +
				'"description":"' + level1_code_description + '",' +
				'"parentCode":"1"' +
			'}' as o_value_xml
		from level1_code
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all   
		select '' as value_list,
			'{' +
				'"code":"' + level2_code + '",' +
				'"description":"' + level2_code_description + '",' +
				'"parentCode":"2"' +
			'}' as o_value_xml
		from level2_code
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all   
		select '' as value_list,
			'{' +
				'"code":"' + level3_code + '",' +
				'"description":"' + level3_code_description + '",' +
				'"parentCode":"3"' +
			'}' as o_value_xml
		from level3_code
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all   
		select '' as value_list,
			'{' +
				'"code":"' + level4_code + '",' +
				'"description":"' + level4_code_description + '",' +
				'"parentCode":"4"' +
			'}' as o_value_xml
		from level4_code
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all   
		select '' as value_list,
			'{' +
				'"code":"' + level5_code + '",' +
				'"description":"' + level5_code_description + '",' +
				'"parentCode":"5"' +
			'}' as o_value_xml
		from level5_code
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	if (@p_lov_code_type = 'ORGLEVELCODE_LIST')
	begin
		if (@p_search_field_1 = '1')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + level1_code + '",' +
					'"description":"' + level1_code_description + '",' +
					'"level_no":"1"' +
				'}' as o_value_xml
				from level1_code
				where company_id = @i_client_id
					and country_code = @i_country_code
		end
		else if (@p_search_field_1 = '2')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + level2_code + '",' +
					'"description":"' + level2_code_description + '",' +
					'"level_no":"2"' +
				'}' as o_value_xml
				from level2_code
				where company_id = @i_client_id
					and country_code = @i_country_code
		end
		else if (@p_search_field_1 = '3')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + level3_code + '",' +
					'"description":"' + level3_code_description + '",' +
					'"level_no":"3"' +
				'}' as o_value_xml
				from level3_code
				where company_id = @i_client_id
					and country_code = @i_country_code
		end
		else if (@p_search_field_1 = '4')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + level4_code + '",' +
					'"description":"' + level4_code_description + '",' +
					'"level_no":"4"' +
				'}' as o_value_xml
				from level4_code
				where company_id = @i_client_id
					and country_code = @i_country_code
		end
		else if (@p_search_field_1 = '5')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + level5_code + '",' +
					'"description":"' + level5_code_description + '",' +
					'"level_no":"5"' +
				'}' as o_value_xml
				from level5_code
				where company_id = @i_client_id
					and country_code = @i_country_code
		end
		else
		begin
			select '' as value_list,
				'' as o_value_xml
			where 1 = 2
		end
		return
	end
	
	if (@p_lov_code_type = 'ORGLEVELNO')
	begin
		select '' as value_list,
			'<code>' + 'ALL' + '</code>' +
			'<description>' + 'ALL' + '</description>' as o_value_xml
		union all
		select '' as value_list,
			'<code>1</code>' +
			'<description>' +  isnull(level1_field_name ,'')+ '</description>' as o_value_xml
		from company_configuration
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all
		select '' as value_list,
			'<code>2</code>' +
			'<description>' +  isnull(level2_field_name,'') + '</description>' as o_value_xml
		from company_configuration
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all
		select '' as value_list,
			'<code>3</code>' +
			'<description>' +  isnull(level3_field_name,'') + '</description>' as o_value_xml
		from company_configuration
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all
		select '' as value_list,
			'<code>4</code>' +
			'<description>' +  isnull(level4_field_name ,'')+ '</description>' as o_value_xml
		from company_configuration
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all
		select '' as value_list,
			'<code>5</code>' +
			'<description>' + isnull(level5_field_name,'') + '</description>' as o_value_xml
		from company_configuration
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end	
	
	if (@p_lov_code_type = 'ORGLEVELNO_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"1",' +
				'"description":"' + isnull(level1_field_name, '') + '"' +
			'}' as o_value_xml
		from company_configuration
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all
		select '' as value_list,
			'{' +
				'"code":"2",' +
				'"description":"' + isnull(level2_field_name, '') + '"' +
			'}' as o_value_xml
		from company_configuration
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all
		select '' as value_list,
			'{' +
				'"code":"3",' +
				'"description":"' + isnull(level3_field_name, '') + '"' +
			'}' as o_value_xml
		from company_configuration
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all
		select '' as value_list,
			'{' +
				'"code":"4",' +
				'"description":"' + isnull(level4_field_name, '') + '"' +
			'}' as o_value_xml
		from company_configuration
		where company_id = @i_client_id
			and country_code = @i_country_code
		union all
		select '' as value_list,
			'{' +
				'"code":"5",' +
				'"description":"' + isnull(level5_field_name, '') + '"' +
			'}' as o_value_xml
		from company_configuration
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	if (@p_lov_code_type = 'ORGLEVELNO_LIST')
	begin
		declare @p_no_of_levels tinyint
		set @p_no_of_levels = 0

		create table #organogram_levels (
			level_id varchar(1),
			level_name nvarchar(30) null
		)
		
		select @p_no_of_levels = organogram_noof_levels
		from company_configuration 
		where company_id = @i_client_id
			and country_code = @i_country_code

		if (@p_no_of_levels >= 1)
			insert #organogram_levels
			select '1', isnull(level1_field_name, '')
			from company_configuration 
			where company_id = @i_client_id
				and country_code = @i_country_code

		if (@p_no_of_levels >= 2)
			insert #organogram_levels
			select '2', isnull(level2_field_name, '')
			from company_configuration 
			where company_id = @i_client_id
				and country_code = @i_country_code

		if (@p_no_of_levels >= 3)
			insert #organogram_levels
			select '3', isnull(level3_field_name, '')
			from company_configuration 
			where company_id = @i_client_id
				and country_code = @i_country_code

		if (@p_no_of_levels >= 4)
			insert #organogram_levels
			select '4', isnull(level4_field_name, '')
			from company_configuration 
			where company_id = @i_client_id
				and country_code = @i_country_code

		if (@p_no_of_levels >= 5)
			insert #organogram_levels
			select '5', isnull(level5_field_name, '')
			from company_configuration 
			where company_id = @i_client_id
				and country_code = @i_country_code
				
		select '' as value_list,
			'{' +
				'"code":"' + level_id + '",' +
				'"description":"' + level_name + '"' +
			'}' as o_value_xml
		from #organogram_levels
		return
	end
	if ( @p_lov_code_type = 'PRODUCTCODE_LIST' )
	begin
		select '' as value_list,
			'{' + 
				'"code":"' + item_code + '",' +
				'"description":"' + item_description + '"' +
			'}'
		as o_value_xml
		from item_master
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and (item_code like '%' + @p_search_field_1 + '%' 
				or item_description like '%' + @p_search_field_1 + '%')
		union all
		select '' as value_list,
			'{' + 
				'"code":"' + product_code + '",' +
				'"description":"' + product_description + '"' +
			'}'
		as o_value_xml
		from offer_master
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and (product_code like '%' + @p_search_field_1 + '%' 
				or product_description like '%' + @p_search_field_1 + '%')
		return
	end	
	
	if ( @p_lov_code_type = 'PRODUCTVARIANTCODE_LIST_LINKED' )
	begin
		if exists (select '*' from item_master
			where company_id = @i_client_id
				and country_code = @i_country_code
				and item_code = @p_search_field_1 
			)
			begin
				select '' as value_list,
					'{' + 
						'"code":"' + item_variant_code + '",' +
						'"description":"' + variant_description + '"' +
					'}'
				as o_value_xml
				from item_master
				where company_id = @i_client_id
					and country_code = @i_country_code
					and item_code = @p_search_field_1
			 end
			 else
			 begin
				select '' as value_list,
					'{' + 
						'"code":"' + 'NA' + '",' +
						'"description":"' + 'Not Applicable' + '"' +
					'}'
				as o_value_xml
			 end
		return
	end	




	if ( @p_lov_code_type = 'PRODUCTVARIANTCODE_LIST' )
	begin
		select '' as value_list,
			'{' + 
				'"code":"' + item_variant_code + '",' +
				'"description":"' + variant_description + '"' +
			'}'
		as o_value_xml
		from item_master
		where company_id = @i_client_id
		  and country_code = @i_country_code
		 
		union all
		select '' as value_list,
			'{' + 
				'"code":"' + 'NA' + '",' +
				'"description":"' + 'Not Applicable' + '"' +
			'}'
		as o_value_xml
		return
	end	
	
	if (@p_lov_code_type = 'PRODUCTUOM_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'ITEMUOM'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'ITEMUOM'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'ITEMUOM'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ITEMUOM'
		union all
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'PRODUCTUOM'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'PRODUCTUOM'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'PRODUCTUOM'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'PRODUCTUOM'
		return
	end
	
	if (@p_lov_code_type = 'PERCENTAMTINDICATOR_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'PERAMTIND',a.code) + '"' +
					
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'PERAMTIND'
		return
	end	
	
	if (@p_lov_code_type = 'PERCENTAMTINDICATOR_LIST_LINKED')
	begin
		if @p_search_field_1 = '%'
		return
	if @p_search_field_1 = 'T'
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'PERAMTIND','P') 
				+ '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.code_type = 'PERAMTIND'
		and a.code= 'P'
	end
	else
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'PERAMTIND',a.code) 
				+ '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.code_type = 'PERAMTIND'
		return
	end
	end


	if (@p_lov_code_type = 'QUOTATIONSTATUS_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'QUOTSTATUS',a.code)+ '"' + 
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'QUOTSTATUS'
		return
	end	
	
	if (@p_lov_code_type = 'QUOTATIONCATEGORY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'QUOTCATG',a.code)+ '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'QUOTCATG'
		return
	end	
	
	if (@p_lov_code_type = 'QUOTATIONTYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'QUOTTYPE',a.code)+ '"' +
					
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'QUOTTYPE'
		return
	end	
	
	if (@p_lov_code_type = 'QUOTATIONTYPE_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'QUOTTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'QUOTTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'QUOTTYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'QC'
			and a.category_code_value = @p_search_field_1
		return
	end
	if (@p_lov_code_type = 'QUOTATION_ALLOWED_EVENTVERB_LIST') 
	begin
	
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>'+eventverb_id+'</event_verb>'
		as o_value_xml
		from workflow_eventverb_list
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and transaction_type_code = 'QUOTATION'
		  and cast(request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and cast(from_workflow_stage as varchar(3)) like 
			case @p_search_field_3 when 'ALL' then '%' else @p_search_field_3 end
		  and from_status like 			
			case @p_search_field_4 when 'ALL' then '%' else @p_search_field_4 end
		union all
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>STATUSCHANGE</event_verb>'
		as o_value_xml
		from workflow_status_link b
		where b.company_id = @i_client_id
		  and b.country_code = @i_country_code
		  and b.transaction_type_code = 'QUOTATION'
		  and cast(b.request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(b.request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and b.request_category+b.request_type+cast(b.from_workflow_stage as varchar(3))+b.from_status+
							cast(b.to_workflow_stage as varchar(3))+b.to_status 
					  not in ( select c.request_category+c.request_type+
									  cast(c.from_workflow_stage as varchar(3))+c.from_status+
									  cast(c.to_workflow_stage as varchar(3))+c.to_status
							   from workflow_eventverb_list c
							   where c.company_id = @i_client_id
							     and c.country_code = @i_country_code
							     and c.transaction_type_code = 'QUOTATION'
								 and cast(c.request_category as varchar(10)) like 
									case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
								 and cast(c.request_type as varchar(10)) like 
									 case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  						)					
		return
	end



	if ( @p_lov_code_type = 'RESCATG' )
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'RESCATG'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'RESCATG'
						and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'RESCATG'
					and g.code = a.code)
				end)
			+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'RESCATG'
			and a.code like  @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'RESCDUOM' ) 
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'RESCDUOM'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'RESCDUOM'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'RESCDUOM'
						and g.code = a.code)
				end)
		+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'RESCDUOM'
			and a.code like  @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'RESCODE' )
	begin
		select '' as value_list,
			'<code>' + 'ALL' + '</code>' +
			'<description>' + 'ALL' + '</description>' +
			'<parent_code>' + 'ALL' + '</parent_code>' as o_value_xml
		union all
		select '' as value_list,
		'<code>'+a.type_code_value+'</code>'+
		'<description>' + 
			(case (select 1 from code_table_mlingual_translation f
				where f.company_id = @i_client_id
					and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'RESCODE'
					and f.code = a.type_code_value)
			when 1 then
				(select e.short_description from code_table_mlingual_translation e
				where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'RESCODE'
					and e.code = a.type_code_value)
			else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'RESCODE'
					and g.code = a.type_code_value)
			end)
		+ '</description>' +
		'<parent_code>' + a.category_code_value + '</parent_code>'
		as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'RC'
			and a.type_code_value like  @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'RESOURCECATEGORY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'RESCATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'RESCATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'RESCATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'RESCATG'
		return
	end
	
	if (@p_lov_code_type = 'RESOURCETYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'RESTYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'RESTYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'RESTYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'RESTYPE'
		return
	end
	
	if (@p_lov_code_type = 'RESOURCETYPE_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'RESTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'RESTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'RESTYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'RC'
			and a.category_code_value = @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'RESOURCEUOM_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.uom + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'RESCDUOM'
						and f.code = a.uom)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'RESCDUOM'
				   and e.code = a.uom)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'RESCDUOM'
				   and g.code = a.uom)
				end + '"' +
			'}' as o_value_xml
		from resource_rate a
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	if (@p_lov_code_type = 'RESOURCEUOM_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.uom + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'RESCDUOM'
						and f.code = a.uom)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'RESCDUOM'
				   and e.code = a.uom)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'RESCDUOM'
				   and g.code = a.uom)
				end + '"' +
			'}' as o_value_xml
		from resource_rate a
		where company_id = @i_client_id
			and country_code = @i_country_code
			and resource_category = @p_search_field_1
			and resource_code = @p_search_field_2
		return
	end
	

if (@p_lov_code_type = 'SALESINVOICESTATUS_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'SINVSTATUS',a.code)
					+ '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'SINVSTATUS'
		return
	end	
	
	if (@p_lov_code_type = 'SALESINVOICECATEGORY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'SINVCATG',a.code)+ '"' +
			'}' as o_value_xml	
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'SINVCATG'
		return
	end	
	
	if (@p_lov_code_type = 'SALESINVOICETYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'SINVTYPE',a.code)+ '"' +
			'}' as o_value_xml	
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'SINVTYPE'
			 
		return
	end	
	
	if (@p_lov_code_type = 'SALESINVOICETYPE_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'SINVTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'SINVTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'SINVTYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'SC'
			and a.category_code_value = @p_search_field_1
		return
	end
	if (@p_lov_code_type = 'SALESINVOICE_ALLOWED_EVENTVERB_LIST') 
	begin
	
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>'+eventverb_id+'</event_verb>'
		as o_value_xml
		from workflow_eventverb_list
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and transaction_type_code = 'SALESINVOICE'
		  and cast(request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and cast(from_workflow_stage as varchar(3)) like 
			case @p_search_field_3 when 'ALL' then '%' else @p_search_field_3 end
		  and from_status like 			
			case @p_search_field_4 when 'ALL' then '%' else @p_search_field_4 end
		union all
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>STATUSCHANGE</event_verb>'
		as o_value_xml
		from workflow_status_link b
		where b.company_id = @i_client_id
		  and b.country_code = @i_country_code
		  and b.transaction_type_code = 'SALESINVOICE'
		  and cast(b.request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(b.request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and b.request_category+b.request_type+cast(b.from_workflow_stage as varchar(3))+b.from_status+
							cast(b.to_workflow_stage as varchar(3))+b.to_status 
					  not in ( select c.request_category+c.request_type+
									  cast(c.from_workflow_stage as varchar(3))+c.from_status+
									  cast(c.to_workflow_stage as varchar(3))+c.to_status
							   from workflow_eventverb_list c
							   where c.company_id = @i_client_id
							     and c.country_code = @i_country_code
							     and c.transaction_type_code = 'SALESINVOICE'
								 and cast(c.request_category as varchar(10)) like 
									case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
								 and cast(c.request_type as varchar(10)) like 
									 case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  						)					
		return
	end



	
if ( @p_lov_code_type = 'SELLERLOCATION_LIST_LINKED') 

	begin
		select '' as value_list,
			'{' + 
				'"code":"' + a.dealer_location_code + '",' +
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
		from dealer_location a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.dealer_id = @p_search_field_1
		return
	end


	if ( @p_lov_code_type = 'SERVVISITSTATUS' ) 
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'SERVVISITSTATUS'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'SERVVISITSTATUS'
						and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'SERVVISITSTATUS'
					and g.code = a.code)
				end)
			+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'SERVVISITSTATUS'
			and a.code like @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'SERVICEVISITSTATUS_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'SERVVISITSTATUS'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'SERVVISITSTATUS'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'SERVVISITSTATUS'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'SERVVISITSTATUS'
		return
	end	
	
	if ( @p_lov_code_type = 'STATE') 
	begin
		select '' as value_list,
			'<code>' + state_code + '</code>' +
			'<description>' + state + '</description>' +
			'<parent_code>' + country_code + '</parent_code>'
		as o_value_xml
		from state
		where state like @p_search_field_1
		and country_code like @p_search_field_2
		return
	end
	
	if (@p_lov_code_type = 'STATE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + state_code + '",' +
				'"description":"' + state + '"' +
			'}' as o_value_xml
		from state			
		return
	end
	
	if (@p_lov_code_type = 'STATECODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + state_code + '",' +
				'"description":"' + state + '"' +
			'}' as o_value_xml
		from state
		where country_code = @p_search_field_1				
		return
	end
	
	if (@p_lov_code_type = 'STOCKAVAILABILITYCHECK')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + convert(varchar(14), stock_on_hand) + '"' +
			'}' as o_value_xml
		from item_inventory
		where company_id = @i_client_id
			and country_code = @i_country_code
			and item_code = @p_search_field_1
			and item_variant_code = @p_search_field_2
			and warehouse_id = @p_search_field_3
			and uom_code = @p_search_field_4
			and fiscal_year = @p_fiscal_year				   
		return
	end
	
	if (@p_lov_code_type = 'STOCKBATCHNO_LIST')
	begin
		if exists (select 1 from item_master
					where company_id = @i_client_id
						and country_code = @i_country_code
						and item_code = @p_search_field_1
						and item_variant_code = @p_search_field_2
						and lot_batch_no_appl_ind = 1)
		begin	
			select distinct '' as value_list,
				'{' +
					'"code":"' + lot_batch_no + '",' +
					'"description":"' + lot_batch_no + '"' +
				'}' as o_value_xml
			from item_inventory
			where company_id = @i_client_id
				and country_code = @i_country_code
				and item_code = @p_search_field_1
				and item_variant_code = @p_search_field_2
				and warehouse_id = @p_search_field_3
				and fiscal_year = @p_fiscal_year
		end
		else
		begin
			select distinct '' as value_list,
				'{' +
					'"code":"' + 'NA' + '",' +
					'"description":"' + 'NA' + '"' +
				'}' as o_value_xml	
		end
		return
	end
	
	if (@p_lov_code_type = 'STOCKINAVAILABILITY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"item_code":"' + item_code + '",' +
				'"item_variant_code":"' + item_variant_code + '",' +
				'"warehouse_id":"' + warehouse_id + '",' +
				'"qty_consumed":"' + convert(varchar(14), qty_consumed) + '",' +
				'"uom_code":"' + uom_code + '"' +
			'}' as o_value_xml
		from inventory_consumption
		where company_id = @i_client_id
			and country_code = @i_country_code
			and project_id = @p_search_field_1
		return
	end	
	
	if (@p_lov_code_type = 'STOCKOUTAVAILABILITY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"item_code":"' + item_code + '",' +
				'"item_variant_code":"' + item_variant_code + '",' +
				'"item_description":"' + item_description + '",' +
				'"variant_description":"' + variant_description + '",' +
				'"warehouse_id":"' + @p_search_field_2 + '",' +
				'"qty_consumed":"' + '1' + '",' +
				'"uom_code":"' + 'L' + '"' +			
			'}' as o_value_xml
		from item_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and udf_char_1 = @p_search_field_1
			
		return
	end
	
		if (@p_lov_code_type = 'STOCKUOM_LIST')
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
		from item_inventory a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.item_code = @p_search_field_1
			and a.item_variant_code = @p_search_field_2
			and a.warehouse_id = @p_search_field_3	
			and a.fiscal_year = @p_fiscal_year
		return
	end
	
		if (@p_lov_code_type = 'STOCKWAREHOUSE_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + a.warehouse_id + '",' +
				'"description":"' + b.warehouse_name + '"' +
			'}' as o_value_xml
		from item_inventory a, warehouse b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and a.warehouse_id = b.warehouse_id
			and a.item_code = @p_search_field_1
			and a.item_variant_code = @p_search_field_2	
			and a.fiscal_year = @p_fiscal_year	
		return
	end
	

	if (@p_lov_code_type = 'STOCKWAREHOUSE_LIST_LINKED')
	begin
		if (@p_search_field_3 = '%')
			begin
				select distinct '' as value_list,
					'{' +
						'"code":"' + a.warehouse_id + '",' +
						'"description":"' + b.warehouse_name + '"' +
					'}' as o_value_xml
				from item_inventory a, warehouse b,company_location_warehouse_mapping c
				where a.company_id		= @i_client_id
				and a.country_code	= @i_country_code
				and a.company_id	= b.company_id
				and a.country_code	= b.country_code
				and a.warehouse_id	= b.warehouse_id
				and b.company_id	= c.company_id
				and b.country_code	= c.country_code
				and b.warehouse_id	= c.warehouse_id
				and c.company_id	= a.company_id
				and c.country_code	= a.country_code
				and c.warehouse_id	= a.warehouse_id
				and a.item_code		= @p_search_field_1
				and a.item_variant_code = @p_search_field_2	
				and a.fiscal_year = @p_fiscal_year
			end
		else
			begin
				select distinct '' as value_list,
						'{' +
							'"code":"' + a.warehouse_id + '",' +
							'"description":"' + b.warehouse_name + '"' +
						'}' as o_value_xml
					from item_inventory a, warehouse b,dealer_location_warehouse_mapping c
					where a.company_id		= @i_client_id
						and a.country_code	= @i_country_code
						and a.company_id	= b.company_id
						and a.country_code	= b.country_code
						and a.warehouse_id	= b.warehouse_id 
						and b.company_id	= c.company_id
						and b.country_code	= c.country_code
						and b.warehouse_id  = c.warehouse_id
						and c.company_id	= a.company_id
						and c.country_code	= a.country_code
						and c.warehouse_id	= a.warehouse_id
						and a.item_code		= @p_search_field_1
						and a.item_variant_code = @p_search_field_2
						and c.dealer_id		= @p_search_field_3
						and a.fiscal_year = @p_fiscal_year
			end		
		return
	end	

	if (@p_lov_code_type = 'SUPERVISOR_LIST')
	begin
		create table #supervisor_list (
			supervisor_id nvarchar(60) null,
			supervisor_name nvarchar(300) null
		)

		/* Level 1 */
		insert #supervisor_list
		select a.supervisor_emp_id, b.title + ' ' + b.first_name + ' ' + isnull(b.middle_name, '') + ' ' + b.last_name
		from level1_supervisor a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.supervisor_emp_id = b.employee_id

		insert #supervisor_list
		select a.head_emp_id, b.title + ' ' + b.first_name + ' ' + isnull(b.middle_name, '') + ' ' + b.last_name
		from level1_code a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.head_emp_id = b.employee_id
			
		/* Level 2 */
		insert #supervisor_list
		select a.supervisor_emp_id, b.title + ' ' + b.first_name + ' ' + isnull(b.middle_name, '') + ' ' + b.last_name
		from level2_supervisor a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.supervisor_emp_id = b.employee_id

		insert #supervisor_list
		select a.head_emp_id, b.title + ' ' + b.first_name + ' ' + isnull(b.middle_name, '') + ' ' + b.last_name
		from level2_code a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.head_emp_id = b.employee_id
			
		/* Level 3 */
		insert #supervisor_list
		select a.supervisor_emp_id, b.title + ' ' + b.first_name + ' ' + isnull(b.middle_name, '') + ' ' + b.last_name
		from level3_supervisor a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.supervisor_emp_id = b.employee_id

		insert #supervisor_list
		select a.head_emp_id, b.title + ' ' + b.first_name + ' ' + isnull(b.middle_name, '') + ' ' + b.last_name
		from level3_code a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.head_emp_id = b.employee_id
			
		/* Level 4 */
		insert #supervisor_list
		select a.supervisor_emp_id, b.title + ' ' + b.first_name + ' ' + isnull(b.middle_name, '') + ' ' + b.last_name
		from level4_supervisor a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.supervisor_emp_id = b.employee_id

		insert #supervisor_list
		select a.head_emp_id, b.title + ' ' + b.first_name + ' ' + isnull(b.middle_name, '') + ' ' + b.last_name
		from level4_code a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.head_emp_id = b.employee_id
			
		/* Level 5 */
		insert #supervisor_list
		select a.supervisor_emp_id, b.title + ' ' + b.first_name + ' ' + isnull(b.middle_name, '') + ' ' + b.last_name
		from level5_supervisor a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.supervisor_emp_id = b.employee_id

		insert #supervisor_list
		select a.head_emp_id, b.title + ' ' + b.first_name + ' ' + isnull(b.middle_name, '') + ' ' + b.last_name
		from level5_code a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.head_emp_id = b.employee_id
			
		select distinct '' as value_list,
			'{' +
				'"emp_id":"' + supervisor_id + '",' +
				'"emp_name":"' + supervisor_name + '"' +
			'}'	as o_value_xml
		from #supervisor_list
		return
	end
	
	if (@p_lov_code_type = 'TASKSTATUS_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'TSKSTATUS'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'TSKSTATUS'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'TSKSTATUS'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'TSKSTATUS'
		return
	end
	
	if ( @p_lov_code_type = 'TDURUOM' )
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'TDURUOM'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'TDURUOM'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'TDURUOM'
						and g.code = a.code)
				end)
		+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'TDURUOM'
			and a.code like  @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'TIMEZONE' )
	begin
		select '' as value_list,
			'<code>' + convert(varchar(10), timezone_id) + '</code>' +
			'<description>' + timezone_name + '</description>'
		as o_value_xml
		from timezone
		where timezone_id like @p_search_field_1
		return
	end	
	
	if (@p_lov_code_type = 'TIMEZONE_DESC')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + convert(varchar(10), timezone_id) + '",' +
				'"description":"' + timezone_name + '"' +
			'}'	as o_value_xml
		from timezone
		return
	end
	
	if (@p_lov_code_type = 'TIMEZONE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + convert(varchar(10), timezone_id) + '",' +
				'"description":"' + timezone_name + '"' +
			'}'	as o_value_xml
		from timezone
		return
	end
	
	if ( @p_lov_code_type = 'TWORKUOM' )
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'TWORKUOM'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'TWORKUOM'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'TWORKUOM'
						and g.code = a.code)
				end)
		+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'TWORKUOM'
			and a.code like  @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'TXNSUBTYPE' )
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'TXNSUBTYPE'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'TXNSUBTYPE'
						and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'TXNSUBTYPE'
					and g.code = a.code)
				end)
			+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'TXNSUBTYPE'
			and a.code like @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'TXNTYPE' )
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'TXNTYPE'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'TXNTYPE'
						and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'TXNTYPE'
					and g.code = a.code)
				end)
			+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'TXNTYPE'
			and a.code like @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'USERGROUP' )
	begin
		select '' as value_list,
			'<code>' + user_group_id + '</code>' +
			'<description>' + user_group_name + '</description>'
		as o_value_xml
		from user_group
		where company_id = @i_client_id
			and country_code  = @i_country_code
			and user_group_id like @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'USERGROUP_LIST')
	begin
		declare @p_current_user_group_level tinyint,
			@p_current_user_group_id nvarchar(10)
		
		select @p_current_user_group_id = user_group_id
		from users
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = @i_user_id

		select @p_current_user_group_level = user_group_level
		from user_group
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_group_id = @p_current_user_group_id
			
		if @p_current_user_group_level = 0 or @p_current_user_group_level = 1
		begin
			select '' as value_list,
				'{' +
					'"code":"' + user_group_id + '",' +
					'"description":"' + user_group_name + '"'  +
				'}' as o_value_xml
			from user_group
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_group_level = 2			
		end
		else
		begin
			select '' as value_list,
				'{' +
					'"code":"' + user_group_id + '",' +
					'"description":"' + user_group_name + '"'  +
				'}' as o_value_xml
			from user_group
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_group_level = 2
				and user_group_id != @p_current_user_group_id
		end	
		return
	end
	
	if ( @p_lov_code_type = 'USERGROUPTYPE' ) 
	begin
		select '' as value_list,
			'<code>' + a.code + '</code>' +
			'<description>' + 
				(case (select 1 from code_table_mlingual_translation f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'UGRPTYPE'
						and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'UGRPTYPE'
						and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'UGRPTYPE'
					and g.code = a.code)
				end)
			+ '</description>'
		as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'UGRPTYPE'
			and a.code like  @p_search_field_1
			
		return
	end
	
	if (@p_lov_code_type = 'USERGROUPTYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'UGRPTYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'UGRPTYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'UGRPTYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'UGRPTYPE'
		return
	end
	
	if (@p_lov_code_type = 'VALIDATE_CALL_ACCESS')
	begin
		declare @p_access_ind char(1)
		set @p_access_ind = '1'
		
		if exists (
			select 1 from employee_lastaccess_info
			where company_id = @i_client_id
				and country_code = @i_country_code
				and last_accessed_txn_ref_no = @p_search_field_1
				and allow_newtxn_ind = 0
				and last_accessed_channel_id != @p_search_field_2
			)
		begin
			set @p_access_ind = '0'
		end
		
		select '' as value_list,
			'{' + 
				'"access_ind":"' + @p_access_ind + '"' +
			'}'
		as o_value_xml
		
		return
	end
	
	if (@p_lov_code_type = 'VALIDATE_CHECKSUM')
	begin
		declare @p_refresh_ind bit, @p_checksum_value varchar(15)
		
		set @p_checksum_value = ''
		set @p_refresh_ind = 0
		
		select @p_refresh_ind = channel_refresh_indicator,
			@p_checksum_value = isnull(assigned_activity_checksum_value,'')
		from employee_lastaccess_info
		where company_id = @i_client_id
			and country_code = @i_country_code
			and employee_id = @p_search_field_2	
		
		select '' as value_list,
			'{' +
				'"refresh_ind":"' + (
					case @p_refresh_ind
						when 1 then 'true'
						else 'false'
					end) + '",' +
				'"checksum_value":"' + @p_checksum_value + '",' +
				'"serverDate":"' + convert(varchar(10), SYSDATETIME(), 120) + '",' + 
				'"serverHour":"' + substring(CONVERT(varchar(10), SYSDATETIME(), 108),1,2) + '",' + 
				'"serverMinute":"' + substring(CONVERT(varchar(10), SYSDATETIME(), 108),4,2) + '"' + 
			'}' as o_value_xml
		
		return
	end
	
	if (@p_lov_code_type = 'VISIT_CALL_LINK_TYPE')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'VISIT_CALL_LINK_TYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'VISIT_CALL_LINK_TYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'VISIT_CALL_LINK_TYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'VISIT_CALL_LINK_TYPE'
		return
	end
	
	if ( @p_lov_code_type = 'WAREHOUSE' ) 
	begin
		select '' as value_list,
			'<code>' + warehouse_id + '</code>' +
			'<description>' + warehouse_name + '</description>'
		as o_value_xml
		from warehouse
		where company_id = @i_client_id
			and country_code = @i_country_code
			and warehouse_id like  @p_search_field_1
		return
	end
	
	if ( @p_lov_code_type = 'WAREHOUSE_LIST' ) 
	begin
		select '' as value_list,
			'{' +
				'"code":"' + warehouse_id + '",' +
				'"description":"' + warehouse_name + '"' +
			'}' as o_value_xml
		from warehouse
		where company_id = @i_client_id
			and country_code = @i_country_code
			and (warehouse_id like '%' + @p_search_field_1 + '%' 
				or warehouse_name like '%' + @p_search_field_1 + '%')

		return
	end
	if ( @p_lov_code_type = 'WAREHOUSE_LIST_LINKED' ) 
	begin
		if (@p_search_field_2 = '%')
			begin
				select '' as value_list,
					'{' +
						'"code":"' + warehouse_id + '",' +
						'"description":"' + warehouse_name + '"' +
					'}' as o_value_xml
				from warehouse
				where company_id = @i_client_id
				and country_code = @i_country_code
				and (warehouse_id like '%' + @p_search_field_1 + '%' 
				or warehouse_name like '%' + @p_search_field_1 + '%')
			end
		else
			begin
				select distinct '' as value_list,
					'{' +
						'"code":"' + a.warehouse_id + '",' +
						'"description":"' + a.warehouse_name + '"' +
					'}' as o_value_xml
				from warehouse a, dealer_location_warehouse_mapping b
				where a.company_id		= @i_client_id
					and a.country_code	= @i_country_code
					and a.company_id	= b.company_id
					and a.country_code	= b.country_code
					and a.warehouse_id	= b.warehouse_id 
					and b.dealer_id		= @p_search_field_2
					and (a.warehouse_id like '%' + @p_search_field_1 + '%' 
					or a.warehouse_name like '%' + @p_search_field_1 + '%')
			end		
		return
	end	
		if (@p_lov_code_type = 'WAREHOUSELOCATION_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + location_code + '",' +
				'"description":"' + location_name_short + '"' +



			'}' as o_value_xml

		from company_location
			where company_id = @i_client_id
			and country_code = @i_country_code

		union all			
		select distinct '' as value_list,
			'{' +
				'"code":"' + dealer_location_code + '",' +
				'"description":"' + location_name_short + '"' +
			'}' as o_value_xml
		from dealer_location
			where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end


if (@p_lov_code_type = 'WAREHOUSEMAPLOC_LIST')
	begin
		select distinct '' as value_list,
			'{' +
				'"code":"' + location_code + '",' +
				'"description":"' + location_name_short + '"' +
			'}' as o_value_xml
		from company_location
			where company_id = @i_client_id
			and country_code = @i_country_code
		union all			
		select distinct '' as value_list,
			'{' +
				'"code":"' + dealer_location_code + '",' +
				'"description":"' + location_name_short + '"' +
			'}' as o_value_xml
		from dealer_location
			where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end

	if (@p_lov_code_type = 'WAREHOUSEMAPLOC_LIST_LINKED')
	begin
		if @p_search_field_1 = 'CWH'
		begin
			select distinct '' as value_list,
			'{' +
				'"code":"' + location_code + '",' +
				'"description":"' + location_name_short + '"' +
			'}' as o_value_xml
			from company_location
			where company_id = @i_client_id
			and country_code = @i_country_code
		end
		else 
		begin
			select distinct '' as value_list,

			'{' +
				'"code":"' + dealer_location_code + '",' +
				'"description":"' + location_name_short + '"' +
			'}' as o_value_xml
			from dealer_location

			where company_id = @i_client_id
			and country_code = @i_country_code
		end

		return
	end
	
	
	
if (@p_lov_code_type = 'WAREHOUSETYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'WHTYPE',a.code) +'"'+






			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.code_type = 'WHTYPE'
		return
	end	
	
	if (@p_lov_code_type = 'WORKCOMPLETE_REASONCODES')
	begin
		select '' as value_list,
				'<code>' + a.code + '</code>' +
				'<description>' + 
					(case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'WORKCOMPLETEREASCD'
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = 'WORKCOMPLETEREASCD'
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'WORKCOMPLETEREASCD'
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'WORKCOMPLETEREASCD'
		return		
	end	

if (@p_lov_code_type = 'ASSET_CONTRACT_EFFECTIVE_FROM_DATE')
	begin
		select '' as value_list,
			'{' +
				'"eff_from_date":"' + 
					case (
						select count(*) from asset_service_contract b
						where b.company_id = a.company_id
							and b.country_code = a.country_code
							and b.asset_id = a.asset_id	
					)
					when 0 then (
						convert(varchar(10), dateadd(dd, 1, a.installation_date))
					)
					else (
						select convert(varchar(10), dateadd(dd, 1, max(c.effective_to_date)))
						from asset_service_contract c
						where c.company_id = a.company_id
							and c.country_code = a.country_code
							and c.asset_id = a.asset_id	
					) end + '"' +
			'}' as o_value_xml
		from asset_master a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.asset_id = @p_search_field_1
			and a.installation_date is not null
		return
	end
	
	if (@p_lov_code_type = 'STATE_TYPE')
	begin
		select '' as value_list,
			'{' +
				'"state_type":"' + isnull(product_udf_char_1,'') + '",' +
				'"state_number":"' + isnull(product_udf_char_2,'') + '"' +
			'}' as o_value_xml
		from state a
		where a.country_code = @i_country_code
			and a.state_code = @p_search_field_1
		return
	end

	if (@p_lov_code_type = 'PWCLAIM_ALLOWED_EVENTVERB_LIST') 
	begin
	
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>'+eventverb_id+'</event_verb>'
		as o_value_xml
		from workflow_eventverb_list
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and transaction_type_code = 'PWCLAIM'
		  and cast(request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and cast(from_workflow_stage as varchar(3)) like 
			case @p_search_field_3 when 'ALL' then '%' else @p_search_field_3 end
		  and from_status like 			
			case @p_search_field_4 when 'ALL' then '%' else @p_search_field_4 end
		union all
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>STATUSCHANGE</event_verb>'
		as o_value_xml
		from workflow_status_link b
		where b.company_id = @i_client_id
		  and b.country_code = @i_country_code
		  and b.transaction_type_code = 'PWCLAIM'
		  and cast(b.request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(b.request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and b.request_category+b.request_type+cast(b.from_workflow_stage as varchar(3))+b.from_status+
							cast(b.to_workflow_stage as varchar(3))+b.to_status 
					  not in ( select c.request_category+c.request_type+
									  cast(c.from_workflow_stage as varchar(3))+c.from_status+
									  cast(c.to_workflow_stage as varchar(3))+c.to_status
							   from workflow_eventverb_list c
							   where c.company_id = @i_client_id
							     and c.country_code = @i_country_code
							     and c.transaction_type_code = 'PWCLAIM'
								 and cast(c.request_category as varchar(10)) like 
									case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
								 and cast(c.request_type as varchar(10)) like 
									 case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  						)					
		return
	end

	if (@p_lov_code_type = 'PWCLAIMCATEGORY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'PWCLAIMCATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'PWCLAIMCATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'PWCLAIMCATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'PWCLAIMCATG'
		return
	end
	
if (@p_lov_code_type = 'PWCLAIMSTATUS_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'PWCLAIMSTATUS'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'PWCLAIMSTATUS'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'PWCLAIMSTATUS'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'PWCLAIMSTATUS'
		return
	end
	
if (@p_lov_code_type = 'PWCLAIMTYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'PWCLAIMTYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'PWCLAIMTYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'PWCLAIMTYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'PWCLAIMTYPE'
		return
	end
	
	if (@p_lov_code_type = 'PWCLAIMTYPE_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'PWCLAIMTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'PWCLAIMTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'PWCLAIMTYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'PW'
			and a.category_code_value = @p_search_field_1
		return
	end
	if (@p_lov_code_type = 'EQUIPMENTDIVISION_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EQUIPDIV'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EQUIPDIV'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'EQUIPDIV'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EQUIPDIV'
		return
	end

	if (@p_lov_code_type = 'PWCLAIMBELONG_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'PWCLAIMBELONG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'PWCLAIMBELONG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'PWCLAIMBELONG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'PWCLAIMBELONG'
		return
	end

	if (@p_lov_code_type = 'PWCLAIMFAILURECATG_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'PWCLAIMFAILCATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'PWCLAIMFAILCATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'PWCLAIMFAILCATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'PWCLAIMFAILCATG'
				
		return
	end

	if (@p_lov_code_type = 'DEVICE_PROFILE')
	begin
		
		declare @p_model nvarchar(50),
		@p_platform nvarchar(50),
		@p_manufacturer nvarchar(50),
		@p_device_version nvarchar(50),
		@p_mservice_version nvarchar(50)
		
					
		select @p_model = paramval from #input_params where paramname = 'model'
		select @p_platform = paramval from #input_params where paramname = 'platform'
		select @p_manufacturer = paramval from #input_params where paramname = 'manufacturer'
		select @p_device_version = paramval from #input_params where paramname = 'device_version'
		select @p_mservice_version = paramval from #input_params where paramname = 'app_version'
		
		update device_register
		set model = @p_model,
			device_platform = @p_platform,
			manufacturer = @p_manufacturer,
			device_version = @p_device_version,
			app_version = @p_mservice_version
		where company_id = @i_client_id
			and country_code = @i_country_code
			and user_id = @i_user_id
				
		if @@ROWCOUNT != 0
		begin
			select '' as value_list,
				'{' +
					'"status":"Success",' +
					'"message":"Device Profile Setup successfully done."' +
				'}' as o_value_xml
		end
		else
		begin
			select '' as value_list,
				'{' +
					'"status":"Failure",' +
					'"message":"Failed to tag Device Profile Setup"' +
				'}' as o_value_xml
		end					
		return
			
	end
	
	/* if (@p_lov_code_type = 'GET_LATLNG_FOR_ADDRESS_STORE')
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
		select top(10)
			'ASSET',
			asset_id,
			'NA',
			lattitude_value,
			longitude_value
		from asset_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and isnull(lattitude_value, '') != ''
			and isnull(longitude_value, '') != ''
			and isnull(geotag_route, '') = ''
		order by creation_date desc
	
		insert #latlng_address_store (
			entity_name,
			entity_key,
			entity_sub_key,
			latitude,
			longitude
		)
		select top(10)
			'CALLEVENT',
			call_ref_no,
			cast(event_id as varchar(10)),
			lattitude_value,
			longitude_value
		from call_status_event_log
		where company_id = @i_client_id
			and country_code = @i_country_code
			and isnull(lattitude_value, '') != ''
			and isnull(longitude_value, '') != ''
			and isnull(geotag_route, '') = ''
		order by event_date desc
		
		insert #latlng_address_store (
			entity_name,
			entity_key,
			entity_sub_key,
			latitude,
			longitude
		)
		select top(10)
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
		order by trip_seqno desc
		
		insert #latlng_address_store (
			entity_name,
			entity_key,
			entity_sub_key,
			latitude,
			longitude
		)
		select top(10)
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
		order by trip_seqno desc
		
		insert #latlng_address_store (
			entity_name,
			entity_key,
			entity_sub_key,
			latitude,
			longitude
		)
		select top(10)
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
		order by entry_seqno desc
		
		insert #latlng_address_store (
			entity_name,
			entity_key,
			entity_sub_key,
			latitude,
			longitude
		)
		select top(10)
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
		order by entry_seqno desc
		
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
	
	if (@p_lov_code_type = 'SET_LATLNG_FOR_ADDRESS_STORE')
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
	end */

	if (@p_lov_code_type = 'CUSTOMER_SEARCH')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.customer_id + '",' +
					'"description":"' + a.customer_name +'"'+
				'}' as o_value_xml
			from customer a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and (
					a.customer_name like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
					or a.customer_id like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
				)
			return
		end	
	

		if (@p_lov_code_type = 'EQUIPMENT_SEARCH')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.equipment_id + '",' +
					'"description":"' + a.description +'"'+
				'}' as o_value_xml
			from equipment a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and (
					a.description like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
					or a.equipment_id like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
				)
			return
		end	
	
		if (@p_lov_code_type = 'ASSET_SEARCH')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.asset_id + '",' +
					'"description":"' + a.asset_id +'"'+
				'}' as o_value_xml
			from asset_master a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.asset_id like '%' + isnull((select paramval from #input_params where paramname = 'filter_string'), '') + '%'
			return
		end	
		
	if (@p_lov_code_type = 'DEVICE_PLATFORM_LIST')
	begin
		
		select distinct '' as value_list,
			'{' +
				'"code":"' + a.device_platform + '",' +
				'"description":"' + a.device_platform + '"' +
			'}' as o_value_xml
		from device_register a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.device_platform is not null
			and a.device_platform != ''
		
		return		
	end
	
	if (@p_lov_code_type = 'DEVICE_MANUFACTURER_LIST')
	begin
		
		select distinct '' as value_list,
			'{' +
				'"code":"' + a.manufacturer + '",' +
				'"description":"' + a.manufacturer + '"' +
			'}' as o_value_xml
		from device_register a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.manufacturer is not null
		
		return		
	end
	
	if (@p_lov_code_type = 'DEVICE_MODEL_LIST')
	begin
		
		select distinct '' as value_list,
			'{' +
				'"code":"' + a.model + '",' +
				'"description":"' + a.model + '"' +
			'}' as o_value_xml
		from device_register a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.model is not null
		
		return		
	end
	
	if (@p_lov_code_type = 'DEVICE_VERSION_LIST')
	begin
		
		select distinct '' as value_list,
			'{' +
				'"code":"' + a.device_version + '",' +
				'"description":"' + a.device_version + '"' +
			'}' as o_value_xml
		from device_register a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.device_version is not null
		
		return		
	end
	
	if (@p_lov_code_type = 'DEVICE_MSERVICE_VERSION_LIST')
	begin
		
		select distinct '' as value_list,
			'{' +
				'"code":"' + a.app_version + '",' +
				'"description":"' + a.app_version + '"' +
			'}' as o_value_xml
		from device_register a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.app_version is not null
		
		return		
	end	
	
	
	/* For Quotation and Salesinvoice related */

	if (@p_lov_code_type = 'CHARGE_CONFIGURATION')  
	begin

		select '' as value_list,
			'{' +
				'"sales_category":"' + sales_category + '",' +
				'"sales_type":"' + sales_type + '",' +
				'"charge_ind":"' + charge_ind + '",' +
				'"charge_category":"' + charge_category + '",' +
				'"charge_code":"' + charge_code + '",' +
				'"parent_code":"' + isnull(parent_code,'') + '",' +
				'"lineitem_overall_level_ind":"' + lineitem_overall_level_ind + '",' +
				'"amount_perc_ind":"' + amount_perc_ind + '",' +
				'"syscalc_ind":"' + convert(varchar(2), syscalc_ind ) + '",' +
				'"allowuseredit_ind":"' + convert(varchar(2), allowuseredit_ind ) + '"' +
			'}' as o_value_xml
		from sales_configuration_model
		where company_id = @i_client_id
			and  country_code = @i_country_code
			and sales_category = @p_search_field_1
			and sales_type in ('ALL', @p_search_field_2)
		return

	end

	if (@p_lov_code_type = 'CHARGEINDICATOR_LIST')
	begin
	
		create table #charge_indicator (
				additional_charges_ind nvarchar(2),
				additional_charges_desc nvarchar(60)
			) 

		insert #charge_indicator (additional_charges_ind, additional_charges_desc)
		select 'T', 'Tax'
					
		insert #charge_indicator (additional_charges_ind, additional_charges_desc)
		select 'A', 'Additional Charges'

		insert #charge_indicator (additional_charges_ind, additional_charges_desc)
		select 'D', 'Discount'

		select '' as value_list,
			'{' +
				'"code":"' + additional_charges_ind + '",' +
				'"description":"' + additional_charges_desc + '"' +	
			'}' as o_value_xml
		from #charge_indicator
		
	end
	
	
	if (@p_lov_code_type = 'CHARGEINDICATOR_LIST_LINKED')
	begin

		if @p_search_field_1 = '%'
		return

		if @p_search_field_1 = 'OVERALL'
		begin
			select '' as value_list, 
				'{' +
					'"code":"' + charge_ind + '",' +
					'"description":"' + case(charge_ind) 
							when 'T' then 'Tax'
							when 'A' then 'Additional Charges'
							when 'D' then 'Discount'
							end + '"' +	
				'}' as o_value_xml
			from sales_configuration_model
			where company_id = @i_client_id
				and country_code = @i_country_code
				and sales_category = @p_search_field_2 
				and sales_type in ('ALL', @p_search_field_3)
				and lineitem_overall_level_ind in ('BOTH', @p_search_field_1)
				and syscalc_ind = 0
			group by charge_ind

		end
		else
		begin
			select '' as value_list, 
				'{' +
					'"code":"' + charge_ind + '",' +
					'"description":"' + case(charge_ind) 
							when 'T' then 'Tax'
							when 'A' then 'Additional Charges'
							when 'D' then 'Discount'
							end + '"' +	
				'}' as o_value_xml
			from sales_configuration_model
			where company_id = @i_client_id
				and country_code = @i_country_code
				and sales_category = @p_search_field_2 
				and sales_type in ('ALL', @p_search_field_3)
				and lineitem_overall_level_ind = 'ITEM'
				--and charge_ind != 'D'
				and charge_code != 'DISCOUNT'
				and syscalc_ind = 0
			group by charge_ind
		end
		return
	end
	
	if  (@p_lov_code_type = 'CHARGECODE_LIST')
	begin
		
		create table #charge_code (
			charge_subcode nvarchar(10),
			charge_description nvarchar(100)
		)

		insert #charge_code (charge_subcode, charge_description)
			select distinct charge_subcode, charge_description
				from sales_tax_code_master

		insert #charge_code (charge_subcode, charge_description)
			select distinct charge_subcode, charge_description
				from sales_discount_code_master

		insert #charge_code (charge_subcode, charge_description)
			select distinct charge_subcode, charge_description
				from sales_addlcharge_code_master


		select distinct '' as value_list,
			'{' +
				'"code":"' + charge_subcode + '",' +
				'"description":"' + charge_description + '"' +	
			'}' as o_value_xml
		from #charge_code
						
		return
	end
	
		/*  Remove existing  CHARGECODE_LIST_LINKED snippet and then add below snippet*/ 																		  
		if  (@p_lov_code_type = 'CHARGECODE_LIST_LINKED')
		begin
		if @p_search_field_1 = '%'
		return
		
		create table #charge_code_list (
			charge_subcode nvarchar(10),
			charge_description nvarchar(100)
		)
		
		if (@p_search_field_1 = 'T')
		begin

			insert #charge_code_list (charge_subcode, charge_description)
			select distinct charge_subcode, charge_description
				from sales_tax_code_master
					where company_id = @i_client_id
					and country_code = @i_country_code
					and charge_category = @p_search_field_2
					and charge_code = @p_search_field_3


			select  '' as value_list,
				'{' +
					'"code":"' + charge_subcode + '",' +
					'"description":"' + charge_description + '"' +	
				'}' as o_value_xml
			from #charge_code_list
			
		end
		else if (@p_search_field_1 = 'A') 
		begin
			
			insert #charge_code_list (charge_subcode, charge_description)
			select distinct charge_subcode, charge_description
				from sales_addlcharge_code_master
					where company_id = @i_client_id
					and country_code = @i_country_code
					and charge_category = @p_search_field_2
					and charge_code = @p_search_field_3

			select  '' as value_list,
				'{' +
					'"code":"' + charge_subcode + '",' +
					'"description":"' + charge_description + '"' +	
				'}' as o_value_xml
			from #charge_code_list

		end
		else if (@p_search_field_1 = 'D') 
		begin
			
			insert #charge_code_list (charge_subcode, charge_description)
			select distinct charge_subcode, charge_description
				from sales_discount_code_master
					where company_id = @i_client_id
					and country_code = @i_country_code
					and charge_category = @p_search_field_2
					and charge_code = @p_search_field_3

			select  '' as value_list,
				'{' +
					'"code":"' + charge_subcode + '",' +
					'"description":"' + charge_description + '"' +	
				'}' as o_value_xml
			from #charge_code_list

		end
		return
	end
	
	if  (@p_lov_code_type = 'CHARGECATEGORY_LIST')
	begin
		
		create table #charge_category (
			charge_category nvarchar(10),
			charge_category_desc nvarchar(60)
		)

		insert #charge_category (charge_category, charge_category_desc)
		select distinct charge_category, dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CHARGECATG',b.code)
			from sales_tax_code_master a, code_table b
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = b.company_id
				and a.country_code = b.country_code
				and b.code_type = 'CHARGECATG'
				and b.code = a.charge_category

		insert #charge_category (charge_category, charge_category_desc)
		select distinct charge_category, dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CHARGECATG',b.code)
			from sales_addlcharge_code_master a, code_table b
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = b.company_id
				and a.country_code = b.country_code
				and b.code_type = 'CHARGECATG'
				and b.code = a.charge_category

		insert #charge_category (charge_category, charge_category_desc)
		select distinct charge_category, dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CHARGECATG',b.code)
			from sales_discount_code_master a, code_table b
				where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = b.company_id
				and a.country_code = b.country_code
				and b.code_type = 'CHARGECATG'
				and b.code = a.charge_category

		select  '' as value_list,
			'{' +
				'"code":"' + charge_category + '",' +
				'"description":"' + charge_category_desc + '"' +	
			'}' as o_value_xml
		from #charge_category
		return
	end
	
	if  (@p_lov_code_type = 'CHARGECATEGORY_LIST_LINKED')
	begin
		if @p_search_field_1 = '%'
		return

		create table #charge_category_list (
			charge_category nvarchar(10),
			charge_category_desc nvarchar(60)
		)

		declare @p_lineitem_overall_ind nvarchar(10)

		if (@p_search_field_2 = 'OVERALL')
		begin
			set @p_lineitem_overall_ind = @p_search_field_2
		end
		else
		begin
			set @p_lineitem_overall_ind = 'ITEM'
		end
		
		if (@p_search_field_1 = 'T')
		begin

			insert #charge_category_list (charge_category, charge_category_desc)
			select distinct charge_category, dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CHARGECATG',b.code)
				from sales_tax_code_master a, code_table b
					where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.company_id = b.company_id
					and a.country_code = b.country_code
					and b.code_type = 'CHARGECATG'
					and b.code = a.charge_category

			select  '' as value_list,
				'{' +
					'"code":"' + charge_category + '",' +
					'"description":"' + charge_category_desc + '"' +	
				'}' as o_value_xml
			from #charge_category_list
			where charge_category in (select distinct charge_category 
										from sales_configuration_model
										where company_id = @i_client_id
											and country_code = @i_country_code
											and sales_category = @p_search_field_3
											and sales_type in ('ALL',@p_search_field_4)
											and charge_ind = @p_search_field_1
											and lineitem_overall_level_ind = @p_lineitem_overall_ind
											and syscalc_ind = 0)
			
		end
		else if (@p_search_field_1 = 'A') 
		begin

			insert #charge_category_list (charge_category, charge_category_desc)
			select distinct charge_category, dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CHARGECATG',b.code)
				from sales_addlcharge_code_master a, code_table b
					where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.company_id = b.company_id
					and a.country_code = b.country_code
					and b.code_type = 'CHARGECATG'
					and b.code = a.charge_category

			select  '' as value_list,
				'{' +
					'"code":"' + charge_category + '",' +
					'"description":"' + charge_category_desc + '"' +	
				'}' as o_value_xml
			from #charge_category_list
			where charge_category in (select distinct charge_category 
										from sales_configuration_model
										where company_id = @i_client_id
											and country_code = @i_country_code
											and sales_category = @p_search_field_3
											and sales_type in ('ALL',@p_search_field_4)
											and charge_ind = @p_search_field_1
											and lineitem_overall_level_ind = @p_lineitem_overall_ind
											and syscalc_ind = 0)

		end
		else if (@p_search_field_1 = 'D') 
		begin

			insert #charge_category_list (charge_category, charge_category_desc)
			select distinct charge_category, dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CHARGECATG',b.code)
				from sales_discount_code_master a, code_table b
					where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.company_id = b.company_id
					and a.country_code = b.country_code
					and b.code_type = 'CHARGECATG'
					and b.code = a.charge_category

			select  '' as value_list,
				'{' +
					'"code":"' + charge_category + '",' +
					'"description":"' + charge_category_desc + '"' +	
				'}' as o_value_xml
			from #charge_category_list
			where charge_category in (select distinct charge_category 
										from sales_configuration_model
										where company_id = @i_client_id
											and country_code = @i_country_code
											and sales_category = @p_search_field_3
											and sales_type in ('ALL',@p_search_field_4)
											and charge_ind = @p_search_field_1
											and lineitem_overall_level_ind in ('BOTH', @p_lineitem_overall_ind)
											and syscalc_ind = 0)

		end
		return
	end
	

	/*  Remove existing  CHARGETYPE_LIST_LINKED snippet and then add below snippet*/ 
	
	if  (@p_lov_code_type = 'CHARGETYPE_LIST_LINKED')
	begin
		if @p_search_field_1 = '%'
		return

		declare @p_lineitem_overall_indicator nvarchar(10)

		if (@p_search_field_3 = 'OVERALL')
		begin
			set @p_lineitem_overall_indicator = @p_search_field_3
		end
		else
		begin
			set @p_lineitem_overall_indicator = 'ITEM'
		end

		create table #charge_type_list (
			charge_code nvarchar(10)
		)
		
		if (@p_search_field_1 = 'T')
		begin

			insert #charge_type_list (charge_code)
			select distinct charge_code
				from sales_tax_code_master
					where company_id = @i_client_id
					and country_code = @i_country_code
					and charge_category = @p_search_field_2

			create table #charge_type_list_tax (
				charge_code nvarchar(10)
			)

			insert #charge_type_list_tax (charge_code)
			select distinct charge_code 
				from sales_configuration_model
					where company_id = @i_client_id
						and country_code = @i_country_code
						and sales_category = @p_search_field_4
						and sales_type in ('ALL', @p_search_field_5)
						and charge_ind = @p_search_field_1
						and charge_category =  @p_search_field_2
						and lineitem_overall_level_ind = @p_lineitem_overall_indicator
						and syscalc_ind = 0


			select  '' as value_list,
				'{' +
					'"code":"' + a.charge_code + '",' +
					'"description":"' + a.charge_code + '"' +	
				'}' as o_value_xml
			from #charge_type_list a
			INNER JOIN  #charge_type_list_tax ON a.charge_code Like '%'+ #charge_type_list_tax.charge_code +'%'
			
		end
		else if (@p_search_field_1 = 'A') 
		begin
			
			insert #charge_type_list (charge_code)
			select distinct charge_code
				from sales_addlcharge_code_master
					where company_id = @i_client_id
					and country_code = @i_country_code
					and charge_category = @p_search_field_2

			create table #charge_type_list_addlcharge (
				charge_code nvarchar(10)
			)

			insert #charge_type_list_addlcharge (charge_code)
			select distinct charge_code 
				from sales_configuration_model
					where company_id = @i_client_id
						and country_code = @i_country_code
						and sales_category = @p_search_field_4
						and sales_type in ('ALL', @p_search_field_5)
						and charge_ind = @p_search_field_1
						and charge_category =  @p_search_field_2
						and lineitem_overall_level_ind = @p_lineitem_overall_indicator
						and syscalc_ind = 0

			select  '' as value_list,
				'{' +
					'"code":"' + a.charge_code + '",' +
					'"description":"' + a.charge_code + '"' +	
				'}' as o_value_xml
			from #charge_type_list a
			INNER JOIN  #charge_type_list_addlcharge ON a.charge_code Like '%'+ #charge_type_list_addlcharge.charge_code +'%'

		end
		else if (@p_search_field_1 = 'D') 
		begin
			
			insert #charge_type_list (charge_code)
			select distinct charge_code
				from sales_discount_code_master
					where company_id = @i_client_id
					and country_code = @i_country_code
					and charge_category = @p_search_field_2

			create table #charge_type_list_discount (
				charge_code nvarchar(10)
			)

			if (@p_search_field_3 = 'OVERALL')
			begin
				insert #charge_type_list_discount (charge_code)
				select distinct charge_code 
					from sales_configuration_model
						where company_id = @i_client_id
							and country_code = @i_country_code
							and sales_category = @p_search_field_4
							and sales_type in ('ALL', @p_search_field_5)
							and charge_ind = @p_search_field_1
							and charge_category =  @p_search_field_2
							and lineitem_overall_level_ind in ('BOTH', @p_lineitem_overall_indicator)
							and syscalc_ind = 0
			end
			else
			begin
				insert #charge_type_list_discount (charge_code)
				select distinct charge_code 
					from sales_configuration_model
						where company_id = @i_client_id
							and country_code = @i_country_code
							and sales_category = @p_search_field_4
							and sales_type in ('ALL', @p_search_field_5)
							and charge_ind = @p_search_field_1
							and charge_category =  @p_search_field_2
							and charge_code != 'DISCOUNT'
							and lineitem_overall_level_ind in ('BOTH', @p_lineitem_overall_indicator)
							and syscalc_ind = 0
			end

			select  '' as value_list,
				'{' +
					'"code":"' + a.charge_code + '",' +
					'"description":"' + a.charge_code + '"' +	
				'}' as o_value_xml
			from #charge_type_list a
			INNER JOIN  #charge_type_list_discount ON a.charge_code Like '%'+ #charge_type_list_discount.charge_code +'%'

		end
		return
	end
	
	
	if (@p_lov_code_type = 'INVADJCATG_LIST')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.code + '",' +
				'"description":"' + 
					(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'INVADJCATG'
								and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'INVADJCATG'
								and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'INVADJCATG'
							and g.code = a.code)
					end) + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVADJCATG'
		return
	end

	if (@p_lov_code_type = 'INVADJTYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'INVADJTYPE'
						and f.code = a.code)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'INVADJTYPE'
					and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'INVADJTYPE'
					and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVADJTYPE'
		return
	end

	if (@p_lov_code_type = 'INVADJSTATUS_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'INVADJSTATUS'
						and f.code = a.code)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'INVADJSTATUS'
					and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'INVADJSTATUS'
					and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVADJSTATUS'
		return
	end
	
	if (@p_lov_code_type = 'INVADJTYPE_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'INVADJTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
					where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'INVADJTYPE'
					and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'INVADJTYPE'
					and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'IA'
			and a.category_code_value = @p_search_field_1
		return
	end

	if (@p_lov_code_type = 'INVADJREASONCODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'INVADJREASON'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'INVADJREASON'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'INVADJREASON'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVADJREASON'
		return
	end
	
	
 
 

if (@p_lov_code_type = 'SALESINVOICESTATUS_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'SINVSTATUS',a.code)
					+ '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'SINVSTATUS'
		return
	end	
	
	if (@p_lov_code_type = 'SALESINVOICECATEGORY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'SINVCATG',a.code)+ '"' +
			'}' as o_value_xml	
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'SINVCATG'
		return
	end	
	
	if (@p_lov_code_type = 'SALESINVOICETYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'SINVTYPE',a.code)+ '"' +
			'}' as o_value_xml	
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'SINVTYPE'
			 
		return
	end	
	
	if (@p_lov_code_type = 'SALESINVOICETYPE_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'SINVTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'SINVTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'SINVTYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'SC'
			and a.category_code_value = @p_search_field_1
		return
	end
	if (@p_lov_code_type = 'SALESINVOICE_ALLOWED_EVENTVERB_LIST') 
	begin
	
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>'+eventverb_id+'</event_verb>'
		as o_value_xml
		from workflow_eventverb_list
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and transaction_type_code = 'SALESINVOICE'
		  and cast(request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and cast(from_workflow_stage as varchar(3)) like 
			case @p_search_field_3 when 'ALL' then '%' else @p_search_field_3 end
		  and from_status like 			
			case @p_search_field_4 when 'ALL' then '%' else @p_search_field_4 end
		union all
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>STATUSCHANGE</event_verb>'
		as o_value_xml
		from workflow_status_link b
		where b.company_id = @i_client_id
		  and b.country_code = @i_country_code
		  and b.transaction_type_code = 'SALESINVOICE'
		  and cast(b.request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(b.request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and b.request_category+b.request_type+cast(b.from_workflow_stage as varchar(3))+b.from_status+
							cast(b.to_workflow_stage as varchar(3))+b.to_status 
					  not in ( select c.request_category+c.request_type+
									  cast(c.from_workflow_stage as varchar(3))+c.from_status+
									  cast(c.to_workflow_stage as varchar(3))+c.to_status
							   from workflow_eventverb_list c
							   where c.company_id = @i_client_id
							     and c.country_code = @i_country_code
							     and c.transaction_type_code = 'SALESINVOICE'
								 and cast(c.request_category as varchar(10)) like 
									case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
								 and cast(c.request_type as varchar(10)) like 
									 case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  						)					
		return
	end


	if (@p_lov_code_type = 'CUSTOMERORDERSTATUS_LIST')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.code + '",' +
					'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CUSTOMERORDERSTATUS',a.code)+ '"' + 
				'}' as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'CUSTOMERORDERSTATUS'
			return
		end	
	
		if (@p_lov_code_type = 'CUSTOMERORDERCATEGORY_LIST')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.code + '",' +
					'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CUSTOMERORDERCATG',a.code)+ '"' +
				'}' as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'CUSTOMERORDERCATG'
			return
		end	
	
		if (@p_lov_code_type = 'CUSTOMERORDERTYPE_LIST')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.code + '",' +
					'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CUSTOMERORDERTYPE',a.code)+ '"' +
					
				'}' as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'CUSTOMERORDERTYPE'
			return
		end	
	
		if (@p_lov_code_type = 'CUSTOMERORDERTYPE_LIST_LINKED')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.type_code_value + '",' +
					'"description":"' + 
					case (select 1 from code_table_mlingual_translation f
						  where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'CUSTOMERORDERTYPE'
							and f.code = a.type_code_value)
					when 1 then
					(select e.short_description from code_table_mlingual_translation e
					 where e.company_id = @i_client_id
					   and e.country_code = @i_country_code
					   and e.locale_id = @i_locale_id
					   and e.code_type = 'CUSTOMERORDERTYPE'
					   and e.code = a.type_code_value)
					else
					(select g.short_description from code_table_mlingual_translation g
					 where g.company_id = @i_client_id
					   and g.country_code = @i_country_code
					   and g.locale_id = 'ALL'
					   and g.code_type = 'CUSTOMERORDERTYPE'
					   and g.code = a.type_code_value)
					end + '"' +
				'}' as o_value_xml
			from category_type_link a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.link_type = 'OC'
				and a.category_code_value = @p_search_field_1
			return
		end
		if (@p_lov_code_type = 'CUSTOMERORDER_ALLOWED_EVENTVERB_LIST') 
		begin
	
			select '' as value_list,
				'<request_category>'+request_category+'</request_category>'+
				'<request_type>'+request_type+'</request_type>'+
				'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
				'<from_status>'+from_status+'</from_status>'+
				'<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
				'<to_status>'+to_status+'</to_status>'+
				'<event_verb>'+eventverb_id+'</event_verb>'
			as o_value_xml
			from workflow_eventverb_list
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and transaction_type_code = 'CUSTOMERORDER'
			  and cast(request_category as varchar(10)) like 
				case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
			  and cast(request_type as varchar(10)) like 
				case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
			  and cast(from_workflow_stage as varchar(3)) like 
				case @p_search_field_3 when 'ALL' then '%' else @p_search_field_3 end
			  and from_status like 			
				case @p_search_field_4 when 'ALL' then '%' else @p_search_field_4 end
			union all
			select '' as value_list,
				'<request_category>'+request_category+'</request_category>'+
				'<request_type>'+request_type+'</request_type>'+
				'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
				'<from_status>'+from_status+'</from_status>'+
				'<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
				'<to_status>'+to_status+'</to_status>'+
				'<event_verb>STATUSCHANGE</event_verb>'
			as o_value_xml
			from workflow_status_link b
			where b.company_id = @i_client_id
			  and b.country_code = @i_country_code
			  and b.transaction_type_code = 'CUSTOMERORDER'
			  and cast(b.request_category as varchar(10)) like 
				case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
			  and cast(b.request_type as varchar(10)) like 
				case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
			  and b.request_category+b.request_type+cast(b.from_workflow_stage as varchar(3))+b.from_status+
								cast(b.to_workflow_stage as varchar(3))+b.to_status 
						  not in ( select c.request_category+c.request_type+
										  cast(c.from_workflow_stage as varchar(3))+c.from_status+
										  cast(c.to_workflow_stage as varchar(3))+c.to_status
								   from workflow_eventverb_list c
								   where c.company_id = @i_client_id
									 and c.country_code = @i_country_code
									 and c.transaction_type_code = 'CUSTOMERORDER'
									 and cast(c.request_category as varchar(10)) like 
										case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
									 and cast(c.request_type as varchar(10)) like 
										 case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  							)					
			return
		end

  
		
		if (@p_lov_code_type = 'SUPPLIER_LIST')
	begin
		select '' as value_list,
			'{'+
				'"code":"' + a.supplier_id + '",' +
				'"description":"' + a.supplier_name + '"' +
			'}' as o_value_xml
		from supplier a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code

		return
	end

	if (@p_lov_code_type = 'SUPPLIERLOCATION_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + location_code + '",' +
				'"description":"' + location_name_short + '",' +
				'"state":"' + state_code + '"' +
			'}' as o_value_xml
		from supplier_location
		where company_id = @i_client_id
			and country_code = @i_country_code
			and supplier_id = @p_search_field_1
		return
	end

	if (@p_lov_code_type = 'CUSTOMERORDER_STATUSCHANGE_REASONCODES')
	begin
		if @p_search_field_1 != 'STATUSCHANGE'
		begin		
			select '' as value_list,
				'<code>' + a.code + '</code>' +
				'<description>' + 
					(case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = @p_search_field_1+'REASCD'
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = @p_search_field_1+'REASCD'
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = @p_search_field_1+'REASCD'
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = @p_search_field_1+'REASCD'
		end
		return		
	end

	if (@p_lov_code_type = 'SALESINVOICE_STATUSCHANGE_REASONCODES')
	begin
		if @p_search_field_1 != 'STATUSCHANGE'
		begin		
			select '' as value_list,
				'<code>' + a.code + '</code>' +
				'<description>' + 
					(case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = @p_search_field_1+'REASCD'
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = @p_search_field_1+'REASCD'
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = @p_search_field_1+'REASCD'
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = @p_search_field_1+'REASCD'
		end
		return		
	end

	if (@p_lov_code_type = 'INVADJ_ALLOWED_EVENTVERB_LIST') 
	begin
	
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
			'<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
			'<to_status>'+to_status+'</to_status>'+
			'<event_verb>'+eventverb_id+'</event_verb>'
		as o_value_xml
		from workflow_eventverb_list
		where company_id = @i_client_id
			and country_code = @i_country_code
			and transaction_type_code = 'INVADJ'
			and cast(request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
			and cast(request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
			and cast(from_workflow_stage as varchar(3)) like 
			case @p_search_field_3 when 'ALL' then '%' else @p_search_field_3 end
			and from_status like 			
			case @p_search_field_4 when 'ALL' then '%' else @p_search_field_4 end
		union all
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
			'<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
			'<to_status>'+to_status+'</to_status>'+
			'<event_verb>STATUSCHANGE</event_verb>'
		as o_value_xml
		from workflow_status_link b
		where b.company_id = @i_client_id
			and b.country_code = @i_country_code
			and b.transaction_type_code = 'INVADJ'
			and cast(b.request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
			and cast(b.request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
			and b.request_category+b.request_type+cast(b.from_workflow_stage as varchar(3))+b.from_status+
							cast(b.to_workflow_stage as varchar(3))+b.to_status 
						not in ( select c.request_category+c.request_type+
										cast(c.from_workflow_stage as varchar(3))+c.from_status+
										cast(c.to_workflow_stage as varchar(3))+c.to_status
								from workflow_eventverb_list c
								where c.company_id = @i_client_id
									and c.country_code = @i_country_code
									and c.transaction_type_code = 'INVADJ'
									and cast(c.request_category as varchar(10)) like 
									case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
									and cast(c.request_type as varchar(10)) like 
										case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  						)					
		return
	end	

	if (@p_lov_code_type = 'CUSTORD_DETAIL')
	begin

		select '' as value_list,
			  '{' +
				'"item_code":"'+ isnull(item_code,'')+'",'+
				'"item_variant_code":"'+ isnull(item_variant_code,'')+'",'+
				'"uom_code_description":"'+ isnull(dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ITEMUOM',uom_code),'')+'",'+
				'"pending_quantity":"'+ left(cast(isnull(order_quantity - invoiced_quantity,0) as varchar(15)),len(isnull(order_quantity - invoiced_quantity,0)) - 2) +'"'+
		'}'
		 as  o_value_xml
		from customer_order_detail 
		where company_id = @i_client_id
		and country_code = @i_country_code
		and order_no = @p_search_field_1
		order by order_item_sl_no

		return
	end

		/* Remove existing FILEATTACHPATH and add snippet */
													 
 
	if (@p_lov_code_type = 'FILEATTACHPATH')
		begin
			if (@p_search_field_1 = 'CALL')
			begin		
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + 
						(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'CALLATTACHPATH'
								and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'CALLATTACHPATH'
								and e.code = a.code)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'CALLATTACHPATH'
							and g.code = a.code)
						end)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'CALLATTACHPATH'
			end
			else if (@p_search_field_1 = 'JOB')
			begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + 
						(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'JOBATTACHPATH'
								and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'JOBATTACHPATH'
								and e.code = a.code)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'JOBATTACHPATH'
							and g.code = a.code)
						end)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'JOBATTACHPATH'
			end
			else if (@p_search_field_1 = 'EXPENSE')
			begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + 
						(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'EXPDOCATTACHPATH'
								and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'EXPDOCATTACHPATH'
								and e.code = a.code)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'EXPDOCATTACHPATH'
							and g.code = a.code)
						end)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'EXPDOCATTACHPATH'
			end
			else if (@p_search_field_1 = 'INVOICE')
			begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + 
						(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'INVOICEATTACHPATH'
								and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'INVOICEATTACHPATH'
								and e.code = a.code)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'INVOICEATTACHPATH'
							and g.code = a.code)
						end)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'INVOICEATTACHPATH'
			end
			else if (@p_search_field_1 = 'PWCLAIM')
			begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + 
						(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'PWCLAIMATTACHPATH'
								and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'PWCLAIMATTACHPATH'
								and e.code = a.code)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'PWCLAIMATTACHPATH'
							and g.code = a.code)
						end)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'PWCLAIMATTACHPATH'
			end
			else if (@p_search_field_1 = 'USERPHOTO')
			begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + 
						(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'USERPHOTOPATH'
								and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'USERPHOTOPATH'
								and e.code = a.code)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'USERPHOTOPATH'
							and g.code = a.code)
						end)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'USERPHOTOPATH'
			end
			else if (@p_search_field_1 = 'IMPORT')
			begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + 
						(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'IMPORTUPLOADPATH'
								and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'IMPORTUPLOADPATH'
								and e.code = a.code)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'IMPORTUPLOADPATH'
							and g.code = a.code)
						end)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'IMPORTUPLOADPATH'
			end
			else if (@p_search_field_1 = 'PROJECT')
			begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + 
						(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'PROJECTATTACHPATH'
								and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'PROJECTATTACHPATH'
								and e.code = a.code)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'PROJECTATTACHPATH'
							and g.code = a.code)
						end)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'PROJECTATTACHPATH'
			end
			else if (@p_search_field_1 = 'DOCSTORE')
			begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + 
						(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'DOCSPATH'
								and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'DOCSPATH'
								and e.code = a.code)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'DOCSPATH'
							and g.code = a.code)
						end)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'DOCSPATH'
			end
			else if (@p_search_field_1 = 'QUOTATION')
			begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + 
						(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'QUOTATIONATTACHPATH'
								and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'QUOTATIONATTACHPATH'
								and e.code = a.code)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'QUOTATIONATTACHPATH'
							and g.code = a.code)
						end)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'QUOTATIONATTACHPATH'
			end
			else if (@p_search_field_1 = 'PARTSORDER')
			begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + 
						(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'PARTSORDERATTACHPATH'
								and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'PARTSORDERATTACHPATH'
								and e.code = a.code)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'PARTSORDERATTACHPATH'
							and g.code = a.code)
						end)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'PARTSORDERATTACHPATH'
			end
			else if (@p_search_field_1 = 'CUSTOMERORDER')
			begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + 
						(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'CUSTOMERORDERATTACHPATH'
								and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'CUSTOMERORDERATTACHPATH'
								and e.code = a.code)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'CUSTOMERORDERATTACHPATH'
							and g.code = a.code)
						end)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'CUSTOMERORDERATTACHPATH'
			end									
			else if (@p_search_field_1 = 'SALESINVOICE')
			begin
				select '' as value_list,
					'<code>' + a.code + '</code>' +
					'<description>' + 
						(case (select 1 from code_table_mlingual_translation f
							where f.company_id = @i_client_id
								and f.country_code = @i_country_code
								and f.locale_id = @i_locale_id
								and f.code_type = 'SALESINVOICEATTACHPATH'
								and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
							where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'SALESINVOICEATTACHPATH'
								and e.code = a.code)
						else
						(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'SALESINVOICEATTACHPATH'
							and g.code = a.code)
						end)
					+ '</description>'
				as o_value_xml
				from code_table a
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.code_type = 'SALESINVOICEATTACHPATH'
			end
		return
	end
	
	if (@p_lov_code_type = 'COMPETITOR_NAME_LIST')
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
		return
	end

	if (@p_lov_code_type = 'COMPETITOR_PRODUCT_CODE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'COMPETITORPRODUCT'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'COMPETITORPRODUCT'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'COMPETITORPRODUCT'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'COMPETITORPRODUCT'
		return
	end


	/* */
	
	
	/* Parts Order */
	
	if (@p_lov_code_type = 'PARTSORDER_ALLOWED_EVENTVERB_LIST') 
		begin
	
			select '' as value_list,
				'<request_category>'+request_category+'</request_category>'+
				'<request_type>'+request_type+'</request_type>'+
				'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
				'<from_status>'+from_status+'</from_status>'+
				'<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
				'<to_status>'+to_status+'</to_status>'+
				'<event_verb>'+eventverb_id+'</event_verb>'
			as o_value_xml
			from workflow_eventverb_list
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and transaction_type_code = 'PARTSORDER'
			  and cast(request_category as varchar(10)) like 
				case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
			  and cast(request_type as varchar(10)) like 
				case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
			  and cast(from_workflow_stage as varchar(3)) like 
				case @p_search_field_3 when 'ALL' then '%' else @p_search_field_3 end
			  and from_status like 			
				case @p_search_field_4 when 'ALL' then '%' else @p_search_field_4 end
			union all
			select '' as value_list,
				'<request_category>'+request_category+'</request_category>'+
				'<request_type>'+request_type+'</request_type>'+
				'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
				'<from_status>'+from_status+'</from_status>'+
				'<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
				'<to_status>'+to_status+'</to_status>'+
				'<event_verb>STATUSCHANGE</event_verb>'
			as o_value_xml
			from workflow_status_link b
			where b.company_id = @i_client_id
			  and b.country_code = @i_country_code
			  and b.transaction_type_code = 'PARTSORDER'
			  and cast(b.request_category as varchar(10)) like 
				case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
			  and cast(b.request_type as varchar(10)) like 
				case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
			  and b.request_category+b.request_type+cast(b.from_workflow_stage as varchar(3))+b.from_status+
								cast(b.to_workflow_stage as varchar(3))+b.to_status 
						  not in ( select c.request_category+c.request_type+
										  cast(c.from_workflow_stage as varchar(3))+c.from_status+
										  cast(c.to_workflow_stage as varchar(3))+c.to_status
								   from workflow_eventverb_list c
								   where c.company_id = @i_client_id
									 and c.country_code = @i_country_code
									 and c.transaction_type_code = 'PARTSORDER'
									 and cast(c.request_category as varchar(10)) like 
										case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
									 and cast(c.request_type as varchar(10)) like 
										 case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  							)					
			return
		end		

		if (@p_lov_code_type = 'PARTORDCATG_LIST')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.code + '",' +
					'"description":"' + 
						case (select 1 from code_table_mlingual_translation f
								where f.company_id = @i_client_id
									and f.country_code = @i_country_code
									and f.locale_id = @i_locale_id
									and f.code_type = 'PARTORDCATG'
									and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
								where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'PARTORDCATG'
								and e.code = a.code)
						else
							(select g.short_description from code_table_mlingual_translation g
								where g.company_id = @i_client_id
								and g.country_code = @i_country_code
								and g.locale_id = 'ALL'
								and g.code_type = 'PARTORDCATG'
								and g.code = a.code)
						end + '"' +
				'}' as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'PARTORDCATG'

			return
		end

		if (@p_lov_code_type = 'PARTORDTYPE_LIST')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.code + '",' +
					'"description":"' + 
						case (select 1 from code_table_mlingual_translation f
								where f.company_id = @i_client_id
									and f.country_code = @i_country_code
									and f.locale_id = @i_locale_id
									and f.code_type = 'PARTORDTYPE'
									and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
								where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'PARTORDTYPE'
								and e.code = a.code)
						else
							(select g.short_description from code_table_mlingual_translation g
								where g.company_id = @i_client_id
								and g.country_code = @i_country_code
								and g.locale_id = 'ALL'
								and g.code_type = 'PARTORDTYPE'
								and g.code = a.code)
						end + '"' +
				'}' as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'PARTORDTYPE'

			return
		end

		if (@p_lov_code_type = 'PARTORDSTATUS_LIST')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.code + '",' +
					'"description":"' + 
						case (select 1 from code_table_mlingual_translation f
								where f.company_id = @i_client_id
									and f.country_code = @i_country_code
									and f.locale_id = @i_locale_id
									and f.code_type = 'PARTORDSTATUS'
									and f.code = a.code)
						when 1 then
							(select e.short_description from code_table_mlingual_translation e
								where e.company_id = @i_client_id
								and e.country_code = @i_country_code
								and e.locale_id = @i_locale_id
								and e.code_type = 'PARTORDSTATUS'
								and e.code = a.code)
						else
							(select g.short_description from code_table_mlingual_translation g
								where g.company_id = @i_client_id
								and g.country_code = @i_country_code
								and g.locale_id = 'ALL'
								and g.code_type = 'PARTORDSTATUS'
								and g.code = a.code)
						end + '"' +
				'}' as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = 'PARTORDSTATUS'

			return
		end

		if (@p_lov_code_type = 'PARTORDTYPE_LIST_LINK')
		begin
			select '' as value_list,
				'{' +
					'"code":"' + a.type_code_value + '",' +
					'"description":"' + 
					case (select 1 from code_table_mlingual_translation f
						  where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'PARTORDTYPE'
							and f.code = a.type_code_value)
					when 1 then
					(select e.short_description from code_table_mlingual_translation e
					 where e.company_id = @i_client_id
					   and e.country_code = @i_country_code
					   and e.locale_id = @i_locale_id
					   and e.code_type = 'PARTORDTYPE'
					   and e.code = a.type_code_value)
					else
					(select g.short_description from code_table_mlingual_translation g
					 where g.company_id = @i_client_id
					   and g.country_code = @i_country_code
					   and g.locale_id = 'ALL'
					   and g.code_type = 'PARTORDTYPE'
					   and g.code = a.type_code_value)
					end + '"' +
				'}' as o_value_xml
			from category_type_link a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.link_type = 'PC'
				and a.category_code_value = @p_search_field_1

			return
		end
		 if (@p_lov_code_type = 'GET_HSNGST_TAX_DETAILS_ADDLCHRGS')
			begin

				declare @p_tax_code nvarchar(30), @p_tax_value nvarchar(30)

				select @p_tax_code = product_udf_char_1, 
					   @p_tax_value = product_udf_char_2
						from sales_addlcharge_code_master 
						where company_id = @i_client_id
							and country_code	= @i_country_code 
							and charge_category = @p_search_field_3

				if(@p_search_field_1 = 'OVERALL')
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
							and b.charge_category = @p_search_field_3
				end
		return
	end
   if (@p_lov_code_type = 'COPY_QUOTATION_LIST')
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
				and (qh.quotation_no like '%' + @p_search_field_1 + '%')
				and qh.quotation_category = @p_search_field_2
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
				and qh.quotation_category = @p_search_field_2
				and (qh.quotation_no like '%' + @p_search_field_1 + '%')
					
		end
		--set @o_retrieve_status = 'SUCCESS'
		return	
	end
	 if (@p_lov_code_type = 'INVOICEACCESSORY_ITEM_LINK')
		begin
			select top(100)'' as value_list,
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
					'"salesinvoice_item_code":"' + @p_search_field_1 + '",' +
					'"salesinvoice_item_variant_code":"' + @p_search_field_2 + '",' +
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

			--set @o_retrieve_status = 'SUCCESS'
			return
		end
		 if (@p_lov_code_type = 'QUOTATIONACCESSORY_ITEM_LINK')
			begin
				select top(100)'' as value_list,
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
						'"quotation_item_code":"' + @p_search_field_1 + '",' +
						'"quotation_item_variant_code":"' + @p_search_field_2 + '",' +
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
						--'"uom_code_description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ITEMUOM_LIST',b.uom_code) + '",' +
						--'"currency_code_description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CURRENCYCODE_LIST',b.currency_code) + '",' +
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
					
				
				return
		end
		if (@p_lov_code_type = 'PARTSORDER_STATUSCHANGE_REASONCODES')
		begin
		if @p_search_field_1 != 'STATUSCHANGE'
		begin		
			select '' as value_list,
				'<code>' + a.code + '</code>' +
				'<description>' + 
					(case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = @p_search_field_1+'REASCD'
							and f.code = a.code)
					when 1 then
						(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.locale_id = @i_locale_id
							and e.code_type = @p_search_field_1+'REASCD'
							and e.code = a.code)
					else
					(select g.short_description from code_table_mlingual_translation g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = @p_search_field_1+'REASCD'
						and g.code = a.code)
					end)
				+ '</description>'
			as o_value_xml
			from code_table a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.code_type = @p_search_field_1+'REASCD'
		end
		return		
	end	
		
		
	if (@p_lov_code_type = 'CUSTOMERLOCATION_LIST')
	begin
		select '' as value_list,
		   '{' + 
			   '"id":"'+a.location_code+'",'+
			   '"name":"'+a.address_line_1 + ' ' + a.city+'"'+
		   '}' as o_value_xml
		from customer_location a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.customer_id = @p_search_field_1
		return
	end
	
	if (@p_lov_code_type = 'FINANCIERLOCATION_LIST')
	begin
		select '' as value_list,
		   '{' + 
			   '"id":"'+a.location_code+'",'+
			   '"name":"'+a.address_line_1 + ' ' + a.city+'"'+
		   '}' as o_value_xml
		from financier_location a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.financier_id = @p_search_field_1
		return
	end

	


if (@p_lov_code_type = 'ANCILLARYCALLSTATUS_LIST')
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
			and a.transaction_type_code = 'ANCILLARY'
			and a.request_category = @p_search_field_1
		return
	end
	
	
	if (@p_lov_code_type = 'CITY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.city_code + '",' +
				'"description":"' + ISNULL(a.city_name, '') + '"' +
			'}' as o_value_xml
		from city_master a		
		where a.country_code = @p_search_field_1
			and a.state_code = @p_search_field_2
		return
	end
	
	
	if (@p_lov_code_type = 'ANCILLARY_ALLOWED_EVENTVERB_LIST') 
	begin
	
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>'+eventverb_id+'</event_verb>'
		as o_value_xml
		from workflow_eventverb_list
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and transaction_type_code = 'ANCILLARY'
		  and cast(request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and cast(from_workflow_stage as varchar(3)) like 
			case @p_search_field_3 when 'ALL' then '%' else @p_search_field_3 end
		  and from_status like 			
			case @p_search_field_4 when 'ALL' then '%' else @p_search_field_4 end
		union all
		select '' as value_list,
			'<request_category>'+request_category+'</request_category>'+
			'<request_type>'+request_type+'</request_type>'+
			'<from_workflow_stage>'+CAST(from_workflow_stage as varchar(3))+'</from_workflow_stage>'+
			'<from_status>'+from_status+'</from_status>'+
		    '<to_workflow_stage>'+CAST(to_workflow_stage as varchar(3))+'</to_workflow_stage>'+
		    '<to_status>'+to_status+'</to_status>'+
			'<event_verb>STATUSCHANGE</event_verb>'
		as o_value_xml
		from workflow_status_link b
		where b.company_id = @i_client_id
		  and b.country_code = @i_country_code
		  and b.transaction_type_code = 'ANCILLARY'
		  and cast(b.request_category as varchar(10)) like 
			case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
		  and cast(b.request_type as varchar(10)) like 
			case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  and b.request_category+b.request_type+cast(b.from_workflow_stage as varchar(3))+b.from_status+
							cast(b.to_workflow_stage as varchar(3))+b.to_status 
					  not in ( select c.request_category+c.request_type+
									  cast(c.from_workflow_stage as varchar(3))+c.from_status+
									  cast(c.to_workflow_stage as varchar(3))+c.to_status
							   from workflow_eventverb_list c
							   where c.company_id = @i_client_id
							     and c.country_code = @i_country_code
							     and c.transaction_type_code = 'ANCILLARY'
								 and cast(c.request_category as varchar(10)) like 
									case @p_search_field_1 when 'ALL' then '%' else @p_search_field_1 end
								 and cast(c.request_type as varchar(10)) like 
									 case @p_search_field_2 when 'ALL' then '%' else @p_search_field_2 end
		  						)					
		return
	end
	
	if (@p_lov_code_type = 'CALL_LOGGING_LEADSUBSOURCE')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'LEADSUBSOURCE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'LEADSUBSOURCE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'LEADSUBSOURCE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'LS'
			and a.category_code_value = @p_search_field_1
		return
	end
	
	
	
		if (@p_lov_code_type = 'FINANCIERCATG_LIST')
	begin

		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'FINANCIERCATG'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'FINANCIERCATG'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'FINANCIERCATG'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'FINANCIERCATG'
			
		return
	end

	if (@p_lov_code_type = 'FINANCIERTYPE_LIST')
	begin

		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'FINANCIERTYPE'
							and f.code = a.code)
				when 1 then
					(select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'FINANCIERTYPE'
						and e.code = a.code)
				else
					(select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'FINANCIERTYPE'
						and g.code = a.code)
				end + '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'FINANCIERTYPE'
			
		return
	end

	if (@p_lov_code_type = 'FINANCIERTYPE_LIST_LINKED')
	begin

		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'FINANCIERTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'FINANCIERTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'FINANCIERTYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'FC'
			and a.category_code_value = @p_search_field_1
			
		return
	end

	if (@p_lov_code_type = 'FINANCIERID_LIST')
	begin

		select '' as value_list,
		   '{' + 
			   '"code":"'+a.financier_id+'",'+
			   '"description":"'+a.financier_name+'"'+
		   '}' as o_value_xml
		from financier a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			
		return
	end

	if (@p_lov_code_type = 'PAYMENTMODE_LIST')
	begin

		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'PAYMENTMODE',a.code)+ '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'PAYMENTMODE'
			
		return
	end

	if (@p_lov_code_type = 'FINANCIERID_LIST_LINKED')
	begin

		select '' as value_list,
		   '{' + 
			   '"code":"'+a.financier_id+'",'+
			   '"description":"'+a.financier_name+'"'+
		   '}' as o_value_xml
		from financier a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.financier_category = @p_search_field_1
			and a.financier_type = @p_search_field_2
			
		return
	end

		if (@p_lov_code_type = 'ACTIONCATEGORY_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ACTIONCATG',a.code)+ '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ACTIONCATG'
		return
	end	
	
	if (@p_lov_code_type = 'ACTIONTYPE_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ACTIONTYPE',a.code)+ '"' +
					
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'ACTIONTYPE'
		return
	end	
	
	if (@p_lov_code_type = 'ACTIONTYPE_LIST_LINKED')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.type_code_value + '",' +
				'"description":"' + 
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'ACTIONTYPE'
						and f.code = a.type_code_value)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'ACTIONTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'ACTIONTYPE'
				   and g.code = a.type_code_value)
				end + '"' +
			'}' as o_value_xml
		from category_type_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.link_type = 'AC'
			and a.category_code_value = @p_search_field_1
		return
	end

	if (@p_lov_code_type = 'APPID_LIST')
	begin
		select '' as value_list,
			'{' +
				'"code":"' + a.code + '",' +
				'"description":"' + dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'APPID',a.code)
					+ '"' +
			'}' as o_value_xml
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'APPID'
		return
	end	

	if (@p_lov_code_type = 'GET_CUST_ASSET_MAP_DETAILS')
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
			and customer_id = @p_search_field_1
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
	

    SET NOCOUNT OFF;
END

