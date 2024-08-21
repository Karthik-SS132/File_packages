using System;
using System.Data;
using System.Data.SqlClient;
using System.Xml;
using System.Transactions;
using System.Configuration;
using System.Collections.Generic;

namespace CustomLibraries
{
    public class CustomUtil
    {
        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to resolve data source connection string
        // This function is relevant when the code generation option (for 'Data Access Layer Using' parameter) has been chosen as 'ADO.NET'
        public static String getConnectionString(Dictionary<object, object> contextDataItems, String applicationName, String serviceName)
        {
            //Default implementation provided below, uses application name to resolve connection string, with an assumption that each application may be deployed in its own database;
            //however, since context segment data items may also be used to resolve connection string, they are also passed as parameters to this function.
            //In such a case, override the default implementation provided below with suitable custom logic.
            string connectionstring;
            
            String sessionId = Convert.ToString(contextDataItems["sessionId"]);
            String userId = Convert.ToString(contextDataItems["userId"]);
            String client_id = Convert.ToString(contextDataItems["client_id"]);
            String locale_id = Convert.ToString(contextDataItems["locale_id"]);
            String country_code = Convert.ToString(contextDataItems["country_code"]);

            try
            {
             connectionstring = ConfigurationManager.ConnectionStrings["conn_"+client_id+"_"+country_code+"_"+"app"].ConnectionString;
            }
            catch
            {
                throw new Exception("Connection string could not be resolved");
            }
            return connectionstring;
       }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to resolve data source connection string key
        // This function is relevant when the code generation option (for 'Data Access Layer Using' parameter) has been chosen as 'Enterprise Library Data Access Block'
        public static String getDBConfigurationKey(Dictionary<object, object> contextDataItems, String applicationName, String serviceName)
        {
            //Default implementation provided below, returns application name itself as the db configuration key, with an assumption that each application may be deployed in its own database.
            //however, since context segment data items may also be used in determining the database (and hence the db configuration key), they are also passed as parameters to this function.
            //In such a case, override the default implementation provided below with suitable custom logic.
            string DBConfigurationKeyName = applicationName;

            String sessionId = Convert.ToString(contextDataItems["sessionId"]);
            String userId = Convert.ToString(contextDataItems["userId"]);
            String client_id = Convert.ToString(contextDataItems["client_id"]);
            String locale_id = Convert.ToString(contextDataItems["locale_id"]);
            String country_code = Convert.ToString(contextDataItems["country_code"]);

            return DBConfigurationKeyName;
        }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to check session validity
        public static Boolean isSessionValid(Dictionary<object, object> contextDataItems, String applicationName, String serviceName)
        {
             //Context data items are passed as input to this function as they may be used to validate session
			Boolean finalReturnValue = true;
			String i_session_id = Convert.ToString(contextDataItems["sessionId"]);
			String i_user_id = Convert.ToString(contextDataItems["userId"]);
			String i_client_id = Convert.ToString(contextDataItems["client_id"]);
			String i_locale_id = Convert.ToString(contextDataItems["locale_id"]);
			String i_country_code = Convert.ToString(contextDataItems["country_code"]);
					
			if(serviceName == "validate_device" || serviceName == "validate_client" || serviceName == "authenticate_client" || serviceName == "authenticate_user" || serviceName == "request_password") 
			{
				finalReturnValue = true;
			}
			else
			{
				SqlConnection conn = new SqlConnection();
				conn.ConnectionString = getConnectionString(contextDataItems, applicationName, serviceName);
				conn.Open();
				try
				{
					SqlCommand command = new SqlCommand();
					command.Connection = conn;
					command.CommandType = CommandType.StoredProcedure;
					command.Parameters.Clear();
					command.CommandText = "sp_validate_session";
					
					command.Parameters.Add("@i_client_id", SqlDbType.VarChar, 20).Value = i_client_id;
					
					Guid i_session_idguid;
					command.Parameters.Add("@i_session_id", SqlDbType.UniqueIdentifier).Value = (i_session_id != "") ? i_session_idguid = new Guid(i_session_id) : System.Data.SqlTypes.SqlGuid.Null;
					
					command.Parameters.Add("@i_user_id", SqlDbType.NVarChar, 12).Value = i_user_id;
					
					command.Parameters.Add("@i_locale_id", SqlDbType.VarChar, 5).Value = i_locale_id;
					
					command.Parameters.Add("@i_country_code", SqlDbType.VarChar, 3).Value = i_country_code;

                    SqlParameter o_valid_session_ind = new SqlParameter("@o_valid_session_ind", SqlDbType.Bit) { Direction = ParameterDirection.Output };
                    command.Parameters.Add(o_valid_session_ind);
					
					command.ExecuteNonQuery();
                    
					finalReturnValue = Convert.ToBoolean(o_valid_session_ind.Value.ToString());
				}
				catch (Exception exception) {
					finalReturnValue =  false;
				}
				finally {
					if(conn != null) {
						conn.Close();
						conn = null;
					}
				}
			}
			return finalReturnValue;
       }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to get custom error file name (if any)
        // This will be useful if multi-lingual error messages files have to be looked 
        // up based on appropriate context data item(s) such as locale
        public static string getErrorFileName(Dictionary<object, object> contextDataItems, String applicationName)
        {
            //Context data items are passed as input to this function as they may be used to resolve custom error file name
            string errorFileName = "";
            
            String sessionId = Convert.ToString(contextDataItems["sessionId"]);
            String userId = Convert.ToString(contextDataItems["userId"]);
            String client_id = Convert.ToString(contextDataItems["client_id"]);
            String locale_id = Convert.ToString(contextDataItems["locale_id"]);
            String country_code = Convert.ToString(contextDataItems["country_code"]);

            return errorFileName;
        }

        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to write service audit trail
        public static void writeAuditTrail(String applicationName, String serviceName, XmlDocument serviceRequestXMLDocument, XmlDocument serviceResponseXMLDocument, Dictionary<object, object> auditParams)
        {
            //applicationName, serviceName, service request/response documents and certain essential context information available
            //during service execution time have been provided in the form of auditParams, for recording in the audit trail
            string serviceStartTime = auditParams["ServiceStartTime"].ToString();
            string serviceEndTime = auditParams["ServiceEndTime"].ToString();
            string url = auditParams["Url"].ToString();
            string requestType = auditParams["RequestType"].ToString();
            string physicalPath = auditParams["PhysicalPath"].ToString();
            string userHostAddress = auditParams["UserHostAddress"].ToString();
            string userHostName = auditParams["UserHostName"].ToString();

            //Context segment has been extracted from the service request document and provided below as an XmlNode.
            //To extract a specific context data item, access the data item as contextNode["~context data item name~"].InnerText,
            //where ~context data item name~ is a placeholder that has to be substituted with the name of the actual context data item
            if (serviceRequestXMLDocument.FirstChild != null)
            {
                XmlNode contextNode = serviceRequestXMLDocument.FirstChild.SelectSingleNode("./context");
            }

            //Provided below, within the commented code block, is a default implementation of audit logging, which records the 
            //service audit trail in a file. Uncomment the following code block to use the default implementation. If a custom 
            //logic needs to be implemented for recording service audit trail, remove or alter the commented code block below and 
            //implement suitable custom logic.
            /*
            string serviceAuditTrailContent = "";
            serviceAuditTrailContent = "{" + Environment.NewLine;
            serviceAuditTrailContent += @"  ""Applicationname"":""" + applicationName + @"""," + Environment.NewLine;
            serviceAuditTrailContent += @"  ""Servicename"": """ + serviceName + @"""," + Environment.NewLine;
            serviceAuditTrailContent += @"  ""Servicerequest"": """ + CustomLogger.getXmlString(serviceRequestXMLDocument.OuterXml) + @"""," + Environment.NewLine;
            serviceAuditTrailContent += @"  ""Serviceresponse"": """ + CustomLogger.getXmlString(serviceResponseXMLDocument.OuterXml) + @"""," + Environment.NewLine;
            serviceAuditTrailContent += @"  ""Servicestarttime"": """ + serviceStartTime + @"""," + Environment.NewLine;
            serviceAuditTrailContent += @"  ""Serviceendtime"": """ + serviceEndTime + @"""," + Environment.NewLine;
            TimeSpan ts = Convert.ToDateTime(serviceEndTime).Subtract(Convert.ToDateTime(serviceStartTime));
            serviceAuditTrailContent += @"  ""Duration"": """ + ts.Seconds + "s " + ts.Milliseconds + @"ms""," + Environment.NewLine;
            serviceAuditTrailContent += @"  ""Url"": """ + url + @"""," + Environment.NewLine;
            serviceAuditTrailContent += @"  ""Requesttype"": """ + requestType + @"""," + Environment.NewLine;
            serviceAuditTrailContent += @"  ""Physicalpath"": """ + physicalPath.Replace(@"\", @"\\").Trim() + @"""," + Environment.NewLine;
            serviceAuditTrailContent += @"  ""UserhostIPaddress"": """ + userHostAddress + @"""," + Environment.NewLine;
            serviceAuditTrailContent += @"  ""Userhostname"": """ + userHostName + @"""" + Environment.NewLine + "}";

            string fileName = DateTime.Now.ToString("yyyy-MM-dd") + "_ServiceAuditTrail.log";
            string folderPath = AppDomain.CurrentDomain.BaseDirectory + @"\Log\ServiceAuditTrails";
            string AuditlogContents = "";

            if (!System.IO.Directory.Exists(folderPath))
                System.IO.Directory.CreateDirectory(folderPath);

            //Appending ',' to the existing content
            if (System.IO.File.Exists(folderPath + @"\" + fileName))
            {
                string lastChar = "";
                using (var reader = new System.IO.StreamReader(folderPath + @"\" + fileName))
                {
                    if (reader.BaseStream.Length > 1024)
                    {
                        reader.BaseStream.Seek(-1024, System.IO.SeekOrigin.End);
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
                    AuditlogContents = "," + Environment.NewLine;
                }
            }
            AuditlogContents += serviceAuditTrailContent;

            System.IO.File.AppendAllText(folderPath + @"\" + fileName, AuditlogContents);
            */
        }
        
        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to return enterprise library exception policy name
        // This function is relevant when the code generation option 'Inject logging code' is chosen
        public static string getELExceptionPolicyName(Dictionary<object, object> contextDataItems, String applicationName)
        {
            //Default implementation provided below, returns exception policy name as 'ServiceExceptionPolicy'
            //however, since context segment data items and application name are passed as parameters to this function, 
            //they may be used to determine exception policy name. 
            //In such a case, override the default implementation provided below with suitable custom logic.
            string exceptionPolicyName = "ServiceExceptionPolicy";
            
            if(contextDataItems != null)
            {
                String sessionId = Convert.ToString(contextDataItems["sessionId"]);
                String userId = Convert.ToString(contextDataItems["userId"]);
                String client_id = Convert.ToString(contextDataItems["client_id"]);
                String locale_id = Convert.ToString(contextDataItems["locale_id"]);
                String country_code = Convert.ToString(contextDataItems["country_code"]);
            }
            return exceptionPolicyName;
        }
        
        // Do not remove this method. Do not alter the name or signature of this method.
        // Function to return enterprise library log category name
        // This function is relevant when the code generation option 'Use Enterprise Library for exception handling' is chosen
        public static string getELLogCategoryName(Dictionary<object, object> contextDataItems, String applicationName)
        {
            //Default implementation provided below, returns log category name as 'ServiceLogCategory'
            //however, since context segment data items and application name are passed as parameters to this function, 
            //they may be used to determine log category name. 
            //In such a case, override the default implementation provided below with suitable custom logic.
            string logCategoryName = "ServiceLogCategory";

            if(contextDataItems != null)
            {
                String sessionId = Convert.ToString(contextDataItems["sessionId"]);
                String userId = Convert.ToString(contextDataItems["userId"]);
                String client_id = Convert.ToString(contextDataItems["client_id"]);
                String locale_id = Convert.ToString(contextDataItems["locale_id"]);
                String country_code = Convert.ToString(contextDataItems["country_code"]);
            }
            return logCategoryName;
        }

     }
}
