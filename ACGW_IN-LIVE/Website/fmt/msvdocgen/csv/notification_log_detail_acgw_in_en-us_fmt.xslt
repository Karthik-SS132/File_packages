<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="notification_log_detail">
		"Job #","Customer Location","Customer Id","Customer Name","Contact Name","Contact Number","Contact Email","Dealer Code","Survey Status","Delivery Remarks"
		<xsl:for-each select="notification_log_detail">
			<br/>
			"=""<xsl:value-of select="call_ref_no"/>""",
			"=""<xsl:value-of select="customer_location"/>""",
			"=""<xsl:value-of select="customer_id"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="cust_contact_name"/>""",
			"=""<xsl:value-of select="cust_contact_no"/>""",
			"=""<xsl:value-of select="cust_contact_email"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="survey_status"/>""",
			"=""<xsl:value-of select="delivery_remarks"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>