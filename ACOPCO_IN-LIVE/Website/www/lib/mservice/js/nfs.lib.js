mService.nfs = {
    copyFile: function (sourceFilePath, sourceFileName, targetFilePath, targetFileName, success, failure) {
        try {
            window.minterface("CopyFile", [{
                        sourceFilePath: mService.app.root + "/" + sourceFilePath,
                        sourceFileName: sourceFileName,
                        targetFilePath: mService.app.root + "/" + targetFilePath,
                        targetFileName: targetFileName
                    }
                ], function () {
                try {
                    success();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (errorMsg) {
                try {
                    mService.exception.handle(errorMsg);
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    createFile: function (filePath, data, success, failure) {
        try {
            if (mService.app.platform == "iOS") {
                var fileSeparator = filePath.split("/"),
                decFileName = fileSeparator[fileSeparator.length - 1];
                if ((decFileName == "app_state_info.txt") || (decFileName == "app_controller.json") || (filePath.indexOf("my_accounts") === 0)) {
                    window.minterface("CreateFile", [{
                                filePath: mService.app.root + "/" + filePath,
                                data: data
                            }
                        ], function () {
                        try {
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (errorMsg) {
                        try {
                            mService.exception.handle(errorMsg);
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    window.minterface("CreateFile", [{
                                filePath: mService.app.root + "/" + filePath,
                                data: mService.nfs.data.encrypt(data)
                            }
                        ], function () {
                        try {
                            success();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (errorMsg) {
                        try {
                            mService.exception.handle(errorMsg);
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                }
            } else {
                window.minterface("CreateFile", [{
                            filePath: mService.app.root + "/" + filePath,
                            data: mService.nfs.data.encrypt(data)
                        }
                    ], function () {
                    try {
                        success();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (errorMsg) {
                    try {
                        mService.exception.handle(errorMsg);
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    data: {
        decrypt: function (data) {
            var dData;
            try {
                dData = "";
                dData = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(mService.nfs.data.key), {
                    keySize: 128 / 8,
                    iv: CryptoJS.enc.Utf8.parse(mService.nfs.data.iv),
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(CryptoJS.enc.Utf8);
                return dData;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        encrypt: function (data) {
            var eData;
            try {
                eData = "";
                eData = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), CryptoJS.enc.Utf8.parse(mService.nfs.data.key), {
                    keySize: 128 / 8,
                    iv: CryptoJS.enc.Utf8.parse(mService.nfs.data.iv),
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString();
                return eData;
            } catch (exception) {
                mService.exception.handle(exception);
            }
        },
        iv: "8080808080808080",
        key: "8080808080808080"
    },
    deleteDirectory: function (filePath, success, failure) {
        try {
            window.minterface("DeleteDirectory", [{
                        filePath: ((filePath === "") ? (mService.app.root) : (mService.app.root + "/" + filePath)),
                    }
                ], function () {
                try {
                    success();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (errorMsg) {
                try {
                    mService.exception.handle(errorMsg);
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    deleteFile: function (filePath, success, failure) {
        try {
            window.minterface("DeleteFile", [{
                        filePath: mService.app.root + "/" + filePath,
                    }
                ], function () {
                try {
                    success();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (errorMsg) {
                try {
                    mService.exception.handle(errorMsg);
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    downloadChatAttachFile: function (url, filePath, encrypt, success, failure, thumbnailInd) {
        try {
            thumbnailInd = ((thumbnailInd === undefined || thumbnailInd === "") ? (false) : (thumbnailInd));
            window.minterface("DownloadChatAttachFile", [{
                        url: url,
                        filePath: mService.app.root + "/" + filePath,
                        thumbnailInd: thumbnailInd
                    }
                ], function (result) {
                try {
                    if (encrypt) {
                        window.minterface("ReadFile", [{
                                    filePath: mService.app.root + "/" + filePath,
                                }
                            ], function (data) {
                            try {
                                window.minterface("CreateFile", [{
                                            filePath: mService.app.root + "/" + filePath,
                                            data: mService.nfs.data.encrypt(data)
                                        }
                                    ], function () {
                                    try {
                                        success(result);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function (errorMsg) {
                                    try {
                                        mService.exception.handle(errorMsg);
                                        failure();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (errorMsg) {
                            try {
                                mService.exception.handle(errorMsg);
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        success(result);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (errorMsg) {
                try {
                    mService.app.showToast("downloadChatAttachFile_error", "pre_signup_messages");
                    mService.exception.handle(errorMsg);
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    downloadFile: function (url, filePath, encrypt, success, failure, thumbnailInd) {
        try {
            thumbnailInd = ((thumbnailInd === undefined || thumbnailInd === "") ? (false) : (thumbnailInd));
            window.minterface("DownloadFile", [{
                        url: url,
                        filePath: mService.app.root + "/" + filePath,
                        thumbnailInd: thumbnailInd
                    }
                ], function (result) {
                try {
                    if (encrypt) {
                        window.minterface("ReadFile", [{
                                    filePath: mService.app.root + "/" + filePath,
                                }
                            ], function (data) {
                            try {
                                window.minterface("CreateFile", [{
                                            filePath: mService.app.root + "/" + filePath,
                                            data: mService.nfs.data.encrypt(data)
                                        }
                                    ], function () {
                                    try {
                                        success(result);
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                }, function (errorMsg) {
                                    try {
                                        mService.exception.handle(errorMsg);
                                        failure();
                                    } catch (exception) {
                                        mService.exception.handle(exception);
                                    }
                                });
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        }, function (errorMsg) {
                            try {
                                mService.exception.handle(errorMsg);
                                failure();
                            } catch (exception) {
                                mService.exception.handle(exception);
                            }
                        });
                    } else {
                        success(result);
                    }
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (errorMsg) {
                try {
                    mService.exception.handle(errorMsg);
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getBase64String: function (filePath, success, failure) {
        try {
            window.minterface("GetBase64String", [{
                        filePath: mService.app.root + "/" + filePath,
                    }
                ], function (base64String) {
                try {
                    success(base64String);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (errorMsg) {
                try {
                    mService.app.showToast("getBase64String_error", "pre_signup_messages");
                    mService.exception.handle(errorMsg);
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getFileList: function (filePath, success, failure) {
        try {
            window.minterface("GetFileList", [{
                        "filePath": mService.app.root + "/" + filePath,
                    }
                ], function (data) {
                try {
                    if (data !== "") {
                        data = data.split("|");
                    } else {
                        data = [];
                    };
                    success(data);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (errorMsg) {
                try {
                    mService.exception.handle(errorMsg);
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    getSubDirectoryList: function (filePath, success, failure) {
        try {
            window.minterface("GetSubDirectoryList", [{
                        "filePath": mService.app.root + "/" + filePath,
                    }
                ], function (data) {
                try {
                    if (data !== "") {
                        data = data.split("|");
                    } else {
                        data = [];
                    };
                    success(data);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (errorMsg) {
                try {
                    mService.exception.handle(errorMsg);
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    moveFile: function (sourceFilePath, sourceFileName, targetFilePath, targetFileName, success, failure) {
        try {
            window.minterface("MoveFile", [{
                        sourceFilePath: mService.app.root + "/" + sourceFilePath,
                        sourceFileName: sourceFileName,
                        targetFilePath: mService.app.root + "/" + targetFilePath,
                        targetFileName: targetFileName
                    }
                ], function () {
                try {
                    success();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (errorMsg) {
                try {
                    mService.exception.handle(errorMsg);
                    failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    openFile: function (filePath, success, failure) {
        window.minterface("OpenFileWithViewer", [filePath], function () {
            try {
                success();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        }, function (errorMsg) {
            try {
                mService.app.showToast("openFileWithViewer_error", "pre_signup_messages");
                mService.exception.handle(errorMsg);
                failure();
            } catch (exception) {
                mService.exception.handle(exception);
            }
        });
    },
    readFile: function (filePath, success, failure, notificationInd) {
        try {
            if (mService.app.platform == "iOS") {
                notificationInd = (notificationInd === undefined) ? false : notificationInd;
                var fileSeparator = filePath.split("/"),
                decFileName = fileSeparator[fileSeparator.length - 1];
                if ((decFileName == "app_state_info.txt") || (decFileName == "app_controller.json") || (filePath.indexOf("my_accounts") === 0) || notificationInd) {
                    window.minterface("ReadFile", [{
                                filePath: mService.app.root + "/" + filePath,
                            }
                        ], function (data) {
                        try {
                            success(data);
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (errorMsg) {
                        try {
                            mService.exception.handle(errorMsg);
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                } else {
                    window.minterface("ReadFile", [{
                                filePath: mService.app.root + "/" + filePath,
                            }
                        ], function (data) {
                        try {
                            success(mService.nfs.data.decrypt(data));
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    }, function (errorMsg) {
                        try {
                            mService.exception.handle(errorMsg);
                            failure();
                        } catch (exception) {
                            mService.exception.handle(exception);
                        }
                    });
                }
            } else {
                window.minterface("ReadFile", [{
                            filePath: mService.app.root + "/" + filePath,
                        }
                    ], function (data) {
                    try {
                        success(mService.nfs.data.decrypt(data));
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                }, function (errorMsg) {
                    try {
                        mService.exception.handle(errorMsg);
                        failure();
                    } catch (exception) {
                        mService.exception.handle(exception);
                    }
                });
            }
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    validateFile: function (obj, flag) {
        var filePath;
        try {
            if (flag !== undefined && flag === "configFile") {
                filePath = obj.filePath;
            } else {
                filePath = mService.app.root + "/" + obj.filePath;
            };
            window.minterface("ValidateFile", [{
                        "filePath": filePath
                    }
                ], function (indication) {
                try {
                    obj.success(indication);
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            }, function (errorMsg) {
                try {
                    mService.exception.handle(errorMsg);
                    obj.failure();
                } catch (exception) {
                    mService.exception.handle(exception);
                }
            });
        } catch (exception) {
            mService.exception.handle(exception);
        }
    },
    root: ""
};