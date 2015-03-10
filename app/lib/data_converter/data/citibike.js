module.exports = [
  {
    model: "DataTag",
    data: {
      name: "Transportation"
    }
  },
  {
    model: "DataTag",
    data: {
      name: "Bicycles"
    }
  },
  {
    model: "DataTag",
    data: {
      name: "Municipal services"
    }
  },
  {
    model: "Vendor",
    data: {
      name: "NYC Bike Share"
    }
  },
  {
    model: "DataSet",
    data: {
      title: "Citi Bike trip data, 2013-07",
      description: "Citi Bike trip data for 2013-07. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2013-07_Citi_Bike_trip_data.csv",
      rows: 843416,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2013-07",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n634,2013-07-01 00:00:00,2013-07-01 00:10:34,164,E 47 St & 2 Ave,40.75323098,-73.97032517,504,1 Ave & E 15 St,40.73221853,-73.98165557,16950,Customer,null,0\n1547,2013-07-01 00:00:02,2013-07-01 00:25:49,388,W 26 St & 10 Ave,40.749717753,-74.002950346,459,W 20 St & 11 Ave,40.746745,-74.007756,19816,Customer,null,0\n178,2013-07-01 00:01:04,2013-07-01 00:04:02,293,Lafayette St & E 8 St,40.73028666,-73.9907647,237,E 11 St & 2 Ave,40.73047309,-73.98672378,14548,Subscriber,1980,2\n1580,2013-07-01 00:01:06,2013-07-01 00:27:26,531,Forsyth St & Broome St,40.71893904,-73.99266288,499,Broadway & W 60 St,40.76915505,-73.98191841,16063,Customer,null,0\n757,2013-07-01 00:01:10,2013-07-01 00:13:47,382,University Pl & E 14 St,40.73492695,-73.99200509,410,Suffolk St & Stanton St,40.72066442,-73.98517977,19213,Subscriber,1986,1\n861,2013-07-01 00:01:23,2013-07-01 00:15:44,511,E 14 St & Avenue B,40.72938685,-73.97772429,454,E 51 St & 1 Ave,40.75455731,-73.96592976,16223,Subscriber,1988,1\n550,2013-07-01 00:01:59,2013-07-01 00:11:09,293,Lafayette St & E 8 St,40.73028666,-73.9907647,394,E 9 St & Avenue C,40.72521311,-73.97768752,16746,Customer,null,0\n288,2013-07-01 00:02:16,2013-07-01 00:07:04,224,Spruce St & Nassau St,40.71146364,-74.00552427,376,John St & William St,40.70862144,-74.00722156,16062,Subscriber,1985,2\n766,2013-07-01 00:02:16,2013-07-01 00:15:02,432,E 7 St & Avenue A,40.72621788,-73.98379855,336,Sullivan St & Washington Sq,40.73047747,-73.99906065,17963,Subscriber,1980,2\n773,2013-07-01 00:02:23,2013-07-01 00:15:16,173,Broadway & W 49 St,40.76064679,-73.98442659,479,9 Ave & W 45 St,40.76019252,-73.9912551,19365,Subscriber,1989,1',
        description: "Citi Bike trip data for 2013-07. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2013-07_Citi_Bike_trip_data.csv",
        rows: 843416,
        format: "CSV",
        updateFrequency: "Monthly",
        vendor: "NYC Bike Share",
        tags: [
          'Transportation',
          'Bicycles',
          'Municipal services'
        ]
      }
    },
    associations: [
      {
        joinTable: "data_sets_categories",
        lookup: {
          Category: {
            name: "Municipal"
          }
        }
      },
      {
        joinTable: "data_sets_data_tags",
        lookup: {
          DataTag: [
            {
              name: "Transportation"
            },
            {
              name: "Bicycles"
            },
            {
              name: "Municipal services"
            }
          ]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          Vendor: [
            {
              name: "NYC Bike Share"
            }
          ]
        }
      }
    ]
  },
  {
    model: "DataSet",
    data: {
      title: "Citi Bike trip data, 2013-08",
      description: "Citi Bike trip data for 2013-08. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2013-08_Citi_Bike_trip_data.csv",
      rows: 1001958,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2013-08",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n664,2013-08-01 00:00:00,2013-08-01 00:11:04,449,W 52 St & 9 Ave,40.76461837,-73.98789473,479,9 Ave & W 45 St,40.76019252,-73.9912551,20068,Subscriber,1944,1\n2115,2013-08-01 00:00:01,2013-08-01 00:35:16,254,W 11 St & 6 Ave,40.73532427,-73.99800419,195,Liberty St & Broadway,40.70905623,-74.01043382,17095,Subscriber,1974,1\n385,2013-08-01 00:00:03,2013-08-01 00:06:28,460,S 4 St & Wythe Ave,40.71285887,-73.96590294,2002,Wythe Ave & Metropolitan Ave,40.716887,-73.963198,18197,Customer,null,0\n653,2013-08-01 00:00:10,2013-08-01 00:11:03,398,Atlantic Ave & Furman St,40.69165183,-73.9999786,398,Atlantic Ave & Furman St,40.69165183,-73.9999786,17080,Customer,null,0\n954,2013-08-01 00:00:11,2013-08-01 00:16:05,319,Park Pl & Church St,40.71336124,-74.00937622,336,Sullivan St & Washington Sq,40.73047747,-73.99906065,17967,Customer,null,0\n145,2013-08-01 00:00:37,2013-08-01 00:03:02,521,8 Ave & W 31 St,40.75044999,-73.99481051,512,W 29 St & 9 Ave,40.7500727,-73.99839279,16299,Subscriber,1974,1\n331,2013-08-01 00:01:25,2013-08-01 00:06:56,2000,Front St & Washington St,40.70255088,-73.98940236,391,Clark St & Henry St,40.69760127,-73.99344559,20593,Subscriber,1982,1\n194,2013-08-01 00:01:26,2013-08-01 00:04:40,313,Washington Ave & Park Ave,40.69610226,-73.96751037,244,Willoughby Ave & Hall St,40.69196035,-73.96536851,19019,Subscriber,1986,1\n598,2013-08-01 00:01:40,2013-08-01 00:11:38,528,2 Ave & E 31 St,40.74290902,-73.97706058,498,Broadway & W 32 St,40.74854862,-73.98808416,17197,Subscriber,1985,1\n360,2013-08-01 00:01:45,2013-08-01 00:07:45,500,Broadway & W 51 St,40.76228826,-73.98336183,513,W 56 St & 10 Ave,40.768254,-73.988639,16717,Subscriber,1991,1',
        description: "Citi Bike trip data for 2013-08. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2013-08_Citi_Bike_trip_data.csv",
        rows: 1001958,
        format: "CSV",
        updateFrequency: "Monthly",
        vendor: "NYC Bike Share",
        tags: [
          'Transportation',
          'Bicycles',
          'Municipal services'
        ]
      }
    },
    associations: [
      {
        joinTable: "data_sets_categories",
        lookup: {
          Category: {
            name: "Municipal"
          }
        }
      },
      {
        joinTable: "data_sets_data_tags",
        lookup: {
          DataTag: [
            {
              name: "Transportation"
            },
            {
              name: "Bicycles"
            },
            {
              name: "Municipal services"
            }
          ]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          Vendor: [
            {
              name: "NYC Bike Share"
            }
          ]
        }
      }
    ]
  }
];
