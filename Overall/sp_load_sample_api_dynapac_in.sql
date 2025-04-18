USE [msv_dynapac]
GO
/****** Object:  StoredProcedure [dbo].[sp_load_sample_api_dynapac_in]    Script Date: 25-01-2024 13:26:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



/*
 * Save Manage Parts Claim
 */
CREATE PROCEDURE [dbo].[sp_load_sample_api_dynapac_in] 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_client_id [uddt_client_id], 
    @i_locale_id [uddt_locale_id], 
    @i_country_code [uddt_country_code], 
    @o_update_status [uddt_varchar_5] OUTPUT
AS
BEGIN

	
    /*
     * Save Manage Parts Claim
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    select @o_update_status='SP001'
	
	insert call_register_actions(company_id,country_code,call_ref_no,action_category,action_type,product_code,product_sub_code)
	select 'dynapac','in',id,employee_name,employee_salary,employee_age,''
	from ##load_data_sample_api_dynapac_in
	
    SET NOCOUNT OFF;
END




GO
