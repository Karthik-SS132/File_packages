<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template name="replace-string">
    <xsl:param name="text"/>
    <xsl:param name="replace"/>
    <xsl:param name="with"/>
    <xsl:choose>
		<xsl:when test="contains($text,$replace)">
			<xsl:value-of select="substring-before($text,$replace)"/>
			<xsl:value-of select="$with"/>
			<xsl:call-template name="replace-string">
				<xsl:with-param name="text" select="substring-after($text,$replace)"/>
				<xsl:with-param name="replace" select="$replace"/>
				<xsl:with-param name="with" select="$with"/>
			</xsl:call-template>
		</xsl:when>
		<xsl:otherwise>
			<xsl:value-of select="$text"/>
		</xsl:otherwise>
    </xsl:choose>
</xsl:template>
<xsl:template match="inputparam">
	<html>
	<head>
		<style>
			td {
				word-wrap:break-word;
			}
			.lbl {
				font-size: 15;
				font-family: Arial;
				font-weight: bold;
			}
			.value {
				font-size: 15;
				font-family: Arial;
				text-align: center;
			}
			table {
				table-layout: fixed;
				border-collapse:collapse;
			}
			tr {
				height:30px;
			}
			
		</style>
	</head>
	<body>
		<table width="100%" border="1px">
			<tr>
				<td colspan="10" style="font-family:Arial; font-size:22; font-weight: bold; text-align:center;">Call Logging</td>
			</tr>
		</table>
		<table width="100%" border="1px">
			<tr>
				<td colspan="2"><span class="lbl">Call Category </span></td>
				<td colspan="3"><span class="value"><xsl:value-of select="call_category_savedetails" /></span></td>
				<td colspan="2"><span class="lbl">Call Type</span></td>
				<td colspan="3"><span class="value"><xsl:value-of select="call_type_savedetails" /></span></td>
			</tr>
			<tr>
				<td colspan="2"><span class="lbl">Machine Serial No</span></td>
				<td colspan="3"><span class="value"><xsl:value-of select="asset_id_savedetails" /></span></td>
				<td colspan="2"><span class="lbl">Model</span></td>
				<td colspan="3"><span class="value"><xsl:value-of select="equipment_id_savedetails" /></span></td>
			</tr>
			<tr>
				<td colspan="2"><span class="lbl">Customer Id</span></td>
				<td colspan="3"><span class="value"><xsl:value-of select="customer_id_savedetails" /></span></td>
				<td colspan="2"><span class="lbl">Customer Contact Name</span></td>
				<td colspan="3"><span class="value"><xsl:value-of select="customer_contact_name_savedetails" /></span></td>
			</tr>
			<tr>
				<td colspan="2"><span class="lbl">Customer Contact Number</span></td>
				<td colspan="3"><span class="value"><xsl:value-of select="customer_contact_number_savedetails" /></span></td>
				<td colspan="2"><span class="lbl">Customer Contact Email</span></td>
				<td colspan="3"><span class="value"><xsl:value-of select="customer_contact_email_savedetails" /></span></td>
			</tr>
			<tr>
				<td colspan="5"><span class="lbl">Machine Location</span></td>
				<td colspan="5"><span class="value"><xsl:value-of select="machine_location_savedetails" /></span></td>
			</tr>
			<tr>
				<td colspan="2"><span class="lbl">State</span></td>
				<td colspan="3"><span class="value"><xsl:value-of select="state_code_savedetails" /></span></td>
				<td colspan="2"><span class="lbl">District</span></td>
				<td colspan="3"><span class="value"><xsl:value-of select="district_code_savedetails" /></span></td>
			</tr>
			<tr>
				<td colspan="2"><span class="lbl">Additional Info</span></td>
				<td colspan="3"><span class="value"><xsl:value-of select="additional_info_savedetails" /></span></td>
				<td colspan="2"><span class="lbl">Customer Requirement</span></td>
				<td colspan="3"><span class="value"><xsl:value-of select="customer_req_savedetails" /></span></td>
			</tr>
		</table>
	</body>
	</html>
</xsl:template>
</xsl:stylesheet>