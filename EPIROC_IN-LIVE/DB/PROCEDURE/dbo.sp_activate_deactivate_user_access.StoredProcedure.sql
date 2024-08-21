DROP PROCEDURE IF EXISTS[dbo].[sp_activate_deactivate_user_access]
GO
																																							  
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
* function to activate / deactivate user access
*/
CREATE PROCEDURE [dbo].[sp_activate_deactivate_user_access]
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_user_id_for_act_deact [userid], 
    @i_activate_deactivate_ind [uddt_bit], 
    @i_rec_tstamp [uddt_uid_timestamp], 
    @o_update_status [uddt_varchar_5] OUTPUT, 
    @o_def_password [uddt_passwd] OUTPUT, 
    @o_user_company_code [uddt_client_id] OUTPUT, 
    @o_user_country_code [uddt_country_code] OUTPUT,
    @errorNo [errorno] OUTPUT
AS
BEGIN
/*
* function to activate / deactivate user access
*/

--The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
--returned out of this stored procedure:
/*
SET 
         @o_update_status = '' /* string */
         @o_def_password = '' /* unicode string */
         @o_user_company_code = '' /* string */
         @o_user_country_code = '' /* string */
         @errorNo = ''	/* string */
*/


/* List of errors expected out of the stored procedure. Use the text of the error 
* messages printed below as a guidance to set appropriate error numbers to @errorNo inside the procedure.
* E_UP_102 - Failed to Update User's Activation Status
*/

declare @p_active_ind bit, @p_notification_xml nvarchar(1500),
		@p_notification_id int, @p_user_group_id nvarchar(10)

  select @o_user_company_code = @i_client_id, @o_user_country_code = @i_country_code,@o_update_status = ''
	  
  if exists ( select 1
			  from users 
			  where company_id = @i_client_id
			    and country_code = @i_country_code
			    and user_id = @i_user_id_for_act_deact)
  begin
  
   if exists ( select 1
			  from users 
			  where company_id = @i_client_id
			    and country_code = @i_country_code
			    and user_id = @i_user_id_for_act_deact
				and @i_rec_tstamp = cast(convert(uniqueidentifier,cast(last_update_timestamp as binary)) as varchar(36)))
   begin
		select @p_active_ind = active_ind ,
			@p_user_group_id = user_group_id				   
		from users 
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and user_id = @i_user_id_for_act_deact

		if @p_active_ind = @i_activate_deactivate_ind
		begin
			select @errorNo = 'E_UP_102'
			return
		end
		
		update users
		set active_ind = @i_activate_deactivate_ind
		where company_id = @i_client_id
		  and country_code = @i_country_code
		  and user_id = @i_user_id_for_act_deact
		
		if @@ROWCOUNT != 0
		begin
		
			
			/* 12.Jul.19 - Chak - Introduce a record in user_access_log_summary */
			if exists ( select 1 from user_access_exception_summary
					  where company_id = @i_client_id
					    and country_code = @i_country_code
						and user_id = @i_user_id_for_act_deact
					)
			  begin
						update user_access_exception_summary
						set allowed_login_attempts = 5, /* To be fixed later */
							failed_login_attempts = 0
						where company_id = @i_client_id
							and country_code = @i_country_code
							and user_id = @i_user_id_for_act_deact
										
			  end
			  else
			  begin
		  

					insert user_access_exception_summary
					(
							company_id, country_code, user_id, 
							allowed_login_attempts, failed_login_attempts,
							last_update_id
					)
					select @i_client_id, @i_country_code, @i_user_id_for_act_deact,
							5, 0, @i_user_id /* Allowed attempts to be read from company_configuration */
			  end			

			/*End Change */
		   execute sp_pick_new_password @i_client_id, @i_user_id, @i_country_code, '' /* Email id */, @o_def_password OUTPUT
	   
		   select @errorNo = ''
		   
		   if @i_activate_deactivate_ind = 1 /* In case of activation */
		   begin
		   
		   select @p_notification_xml = '<notification_info>'+
								'<for_user_id>'+@i_user_id_for_act_deact+'</for_user_id>'+
								'<activate_deactivate_ind>'+cast(@i_activate_deactivate_ind as varchar(1))+'</activate_deactivate_ind>'+
								'<user_group_id>'+ISNULL(@p_user_group_id,'')+'</user_group_id>'+		 
								'<password>'+@o_def_password+'</password>'+
								'</notification_info>'	
			
	 	 
 			execute sp_log_new_notification  @i_session_id, @i_user_id  , @i_client_id , 
	   			 @i_locale_id , @i_country_code , 'ACTIVATE_USER' ,@p_notification_xml, @i_user_id, @p_notification_id OUTPUT
	   		
	   		if @p_notification_id = 0
	   		begin
	   			set @errorNo = 'E_UP_102'
	   			return
	   		end
	   			 
			end
			/* else -- No Notification in case of deactivation*/
						
			set @o_update_status = 'SP001'
		end
		else
		begin
		   select @errorNo = 'E_UP_102'
		   return
		end
	end
	else
	begin
		set @errorNo = 'E_UP_005'
		return
	end		
  end
 
SET NOCOUNT ON
END
  

