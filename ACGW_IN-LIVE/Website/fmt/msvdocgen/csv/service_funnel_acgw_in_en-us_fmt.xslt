<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="service_funnel">
		"Call #","Call date","Status","Machine #","Warranty Status","Model Id","Department","Company Location","Customer Name","Employee Id","Employee Name",
		"Job Type", "Job Sub Type", "Machine Region"
		<xsl:for-each select="service_funnel">
			<br/>
			"=""<xsl:value-of select="call_ref_no"/>""",
			"=""<xsl:value-of select="creation_date_time"/>""",
			"=""<xsl:value-of select="chart_order"/>""",
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="asset_status"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="org_lvl_code"/>""",
			"=""<xsl:value-of select="comp_loc"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="emp_id"/>""",
			"=""<xsl:value-of select="emp_name"/>""",
			"=""<xsl:value-of select="call_type"/>""",
			"=""<xsl:value-of select="call_subtype"/>""",
			"=""<xsl:value-of select="machine_region"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>
