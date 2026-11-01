'use strict';
const OPENING_WORLD = {
  "schemaVersion": 2,
  "coordinates": "0\u2013100 per axis; bitmap 1536\u00d71024; y grows south; small elliptical feet; ground plane only",
  "regions": {
    "riverbank": {
      "name": "Reedbank \u00b7 Festival morning",
      "ground": "assets/opening/reedbank-ground.bd2a45b32675.webp",
      "spawn": [
        31.6,
        37
      ],
      "terrain": {
        "semantic": true,
        "footRadius": 0.34,
        "walkSpeed": 7.3,
        "speeds": {
          "road": 1,
          "grass": 0.84
        },
        "walkAreas": [
          {
            "id": "bank",
            "polygon": [
              [
                10,
                11
              ],
              [
                77,
                11
              ],
              [
                84,
                17
              ],
              [
                94,
                8
              ],
              [
                98,
                8
              ],
              [
                98,
                30
              ],
              [
                85,
                40
              ],
              [
                77,
                54
              ],
              [
                13,
                54
              ],
              [
                10,
                44
              ]
            ]
          },
          {
            "id": "boardwalk",
            "polygon": [
              [
                13.5,
                54
              ],
              [
                98.0,
                54
              ],
              [
                98.0,
                58.4
              ],
              [
                13.5,
                58.4
              ]
            ]
          },
          {
            "id": "home-stairs",
            "polygon": [
              [
                28.7,
                43
              ],
              [
                36.2,
                43
              ],
              [
                36.2,
                55
              ],
              [
                28.7,
                55
              ]
            ]
          },
          {
            "id": "west-dock",
            "polygon": [
              [
                30.3,
                57
              ],
              [
                34.4,
                57
              ],
              [
                34.4,
                68
              ],
              [
                30.3,
                68
              ]
            ]
          },
          {
            "id": "festival-dock",
            "polygon": [
              [
                55.7,
                57
              ],
              [
                60.1,
                57
              ],
              [
                60.1,
                69
              ],
              [
                55.7,
                69
              ]
            ]
          },
          {
            "id": "east-dock",
            "polygon": [
              [
                75,
                57
              ],
              [
                79.5,
                57
              ],
              [
                79.5,
                71
              ],
              [
                75,
                71
              ]
            ]
          }
        ],
        "roadAreas": [
          {
            "id": "timber-boardwalk",
            "polygon": [
              [
                13.5,
                54
              ],
              [
                98.0,
                54
              ],
              [
                98.0,
                58.4
              ],
              [
                13.5,
                58.4
              ]
            ]
          },
          {
            "id": "landing-stairs",
            "polygon": [
              [
                28.7,
                43
              ],
              [
                36.2,
                43
              ],
              [
                36.2,
                55
              ],
              [
                28.7,
                55
              ]
            ]
          },
          {
            "id": "home-floor",
            "polygon": [
              [
                18.5,
                24
              ],
              [
                44.5,
                24
              ],
              [
                44.5,
                43
              ],
              [
                18.5,
                43
              ]
            ]
          },
          {
            "id": "west-dock",
            "polygon": [
              [
                30.3,
                57
              ],
              [
                34.4,
                57
              ],
              [
                34.4,
                68
              ],
              [
                30.3,
                68
              ]
            ]
          },
          {
            "id": "festival-dock",
            "polygon": [
              [
                55.7,
                57
              ],
              [
                60.1,
                57
              ],
              [
                60.1,
                69
              ],
              [
                55.7,
                69
              ]
            ]
          },
          {
            "id": "east-dock",
            "polygon": [
              [
                75,
                57
              ],
              [
                79.5,
                57
              ],
              [
                79.5,
                71
              ],
              [
                75,
                71
              ]
            ]
          },
          {
            "id": "bank-path",
            "polygon": [
              [
                73,
                55
              ],
              [
                79,
                55
              ],
              [
                82,
                44
              ],
              [
                88,
                32
              ],
              [
                98,
                27
              ],
              [
                98,
                15
              ],
              [
                92,
                15
              ],
              [
                91,
                25
              ],
              [
                83,
                31
              ],
              [
                79,
                40
              ]
            ]
          }
        ],
        "blocked": [
          {
            "id": "home-north-stone-wall",
            "polygon": [
              [
                18,
                22
              ],
              [
                45,
                22
              ],
              [
                45,
                25
              ],
              [
                18,
                25
              ]
            ]
          },
          {
            "id": "home-west-wall",
            "polygon": [
              [
                17.8,
                24
              ],
              [
                19.3,
                24
              ],
              [
                19.3,
                43
              ],
              [
                17.8,
                43
              ]
            ]
          },
          {
            "id": "home-east-wall",
            "polygon": [
              [
                44,
                24
              ],
              [
                45.4,
                24
              ],
              [
                45.4,
                43
              ],
              [
                44,
                43
              ]
            ]
          },
          {
            "id": "home-front-west",
            "polygon": [
              [
                18,
                41
              ],
              [
                29.8,
                41
              ],
              [
                29.8,
                44.1
              ],
              [
                18,
                44.1
              ]
            ]
          },
          {
            "id": "home-front-east",
            "polygon": [
              [
                33.5,
                41
              ],
              [
                45.0,
                41
              ],
              [
                45.0,
                44.1
              ],
              [
                33.5,
                44.1
              ]
            ]
          },
          {
            "id": "bedroom-partition-north",
            "polygon": [
              [
                27.1,
                24
              ],
              [
                28.200000000000003,
                24
              ],
              [
                28.200000000000003,
                33.8
              ],
              [
                27.1,
                33.8
              ]
            ]
          },
          {
            "id": "bedroom-partition-south",
            "polygon": [
              [
                27.1,
                37.9
              ],
              [
                28.200000000000003,
                37.9
              ],
              [
                28.200000000000003,
                41.9
              ],
              [
                27.1,
                41.9
              ]
            ]
          },
          {
            "id": "quilted-bed",
            "polygon": [
              [
                20,
                26.3
              ],
              [
                24,
                26.3
              ],
              [
                24,
                33.6
              ],
              [
                20,
                33.6
              ]
            ]
          },
          {
            "id": "writing-desk",
            "polygon": [
              [
                19.8,
                37.1
              ],
              [
                24.3,
                37.1
              ],
              [
                24.3,
                40.4
              ],
              [
                19.8,
                40.4
              ]
            ]
          },
          {
            "id": "kitchen-and-hearth",
            "polygon": [
              [
                29.1,
                25
              ],
              [
                42.6,
                25
              ],
              [
                42.6,
                29.7
              ],
              [
                29.1,
                29.7
              ]
            ]
          },
          {
            "id": "table-and-stools",
            "ellipse": [
              37.8,
              35.2,
              3.6,
              2.8
            ]
          },
          {
            "id": "window-bench",
            "polygon": [
              [
                41.1,
                38.1
              ],
              [
                44.0,
                38.1
              ],
              [
                44.0,
                40.7
              ],
              [
                41.1,
                40.7
              ]
            ]
          },
          {
            "id": "landing-west-rail",
            "polygon": [
              [
                28.5,
                45
              ],
              [
                28.88,
                45
              ],
              [
                28.88,
                53.8
              ],
              [
                28.5,
                53.8
              ]
            ]
          },
          {
            "id": "landing-east-rail",
            "polygon": [
              [
                36.1,
                45
              ],
              [
                36.480000000000004,
                45
              ],
              [
                36.480000000000004,
                53.8
              ],
              [
                36.1,
                53.8
              ]
            ]
          },
          {
            "id": "boardwalk-south-west",
            "polygon": [
              [
                13.8,
                58.5
              ],
              [
                29.900000000000002,
                58.5
              ],
              [
                29.900000000000002,
                58.85
              ],
              [
                13.8,
                58.85
              ]
            ]
          },
          {
            "id": "boardwalk-south-middle",
            "polygon": [
              [
                35,
                58.5
              ],
              [
                55.2,
                58.5
              ],
              [
                55.2,
                58.85
              ],
              [
                35,
                58.85
              ]
            ]
          },
          {
            "id": "boardwalk-south-east",
            "polygon": [
              [
                60.6,
                58.5
              ],
              [
                74.5,
                58.5
              ],
              [
                74.5,
                58.85
              ],
              [
                60.6,
                58.85
              ]
            ]
          },
          {
            "id": "boardwalk-south-end",
            "polygon": [
              [
                80.1,
                58.5
              ],
              [
                97.6,
                58.5
              ],
              [
                97.6,
                58.85
              ],
              [
                80.1,
                58.85
              ]
            ]
          },
          {
            "id": "west-dock-tip",
            "polygon": [
              [
                30.2,
                68
              ],
              [
                34.5,
                68
              ],
              [
                34.5,
                68.4
              ],
              [
                30.2,
                68.4
              ]
            ]
          },
          {
            "id": "festival-dock-tip",
            "polygon": [
              [
                55.6,
                69
              ],
              [
                60.2,
                69
              ],
              [
                60.2,
                69.4
              ],
              [
                55.6,
                69.4
              ]
            ]
          },
          {
            "id": "east-dock-tip",
            "polygon": [
              [
                74.9,
                71
              ],
              [
                79.60000000000001,
                71
              ],
              [
                79.60000000000001,
                71.4
              ],
              [
                74.9,
                71.4
              ]
            ]
          },
          {
            "id": "west-dock-left-rail",
            "polygon": [
              [
                30.1,
                59
              ],
              [
                30.400000000000002,
                59
              ],
              [
                30.400000000000002,
                68
              ],
              [
                30.1,
                68
              ]
            ]
          },
          {
            "id": "west-dock-right-rail",
            "polygon": [
              [
                34.6,
                59
              ],
              [
                34.9,
                59
              ],
              [
                34.9,
                68
              ],
              [
                34.6,
                68
              ]
            ]
          },
          {
            "id": "festival-dock-left-rail",
            "polygon": [
              [
                55.5,
                59
              ],
              [
                55.8,
                59
              ],
              [
                55.8,
                69
              ],
              [
                55.5,
                69
              ]
            ]
          },
          {
            "id": "festival-dock-right-rail",
            "polygon": [
              [
                60.2,
                59
              ],
              [
                60.5,
                59
              ],
              [
                60.5,
                69
              ],
              [
                60.2,
                69
              ]
            ]
          },
          {
            "id": "east-dock-left-rail",
            "polygon": [
              [
                74.8,
                59
              ],
              [
                75.1,
                59
              ],
              [
                75.1,
                71
              ],
              [
                74.8,
                71
              ]
            ]
          },
          {
            "id": "east-dock-right-rail",
            "polygon": [
              [
                79.6,
                59
              ],
              [
                79.89999999999999,
                59
              ],
              [
                79.89999999999999,
                71
              ],
              [
                79.6,
                71
              ]
            ]
          }
        ],
        "roads": [],
        "rivers": [],
        "rocks": [],
        "foreground": [],
        "rooms": [
          {
            "id": "reedbank-home",
            "title": "Home beneath the bank",
            "area": {
              "id": "",
              "polygon": [
                [
                  19.3,
                  25
                ],
                [
                  43.900000000000006,
                  25
                ],
                [
                  43.900000000000006,
                  42
                ],
                [
                  19.3,
                  42
                ]
              ]
            },
            "enter": {
              "id": "",
              "polygon": [
                [
                  29.8,
                  41.5
                ],
                [
                  33.5,
                  41.5
                ],
                [
                  33.5,
                  42.15
                ],
                [
                  29.8,
                  42.15
                ]
              ]
            },
            "exit": {
              "id": "",
              "polygon": [
                [
                  29.8,
                  44.2
                ],
                [
                  33.5,
                  44.2
                ],
                [
                  33.5,
                  44.900000000000006
                ],
                [
                  29.8,
                  44.900000000000006
                ]
              ]
            },
            "roofIds": [
              "home-exterior"
            ]
          }
        ],
        "bridge": {
          "polygon": [],
          "gate": [
            0,
            0,
            0,
            0
          ]
        }
      },
      "rooms": [
        {
          "id": "reedbank-home",
          "title": "Home beneath the bank",
          "area": {
            "id": "",
            "polygon": [
              [
                19.3,
                25
              ],
              [
                43.900000000000006,
                25
              ],
              [
                43.900000000000006,
                42
              ],
              [
                19.3,
                42
              ]
            ]
          },
          "enter": {
            "id": "",
            "polygon": [
              [
                29.8,
                41.5
              ],
              [
                33.5,
                41.5
              ],
              [
                33.5,
                42.15
              ],
              [
                29.8,
                42.15
              ]
            ]
          },
          "exit": {
            "id": "",
            "polygon": [
              [
                29.8,
                44.2
              ],
              [
                33.5,
                44.2
              ],
              [
                33.5,
                44.900000000000006
              ],
              [
                29.8,
                44.900000000000006
              ]
            ]
          },
          "roofIds": [
            "home-exterior"
          ]
        }
      ],
      "shadows": [
        [
          31.5,
          43.5,
          15.5,
          2
        ]
      ],
      "parts": [
        {
          "id": "home-interior",
          "asset": "assets/opening/home-interior.2c2535d72172.webp",
          "bounds": [
            17,
            21,
            29,
            25
          ],
          "depth": 0,
          "ground": true
        },
        {
          "id": "home-exterior",
          "asset": "assets/opening/home-roof.297cc6ef36f1.webp",
          "bounds": [
            16.5,
            18.5,
            30,
            27.5
          ],
          "depth": 46,
          "roofGroup": "home-exterior",
          "roomId": "reedbank-home"
        }
      ],
      "placements": {
        "day-23": [
          30.6,
          37.9
        ],
        "day-8": [
          57.8,
          62.1
        ]
      },
      "exits": [
        {
          "target": "woodland",
          "point": [
            10,
            51
          ],
          "area": {
            "id": "eastern-bank-path",
            "polygon": [
              [
                94,
                13
              ],
              [
                98,
                13
              ],
              [
                98,
                27
              ],
              [
                94,
                27
              ]
            ]
          },
          "requires": []
        }
      ]
    },
    "woodland": {
      "name": "Woodland Road",
      "ground": "assets/opening/woodland-ground.14e0f40c795f.webp",
      "spawn": [
        10,
        51
      ],
      "terrain": {
        "semantic": true,
        "footRadius": 0.34,
        "walkSpeed": 7.3,
        "speeds": {
          "road": 1,
          "grass": 0.84
        },
        "walkAreas": [
          {
            "id": "east-bank-clearing",
            "polygon": [
              [
                27,
                39
              ],
              [
                40,
                33
              ],
              [
                54,
                25
              ],
              [
                74,
                19
              ],
              [
                85,
                28
              ],
              [
                91,
                39
              ],
              [
                98,
                42
              ],
              [
                98,
                58
              ],
              [
                82,
                64
              ],
              [
                65,
                62
              ],
              [
                47,
                70
              ],
              [
                28,
                65
              ]
            ]
          },
          {
            "id": "stone-causeway",
            "polygon": [
              [
                3,
                46
              ],
              [
                12,
                48
              ],
              [
                26,
                50
              ],
              [
                31,
                49
              ],
              [
                31,
                59
              ],
              [
                25,
                59
              ],
              [
                12,
                56
              ],
              [
                3,
                54
              ]
            ]
          }
        ],
        "roadAreas": [
          {
            "id": "woodland-road",
            "polygon": [
              [
                3,
                46
              ],
              [
                12,
                49
              ],
              [
                26,
                51
              ],
              [
                48,
                45
              ],
              [
                63,
                35
              ],
              [
                79,
                39
              ],
              [
                98,
                44
              ],
              [
                98,
                54
              ],
              [
                78,
                51
              ],
              [
                64,
                46
              ],
              [
                48,
                57
              ],
              [
                27,
                61
              ],
              [
                12,
                56
              ],
              [
                3,
                55
              ]
            ]
          },
          {
            "id": "camp-approach",
            "polygon": [
              [
                61,
                29
              ],
              [
                71,
                29
              ],
              [
                71,
                44
              ],
              [
                61,
                44
              ]
            ]
          },
          {
            "id": "causeway-deck",
            "polygon": [
              [
                8,
                49
              ],
              [
                26,
                49
              ],
              [
                26,
                55.6
              ],
              [
                8,
                55.6
              ]
            ]
          }
        ],
        "blocked": [
          {
            "id": "way-oak-trunk",
            "ellipse": [
              45.5,
              57.8,
              1.35,
              0.85
            ]
          },
          {
            "id": "causeway-north-rail",
            "polygon": [
              [
                8,
                49
              ],
              [
                26,
                49
              ],
              [
                26,
                49.3
              ],
              [
                8,
                49.3
              ]
            ]
          },
          {
            "id": "causeway-south-rail",
            "polygon": [
              [
                8,
                55.3
              ],
              [
                26,
                55.3
              ],
              [
                26,
                55.6
              ],
              [
                8,
                55.6
              ]
            ]
          },
          {
            "id": "camp-fire-ring",
            "ellipse": [
              68.8,
              23.5,
              1.3,
              0.8
            ]
          }
        ],
        "roads": [],
        "rivers": [],
        "rocks": [],
        "foreground": [],
        "rooms": [],
        "bridge": {
          "polygon": [],
          "gate": [
            0,
            0,
            0,
            0
          ]
        }
      },
      "rooms": [],
      "shadows": [
        [
          46.8,
          58.1,
          5,
          1.1
        ]
      ],
      "parts": [
        {
          "id": "way-oak",
          "asset": "assets/opening/way-oak.791cb54f4f70.webp",
          "bounds": [
            34.5,
            29,
            22,
            30
          ],
          "depth": 57.8,
          "occluder": {
            "ellipse": [
              45.5,
              42,
              9.8,
              14.5
            ]
          },
          "fixedBase": true
        },
        {
          "id": "causeway-deck",
          "asset": "assets/opening/woodland-bridge.824d8f46851d.webp",
          "bounds": [
            7,
            47.4,
            20,
            9.3
          ],
          "depth": 0,
          "ground": true
        }
      ],
      "placements": {
        "day-18": [
          61.5,
          35
        ],
        "day-24": [
          78,
          48
        ]
      },
      "exits": [
        {
          "target": "riverbank",
          "point": [
            89,
            26
          ],
          "area": {
            "id": "return-bank-path",
            "polygon": [
              [
                3,
                46
              ],
              [
                6,
                46
              ],
              [
                6,
                58
              ],
              [
                3,
                58
              ]
            ]
          },
          "requires": []
        },
        {
          "target": "greenwood",
          "point": [
            42,
            91
          ],
          "area": {
            "id": "greenwood-road",
            "polygon": [
              [
                94,
                44
              ],
              [
                98,
                44
              ],
              [
                98,
                56
              ],
              [
                94,
                56
              ]
            ]
          },
          "requires": []
        }
      ]
    }
  }
};
