'use strict'

const { recipes } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    await recipes.bulkCreate([
      {
        id: 1,
        title: 'First Recipe',
        description: '1. Do something\n2. Do something\n3. Do something\n4. Done',
        ingredients: '- Strawberries: 100g\n- Blueberries: 200g\n- Sugar: 40g',
        type: 'Cookies',
        userId: 1,
      },
      {
        id: 2,
        title: 'Second Recipe',
        description: '1. Do something\n2. Do something\n3. Do something\n4. Done',
        ingredients: '- Strawberries: 100g\n- Blueberries: 200g\n- Sugar: 40g',
        type: 'Desert',
        userId: 2,
      },
      {
        id: 3,
        title: 'Third Recipe',
        description: '1. Do something\n2. Do something\n3. Do something\n4. Done',
        ingredients: '- Strawberries: 100g\n- Blueberries: 200g\n- Sugar: 40g',
        type: 'Desert',
        userId: 2,
      },
      {
        id: 4,
        title: 'Fourth Recipe',
        description: '1. Do something\n2. Do something\n3. Do something\n4. Done',
        ingredients: '- Strawberries: 100g\n- Blueberries: 200g\n- Sugar: 40g',
        type: 'Desert',
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
        type: 'Desert',
        userId: 2,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {})
  },
}
