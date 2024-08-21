<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="contract_ratio">
		"Machine #","Dealer Code","Type","Company Location","Model#","Category","Equipment Type","Customer Id","Customer Name"
		<xsl:for-each select="contract_ratio">
			<br/>
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="contract_ratio"/>""",
			"=""<xsl:value-of select="comp_loc"/>""",
			"=""<xsl:value-of select="equipment_id"/>""",
			"=""<xsl:value-of select="equipment_category"/>""",
			"=""<xsl:value-of select="equipment_type"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>