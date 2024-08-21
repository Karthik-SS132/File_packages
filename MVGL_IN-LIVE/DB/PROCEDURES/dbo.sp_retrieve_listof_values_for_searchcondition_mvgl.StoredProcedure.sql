DROP PROCEDURE [dbo].[sp_retrieve_listof_values_for_searchcondition_mvgl]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 /* Generic function to retrieve list of values for a search condition
 */
CREATE PROCEDURE [dbo].[sp_retrieve_listof_values_for_searchcondition_mvgl] 
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

	declare @p_dealer_home_org_level_no tinyint, @p_dealer_home_org_level_code nvarchar(15)
			
	select @p_from_date_filter = paramval from #input_params where paramname = 'from_date_filter'
	select @p_to_date_filter = paramval from #input_params where paramname = 'to_date_filter'
	select @p_company_location_filter = paramval from #input_params where paramname = 'company_location_filter'
	select @p_assigned_to_emp_id_filter = paramval from #input_params where paramname = 'assigned_to_emp_id_filter'
	select @p_reporting_to_emp_id_filter = paramval from #input_params where paramname = 'reporting_to_emp_id_filter'
	select @p_dealer_id_filter = paramval from #input_params where paramname = 'dealer_id_filter'

	
	if (@i_lov_code_type = 'GET_HSNGST_TAX_DETAILS_ADDLCHRGS')
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
	else if (@i_lov_code_type = 'CALL_REGISTER_ACTIONS')
	begin
			select '' as value_list,
			'{' + 
			'"item_code":"'+ isnull(a.product_code,'') +'",'+
			'"item_variant_code":"'+ isnull(a.product_sub_code,'') +'",'+
			'"uom_code":"'+ isnull(a.uom_code,'') +'",'+
			'"net_quantity":"'+ cast(ISNULL(a.no_of_units,0) as varchar(13)) +'",'+
			'"std_rate":"'+ 
					isnull(( select cast(ISNULL(c.std_rate,0) as varchar(13)) 
					   from item_rate c
					   where c.company_id = @i_client_id
						 and c.country_code = @i_country_code
						 and c.item_code = a.product_code
						 and c.item_variant_code = a.product_sub_code
						 and c.uom_code = a.uom_code
					),'0')+'",'+
			'"gross_amount":"'+ 
					isnull((select isnull(cast((round(a.no_of_units * c.std_rate, 0)) as varchar(19)),0) 
					   from item_rate c
					   where c.company_id = @i_client_id
						 and c.country_code = @i_country_code
						 and c.item_code = a.product_code
						 and c.item_variant_code = a.product_sub_code
						 and c.uom_code = a.uom_code), '0')
			+'",'+
			'"currency_code":"'+ 
			isnull((select isnull(c.currency_code,'') 
					   from item_rate c
					   where c.company_id = @i_client_id
						 and c.country_code = @i_country_code
						 and c.item_code = a.product_code
						 and c.item_variant_code = a.product_sub_code
						 and c.uom_code = a.uom_code), '')		
			+'",'+
			'"action_seq_no":"'+ cast(ISNULL(a.action_seqno,0) as varchar(2)) +'",'+
			'"action_category":"'+ isnull(a.action_category,'') +'",'+
			'"action_type":"'+ isnull(a.action_type,'') +'",' + 	
			'"requirement":"'+ isnull(a.requirement,'') +'",' + 	
			'"item_code_description":"'+  
			isnull(( select b.item_description
			  from item_master b
			  where b.company_id = @i_client_id
			    and b.country_code = @i_country_code
				and b.item_code = a.product_code
				and (b.item_variant_code = a.product_sub_code or b.item_variant_code='NA') 
				), a.requirement)
			+'",' + 
			'"item_variant_code_description":"'+ 
			isnull(( select b.variant_description
			  from item_master b
			  where b.company_id = @i_client_id
			    and b.country_code = @i_country_code
				and b.item_code = a.product_code
				and b.item_variant_code = a.product_sub_code
				), '') +'",' + 	
			'"uom_code_description":"'+ dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'ITEMUOM',a.uom_code) +'",' +
			'"currency_code_description":"'+isnull((select cd.description
					  from currency_code cd, item_rate ce
					  where ce.company_id = @i_client_id
					    and ce.country_code = @i_country_code
						and ce.item_code = a.product_code
						and ce.item_variant_code = a.product_sub_code
						and ce.uom_code = a.uom_code
					    and cd.currency_code = ce.currency_code
					),'')
				+'",'+
			'"last_update_timestamp":"'+ cast(convert(uniqueidentifier,cast(a.last_update_timestamp as binary)) as varchar(36))+'"'+
			'}' as o_value_xml
			 from call_register_actions a
			 where a.company_id				= @i_client_id
			 and   a.country_code			= @i_country_code
			 and   a.call_ref_no			= @i_search_field_1 		

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
				--'"net_quantity":"' + convert(nvarchar(5),a.item_quantity_per) + '",' +
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
				--'"gross_amount":"' + convert(nvarchar(18),b.std_rate * a.item_quantity_per) + '",' +
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
			/* Because we don't have equipment for Liugong only direct spares 

				and a.link_type = 'EQACCESSORYPARTNO'
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
		
		-------------My Recommendations-----------------

	else if (@i_lov_code_type = 'my_team')
	begin
		/* Bring the list of PE and SA calls */
		select '' as value_list,
		'{' + 
			'"sl_no":"1",' +
			'"last_updated_time":"' + substring(convert(varchar(10),sysdatetimeoffset(), 108), 1, 5) + '",' +
			'"emp_id":"' + r.call_mapped_to_employee_id  + '",' +	
			'"call_status":"' + case (select 1 from code_table_mlingual_translation f
				where f.company_id = @i_client_id
				  and f.country_code = @i_country_code
				  and f.locale_id = @i_locale_id
				  and f.code_type = 'CALLSTATUS'
				  and f.code = r.call_status)
			when 1 then
			(select e.short_description 
				from code_table_mlingual_translation e
			where e.company_id = @i_client_id
			  and e.country_code = @i_country_code
			  and e.locale_id = @i_locale_id
              and e.code_type = 'CALLSTATUS'
              and e.code = r.call_status)
			else
			(select g.short_description from code_table_mlingual_translation g
			where g.company_id = @i_client_id
			  and g.country_code = @i_country_code
			  and g.locale_id = 'ALL'
              and g.code_type = 'CALLSTATUS'
              and g.code = r.call_status)
         end +
		 + '",' +
			'"call_ref_no":"' + r.call_ref_no + '",' +
			'"cust_cont_name":"' +  r.customer_contact_name + '",' +
			'"cust_cont_no":"' +  r.customer_contact_no + '",' +
			'"cust_name":"' + (
						select c.customer_name
						from customer c
						where c.company_id = r.company_id
							and c.country_code = r.country_code
							and c.customer_id = r.customer_id
					)   + '"' + 
		'}' as o_value_xml
		from call_register r 
		where r.company_id = @i_client_id
		  and r.country_code = @i_country_code
		  and r.call_category in ('SA','PE')
		  and r.call_mapped_to_employee_id = @i_search_field_1

		set @o_retrieve_status = 'SUCCESS'
		return
		end
		
	/* Bring the list of parts for selected PE or SA call */
	else if (@i_lov_code_type = 'my_team_call_reg_actions')
	begin
		select '' as value_list,
		'{' + 
		    '"call_ref_no":"' + a.call_ref_no + '",' +
		    '"quantity":"'+ cast(ISNULL(a.no_of_units,0) as varchar(13)) +'",'+
			'"Part_no":"' + a.product_code + '",' +
			'"addn_desc":"' + a.requirement + '",' +
			'"Uom":"' + a.uom_code + '"' +
		'}' as o_value_xml
		from call_register_actions a, call_register b
		where (a.sys_gen_call_ref_no = @i_search_field_2 or a.call_ref_no = @i_search_field_2)
		and b.call_ref_no = @i_search_field_2
		and (a.sys_gen_call_ref_no = b.call_ref_no or a.call_ref_no = b.call_ref_no)
		and b.call_mapped_to_employee_id = @i_search_field_1
		and a.company_id = b.company_id
		and a.country_code = b.country_code
		and a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and b.company_id = @i_client_id
		and b.country_code = @i_country_code

		set @o_retrieve_status = 'SUCCESS'
		return 
	end 
	

	/* Bring the quotation of the selected PE or SA call*/
	else if (@i_lov_code_type = 'my_team_call_user_attachments')
	begin   
		select '' as value_list,
		'{' + 
		    '"attachment_file_name":"' + ( select top (1) isnull(a.attachment_file_name,'') from call_user_attachments a, call_register b
			where a.call_ref_no = @i_search_field_2
			and b.call_ref_no = @i_search_field_2
			and a.call_ref_no = b.call_ref_no
			and b.call_mapped_to_employee_id = @i_search_field_1
			and b.company_id =  @i_client_id
			and b.country_code = @i_country_code
			order by a.attachment_file_sysgen_id desc
			) + '",' +
			'"call_ref_no":"' +  @i_search_field_2 + '"' +
		    '}' as o_value_xml
			
		set @o_retrieve_status = 'SUCCESS'
		return 
	end 
	


	/* Bring the events of the selected PE or SA call*/
	else if (@i_lov_code_type = 'my_team_call_status_event_log')
	begin
		select '' as value_list,
		'{' + 
		   '"event_date":"' + isnull(convert(varchar(10), a.event_date, 120), '') + '",' +
		   '"event_date_hour":"' + isnull(convert(varchar, datepart(hour, a.event_date)), '') + '",' +
			'"event_date_minute":"' + isnull(convert(varchar, datepart(minute, a.event_date)), '') + '",' +
			'"eventverb_id":"' + a.eventverb_id + '"' +
		'}' as o_value_xml
		from call_status_event_log a, call_register b
		where a.call_ref_no = @i_search_field_2
		and b.call_ref_no = @i_search_field_2
		and a.call_ref_no = b.call_ref_no
		and b.call_mapped_to_employee_id = @i_search_field_1
		and a.company_id = b.company_id
		and a.country_code = b.country_code
		and a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and b.company_id = @i_client_id
		and b.country_code = @i_country_code
		order by a.event_id desc

		set @o_retrieve_status = 'SUCCESS'
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
		
		else if (@i_lov_code_type = 'GET_CUST_ASSET_MAP_DETAILS')
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
	
    SET NOCOUNT OFF;
END
GO
