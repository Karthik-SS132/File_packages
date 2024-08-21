<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="closed_service_calls_type">
		"Job #","Job Type","Created Month","Closed Month","Machine #","Model Id","Brand","Product Group","Product Subgroup","Employee Name","Dealer Code","Zone","Job Priority","Customer Requirement","Additional Info","Customer Id","Customer Name","Contact Name","Contact Number","Contact Email","Job Creation Date","Job Complete Date"
		<xsl:for-each select="closed_service_calls_type">
			<br/>
			"=""<xsl:value-of select="call_no"/>""",
			"=""<xsl:value-of select="call_type"/>""",
			"=""<xsl:value-of select="created_month"/>""",
			"=""<xsl:value-of select="closed_month"/>""",
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="equipment_oem"/>""",
			"=""<xsl:value-of select="equipment_category"/>""",
			"=""<xsl:value-of select="equipment_type"/>""",
			"=""<xsl:value-of select="emp_name"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="company_location_code"/>""",
			"=""<xsl:value-of select="priority_code"/>""",
			"=""<xsl:value-of select="problem_description"/>""",
			"=""<xsl:value-of select="additional_information"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="customer_contact_name"/>""",
			"=""<xsl:value-of select="customer_contact_no"/>""",
			"=""<xsl:value-of select="customer_contact_email_id"/>""",
			"=""<xsl:value-of select="created_on_date"/>""",
			"=""<xsl:value-of select="closed_date_time"/>"""
			
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>