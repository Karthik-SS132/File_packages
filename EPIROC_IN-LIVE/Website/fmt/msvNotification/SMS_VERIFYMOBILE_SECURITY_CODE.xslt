<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:user="http://mycompany.com/mynamespace" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:dt="urn:schemas-microsoft-com:datatypes">
	<xsl:template match="/">
		<html>
			<body>
				<smsgatewayurl>http://www.smsjust.com/blank/sms/user/urlsms.php?username=selfservit&amp;pass=trans@1234&amp;senderid=MSRVCE&amp;dest_mobileno=</smsgatewayurl>
				<p>message=<xsl:value-of select="document/p_n_info_xml/notification_info/security_code"/> is your Verification Code for verifying mobile number to <xsl:value-of select="document/p_n_info_xml/notification_info/app_name"/> app and will be valid for <xsl:value-of select="document/p_n_info_xml/notification_info/valid_mins"/> minutes. <xsl:value-of select="document/p_n_info_xml/notification_info/package_id"/> -- Selfservit&amp;dltentityid=1601100000000009318&amp;dlttempid=1607100000000233438&amp;response=Y</p>			
			</body>				
		</html>	
	</xsl:template>
</xsl:stylesheet>