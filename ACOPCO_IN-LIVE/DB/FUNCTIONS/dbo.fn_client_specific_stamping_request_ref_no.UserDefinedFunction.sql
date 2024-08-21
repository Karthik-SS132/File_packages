DROP FUNCTION IF EXISTS [dbo].[fn_client_specific_stamping_request_ref_no]
Go
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE function [dbo].[fn_client_specific_stamping_request_ref_no]
(
	@i_client_id [uddt_client_id],
    @i_country_code [uddt_country_code],
    @i_format_type [varchar] (30),
    @i_request_category varchar(10),
    @i_request_type nvarchar(10),
    @i_generated_seq_no [int]
)
returns nvarchar(30)
as
begin


	declare @o_gen_seq_no nvarchar(30)
	
	set @o_gen_seq_no = REPLACE(str(@i_generated_seq_no,5,0),' ','0')

	select @o_gen_seq_no = @i_request_category + @i_request_type + REPLACE(str(@i_generated_seq_no,5,0),' ','0')
		
	return @o_gen_seq_no
	
end

GO
