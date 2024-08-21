<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="close_visit_calls">
		"Job #","Machine #","Model Id","Dealer Code","Employee Name","Date of Call","Customer Id","Customer Name","Company Location"
		<xsl:for-each select="close_visit_calls">
			<br/>
			"=""<xsl:value-of select="call_ref_no"/>""",
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="emp_name"/>""",
			"=""<xsl:value-of select="created_on_date"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="comp_loc"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>