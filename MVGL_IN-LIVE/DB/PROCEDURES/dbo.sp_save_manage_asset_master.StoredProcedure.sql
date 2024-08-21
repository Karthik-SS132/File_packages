DROP PROCEDURE IF EXISTS[dbo].[sp_save_manage_asset_master]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
 * Function to save asset master details
 */
CREATE procedure [dbo].[sp_save_manage_asset_master] 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_asset_id [uddt_asset_id], 
    @i_equipment_id [uddt_nvarchar_30], 
    @i_customer_id [uddt_customer_id], 
    @i_asset_location_code [uddt_nvarchar_50], 
    @i_locator_layout [uddt_nvarchar_30], 
    @i_installation_date [uddt_date], 
    @i_asset_status [uddt_varchar_2], 
    @i_org_level_no [uddt_tinyint], 
    @i_org_level_code [uddt_nvarchar_15], 
    @i_rec_tstamp [uddt_uid_timestamp], 
    @i_inputparam_udf_xml [uddt_nvarchar_max], 
    @i_save_mode [uddt_varchar_1], 
    @o_update_status [uddt_varchar_5] OUTPUT,
    @errorNo [errorno] OUTPUT
AS
BEGIN
    /*
     * Function to save asset master details
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

       -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
         @o_update_status = '' /* string */
         @errorNo = ''	/* string */
     */

    /*
     * List of errors associated to this stored procedure. Use the text of the error
     * messages printed below as a guidance to set appropriate error number to @errorNo inside the procedure.
     * E_UP_023 - Save Asset Details Failed
     * E_UP_005 - Update Failure : Record updated by another user. Please Retry the retrieval of the record and update.
     * 
     * Use the following SQL statement to set @errorNo:
     * SET @errorNo = 'One of the error numbers associated to this procedure as per list above'
     */

	declare @p_effective_from_date datetimeoffset(7), @p_effective_to_date datetimeoffset(7),
			@p_contract_duration int, @p_contract_duration_uom varchar(3),
			@p_contract_type nvarchar(20),  @p_inputparam_xml xml, 
			@p_default_currency_code varchar(3), @p_installation_date_avl_in_db datetimeoffset(7),
			@p_equipment_category varchar(20),@p_equipment_type varchar(20)
	
	
	set @p_inputparam_xml = CAST(@i_inputparam_udf_xml as XML)
	
 create table #input_params
 (paramname varchar(50) not null,
  paramval varchar(50) not null
  )
  
  insert #input_params
  (paramname, paramval)
  SELECT nodes.value('local-name(.)', 'varchar(50)'),
         nodes.value('(.)[1]', 'varchar(50)')
  FROM @p_inputparam_xml.nodes('/inputparam/*') AS Tbl(nodes)
 

	create table #applicable_custom_fields
	(
		field_type varchar(50) not null,
		applicable bit not null
	)
	
	insert #applicable_custom_fields
	(field_type, applicable)
	select field_type, applicable
	from product_customization_data_field_reference
	where company_id = @i_client_id
	  and country_code = @i_country_code
	  and information_type = 'ASSETMAST'

if (@i_save_mode = 'A')
begin

 if not exists (select 1 from asset_master 
           where company_id = @i_client_id
             and country_code = @i_country_code
             and asset_id = @i_asset_id)
 begin
    insert asset_master
    (
      company_id, country_code, asset_id, equipment_id,
      customer_id, asset_location_code, locator_layout, 
      installation_date, 
      asset_status, servicing_org_level_no, servicing_org_level_code,
      creation_date, created_by_emp_id,
      udf_char_1,udf_char_2,udf_char_3,udf_char_4,
	  udf_float_1, udf_float_2, udf_float_3, udf_float_4, udf_bit_1, udf_bit_2, udf_bit_3, udf_bit_4, 
	  udf_date_1, udf_date_2, udf_date_3, udf_date_4, 
	  udf_analysis_code1, udf_analysis_code2, udf_analysis_code3, udf_analysis_code4,			 
      last_update_id
    )
    select @i_client_id, @i_country_code, @i_asset_id, @i_equipment_id,
           @i_customer_id, @i_asset_location_code, @i_locator_layout,
           (case @i_installation_date 
            when '' then null
            else CONVERT(datetimeoffset,@i_installation_date+' 00:00:00',120)
            end),
			@i_asset_status, @i_org_level_no, @i_org_level_code,
			SYSDATETIMEOFFSET(), @i_user_id,
     case (select applicable from #applicable_custom_fields
							where field_type = 'udf_char_1')
			 when 1 then 	isnull( (select paramval from #input_params where paramname = 'udf_char_1') ,'')	
			 else NULL
			 end,
			 case (select applicable from #applicable_custom_fields
			  	   where field_type = 'udf_char_2')
			 when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_2') ,'')
			 else NULL
			 end,
			 case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_char_3')
			 when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_3') ,'')
			 else NULL
			 end,
			 case (select applicable from #applicable_custom_fields
				 where field_type = 'udf_char_4')
			 when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_4') ,'')
			 else NULL
			 end,
			 case (select applicable from #applicable_custom_fields
				 where field_type = 'udf_float_1')
			 when 1 then isnull( (select cast(paramval as float) from #input_params where paramname = 'udf_float_1') ,0)
			 else NULL
			 end,
			 case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_float_2')
			 when 1 then isnull( (select cast(paramval as float) from #input_params where paramname = 'udf_float_2') ,'')
			 else NULL
			 end,
			 case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_float_3')
			 when 1 then isnull( (select cast(paramval as float) from #input_params where paramname = 'udf_float_3') ,0)
			 else NULL
			 end,
			 case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_float_4')
			 when 1 then isnull( (select cast(paramval as float) from #input_params where paramname = 'udf_float_4') ,0)
			 else NULL
			 end,
			 case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_bit_1')
			 when 1 then isnull( (select cast(paramval as bit) from #input_params where paramname = 'udf_bit_1') ,0)
			 else NULL
			 end,
			 case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_bit_2')
			 when 1 then isnull( (select cast(paramval as bit) from #input_params where paramname = 'udf_bit_2') ,0)
			 else NULL
			 end,
			 case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_bit_3')
			 when 1 then isnull( (select cast(paramval as bit) from #input_params where paramname = 'udf_bit_3') ,0)
				else NULL
			 end,
			 case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_bit_4')
			 when 1 then isnull( (select cast(paramval as bit) from #input_params where paramname = 'udf_bit_4') ,0)
			 else NULL
			 end,
			 case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_date_1')
			 when 1 then 
				isnull( (select CONVERT(datetimeoffset,
				 (select x.paramval from #input_params x where x.paramname = 'udf_date_1')
				+' ' +
				 (select y.paramval from #input_params y where y.paramname = 'udf_date_1_hour')
				 + ':' + 
				 (select z.paramval from #input_params z where z.paramname = 'udf_date_1_minute')
				 +':00',120)), sysdatetimeoffset())
				else NULL
			 end,
			 case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_date_2')
				when 1 then 
				isnull( (select CONVERT(datetimeoffset,
				 (select x.paramval from #input_params x where x.paramname = 'udf_date_2')
				+' ' +
				 (select y.paramval from #input_params y where y.paramname = 'udf_date_2_hour')
				 + ':' + 
				 (select z.paramval from #input_params z where z.paramname = 'udf_date_2_minute')
				 +':00',120)), sysdatetimeoffset())
				else NULL
			   end,
			  case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_date_3')
				when 1 then
				isnull( (select CONVERT(datetimeoffset,
				 (select x.paramval from #input_params x where x.paramname = 'udf_date_3')
				+' ' +
				 (select y.paramval from #input_params y where y.paramname = 'udf_date_3_hour')
				 + ':' + 
				 (select z.paramval from #input_params z where z.paramname = 'udf_date_3_minute')
				 +':00',120)), sysdatetimeoffset())
				else NULL
			   end,
			  case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_date_4')
			  when 1 then 
				isnull( (select CONVERT(datetimeoffset,
				 (select x.paramval from #input_params x where x.paramname = 'udf_date_4')
				+' ' +
				 (select y.paramval from #input_params y where y.paramname = 'udf_date_4_hour')
				 + ':' + 
				 (select z.paramval from #input_params z where z.paramname = 'udf_date_4_minute')
				 +':00',120)), sysdatetimeoffset())
			  else NULL
			  end,
			  case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_analysis_code1')
			  when 1 then isnull( (select paramval from #input_params where paramname = 'udf_analysis_code1') ,'')
			  else NULL
			  end,
			  case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_analysis_code2')
			  when 1 then isnull( (select paramval from #input_params where paramname = 'udf_analysis_code2') ,'')
			  else NULL
			  end,
			  case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_analysis_code3')
			  when 1 then isnull( (select paramval from #input_params where paramname = 'udf_analysis_code3') ,'')
			  else NULL
			  end,
			  case (select applicable from #applicable_custom_fields
					 where field_type = 'udf_analysis_code4')
			  when 1 then isnull( (select paramval from #input_params where paramname = 'udf_analysis_code4') ,'')
			  else NULL
			  end,
			  @i_user_id
    
    if (@@ROWCOUNT != 0)
    begin
    
	/* 21.May.2018 - Chak - The below snippet is not applicable since we are allowing installation date change on UI.
	   For all assets , a schedule to be created and we should not check whether it is elapsed */

	   
      /*If installation date is provided, check if the initial warranty period has elapsed.
        if not elapsed, create the service schedule */
        
		if exists (select 1 from customer_location_contacts
					where company_id = @i_client_id
					and country_code = @i_country_code
					and customer_id = @i_customer_id
					and contact_category = 'OWNER'
					and contact_type = 'OWNER')
		begin


			select @p_equipment_category = equipment_category,
				@p_equipment_type = equipment_type
			from equipment
			where company_id = @i_client_id
				and country_code = @i_country_code
				and equipment_id = @i_equipment_id
										  

			insert customer_user_mapping_to_assets
			(
				company_id, 
				country_code, 
				customer_id,
				customer_location_code, 
				employee_id,
				equipment_category, 
				equipment_type, 
				equipment_id,
				asset_id, 
				last_update_id
			)
			select @i_client_id, 
				@i_country_code, 
				@i_customer_id,
				location_code, 
				ltrim(rtrim(SUBSTRING(contact_phone_no,CHARINDEX('-',contact_phone_no)+1,LEN(contact_phone_no)))) , 
				@p_equipment_category, 
				@p_equipment_type, 
				@i_equipment_id, 
				@i_asset_id, 
				@i_user_id
			from customer_location_contacts
					where company_id = @i_client_id
					and country_code = @i_country_code
					and customer_id = @i_customer_id
					and contact_category = 'OWNER'
					and contact_type = 'OWNER'

			if @@ROWCOUNT = 0
			begin
				set @errorNo = 'E_UP_023'
				return
			
			end

		end   
		
		
      if @i_installation_date != ''
      begin
      
        if not exists (select 1
            from equipment_service_contract_template
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and equipment_id = @i_equipment_id
			  and contract_type = 'IW' /* Add EW */
			  and datediff(dd,sysdatetime(),DATEADD(MM,contract_duration,
			  CONVERT(datetimeoffset,@i_installation_date+' 00:00:00',120))) >= 0 )
         begin

			set @o_update_status = 'SP001'
			return
			         
         end     
        
      end
       
	   

      /* Inherit service contract template from  equipment.  */
      
      if exists ( select 1 from equipment_service_contract_template
				  where company_id = @i_client_id
				    and country_code = @i_country_code
				    and equipment_id = @i_equipment_id)
	  begin
	  	
		select @p_contract_duration = contract_duration,
				@p_contract_duration_uom = contract_duration_uom,
				@p_contract_type = contract_type		
		from equipment_service_contract_template
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and equipment_id = @i_equipment_id
	        
		if (@i_installation_date != '')
		begin		
			select  @p_effective_from_date = CONVERT(datetimeoffset,@i_installation_date+' 00:00:00',120)
			  
			if @p_contract_duration_uom = 'M'
				select @p_effective_to_date = DATEADD(MM, @p_contract_duration, @p_effective_from_date) 
			else
				select @p_effective_to_date = DATEADD(MM, @p_contract_duration, @p_effective_from_date) 
		end
		else
		begin
			select @p_effective_from_date = null, @p_effective_to_date = null
		end
		
          /* Pick default currency code from company_loation for the user's location
             Note: To be revisited in future - Chak - 22.Oct.14*/
            
            if @i_user_id like @i_client_id+'admn' or @i_user_id = 'sadmn'
            begin
			
				select top(1) @p_default_currency_code = default_currency_code
				from company_location
				where company_id = @i_client_id
				  and country_code = @i_country_code
				
            end
            else
            begin
             
				select @p_default_currency_code = default_currency_code
				from company_location
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and location_code = (select b.location_code
									   from users a, employee b
									   where a.company_id = @i_client_id
										 and a.country_code = @i_country_code
										 and a.user_id = @i_user_id
										 and a.company_id = b.company_id
										 and a.country_code = b.country_code
										 and a.employee_id = b.employee_id)
		    end  
		    
			insert asset_service_contract
			(
			  company_id, country_code, asset_id,
			  contract_type,      contract_doc_no, description,
			  contract_duration, contract_duration_uom,
			  effective_from_date, effective_to_date,
			  parts_covered_ind, labor_covered_ind,
			  contract_status,
			  inherited_from_equipment_ind,
			  billable_nonbillable_ind, charges_currency_code,
			  charges_gross_amount, charges_discount_amount, charges_tax_amount,
			  charges_net_amount,
			  last_update_id
			)
			select @i_client_id, @i_country_code, @i_asset_id,
				   contract_type,  
				   (case contract_type
				    when 'IW' then 'INITIALWARRANTY'
				    when 'EW' then 'EXTENDEDWARRANTY'
				    end), 
				   (case contract_type
				    when 'IW' then 'Initial Warranty'
				    when 'EW' then 'Extended Warranty'
				    end),
				   contract_duration, 
				   contract_duration_uom,
				   @p_effective_from_date,
				   @p_effective_to_date,
				   parts_covered_ind, labor_covered_ind, 
				   'A',
				   1,
				   'NB',@p_default_currency_code, 0,0,0,0,
    			   @i_user_id
			from equipment_service_contract_template
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and equipment_id = @i_equipment_id
			      
			if (@@ROWCOUNT != 0)
			begin
  
			  if exists ( select 1  from equipment_service_schedule_params
      			where company_id = @i_client_id
      			  and country_code = @i_country_code
      			  and equipment_id = @i_equipment_id)
   			  begin
   			  
      			insert asset_service_schedule_params
      			(
      				company_id, country_code, asset_id, contract_doc_no, service_visit_slno,
      				param_code, uom_code, plan_incr_or_lclucl_ind,
      				plan_lcl_value, plan_ucl_value, plan_increment_value,
      				last_updatE_id
      			)
      			select  company_id, country_code, @i_asset_id, 
      				(case contract_type
				    when 'IW' then 'INITIALWARRANTY'
				    when 'EW' then 'EXTENDEDWARRANTY'
				    end),
				    service_visit_slno,
      				param_code, uom_code, incr_or_lclucl_ind,
      				lcl_value, ucl_value,increment_value,
      				last_updatE_id
      			from equipment_service_schedule_params
      			where company_id = @i_client_id
      			  and country_code = @i_country_code
      			  and equipment_id = @i_equipment_id
      							
				if @@ROWCOUNT = 0
				begin
					set @errorNo = 'E_UP_023'
					return
				end
			  end
				
				if exists ( select 1 from asset_service_contract
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and asset_id = @i_asset_id
						)
				begin
								
					execute sp_create_asset_service_schedule_basedon_contract @i_client_id, @i_country_code,
					 @i_user_id , @i_equipment_id, @i_asset_id, 'INITIALWARRANTY', 'NB', 
					@p_default_currency_code, 0, 0, 0, 0,	@o_update_status OUTPUT, @errorNo OUTPUT
					
					if @errorNo != ''
					begin
						set @errorNo = 'E_UP_023'
						return
					end
					
					if @i_installation_date != ''
					begin
					 /* Set the commisioning visit as completed */
					 
						update asset_service_schedule
						set service_visit_status = 'CO',
							service_due_date = CONVERT(datetimeoffset,@i_installation_date+' 00:00:00',120),
							act_service_date = CONVERT(datetimeoffset,@i_installation_date+' 00:00:00',120),
							last_update_id = @i_user_id
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and asset_id = @i_asset_id
						  and contract_doc_no = 'INITIALWARRANTY'
						  and service_visit_slno = 0
      							
						if @@ROWCOUNT = 0
						begin
							set @errorNo = 'E_UP_023'
							return
						end
					
						/* Recalculate the next visit dates */
						execute sp_update_asset_service_schedule_cascade_dates @i_client_id, @i_country_code, @i_user_id , 
								@i_asset_id, 'INITIALWARRANTY', 0,	@o_update_status OUTPUT, @errorNo OUTPUT
						
						if @errorNo != ''
						begin
							set @errorNo = 'E_UP_023'
							return
						end
		 
					end
				end
				
				set @o_update_status = 'SP001'
				
			end
			else
			begin
			  select @errorNo = 'E_UP_023'
			  return
			end
    
	  end   
      select @o_update_status = 'SP001'
    end
    else
    begin
      select @errorNo = 'E_UP_023'
      return
    end
 end
 else
 begin
    select @errorNo = 'E_UP_023'
    return
 end   
end
else if (@i_save_mode = 'U')
begin
 if exists (select 1 from asset_master 
           where company_id = @i_client_id
             and country_code = @i_country_code
             and asset_id = @i_asset_id)
 begin
 
		if exists ( select 1 from asset_master
           where company_id = @i_client_id
             and country_code = @i_country_code
             and asset_id = @i_asset_id
             and @i_rec_tstamp = cast(convert(uniqueidentifier,cast(last_update_timestamp as binary)) as varchar(36)))
        begin     

				select @p_installation_date_avl_in_db = installation_date
				from asset_master
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and asset_id = @i_asset_id
				   
				update asset_master
				set equipment_id = @i_equipment_id,
					customer_id = @i_customer_id,
					asset_location_code = @i_asset_location_code,
					locator_layout = @i_locator_layout,
					asset_status = @i_asset_status,
					servicing_org_level_no =  @i_org_level_no, 
					servicing_org_level_code =  @i_org_level_code,					
					installation_date = 
						( case @i_installation_date 
						  when '' then null
						  else CONVERT(datetimeoffset,@i_installation_date+' 00:00:00',120)
						  end),
					udf_char_1 = case (select applicable from #applicable_custom_fields
										where field_type = 'udf_char_1')
									when 1 then 	isnull( (select paramval from #input_params where paramname = 'udf_char_1') ,'')	
									else NULL
									end,
					udf_char_2 = case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_char_2')
							when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_2') ,'')
							else NULL
						   end,
					udf_char_3 =   case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_char_3')
							when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_3') ,'')
							else NULL
						   end,
					udf_char_4 =	   case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_char_4')
							when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_4') ,'')
							else NULL
						   end,
					udf_float_1=	   case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_float_1')
							when 1 then isnull( (select cast(paramval as float) from #input_params where paramname = 'udf_float_1') ,0)
							else NULL
						   end,
					udf_float_2=	   case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_float_2')
							when 1 then isnull( (select cast(paramval as float) from #input_params where paramname = 'udf_float_2') ,'')
							else NULL
						   end,
					udf_float_3=	   case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_float_3')
							when 1 then isnull( (select cast(paramval as float) from #input_params where paramname = 'udf_float_3') ,0)
							else NULL
						   end,
					udf_float_4 =  case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_float_4')
							when 1 then isnull( (select cast(paramval as float) from #input_params where paramname = 'udf_float_4') ,0)
							else NULL
						   end,
					udf_bit_1 = case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_bit_1')
							when 1 then isnull( (select cast(paramval as bit) from #input_params where paramname = 'udf_bit_1') ,0)
							else NULL
						   end,
					udf_bit_2 = case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_bit_2')
							when 1 then isnull( (select cast(paramval as bit) from #input_params where paramname = 'udf_bit_2') ,0)
							else NULL
						   end,
					udf_bit_3= case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_bit_3')
							when 1 then isnull( (select cast(paramval as bit) from #input_params where paramname = 'udf_bit_3') ,0)
							else NULL
						   end,
					udf_bit_4= case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_bit_4')
							when 1 then isnull( (select cast(paramval as bit) from #input_params where paramname = 'udf_bit_4') ,0)
							else NULL
						   end,
					udf_date_1=	   case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_date_1')
							when 1 then 
							isnull( (select CONVERT(datetimeoffset,
							 (select x.paramval from #input_params x where x.paramname = 'udf_date_1')
							+' ' +
							 (select y.paramval from #input_params y where y.paramname = 'udf_date_1_hour')
							 + ':' + 
							 (select z.paramval from #input_params z where z.paramname = 'udf_date_1_minute')
							 +':00',120)), sysdatetimeoffset())
							else NULL
						   end,
					udf_date_2 = case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_date_2')
							when 1 then 
							isnull( (select CONVERT(datetimeoffset,
							 (select x.paramval from #input_params x where x.paramname = 'udf_date_2')
							+' ' +
							 (select y.paramval from #input_params y where y.paramname = 'udf_date_2_hour')
							 + ':' + 
							 (select z.paramval from #input_params z where z.paramname = 'udf_date_2_minute')
							 +':00',120)), sysdatetimeoffset())
							else NULL
						   end,
					udf_date_3 = case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_date_3')
							when 1 then
							isnull( (select CONVERT(datetimeoffset,
							 (select x.paramval from #input_params x where x.paramname = 'udf_date_3')
							+' ' +
							 (select y.paramval from #input_params y where y.paramname = 'udf_date_3_hour')
							 + ':' + 
							 (select z.paramval from #input_params z where z.paramname = 'udf_date_3_minute')
							 +':00',120)), sysdatetimeoffset())
							else NULL
						   end,
					udf_date_4 = case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_date_4')
							when 1 then 
							isnull( (select CONVERT(datetimeoffset,
							 (select x.paramval from #input_params x where x.paramname = 'udf_date_4')
							+' ' +
							 (select y.paramval from #input_params y where y.paramname = 'udf_date_4_hour')
							 + ':' + 
							 (select z.paramval from #input_params z where z.paramname = 'udf_date_4_minute')
							 +':00',120)), sysdatetimeoffset())
								else NULL
						   end,
					udf_analysis_code1 = case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_analysis_code1')
							when 1 then isnull( (select paramval from #input_params where paramname = 'udf_analysis_code1') ,'')
							else NULL
						   end,
					udf_analysis_code2 = case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_analysis_code2')
							when 1 then isnull( (select paramval from #input_params where paramname = 'udf_analysis_code2') ,'')
							else NULL
						   end,
					udf_analysis_code3 = case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_analysis_code3')
							when 1 then isnull( (select paramval from #input_params where paramname = 'udf_analysis_code3') ,'')
							else NULL
						   end,
					udf_analysis_code4 = case (select applicable from #applicable_custom_fields
								 where field_type = 'udf_analysis_code4')
							when 1 then isnull( (select paramval from #input_params where paramname = 'udf_analysis_code4') ,'')
							else NULL
						   end,
					last_update_id=@i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and asset_id = @i_asset_id
      
			if (@@ROWCOUNT = 0)
			begin
				  select @errorNo = 'E_UP_023'
				  return
			end

			/* Update the service schedule incase installation date is provided.
			   This logic is applicable only for Initialwarrant contract. For others, the installation
			   date is compulsory when asset is created first time */			
			
			if @p_installation_date_avl_in_db is null and @i_installation_date != ''
			begin			

			 if exists ( select 1 from asset_service_contract
							 where company_id = @i_client_id
							   and country_code = @i_country_code
							   and asset_id = @i_asset_id
							   and contract_type = 'IW' )
			 begin				   

				select @p_contract_duration = contract_duration,
						@p_contract_duration_uom = contract_duration_uom,
						@p_contract_type = contract_type		
				from asset_service_contract
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and asset_id = @i_asset_id
			      and contract_type = 'IW'
			  		
				select  @p_effective_from_date = CONVERT(datetimeoffset,@i_installation_date+' 00:00:00',120)
				  
				if @p_contract_duration_uom = 'M'
					select @p_effective_to_date = DATEADD(MM, @p_contract_duration, @p_effective_from_date) 
				else
					select @p_effective_to_date = DATEADD(MM, @p_contract_duration, @p_effective_from_date) 

				update asset_service_contract
				set effective_from_date = @p_effective_from_date,
					effective_to_date = @p_effective_to_date
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and asset_id = @i_asset_id
			      and contract_type = 'IW'  		

				/* Set the visit schedule service due dates */
					 
					update asset_service_schedule
					set service_visit_status = 'CO',
						service_due_date = CONVERT(datetimeoffset,@i_installation_date+' 00:00:00',120),
						act_service_date = CONVERT(datetimeoffset,@i_installation_date+' 00:00:00',120),
						last_update_id = @i_user_id
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and asset_id = @i_asset_id
					  and contract_doc_no = 'INITIALWARRANTY'
					  and service_visit_slno = 0
  							
					if @@ROWCOUNT = 0
					begin
						set @errorNo = 'E_UP_023'
						return
					end
				
					/* Recalculate the next visit dates */
					execute sp_update_asset_service_schedule_cascade_dates @i_client_id, @i_country_code, @i_user_id , 
							@i_asset_id, 'INITIALWARRANTY', 0,	@o_update_status OUTPUT, @errorNo OUTPUT
					
					if @errorNo != ''
					begin
						set @errorNo = 'E_UP_023'
						return
					end
			  
			  end
			  else
			  begin
			  	
				select @p_contract_duration = contract_duration,
						@p_contract_duration_uom = contract_duration_uom,
						@p_contract_type = contract_type		
				from equipment_service_contract_template
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and equipment_id = @i_equipment_id
			        
					select  @p_effective_from_date = CONVERT(datetimeoffset,@i_installation_date+' 00:00:00',120)
					  
					if @p_contract_duration_uom = 'M'
						select @p_effective_to_date = DATEADD(MM, @p_contract_duration, @p_effective_from_date) 
					else
						select @p_effective_to_date = DATEADD(MM, @p_contract_duration, @p_effective_from_date) 

				/* If the machine is in warranty, schedule need to be created */
				
				/* Allow 2 months of grace period */
				
				if DATEDIFF(dd, SYSDATETIMEOFFSET(), dateadd(mm,2,@p_effective_to_date)) >= 0
				begin
				
					/** Begin Hardcoding **/
				  /*26.Apr.18 - Chak
				     If user is oem se coordinator, allow changing of the installation date for 
					 a period of time - To be disabled by Jun end
					  */				
					if ( select user_group_id from users
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and user_id = @i_user_id) = 'SCOORD-OEM'
					begin

						if exists ( select 1 from asset_service_schedule_params
									where company_id = @i_client_id
									  and country_code = @i_country_code
									  and asset_id = @i_asset_id
									  /* To check per contract type - Pending Chak 26.Apr.18 */
									  )
						begin
								delete asset_service_schedule_params
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and asset_id = @i_asset_id

								  if @@ROWCOUNT = 0
									begin
										set @errorNo = 'E_UP_023'
										return
									end
						end
						if exists ( select 1 from asset_service_schedule
									where company_id = @i_client_id
									  and country_code = @i_country_code
									  and asset_id = @i_asset_id
									  /* To check per contract type - Pending Chak 26.Apr.18 */
									  )
						begin
								delete asset_service_schedule
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and asset_id = @i_asset_id

								  if @@ROWCOUNT = 0
									begin
										set @errorNo = 'E_UP_023'
										return
									end
						end
						if exists ( select 1 from asset_service_contract
									where company_id = @i_client_id
									  and country_code = @i_country_code
									  and asset_id = @i_asset_id
									  /* To check per contract type - Pending Chak 26.Apr.18 */
									  )
						begin
								delete asset_service_contract
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and asset_id = @i_asset_id

								  if @@ROWCOUNT = 0
									begin
										set @errorNo = 'E_UP_023'
										return
									end
						end

						/* Pending - 26.April.2018 - Chak To remove from asset_service_partstobereplaced*/

					end
					/***** End Hardcoding for CT - Chak 26.Apr.18**/

				  /* Pick default currency code from company_loation for the user's location
					 Note: To be revisited in future - Chak - 22.Oct.14*/
		            
					if @i_user_id like @i_client_id+'admn' or @i_user_id = 'sadmn'
					begin
					
						select top(1) @p_default_currency_code = default_currency_code
						from company_location
						where company_id = @i_client_id
						  and country_code = @i_country_code
						
					end
					else
					begin
		             
						select @p_default_currency_code = default_currency_code
						from company_location
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and location_code = (select b.location_code
											   from users a, employee b
											   where a.company_id = @i_client_id
												 and a.country_code = @i_country_code
												 and a.user_id = @i_user_id
												 and a.company_id = b.company_id
												 and a.country_code = b.country_code
												 and a.employee_id = b.employee_id)
					end  
				    
					insert asset_service_contract
					(
					  company_id, country_code, asset_id,
					  contract_type,      contract_doc_no, description,
					  contract_duration, contract_duration_uom,
					  effective_from_date, effective_to_date,
					  parts_covered_ind, labor_covered_ind,
					  contract_status,
					  inherited_from_equipment_ind,
					  billable_nonbillable_ind, charges_currency_code,
					  charges_gross_amount, charges_discount_amount, charges_tax_amount,
					  charges_net_amount,
					  last_update_id
					)
					select @i_client_id, @i_country_code, @i_asset_id,
						   contract_type,  
						   (case contract_type
							when 'IW' then 'INITIALWARRANTY'
							when 'EW' then 'EXTENDEDWARRANTY'
							end), 
						   (case contract_type
							when 'IW' then 'Initial Warranty'
							when 'EW' then 'Extended Warranty'
							end),
						   contract_duration, 
						   contract_duration_uom,
						   @p_effective_from_date,
						   @p_effective_to_date,
						   parts_covered_ind, labor_covered_ind, 
						   'A',
						   1,
						   'NB',@p_default_currency_code, 0,0,0,0,
    					   @i_user_id
					from equipment_service_contract_template
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and equipment_id = @i_equipment_id
					      
					if (@@ROWCOUNT != 0)
					begin
		  
					  if exists ( select 1  from equipment_service_schedule_params
      					where company_id = @i_client_id
      					  and country_code = @i_country_code
      					  and equipment_id = @i_equipment_id)
   					  begin
		   			  
      						insert asset_service_schedule_params
      						(
      							company_id, country_code, asset_id, contract_doc_no, service_visit_slno,
      							param_code, uom_code, plan_incr_or_lclucl_ind,
      							plan_lcl_value, plan_ucl_value, plan_increment_value,
      							last_updatE_id
      						)
      						select  company_id, country_code, @i_asset_id, 
      							(case contract_type
								when 'IW' then 'INITIALWARRANTY'
								when 'EW' then 'EXTENDEDWARRANTY'
								end),
								service_visit_slno,
      							param_code, uom_code, incr_or_lclucl_ind,
      							lcl_value, ucl_value,increment_value,
      							last_updatE_id
      						from equipment_service_schedule_params
      						where company_id = @i_client_id
      						  and country_code = @i_country_code
      						  and equipment_id = @i_equipment_id
			      							
							if @@ROWCOUNT = 0
							begin
								set @errorNo = 'E_UP_023'
								return
							end
						end
										
							execute sp_create_asset_service_schedule_basedon_contract @i_client_id, @i_country_code,
							 @i_user_id , @i_equipment_id, @i_asset_id, 'INITIALWARRANTY', 'NB', 
							@p_default_currency_code, 0, 0, 0, 0,	@o_update_status OUTPUT, @errorNo OUTPUT
							
							if @errorNo != ''
							begin
								set @errorNo = 'E_UP_023'
								return
							end
						
				/* Set the visit schedule service due dates */
					 
					update asset_service_schedule
					set service_visit_status = 'CO',
						service_due_date = CONVERT(datetimeoffset,@i_installation_date+' 00:00:00',120),
						act_service_date = CONVERT(datetimeoffset,@i_installation_date+' 00:00:00',120),
						last_update_id = @i_user_id
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and asset_id = @i_asset_id
					  and contract_doc_no = 'INITIALWARRANTY'
					  and service_visit_slno = 0
  							
					if @@ROWCOUNT = 0
					begin
						set @errorNo = 'E_UP_023'
						return
					end
				
					/* Recalculate the next visit dates */
					execute sp_update_asset_service_schedule_cascade_dates @i_client_id, @i_country_code, @i_user_id , 
							@i_asset_id, 'INITIALWARRANTY', 0,	@o_update_status OUTPUT, @errorNo OUTPUT
					
					if @errorNo != ''
					begin
						set @errorNo = 'E_UP_023'
						return
					end

					/* 21.May.18 - Chak
						Set all call register records created during the contract period to in-warranty. 
						This has ben done for CT. The same logic can be applicable to all clients */

					if exists ( select 1 from call_Register 
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and asset_id = @i_asset_id)
					begin

						update call_register
						set asset_in_warranty_ind = 1
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and asset_id = @i_asset_id
						  and created_on_date between @p_effective_from_date and @p_effective_to_date

						if @@ROWCOUNT = 0
						begin
							set @errorNo = 'E_UP_023'
							return
						end
					end

					/** 21.May.18 Chak **/

				end /* if @@ROWCOUNT != 0 */
			
			  end /*if DATEDIFF(dd, SYSDATETIMEOFFSET(), @p_effective_to_date) >= 0 */
			 
			 end /* if not exists in asset_service_contract */
			 
			end /*if @p_installation_date_avl_in_db is null and @i_installation_date != '' */

			select @errorNo = '', @o_update_status = 'SP001'

	end
	else /* if no-match of record timestamp */
		set @errorNo = 'E_UP_005'
 end
 else
    select @errorNo = 'E_UP_023'
  
  
end
    SET NOCOUNT OFF;
END
GO
