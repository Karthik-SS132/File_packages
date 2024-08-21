DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_listof_values]
GO

/****** Object:  StoredProcedure [dbo].[sp_retrieve_listof_values]    Script Date: 12/3/2023 3:46:54 PM ******/

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO  

/*
 * Generic function to retrieve list of values
 */
CREATE PROCEDURE [dbo].[sp_retrieve_listof_values] 
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
    @i_search_field_5 [uddt_nvarchar_60]
AS
BEGIN
    /*
     * Generic function to retrieve list of values
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

   
    /*
    -- The following SQL snippet illustrates selection of result sets expected from this stored procedure: 
    
    -- Result set 1: value_list

    SELECT
        '' as value_list, /* dummy column aliased by result set name */
        '' as o_value_field_1, /* unicode string */
        '' as o_value_field_3, /* unicode string */
        '' as o_value_field_2, /* unicode string */
        '' as o_description_field_1, /* unicode string */
        '' as o_description_field_2, /* unicode string */
        '' as o_description_field_3 /* unicode string */
    FROM <Table name>
    */

	DECLARE @p_SQLString nvarchar(500) , @p_ParmDefinition nvarchar(500),
			@p_retrieve_status varchar(10), @p_execution_status varchar(10),
			@p_session_id [sessionid], 
			@p_user_id [userid], 
			@p_client_id [uddt_client_id], 
			@p_locale_id [uddt_locale_id], 
			@p_country_code [uddt_country_code], 
			@p_lov_code [uddt_varchar_60], 
			@p_search_field_1 [uddt_nvarchar_60], 
			@p_search_field_2 [uddt_nvarchar_60], 
			@p_search_field_3 [uddt_nvarchar_60], 
			@p_search_field_4 [uddt_nvarchar_60], 
			@p_search_field_5 [uddt_nvarchar_60]

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
				@p_lov_code , 
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
			@p_lov_code [uddt_varchar_60], 
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
								@p_lov_code = @i_lov_code, 
								@p_search_field_1 = @i_search_field_1, 
								@p_search_field_2 = @i_search_field_2, 
								@p_search_field_3 = @i_search_field_3, 
								@p_search_field_4 = @i_search_field_4, 
								@p_search_field_5 = @i_search_field_5,
								@p_retrieve_status = @p_execution_status OUTPUT;
		
		if @p_execution_status = 'SUCCESS'
			return				
    
	end

	if @i_lov_code = 'CALL_ASSIGNEES_FOR_REPO_MGR'
	begin
		select '' as value_list,
			a.employee_id as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
			b.title+'.'+b.first_name+' '+ISNULL(b.middle_name,'')+' '+b.last_name
			 as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from functional_role_employee a, employee b
        where a.company_id = @i_client_id
          and a.country_code  = @i_country_code
          and reporting_to_employee_id = @i_search_field_1
          and a.company_id = b.company_id
          and a.country_code = b.country_code
          and a.employee_id = b.employee_id
        
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
          
		return
	end
	
	else if @i_lov_code = 'CUSTOMER_LOCATION'
	begin
		select '' as value_list,
			location_code as o_value_field_1,
			address_line_1 + ' - ' + city as o_description_field_1,
			customer_id as o_value_field_2
			from customer_location
			where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	else if @i_lov_code = 'RESCDUOM'
	begin
		select '' as value_list,
			uom as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'RESCDUOM'
						and f.code = uom
						)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'RESCDUOM'
				   and e.code = uom)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'RESCDUOM'
				   and g.code = uom)
         end     
           as o_description_field_1,
             '' as o_description_field_2,
              ''   as o_description_field_3
			from resource_rate
			where company_id = @i_client_id
			and country_code = @i_country_code
			and resource_category =@i_search_field_1
			and resource_code = @i_search_field_2
		return
	end
	else if @i_lov_code = 'STOCKABLEUOM'
	begin
		select '' as value_list,
			a.stockable_uom_code  as o_value_field_1,
			a.warehouse_id  as o_value_field_2,
			'' as o_value_field_3,
			case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'ITEMUOM'
						and f.code = a.stockable_uom_code
						)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'ITEMUOM'
				   and e.code = a.stockable_uom_code)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'ITEMUOM'
				   and g.code = a.stockable_uom_code)
         end      
   	      as o_description_field_1 ,
   	      '' as o_description_field_2, /* unicode string */
			'' as o_description_field_3  /* unicode string */
			from item_warehouse a
			where company_id = @i_client_id
			and country_code = @i_country_code
			and a.item_code = @i_search_field_1
			and a.item_variant_code = @i_search_field_2
		return
	end
	
	else if  @i_lov_code = 'CALLBNBIND'
	begin
		select '' as value_list,
			isnull(a.code,'') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLBNBIND'
						and f.code = a.code
						)
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
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'CALLBNBIND'		    
		return
	end
	
	else if  @i_lov_code = 'ITEMUOM'
	begin

		select '' as value_list,
			isnull(a.code,'') as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'ITEMUOM'
						and f.code = a.code
						)
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
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'ITEMUOM'
		    
		return
	end
	else if  @i_lov_code = 'ITEMTYPE'
	begin

		select '' as value_list,
			isnull(a.code,'') as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'ITEMTYPE'
						and f.code = a.code
						)
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
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'ITEMTYPE'
		    
		return
	end
	else if  @i_lov_code = 'CALLSUBTYPE'
	begin

		select '' as value_list,
			isnull(a.code,'') as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLSUBTYPE'
						and f.code = a.code
						)
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
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'CALLSUBTYPE'
		    
		return
	end
	
	else if  @i_lov_code = 'RESCATG'
	begin

		select '' as value_list,
			isnull(a.code,'') as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'RESCATG'
						and f.code = a.code
						)
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
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'RESCATG'
		    
		return
	end
	
	else if (@i_lov_code = 'JOTYPE')
	 begin 
		select '' as value_list,
			a.type_code_value as o_value_field_1, /* unicode string */
			a.category_code_value as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				dbo.fn_escape_special_characters(case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'JOTYPE'
						and f.code = a.type_code_value
						)
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
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from category_type_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.link_type = 'JC'		  
		return
   end
	else if (@i_lov_code = 'CALLTYPE')
   begin 
		select '' as value_list,
			a.type_code_value as o_value_field_1, /* unicode string */
			a.category_code_value as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				dbo.fn_escape_special_characters(case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLTYPE'
						and f.code = a.type_code_value
						)
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
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from category_type_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.link_type = 'CC'		  
		return
   end
   else if (@i_lov_code = 'ORGLEVELCODES')
   begin
		
			select '' as value_list,
			level1_code as o_value_field_1, /* unicode string */
			'1' as o_value_field_2, /* level no */
			'' as o_value_field_3, /* unicode string */
			level1_code_description as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
			FROM level1_code
			where company_id = @i_client_id
			  and country_code = @i_country_code
			union all   
			select '' as value_list,
			level2_code as o_value_field_1, /* unicode string */
			'2' as o_value_field_2, /* level no */
			'' as o_value_field_3, /* unicode string */
			level2_code_description as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
			FROM level2_code
			where company_id = @i_client_id
			  and country_code = @i_country_code
			union all   
			select '' as value_list,
			level3_code as o_value_field_1, /* unicode string */
			'3' as o_value_field_2, /* level no */
			'' as o_value_field_3, /* unicode string */
			level3_code_description as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
			FROM level3_code
			where company_id = @i_client_id
			  and country_code = @i_country_code
			union all   
			select '' as value_list,
			level4_code as o_value_field_1, /* unicode string */
			'4' as o_value_field_2, /* level no */
			'' as o_value_field_3, /* unicode string */
			level4_code_description as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
			FROM level4_code
			where company_id = @i_client_id
			  and country_code = @i_country_code
			union all   
			select '' as value_list,
			level5_code as o_value_field_1, /* unicode string */
			'5' as o_value_field_2, /* level no */
			'' as o_value_field_3, /* unicode string */
			level5_code_description as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
			FROM level5_code
			where company_id = @i_client_id
			  and country_code = @i_country_code
		return
	end
   else if (@i_lov_code = 'CUSTOMERLOCATION')
   begin
		select '' as value_list,
		location_code as o_value_field_1,
		customer_id as o_value_field_2,
		'' as o_value_field_3,
		address_line_1 + ' ' + city as o_description_field_1,
		'' as o_description_field_2,
		'' as o_description_field_3
		from customer_location
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
   end
   
  else if @i_lov_code = 'STATECODE'
	begin
		select '' as value_list,
			state_code as o_value_field_1,
			country_code as o_value_field_2,
			'' as o_value_field_3,
			state as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from state 		
		return
	end
	else if @i_lov_code = 'WHCODE'
	begin
		select '' as value_list,
			warehouse_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			warehouse_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from warehouse 		
		return
	end
	else if @i_lov_code = 'CURRENCYCODE'
	begin
		select '' as value_list,
			currency_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from currency_code 		
		return
	end
	
	else if @i_lov_code = 'ITEMCODE'
	begin
		select distinct '' as value_list,
			item_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			item_description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from item_master 		
		return
	end
	
	else if @i_lov_code = 'ITEMVARIANTCODE'
	begin
		select '' as value_list,
			item_variant_code as o_value_field_1,
			item_code as o_value_field_2,
			'' as o_value_field_3,
			variant_description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from item_master 		
		return
	end
	else if @i_lov_code = 'WFSTATUS'
	begin
	    	SELECT '' as value_list, /* dummy column aliased by result set name */
			    status_code as o_value_field_1,
			    transaction_type_code as o_value_field_2,
				request_category as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'CALLSTATUS'
						and f.code = a.status_code
						)
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
         end      
   	     as o_description_field_1,
   	     '' as o_description_field_2,
   	     '' as o_description_field_3
        from workflow_status_master a
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
			
	end
	else if @i_lov_code = 'ASSET'
	begin
		select '' as value_list,
			'ZZZ' as o_value_field_1,
			'ALL' as o_value_field_2,
			'ALL' as o_value_field_3,
			'ZZZ' as o_description_field_1,
			'ALL' as o_description_field_2,
			'ALL' as o_description_field_3
		union all
		select '' as value_list,
			a.asset_id as o_value_field_1,
			a.customer_id as o_value_field_2,
			a.equipment_id as o_value_field_3,
			b.description as o_description_field_1,
			convert(varchar, b.servicing_org_level_no) as o_description_field_2,
			b.servicing_org_level_code as o_description_field_3
		from asset_master a, equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and a.equipment_id = b.equipment_id		
		return
	end
	else if @i_lov_code = 'WFSTAGE'
	begin
		select '' as value_list,
			workflow_stage_no as o_value_field_1,
			request_category as o_value_field_2,
			'' as o_value_field_3,
			description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from workflow_stage_master
		where company_id = @i_client_id
		and country_code = @i_country_code
		return
	end
	else if @i_lov_code = 'CALLSTAGE' /* getting unique data from workflow_stage_master table */
	begin
		select distinct '' as value_list,
			workflow_stage_no as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from workflow_stage_master
		where company_id = @i_client_id
		and country_code = @i_country_code
		return
	end
	else if @i_lov_code = 'ASSETSERVCONTRACT' /* This one is used in cascading with asset id in AMC screen */
	begin
		select '' as value_list,
			contract_doc_no as o_value_field_1,
			asset_id as o_value_field_2,
			'' as o_value_field_3,
			description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from asset_service_contract
		where company_id = @i_client_id 
		and country_code = @i_country_code
		return
	end
	else if @i_lov_code = 'ASSETSERVVISITCALLNUMBER'
	begin
		select '' as value_list,
			call_ref_no as o_value_field_1,
			asset_id as o_value_field_2,
			'' as o_value_field_3,
			case (select 1 
					from code_table_mlingual_translation f
					where f.company_id = @i_client_id
					and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'CALLTYPE'
					and f.code = a.call_type)
				when 1 then
					(select e.short_description 
					from code_table_mlingual_translation e
					where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'CALLTYPE'
					and e.code = a.call_type)
				else
					(select g.short_description 
					from code_table_mlingual_translation g
					where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'CALLTYPE'
					and g.code = a.call_type)
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from call_register a
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and call_category = 'SE'
		  and asset_id = @i_search_field_1
		  and call_ref_no
				not in (select b.call_ref_jo_no 
				from asset_service_schedule b 
				where b.company_id = @i_client_id
				and  b.country_code = @i_country_code
				and b.asset_id = @i_search_field_1
				and  b.call_jo_ind = 'C'
				and b.call_ref_jo_no != @i_search_field_2
				) 		 
		return
	end
	else if @i_lov_code = 'ASSETSERVVISITJONO'
	begin
		select '' as value_list,
			project_id as o_value_field_1,
			asset_id as o_value_field_2,
			'' as o_value_field_3,
			case (select 1 
					from code_table_mlingual_translation f
					where f.company_id = @i_client_id
					and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'JOTYPE'
					and f.code = a.job_order_type)
				when 1 then
					(select e.short_description 
					from code_table_mlingual_translation e
					where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = 'JOTYPE'
					and e.code = a.job_order_type)
				else
					(select g.short_description 
					from code_table_mlingual_translation g
					where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = 'JOTYPE'
					and g.code = a.job_order_type)
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from job_order_properties a
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and asset_id = @i_search_field_1
		  and project_id
				not in (select b.call_ref_jo_no 
				from asset_service_schedule b 
				where b.company_id = @i_client_id
				and  b.country_code = @i_country_code
				and b.asset_id = @i_search_field_1
				and  b.call_jo_ind = 'J'
				and b.call_ref_jo_no != @i_search_field_2
				) 	
		return	 
	end	
	else if @i_lov_code = 'ORGLEVELEMPLOYEELIST'
	begin
		select '' as value_list,
			employee_id as o_value_field_1,
			isnull(supervisor_emp_id, '') as o_value_field_2,
			'' as o_value_field_3,
			title + '.' + first_name + ' ' + isnull(middle_name, '') + ' ' + last_name as o_description_field_1,
			isnull((select title + '.' + first_name + ' ' + isnull(middle_name, '') + ' ' + last_name
				from employee b
				where b.company_id = @i_client_id
				and b.country_code = @i_country_code
				and b.employee_id = a.supervisor_emp_id), '') as o_description_field_2,
			'' as o_description_field_3
		from employee a
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.employee_status = 'A'
		and a.organogram_level_no = @i_search_field_1
		and a.organogram_level_code = @i_search_field_2
		return
	end
	
	else if @i_lov_code = 'ORGSUPVSREMPLOYEELIST'
	begin
		select '' as value_list,
			employee_id as o_value_field_1,
			isnull(supervisor_emp_id, '') as o_value_field_2,
			'' as o_value_field_3,
			title + '.' + first_name + ' ' + isnull(middle_name, '') + ' ' + last_name as o_description_field_1,
			isnull((select title + '.' + first_name + ' ' + isnull(middle_name, '') + ' ' + last_name
				from employee b
				where b.company_id = @i_client_id
				and b.country_code = @i_country_code
				and b.employee_id = a.supervisor_emp_id), '') as o_description_field_2,
			'' as o_description_field_3
		from employee a
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.employee_status = 'A'
		and a.organogram_level_no = @i_search_field_1
		and a.organogram_level_code = @i_search_field_2
		and a.supervisor_emp_id = @i_search_field_3
		return
	end
	
	else if (@i_lov_code = 'CUSTOMERCITY')
	begin
		select distinct '' as value_list,
			city as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			city as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from customer_location
		where company_id = @i_client_id
		and country_code = @i_country_code
		return
	end
	
	else if (@i_lov_code = 'CUSTOMERSTATE')
	begin
		select distinct '' as value_list,
			a.state_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			b.state as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from customer_location a, state b
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.country_code = b.country_code
		and a.state_code = b.state_code
		return
	end	
	
	else if (@i_lov_code = 'FUNC_ROLE_EMP_LIST')
	begin
		select '' as value_list,
			a.employee_id as o_value_field_1,
			a.functional_role_id as o_value_field_2,
			'' as o_value_field_3,
			b.title + ' ' + b.first_name + ' ' + ISNULL(b.middle_name, '') + ' ' + b.last_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from functional_role_employee a, employee b
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.company_id = b.company_id
		and a.country_code = b.country_code
		and a.employee_id = b.employee_id
		return
	end
	
	else if (@i_lov_code = 'ASSET_CONTR_CHK_FOR_A_CALL')
	begin
		select '' as value_list,
		c.contract_type as o_value_field_1,
		c.contract_doc_no as o_value_field_2,
		ISNULL((select CONVERT(varchar(2), a.service_visit_slno) + '*' + CONVERT(varchar(10), a.service_due_date, 120)
				from asset_service_schedule a
				where a.company_id = c.company_id
				and a.country_code = c.country_code
				and a.asset_id = c.asset_id
				and a.contract_doc_no = c.contract_doc_no
				and a.service_visit_slno = (select MIN(b.service_visit_slno) 
											from asset_service_schedule b
											where b.company_id = a.company_id
											and b.country_code = a.country_code
											and b.asset_id = a.asset_id
											and b.contract_doc_no = a.contract_doc_no
											and b.service_visit_status = 'NS')), '0') as o_value_field_3,
		ISNULL((select CONVERT(varchar(2), e.service_visit_slno) + '*' + CONVERT(varchar(10), e.service_due_date, 120)
				from asset_service_schedule e
				where e.company_id = c.company_id
				and e.country_code = c.country_code
				and e.asset_id = c.asset_id
				and e.contract_doc_no = c.contract_doc_no
				and e.service_visit_slno = (select MAX(f.service_visit_slno) 
											from asset_service_schedule f
											where f.company_id = e.company_id
											and f.country_code = e.country_code
											and f.asset_id = e.asset_id
											and f.contract_doc_no = e.contract_doc_no
											and f.service_visit_status = 'CO')), '0') as o_description_field_1,
		case (select 1 
				from code_table_mlingual_translation h
				where h.company_id = @i_client_id
				and h.country_code = @i_country_code
				and h.locale_id = @i_locale_id
				and h.code_type = 'ASSETCONTRACTTYPE'
				and h.code = c.contract_type)
					when 1 then
						(select i.short_description 
						from code_table_mlingual_translation i
						where i.company_id = @i_client_id
						and i.country_code = @i_country_code
						and i.locale_id = @i_locale_id
						and i.code_type = 'ASSETCONTRACTTYPE'
						and i.code = c.contract_type)
					else
						(select g.short_description 
						from code_table_mlingual_translation g
						where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.locale_id = 'ALL'
						and g.code_type = 'ASSETCONTRACTTYPE'
						and g.code = c.contract_type)
				end as o_description_field_2,
				ISNULL((select '{"bill_nonbill_ind":"' + j.billable_nonbillable_ind + '",
								"currency_code":"' + j.charges_currency_code + '",
								"gross_amt":"' + CONVERT(varchar(15), j.charges_gross_amount) + '",
								"tax_amt":"' + CONVERT(varchar(15), j.charges_tax_amount) + '",
								"discount_amt":"' + CONVERT(varchar(15), j.charges_discount_amount) + '",
								"net_amt":"' + CONVERT(varchar(15), j.charges_net_amount) + '"}'
				from asset_service_schedule j
				where j.company_id = c.company_id
				and j.country_code = c.country_code
				and j.asset_id = c.asset_id
				and j.contract_doc_no = c.contract_doc_no
				and j.service_visit_slno = (select MIN(k.service_visit_slno) 
											from asset_service_schedule k
											where k.company_id = j.company_id
											and k.country_code = j.country_code
											and k.asset_id = j.asset_id
											and k.contract_doc_no = j.contract_doc_no
											and k.service_visit_status = 'NS')), '') as o_description_field_3
		from asset_service_contract c, asset_master d
		where c.company_id = @i_client_id
		and c.country_code = @i_country_code
		and c.asset_id = @i_search_field_1
		and SYSDATETIMEOFFSET() between c.effective_from_date and c.effective_to_date
		and c.company_id = d.company_id
		and c.country_code = d.country_code
		and c.asset_id = d.asset_id
		return

	end
	
	else if (@i_lov_code = 'GET_CUST_USER_DETAILS')
	begin
		select '' as value_list,
			a.customer_id as o_value_field_1,
			a.customer_location_code as o_value_field_2,
			isnull(b.contact_person_1, '') as o_value_field_3,
			isnull(b.contact_person_1_mobile_no, '') as o_description_field_1,
			isnull(b.contact_person_1_email_id, '') as o_description_field_2,
			case(
				select 1 from customer_company_location_mapping c
				where c.company_id = @i_client_id
					and c.country_code = @i_country_code
					and c.customer_id = a.customer_id
					and c.customer_location_code = a.customer_location_code)
			when 1
			then(
				select company_location_code from customer_company_location_mapping d
				where d.company_id = @i_client_id
					and d.country_code = @i_country_code
					and d.customer_id = a.customer_id
					and d.customer_location_code = a.customer_location_code)
			else(
				case(
					select 1 from customer_company_location_mapping e
					where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.customer_id = a.customer_id
						and e.customer_location_code = 'ALL')
				when 1 
				then(
					select company_location_code from customer_company_location_mapping f
					where f.company_id = @i_client_id
						and f.country_code = @i_country_code
						and f.customer_id = a.customer_id
						and f.customer_location_code = 'ALL')
				else(
					select company_location_code from customer_company_location_mapping g
					where g.company_id = @i_client_id
						and g.country_code = @i_country_code
						and g.customer_id = 'ALL'
						and g.customer_location_code = 'ALL')
				end)			
			end as o_description_field_3
		from customer_user_mapping a, customer_location b
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.user_id = @i_search_field_1
		and a.company_id = b.company_id
		and a.country_code = b.country_code
		and a.customer_id = b.customer_id
		and a.customer_location_code = b.location_code
		return
	end
	else if (@i_lov_code = 'GET_CUST_USER_DETAILS_FOR_INBOUND_ENGINE')
	begin
		if(@i_search_field_1 = 'email')
		begin
			select '' as value_list,
				a.customer_id as o_value_field_1,
				a.location_code as o_value_field_2,
				case(
					select 1 from customer_company_location_mapping c
					where c.company_id = @i_client_id
						and c.country_code = @i_country_code
						and c.customer_id = a.customer_id
						and c.customer_location_code = a.location_code)
				when 1
				then(
					select company_location_code from customer_company_location_mapping d
					where d.company_id = @i_client_id
						and d.country_code = @i_country_code
						and d.customer_id = a.customer_id
						and d.customer_location_code = a.location_code)
				else(
					case(
						select 1 from customer_company_location_mapping e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.customer_id = a.customer_id
							and e.customer_location_code = 'ALL')
					when 1 
					then(
						select company_location_code from customer_company_location_mapping f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.customer_id = a.customer_id
							and f.customer_location_code = 'ALL')
					else(
						select company_location_code from customer_company_location_mapping g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.customer_id = 'ALL'
							and g.customer_location_code = 'ALL')
					end)			
				end as o_value_field_3,
				isnull((case(
							select 1 from customer_location h
							where h.company_id = @i_client_id
								and h.country_code = @i_country_code
								and h.contact_person_1_email_id = @i_search_field_2)
						when 1 
						then(
							select contact_person_1 from customer_location i
							where i.company_id = @i_client_id
								and i.country_code = @i_country_code
								and i.contact_person_1_email_id = @i_search_field_2)
						else(
							select contact_person_2 from customer_location j
							where j.company_id = @i_client_id
								and j.country_code = @i_country_code
								and j.contact_person_2_email_id = @i_search_field_2)
						end), '') as o_description_field_1,
				isnull((case(
							select 1 from customer_location k
							where k.company_id = @i_client_id
								and k.country_code = @i_country_code
								and k.contact_person_1_email_id = @i_search_field_2)
						when 1 
						then(
							select contact_person_1_mobile_no from customer_location l
							where l.company_id = @i_client_id
								and l.country_code = @i_country_code
								and l.contact_person_1_email_id = @i_search_field_2)
						else(
							select contact_person_2_mobile_no from customer_location m
							where m.company_id = @i_client_id
								and m.country_code = @i_country_code
								and m.contact_person_2_email_id = @i_search_field_2)
						end), '') as o_description_field_2,
				'processuser' + '*' + b.login_password as o_description_field_3
			from customer_location a, users b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and (a.contact_person_1_email_id = @i_search_field_2
						or a.contact_person_2_email_id = @i_search_field_2)
				and b.company_id = a.company_id
				and b.country_code = a.country_code	
				and b.user_id = 'processuser'
		end
		else if(@i_search_field_1 = 'sms')
		begin
			select '' as value_list,
				a.customer_id as o_value_field_1,
				a.location_code as o_value_field_2,
				case(
					select 1 from customer_company_location_mapping c
					where c.company_id = @i_client_id
						and c.country_code = @i_country_code
						and c.customer_id = a.customer_id
						and c.customer_location_code = a.location_code)
				when 1
				then(
					select company_location_code from customer_company_location_mapping d
					where d.company_id = @i_client_id
						and d.country_code = @i_country_code
						and d.customer_id = a.customer_id
						and d.customer_location_code = a.location_code)
				else(
					case(
						select 1 from customer_company_location_mapping e
						where e.company_id = @i_client_id
							and e.country_code = @i_country_code
							and e.customer_id = a.customer_id
							and e.customer_location_code = 'ALL')
					when 1 
					then(
						select company_location_code from customer_company_location_mapping f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.customer_id = a.customer_id
							and f.customer_location_code = 'ALL')
					else(
						select company_location_code from customer_company_location_mapping g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.customer_id = 'ALL'
							and g.customer_location_code = 'ALL')
					end)			
				end as o_value_field_3,
				isnull((case(
							select 1 from customer_location h
							where h.company_id = @i_client_id
								and h.country_code = @i_country_code
								and h.contact_person_1_mobile_no = @i_search_field_2)
						when 1 
						then(
							select contact_person_1 from customer_location i
							where i.company_id = @i_client_id
								and i.country_code = @i_country_code
								and i.contact_person_1_mobile_no = @i_search_field_2)
						else(
							select contact_person_2 from customer_location j
							where j.company_id = @i_client_id
								and j.country_code = @i_country_code
								and j.contact_person_2_mobile_no = @i_search_field_2)
						end), '') as o_description_field_1,
				isnull((case(
							select 1 from customer_location k
							where k.company_id = @i_client_id
								and k.country_code = @i_country_code
								and k.contact_person_1_mobile_no = @i_search_field_2)
						when 1 
						then(
							select contact_person_1_email_id from customer_location l
							where l.company_id = @i_client_id
								and l.country_code = @i_country_code
								and l.contact_person_1_mobile_no = @i_search_field_2)
						else(
							select contact_person_2_email_id from customer_location m
							where m.company_id = @i_client_id
								and m.country_code = @i_country_code
								and m.contact_person_2_mobile_no = @i_search_field_2)
						end), '') as o_description_field_2,
				'processuser' + '*' + b.login_password as o_description_field_3
			from customer_location a, users b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and (a.contact_person_1_mobile_no = @i_search_field_2
						or a.contact_person_2_mobile_no = @i_search_field_2)
				and b.company_id = a.company_id
				and b.country_code = a.country_code	
				and b.user_id = 'processuser'
		end
		return
	end
	else if (@i_lov_code = 'GET_CALL_INFO_DETAILS_FOR_INBOUND_ENGINE')
	begin
		select '' as value_list,
			(select top 1 code from code_table
			where company_id = @i_client_id
				and country_code = @i_country_code
				and code_type = 'CALLPRIORITY') as o_value_field_1,
			(select top 1 code from code_table
			where company_id = @i_client_id
				and country_code = @i_country_code
				and code_type = 'CALLTYPE') as o_value_field_2,
			'1' as o_value_field_3,
			(select level1_code from level1_code
			where company_id = @i_client_id
				and country_code = @i_country_code) as o_description_field_1,
			(select default_currency_code from company_location
			where company_id = @i_client_id
				and country_code = @i_country_code
				and location_code = @i_search_field_1) as o_description_field_2,
			'' as o_description_field_3
		return
	end
	
	else if (@i_lov_code= 'EMPLOYEE_LIST_FOR_USERS')
	begin
		select '' as value_list,
		employee_id as o_value_field_1,
		location_code as o_value_field_2,
		'' as o_value_field_3,
		title + ' ' + first_name + ' ' + isnull(middle_name, '') + ' ' + last_name as o_description_field_1,
		isnull(photo_reference, '') as o_description_field_2,
		'' as o_description_field_3
		from employee
		where company_id = @i_client_id
			and country_code = @i_country_code
			and employee_id not in (select employee_id from users
									where company_id = @i_client_id
										and country_code = @i_country_code) 
		return
	end
	
	else if (@i_lov_code = 'CUSTOMER_LOCATION_NON_CASCADE')
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
		return
	end
	
	else if @i_lov_code = 'ASSET_NON_CASCADE'
	begin
		select '' as value_list,
			'ZZZ' as o_value_field_1,
			'ALL' as o_value_field_2,
			'ALL' as o_value_field_3,
			'ZZZ' as o_description_field_1,
			'ALL' as o_description_field_2,
			'ALL' as o_description_field_3
		union all
		select '' as value_list,
			a.asset_id as o_value_field_1,
			a.customer_id as o_value_field_2,
			a.equipment_id as o_value_field_3,
			b.description as o_description_field_1,
			convert(varchar, b.servicing_org_level_no) as o_description_field_2,
			b.servicing_org_level_code as o_description_field_3
		from asset_master a, equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.customer_id = @i_search_field_1
			and a.equipment_id = (case @i_search_field_2
									when '' then a.equipment_id
									when 'ZZZ' then a.equipment_id
									else @i_search_field_2
									end
								  ) 
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and a.equipment_id = b.equipment_id		
		return

	end	
	else if (@i_lov_code = 'EQUIPMENTLIST')
	begin
		if((select b.user_group_type
			from users a, user_group b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.user_id = @i_user_id
				and b.company_id = a.company_id
				and b.country_code = a.country_code
				and b.user_group_id = a.user_group_id) = 'CU')
		begin
			select '' as value_list,
				'ZZZ' as o_value_field_1,
				'1' as o_value_field_2,
				level1_code as o_value_field_3,
				'ZZZ' as o_description_field_1,
				'ALL' as o_description_field_2,
				'' as o_description_field_3
			from level1_code
			where company_id = @i_client_id
				and country_code = @i_country_code
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
		else
		begin
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
		return
	end
	
	else if (@i_lov_code = 'CODETYPES')
	begin
		select '' as value_list,
			code_type as o_value_field_1,
			convert(varchar(10), code_value_max_allowed_size) as o_value_field_2,
			'' as o_value_field_3,
			isnull(description, '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3			
		from code_type_properties
		where company_id = @i_client_id
			and country_code = @i_country_code
			and system_or_user_definable = 'U'
		return
	end
	else if  @i_lov_code = 'CATGTYPECODE'
	begin
		select '' as value_list,
			a.code as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
			case (select 1 from code_table_mlingual_translation f
				  where f.company_id = @i_client_id
				    and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = @i_search_field_1
					and f.code = a.code
					)
			when 1 then
			(select e.short_description from code_table_mlingual_translation e
			 where e.company_id = @i_client_id
			   and e.country_code = @i_country_code
			   and e.locale_id = @i_locale_id
			   and e.code_type = @i_search_field_1
			   and e.code = a.code)
			else
			(select g.short_description from code_table_mlingual_translation g
			 where g.company_id = @i_client_id
			   and g.country_code = @i_country_code
			   and g.locale_id = 'ALL'
			   and g.code_type = @i_search_field_1
			   and g.code = a.code)
			end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = @i_search_field_1
		return
	end
	else if  @i_lov_code = 'CATGTYPELINK'
	begin
		select '' as value_list,
			a.code as o_value_field_1,
			case(select a.code)
			when 'CC' then (select 'CALLCATG')
			when 'JC' then (select 'JOCATG')
			when 'FI' then (select 'FILECATG')
			when 'RC' then (select 'RESCATG')
			when 'EC' then (select 'EQUIPCATG')
			end as o_value_field_2,
			case(select a.code)
			when 'CC' then (select 'CALLTYPE')
			when 'JC' then (select 'JOTYPE')
			when 'FI' then (select 'FILETYPE')
			when 'RC' then (select 'RESCODE')
			when 'EC' then (select 'EQUIPTYPE')
			end as o_value_field_3,
			case (select 1 from code_table_mlingual_translation f
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
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CATGTYPELINK'
		return
	end
	
	else if  @i_lov_code = 'USERGROUPTYPE'
	begin

		select '' as value_list,
			isnull(a.code,'') as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'UGRPTYPE'
						and f.code = a.code
						)
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
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'UGRPTYPE'		    
		return
	end
	
	else if  @i_lov_code = 'CALLTOSTATUS'
	begin
		select '' as value_list,
			a.to_status as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			isnull((select
					case(	
						select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'CALLSTATUS'
							and f.code = b.code)			
					when 1 then(
						select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'CALLSTATUS'
						and e.code = b.code)
					else(
						select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'CALLSTATUS'
							and g.code = b.code)
					end
				from code_table b
				where b.company_id = @i_client_id
					and b.country_code = @i_country_code
					and b.code = a.to_status
					and b.code_type = 'CALLSTATUS'), '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from workflow_status_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.transaction_type_code = 'CALL'
		  and a.request_category = @i_search_field_1
		  and a.from_workflow_stage = @i_search_field_2
		  and a.from_status = @i_search_field_3
		  and a.to_workflow_stage = @i_search_field_4
		  and cast(a.from_workflow_stage as varchar(1))+a.from_status+cast(a.to_workflow_stage as varchar(1))+a.to_status
		      not in (
				select cast(b.from_workflow_stage as varchar(1))+b.from_status+cast(b.to_workflow_stage as varchar(1))+b.to_status
				from workflow_eventverb_list b
				where b.company_id = a.company_id
				  and b.country_code = a.country_code
				  and b.transaction_type_code = a.transaction_type_code
				  and b.request_category = a.request_category
			)
		return
			
	end
	
	else if  @i_lov_code = 'CALLTOSTAGE'
	begin
		select distinct '' as value_list,
			a.to_workflow_stage as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			isnull((
				select x.description 
				from workflow_stage_master x
				where x.company_id = @i_client_id
					and x.country_code = @i_country_code
					and x.transaction_type_code = 'CALL'
					and x.request_category = @i_search_field_1
					and x.workflow_stage_no = a.to_workflow_stage ), '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from workflow_status_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.transaction_type_code = 'CALL'
			and a.request_category = @i_search_field_1
			and a.from_workflow_stage = @i_search_field_2
			and a.from_status = @i_search_field_3
			and cast(a.from_workflow_stage as varchar(1))+a.from_status+cast(a.to_workflow_stage as varchar(1))+a.to_status
			not in (
				select cast(b.from_workflow_stage as varchar(1))+b.from_status+cast(b.to_workflow_stage as varchar(1))+b.to_status
				from workflow_eventverb_list b
				where b.company_id = a.company_id
				  and b.country_code = a.country_code
				  and b.transaction_type_code = a.transaction_type_code
				  and b.request_category = a.request_category
			)
		return
	end
	
	if ( @i_lov_code = 'VISIT_CALL_LINK_TYPE') /* Analysis Code 1 */
	begin
		select '' as value_list,
			isnull(a.code, '') as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'VISIT_CALL_LINK_TYPE'
						and f.code = a.code
						)
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
				end
			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'VISIT_CALL_LINK_TYPE'
		    
		return		  
	end
	
	else if @i_lov_code = 'ASSET_SERVICE_CONTRACT' /* This one is used in Getting contacts for selected asset */
	begin
		select '' as value_list,
			contract_doc_no as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from asset_service_contract
		where company_id = @i_client_id 
		and country_code = @i_country_code
		and asset_id = @i_search_field_1
		and SYSDATETIMEOFFSET() between effective_from_date and effective_to_date
		return
	end
	
	else if @i_lov_code = 'ASSET_SERVICE_VISIT_NO' /* This one is used in Getting contacts for selected asset */
	begin
		select '' as value_list,
			service_visit_slno as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'Due On [' + convert(varchar(10), service_due_date, 105) + ']' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from asset_service_schedule
		where company_id = @i_client_id 
		and country_code = @i_country_code
		and asset_id = @i_search_field_1
		and contract_doc_no = @i_search_field_2
		and service_visit_status = 'NS'
		return
	end
	
	else if (@i_lov_code = 'CALL_TYPE') /* This user for non cascading alternate to CALLTYPE */
	begin 
		select '' as value_list,
			a.type_code_value as o_value_field_1, /* unicode string */
			'' as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
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
			end as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from category_type_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.link_type = 'CC'
		  and a.category_code_value = @i_search_field_1
		return

	end
	else if (@i_lov_code = 'ORGANOGRAMLEVELCODES') /* THIS IS USED FOR NON CASCADE */
	begin		
		if (@i_search_field_1 = '1')
		begin
			select '' as value_list,
				level1_code as o_value_field_1, /* unicode string */
				'1' as o_value_field_2, /* level no */
				'' as o_value_field_3, /* unicode string */
				level1_code_description as o_description_field_1, /* unicode string */
				'' as o_description_field_2, /* unicode string */
				'' as o_description_field_3 /* unicode string */
			FROM level1_code
			where company_id = @i_client_id
				and country_code = @i_country_code
			return
		end
		else if (@i_search_field_1 = '2')
		begin 
			select '' as value_list,
				level2_code as o_value_field_1, /* unicode string */
				'2' as o_value_field_2, /* level no */
				'' as o_value_field_3, /* unicode string */
				level2_code_description as o_description_field_1, /* unicode string */
				'' as o_description_field_2, /* unicode string */
				'' as o_description_field_3 /* unicode string */
			FROM level2_code
			where company_id = @i_client_id
				and country_code = @i_country_code
			return

		end
		else if (@i_search_field_1 = '3')
		begin
			select '' as value_list,
				level3_code as o_value_field_1, /* unicode string */
				'3' as o_value_field_2, /* level no */
				'' as o_value_field_3, /* unicode string */
				level3_code_description as o_description_field_1, /* unicode string */
				'' as o_description_field_2, /* unicode string */
				'' as o_description_field_3 /* unicode string */
			FROM level3_code
			where company_id = @i_client_id
				and country_code = @i_country_code
			return
		end
		else if (@i_search_field_1 = '4')
		begin
			select '' as value_list,
				level4_code as o_value_field_1, /* unicode string */
				'4' as o_value_field_2, /* level no */
				'' as o_value_field_3, /* unicode string */
				level4_code_description as o_description_field_1, /* unicode string */
				'' as o_description_field_2, /* unicode string */
				'' as o_description_field_3 /* unicode string */
			FROM level4_code
			where company_id = @i_client_id
				and country_code = @i_country_code
			return

		end
		else if (@i_search_field_1 = '5')
		begin
			select '' as value_list,
				level5_code as o_value_field_1, /* unicode string */
				'5' as o_value_field_2, /* level no */
				'' as o_value_field_3, /* unicode string */
				level5_code_description as o_description_field_1, /* unicode string */
				'' as o_description_field_2, /* unicode string */
				'' as o_description_field_3 /* unicode string */
			FROM level5_code
			where company_id = @i_client_id
				and country_code = @i_country_code
			return
		end
	end
	
	else if (@i_lov_code = 'ORGANOGRAMLEVELNUMBER') /* THIS IS USED FOR NON CASCADE */
	begin
		declare @noof_levels tinyint
		set @noof_levels = 0
		
		create table #org_levels (
			level_id tinyint null,
			level_name nvarchar(30) null)
			
		select @noof_levels = organogram_noof_levels
		from company_configuration 
		where company_id = @i_client_id
			and country_code = @i_country_code
			
		if (@noof_levels >= 1)
			insert #org_levels
			select 1, isnull(level1_field_name,'')
			from company_configuration 
			where company_id = @i_client_id
				and country_code = @i_country_code

		if (@noof_levels >= 2)
			insert #org_levels
			select 2, isnull(level2_field_name,'')
			from company_configuration 
			where company_id = @i_client_id
				and country_code = @i_country_code

		if (@noof_levels >= 3)
			insert #org_levels
			select 3, isnull(level3_field_name,'')
			from company_configuration 
			where company_id = @i_client_id
				and country_code = @i_country_code

		if (@noof_levels >= 4)
			insert #org_levels
			select 4, isnull(level4_field_name,'')
			from company_configuration 
			where company_id = @i_client_id
				and country_code = @i_country_code

		if (@noof_levels >= 5)
			insert #org_levels
			select 5, isnull(level5_field_name,'')
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
		FROM #org_levels
		return
	end
	
	else if (@i_lov_code = 'FUNC_ROLE_EMPLOYEE_LIST') /* THIS IS USEDFOR NON CASCADE */
	begin
		select '' as value_list,
			a.employee_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			b.title + ' ' + b.first_name + ' ' + ISNULL(b.middle_name, '') + ' ' + b.last_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from functional_role_employee a, employee b
		where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.functional_role_id = @i_search_field_1
		and a.company_id = b.company_id
		and a.country_code = b.country_code
		and a.employee_id = b.employee_id
		return
	end
	else if @i_lov_code = 'USERPREFERENCE_FOR_FILTERS'
	begin
		select distinct '' as value_list,
			favorite_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			favorite_id as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from user_preferences 	
		where company_id = @i_client_id
		and country_code  =@i_country_code
		and user_id = @i_search_field_1
		and screen_id = @i_search_field_2
		and preference_area = @i_search_field_3
		and favorite_id != 'DEFAULT'
		
		return
	end
	
	/* SNIPPETS BELOW ARE BASED ON THE NEW CLIENT TEMPLATE */
	else if @i_lov_code = 'CALLCATEGORY_LIST'
	begin
		SELECT '' as value_list,
			a.code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
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
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLCATG'
		return
	end
	
	else if (@i_lov_code = 'CALLTYPE_LIST')
	begin 
		select '' as value_list,
			a.type_code_value as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
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
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from category_type_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.link_type = 'CC'
		  and a.category_code_value = @i_search_field_1
		return
	end
	
	else if (@i_lov_code = 'CALLSTATUS_LIST')
	begin 
		select '' as value_list,
			a.status_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
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
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from workflow_status_master a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.transaction_type_code = 'CALL'
		  and a.request_category = @i_search_field_1
		return
	end
	
	else if (@i_lov_code = 'CUSTOMER_LIST')
	begin
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
		return
	end
	
	else if (@i_lov_code = 'CUSTOMERLOCATION_LIST')
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
		return
	end
	
	else if (@i_lov_code = 'EQUIPMENT_LIST')
	begin
		if((select b.user_group_type
			from users a, user_group b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.user_id = @i_user_id
				and b.company_id = a.company_id
				and b.country_code = a.country_code
				and b.user_group_id = a.user_group_id) = 'CU')
		begin
			select '' as value_list,
				'ZZZ' as o_value_field_1,
				'1' as o_value_field_2,
				level1_code as o_value_field_3,
				'ZZZ' as o_description_field_1,
				'ALL' as o_description_field_2,
				'' as o_description_field_3
			from level1_code
			where company_id = @i_client_id
				and country_code = @i_country_code
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
		else
		begin
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
		return
	end
	
	else if @i_lov_code = 'ASSET_LIST'
	begin
		select '' as value_list,
			'ZZZ' as o_value_field_1,
			'ALL' as o_value_field_2,
			'ALL' as o_value_field_3,
			'ZZZ' as o_description_field_1,
			'ALL' as o_description_field_2,
			'ALL' as o_description_field_3
		union all
		select '' as value_list,
			a.asset_id as o_value_field_1,
			a.customer_id as o_value_field_2,
			a.equipment_id as o_value_field_3,
			b.description as o_description_field_1,
			convert(varchar, a.servicing_org_level_no) as o_description_field_2,
			a.servicing_org_level_code as o_description_field_3
		from asset_master a, equipment b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.customer_id = @i_search_field_1
			and a.equipment_id = (
				case @i_search_field_2
				when '' then a.equipment_id
				when 'ZZZ' then a.equipment_id
				when 'ALL' then a.equipment_id
				else @i_search_field_2
				end) 
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and a.equipment_id = b.equipment_id		
		return
	end	
	
	else if @i_lov_code = 'CALLPRIORITY_LIST'
	begin
		SELECT '' as value_list,
			a.code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
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
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CALLPRIORITY'
		return
	end
	
	else if @i_lov_code = 'CALLASSIGNTO_LIST'
	begin
		SELECT '' as value_list,
			b.employee_id as o_value_field_1,
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
			and b.employee_id = c.employee_id
			and c.employee_status = 'A'
		return
	end
	
	else if @i_lov_code = 'CALLREPORTINGTO_LIST'
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
		return
	end
	
	else if @i_lov_code = 'CALLMAPPEDTO_LIST'
	begin
		SELECT distinct '' as value_list,
			b.mapped_to_employee_id as o_value_field_1,
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
			and isnull(b.mapped_to_employee_id,'') = c.employee_id
			and c.employee_status = 'A'
		return
	end
	
	else if (@i_lov_code = 'COMPANYLOCATION_LIST')
	begin
		select '' as value_list,
			location_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			location_name_short as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from company_location
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	else if  @i_lov_code = 'CALLBNBIND_LIST'
	begin
		select '' as value_list,
			isnull(a.code,'') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			case (select 1 from code_table_mlingual_translation f
				  where f.company_id = @i_client_id
				    and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'CALLBNBIND'
					and f.code = a.code
					)
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
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'CALLBNBIND'		    
		return
	end
	
	else if  @i_lov_code = 'ORGLEVELNO_LIST'
	begin
		declare @p_no_of_levels tinyint
		set @p_no_of_levels = 0

		create table #organogram_levels (
			level_id tinyint null,
			level_name nvarchar(30) null
		)

		select @p_no_of_levels = organogram_noof_levels
		from company_configuration 
		where company_id = @i_client_id
			and country_code = @i_country_code

		if (@p_no_of_levels >= 1)
			insert #organogram_levels
			select 1, isnull(level1_field_name, '')
			from company_configuration 
			where company_id = @i_client_id
				and country_code = @i_country_code

		if (@p_no_of_levels >= 2)
			insert #organogram_levels
			select 2, isnull(level2_field_name, '')
			from company_configuration 
			where company_id = @i_client_id
				and country_code = @i_country_code

		if (@p_no_of_levels >= 3)
			insert #organogram_levels
			select 3, isnull(level3_field_name, '')
			from company_configuration 
			where company_id = @i_client_id
				and country_code = @i_country_code

		if (@p_no_of_levels >= 4)
			insert #organogram_levels
			select 4, isnull(level4_field_name, '')
			from company_configuration 
			where company_id = @i_client_id
				and country_code = @i_country_code

		if (@p_no_of_levels >= 5)
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
		return
	end
	
	else if  @i_lov_code = 'ORGLEVELCODE_LIST'
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
			return
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
			return
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
			return
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
			return

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
			return
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
			return
		end
	end
	
	else if @i_lov_code = 'SERVICECONTRACT_LIST'
	begin
		select '' as value_list,
			contract_doc_no as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from asset_service_contract
		where company_id = @i_client_id 
			and country_code = @i_country_code
			and asset_id = @i_search_field_1
			and (effective_from_date is null
			     or 
				 SYSDATETIME() between effective_from_date and dateadd(mm,2,effective_to_date) /* Allow grace period of 2 months from effective finish date */
				)
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
			and contract_doc_no = @i_search_field_2
			and service_visit_status = 'NS'
			and service_visit_slno > 
				isnull(( select MAX(as1.service_visit_slno)
				  from asset_service_schedule as1
				  where as1.company_id = @i_client_id
				    and as1.country_code = @i_country_code
					and as1.asset_id = @i_search_field_1
					and as1.contract_doc_no = @i_search_field_2
				    and as1.service_visit_status != 'NS'  
				),0)
		return
	end
	
	else if @i_lov_code = 'FUNCROLE_LIST'
	begin
		select '' as value_list,
			functional_role_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			role_description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from functional_role
		where company_id = @i_client_id 
			and country_code = @i_country_code
		return
	end
	
	else if (@i_lov_code = 'FUNCROLEEMPLOYEE_LIST')
	begin
		select '' as value_list,
			a.employee_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			b.title + ' ' + b.first_name + ' ' + ISNULL(b.middle_name, '') + ' ' + b.last_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from functional_role_employee a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.functional_role_id = @i_search_field_1
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.employee_id = b.employee_id
		return
	end
	
	else if (@i_lov_code = 'CURRENCYCODE_LIST')
	begin
		select '' as value_list,
			currency_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from currency_code
		return
	end
	
	else if (@i_lov_code = 'USER_LIST')
	begin
		select '' as value_list,
			a.user_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			b.title + ' ' + b.first_name + ' ' + isnull(b.middle_name, '') + ' ' + b.last_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from users a, employee b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.active_ind = 1
			and a.company_id = b.company_id
			and a.country_code = b.country_code
			and a.employee_id = b.employee_id
		return
	end
	
	else if (@i_lov_code = 'ABS_CUSTOMER_LIST')
	begin
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
		return
	end
	
	else if (@i_lov_code = 'ABS_EQUIPMENT_LIST')
	begin
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
		return
	end
	
	else if @i_lov_code = 'CALL_USER_ATTACHMENTS'
	begin
		select '' as value_list,
			attachment_file_category as o_value_field_1,
			attachment_file_type as o_value_field_2,
			attachment_file_path as o_value_field_3,
			attachment_file_name as o_description_field_1,
			CONVERT(varchar(1), closure_report_ind) as o_description_field_2,
			'' as o_description_field_3
        from call_user_attachments
        where company_id = @i_client_id
          and country_code  = @i_country_code
          and call_ref_no = @i_search_field_1
          
		return
	end
	else if  @i_lov_code = 'EQUIPMENTOEM'
	begin
		select '' as value_list,
			isnull(a.code, '') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'EQUIPOEM'
						and f.code = a.code
						)
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
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'EQUIPOEM'		    
		return
	end
	else if  @i_lov_code = 'EQUIPMENTCATEGORY'
	begin
		select '' as value_list,
			isnull(a.code, '') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'EQUIPCATG'
						and f.code = a.code
						)
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
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'EQUIPCATG'		    
	return
	end
	else if  @i_lov_code = 'EQUIPMENTCATEGORY_LINKED'
	begin
		select '' as value_list,
			isnull(a.type_code_value, '') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'EQUIPCATG'
						and f.code = a.type_code_value
						)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'EQUIPCATG'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'EQUIPCATG'
				   and g.code = a.type_code_value)
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from category_type_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.link_type = 'EM'	
		  and a.category_code_value = isnull(@i_search_field_1, a.category_code_value)
		return
	end
	
	else if (@i_lov_code = 'EQUIPMENTTYPE')
	begin 
		select '' as value_list,
			a.type_code_value as o_value_field_1, /* unicode string */
			a.category_code_value as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				isnull(case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'EQUIPTYPE'
						and f.code = a.type_code_value
						)
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
				end, '')

			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from category_type_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.link_type = 'EC'
		  and a.category_code_value = @i_search_field_1 	
		  	  
		return
   end
else if  @i_lov_code = 'EQUIPMENTTYPE_LINKED'
	begin
		select '' as value_list,
			isnull(a.type_code_value, '') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'EQUIPTYPE'
						and f.code = a.type_code_value
						)
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
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from category_type_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.link_type = 'EC'	
		  and a.category_code_value = isnull(@i_search_field_2, a.category_code_value)

		return
   end
   else if (@i_lov_code = 'CUSTOMER_LIST_FILTER')
	begin
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
		return
	end
	
	else if (@i_lov_code = 'EQUIPMENT_LIST_FILTER')
	begin
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
		return
	end
	
	else if @i_lov_code = 'ASSET_LIST_FILTER'
	begin
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
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and a.equipment_id = b.equipment_id		
		return
	end	
	
	else if @i_lov_code = 'SERVICE_VISIT_STATUS_FILTER'
	begin
		select '' as value_list,
			isnull(a.code, '') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'SERVVISITSTATUS'
						and f.code = a.code
						)
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
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'SERVVISITSTATUS'		    
		return
	end	
	
	else if @i_lov_code = 'ASSET_SERVICE_CONTRACT_LIST'
	begin
		select '' as value_list,
			contract_doc_no as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from asset_service_contract
		where company_id = @i_client_id 
			and country_code = @i_country_code
			and asset_id = @i_search_field_1
		return
	end
	
	else if @i_lov_code = 'ASSET_CONTRACT_TYPE'
	begin
		select '' as value_list,
			isnull(a.code, '') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'ASSETCONTRACTTYPE'
						and f.code = a.code
						)
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
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'ASSETCONTRACTTYPE'
		  and a.code != 'OW'		    
		return
	end	
	else if @i_lov_code = 'ASSET_CONTRACT_TYPE_INCL_OW'
	begin
		select '' as value_list,
			isnull(a.code, '') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'ASSETCONTRACTTYPE'
						and f.code = a.code
						)
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
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'ASSETCONTRACTTYPE'
		return
	end		
	else if @i_lov_code = 'COUNTRY_LIST'
	begin
		select '' as value_list,
			country_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			country_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from country
		return
	end
	
	else if @i_lov_code = 'STATE_LIST'
	begin
		select '' as value_list,
			state_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			state as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from state
		where country_code = @i_search_field_1
		return
	end
	
	else if @i_lov_code = 'DEALER_LIST'
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
		return
	end
	
	else if @i_lov_code = 'EQUIPMENT_CONTRACT_TYPE'
	begin
		select '' as value_list,
			isnull(a.code, '') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'EQCONTRACTTYPE'
						and f.code = a.code
						)
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
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'EQCONTRACTTYPE'		    
		return
	end	
	
	else if @i_lov_code = 'CALL_USER_ATTACHMENTS'
	begin
		select '' as value_list,
			attachment_file_category as o_value_field_1,
			attachment_file_type as o_value_field_2,
			attachment_file_path as o_value_field_3,
			attachment_file_name as o_description_field_1,
			CONVERT(varchar(1), closure_report_ind) as o_description_field_2,
			'' as o_description_field_3
        from call_user_attachments
        where company_id = @i_client_id
          and country_code  = @i_country_code
          and call_ref_no = @i_search_field_1
          
		return
	end
	
	else if @i_lov_code = 'ITEMCODE_FILTER'
	begin
		select '' as value_list,
			item_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			isnull(item_description, '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from item_master
        where company_id = @i_client_id
          and country_code  = @i_country_code          
		return
	end
	
	else if @i_lov_code = 'ITEMVARIANTCODE_FILTER'
	begin
		select '' as value_list,
			item_variant_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			isnull(variant_description, '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from item_master
        where company_id = @i_client_id
          and country_code  = @i_country_code
          and item_code = @i_search_field_1
		return
	end
	
	else if @i_lov_code = 'INVENTORY_ADJ_TYPE_FILTER'
	begin
		select '' as value_list,
			isnull(a.code, '') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'INVADJTYPE'
						and f.code = a.code
						)
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
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'INVADJTYPE'		    
		return
	end	
	
	else if @i_lov_code = 'WAREHOUSE_FILTER'
	begin
		select '' as value_list,
			a.warehouse_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			b.warehouse_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from item_warehouse a, warehouse b
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and b.company_id = a.company_id
			and b.country_code = a.country_code
			and a.warehouse_id = b.warehouse_id
			and a.item_code = @i_search_field_1
			and a.item_variant_code = @i_search_field_2
		return
	end
	
	else if @i_lov_code = 'LOTBATCHNOLIST'
	begin
		select '' as value_list,
			lot_batch_no as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			lot_batch_no as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from item_inventory
		where company_id = @i_client_id
			and country_code = @i_country_code
			and item_code = @i_search_field_1
			and item_variant_code = @i_search_field_2

		return
	end
	else if @i_lov_code = 'INVENTORY_ADJ_REASONCODE'
	begin
		select '' as value_list,
			isnull(a.code,'') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'INVADJREASON'
						and f.code = a.code
						)
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
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'INVADJREASON'		    
		return
	end
	
	else if  @i_lov_code = 'EXPENSETOSTAGE'
	begin
		select distinct '' as value_list,
			a.to_workflow_stage as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			isnull((
				select x.description 
				from workflow_stage_master x
				where x.company_id = @i_client_id
					and x.country_code = @i_country_code
					and x.transaction_type_code = 'EXPENSE'
					and x.request_category = @i_search_field_1
					and x.workflow_stage_no = a.to_workflow_stage ), '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from workflow_status_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.transaction_type_code = 'EXPENSE'
			and a.request_category = @i_search_field_1
			and a.from_workflow_stage = @i_search_field_2
			and a.from_status = @i_search_field_3
			and cast(a.from_workflow_stage as varchar(1))+a.from_status+cast(a.to_workflow_stage as varchar(1))+a.to_status
			not in (
				select cast(b.from_workflow_stage as varchar(1))+b.from_status+cast(b.to_workflow_stage as varchar(1))+b.to_status
				from workflow_eventverb_list b
				where b.company_id = a.company_id
				  and b.country_code = a.country_code
				  and b.transaction_type_code = a.transaction_type_code
				  and b.request_category = a.request_category
			)
		return
	end
	
	else if  @i_lov_code = 'EXPENSETOSTATUS'
	begin
		select '' as value_list,
			a.to_status as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			isnull((select
					case(	
						select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'EXPSTATUS'
							and f.code = b.code)			
					when 1 then(
						select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'EXPSTATUS'
						and e.code = b.code)
					else(
						select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'EXPSTATUS'
							and g.code = b.code)
					end
				from code_table b
				where b.company_id = @i_client_id
					and b.country_code = @i_country_code
					and b.code = a.to_status
					and b.code_type = 'EXPSTATUS'), '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from workflow_status_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.transaction_type_code = 'EXPENSE'
		  and a.request_category = @i_search_field_1
		  and a.from_workflow_stage = @i_search_field_2
		  and a.from_status = @i_search_field_3
		  and a.to_workflow_stage = @i_search_field_4
		  and cast(a.from_workflow_stage as varchar(1))+a.from_status+cast(a.to_workflow_stage as varchar(1))+a.to_status
		      not in (
				select cast(b.from_workflow_stage as varchar(1))+b.from_status+cast(b.to_workflow_stage as varchar(1))+b.to_status
				from workflow_eventverb_list b
				where b.company_id = a.company_id
				  and b.country_code = a.country_code
				  and b.transaction_type_code = a.transaction_type_code
				  and b.request_category = a.request_category
			)
		return
			
	end
	
	else if @i_lov_code = 'EXPENSECATEGORY_LIST'
	begin
		SELECT '' as value_list,
			a.code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
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
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EXPCATG'
		return
	end
	
	else if (@i_lov_code = 'EXPENSETYPE_LIST')
	begin 
		select '' as value_list,
			a.type_code_value as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
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
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from category_type_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.link_type = 'EX'
		  and a.category_code_value = @i_search_field_1
		return
	end
	
	else if (@i_lov_code = 'EXPENSESTATUS_LIST')
	begin 
		select '' as value_list,
			a.status_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			case (select 1 from code_table_mlingual_translation f
				  where f.company_id = @i_client_id
				    and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'EXPSTATUS'
					and f.code = a.status_code)
			when 1 then
			(select e.short_description from code_table_mlingual_translation e
			 where e.company_id = @i_client_id
			   and e.country_code = @i_country_code
			   and e.locale_id = @i_locale_id
			   and e.code_type = 'EXPSTATUS'
			   and e.code = a.status_code)
			else
			(select g.short_description from code_table_mlingual_translation g
			 where g.company_id = @i_client_id
			   and g.country_code = @i_country_code
			   and g.locale_id = 'ALL'
			   and g.code_type = 'EXPSTATUS'
			   and g.code = a.status_code)
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from workflow_status_master a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.transaction_type_code = 'EXPENSE'
		  and a.request_category = @i_search_field_1
		return
	end
	
	else if @i_lov_code = 'EXPENSEHEADCODE_LIST'
	begin
		SELECT '' as value_list,
			a.code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
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
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EXPHEADCODE'
		return
	end
	
	else if  @i_lov_code = 'INVOICETOSTAGE'
	begin
		select distinct '' as value_list,
			a.to_workflow_stage as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			isnull((
				select x.description 
				from workflow_stage_master x
				where x.company_id = @i_client_id
					and x.country_code = @i_country_code
					and x.transaction_type_code = 'INVOICE'
					and x.request_category = @i_search_field_1
					and x.workflow_stage_no = a.to_workflow_stage ), '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from workflow_status_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.transaction_type_code = 'INVOICE'
			and a.request_category = @i_search_field_1
			and a.from_workflow_stage = @i_search_field_2
			and a.from_status = @i_search_field_3
			and cast(a.from_workflow_stage as varchar(1))+a.from_status+cast(a.to_workflow_stage as varchar(1))+a.to_status
			not in (
				select cast(b.from_workflow_stage as varchar(1))+b.from_status+cast(b.to_workflow_stage as varchar(1))+b.to_status
				from workflow_eventverb_list b
				where b.company_id = a.company_id
				  and b.country_code = a.country_code
				  and b.transaction_type_code = a.transaction_type_code
				  and b.request_category = a.request_category
			)
		return
	end
	
	else if  @i_lov_code = 'INVOICETOSTATUS'
	begin
		select '' as value_list,
			a.to_status as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			isnull((select
					case(	
						select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'INVOICESTATUS'
							and f.code = b.code)			
					when 1 then(
						select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'INVOICESTATUS'
						and e.code = b.code)
					else(
						select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'INVOICESTATUS'
							and g.code = b.code)
					end
				from code_table b
				where b.company_id = @i_client_id
					and b.country_code = @i_country_code
					and b.code = a.to_status
					and b.code_type = 'INVOICESTATUS'), '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from workflow_status_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.transaction_type_code = 'INVOICE'
		  and a.request_category = @i_search_field_1
		  and a.from_workflow_stage = @i_search_field_2
		  and a.from_status = @i_search_field_3
		  and a.to_workflow_stage = @i_search_field_4
		  and cast(a.from_workflow_stage as varchar(1))+a.from_status+cast(a.to_workflow_stage as varchar(1))+a.to_status
		      not in (
				select cast(b.from_workflow_stage as varchar(1))+b.from_status+cast(b.to_workflow_stage as varchar(1))+b.to_status
				from workflow_eventverb_list b
				where b.company_id = a.company_id
				  and b.country_code = a.country_code
				  and b.transaction_type_code = a.transaction_type_code
				  and b.request_category = a.request_category
			)
		return
			
	end
	
	else if @i_lov_code = 'INVOICECATEGORY_LIST'
	begin
		SELECT '' as value_list,
			a.code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
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
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'INVOICECATG'
		return
	end
	
	else if (@i_lov_code = 'INVOICETYPE_LIST')
	begin 
		select '' as value_list,
			a.type_code_value as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			case (select 1 from code_table_mlingual_translation f
				  where f.company_id = @i_client_id
				    and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'INVOICETYPE'
					and f.code = a.type_code_value)
			when 1 then
			(select e.short_description from code_table_mlingual_translation e
			 where e.company_id = @i_client_id
			   and e.country_code = @i_country_code
			   and e.locale_id = @i_locale_id
			   and e.code_type = 'INVOICETYPE'
			   and e.code = a.type_code_value)
			else
			(select g.short_description from code_table_mlingual_translation g
			 where g.company_id = @i_client_id
			   and g.country_code = @i_country_code
			   and g.locale_id = 'ALL'
			   and g.code_type = 'INVOICETYPE'
			   and g.code = a.type_code_value)
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from category_type_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.link_type = 'IN'
		  and a.category_code_value = @i_search_field_1
		return
	end
	
	else if (@i_lov_code = 'INVOICESTATUS_LIST')
	begin 
		select '' as value_list,
			a.status_code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			case (select 1 from code_table_mlingual_translation f
				  where f.company_id = @i_client_id
				    and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = 'INVOICESTATUS'
					and f.code = a.status_code)
			when 1 then
			(select e.short_description from code_table_mlingual_translation e
			 where e.company_id = @i_client_id
			   and e.country_code = @i_country_code
			   and e.locale_id = @i_locale_id
			   and e.code_type = 'INVOICESTATUS'
			   and e.code = a.status_code)
			else
			(select g.short_description from code_table_mlingual_translation g
			 where g.company_id = @i_client_id
			   and g.country_code = @i_country_code
			   and g.locale_id = 'ALL'
			   and g.code_type = 'INVOICESTATUS'
			   and g.code = a.status_code)
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from workflow_status_master a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.transaction_type_code = 'INVOICE'
		  and a.request_category = @i_search_field_1
		return
	end
	
	else if  @i_lov_code = 'FUNCTIONAL_ROLE_LIST'
	begin
	
		select '' as value_list,
			functional_role_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			role_description as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from functional_role
        where company_id = @i_client_id
          and country_code  = @i_country_code
          
		return
	end
	
	else if  @i_lov_code = 'FUNCTIONAL_ROLE_EMPLOYEE_LIST'
	begin
	
		select '' as value_list,
			a.employee_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			b.title+' '+b.first_name+' '+ISNULL(b.middle_name,'')+' '+b.last_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from functional_role_employee a, employee b
        where a.company_id = @i_client_id
          and a.country_code  = @i_country_code
          and a.functional_role_id = @i_search_field_1
          and b.company_id = a.company_id
          and b.country_code = a.country_code
          and b.employee_id = a.employee_id
          
		return
	end
	
	else if @i_lov_code = 'NON_FUNCTIONAL_ROLE_EMPLOYEE_LIST'
	begin
		
		select '' as value_list,
			a.employee_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			a.title+' '+a.first_name+' '+ISNULL(a.middle_name,'')+' '+a.last_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from employee a
        where a.company_id = @i_client_id
          and a.country_code  = @i_country_code
          and a.employee_id not in (
									select b.employee_id from functional_role_employee b
									where b.company_id = @i_client_id
										and b.country_code = @i_country_code )
          
		return
	
	end
	
	else if @i_lov_code = 'USER_GROUP_LIST'
	begin
		declare @p_current_user_group_level tinyint, @p_current_user_group_id nvarchar(10)
		
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
			/* For super admin and client admins */
				
			select '' as value_list,
				user_group_id as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				user_group_name as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from user_group
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_group_level = 2
				
		end
		else
		begin
			select '' as value_list,
				user_group_id as o_value_field_1,
				'' as o_value_field_2,
				'' as o_value_field_3,
				user_group_name as o_description_field_1,
				'' as o_description_field_2,
				'' as o_description_field_3
			from user_group
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_group_level = 2
				and user_group_id != @p_current_user_group_id
		end 
	
		return
	end
	
	else if @i_lov_code = 'LOCALE_LIST'
	begin
		select '' as value_list,
			locale_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			locale_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from locale
		
		return
	end
	
	else if @i_lov_code = 'TIMEZONE_LIST'
	begin
		select '' as value_list,
			timezone_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			timezone_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from timezone
		
		return
	end
	
	else if @i_lov_code = 'NON_USER_EMPLOYEE_LIST'
	begin
		select '' as value_list,
			a.employee_id as o_value_field_1,
			a.location_code as o_value_field_2,
			'' as o_value_field_3,
			a.title + ' ' + a.first_name + ' ' + isnull(a.middle_name, '') + ' ' + a.last_name as o_description_field_1,
			c.address_line_1 + ' - ' + city as o_description_field_2,
			isnull(a.photo_reference, '') as o_description_field_3
		from employee a, company_location c
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.employee_id not in (select employee_id from users b
									where b.company_id = @i_client_id
										and b.country_code = @i_country_code)
			and a.company_id = c.company_id
			and a.country_code = c.country_code
			and a.location_code = c.location_code
		return	
	end
	
	else if @i_lov_code = 'SUPERVISOR_LIST'
	begin
		create table #supervisor_list
		(
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
			supervisor_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			supervisor_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from #supervisor_list
	end
	
	else if @i_lov_code = 'EMPLOYEETITLE_LIST'
	begin
		SELECT '' as value_list,
			a.code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
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
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'EMPTITLE'
		return
	end
		
	else if @i_lov_code = 'DEVICEPLATFORM_LIST'	
	begin
		SELECT '' as value_list,
			a.code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
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
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'DEVICEPLATFORM'
		
		return
	end
	
	else if @i_lov_code = 'DEVICEREG_EMPLOYEE_LIST'	
	begin
		select '' as value_list,
			a.employee_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			a.title + ' ' + a.first_name + ' ' + isnull(a.middle_name, '') + ' ' + a.last_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from employee a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.employee_id in (select distinct isnull(b.employee_id, '')
									from users b
									where b.company_id = a.company_id
										and b.country_code = a.country_code)
			 and a.employee_id not in (select distinct isnull(c.employee_id, '')
										from device_register c
										where c.company_id = @i_client_id
											and c.country_code = @i_country_code
										    and   c.company_id = a.company_id
											and c.country_code = a.country_code
											and c.app_id= @i_search_field_1)
			return
	end
 
	else if @i_lov_code = 'CALL_ASSIGNTO_LIST_FOR_REPORTINGTO'	
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
		
		return
	end
	
	else if @i_lov_code = 'EMPLOYEE_LIST'	
	begin
		select '' as value_list,
			employee_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			title + '.' + first_name + ' ' + ISNULL(middle_name,'') + ' ' + last_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from employee
		where company_id = @i_client_id
			and country_code = @i_country_code
			and employee_status = 'A'
	end
	
	else if  @i_lov_code = 'DATEDISPLAYFORMAT_LIST'
	begin
		select '' as value_list,
			a.code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'DTDISPFORMAT'
						and f.code = a.code
						)
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
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'DTDISPFORMAT'		    
		return
	end
	
	else if (@i_lov_code = 'CODETYPES_LIST')
	begin
		select '' as value_list,
			code_type as o_value_field_1,
			convert(varchar(10), code_value_max_allowed_size) as o_value_field_2,
			'' as o_value_field_3,
			isnull(description, '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3			
		from code_type_properties
		where company_id = @i_client_id
			and country_code = @i_country_code
			and system_or_user_definable = 'U'
		return
	end
	
	else if  @i_lov_code = 'CATEGORYTYPELINK_LIST'
	begin
		select '' as value_list,
			a.code as o_value_field_1,
			case(select a.code)
				when 'CC' then (select 'CALLCATG')
				when 'JC' then (select 'JOCATG')
				when 'FI' then (select 'FILECATG')
				when 'RC' then (select 'RESCATG')
				when 'EC' then (select 'EQUIPCATG')
			end as o_value_field_2,
			case(select a.code)
				when 'CC' then (select 'CALLTYPE')
				when 'JC' then (select 'JOTYPE')
				when 'FI' then (select 'FILETYPE')
				when 'RC' then (select 'RESCODE')
				when 'EC' then (select 'EQUIPTYPE')
			end as o_value_field_3,
			case (select 1 from code_table_mlingual_translation f
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
			end as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = 'CATGTYPELINK'
		return
	end
	
	else if  @i_lov_code = 'CATEGORYTYPECODE_LIST'
	begin
		select '' as value_list,
			a.code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			case (select 1 from code_table_mlingual_translation f
				where f.company_id = @i_client_id
					and f.country_code = @i_country_code
					and f.locale_id = @i_locale_id
					and f.code_type = @i_search_field_1
					and f.code = a.code)
			when 1 then
				(select e.short_description from code_table_mlingual_translation e
				where e.company_id = @i_client_id
					and e.country_code = @i_country_code
					and e.locale_id = @i_locale_id
					and e.code_type = @i_search_field_1
					and e.code = a.code)
			else
				(select g.short_description from code_table_mlingual_translation g
				where g.company_id = @i_client_id
					and g.country_code = @i_country_code
					and g.locale_id = 'ALL'
					and g.code_type = @i_search_field_1
					and g.code = a.code)
				end as o_description_field_1, 
			'' as o_description_field_2,
			'' as o_description_field_3 
		from code_table a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.code_type = @i_search_field_1
		return
	end
	
	else if  @i_lov_code = 'ITEMTYPE_LIST'
	begin
		select '' as value_list,
			a.code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'ITEMTYPE'
						and f.code = a.code
						)
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
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'ITEMTYPE'		    
		return
	end
	
	else if (@i_lov_code = 'WAREHOUSECODE_LIST')
	begin
		select '' as value_list,
			warehouse_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			warehouse_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3			
		from warehouse
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end
	
	else if  @i_lov_code = 'ITEMUOM_LIST'
	begin
		select '' as value_list,
			a.code as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'ITEMUOM'
						and f.code = a.code
						)
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
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'ITEMUOM'		    
		return
	end
	else if  @i_lov_code = 'QUOTATIONTOSTAGE'
	begin
		select distinct '' as value_list,
			a.to_workflow_stage as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			isnull((
				select x.description 
				from workflow_stage_master x
				where x.company_id = @i_client_id
					and x.country_code = @i_country_code
					and x.transaction_type_code = 'QUOTATION'
					and x.request_category = @i_search_field_1
					and x.workflow_stage_no = a.to_workflow_stage ), '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from workflow_status_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.transaction_type_code = 'QUOTATION'
			and a.request_category = @i_search_field_1
			and a.from_workflow_stage = @i_search_field_2
			and a.from_status = @i_search_field_3
			and cast(a.from_workflow_stage as varchar(1))+a.from_status+cast(a.to_workflow_stage as varchar(1))+a.to_status
			not in (
				select cast(b.from_workflow_stage as varchar(1))+b.from_status+cast(b.to_workflow_stage as varchar(1))+b.to_status
				from workflow_eventverb_list b
				where b.company_id = a.company_id
				  and b.country_code = a.country_code
				  and b.transaction_type_code = a.transaction_type_code
				  and b.request_category = a.request_category
			)
		return
	end
	
	else if  @i_lov_code = 'QUOTATIONTOSTATUS'
	begin
		select '' as value_list,
			a.to_status as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			isnull((select
					case(	
						select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'QUOTSTATUS'
							and f.code = b.code)			
					when 1 then(
						select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'QUOTSTATUS'
						and e.code = b.code)
					else(
						select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'QUOTSTATUS'
							and g.code = b.code)
					end
				from code_table b
				where b.company_id = @i_client_id
					and b.country_code = @i_country_code
					and b.code = a.to_status
					and b.code_type = 'QUOTSTATUS'), '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from workflow_status_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.transaction_type_code = 'QUOTATION'
		  and a.request_category = @i_search_field_1
		  and a.from_workflow_stage = @i_search_field_2
		  and a.from_status = @i_search_field_3
		  and a.to_workflow_stage = @i_search_field_4
		  and cast(a.from_workflow_stage as varchar(1))+a.from_status+cast(a.to_workflow_stage as varchar(1))+a.to_status
		      not in (
				select cast(b.from_workflow_stage as varchar(1))+b.from_status+cast(b.to_workflow_stage as varchar(1))+b.to_status
				from workflow_eventverb_list b
				where b.company_id = a.company_id
				  and b.country_code = a.country_code
				  and b.transaction_type_code = a.transaction_type_code
				  and b.request_category = a.request_category
			)
		return
			
	end
	
	else if @i_lov_code = 'CITY_LIST'
		begin
		select '' as value_list,
		city_code as o_value_field_1,
		'' as o_value_field_2,
		'' as o_value_field_3,
		city_name as o_description_field_1,
		'' as o_description_field_2,
		'' as o_description_field_3
		from city_master
		where country_code = @i_search_field_1
		and state_code = @i_search_field_2
		return
		end

		else if @i_lov_code = 'DISTRICT_LIST'
		begin
		select '' as value_list,
		district_code as o_value_field_1,
		'' as o_value_field_2,
		'' as o_value_field_3,
		district_name as o_description_field_1,
		'' as o_description_field_2,
		'' as o_description_field_3
		from district_master
		where country_code = @i_search_field_1
		and state_code = @i_search_field_2
		return
end
	
else if (@i_lov_code = 'ABS_FINANCIER_LIST')
	begin
		select '' as value_list,
			financier_id as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			financier_name as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from financier
		where company_id = @i_client_id
			and country_code = @i_country_code
		return
	end

else if  @i_lov_code = 'FLEETCATEGORY'
	begin
		select '' as value_list,
			isnull(a.code, '') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
				case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'FLEETCATG'
						and f.code = a.code
						)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'FLEETCATG'
				   and e.code = a.code)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'FLEETCATG'
				   and g.code = a.code)
				end
			as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
        from code_table a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.code_type = 'FLEETCATG'		    
		return
	end
	
	else if (@i_lov_code = 'FLEETTYPE')
	begin 
		select '' as value_list,
			a.type_code_value as o_value_field_1, /* unicode string */
			a.category_code_value as o_value_field_2, /* unicode string */
			'' as o_value_field_3, /* unicode string */
				isnull(case (select 1 from code_table_mlingual_translation f
					  where f.company_id = @i_client_id
					    and f.country_code = @i_country_code
						and f.locale_id = @i_locale_id
						and f.code_type = 'FLEETTYPE'
						and f.code = a.type_code_value
						)
				when 1 then
				(select e.short_description from code_table_mlingual_translation e
				 where e.company_id = @i_client_id
				   and e.country_code = @i_country_code
				   and e.locale_id = @i_locale_id
				   and e.code_type = 'FLEETTYPE'
				   and e.code = a.type_code_value)
				else
				(select g.short_description from code_table_mlingual_translation g
				 where g.company_id = @i_client_id
				   and g.country_code = @i_country_code
				   and g.locale_id = 'ALL'
				   and g.code_type = 'FLEETTYPE'
				   and g.code = a.type_code_value)
				end, '')

			as o_description_field_1, /* unicode string */
			'' as o_description_field_2, /* unicode string */
			'' as o_description_field_3 /* unicode string */
        from category_type_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.link_type = 'FL'
		  and a.category_code_value = @i_search_field_1 	
		  	  
		return
   end
	

	else if  @i_lov_code = 'SALESINVOICETOSTAGE'
	begin
		select distinct '' as value_list,
			a.to_workflow_stage as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			isnull((
				select x.description 
				from workflow_stage_master x
				where x.company_id = @i_client_id
					and x.country_code = @i_country_code
					and x.transaction_type_code = 'SALESINVOICE'
					and x.request_category = @i_search_field_1
					and x.workflow_stage_no = a.to_workflow_stage ), '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from workflow_status_link a
		where a.company_id = @i_client_id
			and a.country_code = @i_country_code
			and a.transaction_type_code = 'SALESINVOICE'
			and a.request_category = @i_search_field_1
			and a.from_workflow_stage = @i_search_field_2
			and a.from_status = @i_search_field_3
			and cast(a.from_workflow_stage as varchar(1))+a.from_status+cast(a.to_workflow_stage as varchar(1))+a.to_status
			not in (
				select cast(b.from_workflow_stage as varchar(1))+b.from_status+cast(b.to_workflow_stage as varchar(1))+b.to_status
				from workflow_eventverb_list b
				where b.company_id = a.company_id
				  and b.country_code = a.country_code
				  and b.transaction_type_code = a.transaction_type_code
				  and b.request_category = a.request_category
			)
		return
	end
	
	else if  @i_lov_code = 'SALESINVOICETOSTATUS'
	begin
		select '' as value_list,
			a.to_status as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			isnull((select
					case(	
						select 1 from code_table_mlingual_translation f
						where f.company_id = @i_client_id
							and f.country_code = @i_country_code
							and f.locale_id = @i_locale_id
							and f.code_type = 'SINVSTATUS'
							and f.code = b.code)			
					when 1 then(
						select e.short_description from code_table_mlingual_translation e
						where e.company_id = @i_client_id
						and e.country_code = @i_country_code
						and e.locale_id = @i_locale_id
						and e.code_type = 'SINVSTATUS'
						and e.code = b.code)
					else(
						select g.short_description from code_table_mlingual_translation g
						where g.company_id = @i_client_id
							and g.country_code = @i_country_code
							and g.locale_id = 'ALL'
							and g.code_type = 'SINVSTATUS'
							and g.code = b.code)
					end
				from code_table b
				where b.company_id = @i_client_id
					and b.country_code = @i_country_code
					and b.code = a.to_status
					and b.code_type = 'SINVSTATUS'), '') as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3
		from workflow_status_link a
		where a.company_id = @i_client_id
		  and a.country_code = @i_country_code
		  and a.transaction_type_code = 'SALESINVOICE'
		  and a.request_category = @i_search_field_1
		  and a.from_workflow_stage = @i_search_field_2
		  and a.from_status = @i_search_field_3
		  and a.to_workflow_stage = @i_search_field_4
		  and cast(a.from_workflow_stage as varchar(1))+a.from_status+cast(a.to_workflow_stage as varchar(1))+a.to_status
		      not in (
				select cast(b.from_workflow_stage as varchar(1))+b.from_status+cast(b.to_workflow_stage as varchar(1))+b.to_status
				from workflow_eventverb_list b
				where b.company_id = a.company_id
				  and b.country_code = a.country_code
				  and b.transaction_type_code = a.transaction_type_code
				  and b.request_category = a.request_category
			)
		return
			
	end
	

	else if (@i_lov_code = 'VALIDATE_DEALER_INDIRECT')
	begin
		select '' as value_list,
			isnull(convert(nvarchar(2),indirect_dealer_ind),'0') as o_value_field_1,
			'' as o_value_field_2,
			'' as o_value_field_3,
			'' as o_description_field_1,
			'' as o_description_field_2,
			'' as o_description_field_3			
		from dealer_master
		where company_id = @i_client_id
			and country_code = @i_country_code
			and dealer_id =  @i_search_field_1
		return
	end

    SET NOCOUNT OFF;
END



