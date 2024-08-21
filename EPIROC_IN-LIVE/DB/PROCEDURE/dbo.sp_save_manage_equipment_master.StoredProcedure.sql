DROP PROCEDURE [dbo].[sp_save_manage_equipment_master]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
* Function to save equipment master details
*/
CREATE PROCEDURE [dbo].[sp_save_manage_equipment_master] 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_equipment_id [uddt_nvarchar_30], 
    @i_description [uddt_nvarchar_100], 
    @i_org_level_no [uddt_tinyint], 
    @i_org_level_code [uddt_nvarchar_15], 
    @i_equipment_category [uddt_nvarchar_15], 
    @i_equipment_type [uddt_nvarchar_15], 
    @i_inputparam_udf_xml [uddt_nvarchar_max], 
    @i_rec_tstamp [uddt_uid_timestamp], 
    @i_save_mode [uddt_varchar_1], 
    @o_update_status [uddt_varchar_5] OUTPUT,
    @errorNo [errorno] OUTPUT
AS
BEGIN
    /*
     * Function to save equipment master details
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
     * E_UP_026 - Save equipment master failed
     * E_UP_005 - Update Failure : Record updated by another user. Please Retry the retrieval of the record and update.
     * 
     * Use the following SQL statement to set @errorNo:
     * SET @errorNo = 'One of the error numbers associated to this procedure as per list above'
     */

	declare @p_previous_org_level_no tinyint, @p_previous_org_level_code nvarchar(15),
	 @p_inputparam_xml xml
	
	
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
		  and information_type = 'EQUIPMAST'

if (@i_save_mode = 'A')
begin

 if not exists (select 1 from equipment 
           where company_id = @i_client_id
             and country_code = @i_country_code
             and equipment_id = @i_equipment_id)
 begin

		
	insert equipment
    (
      company_id, country_code, equipment_id,
      description, 
      servicing_org_level_no, servicing_org_level_code,
      equipment_category, equipment_type,
      udf_char_1, udf_char_2, udf_char_3, udf_char_4,
      udf_float_1,udf_float_2, udf_float_3, udf_float_4,
      udf_bit_1, udf_bit_2, udf_bit_3, udf_bit_4,
      udf_date_1, udf_date_2, udf_date_3, udf_date_4,
      udf_analysis_code1, udf_analysis_code2, udf_analysis_code3, udf_analysis_code4,equipment_oem,
      last_update_id
    )
    select @i_client_id, @i_country_code, @i_equipment_id,
           @i_description, 
		   @i_org_level_no, @i_org_level_code,
		   @i_equipment_category, @i_equipment_type,
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
			  end,'epiroc',
			  @i_user_id
    
    if (@@ROWCOUNT = 0)
    begin
      select @errorNo = 'E_UP_026'
	  return
	end
	
	/* Copy Equipment group parameters */
	
	if exists ( select 1 from equipment_group_serviceparams_template_header
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and equipment_category = @i_equipment_category
				  and equipment_type = @i_equipment_type
			   )
	begin
	
		insert equipment_service_contract_template
		(
			company_id, country_code, equipment_id, contract_type, 
			contract_duration, contract_duration_uom,
			parts_covered_ind, labor_covered_ind,
			noof_visits, servicing_org_level_no, servicing_org_level_code,
			last_update_id
		)
		select 	company_id, country_code, @i_equipment_id, contract_type, 
			 contract_duration, contract_duration_uom,
			parts_covered_ind, labor_covered_ind,
			noof_visits, servicing_org_level_no, servicing_org_level_code,
			last_update_id
		from equipment_group_serviceparams_template_header
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and equipment_category = @i_equipment_category
		  and equipment_type = @i_equipment_type
		  
		if @@ROWCOUNT = 0
		begin
		  select @errorNo = 'E_UP_026'
		  return
		end

		insert equipment_service_contract_template_schedule
		(
			company_id, country_code, equipment_id, contract_type, service_visit_slno,
			visit_report_template_id, 
			visit_frequency_uom, visit_frequency_value, 
			visit_frequency_mprofile_template_id, last_update_id 
		)
		select	company_id, country_code, @i_equipment_id, contract_type, service_visit_slno,
			@i_equipment_category+'-'+@i_equipment_type+'-'+cast(service_visit_slno as varchar(2)), 
			visit_frequency_uom, visit_frequency_value, 
			visit_frequency_mprofile_template_id, last_update_id  
		from equipment_group_serviceparams_template_detail
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and equipment_category = @i_equipment_category
		  and equipment_type = @i_equipment_type

		if @@ROWCOUNT = 0
		begin
		  select @errorNo = 'E_UP_026'
		  return
		end
		
		if exists ( select 1 from equipment_group_parameter_master
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and equipment_category = @i_equipment_category
					  and equipment_type = @i_equipment_type )
		begin
		
			insert equipment_service_schedule_params
			(
				company_id, country_code, equipment_id, 
				contract_type, service_visit_slno, 
				param_code, uom_code,
				incr_or_lclucl_ind, lcl_value, ucl_value,
				increment_value, last_update_id
			)
			select 	company_id, country_code, @i_equipment_id, 
				contract_type, service_visit_slno,
				param_code, uom_code,
				incr_or_lclucl_ind, lcl_value, ucl_value,
				increment_value, last_update_id
			from equipment_group_parameter_master
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and equipment_category = @i_equipment_category
			  and equipment_type = @i_equipment_type

			if @@ROWCOUNT = 0
			begin
			  select @errorNo = 'E_UP_026'
			  return
			end
		end
				
	end
	
	select @o_update_status = 'SP001'
    
 end
 else
    select @errorNo = 'E_UP_026'
    
end
else if (@i_save_mode = 'U')
begin


 if exists (select 1 from equipment 
           where company_id = @i_client_id
             and country_code = @i_country_code
             and equipment_id = @i_equipment_id)
 begin
 
     if exists ( select 1 from equipment
           where company_id = @i_client_id
             and country_code = @i_country_code
             and equipment_id = @i_equipment_id
             and @i_rec_tstamp = cast(convert(uniqueidentifier,cast(last_update_timestamp as binary)) as varchar(36)))
     begin     

		select @p_previous_org_level_no = servicing_org_level_no,
				@p_previous_org_level_code = servicing_org_level_code
		from equipment
		where company_id = @i_client_id
          and country_code = @i_country_code
          and equipment_id = @i_equipment_id
        
		update equipment
		set description = @i_description,
			servicing_org_level_no = @i_org_level_no,
			servicing_org_level_code = @i_org_level_code,
			equipment_category = @i_equipment_category,
			equipment_type = @i_equipment_type,
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
        last_update_id = @i_user_id
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and equipment_id = @i_equipment_id
      
		/* 1.Sep.15 - Chak - Pending - check service parames and apply */
    
		if (@@ROWCOUNT != 0)
		begin
			if cast(@p_previous_org_level_no as varchar(1))+@p_previous_org_level_code != 
				CAST(@i_org_level_no as varchar(1))+@i_org_level_code
			begin

			  if exists ( select 1 from call_register
						  where company_id = @i_client_id
						    and country_code = @i_country_code
						    and equipment_id = @i_equipment_id
						 )
			   begin
			   
				update call_register
				set organogram_level_no = @i_org_level_no,
					organogram_level_code = @i_org_level_code
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and equipment_id = @i_equipment_id
				  
				  if @@ROWCOUNT = 0
				  begin
					select @errorNo = 'E_UP_026'
					return
				  end
			    end
			end
			select @o_update_status = 'SP001'
		end
		else
		begin
		  select @errorNo = 'E_UP_026'
		  return
		end
		end
    else
    begin
		set @errorNo = 'E_UP_005'
		return
	end
 end
 else
 begin
    select @errorNo = 'E_UP_026'
    return
 end 
end


SET NOCOUNT ON
END
GO
