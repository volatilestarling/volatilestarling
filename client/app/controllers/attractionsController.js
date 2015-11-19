angular.module('where-to.attr', [])
  .controller('AttractionsController', ['$scope', 'Detail', function($scope, Detail) {
    
    // $scope.attractionsList = Detail.attractions;
    $scope.attractionsList = [
      {
        "Attraction": "Forbidden City",
        "Description": "Ringed by a 52m-wide moat at the very heart of Běijīng, the Forbidden City is China’s largest and best-preserved collection of ancient buildings, and the largest palace complex in the world...",
        "Type": "Historic",
        "City": "Běijīng",
        "Link": "http://www.lonelyplanet.com/china/sights/historic/forbidden-city/item-a-368617-id"
      },
      {
        "Attraction": "Sakya Monastery",
        "Description": "The immense, grey, thick-walled southern monastery is one of Tibet’s most impressive constructed sights, and one of the largest monasteries...",
        "Type": "Religious",
        "City": "Sakya",
        "Link": "http://www.lonelyplanet.com/china/sights/religious/sakya-monastery/item-a-1239844-id"
      },
      {
        "Attraction": "Temple of Heaven Park",
        "Description": "A tranquil oasis of peace and methodical Confucian design in one of China’s busiest urban landscapes, the 267-hectare Temple of Heaven Park is absolutely unique...",
        "Type": "Parks & Gardens",
        "City": "Běijīng",
        "Link": "http://www.lonelyplanet.com/china/sights/parks-gardens/temple-heaven-park/item-a-1106060-id"
      },
      {
        "Attraction": "Gyantse Kumbum",
        "Description": "Commissioned by a Gyantse prince in 1427 and sitting inside the Pelkor Chöde complex, the Gyantse Kumbum is the town’s foremost attraction...",
        "Type": "Religious",
        "City": "Gyantse",
        "Link": "http://www.lonelyplanet.com/china/sights/religious/gyantse-kumbum/item-a-1442852-id"
      },
      {
        "Attraction": "West Lake",
        "Description": "The unashamed tourist brochure hyperbole extolling West Lake is almost justified in its shrill accolades...",
        "Type": "Lakes, Rivers & Waterfalls",
        "City": "Hángzhōu",
        "Link": "http://www.lonelyplanet.com/china/sights/lakes-rivers-waterfalls/west-lake/item-a-473520-id"
      },
      {
        "Attraction": "Barkhor Circuit",
        "Description": "For your first few visits to the Barkhor circuit, it’s best to let yourself be dragged along by the centrifugal tide of pilgrims, but there are also several small, fascinating temples to pop into en route\nAs you foll...",
        "Type": "Religious",
        "City": "Lhasa",
        "Link": "http://www.lonelyplanet.com/china/sights/religious/barkhor-circuit/item-a-1442161-id"
      },
      {
        "Attraction": "Bìshǔ Shānzhuāng",
        "Description": "The imperial summer resort is composed of a main palace complex and vast parklike gardens, all enclosed by a handsome 10km-long wall...",
        "Type": "Historic",
        "City": "Chéngdé",
        "Link": "http://www.lonelyplanet.com/china/sights/historic/bish-shanzhuang/item-a-472950-id"
      },
      {
        "Attraction": "Potala Palace",
        "Description": "The magnificent Potala Palace, once the seat of the Tibetan government and the winter residence of the Dalai Lamas, is Lhasa's cardinal landmark...",
        "Type": "Castles, Palaces & Mansions",
        "City": "Lhasa",
        "Link": "http://www.lonelyplanet.com/china/sights/castles-palaces-mansions/potala-palace/item-a-435266-id"
      },
      {
        "Attraction": "Hòuhǎi Lakes",
        "Description": "Also known as Shíchàhǎi (什刹海) but mostly just referred to collectively as ‘Hòuhǎi’, the Hòuhǎi Lakes are compromised of three lakes: Qiánhǎi (Front Lake), Hòuhǎi (Back Lake) and Xīhǎi (West Lake)...",
        "Type": "Other",
        "City": "Běijīng",
        "Link": "http://www.lonelyplanet.com/china/sights/other/houh-i-lakes/item-a-1313034-id"
      }
    ]

  }]);
