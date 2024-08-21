<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="employee_utilization">
		"Employee Name","User Group","Dealer Code","Company Location"
		<xsl:for-each select="employee_utilization">
			<br/>
			
			"=""<xsl:value-of select="employee_name"/>""",
			"=""<xsl:value-of select="user_group_id"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="comp_loc"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>