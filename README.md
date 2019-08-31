# riddl
Riddl evaluates a CSV file and generates a DDL statement to create a table in a SQL database to store the data, automatically identifying types.

## Usage
```
node riddl.js <CSV_FILENAME>
```

By default, riddl assumes that the file is comma (`,`) delimited. If there is a different delimiter used you can specify that as another command line argument:

```
node riddl.js <CSV_FILENAME> <DELIMITER>
```

The output generated to standard out will be the DDL file matching the CSV data.

## Example
Command:
```
node riddl.js ./test/test.csv
```

Output:
```
Lines analyzed:   100
Type counts:
	 INTEGER :   3
	 VARCHAR :   3
	 BOOLEAN :   1
	 DECIMAL :   1
Empty Columns:   0

DDL:

CREATE TABLE _put_table_name_here_ (
	INTEGER User_ID,
	VARCHAR(10) Shoe,
	INTEGER Size,
	VARCHAR(5) Color,
	BOOLEAN Coupon,
	INTEGER Postal_Code,
	VARCHAR(10) Payment,
	DECIMAL Amount
);

```
