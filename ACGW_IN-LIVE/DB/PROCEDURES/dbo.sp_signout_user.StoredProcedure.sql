/****** Object:  StoredProcedure [dbo].[sp_signout_user]    Script Date: 8/24/2023 12:54:12 PM ******/
IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_signout_user')
BEGIN
	DROP PROCEDURE [dbo].[sp_signout_user]
END
/****** Object:  StoredProcedure [dbo].[sp_signout_user]    Script Date: 8/24/2023 12:54:12 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
* Service to signout a logged in user
*/
CREATE PROCEDURE [dbo].[sp_signout_user](
    @i_sessionid [sessionid], 
    @i_userid [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_logout_date [uddt_date], 
    @i_logout_hour [uddt_hour], 
    @i_logout_minute [uddt_minute],
    @errorNo varchar(15) OUTPUT) AS
BEGIN
/*
* Service to signout a logged in user
*/

--The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
--returned out of this stored procedure:
/*
SET /* Use SET | SELECT for assigning values */
@errorNo = ''	/* string */
*/


/* List of errors expected out of the stored procedure. Use the text of the error 
* messages printed below as a guidance to set appropriate error numbers to @errorNo inside the procedure.
* E_LO_002 - You have not logged in to the system
* S_LO_002 - You have successfully logged out of the system
*/

	if exists 
	(
		select 1 from usage_log 
		where company_id = @i_client_id
			and user_id = @i_userid 
			and session_id = @i_sessionid 
			and logout_date is null
	)
	begin

		if (@i_userid != 'cappvisitor')
		begin

			update usage_log
			set logout_date = convert(datetimeoffset, @i_logout_date + ' ' + @i_logout_hour + ':' + @i_logout_minute + ':00', 120)
			where company_id = @i_client_id
				and user_id = @i_userid 
				and session_id = @i_sessionid 
				and logout_date is null
              
			if ( @@rowcount != 0)
			begin
				select @errorNo=''
			end
			/* Need to introduce error nos for 'not able to update' scenario */
   
			update users
			set last_login_date = convert(datetimeoffset, @i_logout_date + ' ' + @i_logout_hour + ':' + @i_logout_minute + ':00', 120)
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_id = @i_userid

			delete usage_log_dap
			where company_id = @i_client_id
				and country_code = @i_country_code
				and user_id = @i_userid
				and session_id = @i_sessionid
	
			delete usage_log_data_access_profile
			where company_id = @i_client_id
				and country_code = @i_country_code
				and session_id = @i_sessionid

		end
   
	end
	else
	begin
		select @errorNo = 'E_LO_002'
	end
    
SET NOCOUNT ON
END

GO
