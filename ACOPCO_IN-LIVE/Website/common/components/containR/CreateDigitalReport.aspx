<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="NReco.PdfGenerator" %>
<%@ Import Namespace="Newtonsoft.Json" %>
<%@ Import Namespace="msvInterface" %>

<script runat="server">

    protected void Page_Load(object sender, EventArgs e)
    {
        String sessionID, clientID, countryCode, localeID, userID, filePath, fileName, reportType, reportData, storageFilePath, storageFileName, headerData, footerData, responseMessage;
        HtmlToPdfConverter pdf;
        int startIndex, endIndex;
		
        clientID = "";
        countryCode = "";

        try
        {
            /* LOADING THE INPUTPARAMETERS */
            var fmtObject = JsonConvert.DeserializeObject<dynamic>(new StreamReader(Request.InputStream).ReadToEnd());

            /* READING THE CONTEXT ELEMENTS */
            sessionID = (String)fmtObject.context.sessionId;
            clientID = (String)fmtObject.context.client_id;
            countryCode = (String)fmtObject.context.country_code;
            localeID = (String)fmtObject.context.locale_id;
            userID = (String)fmtObject.context.userId;


            /* READING THE INPUT PARAMETERS */
            filePath = (String)fmtObject.context.inputparam.p_file_path;
            fileName = (String)fmtObject.context.inputparam.p_file_name;
            reportType = (String)fmtObject.context.inputparam.p_report_type;
            reportData = (String)fmtObject.context.inputparam.p_report_data;


            /* SETTING UP THE STORAGE DETAILS */
            storageFilePath = HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + filePath);
            storageFileName = HttpContext.Current.Server.MapPath("~/content_store" + "\\" + clientID + "\\" + countryCode + "\\" + filePath + "\\" + fileName);


            /* CREATING THE STORAGE REPOSITORY */
            if (!Directory.Exists(storageFilePath))
            {
                Directory.CreateDirectory(storageFilePath);
            }


            /* CREATING THE REPORT */
            if (reportType == "data")
            {
                File.WriteAllText(storageFileName, reportData);
            }
            else
            {
                pdf = new HtmlToPdfConverter();
                pdf.Size = PageSize.A4;
                pdf.Orientation = PageOrientation.Portrait;
                headerData = "";
                footerData = "";


                /* SETTING UP PAGE HEADER */
                if (reportData.Contains("<mserviceheader>"))
                {
                    startIndex = reportData.IndexOf("<mserviceheader>");
                    endIndex = (reportData.IndexOf("</mserviceheader>") + 17) - startIndex;
                    headerData = reportData.Substring(startIndex, endIndex);
                    reportData = reportData.Remove(startIndex, endIndex);
                }


                /* SETTING UP PAGE FOOTER */
                if (reportData.Contains("<mservicefooter>"))
                {
                    startIndex = reportData.IndexOf("<mservicefooter>");
                    endIndex = (reportData.IndexOf("</mservicefooter>") + 17) - startIndex;
                    footerData = reportData.Substring(startIndex, endIndex);
                    reportData = reportData.Remove(startIndex, endIndex);
                }


                /* GENERATING THE PDF DOCUMENT */
                pdf.PageHeaderHtml = headerData;
                pdf.PageFooterHtml = footerData;
                pdf.GeneratePdf("<meta charset = 'UTF-8'>" + reportData, null, storageFileName);
            }

            responseMessage = "{\"ApplicationException\": null}";
        }
        catch (Exception ex)
        {
            msvUtil.LogException(clientID, countryCode, "CreateDigitalReport", ex.Message, ex.StackTrace);
			
            responseMessage = "{\"ApplicationException\": {\"errorMessage\": \"\", \"errorDescription\" : \"" + "{\\\"code\\\":\\\"create_digital_report_error\\\"}" + "\"}}";
        }

        Response.Write(responseMessage);
    }
</script>