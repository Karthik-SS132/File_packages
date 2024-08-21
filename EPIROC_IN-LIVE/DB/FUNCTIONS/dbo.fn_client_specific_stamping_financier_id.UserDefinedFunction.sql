SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE function [dbo].[fn_client_specific_stamping_financier_id]
(
	@i_client_id [uddt_client_id],
    @i_country_code [uddt_country_code],
    @i_seq_no [int]

)
returns nvarchar(20)
as
begin
	
	declare @o_seq_no nvarchar(20)
	
	select @o_seq_no = 'FINID'+
		REPLACE(str(@i_seq_no,6,0),' ','0')

	
		
	return @o_seq_no
	
end

GO
