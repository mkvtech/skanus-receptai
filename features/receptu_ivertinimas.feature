# language: lt
Savybė: Receptų įvertinimas
  Vartotojas gali vertinti receptus
  
  Scenarijus: 
    Duota vartotojas yra neprisijungęs
    Kai bando įvertinti receptą
    Tada sistema neleidžia įvertinti recepto
    
  Scenarijus:
    Duota vartotojas yra prisijungęs
    Kai įvertina kito vartotojo receptą
    Tada rodomas naujas recepto visų vartotojų įvertinimas ir rodomas prisijungusio vartotojo įvertinimas
  
  Scenarijus:
    Duota vartotojas yra prisijungtas
    Kai įvertina savo receptą
    Tada sistema neleidžia įvertinti savo recepto
