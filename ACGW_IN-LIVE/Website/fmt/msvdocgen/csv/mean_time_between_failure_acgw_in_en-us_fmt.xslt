<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="mean_time_between_failure">
		"Model#","Equipment Type","Job#","Difference in hrs","Asset"
		<xsl:for-each select="mean_time_between_failure">
			<br/>
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="equipment_type"/>""",
			"=""<xsl:value-of select="call_ref_no"/>""",
			"=""<xsl:value-of select="failure_hours"/>""",
			"=""<xsl:value-of select="asset_id"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>