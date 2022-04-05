# language: lt
Savybė: Naujo recepto sukūrimas

Scenarijus: 
Duota Vartotojas yra prisijungęs
Kai Bando sukurti receptą ir užpildo visus formos laukus
Tada Receptas yra sukūriamas duomenų bazėje

 Scenarijus: 
 Duota vartotojas yra neprisijungęs
 Kai bando sukurti receptą
 Tada sistema neleidžia sukurti recepto
 
 Scenarijus: 
 Duota vartotojas yra neprisijungęs
 Kai bando sukurti receptą ir neužpildo visos formos laukų
 Tada sistema neleidžia sukurti recepto
