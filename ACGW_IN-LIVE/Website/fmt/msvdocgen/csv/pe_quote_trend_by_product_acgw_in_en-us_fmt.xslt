<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="pe_quote_trend_by_product">
		"Quotation No", "Item Code","Item Description","ItemType","Quanity", "Amount","Lead Creation Date","Quote Submission Date","Customer Id","Customer Name","Dealer Code","Company Location","Brand","Product Group", "Product Sub Group", "Model"
		<xsl:for-each select="pe_quote_trend_by_product">
			<br/>
			"=""<xsl:value-of select="quotation_no"/>""",
			"=""<xsl:value-of select="item_code"/>""",
			"=""<xsl:value-of select="item_description"/>""",
			"=""<xsl:value-of select="item_type"/>""",
			"=""<xsl:value-of select="net_quantity"/>""",			
			"=""<xsl:value-of select="gross_amount"/>""",
			"=""<xsl:value-of select="lead_creation_date"/>""",
			"=""<xsl:value-of select="submission_date"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="org_lvl_code"/>""",
			"=""<xsl:value-of select="equipment_oem"/>""",
			"=""<xsl:value-of select="equipment_category"/>""",
			"=""<xsl:value-of select="equipment_type"/>""",
			"=""<xsl:value-of select="equipment_id"/>"""		
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>