<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="pwclaim_count_delay_time">
		"ROC #","No of days","ROC creation date","ROC Approval date","Machine Id","Model ID","Dealer Code","Company Location","Customer Name","Failure Date","Failure Reason","Loading Hours","Running Hours","Commissioning date","Part Commissioning date","Primary part Number","Primary part Description","Failure Description","Failure Category","Actions","Div / ROC belongs to"
		<xsl:for-each select="pwclaim_count_delay_time">
			<br/>
			"=""<xsl:value-of select="call_no"/>""",
			"=""<xsl:value-of select="days"/>""",
			"=""<xsl:value-of select="roc_creation_date"/>""",
			"=""<xsl:value-of select="roc_approval_date"/>""",
			"=""<xsl:value-of select="asset_id"/>""",
			"=""<xsl:value-of select="model_id"/>""",
			"=""<xsl:value-of select="dealer_code"/>""",
			"=""<xsl:value-of select="comp_loc"/>""",
			"=""<xsl:value-of select="customer_name"/>""",
			"=""<xsl:value-of select="failure_date"/>""",
			"=""<xsl:value-of select="failure_reason"/>""",
			"=""<xsl:value-of select="loading_hours"/>""",
			"=""<xsl:value-of select="running_hours"/>""",
			"=""<xsl:value-of select="commission"/>""",
			"=""<xsl:value-of select="parts_commission"/>""",
			"=""<xsl:value-of select="part_no"/>""",
			"=""<xsl:value-of select="part_desc"/>""",
			"=""<xsl:value-of select="failure_desc"/>""",
			"=""<xsl:value-of select="failure_causes"/>""",
			"=""<xsl:value-of select="actions"/>""",
			"=""<xsl:value-of select="div_roc"/>"""
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet>