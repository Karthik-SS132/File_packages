<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="service_efficiency">
		"Job #","Job Type","Machine #","Model Id","Employee Name","Dealer Code","Type","Hours","Company Location","Customer Requirement","Additional Info","Customer Id","Customer Name","Contact Name","Contact Number","Contact Email","Job Creation Date","Job Complete Date"
		<xsl:for-each select="service_efficiency">
			<br/>
			"=""<xsl:value-of select="call_ref_no"/>""",
			"=""<xsl:value-of select="call_type"/>""",
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="emp_name"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="service_efficiency_type"/>""",
			"=""<xsl:value-of select="service_efficiency_hrs"/>""",
			"=""<xsl:value-of select="comp_loc"/>""",
			"=""<xsl:value-of select="problem_description"/>""",
			"=""<xsl:value-of select="additional_information"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_contact_name"/>""",
			"=""<xsl:value-of select="customer_contact_no"/>""",
			"=""<xsl:value-of select="customer_contact_email_id"/>""",
			"=""<xsl:value-of select="created_on_date"/>""",
			"=""<xsl:value-of select="closed_on_date"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>