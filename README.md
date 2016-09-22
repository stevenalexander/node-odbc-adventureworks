# Node ODBC

This is a sample node application using node-odbc to connect to a MS SQL DB hosted in Azure (though should work for any MS SQL instance).

Uses the [AdventureWorksLT 2014 sample DB](http://msftdbprodsamples.codeplex.com/releases/).

Instructions for Mac.

## Requires

* Homebrew
* NPM

## Run

```
# Install odbc for mac and FreeTDS driver
brew install unixodbc
brew install freetds --with-unixodbc

# Set FreeTDS driver config
vi /usr/local/etc/odbc.ini

# Set env used for node-odbc connectionstring
export NODE_ODBC_CONNECTIONSTRING=Driver={FreeTDS};Server=DB_SERVER_NAME.database.windows.net;Port=1433;Database=DB_NAME;Uid=USER_NAME@DB_NAME;Pwd=PASSWORD;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;TDS_Version=8.0'

# Run application
npm install
npm start
```

FreeTDS driver config
```
[FreeTDS]
Description = TD Driver (MSSQL)
Driver = /usr/local/lib/libtdsodbc.so
Setup = /usr/local/lib/libtdsodbc.so
FileUsage = 1
```

## Notes

* Installed unixodbc and freetds
  * `brew install unixodbc`
  * `brew install freetds --with-unixodbc`
* Set FreeTDS driver config used by node-odbc in `/usr/local/etc/odbc.ini`
* Outside Azure network, you communicate with DB instance via port 1433
  * you can test connectivity (may be blocked by your firewall) with `nc -v MY_DB_NAME.database.windows.net 1433`
* YOU CANNOT USE Azure SQL ODBC connection string given in portal, node-odbc will give error `Unknown host machine name` due to `Server=tcp:DB_SERVER_NAME.database.windows.net,1433;`

Instead explicitly set Server and Port:

```
Driver={FreeTDS};Server=DB_SERVER_NAME.database.windows.net;Port=1433;Database=DB_NAME;Uid=USER_NAME@DB_NAME;Pwd=PASSWORD;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;TDS_Version=8.0
```

## Links

* [Article - setup mac to connect to MS SQL](https://github.com/lionheart/django-pyodbc/wiki/Mac-setup-to-connect-to-a-MS-SQL-Server)
* [Additional Gist that helped trouble shoot connectivity issues](https://gist.github.com/Bouke/10454272)
