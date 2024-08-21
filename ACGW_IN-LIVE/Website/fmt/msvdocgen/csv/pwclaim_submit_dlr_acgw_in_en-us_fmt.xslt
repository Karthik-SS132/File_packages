<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="pwclaim_submit_dlr">
		"ROC #","No of days","Dealer Code","Employee Name","Company Location","Customer Name","Failure Reason","Loading Hours","Running Hours","Order Date","Expected Delivary","Receipt Date"
		<xsl:for-each select="pwclaim_submit_dlr">
			<br/>
			"=""<xsl:value-of select="call_no"/>""",
			"=""<xsl:value-of select="days"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="emp_name"/>""",
			"=""<xsl:value-of select="comp_loc"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="failure_reason"/>""",
			"=""<xsl:value-of select="loading_hours"/>""",
			"=""<xsl:value-of select="running_hours"/>""",
			"=""<xsl:value-of select="parts_order_date"/>""",
			"=""<xsl:value-of select="expected_delivery_date"/>""",
			"=""<xsl:value-of select="receipt_date"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>