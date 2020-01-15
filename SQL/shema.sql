DROP TABLE GuacamoleCountries;
DROP TABLE avocadoPrice;
DROP TABLE annualsince71;
DROP TABLE WeeklyAvoReport2019;

CREATE TABLE GuacamoleCountries (
    Country VARCHAR(255),
    Produce VARCHAR(255)
);

CREATE TABLE avocadoPrice (
    Date VARCHAR(11),
    AveragePrice VARCHAR(4),
    TotalVolume VARCHAR(11),
    SmallHass VARCHAR(11),
    LargeHass VARCHAR(11),
    XLHass VARCHAR(11),
    Type VARCHAR(14),
    Region VARCHAR(20)
);

CREATE TABLE annualsince71(
	Index INTEGER PRIMARY KEY,
	Year VARCHAR (7),
	Bearing_Acres INTEGER,
	Avg_Profit_Per_Acre INTEGER,
	Avg_Pounds_Per_Acre INTEGER
);

CREATE TABLE WeeklyAvoReport2019(
	Index INTEGER PRIMARY KEY,
	Week VARCHAR (10),
	Historical4YearForecast INTEGER,
	AMRICProjection INTEGER,
	AMRICActualHarvest INTEGER,
	AMRICActualShipments INTEGER,
	CropSizeIndicator INTEGER
);

SELECT * FROM GuacamoleCountries;
SELECT * FROM avocadoPrice;
SELECT * FROM annualsince71;
SELECT * FROM WeeklyAvoReport2019;