DROP PROCEDURE IF EXISTS[dbo].[sp_update_notification_status]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
 * Function to update notifications status
 */
CREATE PROCEDURE [dbo].[sp_update_notification_status] 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_notification_id [uddt_int], 
	@i_delivery_status [uddt_varchar_1],
    @o_update_status [uddt_varchar_5] OUTPUT
AS
BEGIN
    /*
     * Function to update notifications status
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    
    -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
         @o_update_status = '' /* string */
     */

update notification_log_delivery
set delivery_datetime = SYSDATETIMEOFFSET(),
	delivery_status = @i_delivery_status,
    last_update_id = 'system'
where company_id = @i_client_id
  and country_code = @i_country_code
  and notification_id = @i_notification_id
  
  if @@ROWCOUNT = 0
     set @o_update_status = 'ER001'
  else
     set @o_update_status = 'SP001'

    SET NOCOUNT OFF;
END
GO
