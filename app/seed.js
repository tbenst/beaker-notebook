var express = require('express');
var app = express();
var sf = require('sequelize-fixtures');
var models = require('./models');
var _ = require('lodash');
var when = require('when');
var util = require('util');

var data = [
  {
    model: 'Vendor',
    data: {
      name: "Peon Axe Info"
    }
  },
  {
    model: 'Vendor',
    data: {
      name: "Orc Sapper Interests"
    }
  },
  {
    model: 'Vendor',
    data: {
      name: "Need More Oil Ventures"
    }
  },
  {
    model: 'User',
    data: {
      name: "Dummy",
      email: "dummy@example.com"
    }
  },

  {
    model: 'DataSet',
    data: {
      title: "Credit Card Complaints",
      description: "We don’t verify all the facts alleged in these complaints but we do take steps to confirm a commercial relationship between the consumer and company. Complaints are listed here after the company responds or after they have had the complaint for 15 calendar days, whichever comes first. We remove complaints if they don’t meet all of the publication criteria. Data is refreshed nightly.",
      url: "https://data.consumerfinance.gov/api/views/x3w3-u78g/rows.csv?accessType=DOWNLOAD",
      rows: 350,
      format: "XML",
      vendor_id: 1
    },
    associations: {
      category: "Consumer Finance"
    }
  },

  {
    model: 'DataSet',
    data: {
      title: "US electricity statistics",
      description: "Most of the electricity in the United States is produced using steam turbines. Coal is the most common fuel for generating electricity in the United States. In 2011, 42% of the country's nearly 4 trillion kilowatthours of electricity used coal as its source of energy.",
      url: "http://api.eia.gov/bulk/ELEC.zip",
      rows: 1000,
      format: "CSV",
      vendor_id: 2
    },
    associations: {
      category: "U.S. Energy Information Administration"
    }
  },

  {
    model: 'DataSet',
    data: {
      title: "US natural gas statistics",
      description: "Natural gas prices are a function of market supply and demand. Due to limited alternatives for natural gas consumption or production in the short run, changes in supply or demand over a short period often result in large price movements to bring supply and demand back into balance.",
      url: "http://api.eia.gov/bulk/NG.zip",
      rows: 9000,
      format: "TXT",
      vendor_id: 3
    },
    associations: {
      category: "U.S. Energy Information Administration"
    }
  },

  {
    model: 'DataSet',
    data: {
      title: "US Petroleum statistics",
      description: "The United States relied on net imports (imports minus exports) for about 40% of the petroleum (crude oil and petroleum products) that we consumed in 2012. Just over half of these imports came from the Western Hemisphere. Our dependence on foreign petroleum has declined since peaking in 2005.",
      url: "http://api.eia.gov/bulk/PET.zip",
      rows: 55,
      format: "XML",
      vendor_id: 1
    },
    associations: {
      category: "U.S. Energy Information Administration"
    }
  },

  {
    model: 'DataSet',
    data: {
      title: "US national and region energy consumption",
      description: "Electricity consumption totaled nearly 3,856 billion Kilowatthours (kWh) in 2011. U.S. electricity use in 2011 was more than 13 times greater than electricity use in 1950.",
      url: "http://api.eia.gov/bulk/SEDS.zip",
      rows: 2312,
      format: "CSV",
      vendor_id: 1
    },
    associations: {
      category: "U.S. Energy Information Administration"
    }
  },

  {
    model: 'Category',
    data: {
      name: "Organizations",
      path: "1"
    }
  },

  {
    model: 'Category',
    data: {
      name: "U.S. Energy Information Administration",
      path: "1.1"
    }
  },

  {
    model: 'Category',
    data: {
      name: "Consumer Finance",
      path: "1.2"
    }
  },

  {
    model: 'Category',
    data: {
      name: "Currated Collections",
      path: "2"
    }
  },

  {
    model: 'Category',
    data: {
      name: "United States",
      path: "2.1"
    }
  }
];

models.init(app);

sf.loadFixtures(data, app.Models, function(err) {
  setUpDataSetsCategories(data, app.Models)
    .done(function() {
      console.log("DB seeded.");
    });
});

function setUpDataSetsCategories(data, models) {
  var dataSets = _.where(data, {model: 'DataSet'});

  return when.map(dataSets, function(attrs) {
    return models.DataSet.find({where: {title: attrs['data']['title']}})
      .then(function(dataSet) {
        if (!dataSet) {throw new Error('DataSet not found');}
        return models.Category.find({where: {name: attrs['associations']['category']}})
        .then(function(category) {
          return dataSet.setCategories([category]);
        });
      });
  });
}
