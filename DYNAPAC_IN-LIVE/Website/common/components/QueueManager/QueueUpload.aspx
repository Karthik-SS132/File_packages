<%@ Page Language="C#" AutoEventWireup="true" %>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="System.IO" %>
<%@ Import Namespace="System.Security.Cryptography" %>
<%@ Import Namespace="msvInterface" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        String clientID, countryCode, userID, filePath, fileName, userDirectory;
        HttpPostedFile file;

        file = Request.Files[0];
        clientID = Request.QueryString["client_id"];
        countryCode = Request.QueryString["country_code"];
        userID = Request.QueryString["user_id"];
        filePath = Request.QueryString["file_path"];
        fileName = Request.QueryString["file_name"];
        
        try
        {           
            userDirectory = HttpContext.Current.Server.MapPath("~\\content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "QueueManager" + "\\" + userID);

            if (!Directory.Exists(userDirectory + "\\" + "temp"))
            {
                Directory.CreateDirectory(userDirectory + "\\" + "temp");
            }

            if (!Directory.Exists(userDirectory + "\\" + filePath))
            {
                Directory.CreateDirectory(userDirectory + "\\" + filePath);
            }

            if (filePath == "queue")
            {
                file.SaveAs(userDirectory + "\\" + "temp" + "\\" + fileName);

                if (fileName.Contains("_"))
                {
                    File.WriteAllText(userDirectory + "\\" + filePath + "\\" + fileName, Decrypt(File.ReadAllText(userDirectory + "\\" + "temp" + "\\" + fileName), "8080808080808080", "8080808080808080"));
                }
                else
                {
                    File.WriteAllText(userDirectory + "\\" + filePath + "\\" + fileName, File.ReadAllText(userDirectory + "\\" + "temp" + "\\" + fileName));
                }

                File.Delete(userDirectory + "\\" + "temp" + "\\" + fileName);

                if (!Directory.Exists(HttpContext.Current.Server.MapPath("~\\log" + "\\" + "msvQmgr" + "\\" + "audit" + "\\" + "queue")))
                {
                    Directory.CreateDirectory(HttpContext.Current.Server.MapPath("~\\log" + "\\" + "msvQmgr" + "\\" + "audit" + "\\" + "queue"));
                }

                File.AppendAllText(HttpContext.Current.Server.MapPath("~\\log" + "\\" + "msvQmgr" + "\\" + "audit" + "\\" + "queue") + "\\" + DateTime.Now.ToString("dd-MM-yyyy") + "-" + clientID + "-" + countryCode + ".txt", "{\"u\":\"" + userID + "\",\"f\":\"" + fileName + "\",\"t\":\"" + DateTime.Now.ToString("HHmmssfff") + "\"},");
            }
            else
            {
                file.SaveAs(userDirectory + "\\" + filePath + "\\" + fileName);
            }

            Response.Write("true");
        }
        catch(Exception ex)
        {
			msvUtil.LogException(clientID, countryCode, "QueueManager", ex.Message, ex.StackTrace);
            Response.Write("false");
        }
    }

    public static String Decrypt(String cipherText, String key, String iv)
    {
        String plainText;

        try
        {
            var keyBytes = Encoding.UTF8.GetBytes(key);
            var ivBytes = Encoding.UTF8.GetBytes(iv);
            var cipherTextBytes = Convert.FromBase64String(cipherText);

            if (cipherTextBytes == null || cipherTextBytes.Length <= 0)
            {
                throw new ArgumentNullException("Invalid Cipher Text");
            }
            if (keyBytes == null || keyBytes.Length <= 0)
            {
                throw new ArgumentNullException("Invalid Key");
            }
            if (ivBytes == null || ivBytes.Length <= 0)
            {
                throw new ArgumentNullException("Invalid Iv");
            }

            using (var algorithm = new RijndaelManaged())
            {
                algorithm.Mode = CipherMode.CBC;
                algorithm.Padding = PaddingMode.PKCS7;
                algorithm.FeedbackSize = 128;

                algorithm.Key = keyBytes;
                algorithm.IV = ivBytes;

                var decryptor = algorithm.CreateDecryptor(algorithm.Key, algorithm.IV);

                try
                {
                    using (var memory = new MemoryStream(cipherTextBytes))
                    {
                        using (var crypto = new CryptoStream(memory, decryptor, CryptoStreamMode.Read))
                        {
                            using (var reader = new StreamReader(crypto))
                            {
                                plainText = reader.ReadToEnd();
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }

            return plainText.Trim();
        }
        catch (Exception ex)
        {
            throw ex;
        }
    }
</script>