SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE function [dbo].[fn_client_specific_stamping_pwclaim_ref_no]
(
	@i_client_id [uddt_client_id],
    @i_country_code [uddt_country_code],
    @i_request_category [varchar] (10),
    @i_request_type [nvarchar] (10),
    @i_call_no [int]
)
returns nvarchar(20)
as
begin
	
	declare @o_call_ref_no nvarchar(20)
	
	set @o_call_ref_no = REPLACE(str(@i_call_no,6,0),' ','0')


	/* For client specific call no stamping - 24/05/21 */
	if @i_client_id = 'xcmg'
	begin

		select @o_call_ref_no = 'DPW' +
		substring(CONVERT(varchar(6),sysdatetimeoffset(),12),1,2)+
		REPLACE(str(@i_call_no,5,0),' ','0')

	end
		
	return @o_call_ref_no
	
end

GO
