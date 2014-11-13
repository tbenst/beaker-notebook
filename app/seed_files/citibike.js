module.exports = [
  {
    model: "Category",
    data: {
      name: "Municipal",
      path: "0.1.3.2.2"
    }
  },
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
  },
  {
    model: "DataSet",
    data: {
      title: "Citi Bike trip data, 2013-09",
      description: "Citi Bike trip data for 2013-09. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2013-09_Citi_Bike_trip_data.csv",
      rows: 1034359,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2013-09",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n1010,2013-09-01 00:00:02,2013-09-01 00:16:52,254,W 11 St & 6 Ave,40.73532427,-73.99800419,147,Greenwich St & Warren St,40.71542197,-74.01121978,15014,Subscriber,1974,1\n1443,2013-09-01 00:00:09,2013-09-01 00:24:12,151,Cleveland Pl & Spring St,40.7218158,-73.99720307,497,E 17 St & Broadway,40.73704984,-73.99009296,19393,Customer,null,0\n1387,2013-09-01 00:00:16,2013-09-01 00:23:23,352,W 56 St & 6 Ave,40.76340613,-73.97722479,405,Washington St & Gansevoort St,40.739323,-74.008119,16160,Subscriber,1992,1\n405,2013-09-01 00:00:18,2013-09-01 00:07:03,490,8 Ave & W 33 St,40.751551,-73.993934,459,W 20 St & 11 Ave,40.746745,-74.007756,14997,Subscriber,1973,1\n270,2013-09-01 00:00:20,2013-09-01 00:04:50,236,St Marks Pl & 2 Ave,40.7284186,-73.98713956,393,E 5 St & Avenue C,40.72299208,-73.97995466,19609,Subscriber,1984,1\n400,2013-09-01 00:00:35,2013-09-01 00:07:15,490,8 Ave & W 33 St,40.751551,-73.993934,453,W 22 St & 8 Ave,40.74475148,-73.99915362,17523,Subscriber,1978,1\n115,2013-09-01 00:00:47,2013-09-01 00:02:42,351,Front St & Maiden Ln,40.70530954,-74.00612572,351,Front St & Maiden Ln,40.70530954,-74.00612572,19533,Customer,null,0\n1080,2013-09-01 00:00:48,2013-09-01 00:18:48,2000,Front St & Washington St,40.70255088,-73.98940236,418,Front St & Gold St,40.70224,-73.982578,18487,Subscriber,1972,2\n2550,2013-09-01 00:00:49,2013-09-01 00:43:19,533,Broadway & W 39 St,40.75299641,-73.98721619,2021,W 45 St & 8 Ave,40.75929124,-73.98859651,19342,Subscriber,1949,1\n1108,2013-09-01 00:00:49,2013-09-01 00:19:17,301,E 2 St & Avenue B,40.72217444,-73.98368779,306,Cliff St & Fulton St,40.70823502,-74.00530063,15177,Subscriber,1978,1',
        description: "Citi Bike trip data for 2013-09. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2013-09_Citi_Bike_trip_data.csv",
        rows: 1034359,
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
      title: "Citi Bike trip data, 2013-10",
      description: "Citi Bike trip data for 2013-10. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2013-10_Citi_Bike_trip_data.csv",
      rows: 1037712,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2013-10",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n326,2013-10-01 00:01:08,2013-10-01 00:06:34,239,Willoughby St & Fleet St,40.69196566,-73.9813018,366,Clinton Ave & Myrtle Ave,40.693261,-73.968896,16052,Subscriber,1982,1\n729,2013-10-01 00:01:21,2013-10-01 00:13:30,322,Clinton St & Tillary St,40.696192,-73.991218,398,Atlantic Ave & Furman St,40.69165183,-73.9999786,19412,Customer,null,0\n520,2013-10-01 00:01:24,2013-10-01 00:10:04,174,E 25 St & 1 Ave,40.7381765,-73.97738662,403,E 2 St & 2 Ave,40.72502876,-73.99069656,19645,Subscriber,1984,1\n281,2013-10-01 00:01:25,2013-10-01 00:06:06,430,York St & Jay St,40.7014851,-73.98656928,323,Lawrence St & Willoughby St,40.69236178,-73.98631746,16992,Subscriber,1985,1\n196,2013-10-01 00:01:27,2013-10-01 00:04:43,403,E 2 St & 2 Ave,40.72502876,-73.99069656,401,Allen St & Rivington St,40.72019576,-73.98997825,15690,Subscriber,1986,1\n1948,2013-10-01 00:01:48,2013-10-01 00:34:16,369,Washington Pl & 6 Ave,40.73224119,-74.00026394,307,Canal St & Rutgers St,40.71427487,-73.98990025,19846,Subscriber,1977,1\n1327,2013-10-01 00:01:48,2013-10-01 00:23:55,254,W 11 St & 6 Ave,40.73532427,-73.99800419,539,Metropolitan Ave & Bedford Ave,40.71534825,-73.96024116,14563,Subscriber,1986,2\n1146,2013-10-01 00:01:57,2013-10-01 00:21:03,490,8 Ave & W 33 St,40.751551,-73.993934,438,St Marks Pl & 1 Ave,40.72779126,-73.98564945,16793,Subscriber,1959,1\n380,2013-10-01 00:01:58,2013-10-01 00:08:18,468,Broadway & W 55 St,40.7652654,-73.98192338,385,E 55 St & 2 Ave,40.75797322,-73.96603308,16600,Customer,null,0\n682,2013-10-01 00:02:05,2013-10-01 00:13:27,300,Shevchenko Pl & E 6 St,40.728145,-73.990214,519,Pershing Square N,40.75188406,-73.97770164,15204,Subscriber,1992,1',
        description: "Citi Bike trip data for 2013-10. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2013-10_Citi_Bike_trip_data.csv",
        rows: 1037712,
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
      title: "Citi Bike trip data, 2013-11",
      description: "Citi Bike trip data for 2013-11. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2013-11_Citi_Bike_trip_data.csv",
      rows: 675774,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2013-11",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n504,2013-11-01 00:00:17,2013-11-01 00:08:41,326,E 11 St & 1 Ave,40.72953837,-73.98426726,349,Rivington St & Ridge St,40.71850211,-73.98329859,16393,Subscriber,1983,2\n747,2013-11-01 00:00:20,2013-11-01 00:12:47,375,Mercer St & Bleecker St,40.72679454,-73.99695094,504,1 Ave & E 15 St,40.73221853,-73.98165557,18244,Subscriber,1971,1\n1005,2013-11-01 00:00:30,2013-11-01 00:17:15,264,Maiden Ln & Pearl St,40.70706456,-74.00731853,265,Stanton St & Chrystie St,40.72229346,-73.99147535,14636,Customer,null,0\n622,2013-11-01 00:01:29,2013-11-01 00:11:51,472,E 32 St & Park Ave,40.7457121,-73.98194829,174,E 25 St & 1 Ave,40.7381765,-73.97738662,16685,Subscriber,1980,1\n1454,2013-11-01 00:01:37,2013-11-01 00:25:51,293,Lafayette St & E 8 St,40.73028666,-73.9907647,490,8 Ave & W 33 St,40.751551,-73.993934,18055,Subscriber,1975,2\n1991,2013-11-01 00:01:53,2013-11-01 00:35:04,358,Christopher St & Greenwich St,40.73291553,-74.00711384,237,E 11 St & 2 Ave,40.73047309,-73.98672378,17529,Customer,null,0\n1989,2013-11-01 00:02:00,2013-11-01 00:35:09,358,Christopher St & Greenwich St,40.73291553,-74.00711384,237,E 11 St & 2 Ave,40.73047309,-73.98672378,17238,Customer,null,0\n690,2013-11-01 00:02:03,2013-11-01 00:13:33,509,9 Ave & W 22 St,40.7454973,-74.00197139,546,E 30 St & Park Ave S,40.74444921,-73.98303529,15892,Subscriber,1972,1\n499,2013-11-01 00:02:19,2013-11-01 00:10:38,128,MacDougal St & Prince St,40.72710258,-74.00297088,531,Forsyth St & Broome St,40.71893904,-73.99266288,17260,Subscriber,1988,1\n657,2013-11-01 00:02:22,2013-11-01 00:13:19,509,9 Ave & W 22 St,40.7454973,-74.00197139,546,E 30 St & Park Ave S,40.74444921,-73.98303529,19053,Subscriber,1986,1',
        description: "Citi Bike trip data for 2013-11. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2013-11_Citi_Bike_trip_data.csv",
        rows: 675775,
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
      title: "Citi Bike trip data, 2013-12",
      description: "Citi Bike trip data for 2013-12. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2013-12_Citi_Bike_trip_data.csv",
      rows: 443966,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2013-12",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n1015,2013-12-01 00:00:03,2013-12-01 00:16:58,401,Allen St & Rivington St,40.72019576,-73.98997825,476,E 31 St & 3 Ave,40.74394314,-73.97966069,14729,Subscriber,1979,2\n962,2013-12-01 00:00:07,2013-12-01 00:16:09,312,Allen St & E Houston St,40.722055,-73.989111,223,W 13 St & 7 Ave,40.73781509,-73.99994661,17871,Subscriber,1970,2\n768,2013-12-01 00:00:15,2013-12-01 00:13:03,326,E 11 St & 1 Ave,40.72953837,-73.98426726,291,Madison St & Montgomery St,40.713126,-73.984844,18508,Subscriber,1982,2\n218,2013-12-01 00:00:49,2013-12-01 00:04:27,2021,W 45 St & 8 Ave,40.75929124,-73.98859651,447,8 Ave & W 52 St,40.76370739,-73.9851615,17745,Subscriber,1976,1\n550,2013-12-01 00:01:28,2013-12-01 00:10:38,439,E 4 St & 2 Ave,40.7262807,-73.98978041,296,Division St & Bowery,40.71413089,-73.9970468,16947,Subscriber,1983,1\n102,2013-12-01 00:01:43,2013-12-01 00:03:25,457,Broadway & W 58 St,40.76695317,-73.98169333,469,Broadway & W 53 St,40.76344058,-73.98268129,18394,Subscriber,1975,1\n710,2013-12-01 00:02:20,2013-12-01 00:14:10,268,Howard St & Centre St,40.71910537,-73.99973337,293,Lafayette St & E 8 St,40.73028666,-73.9907647,17832,Subscriber,1984,1\n698,2013-12-01 00:02:40,2013-12-01 00:14:18,268,Howard St & Centre St,40.71910537,-73.99973337,293,Lafayette St & E 8 St,40.73028666,-73.9907647,17169,Subscriber,1976,2\n1420,2013-12-01 00:03:02,2013-12-01 00:26:42,380,W 4 St & 7 Ave S,40.73401143,-74.00293877,350,Clinton St & Grand St,40.71559509,-73.9870295,14932,Subscriber,1960,1\n992,2013-12-01 00:03:25,2013-12-01 00:19:57,379,W 31 St & 7 Ave,40.749156,-73.9916,236,St Marks Pl & 2 Ave,40.7284186,-73.98713956,16435,Subscriber,1992,1',
        description: "Citi Bike trip data for 2013-12. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2013-12_Citi_Bike_trip_data.csv",
        rows: 443966,
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
      title: "Citi Bike trip data, 2014-01",
      description: "Citi Bike trip data for 2014-01. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2014-01_Citi_Bike_trip_data.csv",
      rows: 300400,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2014-01",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n471,2014-01-01 00:00:06,2014-01-01 00:07:57,2009,Catherine St & Monroe St,40.71117444,-73.99682619,263,Elizabeth St & Hester St,40.71729,-73.996375,16379,Subscriber,1986,1\n1494,2014-01-01 00:00:38,2014-01-01 00:25:32,536,1 Ave & E 30 St,40.74144387,-73.97536082,259,South St & Whitehall St,40.70122128,-74.01234218,15611,Subscriber,1963,1\n464,2014-01-01 00:03:59,2014-01-01 00:11:43,228,E 48 St & 3 Ave,40.7546011026,-73.971878855,2022,E 59 St & Sutton Pl,40.75849116,-73.95920622,16613,Subscriber,1991,1\n373,2014-01-01 00:05:15,2014-01-01 00:11:28,519,Pershing Square N,40.75188406,-73.97770164,526,E 33 St & 5 Ave,40.74765947,-73.98490707,15938,Subscriber,1989,1\n660,2014-01-01 00:05:18,2014-01-01 00:16:18,83,Atlantic Ave & Fort Greene Pl,40.68382604,-73.97632328,436,Hancock St & Bedford Ave,40.68216564,-73.95399026,19830,Subscriber,1990,1\n330,2014-01-01 00:05:55,2014-01-01 00:11:25,422,W 59 St & 10 Ave,40.770513,-73.988038,526,E 33 St & 5 Ave,40.74765947,-73.98490707,17343,Subscriber,1987,1\n261,2014-01-01 00:06:04,2014-01-01 00:10:25,516,E 47 St & 1 Ave,40.75206862,-73.96784384,167,E 39 St & 3 Ave,40.7489006,-73.97604882,17880,Subscriber,1983,1\n337,2014-01-01 00:06:41,2014-01-01 00:12:18,380,W 4 St & 7 Ave S,40.73401143,-74.00293877,435,W 21 St & 6 Ave,40.74173969,-73.99415556,16275,Subscriber,1963,1\n429,2014-01-01 00:07:33,2014-01-01 00:14:42,296,Division St & Bowery,40.71413089,-73.9970468,306,Cliff St & Fulton St,40.70823502,-74.00530063,17318,Subscriber,1972,2\n1025,2014-01-01 00:08:27,2014-01-01 00:25:32,540,Lexington Ave & E 26 St,40.74147286,-73.98320928,447,8 Ave & W 52 St,40.76370739,-73.9851615,15525,Subscriber,1981,1',
        description: "Citi Bike trip data for 2014-01. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2014-01_Citi_Bike_trip_data.csv",
        rows: 300400,
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
      title: "Citi Bike trip data, 2014-02",
      description: "Citi Bike trip data for 2014-02. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2014-02_Citi_Bike_trip_data.csv",
      rows: 224736,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2014-02",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n382,2014-02-01 00:00:00,2014-02-01 00:06:22,294,Washington Square E,40.73049393,-73.9957214,265,Stanton St & Chrystie St,40.72229346,-73.99147535,21101,Subscriber,1991,1\n372,2014-02-01 00:00:03,2014-02-01 00:06:15,285,Broadway & E 14 St,40.73454567,-73.99074142,439,E 4 St & 2 Ave,40.7262807,-73.98978041,15456,Subscriber,1979,2\n591,2014-02-01 00:00:09,2014-02-01 00:10:00,247,Perry St & Bleecker St,40.73535398,-74.00483091,251,Mott St & Prince St,40.72317958,-73.99480012,16281,Subscriber,1948,2\n583,2014-02-01 00:00:32,2014-02-01 00:10:15,357,E 11 St & Broadway,40.73261787,-73.99158043,284,Greenwich Ave & 8 Ave,40.7390169121,-74.0026376103,17400,Subscriber,1981,1\n223,2014-02-01 00:00:41,2014-02-01 00:04:24,401,Allen St & Rivington St,40.72019576,-73.98997825,439,E 4 St & 2 Ave,40.7262807,-73.98978041,19341,Subscriber,1990,1\n541,2014-02-01 00:00:46,2014-02-01 00:09:47,152,Warren St & Church St,40.71473993,-74.00910627,331,Pike St & Monroe St,40.71173107,-73.99193043,18674,Subscriber,1990,1\n354,2014-02-01 00:01:01,2014-02-01 00:06:55,325,E 19 St & 3 Ave,40.73624527,-73.98473765,439,E 4 St & 2 Ave,40.7262807,-73.98978041,16975,Subscriber,1991,1\n916,2014-02-01 00:01:11,2014-02-01 00:16:27,354,Emerson Pl & Myrtle Ave,40.69363137,-73.96223558,395,Bond St & Schermerhorn St,40.68807003,-73.98410637,16020,Subscriber,1978,1\n277,2014-02-01 00:01:33,2014-02-01 00:06:10,375,Mercer St & Bleecker St,40.72679454,-73.99695094,369,Washington Pl & 6 Ave,40.73224119,-74.00026394,18891,Subscriber,1944,1\n439,2014-02-01 00:02:14,2014-02-01 00:09:33,285,Broadway & E 14 St,40.73454567,-73.99074142,247,Perry St & Bleecker St,40.73535398,-74.00483091,20875,Subscriber,1983,2',
        description: "Citi Bike trip data for 2014-02. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2014-02_Citi_Bike_trip_data.csv",
        rows: 224736,
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
      title: "Citi Bike trip data, 2014-03",
      description: "Citi Bike trip data for 2014-03. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2014-03_Citi_Bike_trip_data.csv",
      rows: 439117,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2014-03",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n949,2014-03-01 00:00:16,2014-03-01 00:16:05,317,E 6 St & Avenue B,40.72453734,-73.98185424,284,Greenwich Ave & 8 Ave,40.7390169121,-74.0026376103,17440,Subscriber,1942,1\n533,2014-03-01 00:00:57,2014-03-01 00:09:50,457,Broadway & W 58 St,40.76695317,-73.98169333,441,E 52 St & 2 Ave,40.756014,-73.967416,20855,Subscriber,1960,1\n122,2014-03-01 00:01:06,2014-03-01 00:03:08,146,Hudson St & Reade St,40.71625008,-74.0091059,276,Duane St & Greenwich St,40.71748752,-74.0104554,15822,Subscriber,1984,1\n134,2014-03-01 00:01:14,2014-03-01 00:03:28,146,Hudson St & Reade St,40.71625008,-74.0091059,276,Duane St & Greenwich St,40.71748752,-74.0104554,17793,Subscriber,1985,1\n997,2014-03-01 00:01:18,2014-03-01 00:17:55,150,E 2 St & Avenue C,40.7208736,-73.98085795,461,E 20 St & 2 Ave,40.73587678,-73.98205027,20756,Subscriber,1977,1\n720,2014-03-01 00:01:27,2014-03-01 00:13:27,382,University Pl & E 14 St,40.73492695,-73.99200509,79,Franklin St & W Broadway,40.71911552,-74.00666661,19377,Subscriber,1983,1\n231,2014-03-01 00:02:08,2014-03-01 00:05:59,384,Fulton St & Waverly Ave,40.68317813,-73.9659641,399,Lafayette Ave & St James Pl,40.68851534,-73.9647628,20117,Subscriber,1982,1\n387,2014-03-01 00:02:24,2014-03-01 00:08:51,521,8 Ave & W 31 St,40.75044999,-73.99481051,529,W 42 St & 8 Ave,40.7575699,-73.99098507,18856,Subscriber,1975,2\n115,2014-03-01 00:02:28,2014-03-01 00:04:23,438,St Marks Pl & 1 Ave,40.72779126,-73.98564945,438,St Marks Pl & 1 Ave,40.72779126,-73.98564945,20922,Subscriber,1994,2\n656,2014-03-01 00:02:49,2014-03-01 00:13:45,284,Greenwich Ave & 8 Ave,40.7390169121,-74.0026376103,504,1 Ave & E 15 St,40.73221853,-73.98165557,14889,Subscriber,1987,1',
        description: "Citi Bike trip data for 2014-03. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2014-03_Citi_Bike_trip_data.csv",
        rows: 439117,
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
      title: "Citi Bike trip data, 2014-04",
      description: "Citi Bike trip data for 2014-04. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2014-04_Citi_Bike_trip_data.csv",
      rows: 670780,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2014-04",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n558,2014-04-01 00:00:07,2014-04-01 00:09:25,82,St James Pl & Pearl St,40.71117416,-74.00016545,2008,Little West St & 1 Pl,40.70569254,-74.01677685,21062,Subscriber,1982,1\n882,2014-04-01 00:00:20,2014-04-01 00:15:02,349,Rivington St & Ridge St,40.71850211,-73.98329859,312,Allen St & E Houston St,40.722055,-73.989111,20229,Subscriber,1988,1\n587,2014-04-01 00:00:25,2014-04-01 00:10:12,293,Lafayette St & E 8 St,40.73028666,-73.9907647,334,W 20 St & 7 Ave,40.74238787,-73.99726235,20922,Subscriber,1959,1\n355,2014-04-01 00:00:44,2014-04-01 00:06:39,539,Metropolitan Ave & Bedford Ave,40.71534825,-73.96024116,282,Kent Ave & S 11 St,40.70827295,-73.96834101,20914,Subscriber,1981,1\n524,2014-04-01 00:01:29,2014-04-01 00:10:13,459,W 20 St & 11 Ave,40.746745,-74.007756,503,E 20 St & Park Ave,40.73827428,-73.98751968,21051,Subscriber,1964,1\n301,2014-04-01 00:01:53,2014-04-01 00:06:54,281,Grand Army Plaza & Central Park S,40.7643971,-73.97371465,500,Broadway & W 51 St,40.76228826,-73.98336183,17286,Subscriber,1970,1\n136,2014-04-01 00:02:34,2014-04-01 00:04:50,386,Centre St & Worth St,40.71494807,-74.00234482,387,Centre St & Chambers St,40.71273266,-74.0046073,21429,Subscriber,1983,2\n151,2014-04-01 00:02:40,2014-04-01 00:05:11,223,W 13 St & 7 Ave,40.73781509,-73.99994661,405,Washington St & Gansevoort St,40.739323,-74.008119,15572,Subscriber,1992,1\n434,2014-04-01 00:02:58,2014-04-01 00:10:12,324,DeKalb Ave & Hudson Ave,40.689888,-73.981013,366,Clinton Ave & Myrtle Ave,40.693261,-73.968896,17582,Subscriber,1992,2\n164,2014-04-01 00:02:59,2014-04-01 00:05:43,539,Metropolitan Ave & Bedford Ave,40.71534825,-73.96024116,460,S 4 St & Wythe Ave,40.71285887,-73.96590294,16010,Subscriber,1983,1',
        description: "Citi Bike trip data for 2014-04. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2014-04_Citi_Bike_trip_data.csv",
        rows: 670780,
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
      title: "Citi Bike trip data, 2014-05",
      description: "Citi Bike trip data for 2014-05. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2014-05_Citi_Bike_trip_data.csv",
      rows: 866117,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2014-05",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n158,2014-05-01 00:08:32,2014-05-01 00:11:10,438,St Marks Pl & 1 Ave,40.72779126,-73.98564945,428,E 3 St & 1 Ave,40.72467721,-73.98783413,20997,Subscriber,1961,1\n427,2014-05-01 00:10:16,2014-05-01 00:17:23,537,Lexington Ave & E 24 St,40.74025878,-73.98409214,482,W 15 St & 7 Ave,40.73935542,-73.99931783,16655,Subscriber,1963,1\n357,2014-05-01 00:12:28,2014-05-01 00:18:25,491,E 24 St & Park Ave S,40.74096374,-73.98602213,442,W 27 St & 7 Ave,40.746647,-73.993915,14643,Subscriber,1981,1\n168,2014-05-01 00:13:41,2014-05-01 00:16:29,224,Spruce St & Nassau St,40.71146364,-74.00552427,360,William St & Pine St,40.70717936,-74.00887308,15085,Subscriber,1994,1\n638,2014-05-01 00:15:45,2014-05-01 00:26:23,454,E 51 St & 1 Ave,40.75455731,-73.96592976,450,W 49 St & 8 Ave,40.76227205,-73.98788205,21678,Subscriber,1986,1\n938,2014-05-01 00:17:48,2014-05-01 00:33:26,358,Christopher St & Greenwich St,40.73291553,-74.00711384,502,Henry St & Grand St,40.714215,-73.981346,16848,Subscriber,1975,1\n444,2014-05-01 00:22:38,2014-05-01 00:30:02,229,Great Jones St,40.72743423,-73.99379025,394,E 9 St & Avenue C,40.72521311,-73.97768752,17167,Subscriber,1988,1\n330,2014-05-01 00:25:20,2014-05-01 00:30:50,306,Cliff St & Fulton St,40.70823502,-74.00530063,534,Water - Whitehall Plaza,40.70255065,-74.0127234,15197,Subscriber,1955,1\n409,2014-05-01 00:27:09,2014-05-01 00:33:58,268,Howard St & Centre St,40.71910537,-73.99973337,291,Madison St & Montgomery St,40.713126,-73.984844,15682,Subscriber,1992,1\n322,2014-05-01 00:29:08,2014-05-01 00:34:30,352,W 56 St & 6 Ave,40.76340613,-73.97722479,513,W 56 St & 10 Ave,40.768254,-73.988639,17255,Subscriber,1980,1',
        description: "Citi Bike trip data for 2014-05. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2014-05_Citi_Bike_trip_data.csv",
        rows: 866117,
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
      title: "Citi Bike trip data, 2014-06",
      description: "Citi Bike trip data for 2014-06. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2014-06_Citi_Bike_trip_data.csv",
      rows: 936880,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2014-06",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n520,2014-06-01 00:00:02,2014-06-01 00:08:42,358,Christopher St & Greenwich St,40.73291553,-74.00711384,426,West St & Chambers St,40.71754834,-74.01322069,18840,Subscriber,1979,1\n520,2014-06-01 00:00:27,2014-06-01 00:09:07,335,Washington Pl & Broadway,40.72903917,-73.99404649,265,Stanton St & Chrystie St,40.72229346,-73.99147535,17442,Customer,null,0\n414,2014-06-01 00:00:32,2014-06-01 00:07:26,439,E 4 St & 2 Ave,40.7262807,-73.98978041,368,Carmine St & 6 Ave,40.73038599,-74.00214988,16447,Subscriber,1980,1\n310,2014-06-01 00:00:34,2014-06-01 00:05:44,463,9 Ave & W 16 St,40.74206539,-74.00443172,380,W 4 St & 7 Ave S,40.73401143,-74.00293877,18218,Subscriber,1984,1\n457,2014-06-01 00:00:35,2014-06-01 00:08:12,352,W 56 St & 6 Ave,40.76340613,-73.97722479,305,E 58 St & 3 Ave,40.76095756,-73.96724467,18115,Subscriber,1969,1\n399,2014-06-01 00:00:43,2014-06-01 00:07:22,293,Lafayette St & E 8 St,40.73028666,-73.9907647,247,Perry St & Bleecker St,40.73535398,-74.00483091,18527,Subscriber,1970,1\n1280,2014-06-01 00:00:45,2014-06-01 00:22:05,168,W 18 St & 6 Ave,40.73971301,-73.99456405,341,Stanton St & Mangin St,40.71782143,-73.97628939,18766,Subscriber,1989,1\n973,2014-06-01 00:00:52,2014-06-01 00:17:05,453,W 22 St & 8 Ave,40.74475148,-73.99915362,447,8 Ave & W 52 St,40.76370739,-73.9851615,21391,Customer,null,0\n500,2014-06-01 00:00:58,2014-06-01 00:09:18,498,Broadway & W 32 St,40.74854862,-73.98808416,488,W 39 St & 9 Ave,40.75645824,-73.99372222,18592,Subscriber,1980,1\n253,2014-06-01 00:00:58,2014-06-01 00:05:11,312,Allen St & E Houston St,40.722055,-73.989111,473,Rivington St & Chrystie St,40.72110063,-73.9919254,19377,Subscriber,1983,1',
        description: "Citi Bike trip data for 2014-06. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2014-06_Citi_Bike_trip_data.csv",
        rows: 936880,
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
      title: "Citi Bike trip data, 2014-07",
      description: "Citi Bike trip data for 2014-07. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2014-07_Citi_Bike_trip_data.csv",
      rows: 968842,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2014-07",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n404,2014-07-01 00:00:04,2014-07-01 00:06:48,545,E 23 St & 1 Ave,40.736502,-73.97809472,402,Broadway & E 22 St,40.7403432,-73.98955109,19578,Subscriber,1987,2\n850,2014-07-01 00:00:06,2014-07-01 00:14:16,238,Bank St & Washington St,40.7361967,-74.00859207,458,11 Ave & W 27 St,40.751396,-74.005226,19224,Subscriber,1987,1\n1550,2014-07-01 00:00:21,2014-07-01 00:26:11,223,W 13 St & 7 Ave,40.73781509,-73.99994661,539,Metropolitan Ave & Bedford Ave,40.71534825,-73.96024116,17627,Subscriber,1973,2\n397,2014-07-01 00:00:29,2014-07-01 00:07:06,224,Spruce St & Nassau St,40.71146364,-74.00552427,2008,Little West St & 1 Pl,40.70569254,-74.01677685,15304,Subscriber,1982,1\n609,2014-07-01 00:00:37,2014-07-01 00:10:46,346,Bank St & Hudson St,40.73652889,-74.00618026,521,8 Ave & W 31 St,40.75044999,-73.99481051,20062,Subscriber,1972,2\n2245,2014-07-01 00:01:09,2014-07-01 00:38:34,416,Cumberland St & Lafayette Ave,40.68753406,-73.97265183,473,Rivington St & Chrystie St,40.72110063,-73.9919254,20653,Subscriber,1976,1\n1323,2014-07-01 00:01:15,2014-07-01 00:23:18,501,FDR Drive & E 35 St,40.744219,-73.97121214,501,FDR Drive & E 35 St,40.744219,-73.97121214,21460,Subscriber,1993,1\n320,2014-07-01 00:01:16,2014-07-01 00:06:36,475,E 16 St & Irving Pl,40.73524276,-73.98758561,116,W 17 St & 8 Ave,40.74177603,-74.00149746,16746,Subscriber,1985,1\n2430,2014-07-01 00:01:18,2014-07-01 00:41:48,469,Broadway & W 53 St,40.76344058,-73.98268129,445,E 10 St & Avenue A,40.72740794,-73.98142006,19441,Subscriber,1983,1\n700,2014-07-01 00:01:21,2014-07-01 00:13:01,320,Leonard St & Church St,40.717571,-74.005549,393,E 5 St & Avenue C,40.72299208,-73.97995466,17267,Subscriber,1983,1',
        description: "Citi Bike trip data for 2014-07. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2014-07_Citi_Bike_trip_data.csv",
        rows: 968842,
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
      title: "Citi Bike trip data, 2014-08",
      description: "Citi Bike trip data for 2014-08. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
      remoteFile: "2014-08_Citi_Bike_trip_data.csv",
      rows: 963489,
      format: "CSV",
      updateFrequency: "Monthly",
      metadata: {
        title: "Citi Bike trip data, 2014-08",
        csvPreview: 'tripduration,starttime,stoptime,start station id,start station name,start station latitude,start station longitude,end station id,end station name,end station latitude,end station longitude,bikeid,usertype,birth year,gender\n1142,2014-08-01 00:00:04,2014-08-01 00:19:06,470,W 20 St & 8 Ave,40.74345335,-74.00004031,312,Allen St & E Houston St,40.722055,-73.989111,19117,Subscriber,1969,1\n117,2014-08-01 00:00:05,2014-08-01 00:02:02,236,St Marks Pl & 2 Ave,40.7284186,-73.98713956,432,E 7 St & Avenue A,40.72621788,-73.98379855,20549,Subscriber,1991,1\n546,2014-08-01 00:00:07,2014-08-01 00:09:13,224,Spruce St & Nassau St,40.71146364,-74.00552427,340,Madison St & Clinton St,40.71269042,-73.98776323,15997,Subscriber,1984,1\n2126,2014-08-01 00:00:11,2014-08-01 00:35:37,150,E 2 St & Avenue C,40.7208736,-73.98085795,522,E 51 St & Lexington Ave,40.75714758,-73.97207836,21437,Subscriber,1988,1\n329,2014-08-01 00:00:15,2014-08-01 00:05:44,519,E 42 St & Vanderbilt Ave,40.752416,-73.97837,477,W 41 St & 8 Ave,40.75640548,-73.9900262,16693,Subscriber,1981,1\n308,2014-08-01 00:00:17,2014-08-01 00:05:25,477,W 41 St & 8 Ave,40.75640548,-73.9900262,478,11 Ave & W 41 St,40.76030096,-73.99884222,19797,Subscriber,1958,1\n648,2014-08-01 00:00:35,2014-08-01 00:11:23,2012,E 27 St & 1 Ave,40.739445,-73.976806,2012,E 27 St & 1 Ave,40.739445,-73.976806,21209,Customer,null,0\n438,2014-08-01 00:00:43,2014-08-01 00:08:01,228,E 48 St & 3 Ave,40.7546011026,-73.971878855,153,E 40 St & 5 Ave,40.752062307,-73.9816324043,21501,Subscriber,1980,1\n515,2014-08-01 00:00:44,2014-08-01 00:09:19,127,Barrow St & Hudson St,40.73172428,-74.00674436,483,E 12 St & 3 Ave,40.73223272,-73.98889957,18836,Subscriber,1986,1\n673,2014-08-01 00:00:46,2014-08-01 00:11:59,514,12 Ave & W 40 St,40.76087502,-74.00277668,530,11 Ave & W 59 St,40.771522,-73.990541,20333,Subscriber,1985,1',
        description: "Citi Bike trip data for 2014-08. Includes where Citi Bikers ride, when they ride, how far they go, which stations are most popular, and what days of the week are most rides taken on.",
        remoteFile: "2014-08_Citi_Bike_trip_data.csv",
        rows: 963489,
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
      title: "Citi Bike Daily Ridership and Membership Data Launch - Sept 2013",
      description: "Citi Bike Daily Ridership and Membership Data. Info includes the number of trips over the last 24 hours, cumulative trips, miles traveled , total memberships sold and more.",
      remoteFile: "Citi_Bike_Ridership_and_Membership_Data_Launch-Sept2013.csv",
      rows: 127,
      format: "CSV",
      updateFrequency: "Quarterly",
      metadata: {
        title: "Citi Bike Daily Ridership and Membership Data Launch - Sept 2013",
        csvPreview: 'Date,Trips over the past 24-hours (midnight to 11:59pm),Cumulative trips (since launch):,Miles traveled today (midnight to 11:59 pm),Miles traveled to date:,Total Annual Members,Annual Member Sign-Ups (midnight to 11:59 pm),24-Hour Passes Purchased (midnight to 11:59 pm),7-Day Passes Purchased (midnight to 11:59 pm)\n5/27/2013,9767,9767,21.533,21533,17216,2043,0,0\n5/28/2013,5215,14982,8.78,30313,19816,2598,0,0\n5/29/2013,10981,25963,21.898,52211,21986,2167,0,0\n5/30/2013,9850,35813,20.321,72532,23985,1998,0,0\n5/31/2013,9253,45066,20.243,92775,25615,1630,0,0\n6/1/2013,9852,54918,26.347,119122,26756,1141,0,0\n6/2/2013,17590,72508,52.143,171266,28253,1496,4723,289\n6/3/2013,8599,81107,18.907,190173,29616,1363,1160,221\n6/4/2013,17589,98696,48.666,238839,31095,1479,2922,394\n6/5/2013,17433,116129,44.917,283757,32620,1530,2821,279',
        description: "Citi Bike Daily Ridership and Membership Data. Info includes the number of trips over the last 24 hours, cumulative trips, miles traveled , total memberships sold and more.",
        remoteFile: "Citi_Bike_Ridership_and_Membership_Data_Launch-Sept2013.csv",
        rows: 127,
        format: "CSV",
        updateFrequency: "Quarterly",
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
      title: "Citi Bike Daily Ridership and Membership Data Oct - Dec 2013",
      description: "Citi Bike Daily Ridership and Membership Data. Info includes the number of trips over the last 24 hours, cumulative trips, miles traveled , total memberships sold and more.",
      remoteFile: "Citi_Bike_Ridership_and_Membership_Data_Oct-Dec2013.csv",
      rows: 92,
      format: "CSV",
      updateFrequency: "Quarterly",
      metadata: {
        title: "Citi Bike Daily Ridership and Membership Data Oct - Dec 2013",
        csvPreview: 'Date,Trips over the past 24-hours (midnight to 11:59pm),Cumulative trips (since launch):,Miles traveled today (midnight to 11:59 pm),Miles traveled to date:,Total Annual Members,Annual Member Sign-Ups (midnight to 11:59 pm),24-Hour Passes Purchased (midnight to 11:59 pm)  7-Day Passes Purchased (midnight to 11:59 pm)\n10/1/2013,44772,4013952,73.665,7713294,85494,258,1004\n10/2/2013,45667,4059619,76.149,7789442,85773,279,1129\n10/3/2013,44472,4104091,72.635,7862077,86333,560,1076\n10/4/2013,44089,4148180,74.223,7936300,87112,779,1434\n10/5/2013,37683,4185863,73.892,8010192,87862,750,2971\n10/6/2013,29029,4214892,49.887,8060079,88604,742,1368\n10/7/2013,27504,4242396,40.324,8100403,89189,585,421\n10/8/2013,42200,4284596,69.116,8169518,89521,332,896\n10/9/2013,40607,4325203,62.214,8231732,89769,248,714\n10/10/2013,34107,4359310,49.732,8281464,89951,182,482',
        description: "Citi Bike Daily Ridership and Membership Data. Info includes the number of trips over the last 24 hours, cumulative trips, miles traveled , total memberships sold and more.",
        remoteFile: "Citi_Bike_Ridership_and_Membership_Data_Oct-Dec2013.csv",
        rows: 92,
        format: "CSV",
        updateFrequency: "Quarterly",
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
      title: "Citi Bike Daily Ridership and Membership Data Jan - Mar 2014",
      description: "Citi Bike Daily Ridership and Membership Data. Info includes the number of trips over the last 24 hours, cumulative trips, miles traveled , total memberships sold and more.",
      remoteFile: "Citi_Bike_Ridership_and_Membership_Data_Jan-Mar2014.csv",
      rows: 90,
      format: "CSV",
      updateFrequency: "Quarterly",
      metadata: {
        title: "Citi Bike Daily Ridership and Membership Data Jan - Mar 2014",
        csvPreview: 'Date,Trips over the past 24-hours (midnight to 11:59pm),Cumulative trips (since launch):,Miles traveled today (midnight to 11:59 pm),Miles traveled to date:,Total Annual Members,Annual Member Sign-Ups (midnight to 11:59 pm),24-Hour Passes Purchased (midnight to 11:59 pm),7-Day Passes Purchased (midnight to 11:59 pm)\n1/1/2014,6559,6323722,9.254,11243581,95971,29,268,10\n1/2/2014,9334,6333056,11.736,11255317,96000,42,66,3\n1/3/2014,1288,6334344,1.855,11257172,96042,23,1,1\n1/4/2014,2494,6336838,3.706,11260878,96065,19,14,1\n1/5/2014,2937,6339775,3.72,11264598,96084,18,17,4\n1/6/2014,10481,6350256,13.016,11277613,96102,22,30,7\n1/7/2014,7144,6357400,8.2,11285814,96124,28,5,4\n1/8/2014,10162,6367562,11.768,11297582,96152,19,28,4\n1/9/2014,14571,6382133,18.401,11315983,96171,18,74,10\n1/10/2014,10685,6392818,13.433,11329416,96189,36,49,5',
        description: "Citi Bike Daily Ridership and Membership Data. Info includes the number of trips over the last 24 hours, cumulative trips, miles traveled , total memberships sold and more.",
        remoteFile: "Citi_Bike_Ridership_and_Membership_Data_Jan-Mar2014.csv",
        rows: 90,
        format: "CSV",
        updateFrequency: "Quarterly",
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
      title: "Citi Bike Daily Ridership and Membership Data Apr - June 2014",
      description: "Citi Bike Daily Ridership and Membership Data. Info includes the number of trips over the last 24 hours, cumulative trips, miles traveled , total memberships sold and more.",
      remoteFile: "Citi_Bike_Ridership_and_Membership_Data_Apr-June2014.csv",
      rows: 91,
      format: "CSV",
      updateFrequency: "Quarterly",
      metadata: {
        title: "Citi Bike Daily Ridership and Membership Data Apr - June 2014",
        csvPreview: 'Date,Trips over the past 24-hours (midnight to 11:59pm),Cumulative trips (since launch):,Miles traveled today (midnight to 11:59 pm),Miles traveled to date:,Total Annual Memberships Sold,Annual Member Sign-Ups (midnight to 11:59 pm),24-Hour Passes Purchased (midnight to 11:59 pm),7-Day Passes Purchased (midnight to 11:59 pm)\n4/1/2014,26163,7395956,40.978,12758196,100337,174,475,67\n4/2/2014,24299,7420255,35.54,12793736,100511,118,237,33\n4/3/2014,28379,7448634,44.649,12838385,100629,171,596,63\n4/4/2014,13593,7462227,17.644,12856030,100800,92,103,10\n4/5/2014,20333,7482560,36.797,12892827,100892,127,1221,42\n4/6/2014,22643,7505203,45.575,12938402,101019,165,1641,62\n4/7/2014,15869,7521072,21.9,12960303,101184,131,159,36\n4/8/2014,23636,7544708,34.85,12995153,101315,126,369,44\n4/9/2014,29194,7573902,45.619,13040772,101441,201,447,57\n4/10/2014,29722,7603624,46.023,13086794,101642,172,525,65',
        description: "Citi Bike Daily Ridership and Membership Data. Info includes the number of trips over the last 24 hours, cumulative trips, miles traveled , total memberships sold and more.",
        remoteFile: "Citi_Bike_Ridership_and_Membership_Data_Apr-June2014.csv",
        rows: 91,
        format: "CSV",
        updateFrequency: "Quarterly",
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
]
