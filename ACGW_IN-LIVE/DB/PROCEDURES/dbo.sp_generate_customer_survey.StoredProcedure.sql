IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_generate_customer_survey')
BEGIN
	DROP PROCEDURE [dbo].[sp_generate_customer_survey]
END
/****** Object:  StoredProcedure [dbo].[sp_generate_customer_survey]    Script Date: 28-12-2023 14:36:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
 * Generate Customer Survey
 */
CREATE PROCEDURE [dbo].[sp_generate_customer_survey] 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_call_jo_project_ref_no [uddt_nvarchar_20], 
    @o_survey_ref_no [uddt_nvarchar_20] OUTPUT, 
    @o_update_status [uddt_varchar_5] OUTPUT,
    @errorNo [errorno] OUTPUT
AS
BEGIN
declare	@p_sysdatetimeoffset datetimeoffset(7)
select @p_sysdatetimeoffset = dbo.fn_sysdatetimeoffset(@i_client_id, @i_country_code, @i_user_id)
    /*
     * Generate Parts Warranty Claim
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
         @o_pwclaim_ref_no = '' /* unicode string */
         @o_update_status = '' /* string */
     */

	set @o_survey_ref_no = ''
	set @o_update_status = ''
	set @errorNo = ''

	declare @p_survey_status varchar(2),
			@p_created_by_emp_id nvarchar(12), @p_employee_id nvarchar(12),
			@p_call_type nvarchar(10),
			@p_equipment_id nvarchar(30), @p_survey_category nvarchar(15),
			@p_survey_type nvarchar(15), @p_asset_id nvarchar(30), 
			@p_service_contract_doc_no nvarchar(40),
			@p_survey_wf_stage_no tinyint

	if exists (select 1 from call_register
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @i_call_jo_project_ref_no)
	begin
		select @o_survey_ref_no = 'CS'+@i_call_jo_project_ref_no

		if not exists ( select 1 from call_register
					where company_id = @i_client_id
						and country_code = @i_country_code
						and call_ref_no = @i_call_jo_project_ref_no
						and call_category = 'SE'
						and call_status = 'CO'
					) /* Close Call check */
		begin
				set @errorNo = 'E_UP_208'
				return
			
		end	    
	   
		if exists ( select 1 from call_register
					where company_id = @i_client_id
						and country_code = @i_country_code
						and call_ref_no = @i_call_jo_project_ref_no)
		begin
	    	
			select @p_created_by_emp_id = employee_id
			from users
			where company_id = @i_client_id
	    		and country_code = @i_country_code
	    		and user_id = @i_user_id

			select @p_survey_category = 'CS',
					@p_survey_type = 'CS'

			select @p_equipment_id = equipment_id,
					@p_asset_id = asset_id,
					@p_service_contract_doc_no = service_contract_doc_no
			from call_register
			where company_id = @i_client_id
				and country_code = @i_country_code
				and call_ref_no = @i_call_jo_project_ref_no
			
			select @p_survey_wf_stage_no = workflow_stage_no 
			from workflow_stage_master
			where company_id = @i_client_id
	    		and country_code = @i_country_code
	    		and transaction_type_code = 'ANCILLARY'
	    		and request_category = @p_survey_category
	    		and first_stage_ind = 1
	    	  
			select @p_survey_status = status_code
			from workflow_status_master
			where company_id = @i_client_id
	    		and country_code = @i_country_code
	    		and transaction_type_code = 'ANCILLARY'
	    		and request_category = @p_survey_category
	    		and first_status_ind = 1


			insert ancillary_request_register
			(
				company_id, country_code, request_ref_no, 
				request_category, request_type, 
				request_wf_stage_no, request_status,
				company_location_code, organogram_level_no, 
				organogram_level_code, 
				priority_code,customer_id, 
				customer_location_code,
				created_by_employee_id, created_on_date,
				billable_nonbillable_ind,charges_currency_code,
				charges_gross_amount,charges_tax_amount,
				charges_discount_amount,charges_net_amount,
				customer_contact_name, customer_contact_no,
				system_user_generation_ind,
				last_update_id
			)
			select  cr.company_id, cr.country_code, @o_survey_ref_no, 
					@p_survey_category, @p_survey_type,
					@p_survey_wf_stage_no, @p_survey_status, 
					cr.company_location_code,
					cr.organogram_level_no, cr.organogram_level_code,
					cr.priority_code,
					cr.customer_id, cr.customer_location_code, 
					@p_created_by_emp_id, 
					@p_sysdatetimeoffset,
					cr.billable_nonbillable_ind, cr.charges_currency_code,
					cr.charges_gross_amount, cr.charges_tax_amount,
					cr.charges_discount_amount, cr.charges_net_amount,
					customer_contact_name,customer_contact_no,'U',
					@i_user_id		 
				from call_register cr
				where cr.company_id = @i_client_id
					and cr.country_code = @i_country_code
					and cr.call_ref_no = @i_call_jo_project_ref_no
			  
				if @@ROWCOUNT = 0
				begin
				set @errorNo = 'E_UP_202'
				return
				end
			 
			 	  
				select @p_employee_id = employee_id
				from users
				where company_id = @i_client_id
				and country_code = @i_country_code
				and user_id = @i_user_id
			     
				insert ancillary_request_status_event_log
				(
				company_id, country_code, request_ref_no,channel_id,
				eventverb_id,
				from_wf_stage_no, to_wf_stage_no, event_date, to_status, from_status,
				by_employee_id, last_update_id
				)
				select @i_client_id, @i_country_code, @o_survey_ref_no, 'WEB',
					'OPEN',
					0, 1, @p_sysdatetimeoffset, 'O','', @p_employee_id, @i_user_id
					
				if @@ROWCOUNT = 0
				begin
					set @errorNo = 'E_UP_202'
					return
				end        

		end
	
	end
	else if exists (select 1 from ancillary_request_register
			where company_id = @i_client_id
				and country_code = @i_country_code
				and request_ref_no = @i_call_jo_project_ref_no)
	begin
		select @o_survey_ref_no = 'CS'+@i_call_jo_project_ref_no

		if not exists ( select 1 from ancillary_request_register
					where company_id = @i_client_id
						and country_code = @i_country_code
						and request_ref_no = @i_call_jo_project_ref_no
						and request_category = 'QU'
						and request_status = 'CO'
					) 
		begin
				set @errorNo = 'E_UP_208'
				return
			
		end	    
	   
		if exists ( select 1 from ancillary_request_register
					where company_id = @i_client_id
						and country_code = @i_country_code
						and request_ref_no = @i_call_jo_project_ref_no)
		begin
	    	
			select @p_created_by_emp_id = employee_id
			from users
			where company_id = @i_client_id
	    		and country_code = @i_country_code
	    		and user_id = @i_user_id

			select @p_survey_category = 'CS',
					@p_survey_type = 'CS'

			select @p_survey_wf_stage_no = workflow_stage_no 
			from workflow_stage_master
			where company_id = @i_client_id
	    		and country_code = @i_country_code
	    		and transaction_type_code = 'ANCILLARY'
	    		and request_category = @p_survey_category
	    		and first_stage_ind = 1
	    	  
			select @p_survey_status = status_code
			from workflow_status_master
			where company_id = @i_client_id
	    		and country_code = @i_country_code
	    		and transaction_type_code = 'ANCILLARY'
	    		and request_category = @p_survey_category
	    		and first_status_ind = 1


			insert ancillary_request_register
			(
				company_id, country_code, request_ref_no, 
				request_category, request_type, 
				request_wf_stage_no, request_status,
				company_location_code, organogram_level_no, 
				organogram_level_code, 
				priority_code,customer_id, 
				customer_location_code,
				created_by_employee_id, created_on_date,
				billable_nonbillable_ind,charges_currency_code,
				charges_gross_amount,charges_tax_amount,
				charges_discount_amount,charges_net_amount,
				customer_contact_name, customer_contact_no,
				system_user_generation_ind,
				last_update_id
			)
			select  cr.company_id, cr.country_code, @o_survey_ref_no, 
					@p_survey_category, @p_survey_type,
					@p_survey_wf_stage_no, @p_survey_status, 
					cr.company_location_code,
					cr.organogram_level_no, cr.organogram_level_code,
					cr.priority_code,
					cr.customer_id, cr.customer_location_code, 
					@p_created_by_emp_id, 
					@p_sysdatetimeoffset,
					cr.billable_nonbillable_ind, cr.charges_currency_code,
					cr.charges_gross_amount, cr.charges_tax_amount,
					cr.charges_discount_amount, cr.charges_net_amount,
					customer_contact_name,customer_contact_no,'U',
					@i_user_id		 
				from ancillary_request_register cr
				where cr.company_id = @i_client_id
					and cr.country_code = @i_country_code
					and cr.request_ref_no = @i_call_jo_project_ref_no
			  
				if @@ROWCOUNT = 0
				begin
				set @errorNo = 'E_UP_202'
				return
				end
			 
			 	  
				select @p_employee_id = employee_id
				from users
				where company_id = @i_client_id
				and country_code = @i_country_code
				and user_id = @i_user_id
			     
				insert ancillary_request_status_event_log
				(
				company_id, country_code, request_ref_no,channel_id,
				eventverb_id,
				from_wf_stage_no, to_wf_stage_no, event_date, to_status, from_status,
				by_employee_id, last_update_id
				)
				select @i_client_id, @i_country_code, @o_survey_ref_no, 'WEB',
					'OPEN',
					0, 1, @p_sysdatetimeoffset, 'O','', @p_employee_id, @i_user_id
					
				if @@ROWCOUNT = 0
				begin
					set @errorNo = 'E_UP_202'
					return
				end        

		end
	
	end
	else 
	begin
		set @errorNo = 'E_UP_208'
		return
	end

	select @o_update_status = 'SP001'
	
    SET NOCOUNT OFF;
END



