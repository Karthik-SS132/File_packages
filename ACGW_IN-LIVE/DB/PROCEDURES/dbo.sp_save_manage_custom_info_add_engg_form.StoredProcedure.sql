IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_save_manage_custom_info_add_engg_form')
BEGIN
	DROP PROCEDURE [dbo].[sp_save_manage_custom_info_add_engg_form]
END
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_add_engg_form]
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_custom_info_code [uddt_varchar_60], 
    @i_custom_info_ref_no1 [uddt_nvarchar_60], 
    @i_custom_info_ref_no2 [uddt_nvarchar_60], 
    @i_inputparam_header_xml [uddt_nvarchar_max], 
    @i_rec_timestamp [uddt_uid_timestamp], 
    @i_save_mode [uddt_varchar_1], 
	@o_outputparam_detail_xml [uddt_nvarchar_max] OUTPUT,  
    @o_update_status [uddt_varchar_5] OUTPUT, 
	@custom_info_detail [sp_save_manage_custom_info_custom_info_detail] READONLY,
    @i_error_msg [uddt_nvarchar_max] OUTPUT
AS
BEGIN
	
	declare	@p_sysdatetimeoffset datetimeoffset(7)
	select @p_sysdatetimeoffset = dbo.fn_sysdatetimeoffset(@i_client_id, @i_country_code, @i_user_id)
	
	declare @p_call_category varchar(10), 
		@p_call_type nvarchar(10),
		@p_customer_id varchar(15), 
		@p_asset_id nvarchar(30), 
		@p_equipment_id nvarchar(30),
		@p_asset_location nvarchar(50), 
		@p_problem_description nvarchar(1000),
		@p_customer_contact_name nvarchar(60), 
		@p_customer_contact_no nvarchar(20),
		@p_customer_contact_email nvarchar(60), 
		@p_logged_on_date varchar(10),
		@p_logged_on_hour varchar(2), 
		@p_logged_on_minute varchar(2), 
		@p_udf_xml varchar(1000),
		@p_org_lvl_no varchar(1), 
		@p_org_lvl_code nvarchar(15), 
		@p_company_location_code nvarchar(8),
		@p_employee_id nvarchar(12), 
		@p_customer_location_code nvarchar(10), 
		@p_requested_date varchar(10),
		@p_parts_req_xml_string nvarchar(1000), 
		@p_parts_req_xml xml, 
		@p_part_number nvarchar(50), 
		@p_part_description varchar(100), 
		@p_part_quantity varchar(20),
		@p_update_status varchar(5), 
		@p_call_ref_no nvarchar(20), 
		@p_active_call_ref_no nvarchar(20), 
		@p_error_no varchar(15),
		@p_SQLString nvarchar(max) ,	
		@p_ParmDefinition nvarchar(max),
		@p_error_msg nvarchar(max),
		@p_visitor_id varchar(20),
		@p_assigned_to_engineer nvarchar(15),
		@p_call_no nvarchar(15),
		@p_default_currency_code varchar(3)
			

	
	select @p_assigned_to_engineer = json_value(@i_inputparam_header_xml, '$.engineer_search')
	select @p_call_no = json_value(@i_inputparam_header_xml, '$.call_search')
	select @p_logged_on_date = convert(varchar(10),@p_sysdatetimeoffset,120)
	select @p_logged_on_hour = substring(convert(varchar(10),@p_sysdatetimeoffset,108),1,2)
	select @p_logged_on_minute = substring(convert(varchar(10),@p_sysdatetimeoffset,108),4,2)

	
	select 
		@p_employee_id = employee_id,
		@p_org_lvl_no = organogram_level_no,
		@p_org_lvl_code = organogram_level_code,
		@p_company_location_code = location_code
	from employee
	where company_id = @i_client_id
		and country_code = @i_country_code
		and employee_id = 
		(
			select employee_id 
			from users
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_id = @i_user_id
		)


		
	 select @p_customer_id = customer_id, 
			@p_asset_id = asset_id,
			@p_equipment_id = equipment_id,
			@p_org_lvl_no = organogram_level_no,
			@p_org_lvl_code = organogram_level_code,
			@p_problem_description  = problem_description
		from call_register
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @p_call_no

	 select @p_customer_contact_name  =  contact_person_1,
			@p_customer_contact_no    = contact_person_1_mobile_no,
			@p_customer_contact_email = contact_person_1_email_id
				From customer
				where company_id = @i_client_id
				and country_code = @i_country_code
				and customer_id = @p_customer_id


	 select @p_customer_location_code  =  location_code 
				From customer_location
				where company_id = @i_client_id
				and country_code = @i_country_code
				and customer_id = @p_customer_id

	select @p_default_currency_code = a.default_currency_code 
	from company_location a
	where a.company_id = @i_client_id
		and a.country_code = @i_country_code
		and a.location_code = @p_company_location_code	


	select @p_asset_id = isnull(@p_asset_id, 'ZZZ')		
	select @p_customer_id = isnull(@p_customer_id, 'ZZZ')
	select @p_customer_location_code = isnull(@p_customer_location_code, 'ZZZ')


		select @p_udf_xml = 
			'<inputparam>
				<assigned_to_emp_id>' + isnull(@p_assigned_to_engineer, '') + '</assigned_to_emp_id>
				<channel>mobile</channel>
			</inputparam>'
			
		execute sp_save_manage_call_register 
			@i_client_id, 
			@i_country_code, 
			@i_session_id, 
			@i_user_id, 
			@i_locale_id, 
			@p_customer_id, 
			@p_asset_id, 
			@p_asset_location, 
			@p_equipment_id,
			@p_problem_description, 
			'', 
			@i_user_id, 
			@p_logged_on_date, 
			@p_logged_on_hour, 
			@p_logged_on_minute,
			@p_customer_location_code, 
			@p_org_lvl_no, 
			@p_org_lvl_code, 
			'VI', 
			'SEVISIT',
			'', 
			@p_company_location_code, 
			@p_customer_contact_name, 
			@p_customer_contact_no, 
			@p_customer_contact_email,
			'NB', 
			'0', 
			'0', 
			'0', 
			'0', 
			@p_default_currency_code, 
			'', 
			'0', 
			'', 
			@p_assigned_to_engineer, 
			@p_udf_xml,
			@i_save_mode, 
			@i_rec_timestamp, 
			@p_update_status output, 
			@p_call_ref_no output, 
			@p_error_no output

		if @p_error_no != ''
		begin

			set @i_error_msg = '{"code":"error_call_insert"}'
			return	

		end


		insert into call_register_actions 
		(
		   company_id
		  ,country_code
		  ,call_ref_no
		  ,action_category
		  ,action_type
		  ,product_code
		  ,product_sub_code
		  ,requirement
		  ,sys_gen_call_ref_no
		  ,last_update_id
		)
		select @i_client_id,@i_country_code,@p_call_ref_no,
			  'LINK','VIAGAINSTSERV','NA', 'NA', 
			  'Add On Engineer',@p_call_no,
				@i_user_id

		
	set @o_outputparam_detail_xml = '{"ref_no":"' + @p_call_ref_no + '"}'
	set @o_update_status = 'SP001'
			
END




GO
