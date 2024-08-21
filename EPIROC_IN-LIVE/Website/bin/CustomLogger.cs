using System;
using System.Collections.Generic;
using System.Text;
using System.Xml;
using System.Data;
using System.IO;
using System.Configuration;
using System.Reflection;
using UmoldITLibraries;

namespace CustomLibraries
{
    public class CustomLogger
    {
        //Variables declaration
        public Boolean serviceLogging = false;
        private string applicationName, serviceName;
        public string loggerContent = "";

        public CustomLogger()
        {
            setServiceLoggingFlag();
        }

        public CustomLogger(String application_Name, String service_Name)
        {
            setServiceLoggingFlag();

            applicationName = application_Name;
            serviceName = service_Name;
        }

        private void setServiceLoggingFlag()
        {
            try
            {
                if (ConfigurationManager.AppSettings["SERVICE_LOGGING"] == "ON")
                {
                    serviceLogging = true;
                }
                else if (ConfigurationManager.AppSettings["SERVICE_LOGGING"] == "OFF")
                {
                    serviceLogging = false;
                }
            }
            catch
            {
                serviceLogging = false;
            }
        }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to format and log the given contents (1 of 2 overloads)
        public void buildLogmessage(string logContext)
        {
            buildLogmessage(logContext, null);
        }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to format and log the given contents (2 of 2 overloads)
        public void buildLogmessage(string logContext, Dictionary<object, object> logContents)
        {
            loggerContent += logContext + Environment.NewLine;
            if (logContents != null)
            {
                buildLogParams(ref loggerContent, logContents, true);
            }
            loggerContent += "------------------------------------------------------------" + Environment.NewLine;
        }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to format and log the given contents
        public void buildLogParams(ref string logMessage, Dictionary<object, object> logContents, Boolean useCSNewLine)
        {
            bool firstsparam = true;
            string indentLevel = "";
            string newLine = "";
            if (useCSNewLine)
            {
                indentLevel = "   ";
                firstsparam = false;
                newLine = Environment.NewLine;
            }
            else
            {
                indentLevel = "\\t";
                newLine = "\\r\\n";
            }
            foreach (var item in logContents)
            {
                logMessage += indentLevel;
                if (item.Value != null)
                {
                    if (item.Value.GetType().Name == "DataTable")
                    {
                        logMessage += item.Key;
                        logMessage += FormatDataTableToLog((DataTable)item.Value, (indentLevel + indentLevel), newLine, useCSNewLine);
                    }
                    else if (item.Value.GetType().Name == "XmlDocument")
                    {
                        logMessage += item.Key + " = " + ((item.Value) as XmlDocument).OuterXml + newLine;
                    }
                    else if (item.Value.GetType().Name == "XPathNodeList")
                    {
                        logMessage += item.Key;
                        logMessage += FormatNodeListToLog((XmlNodeList)item.Value, (indentLevel + indentLevel), newLine, useCSNewLine);
                    }
                    else if (item.Value.GetType().IsArray == true)
                    {
                        logMessage += item.Key;
                        logMessage += FormatObjectArrayToLog((Object[])item.Value, (indentLevel + indentLevel), newLine, useCSNewLine);
                    }
                    else
                    {
                        if (firstsparam)
                        {
                            logMessage += "Scalar parameters:" + newLine;
                            logMessage += indentLevel;
                            firstsparam = false;
                        }
                        logMessage += indentLevel + (item.Key + " = " + item.Value);
                    }
                }
                else
                {
                    if (item.Key.ToString().Contains("Vector parameter:"))
                    {
                        logMessage += item.Key;
                    }
                    else
                    {
                        if (firstsparam)
                        {
                            logMessage += "Scalar parameters:" + newLine;
                            logMessage += indentLevel;
                            firstsparam = false;
                        }
                        logMessage += indentLevel + (item.Key + " = NULL (i.e. value unknown)");
                    }
                }
                logMessage += newLine;
            }
        }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to format and log contents of the given exception object, along with the context of the exception.
        // logContext parameter should be used to indicate the runtime execution context, e.g. the function in which the exception occured. This parameter 
        // may be used inside custom functions from where this method may be invoked
        public static void writeInvalidOperationExceptionlog(string applicationName, string serviceName, XmlDocument inDoc, XmlDocument serviceData, XmlDocument outDoc, string logContext, string logContents, Exception exception)
        {
            string serviceRequestContent = "", serviceDataContent = "", serviceResponseContent = "";
            string logContentsDetails = "";

            if (inDoc != null)
                serviceRequestContent = getXmlString(inDoc.OuterXml);

            if (serviceData != null)
                serviceDataContent = getXmlString(serviceData.OuterXml);

            if (outDoc != null)
                serviceResponseContent = getXmlString(outDoc.OuterXml);

            if (logContents != "")
            {
                logContentsDetails += getInstructionComment();
                logContentsDetails += logContents;
            }
            writeServiceExceptionlog(applicationName, serviceName, logContext, serviceRequestContent, serviceDataContent, serviceResponseContent, logContentsDetails, exception);
        }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to format and log contents of the given exception object, along with the context of the exception.
        // logContext parameter should be used to indicate the runtime execution context, e.g. the function in which the exception occured. This parameter 
        // may be used inside custom functions from where writeExceptionlog method may be invoked

        public static void writeExceptionlog(string applicationName, string serviceName, XmlDocument inDoc, XmlDocument outDoc, string logContext, Exception exception)
        {
            writeExceptionlog(applicationName, serviceName, inDoc, outDoc, null, logContext, exception);
        }

        public static void writeExceptionlog(string applicationName, string serviceName, XmlDocument inDoc, XmlDocument outDoc, XmlDocument serviceData, string logContext, Exception exception)
        {
            string serviceRequestContent = "", serviceDataContent = "", serviceResponseContent = "";

            if (inDoc != null)
                serviceRequestContent = getXmlString(inDoc.OuterXml);

            if (serviceData != null)
                serviceDataContent = getXmlString(serviceData.OuterXml);

            if (outDoc != null)
                serviceResponseContent = getXmlString(outDoc.OuterXml);

            writeServiceExceptionlog(applicationName, serviceName, logContext, serviceRequestContent, serviceDataContent, serviceResponseContent, "", exception);
        }

        private static string getInstructionComment()
        {
            string messsage = "\\r\\nNote:\\r\\n";
            messsage += "- In case of scalar data items, their values as at the time of the error have been logged below. If a data item caused an exception, then that parameter as also rest of the parameters have been printed with the literal 'NULL (i.e., value unknown)' next to them. The first occurrence of data item with the value 'NULL (i.e., value unknown)' should be examined further.\\r\\n";
            messsage += "- In case of lists,\\r\\n For OBJECTS internal structure,\\r\\n a. In case of input parameters, all input list parameters have been printed with the proper row values as at the time of the error.\\r\\n  The last list with values could be the point of error, where null reference exception could have occurred while filling values for a new entry in that list.\\r\\n b. In case of output parameters, the erroneous list with its row values have been logged below at the time of exception.\\r\\n  The last row of this list could be the point of error. Data item printed with the literal as 'NULL (i.e., value unknown)', which should be examined further.\\r\\nFor XML internal structure,\\r\\n a. In case of input parameters, all input list parameters have been printed with the row values as at the time of the error.\\r\\n  The last row of the last list below is the point of error. Data item printed with the literal as 'NULL (i.e., value unknown)'), should be examined further.\\r\\n b. In case of output parameters, the erroneous list with its row values as at the time of exception has been logged below.\\r\\n  The last row of this list could be the point of error. Data item printed with the literal as 'NULL (i.e., value unknown)', should be examined further.\\r\\n";
            messsage += "- To know the line of code that generated the error, build and deploy generated code with debug build option.\\r\\n";
            return messsage;
        }

        private static string buildExceptionContent(Exception exception)
        {
            string formattedExceptionMessage = "";
            string formattedExceptionTraceMessage = exception.StackTrace.Replace(@"\", @"\\").Trim();

            formattedExceptionMessage += @"\r\n\tType: " + exception.GetType().ToString() + "\\r\\n" +
                                    @"\tMessage: " + exception.Message + "\\r\\n" +
                                    @"\tSource: " + exception.Source + "\\r\\n" +
                                    @"\tInnerException: " + exception.InnerException + "\\r\\n";
            if (exception.InnerException != null)
            {
                formattedExceptionMessage += @"\tInnerException.Message: " + exception.InnerException.Message + "\\r\\n";
            }
            formattedExceptionMessage += @"\tHelpLink: " + exception.HelpLink + "\\r\\n" +
                                    @"\tData: " + exception.Data + "\\r\\n" +
                                    @"\tTargetSite: " + exception.TargetSite + "\\r\\n" +
                                    @"\tStackTrace: " + System.Text.RegularExpressions.Regex.Replace(formattedExceptionTraceMessage, @"\r\n|\n", "\\r\\n\\t") + "";

            return formattedExceptionMessage;
        }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to write the given message into a service exception log file
        private static void writeServiceExceptionlog(string applicationName, string serviceName, string logContext, string serviceRequestContent, string serviceDataContent, string serviceResponseContent, string logContentsDetails, Exception exception)
        {
            string expLogContent = "";
            expLogContent = "{" + Environment.NewLine + @"  ""Time"":""" + DateTime.Now.ToString("yyyy/MM/dd hh:mm:ss tt") + @"""," + Environment.NewLine;
            expLogContent += @"  ""Applicationname"":""" + applicationName + @"""," + Environment.NewLine;
            expLogContent += @"  ""Servicename"": """ + serviceName + @"""," + Environment.NewLine;
            expLogContent += @"  ""Message"": """ + exception.Message + @"""," + Environment.NewLine;
            expLogContent += @"  ""logcontext"": """ + logContext + @"""," + Environment.NewLine;
            expLogContent += @"  ""Details"": """"," + Environment.NewLine;
            expLogContent += @"  ""Serviceinput"": """ + serviceRequestContent + @"""," + Environment.NewLine;
            expLogContent += @"  ""Servicedata"": """ + serviceDataContent + @"""," + Environment.NewLine;
            expLogContent += @"  ""Serviceoutput"": """ + serviceResponseContent + @"""," + Environment.NewLine;
            expLogContent += @"  ""logcontents"": """ + logContentsDetails + @"""," + Environment.NewLine;
            expLogContent += @"  ""Exception"": """ + buildExceptionContent(exception) + @"""" + Environment.NewLine + "}";

            string fileName = DateTime.Now.ToString("yyyy-MM-dd") + "_ServiceException.log";
            string folderPath = AppDomain.CurrentDomain.BaseDirectory + @"\Log\ServiceExceptions";
            string ExplogContents = "";

            //Appending ',' to the existing content
            if (System.IO.File.Exists(folderPath + @"\" + fileName))
            {
                string lastChar = "";
                using (var reader = new StreamReader(folderPath + @"\" + fileName))
                {
                    if (reader.BaseStream.Length > 1024)
                    {
                        reader.BaseStream.Seek(-1024, SeekOrigin.End);
                    }
                    string line;
                    while ((line = reader.ReadLine()) != null)
                    {
                        lastChar = line;
                    }
                    reader.Close();
                }
                if (lastChar == "}")
                {
                    ExplogContents = "," + Environment.NewLine;
                }
            }
            ExplogContents += expLogContent;
            writelog("ServiceExceptions", fileName, ExplogContents);
        }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to write the given message into a service trace log file
        public void writeServiceTracelog(string applicationName, string serviceName)
        {
            string logFileName = applicationName + "_" + serviceName + "_" + DateTime.Now.ToString("yyyy-MM-ddTHH.mm.ss.fff") + ".log";
            CustomLogger.writelog("ServiceAuditTrails", logFileName, loggerContent);
        }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to write the given content into the given log file
        public static void writelog(string subfoldername, string fileName, string message)
        {
            string folderPath = AppDomain.CurrentDomain.BaseDirectory + @"\Log\" + subfoldername;

            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
            File.AppendAllText(folderPath + @"\" + fileName, message);
        }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function 
        private static string FormatNodeListToLog(XmlNodeList nodeList, string indentLevel, string newLine, Boolean useCSNewLine)
        {
            string formatednodeListItems = "";
            bool isFirstRow = true;

            formatednodeListItems = indentLevel + "[" + newLine;
            foreach (XmlNode node in nodeList)
            {
                bool IsfirstColumnItem = true;
                if (!isFirstRow)
                    formatednodeListItems += "," + newLine;

                formatednodeListItems += indentLevel + "{";
                foreach (XmlNode item in node.ChildNodes)
                {
                    if (!IsfirstColumnItem)
                        formatednodeListItems += ",";

                    IsfirstColumnItem = false;
                    
                    if(useCSNewLine)
                        formatednodeListItems += @"""" + item.Name + @""":""";
                    else
                        formatednodeListItems += @"\""" + item.Name + @"\"":\""";

                    if (item.ChildNodes.Count > 0)
                        formatednodeListItems += item.InnerText;
                    else
                        formatednodeListItems += "NULL (i.e. value unknown)";

                    if (useCSNewLine)
                        formatednodeListItems += @"";
                    else
                        formatednodeListItems += @"\""";
                }
                isFirstRow = false;
                formatednodeListItems += "}";
            }
            formatednodeListItems += newLine + indentLevel + "]";

            return newLine + formatednodeListItems;
        }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function 
        private static string FormatDataTableToLog(DataTable paramTable, string indentLevel, string newLine, Boolean useCSNewLine)
        {
            string formatedRowListItems = "";
            bool isFirstRow = true;

            if (paramTable.Rows.Count > 0)
            {
                formatedRowListItems = indentLevel + "[" + newLine;
                foreach (DataRow iDataRow in paramTable.Rows)
                {
                    bool IsfirstDataItem = true;

                    if (!isFirstRow)
                        formatedRowListItems += "," + newLine;

                    formatedRowListItems += indentLevel + "{";

                    foreach (DataColumn iDataCol in paramTable.Columns)
                    {
                        if (!IsfirstDataItem)
                            formatedRowListItems += ",";

                        IsfirstDataItem = false;

                        if (useCSNewLine)
                            formatedRowListItems += @"""" + iDataCol.ColumnName + @""":""";
                        else
                            formatedRowListItems += @"\""" + iDataCol.ColumnName + @"\"":\""";

                        if (!iDataRow.IsNull(iDataCol.ColumnName))
                            formatedRowListItems += iDataRow[iDataCol].GetType() == typeof(System.Boolean) ? iDataRow[iDataCol].ToString().ToLower() : iDataRow[iDataCol].ToString();
                        else
                            formatedRowListItems += "NULL (i.e. value unknown)";

                        if (useCSNewLine)
                            formatedRowListItems += @"""";
                        else
                            formatedRowListItems += @"\""";
                    }

                    isFirstRow = false;
                    formatedRowListItems += "}";
                }
                formatedRowListItems += newLine + indentLevel + "]";
            }
            else // print table columns, if no rows exists in the table
            {
                if (paramTable.Columns.Count > 0)
                {
                    formatedRowListItems = indentLevel + "[" + newLine;
                    bool IsfirstDataItem = true;
                    if (!isFirstRow)
                        formatedRowListItems += "," + newLine;

                    formatedRowListItems += indentLevel + "{";
                    foreach (DataColumn iDataCol in paramTable.Columns)
                    {
                        if (!IsfirstDataItem)
                            formatedRowListItems += ",";

                        IsfirstDataItem = false;

                        if (useCSNewLine)
                            formatedRowListItems += @"""" + iDataCol.ColumnName + @""":""NULL (i.e. value unknown)""";
                        else
                            formatedRowListItems += @"\""" + iDataCol.ColumnName + @"\"":\""NULL (i.e. value unknown)\""";
                    }
                    formatedRowListItems += "}";
                    formatedRowListItems += newLine + indentLevel + "]";
                }
            }
            if (formatedRowListItems == "")
                return formatedRowListItems;

            return newLine + formatedRowListItems;
        }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function 
        private static string FormatObjectArrayToLog(Object[] objArray, string indentLevel, string newLine, Boolean useCSNewLine)
        {
            string formatedRowListItems = "";
            bool isFirstRow = true;

            PropertyInfo[] objProperties = objArray.GetType().GetElementType().GetProperties();
            formatedRowListItems = indentLevel + "[" + newLine;
            for (int i = 0; i < objArray.Length; i++)
            {
                object obj = objArray[i];
                if (obj == null) continue;

                bool IsfirstColumnItem = true;
                if (!isFirstRow)
                    formatedRowListItems += "," + newLine;

                formatedRowListItems += indentLevel + "{";

                foreach (PropertyInfo prop_info in objProperties)
                {
                    if (!IsfirstColumnItem)
                        formatedRowListItems += ",";

                    IsfirstColumnItem = false;

                    if (useCSNewLine)
                        formatedRowListItems += @"""" + prop_info.Name + @""":""";
                    else
                        formatedRowListItems += @"\""" + prop_info.Name + @"\"":\""";

                    if (prop_info.GetValue(obj, null) != null)
                        formatedRowListItems += prop_info.GetValue(obj, null).ToString();
                    else
                        formatedRowListItems += "NULL (i.e. value unknown)";

                    if (useCSNewLine)
                        formatedRowListItems += @"""";
                    else                            
                        formatedRowListItems += @"\""";
                }
                isFirstRow = false;
                formatedRowListItems += "}";
            }
            formatedRowListItems += newLine + indentLevel + "]";
            return newLine + formatedRowListItems;
        }

        private static string getXmlString(String value)
        {
            XmlDocument convertedXml = new XmlDocument();
            convertedXml.InnerXml = "<document><convertedValue/></document>";
            convertedXml.FirstChild.SelectSingleNode("./convertedValue").InnerText = value;
            string formattedValue = convertedXml.FirstChild.SelectSingleNode("./convertedValue").InnerXml;
            formattedValue = formattedValue.Replace(@"\", @"\\""").Replace(@"""", @"\""");
            return formattedValue;
        }
    }
}