#language: lt
Savybė: Recepto komentarai
  Vartotojas gali komentuoti receptus
  
  Scenarijus: prisijungęs vartotojas gali komentuoti
    Duota vartotojas yra prisijungęs
    Kai įvesti recepto komentarą
    Tada parašo komentarą prie recepto
    
   Scenarijus: vartotojas gali keisti komentarą
    Duota vartotojas nori pakeisti komentarą
    Kai vartotojas yra parašęs komentarą
    Tada vartotojas keičia parašytą komentarą

   Scenarijus: vartotojas negali rašyti komentaro
    Duota vartotojas nėra prisijungęs
    Kai vartotojas parašo komentarą
    Tada vartotojas nemato komentarų įrašymo lauko
    
   Scenarijus: vartotojas bando parašyti tuščią komentarą
    Duota vartotojas yra prisijungęs
    Kai vartotojas palieka tuščia komentaro lauką
    Ir bando komentarą pridėti prie recepto
    Tada vartotojui išmeta klaida, kad tuščio komentaro lauko palikti negalima.
