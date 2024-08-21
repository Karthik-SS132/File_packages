<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="app_usage_version_classification">
		"Employee Name","User Id","Mservice Version","Manufacturer","Model","Device Version","Device Platform","Dealer Code","Company Location"
		<xsl:for-each select="app_usage_version_classification">
			<br/>
			
			"=""<xsl:value-of select="emp_name"/>""",
			"=""<xsl:value-of select="user_id"/>""",
			"=""<xsl:value-of select="mservice_version"/>""",
			"=""<xsl:value-of select="manufacturer"/>""",
			"=""<xsl:value-of select="model"/>""",
			"=""<xsl:value-of select="device_version"/>""",
			"=""<xsl:value-of select="device_platform"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="comp_loc"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>