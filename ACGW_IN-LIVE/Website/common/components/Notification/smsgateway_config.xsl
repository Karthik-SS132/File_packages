<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
            xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
            xmlns:msxsl="urn:schemas-microsoft-com:xslt"
            xmlns:js="urn:custom-javascript"
            exclude-result-prefixes="msxsl js" >
  <msxsl:script language="JavaScript" implements-prefix="js">
    function verify_response(client_id,country_code,response)
    {
    var status = 'ND000';
    if(client_id == 'mvgl1') {
    if(response.split('-')[0] == '100 ') {
    status = 'ND001';
    }
    }
    else {
    var today = new Date();
    var date = today.getDate();
    var month = today.getMonth()+1;
    var year = today.getFullYear();
    if(date&lt;10){date = "0"+date;}
    if(month&lt;10){month = "0"+month;}
    var current_date = year.toString()+'_'+month.toString()+'_'+date.toString()+'\n';
    if(current_date == response.split('-')[1]) {
    status = 'ND001';
    }
    else {
    status = 'ND000';
    }
    }
    return status.replace(/\s+/g, ' ');
    }
  </msxsl:script>
  <xsl:template match="/">
    <xsl:variable name="client_id" select="sms_gateway_response/client_id"/>
    <xsl:variable name="country_code" select="sms_gateway_response/country_code"/>
    <xsl:variable name="response" select="sms_gateway_response/response"/>
    <html>
      <xsl:value-of select="js:verify_response(string($client_id),string($country_code),string($response))"/>
    </html>
  </xsl:template>
</xsl:stylesheet>





