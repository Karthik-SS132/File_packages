<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="pe_creation_trend">
		"Lead #","Creation date","Machine #","Machine Status","Model Id","Brand","Product Group","Product Subgroup","Dealer Code","Lead Source","Zone"
		<xsl:for-each select="pe_creation_trend">
			<br/>
			"=""<xsl:value-of select="call_ref_no"/>""",
			"=""<xsl:value-of select="creation_date_time"/>""",
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="asset_status"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="equipment_oem"/>""",
			"=""<xsl:value-of select="equipment_category"/>""",
			"=""<xsl:value-of select="equipment_type"/>""",
			"=""<xsl:value-of select="org_lvl_code"/>""",
			"=""<xsl:value-of select="lead_source"/>""",
			"=""<xsl:value-of select="comp_loc"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>