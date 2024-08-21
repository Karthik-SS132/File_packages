SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE function [dbo].[dealer_machine_count]
(
	@i_client_id    [uddt_client_id],
    @i_country_code [uddt_country_code],
    @i_locale_id	[uddt_locale_id],
	@i_Eqp_type	varchar(30),
	@i_org_lvl_no tinyint,
	@i_org_lvl_code varchar(15),
	@i_count_type varchar(10))
	
RETURNS INT
AS
BEGIN
	
	DECLARE @Result INT

	If @i_count_type='WARRANTY' 
	begin
	
			select @Result =count(*) from asset_master am
		  where am.company_id = @i_client_id
		    and am.country_code = @i_country_code
			--and equipment_id = @i_Eqp_id
			and equipment_id in (select equipment_id from equipment where equipment_type=@i_Eqp_type)
			and am.servicing_org_level_no=@i_org_lvl_no
			and am.servicing_org_level_code=@i_org_lvl_code
			and datediff(dd,installation_date,sysdatetime()) <=365
		
		
	end
	else
	begin
	select @Result =count(*) from asset_master am
		  where am.company_id = @i_client_id
		    and am.country_code = @i_country_code
			--and equipment_id = @i_Eqp_id
			and equipment_id in (select equipment_id from equipment where equipment_type=@i_Eqp_type)
			and am.servicing_org_level_no=@i_org_lvl_no
			and am.servicing_org_level_code=@i_org_lvl_code
			--and datediff(dd,installation_date,sysdatetime()) <=365
		
	end
	select @Result = ISNULL(@Result,0)
	RETURN @Result
END



GO
