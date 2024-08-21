<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="work_progress_value">
		"Job #","Job type","Work Progress Value","Dealer Code","Employee Name","Company Location","Customer Requirement","Additional Info","Customer Id","Customer Name","Contact Name","Contact Number","Contact Email"
		<xsl:for-each select="work_progress_value">
			<br/>
			"=""<xsl:value-of select="call_ref_no"/>""",
			"=""<xsl:value-of select="call_type"/>""",
			"=""<xsl:value-of select="work_progress_value"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="emp_name"/>""",
			"=""<xsl:value-of select="comp_loc"/>""",
			"=""<xsl:value-of select="problem_description"/>""",
			"=""<xsl:value-of select="additional_information"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="customer_contact_name"/>""",
			"=""<xsl:value-of select="customer_contact_no"/>""",
			"=""<xsl:value-of select="customer_contact_email_id"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>