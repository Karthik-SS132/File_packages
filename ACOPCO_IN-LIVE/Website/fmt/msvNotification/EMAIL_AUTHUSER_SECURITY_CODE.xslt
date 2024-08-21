<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
				xmlns:user="http://mycompany.com/mynamespace"
                xmlns:msxsl="urn:schemas-microsoft-com:xslt"
                xmlns:dt="urn:schemas-microsoft-com:datatypes">
       <xsl:template match="/">
		<html>
			<subject>
				<div>Your Verification SECURITY CODE </div>
			</subject>
			<body style="font-family:perpetua, Arial, san-serif;font-size:16;">
				<div>
					<p>Dear <b><xsl:value-of select="document/outputparam_detail_n_mode_detail/outputparam_detail_n_recipient_detail/p_n_recipient_name"/></b></p>
					<p>A New Service Call: </p>
					<p style="text-indent:50px;"><span class="lbl">SECURITY CODE: </span><span style="font-weight:bold; padding-left: 10px;padding-right:5px;"><xsl:value-of select="document/p_n_info_xml/notification_info/security_code"/> </span></p>
					<p style="text-indent:50px;"><span class="lbl">Customer Name: </span><span style="font-weight:bold; padding-left: 10px;padding-right:5px;"><xsl:value-of select="document/outputparam_detail_n_mode_detail/outputparam_detail_n_recipient_detail/p_n_recipient_mobile_no"/></span></p>
					<p style="text-indent:50px;"><span class="lbl">Contact No: </span><span style="font-weight:bold; padding-left: 10px;padding-right:5px;"><xsl:value-of select="document/outputparam_detail_n_mode_detail/outputparam_detail_n_recipient_detail/p_n_recipient_user_id"/></span></p>
					<p> This email is system generated. Pl. do not reply.</p>
				</div>	   
			</body>				
		</html>
       </xsl:template>
</xsl:stylesheet>



