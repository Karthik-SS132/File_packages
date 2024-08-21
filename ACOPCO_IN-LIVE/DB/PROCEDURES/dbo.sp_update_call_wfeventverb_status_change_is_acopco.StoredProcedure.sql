DROP PROCEDURE IF EXISTS [dbo].[sp_update_call_wfeventverb_status_change_is_acopco]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


/*
 * Function to save call status change for predefined workflow events.
 */
CREATE PROCEDURE [dbo].[sp_update_call_wfeventverb_status_change_is_acopco]
    @i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id], 
    @i_call_ref_no [uddt_nvarchar_20], 
    @i_channel_id [uddt_varchar_20], 
    @i_wfeventverb_id [uddt_varchar_60], 
    @i_event_date [uddt_date], 
    @i_event_hour [uddt_hour], 
    @i_event_minute [uddt_minute], 
    @i_from_wf_stage_no [uddt_tinyint], 
    @i_to_wf_stage_no [uddt_tinyint], 
    @i_from_wf_status [uddt_varchar_2], 
    @i_to_wf_status [uddt_varchar_2], 
    @i_by_employee_id [uddt_employee_id],
    @i_to_employee_id_string [uddt_nvarchar_255], 
    @i_reason_code [uddt_nvarchar_50], 
    @i_comments [uddt_nvarchar_1000], 
    @i_lattitude_value [uddt_varchar_10], 
    @i_longitude_value [uddt_varchar_10], 
    @i_inputparam_xml1 [uddt_nvarchar_max], 
    @i_inputparam_xml2 [uddt_nvarchar_max], 
    @i_inputparam_xml3 [uddt_nvarchar_max], 
    @i_attachment_xml [uddt_nvarchar_max], 
    @i_rec_tstamp [uddt_uid_timestamp], 
    @i_save_mode [uddt_varchar_1], 
    @o_childproc_execution_status [uddt_varchar_10] OUTPUT,
    @o_childproc_execution_error_message [uddt_nvarchar_200] OUTPUT
AS
BEGIN
    /*
     * Function to save call status change for predefined workflow events.
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
     
     
 create table #input_params
 (paramname varchar(50) not null,
  paramval nvarchar(max) null
  )
     */

    /*
     * List of errors associated to this stored procedure. Use the text of the error
     * messages printed below as a guidance to set appropriate error number to @errorNo inside the procedure.
     * E_UP_005 - Update Failure : Record updated by another user. Please Retry the retrieval of the record and update.
     * E_UP_089 - Failed to make status change
     * 
     * Use the following SQL statement to set @errorNo:
     * SET @errorNo = 'One of the error numbers associated to this procedure as per list above'
     */
     
         declare @p_assigned_to_user_id nvarchar(12),
			@p_from_wf_status varchar(3),
			@p_to_wf_status varchar(3),
			@p_by_employee_id nvarchar(12),
			@p_from_wf_stage_no varchar(3), @p_to_wf_stage_no varchar(3),
			@p_attachment_xml xml, @p_event_id int,
			@p_event_date datetimeoffset(7),
			@p_current_wf_stage_no tinyint,
			@p_current_wf_status varchar(2),
			@p_doc_handle int,
			@p_current_datetime datetimeoffset(7),
			@p_current_datetime_string varchar(20)
		    
		declare @p_request_category varchar(10),
			@p_request_type nvarchar(10),
			@p_organogram_level_no tinyint,
			@p_organogram_level_code nvarchar(15),
			@p_company_location_code nvarchar(8),
			@p_notification_event_code_1 nvarchar(60),
			@p_notification_event_code_2 nvarchar(60),
			@p_notification_event_code_3 nvarchar(60),
			@p_notification_event_code_4 nvarchar(60),
			@p_notification_event_code_5 nvarchar(60),
			@p_product_code_string nvarchar(600), 
			@p_product_code nvarchar(30),
			@p_attachment_filegen_id int,
			@p_attachment_file_id nvarchar(20),
			@p_closure_report_ind bit	,
			@p_attachment_file_extn varchar(3),
			@p_attachment_file_path nvarchar(30)		
		
		declare @p_prev_sch_start_date datetimeoffset(7),
				@p_prev_sch_finish_date datetimeoffset(7),
				@p_attachment_file_category varchar(2),
				@p_attachment_file_type varchar(2)
			
		declare @p_online_offline_ind varchar(1)
		
		declare  @p_call_logged_for_district_code nvarchar(10),
				 @p_call_logged_for_state_code nvarchar(20),
				 @p_dealer_id nvarchar(20),
	 			 @p_equipment_category nvarchar(15),
				 @p_equipment_type nvarchar(15),
				 @p_call_mapped_to_emp_id nvarchar(12),
				 @p_call_mapped_to_func_role nvarchar(30)		

		declare @p_asset_id nvarchar(30),
				@p_act_finish_date datetimeoffset(7),
				@p_contract_doc_no nvarchar(40),
				@p_call_category varchar(10),
				@p_contract_type nvarchar(20),
				@p_update_status varchar(10),
				@p_service_visit_slno tinyint,
				@p_errorNo varchar(10)
	
	/* 5.Mar.15 - Pending validations for each status change eg. finish date being mandatory for finish verb */

	
 create table #attachment_list
 (
  file_category varchar(2) null,
  file_type varchar(2) null,
  file_name nvarchar(60) null,
  closure_report_ind bit null  
  )

	set @p_current_datetime = SYSDATETIMEOFFSET()
	  
  if @i_attachment_xml = '' set @i_attachment_xml = '<attachment_xml></attachment_xml>'
  
  EXEC sp_xml_preparedocument @p_doc_handle OUTPUT, @i_attachment_xml;

  insert #attachment_list
  (file_category, file_type, file_name, closure_report_ind)
  SELECT file_category, file_type, FILE_NAME, closure_report_indicator
  FROM OPENXML (@p_doc_handle, '/attachment_xml/attachment',2)
  WITH (file_category  varchar(2),
        file_type varchar(2),
        file_name nvarchar(60),
        closure_report_indicator varchar(1));

 update #input_params
 set paramval = null 
 where paramval = 'ALL'
   or paramval = ''

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
	  and information_type = 'CALL_REGISTER'

	select @p_online_offline_ind = paramval 
	from #input_params
	where paramname = 'online_offline_ind'
	
	/* If updated via sms channe, the p_by_employee id will be blank - pending*/
			 	
	select @p_request_category = call_category,
			@p_request_type = call_type,
			@p_current_wf_stage_no = call_wf_stage_no,
			@p_current_wf_status = call_status,
			@p_organogram_level_no = organogram_level_no,
			@p_organogram_level_code = organogram_level_code,
			@p_company_location_code = company_location_code		
	from call_register
	where company_id = @i_client_id
	  and country_code = @i_country_code
	  and call_ref_no = @i_call_ref_no
    
    if @i_wfeventverb_id != 'STATUSCHANGE'
    
		select  @p_from_wf_stage_no = from_workflow_stage,
				@p_from_wf_status =  from_status,
				@p_to_wf_stage_no = to_workflow_stage,
				@p_to_wf_status =   to_status 
		from workflow_eventverb_list
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and transaction_type_code  = 'CALL'
		  and request_category = @p_request_category
		  and request_type in ('ALL', @p_request_type)
		  and eventverb_id = @i_wfeventverb_id
		  and from_workflow_stage = @p_current_wf_stage_no
		  and from_status = @p_current_wf_status
		  
	else /* STATUSCHANGE */
		select  @p_from_wf_stage_no = from_workflow_stage,
				@p_from_wf_status =  from_status,
				@p_to_wf_stage_no = to_workflow_stage,
				@p_to_wf_status =   to_status 
		from workflow_status_link
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and transaction_type_code  = 'CALL'
		  and request_category = @p_request_category
		  and request_type in ('ALL', @p_request_type)
		  and from_workflow_stage = @i_from_wf_stage_no 
		  and from_status = @i_from_wf_status
		  and to_workflow_stage = @i_to_wf_stage_no
		  and to_status = @i_to_wf_status
				   
		/* Check validity of the call*/
		
		if not exists ( select 1 from call_register
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and call_ref_no = @i_call_ref_no
						  and call_wf_stage_no = @i_from_wf_stage_no
						  and call_status = @i_from_wf_status)
		begin
 			select @o_childproc_execution_status = 'FAILURE',
 				   @o_childproc_execution_error_message = 'Invalid SR No'
			return
		end    
		
		/* Validate Event Verb 
		*/
		 if @i_wfeventverb_id != 'STATUSCHANGE' 
		    and not exists ( select 1 from workflow_eventverb_list
				 where company_id = @i_client_id
				   and country_code = @i_country_code
				   and transaction_type_code  = 'CALL'
				   and request_category = @p_request_category
				   and request_type in ('ALL', @p_request_type)
				   and from_workflow_stage = @p_from_wf_stage_no 
				   and from_status = @p_from_wf_status
				   and to_workflow_stage = @p_to_wf_stage_no
				   and to_status = @p_to_wf_status
				   and eventverb_id = @i_wfeventverb_id
				   )
		 begin
		 	select @o_childproc_execution_status = 'FAILURE',
 				   @o_childproc_execution_error_message = 'Invalid Workflow Action'
			return
		 end
		 
		 if @i_wfeventverb_id = 'STATUSCHANGE' and not exists ( select 1 from workflow_status_link
				 where company_id = @i_client_id
				   and country_code = @i_country_code
				   and transaction_type_code  = 'CALL'
				   and request_category = @p_request_category
				   and request_type in ('ALL', @p_request_type)
				   and from_workflow_stage = @p_from_wf_stage_no 
				   and from_status = @p_from_wf_status
				   and to_workflow_stage = @p_to_wf_stage_no
				   and to_status = @p_to_wf_status
				   )
		 begin
		 	select @o_childproc_execution_status = 'FAILURE',
 				   @o_childproc_execution_error_message = 'Invalid Workflow Action'
			return
		 end
		  
		select @p_by_employee_id = employee_id
		from users
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and user_id = @i_user_id	
	
		if @i_channel_id = 'MOBILE'
		begin	
		  set @p_event_date = todatetimeoffset(CONVERT(datetimeoffset, @i_event_date + ' ' + @i_event_hour + ':' + @i_event_minute + ':00', 120),'+05:30')
		end
		else
		begin
			set @p_event_date = SYSDATETIMEOFFSET()
		end


		/*Updating udf fields in call register */
		
		update call_register
		set udf_char_1 = case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_char_1')
							when 1 then
								(case isnull((select isnull(x.paramval,'**NULLVALUESENT**') from #input_params x where x.paramname = 'call_register_udf_char_1'),'**NOTININPUTPARAM**')
								 when '**NOTININPUTPARAM**' then udf_char_1
								 when '**NULLVALUESENT**' then null
								 else  
									(select paramval from #input_params where paramname = 'call_register_udf_char_1')
								  end )
							else null
							end,
				 udf_char_2 = case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_char_2')
							when 1 then
								(case isnull((select isnull(x.paramval,'**NULLVALUESENT**') from #input_params x where x.paramname = 'call_register_udf_char_2'),'**NOTININPUTPARAM**')
								 when '**NOTININPUTPARAM**' then udf_char_2
								 when '**NULLVALUESENT**' then null
								 else  
									(select paramval from #input_params where paramname = 'call_register_udf_char_2')
								  end )
							else null
							end,
				 udf_char_3 = case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_char_3')
							when 1 then
								(case isnull((select isnull(x.paramval,'**NULLVALUESENT**') from #input_params x where x.paramname = 'call_register_udf_char_3'),'**NOTININPUTPARAM**')
								 when '**NOTININPUTPARAM**' then udf_char_3
								 when '**NULLVALUESENT**' then null
								 else  
									(select paramval from #input_params where paramname = 'call_register_udf_char_3')
								  end )
							else null
							end,
				 udf_char_4 =case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_char_4')
							when 1 then
								(case isnull((select isnull(x.paramval,'**NULLVALUESENT**') from #input_params x where x.paramname = 'call_register_udf_char_4'),'**NOTININPUTPARAM**')
								 when '**NOTININPUTPARAM**' then udf_char_4
								 when '**NULLVALUESENT**' then null
								 else  
									(select paramval from #input_params where paramname = 'call_register_udf_char_4')
								  end )
							else null
							end,
				 udf_float_1=case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_float_1')
							when 1 then
								(case isnull((select isnull(x.paramval,-200000.00) from #input_params x where x.paramname = 'call_register_udf_float_1'),-300000)
								 when -300000.00 then udf_float_1
								 when -200000.00 then null
								 else  
									(select cast(paramval as float) from #input_params where paramname = 'call_register_udf_float_1')
								  end )
							else null
							end,
				 udf_float_2=case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_float_2')
							when 1 then
								(case isnull((select isnull(x.paramval,-200000.00) from #input_params x where x.paramname = 'call_register_udf_float_2'),-300000)
								 when -300000.00 then udf_float_2
								 when -200000.00 then null
								 else  
									(select cast(paramval as float) from #input_params where paramname = 'call_register_udf_float_2')
								  end )
							else null
							end,
				udf_float_3=case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_float_3')
							when 1 then
								(case isnull((select isnull(x.paramval,-200000.00) from #input_params x where x.paramname = 'call_register_udf_float_3'),-300000)
								 when -300000.00 then udf_float_3
								 when -200000.00 then null
								 else  
									(select cast(paramval as float) from #input_params where paramname = 'call_register_udf_float_3')
								  end )
							else null
							end,
				udf_float_4 =  case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_float_4')
							when 1 then
								(case isnull((select isnull(x.paramval,-200000.00) from #input_params x where x.paramname = 'call_register_udf_float_4'),-300000)
								 when -300000.00 then udf_float_4
								 when -200000.00 then null
								 else  
									(select cast(paramval as float) from #input_params where paramname = 'call_register_udf_float_4')
								  end )
							else null
							end,
				udf_bit_1 = case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_bit_1')
							when 1 then
								(case isnull((select isnull(x.paramval,2) from #input_params x where x.paramname = 'call_register_udf_bit_1'),3)
								 when 3 then udf_bit_1
								 when 2 then null
								 else  
									(select cast(paramval as bit) from #input_params where paramname = 'call_register_udf_bit_1')
								  end )
							else null
							end,
				udf_bit_2 = case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_bit_2')
							when 1 then
								(case isnull((select isnull(x.paramval,2) from #input_params x where x.paramname = 'call_register_udf_bit_2'),3)
								 when 3 then udf_bit_2
								 when 2 then null
								 else  
									(select cast(paramval as bit) from #input_params where paramname = 'call_register_udf_bit_2')
								  end )
							else null
							end,
				udf_bit_3= case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_bit_3')
							when 1 then
								(case isnull((select isnull(x.paramval,2) from #input_params x where x.paramname = 'call_register_udf_bit_3'),3)
								 when 3 then udf_bit_3
								 when 2 then null
								 else  
									(select cast(paramval as bit) from #input_params where paramname = 'call_register_udf_bit_3')
								  end )
							else null
							end,
				udf_bit_4= case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_bit_4')
							when 1 then
								(case isnull((select isnull(x.paramval,2) from #input_params x where x.paramname = 'call_register_udf_bit_4'),3)
								 when 3 then udf_bit_4
								 when 2 then null
								 else  
									(select cast(paramval as bit) from #input_params where paramname = 'call_register_udf_bit_4')
								  end )
							else null
							end,
				udf_date_1=	case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_date_1')
							when 1 then
								(case isnull((select isnull(x.paramval,'2') from #input_params x where x.paramname = 'call_register_udf_date_1'),'1')
								 when '1' then udf_date_1
								 when '2' then null
								 else  
										 (select todatetimeoffset(CONVERT(datetimeoffset,
										 (select x.paramval from #input_params x where x.paramname = 'call_register_udf_date_1')
										+' ' +
										 (select y.paramval from #input_params y where y.paramname = 'call_register_udf_date_1_hour')
										 + ':' + 
										 (select z.paramval from #input_params z where z.paramname = 'call_register_udf_date_1_minute')
										 +':00',120), '+05:30'))
								  end )
							else null
							end,
				udf_date_2 = case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_date_2')
							when 1 then
								(case isnull((select isnull(x.paramval,'2') from #input_params x where x.paramname = 'call_register_udf_date_2'),'1')
								 when '1' then udf_date_2
								 when '2' then null
								 else  
										 (select todatetimeoffset(CONVERT(datetimeoffset,
										 (select x.paramval from #input_params x where x.paramname = 'call_register_udf_date_2')
										+' ' +
										 (select y.paramval from #input_params y where y.paramname = 'call_register_udf_date_2_hour')
										 + ':' + 
										 (select z.paramval from #input_params z where z.paramname = 'call_register_udf_date_2_minute')
										 +':00',120),'+05:30'))
								  end )
							else null
							end,
				udf_date_3 = case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_date_3')
							when 1 then
								(case isnull((select isnull(x.paramval,'2') from #input_params x where x.paramname = 'call_register_udf_date_3'),'1')
								 when '1' then udf_date_3
								 when '2' then null
								 else  
										 (select todatetimeoffset(CONVERT(datetimeoffset,
										 (select x.paramval from #input_params x where x.paramname = 'call_register_udf_date_3')
										+' ' +
										 (select y.paramval from #input_params y where y.paramname = 'call_register_udf_date_3_hour')
										 + ':' + 
										 (select z.paramval from #input_params z where z.paramname = 'call_register_udf_date_3_minute')
										 +':00',120), '+05:30'))
								  end )
							else null
							end,
				udf_date_4 = case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_date_4')
							when 1 then
								(case isnull((select isnull(x.paramval,2) from #input_params x where x.paramname = 'call_register_udf_date_4'),'1')
								 when '1' then udf_date_4
								 when '2' then null
								 else  
										 (select todatetimeoffset(CONVERT(datetimeoffset,
										 (select x.paramval from #input_params x where x.paramname = 'call_register_udf_date_4')
										+' ' +
										 (select y.paramval from #input_params y where y.paramname = 'call_register_udf_date_4_hour')
										 + ':' + 
										 (select z.paramval from #input_params z where z.paramname = 'call_register_udf_date_4_minute')
										 +':00',120), '+05:30'))
								  end )
							else null
							end,
				udf_analysis_code1 = case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_analysis_code1')
							when 1 then
								(case isnull((select isnull(x.paramval,'**NULLVALUESENT**') from #input_params x where x.paramname = 'call_register_udf_analysis_code1'),'**NOTININPUTPARAM**')
								 when '**NOTININPUTPARAM**' then udf_analysis_code1
								 when '**NULLVALUESENT**' then null
								 else  
									(select paramval from #input_params where paramname = 'call_register_udf_analysis_code1')
								  end )
							else null
							end,
				udf_analysis_code2 = case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_analysis_code2')
							when 1 then
								(case isnull((select isnull(x.paramval,'**NULLVALUESENT**') from #input_params x where x.paramname = 'call_register_udf_analysis_code2'),'**NOTININPUTPARAM**')
								 when '**NOTININPUTPARAM**' then udf_analysis_code2
								 when '**NULLVALUESENT**' then null
								 else  
									(select paramval from #input_params where paramname = 'call_register_udf_analysis_code2')
								  end )
							else null
							end,
				udf_analysis_code3 = case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_analysis_code3')
							when 1 then
								(case isnull((select isnull(x.paramval,'**NULLVALUESENT**') from #input_params x where x.paramname = 'call_register_udf_analysis_code3'),'**NOTININPUTPARAM**')
								 when '**NOTININPUTPARAM**' then udf_analysis_code3
								 when '**NULLVALUESENT**' then null
								 else  
									(select paramval from #input_params where paramname = 'call_register_udf_analysis_code3')
								  end )
							else null
							end,
				udf_analysis_code4 = case (select applicable from #applicable_custom_fields
								  where field_type = 'udf_analysis_code4')
							when 1 then
								(case isnull((select isnull(x.paramval,'**NULLVALUESENT**') from #input_params x where x.paramname = 'call_register_udf_analysis_code4'),'**NOTININPUTPARAM**')
								 when '**NOTININPUTPARAM**' then udf_analysis_code4
								 when '**NULLVALUESENT**' then null
								 else  
									(select paramval from #input_params where paramname = 'call_register_udf_analysis_code4')
								  end )
							else null
							end,
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
 						@o_childproc_execution_error_message = 'Failed updating call register udf fields'
				return
			end 

		  						  
		insert call_status_event_log
		(
			company_id, country_code, call_ref_no,
			channel_id,
			eventverb_id,
			from_wf_stage_no,
			to_wf_stage_no,
			event_date, to_status, from_status,
			by_employee_id, 
			to_employee_id_string,
			comments, 
			reason_code,
			lattitude_value,
			longitude_value,
			last_update_id
		)
		select @i_client_id, @i_country_code, @i_call_ref_no,
				@i_channel_id,
				@i_wfeventverb_id,
				@p_from_wf_stage_no,
				@p_to_wf_stage_no,
				@p_event_date, 
				@p_to_wf_status, @p_from_wf_status,
				@i_by_employee_id,
				case @i_to_employee_id_string when '' then null else @i_to_employee_id_string end, 
				case @i_comments when '' then null else @i_comments end,
				case @i_reason_code when '' then null else @i_reason_code end,
				case @i_lattitude_value when '' then null else @i_lattitude_value end,
				case @i_longitude_value when '' then null else @i_longitude_value end,
				@i_user_id

		if @@ROWCOUNT = 0
		begin
			select @o_childproc_execution_status = 'FAILURE',
 				   @o_childproc_execution_error_message = 'Failed insert into Call Event Log'
			return
		end

		set @p_event_id = @@IDENTITY
		
		select @p_equipment_category = equipment_category,
			   @p_equipment_type = equipment_type
		from equipment
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and equipment_id = ( select equipment_id from call_register
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and call_ref_no = @i_call_ref_no)

		if @i_wfeventverb_id = 'SAVEFORASSIGN'
		begin
		
			declare @p_assigned_on_date varchar(10), @p_assigned_on_hour varchar(2),
				@p_assigned_on_minute varchar(2), @p_sch_finish_date varchar(10), @p_sch_finish_hour varchar(2),
				@p_sch_finish_minute varchar(2), @p_assigned_to_emp_id nvarchar(12),
				@p_finish_datetime varchar(20),
				@p_call_logged_by_dealer_customer varchar(30), @p_equipment_id nvarchar(30),
				@p_error_code varchar(10),
				@p_next_eventverb_id varchar(60)
				
			select @p_call_logged_by_dealer_customer = isnull(udf_analysis_code4,''),
				   @p_call_logged_for_district_code = isnull(udf_char_2,''),
				   @p_call_logged_for_state_code = isnull(udf_char_1,''),
				   @p_equipment_id = equipment_id
			from call_register
			where company_id = @i_client_id 
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no
			
		  	update call_register	
			set	call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no
			  			  
			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
						@o_childproc_execution_error_message = 'Failed updating call register'
				return
			end
			
			/* Auto assign */
				if (@p_organogram_level_no = 3 and @p_organogram_level_code = 'CRS')
				or (@p_organogram_level_no = 1 and @p_organogram_level_code = 'acopco')
				begin
					  
					  /* Run Auto Assignment */
					  select @p_assigned_to_emp_id = ''
					 
					  select @p_current_datetime_string = CONVERT(varchar(20), sysdatetimeoffset(),121),
							 @p_finish_datetime = convert(varchar(20),DATEADD(hh, 24, SYSDATETIMEOFFSET()),121)
					    
					  select @p_assigned_on_date = SUBSTRING(@p_current_datetime_string,1,10), 
							 @p_assigned_on_hour = SUBSTRING(@p_current_datetime_string, 12,2),
							 @p_assigned_on_minute = SUBSTRING(@p_current_datetime_string,15,2)
					 
					  select @p_sch_finish_date = SUBSTRING(@p_finish_datetime,1,10), 
							 @p_sch_finish_hour = SUBSTRING(@p_finish_datetime, 12,2),
							 @p_sch_finish_minute = SUBSTRING(@p_finish_datetime,15,2)

					/* Assignment based on dealer logging or Customer logging					
						If call logged by dealer, assign to dealer
					*/

					select @p_assigned_to_emp_id = ''
					
					if @p_call_logged_by_dealer_customer not in ('','CUSTOMER')
					begin
					  
					  select @p_dealer_id = @p_call_logged_by_dealer_customer
					  
					  /* In this case @p_call_logged_by_dealer_customer carries dealer_id */					  
					  select @p_assigned_to_emp_id = employee_id
					  from dealer_mapping_to_employee
					  where company_id = @i_client_id
						and country_code = @i_country_code
						and dealer_id = @p_dealer_id
						and mapping_purpose_code = 'CALLAUTOASSIGNMENT'
						and equipment_category = @p_equipment_category
						and equipment_type = @p_equipment_type
					  
					  if @p_assigned_to_emp_id = ''
					  begin
					
						  select @p_assigned_to_emp_id = employee_id
						  from dealer_mapping_to_employee
						  where company_id = @i_client_id
							and country_code = @i_country_code
							and dealer_id = @p_dealer_id
							and mapping_purpose_code = 'CALLAUTOASSIGNMENT'
							and equipment_category = @p_equipment_category
							and equipment_type = 'ALL'
						
						 if @p_assigned_to_emp_id = ''
						 begin

						  select @p_assigned_to_emp_id = employee_id
						  from dealer_mapping_to_employee
						  where company_id = @i_client_id
							and country_code = @i_country_code
							and dealer_id = @p_dealer_id
							and mapping_purpose_code = 'CALLAUTOASSIGNMENT'
							and equipment_category = 'ALL'
							and equipment_type = 'ALL'
						 
						 end
					  end
					  
					end
					else if @p_call_logged_by_dealer_customer = 'CUSTOMER' 
					begin
						/* Check model, district mapping to dealer */
										
						select @p_dealer_id = ''
						
						select 	@p_dealer_id = dealer_id
						from dealer_coverage_mapping
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and state_code = @p_call_logged_for_state_code
						  and district_code = @p_call_logged_for_district_code
						  and equipment_category = @p_equipment_category
						  and equipment_type = @p_equipment_type
						
					  select @p_assigned_to_emp_id = employee_id
					  from dealer_mapping_to_employee
					  where company_id = @i_client_id
						and country_code = @i_country_code
						and dealer_id = @p_dealer_id
						and mapping_purpose_code = 'CALLAUTOASSIGNMENT'
						and equipment_category = @p_equipment_category
						and equipment_type = @p_equipment_type
					  
					  if @p_assigned_to_emp_id = ''
					  begin
					
						  select @p_assigned_to_emp_id = employee_id
						  from dealer_mapping_to_employee
						  where company_id = @i_client_id
							and country_code = @i_country_code
							and dealer_id = @p_dealer_id
							and mapping_purpose_code = 'CALLAUTOASSIGNMENT'
							and equipment_category = @p_equipment_category
							and equipment_type = 'ALL'
						
						 if @p_assigned_to_emp_id = ''
						 begin

						  select @p_assigned_to_emp_id = employee_id
						  from dealer_mapping_to_employee
						  where company_id = @i_client_id
							and country_code = @i_country_code
							and dealer_id = @p_dealer_id
							and mapping_purpose_code = 'CALLAUTOASSIGNMENT'
							and equipment_category = 'ALL'
							and equipment_type = 'ALL'
						 
						 end
					  end
						  
					end
						
					if (@p_assigned_to_emp_id != '' )
					begin
						
						set @p_next_eventverb_id = 'ASSIGN'
							
						select @p_current_wf_stage_no = @p_to_wf_stage_no,
							   @p_current_wf_status = @p_to_wf_status
							   						  
							select  @p_from_wf_stage_no = from_workflow_stage,
									@p_from_wf_status =  from_status,
									@p_to_wf_stage_no = to_workflow_stage,
									@p_to_wf_status =   to_status 
							from workflow_eventverb_list
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and transaction_type_code  = 'CALL'
							  and request_category = @p_request_category
							  and request_type in ('ALL', @p_request_type)
							  and eventverb_id = @p_next_eventverb_id
							  and from_workflow_stage = @p_current_wf_stage_no
							  and from_status = @p_current_wf_status  		  

							select @p_organogram_level_no = organogram_level_no,
									@p_organogram_level_code = organogram_level_code
							from employee
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and employee_id = @p_assigned_to_emp_id

							insert call_assignment
							(
								company_id, country_code, call_ref_no,
								resource_emp_id, primary_resource_ind, assigned_on_date, last_update_id
							)
							select @i_client_id, @i_country_code, @i_call_ref_no,
									@p_assigned_to_emp_id, 1, @p_event_date, @i_user_id

							if @@ROWCOUNT = 0
							begin
								select @o_childproc_execution_status = 'FAILURE',
 										@o_childproc_execution_error_message = 'Failed Insert into Call Assignment'
								return
							end		
						
						   /* Update call register with call mapped to employee id, functional role */
						   /* Maps to the OEM SE engineer based on the equipment group, sub group */
						   
						   select @p_call_mapped_to_emp_id = '', @p_call_mapped_to_func_role = ''
						   
							select @p_call_mapped_to_emp_id = employee_id
							from dealer_mapping_to_employee
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and mapping_purpose_code = 'OEMSEMAPPING'
							  and dealer_id = @p_dealer_id
							  and dealer_location_code = 'ALL'
							  and request_category = 'CALL'
							  and request_type = 'CALL'
							  and equipment_category = @p_equipment_category
							  and equipment_type = @p_equipment_type
						
							if ISNULL(@p_call_mapped_to_emp_id,'') = ''
							begin
									
								select @p_call_mapped_to_emp_id = employee_id
								from dealer_mapping_to_employee
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and mapping_purpose_code = 'OEMSEMAPPING'
								  and dealer_id = @p_dealer_id
								  and dealer_location_code = 'ALL'
								  and request_category = 'CALL'
								  and request_type = 'CALL'
								  and equipment_category = @p_equipment_category
								  and equipment_type = 'ALL'
							
								if ISNULL(@p_call_mapped_to_emp_id,'') = ''
								begin
								
									select @p_call_mapped_to_emp_id = employee_id
									from dealer_mapping_to_employee
									where company_id = @i_client_id
									  and country_code = @i_country_code
									  and mapping_purpose_code = 'OEMSEMAPPING'
									  and dealer_id = @p_dealer_id
									  and dealer_location_code = 'ALL'
									  and request_category = 'CALL'
									  and request_type = 'CALL'
									  and equipment_category = 'ALL'
									  and equipment_type = 'ALL'
								end
							end
						      
							select @p_call_mapped_to_func_role = functional_role_id
							from functional_role_employee
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and employee_id = @p_call_mapped_to_emp_id
							
							/* Get the company location code of the assigned dealer */
							if isnull(@p_dealer_id,'') != ''
							begin
								select @p_company_location_code = company_location_code
								from dealer_company_location_mapping
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and dealer_id = @p_dealer_id
								
								if ISNULL(@p_company_location_code,'') = ''
									select @p_company_location_code = 'HO'  					  
							end
				
				/*insert temp_ticketassign
				(
				organogram_level_no,
				organogram_level_code,
				call_Ref_no
				)
				select @p_organogram_level_no, @p_organogram_level_code, @i_call_ref_no*/
							
				update call_register	
				set call_wf_stage_no = @p_to_wf_stage_no,
					call_status = @p_to_wf_status,
					organogram_level_no = @p_organogram_level_no,
					organogram_level_code = @p_organogram_level_code,
					company_location_code = @p_company_location_code,
					call_mapped_to_employee_id = @p_call_mapped_to_emp_id,
					call_mapped_to_func_role = @p_call_mapped_to_func_role,
					sch_start_date = todatetimeoffset(CONVERT(datetimeoffset,
										 @p_assigned_on_date
										  +' ' +
										 @p_assigned_on_hour
										 + ':' + 
										 @p_assigned_on_minute
										 +':00',120), '+05:30'),
					sch_finish_date = todatetimeoffset( CONVERT(datetimeoffset,
										 @p_sch_finish_date
										  +' ' +
										 @p_sch_finish_hour
										 + ':' + 
										 @p_sch_finish_minute
										 +':00',120), '+05:30'),				
					last_update_id = @i_user_id
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no

				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating Call Register'
					return
				end

				update call_register
				set plan_duration = DATEDIFF(hh, sch_start_date, sch_finish_date),
					plan_work = DATEDIFF(hh, sch_start_date, sch_finish_date),
					plan_duration_uom = 'h',
					plan_work_uom = 'h'			
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no

				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating Call Register'
					return
				end
				
				
				insert call_status_event_log
				(
					company_id, country_code, call_ref_no,
					channel_id,
					eventverb_id,
					from_wf_stage_no,
					to_wf_stage_no,
					event_date, to_status, from_status,
					by_employee_id, 
					to_employee_id_string,
					comments, 
					reason_code,
					lattitude_value,
					longitude_value,
					last_update_id
				)
				select @i_client_id, @i_country_code, @i_call_ref_no,
						@i_channel_id,
						@i_wfeventverb_id,
						@p_from_wf_stage_no,
						@p_to_wf_stage_no,
						@p_event_date, 
						@p_to_wf_status, @p_from_wf_status,
						@i_by_employee_id,
						@p_assigned_to_emp_id, 
						'','','','',
						@i_user_id

				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 						   @o_childproc_execution_error_message = 'Failed insert into Call Event Log'
					return
				end
				
			end /*if assigned to emp id != '' */

		 end /* if org is 3, CRS */
			
		end
		else
		/* If the event verb is assignment -> insert call assignment table */
		if @i_wfeventverb_id = 'ASSIGN' or @i_wfeventverb_id = 'REASSIGN'
		begin
		
		
			if exists ( select 1 from call_assignment
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and call_ref_no = @i_call_ref_no
						  and primary_resource_ind = 1)
			begin
				/* Primary resource indicator is reset for all assignees */

				update call_assignment
				set primary_resource_ind = 0
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no
			
				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed Updating Call Assignment - Resetting Primary Resource'
					return
				end		
			
			end
			
			if not exists ( select 1 from call_assignment
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and call_ref_no = @i_call_ref_no
						  and resource_emp_id = @i_to_employee_id_string
						  and primary_resource_ind = 1)
			begin
			
				
				insert call_assignment
				(
					company_id, country_code, call_ref_no,
					resource_emp_id, primary_resource_ind, assigned_on_date, last_update_id
				)
				select @i_client_id, @i_country_code, @i_call_ref_no,
						@i_to_employee_id_string, 1, @p_event_date, @i_user_id

				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed Insert into Call Assignment'
					return
				end		
			
			   /* Update call register with call mapped to employee id, functional role */
			   /* Maps to the OEM SE engineer based on the equipment group, sub group */
			   
			   select @p_dealer_id = '', @p_call_mapped_to_emp_id = '', @p_call_mapped_to_func_role = ''
			   
				select @p_dealer_id = dealer_id
				from dealer_organogram_mapping
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and cast(organogram_level_no as varchar(1)) + organogram_level_code
					 = ( select cast(organogram_level_no as varchar(1)) + organogram_level_code
						 from employee
						 where company_id = @i_client_id 
						   and country_code = @i_country_code
						   and employee_id = @i_to_employee_id_string /* To be fixed when multi engineer assignment */
						)


				select @p_call_mapped_to_emp_id = employee_id
				from dealer_mapping_to_employee
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and mapping_purpose_code = 'OEMSEMAPPING'
				  and dealer_id = @p_dealer_id
				  and dealer_location_code = 'ALL'
				  and request_category = 'CALL'
				  and request_type = 'CALL'
				  and equipment_category = @p_equipment_category
				  and equipment_type = @p_equipment_type
			
				if ISNULL(@p_call_mapped_to_emp_id,'') = ''
				begin
						
					select @p_call_mapped_to_emp_id = employee_id
					from dealer_mapping_to_employee
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and mapping_purpose_code = 'OEMSEMAPPING'
					  and dealer_id = @p_dealer_id
					  and dealer_location_code = 'ALL'
					  and request_category = 'CALL'
					  and request_type = 'CALL'
					  and equipment_category = @p_equipment_category
					  and equipment_type = 'ALL'
				
					if ISNULL(@p_call_mapped_to_emp_id,'') = ''
					begin
					
						select @p_call_mapped_to_emp_id = employee_id
						from dealer_mapping_to_employee
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and mapping_purpose_code = 'OEMSEMAPPING'
						  and dealer_id = @p_dealer_id
						  and dealer_location_code = 'ALL'
						  and request_category = 'CALL'
						  and request_type = 'CALL'
						  and equipment_category = 'ALL'
						  and equipment_type = 'ALL'
					end
				end
			      
				select @p_call_mapped_to_func_role = functional_role_id
				from functional_role_employee
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and employee_id = @p_call_mapped_to_emp_id
				
				/* Get the company location code of the assigned dealer */
				if isnull(@p_dealer_id,'') != ''
				begin
					select @p_company_location_code = company_location_code
					from dealer_company_location_mapping
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and dealer_id = @p_dealer_id
					
					if ISNULL(@p_company_location_code,'') = ''
						select @p_company_location_code = 'HO'  					  
				end
				
				update call_register
				set company_location_code = @p_company_location_code,
					call_mapped_to_employee_id = @p_call_mapped_to_emp_id,
					call_mapped_to_func_role = @p_call_mapped_to_func_role
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no

				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed Insert into Call Assignment'
					return
				end		
				  	
			end
			else
			begin
				
				update call_assignment
				set assigned_on_date = @p_event_date,
					primary_resource_ind = 1,
					last_update_id = @i_user_id
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no
				  and resource_emp_id = @i_to_employee_id_string
			
				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed Updating Call Assignment'
					return
				end		
			
			end
		
		  /* Pending - In case of reassign, check for plan start date to be after hold date */
			/* Check if Plan finish date is not earlier than plan start date */
			
			if DATEDIFF(MINUTE,(CONVERT(datetimeoffset,
									 (select x.paramval from #input_params x where x.paramname = 'call_register_sch_start_date')
									  +' ' +
									 (select y.paramval from #input_params y where y.paramname = 'call_register_sch_start_date_hour')
									 + ':' + 
									 (select z.paramval from #input_params z where z.paramname = 'call_register_sch_start_date_minute')
									 +':00',120)), 
								(CONVERT(datetimeoffset,
									 (select x.paramval from #input_params x where x.paramname = 'call_register_sch_finish_date')
									  +' ' +
									 (select y.paramval from #input_params y where y.paramname = 'call_register_sch_finish_date_hour')
									 + ':' + 
									 (select z.paramval from #input_params z where z.paramname = 'call_register_sch_finish_date_minute')
									 +':00',120))) < 0 
			begin
				select @o_childproc_execution_status = 'FAILURE',
 						@o_childproc_execution_error_message = 'Plan finish date cannot be earlier than Plan start date'
				return
			end

			/*Get& Set call's organogram to assignee's organogram.
				In case multiple assignees, system takes the top most org code of the assignees - 6.feb.16 - Chak */

			select top(1) @p_organogram_level_no = organogram_level_no,
					@p_organogram_level_code = organogram_level_code
			from employee a, call_assignment b
			where b.company_id = @i_client_id
			  and b.country_code = @i_country_code
			  and b.call_ref_no = @i_call_ref_no
			  and b.primary_resource_ind = 1
			  and a.company_id = b.company_id
			  and a.country_code = b.country_code
			  and a.employee_id = b.resource_emp_id
			  order by organogram_level_no
			
			update call_register	
			set call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				organogram_level_no = @p_organogram_level_no,
				organogram_level_code = @p_organogram_level_code,
				sch_start_date = todatetimeoffset(CONVERT(datetimeoffset,
									 (select x.paramval from #input_params x where x.paramname = 'call_register_sch_start_date')
									  +' ' +
									 (select y.paramval from #input_params y where y.paramname = 'call_register_sch_start_date_hour')
									 + ':' + 
									 (select z.paramval from #input_params z where z.paramname = 'call_register_sch_start_date_minute')
									 +':00',120), '+05:30'),
				sch_finish_date = todatetimeoffset(CONVERT(datetimeoffset,
									 (select x.paramval from #input_params x where x.paramname = 'call_register_sch_finish_date')
									  +' ' +
									 (select y.paramval from #input_params y where y.paramname = 'call_register_sch_finish_date_hour')
									 + ':' + 
									 (select z.paramval from #input_params z where z.paramname = 'call_register_sch_finish_date_minute')
									 +':00',120), '+05:30'),				
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no


			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
 						@o_childproc_execution_error_message = 'Failed updating Call Register'
				return
			end

			update call_register
			set plan_duration = DATEDIFF(hh, sch_start_date, sch_finish_date),
				plan_work = DATEDIFF(hh, sch_start_date, sch_finish_date),
				plan_duration_uom = 'h',
				plan_work_uom = 'h'			
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
 						@o_childproc_execution_error_message = 'Failed updating Call Register'
				return
			end

			if @i_wfeventverb_id = 'REASSIGN'
			begin
				
				insert call_resource_utilisation_log
				(
					company_id, country_code, call_ref_no, resource_emp_id, 
					from_date, last_update_id
				)
				select @i_client_id, @i_country_code, @i_call_ref_no, resource_emp_id,
					   @p_event_date, @i_user_id
				from call_assignment
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no
				  and primary_resource_ind  = 1
				  			  
				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
							@o_childproc_execution_error_message = 'Failed Updating the call'
					return
				end		  
			end
	
		end
		else		
		if @i_wfeventverb_id = 'REJECTCALL'
		begin
		  /* Reject Call is given by the assignee before start. In such case, move the call
		     from 'Assigned' to 'Open for Re-assignment' 
		     Rejectcall by anyone other than the assignee is not allowed*/
		  
		  if @i_by_employee_id in ( select resource_emp_id from call_assignment
									where company_id = @i_client_id
									  and country_code = @i_country_code
									  and call_ref_no = @i_call_ref_no)
		  begin

			/*Set organogram to unit's organogram.
				Need to correct when multiple units implement MService - 6.feb.16 - Chak */

			select @p_organogram_level_no = 3,
					@p_organogram_level_code = 'CRS'
			

		  	update call_register	
			set	call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				organogram_level_no = @p_organogram_level_no,
				organogram_level_code = @p_organogram_level_code,
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no
			  			  
			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
						@o_childproc_execution_error_message = 'Failed Updating the call'
				return
			end
						
		  end
		  else
		  begin
				select @o_childproc_execution_status = 'FAILURE',
						@o_childproc_execution_error_message = 'Failed Updating the call'
				return
		  end
		  
		end

		/* Update attachments - multi attachment insert - pending - Chak 4.Mar.15 */
		if exists ( select 1 from #attachment_list)
		begin	
			
			select @p_attachment_file_path = code
			from code_table
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and code_type = 'CALLATTACHPATH'
			  
			if not exists ( select 1 from category_type_link b, #attachment_list c
						     where b.company_id = @i_client_id
						       and b.country_code = @i_country_code
						       and b.link_type = 'FA'
						       and b.category_code_type = 'FILECATG'
						       and b.category_code_value = c.file_category
						       and b.type_code_type = 'FILEEXTNALLOWED'
						       and b.type_code_value = 
						           substring(ltrim(rtrim(c.file_name)),len(ltrim(rtrim(c.file_name))) - charindex('.', reverse(ltrim(rtrim(c.file_name))))+1, LEN(ltrim(rtrim(c.file_name)))))
			begin
				select @o_childproc_execution_status = 'FAILURE',
 						@o_childproc_execution_error_message = 'Failure: Unsupported File Extension'
				return
			end

			/* Pending Issue with below code: Chak - 15.apr.15 - If multiple attachments are 
			   allowed for a workcomplete event. all attachments are marked as closure report.*/
			   
			if @i_wfeventverb_id = 'WORKCOMPLETE'			
				select @p_closure_report_ind = 1
			else
				select @p_closure_report_ind = 0
						 		
			insert call_user_attachments
			(
			  company_id, country_code, call_ref_no,
			  event_id,
			  attachment_file_category, attachment_file_type, 
			  attachment_file_name, attachment_file_path, closure_report_ind,last_update_id
			)
			 select @i_client_id, @i_country_code,
				   @i_call_ref_no,
				   @p_event_id, 
					file_category, file_type, file_name, 
					@p_attachment_file_path, @p_closure_report_ind, @i_user_id
			 from #attachment_list

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
 						@o_childproc_execution_error_message = 'Failed to update call user attachments'
				return
			end

			update call_user_attachments
			set attachment_file_id = attachment_file_category+attachment_file_type+REPLACE(str(attachment_file_sysgen_id,5,0),' ','0')
			from #attachment_list b
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no
			  and attachment_file_name = b.file_name 
			
			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
 						@o_childproc_execution_error_message = 'Failed to update call user attachments'
				return
			end
			
		end
		
		if @i_wfeventverb_id = 'ASSIGN'
		begin
		
			/* Check if Plan finish date is not earlier than plan start date */
			
			if DATEDIFF(MINUTE,(CONVERT(datetimeoffset,
									 (select x.paramval from #input_params x where x.paramname = 'call_register_sch_start_date')
									  +' ' +
									 (select y.paramval from #input_params y where y.paramname = 'call_register_sch_start_date_hour')
									 + ':' + 
									 (select z.paramval from #input_params z where z.paramname = 'call_register_sch_start_date_minute')
									 +':00',120)), 
								(CONVERT(datetimeoffset,
									 (select x.paramval from #input_params x where x.paramname = 'call_register_sch_finish_date')
									  +' ' +
									 (select y.paramval from #input_params y where y.paramname = 'call_register_sch_finish_date_hour')
									 + ':' + 
									 (select z.paramval from #input_params z where z.paramname = 'call_register_sch_finish_date_minute')
									 +':00',120))) < 0 
			begin
				select @o_childproc_execution_status = 'FAILURE',
 						@o_childproc_execution_error_message = 'Plan finish date cannot be earlier than Plan start date'
				return
			end

			/* Pick Assignee's organogram, company location and update in call register */
			
			select @p_organogram_level_no = organogram_level_no,
				   @p_organogram_level_code = organogram_level_code,
				   @p_company_location_code = location_code
			from employee
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and employee_id = @i_to_employee_id_string
			  
			update call_register	
			set call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				organogram_level_no = @p_organogram_level_no,
				organogram_level_code = @p_organogram_level_code,
				company_location_code = @p_company_location_code,
				sch_start_date = todatetimeoffset(CONVERT(datetimeoffset,
									 (select x.paramval from #input_params x where x.paramname = 'call_register_sch_start_date')
									  +' ' +
									 (select y.paramval from #input_params y where y.paramname = 'call_register_sch_start_date_hour')
									 + ':' + 
									 (select z.paramval from #input_params z where z.paramname = 'call_register_sch_start_date_minute')
									 +':00',120),'+05:30'),
				sch_finish_date = todatetimeoffset(CONVERT(datetimeoffset,
									 (select x.paramval from #input_params x where x.paramname = 'call_register_sch_finish_date')
									  +' ' +
									 (select y.paramval from #input_params y where y.paramname = 'call_register_sch_finish_date_hour')
									 + ':' + 
									 (select z.paramval from #input_params z where z.paramname = 'call_register_sch_finish_date_minute')
									 +':00',120), '+05:30'),				
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no


			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
 						@o_childproc_execution_error_message = 'Failed updating Call Register'
				return
			end

			update call_register
			set plan_duration = DATEDIFF(hh, sch_start_date, sch_finish_date),
				plan_work = DATEDIFF(hh, sch_start_date, sch_finish_date),
				plan_duration_uom = 'h',
				plan_work_uom = 'h'			
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
 						@o_childproc_execution_error_message = 'Failed updating Call Register'
				return
			end

		end
		else if @i_wfeventverb_id = 'START'
		begin
		
		  /* if start is given by assignee, create utilisation record only for the 
		     assignee in call_resource_utilisation_log table 
		     if start is given by others , mark start utlisation record for all assignees */
		  
		  if @i_by_employee_id in ( select resource_emp_id from call_assignment
									where company_id = @i_client_id
									  and country_code = @i_country_code
									  and call_ref_no = @i_call_ref_no
									  and primary_resource_ind = 1)
		  begin

		    if @p_online_offline_ind = 'F'
		  	begin		  	  
		  
				insert call_resource_utilisation_log
				(
					company_id, country_code, call_ref_no, resource_emp_id, 
					from_date, last_update_id
				)
				select @i_client_id, @i_country_code, @i_call_ref_no, @i_by_employee_id,
						todatetimeoffset(CONVERT(datetimeoffset, @i_event_date + ' ' + @i_event_hour + ':' + @i_event_minute + ':00', 120),'+05:30'),
						@i_user_id
				
				select @p_online_offline_ind

				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating resource utilisation'
					return
				end
			end
			else
			begin
				insert call_resource_utilisation_log
				(
					company_id, country_code, call_ref_no, resource_emp_id, 
					from_date, last_update_id
				)
				select @i_client_id, @i_country_code, @i_call_ref_no, @i_by_employee_id,
					   todatetimeoffset(CONVERT(datetimeoffset,
						(select x.paramval from #input_params x where x.paramname = 'call_register_act_start_date')
						+' ' +
						(select y.paramval from #input_params y where y.paramname = 'call_register_act_start_date_hour')
						+ ':' + 
						(select z.paramval from #input_params z where z.paramname = 'call_register_act_start_date_minute')
						+':00',120), '+05:30'), 
						@i_user_id
				
				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating resource utilisation'
					return
				end
			end			
		  end
		  else
		  begin  
			
		    if @p_online_offline_ind = 'F'
		  	begin		  	  
  
				insert call_resource_utilisation_log
				(
					company_id, country_code, call_ref_no, resource_emp_id, 
					from_date, last_update_id
				)
				select @i_client_id, @i_country_code, @i_call_ref_no, resource_emp_id,
						todatetimeoffset(CONVERT(datetimeoffset, @i_event_date + ' ' + @i_event_hour + ':' + @i_event_minute + ':00', 120), '+05:30'),
						@i_user_id
				from call_assignment
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no
				  and primary_resource_ind = 1
				  
				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating resource utilisation'
					return
				end
			end
			else
			begin
				insert call_resource_utilisation_log
				(
					company_id, country_code, call_ref_no, resource_emp_id, 
					from_date, last_update_id
				)
				select @i_client_id, @i_country_code, @i_call_ref_no, resource_emp_id,
					   todatetimeoffset( CONVERT(datetimeoffset,
									 (select x.paramval from #input_params x where x.paramname = 'call_register_act_start_date')
						+' ' +
						(select y.paramval from #input_params y where y.paramname = 'call_register_act_start_date_hour')
						+ ':' + 
						(select z.paramval from #input_params z where z.paramname = 'call_register_act_start_date_minute')
						+':00',120), '+05:30'), 					    
						@i_user_id
				from call_assignment
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no
				  and primary_resource_ind = 1
				  
				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating resource utilisation'
					return
				end
			end		
		  end
		  
		  /* If it is early start, update call register */
		  if ( select act_start_date from call_register
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no) is null
		  begin

		    if @p_online_offline_ind = 'F'
		  	begin		  	  
				update call_register	
				set	call_wf_stage_no = @p_to_wf_stage_no,
					call_status = @p_to_wf_status,
					act_start_date = todatetimeoffset(CONVERT(datetimeoffset, @i_event_date + ' ' + @i_event_hour + ':' + @i_event_minute + ':00', 120), '+05:30'),
					last_update_id = @i_user_id
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no

				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating call register'
					return
				end
			end
			else
			begin
				update call_register	
				set	call_wf_stage_no = @p_to_wf_stage_no,
					call_status = @p_to_wf_status,
					act_start_date = todatetimeoffset(CONVERT(datetimeoffset,
						(select x.paramval from #input_params x where x.paramname = 'call_register_act_start_date')
						+' ' +
						(select y.paramval from #input_params y where y.paramname = 'call_register_act_start_date_hour')
						+ ':' + 
						(select z.paramval from #input_params z where z.paramname = 'call_register_act_start_date_minute')
						+':00',120), '+05:30'), 					     
					last_update_id = @i_user_id
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no

				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating call register'
					return
				end
			end
		  end
		  
		end
		else if @i_wfeventverb_id = 'WORKCOMPLETE'
		begin

		  /* if work complete is given by assignee, create utilisation record only for the 
		     assignee in call_resource_utilisation_log table 
		     if finish is given by others , mark finish utlisation record for all assignees */
		  
		  if @i_by_employee_id in ( select resource_emp_id from call_assignment
									where company_id = @i_client_id
									  and country_code = @i_country_code
									  and call_ref_no = @i_call_ref_no
									  and primary_resource_ind = 1)
		  begin
		  
		    if @p_online_offline_ind = 'F'
		  	begin
		  	
				update call_resource_utilisation_log
				set to_date =  todatetimeoffset(CONVERT(datetimeoffset, @i_event_date + ' ' + @i_event_hour + ':' 			+@i_event_minute + ':00', 120), '+05:30'),
					   last_update_id = @i_user_id
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no
				  and resource_emp_id = @i_by_employee_id
				  and to_date is null
				  			  
				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = ' Failed updating call resource utilisation log'
					return
				end
			end
			else
			begin
				update call_resource_utilisation_log
				set to_date = todatetimeoffset(CONVERT(datetimeoffset,
						(select x.paramval from #input_params x where x.paramname = 'call_register_act_finish_date')
						+' ' +
						(select y.paramval from #input_params y where y.paramname = 'call_register_act_finish_date_hour')
						+ ':' + 
						(select z.paramval from #input_params z where z.paramname = 'call_register_act_finish_date_minute')
						+':00',120), '+05:30'), 
					   last_update_id = @i_user_id
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no
				  and resource_emp_id = @i_by_employee_id
				  and to_date is null
				  			  
				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = ' Failed updating call resource utilisation log'
					return
				end
			
			end
		  end
		  else
		  begin  

			if @p_online_offline_ind = 'F'
		  	begin
		  				  
				update call_resource_utilisation_log
				set to_date = todatetimeoffset(CONVERT(datetimeoffset, @i_event_date + ' ' + @i_event_hour + ':' 			+@i_event_minute + ':00', 120), '+05:30'),
					last_update_id = @i_user_id
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no
		  		  and to_date is null

				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating call resource utilisation log'
					return
				end
		  	
		  	end
		  	else
		  	begin				  
				update call_resource_utilisation_log
				set to_date = todatetimeoffset(CONVERT(datetimeoffset,
						(select x.paramval from #input_params x where x.paramname = 'call_register_act_finish_date')
						+' ' +
						(select y.paramval from #input_params y where y.paramname = 'call_register_act_finish_date_hour')
						+ ':' + 
						(select z.paramval from #input_params z where z.paramname = 'call_register_act_finish_date_minute')
						+':00',120), '+05:30'), 					    
					   last_update_id = @i_user_id
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no
		  		  and to_date is null

  				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating call resource utilisation log'
					return
				end

		  	end
		  	  
		
		  end
		end
		else if @i_wfeventverb_id = 'COMPLETE'
		begin
					  
			update call_register	
			set call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				act_finish_date = ( select MAX(to_date) 
									from call_resource_utilisation_log
									where company_id = @i_client_id
									  and country_code = @i_country_code
									  and call_ref_no = @i_call_ref_no
									),
				actual_work = round((( select SUM(datediff(minute, from_date, TO_date))
								from call_resource_utilisation_log
									where company_id = @i_client_id
									  and country_code = @i_country_code
									  and call_ref_no = @i_call_ref_no)* 1.00)/60, 1),
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
					@o_childproc_execution_error_message = 'Failed updating call register'
				return
			end
		  	
		  	
			update call_register	
			set actual_duration = round((DATEDIFF(minute, act_start_date, act_finish_date)*1.00)/60,1),
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
					@o_childproc_execution_error_message = 'Failed updating call register'
				return
			end
			
				select @p_asset_id = asset_id,
						@p_act_finish_date = act_finish_date,
						@p_contract_doc_no = service_contract_doc_no,
						@p_call_category = call_category
				from call_register
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no
				
			  if @p_call_category = 'SE'
			  begin

				select @p_contract_type = ''
				
				if @p_contract_doc_no != ''
				begin
				
					select @p_contract_type = contract_type
					from asset_service_contract
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and asset_id = @p_asset_id
					  and contract_doc_no = @p_contract_doc_no
					  
				end 
						  
			   /* If Commisioning call and machine sl no is available, update installation date */
			   if exists ( select 1 from call_register
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and call_ref_no = @i_call_ref_no
							  and call_type = 'COMM'
							  ) 			  
				begin
				  if (@p_asset_id != 'ZZZ')
				  begin 		
					if exists ( select 1 from asset_master
									where company_id = @i_client_id
									  and country_code = @i_country_code
									  and asset_id = @p_asset_id
									  and installation_date is null)
					begin
					  if @p_contract_doc_no = 'INITIALWARRANTY'
					  begin
						
						update asset_master
						set installation_date = @p_act_finish_date,
							last_update_id = @i_user_id
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and asset_id = @p_asset_id
					
						if @@ROWCOUNT = 0
						begin
							select @o_childproc_execution_status = 'FAILURE',
									@o_childproc_execution_error_message = 'Failed Updating the call'
							return					
						end
					
						update asset_service_contract
						set effective_from_date = @p_act_finish_date,
							effective_to_date = dateadd(dd, -1,DATEADD(mm, contract_duration, @p_act_finish_date)),
							last_update_id = @i_user_id
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and asset_id = @p_asset_id
						  and contract_doc_no = 'INITIALWARRANTY'
					
						if @@ROWCOUNT = 0
						begin
							select @o_childproc_execution_status = 'FAILURE',
								@o_childproc_execution_error_message = 'Failed Updating the call'
							return					
						end
							
						update asset_service_schedule
						set	service_visit_status = 'CO',	
							service_due_date = @p_act_finish_date,
							act_service_date = @p_act_finish_date,
							call_jo_ind = 'C',
							call_ref_jo_no = @i_call_ref_no,
							last_update_id = @i_user_id
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and asset_id = @p_asset_id
						  and contract_doc_no = @p_contract_doc_no
						  and service_visit_slno = 0
						
						if @@ROWCOUNT = 0
						begin
							select @o_childproc_execution_status = 'FAILURE',
									@o_childproc_execution_error_message = 'Failed Updating the call'
							return					
						end
						
						/* Recalculate the next visit dates */
						execute sp_update_asset_service_schedule_cascade_dates @i_client_id, @i_country_code, @i_user_id , 
								@p_asset_id, 'INITIALWARRANTY', 0,	@p_update_status OUTPUT, @p_errorno OUTPUT
				
						if @p_errorNo != ''
						begin
							select @o_childproc_execution_status = 'FAILURE',
 									@o_childproc_execution_error_message = 'Failed recalibrating asset service schedule'
							return
						end
					   
					   end /* If Initialwarranty */	
					   else /* There should not be a commision call for asset that is not in initial warranty */
					   begin
							select @o_childproc_execution_status = 'FAILURE',
									@o_childproc_execution_error_message = 'Failed Updating the call'
							return									   
					   end				  
					end  /* if asset installation date is null */
					else /* There should not be a commision call for asset that already has installation date */
					begin
							select @o_childproc_execution_status = 'FAILURE',
								@o_childproc_execution_error_message = 'Failed Updating the call'
							return									   				
					end
				  end /* if @p_asset_id != 'ZZZ' */
				end	
				else /* Not a commision call */
				begin

				  if (@p_asset_id != 'ZZZ')
				  begin 		
						
						if exists (select 1 from asset_service_schedule
									where company_id = @i_client_id
									  and country_code = @i_country_code
									  and call_jo_ind = 'C'
									  and call_ref_jo_no = @i_call_ref_no)
						begin
						
							select @p_service_visit_slno = service_visit_slno
							from asset_service_schedule
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and call_jo_ind = 'C'
							  and call_ref_jo_no = @i_call_ref_no
							  
							update asset_service_schedule
							set service_visit_status = 'CO',
								act_service_date = @p_act_finish_date,
								last_update_id = @i_user_id
							where company_id = @i_client_id
							  and country_code = @i_country_code
							  and call_jo_ind = 'C'
							  and call_ref_jo_no = @i_call_ref_no
							
							if @@ROWCOUNT = 0
							begin
								select @o_childproc_execution_status = 'FAILURE',
									@o_childproc_execution_error_message = 'Failed Updating the call'
								return
							end
								
							if @p_contract_type = 'IW' /* Cascade to next visit dates */
							begin
								/* Recalculate the next visit dates */
								execute sp_update_asset_service_schedule_cascade_dates @i_client_id, @i_country_code, @i_user_id , 
										@p_asset_id, @p_contract_doc_no, @p_service_visit_slno,	@p_update_status OUTPUT, @p_errorno OUTPUT
						
								if @p_errorNo != ''
								begin
									select @o_childproc_execution_status = 'FAILURE',
 											@o_childproc_execution_error_message = 'Failed updating Call Register'
									return
								end
							end
				
						end
					end /* if asset_id != 'ZZZ' */
					
				end  /* else If  of (Commisioning call and machine sl no is available) */
			  	
			  		/* Update asset organogram to assignee organogram only in work complete */				
					if isnull(@p_asset_id,'ZZZ') != 'ZZZ'
					begin
						update asset_master
						set servicing_org_level_code = @p_organogram_level_code,
							servicing_org_level_no = @p_organogram_level_no
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and asset_id = @p_asset_id
						  
						if @@ROWCOUNT = 0
						begin
							select @o_childproc_execution_status = 'FAILURE',
 								@o_childproc_execution_error_message = 'Failed updating asset master'
									
							return
						end
					end  

			  end /* If call category is SE */

		  	/****/
		end
		else if @i_wfeventverb_id = 'CLOSE'
		begin
			
			/* O / OR to closure is allowed for all divisions
				Calls in ForeClosure type */
			if (@p_from_wf_stage_no = 1 and @p_from_wf_status in ( 'O', 'OR'))
			   or
			   ( select call_type
				 from call_register
				 where company_id = @i_client_id
				   and country_code = @i_country_code
				   and call_ref_no = @i_call_ref_no
				) = 'FCLOSURE'
			begin
		  
				update call_register	
				set call_wf_stage_no = @p_to_wf_stage_no,
					call_status = @p_to_wf_status,
					closed_by_employee_id = @p_by_employee_id,
					closed_on_date = SYSDATETIMEOFFSET(),				
					last_update_id = @i_user_id
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and call_ref_no = @i_call_ref_no

				if @@ROWCOUNT = 0
				begin
					select @o_childproc_execution_status = 'FAILURE',
						@o_childproc_execution_error_message = 'Failed updating Call Register'
									
					return
				end
			
			end
			else /* For CRS*/
			begin
			
			select @p_contract_type = ''
			
			select @p_asset_id = asset_id,
					@p_act_finish_date = act_finish_date,
					@p_contract_doc_no = service_contract_doc_no,
					@p_call_category = call_category
			from call_register
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no
			
			if @p_contract_doc_no != ''
			begin
			
				select @p_contract_type = contract_type
				from asset_service_contract
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and asset_id = @p_asset_id
				  and contract_doc_no = @p_contract_doc_no
				  
			end 
		
			   /* In case model id and asset id were set after assignment, 
				Update call register with call mapped to employee id, functional role */
			   /* Maps to the OEM SE engineer based on the equipment group, sub group */
			 
			 select @p_dealer_id = null, @p_call_mapped_to_emp_id = null, @p_call_mapped_to_func_role = null
			   
			 select @p_dealer_id = dealer_id
			 from dealer_organogram_mapping
			 where company_id = @i_client_id
			   and country_code = @i_country_code
			   and organogram_level_no = @p_organogram_level_no
			   and organogram_level_code = @p_organogram_level_code
			 
				select @p_call_mapped_to_emp_id = employee_id
				from dealer_mapping_to_employee
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and mapping_purpose_code = 'OEMSEMAPPING'
				  and dealer_id = @p_dealer_id
				  and dealer_location_code = 'ALL'
				  and request_category = 'CALL'
				  and request_type = 'CALL'
				  and equipment_category = @p_equipment_category
				  and equipment_type = @p_equipment_type
			
				if ISNULL(@p_call_mapped_to_emp_id,'') = ''
				begin
						
					select @p_call_mapped_to_emp_id = employee_id
					from dealer_mapping_to_employee
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and mapping_purpose_code = 'OEMSEMAPPING'
					  and dealer_id = @p_dealer_id
					  and dealer_location_code = 'ALL'
					  and request_category = 'CALL'
					  and request_type = 'CALL'
					  and equipment_category = @p_equipment_category
					  and equipment_type = 'ALL'
				
					if ISNULL(@p_call_mapped_to_emp_id,'') = ''
					begin
					
						select @p_call_mapped_to_emp_id = employee_id
						from dealer_mapping_to_employee
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and mapping_purpose_code = 'OEMSEMAPPING'
						  and dealer_id = @p_dealer_id
						  and dealer_location_code = 'ALL'
						  and request_category = 'CALL'
						  and request_type = 'CALL'
						  and equipment_category = 'ALL'
						  and equipment_type = 'ALL'
					end
				end
			      
				select @p_call_mapped_to_func_role = functional_role_id
				from functional_role_employee
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and employee_id = @p_call_mapped_to_emp_id
				 	
			update call_register	
			set call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				call_mapped_to_employee_id = @p_call_mapped_to_emp_id,
				call_mapped_to_func_role = @p_call_mapped_to_func_role,
				closed_by_employee_id = @p_by_employee_id,
				closed_on_date = SYSDATETIMEOFFSET(),				
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
 					@o_childproc_execution_error_message = 'Failed updating Call Register'				
				return
			end

		  if @p_call_category = 'SE'
		  begin
		  
		  /***** WOL Number insert into call_reister actions***/
				if(@i_wfeventverb_id ='CLOSE')
				begin
						if(@p_request_type='BDWN' or @p_request_type='WRNTYSERV')
						begin
								insert into call_register_actions
										(company_id,
										country_code,
										call_ref_no,
										action_category,
										action_type,
										product_code,
										product_sub_code,
										requirement,
										no_of_units,
										uom_code) 

									select @i_client_id,
										@i_country_code,
										@i_call_ref_no,
										'CROSSREF',
										'WOL',
										isnull((select paramval from #input_params where paramname = 'call_register_udf_char_9') , ''),
										'NA',
										'',
										0,
										''

									if @@ROWCOUNT = 0
									begin
										select @o_childproc_execution_status = 'FAILURE',
 											   @o_childproc_execution_error_message = 'Failed to insert WOL number into Call register actions'
										return
									end
						end 
		 
				end
		  
		  
		   /* If Commisioning call and machine sl no is available, update installation date */
		   if exists ( select 1 from call_register
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and call_ref_no = @i_call_ref_no
						  and call_type = 'COMM'
						  ) 			  
			begin
			  if (@p_asset_id != 'ZZZ')
			  begin 		
				if exists ( select 1 from asset_master
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and asset_id = @p_asset_id
								  and installation_date is null)
				begin
				  if @p_contract_doc_no = 'INITIALWARRANTY'
				  begin
					
					update asset_master
					set installation_date = @p_act_finish_date,
						last_update_id = @i_user_id
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and asset_id = @p_asset_id
				
					if @@ROWCOUNT = 0
					begin
						select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating Asset Master'
									
						return					
					end
				
					update asset_service_contract
					set effective_from_date = @p_act_finish_date,
						effective_to_date = dateadd(dd, -1,DATEADD(mm, contract_duration, @p_act_finish_date)),
						last_update_id = @i_user_id
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and asset_id = @p_asset_id
					  and contract_doc_no = 'INITIALWARRANTY'
				
					if @@ROWCOUNT = 0
					begin
						select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating Asset Service Contract'
						return					
					end
						
					update asset_service_schedule
					set	service_visit_status = 'CO',	
						service_due_date = @p_act_finish_date,
						act_service_date = @p_act_finish_date,
						call_jo_ind = 'C',
						call_ref_jo_no = @i_call_ref_no,
						last_update_id = @i_user_id
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and asset_id = @p_asset_id
					  and contract_doc_no = @p_contract_doc_no
					  and service_visit_slno = 0
					
					if @@ROWCOUNT = 0
					begin
						select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating Asset Service Contract'
									
						return					
					end
					
					/* Recalculate the next visit dates */
					execute sp_update_asset_service_schedule_cascade_dates @i_client_id, @i_country_code, @i_user_id , 
							@p_asset_id, 'INITIALWARRANTY', 0,	@p_update_status OUTPUT, @p_errorno OUTPUT
			
					if @p_errorNo != ''
					begin
						select @o_childproc_execution_status = 'FAILURE',
 								@o_childproc_execution_error_message = 'Failed recalibrating asset service schedule'
						return
					end
				   
				   end /* If Initialwarranty */	
				   else /* There should not be a commision call for asset that is not in initial warranty */
				   begin
						select @o_childproc_execution_status = 'FAILURE',
								 @o_childproc_execution_error_message = 'Failed Updating the call'									
						return									   
				   end				  
				end  /* if asset installation date is null */
			  end /* if @p_asset_id != 'ZZZ' */
			  else /* Asset ID must be available for a commision call */
			  begin
			  		select @o_childproc_execution_status = 'FAILURE',
							@o_childproc_execution_error_message = 'Failed Updating the call'
 					return									   				
			  end			  
			end	
			else /* Not a commision call */
			begin
								  
					/*Update asset master with last check dates */
					update asset_master
					set lastcheck_call_jo_ind = 'C',
						lastcheck_call_jo_id = @i_call_ref_no,
						lastcheck_date = @p_act_finish_date,
						asset_location_code= isnull(( select asset_location_code_reported
												from call_register
												where company_id = @i_client_id
												  and country_code = @i_country_code
												  and call_ref_no = @i_call_ref_no
												  and asset_location_code_reported != ''),asset_location_code)
					where company_id = @i_client_id
					  and country_code = @i_country_code
					  and asset_id = @p_asset_id

					if @@ROWCOUNT = 0
					begin
						select @o_childproc_execution_status = 'FAILURE',
						@o_childproc_execution_error_message = 'Failed Updating the call'
						return
					end
				
					if exists (select 1 from asset_service_schedule
								where company_id = @i_client_id
								  and country_code = @i_country_code
								  and call_jo_ind = 'C'
								  and call_ref_jo_no = @i_call_ref_no)
					begin
					
						select @p_service_visit_slno = service_visit_slno
						from asset_service_schedule
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and call_jo_ind = 'C'
						  and call_ref_jo_no = @i_call_ref_no
						  
						update asset_service_schedule
						set service_visit_status = 'CO',
							act_service_date = @p_act_finish_date,
							last_update_id = @i_user_id
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and call_jo_ind = 'C'
						  and call_ref_jo_no = @i_call_ref_no
						
						if @@ROWCOUNT = 0
						begin
							select @o_childproc_execution_status = 'FAILURE',
							@o_childproc_execution_error_message = 'Failed Updating the call'
							return
						end
							
						if @p_contract_type = 'IW' /* Cascade to next visit dates */
						begin
							/* Recalculate the next visit dates */
							execute sp_update_asset_service_schedule_cascade_dates @i_client_id, @i_country_code, @i_user_id , 
									@p_asset_id, @p_contract_doc_no, @p_service_visit_slno,	@p_update_status OUTPUT, @p_errorno OUTPUT
					
							if @p_errorNo != ''
							begin
								select @o_childproc_execution_status = 'FAILURE',
 										@o_childproc_execution_error_message = 'Failed updating Call Register'
								return
							end
						end
			
				end
				
			end  /* else If  of (Commisioning call and machine sl no is available) */
		  	
			/* Update asset master with HMR value */
	
	
			update asset_master
			set lastcheck_value = (select cast(paramval as float) from #input_params where paramname = 'call_register_udf_float_1'),
				lastcheck_value_uom = 'hr',
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and asset_id = @p_asset_id
			
			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
						@o_childproc_execution_error_message = 'Failed Updating the call'
				return
			end
		  
		  end /* If call category is SE */
		  
		  end /* if not foreclosure */
		  		
		end
		else if @i_wfeventverb_id = 'HOLD'
		begin
		
			update call_register	
			set	call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
					@o_childproc_execution_error_message = 'Failed updating call register'
				return
			end

		end
		else if @i_wfeventverb_id = 'RELEASEHOLD'
		begin
		
			update call_register	
			set	call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
					@o_childproc_execution_error_message = 'Failed updating call register'
				return
			end
		
		end
		else if @i_wfeventverb_id = 'REASSIGN' /* REassign is allowed only from hold */
		begin
			  
			update call_register	
			set	call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
					@o_childproc_execution_error_message = 'Failed updating call register'
				return
			end

		end
		else if @i_wfeventverb_id = 'REOPEN'
		begin

			select @p_prev_sch_start_date = sch_start_date,
				   @p_prev_sch_finish_date = sch_finish_date
			from call_register
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no
			  
			update call_status_event_log
			set prev_sch_start_date = @p_prev_sch_start_date,
				prev_sch_finish_date = @p_prev_sch_finish_date
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and event_id = @p_event_id

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
					@o_childproc_execution_error_message = 'Failed updating call register'
				return
			end

			update call_register	
			set	call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				act_finish_date = null,
				actual_duration = null,
				actual_work = null,
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
					@o_childproc_execution_error_message = 'Failed updating call register'
				return
			end
		end		
		else if @i_wfeventverb_id = 'REPLAN'
		begin

			/* Check if Plan finish date is not earlier than plan start date */
			
			if DATEDIFF(MINUTE,(CONVERT(datetimeoffset,
									 (select x.paramval from #input_params x where x.paramname = 'call_register_sch_start_date')
									  +' ' +
									 (select y.paramval from #input_params y where y.paramname = 'call_register_sch_start_date_hour')
									 + ':' + 
									 (select z.paramval from #input_params z where z.paramname = 'call_register_sch_start_date_minute')
									 +':00',120)),
								(CONVERT(datetimeoffset,
									 (select x.paramval from #input_params x where x.paramname = 'call_register_sch_finish_date')
									  +' ' +
									 (select y.paramval from #input_params y where y.paramname = 'call_register_sch_finish_date_hour')
									 + ':' + 
									 (select z.paramval from #input_params z where z.paramname = 'call_register_sch_finish_date_minute')
									 +':00',120))) < 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
 						@o_childproc_execution_error_message = 'Plan finish date cannot be earlier than Plan start date'
				return
			end

			select @p_prev_sch_start_date = sch_start_date,
				   @p_prev_sch_finish_date = sch_finish_date
			from call_register
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no
			  
			update call_status_event_log
			set prev_sch_start_date = @p_prev_sch_start_date,
				prev_sch_finish_date = @p_prev_sch_finish_date
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and event_id = @p_event_id

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
					@o_childproc_execution_error_message = 'Failed updating event log'
				return
			end

			update call_register	
			set	call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				sch_start_date = todatetimeoffset(CONVERT(datetimeoffset,
									 (select x.paramval from #input_params x where x.paramname = 'call_register_sch_start_date')
									  +' ' +
									 (select y.paramval from #input_params y where y.paramname = 'call_register_sch_start_date_hour')
									 + ':' + 
									 (select z.paramval from #input_params z where z.paramname = 'call_register_sch_start_date_minute')
									 +':00',120),'+05:30'),
				sch_finish_date = todatetimeoffset(CONVERT(datetimeoffset,
									 (select x.paramval from #input_params x where x.paramname = 'call_register_sch_finish_date')
									  +' ' +
									 (select y.paramval from #input_params y where y.paramname = 'call_register_sch_finish_date_hour')
									 + ':' + 
									 (select z.paramval from #input_params z where z.paramname = 'call_register_sch_finish_date_minute')
									 +':00',120), '+05:30'),		
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no


			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
					@o_childproc_execution_error_message = 'Failed updating call register'
				return
			end

			update call_register
			set plan_duration = DATEDIFF(hh, sch_start_date, sch_finish_date),
				plan_work = DATEDIFF(hh, sch_start_date, sch_finish_date)
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
					@o_childproc_execution_error_message = 'Failed updating call register'
				return
			end
		
			/* Since replan is only for finish date, there is no impact on utilisation records */
			
		end
		else if @i_wfeventverb_id = 'STATUSCHANGE'
		begin
						
			update call_register	
			set call_wf_stage_no = @p_to_wf_stage_no,
				call_status = @p_to_wf_status,
				additional_information = case isnull((select isnull(x.paramval,'**NULLVALUESENT**') from #input_params x where x.paramname = 'call_register_additional_information'),'**NOTININPUTPARAM**')
								 when '**NOTININPUTPARAM**' then additional_information
								 when '**NULLVALUESENT**' then null
								 else  
									 (select x.paramval from #input_params x where x.paramname = 'call_register_additional_information')
								  end, 
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and call_ref_no = @i_call_ref_no

			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
					@o_childproc_execution_error_message = 'Failed updating call register'
				return
			end
			
		
		end

		/*  'PROGRESSUPDATE' - No Call Register update required */
	
		
		/* Logic to lock updates to active call */
		if @i_channel_id != 'MOBILE'
			set @i_channel_id = 'WEB'
		
		declare @p_allow_newtxn_ind bit, @o_update_status varchar(10),
				@p_feature_id varchar(15)
		
		set @p_allow_newtxn_ind = 1
		
		if @i_wfeventverb_id = 'START'
			set @p_allow_newtxn_ind = 0
		else if @i_wfeventverb_id in ('WORKCOMPLETE','COMPLETE','CLOSE','HOLD', 'ASSIGN', 'REASSIGN', 'SAVEFORASSIGN')
			set @p_allow_newtxn_ind = 1
		else if @i_wfeventverb_id in ( 'RELEASEHOLD')
			set @p_allow_newtxn_ind = 0
		else
			set @p_allow_newtxn_ind = 0
		
		select @p_feature_id = feature_id
		from company_feature
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and screen_id = @i_wfeventverb_id
		  and channel_id = @i_channel_id
		  
			execute sp_update_employee_lastaccess_info 
					@i_client_id , 
					@i_country_code , 
					@i_session_id , 
					@i_user_id , 
					@i_locale_id , 
					@p_by_employee_id ,
					'C' ,
					@i_call_ref_no ,
					'0' ,
					@p_feature_id,
					@p_allow_newtxn_ind ,
					@i_channel_id ,
					@o_update_status OUTPUT	

			if @o_update_status = 'ERROR'
			begin
					select @o_childproc_execution_status = 'FAILURE',
 							@o_childproc_execution_error_message = 'Failed updating last access info'
					return
			end
		
				  	  	
	set @o_childproc_execution_status = 'SUCCESS'


    SET NOCOUNT OFF;
END



GO
