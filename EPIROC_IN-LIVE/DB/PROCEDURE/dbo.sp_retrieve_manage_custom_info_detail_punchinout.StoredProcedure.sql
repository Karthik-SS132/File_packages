/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_detail_punchinout]    Script Date: 3/31/2023 10:48:17 AM ******/
DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_manage_custom_info_detail_punchinout]
GO
/****** Object:  StoredProcedure [dbo].[sp_retrieve_manage_custom_info_detail_punchinout]    Script Date: 3/31/2023 10:48:18 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_retrieve_manage_custom_info_detail_punchinout] 
    @i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id], 
    @i_custom_info_code [uddt_varchar_60], 
    @i_custom_info_ref_no1 [uddt_nvarchar_60], 
    @i_custom_info_ref_no2 [uddt_nvarchar_60], 
    @o_custom_info_header_json [uddt_nvarchar_max] OUTPUT
AS
BEGIN
    /*
     * Retrieves custom info detail
     */
    -- SET NOCOUNT ON added to prevent extra result sets from interfering with SELECT statements.
    SET NOCOUNT ON;

    -- The following code raises a 'Not implemented' error. Remove this code after implementing this procedure.
    --RAISERROR( N'Procedure ''sp_retrieve_manage_custom_info_detail'' is yet to be implemented', 15, 1)

    -- The following SQL snippet illustrates (with sample values) assignment of scalar output parameters
    -- returned out of this stored procedure

    -- Use SET | SELECT for assigning values
    /*
    SET 
         @o_custom_info_header_json = '' /* unicode string */
     */

    /*
    -- The following SQL snippet illustrates selection of result sets expected from this stored procedure: 
    
    -- Result set 1: custom_info_detail_json

    SELECT
        '' as custom_info_detail_json, /* dummy column aliased by result set name */
        '' as o_custom_info_json /* unicode string */
    FROM <Table name>
    */

	if exists 
	(
		select 1
		from timecard
		where company_id = @i_client_id
			and country_code = @i_country_code
			and employee_id = @i_custom_info_ref_no1
			and convert(varchar(10), work_date, 121) = convert(varchar(10), sysdatetimeoffset(), 121)
			and allocated_to_type_code = 'PUNCH-INOUT'
	)
	begin

		select @o_custom_info_header_json = 
			'{' +
				'"work_date":"' + convert(varchar(10), work_date, 121) + '",' +
				'"punchin_hour":"' + isnull(cast(start_hour as varchar(2)), '0') + '",' +
				'"punchin_minute":"' + isnull(cast(start_minute as varchar(2)), '0') + '",' +
				'"punchin_lattitude_value":"' + isnull(start_lattitude_value, '') + '",' +
				'"punchin_longitude_value":"' + isnull(start_longitude_value, '') + '",' +
				'"punchout_hour":"' + isnull(cast(finish_hour as varchar(2)), '0') + '",' +
				'"punchout_minute":"' + isnull(cast(finish_minute as varchar(2)), '0') + '",' +
				'"punchout_lattitude_value":"' + isnull(finish_lattitude_value, '') + '",' +
				'"punchout_longitude_value":"' + isnull(finish_longitude_value, '') + '"' +
			'}'
		from timecard
		where company_id = @i_client_id
			and country_code = @i_country_code
			and employee_id = @i_custom_info_ref_no1
			and convert(varchar(10), work_date, 121) = convert(varchar(10), sysdatetimeoffset(), 121)
			and allocated_to_type_code = 'PUNCH-INOUT'

	end
	else
	begin

		select @o_custom_info_header_json = 
			'{' +
				'"work_date":"' + convert(varchar(10), sysdatetimeoffset(), 121) + '",' +
				'"punchin_hour":"0",' +
				'"punchin_minute":"0",' +
				'"punchin_lattitude_value":"",' +
				'"punchin_longitude_value":"",' +
				'"punchout_hour":"0",' +
				'"punchout_minute":"0",' +
				'"punchout_lattitude_value":"",' +
				'"punchout_longitude_value":""' +
			'}'

	end

	select
        '' as custom_info_detail_json,
        '' as o_custom_info_json
	where 1 != 1

    SET NOCOUNT OFF;
END
GO
