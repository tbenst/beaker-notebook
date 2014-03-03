var express = require('express');
var app = express();
var sf = require('sequelize-fixtures');
var models = require('./models');

var data = [
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
      vendor: "Consumer Financial Protection",
      description: "We don’t verify all the facts alleged in these complaints but we do take steps to confirm a commercial relationship between the consumer and company. Complaints are listed here after the company responds or after they have had the complaint for 15 calendar days, whichever comes first. We remove complaints if they don’t meet all of the publication criteria. Data is refreshed nightly.",
      url: "https://data.consumerfinance.gov/api/views/x3w3-u78g/rows.csv?accessType=DOWNLOAD"
    }
  },

  {
    model: 'DataSet',
    data: {
      title: "US electricity statistics",
      vendor: "U.S. Energy Information Administration",
      description: "Most of the electricity in the United States is produced using steam turbines. Coal is the most common fuel for generating electricity in the United States. In 2011, 42% of the country's nearly 4 trillion kilowatthours of electricity used coal as its source of energy.",
      url: "http://api.eia.gov/bulk/ELEC.zip"
    }
  },

  {
    model: 'DataSet',
    data: {
      title: "US natural gas statistics",
      vendor: "U.S. Energy Information Administration",
      description: "Natural gas prices are a function of market supply and demand. Due to limited alternatives for natural gas consumption or production in the short run, changes in supply or demand over a short period often result in large price movements to bring supply and demand back into balance.",
      url: "http://api.eia.gov/bulk/NG.zip"
    }
  },

  {
    model: 'DataSet',
    data: {
      title: "US Petroleum statistics",
      vendor: "U.S. Energy Information Administration",
      description: "The United States relied on net imports (imports minus exports) for about 40% of the petroleum (crude oil and petroleum products) that we consumed in 2012. Just over half of these imports came from the Western Hemisphere. Our dependence on foreign petroleum has declined since peaking in 2005.",
      url: "http://api.eia.gov/bulk/PET.zip"
    }
  },

  {
    model: 'DataSet',
    data: {
      title: "US national and region energy consumption",
      vendor: "U.S. Energy Information Administration",
      description: "Electricity consumption totaled nearly 3,856 billion Kilowatthours (kWh) in 2011. U.S. electricity use in 2011 was more than 13 times greater than electricity use in 1950.",
      url: "http://api.eia.gov/bulk/SEDS.zip"
    }
  }
];

models.init(app);

sf.loadFixtures(data, app.Models, function(err) {
  console.log("Database seeded.");
});
