# language: lt
Savybė: Naujo recepto sukūrimas

Scenarijus: Vartotojas bando sukurti receptą
Duota Vartotojas yra prisijungęs
Kai Bando sukurti receptą ir užpildo visus formos laukus
Tada Receptas yra sukūriamas duomenų bazėje

 Scenarijus: Neprisijungęs Vartotojas bando sukurti receptą
 Duota vartotojas yra neprisijungęs
 Kai bando sukurti receptą
 Tada sistema neleidžia sukurti recepto
 
 Scenarijus:  Vartotojas bando sukurti receptą neužpildęs laukų
 Duota vartotojas yra neprisijungęs
 Kai bando sukurti receptą ir neužpildo visos formos laukų
 Tada sistema neleidžia sukurti recepto
