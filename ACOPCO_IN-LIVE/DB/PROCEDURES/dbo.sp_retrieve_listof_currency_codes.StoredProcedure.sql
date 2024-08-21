DROP PROCEDURE IF EXISTS[dbo].[sp_retrieve_listof_currency_codes]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*
* Retrieves list of currency codes
*/
CREATE PROCEDURE [dbo].[sp_retrieve_listof_currency_codes](
    @i_client_id [uddt_client_id], 
    @i_country_code [uddt_country_code], 
    @i_session_id [sessionid], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id]) AS
BEGIN
/*
* Retrieves list of currency codes
*/


--The following SQL snippet illustrates selection of result sets expected from this stored procedure:
/*

--Result set 1: currencycode_list

SELECT
'' as currencycode_list, /* dummy column aliased by result set name */
'' as o_currency_code, /* string */
'' as o_description /* string */
FROM <Table name>
*/

select '' as currencycode_list,
		currency_code as o_currency_code,
		description as o_description
from currency_code



SET NOCOUNT ON
END


GO
