DROP PROCEDURE [dbo].[sp_save_manage_customer_loc_details]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
* Function to save customer location details
*/
CREATE PROCEDURE [dbo].[sp_save_manage_customer_loc_details]
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_customer_id [uddt_customer_id], 
    @i_cust_loc_code [uddt_varchar_10], 
    @i_location_name_short [uddt_nvarchar_50], 
    @i_location_name_long [uddt_nvarchar_100], 
    @i_address_line_1 [uddt_nvarchar_200], 
    @i_address_line_2 [uddt_nvarchar_200], 
    @i_address_line_3 [uddt_nvarchar_200], 
    @i_city [uddt_nvarchar_60], 
    @i_state [uddt_nvarchar_60], 
    @i_country [uddt_varchar_5], 
    @i_pincode [uddt_varchar_10], 
    @i_landline_1 [uddt_varchar_20], 
    @i_landline_2 [uddt_varchar_20], 
    @i_fax_no_1 [uddt_varchar_20], 
    @i_fax_no_2 [uddt_varchar_20], 
    @i_contact_person_1 [uddt_varchar_60], 
    @i_contact_person_1_mobile_no [uddt_varchar_20], 
    @i_contact_person_1_email_id [uddt_varchar_60], 
    @i_contact_person_2 [uddt_varchar_60], 
    @i_contact_person_2_mobile_no [uddt_varchar_20], 
    @i_contact_person_2_email_id [uddt_varchar_60], 
    @i_inputparam_udf_xml [uddt_nvarchar_max], 
    @i_rec_tstamp [uddt_uid_timestamp], 
    @i_save_mode [uddt_varchar_1], 
    @o_update_status [uddt_varchar_5] OUTPUT,
    @errorNo [errorno] OUTPUT
AS
BEGIN
/*
* Function to save customer location details
*/

--The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
--returned out of this stored procedure:
/*
SET /* Use SET | SELECT for assigning values */
@o_update_status = '' /* string */
@errorNo = ''	/* string */
*/


/* List of errors expected out of the stored procedure. Use the text of the error 
* messages printed below as a guidance to set appropriate error numbers to @errorNo inside the procedure.
* E_UP_031 - Update Customer Location Details Failed
* E_UP_005 - Update Failure : Record updated by another user. Please Retry the retrieval of the record and update.
*/



    declare @o_outputparam_1_xml nvarchar(max), @i_inputparam_1_xml nvarchar(max), @i_detail_data_1 sp_save_manage_custom_info_custom_info_detail

	declare @o_outputparam_2_xml nvarchar(max), @i_inputparam_2_xml nvarchar(max), @i_detail_data_2 sp_save_manage_custom_info_custom_info_detail							   
    declare @p_inputparam_xml xml,
			@p_execution_status varchar(10),
			@p_district nvarchar(20)

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
	  and information_type = 'CUSTLOCMAST'
	
set @p_district=isnull( (select paramval from #input_params where paramname ='district') ,'')	

if (@i_save_mode = 'A')
begin

 if not exists (select 1 from customer_location 
           where company_id = @i_client_id
             and country_code = @i_country_code
             and customer_id = @i_customer_id
             and location_code = @i_cust_loc_code)
 begin
    insert customer_location
    (
     company_id, customer_id, location_code,
     location_name_short, location_name_long,
      address_line_1, address_line_2,
     address_line_3, city, state_code, country_code, pincode,
     landline_1, landline_2, fax_no_1, fax_no_2, 
     contact_person_1, contact_person_1_mobile_no, 
     contact_person_1_email_id,
     contact_person_2, contact_person_2_mobile_no,
     contact_person_2_email_id,
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
    select @i_client_id,  @i_customer_id,
			@i_cust_loc_code, 
			@i_location_name_short,@i_location_name_long,
			@i_address_line_1, @i_address_line_2,
			@i_address_line_3, @i_city, @i_state, @i_country,
			@i_pincode, @i_landline_1, @i_landline_2, @i_fax_no_1, @i_fax_no_2,
			@i_contact_person_1, @i_contact_person_1_mobile_no,
			@i_contact_person_1_email_id,
			@i_contact_person_2, @i_contact_person_2_mobile_no,
			@i_contact_person_2_email_id,  
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
			where field_type = 'udf_char_5')
			when 1 then 	isnull( (select paramval from #input_params where paramname = 'udf_char_5') ,'')	
			else NULL
			end,
			case (select applicable from #applicable_custom_fields
			where field_type = 'udf_char_6')
			when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_6') ,'')
			else NULL
		   end,
					case (select applicable from #applicable_custom_fields
				 where field_type = 'udf_char_7')
			when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_7') ,'')
			else NULL
		   end,
			case (select applicable from #applicable_custom_fields
				 where field_type = 'udf_char_8')
			when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_8') ,'')
			else NULL
		   end,
			case (select applicable from #applicable_custom_fields
			where field_type = 'udf_char_9')
			when 1 then 	isnull( (select paramval from #input_params where paramname = 'udf_char_9') ,'')	
			else NULL
			end,
			case (select applicable from #applicable_custom_fields
			where field_type = 'udf_char_10')
			when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_10') ,'')
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
    
   if (@@ROWCOUNT = 0)
	begin
      select @errorNo = 'E_UP_031' 
	  return
	end
	 end
	 else
	 begin
		select  @errorNo = 'E_UP_031' 
		return
	 end   
	 
	 if @i_contact_person_1_mobile_no != ''
		begin
			if not exists (select 1 from customer_location_contacts
							where company_id = @i_client_id
								and country_code = @i_country_code
								and customer_id = @i_customer_id
								and location_code = @i_cust_loc_code
								and contact_phone_no = @i_contact_person_1_mobile_no)
			begin
				
				set @i_inputparam_1_xml = '<inputparam><contact_category>OWNER</contact_category><contact_type>OWNER</contact_type><customer_id>' + @i_customer_id + '</customer_id><location_code>'
					+ @i_cust_loc_code + '</location_code><first_name>' + @i_contact_person_1 + 
					'</first_name><middle_name></middle_name><last_name></last_name><address_line_1>' +
					@i_address_line_1 + '</address_line_1><address_line_2>' +
					@i_address_line_2 + '</address_line_2><address_line_3>' +
					@i_address_line_3 + '</address_line_3><designation></designation><department></department><contact_phone_no>' 
					+ @i_contact_person_1_mobile_no + '</contact_phone_no><email_id_1>'
					+ @i_contact_person_1_email_id + '</email_id_1><country>' + @i_country + '</country><state>' + @i_state + 
					'</state><district>' + @p_district
					+ '</district><city>' + @i_city + '</city><pin_code>' + @i_pincode + '</pin_code></inputparam>'

				execute sp_save_manage_custom_info @i_session_id, @i_user_id, @i_client_id, @i_locale_id,
					@i_country_code, 'customer_location_contacts', @i_customer_id, @i_cust_loc_code,
					@i_inputparam_1_xml, @i_rec_tstamp, @i_save_mode, @o_outputparam_1_xml OUTPUT,
					@o_update_status OUTPUT, @i_detail_data_1, @errorNo
					
				if @o_update_status != 'SP001'
				begin
					set @errorNo =  'E_UP_031'
					return	  
				end
			end
		end

		if @i_contact_person_2_mobile_no != ''
		begin
			if not exists (select 1 from customer_location_contacts
							where company_id = @i_client_id
								and country_code = @i_country_code
								and customer_id = @i_customer_id
								and location_code = @i_cust_loc_code
								and contact_phone_no = @i_contact_person_2_mobile_no)
			begin
				
				set @i_inputparam_2_xml = '<inputparam><contact_category>SITEINCHG</contact_category><contact_type>SITEINCHG</contact_type><customer_id>' + @i_customer_id + '</customer_id><location_code>'
					+ @i_cust_loc_code + '</location_code><first_name>' + @i_contact_person_2 + 
					'</first_name><middle_name></middle_name><last_name></last_name><address_line_1>' +
					@i_address_line_1 + '</address_line_1><address_line_2>' +
					@i_address_line_2 + '</address_line_2><address_line_3>' +
					@i_address_line_3 + '</address_line_3><designation></designation><department></department><contact_phone_no>' 
					+ @i_contact_person_2_mobile_no + '</contact_phone_no><email_id_1>'
					+ @i_contact_person_2_email_id + '</email_id_1><country>' + @i_country + '</country><state>' + @i_state + 
					'</state><district>' + @p_district
					+ '</district><city>' + @i_city + '</city><pin_code>' + @i_pincode + '</pin_code></inputparam>'

				execute sp_save_manage_custom_info @i_session_id, @i_user_id, @i_client_id, @i_locale_id,
					@i_country_code, 'customer_location_contacts', @i_customer_id, @i_cust_loc_code,
					@i_inputparam_2_xml, @i_rec_tstamp, @i_save_mode, @o_outputparam_2_xml OUTPUT,
					@o_update_status OUTPUT, @i_detail_data_2, @errorNo

				if @o_update_status != 'SP001'
				begin
					set @errorNo =  'E_UP_031'
					return	  
				end
			end
		end
		


	select @o_update_status = 'SP001'    
	
end
else if (@i_save_mode = 'U')
begin
 if exists (select 1 from customer_location 
           where company_id = @i_client_id
             and country_code = @i_country_code
             and customer_id = @i_customer_id
             and location_code = @i_cust_loc_code)
 begin
 
    update customer_location
    set location_name_short = @i_location_name_short,
		location_name_long = @i_location_name_long,
		address_line_1 = @i_address_line_1,
		address_line_2 = @i_address_line_2,
		address_line_3 = @i_address_line_3,
		city = @i_city,
		state_code = @i_state,
		country_code = @i_country,
		pincode = @i_pincode,
		landline_1 = @i_landline_1,
		landline_2 = @i_landline_2,
		fax_no_1 = @i_fax_no_1,
		fax_no_2 = @i_fax_no_2,
		contact_person_1 = @i_contact_person_1,
		contact_person_1_email_id = @i_contact_person_1_email_id,
		contact_person_1_mobile_no = @i_contact_person_1_mobile_no,
		contact_person_2 = @i_contact_person_2,
		contact_person_2_email_id = @i_contact_person_2_email_id,
		contact_person_2_mobile_no = @i_contact_person_2_mobile_no,
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
	 	udf_char_5 = case (select applicable from #applicable_custom_fields
			where field_type = 'udf_char_5')
			when 1 then 	isnull( (select paramval from #input_params where paramname = 'udf_char_5') ,'')	
			else NULL
			end,
		udf_char_6 =case (select applicable from #applicable_custom_fields
			where field_type = 'udf_char_6')
			when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_6') ,'')
			else NULL
		   end,
		udf_char_7 = case (select applicable from #applicable_custom_fields
				 where field_type = 'udf_char_7')
			when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_7') ,'')
			else NULL
		   end,
		udf_char_8=	case (select applicable from #applicable_custom_fields
				 where field_type = 'udf_char_8')
			when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_8') ,'')
			else NULL
		   end,
		udf_char_9=	case (select applicable from #applicable_custom_fields
			where field_type = 'udf_char_9')
			when 1 then 	isnull( (select paramval from #input_params where paramname = 'udf_char_9') ,'')	
			else NULL
			end,
		udf_char_10=	case (select applicable from #applicable_custom_fields
			where field_type = 'udf_char_10')
			when 1 then isnull( (select paramval from #input_params where paramname = 'udf_char_10') ,'')
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
      and customer_id = @i_customer_id
      and location_code = @i_cust_loc_code
              
    if (@@ROWCOUNT != 0)
      select @errorNo = ''
    else
      select @errorNo = 'E_UP_031'
 
 end
 else
    select @errorNo = 'E_UP_031'
  
  
if @i_contact_person_1_mobile_no != ''
		begin
			if not exists (select 1 from customer_location_contacts
							where company_id = @i_client_id
								and country_code = @i_country_code
								and customer_id = @i_customer_id
								and location_code = @i_cust_loc_code
								and contact_phone_no = @i_contact_person_1_mobile_no)
			begin
				
				set @i_inputparam_1_xml = '<inputparam><contact_category>OWNER</contact_category><contact_type>OWNER</contact_type><customer_id>' + @i_customer_id + '</customer_id><location_code>'
					+ @i_cust_loc_code + '</location_code><first_name>' + @i_contact_person_1 + 
					'</first_name><middle_name></middle_name><last_name></last_name><address_line_1>' +
					@i_address_line_1 + '</address_line_1><address_line_2>' +
					@i_address_line_2 + '</address_line_2><address_line_3>' +
					@i_address_line_3 + '</address_line_3><designation></designation><department></department><contact_phone_no>' 
					+ @i_contact_person_1_mobile_no + '</contact_phone_no><email_id_1>'
					+ @i_contact_person_1_email_id + '</email_id_1><country>' + @i_country + '</country><state>' + @i_state + 
					'</state><district>' + @p_district
					+ '</district><city>' + @i_city + '</city><pin_code>' + @i_pincode + '</pin_code></inputparam>'

				execute sp_save_manage_custom_info @i_session_id, @i_user_id, @i_client_id, @i_locale_id,
					@i_country_code, 'customer_location_contacts', @i_customer_id, @i_cust_loc_code,
					@i_inputparam_1_xml, '00000000-0000-0000-0000-000000000000', 'A', @o_outputparam_1_xml OUTPUT,
					@o_update_status OUTPUT, @i_detail_data_1, @errorNo

				if @o_update_status != 'SP001'
				begin
					set @errorNo =  'E_UP_031'
					return	  
				end
			end
		end

		if @i_contact_person_2_mobile_no != ''
		begin
			if not exists (select 1 from customer_location_contacts
							where company_id = @i_client_id
								and country_code = @i_country_code
								and customer_id = @i_customer_id
								and location_code = @i_cust_loc_code
								and contact_phone_no = @i_contact_person_2_mobile_no)
			begin
				
				set @i_inputparam_2_xml = '<inputparam><contact_category>SITEINCHG</contact_category><contact_type>SITEINCHG</contact_type><customer_id>' + @i_customer_id + '</customer_id><location_code>'
					+ @i_cust_loc_code + '</location_code><first_name>' + @i_contact_person_2 + 
					'</first_name><middle_name></middle_name><last_name></last_name><address_line_1>' +
					@i_address_line_1 + '</address_line_1><address_line_2>' +
					@i_address_line_2 + '</address_line_2><address_line_3>' +
					@i_address_line_3 + '</address_line_3><designation></designation><department></department><contact_phone_no>' 
					+ @i_contact_person_2_mobile_no + '</contact_phone_no><email_id_1>'
					+ @i_contact_person_2_email_id + '</email_id_1><country>' + @i_country + '</country><state>' + @i_state + 
					'</state><district>' + @p_district
					+ '</district><city>' + @i_city + '</city><pin_code>' + @i_pincode + '</pin_code></inputparam>'

				execute sp_save_manage_custom_info @i_session_id, @i_user_id, @i_client_id, @i_locale_id,
					@i_country_code, 'customer_location_contacts', @i_customer_id, @i_cust_loc_code,
					@i_inputparam_2_xml, '00000000-0000-0000-0000-000000000000', 'A', @o_outputparam_2_xml OUTPUT,
					@o_update_status OUTPUT, @i_detail_data_2, @errorNo

				if @o_update_status != 'SP001'
				begin
					set @errorNo =  'E_UP_031'
					return	  
				end
			end
		end

end	

 select @o_update_status = 'SP001'

SET NOCOUNT ON
END
GO
