<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		
		<html>
			<head>
				<title>ACG Service Report</title>
				<style>
					table{ border-collapse: collapse; table-layout: fixed; width: 100%;	}
					.value{	text-align:left;font-size:15px; padding-left:5px;}
					.label{	font-size:15px; padding-left:5px;font-weight:bold;}
					div { font-size:12px; padding-left:5px; background-color: white;}
					.bottomleft { position: absolute;bottom: 8px; }
				tr 
					{ 
					page-break-inside:avoid; 
					page-break-after:auto;
					}
				</style>
			</head>
			<body>
				<mserviceheader>
					<table style="width:100%; table-layout:fixed; border-collapse:collapse;">
						<tr height="40px">
							
						<td style="text-align:left;"></td>


					        <td style="text-align:right;">
							<img style="width:40%;" src="data:image/jpeg;base64,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"/>
							 <br/>
							</td>
							
						</tr>
					</table>
				</mserviceheader>
				<br/>
				
				<table border="1" >
				
								
					<tr height="10px">
					<td colspan="100" class="label" style="text-align :center;">FOC FORM</td>
					</tr>
					
				   
						
					<tr height="10px">
					<td colspan="30" class="label"><b>Customer name  and Location	</b></td>
					<td colspan="70" class="value">
					<xsl:value-of select="inputparam/customer_name" />
					,<xsl:value-of select="inputparam/customer_loc" />

					</td>
					</tr>
					
					<tr height="10px">
					<td colspan="30" class="label"><b>Contact Person</b></td>
					<td colspan="70" class="value">
					<xsl:value-of select="inputparam/cust_conta_name" />
					</td>
					</tr>
					<tr height="10px">
					<td colspan="30" class="label"><b>Customer Contact No </b></td>
					<td colspan="70" class="value">
					<xsl:value-of select="inputparam/cust_cont_no" />
					</td>
					</tr>
					
					<tr height="10px">
					<td colspan="30" class="label"><b>FOC requested by	</b></td>
					<td colspan="70" class="value">
					<xsl:value-of select="inputparam/foc_req_by" />
					</td>
					</tr>
					<tr height="10px">
					<td colspan="30" class="label"><b>Machine I and C date </b></td>
					<td colspan="70" class="value">
					<xsl:value-of select="inputparam/mach_sn" />
					</td>
					</tr>
					<tr height="10px">
					<td colspan="30" class="label"><b>Machine/Spares/Attachment Order No.</b></td>
					<td colspan="70" class="value">
					<xsl:value-of select="inputparam/sono" />
					</td>
					</tr>
					<tr height="10px">
					<td colspan="30" class="label"><b>Machine/Spares/Attachment Order Date</b></td>
					<td colspan="70" class="value">
					<xsl:value-of select="inputparam/sono_date" />
					</td>
					</tr>
					
					
					<tr height="10px">
					<td colspan="30" class="label"><b>Model	</b></td>
					<td colspan="70" class="value">
					<xsl:value-of select="inputparam/model_serial_batch" />
					</td>
					</tr>
					<tr height="10px">
					<td colspan="30" class="label"><b>Machine Srl no</b></td>
					<td colspan="70" class="value">
					<xsl:value-of select="inputparam/mach_srl" />
					</td>
					</tr>
					<tr height="10px">
					<td colspan="30" class="label"><b>Batch no</b></td>
					<td colspan="70" class="value">
					<xsl:value-of select="inputparam/batch" />
					</td>
					</tr>
					<tr height="10px">
					<td colspan="30" class="label"><b>Product dispatch date	</b></td>
					<td colspan="70" class="value">
					<xsl:value-of select="inputparam/product_dis_date" />
					</td>
					</tr>
					
	            <tr height="10px">
					<td colspan="30" class="label"><b>Under warranty	</b></td>
					<td colspan="70" class="value">
					<xsl:choose>
								<xsl:when test="inputparam/under_warranty ='1'">
									&#160;<span class="value">&#10004;</span>
								</xsl:when>
							</xsl:choose>
							<xsl:choose>
								<xsl:when test="inputparam/under_warranty ='0'">
									&#160;<span class="value">&#10008;</span>
								</xsl:when>
							</xsl:choose>	
							</td>
					</tr>
					
					<tr height="10px">
					<td colspan="30" class="label"><b>FOC for</b></td>
					<td colspan="70" class="value">
					<xsl:value-of select="inputparam/foc_for" />
					</td>
					</tr>
					<tr height="10px">
					  	<td colspan="100" class="label" style="text-align:center;"><b>Reason for FOC (in detail)</b>
						
						
						</td>
                     </tr>	
					 
					<tr height="10px">
					  	<td colspan="30" class="label"><b>Within warranty </b>
						</td>
						<td colspan="70" class="value">
							<xsl:value-of select="inputparam/within_warranty" />
						</td>
                     </tr>	
						
						<tr height="10px">
					  	<td colspan="30" class="label"><b>Outside Warranty </b>
						</td>
						<td colspan="70" class="value">
							<xsl:value-of select="inputparam/outside_warranty" />
						</td>
                     </tr>	
					 	<tr height="10px">
					  	<td colspan="30" class="label"><b>Reason for FOC in Details</b>
						
						
						</td>
                    
						<td colspan="70" class="value">
							<xsl:value-of select="inputparam/detail_for_others" />
						</td>
                     </tr>	
					
					
					</table>
					<br/>
					<table border="1">
		              <tr height="10px">
						 
						<td colspan="100" class="label" style="text-align:center;"><b>Parts Details</b></td>
						</tr>
					 <tr height="10px">
						 
						<td colspan="30" class="label"><b>Part No</b></td>
						<td colspan="35" class="label"><b>Description</b></td>
						<td colspan="35" class="label"><b>Quantity</b></td>
						
						</tr>
						<xsl:for-each select="inputparam/part_required">	
						<tr height="10px">
						<td colspan="30" class="value" style="font-size:14px;text-align:left;">
						<xsl:value-of select="item_part_savedetails" />
						</td>	
						<td colspan="35" class="value" style="font-size:14px;text-align:left;">
						<xsl:value-of select="desc_savedetails"/>
						</td>
						<td colspan="35" class="value" style="font-size:14px;text-align:left;">
						<xsl:value-of select="qty_savedetails"/>
						</td>
						
						</tr>
						</xsl:for-each>
				</table>
					<br/>
					<table border="1">
					
						
							<tr height="100px">
					  	<td colspan="30" class="label"><b>CAPA/ RCA in brief:</b>
						</td>
						<td colspan="70" class="value">
							<xsl:value-of select="inputparam/capa_rca_savedetails" />
						</td>
                     </tr>
					 <tr height="100px">
					  	<td colspan="30" class="label"><b>Action to be taken</b>
						</td>
						<td colspan="70" class="value">
							<xsl:value-of select="inputparam/action_savedetails" />
						</td>
                     </tr>
					
							<tr height="10px">
					
							<td colspan="30" class="label" style="text-align : left;font-size:15px;"><b>Service Engineer Signature</b>
							</td>
							<td colspan="70"  style="text-align:center;" >
								<img style="height:60px; width:165px" src="{inputparam/cust_ename}"/>
							</td>
						
						
						
					</tr>
						</table>
						<br/>
										
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>