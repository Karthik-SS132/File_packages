use [msv_delups]
go
create login delups_in_appuser with password='AppUser24#', DEFAULT_DATABASE=msv_delups, DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=ON;
create login delups_in_processuser with password='ProcessUser24#',DEFAULT_DATABASE=msv_delups, DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=ON;

EXEC sys.sp_addsrvrolemember @loginame = N'delups_in_appuser', @rolename = N'bulkadmin';
use msv_delups;
/****** Object:  User [msvmodeluser]    Script Date: 02/24/2013 05:06:14 ******/
CREATE USER delups_in_appuser FOR LOGIN delups_in_appuser WITH DEFAULT_SCHEMA=[dbo];
CREATE USER delups_in_processuser FOR LOGIN delups_in_processuser WITH DEFAULT_SCHEMA=[dbo];
/****** Object:  User [msvmodeldbo]    Script Date: 02/24/2013 05:06:14 ******/

use [msv_delups]
go
create login delups_in_appuser with password='AppUser24#', DEFAULT_DATABASE=[msv_delups], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=off, CHECK_POLICY=on;
go
create login delups_in_processuser with password='ProcessUser24#', DEFAULT_DATABASE=[msv_delups], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=off, CHECK_POLICY=on;
go
exec sys.sp_addsrvrolemember @loginame = N'delups_in_appuser', @rolename = N'bulkadmin';
go
use [msv_delups]
go
create user delups_in_appuser for LOGIN delups_in_appuser with DEFAULT_SCHEMA=[dbo];
go
create user delups_in_processuser for LOGIN delups_in_processuser with DEFAULT_SCHEMA=[dbo];
go
