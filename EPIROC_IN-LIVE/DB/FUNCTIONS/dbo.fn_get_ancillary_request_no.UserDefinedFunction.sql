/****** Object:  UserDefinedFunction [dbo].[fn_get_ancillary_request_no]    Script Date: 10/31/2020 3:42:30 PM ******/
DROP FUNCTION IF EXISTS [dbo].[fn_get_ancillary_request_no]
GO
/****** Object:  UserDefinedFunction [dbo].[fn_get_ancillary_request_no]    Script Date: 10/31/2020 3:42:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE function [dbo].[fn_get_ancillary_request_no]
(
	@i_client_id [uddt_client_id],
	@i_country_code [uddt_country_code],
	@i_request_category [varchar] (10),
	@i_request_type [nvarchar] (10),
	@i_request_no [int],
	@i_by_field_1 [nvarchar] (30),
	@i_by_field_2 [nvarchar] (30),
	@i_by_field_3 [nvarchar] (30),
	@i_by_field_4 [nvarchar] (30),
	@i_by_field_5 [nvarchar] (30) 
)
returns nvarchar(30)
as
begin

	declare @o_request_ref_no nvarchar(30)

	set @o_request_ref_no = replace(str(@i_request_no, 6, 0),' ','0')

	if (@i_request_category = 'QU')
	begin

		set @o_request_ref_no = @i_request_category + @o_request_ref_no

	end

	return @o_request_ref_no

end
GO
