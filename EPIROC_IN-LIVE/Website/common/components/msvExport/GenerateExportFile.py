import datetime
import json
import xlsxwriter
import os.path


def GenerateExportFile(appRoot, clientId, countryCode, fmtStr, dbStr):
    try:
        fmtObject = json.loads(fmtStr)
        dataBaseResponse = json.loads(dbStr)

        # Getting the Excel File Name
        xlsxFileName = fmtObject["fileName"]

        reportFullPath = (
                    appRoot + "\\" + "content_store" + "\\" + clientId + "\\" + countryCode + "\\" + "Export" + "\\" + xlsxFileName + ".xlsx")
        if os.path.exists(appRoot + "\\" + "content_store" + "\\" + clientId + "\\" + countryCode + "\\" + "Export"):
            xlsxFile = xlsxwriter.Workbook(reportFullPath)
            xlsxSheet = xlsxFile.add_worksheet(xlsxFileName)

        else:
            os.mkdir(appRoot + "\\" + "content_store" + "\\" + clientId + "\\" + countryCode + "\\" + "Export")
            xlsxFile = xlsxwriter.Workbook(reportFullPath)
            xlsxSheet = xlsxFile.add_worksheet(xlsxFileName)

        # Creating the Excel Header
        column = 0
        for columnData in fmtObject["configuration"]:
            xlsxSheet.write(0, column, columnData["fieldName"], xlsxFile.add_format({'bold': True}))
            column += 1

        # Creating the Excel Data
        row = 1
        for rowData in dataBaseResponse:
            column = 0
            for columnData in fmtObject["configuration"]:
                # Setting the format for the Data
                if columnData["format"] == "number":
                    xlsxSheet.write_number(row, column, float(rowData[columnData["fieldId"]]))

                elif columnData["format"] == "date":
                    dateFormat = xlsxFile.add_format({'num_format': columnData["template"]})
                    defaultDateFormat = xlsxFile.add_format({'num_format': 'Y-mm-dd'})
                    if (rowData[columnData["fieldId"]]) == "":
                        xlsxSheet.write(row, column, rowData[columnData["fieldId"]])

                    elif columnData["template"] == "":
                        date_time = datetime.datetime.strptime((rowData[columnData["fieldId"]]), '%Y-%m-%d')
                        xlsxSheet.write_datetime(row, column, date_time, defaultDateFormat)

                    else:
                        date_time = datetime.datetime.strptime((rowData[columnData["fieldId"]]), '%Y-%m-%d')
                        xlsxSheet.write_datetime(row, column, date_time, dateFormat)

                elif columnData["format"] == "url":
                    urlFormat = xlsxFile.add_format({"font_color": "blue", "underline": 1})
                    if (rowData[columnData["fieldId"]]) == "":
                        xlsxSheet.write(row, column, rowData[columnData["fieldId"]])
                    else:
                        xlsxSheet.write(row, column, (rowData[columnData["fieldId"]]), urlFormat)

                elif columnData["format"] == "mail":
                    mailFormat = xlsxFile.add_format({"font_color": "blue", "underline": 1})
                    if (rowData[columnData["fieldId"]]) == "":
                        xlsxSheet.write(row, column, rowData[columnData["fieldId"]])
                    else:
                        xlsxSheet.write(row, column, ("mailto:" + rowData[columnData["fieldId"]]), mailFormat)

                else:
                    xlsxSheet.write(row, column, rowData[columnData["fieldId"]])

                column += 1

            row += 1

        xlsxFile.close()
        return "{\"status\":\"success\", \"filePath\":\"" + "content_store" + "\\" + clientId + "\\" + countryCode + "\\" + "Export" + "\\" + xlsxFileName + ".xlsx" + "\"}"
    except Exception as error:
        raise Exception from error
