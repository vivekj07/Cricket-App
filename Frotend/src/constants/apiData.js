export const leagues=[
  {
    "_id": "679e8c20fd78d501237d7183",
    "name": "GPL",
    "startDate": "2025-02-14T18:30:00.000Z",
    "endDate": "2025-02-14T18:30:00.000Z",
    "season": "S1",
    "format": "T20",
    "description": "Most awaiting league"
  },
  {
  "_id": "679e8c20fd78d501237d7184",
  "name": "IPL",
  "startDate": "2025-03-14T18:30:00.000Z",
  "endDate": "2025-04-14T18:30:00.000Z",
  "season": "S18",
  "format": "T20",
  "description": "Most awaiting league"
}
    
]

export const matches=[
  { 
    "_id": "67a21d2e27b0d972dbfcca3c",
    "date": "2025-02-05T14:00:00.000Z",
    "startTime": "2025-02-05T14:30:00.000Z",
    "endTime": "2025-02-05T18:00:00.000Z",
    "venue": {
        "_id": "67a0d6487f63b1766eee15d3",
        "name": "Chepauk"
    },
    "status": "Live",
    "scoreboard": {
        "teamInnings": [
            {
                "team": {
                    "_id": "679f7b3e8d69f8a0564653d7",
                    "name": "Mumbai Indians",
                    "shortName": "MI",
                    "logo": {
                        "url": "https://res.cloudinary.com/dj262m3wb/image/upload/v1738506521/CricketApp/TeamLogos/Images/4ef33b01-c928-497b-867f-86fb1c28e3bd.webp",
                        "public_id": "CricketApp/TeamLogos/Images/4ef33b01-c928-497b-867f-86fb1c28e3bd"
                    }
                },
                "runs": 250,
                "wickets": 2,
                "overs": 50
            },
            {
                "team": {
                    "_id": "679f838182e5366b2fb97e01",
                    "name": "Chennai Super Kings",
                    "shortName": "CSK",
                    "logo": {
                        "url": "https://res.cloudinary.com/dj262m3wb/image/upload/v1738507137/CricketApp/TeamLogos/Images/5aeb519f-9c13-43b0-84ba-bca2954c3c1d.jpg",
                        "public_id": "CricketApp/TeamLogos/Images/5aeb519f-9c13-43b0-84ba-bca2954c3c1d"
                    }
                },
                "runs": 220,
                "wickets": 2,
                "overs": 50
            }
        ]
    }
  },
  { 
    "_id": "679fde7c8ccacf0f718e9051",
    "date": "2025-02-05T14:00:00.000Z",
    "startTime": "2025-02-05T14:30:00.000Z",
    "endTime": "2025-02-05T18:00:00.000Z",
    "venue": {
        "_id": "67a0d6487f63b1766eee15d3",
        "name": "Chepauk"
    },
    "status": "Upcoming",
    "scoreboard": {
        "teamInnings": [
            {
                "team": {
                    "_id": "679f7b3e8d69f8a0564653d7",
                    "name": "Mumbai Indians",
                    "shortName": "MI",
                    "logo": {
                        "url": "https://res.cloudinary.com/dj262m3wb/image/upload/v1738506521/CricketApp/TeamLogos/Images/4ef33b01-c928-497b-867f-86fb1c28e3bd.webp",
                        "public_id": "CricketApp/TeamLogos/Images/4ef33b01-c928-497b-867f-86fb1c28e3bd"
                    }
                },
                "runs": 250,
                "wickets": 2,
                "overs": 50
            },
            {
                "team": {
                    "_id": "679f838182e5366b2fb97e01",
                    "name": "Chennai Super Kings",
                    "shortName": "CSK",
                    "logo": {
                        "url": "https://res.cloudinary.com/dj262m3wb/image/upload/v1738507137/CricketApp/TeamLogos/Images/5aeb519f-9c13-43b0-84ba-bca2954c3c1d.jpg",
                        "public_id": "CricketApp/TeamLogos/Images/5aeb519f-9c13-43b0-84ba-bca2954c3c1d"
                    }
                },
                "runs": 220,
                "wickets": 2,
                "overs": 50
            }
        ]
    }
  }
]

export const matchDetails=
{
  "_id": "67a21d2e27b0d972dbfcca3c",

  // result will assign after completion of match
  "result": {
      "winner": null,
      "winByRuns": 0,
      "winByWickets": 0
  },
  "league": {
      "_id": "679e8971bac8427de7197d4a",
      "name": "GPL"
  },
  "date": "2025-02-05T14:00:00.000Z",
  "startTime": "2025-02-05T14:30:00.000Z",
  "endTime": "2025-02-05T18:00:00.000Z",
  "venue": {
      "_id": "67a0d6487f63b1766eee15d3",
      "name": "Chepauk",
      "city": "Chennai",
      "capacity": 68000
  },
  "umpires": [
      {
          "_id": "67a0e284c0226cc07c0b9672",
          "fullName": "chandu",
          "country": "India"
      }
  ],
  "status": "Live",
  "scoreboard": {
      "_id": "67a225f92adefc6ef8af020c",
      "match": "67a21d2e27b0d972dbfcca3c",
      "teamInnings": [
        // these are team1 stats
          {
              "extras": {
                  "byes": 0,
                  "legByes": 0,
                  "noBalls": 0,
                  "wides": 0
              },
              "team": {
                  "logo": {
                      "url": "https://res.cloudinary.com/dj262m3wb/image/upload/v1738506521/CricketApp/TeamLogos/Images/4ef33b01-c928-497b-867f-86fb1c28e3bd.webp",
                      "public_id": "CricketApp/TeamLogos/Images/4ef33b01-c928-497b-867f-86fb1c28e3bd"
                  },
                  "_id": "679f7b3e8d69f8a0564653d7",
                  "name": "Mumbai Indians",
                  "shortName": "MI"
              },
              "runs": 250,
              "wickets": 2,
              "overs": 50,
              // team1 batsmen
              "batsmenStats": [
                  {
                      "player": {
                          "_id": "67a219dd9b9626684fb53613",
                          "fullName": "Abhijit Jadhav",
                          "country": "India",
                          "role": "All-rounder"
                      },
                      "runs": 80,
                      "balls": 60,
                      "fours": 8,
                      "sixes": 2,
                      "strikeRate": 0,
                      "outType": "Caught",
                      "bowler": {
                          "_id": "679fbd3b596dcecceb8f2622",
                          "fullName": "Vivek Jadhav",
                          "country": "India"
                      },
                      "_id": "67a225f92adefc6ef8af020e"
                  },
                  {
                      "player": {
                          "_id": "67a219dd9b9626684fb53613",
                          "fullName": "Abhijit Jadhav",
                          "country": "India",
                          "role": "All-rounder"
                      },
                      "runs": 50,
                      "balls": 20,
                      "fours": 8,
                      "sixes": 2,
                      "strikeRate": 0,
                      "outType": "Caught",
                      "bowler": {
                          "_id": "679fc40a0d0e13a6fb944585",
                          "fullName": "Vishal Jadhav",
                          "country": "India"
                      },
                      "_id": "67a225f92adefc6ef8af020f"
                  }
              ],
              // team1 bowling stats
              "bowlersStats": [
                  {
                      "player": {
                          "_id": "67a219ff9b9626684fb53616",
                          "fullName": "Ruturaj Bhalekar",
                          "country": "India",
                          "role": "All-rounder"
                      },
                      "overs": 10,
                      "maidens": 1,
                      "runsConceded": 40,
                      "wickets": 2,
                      "economy": 4,
                      "_id": "67a225f92adefc6ef8af0210"
                  }
              ],
              "_id": "67a225f92adefc6ef8af020d",
              "fallOfWickets": []
          },
          // team2 stats
          {
              "extras": {
                  "byes": 0,
                  "legByes": 0,
                  "noBalls": 0,
                  "wides": 0
              },
              "team": {
                  "logo": {
                      "url": "https://res.cloudinary.com/dj262m3wb/image/upload/v1738507137/CricketApp/TeamLogos/Images/5aeb519f-9c13-43b0-84ba-bca2954c3c1d.jpg",
                      "public_id": "CricketApp/TeamLogos/Images/5aeb519f-9c13-43b0-84ba-bca2954c3c1d"
                  },
                  "_id": "679f838182e5366b2fb97e01",
                  "name": "Chennai Super Kings",
                  "shortName": "CSK"
              },
              "runs": 220,
              "wickets": 2,
              "overs": 50,
              // team2 batsmen
              "batsmenStats": [
                  {
                      "player": {
                          "_id": "679fbd3b596dcecceb8f2622",
                          "fullName": "Vivek Jadhav",
                          "country": "India",
                          "role": "All-rounder"
                      },
                      "runs": 55,
                      "balls": 70,
                      "fours": 4,
                      "sixes": 1,
                      "strikeRate": 0,
                      "outType": "LBW",
                      "bowler": {
                          "_id": "67a219dd9b9626684fb53613",
                          "fullName": "Abhijit Jadhav",
                          "country": "India"
                      },
                      "_id": "67a225f92adefc6ef8af0212"
                  },
                  {
                      "player": {
                          "_id": "679fc40a0d0e13a6fb944585",
                          "fullName": "Vishal Jadhav",
                          "country": "India",
                          "role": "All-rounder"
                      },
                      "runs": 155,
                      "balls": 70,
                      "fours": 4,
                      "sixes": 1,
                      "strikeRate": 0,
                      "outType": "LBW",
                      "bowler": {
                          "_id": "67a219ff9b9626684fb53616",
                          "fullName": "Ruturaj Bhalekar",
                          "country": "India"
                      },
                      "_id": "67a225f92adefc6ef8af0213"
                  }
              ],
              //team2 bowlers
              "bowlersStats": [
                  {
                      "player": {
                          "_id": "679fbd3b596dcecceb8f2622",
                          "fullName": "Vivek Jadhav",
                          "country": "India",
                          "role": "All-rounder"
                      },
                      "overs": 10,
                      "maidens": 0,
                      "runsConceded": 35,
                      "wickets": 3,
                      "economy": 3.5,
                      "_id": "67a225f92adefc6ef8af0214"
                  }
              ],
              "_id": "67a225f92adefc6ef8af0211",

              // display this also if present
              "fallOfWickets": []
          }
      ],
      // this is for give any particular message
      "result": "",

      // this will assign after completion match like this
      "manOfTheMatch": {
          "_id": "679fbd3b596dcecceb8f2622",
          "fullName": "Vivek Jadhav",
          "country": "India",
          "role": "All-rounder"
      },

      // this is to give short summary abou match 
      "summary": "Great match with an amazing performance by Player 1",
      
  },
  
}

