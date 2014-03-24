module.exports = [
  {
    model: 'DataSet',
    data: {
      title: "Credit Card Complaints",
      description: "We don’t verify all the facts alleged in these complaints but we do take steps to confirm a commercial relationship between the consumer and company. Complaints are listed here after the company responds or after they have had the complaint for 15 calendar days, whichever comes first. We remove complaints if they don’t meet all of the publication criteria. Data is refreshed nightly.",
      url: "https://data.consumerfinance.gov/api/views/x3w3-u78g/rows.csv?accessType=DOWNLOAD",
      rows: 350,
      format: "XML",
      vendorId: 1,
      updateFrequency: "Weekly"
    },
    associations: {
      category: "Consumer Finance",
      dataTags: ["Orc", "Zerg"],
      dataPreviews: {
        lookupColumn: "previewUrl",
        values: ["http://placehold.it/400x401", "http://placehold.it/401x401"]
      }
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
      vendorId: 2,
      updateFrequency: "Annually"
    },
    associations: {
      category: "U.S. Energy Information Administration",
      dataTags: "Romulan"
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
      vendorId: 3,
      updateFrequency: "Quarterly"
    },
    associations: {
      category: "U.S. Energy Information Administration",
      dataTags: ["Romulan", "Zerg", "Protoss"],
      dataPreviews: {
        lookupColumn: "previewUrl",
        values: "http://placehold.it/402x401"
      }
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
      vendorId: 1,
      updateFrequency: "Annually"
    },
    associations: {
      category: "U.S. Energy Information Administration",
      dataTags: "Orc",
      dataPreviews: {
        lookupColumn: "previewUrl",
        values: "http://placehold.it/403x401"
      }
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
      vendorId: 1,
      updateFrequency: "Daily"
    },
    associations: {
      category: "U.S. Energy Information Administration",
      dataTags: "Human",
      dataPreviews: {
        lookupColumn: "previewUrl",
        values: "http://placehold.it/405x401"
      }
    }
  },
  {
    model: 'DataSet',
    data: {
      description: "Yearly crime rates in Canada. This data is based on crimes reported to the police. Unites: rate per 100,000 population.",
      title: "Crime Rates, Canada",
      format: "XML",
      url: "http://www.quandl.com/api/v1/datasets/STATSCAN/CRIME.xml?&trim_start=1962-12-31&trim_end=2011-12-31&sort_order=desc"
    },
    associations: {
      category: "Federal Government",
      dataTags: "Human"
    }
  },
  {
    model: 'DataSet',
    data: {
      description: "Canadian population by year, in millions of persons, dating back to 1960",
      title: "Population in Canada",
      format: "JSON",
      url: "http://www.quandl.com/api/v1/datasets/FRED/CANPOPL.json?&trim_start=1960-01-01&trim_end=2011-01-01&sort_order=desc"
    },
    associations: {
      category: "Federal Government",
      dataTags: ["Zerg", "Protoss"]
    }
  },
  {
    model: 'DataSet',
    data: {
      description: "U.S. Federal Employee Salaries data from the Office of Personnel Management (OPM).",
      title: "Federal Employee Salaries",
      format: "CSV",
      url: "https://app.enigma.io/table/us.gov.opm.salaries.2011/#/california"
    },
    associations: {
      category: "Federal Government",
      dataTags: ["Romulan", "Orc"]
    }
  },
  {
    model: 'DataSet',
    data: {
      description: "Retail cash price of self-serve, motor vehicle No. 2 diesel fuel sold for on-highway use.",
      title: "Weekly Retail On-Highway Diesel Prices",
      format: "XLS",
      url: "http://www.eia.gov/oog/ftparea/wogirs/xls/psw18vwall.xls"
    },
    associations: {
      category: "United States",
      dataTags: ["Orc", "Protoss"]
    }
  },
  {
    model: 'DataSet',
    data: {
      description: "Accommodation and Food Services Earnings in Rhode Island. Update frequency is quarterly. Data is seasonally adjusted. Units in Mil. of $.",
      title: "Accommodation and Food Services Earnings in Rhode Island",
      format: "CSV",
      url: "https://app.enigma.io/table/us.gov.frs.stlouis.fred.rieacc"
    },
    associations: {
      category: "United States",
      dataTags: ["Zerg", "Human"]
    }
  }
];
