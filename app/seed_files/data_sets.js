module.exports = [
  {
    model: 'DataSet',
    data: {
      title: "Credit Card Complaints",
      description: "We don’t verify all the facts alleged in these complaints but we do take steps to confirm a commercial relationship between the consumer and company. Complaints are listed here after the company responds or after they have had the complaint for 15 calendar days, whichever comes first. We remove complaints if they don’t meet all of the publication criteria. Data is refreshed nightly.",
      url: "https://data.consumerfinance.gov/api/views/x3w3-u78g/rows.csv?accessType=DOWNLOAD",
      rows: 350,
      format: "XML",
      updateFrequency: "Weekly"
    },
    associations: [
      {
        joinTable: "DataSetsCategories",
        lookup: {
          "Category": {name: "Retail"}
        }
      },
      {
        joinTable: "DataSetsDataTags",
        lookup: {
          "DataTag": [{name: "Finance"}, {name: "Credit Card"}]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          "Vendor": [{name: "Consumer Financial Protection Bureau"}]
        }
      }
    ]
  },

  {
    model: 'DataSet',
    data: {
      title: "US electricity statistics",
      description: "Most of the electricity in the United States is produced using steam turbines. Coal is the most common fuel for generating electricity in the United States. In 2011, 42% of the country's nearly 4 trillion kilowatthours of electricity used coal as its source of energy.",
      url: "http://api.eia.gov/bulk/ELEC.zip",
      rows: 1000,
      format: "CSV",
      updateFrequency: "Annually"
    },
    associations: [
      {
        joinTable: "DataSetsCategories",
        lookup: {
          "Category": {name: "Energy"}
        }
      },
      {
        joinTable: "DataSetsDataTags",
        lookup: {
          "DataTag": [{name: "Electricity"}, {name: "United States of America"}]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          "Vendor": [{name: "U.S. Energy Information Administration"}]
        }
      }
    ]
  },
  {
    model: 'DataSet',
    data: {
      title: "US natural gas statistics",
      description: "Natural gas prices are a function of market supply and demand. Due to limited alternatives for natural gas consumption or production in the short run, changes in supply or demand over a short period often result in large price movements to bring supply and demand back into balance.",
      url: "http://api.eia.gov/bulk/NG.zip",
      rows: 9000,
      format: "TXT",
      updateFrequency: "Quarterly"
    },
    associations: [
      {
        joinTable: "DataSetsCategories",
        lookup: {
          "Category": {name: "Energy"}
        }
      },
      {
        joinTable: "DataSetsDataTags",
        lookup: {
          "DataTag": [{name: "Energy"}, {name: "Gas"}, {name: "United States of America"}]
        }
      },
      {
        joinTable: "DataSetsDataPreviews",
        lookup: {
          "DataPreview": {previewUrl: "http://placehold.it/402x401"}
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          "Vendor": [{name: "U.S. Energy Information Administration"}]
        }
      }
    ]
  },

  {
    model: 'DataSet',
    data: {
      title: "US Petroleum statistics",
      description: "The United States relied on net imports (imports minus exports) for about 40% of the petroleum (crude oil and petroleum products) that we consumed in 2012. Just over half of these imports came from the Western Hemisphere. Our dependence on foreign petroleum has declined since peaking in 2005.",
      url: "http://api.eia.gov/bulk/PET.zip",
      rows: 55,
      format: "XML",
      updateFrequency: "Annually"
    },
    associations: [
      {
        joinTable: "DataSetsCategories",
        lookup: {
          "Category": {name: "Energy"}
        }
      },
      {
        joinTable: "DataSetsDataTags",
        lookup: {
          "DataTag": [{name: "Energy"}, {name: "Gas"}, {name: "United States of America"}]
        }
      },
      {
        joinTable: "DataSetsDataPreviews",
        lookup: {
          "DataPreview": {previewUrl: "http://placehold.it/403x401"}
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          "Vendor": [{name: "U.S. Energy Information Administration"}]
        }
      }
    ]
  },

  {
    model: 'DataSet',
    data: {
      title: "US national and region energy consumption",
      description: "Electricity consumption totaled nearly 3,856 billion Kilowatthours (kWh) in 2011. U.S. electricity use in 2011 was more than 13 times greater than electricity use in 1950.",
      url: "http://api.eia.gov/bulk/SEDS.zip",
      rows: 2312,
      format: "CSV",
      updateFrequency: "Daily"
    },
    associations: [
      {
        joinTable: "DataSetsCategories",
        lookup: {
          "Category": {name: "Energy"}
        }
      },
      {
        joinTable: "DataSetsDataTags",
        lookup: {
          "DataTag": [{name: "Energy"}, {name: "United States of America"}]
        }
      },
      {
        joinTable: "DataSetsDataPreviews",
        lookup: {
          "DataPreview": {previewUrl: "http://placehold.it/405x401"}
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          "Vendor": [{name: "U.S. Energy Information Administration"}]
        }
      }
    ]
  },
  {
    model: 'DataSet',
    data: {
      description: "Yearly crime rates in Canada. This data is based on crimes reported to the police. Unites: rate per 100,000 population.",
      title: "Crime Rates, Canada",
      format: "XML",
      url: "http://www.quandl.com/api/v1/datasets/STATSCAN/CRIME.xml?&trim_start=1962-12-31&trim_end=2011-12-31&sort_order=desc",
      updateFrequency: "Annually"
    },
    associations: [
      {
        joinTable: "DataSetsCategories",
        lookup: {
          "Category": {name: "Canada"}
        }
      },
      {
        joinTable: "DataSetsDataTags",
        lookup: {
          "DataTag": [{name: "Canada"}, {name: "Crime"}]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          "Vendor": [{name: "Statistics Canada"}]
        }
      }
    ]
  },
  {
    model: 'DataSet',
    data: {
      description: "Canadian population by year, in millions of persons, dating back to 1960",
      title: "Population in Canada",
      format: "JSON",
      url: "http://www.quandl.com/api/v1/datasets/FRED/CANPOPL.json?&trim_start=1960-01-01&trim_end=2011-01-01&sort_order=desc",
      updateFrequency: "Annually"
    },
    associations: [
      {
        joinTable: "DataSetsCategories",
        lookup: {
          "Category": {name: "Canada"}
        }
      },
      {
        joinTable: "DataSetsDataTags",
        lookup: {
          "DataTag": [{name: "Canada"}, {name: "Population"}]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          "Vendor": [{name: "Federal Reserve Economic Data"}]
        }
      }
    ]
  },
  {
    model: 'DataSet',
    data: {
      description: "U.S. Federal Employee Salaries data from the Office of Personnel Management (OPM).",
      title: "Federal Employee Salaries",
      format: "CSV",
      url: "https://app.enigma.io/table/us.gov.opm.salaries.2011/#/california",
      updateFrequency: "Annually"
    },
    associations: [
      {
        joinTable: "DataSetsCategories",
        lookup: {
          "Category": {name: "Federal Government"}
        }
      },
      {
        joinTable: "DataSetsDataTags",
        lookup: {
          "DataTag": [{name: "OPM"}, {name: "Federal Government"}]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          "Vendor": [{name: "U.S. Office of Personnel Management"}]
        }
      }
    ]
  },
  {
    model: 'DataSet',
    data: {
      description: "Retail cash price of self-serve, motor vehicle No. 2 diesel fuel sold for on-highway use.",
      title: "Weekly Retail On-Highway Diesel Prices",
      format: "XLS",
      url: "http://www.eia.gov/oog/ftparea/wogirs/xls/psw18vwall.xls",
      updateFrequency: "Monthly"
    },
    associations: [
      {
        joinTable: "DataSetsCategories",
        lookup: {
          "Category": {name: "Retail"}
        }
      },
      {
        joinTable: "DataSetsDataTags",
        lookup: {
          "DataTag": [{name: "Energy"}, {name: "Retail"}, {name: "Gas"}]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          "Vendor": [{name: "Energy Information Administration, Department of Energy"}]
        }
      }
    ]
  },
  {
    model: 'DataSet',
    data: {
      description: "Accommodation and Food Services Earnings in Rhode Island. Update frequency is quarterly. Data is seasonally adjusted. Units in Mil. of $.",
      title: "Accommodation and Food Services Earnings in Rhode Island",
      format: "CSV",
      url: "https://app.enigma.io/table/us.gov.frs.stlouis.fred.rieacc",
      updateFrequency: "Quarterly"
    },
    associations: [
      {
        joinTable: "DataSetsCategories",
        lookup: {
          "Category": {name: "Retail"}
        }
      },
      {
        joinTable: "DataSetsDataTags",
        lookup: {
          "DataTag": [{name: "Retail"}, {name: "Rhode Island"}]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          "Vendor": [{name: "Federal Reserve Bank of St. Louis"}]
        }
      }
    ]
  },
  {
    model: 'DataSet',
    data: {
      description: "The World Bank Projects Contracts information provides all of the contractors and consultants that have been used in order to fulfill the projects that the World Bank has invested in.",
      title: "World Bank Contract Awards",
      format: "CSV",
      url: "https://app.enigma.io/table/org.worldbank.projects.contract-awards/#/finance",
      updateFrequency: "Annually"
    },
    associations: [
      {
        joinTable: "DataSetsCategories",
        lookup: {
          "Category": {name: "Finance"}
        }
      },
      {
        joinTable: "DataSetsDataTags",
        lookup: {
          "DataTag": [{name: "Finance"}, {name: "Global"}, {name: "World Bank"}]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          "Vendor": [{name: "World Bank"}]
        }
      }
    ]
  },
  {
    model: 'DataSet',
    data: {
      description: "Quarterly retail e-commerce sales are estimated from the same sample used for the Monthly Retail Trade Survey (MRTS) to estimate preliminary and final U.S. retail sales. Coverage includes all retailers whether or not they are engaged in e-commerce. Online travel services, financial brokers and dealers, and ticket sales agencies are not classified as retail and are not included in either the total retail or retail e-commerce sales estimates.",
      title: "Quarterly E-commerce Report",
      format: "XLS",
      url: "http://www.census.gov/retail/#ecommerce",
      updateFrequency: "Quarterly"
    },
    associations: [
      {
        joinTable: "DataSetsCategories",
        lookup: {
          "Category": {name: "Retail"}
        }
      },
      {
        joinTable: "DataSetsDataTags",
        lookup: {
          "DataTag": [{name: "Finance"}, {name: "E-commerce"}]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          "Vendor": [{name: "U.S. Census Bureau, Department of Commerce"}]
        }
      }
    ]
  },
  {
    model: 'DataSet',
    data: {
      description: "The Series and Class Report provides basic identification information for all active registered investment company series and classes that have been issued IDs by the Commission. Beginning on February 6, 2006, all open-end mutual funds (Form N-1A filers), insurance separate accounts organized as mutual funds (Form N-3 filers), insurance separate accounts organized as unit investment trusts (Form N-4 and Form N-6 filers). Investment companies (see adopting release http://www.sec.gov/rules/final/33-8590.pdf) have been required to use these IDs when making their electronic filings with the Commission. Since February 6, 2006, series and class IDs have also been issued to a few closed-end funds (Form N-2 filers) and unit investment trusts that are not used to fund separate accounts (S-6 filers).",
      title: "Investment Company Series and Class Information",
      format: "CSV",
      url: "http://www.sec.gov/open/datasets/investment_company_series_class.csv",
      updateFrequency: "Annually"
    },
    associations: [
      {
        joinTable: "DataSetsCategories",
        lookup: {
          "Category": {name: "Investment"}
        }
      },
      {
        joinTable: "DataSetsDataTags",
        lookup: {
          "DataTag": [{name: "Finance"}, {name: "SEC"}]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          "Vendor": [{name: "U.S. Securities and Exchange Commission"}]
        }
      }
    ]
  }
];
