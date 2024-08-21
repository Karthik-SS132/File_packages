import os
import re
import json
import email
import imaplib
import datetime
import ast
from pathlib import Path


def ReadEmail(appRoot, clientID, countryCode, infoXType, infoXChannel, fmtConfig):

    fmtConfigJsonData = ""
    imapServerName = ""
    imapUserName = ""
    imapPassword = ""
    senderFilter = ""
    subjectFilter = ""
    saveMailBody = ""
    saveMailHeaders = ""
    saveMailAttachments = ""
    currentDateValue = ""
    imap = ""
    mailBytes = ""
    unreadMails = ""
    emailDataByte = ""
    emailData = ""
    fromEmailIdContenet = ""
    fromEmailId = ""
    emailSubject = ""
    senderPatternRegex = ""
    senderPatternValue = ""
    subjectPatternRegex = ""
    subjectPatternValue = ""
    processIndicator = True
    filePathList = ""
    responseData = ""

    try:

        # GET STRING VALUE OF FMT CONFIG
        fmtConfigJsonData = json.loads(fmtConfig)

        # GET IMAP VALUES FROM THE FMT CONFIG STRING
        imapServerName = fmtConfigJsonData['infoXChannelConfiguration']['imapServerName']

        imapUserName = fmtConfigJsonData['infoXChannelConfiguration']['imapUserName']

        imapPassword = fmtConfigJsonData['infoXChannelConfiguration']['imapPassword']

        senderFilter = fmtConfigJsonData['infoXChannelConfiguration']['senderFilter']

        subjectFilter = fmtConfigJsonData['infoXChannelConfiguration']['subjectFilter']

        saveMailBody = fmtConfigJsonData['infoXChannelConfiguration']['saveMailBody']

        saveMailHeaders = fmtConfigJsonData['infoXChannelConfiguration']['saveMailHeaders']

        saveMailAttachments = fmtConfigJsonData['infoXChannelConfiguration']['saveMailAttachments']

        # CHECKING IMAP LOGIN CREDENTIALS VALUE IS EMPTY OR NOT
        if imapServerName == None or imapServerName == "":
            responseData = "{\"status\":\"failure\", \"responseData\":\"" + "imapServerName is empty." + " Please update the imapServerName " + "\"}"
            processIndicator = False

        if processIndicator == True:
            if imapUserName == None or imapUserName == "":
                responseData = "{\"status\":\"failure\", \"responseData\":\"" + "imapUserName is empty." + " Please update the imapUserName " + "\"}"
                processIndicator = False

            if processIndicator == True:
                if imapPassword == None or imapPassword == "":
                    responseData = "{\"status\":\"failure\", \"responseData\":\"" + "imapPassword is empty." + " Please update the imapPassword " + "\"}"
                    processIndicator = False

            if processIndicator == True:
                if ((saveMailBody == "false" or saveMailBody == "") and (saveMailAttachments == "false" or saveMailAttachments == "") and (saveMailHeaders == "false" or saveMailHeaders == "")):
                    responseData = "{\"status\":\"failure\", \"responseData\":\"" + "There is no true value in saveMailBody, saveMailAttachments, saveMailHeaders  " + "Please update the true value in saveMailBody, saveMailAttachments, saveMailHeaders  " + "\"}"
                    processIndicator = False

                if processIndicator == True:
                    for key in fmtConfigJsonData['infoXChannelConfiguration']['attachment']:
                        attachmentPattern = key['pattern']
                        if attachmentPattern == "" or attachmentPattern == None:
                            processIndicator = False
                            responseData = "{\"status\":\"failure\", \"responseData\":\"" + "attachmentPattern Is Empty  " + "Please update the attachmentPattern from fmt file " + "\"}"
                            break

                        attachmentPath = key['path']
                        if attachmentPath == "" or attachmentPath == None:
                            processIndicator = False
                            responseData = "{\"status\":\"failure\", \"responseData\":\"" + "attachmentPath Is Empty  " + "Please update the attachmentPath from fmt file " + "\"}"
                            break

                    if processIndicator == True:

                        # CREATE FOLDER WITH CURRENT DATE AND TIME FOR SAVE HTML FILE AND ATTACHEMNTS
                        currentDateValue = datetime.datetime.utcnow().strftime('%Y_%m_%d_%H_%M_%S_%f')

                        # IMAP CONNECT
                        imap = imaplib.IMAP4_SSL(imapServerName)
                        imap.login(imapUserName, imapPassword)

                        # FETCH UNREAD MAILS
                        imap.select('INBOX')
                        status, mailBytes = imap.search(None, '(UNSEEN)')
                        unreadMails = mailBytes[0].split()

                        if processIndicator == True:

                            for unreadMail in unreadMails:
                                status, emailDataByte = imap.fetch(unreadMail, '(RFC822)')

                                for emailDataByteInstance in emailDataByte:

                                    if isinstance(emailDataByteInstance, tuple):
                                        emailData = email.message_from_bytes(emailDataByteInstance[1])

                                        # GET SENDER MAIL ID
                                        fromEmailIdContenet = emailData['from']
                                        fromEmailId = fromEmailIdContenet[(fromEmailIdContenet.index("<") + 1):fromEmailIdContenet.index(">")]

                                        # GET SUBJECT
                                        emailSubject = emailData["Subject"]

                                        if senderFilter != None and senderFilter != "":
                                            senderPatternRegex = str(re.findall(senderFilter, fromEmailId))
                                            senderPatternValue = senderPatternRegex[(senderPatternRegex.index("[") + 2):senderPatternRegex.index("]") - 1]
                                            if senderPatternValue != fromEmailId and senderPatternValue == "":
                                                responseData = "{\"status\":\"failure\", \"responseData\":\"" + "The senderFilter value is not matching  " + "Please enter the valid senderFilter  " + "\"}"
                                                processIndicator = False
                                                break

                                        if subjectFilter != None and subjectFilter != "":
                                            subjectPatternRegex = str(re.findall(subjectFilter, emailSubject))
                                            subjectPatternValue = subjectPatternRegex[(subjectPatternRegex.index("[") + 2):subjectPatternRegex.index("]") - 1]
                                            if subjectPatternValue != emailSubject and subjectPatternValue == "":
                                                responseData = "{\"status\":\"failure\", \"responseData\":\"" + "The subjectFilter value is not matching  " + "Please enter the valid subjectFilter  " + "\"}"
                                                processIndicator = False
                                                break

                                        if saveMailHeaders == "true":
                                            responseData = GetEmailHeaders(appRoot, clientID, countryCode, infoXType, infoXChannel, currentDateValue, emailData)
                                            if responseData.__contains__('\"status\":\"failure\"') == False:
                                                filePathList += responseData
                                            else:
                                                filePathList = ""
                                                break

                                        if saveMailBody == "true":
                                            responseData = GetMailBody(appRoot, clientID, countryCode, infoXType, infoXChannel, currentDateValue, emailData)
                                            if responseData.__contains__('\"status\":\"failure\"') == False:
                                                filePathList += responseData
                                            else:
                                                filePathList = ""
                                                break

                                        if saveMailAttachments == "true":
                                            responseData = GetAttachments(appRoot, clientID, countryCode, infoXType, infoXChannel, currentDateValue, emailData, fmtConfigJsonData)
                                            if responseData.__contains__('\"status\":\"failure\"') == False:
                                                filePathList += responseData
                                            else:
                                                filePathList = ""
                                                break

                                if filePathList != "":
                                    responseData = "{\"status\":\"success\", \"responseData\":[" + filePathList[1:] + "]}"

                                break

        return responseData

    except Exception as error:
        return "{\"status\":\"failure\", \"responseData\":" + str(error) + "\"}"


def GetAttachments(appRoot, clientID, countryCode, infoXType, infoXChannel, currentDateValue, emailData, fmtConfigJsonData):

    attachmentPattern = ""
    attachmentPath = ""
    fileName = ""
    attachmentPatternData = ""
    attachmentPatternRegex = ""
    attachmentFileName = ""
    attachmentPatternValue = ""
    attachmentFolderPath = ""
    attachmentFilePath = ""
    filePathList = ""
    responseData = ""

    try:

        # GET ATTACHMENTS FROM THE MAIL
        for key in fmtConfigJsonData['infoXChannelConfiguration']['attachment']:
            attachmentPattern = key['pattern']
            attachmentPath = key['path']

            # GET ATTACHMENTS FROM THE MAIL
            for attachment in emailData.walk():
                fileName = attachment.get_filename()
                if fileName != None:
                    attachmentPatternData = str(attachmentPattern)
                    attachmentPatternRegex = re.compile(attachmentPatternData)
                    attachmentFileName = str(fileName)
                    attachmentPatternValue = attachmentPatternRegex.search(attachmentFileName)

                    if attachmentPatternValue != None:

                        attachmentFolderPath = appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvInfoX" + "\\" + "infoXPull" + "\\" + infoXChannel + "\\" + infoXType + "\\" + currentDateValue + "\\" + attachmentPath

                        attachmentFilePath = (attachmentFolderPath + "\\" + fileName)

                        if os.path.exists(attachmentFolderPath) == False:
                            os.makedirs(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvInfoX" + "\\" + "infoXPull" + "\\" + infoXChannel + "\\" + infoXType + "\\" + currentDateValue + "\\" + attachmentPath)

                        with open(attachmentFilePath, 'wb') as attachmentFile:
                            attachmentFile.write(attachment.get_payload(decode=True))
                            filePathList += ",\"" + "content_store" + "/" + clientID + "/" + countryCode + "/" + "msvInfoX" + "/" + "infoXPull" + "/" + infoXChannel + "/" + infoXType + "/" + currentDateValue + "/" + attachmentPath + "/" + fileName + "\""

        responseData = filePathList

        return responseData

    except Exception as error:
        return "{\"status\":\"failure\", \"responseData\":" + str(error) + "\"}"


def GetMailBody(appRoot, clientID, countryCode, infoXType, infoXChannel, currentDateValue, emailData):

    filePathList = ""
    writeMailBody = ""

    try:

        # GET MAIL BODY
        if os.path.exists(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvInfoX" + "\\" + "infoXPull" + "\\" + infoXChannel + "\\" + infoXType + "\\" + currentDateValue) == False:
            os.makedirs(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvInfoX" + "\\" + "infoXPull" + "\\" + infoXChannel + "\\" + infoXType + "\\" + currentDateValue)

        writeMailBody = open(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvInfoX" + "\\" + "infoXPull" + "\\" + infoXChannel + "\\" + infoXType + "\\" + currentDateValue + "\\" + currentDateValue + ".html",'w', encoding='utf-8', errors='replace')
        for emailBody in emailData.walk():
            if emailBody.get_content_type() == 'text/html':
                writeMailBody.write(emailBody.get_payload(decode=True).decode())
                filePathList += ",\"" + "content_store" + "/" + clientID + "/" + countryCode + "/" + "msvInfoX" + "/" + "infoXPull" + "/" + infoXChannel + "/" + infoXType + "/" + currentDateValue + "/" + currentDateValue + ".html" + "\""
                break

        writeMailBody.close()

        return filePathList

    except Exception as error:
        return "{\"status\":\"failure\", \"responseData\":" + str(error) + "\"}"


def GetEmailHeaders(appRoot, clientID, countryCode, infoXType, infoXChannel, currentDateValue, emailData):

    fromEmailIdContenet = ""
    fromEmailId = ""
    emailSubject = ""
    toEmailIdContenet = ""
    toEmailId = ""
    ccEmailIdContenet = ""
    ccEmailId = ""
    bccEmailIdContenet = ""
    bccEmailId = ""
    mailHeaderJson = {}
    mailHeaderString = ""
    filePathList = ""

    try:

        # GET SENDER MAIL ID
        fromEmailIdContenet = emailData['from']
        fromEmailId = emailDataFrom[(emailDataFrom.index("<") + 1):emailDataFrom.index(">")]

        # GET SUBJECT
        emailSubject = emailData["Subject"]

        # GET TO MAIL ID
        toEmailIdContenet = emailData["To"]
        for splitMail in toEmailIdContenet.split(','):
            toEmailId += "," + splitMail[(splitMail.index("<") + 1):splitMail.index(">")]

        # GET CC MAIL ID
        ccEmailIdContenet = emailData["Cc"]
        if ccEmailIdContenet != None:
            for splitMail in ccEmailIdContenet.split(','):
                ccEmailId += "," + splitMail[(splitMail.index("<") + 1):splitMail.index(">")]
        else:
            ccEmailId = ""

        # GET BCC MAIL ID
        bccEmailIdContenet = emailData["Bcc"]
        if bccEmailIdContenet != None:
            for splitMail in bccEmailIdContenet.split(','):
                bccEmailId += "," + splitMail[(splitMail.index("<") + 1):splitMail.index(">")]
        else:
            bccEmailId = ""

        mailHeaderJson["fromMailId"] = fromEmailId
        mailHeaderJson["toMailId"] = toEmailId[1:]
        mailHeaderJson["ccMailId"] = ccEmailId[1:]
        mailHeaderJson["bccMailId"] = bccEmailId[1:]
        mailHeaderJson["subject"] = emailSubject
        mailHeaderString = json.dumps(mailHeaderJson)

        if os.path.exists(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvInfoX" + "\\" + "infoXPull" + "\\" + infoXChannel + "\\" + infoXType + "\\" + currentDateValue) == False:
            os.makedirs(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvInfoX" + "\\" + "infoXPull" + "\\" + infoXChannel + "\\" + infoXType + "\\" + currentDateValue)

        with open(appRoot + "content_store" + "\\" + clientID + "\\" + countryCode + "\\" + "msvInfoX" + "\\" + "infoXPull" + "\\" + infoXChannel + "\\" + infoXType + "\\" + currentDateValue + "\\" + "mailHeaders.json","w") as jsonFile:
            jsonFile.write(mailHeaderString)

        filePathList += ",\"" + "content_store" + "/" + clientID + "/" + countryCode + "/" + "msvInfoX" + "/" + "infoXPull" + "/" + infoXChannel + "/" + infoXType + "/" + currentDateValue + "/" + "mailHeaders.json" + "\""

        return filePathList


    except Exception as error:
        return "{\"status\":\"failure\", \"responseData\":" + str(error) + "\"}"
