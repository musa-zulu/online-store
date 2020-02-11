-- use master;
-- go
-- ALTER DATABASE  [DontWaste]
-- SET SINGLE_USER
-- WITH ROLLBACK IMMEDIATE
-- drop database [DontWaste]
-- go
------ normal creation after here
use master;
go
if not exists (select name from master..syslogins where name = 'DontWasteWeb')
    begin
        create login DontWasteWeb with password = 'P4$$w0rd';
    end;
go


if not exists (select name from master..sysdatabases where name = 'DontWaste')
begin
create database DontWaste
end;
GO

use DontWaste
if not exists (select * from sysusers where name = 'DontWasteWeb')
begin
create user DontWasteWeb
	for login DontWasteWeb
	with default_schema = dbo
end;
GO
grant connect to DontWasteWeb
go
exec sp_addrolemember N'db_datareader', N'DontWasteWeb';
go
exec sp_addrolemember N'db_datawriter', N'DontWasteWeb';
go
exec sp_addrolemember N'db_owner', N'DontWasteWeb';
GO
use master;
GO

