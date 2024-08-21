<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="machine_ageing_count">
		"Dealer Code","Machine Id","Commission Date","Despatch Date","Ageing Period","Brand","Product Group","Product Subgroup","Model Id","Zone"
		<xsl:for-each select="machine_ageing_count">
			<br/>
			"=""<xsl:value-of select="org_lvl_code"/>""",
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="install_date"/>""",
			"=""<xsl:value-of select="despatch_date"/>""",
			"=""<xsl:value-of select="ageing_period"/>""",
			"=""<xsl:value-of select="equipment_oem"/>""",
			"=""<xsl:value-of select="equipment_category"/>""",
			"=""<xsl:value-of select="equipment_type"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="comp_loc"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>