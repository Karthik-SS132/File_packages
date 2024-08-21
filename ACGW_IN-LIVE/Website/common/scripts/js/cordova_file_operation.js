/*
SAMPLE METHOD TO CREATE A FILE
nativeFileSystem.createFile({
filePath : "mservice/test/test_2/test.txt",
dataSource : "welcome",
encryptInd : true,
success : "", CALLBACK FUNCTION
failure : ""	CALLBACK FUNCTION
});
SAMPLE METHOD TO READ A FILE
nativeFileSystem.readFile({
filePath : "mservice/test/test_2/test.txt",
decryptInd : true,
success : "", CALLBACK FUNCTION
failure : ""	CALLBACK FUNCTION
});
SAMPLE METHOD TO APPEND DATA IN A FILE
nativeFileSystem.appendData({
filePath : "mservice/test/test_2/test.txt",
dataSource : "welcome2",
decryptInd : true,
success : "", CALLBACK FUNCTION
failure : ""	CALLBACK FUNCTION
});
SAMPLE METHOD TO VALIDATE A FILE
nativeFileSystem.validateFile({
filePath : "mservice/test/test_2/test.txt",
success : "", CALLBACK FUNCTION
failure : ""	CALLBACK FUNCTION
});
SAMPLE METHOD TO DELETE A FILE
nativeFileSystem.deleteFile({
filePath : "mservice/test/test_2/test.txt",
success : "", CALLBACK FUNCTION
failure : ""	CALLBACK FUNCTION
});
SAMPLE METHOD TO DOWNLOAD A FILE
nativeFileSystem.downloadFile({
urlPath : "",
filePath : "mservice/test/test_2/test.txt", LOCAL FILE LOCATION
success : "", CALLBACK FUNCTION
failure : ""	CALLBACK FUNCTION
});
SAMPLE METHOD TO UPLOAD A FILE
nativeFileSystem.uploadFile({
url : "",
filePath : "mservice/test/test_2/test.txt", LOCAL FILE LOCATION
fileType : "image/jpg",
success : "",
failure : ""
});
SAMPLE METHOD TO UNZIP A FILE
nativeFileSystem.unZip({
source : "mservice/sample/test.zip",	Source file path
destination : "mservice/sample", Destination Directory
success : "", 
failure : ""
});
SAMPLE METHOD TO DELETE A DIRECTORY
nativeFileSystem.deleteDirectory({
directoryPath : "mservice/sample", Destination Directory
success : "", 
failure : ""
});
 */

nativeFileSystem = {
	createFile : function (obj) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			if(login_profile.device == "iPhone") {
				obj.filePath = obj.filePath.split(':///').pop();
			}
			var filePathArray = obj.filePath.split("/");
			var fileName = filePathArray[filePathArray.length - 1];
			filePathArray.pop();
			var directory_root = "";
			var createDirectory = function (filePathArray) {
				if (filePathArray.length != 0) {
					directory_root += filePathArray[0].toString();
					fileSystem.root.getDirectory(directory_root, {
						create : true,
						exclusive : false
					}, function (dirEntry) {
						directory_root += "/";
						filePathArray.shift();
						createDirectory(filePathArray);
					}, function (evt) {
						if (typeof obj.failure == "function") {
							obj.failure(evt);
						} else {
							eval(obj.failure + "(" + evt + ");");
						}
					});
				} else {
					fileSystem.root.getFile(directory_root + "/" + fileName, {
						create : true,
						exclusive : false
					}, function (fileEntry) {
						fileEntry.createWriter(function (writer) {
							writer.onwrite = function (evt) {
								if (typeof obj.success == "function") {
									obj.success();
								} else {
									eval(obj.success + "();");
								}
							};
							if (obj.encryptInd == true) {
								writer.write(encryptData(obj.dataSource));
							} else {
								writer.write(obj.dataSource);
							}
						}, function (evt) {
							if (typeof obj.failure == "function") {
								obj.failure(evt);
							} else {
								eval(obj.failure + "(" + evt + ");");
							}
						});
					}, function (evt) {
						if (typeof obj.failure == "function") {
							obj.failure(evt);
						} else {
							eval(obj.failure + "(" + evt + ");");
						}
					});
				}
			}
			createDirectory(filePathArray);
		}, function (evt) {
			if (typeof obj.failure == "function") {
				obj.failure(evt);
			} else {
				eval(obj.failure + "(" + evt + ");");
			}
		});
	},
	readFile : function (obj) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			if(login_profile.device == "iPhone") {
				obj.filePath = obj.filePath.split(':///').pop();
			}
			var filePathArray = obj.filePath.split("/");
			var fileName = filePathArray[filePathArray.length - 1];
			filePathArray.pop();
			var directory_root = "";
			for (var i = 0; i < filePathArray.length; i++) {
				if (i > 0) {
					directory_root += "/" + filePathArray[i];
				} else {
					directory_root += filePathArray[i];
				}
			}
			fileSystem.root.getDirectory(directory_root, {
				create : false
			}, function (dirEntry) {
				dirEntry.getFile(fileName, {
					create : false
				}, function (fileEntry) {
					fileEntry.file(function (file) {
						var reader = new FileReader();
						reader.onload = function (evt) {
							/*if (obj.decryptInd == true) {
								if (typeof obj.success == "function") {
									obj.success(decryptData(evt.target.result));
								} else {
									eval(obj.success + "('" + decryptData(evt.target.result) + "');");
								}
							} else {
								if (typeof obj.success == "function") {
									obj.success(evt.target.result);
								} else {
									eval(obj.success + "('" + evt.target.result + "');");
								}
							}*/
							if (obj.decryptInd == true) {
								if (typeof obj.success == "function") {
									obj.success(decryptData(evt.target.result));
								} else {
									eval(obj.success + "('" + decryptData(evt.target.result) + "');");
								}
							} else {
								if (obj.screen_id != undefined) {
									try {
										var JSONString = JSON.parse(evt.target.result);
										if (typeof obj.success == "function") {
											obj.success(evt.target.result);
										} else {
											eval(obj.success + "('" + evt.target.result + "');");
										}
									}
									catch(jsonException) {
										nativeFileSystem.createFile({
											filePath : obj.filePath,
											dataSource : decryptData(evt.target.result),
											encryptInd : false,
											success : function() {
												nativeFileSystem.readFile({
													filePath : obj.filePath,
													decryptInd : false,
													success : function (result) {
														if (typeof obj.success == "function") {
															obj.success(result);
														} else {
															eval(obj.success + "('" + result + "');");
														}
													},
													failure : function (err) {
														
													}
												});
											},
											failure : function(err) {
												
											}
										});
									}
								}
								else {
									if (typeof obj.success == "function") {
										obj.success(evt.target.result);
									} else {
										eval(obj.success + "('" + evt.target.result + "');");
									}
								}
							}
						}
						reader.readAsText(file);
					}, function (evt) {
						if (typeof obj.failure == "function") {
							obj.failure(evt);
						} else {
							eval(obj.failure + "(" + evt + ");");
						}
					});
				}, function (evt) {
					if (typeof obj.failure == "function") {
						obj.failure(evt);
					} else {
						eval(obj.failure + "(" + evt + ");");
					}
				});
			}, function (evt) {
				if (typeof obj.failure == "function") {
					obj.failure(evt);
				} else {
					eval(obj.failure + "(" + evt + ");");
				}
			});
		}, function (evt) {
			if (typeof obj.failure == "function") {
				obj.failure(evt);
			} else {
				eval(obj.failure + "(" + evt + ");");
			}
		});
	},
	appendData : function (obj) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			var filePathArray = obj.filePath.split("/");
			var fileName = filePathArray[filePathArray.length - 1];
			filePathArray.pop();
			var directory_root = "";
			for (var i = 0; i < filePathArray.length; i++) {
				if (i > 0) {
					directory_root += "/" + filePathArray[i];
				} else {
					directory_root += filePathArray[i];
				}
			}
			fileSystem.root.getDirectory(directory_root, {
				create : false
			}, function (dirEntry) {
				dirEntry.getFile(fileName, {
					create : false
				}, function (fileEntry) {
					fileEntry.createWriter(function (writer) {
						writer.onwrite = function (evt) {
							if (typeof obj.success == "function") {
								obj.success();
							} else {
								eval(obj.success + "();");
							}
						}
						writer.seek(writer.length);
						if (obj.encryptInd == true) {
							writer.write(encryptData(obj.dataSource));
						} else {
							writer.write(obj.dataSource);
						}
					}, function (evt) {
						if (typeof obj.failure == "function") {
							obj.failure(evt);
						} else {
							eval(obj.failure + "(" + evt + ");");
						}
					});
				}, function (evt) {
					if (typeof obj.failure == "function") {
						obj.failure(evt);
					} else {
						eval(obj.failure + "(" + evt + ");");
					}
				});
			}, function (evt) {
				if (typeof obj.failure == "function") {
					obj.failure(evt);
				} else {
					eval(obj.failure + "(" + evt + ");");
				}
			});
		}, function (evt) {
			if (typeof obj.failure == "function") {
				obj.failure(evt);
			} else {
				eval(obj.failure + "(" + evt + ");");
			}
		});
	},
	validateFile : function (obj) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			if(login_profile.device == "iPhone") {
				obj.filePath = obj.filePath.split(':///').pop();
			}
			var filePathArray = obj.filePath.split("/");
			var fileName = filePathArray[filePathArray.length - 1];
			filePathArray.pop();
			var directory_root = "";
			for (var i = 0; i < filePathArray.length; i++) {
				if (i > 0) {
					directory_root += "/" + filePathArray[i];
				} else {
					directory_root += filePathArray[i];
				}
			}
			fileSystem.root.getDirectory(directory_root, {
				create : false
			}, function (dirEntry) {
				dirEntry.getFile(fileName, {
					create : false
				}, function (fileEntry) {
					if (typeof obj.success == "function") {
						obj.success();
					} else {
						eval(obj.success + "();");
					}
				}, function (evt) {
					if (typeof obj.failure == "function") {
						obj.failure(evt);
					} else {
						eval(obj.failure + "(" + evt + ");");
					}
				});
			}, function (evt) {
				if (typeof obj.failure == "function") {
					obj.failure(evt);
				} else {
					eval(obj.failure + "(" + evt + ");");
				}
			});
		}, function (evt) {
			if (typeof obj.failure == "function") {
				obj.failure(evt);
			} else {
				eval(obj.failure + "(" + evt + ");");
			}
		});
	},
	deleteFile : function (obj) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			if(login_profile.device == "iPhone") {
				obj.filePath = obj.filePath.split(':///').pop();
			}
			var filePathArray = obj.filePath.split("/");
			var fileName = filePathArray[filePathArray.length - 1];
			filePathArray.pop();
			var directory_root = "";
			for (var i = 0; i < filePathArray.length; i++) {
				if (i > 0) {
					directory_root += "/" + filePathArray[i];
				} else {
					directory_root += filePathArray[i];
				}
			}
			fileSystem.root.getDirectory(directory_root, {
				create : false
			}, function (dirEntry) {
				dirEntry.getFile(fileName, {
					create : false
				}, function (fileEntry) {
					fileEntry.remove(function (file) {
						if (typeof obj.success == "function") {
							obj.success();
						} else {
							eval(obj.success + "();");
						}
					}, function (evt) {
						if (typeof obj.failure == "function") {
							obj.failure(evt);
						} else {
							eval(obj.failure + "(" + evt + ");");
						}
					});
				}, function (evt) {
					if (typeof obj.failure == "function") {
						obj.failure(evt);
					} else {
						eval(obj.failure + "(" + evt + ");");
					}
				});
			}, function (evt) {
				if (typeof obj.failure == "function") {
					obj.failure(evt);
				} else {
					eval(obj.failure + "(" + evt + ");");
				}
			});
		}, function (evt) {
			if (typeof obj.failure == "function") {
				obj.failure(evt);
			} else {
				eval(obj.failure + "(" + evt + ");");
			}
		});
	},
	downloadFile : function (obj) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			var filePathArray = obj.filePath.split("/");
			var fileName = filePathArray[filePathArray.length - 1];
			filePathArray.pop();
			var directory_root = "";
			var createDirectory = function (filePathArray) {
				if (filePathArray.length != 0) {
					directory_root += filePathArray[0].toString();
					fileSystem.root.getDirectory(directory_root, {
						create : true,
						exclusive : false
					}, function (dirEntry) {
						directory_root += "/";
						filePathArray.shift();
						createDirectory(filePathArray);
					}, function (evt) {
						if (typeof obj.failure == "function") {
							obj.failure(evt);
						} else {
							eval(obj.failure + "(" + evt + ");");
						}
					});
				} else {
					fileSystem.root.getDirectory(directory_root, {
						create : false
					},
						function (dirEntry) {
						var fileTransfer = new FileTransfer();
						if(login_profile.device == "iPhone") {
							var download_path = cordova.file.dataDirectory + dirEntry.fullPath.substring(1) + fileName;
						}
						else {
							var download_path = "file:///sdcard" + dirEntry.fullPath + fileName;
						}
						fileTransfer.download(encodeURI(obj.urlPath),download_path, function (local_path) {
							if (typeof obj.success == "function") {
								obj.success(local_path.fullPath);
							} else {
								eval(obj.success + "('" + local_path.fullPath + "');");
							}
						}, function (evt) {
							if (typeof obj.failure == "function") {
								obj.failure(evt);
							} else {
								eval(obj.failure + "(" + evt + ");");
							}
						});
						
					}, function (evt) {
						if (typeof obj.failure == "function") {
							obj.failure(evt);
						} else {
							eval(obj.failure + "(" + evt + ");");
						}
					});
				}
			}
			createDirectory(filePathArray);
		}, function (evt) {
			if (typeof obj.failure == "function") {
				obj.failure(evt);
			} else {
				eval(obj.failure + "(" + evt + ");");
			}
		});
	},
	uploadFile : function (obj) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			obj.filePath = fileSystem.root.toURL() + obj.filePath;
			var options = new FileUploadOptions();
				options.fileKey = "file";
				options.fileName = obj.filePath.substr(obj.filePath.lastIndexOf('/')+1);
				options.mimeType = obj.fileType;
				options.chunkedMode = false;
				var fileTransfer = new FileTransfer();
				fileTransfer.upload(obj.filePath, encodeURI(obj.url),function(e) {
					if (typeof obj.success == "function") {
						obj.success();
					} else {
						eval(obj.success + "();");
					}
				}, function(evt){
					if (typeof obj.failure == "function") {
						obj.failure(evt);
					} else {
						eval(obj.failure + "(" + evt + ");");
					}
				}, options);
		},function (evt) {
			if (typeof obj.failure == "function") {
				obj.failure(evt);
			} else {
				eval(obj.failure + "(" + evt + ");");
			}
		});
	},
	unZip : function (obj) {
		if(login_profile.device == "iPhone") {
			var source_path = cordova.file.dataDirectory + obj.source.substring(1);
			var destination_path = cordova.file.documentsDirectory + obj.destination;
		}
		else {
			var source_path = "file:///" + obj.source;
			var destination_path = "file:///sdcard/" + obj.destination;
		}
		zip.unzip(source_path, destination_path, function (result) {
			if (result == 0) {
				if (typeof obj.success == "function") {
					obj.success();
				} else {
					eval(obj.success + "();");
				}
			} else {
				if (typeof obj.failure == "function") {
					obj.failure();
				} else {
					eval(obj.failure + "();");
				}
			}
		});
	},
	deleteDirectory: function(obj) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			fileSystem.root.getDirectory(obj.directoryPath, {
				create : false
			}, function (dirEntry) {
				dirEntry.removeRecursively(function(e){
					if (typeof obj.success == "function") {
						obj.success();
					} else {
						eval(obj.success + "();");
					}
				}, function(evt){
					if (typeof obj.failure == "function") {
						obj.failure(evt);
					} else {
						eval(obj.failure + "(" + evt + ");");
					}
				});
			}, function (evt) {
				if (typeof obj.failure == "function") {
					obj.failure(evt);
				} else {
					eval(obj.failure + "(" + evt + ");");
				}
			});
		}, function (evt) {
			if (typeof obj.failure == "function") {
				obj.failure(evt);
			} else {
				eval(obj.failure + "(" + evt + ");");
			}
		});
	},
	openFile : function (obj) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
			obj.filePath = fileSystem.root.toURL() + obj.filePath;
			cordova.plugins.fileOpener2.open(obj.filePath, obj.fileType, {
				success : function () {
					if (typeof obj.success == "function") {
						obj.success();
					} else {
						eval(obj.success + "();");
					}
				},
				error : function (error) {
					if (typeof obj.failure == "function") {
						obj.failure(evt);
					} else {
						eval(obj.failure + "(" + evt + ");");
					}
				}
			});
		},function (evt) {
			if (typeof obj.failure == "function") {
				obj.failure(evt);
			} else {
				eval(obj.failure + "(" + evt + ");");
			}
		});
	}
}
/* DATA ENCRYPTION */
function encryptData(data) {
	var encrypt_format = "";
	try {
		var key = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
		var iv = CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f');

		encrypt_format = CryptoJS.AES.encrypt(data, key, {
				iv : iv
			});
		encrypt_format = encrypt_format.toString();
	} catch (cry) {}
	return encrypt_format;
}
/* DATA DECRYPTION */
function decryptData(data) {
	var decrypt_format = "";
	try {
		var key = CryptoJS.enc.Hex.parse('000102030405060708090a0b0c0d0e0f');
		var iv = CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f');

		decrypt_format = CryptoJS.AES.decrypt(data, key, {
				iv : iv
			});
		decrypt_format = decrypt_format.toString(CryptoJS.enc.Utf8);
	} catch (dry) {}
	return decrypt_format;
}
