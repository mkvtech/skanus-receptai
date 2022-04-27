# language: lt
Savybė: Naujo recepto sukūrimas

Scenarijus: 
Duota Vartotojas yra prisijungęs
Kai Užpildo visus formos laukus
Ir Spaudžia mygtuką "Submit"
Tada Receptas yra sukūriamas duomenų bazėje
Ir Atvaizduojamas sukurtas receptas

Scenarijus: 
Duota Vartotojas yra neprisijungęs
Kai Užpildo visus formos laukus
Ir Spaudžia mygtuką "Submit"
Tada Sistema išmeta klaidą "Vartotojas yra neprisijungęs"
 
Scenarijus: 
Duota Vartotojas yra prisijungęs
Kai Neužpildo visų formos laukų
Ir Spaudžia mygtuką "Submit"
Tada Sistema išmeta klaidą "Tuščių laukų palikti negalima"
