<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="stock_valuation_report">
		"Item Code","Item Description","Item Type","Item Category","UOM","Stock On Hand","Purchase Rate","value","Warehouse"
		<xsl:for-each select="stock_valuation_report">
			<br/>
			"=""<xsl:value-of select="item_code"/>""",
			"=""<xsl:value-of select="item_description"/>""",
			"=""<xsl:value-of select="item_type"/>""",
			"=""<xsl:value-of select="item_category"/>""",
			"=""<xsl:value-of select="uom"/>""",
			"=""<xsl:value-of select="stock_on_hand"/>""",
			"=""<xsl:value-of select="purchase_rate"/>""",
			"=""<xsl:value-of select="value"/>""",
			"=""<xsl:value-of select="warehouse"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>