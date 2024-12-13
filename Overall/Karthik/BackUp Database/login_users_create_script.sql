use [msv_delups]
go
create login delups_in_appuser with password='GainAppUser24#', DEFAULT_DATABASE=msv_delups, DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=ON;
create login delups_in_processuser with password='GainProcessUser24#',DEFAULT_DATABASE=msv_delups, DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=ON;

EXEC sys.sp_addsrvrolemember @loginame = N'delups_in_appuser', @rolename = N'bulkadmin';
use msv_delups;
/****** Object:  User [msvmodeluser]    Script Date: 02/24/2013 05:06:14 ******/
CREATE USER delups_in_appuser FOR LOGIN delups_in_appuser WITH DEFAULT_SCHEMA=[dbo];
CREATE USER delups_in_processuser FOR LOGIN delups_in_processuser WITH DEFAULT_SCHEMA=[dbo];
/****** Object:  User [msvmodeldbo]    Script Date: 02/24/2013 05:06:14 ******/
