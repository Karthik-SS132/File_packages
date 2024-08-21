<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="productivity_hours_vr">
		"Job #","Machine #","Model Id","Employee Name","Dealer Code","Activity Name","Activity Hours","Company Location"
		<xsl:for-each select="productivity_hours_vr">
			<br/>
			
			"=""<xsl:value-of select="call_no"/>""",
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="emp_name"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="activity_name"/>""",
			"=""<xsl:value-of select="activity_hrs"/>""",
			"=""<xsl:value-of select="comp_loc"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>