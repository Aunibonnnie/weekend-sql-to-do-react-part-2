-- Create table SQL 
-- It is also helpful to include some test data

-- Create a database called "weekend-to-do-app"

CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"name" varchar(255),
	"complete" BOOLEAN
);

INSERT INTO "todo" ("name", "complete") 
VALUES ('Wash dishes', false ),
('Take out trash', false ), 
('Do homework', true );

DROP TABLE "todo";
SELECT * from "todo";
DELETE FROM "todo" WHERE id=1;
UPDATE "todo" SET complete = NOT complete WHERE "id"=2;
SELECT * FROM todo ORDER BY "id" ASC;