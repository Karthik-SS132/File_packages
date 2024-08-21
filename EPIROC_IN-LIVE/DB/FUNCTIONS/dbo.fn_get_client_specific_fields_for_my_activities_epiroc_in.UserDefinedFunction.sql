DROP FUNCTION IF EXISTS [dbo].[fn_get_client_specific_fields_for_my_activities_epiroc_in]
Go
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[fn_get_client_specific_fields_for_my_activities_epiroc_in]
(
	@i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id],
	@i_transaction_ref_no [varchar] (30),
	@i_transaction_type [varchar] (1)
)
returns nvarchar(max)
as
begin
	
	declare @p_return_data nvarchar(max),
		@p_last_accessed_feature varchar (15),
		@p_last_finish_datetime datetimeoffset(7),
		@p_contact_person_2_name nvarchar(60),
		@p_contact_person_2_number nvarchar(20),
		@p_contact_person_2_email nvarchar(60),
		@p_dealer_code nvarchar(20),
		@p_dealer_name nvarchar(50),
		@p_dealer_address nvarchar(50),
		@p_dealer_state nvarchar(50),
		@p_dealer_city nvarchar(50),
		@p_lastcheck_date datetimeoffset(7),
		@p_asset_udf_char_1 nvarchar(50),
		@p_equip_udf_char_1 nvarchar(50),
		@p_invoice_date nvarchar(50),
		@p_dateof_last_inspection nvarchar(50),
		@p_prv_visit_hmr nvarchar(50),
		@p_service_visit_slno nvarchar(20)


	set @p_last_accessed_feature = ''

	if (@i_transaction_type = 'C')
	begin

		select @p_last_accessed_feature = feature_id   
		from company_feature
		where company_id = @i_client_id
			and country_code = @i_country_code
			and channel_id = 'mobile'
			and screen_id = 
			(
				select top(1) 
				(
					case(eventverb_id)
						when null then ''
						when 'Trip start' then 'trip_start'
						when 'Trip finish' then 'trip_finish'
						when 'PROGRESSUPDATE' then 'START'
						when 'REPLAN' then 'START'
						when 'RELEASEHOLD' then 'RELEASEHOLD'
						when 'REASSIGN' then 'REASSIGN'
						when 'JSA Form' then 'jsa_form'
						when 'EICL Form' then 'eicl_form'
						when 'Field Inspection Form' then 'field_inspection_form'
						when 'IG Visit Form' then 'ig_visit_form'
						when 'Commissioning Form' then 'comm_form'
						when 'Commissioning FSR Form' then 'comm_fsr_form'
						when 'Sales Flow Form' then 'sales_flow_form'
						when 'Water Test Report' then 'water_test_form'
						when 'Thermax - Service Report' then 'service_report_thermax_form'
						when 'Sterling - Service Report' then 'service_report_sterling_form'
						when 'AII Report' then 'AII_report_acopco_form'
						when 'AIP Report' then 'AIP_report_acopco_form'
						when 'SPM Check Report' then 'SPM_check_report_form'
						when 'MFSR Form' then 'vr_form_form'
						when 'HAT - Field Inspection' then 'hat_report_form'
						when 'AIRROC-COMM' then 'airroccomm_form'
						when 'IDM 70E-I-COUPON' then 'couponone_report_form'
						when 'IDM 70E-II-COUPON' then 'coupontwo_report_form'
						when 'IDM 70E-III-COUPON' then 'couponthree_report_form'
						when 'IDM 70E-IV-COUPON' then 'couponfour_report_form'
						when 'IDM 70E-V-COUPON' then 'couponfive_report_form'
						when 'AIRROC-I-COUPON' then 'airrocone_form'
						when 'AIRROC-II-COUPON' then 'airroctwo_form'
						when 'AIRROC-III-COUPON' then 'airrocthree_form'
						when 'AIRROC-IV-COUPON' then 'airrocfour_form'
						when 'POWERROC-COMM' then 'powerroccomm_form'
						when 'POWERROC-I-COUPON' then 'powerrocone_form'
						when 'POWERROC-II-COUPON' then 'powerroctwo_form'
						when 'POWERROC-III-COUPON' then 'powerrocthree_form'
						when 'POWERROC-IV-COUPON' then 'powerrocfour_form'
						when 'POWERROC-V-COUPON' then 'powerrocfive_form'
						when 'POWERROC-VI-COUPON' then 'powerrocsix_form'
						when 'idmh_form' then 'idmh_form'
						when 'IDM 30-I-COUPON' then 'idmone_form'
						when 'IDM 30-II-COUPON' then 'idmtwo_form'
						when 'IDM 30-III-COUPON' then 'idmthree_form'
						when 'IDM 30-IV-COUPON' then 'idmfour_form'
						when 'IDM 30-V-COUPON' then 'idmfive_form'
						when 'IBH 10-V-COUPON' then 'ibhfive_form'
						when 'IBH 10-HANDING' then 'ibhh_form'
						when 'IBH 10-I-COUPON' then 'ibhone_form'
						when 'IBH 10-II-COUPON' then 'ibhtwo_form'
						when 'IBH 10-III-COUPON' then 'ibhthree_form'
						when 'IBH 10-IV-COUPON' then 'ibhfour_form'
						when 'IDM 70E-HANDING' then 'couponhand_report_form'
						when 'ICM-COMM' then 'icmcomm_form'
						when 'ICM-ONE' then 'icmone_form'
						when 'ICM-TWO' then 'icmtwo_form'
						when 'ICM-THREE' then 'icmthree_form'
						when 'ICM-FOUR' then 'icmfour_form'
						else eventverb_id
					end
				)
				from call_status_event_log
				where company_id = @i_client_id
					and country_code = @i_country_code
					and call_ref_no = @i_transaction_ref_no
				order by event_id desc
			)

		select @p_last_finish_datetime = to_date
		from call_resource_utilisation_log
		where company_id = @i_client_id
			and country_code = @i_country_code
			and call_ref_no = @i_transaction_ref_no
			and to_date is not null
		order by to_date desc
		
		select @p_contact_person_2_name = c.contact_person_2,
			@p_contact_person_2_number = c.contact_person_2_mobile_no,
			@p_contact_person_2_email = c.contact_person_2_email_id
		from customer c, call_register cr 
		where cr.company_id = @i_client_id
			and cr.country_code = @i_country_code
			and cr.call_ref_no = @i_transaction_ref_no
			and c.company_id = cr.company_id
			and c.country_code = cr.country_code
			and c.customer_id = cr.customer_id
  
      select @p_dealer_code=dm.dealer_id,
		   @p_dealer_name = dm.dealer_name_short,
		   @p_dealer_address = isnull(dm.ho_address_line_1,'')+' '+isnull(dm.ho_address_line_2,',')+' '+isnull(dm.ho_address_line_3,','),
		   @p_dealer_state=isnull(dm.ho_state_code,''),
		   @p_dealer_city=isnull(dm.ho_city,'')
		from call_register cr, dealer_master dm
			where dm.company_id = @i_client_id
				and dm.country_code = @i_country_code 
				and cr.company_id =  dm.company_id
				and cr.country_code = dm.country_code
				and dm.dealer_id = cr.organogram_level_code
				and cr.call_ref_no= @i_transaction_ref_no

				select @p_lastcheck_date=am.lastcheck_date,
				@p_asset_udf_char_1 = am.udf_char_1,
				@p_invoice_date = am.udf_date_2,
				@p_prv_visit_hmr = am.lastcheck_value
				from asset_master am, call_register cr
				where am.company_id = @i_client_id
				and am.country_code = @i_country_code 
				and cr.company_id =  am.company_id
				and cr.country_code = am.country_code
				and cr.asset_id=am.asset_id
				and cr.call_ref_no= @i_transaction_ref_no

				select @p_equip_udf_char_1 = isnull(cr.udf_char_1,'')
				from asset_master am, equipment cr
				where am.company_id = @i_client_id
				and am.country_code = @i_country_code 
				and cr.company_id =  am.company_id
				and cr.country_code = am.country_code
				and cr.equipment_id=am.equipment_id
				and am.asset_id= ( select asset_id from call_register c
				where c.company_id = @i_client_id
				and c.country_code = @i_country_code 
				 and c.call_ref_no = @i_transaction_ref_no)
					
				select @p_service_visit_slno = isnull(a.service_visit_slno,'') 
				from asset_service_schedule a
				where a.company_id= @i_client_id
				 and a.country_code= @i_country_code 
				 and a.call_ref_jo_no = @i_transaction_ref_no

	end

	select @p_return_data = '"last_accessed_feature":"' + @p_last_accessed_feature + '",' +
		'"last_finish_on_date":"' + isnull(convert(varchar(10),@p_last_finish_datetime,120),'') + '",' +
		'"last_finish_on_hour":"' + isnull(substring(convert(varchar(10),@p_last_finish_datetime,108),1,2),'') + '",' +
		'"lastcheck_date":"' + isnull(convert(varchar(10),@p_lastcheck_date,120),'') + '",' +
		'"dealer_code":"'+ isnull(@p_dealer_code,'') + '",' +
		'"dealer_name":"'+ isnull(@p_dealer_name,'') + '",' +
		'"contact_person_2_name":"' + isnull(@p_contact_person_2_name,'') + '",' +
		'"contact_person_2_email":"' + isnull(@p_contact_person_2_email,'') + '",' +
		'"contact_person_2_number":"' + isnull(@p_contact_person_2_number,'') + '",' +
		'"asset_udf_char_1":"' + isnull(@p_asset_udf_char_1,'') + '",' +
		'"equip_udf_char_1":"' + isnull(@p_equip_udf_char_1,'') + '",' +
		'"service_visit_slno":"' + isnull(@p_service_visit_slno,'') + '",' +
		'"prv_visit_hmr":"' + isnull(@p_prv_visit_hmr,'0') + '",' +
		'"dealer_address":"' + isnull(@p_dealer_address,'') + '",' +
		'"dealer_state":"' + isnull(@p_dealer_state,'') + '",' +
		'"dealer_city":"' + isnull(@p_dealer_city,'') + '",' +
		'"company_name":"'+ISNULL((select company_name_long from company_master cm where cm.company_id = @i_client_id and cm.ho_country_code = @i_country_code),'')+'",'+
		'"company_address":"'+ isnull(( select co.address_line_1 +' '+ address_line_2+' '+address_line_3 from company_location co where co.company_id = @i_client_id and co.country_code =@i_country_code and co.location_code = 'HO' ), '') +'",'+
		'"company_city":"'+ isnull(( select co.city from company_location co where co.company_id = @i_client_id and co.country_code =@i_country_code and co.location_code = 'HO' ), '') +'",'+
		'"company_pincode":"'+ isnull(( select co.pincode from company_location co where co.company_id = @i_client_id and co.country_code =@i_country_code and co.location_code = 'HO' ), '') +'",'+
		'"company_state":"'+ isnull(( select s.state from company_location co,state s where co.company_id = @i_client_id and co.country_code =@i_country_code and co.location_code = 'HO' and co.state_code = s.state_code and co.country_code = s.country_code ), '') +'",'+
		'"invoice_date":"' + isnull(convert(varchar(10),@p_invoice_date,120),'') + '",' +
		'"last_finish_on_minute":"' + isnull(substring(convert(varchar(10),@p_last_finish_datetime,108),4,2),'') + '",' 

	return @p_return_data

end

  

