/****** Object:  StoredProcedure [dbo].[sp_retrieve_listof_values_acopco]    Script Date: 10/17/2023 11:19:16 AM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_listof_values_acopco')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_listof_values_acopco]
END

																																								
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_retrieve_listof_values_acopco] 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_lov_code [uddt_varchar_60], 
    @i_search_field_1 [uddt_nvarchar_60], 
    @i_search_field_2 [uddt_nvarchar_60], 
    @i_search_field_3 [uddt_nvarchar_60], 
    @i_search_field_4 [uddt_nvarchar_60], 
    @i_search_field_5 [uddt_nvarchar_60],
    @o_retrieve_status [varchar] (10) OUTPUT
AS
BEGIN
	if @i_lov_code = 'CUSTOMER_LIST'
	begin
		select '' as value_list,
			'ZZZ' as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'ZZZ' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		union all
		select '' as value_list,
			customer_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			customer_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from customer
		where company_id = @i_client_id
			and country_code = @i_country_code
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code = 'CUSTOMERLOCATION_LIST')
	begin
		if @i_search_field_1 = 'ZZZ'
		begin
			select '' as value_list,
			'ZZZ' as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'ZZZ' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		end
		else
		begin
			select '' as value_list,
				location_code as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				address_line_1 + ' ' + city as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from customer_location
			where company_id = @i_client_id
				and country_code = @i_country_code
				and customer_id = @i_search_field_1
		end
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code = 'ALLOW_EVENTVERB_ACCESS')
	begin	
		select '' as value_list,
			convert(varchar(2),allow_newtxn_ind) as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from  employee_lastaccess_info
		where company_id = @i_client_id
		and country_code = @i_country_code
			and allow_newtxn_ind = '0'
			and last_accessed_txn_ref_no  = @i_search_field_1 
			and last_accessed_channel_id = 'mobile'

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code = 'EQUIPMENT_LIST')
	begin
		if (@i_search_field_1 = 'ZZZ')
		begin
			select '' as value_list,
				'ZZZ' as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'ZZZ' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			union all
			select '' as value_list,
				equipment_id as o_value_field_1,
				servicing_org_level_no as o_value_field_2,
				servicing_org_level_code as o_value_field_3,
				description as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from equipment
			where company_id = @i_client_id
				and country_code = @i_country_code	
		end
		else
		begin
			select '' as value_list,
				'ZZZ' as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'ZZZ' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			union all
			select distinct '' as value_list,
				b.equipment_id as o_value_field_1,
				a.servicing_org_level_no as o_value_field_2,
				a.servicing_org_level_code as o_value_field_3,
				a.description as o_description_field_1,
				b.customer_id as o_description_field_2,
				'' as o_description_field_3
			from equipment a, asset_master b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and b.company_id = a.company_id
				and b.country_code = a.country_code
				and b.customer_id = @i_search_field_1
				and b.equipment_id = a.equipment_id
		end
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code = 'COMMISSION_CHECK')
	begin	
		select '' as value_list,
			asset_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from asset_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and asset_id = @i_search_field_1
			and ( isnull(installation_date, '') != ''
				  or
				  (select count(*) from call_register
				   where company_id = @i_client_id
				     and country_code = @i_country_code
				     and asset_id = @i_search_field_1
				     and call_type = 'COMM' 
					) > 1
				)
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if (@i_lov_code = 'TRADER_CUSTOMER_CHECK')
		begin	
			select '' as value_list,
				a.customer_id as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from customer a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.customer_id = @i_search_field_1
				and a.customer_category ='Traders'
			set @o_retrieve_status = 'SUCCESS'
			return
		end
	else if (@i_lov_code = 'LINKED_WITH_PE_BY_ASSET')
	begin
		select '' as value_list,
			a.call_ref_no as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
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
				udf_analysis_code2 as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from expdoc_header 


		return
	end
	else if (@i_lov_code = 'EXPDOC_SUBMIT_FOR_APPROVAL_DEALER')
	begin

		if exists (select 1 from expdoc_header where expdoc_ref_no = @i_search_field_1)
		begin	
			declare @p_exp_category varchar(20),@p_net_amount varchar(20),@p_udf_value nvarchar(40), @call_type varchar(20)

			select @p_exp_category = expdoc_category,
				@p_net_amount = expdoc_net_amount,
				@p_udf_value = udf_analysis_code2
                    from expdoc_header where expdoc_ref_no = @i_search_field_1
			
				
			select @call_type = call_type from call_register
			where call_ref_no in (select txn_ref_no from expdoc_header where expdoc_ref_no = @i_search_field_1)

			if (@p_net_amount != '0.0000')
			begin
				if((@p_exp_category !='COMM') or  (@p_exp_category != 'GOODWILL'))
				begin
					/*	if (@i_search_field_2 != 0 and  @call_type = 'SCHMTNCE')
						begin
							
							if (@p_udf_value != '')
							begin
								select  '' as value_list, 
								'valid' as o_value_field_1,
								'' as o_value_field_2,
								'' as o_value_field_3,
								'' as o_description_field_1,
								'' as o_description_field_2,
								'' as o_description_field_3
							end
							else
							begin
								select  '' as value_list,
								 'Linking with PE not valid' as o_value_field_1,
								'' as o_value_field_2,
								'' as o_value_field_3,
								'' as o_description_field_1,
								'' as o_description_field_2,
								'' as o_description_field_3
							end

						end
						else
						begin 
							select  '' as value_list,
							 'valid' as o_value_field_1,
							'' as o_value_field_2,
							'' as o_value_field_3,
							'' as o_description_field_1,
							'' as o_description_field_2,
							'' as o_description_field_3
						end
				end
				else
				begin 
					select  '' as value_list,
					 'valid' as o_value_field_1,
					'' as o_value_field_2,
					'' as o_value_field_3,
					'' as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
				end */
					select  ''		as value_list,
						'valid' as o_value_field_1,
						''		as o_value_field_2,
						''		as o_value_field_3,
						''		as o_description_field_1,
						''		as o_description_field_2,
						''		as o_description_field_3
			end
			else
				begin 
					select  '' as value_list,
					 'valid' as o_value_field_1,
					'' as o_value_field_2,
					'' as o_value_field_3,
					'' as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
				end
			end
			else 
			begin
				select  '' as value_list,
				'Net Amount is not valid for this claim' as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			end
		end
	

		select @o_retrieve_status = 'SUCCESS'
		return
	end
	else if @i_lov_code = 'EQUIPMENT_LIST_FILTER'
	begin
		select '' as value_list,
			'ZZZ' as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'ZZZ' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		union all
		select '' as value_list,
			equipment_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from equipment
		where company_id = @i_client_id
			and country_code = @i_country_code
			
		select @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code = 'CALLASSIGNTOPSLT_LIST')
	begin
					select '' as value_list,
					a.employee_id as o_value_field_1,
					'' as o_value_field_2,
					'' as o_value_field_3,
					b.title + ' ' + b.first_name + ' ' + ISNULL(b.middle_name,'') + ' ' + b.last_name as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
				from users a, employee b
				where a.company_id = @i_client_id
					and a.country_code = @i_country_code
					and a.company_id = b.company_id
					and a.country_code = b.country_code
					and a.employee_id = b.employee_id
					and b.employee_status = 'A'
					and a.user_group_id  in ('PSPLST_OEM','PROCOMPANY')
				
		select @o_retrieve_status = 'SUCCESS'
		return	
	end
	
	else if @i_lov_code = 'ASSET_LIST_FILTER'
	begin
		select '' as value_list,
			'ZZZ' as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'ZZZ' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		union all
		select '' as value_list,
			a.asset_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			b.description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from asset_master a, equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.equipment_id = b.equipment_id
			
		select @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if @i_lov_code = 'DEALER_EMPLOYEE'
	begin
		if @i_search_field_1 != ''
		begin
			select '' as value_list,
				a.employee_id as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				a.title + '.' + a.first_name + ' ' + isnull(a.middle_name, '') + ' ' + a.last_name as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from employee a, dealer_organogram_mapping b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.company_id = b.company_id
				and a.country_code = b.country_code
				and b.dealer_id = @i_search_field_1
				and a.organogram_level_no = b.organogram_level_no
				and a.organogram_level_code = b.organogram_level_code
			set @o_retrieve_status = 'SUCCESS'
			return
		end
		else
		begin
			select '' as value_list,
				a.employee_id as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				a.title + '.' + a.first_name + ' ' + isnull(a.middle_name, '') + ' ' + a.last_name as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from employee a
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.organogram_level_no = 3
				and a.organogram_level_code = 'CRS'
			set @o_retrieve_status = 'SUCCESS'
			return
		end
	end
	
	else if @i_lov_code = 'SERVICEVISITNO_LIST'
	begin
	
		select '' as value_list,
			service_visit_slno as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			(case service_visit_slno 
			 when 0 then 'Due for Commissioning'
			 else 'Due On [' + isnull(convert(varchar(10), service_due_date, 105),'') + ']' 
			 end) as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from asset_service_schedule
		where company_id = @i_client_id 
			and country_code = @i_country_code
			and asset_id = @i_search_field_1
			and service_visit_slno >= 
				(case (select 1 
						  from asset_master a1
						  where a1.company_id = @i_client_id
							and a1.country_code = @i_country_code
							and a1.asset_id = @i_search_field_1
							and a1.installation_date is not null)
				 when 1 then 
					isnull((SELECT MAX(service_visit_slno)
					 from asset_service_schedule a2
					 where a2.company_id = @i_client_id
					   and a2.country_code = @i_country_code
					   and a2.asset_id = @i_search_field_1
					   and a2.contract_doc_no = @i_search_field_2
					   and a2.service_visit_status in ('SP','CO')
					 ),0)+1
				 else 0
				 end 				 
				)
			and contract_doc_no = @i_search_field_2
			
			set @o_retrieve_status = 'SUCCESS'		
			return
	end
	
	else if  @i_lov_code = 'BUSINESSAREA'
	begin
		select distinct '' as value_list,
			a.code as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'BUSINESSAREA'
						and f.code = a.code
						)
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
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'BUSINESSAREA'	
		  	    
		select @o_retrieve_status = 'SUCCESS'

		return
	end
	
	else if  @i_lov_code = 'ACCTCODE'
	begin
		select distinct '' as value_list,
			a.code as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'ACCTCODE'
						and f.code = a.code
						)
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
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'ACCTCODE'	
		  	    
		select @o_retrieve_status = 'SUCCESS'

		return
	end
	
	else if  @i_lov_code = 'DIVISION'
	begin
		select distinct '' as value_list,
			a.code as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'DIVISION'
						and f.code = a.code
						)
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
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'DIVISION'	
		  	    
		select @o_retrieve_status = 'SUCCESS'

		return
	end
	
	else if  @i_lov_code = 'REGION'
	begin
		select distinct '' as value_list,
			a.code as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'REGION'
						and f.code = a.code
						)
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
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'REGION'	
		  	    
		select @o_retrieve_status = 'SUCCESS'

		return
	end
	
	else if (@i_lov_code = 'GENINVOICE_EXPDOC_LIST')
	begin 
		select '' as value_list,
		    a.expdoc_ref_no as o_value_field_1,
			/*isnull((select case when e.equipment_type in ('WATERWELL-SIZE2','WATERWELL-1.5') then 'WW' else 'NWW' end from  equipment e 
			where e.equipment_id = b.equipment_id 
		 and e.company_id  = b.company_id 
		  and e.country_code = b.country_code),'') as o_value_field_2,*/
		  '' as o_value_field_2,
			'' as o_value_field_3,
			convert(varchar(10), convert(numeric(10, 2), a.expdoc_net_amount)) as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from expdoc_header a --, call_register b
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  -- and a.company_id  = b.company_id 
		  -- and a.country_code = b.country_code
		  and a.expdoc_status = 'AP'
		  and a.organogram_level_no = 4
		  and a.organogram_level_code = @i_search_field_1
		  and isnull(a.udf_analysis_code1,'') = ''
		  -- and a.txn_ref_no = b.call_ref_no
		  
		 select @o_retrieve_status = 'SUCCESS'
		return

	end
	
	else if  @i_lov_code = 'CALLBRAND'
	begin
		select distinct '' as value_list,
			a.code as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLBRAND'
						and f.code = a.code
						)
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
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'CALLBRAND'	
		  	    
		select @o_retrieve_status = 'SUCCESS'

		return
	end
	
	else if  @i_lov_code = 'CALLBUSIUNIT'
	begin
		select distinct '' as value_list,
			a.code as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLBUSIUNIT'
						and f.code = a.code
						)
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
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'CALLBUSIUNIT'	
		  	    
		select @o_retrieve_status = 'SUCCESS'

		return
	end
	
	else if  @i_lov_code = 'CALLREGION'
	begin
		select distinct '' as value_list,
			a.code as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLREGION'
						and f.code = a.code
						)
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
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'CALLREGION'	
		  	    
		select @o_retrieve_status = 'SUCCESS'

		return
	end
	
	else if  @i_lov_code = 'ISSUETYPE'
	begin
		select distinct '' as value_list,
			a.code as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'ISSUETYPE'
						and f.code = a.code
						)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'ISSUETYPE'
				   and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'ISSUETYPE'
				   and g.code = a.code)
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'ISSUETYPE'	
		  	    
		select @o_retrieve_status = 'SUCCESS'

		return
	end
	
	else if @i_lov_code = 'STATECODE_LIST'
	begin
		select '' as value_list,
			state_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			state as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from state
		where country_code = @i_country_code
		
		select @o_retrieve_status = 'SUCCESS'
				
		return
	end
	
	else if @i_lov_code = 'DISTRICTCODE_LIST'
	begin
		select '' as value_list,
			district_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			district_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from district_master
		where country_code = @i_country_code
			and state_code = @i_search_field_1
		
		select @o_retrieve_status = 'SUCCESS'
				
		return
	end
	
	else if (@i_lov_code = 'GET_HSNCODE_GSTRATE')
	begin
		select '' as value_list,
			isnull(a.product_udf_char_1,'') as o_value_field_1,
			isnull(b.destination_field_value,'') as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from item_master a, product_customization_udf_value_mapping b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.product_udf_char_1 = b.source_field_value
			and a.item_code = @i_search_field_1
			and a.item_variant_code = @i_search_field_2
		union all
		select '' as value_list,
			'' as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
			
		select @o_retrieve_status = 'SUCCESS'
		return	
	end
	
	else if (@i_lov_code = 'FEEDBACKCALL_CHECK')
	begin	
		select '' as value_list,
			1 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from customer_feedback_detail
		where company_id = @i_client_id
			and country_code = @i_country_code
			and activity_ref_no = @i_search_field_1

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code = 'GETFEEDBACK_CUST_INFO')
	begin	
		select '' as value_list,
			a.customer_id as o_value_field_1,
			isnull((select ct.customer_name from customer ct 
				 where ct.company_id = @i_client_id
					and ct.country_code = @i_country_code	
					and ct.customer_id = a.customer_id),'') as o_value_field_2,
			isnull(a.customer_contact_no,'') as o_value_field_3,
			isnull(a.customer_contact_email_id,'') as o_description_field_1,
			ISNULL(a.customer_contact_name,'') as o_description_field_2,
			'' as o_description_field_3
		from call_register a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.call_ref_no= @i_search_field_1

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if (@i_lov_code = 'CALLCOMPLETE_CHECK')
	begin	
		select '' as value_list,
			1 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from call_resource_utilisation_log
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @i_search_field_1
			and to_date is NULL

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code = 'ASSET_STATUS_CHECK')
	begin	
		select '' as value_list,
			1 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from asset_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and asset_id = @i_search_field_1
			and asset_status = 'IA'

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code = 'OPEN_CALLS_CHECK')
	begin
	  select distinct '' as value_list,
			 asset_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
			 from call_register 
           where company_id = @i_client_id
				 and country_code = @i_country_code
				 and call_status not in ('CL')
				 and call_category in ('SE')
				 and asset_id = @i_search_field_1
		
		UNION
		
		select distinct '' as value_list,
			 asset_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
			 from call_register 
           where company_id = @i_client_id
				 and country_code = @i_country_code
				 and call_status not in ('CO')
				 and call_category in ('PE')
				 and asset_id = @i_search_field_1		 

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code = 'VALID_ASSET_CHECK')
	begin
		select '' as value_list,
			asset_id as o_value_field_1,
		    '' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3

		from asset_master
		where company_id = @i_client_id 
			and country_code = @i_country_code
			and asset_id  = @i_search_field_1  
			and servicing_org_level_code = 'NCEC-NP' 
			
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end	

	else if (@i_lov_code = 'LOCATION_CHECK')
	begin

		if (@i_search_field_1 = 'SA')
		begin

		select '' as value_list,
			isnull(location_code,'') as o_value_field_1,
		    '' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3

		from customer_location
		where company_id = @i_client_id 
			and country_code = @i_country_code
			and customer_id  = @i_search_field_2
			and head_office_ind = 1

		end
		else 
		begin
		select '' as value_list,
			isnull(customer_location_code,'') as o_value_field_1,
		    '' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3

		from asset_master
		where company_id = @i_client_id 
			and country_code = @i_country_code
			and asset_id  = @i_search_field_1 
			
        end
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end	


	else if (@i_lov_code = 'REPORT_STATUS')
		begin
			if exists ( select 1 from call_register a
			where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.call_ref_no = @i_search_field_1
			and a.call_type != 'FCLOSURE'
			and DATEDIFF(dd, a.act_finish_date, sysdatetimeoffset()) >= 15)
			begin
				select '' as value_list,
				1 as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			end
			else
			begin
				select '' as value_list,
				0 as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			
			end


		set @o_retrieve_status = 'SUCCESS'
		return
		end

	else if @i_lov_code = 'CALLREPORTINGTO_LIST_SPEC'
	begin
		SELECT distinct '' as value_list,
			b.reporting_to_employee_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			c.title + ' ' + c.first_name + ' ' + ISNULL(c.middle_name,'') + ' ' + c.last_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
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
			and @i_search_field_1 = 'DREAMS'
			and c.organogram_level_code  = 
				( case when @i_search_field_2 != '' then @i_search_field_2 else c.organogram_level_code end )
			
		return
	end

	else if @i_lov_code = 'CALLASSIGNTO_LIST'
	begin
		if (@i_search_field_1 in ('VI','SA'))
		begin

			SELECT '' as value_list,
				b.employee_id as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				c.title + ' ' + c.first_name + ' ' + ISNULL(c.middle_name,'') + ' ' + c.last_name as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from assignto_functional_role a, functional_role_employee b, employee c, users d
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
				and c.company_id = d.company_id
				and c.country_code = d.country_code
				and c.employee_id = d.employee_id
				and d.user_group_id in ('DLR-SAENG','DLR-SACORD')
			
		end
		else 
		begin

			declare @p_company_noof_org_levels tinyint, @p_org_level_no tinyint, @p_org_level_code nvarchar(15)
		
			select @p_company_noof_org_levels  = organogram_noof_levels
			from company_configuration
			where company_id = @i_client_id
			  and country_code = @i_country_code
		   	
			select @p_org_level_no = organogram_level_no,
					@p_org_level_code = organogram_level_code
			from employee a
			where a.company_id = @i_client_id
			  and a.country_code = @i_country_code
			  and a.employee_id = (select b.employee_id from users b
								 where b.company_id = @i_client_id
								   and b.country_code = @i_country_code
								   and b.user_id = @i_user_id
								 )
		
		   /* Create organogram levels*/
			create table #org_levels_filter_list
			(
				org_level_no tinyint not null,
				org_level_code nvarchar(15) not null 
			)  

			execute sp_filter_organogram_levels @i_session_id,@i_user_id,@i_client_id,@i_locale_id,@i_country_code, @p_company_noof_org_levels, @p_org_level_no, @p_org_level_code
	
					 
			SELECT '' as value_list,
				b.employee_id as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				c.title + ' ' + c.first_name + ' ' + ISNULL(c.middle_name,'') + ' ' + c.last_name as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from assignto_functional_role a, functional_role_employee b, employee c, #org_levels_filter_list d
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
				and c.organogram_level_no = d.org_level_no
				and c.organogram_level_code = d.org_level_code

		end

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	

else if (@i_lov_code = 'PROSPCT_AGAINST_CONTACT')
	begin
		select '' as value_list,
			isnull(c.customer_id,'') as o_value_field_1,
		    isnull(cl.location_code,'') as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3

		from customer c, customer_location cl
			where c.company_id = @i_client_id 
				and c.country_code = @i_country_code
				and c.company_id = cl.company_id
				and c.country_code  = cl.country_code
				and c.customer_id = cl.customer_id 
				and c.contact_person_1_mobile_no = @i_search_field_1
				and c.contact_person_1_email_id = @i_search_field_2
			
			
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end	
	
	
	else if @i_lov_code = 'CALLASSIGNTO_LISTFORLEAD'
	begin

		
			SELECT '' as value_list,
			e.employee_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			e.title + ' ' + e.first_name + ' ' + ISNULL(e.middle_name,'') + ' ' + e.last_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from employee e,users u
		where e.company_id = @i_client_id
			and e.country_code = @i_country_code
			and e.company_id = u.company_id
			and e.country_code = u.country_code
			and e.employee_id = u.employee_id
			and u.user_group_id = 'DLR-SACORD'
			and e.organogram_level_code = (case @i_search_field_1 when '' then e.organogram_level_code else @i_search_field_1 end)

			set @o_retrieve_status = 'SUCCESS'		
			return
	end

	else if (@i_lov_code = 'GET_MAPPED_EMPID')
	begin	

		declare @p_func_role_emp_org_lvl_no tinyint, 
				@p_func_role_emp_org_lvl_code nvarchar(20)

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
			select  @p_func_role_emp_org_lvl_no   = a.organogram_level_no,
					@p_func_role_emp_org_lvl_code = a.organogram_level_code
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
			set @p_func_role_emp_org_lvl_no = NULL
			set @p_func_role_emp_org_lvl_code = NULL
		end

		if exists (select 1 from functional_role_employee a, employee b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.functional_role_id = @i_search_field_1
				and a.company_id = b.company_id
				and a.country_code = b.country_code
				and a.employee_id = b.employee_id
				and a.employee_id = @i_search_field_2
				and b.organogram_level_no = isnull(@p_func_role_emp_org_lvl_no, b.organogram_level_no)
				and b.organogram_level_code = isnull(@p_func_role_emp_org_lvl_code, b.organogram_level_code))
		begin
			
			select '' as value_list,
				isnull(a.employee_id,'') as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from functional_role_employee a, employee b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.functional_role_id = @i_search_field_1
				and a.company_id = b.company_id
				and a.country_code = b.country_code
				and a.employee_id = b.employee_id
				and a.employee_id = @i_search_field_2
				and b.organogram_level_no = isnull(@p_func_role_emp_org_lvl_no, b.organogram_level_no)
				and b.organogram_level_code = isnull(@p_func_role_emp_org_lvl_code, b.organogram_level_code)

		end
		else
		begin

			select '' as value_list,
				'' as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
		end

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if @i_lov_code = 'CALL_ASSIGNTO_LIST_FOR_REPORTINGTO_SPEC'	
	begin
		select '' as value_list,
			a.employee_id as o_value_field_1,
			isnull(c.device_id, '') as o_value_field_2,
			'' as o_value_field_3,
			b.title + '.' + b.first_name + ' ' + ISNULL(b.middle_name,'') + ' ' + b.last_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from functional_role_employee a, employee b, device_register c
		where a.company_id = @i_client_id
			and a.country_code  = @i_country_code
			and a.reporting_to_employee_id = @i_search_field_1
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.employee_id = b.employee_id
			and a.company_id = c.company_id
			and a.country_code = c.country_code
			and a.employee_id = c.employee_id 
			and @i_search_field_2 = 'DREAMS'
			and b.organogram_level_code = ( case when @i_search_field_3 != '' then @i_search_field_3 else b.organogram_level_code end )
		
		return
	end
	--added against FCR-354 Starts
	else if (@i_lov_code = 'EQUIPMENT_LIST_SEARCH_IMEI_NO')
	begin
		IF EXISTS (select 1 from equipment
					where equipment_id	= @i_search_field_1 
					and company_id		= @i_client_id
					and country_code	= @i_country_code
					and equipment_type in ('WATERWELL-SIZE2')
					)
		BEGIN
			select '' as value_list,
			1 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		END
		ELSE
		BEGIN
			select '' as value_list,
			0 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		END
		return
	end
	--added against FCR-354 Ends

	--added against FCR-368 starts
	else if  @i_lov_code = 'PARTS_PURCHASE_SOURCE_CHECKFORMANDATORY'
	begin
		IF EXISTS (select 1 from expdoc_header a , call_register b 
					where expdoc_ref_no = @i_search_field_1
					and a.company_id	= @i_client_id
					and a.country_code	= @i_country_code
					and a.company_id	= b.company_id
					and a.country_code	= b.country_code
					and a.txn_ref_no	= b.call_ref_no
					and b.call_type		= 'SCHMTNCE' )
		BEGIN
					select '' as value_list,
					1 as o_value_field_1,
					'' as o_value_field_2,
					'' as o_value_field_3,
					'' as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
		END
		ELSE
		BEGIN
					select '' as value_list,
					0 as o_value_field_1,
					'' as o_value_field_2,
					'' as o_value_field_3,
					'' as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
		END
		return
end
	--added against FCR-368 Ends
else if (@i_lov_code = 'LAST_HMR_VALUE_CHECK')
begin

		if exists(select 1 from asset_parameter_log
		where asset_id = @i_search_field_1)
		begin
		select top(1) '' as value_list,
		CONVERT(varchar(10),record_date,120) as o_value_field_1,
		substring(CONVERT(varchar(10),record_date,108),1,2) as o_value_field_2,
		substring(CONVERT(varchar(10),record_date,108),4,2) as o_value_field_3,
		parameter_value as o_description_field_1,
		'' as o_description_field_2,
		'' as o_description_field_3

		from asset_parameter_log
		where asset_id = @i_search_field_1
		order by record_date desc

	end
	else
	begin
	select top(1) '' as value_list,
	'' as o_value_field_1,
	'' as o_value_field_2,
	'' as o_value_field_3,
	'' as o_description_field_1,
	'' as o_description_field_2,
	'' as o_description_field_3
	from asset_parameter_log
	where company_id = @i_client_id
	and country_code = @i_country_code
	end

set @o_retrieve_status = 'SUCCESS'
return
end

else if (@i_lov_code = 'CALL_DELAYSTATUS_REASONCODES_TATdiff') 
	begin
		declare @diff_hrs nvarchar(20)

		select @diff_hrs = datediff(hour,created_on_date,act_finish_date)
		from call_register 
		where call_status = 'CO' 
		and call_ref_no = @i_search_field_1

		select @diff_hrs = case when @diff_hrs > 48 then 1 else 0 end 

			select 	'' as value_list,
					@diff_hrs as o_value_field_1,
					'' as o_value_field_2,
					'' as o_value_field_3,
					''  as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
					
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code = 'CALL_DELAYSTATUS_REASONCODES') 
	begin
			select 	'' as value_list,
					e.code as o_value_field_1,
					'' as o_value_field_2,
					'' as o_value_field_3,
					e.long_description  as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
			from code_table a ,code_table_mlingual_translation e
			where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = e.code_type
			and a.code		= e.code
			and a.code_type = 'CLOSEDELAYREASCD'
		
		set @o_retrieve_status = 'SUCCESS'
		return		
	end

	else if  @i_lov_code = 'EQPT_CAT_SRCH_HH_TYPE'
	begin
		if @i_search_field_1 = 'ZZZ'
		begin
			select	 '' as value_list,
					'ZZZ' as o_value_field_1,
					'' as o_value_field_2,
					'' as o_value_field_3,
					'' as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
		end
		else
		begin
			select	distinct '' as value_list,
					equipment_category as o_value_field_1,
					'' as o_value_field_2,
					'' as o_value_field_3,
					'' as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
			from equipment a
			where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.equipment_id like '%' + @i_search_field_1 + '%'
		end

		select @o_retrieve_status = 'SUCCESS'
		return
	end
end








GO
