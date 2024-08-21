<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="nps_feedback_value">
		"Job #","Machine #","Model Id","Feedback Type","Dealer Code","Employee Name","Company Location","Job Type","Customer Id","Customer Name","Contact Name","Contact Number","Contact Email","Service Engineer Name","Feedback Date","Overall summary code","Overall summary code value"
		<xsl:for-each select="nps_feedback_value">
			<br/>
			"=""<xsl:value-of select="call_no"/>""",
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="feedback_value"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="emp_name"/>""",
			"=""<xsl:value-of select="comp_loc"/>""",
			"=""<xsl:value-of select="call_type"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="customer_contact_name"/>""",
			"=""<xsl:value-of select="customer_contact_no"/>""",
			"=""<xsl:value-of select="customer_contact_email_id"/>""",
			"=""<xsl:value-of select="resource_emp_id"/>""",
			"=""<xsl:value-of select="feedback_date"/>""",
			"=""<xsl:value-of select="overall_summary_code"/>""",
			"=""<xsl:value-of select="overall_summary_code_value"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>