'use strict'

const { recipes } = require('../models')

module.exports = {
  async up(_queryInterface, _Sequelize) {
    await recipes.bulkCreate([
      {
        id: 1,
        title: 'Traškūs kiaulienos karbonadai',
        description: `
<h1>PARUOŠIMO BŪDAS:</h1>
1. Kiaulienos nugarinę supjaustyti į 6 gabaliukus. Kiekvieną gabaliuką išmušti mėsos muštuku ir jį paploninti. Pabarstyti paprikos milteliais, pipirais, druska.

2. Į vieną dubenį suberti miltus, į antrą dubenėlį įmušti kiaušinius ir išplakti, į trečią dubenį suberti džiūvėsėlius ir sūrį, išmaišyti.

3. Kiekvieną mėsos gabaliuką apvolioti miltuose, tuomet kiaušinio plakinyje, tuomet džiūvėsėliuose su sūriu. Aš džiūvėsėliuose apvoliojau du kartus.

4. Į keptuvę įpilti aliejaus, įkaitinti, dėti karbonadus ir kepti iš abiejų pusių iki kol iškeps. Ar iškepę, galite patikrinti bakstelėję peiliu į kepsnį, tuomet suprasite, kada mėsa minkšta ir iškepusi, svarbiausia jų neperkepti. Labai tinka tiekti su bulvių koše ir burokėliais.
`,
        ingredients: `
0.5 kilogramo	kiaulienos nugarinės
2 vienetai	kiaušinių (didesnių arba 3 mažesnių)
pagal poreikį	kietojo sūrio (tarkuoto, naudojau "Džiugo")
pagal poreikį	kvietinių miltų
pagal skonį	paprikos miltelių
pagal skonį	maltų juodųjų pipirų
pagal skonį	druskos
pagal poreikį	aliejaus
`,
        type: 'Pagrindinis',
        userId: 1,
      },
      {
        id: 2,
        title: 'Šaltibarščiai',
        description: `
<h1>Prepare:</h1>
Place eggs into a saucepan in a single layer and cover with water by 1 inch. Cover the saucepan and bring to a boil. Remove from the heat and let eggs stand in hot water for 15 minutes. Drain, then run under cold water to cool.

Peel and chop eggs; place into a large bowl. Add buttermilk, beets, cucumber, dill, and chives; stir gently to combine. Chill in the refrigerator for 24 hours before serving.
`,
        ingredients: `
4 large eggs
1 quart buttermilk
1 pound beets, peeled and shredded
1 large English cucumber - peeled, quartered, and sliced
1 bunch fresh dill, minced
¼ cup minced chives
`,
        type: 'Sriuba',
        userId: 2,
      },
      {
        id: 3,
        title: 'Cepelinai su mėsa',
        description: `
<h1>PARUOŠIMO BŪDAS:</h1>
1.	Nuskustos bulvės sutarkuojamos ir nusunkiamos.

2.	Skystis neišpilamas, bet laukiama, kol nusės krakmolas. Tada skystis nupilamas, o krakmolas sudedamas į tarkius.

3.	Virtos bulvės sugrūdamos ir sumaišomos su žalių bulvių tarkiu, krakmolu, pasūdoma, gerai išminkoma.

4.	Įdarui pakepinamas smulkintas svogūnas. Malta mėsa maišoma su kepintu svogūnu, druska ir pipirais.

5.	Imama maždaug po 80 g tešlos, išplojama, uždedama įdaro, paplotis sulenkiamas, kraštai gerai užspaudžiami ir daromi pailgi kukuliai.

6.	Jie dedami į verdantį pasūdytą vandenį ir verdami 20 — 25 minutes, atsargiai pamaišant.

7.	Padažui riebaluose kelias minutes pakepinami spirgučiai, tuomet sudedami smulkinti svogūnai, pakepinami dar kelias minutes, tuomet supilama grietinė.

8.	Išgriebti iš vandens cepelinai sudedami į pašildytą pusdubenį ir užpilami padažu.
`,
        ingredients: `
12 vienetų bulvių (žalios)
3 vienetai bulvių (virtos)
šiek tiek druskos
500 gramų faršo
1 vienetas svogūnų
šiek tiek druskos
šiek tiek juodųjų pipirų
1 vienetas svogūnų
2 šaukštai taukų (tirpinti)
šiek tiek spirgučių
šiek tiek grietinės
`,
        type: 'Pagrindinis',
        userId: 2,
      },
      {
        id: 4,
        title: 'Purūs pusryčių blyneliai',
        description: `
<h1>PARUOŠIMO BŪDAS:</h1>
Kiaušinius išplakame su cukrumi, pilame pieną, išmaišome. Į tešlą dalimis sijojame miltus, kepimo miltelius ir išmaišome. Miltų dedame tiek, kad tešla būtų tirštos grietinės konsistencijos. Iš užmaišytos tešlos keptuvėje formuojame nedidelius blynelius ir kepame iš abiejų pusių, kol gražiai apskrus.
`,
        ingredients: `
Kiaušiniai – 3 vnt.;
Pienas – 1 stiklinė (250 ml);
Kepimo milteliai - 15 g;
Miltai - tiek, kad tešla gautūsi tirštos grietinės konsistencijos;
Cukrus - 1 valgomasis šaukštas;
Druska - žiupsnelis.
Augalinis aliejus kepimui
`,
        type: 'Desertas',
        userId: 2,
      },
      {
        id: 5,
        title: 'Skanūs miltiniai blynai',
        description: `
<h1>PARUOŠIMO BŪDAS:</h1>
1. Kiaušinius įmušti į indą, berti cukrų, žiupsnelį druskos ir gerai. išplakti.

2. Suberti miltus ir šaukštu gerai išmaišyti. Per kelis kartus supilti pieną, kaskart gerai išmaišant. Turėtų gautis poskystė tešla. Ją palikti 10-15 min pastovėti, kad miltai išbrinktų.

3. Keptuvėje įkaitinti truputį aliejaus arba sviesto. Vienam blyneliui dėti po daugmaž šaukštą tešlos. Kepti ant vidutinės kaitros. Kai blynelių viršus pakeisk spalvą ir atsiras burbuliukų, apversti ir dar šiek tiek pakepti.

4. Tiekti iš karto iškeptus, pašildytose lėkštėse arba laikyti šiltoje orkaitėje, kad neatvėstų.

5. Šiuos blynelius tinka valgyti su uogiene, grietine, jogurtu ar kaip tik mėgstate.
`,
        ingredients: `
100 gramų	kvietinių miltų
100 mililitrų pieno (arba kefyro)
2 vienetai kiaušinių (M arba L dydžio)
2 šaukštai cukraus (arba pagal skonį)
1 žiupsnelis druskos
`,
        type: 'Desertas',
        userId: 2,
      },
    ])
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {})
  },
}
