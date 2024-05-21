/****** Object:  StoredProcedure [dbo].[sp_retrieve_listof_values_gwell]    Script Date: 16-11-2023 18:46:08 ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_retrieve_listof_values_gwell]
GO

/****** Object:  StoredProcedure [dbo].[sp_retrieve_listof_values_gwell]    Script Date: 16-11-2023 18:46:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/*
 * Function to retrieve users list for CRUD
 */
 
CREATE PROCEDURE [dbo].[sp_retrieve_listof_values_gwell] 
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

	declare @p_dealer_home_org_level_no tinyint, @p_dealer_home_org_level_code nvarchar(15)

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
				and udf_char_1 != 'SHIPTO'
		end
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	
	else if  @i_lov_code = 'CUSTOMER_DETAIL_FOR_CALL_REGN'
	begin
		
		select '' as value_list,
			isnull(a.contact_person_1,'') as o_value_field_1, /* unicode string */
			isnull(a.contact_person_1_mobile_no,'') as o_value_field_2, /* unicode string */
			isnull(a.contact_person_1_email_id,'') as o_value_field_3, /* unicode string */
			'' as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from customer_location a
        where a.company_id = @i_client_id
          and a.country_code  = @i_country_code
          and a.customer_id = @i_search_field_1
          and a.location_code = @i_search_field_2
          
		  select @o_retrieve_status = 'SUCCESS'
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
			--and head_office_ind = 1

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
				     and call_type in ('INSTCOMM','COMMMHE') 
					) > 1
				)
		set @o_retrieve_status = 'SUCCESS'
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
	else if @i_lov_code = 'CALLASSIGNTO_LIST'
	begin

		declare @p_company_noof_org_levels tinyint, @p_org_level_no tinyint, @p_org_level_code nvarchar(15),
		@p_oem_logged_indicator tinyint
		
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

		if @p_org_level_code = 'SERVICE'
		  set @p_oem_logged_indicator = 1

		
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
		union 
			
			SELECT '' as value_list,
			c.employee_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			c.title + ' ' + c.first_name + ' ' + ISNULL(c.middle_name,'') + ' ' + c.last_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from  employee c, users u
		where c.company_id = @i_client_id
			and c.country_code = @i_country_code
			and c.company_id = u.company_id
			and c.country_code = u.country_code
			and c.employee_id = u.employee_id
			and c.employee_status = 'A'
			and u.user_group_id = 'OEM_SENGG'
			and @p_oem_logged_indicator = 1
			

		
		
			set @o_retrieve_status = 'SUCCESS'		
			return
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
	
	else if (@i_lov_code = 'ITEMHSNCODE_LIST')
	begin	
		select '' as value_list,
			product_udf_char_1 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from item_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and item_code = @i_search_field_1
			and item_variant_code = @i_search_field_2

		set @o_retrieve_status = 'SUCCESS'
		return
	end


	else if (@i_lov_code = 'HSN_LINK_WITH_GST')
	begin	
		select '' as value_list,
			destination_field_value as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from product_customization_udf_value_mapping
		where company_id = @i_client_id
			and country_code = @i_country_code
			and source_field_value =  @i_search_field_1

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code = 'ITEM_RATE_WITH_PRICE')
	begin	
		select '' as value_list,
			isnull(CONVERT(varchar(20), purchase_rate),'') as o_value_field_1, 
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from item_rate
		where company_id = @i_client_id
			and country_code = @i_country_code
			and item_code =  @i_search_field_1
			and item_variant_code = @i_search_field_2
			and uom_code = @i_search_field_3

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code = 'WORKFLOW_EVENTVERB_ID')
	begin
		
		if (@i_search_field_1 = 'customer_survey')
		begin
				select  distinct '' as value_list,
				isnull(eventverb_id,'') as o_value_field_1,
			    '' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3

			from workflow_eventverb_list
			where company_id = @i_client_id 
				and country_code = @i_country_code
				and transaction_type_code = 'ANCILLARY' 
				and request_category = 'CS'
		end
		
		
		 if (@i_search_field_1 = 'sales_lead')
			begin
					select  distinct '' as value_list,
					isnull(eventverb_id,'') as o_value_field_1,
					'' as o_value_field_2,
					'' as o_value_field_3,
					'' as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3

				from workflow_eventverb_list
				where company_id = @i_client_id 
					and country_code = @i_country_code
					and transaction_type_code = 'ANCILLARY' 
					and request_category = 'LM'
			end
		
		if (@i_search_field_1 = 'spare_request')
		begin
				select  distinct '' as value_list,
				isnull(eventverb_id,'') as o_value_field_1,
			    '' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3

			from workflow_eventverb_list
			where company_id = @i_client_id 
				and country_code = @i_country_code
				and transaction_type_code = 'ANCILLARY' 
				and request_category = 'SP'
		end

		if (@i_search_field_1 = 'customer_query')
		begin
				select  distinct '' as value_list,
				isnull(eventverb_id,'') as o_value_field_1,
			    '' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3

			from workflow_eventverb_list
			where company_id = @i_client_id 
				and country_code = @i_country_code
				and transaction_type_code = 'ANCILLARY' 
				and request_category = 'QU'
		end
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code = 'ITEMGSTCODE')
	begin	
		select '' as value_list,
			destination_field_value as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from product_customization_udf_value_mapping
		where company_id = @i_client_id
			and country_code = @i_country_code
			and source_field_value = (select distinct product_udf_char_1 from item_master 
											where item_code = @i_search_field_1
											and item_variant_code = @i_search_field_2)

		set @o_retrieve_status = 'SUCCESS'
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
			'' as o_value_field_2,
			'' as o_value_field_3,
			convert(varchar(10), convert(numeric(10, 2), a.expdoc_net_amount)) as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from expdoc_header a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.expdoc_status = 'AP'
		  and a.organogram_level_no = 3
		  and organogram_level_code = @i_search_field_1
		  and isnull(a.udf_analysis_code1,'') = ''
		 	 
		  
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

	else if @i_lov_code = 'ITEMCODE_LIST'
	begin
		select '' as value_list,
			item_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			item_description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from item_master
		where country_code = @i_country_code
			and item_type = @i_search_field_1
		
		select @o_retrieve_status = 'SUCCESS'
				
		return
	end

	else if @i_lov_code = 'ITEMTYPE_LIST'
	begin
		select '' as value_list,
			code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			long_description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from code_table_mlingual_translation
			where country_code = @i_country_code
			and code_type = 'ITEMTYPE'
			
		
		select @o_retrieve_status = 'SUCCESS'
				
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

	else if (@i_lov_code = 'MACHINE_TRANSFER_CHECK')
	begin	
		select '' as value_list,
			1 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from call_register a
		where company_id = @i_client_id
			and country_code = @i_country_code
			and asset_id = @i_search_field_1
			and call_wf_stage_no != (
				select b.workflow_stage_no 
				from workflow_stage_master b
				where b.company_id = a.company_id
					and b.country_code = a.country_code
					and b.transaction_type_code  = 'CALL'
					and b.request_category = a.call_category
					and b.last_stage_ind = 1
			)

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code = 'DISTRICT_COVERAGE_MAPPING')
	begin	
		if Not Exists (select 1 from dealer_coverage_mapping a
				where company_id = @i_client_id
					and country_code = @i_country_code
					and dealer_id = @i_search_field_1
					and country_code = @i_search_field_2
					and state_code = @i_search_field_3
					and district_code = @i_search_field_4)
			begin
				select '' as value_list,
				0 as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			end
		else
			begin
				select '' as value_list,
				1 as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			end
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code = 'GETFEEDBACK_CUST_INFO')
	begin	
	
		select '' as value_list,
			isnull((select b.customer_name 
				from customer b 
				where a.company_id = b.company_id
					and a.country_code = b.country_code
					and b.customer_id = a.customer_id ),'') as o_value_field_1,
			isnull((dbo.code_description(@i_client_id,@i_country_code,@i_locale_id,'CALLSTATUS',a.call_status) +'-'+
							(select title+' '+first_name+' '+last_name
								from employee b
								where b.company_id = @i_client_id
								  and b.country_code = @i_country_code
								  and b.employee_id in (select c.resource_emp_id from call_assignment c 
														  where c.company_id = @i_client_id
														  and c.country_code = @i_country_code
														  and c.primary_resource_ind = 1
														  and c.call_ref_no = a.call_ref_no
														  and c.call_ref_no = @i_search_field_1
														 )
							)
					),'') as o_value_field_2,
			isnull(a.customer_contact_email_id,'') as o_value_field_3,
			isnull((select b.contact_person_1
				from customer b 
				where a.company_id = b.company_id
					and a.country_code = b.country_code
					and b.customer_id = a.customer_id),'') as o_description_field_1,
			isnull(a.customer_contact_name,'') as o_description_field_2,
			isnull(a.customer_contact_no,'') as o_description_field_3
		from call_register a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.call_ref_no = @i_search_field_1


		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code = 'GET_HSNCODE_GSTRATE')
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
							and b.field_value4 = @i_search_field_2)
		begin
			select '' as value_list,
				isnull(b.field_value5,'') as o_value_field_1,
				isnull(b.field_value6,'') as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3			
			from item_master a, product_customization_field_value_mapping b
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
							
		end
		else
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
				and b.source_field_name = 'HSNCODE'
		end
			
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
	else if (@i_lov_code = 'PWCLAIM_RSCD_CHECK')
	begin	
		select '' as value_list,
			1 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from call_status_event_log
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @i_search_field_1
			and reason_code = 'PWC'
		 order by event_id desc

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if (@i_lov_code = 'PWCLAIM_ATTACH_CHECK')
	begin	
		select '' as value_list,
			1 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from call_register a, call_user_attachments b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.call_ref_no = b.call_ref_no
			and a.call_type in ('WAR','WAB','WAC')
			and b.attachment_file_name like '%_visit_report_form.pdf%'
			and a.call_ref_no = @i_search_field_1

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if  @i_lov_code = 'ORGLEVELNO_LIST_SPECIFIC'
	begin
		declare @p_no_of_levels tinyint, @p_search_field tinyint
		
		set @p_search_field = convert(tinyint, @i_search_field_1)

		create table #organogram_levels (
			level_id tinyint null,
			level_name nvarchar(30) null
		)

		select @p_no_of_levels = organogram_noof_levels
		from company_configuration 
		where company_id = @i_client_id
			and country_code = @i_country_code

		if @p_search_field = 0
			set @p_search_field = 1		

		
			if (@p_search_field <= 1 and @p_no_of_levels >= 1)
				insert #organogram_levels
				select 1, isnull(level1_field_name, '')
				from company_configuration 
				where company_id = @i_client_id
					and country_code = @i_country_code

			if (@p_search_field <= 2 and @p_no_of_levels >= 2)
				insert #organogram_levels
				select 2, isnull(level2_field_name, '')
				from company_configuration 
				where company_id = @i_client_id
					and country_code = @i_country_code

			if (@p_search_field <= 3 and @p_no_of_levels >= 3)
				insert #organogram_levels
				select 3, isnull(level3_field_name, '')
				from company_configuration 
				where company_id = @i_client_id
					and country_code = @i_country_code

			if (@p_search_field <= 4 and @p_no_of_levels >= 4)
				insert #organogram_levels
				select 4, isnull(level4_field_name, '')
				from company_configuration 
				where company_id = @i_client_id
					and country_code = @i_country_code

			if (@p_search_field <= 5 and @p_no_of_levels >= 5)
				insert #organogram_levels
				select 5, isnull(level5_field_name, '')
				from company_configuration 
				where company_id = @i_client_id
					and country_code = @i_country_code

		select '' as value_list,
			level_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			level_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from #organogram_levels
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if  @i_lov_code = 'ORGLEVELCODE_LIST_SPECIFIC'
	begin
		if @i_search_field_3 not in ( '','%') /* Dealer ID is being passed */
		begin
			
			/* Home organogram of dealer to be taken */
			select @p_dealer_home_org_level_no = organogram_level_no,
					@p_dealer_home_org_level_code = organogram_level_code
			from dealer_organogram_mapping
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and dealer_id = @i_search_field_3
			  and organogram_level_no = ( select min(b.organogram_level_no)
											from dealer_organogram_mapping b
											where b.company_id = @i_client_id
											  and b.country_code = @i_country_code
											  and b.dealer_id = @i_search_field_3)

			if (@i_search_field_1 = '1' and @p_dealer_home_org_level_no <= 1)
			begin
				select '' as value_list,
					level1_code as o_value_field_1,
					'1' as o_value_field_2,
					'' as o_value_field_3,
					level1_code_description as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
				FROM level1_code
				where company_id = @i_client_id
					and country_code = @i_country_code
					and level1_code = @i_search_field_2
			end
			else if (@i_search_field_1 = '2' and @p_dealer_home_org_level_no <= 2)
			begin 
				select '' as value_list,
					level2_code as o_value_field_1,
					'2' as o_value_field_2,
					'' as o_value_field_3,
					level2_code_description as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
				FROM level2_code a
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and level2_code = @i_search_field_2
				  and ((@p_dealer_home_org_level_no = 2
					   and @p_dealer_home_org_level_code = level2_code)
						or
						@p_dealer_home_org_level_no < 2
						)
			end
			else if (@i_search_field_1 = '3' and @p_dealer_home_org_level_no <= 3)
			begin
				select '' as value_list,
					level3_code as o_value_field_1,
					'3' as o_value_field_2,
					'' as o_value_field_3,
					level3_code_description as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
				FROM level3_code
				where company_id = @i_client_id
					and country_code = @i_country_code
					and ((@p_dealer_home_org_level_no = 2
					   and @p_dealer_home_org_level_code = level2_code
						)
						or 
						(@p_dealer_home_org_level_no = 3
					   and @p_dealer_home_org_level_code = level3_code
						)
						)
			end
			else if (@i_search_field_1 = '4' and @p_dealer_home_org_level_no <= 4)
			begin
				select '' as value_list,
					level4_code as o_value_field_1,
					'4' as o_value_field_2,
					'' as o_value_field_3,
					level4_code_description as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
				FROM level4_code
				where company_id = @i_client_id
					and country_code = @i_country_code
					and ((@p_dealer_home_org_level_no = 2
					      and @p_dealer_home_org_level_code = level2_code
						)
						or 
						(@p_dealer_home_org_level_no = 3
					      and @p_dealer_home_org_level_code = level3_code
						)
						or 
						(@p_dealer_home_org_level_no = 4
					     and @p_dealer_home_org_level_code = level4_code)
						)
			end
			else if (@i_search_field_1 = '5' and @p_dealer_home_org_level_no <= 5)
			begin
				select '' as value_list,
					level5_code as o_value_field_1,
					'5' as o_value_field_2,
					'' as o_value_field_3,
					level5_code_description as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
				FROM level5_code
				where company_id = @i_client_id
					and country_code = @i_country_code
					and ((@p_dealer_home_org_level_no = 2
					      and @p_dealer_home_org_level_code = level2_code
						)
						or 
						(@p_dealer_home_org_level_no = 3
					      and @p_dealer_home_org_level_code = level3_code
						)
						or 
						(@p_dealer_home_org_level_no = 4
					     and @p_dealer_home_org_level_code = level4_code)
						or 
						(@p_dealer_home_org_level_no = 5
						and @p_dealer_home_org_level_code = level5_code)
						)
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
				 where 1 = 2
			end
		end
		else
		begin
			if (@i_search_field_1 = '1')
			begin
				select '' as value_list,
					level1_code as o_value_field_1,
					'1' as o_value_field_2,
					'' as o_value_field_3,
					level1_code_description as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
				FROM level1_code
				where company_id = @i_client_id
					and country_code = @i_country_code
					and level1_code = @i_search_field_2
			end
			else if (@i_search_field_1 = '2')
			begin 
				select '' as value_list,
					level2_code as o_value_field_1,
					'2' as o_value_field_2,
					'' as o_value_field_3,
					level2_code_description as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
				FROM level2_code
				where company_id = @i_client_id
					and country_code = @i_country_code
					and level2_code = @i_search_field_2
			end
			else if (@i_search_field_1 = '3')
			begin
				select '' as value_list,
					level3_code as o_value_field_1,
					'3' as o_value_field_2,
					'' as o_value_field_3,
					level3_code_description as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
				FROM level3_code
				where company_id = @i_client_id
					and country_code = @i_country_code
					and level3_code = @i_search_field_2
			end
			else if (@i_search_field_1 = '4')
			begin
				select '' as value_list,
					level4_code as o_value_field_1,
					'4' as o_value_field_2,
					'' as o_value_field_3,
					level4_code_description as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
				FROM level4_code
				where company_id = @i_client_id
					and country_code = @i_country_code
					and level4_code = @i_search_field_2

			end
			else if (@i_search_field_1 = '5')
			begin
				select '' as value_list,
					level5_code as o_value_field_1,
					'5' as o_value_field_2,
					'' as o_value_field_3,
					level5_code_description as o_description_field_1,
					'' as o_description_field_2,
					'' as o_description_field_3
				FROM level5_code
				where company_id = @i_client_id
					and country_code = @i_country_code
					and level5_code = @i_search_field_2
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
				 where 1 = 2
			end

		end

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if @i_lov_code = 'DEALER_LIST_SPECIFIC'
	begin
		select '' as value_list,
			dealer_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			dealer_name_short as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from dealer_master		
		where company_id = @i_client_id
			and country_code = @i_country_code
			and dealer_id = ( case when @i_search_field_2 != '' then @i_search_field_2 else dealer_id end )
		return
	end
	
	else if (@i_lov_code = 'RefNo_Availability')
		begin
			if exists ( select 1 from call_register
			where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @i_search_field_1
			and call_category = 'PE')
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

	else if (@i_lov_code = 'LOCATION_COVERAGE_MAPPING')
	begin	
		select '' as value_list,
			 1 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from dealer_coverage_mapping a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.request_category = @i_search_field_1
			and a.request_type in ('ALL', @i_search_field_2)
			and a.dealer_id = @i_search_field_3
			and a.district_code = (select isnull(b.district_code,'') 
								    from customer_location b 
								    where a.company_id = @i_client_id
										and a.country_code = @i_country_code
									    and b.customer_id = @i_search_field_4
										and b.location_code = @i_search_field_5)

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code = 'GET_RECPT_SUPPLIERSTATETYPE')
	begin	
		if exists (select 1 from supplier_location
					where company_id = @i_client_id
						and country_code = @i_country_code
						and supplier_id = @i_search_field_1
						and location_code = @i_search_field_2)
		begin
			select '' as value_list,
				isnull(product_udf_char_1,'') as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from state
			where country_code = @i_country_code
				and state_code =  (select state_code 
								   from supplier_location
								   where company_id = @i_client_id
									 and country_code = @i_country_code
									 and supplier_id = @i_search_field_1
									 and location_code = @i_search_field_2)
		end
		else
		begin
			select '' as value_list,
				isnull(product_udf_char_1,'') as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from state
			where country_code = @i_country_code
				and state_code =  (select state_code 
								   from customer_location
								   where company_id = @i_client_id
									 and country_code = @i_country_code
									 and customer_id = @i_search_field_1
									 and location_code = @i_search_field_2)
		end		

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code = 'GET_RECPT_SUPPLIERSTATE')
	begin
		if exists (select 1 from supplier_location
					where company_id = @i_client_id
						and country_code = @i_country_code
						and supplier_id = @i_search_field_1
						and location_code = @i_search_field_2)
		begin
			select '' as value_list,
				isnull(state_code,'') as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from supplier_location
			where company_id = @i_client_id
				and country_code = @i_country_code
				and supplier_id = @i_search_field_1
				and location_code = @i_search_field_2
		end
		else
		begin
			select '' as value_list,
				isnull(state_code,'') as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from customer_location
			where company_id = @i_client_id
				and country_code = @i_country_code
				and customer_id = @i_search_field_1
				and location_code = @i_search_field_2
		end		

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code = 'GET_RECPT_WAREHOUSESTATE')
	begin	
		select '' as value_list,
			isnull(state_code,'') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from warehouse
		where company_id = @i_client_id
			and country_code = @i_country_code
			and warehouse_id = @i_search_field_1

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code = 'GET_RECPT_TAX_AMOUNT')
	begin
	
		if (@i_search_field_3 = 'GROSS_AMOUNT')
		begin
			select '' as value_list,
				isnull(round((convert(float, @i_search_field_1) * convert(float, @i_search_field_2)),2),0) as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3

			set @o_retrieve_status = 'SUCCESS'
			return
		end
		else if (@i_search_field_4 = 'GST_AMOUNT')
		begin
			select '' as value_list,
				isnull(round(((convert(float, @i_search_field_1) * convert(float, @i_search_field_2) * (convert(float, Substring(@i_search_field_3, 4, (len(@i_search_field_3))))/2))/100),2),0) as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3

			set @o_retrieve_status = 'SUCCESS'
			return
		end
		else if (@i_search_field_4 = 'IGST_AMOUNT')
		begin
			select '' as value_list,
				isnull(round(((convert(float, @i_search_field_1) * convert(float, @i_search_field_2) * convert(float, Substring(@i_search_field_3, 4, (len(@i_search_field_3)))))/100),2),0) as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3

			set @o_retrieve_status = 'SUCCESS'
			return
		end
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
	else if (@i_lov_code = 'PROSPECT_FLAG')
	begin
	
		if exists ( select 1 from customer_order_header 
						where company_id = @i_client_id
							and country_code = @i_country_code
							and buyer_customer_id = @i_search_field_1)
		begin
			select '' as value_list,
			0 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		end
		else
		begin
			select '' as value_list,
			1 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		end
		
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	else if (@i_lov_code = 'REVIEW_COMMENTS')
	begin

		if (@i_search_field_1 = 'QUOTATION')
		begin
			select '' as value_list,
			isnull(comments,'') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
			from quotation_status_event_log
			where company_id = @i_client_id
				and country_code = @i_country_code
				and quotation_no = @i_search_field_2
				and eventverb_id = 'QUOTREVIEW'
			order by event_id desc

		end
		else if (@i_search_field_1 = 'CUSTORD')
		begin
			select '' as value_list,
			isnull(comments,'') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
			from customer_order_status_event_log
			where company_id = @i_client_id
				and country_code = @i_country_code
				and order_no = @i_search_field_2
				and eventverb_id = 'CORDREVIEW'
			order by event_id desc

		end
		else if (@i_search_field_1 = 'SALESINVOICE')
		begin
			select '' as value_list,
			isnull(comments,'') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
			from salesinvoice_status_event_log
			where company_id = @i_client_id
				and country_code = @i_country_code
				and invoice_no = @i_search_field_2
				and eventverb_id = 'SINVREVIEW'	
			order by event_id desc

		end

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	/*Machine Restriction*/
	else if (@i_lov_code = 'MACHINE_CHECK')
	begin	
		select '' as value_list,
			isnull(call_ref_no,'') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from call_register
		where company_id = @i_client_id
			and country_code = @i_country_code
			and asset_id = @i_search_field_1
			and call_status not in ('CL','CO')
					

		set @o_retrieve_status = 'SUCCESS'
		return
	end


	else if (@i_lov_code = 'PO_VALIDATION_ON_INVENTORY')
	begin	

		if (@i_search_field_1 = '')
		begin

			select top(1) '' as value_list,
				isnull(receipt_buyer_ref_no,'') as o_value_field_1, 
				adj_txn_ref_no as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from inventory_adjustment_header
			where company_id = @i_client_id
				and country_code = @i_country_code
				and receipt_buyer_ref_no =  @i_search_field_2

		end
		else 
		begin

			select top(1) '' as value_list,
				isnull(receipt_buyer_ref_no,'') as o_value_field_1, 
				adj_txn_ref_no as o_value_field_2,
				'' as o_value_field_3,
				'' as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from inventory_adjustment_header
			where company_id = @i_client_id
				and country_code = @i_country_code
				and adj_txn_ref_no != @i_search_field_1
				and receipt_buyer_ref_no =  @i_search_field_2
				
			end

			set @o_retrieve_status = 'SUCCESS'
		return
		end
		else if (@i_lov_code = 'DLR_EINVOICE_APPLICABLE')
	begin	
		select '' as value_list,
			isnull(product_udf_bit_1,0) as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from dealer_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and dealer_id = @i_search_field_1

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	
	else if (@i_lov_code = 'REPORT_STATUS')
		begin
			if exists (select 1 from ancillary_request_register ar
			where ar.company_id = @i_client_id
			and ar.country_code = @i_country_code
			and ar.request_category = 'CS'
			and ar.request_type = 'CS'
			and ar.request_status = 'O'
			and ar.request_ref_no = 'CS'+ @i_search_field_1)
				begin
					select '' as value_list,
					0 as o_value_field_1,
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

	else if (@i_lov_code = 'CS_CALL_CHECK')
	begin	
		select '' as value_list,
			1 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from ancillary_request_register
		where company_id = @i_client_id
			and country_code = @i_country_code
			and request_ref_no = 'CS' + @i_search_field_1


		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	
	else if @i_lov_code = 'CALL_VISIT_ADDENGI'
	begin
		select '' as value_list,
			(select CONVERT(varchar(10), ca.assigned_on_date, 105) +' '+ substring(CONVERT(varchar(10),ca.assigned_on_date,108),1,2) +':'+ substring(CONVERT(varchar(10),ca.assigned_on_date,108),4,2) 
			from call_assignment ca
			where ca.company_id = @i_client_id
			and ca.country_code = @i_country_code
			and ca.call_ref_no = cra.call_ref_no
			and ca.primary_resource_ind = '1') as o_value_field_1,
			isnull((select top(1) CONVERT(varchar(10), csel.event_date, 105) +' '+ substring(CONVERT(varchar(10),csel.event_date,108),1,2) +':'+ substring(CONVERT(varchar(10),csel.event_date,108),4,2)
			from call_status_event_log csel
			where csel.company_id = @i_client_id
			and csel.country_code = @i_country_code
			and csel.call_ref_no = cra.call_ref_no
			and csel.eventverb_id = 'MEETINGFINISH' order by event_date desc),'') as o_value_field_2,
			'' as o_value_field_3,
			cra.call_ref_no as o_description_field_1,
			(select e.title+' '+e.first_name+' '+ISNULL(e.middle_name,'')+' '+e.last_name 
			from employee e, call_assignment ca
			where ca.company_id = @i_client_id
			and ca.country_code = @i_country_code
			and ca.call_ref_no = cra.call_ref_no
			and ca.primary_resource_ind = '1'
			and ca.company_id = e.company_id
			and ca.country_code = e.country_code
			and ca.resource_emp_id = e.employee_id) as o_description_field_2,
			isnull((select top(1) CONVERT(varchar(10), csel.event_date, 105) +' '+ substring(CONVERT(varchar(10),csel.event_date,108),1,2) +':'+ substring(CONVERT(varchar(10),csel.event_date,108),4,2)
			from call_status_event_log csel
			where csel.call_ref_no = cra.call_ref_no
			and csel.eventverb_id = 'MEETINGSTART' order by event_date desc),'') as o_description_field_3
        from call_register_actions cra, call_register cr
        where cra.company_id = @i_client_id
          and cra.country_code  = @i_country_code
          and cra.sys_gen_call_ref_no = @i_search_field_1
		  and cra.company_id = cr.company_id
		  and cra.country_code = cr.country_code
		  and cra.sys_gen_call_ref_no = cr.call_ref_no	
          
		return
	end

	else if (@i_lov_code = 'LAST_HMR_VALUE_CHECK')
	begin	
		
			if exists(select 1 from asset_parameter_log 
							where asset_id = @i_search_field_1)	
			begin 
				select top(1) '' as value_list,
					CONVERT(varchar(10),record_date,120) as o_value_field_1,
			        substring(CONVERT(varchar(10),record_date,108),1,2) as o_value_field_2,
			        substring(CONVERT(varchar(10),record_date,108),4,2)  as o_value_field_3,
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
	
	else if @i_lov_code = 'OPEN_HMR_CHECK'
	begin
		select '' as value_list,
		(case
		when isnull(maxd.parameter_value,0) > (select isnull(b.lastcheck_value,0) from asset_master b
		where b.asset_id = @i_search_field_1) then maxd.parameter_value
		else b.lastcheck_value
		end) as o_value_field_1,
		'' as o_value_field_2,
		'' as o_value_field_3,
		'' as o_description_field_1,
		'' as o_description_field_2,
		'' as o_description_field_3
		from asset_master b
		left outer join
		(select a.asset_id,a.parameter_value from asset_parameter_log a
		where a.record_date= (select isnull(max(CONVERT(varchar(10),a.record_date,120)),'')
		from asset_parameter_log a
		where a.asset_id = @i_search_field_1 and a.parameter_id = 'HMR')) as maxd
		on maxd.asset_id=b.asset_id
		where b.asset_id = @i_search_field_1

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	
	else if (@i_lov_code = 'EXP_LABOUR_HOURS')
	begin	
		select '' as value_list,
			destination_field_value as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from product_customization_udf_value_mapping
		where company_id = @i_client_id 
			and country_code = @i_country_code
			and source_field_name = 'LABOURCODE'
			and source_field_value = @i_search_field_1
			and destination_field_name = 'LABOURHOURS'

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code = 'EXP_LABOUR_CHARGE')
	begin	
		select '' as value_list,
			std_rate as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from dealer_expenseclaim_rate
		where company_id = @i_client_id 
			and country_code = @i_country_code
			--and expense_category = @i_search_field_1
			--and expense_type = @i_search_field_2
			and expense_head_code = @i_search_field_3

		set @o_retrieve_status = 'SUCCESS'
		return
	end

		else if (@i_lov_code = 'EXPATTACH_AVAILABILITY')
		begin
			if exists ( select 1 from expdoc_detail b
						where b.exp_head_code = 'MISC'
						and b.expdoc_ref_no = @i_search_field_1)

			if exists (select 1 from expdoc_user_attachments 
			where expdoc_ref_no = @i_search_field_1)
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
			else
			begin

			select '' as value_list,
			1 as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3	
			end
		set @o_retrieve_status = 'SUCCESS'
		return
		end
		
	else if (@i_lov_code = 'EXP_PART_RATE')
	begin	
		select '' as value_list,
			destination_field_value as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from product_customization_udf_value_mapping
		where company_id = @i_client_id 
			and country_code = @i_country_code
			and source_field_name = 'PARTCODE'
			and source_field_value = @i_search_field_1
			and destination_field_name = 'PARTRATE'

		set @o_retrieve_status = 'SUCCESS'
		return
	end

	else if (@i_lov_code = 'ACC_SYS_NO_VALIDATION')
	begin
	
		declare @p_valid_ind bit

		set @p_valid_ind = 1

		if @i_search_field_1 != ''
		begin

			if exists (select 1 from salesinvoice_header
					where company_id = @i_client_id
						and country_code = @i_country_code
						and invoice_no != @i_search_field_1
						and acc_sys_no = @i_search_field_2)
			begin
				set @p_valid_ind = 0
			end

		end
		else
		begin

			if exists (select 1 from salesinvoice_header
					where company_id = @i_client_id
						and country_code = @i_country_code
						and acc_sys_no = @i_search_field_2)
			begin
				set @p_valid_ind = 0
			end

		end

		select '' as value_list,
			@p_valid_ind as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		

		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	else if (@i_lov_code = 'NORESPONSECSCD_LIST')
	begin
		select distinct '' as value_list,
			a.code as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'NORESPONSECSCD'
						and f.code = a.code
						)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'NORESPONSECSCD'
				   and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'NORESPONSECSCD'
				   and g.code = a.code)
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'NORESPONSECSCD'
			
		set @o_retrieve_status = 'SUCCESS'
		return
	end
	
	end
GO


