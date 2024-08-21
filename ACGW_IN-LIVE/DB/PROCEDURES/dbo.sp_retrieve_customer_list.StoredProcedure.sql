IF EXISTS(SELECT 1 FROM SYS.PROCEDURES WHERE NAME = 'sp_retrieve_customer_list')
BEGIN
	DROP PROCEDURE [dbo].[sp_retrieve_customer_list]
END
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*
* Function to retrieve customer list
*/
CREATE PROCEDURE [dbo].[sp_retrieve_customer_list](
    @i_client_id [uddt_client_id], 
    @i_session_id [sessionid], 
    @i_country_code [uddt_country_code], 
    @i_user_id [userid], 
    @i_locale_id [uddt_locale_id]) AS
BEGIN
/*
* Function to retrieve customer list
*/


--The following SQL snippet illustrates selection of result sets expected from this stored procedure:
/*

--Result set 1: customer_list

SELECT
'' as customer_list, /* dummy column aliased by result set name */
'' as o_customer_id, /* string */
'' as o_customer_name /* unicode string */
FROM <Table name>
*/

select '' as customer_list,
customer_id as o_customer_id,
substring(customer_name,1,60) as o_customer_name
from customer
where company_id = @i_client_id
and country_code = @i_country_code

SET NOCOUNT ON
END

GO
