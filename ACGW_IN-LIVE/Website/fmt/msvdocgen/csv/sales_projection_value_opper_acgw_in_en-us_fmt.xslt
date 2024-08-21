<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="sales_projection_value_opper">
		"Quote No","Quote Date","Submission Date","Net Amount","Customer Id","Customer Name","Dealer Code","Company Location"
		<xsl:for-each select="sales_projection_count_opper">
			<br/>
			"=""<xsl:value-of select="quotation_no"/>""",
			"=""<xsl:value-of select="quotation_date"/>""",
			"=""<xsl:value-of select="submission_date"/>""",
			"=""<xsl:value-of select="net_amount"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="org_lvl_code"/>""",
			"=""<xsl:value-of select="comp_loc"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>