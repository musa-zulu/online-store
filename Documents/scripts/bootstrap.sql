-- use master;
-- go
-- ALTER DATABASE  [OnlineStore]
-- SET SINGLE_USER
-- WITH ROLLBACK IMMEDIATE
-- drop database [OnlineStore]
-- go
------ normal creation after here
use master;
go
if not exists (select name from master..syslogins where name = 'OnlineStoreWeb')
    begin
        create login OnlineStoreWeb with password = 'P4$$w0rd';
    end;
go


if not exists (select name from master..sysdatabases where name = 'OnlineStore')
begin
create database OnlineStore
end;
GO

use OnlineStore
if not exists (select * from sysusers where name = 'OnlineStoreWeb')
begin
create user OnlineStoreWeb
	for login OnlineStoreWeb
	with default_schema = dbo
end;
GO
grant connect to OnlineStoreWeb
go
exec sp_addrolemember N'db_datareader', N'OnlineStoreWeb';
go
exec sp_addrolemember N'db_datawriter', N'OnlineStoreWeb';
go
exec sp_addrolemember N'db_owner', N'OnlineStoreWeb';
GO
use master;
GO

