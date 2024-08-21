<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:user="http://mycompany.com/mynamespace" xmlns:msxsl="urn:schemas-microsoft-com:xslt" xmlns:dt="urn:schemas-microsoft-com:datatypes">
	<xsl:template match="/">
		<html>
			<subject><div>Your Verification Code</div></subject>
			<body>
				<div style="border: 2px solid #cfcfcf; border-radius: 10px;">
					<div style="text-align: center;background-color: #efefef;padding: .6em;border-radius: 10px 10px 0 0;">
						<h4 style="margin: 0;color:#7b7b7b;">Your Verification Code</h4>
					</div>
					<div>
						<div style="padding-left: 1em;margin:1em;">
							<span style="margin-right: .5em; color: #828281;font-size: 17px;margin-top: 0;margin-bottom: 0;">Dear</span>
							<span style="color:#333332;font-size: 20px;font-weight: 500;"><xsl:value-of select="document/p_n_info_xml/notification_info/name"/></span>
						</div>
						<div style="display: flex;justify-content: space-between;margin-bottom: 1em;padding-left: 1em;flex-wrap: wrap;">
							<div>
								<div style="display: flex;margin-left: 1em;">
									<span style="color: #515050;font-size: 18px;font-weight: 600;padding-bottom: 1em;padding-top: 1em;">Use the verification code in this email to login to <xsl:value-of select="document/p_n_info_xml/notification_info/app_name"/> app.
									</span>
								</div>
								<div style="margin-left: 1em;margin-bottom: 1em;margin-top: 1em;">
									<span style=" color: #515050;margin-right: .7em;font-weight: 400;font-size: 17px;margin-top: 0;margin-bottom: 0;padding-left: 0.3em;">Your verification code will expire in </span>
									<span style="font-size: 18px;font-weight: 600;color: #515050;"><xsl:value-of select="document/p_n_info_xml/notification_info/valid_mins"/> minutes</span>
								</div>
							</div>						
						</div>
						<div style="background-color: #ededed; text-align:center; padding:1em;">
							<div style="font-size: 14px; color: #272727; margin:0 0 1em 0;">Verification Code</div>
							<div style=" cursor: copy; margin:0;font-size: 27px;color: #272727;letter-spacing: 8px;font-weight: 600;"><xsl:value-of select="document/p_n_info_xml/notification_info/security_code"/></div>
						</div>
					</div>
					<div style="margin: 1em;text-align: center;color: #b71818;">
						This is a system generated mail. Please don't reply.
					</div>
				</div>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>