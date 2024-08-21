
DROP PROCEDURE IF EXISTS[dbo].[sp_save_manage_custom_info_customer_location_contacts]


SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_save_manage_custom_info_customer_location_contacts] 
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
    @errorNo [errorno] OUTPUT
AS
BEGIN
    /*
     * Function to save custom info
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
     * E_UP_005 - Update Failure : Record updated by another user. Please Retry the retrieval of the record and update.
     * E_UP_251 - Failed saving Information
     * 
     * Use the following SQL statement to set @errorNo:
     * SET @errorNo = 'One of the error numbers associated to this procedure as per list above'
     */

	declare @p_inputparam_header_xml xml, 
		@p_inputparam_deatil_xml xml,
		@p_sysdatetimeoffset datetimeoffset(7),
		@p_custom_info_detail_sl_no tinyint, 
		@p_custom_info_detail_inputparam_detail_xml nvarchar(max),
		@p_custom_info_detail_crud_ind varchar(1),
		@p_employee_id nvarchar(12),
		@p_city_name nvarchar(30),
		@p_default_locale varchar(5), 
												
		@p_timezone_id tinyint,
		@p_default_password varchar(255)
											
	
	select @p_sysdatetimeoffset = dbo.fn_sysdatetimeoffset(@i_client_id, @i_country_code, @i_user_id)

	select @p_default_locale = default_locale_id,
		@p_timezone_id = timezone_id
	from company_location
	where company_id = @i_client_id
		and country_code = @i_country_code
		and location_code = 'CHN'

	select @o_update_status = ''
			
	select @p_employee_id = employee_id
	from users 
	where company_id = @i_client_id
	  and country_code = @i_country_code
	  and user_id = @i_user_id

	if @p_employee_id = null set @p_employee_id = 'system'
	
	set @errorNo = ''

	create table #input_params_header
	(
	paramname varchar(100) not null,
	paramval nvarchar(1000) null
	)

	create table #input_params_detail
	(
		paramname nvarchar(100) not null,
		paramval nvarchar(max) not null
	)

	set @p_inputparam_header_xml = +CAST(replace(@i_inputparam_header_xml,'\/','/') as XML)

	insert #input_params_header
	(paramname, paramval)
	SELECT nodes.value('local-name(.)', 'varchar(100)'),
			nodes.value('(.)[1]', 'nvarchar(1000)')
	FROM @p_inputparam_header_xml.nodes('/inputparam/*') AS Tbl(nodes)

	update #input_params_header
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
	  and information_type = 'CUSTOMERLOCCON'

	set @p_city_name =  (select city_name from city_master cm 
	                               where cm.country_code = @i_country_code
								        and cm.city_code =  (select paramval from #input_params_header where paramname = 'city'))

	if @p_city_name is null or @p_city_name = ''
	begin
		set @p_city_name = 'NA'
	end
	
	if (@i_save_mode = 'A')
	begin

		if exists (select 1 from customer_location
           where company_id = @i_client_id
             and country_code = @i_country_code
             and customer_id = @i_custom_info_ref_no1 
			 and location_code = @i_custom_info_ref_no2)
		begin
		
				 insert customer_location_contacts
					(
					 company_id, customer_id, location_code,
					 contact_category, contact_type,
					 contact_verification_stage,contact_verification_status,
					 title,first_name, middle_name, last_name,
					 address_line_1, address_line_2,
					 address_line_3,district, city, 
					 city_code,
					 state_code, 
					 country_code, pincode,
					 contact_phone_no, email_id, designation, department, creation_date,
					 udf_char_1,udf_char_2,udf_char_3,udf_char_4,
					 udf_char_5, udf_char_6, udf_char_7, udf_char_8,
					 udf_char_9, udf_char_10,
					 udf_float_1,udf_float_2,udf_float_3,udf_float_4,
					 udf_bit_1,udf_bit_2,udf_bit_3,udf_bit_4,
					 udf_date_1,udf_date_2,udf_date_3,udf_date_4,
					 udf_analysis_code1,udf_analysis_code2,
					 udf_analysis_code3,udf_analysis_code4,
					 last_update_id
					)
				
						select @i_client_id,
						@i_custom_info_ref_no1,
						@i_custom_info_ref_no2,
						isnull((select paramval from #input_params_header where paramname = 'contact_category') ,''), 
						isnull((select paramval from #input_params_header where paramname = 'contact_type') ,''),
						1, 'UV',
						isnull((select paramval from #input_params_header where paramname = 'title') ,'Mr/Ms'),
						isnull((select paramval from #input_params_header where paramname = 'first_name') ,''),
						isnull((select paramval from #input_params_header where paramname = 'middle_name') ,''),
						isnull((select paramval from #input_params_header where paramname = 'last_name') ,''),
						isnull((select paramval from #input_params_header where paramname = 'address_line_1') ,''),
						isnull((select paramval from #input_params_header where paramname = 'address_line_2') ,''),
						isnull((select paramval from #input_params_header where paramname = 'address_line_3') ,''),
						isnull((select paramval from #input_params_header where paramname = 'district') ,''),
						@p_city_name,
						isnull((select paramval from #input_params_header where paramname = 'city') ,''),
						isnull((select paramval from #input_params_header where paramname = 'state') ,''),
						@i_country_code,
						isnull((select paramval from #input_params_header where paramname = 'pin_code') ,''),
						isnull((select paramval from #input_params_header where paramname = 'contact_phone_no') ,''),
						isnull((select paramval from #input_params_header where paramname = 'email_id_1') ,''),
						isnull((select paramval from #input_params_header where paramname = 'designation') ,''),
						isnull((select paramval from #input_params_header where paramname = 'department') ,''),
						@p_sysdatetimeoffset, 
							case (select applicable from #applicable_custom_fields
									where field_type = 'udf_char_1')
							when 1 then 	isnull((select paramval from #input_params_header where paramname = 'udf_char_1') ,'')	
							else NULL
							end,
							case (select applicable from #applicable_custom_fields
							where field_type = 'udf_char_2')
							when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_2') ,'')
							else NULL
						    end,
							case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_char_3')
							when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_3') ,'')
							else NULL
							 end,
								case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_char_4')
								when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_4') ,'')
								else NULL
							   end,
								case (select applicable from #applicable_custom_fields
								where field_type = 'udf_char_5')
								when 1 then 	isnull((select paramval from #input_params_header where paramname = 'udf_char_5') ,'')	
								else NULL
								end,
								case (select applicable from #applicable_custom_fields
								where field_type = 'udf_char_6')
								when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_6') ,'')
								else NULL
							   end,
										case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_char_7')
								when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_7') ,'')
								else NULL
							   end,
								case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_char_8')
								when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_8') ,'')
								else NULL
							   end,
								case (select applicable from #applicable_custom_fields
								where field_type = 'udf_char_9')
								when 1 then 	isnull((select paramval from #input_params_header where paramname = 'udf_char_9') ,'')	
								else NULL
								end,
								case (select applicable from #applicable_custom_fields
								where field_type = 'udf_char_10')
								when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_10') ,'')
								else NULL
							   end,
							
								case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_float_1')
								when 1 then isnull((select cast(paramval as float) from #input_params_header where paramname = 'udf_float_1') ,0)
								else NULL
							   end,
							   case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_float_2')
								when 1 then isnull((select cast(paramval as float) from #input_params_header where paramname = 'udf_float_2') ,'')
								else NULL
							   end,
							   case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_float_3')
								when 1 then isnull((select cast(paramval as float) from #input_params_header where paramname = 'udf_float_3') ,0)
								else NULL
							   end,
							  case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_float_4')
								when 1 then isnull((select cast(paramval as float) from #input_params_header where paramname = 'udf_float_4') ,0)
								else NULL
							   end,
							case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_bit_1')
								when 1 then isnull((select cast(paramval as bit) from #input_params_header where paramname = 'udf_bit_1') ,0)
								else NULL
							   end,
							case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_bit_2')
								when 1 then isnull((select cast(paramval as bit) from #input_params_header where paramname = 'udf_bit_2') ,0)
								else NULL
							   end,
							case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_bit_3')
								when 1 then isnull((select cast(paramval as bit) from #input_params_header where paramname = 'udf_bit_3') ,0)
								else NULL
							   end,
							case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_bit_4')
								when 1 then isnull((select cast(paramval as bit) from #input_params_header where paramname = 'udf_bit_4') ,0)
								else NULL
							   end,
						   case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_date_1')
								when 1 then 
								isnull((select CONVERT(datetimeoffset,
								 (select x.paramval from #input_params_header x where x.paramname = 'udf_date_1')
								+' ' +
								 (select y.paramval from #input_params_header y where y.paramname = 'udf_date_1_hour')
								 + ':' + 
								 (select z.paramval from #input_params_header z where z.paramname = 'udf_date_1_minute')
								 +':00',120)), sysdatetimeoffset())
								else NULL
							   end,
							case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_date_2')
								when 1 then 
								isnull((select CONVERT(datetimeoffset,
								 (select x.paramval from #input_params_header x where x.paramname = 'udf_date_2')
								+' ' +
								 (select y.paramval from #input_params_header y where y.paramname = 'udf_date_2_hour')
								 + ':' + 
								 (select z.paramval from #input_params_header z where z.paramname = 'udf_date_2_minute')
								 +':00',120)), sysdatetimeoffset())
								else NULL
							   end,
							case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_date_3')
								when 1 then
								isnull((select CONVERT(datetimeoffset,
								 (select x.paramval from #input_params_header x where x.paramname = 'udf_date_3')
								+' ' +
								 (select y.paramval from #input_params_header y where y.paramname = 'udf_date_3_hour')
								 + ':' + 
								 (select z.paramval from #input_params_header z where z.paramname = 'udf_date_3_minute')
								 +':00',120)), sysdatetimeoffset())
								else NULL
							   end,
							case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_date_4')
								when 1 then 
								isnull((select CONVERT(datetimeoffset,
								 (select x.paramval from #input_params_header x where x.paramname = 'udf_date_4')
								+' ' +
								 (select y.paramval from #input_params_header y where y.paramname = 'udf_date_4_hour')
								 + ':' + 
								 (select z.paramval from #input_params_header z where z.paramname = 'udf_date_4_minute')
								 +':00',120)), sysdatetimeoffset())
									else NULL
							   end,
							case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_analysis_code1')
								when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_analysis_code1') ,'')
								else NULL
							   end,
							case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_analysis_code2')
								when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_analysis_code2') ,'')
								else NULL
							   end,
							case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_analysis_code3')
								when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_analysis_code3') ,'')
								else NULL
							   end,
							case (select applicable from #applicable_custom_fields
									 where field_type = 'udf_analysis_code4')
								when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_analysis_code4') ,'')
								else NULL
							   end,
								@i_user_id
				
						if (@@ROWCOUNT = 0)
						begin
							select  @errorNo = 'E_UP_030'
							return
						end
			end /* if customer id is not blank */
		else
		begin /* if customer id is blank */
			select  @errorNo = 'E_UP_030'
			return
		end

		if not exists (select 1 from customer_user_mapping
						where company_id = @i_client_id
						 and country_code = @i_country_code
						 and customer_id = @i_custom_info_ref_no1 
						 and customer_location_code = @i_custom_info_ref_no2
						 and user_id = ltrim(rtrim(SUBSTRING((select paramval from #input_params_header where paramname = 'contact_phone_no'),
				CHARINDEX('-',(select paramval from #input_params_header where paramname = 'contact_phone_no'))+1,
				LEN((select paramval from #input_params_header where paramname = 'contact_phone_no'))))))
		begin
			
			insert customer_user_mapping 
			(
				company_id, 
				country_code, 
				customer_id,
				customer_location_code, 
				user_id, 
				last_update_id
			)
			select @i_client_id, 
				@i_country_code, 
				@i_custom_info_ref_no1, 
				@i_custom_info_ref_no2, 
				ltrim(rtrim(SUBSTRING((select paramval from #input_params_header where paramname = 'contact_phone_no'),
				CHARINDEX('-',(select paramval from #input_params_header where paramname = 'contact_phone_no'))+1,
				LEN((select paramval from #input_params_header where paramname = 'contact_phone_no'))))), 
				@i_user_id

			if (@@ROWCOUNT = 0)
			begin
				select  @errorNo = 'E_UP_030'
				return
			end

		end

		if not exists ( select 1 from employee
			where company_id = @i_client_id
				and country_code = @i_country_code
				and employee_id = ltrim(rtrim(SUBSTRING((select paramval from #input_params_header where paramname = 'contact_phone_no'),
				CHARINDEX('-',(select paramval from #input_params_header where paramname = 'contact_phone_no'))+1,
				LEN((select paramval from #input_params_header where paramname = 'contact_phone_no'))))))
		begin
			
			insert employee 
			(
				company_id, 
				country_code, 
				employee_id, 
				first_name, 
				middle_name, 
				last_name, 
				title, 
				location_code,
				organogram_level_no, 
				organogram_level_code, 
				supervisor_emp_id, 
				employee_status,
				contact_mobile_no, 
				email_id, 
				photo_reference, 
				last_update_id
			)
			select @i_client_id, 
				@i_country_code, 
				ltrim(rtrim(SUBSTRING((select paramval from #input_params_header where paramname = 'contact_phone_no'),
				CHARINDEX('-',(select paramval from #input_params_header where paramname = 'contact_phone_no'))+1,
				LEN((select paramval from #input_params_header where paramname = 'contact_phone_no'))))), 
				isnull((select paramval from #input_params_header where paramname = 'first_name') ,''),
				isnull((select paramval from #input_params_header where paramname = 'middle_name') ,''),
				isnull((select paramval from #input_params_header where paramname = 'last_name') ,''),
				isnull((select paramval from #input_params_header where paramname = 'title') ,'Mr/Ms'),
				'CHN',
				'1', 
				'MVGL', 
				'', 
				'A',
				isnull((select paramval from #input_params_header where paramname = 'contact_phone_no') ,''),
				isnull((select paramval from #input_params_header where paramname = 'email_id_1') ,''),
				'', 
				@i_user_id

			if (@@ROWCOUNT = 0)
			begin

				select  @errorNo = 'E_UP_030'
				return

			end

			insert functional_role_employee
			(
				company_id, 
				country_code, 
				functional_role_id, 
				employee_id,
				reporting_to_functional_role_id, 
				reporting_to_employee_id,
				mapped_to_functional_role_id, 
				mapped_to_employee_id,
				last_update_id
			)
			select @i_client_id, 
				@i_country_code, 
				'CUST_OWNER', 
				ltrim(rtrim(SUBSTRING((select paramval from #input_params_header where paramname = 'contact_phone_no'),
				CHARINDEX('-',(select paramval from #input_params_header where paramname = 'contact_phone_no'))+1,
				LEN((select paramval from #input_params_header where paramname = 'contact_phone_no'))))), 
				'', 
				'', 
				'', 
				'', 
				@i_user_id

			if (@@ROWCOUNT = 0)	
			begin

				set @errorNo = 'E_UP_030'
				return

			end

		end

		if not exists ( select 1 from users
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_id = ltrim(rtrim(SUBSTRING((select paramval from #input_params_header where paramname = 'contact_phone_no'),
				CHARINDEX('-',(select paramval from #input_params_header where paramname = 'contact_phone_no'))+1,
				LEN((select paramval from #input_params_header where paramname = 'contact_phone_no'))))))
		begin
			
			set @p_default_password = ''

			execute sp_pick_new_password 
				@i_client_id, 
				@i_user_id, 
				@i_country_code, 
				'', 
				@p_default_password OUTPUT
			
			insert users
			(
				company_id, 
				country_code, 
				user_id, 
				employee_id, 
				login_password, 
				default_password_ind, 
				user_group_id,
				active_ind, 
				default_locale_id, 
				default_timezone_id,
				last_update_id
			)
			select @i_client_id, 
				@i_country_code, 
				ltrim(rtrim(SUBSTRING((select paramval from #input_params_header where paramname = 'contact_phone_no'),
				CHARINDEX('-',(select paramval from #input_params_header where paramname = 'contact_phone_no'))+1,
				LEN((select paramval from #input_params_header where paramname = 'contact_phone_no'))))), 
				ltrim(rtrim(SUBSTRING((select paramval from #input_params_header where paramname = 'contact_phone_no'),
				CHARINDEX('-',(select paramval from #input_params_header where paramname = 'contact_phone_no'))+1,
				LEN((select paramval from #input_params_header where paramname = 'contact_phone_no'))))), 
				@p_default_password, 
				'Y', 
				'custowner', 
				0, 
				@p_default_locale, 
				@p_timezone_id,
				@i_user_id

			if (@@ROWCOUNT = 0)
			begin

				select  @errorNo = 'E_UP_030'
				return

			end

		end

	end
		
	else if (@i_save_mode = 'U')
	begin
		 if exists (select 1 from customer_location_contacts 
           where company_id = @i_client_id
             and country_code = @i_country_code
             and customer_id = @i_custom_info_ref_no1
			 and location_code = (select paramval from #input_params_header where paramname = 'location_code')
             and contact_phone_no = @i_custom_info_ref_no2)
	  	begin


			   update customer_location_contacts
				set contact_category	= isnull((select paramval from #input_params_header where paramname = 'contact_category') ,''),
					contact_type		= isnull((select paramval from #input_params_header where paramname = 'contact_type') ,''),
					title				= isnull((select paramval from #input_params_header where paramname = 'title') ,'Mr/Ms'),
					first_name			= isnull((select paramval from #input_params_header where paramname = 'first_name') ,''),
					middle_name			= isnull((select paramval from #input_params_header where paramname = 'middle_name') ,''),
                    last_name			= isnull((select paramval from #input_params_header where paramname = 'last_name') ,''),
					address_line_1		= isnull((select paramval from #input_params_header where paramname = 'address_line_1') ,''),
					address_line_2		= isnull((select paramval from #input_params_header where paramname = 'address_line_2') ,''),
					address_line_3		= isnull((select paramval from #input_params_header where paramname = 'address_line_3') ,''),
					city                = @p_city_name,
					city_code			= isnull((select paramval from #input_params_header where paramname = 'city') ,''),
					district			= isnull((select paramval from #input_params_header where paramname = 'district') ,''),
					contact_phone_no	= isnull((select paramval from #input_params_header where paramname = 'contact_phone_no') ,''),
					pincode				= isnull((select paramval from #input_params_header where paramname = 'pin_code') ,''),
					email_id			= isnull((select paramval from #input_params_header where paramname = 'email_id_1') ,''),
					designation			= isnull((select paramval from #input_params_header where paramname = 'designation') ,''),
					department			= isnull((select paramval from #input_params_header where paramname = 'designation') ,''),
					udf_char_1 = case (select applicable from #applicable_custom_fields
									where field_type = 'udf_char_1')
								when 1 then 	isnull((select paramval from #input_params_header where paramname = 'udf_char_1') ,'')	
		
						else NULL
								end,
				 udf_char_2 = case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_char_2')
						when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_2') ,'')
						else NULL
					   end,
				 udf_char_3 =   case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_char_3')
						when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_3') ,'')
						else NULL
					   end,
				 udf_char_4 =	   case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_char_4')
						when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_4') ,'')
						else NULL
					   end,
	 				udf_char_5 = case (select applicable from #applicable_custom_fields
						where field_type = 'udf_char_5')
						when 1 then 	isnull((select paramval from #input_params_header where paramname = 'udf_char_5') ,'')	
						else NULL
						end,
					udf_char_6 =case (select applicable from #applicable_custom_fields
						where field_type = 'udf_char_6')
						when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_6') ,'')
						else NULL
					   end,
					udf_char_7 = case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_char_7')
						when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_7') ,'')
						else NULL
					   end,
					udf_char_8=	case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_char_8')
						when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_8') ,'')
						else NULL
					   end,
					udf_char_9=	case (select applicable from #applicable_custom_fields
						where field_type = 'udf_char_9')
						when 1 then 	isnull((select paramval from #input_params_header where paramname = 'udf_char_9') ,'')	
						else NULL
						end,
					udf_char_10=	case (select applicable from #applicable_custom_fields
						where field_type = 'udf_char_10')
						when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_char_10') ,'')
						else NULL
					   end,
		
				 udf_float_1=	   case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_float_1')
						when 1 then isnull((select cast(paramval as float) from #input_params_header where paramname = 'udf_float_1') ,0)
						else NULL
					   end,
				 udf_float_2=	   case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_float_2')
						when 1 then isnull((select cast(paramval as float) from #input_params_header where paramname = 'udf_float_2') ,'')
						else NULL
					   end,
				udf_float_3=	   case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_float_3')
						when 1 then isnull((select cast(paramval as float) from #input_params_header where paramname = 'udf_float_3') ,0)
						else NULL
					   end,
				udf_float_4 =  case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_float_4')
						when 1 then isnull((select cast(paramval as float) from #input_params_header where paramname = 'udf_float_4') ,0)
						else NULL
					   end,
				udf_bit_1 = case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_bit_1')
						when 1 then isnull((select cast(paramval as bit) from #input_params_header where paramname = 'udf_bit_1') ,0)
						else NULL
					   end,
				udf_bit_2 = case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_bit_2')
						when 1 then isnull((select cast(paramval as bit) from #input_params_header where paramname = 'udf_bit_2') ,0)
						else NULL
					   end,
				udf_bit_3= case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_bit_3')
						when 1 then isnull((select cast(paramval as bit) from #input_params_header where paramname = 'udf_bit_3') ,0)
						else NULL
					   end,
				udf_bit_4= case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_bit_4')
						when 1 then isnull((select cast(paramval as bit) from #input_params_header where paramname = 'udf_bit_4') ,0)
						else NULL
					   end,
				udf_date_1=	   case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_date_1')
						when 1 then 
						isnull((select CONVERT(datetimeoffset,
						 (select x.paramval from #input_params_header x where x.paramname = 'udf_date_1')
						+' ' +
						 (select y.paramval from #input_params_header y where y.paramname = 'udf_date_1_hour')
						 + ':' + 
						 (select z.paramval from #input_params_header z where z.paramname = 'udf_date_1_minute')
						 +':00',120)), sysdatetimeoffset())
						else NULL
					   end,
				udf_date_2 = case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_date_2')
						when 1 then 
						isnull((select CONVERT(datetimeoffset,
						 (select x.paramval from #input_params_header x where x.paramname = 'udf_date_2')
						+' ' +
						 (select y.paramval from #input_params_header y where y.paramname = 'udf_date_2_hour')
						 + ':' + 
						 (select z.paramval from #input_params_header z where z.paramname = 'udf_date_2_minute')
						 +':00',120)), sysdatetimeoffset())
						else NULL
					   end,
				udf_date_3 = case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_date_3')
						when 1 then
						isnull((select CONVERT(datetimeoffset,
						 (select x.paramval from #input_params_header x where x.paramname = 'udf_date_3')
						+' ' +
						 (select y.paramval from #input_params_header y where y.paramname = 'udf_date_3_hour')
						 + ':' + 
						 (select z.paramval from #input_params_header z where z.paramname = 'udf_date_3_minute')
						 +':00',120)), sysdatetimeoffset())
						else NULL
					   end,
				udf_date_4 = case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_date_4')
						when 1 then 
						isnull((select CONVERT(datetimeoffset,
						 (select x.paramval from #input_params_header x where x.paramname = 'udf_date_4')
						+' ' +
						 (select y.paramval from #input_params_header y where y.paramname = 'udf_date_4_hour')
						 + ':' + 
						 (select z.paramval from #input_params_header z where z.paramname = 'udf_date_4_minute')
						 +':00',120)), sysdatetimeoffset())
							else NULL
					   end,
				udf_analysis_code1 = case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_analysis_code1')
						when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_analysis_code1') ,'')
						else NULL
					   end,
				udf_analysis_code2 = case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_analysis_code2')
						when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_analysis_code2') ,'')
						else NULL
					   end,
				udf_analysis_code3 = case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_analysis_code3')
						when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_analysis_code3') ,'')
						else NULL
					   end,
				udf_analysis_code4 = case (select applicable from #applicable_custom_fields
							 where field_type = 'udf_analysis_code4')
						when 1 then isnull((select paramval from #input_params_header where paramname = 'udf_analysis_code4') ,'')
						else NULL
					   end,
					last_update_id = @p_employee_id
				where company_id = @i_client_id
				  and country_code = @i_country_code
				  and customer_id = @i_custom_info_ref_no1
				  and location_code = (select paramval from #input_params_header where paramname = 'location_code')
				  and contact_phone_no = @i_custom_info_ref_no2
   

		end
		else
			begin /* if Customer id is blank */
				select  @errorNo = 'E_UP_030'
				return
			end

	end

	if exists (select 1 from customer_user_mapping_to_assets
					where company_id = @i_client_id
						and country_code = @i_country_code
						and customer_id = @i_custom_info_ref_no1 
						and customer_location_code = (select paramval from #input_params_header where paramname = 'location_code')
						and employee_id = ltrim(rtrim(SUBSTRING((select paramval from #input_params_header where paramname = 'contact_phone_no'),
				CHARINDEX('-',(select paramval from #input_params_header where paramname = 'contact_phone_no'))+1,
				LEN((select paramval from #input_params_header where paramname = 'contact_phone_no'))))))
	begin

		delete from customer_user_mapping_to_assets
		where company_id = @i_client_id
			and country_code = @i_country_code
			and customer_id = @i_custom_info_ref_no1 
			and customer_location_code = (select paramval from #input_params_header where paramname = 'location_code')
			and employee_id = ltrim(rtrim(SUBSTRING((select paramval from #input_params_header where paramname = 'contact_phone_no'),
				CHARINDEX('-',(select paramval from #input_params_header where paramname = 'contact_phone_no'))+1,
				LEN((select paramval from #input_params_header where paramname = 'contact_phone_no')))))
		
	end

	declare custom_info_detail_cursor cursor for 
	select i_custom_info_detail_sl_no, 
		i_custom_info_detail_inputparam_detail_xml,
		i_custom_info_detail_crud_ind
	from @custom_info_detail

	open custom_info_detail_cursor

	fetch custom_info_detail_cursor into 
		@p_custom_info_detail_sl_no, 
		@p_custom_info_detail_inputparam_detail_xml,
		@p_custom_info_detail_crud_ind

	while (@@FETCH_STATUS = 0)
	begin

		set @p_inputparam_deatil_xml = CAST(@p_custom_info_detail_inputparam_detail_xml as XML)

		truncate table #input_params_detail

		insert #input_params_detail
		(paramname, paramval)
		SELECT nodes.value('local-name(.)', 'nvarchar(100)'),
				nodes.value('(.)[1]', 'nvarchar(max)')
		FROM @p_inputparam_deatil_xml.nodes('/*') AS Tbl(nodes)

		if (select paramval from #input_params_detail where paramname = 'applicable_ind') = '1'
		begin

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
				@i_custom_info_ref_no1,
				(select paramval from #input_params_header where paramname = 'location_code'), 
				ltrim(rtrim(SUBSTRING((select paramval from #input_params_header where paramname = 'contact_phone_no'),
				CHARINDEX('-',(select paramval from #input_params_header where paramname = 'contact_phone_no'))+1,
				LEN((select paramval from #input_params_header where paramname = 'contact_phone_no'))))),
				b.equipment_category, 
				b.equipment_type, 
				a.equipment_id, 
				a.asset_id, 
				@i_user_id
			from asset_master a, equipment b
			where a.company_id = @i_client_id
				and a.country_code = @i_country_code
				and a.customer_id = @i_custom_info_ref_no1
				and a.asset_status = 'A'
				and a.asset_id = (select paramval from #input_params_detail where paramname = 'asset_id')
				and b.company_id = a.company_id
				and b.country_code = a.country_code
				and b.equipment_id = a.equipment_id	

			if (@@ROWCOUNT = 0)
			begin
				select  @errorNo = 'E_UP_030'
				return
			end

		end

		fetch custom_info_detail_cursor into 
			@p_custom_info_detail_sl_no, 
			@p_custom_info_detail_inputparam_detail_xml,
			@p_custom_info_detail_crud_ind

	end

	close custom_info_detail_cursor
	deallocate custom_info_detail_cursor

	set @o_update_status = 'SP001'

    SET NOCOUNT OFF;
END



GO
