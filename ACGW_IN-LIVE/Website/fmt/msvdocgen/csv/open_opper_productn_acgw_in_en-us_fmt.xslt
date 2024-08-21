<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="open_opper_productn">
		"Item Code","Item Description","ItemType","Quantity","Date of Call","Customer Id","Customer Name","Dealer Code","Company Location"
		<xsl:for-each select="sales_invoice_detail_opper_product">
			<br/>
			"=""<xsl:value-of select="item_code"/>""",
			"=""<xsl:value-of select="item_description"/>""",
			"=""<xsl:value-of select="item_type"/>""",
			"=""<xsl:value-of select="net_quantity"/>""",
			"=""<xsl:value-of select="created_on_date"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="org_lvl_code"/>""",
			"=""<xsl:value-of select="comp_loc"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>