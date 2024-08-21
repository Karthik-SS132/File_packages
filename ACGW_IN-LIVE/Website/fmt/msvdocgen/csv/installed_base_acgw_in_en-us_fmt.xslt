<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="installed_base">
		"Machine Id","Asset_Status","Installation Date","Model Id","Brand","Product Group","Product Subgroup","Dealer ID","Zone","Customer ID","Customer Name","Customer Location"
		<xsl:for-each select="installed_base">
			<br/>
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="asset_status"/>""",
			"=""<xsl:value-of select="installation_date"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="equipment_oem"/>""",
			"=""<xsl:value-of select="equipment_category"/>""",
			"=""<xsl:value-of select="equipment_type"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="comp_loc"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="customer_location"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>