use [msv_delups]
select 'grant execute on ' + name + ' to ' + 'delups_in_appuser'
from sys.objects
where type = 'P'
union all
select 'grant control on TYPE::' + SUBSTRING(name, 4, len(name) - 12) + ' to ' + 'delups_in_appuser'
from sys.objects
where type = 'TT'

use [msv_delups]
select 'grant execute on ' + name + ' to ' + 'delups_in_processuser'
from sys.objects
where type = 'P'
union all
select 'grant control on TYPE::' + SUBSTRING(name, 4, len(name) - 12) + ' to ' + 'delups_in_processuser'
from sys.objects
where type = 'TT'


select 'grant select on ' + name + ' to ' + 'delups_in_appuser'
from sys.objects

select 'grant select on ' + name + ' to ' + 'delups_in_processuser'
from sys.objects