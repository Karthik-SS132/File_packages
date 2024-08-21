<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="sales_projection_leadsource_count">
		"Lead Source","Model #","Model Type","Sales Type","Sales Value","Dealer Code","Company Location"
		<xsl:for-each select="sales_projection_leadsource_count">
			<br/>
			"=""<xsl:value-of select="lead_source"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="equipment_type"/>""",
			"=""<xsl:value-of select="charge_type"/>""",
			"=""<xsl:value-of select="charge_amount"/>""",
			"=""<xsl:value-of select="org_lvl_code"/>""",
			"=""<xsl:value-of select="comp_loc"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>