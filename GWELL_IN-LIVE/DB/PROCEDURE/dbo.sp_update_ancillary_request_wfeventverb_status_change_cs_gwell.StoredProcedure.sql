/****** Object:  StoredProcedure [dbo].[sp_update_ancillary_request_wfeventverb_status_change_cs_gwell]    Script Date: 22-12-2023 17:06:34 ******/
DROP PROCEDURE IF EXISTS[dbo].[sp_update_ancillary_request_wfeventverb_status_change_cs_gwell]
GO

/****** Object:  StoredProcedure [dbo].[sp_update_ancillary_request_wfeventverb_status_change_cs_gwell]    Script Date: 22-12-2023 17:06:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



/*
 * Function to save call status change for predefined workflow events.
 */
CREATE PROCEDURE [dbo].[sp_update_ancillary_request_wfeventverb_status_change_cs_gwell]
    @i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id], 
    @i_request_ref_no [uddt_nvarchar_20], 
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
			@p_attachment_file_path nvarchar(30),
			@p_inputparam_xml xml		
		
		declare @p_prev_sch_start_date datetimeoffset(7),
				@p_prev_sch_finish_date datetimeoffset(7),
				@p_attachment_file_category varchar(2),
				@p_attachment_file_type varchar(2)
			
		declare @p_online_offline_ind varchar(1)
		
		declare  @p_request_logged_for_district_code nvarchar(20),
				 @p_request_logged_for_state_code nvarchar(20),
				 @p_dealer_id nvarchar(20),
	 			 @p_equipment_category nvarchar(15),
				 @p_equipment_type nvarchar(15),
				 @p_request_mapped_to_emp_id nvarchar(12),
				 @p_request_mapped_to_func_role nvarchar(30)		

		declare @p_asset_id nvarchar(30),
				@p_act_finish_date datetimeoffset(7),
				@p_contract_doc_no nvarchar(40),
				@p_contract_type nvarchar(20),
				@p_update_status varchar(10),
				@p_service_visit_slno tinyint,
				@p_errorNo varchar(10)

	
	/* 5.Mar.15 - Pending validations for each status change eg. finish date being mandatory for finish verb */

	set @p_inputparam_xml = CAST( LTRIM(rtrim(@i_inputparam_xml1))+
									(case ltrim(rtrim(@i_inputparam_xml2))
									 when '' then '' else ltrim(rtrim(@i_inputparam_xml2)) end)
									+(case ltrim(rtrim(@i_inputparam_xml3))
									 when '' then '' else ltrim(rtrim(@i_inputparam_xml3)) end)
							  as XML)

	
create table #input_params
 (paramname varchar(50) not null,
  paramval nvarchar(max) null
  )
 
  
  insert #input_params
  (paramname, paramval)
  SELECT nodes.value('local-name(.)', 'varchar(50)'),
         nodes.value('(.)[1]', 'nvarchar(max)')
  FROM @p_inputparam_xml.nodes('/inputparam/*') AS Tbl(nodes)
  



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
	
	

	/* If updated via sms channe, the p_by_employee id will be blank - pending*/
			 	
	select @p_request_category = request_category,
			@p_request_type = request_type,
			@p_current_wf_stage_no = request_wf_stage_no,
			@p_current_wf_status = request_status,
			@p_organogram_level_no = organogram_level_no,
			@p_organogram_level_code = organogram_level_code,
			@p_company_location_code = company_location_code		
	from ancillary_request_register
	where company_id = @i_client_id
	  and country_code = @i_country_code
	  and request_ref_no = @i_request_ref_no
	 

    if @i_wfeventverb_id != 'STATUSCHANGE'
	begin

		select  @p_from_wf_stage_no = from_workflow_stage,
				@p_from_wf_status =  from_status,
				@p_to_wf_stage_no = to_workflow_stage,
				@p_to_wf_status =   to_status 
		from workflow_eventverb_list
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and transaction_type_code  = 'ANCILLARY'
		  and request_category = @p_request_category
		  and request_type in ('ALL', @p_request_type)
		  and eventverb_id = @i_wfeventverb_id
		  and from_workflow_stage = @p_current_wf_stage_no
		  and from_status = @p_current_wf_status 
	end
	else 
	begin

		select  @p_from_wf_stage_no = from_workflow_stage,
				@p_from_wf_status =  from_status,
				@p_to_wf_stage_no = to_workflow_stage,
				@p_to_wf_status =   to_status 
		from workflow_status_link
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and transaction_type_code  = 'ANCILLARY'
		  and request_category = @p_request_category
		  and request_type in ('ALL', @p_request_type)
		  and from_workflow_stage = @i_from_wf_stage_no 
		  and from_status = @i_from_wf_status
		  and to_workflow_stage = @i_to_wf_stage_no
		  and to_status = @i_to_wf_status
	end	   
		/* Check validity of the call*/
		
		if not exists ( select 1 from ancillary_request_register
						where company_id = @i_client_id
						  and country_code = @i_country_code
						  and request_ref_no = @i_request_ref_no
						  and request_wf_stage_no = @i_from_wf_stage_no
						  and request_status = @i_from_wf_status)
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
				   and transaction_type_code  = 'ANCILLARY'
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
				   and transaction_type_code  = 'ANCILLARY'
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
		  
	declare  @p_to_employee_id_string nvarchar(255)

	select top(1) @p_to_employee_id_string = resource_emp_id
				from ancillary_request_assignment
				where company_id = @i_client_id
				and country_code = @i_country_code
				and request_ref_no = @i_request_ref_no
				and primary_resource_ind = 1 		
				
		insert ancillary_request_status_event_log
		(
			company_id, country_code, request_ref_no,
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
			udf_char_1,
			last_update_id
		)
		select @i_client_id, @i_country_code, @i_request_ref_no,
				@i_channel_id,
				@i_wfeventverb_id,
				@i_from_wf_stage_no,
				@i_to_wf_stage_no,
				@i_event_date, 
				@i_to_wf_status, @i_from_wf_status,
				@i_by_employee_id,
				@i_to_employee_id_string, 
				case @i_comments when '' then null else @i_comments end,
				case @i_reason_code when '' then null else @i_reason_code end,
				case @i_lattitude_value when '' then null else @i_lattitude_value end,
				case @i_longitude_value when '' then null else @i_longitude_value end,
				isnull((select paramval from #input_params where paramname = 'status_event_log_udf_char_1'),''),
				@i_user_id

		if @@ROWCOUNT = 0
		begin
			select @o_childproc_execution_status = 'FAILURE',
 				   @o_childproc_execution_error_message = 'Failed insert into Call Event Log'
			return
		end

		set @p_event_id = @@IDENTITY

	if @i_wfeventverb_id = 'NORESPONSE'
		begin
			update ancillary_request_register	
			set	 request_wf_stage_no = @p_to_wf_stage_no,
				request_status = @p_to_wf_status,
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and request_ref_no = @i_request_ref_no
			  			  
			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
						@o_childproc_execution_error_message = 'Failed updating call register'
				return
			end
		end

	if @i_wfeventverb_id = 'CLOSE'
		begin
			update ancillary_request_register	
			set	 request_wf_stage_no = @p_to_wf_stage_no,
				request_status = @p_to_wf_status,
				last_update_id = @i_user_id
			where company_id = @i_client_id
			  and country_code = @i_country_code
			  and request_ref_no = @i_request_ref_no
			  			  
			if @@ROWCOUNT = 0
			begin
				select @o_childproc_execution_status = 'FAILURE',
						@o_childproc_execution_error_message = 'Failed updating call register'
				return
			end
		end
		
		set @o_childproc_execution_status = 'SUCCESS'


    SET NOCOUNT OFF;
END