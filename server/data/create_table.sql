-- La création des tables est entourée par une transaction qui commence par BEGIN;" et fini par "COMMIT;"
-- si quelque chose ne se déroule pas comme prévu, le code reviendra en arrière (avant l'éxécution du fichier)
-- ce qui évite que des bouts de création restent dans la base de données ;)

BEGIN;


CREATE TABLE chrono (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    chrono FLOAT NOT NULL
);


COMMIT;