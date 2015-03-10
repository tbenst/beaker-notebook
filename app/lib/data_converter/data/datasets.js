module.exports = [
  {
    model: "DataSet",
    data: {
      title: "Credit Card Complaints",
      description: "We don’t verify all the facts alleged in these complaints but we do take steps to confirm a commercial relationship between the consumer and company. Complaints are listed here after the company responds or after they have had the complaint for 15 calendar days, whichever comes first. We remove complaints if they don’t meet all of the publication criteria. Data is refreshed nightly.",
      remoteFile: "Credit_card_complaints.csv",
      rows: 350,
      format: "XML",
      updateFrequency: "Weekly",
      startDate: "2011-11-30T00:00:00.000Z",
      metadata: {
        title: "Credit Card Complaints",
        description: "We don’t verify all the facts alleged in these complaints but we do take steps to confirm a commercial relationship between the consumer and company. Complaints are listed here after the company responds or after they have had the complaint for 15 calendar days, whichever comes first. We remove complaints if they don’t meet all of the publication criteria. Data is refreshed nightly.",
        remoteFile: "Credit_card_complaints.csv",
        rows: 350,
        format: "XML",
        updateFrequency: "Weekly",
        startDate: "2011-11-30T00:00:00.000Z",
        vendor: "Consumer Financial Protection Bureau",
        tags: [
          "Finance",
          "Credit Card"
        ]
      }
    },
    associations: [
      {
        joinTable: "data_sets_categories",
        lookup: {
          Category: {
            name: "Retail"
          }
        }
      },
      {
        joinTable: "data_sets_data_tags",
        lookup: {
          DataTag: [
            {
              name: "Finance"
            },
            {
              name: "Credit Card"
            }
          ]
        }
      },
      {
        joinTable: "data_sets_data_previews",
        lookup: {
          DataPreview: [
            {
              previewUrl: "http://i.imgur.com/fONsbsm.png"
            },
            {
              smallPreviewUrl: "http://i.imgur.com/1oMGkXz.png"
            }
          ]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          Vendor: [
            {
              name: "Consumer Financial Protection Bureau"
            }
          ]
        }
      }
    ]
  },
  {
    model: "DataSet",
    data: {
      title: "US electricity statistics",
      description: "Most of the electricity in the United States is produced using steam turbines. Coal is the most common fuel for generating electricity in the United States. In 2011, 42% of the country's nearly 4 trillion kilowatthours of electricity used coal as its source of energy.",
      remoteFile: "ELEC.zip",
      rows: 1000,
      format: "CSV",
      updateFrequency: "Annually",
      metadata: {
        title: "US electricity statistics",
        description: "Most of the electricity in the United States is produced using steam turbines. Coal is the most common fuel for generating electricity in the United States. In 2011, 42% of the country's nearly 4 trillion kilowatthours of electricity used coal as its source of energy.",
        remoteFile: "ELEC.zip",
        rows: 1000,
        format: "CSV",
        updateFrequency: "Annually",
        vendor: "U.S. Energy Information Administration",
        tags: [
          "Electricity",
          "United States of America"
        ]
      }
    },
    associations: [
      {
        joinTable: "data_sets_categories",
        lookup: {
          Category: {
            name: "Energy"
          }
        }
      },
      {
        joinTable: "data_sets_data_tags",
        lookup: {
          DataTag: [
            {
              name: "Electricity"
            },
            {
              name: "United States of America"
            }
          ]
        }
      },
      {
        joinTable: "data_sets_data_previews",
        lookup: {
          DataPreview: [
            {
              previewUrl: "http://i.imgur.com/le8XFL4.png"
            },
            {
              smallPreviewUrl: "http://i.imgur.com/4wVmYff.png"
            }
          ]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          Vendor: [
            {
              name: "U.S. Energy Information Administration"
            }
          ]
        }
      }
    ]
  },
  {
    model: "DataSet",
    data: {
      title: "US natural gas statistics",
      description: "Natural gas prices are a function of market supply and demand. Due to limited alternatives for natural gas consumption or production in the short run, changes in supply or demand over a short period often result in large price movements to bring supply and demand back into balance.",
      remoteFile: "NG.zip",
      rows: 9000,
      format: "TXT",
      updateFrequency: "Quarterly",
      metadata: {
        title: "US natural gas statistics",
        description: "Natural gas prices are a function of market supply and demand. Due to limited alternatives for natural gas consumption or production in the short run, changes in supply or demand over a short period often result in large price movements to bring supply and demand back into balance.",
        remoteFile: "NG.zip",
        rows: 9000,
        format: "TXT",
        updateFrequency: "Quarterly",
        vendor: "U.S. Energy Information Administration",
        tags: [
          "Energy",
          "Gas",
          "United States of America"
        ]
      }
    },
    associations: [
      {
        joinTable: "data_sets_categories",
        lookup: {
          Category: {
            name: "Energy"
          }
        }
      },
      {
        joinTable: "data_sets_data_tags",
        lookup: {
          DataTag: [
            {
              name: "Energy"
            },
            {
              name: "Gas"
            },
            {
              name: "United States of America"
            }
          ]
        }
      },
      {
        joinTable: "data_sets_data_previews",
        lookup: {
          DataPreview: [
            {
              previewUrl: "http://i.imgur.com/5vJCgLB.png"
            },
            {
              smallPreviewUrl: "http://i.imgur.com/UipENFZ.png"
            }
          ]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          Vendor: [
            {
              name: "U.S. Energy Information Administration"
            }
          ]
        }
      }
    ]
  },
  {
    model: "DataSet",
    data: {
      title: "US Petroleum statistics",
      description: "The United States relied on net imports (imports minus exports) for about 40% of the petroleum (crude oil and petroleum products) that we consumed in 2012. Just over half of these imports came from the Western Hemisphere. Our dependence on foreign petroleum has declined since peaking in 2005.",
      remoteFile: "PET.zip",
      rows: 55,
      format: "XML",
      updateFrequency: "Annually",
      metadata: {
        title: "US Petroleum statistics",
        description: "The United States relied on net imports (imports minus exports) for about 40% of the petroleum (crude oil and petroleum products) that we consumed in 2012. Just over half of these imports came from the Western Hemisphere. Our dependence on foreign petroleum has declined since peaking in 2005.",
        remoteFile: "PET.zip",
        rows: 55,
        format: "XML",
        updateFrequency: "Annually",
        vendor: "U.S. Energy Information Administration",
        tags: [
          "Energy",
          "Gas",
          "United States of America"
        ]
      }
    },
    associations: [
      {
        joinTable: "data_sets_categories",
        lookup: {
          Category: {
            name: "Energy"
          }
        }
      },
      {
        joinTable: "data_sets_data_tags",
        lookup: {
          DataTag: [
            {
              name: "Energy"
            },
            {
              name: "Gas"
            },
            {
              name: "United States of America"
            }
          ]
        }
      },
      {
        foreignKey: "vendorId",
        lookup: {
          Vendor: [
            {
              name: "U.S. Energy Information Administration"
            }
          ]
        }
      }
    ]
  }
];
