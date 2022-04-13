# language: lt
Savybė: Receptų įvertinimas
  Vartotojas gali vertinti receptus
  
  Scenarijus: 
    Duota vartotojas yra neprisijungęs
    Kai įvertina receptą 1 žvaigždute
    Tada sistema neleidžia įvertinti recepto
    
  Scenarijus:
    Duota vartotojas yra prisijungęs
    Kai įvertina kito vartotojo receptą 1 žvaigždute
    Tada rodomas naujas bendras įvertinimas
    Ir rodomas prisijungusio vartotojo įvertinimas "Jūsų įvertinimas: 1"
