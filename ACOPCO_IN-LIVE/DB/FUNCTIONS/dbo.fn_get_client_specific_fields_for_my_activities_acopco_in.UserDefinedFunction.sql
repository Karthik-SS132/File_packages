
DROP FUNCTION IF EXISTS [dbo].[fn_get_client_specific_fields_for_my_activities_acopco_in]
Go
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[fn_get_client_specific_fields_for_my_activities_acopco_in]
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
		@p_lastcheck_date datetimeoffset(7)


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
		   @p_dealer_name = dm.dealer_name_short
		from call_register cr, dealer_master dm
			where dm.company_id = @i_client_id
				and dm.country_code = @i_country_code 
				and cr.company_id =  dm.company_id
				and cr.country_code = dm.country_code
				and dm.dealer_id = cr.organogram_level_code
				and cr.call_ref_no= @i_transaction_ref_no

				select @p_lastcheck_date=am.lastcheck_date
				from asset_master am, call_register cr
				where am.company_id = @i_client_id
				and am.country_code = @i_country_code 
				and cr.company_id =  am.company_id
				and cr.country_code = am.country_code
				and cr.asset_id=am.asset_id
				and cr.call_ref_no= @i_transaction_ref_no
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
		'"last_finish_on_minute":"' + isnull(substring(convert(varchar(10),@p_last_finish_datetime,108),4,2),'') + '",' 
		

	return @p_return_data

end

GO
