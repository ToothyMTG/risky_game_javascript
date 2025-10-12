Country = [
    // the number is PKB in millions USD
    // country code is unique
    'Sea sea 0',
    'Land land 0',
    "Poland ccpl 12",
    "Germany ccde 42",
    "France ccfr 28",
    "Spain cces 17",
    "Portugal ccpt 4",
    "Italy ccit 23",
    "Great_Britain ccgb 27",
    "Ireland ccir 4",
    "Sweden ccse 5",
    "Norway ccno 3",
    "Finland ccfi 3",
    "Czech_Republic cccz 4",
    "Slovakia ccsk 2",
    "Switzerland ccsu 6",
    "Austria ccau 5",
    "Belgium ccbe 6",
    "Netherlands ccnl 9",
    "Denmark ccdk 3",
    "Slovenia ccsv 1",
    "Croatia cccr 1",
    "Hungary cchu 3",
    "Romania ccro 5",
    "Bosnia ccbs 1",
    "Serbia ccsr 1",
    "Albania ccal 1",
    "Kosovo ccko 1",
    "Greece ccgr 3",
    "Bulgaria ccbg 2",
    "Moldova ccml 1",
    "Turkey cctu 23",
    "Ukraine ccua 5",
    "Russia ccru 38",
    "Belarus ccbl 2",
    "Lithuania cclt 1",
    "Latvia cclv 1",
    "Estonia ccet 1",
    // Other continents, major counties
    "USA crus 226",
    "Canada crca 38",
    "Mexico crmx 18",
    "Brazil crbr 44",
    "Argentina crar 11",
    "Chile crli 10",
    "Colombia crco 12",
    "Venezuela crve 8",
    "Peru crpe 7",
    "South_Africa crza 12",
    "Egypt creg 4",
    "Nigeria crng 12",
    "Kenya crke 3",
    "Ethiopia creh 3",
    "Saudi_Arabia crsa 18",
    "UAE cruae 8",
    "India crin 74",
    "Pakistan crpk 11",
    "Bangladesh crbg 7",
    "Sri_Lanka crsl 4",
    "China crcn 166",
    "Japan crjp 54",
    "South_Korea crks 34",
    "North_Korea crnk 1",
    "Mongolia crmo 1",
    "Australia crau 28",
    "New_Zealand crnu 6",
    "Indonesia crid 14",
    "Philippines crph 9",
    "Vietnam crvn 7",
    "Thailand crth 12",
    "Malaysia crmy 11",
    "Singapore crsq 8",
    "Taiwan crtw 8",
    // european union strength is european union total PKB
    "European_Union creu 180",
    // Historical countries
    "Austria-Hungary chah 62",
    "Ottoman_Empire choe 52",
    "Prussia chpr 20",
    "Soviet_Union chsu 73",
    "Yugoslavia chyu 20",
    "Czechoslovakia chcs 10",
    "East_Germany cheg 12",
    "West_Germany chwg 30",
    "Ancient_Egypt chae 5",
    "Roman_Empire chre 25",
    "Mongol_Empire chme 30",
    "British_Empire chbe 100"
    ]

Gamemodes = [
    "Random map",
    "Europe",
    "World",
    "Load map"
]

predefinedUnions = {
    nato: ['ccpl','ccde','ccfr','cces','ccpt','ccit','ccgb','ccir','ccse','ccno','ccfi','cccz','ccsk','ccsu','ccau','ccbe','ccnl','ccdk','ccsv','cccr','cchu','ccro','ccbs','ccsr','ccal','ccko','ccgr','ccbg','cctu','cclt','cclv','ccet','ccua','ccml'],
    russiabelarus: ['ccru','ccbl'],  
} 

New_GameModes = [
    {
        "name":"Random map",
        "countries":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35],
        "year":1,
        "optionable":false,
        "startup":['mapgenerator','randommode']
    },
    {
        "name":"Europe",
        "countries":[0],
        "year":1,
        "optionable":true,
        "mapfile":"maps/europe.json",
        "startup":['mapeditor_loadmap','populategamemode'],
        'predefinedUnions': [predefinedUnions.nato,predefinedUnions.russiabelarus]
    },
    {
        'name':"World",
        'countries':[0],
        'year':1,
        'optionable':true,
        'mapfile':"maps/world.json",
        'startup':['mapeditor_loadmap','populategamemode'],
        'predefinedUnions': [predefinedUnions.nato,predefinedUnions.russiabelarus]
    },

]

PowDistModes = [
    'One Tile per country',
    'Each Tile but one capital',
    "Power per country's GDP",
    "Power per country's GDP + unions"
]


Maxpowers = [
    10,
    20,
    30,
    50,
    100,
    200,
    999,
    3
]

CommonWealths = [
    'nocw',
    'cw01',
    'cw02',
    'cw03',
    'cw04',
    'cw05',
    'cw06',
    'cw07',
    'cw08',
    'cw09',
    'cw10'
]

// Inner / Outer