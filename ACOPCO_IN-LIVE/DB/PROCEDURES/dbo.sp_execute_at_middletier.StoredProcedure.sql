/****** Object:  StoredProcedure [dbo].[sp_execute_at_middletier]    Script Date: 9/14/2022 6:49:39 PM ******/
DROP PROCEDURE IF EXISTS [dbo].[sp_execute_at_middletier]
GO
/****** Object:  StoredProcedure [dbo].[sp_execute_at_middletier]    Script Date: 9/14/2022 6:49:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
 * Function to check if the execution of the service to be done in middleware
 */
CREATE PROCEDURE [dbo].[sp_execute_at_middletier] 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @i_information_type [uddt_varchar_60]
AS
BEGIN
    /*
     * Function to check if the execution of the service to be done in middleware
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

	if (@i_information_type in ('send_security_code'))
	begin

		return 0;

	end	

	return 1;

    SET NOCOUNT OFF;
END
GO
