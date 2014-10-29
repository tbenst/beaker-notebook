module.exports = [
  {
    model: "Category",
    data: {
      name: "Misc",
      path: "0.1",
      metadata: {
        title: { type:'string', indexes: ['text']},
        description: {type: 'string', indexes: ['text']},
        remoteFile: {type: 'string' },
        rows: { type: 'integer' },
        format: { type: 'string', indexes: ['filter']},
        updateFrequency: { type: 'string' },
        startDate: { type: 'date' },
        numColumns: { type: 'integer' },
        csvPreview: { type: 'string' },
        vendor: { type: 'string' , indexes: ['filter']},
        tags: { type: 'string', indexes: ['filter']},
        released: { type: 'date' },
        lastUpdated: { type: 'date' }
      }
    }
  },
  {
    model: "Category",
    data: {
      name: "Quandl",
      path: "0.2",
      metadata: {
        title: { type:'string', indexes: ['text']},
        description: {type: 'string', indexes: ['text']},
        remoteFile: {type: 'string' },
        rows: { type: 'integer' },
        format: { type: 'string', indexes: ['filter']},
        updateFrequency: { type: 'string' },
        startDate: { type: 'date' },
        numColumns: { type: 'integer' },
        csvPreview: { type: 'string' },
        vendor: { type: 'string' , indexes: ['filter']},
        tags: { type: 'string', indexes: ['filter']},
        released: { type: 'date' },
        lastUpdated: { type: 'date' }
      }
    }
  },
  {
    model: "Category",
    data: {
      name: "Energy",
      description: "Work and heat are two categories of processes or mechanisms that can transfer a given amount of energy. The second law of thermodynamics limits the amount of work that can be performed by energy that is obtained via a heating process—some energy is always lost as waste heat. The maximum amount that can go into work is called the available energy. Systems such as machines and living things often require available energy, not just any energy. Mechanical and other forms of energy can be transformed in the other direction into thermal energy without such limitations.",
      ownerName: "Quentin",
      ownerEmail: "quentin@twosigma.com",
      path: "0.1.1"
    }
  },
  {
    model: "Category",
    data: {
      name: "Finance",
      description: "Finance is a field within economics that deals with the allocation of assets and liabilities over time under conditions of certainty and uncertainty. Finance can also be defined as the science of money management. A key point in finance is the time value of money, which states that one unit of currency today is worth more than one unit of currency tomorrow. Finance aims to price assets based on their risk level and their expected rate of return. Finance can be broken into three different sub-categories: public finance, corporate finance and personal finance.",
      ownerName: "Quentin",
      ownerEmail: "quentin@twosigma.com",
      path: "0.1.2"
    }
  },
  {
    model: "Category",
    data: {
      name: "Investment",
      description: "In finance, investment is putting money into an asset with the expectation of capital appreciation, dividends, and/or interest earnings. This may or may not be backed by research and analysis. Most or all forms of investment involve some form of risk, such as investment in equities, property, and even fixed interest securities which are subject, among other things, to inflation risk. It is indispensable for project investors to identify and manage the risks related to the investment.",
      ownerName: "Quentin",
      ownerEmail: "quentin@twosigma.com",
      path: "0.1.2.1"
    }
  },
  {
    model: "Category",
    data: {
      name: "Retail",
      description: "Retail is the sale of goods and services from individuals or businesses to the end-user. Retailers are part of an integrated system called the supply chain. A retailer purchases goods or products in large quantities from manufacturers directly or through a wholesale, and then sells smaller quantities to the consumer for a profit. Retailing can be done in either fixed locations like stores or markets, door-to-door or by delivery. In the 2000s, an increasing amount of retailing is done using online websites, electronic payment, and then delivered via a courier or via other services.",
      ownerName: "Quentin",
      ownerEmail: "quentin@twosigma.com",
      path: "0.1.2.2"
    }
  },
  {
    model: "Category",
    data: {
      name: "Government",
      ownerName: "Quentin",
      ownerEmail: "quentin@twosigma.com",
      description: "In the case of its broad associative definition, government normally consists of legislators, administrators, and arbitrators. Government is the means by which state policy is enforced, as well as the mechanism for determining the policy of the state. A form of government, or form of state governance, refers to the set of political systems and institutions that make up the organisation of a specific government.",
      path: "0.1.3"
    }
  },
  {
    model: "Category",
    data: {
      name: "Canada",
      description: "Canada is a country in North America consisting of 10 provinces and 3 territories. Located in the northern part of the continent, it extends from the Atlantic to the Pacific and northward into the Arctic Ocean. At 9.98 million square kilometres in total, Canada is the world's second-largest country by total area, and its common border with the United States is the world's longest land border shared by the same two countries.",
      ownerName: "Quentin",
      ownerEmail: "quentin@twosigma.com",
      path: "0.1.3.1"
    }
  },
  {
    model: "Category",
    data: {
      name: "United States",
      description: "The United States of America (USA)—commonly referred to as the United States (U.S.), the States or simply America—is a federal republic consisting of 50 states and a federal district. The 48 contiguous states and the federal district of Washington, D.C., are in central North America between Canada and Mexico. The state of Alaska is the northwestern part of North America and the state of Hawaii is an archipelago in the mid-Pacific. The country also has five populated and nine unpopulated territories in the Pacific and the Caribbean. At 3.79 million square miles (9.83 million km2) in total and with around 317 million people, the United States is the fourth-largest country by total area and third largest by population. It is one of the world's most ethnically diverse and multicultural nations, the product of large-scale immigration from many countries. The geography and climate of the United States is also extremely diverse, and it is home to a wide variety of wildlife",
      ownerName: "Quentin",
      ownerEmail: "quentin@twosigma.com",
      path: "0.1.3.2"
    }
  },
  {
    model: "Category",
    data: {
      name: "Federal Government",
      description: "The Government of the United States of America is the federal government of the republic of fifty states that constitute the United States, as well as one capital district, and several other territories. The federal government is composed of three distinct branches: legislative, executive and judicial, whose powers are vested by the U.S. Constitution in the Congress, the President, and the federal courts, including the Supreme Court, respectively. The powers and duties of these branches are further defined by acts of Congress, including the creation of executive departments and courts inferior to the Supreme Court.",
      ownerName: "Quentin",
      ownerEmail: "quentin@twosigma.com",
      path: "0.1.3.2.1"
    }
  },
  {
    data: {
      name: "Demography",
      path: "0.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Births and Deaths",
      path: "0.2.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age at First Marriage Female",
      path: "0.2.4.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age at First Marriage Male",
      path: "0.2.4.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Child Mortality",
      path: "0.2.4.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Contraceptive Prevalence",
      path: "0.2.4.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Deaths Disease and Nutrition",
      path: "0.2.4.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Deaths Injury and Accident",
      path: "0.2.4.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Deaths Non-Communicable",
      path: "0.2.4.1.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Fertility Rate",
      path: "0.2.4.1.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Infant Mortality",
      path: "0.2.4.1.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life Expectancy at Birth Female",
      path: "0.2.4.1.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life Expectancy at Birth Male",
      path: "0.2.4.1.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life Expectancy at Birth Total",
      path: "0.2.4.1.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Maternal Mortality",
      path: "0.2.4.1.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Neonatal Mortality",
      path: "0.2.4.1.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Sex Ratio at Birth",
      path: "0.2.4.1.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Teenage Mothers",
      path: "0.2.4.1.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Economic Activity",
      path: "0.2.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Employment by Industry Agriculture",
      path: "0.2.4.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Employment by Industry Industry",
      path: "0.2.4.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Employment by Industry Services",
      path: "0.2.4.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Employment by Type Employees",
      path: "0.2.4.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Employment by Type Employers",
      path: "0.2.4.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Employment by Type Family",
      path: "0.2.4.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Employment by Type Self-Employed",
      path: "0.2.4.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "GDP per Capita PPP",
      path: "0.2.4.2.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gender Wage Ratio",
      path: "0.2.4.2.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gini Index",
      path: "0.2.4.2.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Labor Force",
      path: "0.2.4.2.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Time-Related Under-Employment",
      path: "0.2.4.2.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Unemployment Female",
      path: "0.2.4.2.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Unemployment Male",
      path: "0.2.4.2.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Unemployment Total",
      path: "0.2.4.2.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Education",
      path: "0.2.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Adult Literacy Rate",
      path: "0.2.4.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Enrolment Rate Primary",
      path: "0.2.4.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Enrolment Rate Secondary",
      path: "0.2.4.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Enrolment Rate Tertiary",
      path: "0.2.4.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Female-Male Ratio Primary",
      path: "0.2.4.3.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Female-Male Ratio Secondary",
      path: "0.2.4.3.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Female-Male Ratio Tertiary",
      path: "0.2.4.3.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pupil-Teacher Ratio Primary",
      path: "0.2.4.3.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pupil-Teacher Ratio Secondary",
      path: "0.2.4.3.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Youth Literacy Rate",
      path: "0.2.4.3.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Health and Disease",
      path: "0.2.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Adults Living with HIV",
      path: "0.2.4.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Diabetes Prevalence Rate",
      path: "0.2.4.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Health Expenditure",
      path: "0.2.4.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Immunization Rate BCG",
      path: "0.2.4.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Immunization Rate DPT",
      path: "0.2.4.4.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Immunization Rate Hepatitis B",
      path: "0.2.4.4.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Immunization Rate Measles",
      path: "0.2.4.4.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Immunization Rate Polio",
      path: "0.2.4.4.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Low Birth Weight Babies",
      path: "0.2.4.4.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Malaria Prevalence Rate",
      path: "0.2.4.4.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Midwives per 1000 People",
      path: "0.2.4.4.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nurses per 1000 People",
      path: "0.2.4.4.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tuberculosis Prevalence Rate",
      path: "0.2.4.4.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Under-Nourished People",
      path: "0.2.4.4.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population",
      path: "0.2.4.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Female Population",
      path: "0.2.4.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Migration",
      path: "0.2.4.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population Above Age 64",
      path: "0.2.4.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population Aged 15 to 64",
      path: "0.2.4.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population Below Age 15",
      path: "0.2.4.5.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population Density",
      path: "0.2.4.5.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population Growth Rate",
      path: "0.2.4.5.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population of Largest City",
      path: "0.2.4.5.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rural Population",
      path: "0.2.4.5.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Population",
      path: "0.2.4.5.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Urban Population",
      path: "0.2.4.5.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Economics",
      path: "0.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Balance of Payments",
      path: "0.2.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current Account Balance",
      path: "0.2.5.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current Account Balance as Share of GDP",
      path: "0.2.5.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "External Debt",
      path: "0.2.5.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "External Debt as Share of GDP",
      path: "0.2.5.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Trade Balance",
      path: "0.2.5.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Trade Balance as Share of GDP",
      path: "0.2.5.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Capital Markets",
      path: "0.2.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Deposit Interest Rate",
      path: "0.2.5.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Exchange Rate Nominal",
      path: "0.2.5.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Exchange Rate at PPP",
      path: "0.2.5.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lending Interest Rate",
      path: "0.2.5.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lending Risk Premium",
      path: "0.2.5.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Real Interest Rate",
      path: "0.2.5.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Spread Over US Treasuries",
      path: "0.2.5.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Stock Market Capitalization",
      path: "0.2.5.2.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Stock Market Index",
      path: "0.2.5.2.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Employment",
      path: "0.2.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age Dependency Ratio",
      path: "0.2.5.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Labour Force",
      path: "0.2.5.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Minimum Wage",
      path: "0.2.5.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population",
      path: "0.2.5.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Unemployment Rate",
      path: "0.2.5.3.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Youth Unemployment",
      path: "0.2.5.3.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Government Finances",
      path: "0.2.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Government Revenues",
      path: "0.2.5.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Government Spending",
      path: "0.2.5.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Debt",
      path: "0.2.5.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Debt as Share of GDP",
      path: "0.2.5.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Primary Surplus or Deficit",
      path: "0.2.5.4.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Revenues as Share of GDP",
      path: "0.2.5.4.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Spending as Share of GDP",
      path: "0.2.5.4.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Surplus or Deficit as Share of GDP",
      path: "0.2.5.4.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Growth",
      path: "0.2.5.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "GDP",
      path: "0.2.5.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "GDP Per Capita",
      path: "0.2.5.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "GDP Per Capita at PPP",
      path: "0.2.5.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "GDP as Share of World GDP at PPP",
      path: "0.2.5.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Real GDP",
      path: "0.2.5.5.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Real GDP Growth",
      path: "0.2.5.5.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Industry and Business",
      path: "0.2.5.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Change in Inventories",
      path: "0.2.5.6.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Household Consumption Expenditures",
      path: "0.2.5.6.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Industrial Production",
      path: "0.2.5.6.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "National Savings",
      path: "0.2.5.6.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Investment",
      path: "0.2.5.6.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Inflation",
      path: "0.2.5.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "CPI",
      path: "0.2.5.7.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Average CPI  - World Bank",
      path: "0.2.5.7.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nominal SA - World Bank",
      path: "0.2.5.7.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Period Avg - ODA",
      path: "0.2.5.7.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Period End - ODA",
      path: "0.2.5.7.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "RateInflation",
      path: "0.2.5.7.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "United Nations",
      path: "0.2.5.7.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "World Bank",
      path: "0.2.5.7.1.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "CPI Change",
      path: "0.2.5.7.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Average CPI  - World Bank",
      path: "0.2.5.7.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nominal SA - World Bank",
      path: "0.2.5.7.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Period Avg - ODA",
      path: "0.2.5.7.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Period End - ODA",
      path: "0.2.5.7.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "RateInflation",
      path: "0.2.5.7.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "United Nations",
      path: "0.2.5.7.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "World Bank",
      path: "0.2.5.7.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "GDP Deflator",
      path: "0.2.5.7.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Change in GDP Deflator - United Nations",
      path: "0.2.5.7.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Change in GDP Deflator - World Bank",
      path: "0.2.5.7.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "GDP Deflator - ODA",
      path: "0.2.5.7.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "GDP Deflator - World Bank",
      path: "0.2.5.7.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Money Supply",
      path: "0.2.5.7.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Broad Money M2",
      path: "0.2.5.7.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Capital Liabilities - United Nations",
      path: "0.2.5.7.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Domestic Credit - United Nations",
      path: "0.2.5.7.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Foreign Assets - United Nations",
      path: "0.2.5.7.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "M2 - World Bank",
      path: "0.2.5.7.4.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "M3 - World Bank",
      path: "0.2.5.7.4.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Monetary Liabilities - United Nations",
      path: "0.2.5.7.4.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Money - United Nations",
      path: "0.2.5.7.4.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Money Supply - World Bank",
      path: "0.2.5.7.4.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Non-Monetary Liabilities - United Nations",
      path: "0.2.5.7.4.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Quasi Monetary Liabilities - United Nations",
      path: "0.2.5.7.4.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Quasi Money - World Bank",
      path: "0.2.5.7.4.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Other Price Indices",
      path: "0.2.5.7.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "CPI Food - United Nations",
      path: "0.2.5.7.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "CPI General - United Nations",
      path: "0.2.5.7.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "PPI - United Nations",
      path: "0.2.5.7.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "WPI - United Nations",
      path: "0.2.5.7.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "WPI - World Bank",
      path: "0.2.5.7.5.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Private Sector Credit",
      path: "0.2.5.7.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "International Trade",
      path: "0.2.5.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Exports",
      path: "0.2.5.8.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Exports as Share of GDP",
      path: "0.2.5.8.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "FDI Inbound",
      path: "0.2.5.8.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "FDI Outbound",
      path: "0.2.5.8.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Imports",
      path: "0.2.5.8.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Imports as Share of GDP",
      path: "0.2.5.8.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Reserves",
      path: "0.2.5.8.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Productive Sectors",
      path: "0.2.5.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Agriculture Share of Employment",
      path: "0.2.5.9.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Agriculture Share of GDP",
      path: "0.2.5.9.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Industry Share of Employment",
      path: "0.2.5.9.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Industry Share of GDP",
      path: "0.2.5.9.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Services Share of Employment",
      path: "0.2.5.9.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Services Share of GDP",
      path: "0.2.5.9.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tax Structure",
      path: "0.2.5.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Goods and Services Taxes Rev.",
      path: "0.2.5.10.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Income Profit and Capital Gains Taxes Rev.",
      path: "0.2.5.10.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "International Trade Taxes Rev.",
      path: "0.2.5.10.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Tax Revenue as Share of GDP",
      path: "0.2.5.10.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tax Rate as Share of Commercial Profits",
      path: "0.2.5.10.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Society",
      path: "0.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Culture",
      path: "0.2.6.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "All Vehicles",
      path: "0.2.6.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cell Phone Subscriptions",
      path: "0.2.6.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Households with a Personal Computer",
      path: "0.2.6.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Households with a Radio",
      path: "0.2.6.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Households with a Telephone",
      path: "0.2.6.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "International Tourism Arrivals",
      path: "0.2.6.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "International Tourism Departures",
      path: "0.2.6.1.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "International Tourism Receipts",
      path: "0.2.6.1.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Internet Users",
      path: "0.2.6.1.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Passenger Vehicles",
      path: "0.2.6.1.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Smoking Prevalence - Females",
      path: "0.2.6.1.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Smoking Prevalence - Males",
      path: "0.2.6.1.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Social Contributions",
      path: "0.2.6.1.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Education",
      path: "0.2.6.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Adult Literacy Rate",
      path: "0.2.6.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Elderly Literacy Rate",
      path: "0.2.6.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Elderly Literacy Rate - Female",
      path: "0.2.6.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Elderly Literacy Rate - Male",
      path: "0.2.6.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Enrolment Rate - Primary",
      path: "0.2.6.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Enrolment Rate - Secondary",
      path: "0.2.6.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Enrolment Rate - Tertiary",
      path: "0.2.6.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Youth Literacy Rate",
      path: "0.2.6.2.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Environment",
      path: "0.2.6.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "CO2 Emissions",
      path: "0.2.6.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "HFC Emissions",
      path: "0.2.6.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Methane Emissions",
      path: "0.2.6.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nitrous Oxide Emissions",
      path: "0.2.6.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "PFC Emissions",
      path: "0.2.6.3.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "SF6 Emissions",
      path: "0.2.6.3.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Family",
      path: "0.2.6.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Adolescent Fertility Rate",
      path: "0.2.6.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Adolescent Mothers",
      path: "0.2.6.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age at First Marriage - Female",
      path: "0.2.6.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age at First Marriage - Male",
      path: "0.2.6.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Maternal Leave Benefits",
      path: "0.2.6.4.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Orphans Aged 0 to 17",
      path: "0.2.6.4.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Weeks Maternity Leave",
      path: "0.2.6.4.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gender",
      path: "0.2.6.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Female-Male Education Ratio - Primary",
      path: "0.2.6.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Female-Male Education Ratio - Secondary",
      path: "0.2.6.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Female-Male Education Ratio - Tertiary",
      path: "0.2.6.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Female-Male Labor Participation Rate Ratio",
      path: "0.2.6.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Female-Male Literacy Ratio",
      path: "0.2.6.5.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gender Wage Ratio",
      path: "0.2.6.5.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Professional and Technical Female Workers",
      path: "0.2.6.5.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Health and Disease",
      path: "0.2.6.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age Dependency Ratio",
      path: "0.2.6.6.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age Dependency Ratio Old",
      path: "0.2.6.6.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age Dependency Ratio Young",
      path: "0.2.6.6.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Community Health Workers per 1000 people",
      path: "0.2.6.6.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Depth of Hunger",
      path: "0.2.6.6.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Fertility Rate",
      path: "0.2.6.6.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Health Expenditure",
      path: "0.2.6.6.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life Expectancy at Birth - Female",
      path: "0.2.6.6.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life Expectancy at Birth - Male",
      path: "0.2.6.6.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life Expectancy at Birth - Total",
      path: "0.2.6.6.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Midwives per 1000 People",
      path: "0.2.6.6.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nurses per 1000 people",
      path: "0.2.6.6.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percent Overweight - Female",
      path: "0.2.6.6.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percent Overweight - Male",
      path: "0.2.6.6.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percent Overweight - Under 5",
      path: "0.2.6.6.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percent Under Nourished",
      path: "0.2.6.6.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percent Wasting - Under 5",
      path: "0.2.6.6.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Military",
      path: "0.2.6.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Armed Forces Personnel",
      path: "0.2.6.7.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Armed Forces Personnel as Percentage of Labor Force",
      path: "0.2.6.7.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Arms Exports",
      path: "0.2.6.7.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Arms Imports",
      path: "0.2.6.7.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Military Expenditure",
      path: "0.2.6.7.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Politics",
      path: "0.2.6.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Estimated Accountability",
      path: "0.2.6.8.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Estimated Control of Corruption",
      path: "0.2.6.8.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Estimated Government Effectiveness",
      path: "0.2.6.8.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Estimated Political Stability",
      path: "0.2.6.8.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Estimated Rule of Law",
      path: "0.2.6.8.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Prevalence of Bribe Requests during Public Transactions",
      path: "0.2.6.8.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population",
      path: "0.2.6.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Female Population",
      path: "0.2.6.9.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Migration",
      path: "0.2.6.9.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population Above Age 64",
      path: "0.2.6.9.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population Aged 15 to 64",
      path: "0.2.6.9.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population Below Age 15",
      path: "0.2.6.9.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population Density",
      path: "0.2.6.9.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population Growth Rate",
      path: "0.2.6.9.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population of Largest City",
      path: "0.2.6.9.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rural Growth",
      path: "0.2.6.9.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rural Population",
      path: "0.2.6.9.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Population",
      path: "0.2.6.9.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Urban Population",
      path: "0.2.6.9.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Quality of Life",
      path: "0.2.6.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Access to Improved Sanitation Facilities",
      path: "0.2.6.10.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Access to Improved Water Sources",
      path: "0.2.6.10.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Disaster Risk Reduction Progress Score",
      path: "0.2.6.10.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Household Electrification Rate",
      path: "0.2.6.10.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Human Development Index",
      path: "0.2.6.10.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mean shortfall of the Five Dollar poverty line",
      path: "0.2.6.10.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population Affected by Droughts or Floods",
      path: "0.2.6.10.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population living with less than Five Dollars a day",
      path: "0.2.6.10.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rural Access to All Season Roads",
      path: "0.2.6.10.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Urban Population in Slums",
      path: "0.2.6.10.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Sexuality",
      path: "0.2.6.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Condom Use - Female",
      path: "0.2.6.11.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Condom Use - Male",
      path: "0.2.6.11.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Need for Family Planning Satisfied",
      path: "0.2.6.11.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Education",
      path: "0.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age Ranges for Educational Milestones",
      path: "0.2.7.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lower Secondary education Theoretical Duration",
      path: "0.2.7.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lower Secondary education Theoretical Entry Age",
      path: "0.2.7.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pre-Primary education (ISCED 0) Theoretical Entry Age",
      path: "0.2.7.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Primary education (ISCED 1) Theoretical Duration",
      path: "0.2.7.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Primary education (ISCED 1) Theoretical Entry Age",
      path: "0.2.7.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Theoretical Entry Age ISCED 4 post secondary non-tertiary",
      path: "0.2.7.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Theoretical duration ISCED 4 post secondary non-tertiary",
      path: "0.2.7.1.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Upper Secondary education Theoretical Duration",
      path: "0.2.7.1.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Upper Secondary education Theoretical Entry Age",
      path: "0.2.7.1.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "re-Primary education (ISCED 0) Theoretical Duration",
      path: "0.2.7.1.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Enrolment By Level of Education and Gender",
      path: "0.2.7.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lower Secondary education enrolment in all programmes",
      path: "0.2.7.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Post-Secondary Non-Tertiary Education Enrolment",
      path: "0.2.7.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pre-Primary education (ISCED 0) Enrolment",
      path: "0.2.7.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Primary education (ISCED 1) Enrolment",
      path: "0.2.7.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Enrolment",
      path: "0.2.7.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Secondary education enrolment in all programmes",
      path: "0.2.7.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Upper Secondary education enrolment in all programmes",
      path: "0.2.7.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Enrolment Ratio by Gender",
      path: "0.2.7.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Combined Gross Enrolment ratio - primary and secondary (ISCED 1-3)",
      path: "0.2.7.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Combined Gross Enrolment ratio - primary to tertiary (ISCED 1-6)",
      path: "0.2.7.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lower Secondary education Gross enrolment ratio",
      path: "0.2.7.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pre-Primary education (ISCED 0) Gross enrolment ratio",
      path: "0.2.7.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Primary education (ISCED 1) Gross enrolment ratio",
      path: "0.2.7.3.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Gross enrolment ratio",
      path: "0.2.7.3.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Secondary Gross enrolment ratio",
      path: "0.2.7.3.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Upper Secondary education Gross enrolment ratio",
      path: "0.2.7.3.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Expenditure on Education",
      path: "0.2.7.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "All personnel salaries as % of current educational expenditure; Primary; public institutions",
      path: "0.2.7.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "All personnel salaries as % of current educational expenditure; Secondary; public institutions",
      path: "0.2.7.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "All personnel salaries as % of current educational expenditure; Total all levels; public institutions",
      path: "0.2.7.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current educational expenditure in Lower Secondary as % of total current educational expenditure",
      path: "0.2.7.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current educational expenditure in Not allocated by level as % of total current educational expenditure",
      path: "0.2.7.4.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current educational expenditure in Post Secondary as % of total current educational expenditure",
      path: "0.2.7.4.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current educational expenditure in Pre-primary as % of total current educational expenditure",
      path: "0.2.7.4.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current educational expenditure in Upper Secondary as % of total current educational expenditure",
      path: "0.2.7.4.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percentage of educational current expenditure on teaching materials; Primary; public institutions",
      path: "0.2.7.4.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percentage of educational current expenditure on teaching materials; Secondary; public institutions",
      path: "0.2.7.4.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public current educational expenditure in Primary as % of public current educational expediture",
      path: "0.2.7.4.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public current educational expenditure in Secondary as % of public current educational expediture",
      path: "0.2.7.4.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public current educational expenditure in Tertiary as % of public current educational expediture",
      path: "0.2.7.4.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public current expenditure on education as % of public expenditure on education",
      path: "0.2.7.4.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public current expenditure on education as % of total current government expenditure",
      path: "0.2.7.4.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public expenditure on Primary as % of public expenditure on education",
      path: "0.2.7.4.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public expenditure on Secondary as % of public expenditure on education",
      path: "0.2.7.4.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public expenditure on Tertiary as % of public expenditure on education",
      path: "0.2.7.4.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public expenditure on education as % of GDP",
      path: "0.2.7.4.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public expenditure on education as % of GNI",
      path: "0.2.7.4.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public expenditure on education as % total government expenditure",
      path: "0.2.7.4.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Teachers salaries as % of current educational expenditure; Primary; public institutions",
      path: "0.2.7.4.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Teachers salaries as % of current educational expenditure; Secondary; public institutions",
      path: "0.2.7.4.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Teachers salaries as % of current educational expenditure; Total all levels; public institutions",
      path: "0.2.7.4.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total public educational expenditure per pupil as a percentage of GDP per capita / All levels",
      path: "0.2.7.4.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total public educational expenditure per pupil as a percentage of GDP per capita / Primary",
      path: "0.2.7.4.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total public educational expenditure per pupil as a percentage of GDP per capita / Secondary",
      path: "0.2.7.4.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total public educational expenditure per pupil as a percentage of GDP per capita / Tertiary",
      path: "0.2.7.4.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "Intake and Graduation Ratios",
      path: "0.2.7.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Expected gross graduation ratio",
      path: "0.2.7.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Expected gross intake ratio to the last grade of primary",
      path: "0.2.7.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross graduation ratio",
      path: "0.2.7.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross intake rate to the last grade of Primary",
      path: "0.2.7.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of Teachers by Education Level",
      path: "0.2.7.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lower Secondary Teaching Staff",
      path: "0.2.7.6.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Post-Secondary Non-Tertiary Education Teaching Staff",
      path: "0.2.7.6.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pre-Primary education (ISCED 0) Teaching staff",
      path: "0.2.7.6.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Primary education (ISCED 1) Teaching staff",
      path: "0.2.7.6.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Teaching Staff",
      path: "0.2.7.6.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Secondary Teaching Staff",
      path: "0.2.7.6.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Upper Secondary Teaching Staff",
      path: "0.2.7.6.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percentage of Repeaters by Level of Education",
      path: "0.2.7.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Primary education (ISCED 1) Percentage of Repeaters",
      path: "0.2.7.7.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Secondary education Percentage of Repeaters (general programmes)",
      path: "0.2.7.7.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Private Enrolment By Level Of Education",
      path: "0.2.7.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Private enrolment as percentage of Total enrolment. First level",
      path: "0.2.7.8.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Private enrolment as percentage of Total enrolment. Pre-Primary",
      path: "0.2.7.8.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Private enrolment as percentage of Total enrolment. Second level",
      path: "0.2.7.8.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Private enrolment as percentage of Total enrolment. Tertiary",
      path: "0.2.7.8.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "School Age Population by Level of Education and Gender",
      path: "0.2.7.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Last Grade Primary School age population",
      path: "0.2.7.9.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lower Secondary School age population",
      path: "0.2.7.9.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Official entrance age School age population",
      path: "0.2.7.9.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Post-Secondary School age population",
      path: "0.2.7.9.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pre-Primary education (ISCED 0) School-age population",
      path: "0.2.7.9.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Primary education (ISCED 1) School-age population",
      path: "0.2.7.9.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Secondary School age population",
      path: "0.2.7.9.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary School age population",
      path: "0.2.7.9.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Upper Secondary School age population",
      path: "0.2.7.9.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "School Life Expectancy by Level of Education",
      path: "0.2.7.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "School life expectancy ISCED 1",
      path: "0.2.7.10.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "School life expectancy ISCED 1-3",
      path: "0.2.7.10.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "School life expectancy ISCED 1-6",
      path: "0.2.7.10.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "School life expectancy ISCED 2+3",
      path: "0.2.7.10.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "School life expectancy ISCED 5+6",
      path: "0.2.7.10.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "School life expectancy Pre-primary",
      path: "0.2.7.10.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Student Teacher Ratio by Education Level",
      path: "0.2.7.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lower Secondary Pupil/teacher ratio",
      path: "0.2.7.11.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pre-Primary education (ISCED 0) Pupil-teacher ratio",
      path: "0.2.7.11.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Primary education (ISCED 1) Pupil-teacher ratio",
      path: "0.2.7.11.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Secondary Pupil/teacher ratio",
      path: "0.2.7.11.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Upper Secondary Pupil/teacher ratio",
      path: "0.2.7.11.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary Education Enrolment by Subject",
      path: "0.2.7.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Enrolment by FOS Agriculture",
      path: "0.2.7.12.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Enrolment by FOS Education",
      path: "0.2.7.12.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Enrolment by FOS Engineering Manufacturing and Construction",
      path: "0.2.7.12.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Enrolment by FOS General programmes",
      path: "0.2.7.12.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Enrolment by FOS Health and Welfare",
      path: "0.2.7.12.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Enrolment by FOS Humanities and Arts",
      path: "0.2.7.12.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Enrolment by FOS Science",
      path: "0.2.7.12.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Enrolment by FOS Services",
      path: "0.2.7.12.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Enrolment by FOS Social Sciences Business and Law",
      path: "0.2.7.12.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Enrolment by FOS Unspecified",
      path: "0.2.7.12.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary Education Graduation by Subject",
      path: "0.2.7.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Graduates by FOS Agriculture",
      path: "0.2.7.13.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Graduates by FOS Education",
      path: "0.2.7.13.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Graduates by FOS Engineering Manufacturing and Construction",
      path: "0.2.7.13.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Graduates by FOS General programmes",
      path: "0.2.7.13.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Graduates by FOS Health and Welfare",
      path: "0.2.7.13.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Graduates by FOS Humanities and Arts",
      path: "0.2.7.13.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Graduates by FOS Not known or unspecified",
      path: "0.2.7.13.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Graduates by FOS Science",
      path: "0.2.7.13.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Graduates by FOS Services",
      path: "0.2.7.13.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tertiary education (ISCED 5 and 6) Graduates by FOS Social Sciences Business and Law",
      path: "0.2.7.13.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Energy",
      path: "0.2.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption by Use",
      path: "0.2.8.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Agriculture",
      path: "0.2.8.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Briquetting Plants",
      path: "0.2.8.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Chemical Industry",
      path: "0.2.8.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coke Ovens",
      path: "0.2.8.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Petroleum Fields",
      path: "0.2.8.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Energy Sector",
      path: "0.2.8.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gasworks",
      path: "0.2.8.1.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Households",
      path: "0.2.8.1.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Households And Other Consumers",
      path: "0.2.8.1.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Industry & Construction",
      path: "0.2.8.1.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Iron And Steel Industry",
      path: "0.2.8.1.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mining Industry (energy Commodities)",
      path: "0.2.8.1.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Other Consumers",
      path: "0.2.8.1.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Other Energy Producers",
      path: "0.2.8.1.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Other Industries And Construction",
      path: "0.2.8.1.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Other Transportation",
      path: "0.2.8.1.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Petroleum Refineries",
      path: "0.2.8.1.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public Lighting",
      path: "0.2.8.1.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pump-storage Plants",
      path: "0.2.8.1.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rail Transport",
      path: "0.2.8.1.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Transportation Industry",
      path: "0.2.8.1.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Exports Breakdown",
      path: "0.2.8.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol",
      path: "0.2.8.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Aviation Gasolene",
      path: "0.2.8.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Biodiesel",
      path: "0.2.8.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bitumen Asphalt",
      path: "0.2.8.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Charcoal",
      path: "0.2.8.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coal",
      path: "0.2.8.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coke-oven Coke",
      path: "0.2.8.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Petroleum",
      path: "0.2.8.2.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dry Natural Gas",
      path: "0.2.8.2.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Electricity",
      path: "0.2.8.2.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Feedstocks",
      path: "0.2.8.2.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Fuelwood",
      path: "0.2.8.2.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gas-diesel Oils",
      path: "0.2.8.2.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Jet Fuel",
      path: "0.2.8.2.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Kerosene",
      path: "0.2.8.2.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lignite Brown Coal",
      path: "0.2.8.2.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Liquefied Petroleum Gas (lpg)",
      path: "0.2.8.2.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lubricants",
      path: "0.2.8.2.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Motor Gasolene",
      path: "0.2.8.2.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Naphtha",
      path: "0.2.8.2.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas (including Lng)",
      path: "0.2.8.2.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas Liquids (ngl) N.e.s.",
      path: "0.2.8.2.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Other Petroleum Products",
      path: "0.2.8.2.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Petroleum Coke",
      path: "0.2.8.2.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Petroleum Waxes",
      path: "0.2.8.2.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Residual Fuel Oil",
      path: "0.2.8.2.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "White Spirit/industrial Spirit",
      path: "0.2.8.2.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Fuels/Energy Types",
      path: "0.2.8.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Aviation Gasoline",
      path: "0.2.8.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bunkers",
      path: "0.2.8.3.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Transportation Industry",
      path: "0.2.8.3.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Air Transport",
      path: "0.2.8.3.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Inland Availability",
      path: "0.2.8.3.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.1.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.1.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bagasse",
      path: "0.2.8.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Thermal Power Plants",
      path: "0.2.8.3.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Inland Availability",
      path: "0.2.8.3.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Biodiesel",
      path: "0.2.8.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Road",
      path: "0.2.8.3.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Transportation Industry",
      path: "0.2.8.3.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Inland Availability",
      path: "0.2.8.3.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Production",
      path: "0.2.8.3.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.3.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Biogas",
      path: "0.2.8.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households And Other Consumers",
      path: "0.2.8.3.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Thermal Power Plants",
      path: "0.2.8.3.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Inland Availability",
      path: "0.2.8.3.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Production",
      path: "0.2.8.3.4.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.4.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bitumen Asphalt",
      path: "0.2.8.3.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks At Producers",
      path: "0.2.8.3.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption For Non-energy Uses",
      path: "0.2.8.3.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Inland Availability",
      path: "0.2.8.3.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.5.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.5.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Blast Furnace Gas",
      path: "0.2.8.3.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.6.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Iron And Steel Industry",
      path: "0.2.8.3.6.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Thermal Power Plants",
      path: "0.2.8.3.6.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.6.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.6.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.6.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Charcoal",
      path: "0.2.8.3.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households",
      path: "0.2.8.3.7.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households And Other Consumers",
      path: "0.2.8.3.7.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Consumers",
      path: "0.2.8.3.7.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.7.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Charcoal Plants",
      path: "0.2.8.3.7.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coal",
      path: "0.2.8.3.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Additional Resources",
      path: "0.2.8.3.8.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.8.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks At Importers",
      path: "0.2.8.3.8.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks At Producers",
      path: "0.2.8.3.8.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Chemical Industry",
      path: "0.2.8.3.8.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Energy Sector",
      path: "0.2.8.3.8.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households",
      path: "0.2.8.3.8.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households And Other Consumers",
      path: "0.2.8.3.8.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.8.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Iron And Steel Industry",
      path: "0.2.8.3.8.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Consumers",
      path: "0.2.8.3.8.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.8.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Transportation Industry",
      path: "0.2.8.3.8.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Coke Ovens",
      path: "0.2.8.3.8.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Thermal Power Plants",
      path: "0.2.8.3.8.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.8.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Inland Availability",
      path: "0.2.8.3.8.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.8.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.8.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Recoverable Reserves",
      path: "0.2.8.3.8.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Consumption",
      path: "0.2.8.3.8.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Known Reserves",
      path: "0.2.8.3.8.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Resources In Place",
      path: "0.2.8.3.8.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coke-oven Coke",
      path: "0.2.8.3.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.9.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.9.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Iron And Steel Industry",
      path: "0.2.8.3.9.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.9.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Blast Furnaces",
      path: "0.2.8.3.9.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.9.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.9.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.9.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coke-oven Gas",
      path: "0.2.8.3.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.10.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Iron And Steel Industry",
      path: "0.2.8.3.10.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.10.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.10.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.10.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Petroleum",
      path: "0.2.8.3.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.11.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks At Importers",
      path: "0.2.8.3.11.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks At Producers",
      path: "0.2.8.3.11.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Energy Sector",
      path: "0.2.8.3.11.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Refineries",
      path: "0.2.8.3.11.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.11.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Transfers",
      path: "0.2.8.3.11.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.11.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Off-shore",
      path: "0.2.8.3.11.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Proved Reserves",
      path: "0.2.8.3.11.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Refinery Capacity",
      path: "0.2.8.3.11.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Reserves",
      path: "0.2.8.3.11.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Reserves From Oil Shale",
      path: "0.2.8.3.11.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Reserves From Oil Shale And Tar Sands",
      path: "0.2.8.3.11.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Oil Supply",
      path: "0.2.8.3.11.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Transfers In",
      path: "0.2.8.3.11.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Feedstocks",
      path: "0.2.8.3.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.12.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Inland Availability",
      path: "0.2.8.3.12.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Transfers",
      path: "0.2.8.3.12.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Transfers In",
      path: "0.2.8.3.12.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Fuelwood",
      path: "0.2.8.3.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households",
      path: "0.2.8.3.13.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households And Other Consumers",
      path: "0.2.8.3.13.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.13.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Consumers",
      path: "0.2.8.3.13.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.13.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Other Energy-producing Plants",
      path: "0.2.8.3.13.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.13.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.13.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.13.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gas-diesel Oils",
      path: "0.2.8.3.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bunkers",
      path: "0.2.8.3.14.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.14.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks At Producers",
      path: "0.2.8.3.14.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Chemical Industry",
      path: "0.2.8.3.14.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Energy Sector",
      path: "0.2.8.3.14.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households",
      path: "0.2.8.3.14.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households And Other Consumers",
      path: "0.2.8.3.14.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.14.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Iron And Steel Industry",
      path: "0.2.8.3.14.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Consumers",
      path: "0.2.8.3.14.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.14.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Petroleum Refineries",
      path: "0.2.8.3.14.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Transportation Industry",
      path: "0.2.8.3.14.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Agriculture",
      path: "0.2.8.3.14.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Inland And Coastal Waterways",
      path: "0.2.8.3.14.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Rail Transport",
      path: "0.2.8.3.14.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Road Transport",
      path: "0.2.8.3.14.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Other Energy-producing Plants",
      path: "0.2.8.3.14.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Thermal Power Plants",
      path: "0.2.8.3.14.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.14.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.14.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Transfers",
      path: "0.2.8.3.14.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.14.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.14.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gasworks Gas",
      path: "0.2.8.3.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.15.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.15.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Jet Fuel",
      path: "0.2.8.3.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bunkers",
      path: "0.2.8.3.16.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.16.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks At Producers",
      path: "0.2.8.3.16.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Transportation Industry",
      path: "0.2.8.3.16.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Air Transport",
      path: "0.2.8.3.16.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Inland Availability",
      path: "0.2.8.3.16.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.16.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.16.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.16.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Kerosene",
      path: "0.2.8.3.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.17.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks At Producers",
      path: "0.2.8.3.17.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households",
      path: "0.2.8.3.17.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households And Other Consumers",
      path: "0.2.8.3.17.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.17.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Consumers",
      path: "0.2.8.3.17.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.17.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Agriculture",
      path: "0.2.8.3.17.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Inland Availability",
      path: "0.2.8.3.17.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.17.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.17.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.17.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lignite Brown Coal",
      path: "0.2.8.3.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Additional Resources",
      path: "0.2.8.3.18.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.18.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.18.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Thermal Power Plants",
      path: "0.2.8.3.18.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.18.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Inland Availability",
      path: "0.2.8.3.18.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.18.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.18.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Known Reserves",
      path: "0.2.8.3.18.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Liquefied Petroleum Gas",
      path: "0.2.8.3.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.19.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks At Producers",
      path: "0.2.8.3.19.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Energy Sector",
      path: "0.2.8.3.19.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households",
      path: "0.2.8.3.19.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households And Other Consumers",
      path: "0.2.8.3.19.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.19.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Consumers",
      path: "0.2.8.3.19.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.19.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Petroleum Refineries",
      path: "0.2.8.3.19.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Transportation Industry",
      path: "0.2.8.3.19.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption For Non-energy Uses",
      path: "0.2.8.3.19.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Agriculture",
      path: "0.2.8.3.19.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Road Transport",
      path: "0.2.8.3.19.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.19.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Inland Availability",
      path: "0.2.8.3.19.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.19.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Plants",
      path: "0.2.8.3.19.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.19.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.19.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lubricants",
      path: "0.2.8.3.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.20.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption For Non-energy Uses",
      path: "0.2.8.3.20.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.20.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.20.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Motor Gasolene",
      path: "0.2.8.3.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.21.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks At Producers",
      path: "0.2.8.3.21.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households And Other Consumers",
      path: "0.2.8.3.21.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.21.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Consumers",
      path: "0.2.8.3.21.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.21.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Transportation Industry",
      path: "0.2.8.3.21.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Agriculture",
      path: "0.2.8.3.21.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Road Transport",
      path: "0.2.8.3.21.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.21.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Transfers",
      path: "0.2.8.3.21.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.21.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.21.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Naphtha",
      path: "0.2.8.3.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.22.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks At Producers",
      path: "0.2.8.3.22.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.22.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption For Non-energy Uses",
      path: "0.2.8.3.22.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.22.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.22.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.22.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.22.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas (including Lng)",
      path: "0.2.8.3.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.23.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Chemical Industry",
      path: "0.2.8.3.23.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Energy Sector",
      path: "0.2.8.3.23.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households",
      path: "0.2.8.3.23.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households And Other Consumers",
      path: "0.2.8.3.23.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.23.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Iron And Steel Industry",
      path: "0.2.8.3.23.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Natural Gas Fields And Plants",
      path: "0.2.8.3.23.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Consumers",
      path: "0.2.8.3.23.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.23.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Transportation",
      path: "0.2.8.3.23.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Petroleum Refineries",
      path: "0.2.8.3.23.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Transportation Industry",
      path: "0.2.8.3.23.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption For Non-energy Uses",
      path: "0.2.8.3.23.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Agriculture",
      path: "0.2.8.3.23.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Other Energy-producing Plants",
      path: "0.2.8.3.23.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Thermal Power Plants",
      path: "0.2.8.3.23.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.23.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion Transport & Distribution Losses",
      path: "0.2.8.3.23.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dry Production",
      path: "0.2.8.3.23.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Extraction Loss Shrinkage",
      path: "0.2.8.3.23.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Flared And Vented",
      path: "0.2.8.3.23.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Production",
      path: "0.2.8.3.23.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.23.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Production",
      path: "0.2.8.3.23.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Dry Consumption",
      path: "0.2.8.3.23.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Resources",
      path: "0.2.8.3.23.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas Liquids (ngl)",
      path: "0.2.8.3.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.24.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Plant Capacity",
      path: "0.2.8.3.24.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Plant Production",
      path: "0.2.8.3.24.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas Liquids (ngl) N.e.s.",
      path: "0.2.8.3.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Refineries",
      path: "0.2.8.3.25.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.25.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.25.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Plants",
      path: "0.2.8.3.25.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Other Biomass And Wastes",
      path: "0.2.8.3.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households",
      path: "0.2.8.3.26.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households And Other Consumers",
      path: "0.2.8.3.26.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.26.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.26.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Other Petroleum Products",
      path: "0.2.8.3.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.27.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Energy Sector",
      path: "0.2.8.3.27.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.27.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.27.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption For Non-energy Uses",
      path: "0.2.8.3.27.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.27.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Transfers",
      path: "0.2.8.3.27.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.27.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.27.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Petroleum Coke",
      path: "0.2.8.3.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.28.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.28.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.28.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.28.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.28.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.28.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.28.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Petroleum Waxes",
      path: "0.2.8.3.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption For Non-energy Uses",
      path: "0.2.8.3.29.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.29.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.29.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Refinery Gas",
      path: "0.2.8.3.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Energy Sector",
      path: "0.2.8.3.30.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Petroleum Refineries",
      path: "0.2.8.3.30.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Thermal Power Plants",
      path: "0.2.8.3.30.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.30.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.30.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.30.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Residual Fuel Oil",
      path: "0.2.8.3.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bunkers",
      path: "0.2.8.3.31.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.31.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks At Producers",
      path: "0.2.8.3.31.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Chemical Industry",
      path: "0.2.8.3.31.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Energy Sector",
      path: "0.2.8.3.31.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households",
      path: "0.2.8.3.31.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households And Other Consumers",
      path: "0.2.8.3.31.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.31.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Iron And Steel Industry",
      path: "0.2.8.3.31.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Consumers",
      path: "0.2.8.3.31.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.31.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Petroleum Refineries",
      path: "0.2.8.3.31.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Transportation Industry",
      path: "0.2.8.3.31.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Agriculture",
      path: "0.2.8.3.31.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Inland And Coastal Waterways",
      path: "0.2.8.3.31.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption In Rail Transport",
      path: "0.2.8.3.31.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Other Energy-producing Plants",
      path: "0.2.8.3.31.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion In Thermal Power Plants",
      path: "0.2.8.3.31.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.31.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.31.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Transfers",
      path: "0.2.8.3.31.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.31.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.31.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Steam And Hot Water",
      path: "0.2.8.3.32"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households",
      path: "0.2.8.3.32.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households And Other Consumers",
      path: "0.2.8.3.32.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.32.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Consumers",
      path: "0.2.8.3.32.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.32.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion Transport & Distribution Losses",
      path: "0.2.8.3.32.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.32.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Steam And Hot Water (gross",
      path: "0.2.8.3.33"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production At Pure Heating Plants",
      path: "0.2.8.3.33.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production At Thermal Power Plants",
      path: "0.2.8.3.33.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Uranium",
      path: "0.2.8.3.34"
    },
    model: "Category"
  },
  {
    data: {
      name: "Estimated Additional Reserves",
      path: "0.2.8.3.34.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.34.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Vegetal Waste",
      path: "0.2.8.3.35"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Households And Other Consumers",
      path: "0.2.8.3.35.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Industry & Construction",
      path: "0.2.8.3.35.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption By Other Industries And Construction",
      path: "0.2.8.3.35.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Conversion To Other Forms Of Energy",
      path: "0.2.8.3.35.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Inland Availability",
      path: "0.2.8.3.35.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production",
      path: "0.2.8.3.35.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "White Spirit/industrial Spirit",
      path: "0.2.8.3.36"
    },
    model: "Category"
  },
  {
    data: {
      name: "Changes In Stocks",
      path: "0.2.8.3.36.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption For Non-energy Uses",
      path: "0.2.8.3.36.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Production From Refineries",
      path: "0.2.8.3.36.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production",
      path: "0.2.8.3.36.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Imports Breakdown",
      path: "0.2.8.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol",
      path: "0.2.8.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Aviation Gasolene",
      path: "0.2.8.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Biodiesel",
      path: "0.2.8.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bitumen Asphalt",
      path: "0.2.8.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Charcoal",
      path: "0.2.8.4.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coal",
      path: "0.2.8.4.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coke-oven Coke",
      path: "0.2.8.4.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Petroleum",
      path: "0.2.8.4.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dry Natural Gas",
      path: "0.2.8.4.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Electricity",
      path: "0.2.8.4.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Feedstocks",
      path: "0.2.8.4.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Fuelwood",
      path: "0.2.8.4.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gas-diesel Oils",
      path: "0.2.8.4.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Jet Fuel",
      path: "0.2.8.4.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Kerosene",
      path: "0.2.8.4.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lignite Brown Coal",
      path: "0.2.8.4.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lignite-brown Coal Briquettes",
      path: "0.2.8.4.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Liquefied Petroleum Gas (lpg)",
      path: "0.2.8.4.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lubricants",
      path: "0.2.8.4.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Motor Gasolene",
      path: "0.2.8.4.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Naphtha",
      path: "0.2.8.4.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas (including Lng)",
      path: "0.2.8.4.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Other Petroleum Products",
      path: "0.2.8.4.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Petroleum Coke",
      path: "0.2.8.4.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Petroleum Waxes",
      path: "0.2.8.4.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Residual Fuel Oil",
      path: "0.2.8.4.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "White Spirit/industrial Spirit",
      path: "0.2.8.4.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Capacity by Plant Type",
      path: "0.2.8.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public Geothermal",
      path: "0.2.8.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public Hydro",
      path: "0.2.8.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public Nuclear",
      path: "0.2.8.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public Solar",
      path: "0.2.8.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public Thermal",
      path: "0.2.8.5.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public Wind",
      path: "0.2.8.5.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Self-producer Hydro",
      path: "0.2.8.5.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Self-producer Solar",
      path: "0.2.8.5.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Self-producer Thermal",
      path: "0.2.8.5.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Self-producer Wind",
      path: "0.2.8.5.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Overview",
      path: "0.2.8.6"
    },
    model: "Category"
  },
  {
    data: {
      name: " Total Production Public",
      path: "0.2.8.6.1"
    },
    model: "Category"
  },
  {
    data: {
      name: " Total Production Self-producer",
      path: "0.2.8.6.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Exports",
      path: "0.2.8.6.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Inland Availability",
      path: "0.2.8.6.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross Production Public & Self-producer",
      path: "0.2.8.6.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Imports",
      path: "0.2.8.6.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Consumption",
      path: "0.2.8.6.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net Generation",
      path: "0.2.8.6.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total Production by Energy Type",
      path: "0.2.8.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Biofuels",
      path: "0.2.8.7.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nuclear",
      path: "0.2.8.7.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Solar",
      path: "0.2.8.7.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Thermal",
      path: "0.2.8.7.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tidal Wave",
      path: "0.2.8.7.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Wind",
      path: "0.2.8.7.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Health",
      path: "0.2.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol and Tobacco",
      path: "0.2.9.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Abstainers from Alcohol",
      path: "0.2.9.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Abstainers 18 24 years lifetime",
      path: "0.2.9.1.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Abstainers 18 24 years lifetime female",
      path: "0.2.9.1.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Abstainers 18 24 years lifetime male",
      path: "0.2.9.1.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Abstainers 18 24 years past 12 months",
      path: "0.2.9.1.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Abstainers 18 24 years past 12 months female",
      path: "0.2.9.1.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Abstainers 18 24 years past 12 months male",
      path: "0.2.9.1.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Abstainers lifetime",
      path: "0.2.9.1.1.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Abstainers lifetime female",
      path: "0.2.9.1.1.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Abstainers lifetime male",
      path: "0.2.9.1.1.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Abstainers past 12 months",
      path: "0.2.9.1.1.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Abstainers past 12 months female",
      path: "0.2.9.1.1.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Abstainers past 12 months male",
      path: "0.2.9.1.1.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age Limits",
      path: "0.2.9.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age limits off premise sales beer",
      path: "0.2.9.1.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age limits off premise sales spirits",
      path: "0.2.9.1.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age limits off premise sales wine",
      path: "0.2.9.1.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age limits on premise service beer",
      path: "0.2.9.1.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age limits on premise service spirits",
      path: "0.2.9.1.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age limits on premise service wine",
      path: "0.2.9.1.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol Consumption",
      path: "0.2.9.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol consumption among adults aged over 15 years litres of pure alcohol per person per year",
      path: "0.2.9.1.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Legal blood alcohol concentration bac limits",
      path: "0.2.9.1.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Projected alcohol consumption per capita",
      path: "0.2.9.1.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total recorded unrecorded adult 15 years per capita consumption",
      path: "0.2.9.1.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total recorded unrecorded adult 15 years per capita consumption drinkers only",
      path: "0.2.9.1.3.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total recorded unrecorded adult 15 years per capita consumption drinkers only female",
      path: "0.2.9.1.3.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total recorded unrecorded adult 15 years per capita consumption drinkers only male",
      path: "0.2.9.1.3.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tourist consumption in litres of pure alcohol",
      path: "0.2.9.1.3.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol Costs",
      path: "0.2.9.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Average prices in us 500 mls discount beer",
      path: "0.2.9.1.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Average prices in us 500 mls premium beer",
      path: "0.2.9.1.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Average prices in us 750 mls imported spirits",
      path: "0.2.9.1.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Average prices in us 750 mls locally produced spirits",
      path: "0.2.9.1.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Average prices in us 750 mls table wine",
      path: "0.2.9.1.4.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol Finance",
      path: "0.2.9.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol expenditure as a per cent of total household expenditure",
      path: "0.2.9.1.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcoholic beverage tax revenue as a per cent of government revenue",
      path: "0.2.9.1.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Annual revenues from alcohol excise tax in millions us",
      path: "0.2.9.1.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Excise duty average per hectolitre in euros beer",
      path: "0.2.9.1.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Excise duty average per hectolitre in euros spirits",
      path: "0.2.9.1.5.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Excise duty average per hectolitre in euros wine",
      path: "0.2.9.1.5.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Excise tax as a per cent of the retail price of alcoholic beverages beer",
      path: "0.2.9.1.5.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Excise tax as a per cent of the retail price of alcoholic beverages spirits",
      path: "0.2.9.1.5.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Excise tax as a per cent of the retail price of alcoholic beverages wine",
      path: "0.2.9.1.5.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Excise tax as a per cent of the total retail price for 1 litre of pure alcohol",
      path: "0.2.9.1.5.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Public funds designated for alcohol research monitoring programmes in euros",
      path: "0.2.9.1.5.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Social costs of alcohol use in millions us direct health costs",
      path: "0.2.9.1.5.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Social costs of alcohol use in millions us direct law costs",
      path: "0.2.9.1.5.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Social costs of alcohol use in millions us direct other costs",
      path: "0.2.9.1.5.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Social costs of alcohol use in millions us indirect costs",
      path: "0.2.9.1.5.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Social costs of alcohol use in millions us total costs",
      path: "0.2.9.1.5.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Value added tax vat",
      path: "0.2.9.1.5.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alohol Related Crimes",
      path: "0.2.9.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cautions and arrests for drink driving per 100000 licensed drivers 15 years",
      path: "0.2.9.1.6.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cautions and arrests for public drunkenness rate per 100000",
      path: "0.2.9.1.6.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Road traffic accidents involving alcohol of all traffic crashes",
      path: "0.2.9.1.6.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Road traffic accidents involving alcohol per 100000",
      path: "0.2.9.1.6.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Road traffic fatalities involving alcohol of all road traffic fatalities",
      path: "0.2.9.1.6.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption Per Capita by Beverage",
      path: "0.2.9.1.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Recorded adult 15 years per capita consumption in litres of pure alcohol",
      path: "0.2.9.1.7.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Recorded adult 15 years per capita consumption in litres of pure alcohol beer",
      path: "0.2.9.1.7.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Recorded adult 15 years per capita consumption in litres of pure alcohol other alcoholic beverages",
      path: "0.2.9.1.7.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Recorded adult 15 years per capita consumption in litres of pure alcohol spirits",
      path: "0.2.9.1.7.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Recorded adult 15 years per capita consumption in litres of pure alcohol wine",
      path: "0.2.9.1.7.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption by Beverage",
      path: "0.2.9.1.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption of pure alcohol by type of beverage beer",
      path: "0.2.9.1.8.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption of pure alcohol by type of beverage other alcoholic beverages",
      path: "0.2.9.1.8.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption of pure alcohol by type of beverage spirits",
      path: "0.2.9.1.8.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Consumption of pure alcohol by type of beverage wine",
      path: "0.2.9.1.8.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current Tobacco Smokers (crude)",
      path: "0.2.9.1.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smoking of any tobacco product crude rate",
      path: "0.2.9.1.9.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smoking of any tobacco product crude rate female",
      path: "0.2.9.1.9.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smoking of any tobacco product crude rate male",
      path: "0.2.9.1.9.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smoking of cigarettes crude rate",
      path: "0.2.9.1.9.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smoking of cigarettes crude rate female",
      path: "0.2.9.1.9.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smoking of cigarettes crude rate male",
      path: "0.2.9.1.9.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current users of any smokeless tobacco product crude rate",
      path: "0.2.9.1.9.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current users of any smokeless tobacco product crude rate female",
      path: "0.2.9.1.9.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current users of any smokeless tobacco product crude rate male",
      path: "0.2.9.1.9.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Daily Tobacco Smokers (age-standardized)",
      path: "0.2.9.1.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Daily smoking of any tobacco product age standardized rate",
      path: "0.2.9.1.10.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Daily smoking of any tobacco product age standardized rate female",
      path: "0.2.9.1.10.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Daily smoking of any tobacco product age standardized rate male",
      path: "0.2.9.1.10.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Daily smoking of cigarettes age standardized rate",
      path: "0.2.9.1.10.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Daily smoking of cigarettes age standardized rate female",
      path: "0.2.9.1.10.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Daily smoking of cigarettes age standardized rate male",
      path: "0.2.9.1.10.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Exposure",
      path: "0.2.9.1.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Exposure to smoke at home",
      path: "0.2.9.1.11.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Exposure to smoke at home female",
      path: "0.2.9.1.11.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Exposure to smoke at home male",
      path: "0.2.9.1.11.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Exposure to smoke outside home",
      path: "0.2.9.1.11.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Exposure to smoke outside home female",
      path: "0.2.9.1.11.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Exposure to smoke outside home male",
      path: "0.2.9.1.11.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Health Effects of Alcohol",
      path: "0.2.9.1.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol dependence 18 65 years 12 month prevalence female",
      path: "0.2.9.1.12.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol dependence 18 65 years 12 month prevalence male",
      path: "0.2.9.1.12.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol use disorders point prevalence female",
      path: "0.2.9.1.12.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol use disorders point prevalence male",
      path: "0.2.9.1.12.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol related disease mortality per 100000 15 years",
      path: "0.2.9.1.12.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol related disease mortality per 100000 15 years female",
      path: "0.2.9.1.12.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol related disease mortality per 100000 15 years male",
      path: "0.2.9.1.12.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcoholic psychosis incidence per 100000",
      path: "0.2.9.1.12.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hospital discharges alcohol related injuries and poisoning per 100000",
      path: "0.2.9.1.12.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hospital discharges alcoholic liver disease per 100000",
      path: "0.2.9.1.12.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Treatment admissions inpatient alcohol dependence per 100000",
      path: "0.2.9.1.12.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Treatment admissions inpatient alcoholic psychosis per 100000",
      path: "0.2.9.1.12.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Prevalence",
      path: "0.2.9.1.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol consumers past 12 months",
      path: "0.2.9.1.13.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol consumers past 12 months female",
      path: "0.2.9.1.13.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol consumers past 12 months male",
      path: "0.2.9.1.13.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Former drinkers",
      path: "0.2.9.1.13.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Former drinkers female",
      path: "0.2.9.1.13.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Former drinkers male",
      path: "0.2.9.1.13.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Heavy episodic drinking weekly female",
      path: "0.2.9.1.13.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Heavy episodic drinking weekly male",
      path: "0.2.9.1.13.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Taxes on Most Sold Brand of Cigarettes as Percent of Price",
      path: "0.2.9.1.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Most sold brand of cigarettes taxes as a of price ad valorem excise",
      path: "0.2.9.1.14.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Most sold brand of cigarettes taxes as a of price import duties",
      path: "0.2.9.1.14.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Most sold brand of cigarettes taxes as a of price other taxes",
      path: "0.2.9.1.14.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Most sold brand of cigarettes taxes as a of price specific excise",
      path: "0.2.9.1.14.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Most sold brand of cigarettes taxes as a of price total tax",
      path: "0.2.9.1.14.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Most sold brand of cigarettes taxes as a of price value added tax",
      path: "0.2.9.1.14.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tobacco",
      path: "0.2.9.1.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smoking of any tobacco product age standardized rate",
      path: "0.2.9.1.15.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smoking of any tobacco product age standardized rate female",
      path: "0.2.9.1.15.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smoking of any tobacco product age standardized rate male",
      path: "0.2.9.1.15.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current users of any tobacco product youth rate",
      path: "0.2.9.1.15.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current users of any tobacco product youth rate female",
      path: "0.2.9.1.15.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current users of any tobacco product youth rate male",
      path: "0.2.9.1.15.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tobacco Prices",
      path: "0.2.9.1.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cheapest brand of cigarettes price in us at official exchange rates",
      path: "0.2.9.1.16.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cheapest brand of cigarettes price in currency reported",
      path: "0.2.9.1.16.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cheapest brand of cigarettes price in international dollars",
      path: "0.2.9.1.16.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Most sold brand of bidis price in us at official exchange rates",
      path: "0.2.9.1.16.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Most sold brand of bidis price in currency reported",
      path: "0.2.9.1.16.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Most sold brand of bidis price in international dollars",
      path: "0.2.9.1.16.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Most sold brand of cigarettes price in us at official exchange rates",
      path: "0.2.9.1.16.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Most sold brand of cigarettes price in currency reported",
      path: "0.2.9.1.16.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Most sold brand of cigarettes price in international dollars",
      path: "0.2.9.1.16.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tobacco Regulation",
      path: "0.2.9.1.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Annual budget for tobacco control in us at official exchange rate",
      path: "0.2.9.1.17.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of health warnings approved by the law for cigarette packaging",
      path: "0.2.9.1.17.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of health warnings approved by the law for smokeless tobacco packaging",
      path: "0.2.9.1.17.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percentage of principal display area mandated to be covered by health warnings back of cigarette packaging",
      path: "0.2.9.1.17.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percentage of principal display area mandated to be covered by health warnings back of smokeless tobacco packaging",
      path: "0.2.9.1.17.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percentage of principal display area mandated to be covered by health warnings front and back of cigarette packaging",
      path: "0.2.9.1.17.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percentage of principal display area mandated to be covered by health warnings front and back of smokeless tobacco packaging",
      path: "0.2.9.1.17.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percentage of principal display area mandated to be covered by health warnings front of cigarette packaging",
      path: "0.2.9.1.17.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Percentage of principal display area mandated to be covered by health warnings front of smokeless tobacco packaging",
      path: "0.2.9.1.17.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Youth Rates",
      path: "0.2.9.1.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smokers of cigarettes youth rate",
      path: "0.2.9.1.18.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smokers of cigarettes youth rate female",
      path: "0.2.9.1.18.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smokers of cigarettes youth rate male",
      path: "0.2.9.1.18.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Main Health Indicators",
      path: "0.2.9.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol and Tobacco",
      path: "0.2.9.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Alcohol consumption among adults aged 15 years litres of pure alcohol per person per year",
      path: "0.2.9.2.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smoking of any tobacco product age standardized rate",
      path: "0.2.9.2.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smoking of any tobacco product age standardized rate female",
      path: "0.2.9.2.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current smoking of any tobacco product age standardized rate male",
      path: "0.2.9.2.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Current users of any tobacco product youth rate",
      path: "0.2.9.2.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Projected alcohol consumption per capita",
      path: "0.2.9.2.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Child Care",
      path: "0.2.9.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 6 59 months who received vitamin a supplementation",
      path: "0.2.9.2.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years sleeping under insecticide treated nets",
      path: "0.2.9.2.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years sleeping under insecticide treated nets urban",
      path: "0.2.9.2.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years with ari symptoms taken to a health facility",
      path: "0.2.9.2.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years with ari symptoms who took antibiotic treatment",
      path: "0.2.9.2.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years with diarrhoea receiving ort",
      path: "0.2.9.2.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years with fever who received treatment with any antimalarial",
      path: "0.2.9.2.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years with fever who received treatment with any antimalarial rural",
      path: "0.2.9.2.2.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years with fever who received treatment with any antimalarial urban",
      path: "0.2.9.2.2.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Child Growth",
      path: "0.2.9.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years overweight",
      path: "0.2.9.2.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years overweight female",
      path: "0.2.9.2.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years overweight male",
      path: "0.2.9.2.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years stunted",
      path: "0.2.9.2.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years stunted female",
      path: "0.2.9.2.3.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years stunted male",
      path: "0.2.9.2.3.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years underweight",
      path: "0.2.9.2.3.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years underweight female",
      path: "0.2.9.2.3.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Children aged 5 years underweight male",
      path: "0.2.9.2.3.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Demographic Indicators",
      path: "0.2.9.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Annual population growth rate",
      path: "0.2.9.2.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cellular subscribers per 100 population",
      path: "0.2.9.2.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Civil registration coverage of births",
      path: "0.2.9.2.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Civil registration coverage of cause of death",
      path: "0.2.9.2.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude birth rate per 1000 population",
      path: "0.2.9.2.4.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude death rate per 1000 population",
      path: "0.2.9.2.4.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gross national income per capita ppp int",
      path: "0.2.9.2.4.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ill defined causes in cause of death registration",
      path: "0.2.9.2.4.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Literacy rate among adults aged 15 years",
      path: "0.2.9.2.4.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net primary school enrolment ratio female",
      path: "0.2.9.2.4.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Net primary school enrolment ratio male",
      path: "0.2.9.2.4.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population in thousands total",
      path: "0.2.9.2.4.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population living in urban areas",
      path: "0.2.9.2.4.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population living on 1 ppp int a day",
      path: "0.2.9.2.4.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population median age years",
      path: "0.2.9.2.4.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population proportion over 60",
      path: "0.2.9.2.4.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Population proportion under 15",
      path: "0.2.9.2.4.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total fertility rate per woman",
      path: "0.2.9.2.4.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Density of Medical Personel",
      path: "0.2.9.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Community and traditional health workers density per 1000 population",
      path: "0.2.9.2.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dentistry personnel density density per 1000 population",
      path: "0.2.9.2.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Environmental and public health workers density per 1000 population",
      path: "0.2.9.2.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Health management support workers density per 1000 population",
      path: "0.2.9.2.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Laboratory health workers density per 1000 population",
      path: "0.2.9.2.5.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nursing and midwifery personnel density per 1000 population",
      path: "0.2.9.2.5.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Other health workers density per 1000 population",
      path: "0.2.9.2.5.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pharmaceutical personnel density per 1000 population",
      path: "0.2.9.2.5.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Physicians density per 1000 population",
      path: "0.2.9.2.5.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Density of Medical Services",
      path: "0.2.9.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hospital beds per 10 000 population",
      path: "0.2.9.2.6.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mental hospitals per 100000",
      path: "0.2.9.2.6.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total density per 100 000 population district rural hospitals",
      path: "0.2.9.2.6.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total density per 100 000 population health centres",
      path: "0.2.9.2.6.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total density per 100 000 population health posts",
      path: "0.2.9.2.6.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total density per 100 000 population provincial hospitals",
      path: "0.2.9.2.6.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total density per 100 000 population specialized hospitals",
      path: "0.2.9.2.6.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total density per million females aged from 50 to 69 years old mammographs",
      path: "0.2.9.2.6.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total density per million population computed tomography",
      path: "0.2.9.2.6.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total density per million population gamma camera or nuclear medicine",
      path: "0.2.9.2.6.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total density per million population linear accelerator",
      path: "0.2.9.2.6.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total density per million population magnetic resonance imaging",
      path: "0.2.9.2.6.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total density per million population positron emission tomography",
      path: "0.2.9.2.6.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total density per million population radiotherapy",
      path: "0.2.9.2.6.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total density per million population telecobalt unit",
      path: "0.2.9.2.6.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Disease Prevention",
      path: "0.2.9.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bcg immunization coverage among 1 year olds",
      path: "0.2.9.2.7.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Case detection rate for all forms of tuberculosis",
      path: "0.2.9.2.7.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Diphtheria tetanus toxoid and pertussis dtp3 immunization coverage among 1 year olds",
      path: "0.2.9.2.7.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hepatitis b hepb3 immunization coverage among 1 year olds",
      path: "0.2.9.2.7.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hib hib3 immunization coverage among 1 year olds",
      path: "0.2.9.2.7.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Measles mcv immunization coverage among 1 year olds",
      path: "0.2.9.2.7.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Neonates protected at birth against neonatal tetanus pab",
      path: "0.2.9.2.7.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Polio pol3 immunization coverage among 1 year olds",
      path: "0.2.9.2.7.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Smear positive tuberculosis treatment success rate",
      path: "0.2.9.2.7.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Family Care",
      path: "0.2.9.2.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Adolescent fertility rate per 1000 girls aged 15 19 years",
      path: "0.2.9.2.8.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Antenatal care coverage at least four visits",
      path: "0.2.9.2.8.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Antenatal care coverage at least one visit",
      path: "0.2.9.2.8.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Antenatal care coverage at least one visit among girls aged 15 19",
      path: "0.2.9.2.8.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Births attended by skilled health personnel",
      path: "0.2.9.2.8.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Births attended by skilled health personnel among girls aged 15 19",
      path: "0.2.9.2.8.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Births by caesarean section",
      path: "0.2.9.2.8.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Contraceptive prevalence",
      path: "0.2.9.2.8.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Contraceptive prevalence among girls aged 15 19",
      path: "0.2.9.2.8.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Estimated percentage of pregnant women living with hiv who received antiretrovirals for preventing mother to child transmission",
      path: "0.2.9.2.8.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Postnatal care visit within two days of birth",
      path: "0.2.9.2.8.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Unmet need for family planning",
      path: "0.2.9.2.8.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Unmet need for family planning among girls aged 15 19",
      path: "0.2.9.2.8.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "General Population Health (Age Standardized)",
      path: "0.2.9.2.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bmi 25 age standardized estimate",
      path: "0.2.9.2.9.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bmi 30 age standardized estimate",
      path: "0.2.9.2.9.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Insufficiently active age standardized estimate",
      path: "0.2.9.2.9.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mean bmi kg m2 age standardized estimate female",
      path: "0.2.9.2.9.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mean bmi kg m2 age standardized estimate male",
      path: "0.2.9.2.9.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Raised blood pressure sbp 140 or dbp 90 or on medication age standardized estimate",
      path: "0.2.9.2.9.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Raised total cholesterol 5 0 mmol l age standardized estimate",
      path: "0.2.9.2.9.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Raised total cholesterol 6 2 mmol l age standardized estimate",
      path: "0.2.9.2.9.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Health Expenditure",
      path: "0.2.9.2.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "External resources for health as a percentage of total expenditure on health",
      path: "0.2.9.2.10.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "General government expenditure on health as a percentage of total expenditure on health",
      path: "0.2.9.2.10.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "General government expenditure on health as a percentage of total government expenditure",
      path: "0.2.9.2.10.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Median availability of selected generic medicines private",
      path: "0.2.9.2.10.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Median availability of selected generic medicines public",
      path: "0.2.9.2.10.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Median consumer price ratio of selected generic medicines private",
      path: "0.2.9.2.10.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Median consumer price ratio of selected generic medicines public",
      path: "0.2.9.2.10.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Out of pocket expenditure as a percentage of private expenditure on health",
      path: "0.2.9.2.10.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Per capita government expenditure on health ppp int",
      path: "0.2.9.2.10.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Per capita government expenditure on health at average exchange rate us",
      path: "0.2.9.2.10.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Per capita total expenditure on health ppp int",
      path: "0.2.9.2.10.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Per capita total expenditure on health at average exchange rate us",
      path: "0.2.9.2.10.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Private expenditure on health as a percentage of total expenditure on health",
      path: "0.2.9.2.10.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Private prepaid plans as a percentage of private expenditure on health",
      path: "0.2.9.2.10.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Social security expenditure on health as a percentage of general government expenditure on health",
      path: "0.2.9.2.10.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total expenditure on health as a percentage of gross domestic product",
      path: "0.2.9.2.10.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mortality",
      path: "0.2.9.2.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Infant mortality rate",
      path: "0.2.9.2.11.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life expectancy at age 60 years",
      path: "0.2.9.2.11.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life expectancy at birth years",
      path: "0.2.9.2.11.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Under five mortality rate",
      path: "0.2.9.2.11.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of Health Workers",
      path: "0.2.9.2.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of community and traditional health workers",
      path: "0.2.9.2.12.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of community health workers",
      path: "0.2.9.2.12.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of dental technicians assistants",
      path: "0.2.9.2.12.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of dentistry personnel",
      path: "0.2.9.2.12.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of environment and public health workers",
      path: "0.2.9.2.12.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of health management support workers",
      path: "0.2.9.2.12.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of laboratory health workers",
      path: "0.2.9.2.12.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of laboratory scientists",
      path: "0.2.9.2.12.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of laboratory technicians assistants",
      path: "0.2.9.2.12.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of nursing and midwifery personnel",
      path: "0.2.9.2.12.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of other health workers",
      path: "0.2.9.2.12.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of personal care workers",
      path: "0.2.9.2.12.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of pharmaceutical personnel",
      path: "0.2.9.2.12.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of pharmaceutical technicians assistants",
      path: "0.2.9.2.12.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of traditional birth attendants",
      path: "0.2.9.2.12.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of traditional medicine practitioners",
      path: "0.2.9.2.12.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mortality",
      path: "0.2.9.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age Standardized DALYs",
      path: "0.2.9.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys alcohol use disorders per 100000",
      path: "0.2.9.3.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys alcohol use disorders per 100000 female",
      path: "0.2.9.3.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys alcohol use disorders per 100000 male",
      path: "0.2.9.3.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys breast cancer per 100000",
      path: "0.2.9.3.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys breast cancer per 100000 female",
      path: "0.2.9.3.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys breast cancer per 100000 male",
      path: "0.2.9.3.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys cerebrovascular disease per 100000",
      path: "0.2.9.3.1.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys cerebrovascular disease per 100000 female",
      path: "0.2.9.3.1.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys cerebrovascular disease per 100000 male",
      path: "0.2.9.3.1.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys colon and rectum cancers per 100000",
      path: "0.2.9.3.1.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys colon and rectum cancers per 100000 female",
      path: "0.2.9.3.1.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys colon and rectum cancers per 100000 male",
      path: "0.2.9.3.1.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys diabetes mellitus per 100000",
      path: "0.2.9.3.1.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys diabetes mellitus per 100000 female",
      path: "0.2.9.3.1.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys diabetes mellitus per 100000 male",
      path: "0.2.9.3.1.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys drownings per 100000",
      path: "0.2.9.3.1.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys drownings per 100000 female",
      path: "0.2.9.3.1.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys drownings per 100000 male",
      path: "0.2.9.3.1.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys falls per 100000",
      path: "0.2.9.3.1.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys falls per 100000 female",
      path: "0.2.9.3.1.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys falls per 100000 male",
      path: "0.2.9.3.1.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys fires per 100000",
      path: "0.2.9.3.1.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys fires per 100000 female",
      path: "0.2.9.3.1.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys fires per 100000 male",
      path: "0.2.9.3.1.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys ischaemic heart disease per 100000",
      path: "0.2.9.3.1.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys ischaemic heart disease per 100000 female",
      path: "0.2.9.3.1.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys ischaemic heart disease per 100000 male",
      path: "0.2.9.3.1.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys liver cancer per 100000",
      path: "0.2.9.3.1.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys liver cancer per 100000 female",
      path: "0.2.9.3.1.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys liver cancer per 100000 male",
      path: "0.2.9.3.1.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys liver cirrhosis per 100000",
      path: "0.2.9.3.1.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys liver cirrhosis per 100000 female",
      path: "0.2.9.3.1.32"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys liver cirrhosis per 100000 male",
      path: "0.2.9.3.1.33"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys mouth and oropharynx cancer per 100000",
      path: "0.2.9.3.1.34"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys mouth and oropharynx cancer per 100000 female",
      path: "0.2.9.3.1.35"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys mouth and oropharynx cancer per 100000 male",
      path: "0.2.9.3.1.36"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys oesophagus cancer per 100000",
      path: "0.2.9.3.1.37"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys oesophagus cancer per 100000 female",
      path: "0.2.9.3.1.38"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys oesophagus cancer per 100000 male",
      path: "0.2.9.3.1.39"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys other unintentional injuries per 100000",
      path: "0.2.9.3.1.40"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys other unintentional injuries per 100000 female",
      path: "0.2.9.3.1.41"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys other unintentional injuries per 100000 male",
      path: "0.2.9.3.1.42"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys poisoning per 100000",
      path: "0.2.9.3.1.43"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys poisoning per 100000 female",
      path: "0.2.9.3.1.44"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys poisoning per 100000 male",
      path: "0.2.9.3.1.45"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys prematurity and low birth rate per 100000",
      path: "0.2.9.3.1.46"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys prematurity and low birth rate per 100000 female",
      path: "0.2.9.3.1.47"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys prematurity and low birth rate per 100000 male",
      path: "0.2.9.3.1.48"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys road traffic accidents per 100000",
      path: "0.2.9.3.1.49"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys road traffic accidents per 100000 female",
      path: "0.2.9.3.1.50"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys road traffic accidents per 100000 male",
      path: "0.2.9.3.1.51"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys self inflicted injury per 100000",
      path: "0.2.9.3.1.52"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys self inflicted injury per 100000 female",
      path: "0.2.9.3.1.53"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys self inflicted injury per 100000 male",
      path: "0.2.9.3.1.54"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys violence per 100000",
      path: "0.2.9.3.1.55"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys violence per 100000 female",
      path: "0.2.9.3.1.56"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized dalys violence per 100000 male",
      path: "0.2.9.3.1.57"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age Standardized Death Rates",
      path: "0.2.9.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years alcoholic liver disease per 100000",
      path: "0.2.9.3.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years alcoholic liver disease per 100000 female",
      path: "0.2.9.3.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years alcoholic liver disease per 100000 male",
      path: "0.2.9.3.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years liver cirrhosis per 100000",
      path: "0.2.9.3.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years liver cirrhosis per 100000 female",
      path: "0.2.9.3.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years liver cirrhosis per 100000 male",
      path: "0.2.9.3.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years poisoning per 100000",
      path: "0.2.9.3.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years poisoning per 100000 female",
      path: "0.2.9.3.2.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years poisoning per 100000 male",
      path: "0.2.9.3.2.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years road traffic accidents per 100000",
      path: "0.2.9.3.2.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years road traffic accidents per 100000 female",
      path: "0.2.9.3.2.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years road traffic accidents per 100000 male",
      path: "0.2.9.3.2.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years violence per 100000",
      path: "0.2.9.3.2.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years violence per 100000 female",
      path: "0.2.9.3.2.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates 15 years violence per 100000 male",
      path: "0.2.9.3.2.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates alcohol use disorders per 100000",
      path: "0.2.9.3.2.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates alcohol use disorders per 100000 female",
      path: "0.2.9.3.2.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates alcohol use disorders per 100000 male",
      path: "0.2.9.3.2.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates breast cancer per 100000",
      path: "0.2.9.3.2.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates breast cancer per 100000 female",
      path: "0.2.9.3.2.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates breast cancer per 100000 male",
      path: "0.2.9.3.2.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates cerebrovascular disease per 100000",
      path: "0.2.9.3.2.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates cerebrovascular disease per 100000 female",
      path: "0.2.9.3.2.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates cerebrovascular disease per 100000 male",
      path: "0.2.9.3.2.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates colon and rectum cancers per 100000",
      path: "0.2.9.3.2.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates colon and rectum cancers per 100000 female",
      path: "0.2.9.3.2.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates colon and rectum cancers per 100000 male",
      path: "0.2.9.3.2.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates diabetes mellitus per 100000",
      path: "0.2.9.3.2.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates diabetes mellitus per 100000 female",
      path: "0.2.9.3.2.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates diabetes mellitus per 100000 male",
      path: "0.2.9.3.2.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates drownings per 100000",
      path: "0.2.9.3.2.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates drownings per 100000 female",
      path: "0.2.9.3.2.32"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates drownings per 100000 male",
      path: "0.2.9.3.2.33"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates falls per 100000",
      path: "0.2.9.3.2.34"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates falls per 100000 female",
      path: "0.2.9.3.2.35"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates falls per 100000 male",
      path: "0.2.9.3.2.36"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates fires per 100000",
      path: "0.2.9.3.2.37"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates fires per 100000 female",
      path: "0.2.9.3.2.38"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates fires per 100000 male",
      path: "0.2.9.3.2.39"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates ischaemic heart disease per 100000",
      path: "0.2.9.3.2.40"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates ischaemic heart disease per 100000 female",
      path: "0.2.9.3.2.41"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates ischaemic heart disease per 100000 male",
      path: "0.2.9.3.2.42"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates liver cancer per 100000",
      path: "0.2.9.3.2.43"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates liver cancer per 100000 female",
      path: "0.2.9.3.2.44"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates liver cancer per 100000 male",
      path: "0.2.9.3.2.45"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates liver cirrhosis per 100000",
      path: "0.2.9.3.2.46"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates liver cirrhosis per 100000 female",
      path: "0.2.9.3.2.47"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates liver cirrhosis per 100000 male",
      path: "0.2.9.3.2.48"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates mouth and oropharynx cancer per 100000",
      path: "0.2.9.3.2.49"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates mouth and oropharynx cancer per 100000 female",
      path: "0.2.9.3.2.50"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates mouth and oropharynx cancer per 100000 male",
      path: "0.2.9.3.2.51"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates oesophagus cancer per 100000",
      path: "0.2.9.3.2.52"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates oesophagus cancer per 100000 female",
      path: "0.2.9.3.2.53"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates oesophagus cancer per 100000 male",
      path: "0.2.9.3.2.54"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates other unintentional injuries per 100000",
      path: "0.2.9.3.2.55"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates other unintentional injuries per 100000 female",
      path: "0.2.9.3.2.56"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates other unintentional injuries per 100000 male",
      path: "0.2.9.3.2.57"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates poisoning per 100000",
      path: "0.2.9.3.2.58"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates poisoning per 100000 female",
      path: "0.2.9.3.2.59"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates poisoning per 100000 male",
      path: "0.2.9.3.2.60"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates prematurity and low birth rate per 100000",
      path: "0.2.9.3.2.61"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates prematurity and low birth rate per 100000 female",
      path: "0.2.9.3.2.62"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates prematurity and low birth rate per 100000 male",
      path: "0.2.9.3.2.63"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates road traffic accidents per 100000",
      path: "0.2.9.3.2.64"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates road traffic accidents per 100000 female",
      path: "0.2.9.3.2.65"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates road traffic accidents per 100000 male",
      path: "0.2.9.3.2.66"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates self inflicted injury per 100000",
      path: "0.2.9.3.2.67"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates self inflicted injury per 100000 female",
      path: "0.2.9.3.2.68"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates self inflicted injury per 100000 male",
      path: "0.2.9.3.2.69"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates violence per 100000",
      path: "0.2.9.3.2.70"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates violence per 100000 female",
      path: "0.2.9.3.2.71"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized death rates violence per 100000 male",
      path: "0.2.9.3.2.72"
    },
    model: "Category"
  },
  {
    data: {
      name: "Child Mortality Overview",
      path: "0.2.9.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Infant mortality rate",
      path: "0.2.9.3.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Neonatal mortality rate per 1000 live births",
      path: "0.2.9.3.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of infant deaths thousands",
      path: "0.2.9.3.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of neonatal deaths thousands",
      path: "0.2.9.3.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of under five deaths thousands",
      path: "0.2.9.3.3.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Stillbirth rate per 1000 total births",
      path: "0.2.9.3.3.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Under five mortality rate",
      path: "0.2.9.3.3.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Deaths Due to Disease",
      path: "0.2.9.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Deaths due to hiv aids per 100 000 population",
      path: "0.2.9.3.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Deaths due to malaria per 100 000 population",
      path: "0.2.9.3.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Deaths due to tuberculosis among hiv negative people per 100 000 population",
      path: "0.2.9.3.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Prevalence of hiv among adults aged 15 to 49",
      path: "0.2.9.3.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Deaths Due to Environment",
      path: "0.2.9.3.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Indoor air pollution attributable deaths per 100000 capita",
      path: "0.2.9.3.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Outdoor air pollution attributable deaths per 100000 children under 5 years",
      path: "0.2.9.3.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Outdoor air pollution attributable deaths per 100000 capita",
      path: "0.2.9.3.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total environment attributable deaths per 100000 capita",
      path: "0.2.9.3.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Uv radiation attributable deaths per 100000 capita",
      path: "0.2.9.3.5.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Water sanitation and hygiene attributable deaths per 100000 children under 5 years",
      path: "0.2.9.3.5.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Water sanitation and hygiene attributable deaths per 100000 capita",
      path: "0.2.9.3.5.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged less than 5 years",
      path: "0.2.9.3.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years acute lower respiratory infections",
      path: "0.2.9.3.6.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years acute lower respiratory infections",
      path: "0.2.9.3.6.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years acute lower respiratory infections",
      path: "0.2.9.3.6.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years acute lower respiratory infections",
      path: "0.2.9.3.6.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years acute lower respiratory infections",
      path: "0.2.9.3.6.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years acute lower respiratory infections",
      path: "0.2.9.3.6.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years birth asphyxia and birth trauma",
      path: "0.2.9.3.6.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years birth asphyxia and birth trauma",
      path: "0.2.9.3.6.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years birth asphyxia and birth trauma",
      path: "0.2.9.3.6.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years birth asphyxia and birth trauma",
      path: "0.2.9.3.6.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years birth asphyxia and birth trauma",
      path: "0.2.9.3.6.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years birth asphyxia and birth trauma",
      path: "0.2.9.3.6.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years congenital anomalies",
      path: "0.2.9.3.6.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years congenital anomalies",
      path: "0.2.9.3.6.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years congenital anomalies",
      path: "0.2.9.3.6.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years congenital anomalies",
      path: "0.2.9.3.6.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years congenital anomalies",
      path: "0.2.9.3.6.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years congenital anomalies",
      path: "0.2.9.3.6.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years diarrhoeal diseases",
      path: "0.2.9.3.6.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years diarrhoeal diseases",
      path: "0.2.9.3.6.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years diarrhoeal diseases",
      path: "0.2.9.3.6.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years diarrhoeal diseases",
      path: "0.2.9.3.6.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years diarrhoeal diseases",
      path: "0.2.9.3.6.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years diarrhoeal diseases",
      path: "0.2.9.3.6.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years hiv aids",
      path: "0.2.9.3.6.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years hiv aids",
      path: "0.2.9.3.6.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years hiv aids",
      path: "0.2.9.3.6.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years hiv aids",
      path: "0.2.9.3.6.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years hiv aids",
      path: "0.2.9.3.6.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years hiv aids",
      path: "0.2.9.3.6.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years injuries",
      path: "0.2.9.3.6.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years injuries",
      path: "0.2.9.3.6.32"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years injuries",
      path: "0.2.9.3.6.33"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years injuries",
      path: "0.2.9.3.6.34"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years injuries",
      path: "0.2.9.3.6.35"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years injuries",
      path: "0.2.9.3.6.36"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years malaria",
      path: "0.2.9.3.6.37"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years malaria",
      path: "0.2.9.3.6.38"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years malaria",
      path: "0.2.9.3.6.39"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years malaria",
      path: "0.2.9.3.6.40"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years malaria",
      path: "0.2.9.3.6.41"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years malaria",
      path: "0.2.9.3.6.42"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years measles",
      path: "0.2.9.3.6.43"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years measles",
      path: "0.2.9.3.6.44"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years measles",
      path: "0.2.9.3.6.45"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years measles",
      path: "0.2.9.3.6.46"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years measles",
      path: "0.2.9.3.6.47"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years measles",
      path: "0.2.9.3.6.48"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years other diseases",
      path: "0.2.9.3.6.49"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years other diseases",
      path: "0.2.9.3.6.50"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years other diseases",
      path: "0.2.9.3.6.51"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years other diseases",
      path: "0.2.9.3.6.52"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years other diseases",
      path: "0.2.9.3.6.53"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years other diseases",
      path: "0.2.9.3.6.54"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years prematurity",
      path: "0.2.9.3.6.55"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years prematurity",
      path: "0.2.9.3.6.56"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years prematurity",
      path: "0.2.9.3.6.57"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years prematurity",
      path: "0.2.9.3.6.58"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years prematurity",
      path: "0.2.9.3.6.59"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years prematurity",
      path: "0.2.9.3.6.60"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years sepsis and other infectious conditions of the newborn",
      path: "0.2.9.3.6.61"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years sepsis and other infectious conditions of the newborn",
      path: "0.2.9.3.6.62"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years sepsis and other infectious conditions of the newborn",
      path: "0.2.9.3.6.63"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years sepsis and other infectious conditions of the newborn",
      path: "0.2.9.3.6.64"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years sepsis and other infectious conditions of the newborn",
      path: "0.2.9.3.6.65"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of causes of death among children aged 5 years sepsis and other infectious conditions of the newborn",
      path: "0.2.9.3.6.66"
    },
    model: "Category"
  },
  {
    data: {
      name: "HIV",
      path: "0.2.9.3.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Antiretroviral therapy coverage among people with advanced hiv infection",
      path: "0.2.9.3.7.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Estimated number of people needing antiretroviral therapy",
      path: "0.2.9.3.7.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Estimated number of pregnant women living with hiv needing antiretrovirals for preventing mother to child transmission based on unaids who methods",
      path: "0.2.9.3.7.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Malaria number of reported deaths",
      path: "0.2.9.3.7.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of adults aged 15 and over living with hiv",
      path: "0.2.9.3.7.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of children under 15 living with hiv",
      path: "0.2.9.3.7.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of deaths due to hiv aids",
      path: "0.2.9.3.7.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of people all ages living with hiv",
      path: "0.2.9.3.7.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of people aged 15 years and over who received hiv testing and counselling reported number",
      path: "0.2.9.3.7.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of people aged 15 years and over who received hiv testing and counselling reporting period",
      path: "0.2.9.3.7.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of pregnant women living with hiv who received antiretrovirals for preventing mother to child transmission",
      path: "0.2.9.3.7.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of pregnant women living with hiv who received antiretrovirals for preventing mother to child transmission reporting period",
      path: "0.2.9.3.7.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of under five deaths from hiv aids",
      path: "0.2.9.3.7.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Number of women aged 15 and over living with hiv",
      path: "0.2.9.3.7.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "People aged 15 years and over who received hiv testing and counselling estimated number per 1000 adult population",
      path: "0.2.9.3.7.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pregnant women tested for hiv estimated coverage",
      path: "0.2.9.3.7.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pregnant women tested for hiv reported number",
      path: "0.2.9.3.7.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Reported number of people receiving antiretroviral therapy",
      path: "0.2.9.3.7.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Testing and counselling facilities estimated number per 100 000 adult population",
      path: "0.2.9.3.7.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Testing and counselling facilities reported number",
      path: "0.2.9.3.7.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Immunization Coverage Among 1 Year Olds",
      path: "0.2.9.3.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bcg immunization coverage among 1 year olds",
      path: "0.2.9.3.8.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Diphtheria tetanus toxoid and pertussis dtp3 immunization coverage among 1 year olds",
      path: "0.2.9.3.8.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hepatitis b hepb3 immunization coverage among 1 year olds",
      path: "0.2.9.3.8.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hib hib3 immunization coverage among 1 year olds",
      path: "0.2.9.3.8.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Measles mcv immunization coverage among 1 year olds",
      path: "0.2.9.3.8.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Neonates protected at birth against neonatal tetanus pab",
      path: "0.2.9.3.8.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Polio pol3 immunization coverage among 1 year olds",
      path: "0.2.9.3.8.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life Expectancy",
      path: "0.2.9.3.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life expectancy at age 60 years",
      path: "0.2.9.3.9.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life expectancy at age 60 years female",
      path: "0.2.9.3.9.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life expectancy at age 60 years male",
      path: "0.2.9.3.9.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life expectancy at birth years",
      path: "0.2.9.3.9.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life expectancy at birth years female",
      path: "0.2.9.3.9.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Life expectancy at birth years male",
      path: "0.2.9.3.9.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mortality Overview",
      path: "0.2.9.3.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Adult mortality rate probability of dying between 15 and 60 years per 1000 population",
      path: "0.2.9.3.10.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Adult mortality rate probability of dying between 15 and 60 years per 1000 population female",
      path: "0.2.9.3.10.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Adult mortality rate probability of dying between 15 and 60 years per 1000 population male",
      path: "0.2.9.3.10.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized mortality rate by cause per 100 000 population communicable",
      path: "0.2.9.3.10.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized mortality rate by cause per 100 000 population injuries",
      path: "0.2.9.3.10.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Age standardized mortality rate by cause per 100 000 population noncommunicable",
      path: "0.2.9.3.10.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of years of life lost by broader causes communicable",
      path: "0.2.9.3.10.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of years of life lost by broader causes injuries",
      path: "0.2.9.3.10.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Distribution of years of life lost by broader causes noncommunicable",
      path: "0.2.9.3.10.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Maternal mortality ratio per 100 000 live births interagency estimates",
      path: "0.2.9.3.10.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Prevalence of Disease",
      path: "0.2.9.3.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cholera number of reported cases",
      path: "0.2.9.3.11.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Congenital rubella syndrome number of reported cases",
      path: "0.2.9.3.11.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Diphtheria number of reported cases",
      path: "0.2.9.3.11.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "H5n1 influenza number of reported cases",
      path: "0.2.9.3.11.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Incidence of tuberculosis per 100 000 population per year",
      path: "0.2.9.3.11.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Japanese encephalitis number of reported cases",
      path: "0.2.9.3.11.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Leprosy number of reported cases",
      path: "0.2.9.3.11.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Malaria number of reported cases",
      path: "0.2.9.3.11.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Measles number of reported cases",
      path: "0.2.9.3.11.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Meningitis number of reported cases",
      path: "0.2.9.3.11.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mumps number of reported cases",
      path: "0.2.9.3.11.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Neonatal tetanus number of reported cases",
      path: "0.2.9.3.11.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pertussis number of reported cases",
      path: "0.2.9.3.11.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Plague number of reported cases",
      path: "0.2.9.3.11.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Poliomyelitis number of reported cases",
      path: "0.2.9.3.11.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Prevalence of tuberculosis per 100 000 population",
      path: "0.2.9.3.11.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rubella number of reported cases",
      path: "0.2.9.3.11.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Total tetanus number of reported cases",
      path: "0.2.9.3.11.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Yellow fever number of reported cases",
      path: "0.2.9.3.11.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Markets",
      path: "0.2.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bitcoin",
      path: "0.2.10.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Commodities",
      path: "0.2.10.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coal",
      path: "0.2.10.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Oil and Gasoline",
      path: "0.2.10.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Farms and Fishery",
      path: "0.2.10.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Grains and Cereals",
      path: "0.2.10.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Metals",
      path: "0.2.10.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas",
      path: "0.2.10.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "G-10 Cross Rates",
      path: "0.2.10.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "G-20 Markets By Size",
      path: "0.2.10.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Global Markets Overview",
      path: "0.2.10.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Global Stock Markets",
      path: "0.2.10.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold",
      path: "0.2.10.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Futures",
      path: "0.2.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "By Category",
      path: "0.2.11.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Commodities",
      path: "0.2.11.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Agriculture",
      path: "0.2.11.1.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Butter",
      path: "0.2.11.1.1.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cardamom",
      path: "0.2.11.1.1.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cash Settled Butter",
      path: "0.2.11.1.1.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cash Settled Cheese",
      path: "0.2.11.1.1.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Palm Oil",
      path: "0.2.11.1.1.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dry Whey",
      path: "0.2.11.1.1.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Feeder Cattle",
      path: "0.2.11.1.1.1.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Fine Wool",
      path: "0.2.11.1.1.1.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Frozen Shrimp",
      path: "0.2.11.1.1.1.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Greasy Wool",
      path: "0.2.11.1.1.1.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Guar Gum",
      path: "0.2.11.1.1.1.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Guar Seed",
      path: "0.2.11.1.1.1.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hogs",
      path: "0.2.11.1.1.1.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Indonesia SICOM OTC TSR20 Rubber",
      path: "0.2.11.1.1.1.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Kapaisa Khali",
      path: "0.2.11.1.1.1.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Kapas",
      path: "0.2.11.1.1.1.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lean Hogs",
      path: "0.2.11.1.1.1.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Live Cattle",
      path: "0.2.11.1.1.1.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lumber",
      path: "0.2.11.1.1.1.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Malaysia SICOM OTC TSR20 Rubber",
      path: "0.2.11.1.1.1.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mentha Oil",
      path: "0.2.11.1.1.1.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Milk",
      path: "0.2.11.1.1.1.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Rubber",
      path: "0.2.11.1.1.1.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nonfat Dry Milk",
      path: "0.2.11.1.1.1.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Piglets",
      path: "0.2.11.1.1.1.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Potato",
      path: "0.2.11.1.1.1.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Potato",
      path: "0.2.11.1.1.1.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "SICOM RSS3 Rubber",
      path: "0.2.11.1.1.1.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "SICOM Rubber",
      path: "0.2.11.1.1.1.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Thailand SICOM OTC TSR20 Rubber",
      path: "0.2.11.1.1.1.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "Whey Powder",
      path: "0.2.11.1.1.1.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "Energy",
      path: "0.2.11.1.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "1% Fuel Oil Cargoes FOB NWE (Platts) Crack Spread",
      path: "0.2.11.1.1.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "1% Fuel Oil Cargoes FOB NWE (Platts) vs. 3.5% Fuel Oil Barges FOB Rdam (Platts)",
      path: "0.2.11.1.1.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "3.5% Fuel Oil Barges FOB Rdam (Platts) Crack Spread",
      path: "0.2.11.1.1.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "3.5% Fuel Oil Barges FOB Rdam (Platts) Crack Spread (1000mt)",
      path: "0.2.11.1.1.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "ANR Oklahoma Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Algonquin City-Gates Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Argus LLS vs. WTI (Argus) Trade Month",
      path: "0.2.11.1.1.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Belgian Base Month Electricity",
      path: "0.2.11.1.1.2.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Belgian Base Quarter Electricity",
      path: "0.2.11.1.1.2.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Belgian Base Year Electricity",
      path: "0.2.11.1.1.2.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Crude Oil",
      path: "0.2.11.1.1.2.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Crude Oil",
      path: "0.2.11.1.1.2.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Crude Oil",
      path: "0.2.11.1.1.2.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Crude Oil Financial",
      path: "0.2.11.1.1.2.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Crude Oil vs. Dubai Crude Oil (Platts)",
      path: "0.2.11.1.1.2.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Financial",
      path: "0.2.11.1.1.2.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Look-Alike",
      path: "0.2.11.1.1.2.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "CER Emissions",
      path: "0.2.11.1.1.2.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "CER Mid December",
      path: "0.2.11.1.1.2.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "CIG Rockies Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Canadian Heavy Crude Oil Index (Net Energy)",
      path: "0.2.11.1.1.2.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Chicago Ethanol (Platts)",
      path: "0.2.11.1.1.2.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Chicago ULSD (Platts) vs. NY Harbor ULSD",
      path: "0.2.11.1.1.2.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "China Coal Index",
      path: "0.2.11.1.1.2.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coal",
      path: "0.2.11.1.1.2.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coal (API 8) cfr South China (Argus/McCloskey)",
      path: "0.2.11.1.1.2.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coal (API2) CIF ARA (ARGUS-McCloskey)",
      path: "0.2.11.1.1.2.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coal (API4) FOB Richards Bay (ARGUS-McCloskey)",
      path: "0.2.11.1.1.2.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "Columbia Gas TCO (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Columbia Gulf Louisiana Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "Columbia Gulf Mainline Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Oil",
      path: "0.2.11.1.1.2.32"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Oil Financial",
      path: "0.2.11.1.1.2.33"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dated Brent (Platts) Financial",
      path: "0.2.11.1.1.2.34"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dated Brent (Platts) to Frontline Brent",
      path: "0.2.11.1.1.2.35"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dominion South Point Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.36"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dubai Crude Oil (Platts) Financial",
      path: "0.2.11.1.1.2.37"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dutch Base Month Electricity",
      path: "0.2.11.1.1.2.38"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dutch Base Quarter Electricity",
      path: "0.2.11.1.1.2.39"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dutch Base Year Electricity",
      path: "0.2.11.1.1.2.40"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dutch Peak Month Electricity",
      path: "0.2.11.1.1.2.41"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dutch Peak Quarter Electricity",
      path: "0.2.11.1.1.2.42"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dutch Peak Year Electricity",
      path: "0.2.11.1.1.2.43"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Crude Oil",
      path: "0.2.11.1.1.2.44"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Natural Gas",
      path: "0.2.11.1.1.2.45"
    },
    model: "Category"
  },
  {
    data: {
      name: "EIA Flat Tax On-Highway Diesel",
      path: "0.2.11.1.1.2.46"
    },
    model: "Category"
  },
  {
    data: {
      name: "ERCOT North 345 kV Hub 5 MW Off-Peak",
      path: "0.2.11.1.1.2.47"
    },
    model: "Category"
  },
  {
    data: {
      name: "ERCOT North 345 kV Hub 5 MW Peak",
      path: "0.2.11.1.1.2.48"
    },
    model: "Category"
  },
  {
    data: {
      name: "ERCOT West 345 kV Hub 5 MW Off-Peak",
      path: "0.2.11.1.1.2.49"
    },
    model: "Category"
  },
  {
    data: {
      name: "ERCOT West 345 kV Hub 5 MW Peak",
      path: "0.2.11.1.1.2.50"
    },
    model: "Category"
  },
  {
    data: {
      name: "ERU (Emission Reduction Units)",
      path: "0.2.11.1.1.2.51"
    },
    model: "Category"
  },
  {
    data: {
      name: "EUA (EU Emission Allowances)",
      path: "0.2.11.1.1.2.52"
    },
    model: "Category"
  },
  {
    data: {
      name: "EUA (EU Emission Allowances)",
      path: "0.2.11.1.1.2.53"
    },
    model: "Category"
  },
  {
    data: {
      name: "EUAA (EU Aviation Allowance)",
      path: "0.2.11.1.1.2.54"
    },
    model: "Category"
  },
  {
    data: {
      name: "East-West Fuel Oil Spread (Platts)",
      path: "0.2.11.1.1.2.55"
    },
    model: "Category"
  },
  {
    data: {
      name: "Eastern Rail Delivery CSX Coal",
      path: "0.2.11.1.1.2.56"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ethanol",
      path: "0.2.11.1.1.2.57"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ethanol",
      path: "0.2.11.1.1.2.58"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ethanol Forward Month",
      path: "0.2.11.1.1.2.59"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ethanol T2 FOB Rdam Including Duty (Platts)",
      path: "0.2.11.1.1.2.60"
    },
    model: "Category"
  },
  {
    data: {
      name: "European 3.5% Fuel Oil Barges FOB Rdam (Platts)",
      path: "0.2.11.1.1.2.61"
    },
    model: "Category"
  },
  {
    data: {
      name: "European Gasoil Brent Crack Spread",
      path: "0.2.11.1.1.2.62"
    },
    model: "Category"
  },
  {
    data: {
      name: "European Naphtha (Platts) Crack Spread",
      path: "0.2.11.1.1.2.63"
    },
    model: "Category"
  },
  {
    data: {
      name: "European Naphtha Cargoes CIF NWE (Platts)",
      path: "0.2.11.1.1.2.64"
    },
    model: "Category"
  },
  {
    data: {
      name: "Florida Gas Zone 3 Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.65"
    },
    model: "Category"
  },
  {
    data: {
      name: "Fuel Oil",
      path: "0.2.11.1.1.2.66"
    },
    model: "Category"
  },
  {
    data: {
      name: "Fuel Oil 380cst",
      path: "0.2.11.1.1.2.67"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gasoil",
      path: "0.2.11.1.1.2.68"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gasoil 0.1 Barges FOB Rdam (Platts) vs. Gasoil",
      path: "0.2.11.1.1.2.69"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gasoline",
      path: "0.2.11.1.1.2.70"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gasoline Euro-bob Oxy NWE Barges (Argus)",
      path: "0.2.11.1.1.2.71"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gasoline Euro-bob Oxy NWE Barges (Argus) Crack Spread",
      path: "0.2.11.1.1.2.72"
    },
    model: "Category"
  },
  {
    data: {
      name: "Group Three ULSD (Platts) vs. NY Harbor ULSD",
      path: "0.2.11.1.1.2.73"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast Jet (Platts) Up-Down",
      path: "0.2.11.1.1.2.74"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast Jet Fuel (Platts)",
      path: "0.2.11.1.1.2.75"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast No. 6 Fuel Oil (Platts) Crack Spread",
      path: "0.2.11.1.1.2.76"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast No. 6 Fuel Oil 3.0% (Platts)",
      path: "0.2.11.1.1.2.77"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast No. 6 Fuel Oil 3.0% (Platts) vs. European 3.5% Fuel Oil Barges FOB Rdam (Platts)",
      path: "0.2.11.1.1.2.78"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast No.6 Fuel Oil 3.0% (Platts) Brent Crack Spread",
      path: "0.2.11.1.1.2.79"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast ULSD (Platts)",
      path: "0.2.11.1.1.2.80"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast ULSD (Platts) Crack Spread",
      path: "0.2.11.1.1.2.81"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast ULSD (Platts) Up-Down",
      path: "0.2.11.1.1.2.82"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast Unl 87 Gasoline M1 (Platts) Crack Spread",
      path: "0.2.11.1.1.2.83"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast Unl 87 Gasoline M1 (Platts) vs. RBOB Gasoline",
      path: "0.2.11.1.1.2.84"
    },
    model: "Category"
  },
  {
    data: {
      name: "Heating Oil",
      path: "0.2.11.1.1.2.85"
    },
    model: "Category"
  },
  {
    data: {
      name: "Henry Hub Natural Gas (Platts Gas Daily/Platts IFERC) Index",
      path: "0.2.11.1.1.2.86"
    },
    model: "Category"
  },
  {
    data: {
      name: "Henry Hub Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.87"
    },
    model: "Category"
  },
  {
    data: {
      name: "Henry Hub Penultimate NP",
      path: "0.2.11.1.1.2.88"
    },
    model: "Category"
  },
  {
    data: {
      name: "Henry Hub Swap",
      path: "0.2.11.1.1.2.89"
    },
    model: "Category"
  },
  {
    data: {
      name: "Houston Ship Channel Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.90"
    },
    model: "Category"
  },
  {
    data: {
      name: "IHS McCloskey Indonesian Sub-Bit FOB Index",
      path: "0.2.11.1.1.2.91"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England Mass Hub 5 MW Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.92"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England Mass Hub Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.93"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England Mass Hub Day-Ahead Peak Calendar-Month 2.5 MW",
      path: "0.2.11.1.1.2.94"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England Monthly Off Peak LMP Swap Future",
      path: "0.2.11.1.1.2.95"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England New Hampshire Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.96"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England North East Massachusetts Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.97"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England North East Massachusetts Zone 5 MW Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.98"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England Rhode Island Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.99"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England Rhode Island Zone 5 MW Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.100"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England South East Massachusetts Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.101"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England West Central Massachusetts Zone 5 MW Off-Peak Calendar-Month Day Ahead LMP",
      path: "0.2.11.1.1.2.102"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England West Central Massachusetts Zone 5 MW Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.103"
    },
    model: "Category"
  },
  {
    data: {
      name: "In Delivery Month European Union Allowance (EUA)",
      path: "0.2.11.1.1.2.104"
    },
    model: "Category"
  },
  {
    data: {
      name: "Indonesian Coal (McCloskey sub-bituminous)",
      path: "0.2.11.1.1.2.105"
    },
    model: "Category"
  },
  {
    data: {
      name: "LLS (Argus) vs. WTI Financial",
      path: "0.2.11.1.1.2.106"
    },
    model: "Category"
  },
  {
    data: {
      name: "Los Angeles Jet (OPIS) vs. NY Harbor ULSD",
      path: "0.2.11.1.1.2.107"
    },
    model: "Category"
  },
  {
    data: {
      name: "Low Sulphur Gasoil",
      path: "0.2.11.1.1.2.108"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub (formerly Cinergy Hub) 5 Month Peak Calendar-Month Real-Time",
      path: "0.2.11.1.1.2.109"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub (formerly Cinergy Hub) Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.110"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub (formerly Cinergy Hub) Day-Ahead Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.111"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub (formerly Cinergy Hub) Off-Peak LMP",
      path: "0.2.11.1.1.2.112"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub (formerly Cinergy Hub) Real-Time Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.113"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub (formerly Cinergy Hub) Real-Time Peak Calendar-Month 2.5 MW",
      path: "0.2.11.1.1.2.114"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.115"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub Day-Ahead Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.116"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub Real-Time Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.117"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub Real-Time Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.118"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Michigan Hub 5 MW Off-Peak Calendar-Month Day-Ahead",
      path: "0.2.11.1.1.2.119"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Michigan Hub 5 MW Peak Calendar-Month Day-Ahead",
      path: "0.2.11.1.1.2.120"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mars (Argus) vs. WTI Financial",
      path: "0.2.11.1.1.2.121"
    },
    model: "Category"
  },
  {
    data: {
      name: "MichCon Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.122"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini European 3.5% Fuel Oil Barges FOB Rdam (Platts)",
      path: "0.2.11.1.1.2.123"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini European Naphtha CIF NWE (Platts)",
      path: "0.2.11.1.1.2.124"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini Gasoline Euro-bob Oxy NWE Barges (Argus)",
      path: "0.2.11.1.1.2.125"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini Japan C&F Naphtha (Platts)",
      path: "0.2.11.1.1.2.126"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini Singapore Fuel Oil 180 cst (Platts)",
      path: "0.2.11.1.1.2.127"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini Singapore Fuel Oil 380 cst (Platts)",
      path: "0.2.11.1.1.2.128"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Ethane (OPIS)",
      path: "0.2.11.1.1.2.129"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Ethylene (PCW) Financial",
      path: "0.2.11.1.1.2.130"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Iso-Butane (OPIS)",
      path: "0.2.11.1.1.2.131"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu LDH Propane (OPIS)",
      path: "0.2.11.1.1.2.132"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Natural Gasoline (OPIS)",
      path: "0.2.11.1.1.2.133"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Normal Butane (OPIS)",
      path: "0.2.11.1.1.2.134"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Normal Butane LDH (OPIS)",
      path: "0.2.11.1.1.2.135"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Spot Ethylene In-Well",
      path: "0.2.11.1.1.2.136"
    },
    model: "Category"
  },
  {
    data: {
      name: "NGPL Mid-Con Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.137"
    },
    model: "Category"
  },
  {
    data: {
      name: "NGPL TexOk Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.138"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY 1% Fuel Oil (Platts) vs. Gulf Coast 3% Fuel Oil (Platts)",
      path: "0.2.11.1.1.2.139"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Fuel Oil 1.0% (Platts) vs. European 1% Fuel Oil Cargoes FOB NWE (Platts)",
      path: "0.2.11.1.1.2.140"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Harbor ULSD",
      path: "0.2.11.1.1.2.141"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Harbor ULSD Brent Crack Spread",
      path: "0.2.11.1.1.2.142"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Harbor ULSD Crack Spread",
      path: "0.2.11.1.1.2.143"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Harbor ULSD Financial",
      path: "0.2.11.1.1.2.144"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Harbor ULSD vs. Gasoil",
      path: "0.2.11.1.1.2.145"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Heating Oil (Platts) vs. NY Harbor ULSD",
      path: "0.2.11.1.1.2.146"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Jet Fuel (Platts) vs. NY Harbor ULSD",
      path: "0.2.11.1.1.2.147"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY ULSD (Argus) vs. NY Harbor ULSD",
      path: "0.2.11.1.1.2.148"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone A Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.149"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone A Day-Ahead Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.150"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone A Off-Peak LBMP",
      path: "0.2.11.1.1.2.151"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone A Peak LBMP",
      path: "0.2.11.1.1.2.152"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone C 5 MW Off-Peak Calendar-Month Day-Ahead LBMP",
      path: "0.2.11.1.1.2.153"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone C 5 MW Peak Calendar-Month Day-Ahead LBMP",
      path: "0.2.11.1.1.2.154"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone E 5 MW Off-Peak Calendar-Month Day-Ahead LBMP",
      path: "0.2.11.1.1.2.155"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone F 5 MW Off-Peak Calendar-Month Day-Ahead LBMP",
      path: "0.2.11.1.1.2.156"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone F 5 MW Peak Calendar-Month Day-Ahead LBMP",
      path: "0.2.11.1.1.2.157"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone G Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.158"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone G Day-Ahead Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.159"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone G Off-Peak LBMP",
      path: "0.2.11.1.1.2.160"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone G Peak LBMP",
      path: "0.2.11.1.1.2.161"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone J Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.162"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone J Day-Ahead Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.163"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone J Off-Peak LBMP",
      path: "0.2.11.1.1.2.164"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone J Peak LBMP",
      path: "0.2.11.1.1.2.165"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas",
      path: "0.2.11.1.1.2.166"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas",
      path: "0.2.11.1.1.2.167"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas (Henry Hub) Last-day Financial",
      path: "0.2.11.1.1.2.168"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas (Henry Hub) Penultimate Financial",
      path: "0.2.11.1.1.2.169"
    },
    model: "Category"
  },
  {
    data: {
      name: "New York Harbor Residual Fuel 1.0% (Platts)",
      path: "0.2.11.1.1.2.170"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ontario Off-Peak Calendar-Month",
      path: "0.2.11.1.1.2.171"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ontario Peak Calendar-Month",
      path: "0.2.11.1.1.2.172"
    },
    model: "Category"
  },
  {
    data: {
      name: "PG&E Citygate Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.173"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AECO Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.174"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AECO Zone Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.175"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AEP Dayton Hub 5MW Peak Calendar-Month Real-Time LMP",
      path: "0.2.11.1.1.2.176"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AEP Dayton Hub Day-Ahead LMP Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.177"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AEP Dayton Hub Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.178"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AEP Dayton Hub Off-Peak LMP",
      path: "0.2.11.1.1.2.179"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AEP Dayton Hub Real-Time Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.180"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AEP Dayton Hub Real-Time Peak Calendar-Month 2.5 MW",
      path: "0.2.11.1.1.2.181"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM APS Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.182"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM APS Zone Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.183"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM ATSI Zone 5 MW Off-Peak Calendar-Month Day-Ahead",
      path: "0.2.11.1.1.2.184"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM BGE Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.185"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM BGE Zone Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.186"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM ComEd Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.187"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM ComEd Zone 5 MW Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.188"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM DPL Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.189"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Duquesne Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.190"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM JCPL Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.191"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM JCPL Zone Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.192"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM METED Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.193"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM METED Zone Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.194"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Northern Illinois Hub 5 MW Peak Calendar-Month Real-Time LMP",
      path: "0.2.11.1.1.2.195"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Northern Illinois Hub Day-Ahead LMP Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.196"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Northern Illinois Hub Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.197"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Northern Illinois Hub Off-Peak LMP",
      path: "0.2.11.1.1.2.198"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Northern Illinois Hub Real-Time Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.199"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Northern Illinois Hub Real-Time Peak Calendar-Month 2.5 MW",
      path: "0.2.11.1.1.2.200"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Off-Peak Calendar-Month LMP",
      path: "0.2.11.1.1.2.201"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM PECO Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.202"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM PECO Zone 5 MW Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.203"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM PPL Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.204"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM PPL Zone Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.205"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM PSEG Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.1.1.2.206"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM PSEG Zone Peak Calendar-Month Day-Ahead LMP 5 MW",
      path: "0.2.11.1.1.2.207"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Western Hub Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.208"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Western Hub Day-Ahead Peak Calendar-Month 5 MW  ",
      path: "0.2.11.1.1.2.209"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Western Hub Peak Calendar-Month Real-Time LMP",
      path: "0.2.11.1.1.2.210"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Western Hub Real-Time Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.1.1.2.211"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Western Hub Real-Time Peak Calendar-Month 2.5 MW",
      path: "0.2.11.1.1.2.212"
    },
    model: "Category"
  },
  {
    data: {
      name: "Panhandle Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.213"
    },
    model: "Category"
  },
  {
    data: {
      name: "Platts Gasoil FOB Singapore Index",
      path: "0.2.11.1.1.2.214"
    },
    model: "Category"
  },
  {
    data: {
      name: "Platts Kerosene FOB Singapore Index",
      path: "0.2.11.1.1.2.215"
    },
    model: "Category"
  },
  {
    data: {
      name: "Platts Naphtha CFR Japan Index",
      path: "0.2.11.1.1.2.216"
    },
    model: "Category"
  },
  {
    data: {
      name: "Platts Singapore Fuel Oil 180cst Index",
      path: "0.2.11.1.1.2.217"
    },
    model: "Category"
  },
  {
    data: {
      name: "Platts Singapore Fuel Oil 380cst Index",
      path: "0.2.11.1.1.2.218"
    },
    model: "Category"
  },
  {
    data: {
      name: "Powder River Basin Coal (Platts OTC Broker Index)",
      path: "0.2.11.1.1.2.219"
    },
    model: "Category"
  },
  {
    data: {
      name: "Propane Non-LDH Mont Belvieu (OPIS)",
      path: "0.2.11.1.1.2.220"
    },
    model: "Category"
  },
  {
    data: {
      name: "RBOB Gasoline Brent Crack Spread",
      path: "0.2.11.1.1.2.221"
    },
    model: "Category"
  },
  {
    data: {
      name: "RBOB Gasoline Crack Spread",
      path: "0.2.11.1.1.2.222"
    },
    model: "Category"
  },
  {
    data: {
      name: "RBOB Gasoline Financial",
      path: "0.2.11.1.1.2.223"
    },
    model: "Category"
  },
  {
    data: {
      name: "RBOB Gasoline Physical",
      path: "0.2.11.1.1.2.224"
    },
    model: "Category"
  },
  {
    data: {
      name: "Richards Bay Coal",
      path: "0.2.11.1.1.2.225"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rockies Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.226"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rotterdam Coal",
      path: "0.2.11.1.1.2.227"
    },
    model: "Category"
  },
  {
    data: {
      name: "San Juan Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.228"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Fuel Oil 180 cst (Platts)",
      path: "0.2.11.1.1.2.229"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Fuel Oil 180 cst (Platts) vs. 380 cst (Platts)",
      path: "0.2.11.1.1.2.230"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Fuel Oil 380 cst (Platts)",
      path: "0.2.11.1.1.2.231"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Gasoil (Platts)",
      path: "0.2.11.1.1.2.232"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Gasoil (Platts) vs. Gasoil",
      path: "0.2.11.1.1.2.233"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Jet Kerosene (Platts)",
      path: "0.2.11.1.1.2.234"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Jet Kerosene (Platts) vs. Gasoil (Platts)",
      path: "0.2.11.1.1.2.235"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Mogas 92 Unleaded (Platts)",
      path: "0.2.11.1.1.2.236"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Mogas 92 Unleaded (Platts) Brent Crack Spread",
      path: "0.2.11.1.1.2.237"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Regrade Spread",
      path: "0.2.11.1.1.2.238"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Visco Spread",
      path: "0.2.11.1.1.2.239"
    },
    model: "Category"
  },
  {
    data: {
      name: "SoCal Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.240"
    },
    model: "Category"
  },
  {
    data: {
      name: "SoCal Natural Gas (Platts IFERC) Fixed Price",
      path: "0.2.11.1.1.2.241"
    },
    model: "Category"
  },
  {
    data: {
      name: "Southern Natural Louisiana Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.242"
    },
    model: "Category"
  },
  {
    data: {
      name: "Southern Star Tx.-Okla.-Kan. Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.243"
    },
    model: "Category"
  },
  {
    data: {
      name: "Sumas Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.244"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tennessee 500 Leg Natural Gas (Platts Gas Daily/Platts IFERC) Index",
      path: "0.2.11.1.1.2.245"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tennessee 800 Leg Natural Gas (Platts Gas Daily/Platts IFERC) Index",
      path: "0.2.11.1.1.2.246"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tennessee 800 Leg Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.247"
    },
    model: "Category"
  },
  {
    data: {
      name: "Texas Eastern Zone M-3 Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.248"
    },
    model: "Category"
  },
  {
    data: {
      name: "Texas Gas Zone 1 Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.249"
    },
    model: "Category"
  },
  {
    data: {
      name: "Transco Zone 3 Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.250"
    },
    model: "Category"
  },
  {
    data: {
      name: "Transco Zone 4 Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.251"
    },
    model: "Category"
  },
  {
    data: {
      name: "Transco Zone 6 Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.252"
    },
    model: "Category"
  },
  {
    data: {
      name: "Transco Zone 6 Non-N.Y. Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.253"
    },
    model: "Category"
  },
  {
    data: {
      name: "UK Base Electricity",
      path: "0.2.11.1.1.2.254"
    },
    model: "Category"
  },
  {
    data: {
      name: "UK Natural Gas",
      path: "0.2.11.1.1.2.255"
    },
    model: "Category"
  },
  {
    data: {
      name: "UK Peak Electricity",
      path: "0.2.11.1.1.2.256"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ventura Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.257"
    },
    model: "Category"
  },
  {
    data: {
      name: "WTI Crude Oil",
      path: "0.2.11.1.1.2.258"
    },
    model: "Category"
  },
  {
    data: {
      name: "WTI Financial",
      path: "0.2.11.1.1.2.259"
    },
    model: "Category"
  },
  {
    data: {
      name: "WTI Midland (Argus) vs. WTI Financial",
      path: "0.2.11.1.1.2.260"
    },
    model: "Category"
  },
  {
    data: {
      name: "WTI-Brent Bullet",
      path: "0.2.11.1.1.2.261"
    },
    model: "Category"
  },
  {
    data: {
      name: "WTI-Brent Financial",
      path: "0.2.11.1.1.2.262"
    },
    model: "Category"
  },
  {
    data: {
      name: "WTS (Argus) vs. WTI Trade Month",
      path: "0.2.11.1.1.2.263"
    },
    model: "Category"
  },
  {
    data: {
      name: "Waha Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.1.1.2.264"
    },
    model: "Category"
  },
  {
    data: {
      name: "Grains",
      path: "0.2.11.1.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Australia Feed Barley",
      path: "0.2.11.1.1.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Australia Sorghum",
      path: "0.2.11.1.1.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Azuki Beans",
      path: "0.2.11.1.1.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Barley",
      path: "0.2.11.1.1.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Canola",
      path: "0.2.11.1.1.3.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Corn",
      path: "0.2.11.1.1.3.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Durum Wheat",
      path: "0.2.11.1.1.3.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Eastern Australia (EA) Canola",
      path: "0.2.11.1.1.3.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hard Red Spring Wheat Index",
      path: "0.2.11.1.1.3.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hard Red Winter Wheat Index",
      path: "0.2.11.1.1.3.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Kansas City Hard Red Winter Wheat",
      path: "0.2.11.1.1.3.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "London Feed Wheat",
      path: "0.2.11.1.1.3.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Milling Wheat",
      path: "0.2.11.1.1.3.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Minneapolis Hard Red Spring Wheat",
      path: "0.2.11.1.1.3.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "National Corn Index",
      path: "0.2.11.1.1.3.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "National Soybean Index",
      path: "0.2.11.1.1.3.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "New South Wales (NSW) Wheat",
      path: "0.2.11.1.1.3.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Oats",
      path: "0.2.11.1.1.3.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Osaka Corn",
      path: "0.2.11.1.1.3.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Osaka Corn75 Index",
      path: "0.2.11.1.1.3.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Osaka Rice",
      path: "0.2.11.1.1.3.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Paris Corn",
      path: "0.2.11.1.1.3.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Paris Malting Barley",
      path: "0.2.11.1.1.3.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Paris Milling Wheat",
      path: "0.2.11.1.1.3.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Paris Rapeseed",
      path: "0.2.11.1.1.3.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rough Rice",
      path: "0.2.11.1.1.3.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Soft Red Winter Wheat Index",
      path: "0.2.11.1.1.3.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Soybean Meal",
      path: "0.2.11.1.1.3.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "Soybean Oil",
      path: "0.2.11.1.1.3.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Soybeans",
      path: "0.2.11.1.1.3.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tokyo Rice",
      path: "0.2.11.1.1.3.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "US Soybeans",
      path: "0.2.11.1.1.3.32"
    },
    model: "Category"
  },
  {
    data: {
      name: "Western Australia (WA) Wheat",
      path: "0.2.11.1.1.3.33"
    },
    model: "Category"
  },
  {
    data: {
      name: "Wheat",
      path: "0.2.11.1.1.3.34"
    },
    model: "Category"
  },
  {
    data: {
      name: "Metals",
      path: "0.2.11.1.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Aluminium",
      path: "0.2.11.1.1.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Aluminium",
      path: "0.2.11.1.1.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Aluminium Mini",
      path: "0.2.11.1.1.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Copper",
      path: "0.2.11.1.1.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Copper",
      path: "0.2.11.1.1.4.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Copper",
      path: "0.2.11.1.1.4.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Copper Mini",
      path: "0.2.11.1.1.4.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-micro Gold",
      path: "0.2.11.1.1.4.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold",
      path: "0.2.11.1.1.4.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold",
      path: "0.2.11.1.1.4.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold",
      path: "0.2.11.1.1.4.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold Guinea",
      path: "0.2.11.1.1.4.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold Mini",
      path: "0.2.11.1.1.4.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold Petal",
      path: "0.2.11.1.1.4.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold Petal New Delhi",
      path: "0.2.11.1.1.4.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Iron Ore",
      path: "0.2.11.1.1.4.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Iron Ore 62% Fe CFR China (TSI)",
      path: "0.2.11.1.1.4.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lead",
      path: "0.2.11.1.1.4.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lead",
      path: "0.2.11.1.1.4.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lead Mini",
      path: "0.2.11.1.1.4.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nickel",
      path: "0.2.11.1.1.4.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nickel Mini",
      path: "0.2.11.1.1.4.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Palladium",
      path: "0.2.11.1.1.4.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Platinum",
      path: "0.2.11.1.1.4.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Silver",
      path: "0.2.11.1.1.4.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Silver",
      path: "0.2.11.1.1.4.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Silver",
      path: "0.2.11.1.1.4.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Silver 1000",
      path: "0.2.11.1.1.4.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "Silver Micro",
      path: "0.2.11.1.1.4.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Silver Mini",
      path: "0.2.11.1.1.4.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "Steel Rebar",
      path: "0.2.11.1.1.4.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "Steel Wire",
      path: "0.2.11.1.1.4.32"
    },
    model: "Category"
  },
  {
    data: {
      name: "U.S. Midwest Domestic Hot-Rolled Coil Steel (CRU) Index",
      path: "0.2.11.1.1.4.33"
    },
    model: "Category"
  },
  {
    data: {
      name: "UxC Uranium U3O8",
      path: "0.2.11.1.1.4.34"
    },
    model: "Category"
  },
  {
    data: {
      name: "Zinc",
      path: "0.2.11.1.1.4.35"
    },
    model: "Category"
  },
  {
    data: {
      name: "Zinc",
      path: "0.2.11.1.1.4.36"
    },
    model: "Category"
  },
  {
    data: {
      name: "Zinc Mini",
      path: "0.2.11.1.1.4.37"
    },
    model: "Category"
  },
  {
    data: {
      name: "Softs",
      path: "0.2.11.1.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cocoa",
      path: "0.2.11.1.1.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cocoa (LIFFE)",
      path: "0.2.11.1.1.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coffee (LIFFE)",
      path: "0.2.11.1.1.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coffee C",
      path: "0.2.11.1.1.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cotton",
      path: "0.2.11.1.1.5.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cotton",
      path: "0.2.11.1.1.5.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Orange Juice",
      path: "0.2.11.1.1.5.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Raw Sugar",
      path: "0.2.11.1.1.5.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Skimmed Milk Powder",
      path: "0.2.11.1.1.5.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Skimmed Milk Powder",
      path: "0.2.11.1.1.5.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Sugar No. 11",
      path: "0.2.11.1.1.5.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Sugar No.16",
      path: "0.2.11.1.1.5.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "White Sugar",
      path: "0.2.11.1.1.5.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Financial Derivatives",
      path: "0.2.11.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bonds",
      path: "0.2.11.1.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "10-year Canadian Bond",
      path: "0.2.11.1.2.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "10-year Full-Sized Japanese Government Bond",
      path: "0.2.11.1.2.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "10-year Mini Japanese Government Bond",
      path: "0.2.11.1.2.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "10-year New Zealand Government Stock",
      path: "0.2.11.1.2.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "10-year Treasury Note",
      path: "0.2.11.1.2.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "2-year Canadian Bond",
      path: "0.2.11.1.2.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "2-year Treasury Note",
      path: "0.2.11.1.2.1.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-year Australian Treasury Bonds",
      path: "0.2.11.1.2.1.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-year New Zealand Government Stock",
      path: "0.2.11.1.2.1.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "30-year Canadian Bond",
      path: "0.2.11.1.2.1.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "30-year Treasury Bond",
      path: "0.2.11.1.2.1.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "5-year Canadian Bond",
      path: "0.2.11.1.2.1.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "5-year Treasury Note",
      path: "0.2.11.1.2.1.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "90-day Australian Bank Bills",
      path: "0.2.11.1.2.1.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "90-day New Zealand Bank Bills",
      path: "0.2.11.1.2.1.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro-Bobl",
      path: "0.2.11.1.2.1.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro-Bund",
      path: "0.2.11.1.2.1.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro-Buxl",
      path: "0.2.11.1.2.1.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro-OAT",
      path: "0.2.11.1.2.1.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro-Schatz",
      path: "0.2.11.1.2.1.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Japanese Government Bond",
      path: "0.2.11.1.2.1.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Long Gilt",
      path: "0.2.11.1.2.1.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Long-Term Euro-BTP",
      path: "0.2.11.1.2.1.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Medium Gilt",
      path: "0.2.11.1.2.1.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mid-Term Euro-OAT",
      path: "0.2.11.1.2.1.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Short Gilt",
      path: "0.2.11.1.2.1.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Short-Term Euro-BTP",
      path: "0.2.11.1.2.1.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Swiss CONF",
      path: "0.2.11.1.2.1.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ultra Treasury Bond",
      path: "0.2.11.1.2.1.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Currencies",
      path: "0.2.11.1.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Australian Dollar",
      path: "0.2.11.1.2.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brazilian Real",
      path: "0.2.11.1.2.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "British Pound",
      path: "0.2.11.1.2.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "British Pound/Japanese Yen",
      path: "0.2.11.1.2.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Canadian Dollar",
      path: "0.2.11.1.2.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-micro British Pound/American Dollar",
      path: "0.2.11.1.2.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-micro Euro/American Dollar",
      path: "0.2.11.1.2.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Euro FX",
      path: "0.2.11.1.2.2.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Japanese Yen",
      path: "0.2.11.1.2.2.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro FX",
      path: "0.2.11.1.2.2.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro/British Pound",
      path: "0.2.11.1.2.2.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro/Japanese Yen",
      path: "0.2.11.1.2.2.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro/Polish Zloty",
      path: "0.2.11.1.2.2.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro/Swiss Franc",
      path: "0.2.11.1.2.2.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Japanese Yen",
      path: "0.2.11.1.2.2.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mexican Peso",
      path: "0.2.11.1.2.2.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "New Zealand Dollar",
      path: "0.2.11.1.2.2.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Polish Zloty",
      path: "0.2.11.1.2.2.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Russian Ruble",
      path: "0.2.11.1.2.2.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "South African Rand",
      path: "0.2.11.1.2.2.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Standard-Size USD/Offshore RMB (CNH)",
      path: "0.2.11.1.2.2.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Swiss Franc",
      path: "0.2.11.1.2.2.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Turkish Lira",
      path: "0.2.11.1.2.2.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Equities",
      path: "0.2.11.1.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "AEX Dividend Index",
      path: "0.2.11.1.2.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "AEX Index",
      path: "0.2.11.1.2.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "AMX Index",
      path: "0.2.11.1.2.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "BEL 20 Index",
      path: "0.2.11.1.2.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brazil ETF VIX",
      path: "0.2.11.1.2.3.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "CAC40 Dividend Index",
      path: "0.2.11.1.2.3.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "CAC40 Index",
      path: "0.2.11.1.2.3.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Oil ETF VIX",
      path: "0.2.11.1.2.3.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "DAX",
      path: "0.2.11.1.2.3.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "DivDAX",
      path: "0.2.11.1.2.3.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones Real Estate",
      path: "0.2.11.1.2.3.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Consumer Discretionary Sector",
      path: "0.2.11.1.2.3.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Consumer Staples Sector",
      path: "0.2.11.1.2.3.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Dow ($5)",
      path: "0.2.11.1.2.3.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Dow Jones",
      path: "0.2.11.1.2.3.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Financial Sector",
      path: "0.2.11.1.2.3.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini NASDAQ 100",
      path: "0.2.11.1.2.3.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Nasdaq 100 Index",
      path: "0.2.11.1.2.3.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini S&P 500 Index",
      path: "0.2.11.1.2.3.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini S&P MidCap 400",
      path: "0.2.11.1.2.3.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Technology Sector",
      path: "0.2.11.1.2.3.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Utilities Sector",
      path: "0.2.11.1.2.3.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "EURO STOXX 50 Index",
      path: "0.2.11.1.2.3.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "EURO STOXX 50 Index Dividend",
      path: "0.2.11.1.2.3.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "EURO STOXX 50 ex Financials Index",
      path: "0.2.11.1.2.3.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "EURO STOXX Select Dividend 30 Index",
      path: "0.2.11.1.2.3.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE 100 Declared Dividend Index",
      path: "0.2.11.1.2.3.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE 100 Dividend Index",
      path: "0.2.11.1.2.3.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE 100 Index",
      path: "0.2.11.1.2.3.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE 250 Index",
      path: "0.2.11.1.2.3.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE China A50 Index",
      path: "0.2.11.1.2.3.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE EPRA/NAREIT Euro Zone Index",
      path: "0.2.11.1.2.3.32"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE EPRA/NAREIT Europe Index",
      path: "0.2.11.1.2.3.33"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE Eurotop 100 Index",
      path: "0.2.11.1.2.3.34"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE Straits Times Index",
      path: "0.2.11.1.2.3.35"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSEUROFIRST 100 Index",
      path: "0.2.11.1.2.3.36"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSEUROFIRST 80 Index",
      path: "0.2.11.1.2.3.37"
    },
    model: "Category"
  },
  {
    data: {
      name: "Full-size Dow Jones",
      path: "0.2.11.1.2.3.38"
    },
    model: "Category"
  },
  {
    data: {
      name: "Full-size S&P 500 Index",
      path: "0.2.11.1.2.3.39"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold VIX",
      path: "0.2.11.1.2.3.40"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hang Seng Index",
      path: "0.2.11.1.2.3.41"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ibovespa Index",
      path: "0.2.11.1.2.3.42"
    },
    model: "Category"
  },
  {
    data: {
      name: "MDAX",
      path: "0.2.11.1.2.3.43"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Europe Index NTR",
      path: "0.2.11.1.2.3.44"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini AEX Index",
      path: "0.2.11.1.2.3.45"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini CAC40 Index",
      path: "0.2.11.1.2.3.46"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini Nikkei 225 Index",
      path: "0.2.11.1.2.3.47"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini S&P/TSX 60 Index",
      path: "0.2.11.1.2.3.48"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini S&P/TSX Composite Index",
      path: "0.2.11.1.2.3.49"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini-VIX Futures",
      path: "0.2.11.1.2.3.50"
    },
    model: "Category"
  },
  {
    data: {
      name: "NASDAQ 100 Index",
      path: "0.2.11.1.2.3.51"
    },
    model: "Category"
  },
  {
    data: {
      name: "NASDAQ 100 VIX",
      path: "0.2.11.1.2.3.52"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nifty Index",
      path: "0.2.11.1.2.3.53"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei 225",
      path: "0.2.11.1.2.3.54"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei 225 Index",
      path: "0.2.11.1.2.3.55"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei 225 Index",
      path: "0.2.11.1.2.3.56"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei 225 Mini",
      path: "0.2.11.1.2.3.57"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei 300",
      path: "0.2.11.1.2.3.58"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei Stock Average Dividend Point Index",
      path: "0.2.11.1.2.3.59"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei Stock Average Volatility Index",
      path: "0.2.11.1.2.3.60"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei/USD",
      path: "0.2.11.1.2.3.61"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei/Yen",
      path: "0.2.11.1.2.3.62"
    },
    model: "Category"
  },
  {
    data: {
      name: "OMXH25 Index",
      path: "0.2.11.1.2.3.63"
    },
    model: "Category"
  },
  {
    data: {
      name: "Osaka DJIA",
      path: "0.2.11.1.2.3.64"
    },
    model: "Category"
  },
  {
    data: {
      name: "PSI 20 Index",
      path: "0.2.11.1.2.3.65"
    },
    model: "Category"
  },
  {
    data: {
      name: "RDX USD Index",
      path: "0.2.11.1.2.3.66"
    },
    model: "Category"
  },
  {
    data: {
      name: "Russell 1000",
      path: "0.2.11.1.2.3.67"
    },
    model: "Category"
  },
  {
    data: {
      name: "Russell Growth",
      path: "0.2.11.1.2.3.68"
    },
    model: "Category"
  },
  {
    data: {
      name: "Russell Small-Cap",
      path: "0.2.11.1.2.3.69"
    },
    model: "Category"
  },
  {
    data: {
      name: "Russell Value",
      path: "0.2.11.1.2.3.70"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P 400 Midcap Index",
      path: "0.2.11.1.2.3.71"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P 500 VIX",
      path: "0.2.11.1.2.3.72"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P/TSX 60 Index",
      path: "0.2.11.1.2.3.73"
    },
    model: "Category"
  },
  {
    data: {
      name: "SLI Swiss Leader Index",
      path: "0.2.11.1.2.3.74"
    },
    model: "Category"
  },
  {
    data: {
      name: "SMI",
      path: "0.2.11.1.2.3.75"
    },
    model: "Category"
  },
  {
    data: {
      name: "SMIM",
      path: "0.2.11.1.2.3.76"
    },
    model: "Category"
  },
  {
    data: {
      name: "SPI 200 Index",
      path: "0.2.11.1.2.3.77"
    },
    model: "Category"
  },
  {
    data: {
      name: "STOXX Europe 50 Index",
      path: "0.2.11.1.2.3.78"
    },
    model: "Category"
  },
  {
    data: {
      name: "TOPIX Index",
      path: "0.2.11.1.2.3.79"
    },
    model: "Category"
  },
  {
    data: {
      name: "TecDAX",
      path: "0.2.11.1.2.3.80"
    },
    model: "Category"
  },
  {
    data: {
      name: "USD Nikkei 225 Index",
      path: "0.2.11.1.2.3.81"
    },
    model: "Category"
  },
  {
    data: {
      name: "VSTOXX",
      path: "0.2.11.1.2.3.82"
    },
    model: "Category"
  },
  {
    data: {
      name: "Indicies",
      path: "0.2.11.1.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Agriculture",
      path: "0.2.11.1.2.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Commodity Index",
      path: "0.2.11.1.2.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Commodity Index",
      path: "0.2.11.1.2.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS EX Energy Index",
      path: "0.2.11.1.2.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Energy Index",
      path: "0.2.11.1.2.4.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Grains",
      path: "0.2.11.1.2.4.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Industrial Metals",
      path: "0.2.11.1.2.4.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Livestock",
      path: "0.2.11.1.2.4.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Petroleum",
      path: "0.2.11.1.2.4.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Precious Metals",
      path: "0.2.11.1.2.4.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Softs",
      path: "0.2.11.1.2.4.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI AC Asia Pacific ex Japan Index Futures",
      path: "0.2.11.1.2.4.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Asia APEX 50 Index",
      path: "0.2.11.1.2.4.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Chile Index",
      path: "0.2.11.1.2.4.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI China Free Index",
      path: "0.2.11.1.2.4.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Columbia Index",
      path: "0.2.11.1.2.4.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Czech Republic Index",
      path: "0.2.11.1.2.4.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Egypt Index",
      path: "0.2.11.1.2.4.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Emerging Markets Asia Index",
      path: "0.2.11.1.2.4.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Emerging Markets EMEA Index",
      path: "0.2.11.1.2.4.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Emerging Markets Index",
      path: "0.2.11.1.2.4.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Emerging Markets Latin America Index",
      path: "0.2.11.1.2.4.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Europe Index",
      path: "0.2.11.1.2.4.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Frontier Markets Index",
      path: "0.2.11.1.2.4.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Hong Kong Index",
      path: "0.2.11.1.2.4.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Hungary Index",
      path: "0.2.11.1.2.4.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI India Index",
      path: "0.2.11.1.2.4.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Indonesia Index",
      path: "0.2.11.1.2.4.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Japan Index",
      path: "0.2.11.1.2.4.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Malaysia Index",
      path: "0.2.11.1.2.4.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Mexico Index",
      path: "0.2.11.1.2.4.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Morocco Index",
      path: "0.2.11.1.2.4.32"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Peru Index",
      path: "0.2.11.1.2.4.33"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Philippines Index",
      path: "0.2.11.1.2.4.34"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Poland Index",
      path: "0.2.11.1.2.4.35"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Russia Index",
      path: "0.2.11.1.2.4.36"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Russia Price Index",
      path: "0.2.11.1.2.4.37"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Singapore Index",
      path: "0.2.11.1.2.4.38"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI South Africa Index",
      path: "0.2.11.1.2.4.39"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Taiwan Index",
      path: "0.2.11.1.2.4.40"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Thailand Index",
      path: "0.2.11.1.2.4.41"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI World Index",
      path: "0.2.11.1.2.4.42"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P Goldman Sachs Commodity Index",
      path: "0.2.11.1.2.4.43"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P-GSCI Excess Return Index",
      path: "0.2.11.1.2.4.44"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P/TSX Capped Energy Index",
      path: "0.2.11.1.2.4.45"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P/TSX Capped Financials Index",
      path: "0.2.11.1.2.4.46"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P/TSX Capped Information Technology Index",
      path: "0.2.11.1.2.4.47"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P/TSX Global Gold Index",
      path: "0.2.11.1.2.4.48"
    },
    model: "Category"
  },
  {
    data: {
      name: "US Dollar Index",
      path: "0.2.11.1.2.4.49"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rates",
      path: "0.2.11.1.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "1-Month Eurodollar",
      path: "0.2.11.1.2.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "1-month EONIA",
      path: "0.2.11.1.2.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "1-month EONIA",
      path: "0.2.11.1.2.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "10 Year USD Deliverable Interest Rate Swap",
      path: "0.2.11.1.2.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "10-year Australian Interest Rate Swap",
      path: "0.2.11.1.2.5.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-Month Canadian Bankers Acceptance",
      path: "0.2.11.1.2.5.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-Month Eurodollar",
      path: "0.2.11.1.2.5.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-month Australian Overnight Index Swap",
      path: "0.2.11.1.2.5.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-month EONIA Swap",
      path: "0.2.11.1.2.5.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-month EURIBOR",
      path: "0.2.11.1.2.5.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-month EURIBOR",
      path: "0.2.11.1.2.5.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-month Euroyen",
      path: "0.2.11.1.2.5.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-month TIBOR",
      path: "0.2.11.1.2.5.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-year Australian Interest Rate Swap",
      path: "0.2.11.1.2.5.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "30-day Australian Interbank Cash Rate",
      path: "0.2.11.1.2.5.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "30-day Canadian Overnight Repo Rate",
      path: "0.2.11.1.2.5.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "30-day Fed Funds",
      path: "0.2.11.1.2.5.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "30-year Interest Rate Swap",
      path: "0.2.11.1.2.5.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "5-year Interest Rate Swap",
      path: "0.2.11.1.2.5.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Canadian Overnight Index Swap",
      path: "0.2.11.1.2.5.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "EUROSWISS Interest Rate",
      path: "0.2.11.1.2.5.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Eurodollar",
      path: "0.2.11.1.2.5.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euroyen LIBOR",
      path: "0.2.11.1.2.5.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euroyen TIBOR",
      path: "0.2.11.1.2.5.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euroyen TIBOR",
      path: "0.2.11.1.2.5.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Short Sterling",
      path: "0.2.11.1.2.5.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "By Exchange",
      path: "0.2.11.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "ASX",
      path: "0.2.11.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "10-year Australian Interest Rate Swap",
      path: "0.2.11.2.1.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "10-year New Zealand Government Stock",
      path: "0.2.11.2.1.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-month Australian Overnight Index Swap",
      path: "0.2.11.2.1.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-year Australian Interest Rate Swap",
      path: "0.2.11.2.1.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-year Australian Treasury Bonds",
      path: "0.2.11.2.1.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-year New Zealand Government Stock",
      path: "0.2.11.2.1.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "30-day Australian Interbank Cash Rate",
      path: "0.2.11.2.1.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "90-day Australian Bank Bills",
      path: "0.2.11.2.1.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "90-day New Zealand Bank Bills",
      path: "0.2.11.2.1.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Australia Feed Barley",
      path: "0.2.11.2.1.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Australia Sorghum",
      path: "0.2.11.2.1.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Eastern Australia (EA) Canola",
      path: "0.2.11.2.1.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Fine Wool",
      path: "0.2.11.2.1.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Greasy Wool",
      path: "0.2.11.2.1.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "New South Wales (NSW) Wheat",
      path: "0.2.11.2.1.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "SPI 200 Index",
      path: "0.2.11.2.1.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Western Australia (WA) Wheat",
      path: "0.2.11.2.1.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "CBOE",
      path: "0.2.11.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brazil ETF VIX",
      path: "0.2.11.2.2.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Oil ETF VIX",
      path: "0.2.11.2.2.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold VIX",
      path: "0.2.11.2.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini-VIX Futures",
      path: "0.2.11.2.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "NASDAQ 100 VIX",
      path: "0.2.11.2.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P 500 VIX",
      path: "0.2.11.2.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "CME",
      path: "0.2.11.2.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "1% Fuel Oil Cargoes FOB NWE (Platts) Crack Spread",
      path: "0.2.11.2.3.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "1% Fuel Oil Cargoes FOB NWE (Platts) vs. 3.5% Fuel Oil Barges FOB Rdam (Platts)",
      path: "0.2.11.2.3.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "1-Month Eurodollar",
      path: "0.2.11.2.3.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "10 Year USD Deliverable Interest Rate Swap",
      path: "0.2.11.2.3.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "10 Yr Note",
      path: "0.2.11.2.3.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "10-year Treasury Note",
      path: "0.2.11.2.3.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "2 Yr Note",
      path: "0.2.11.2.3.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "2-year Treasury Note",
      path: "0.2.11.2.3.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-Month Eurodollar",
      path: "0.2.11.2.3.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "3.5% Fuel Oil Barges FOB Rdam (Platts) Crack Spread",
      path: "0.2.11.2.3.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "3.5% Fuel Oil Barges FOB Rdam (Platts) Crack Spread (1000mt)",
      path: "0.2.11.2.3.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "30 Day Federal Funds",
      path: "0.2.11.2.3.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "30 Year USD Deliverable Interest Rate Swap",
      path: "0.2.11.2.3.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "30-day Fed Funds",
      path: "0.2.11.2.3.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "30-year Interest Rate Swap",
      path: "0.2.11.2.3.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "30-year Treasury Bond",
      path: "0.2.11.2.3.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "5 Year USD Deliverable Interest Rate Swap",
      path: "0.2.11.2.3.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "5 Yr Note",
      path: "0.2.11.2.3.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "5-year Interest Rate Swap",
      path: "0.2.11.2.3.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "5-year Treasury Note",
      path: "0.2.11.2.3.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "ANR Oklahoma Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Algonquin City-Gates Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Argus LLS vs. WTI (Argus) Trade Month",
      path: "0.2.11.2.3.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Australian Dollar",
      path: "0.2.11.2.3.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Australian Dollar",
      path: "0.2.11.2.3.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brazilian Real",
      path: "0.2.11.2.3.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brazilian Real",
      path: "0.2.11.2.3.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Crude Oil",
      path: "0.2.11.2.3.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Crude Oil Financial",
      path: "0.2.11.2.3.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Crude Oil vs. Dubai Crude Oil (Platts)",
      path: "0.2.11.2.3.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Financial",
      path: "0.2.11.2.3.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Look-Alike",
      path: "0.2.11.2.3.32"
    },
    model: "Category"
  },
  {
    data: {
      name: "British Pound",
      path: "0.2.11.2.3.33"
    },
    model: "Category"
  },
  {
    data: {
      name: "British Pound",
      path: "0.2.11.2.3.34"
    },
    model: "Category"
  },
  {
    data: {
      name: "British Pound/Japanese Yen",
      path: "0.2.11.2.3.35"
    },
    model: "Category"
  },
  {
    data: {
      name: "CIG Rockies Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.36"
    },
    model: "Category"
  },
  {
    data: {
      name: "Canadian Dollar",
      path: "0.2.11.2.3.37"
    },
    model: "Category"
  },
  {
    data: {
      name: "Canadian Dollar",
      path: "0.2.11.2.3.38"
    },
    model: "Category"
  },
  {
    data: {
      name: "Canadian Heavy Crude Oil Index (Net Energy)",
      path: "0.2.11.2.3.39"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cash Settled Butter",
      path: "0.2.11.2.3.40"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cash Settled Cheese",
      path: "0.2.11.2.3.41"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cash-Settled Cheese",
      path: "0.2.11.2.3.42"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cash-settled Butter",
      path: "0.2.11.2.3.43"
    },
    model: "Category"
  },
  {
    data: {
      name: "Chicago Ethanol (Platts)",
      path: "0.2.11.2.3.44"
    },
    model: "Category"
  },
  {
    data: {
      name: "Chicago ULSD (Platts) vs. NY Harbor ULSD",
      path: "0.2.11.2.3.45"
    },
    model: "Category"
  },
  {
    data: {
      name: "Class III Milk",
      path: "0.2.11.2.3.46"
    },
    model: "Category"
  },
  {
    data: {
      name: "Class IV Milk",
      path: "0.2.11.2.3.47"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coal",
      path: "0.2.11.2.3.48"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coal (API 8) cfr South China (Argus/McCloskey)",
      path: "0.2.11.2.3.49"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coal (API2) CIF ARA (ARGUS-McCloskey)",
      path: "0.2.11.2.3.50"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coal (API4) FOB Richards Bay (ARGUS-McCloskey)",
      path: "0.2.11.2.3.51"
    },
    model: "Category"
  },
  {
    data: {
      name: "Columbia Gas TCO (Platts IFERC) Basis",
      path: "0.2.11.2.3.52"
    },
    model: "Category"
  },
  {
    data: {
      name: "Columbia Gulf Louisiana Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.53"
    },
    model: "Category"
  },
  {
    data: {
      name: "Columbia Gulf Mainline Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.54"
    },
    model: "Category"
  },
  {
    data: {
      name: "Copper",
      path: "0.2.11.2.3.55"
    },
    model: "Category"
  },
  {
    data: {
      name: "Copper",
      path: "0.2.11.2.3.56"
    },
    model: "Category"
  },
  {
    data: {
      name: "Corn",
      path: "0.2.11.2.3.57"
    },
    model: "Category"
  },
  {
    data: {
      name: "Corn",
      path: "0.2.11.2.3.58"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Oil",
      path: "0.2.11.2.3.59"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Oil Financial",
      path: "0.2.11.2.3.60"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Palm Oil",
      path: "0.2.11.2.3.61"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Palm Oil",
      path: "0.2.11.2.3.62"
    },
    model: "Category"
  },
  {
    data: {
      name: "DJIA ($10)",
      path: "0.2.11.2.3.63"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dated Brent (Platts) Financial",
      path: "0.2.11.2.3.64"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dated Brent (Platts) to Frontline Brent",
      path: "0.2.11.2.3.65"
    },
    model: "Category"
  },
  {
    data: {
      name: "Deutsche Mark",
      path: "0.2.11.2.3.66"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dominion South Point Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.67"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones Real Estate",
      path: "0.2.11.2.3.68"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Commodity Index",
      path: "0.2.11.2.3.69"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Commodity Index",
      path: "0.2.11.2.3.70"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dry Whey",
      path: "0.2.11.2.3.71"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dry Whey",
      path: "0.2.11.2.3.72"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dubai Crude Oil (Platts) Financial",
      path: "0.2.11.2.3.73"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-micro British Pound/American Dollar",
      path: "0.2.11.2.3.74"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-micro Euro/American Dollar",
      path: "0.2.11.2.3.75"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-micro Gold",
      path: "0.2.11.2.3.76"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Consumer Discretionary Sector",
      path: "0.2.11.2.3.77"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Consumer Staples Sector",
      path: "0.2.11.2.3.78"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Crude Oil",
      path: "0.2.11.2.3.79"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Dow ($5)",
      path: "0.2.11.2.3.80"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Dow Jones",
      path: "0.2.11.2.3.81"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Euro FX",
      path: "0.2.11.2.3.82"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Financial Sector",
      path: "0.2.11.2.3.83"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Japanese Yen",
      path: "0.2.11.2.3.84"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini NASDAQ 100",
      path: "0.2.11.2.3.85"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Nasdaq 100 Index",
      path: "0.2.11.2.3.86"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Natural Gas",
      path: "0.2.11.2.3.87"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini S&P 500",
      path: "0.2.11.2.3.88"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini S&P 500 Index",
      path: "0.2.11.2.3.89"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini S&P MidCap 400",
      path: "0.2.11.2.3.90"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Technology Sector",
      path: "0.2.11.2.3.91"
    },
    model: "Category"
  },
  {
    data: {
      name: "E-mini Utilities Sector",
      path: "0.2.11.2.3.92"
    },
    model: "Category"
  },
  {
    data: {
      name: "EIA Flat Tax On-Highway Diesel",
      path: "0.2.11.2.3.93"
    },
    model: "Category"
  },
  {
    data: {
      name: "ERCOT North 345 kV Hub 5 MW Off-Peak",
      path: "0.2.11.2.3.94"
    },
    model: "Category"
  },
  {
    data: {
      name: "ERCOT North 345 kV Hub 5 MW Peak",
      path: "0.2.11.2.3.95"
    },
    model: "Category"
  },
  {
    data: {
      name: "ERCOT West 345 kV Hub 5 MW Off-Peak",
      path: "0.2.11.2.3.96"
    },
    model: "Category"
  },
  {
    data: {
      name: "ERCOT West 345 kV Hub 5 MW Peak",
      path: "0.2.11.2.3.97"
    },
    model: "Category"
  },
  {
    data: {
      name: "East-West Fuel Oil Spread (Platts)",
      path: "0.2.11.2.3.98"
    },
    model: "Category"
  },
  {
    data: {
      name: "Eastern Rail Delivery CSX Coal",
      path: "0.2.11.2.3.99"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ethanol",
      path: "0.2.11.2.3.100"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ethanol",
      path: "0.2.11.2.3.101"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ethanol Forward Month",
      path: "0.2.11.2.3.102"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ethanol T2 FOB Rdam Including Duty (Platts)",
      path: "0.2.11.2.3.103"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro FX",
      path: "0.2.11.2.3.104"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro FX",
      path: "0.2.11.2.3.105"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro/British Pound",
      path: "0.2.11.2.3.106"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro/Japanese Yen",
      path: "0.2.11.2.3.107"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro/Polish Zloty",
      path: "0.2.11.2.3.108"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro/Swiss Franc",
      path: "0.2.11.2.3.109"
    },
    model: "Category"
  },
  {
    data: {
      name: "Eurodollar",
      path: "0.2.11.2.3.110"
    },
    model: "Category"
  },
  {
    data: {
      name: "European 3.5% Fuel Oil Barges FOB Rdam (Platts)",
      path: "0.2.11.2.3.111"
    },
    model: "Category"
  },
  {
    data: {
      name: "European Gasoil Brent Crack Spread",
      path: "0.2.11.2.3.112"
    },
    model: "Category"
  },
  {
    data: {
      name: "European Naphtha (Platts) Crack Spread",
      path: "0.2.11.2.3.113"
    },
    model: "Category"
  },
  {
    data: {
      name: "European Naphtha Cargoes CIF NWE (Platts)",
      path: "0.2.11.2.3.114"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euroyen TIBOR",
      path: "0.2.11.2.3.115"
    },
    model: "Category"
  },
  {
    data: {
      name: "Feeder Cattle",
      path: "0.2.11.2.3.116"
    },
    model: "Category"
  },
  {
    data: {
      name: "Feeder Cattle",
      path: "0.2.11.2.3.117"
    },
    model: "Category"
  },
  {
    data: {
      name: "Florida Gas Zone 3 Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.118"
    },
    model: "Category"
  },
  {
    data: {
      name: "French Francs",
      path: "0.2.11.2.3.119"
    },
    model: "Category"
  },
  {
    data: {
      name: "Full-size Dow Jones",
      path: "0.2.11.2.3.120"
    },
    model: "Category"
  },
  {
    data: {
      name: "Full-size S&P 500 Index",
      path: "0.2.11.2.3.121"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gasoil 0.1 Barges FOB Rdam (Platts) vs. Gasoil",
      path: "0.2.11.2.3.122"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gasoline",
      path: "0.2.11.2.3.123"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gasoline Euro-bob Oxy NWE Barges (Argus)",
      path: "0.2.11.2.3.124"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gasoline Euro-bob Oxy NWE Barges (Argus) Crack Spread",
      path: "0.2.11.2.3.125"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold",
      path: "0.2.11.2.3.126"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold",
      path: "0.2.11.2.3.127"
    },
    model: "Category"
  },
  {
    data: {
      name: "Goldman Sachs - Excess Return",
      path: "0.2.11.2.3.128"
    },
    model: "Category"
  },
  {
    data: {
      name: "Goldman Sachs C.I.",
      path: "0.2.11.2.3.129"
    },
    model: "Category"
  },
  {
    data: {
      name: "Group Three ULSD (Platts) vs. NY Harbor ULSD",
      path: "0.2.11.2.3.130"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast Jet (Platts) Up-Down",
      path: "0.2.11.2.3.131"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast Jet Fuel (Platts)",
      path: "0.2.11.2.3.132"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast No. 6 Fuel Oil (Platts) Crack Spread",
      path: "0.2.11.2.3.133"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast No. 6 Fuel Oil 3.0% (Platts)",
      path: "0.2.11.2.3.134"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast No. 6 Fuel Oil 3.0% (Platts) vs. European 3.5% Fuel Oil Barges FOB Rdam (Platts)",
      path: "0.2.11.2.3.135"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast No.6 Fuel Oil 3.0% (Platts) Brent Crack Spread",
      path: "0.2.11.2.3.136"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast ULSD (Platts)",
      path: "0.2.11.2.3.137"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast ULSD (Platts) Crack Spread",
      path: "0.2.11.2.3.138"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast ULSD (Platts) Up-Down",
      path: "0.2.11.2.3.139"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast Unl 87 Gasoline M1 (Platts) Crack Spread",
      path: "0.2.11.2.3.140"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gulf Coast Unl 87 Gasoline M1 (Platts) vs. RBOB Gasoline",
      path: "0.2.11.2.3.141"
    },
    model: "Category"
  },
  {
    data: {
      name: "Heating Oil",
      path: "0.2.11.2.3.142"
    },
    model: "Category"
  },
  {
    data: {
      name: "Henry Hub Natural Gas (Platts Gas Daily/Platts IFERC) Index",
      path: "0.2.11.2.3.143"
    },
    model: "Category"
  },
  {
    data: {
      name: "Henry Hub Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.144"
    },
    model: "Category"
  },
  {
    data: {
      name: "Henry Hub Penultimate NP",
      path: "0.2.11.2.3.145"
    },
    model: "Category"
  },
  {
    data: {
      name: "Henry Hub Swap",
      path: "0.2.11.2.3.146"
    },
    model: "Category"
  },
  {
    data: {
      name: "Houston Ship Channel Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.147"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England Mass Hub 5 MW Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.148"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England Mass Hub Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.149"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England Mass Hub Day-Ahead Peak Calendar-Month 2.5 MW",
      path: "0.2.11.2.3.150"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England Monthly Off Peak LMP Swap Future",
      path: "0.2.11.2.3.151"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England New Hampshire Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.152"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England North East Massachusetts Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.153"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England North East Massachusetts Zone 5 MW Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.154"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England Rhode Island Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.155"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England Rhode Island Zone 5 MW Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.156"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England South East Massachusetts Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.157"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England West Central Massachusetts Zone 5 MW Off-Peak Calendar-Month Day Ahead LMP",
      path: "0.2.11.2.3.158"
    },
    model: "Category"
  },
  {
    data: {
      name: "ISO New England West Central Massachusetts Zone 5 MW Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.159"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ibovespa Index",
      path: "0.2.11.2.3.160"
    },
    model: "Category"
  },
  {
    data: {
      name: "In Delivery Month European Union Allowance (EUA)",
      path: "0.2.11.2.3.161"
    },
    model: "Category"
  },
  {
    data: {
      name: "Indonesian Coal (McCloskey sub-bituminous)",
      path: "0.2.11.2.3.162"
    },
    model: "Category"
  },
  {
    data: {
      name: "Iron Ore 62% Fe CFR China (TSI)",
      path: "0.2.11.2.3.163"
    },
    model: "Category"
  },
  {
    data: {
      name: "Japanese Yen",
      path: "0.2.11.2.3.164"
    },
    model: "Category"
  },
  {
    data: {
      name: "Japanese Yen",
      path: "0.2.11.2.3.165"
    },
    model: "Category"
  },
  {
    data: {
      name: "KC HRW Wheat",
      path: "0.2.11.2.3.166"
    },
    model: "Category"
  },
  {
    data: {
      name: "Kansas City Hard Red Winter Wheat",
      path: "0.2.11.2.3.167"
    },
    model: "Category"
  },
  {
    data: {
      name: "Kansas City Value Line",
      path: "0.2.11.2.3.168"
    },
    model: "Category"
  },
  {
    data: {
      name: "LLS (Argus) vs. WTI Financial",
      path: "0.2.11.2.3.169"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lean Hog",
      path: "0.2.11.2.3.170"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lean Hogs",
      path: "0.2.11.2.3.171"
    },
    model: "Category"
  },
  {
    data: {
      name: "Live Cattle",
      path: "0.2.11.2.3.172"
    },
    model: "Category"
  },
  {
    data: {
      name: "Live Cattle",
      path: "0.2.11.2.3.173"
    },
    model: "Category"
  },
  {
    data: {
      name: "Los Angeles Jet (OPIS) vs. NY Harbor ULSD",
      path: "0.2.11.2.3.174"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lumber",
      path: "0.2.11.2.3.175"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub (formerly Cinergy Hub) 5 Month Peak Calendar-Month Real-Time",
      path: "0.2.11.2.3.176"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub (formerly Cinergy Hub) Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.177"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub (formerly Cinergy Hub) Day-Ahead Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.178"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub (formerly Cinergy Hub) Off-Peak LMP",
      path: "0.2.11.2.3.179"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub (formerly Cinergy Hub) Real-Time Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.180"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub (formerly Cinergy Hub) Real-Time Peak Calendar-Month 2.5 MW",
      path: "0.2.11.2.3.181"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.182"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub Day-Ahead Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.183"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub Real-Time Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.184"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Indiana Hub Real-Time Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.185"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Michigan Hub 5 MW Off-Peak Calendar-Month Day-Ahead",
      path: "0.2.11.2.3.186"
    },
    model: "Category"
  },
  {
    data: {
      name: "MISO Michigan Hub 5 MW Peak Calendar-Month Day-Ahead",
      path: "0.2.11.2.3.187"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mars (Argus) vs. WTI Financial",
      path: "0.2.11.2.3.188"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mexican Peso",
      path: "0.2.11.2.3.189"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mexican Peso",
      path: "0.2.11.2.3.190"
    },
    model: "Category"
  },
  {
    data: {
      name: "MichCon Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.191"
    },
    model: "Category"
  },
  {
    data: {
      name: "Milk",
      path: "0.2.11.2.3.192"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini European 3.5% Fuel Oil Barges FOB Rdam (Platts)",
      path: "0.2.11.2.3.193"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini European Naphtha CIF NWE (Platts)",
      path: "0.2.11.2.3.194"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini Gasoline Euro-bob Oxy NWE Barges (Argus)",
      path: "0.2.11.2.3.195"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini Japan C&F Naphtha (Platts)",
      path: "0.2.11.2.3.196"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini Singapore Fuel Oil 180 cst (Platts)",
      path: "0.2.11.2.3.197"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini Singapore Fuel Oil 380 cst (Platts)",
      path: "0.2.11.2.3.198"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini Soybean",
      path: "0.2.11.2.3.199"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini Wheat",
      path: "0.2.11.2.3.200"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini-Corn",
      path: "0.2.11.2.3.201"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Ethane (OPIS)",
      path: "0.2.11.2.3.202"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Ethylene (PCW) Financial",
      path: "0.2.11.2.3.203"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Iso-Butane (OPIS)",
      path: "0.2.11.2.3.204"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu LDH Propane (OPIS)",
      path: "0.2.11.2.3.205"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Natural Gasoline (OPIS)",
      path: "0.2.11.2.3.206"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Normal Butane (OPIS)",
      path: "0.2.11.2.3.207"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Normal Butane LDH (OPIS)",
      path: "0.2.11.2.3.208"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mont Belvieu Spot Ethylene In-Well",
      path: "0.2.11.2.3.209"
    },
    model: "Category"
  },
  {
    data: {
      name: "Municipal Bonds",
      path: "0.2.11.2.3.210"
    },
    model: "Category"
  },
  {
    data: {
      name: "NASDAQ 100",
      path: "0.2.11.2.3.211"
    },
    model: "Category"
  },
  {
    data: {
      name: "NASDAQ 100 Index",
      path: "0.2.11.2.3.212"
    },
    model: "Category"
  },
  {
    data: {
      name: "NGPL Mid-Con Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.213"
    },
    model: "Category"
  },
  {
    data: {
      name: "NGPL TexOk Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.214"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY 1% Fuel Oil (Platts) vs. Gulf Coast 3% Fuel Oil (Platts)",
      path: "0.2.11.2.3.215"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Fuel Oil 1.0% (Platts) vs. European 1% Fuel Oil Cargoes FOB NWE (Platts)",
      path: "0.2.11.2.3.216"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Harbor ULSD",
      path: "0.2.11.2.3.217"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Harbor ULSD Brent Crack Spread",
      path: "0.2.11.2.3.218"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Harbor ULSD Crack Spread",
      path: "0.2.11.2.3.219"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Harbor ULSD Financial",
      path: "0.2.11.2.3.220"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Harbor ULSD vs. Gasoil",
      path: "0.2.11.2.3.221"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Heating Oil (Platts) vs. NY Harbor ULSD",
      path: "0.2.11.2.3.222"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY Jet Fuel (Platts) vs. NY Harbor ULSD",
      path: "0.2.11.2.3.223"
    },
    model: "Category"
  },
  {
    data: {
      name: "NY ULSD (Argus) vs. NY Harbor ULSD",
      path: "0.2.11.2.3.224"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone A Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.225"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone A Day-Ahead Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.226"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone A Off-Peak LBMP",
      path: "0.2.11.2.3.227"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone A Peak LBMP",
      path: "0.2.11.2.3.228"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone C 5 MW Off-Peak Calendar-Month Day-Ahead LBMP",
      path: "0.2.11.2.3.229"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone C 5 MW Peak Calendar-Month Day-Ahead LBMP",
      path: "0.2.11.2.3.230"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone E 5 MW Off-Peak Calendar-Month Day-Ahead LBMP",
      path: "0.2.11.2.3.231"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone F 5 MW Off-Peak Calendar-Month Day-Ahead LBMP",
      path: "0.2.11.2.3.232"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone F 5 MW Peak Calendar-Month Day-Ahead LBMP",
      path: "0.2.11.2.3.233"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone G Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.234"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone G Day-Ahead Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.235"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone G Off-Peak LBMP",
      path: "0.2.11.2.3.236"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone G Peak LBMP",
      path: "0.2.11.2.3.237"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone J Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.238"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone J Day-Ahead Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.239"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone J Off-Peak LBMP",
      path: "0.2.11.2.3.240"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYISO Zone J Peak LBMP",
      path: "0.2.11.2.3.241"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas",
      path: "0.2.11.2.3.242"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas (Henry Hub) Last-day Financial",
      path: "0.2.11.2.3.243"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas (Henry Hub) Penultimate Financial",
      path: "0.2.11.2.3.244"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas (Henry Hub) Physical",
      path: "0.2.11.2.3.245"
    },
    model: "Category"
  },
  {
    data: {
      name: "New York Harbor Residual Fuel 1.0% (Platts)",
      path: "0.2.11.2.3.246"
    },
    model: "Category"
  },
  {
    data: {
      name: "New Zealand Dollar",
      path: "0.2.11.2.3.247"
    },
    model: "Category"
  },
  {
    data: {
      name: "New Zealand Dollar",
      path: "0.2.11.2.3.248"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei 225 Index",
      path: "0.2.11.2.3.249"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei/USD",
      path: "0.2.11.2.3.250"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei/Yen",
      path: "0.2.11.2.3.251"
    },
    model: "Category"
  },
  {
    data: {
      name: "Non-fat Dry Milk",
      path: "0.2.11.2.3.252"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nonfat Dry Milk",
      path: "0.2.11.2.3.253"
    },
    model: "Category"
  },
  {
    data: {
      name: "Oats",
      path: "0.2.11.2.3.254"
    },
    model: "Category"
  },
  {
    data: {
      name: "Oats",
      path: "0.2.11.2.3.255"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ontario Off-Peak Calendar-Month",
      path: "0.2.11.2.3.256"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ontario Peak Calendar-Month",
      path: "0.2.11.2.3.257"
    },
    model: "Category"
  },
  {
    data: {
      name: "PG&E Citygate Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.258"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AECO Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.259"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AECO Zone Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.260"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AEP Dayton Hub 5MW Peak Calendar-Month Real-Time LMP",
      path: "0.2.11.2.3.261"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AEP Dayton Hub Day-Ahead LMP Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.262"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AEP Dayton Hub Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.263"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AEP Dayton Hub Off-Peak LMP",
      path: "0.2.11.2.3.264"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AEP Dayton Hub Real-Time Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.265"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM AEP Dayton Hub Real-Time Peak Calendar-Month 2.5 MW",
      path: "0.2.11.2.3.266"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM APS Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.267"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM APS Zone Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.268"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM ATSI Zone 5 MW Off-Peak Calendar-Month Day-Ahead",
      path: "0.2.11.2.3.269"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM BGE Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.270"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM BGE Zone Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.271"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM ComEd Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.272"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM ComEd Zone 5 MW Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.273"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM DPL Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.274"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Duquesne Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.275"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM JCPL Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.276"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM JCPL Zone Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.277"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM METED Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.278"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM METED Zone Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.279"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Northern Illinois Hub 5 MW Peak Calendar-Month Real-Time LMP",
      path: "0.2.11.2.3.280"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Northern Illinois Hub Day-Ahead LMP Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.281"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Northern Illinois Hub Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.282"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Northern Illinois Hub Off-Peak LMP",
      path: "0.2.11.2.3.283"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Northern Illinois Hub Real-Time Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.284"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Northern Illinois Hub Real-Time Peak Calendar-Month 2.5 MW",
      path: "0.2.11.2.3.285"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Off-Peak Calendar-Month LMP",
      path: "0.2.11.2.3.286"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM PECO Zone 5 MW Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.287"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM PECO Zone 5 MW Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.288"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM PPL Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.289"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM PPL Zone Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.290"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM PSEG Zone Off-Peak Calendar-Month Day-Ahead LMP",
      path: "0.2.11.2.3.291"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM PSEG Zone Peak Calendar-Month Day-Ahead LMP 5 MW",
      path: "0.2.11.2.3.292"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Western Hub Day-Ahead Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.293"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Western Hub Day-Ahead Peak Calendar-Month 5 MW  ",
      path: "0.2.11.2.3.294"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Western Hub Peak Calendar-Month Real-Time LMP",
      path: "0.2.11.2.3.295"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Western Hub Real-Time Off-Peak Calendar-Month 5 MW",
      path: "0.2.11.2.3.296"
    },
    model: "Category"
  },
  {
    data: {
      name: "PJM Western Hub Real-Time Peak Calendar-Month 2.5 MW",
      path: "0.2.11.2.3.297"
    },
    model: "Category"
  },
  {
    data: {
      name: "Palladium",
      path: "0.2.11.2.3.298"
    },
    model: "Category"
  },
  {
    data: {
      name: "Palladium",
      path: "0.2.11.2.3.299"
    },
    model: "Category"
  },
  {
    data: {
      name: "Panhandle Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.300"
    },
    model: "Category"
  },
  {
    data: {
      name: "Platinum",
      path: "0.2.11.2.3.301"
    },
    model: "Category"
  },
  {
    data: {
      name: "Platinum",
      path: "0.2.11.2.3.302"
    },
    model: "Category"
  },
  {
    data: {
      name: "Polish Zloty",
      path: "0.2.11.2.3.303"
    },
    model: "Category"
  },
  {
    data: {
      name: "Pork Belly",
      path: "0.2.11.2.3.304"
    },
    model: "Category"
  },
  {
    data: {
      name: "Powder River Basin Coal (Platts OTC Broker Index)",
      path: "0.2.11.2.3.305"
    },
    model: "Category"
  },
  {
    data: {
      name: "Propane Non-LDH Mont Belvieu (OPIS)",
      path: "0.2.11.2.3.306"
    },
    model: "Category"
  },
  {
    data: {
      name: "RBOB Gasoline Brent Crack Spread",
      path: "0.2.11.2.3.307"
    },
    model: "Category"
  },
  {
    data: {
      name: "RBOB Gasoline Crack Spread",
      path: "0.2.11.2.3.308"
    },
    model: "Category"
  },
  {
    data: {
      name: "RBOB Gasoline Financial",
      path: "0.2.11.2.3.309"
    },
    model: "Category"
  },
  {
    data: {
      name: "RBOB Gasoline Physical",
      path: "0.2.11.2.3.310"
    },
    model: "Category"
  },
  {
    data: {
      name: "Random Length Lumber",
      path: "0.2.11.2.3.311"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rockies Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.312"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rough Rice",
      path: "0.2.11.2.3.313"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rough Rice",
      path: "0.2.11.2.3.314"
    },
    model: "Category"
  },
  {
    data: {
      name: "Russian Ruble",
      path: "0.2.11.2.3.315"
    },
    model: "Category"
  },
  {
    data: {
      name: "Russian Ruble",
      path: "0.2.11.2.3.316"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P 400 Midcap Index",
      path: "0.2.11.2.3.317"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P 500",
      path: "0.2.11.2.3.318"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P Goldman Sachs Commodity Index",
      path: "0.2.11.2.3.319"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P-GSCI Excess Return Index",
      path: "0.2.11.2.3.320"
    },
    model: "Category"
  },
  {
    data: {
      name: "San Juan Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.321"
    },
    model: "Category"
  },
  {
    data: {
      name: "Silver",
      path: "0.2.11.2.3.322"
    },
    model: "Category"
  },
  {
    data: {
      name: "Silver",
      path: "0.2.11.2.3.323"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Fuel Oil 180 cst (Platts)",
      path: "0.2.11.2.3.324"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Fuel Oil 180 cst (Platts) vs. 380 cst (Platts)",
      path: "0.2.11.2.3.325"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Fuel Oil 380 cst (Platts)",
      path: "0.2.11.2.3.326"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Gasoil (Platts)",
      path: "0.2.11.2.3.327"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Gasoil (Platts) vs. Gasoil",
      path: "0.2.11.2.3.328"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Jet Kerosene (Platts)",
      path: "0.2.11.2.3.329"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Jet Kerosene (Platts) vs. Gasoil (Platts)",
      path: "0.2.11.2.3.330"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Mogas 92 Unleaded (Platts)",
      path: "0.2.11.2.3.331"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Mogas 92 Unleaded (Platts) Brent Crack Spread",
      path: "0.2.11.2.3.332"
    },
    model: "Category"
  },
  {
    data: {
      name: "SoCal Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.333"
    },
    model: "Category"
  },
  {
    data: {
      name: "SoCal Natural Gas (Platts IFERC) Fixed Price",
      path: "0.2.11.2.3.334"
    },
    model: "Category"
  },
  {
    data: {
      name: "South African Rand",
      path: "0.2.11.2.3.335"
    },
    model: "Category"
  },
  {
    data: {
      name: "Southern Natural Louisiana Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.336"
    },
    model: "Category"
  },
  {
    data: {
      name: "Southern Star Tx.-Okla.-Kan. Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.337"
    },
    model: "Category"
  },
  {
    data: {
      name: "Soybean",
      path: "0.2.11.2.3.338"
    },
    model: "Category"
  },
  {
    data: {
      name: "Soybean Meal",
      path: "0.2.11.2.3.339"
    },
    model: "Category"
  },
  {
    data: {
      name: "Soybean Meal",
      path: "0.2.11.2.3.340"
    },
    model: "Category"
  },
  {
    data: {
      name: "Soybean Oil",
      path: "0.2.11.2.3.341"
    },
    model: "Category"
  },
  {
    data: {
      name: "Soybean Oil",
      path: "0.2.11.2.3.342"
    },
    model: "Category"
  },
  {
    data: {
      name: "Soybeans",
      path: "0.2.11.2.3.343"
    },
    model: "Category"
  },
  {
    data: {
      name: "Standard-Size USD/Offshore RMB (CNH)",
      path: "0.2.11.2.3.344"
    },
    model: "Category"
  },
  {
    data: {
      name: "Sumas Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.345"
    },
    model: "Category"
  },
  {
    data: {
      name: "Swiss Franc",
      path: "0.2.11.2.3.346"
    },
    model: "Category"
  },
  {
    data: {
      name: "Swiss Franc",
      path: "0.2.11.2.3.347"
    },
    model: "Category"
  },
  {
    data: {
      name: "T-Bills",
      path: "0.2.11.2.3.348"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tennessee 500 Leg Natural Gas (Platts Gas Daily/Platts IFERC) Index",
      path: "0.2.11.2.3.349"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tennessee 800 Leg Natural Gas (Platts Gas Daily/Platts IFERC) Index",
      path: "0.2.11.2.3.350"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tennessee 800 Leg Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.351"
    },
    model: "Category"
  },
  {
    data: {
      name: "Texas Eastern Zone M-3 Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.352"
    },
    model: "Category"
  },
  {
    data: {
      name: "Texas Gas Zone 1 Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.353"
    },
    model: "Category"
  },
  {
    data: {
      name: "Transco Zone 3 Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.354"
    },
    model: "Category"
  },
  {
    data: {
      name: "Transco Zone 4 Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.355"
    },
    model: "Category"
  },
  {
    data: {
      name: "Transco Zone 6 Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.356"
    },
    model: "Category"
  },
  {
    data: {
      name: "Transco Zone 6 Non-N.Y. Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.357"
    },
    model: "Category"
  },
  {
    data: {
      name: "Turkish Lira",
      path: "0.2.11.2.3.358"
    },
    model: "Category"
  },
  {
    data: {
      name: "U.S. Midwest Domestic Hot-Rolled Coil Steel (CRU) Index",
      path: "0.2.11.2.3.359"
    },
    model: "Category"
  },
  {
    data: {
      name: "U.S. Treasury Bond",
      path: "0.2.11.2.3.360"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ultra Treasury Bond",
      path: "0.2.11.2.3.361"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ultra U.S. Treasury Bond",
      path: "0.2.11.2.3.362"
    },
    model: "Category"
  },
  {
    data: {
      name: "Unleaded Gasoline",
      path: "0.2.11.2.3.363"
    },
    model: "Category"
  },
  {
    data: {
      name: "UxC Uranium U3O8",
      path: "0.2.11.2.3.364"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ventura Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.365"
    },
    model: "Category"
  },
  {
    data: {
      name: "WTI Crude Oil",
      path: "0.2.11.2.3.366"
    },
    model: "Category"
  },
  {
    data: {
      name: "WTI Financial",
      path: "0.2.11.2.3.367"
    },
    model: "Category"
  },
  {
    data: {
      name: "WTI Midland (Argus) vs. WTI Financial",
      path: "0.2.11.2.3.368"
    },
    model: "Category"
  },
  {
    data: {
      name: "WTI-Brent Bullet",
      path: "0.2.11.2.3.369"
    },
    model: "Category"
  },
  {
    data: {
      name: "WTI-Brent Financial",
      path: "0.2.11.2.3.370"
    },
    model: "Category"
  },
  {
    data: {
      name: "WTS (Argus) vs. WTI Trade Month",
      path: "0.2.11.2.3.371"
    },
    model: "Category"
  },
  {
    data: {
      name: "Waha Natural Gas (Platts IFERC) Basis",
      path: "0.2.11.2.3.372"
    },
    model: "Category"
  },
  {
    data: {
      name: "Wheat",
      path: "0.2.11.2.3.373"
    },
    model: "Category"
  },
  {
    data: {
      name: "Wheat",
      path: "0.2.11.2.3.374"
    },
    model: "Category"
  },
  {
    data: {
      name: "EEX",
      path: "0.2.11.2.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Belgian Base Month Electricity",
      path: "0.2.11.2.4.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Belgian Base Quarter Electricity",
      path: "0.2.11.2.4.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Belgian Base Year Electricity",
      path: "0.2.11.2.4.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dutch Base Month Electricity",
      path: "0.2.11.2.4.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dutch Base Quarter Electricity",
      path: "0.2.11.2.4.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dutch Base Year Electricity",
      path: "0.2.11.2.4.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dutch Peak Month Electricity",
      path: "0.2.11.2.4.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dutch Peak Quarter Electricity",
      path: "0.2.11.2.4.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dutch Peak Year Electricity",
      path: "0.2.11.2.4.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "EUREX",
      path: "0.2.11.2.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "1-month EONIA",
      path: "0.2.11.2.5.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-month EURIBOR",
      path: "0.2.11.2.5.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Butter",
      path: "0.2.11.2.5.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "CER Mid December",
      path: "0.2.11.2.5.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "DAX",
      path: "0.2.11.2.5.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "DivDAX",
      path: "0.2.11.2.5.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Agriculture",
      path: "0.2.11.2.5.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Commodity Index",
      path: "0.2.11.2.5.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS EX Energy Index",
      path: "0.2.11.2.5.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Energy Index",
      path: "0.2.11.2.5.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Grains",
      path: "0.2.11.2.5.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Industrial Metals",
      path: "0.2.11.2.5.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Livestock",
      path: "0.2.11.2.5.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Petroleum",
      path: "0.2.11.2.5.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Precious Metals",
      path: "0.2.11.2.5.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Dow Jones-UBS Softs",
      path: "0.2.11.2.5.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "ERU (Emission Reduction Units)",
      path: "0.2.11.2.5.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "EUA (EU Emission Allowances)",
      path: "0.2.11.2.5.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "EUAA (EU Aviation Allowance)",
      path: "0.2.11.2.5.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "EURO STOXX 50 Index",
      path: "0.2.11.2.5.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "EURO STOXX 50 Index Dividend",
      path: "0.2.11.2.5.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "EURO STOXX 50 ex Financials Index",
      path: "0.2.11.2.5.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "EURO STOXX Select Dividend 30 Index",
      path: "0.2.11.2.5.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro-Bobl",
      path: "0.2.11.2.5.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro-Bund",
      path: "0.2.11.2.5.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro-Buxl",
      path: "0.2.11.2.5.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro-OAT",
      path: "0.2.11.2.5.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euro-Schatz",
      path: "0.2.11.2.5.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hogs",
      path: "0.2.11.2.5.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Long-Term Euro-BTP",
      path: "0.2.11.2.5.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "MDAX",
      path: "0.2.11.2.5.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI AC Asia Pacific ex Japan Index Futures",
      path: "0.2.11.2.5.32"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Chile Index",
      path: "0.2.11.2.5.33"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI China Free Index",
      path: "0.2.11.2.5.34"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Columbia Index",
      path: "0.2.11.2.5.35"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Czech Republic Index",
      path: "0.2.11.2.5.36"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Egypt Index",
      path: "0.2.11.2.5.37"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Emerging Markets Asia Index",
      path: "0.2.11.2.5.38"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Emerging Markets EMEA Index",
      path: "0.2.11.2.5.39"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Emerging Markets Index",
      path: "0.2.11.2.5.40"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Emerging Markets Latin America Index",
      path: "0.2.11.2.5.41"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Europe Index",
      path: "0.2.11.2.5.42"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Frontier Markets Index",
      path: "0.2.11.2.5.43"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Hungary Index",
      path: "0.2.11.2.5.44"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI India Index",
      path: "0.2.11.2.5.45"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Japan Index",
      path: "0.2.11.2.5.46"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Malaysia Index",
      path: "0.2.11.2.5.47"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Mexico Index",
      path: "0.2.11.2.5.48"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Morocco Index",
      path: "0.2.11.2.5.49"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Peru Index",
      path: "0.2.11.2.5.50"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Philippines Index",
      path: "0.2.11.2.5.51"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Poland Index",
      path: "0.2.11.2.5.52"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Russia Index",
      path: "0.2.11.2.5.53"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Russia Price Index",
      path: "0.2.11.2.5.54"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI South Africa Index",
      path: "0.2.11.2.5.55"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Thailand Index",
      path: "0.2.11.2.5.56"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI World Index",
      path: "0.2.11.2.5.57"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mid-Term Euro-OAT",
      path: "0.2.11.2.5.58"
    },
    model: "Category"
  },
  {
    data: {
      name: "OMXH25 Index",
      path: "0.2.11.2.5.59"
    },
    model: "Category"
  },
  {
    data: {
      name: "Piglets",
      path: "0.2.11.2.5.60"
    },
    model: "Category"
  },
  {
    data: {
      name: "Potato",
      path: "0.2.11.2.5.61"
    },
    model: "Category"
  },
  {
    data: {
      name: "RDX USD Index",
      path: "0.2.11.2.5.62"
    },
    model: "Category"
  },
  {
    data: {
      name: "SLI Swiss Leader Index",
      path: "0.2.11.2.5.63"
    },
    model: "Category"
  },
  {
    data: {
      name: "SMI",
      path: "0.2.11.2.5.64"
    },
    model: "Category"
  },
  {
    data: {
      name: "SMIM",
      path: "0.2.11.2.5.65"
    },
    model: "Category"
  },
  {
    data: {
      name: "STOXX Europe 50 Index",
      path: "0.2.11.2.5.66"
    },
    model: "Category"
  },
  {
    data: {
      name: "Short-Term Euro-BTP",
      path: "0.2.11.2.5.67"
    },
    model: "Category"
  },
  {
    data: {
      name: "Skimmed Milk Powder",
      path: "0.2.11.2.5.68"
    },
    model: "Category"
  },
  {
    data: {
      name: "Swiss CONF",
      path: "0.2.11.2.5.69"
    },
    model: "Category"
  },
  {
    data: {
      name: "TecDAX",
      path: "0.2.11.2.5.70"
    },
    model: "Category"
  },
  {
    data: {
      name: "VSTOXX",
      path: "0.2.11.2.5.71"
    },
    model: "Category"
  },
  {
    data: {
      name: "Whey Powder",
      path: "0.2.11.2.5.72"
    },
    model: "Category"
  },
  {
    data: {
      name: "ICE",
      path: "0.2.11.2.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Barley",
      path: "0.2.11.2.6.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Crude Oil",
      path: "0.2.11.2.6.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "CER Emissions",
      path: "0.2.11.2.6.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "CRB Commodity Index",
      path: "0.2.11.2.6.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Canola",
      path: "0.2.11.2.6.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cocoa",
      path: "0.2.11.2.6.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coffee C",
      path: "0.2.11.2.6.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cotton",
      path: "0.2.11.2.6.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Durum Wheat",
      path: "0.2.11.2.6.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "EUA (EU Emission Allowances)",
      path: "0.2.11.2.6.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gasoil",
      path: "0.2.11.2.6.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Low Sulphur Gasoil",
      path: "0.2.11.2.6.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Milling Wheat",
      path: "0.2.11.2.6.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "NYSE Composite Index",
      path: "0.2.11.2.6.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Orange Juice",
      path: "0.2.11.2.6.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Richards Bay Coal",
      path: "0.2.11.2.6.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Rotterdam Coal",
      path: "0.2.11.2.6.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Russell 1000",
      path: "0.2.11.2.6.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Russell Growth",
      path: "0.2.11.2.6.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Russell Small-Cap",
      path: "0.2.11.2.6.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Russell Value",
      path: "0.2.11.2.6.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Sugar No. 11",
      path: "0.2.11.2.6.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Sugar No.16",
      path: "0.2.11.2.6.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "UK Base Electricity",
      path: "0.2.11.2.6.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "UK Natural Gas",
      path: "0.2.11.2.6.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "UK Peak Electricity",
      path: "0.2.11.2.6.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "US Dollar Index",
      path: "0.2.11.2.6.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "LIFFE",
      path: "0.2.11.2.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "1-month EONIA",
      path: "0.2.11.2.7.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-month EONIA Swap",
      path: "0.2.11.2.7.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-month EURIBOR",
      path: "0.2.11.2.7.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-month TIBOR",
      path: "0.2.11.2.7.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "AEX Dividend Index",
      path: "0.2.11.2.7.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "AEX Index",
      path: "0.2.11.2.7.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "AMX Index",
      path: "0.2.11.2.7.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "BEL 20 Index",
      path: "0.2.11.2.7.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "CAC40 Dividend Index",
      path: "0.2.11.2.7.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "CAC40 Index",
      path: "0.2.11.2.7.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cocoa (LIFFE)",
      path: "0.2.11.2.7.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Coffee (LIFFE)",
      path: "0.2.11.2.7.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "EUROSWISS Interest Rate",
      path: "0.2.11.2.7.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE 100 Declared Dividend Index",
      path: "0.2.11.2.7.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE 100 Dividend Index",
      path: "0.2.11.2.7.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE 100 Index",
      path: "0.2.11.2.7.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE 250 Index",
      path: "0.2.11.2.7.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE EPRA/NAREIT Euro Zone Index",
      path: "0.2.11.2.7.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE EPRA/NAREIT Europe Index",
      path: "0.2.11.2.7.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE Eurotop 100 Index",
      path: "0.2.11.2.7.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE Eurotop 100 Index",
      path: "0.2.11.2.7.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSEUROFIRST 100 Index",
      path: "0.2.11.2.7.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSEUROFIRST 80 Index",
      path: "0.2.11.2.7.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Japanese Government Bond",
      path: "0.2.11.2.7.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "London Feed Wheat",
      path: "0.2.11.2.7.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Long Gilt",
      path: "0.2.11.2.7.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Europe Index NTR",
      path: "0.2.11.2.7.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Medium Gilt",
      path: "0.2.11.2.7.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini AEX Index",
      path: "0.2.11.2.7.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini CAC40 Index",
      path: "0.2.11.2.7.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "PSI 20 Index",
      path: "0.2.11.2.7.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "Paris Corn",
      path: "0.2.11.2.7.32"
    },
    model: "Category"
  },
  {
    data: {
      name: "Paris Malting Barley",
      path: "0.2.11.2.7.33"
    },
    model: "Category"
  },
  {
    data: {
      name: "Paris Milling Wheat",
      path: "0.2.11.2.7.34"
    },
    model: "Category"
  },
  {
    data: {
      name: "Paris Rapeseed",
      path: "0.2.11.2.7.35"
    },
    model: "Category"
  },
  {
    data: {
      name: "Short Gilt",
      path: "0.2.11.2.7.36"
    },
    model: "Category"
  },
  {
    data: {
      name: "Short Sterling",
      path: "0.2.11.2.7.37"
    },
    model: "Category"
  },
  {
    data: {
      name: "Skimmed Milk Powder",
      path: "0.2.11.2.7.38"
    },
    model: "Category"
  },
  {
    data: {
      name: "TOPIX Index",
      path: "0.2.11.2.7.39"
    },
    model: "Category"
  },
  {
    data: {
      name: "White Sugar",
      path: "0.2.11.2.7.40"
    },
    model: "Category"
  },
  {
    data: {
      name: "MCX",
      path: "0.2.11.2.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Aluminium",
      path: "0.2.11.2.8.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Aluminium Mini",
      path: "0.2.11.2.8.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Brent Crude Oil",
      path: "0.2.11.2.8.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cardamom",
      path: "0.2.11.2.8.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Copper",
      path: "0.2.11.2.8.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Copper Mini",
      path: "0.2.11.2.8.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Cotton",
      path: "0.2.11.2.8.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Crude Oil",
      path: "0.2.11.2.8.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold",
      path: "0.2.11.2.8.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold Guinea",
      path: "0.2.11.2.8.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold Mini",
      path: "0.2.11.2.8.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold Petal",
      path: "0.2.11.2.8.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold Petal New Delhi",
      path: "0.2.11.2.8.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Guar Gum",
      path: "0.2.11.2.8.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Guar Seed",
      path: "0.2.11.2.8.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "Kapaisa Khali",
      path: "0.2.11.2.8.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "Kapas",
      path: "0.2.11.2.8.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lead",
      path: "0.2.11.2.8.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lead Mini",
      path: "0.2.11.2.8.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mentha Oil",
      path: "0.2.11.2.8.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Gas",
      path: "0.2.11.2.8.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nickel",
      path: "0.2.11.2.8.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nickel Mini",
      path: "0.2.11.2.8.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Potato",
      path: "0.2.11.2.8.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Silver",
      path: "0.2.11.2.8.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Silver 1000",
      path: "0.2.11.2.8.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Silver Micro",
      path: "0.2.11.2.8.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "Silver Mini",
      path: "0.2.11.2.8.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "Zinc",
      path: "0.2.11.2.8.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Zinc Mini",
      path: "0.2.11.2.8.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "MGEX",
      path: "0.2.11.2.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hard Red Spring Wheat Index",
      path: "0.2.11.2.9.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hard Red Winter Wheat Index",
      path: "0.2.11.2.9.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Minneapolis Hard Red Spring Wheat",
      path: "0.2.11.2.9.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "National Corn Index",
      path: "0.2.11.2.9.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "National Soybean Index",
      path: "0.2.11.2.9.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Soft Red Winter Wheat Index",
      path: "0.2.11.2.9.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "MX",
      path: "0.2.11.2.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "10-year Canadian Bond",
      path: "0.2.11.2.10.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "2-year Canadian Bond",
      path: "0.2.11.2.10.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-Month Canadian Bankers Acceptance",
      path: "0.2.11.2.10.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "30-day Canadian Overnight Repo Rate",
      path: "0.2.11.2.10.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "30-year Canadian Bond",
      path: "0.2.11.2.10.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "5-year Canadian Bond",
      path: "0.2.11.2.10.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Canadian Overnight Index Swap",
      path: "0.2.11.2.10.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini S&P/TSX 60 Index",
      path: "0.2.11.2.10.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini S&P/TSX Composite Index",
      path: "0.2.11.2.10.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P/TSX 60 Index",
      path: "0.2.11.2.10.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P/TSX Capped Energy Index",
      path: "0.2.11.2.10.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P/TSX Capped Financials Index",
      path: "0.2.11.2.10.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P/TSX Capped Information Technology Index",
      path: "0.2.11.2.10.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "S&P/TSX Global Gold Index",
      path: "0.2.11.2.10.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "ODE",
      path: "0.2.11.2.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Azuki Beans",
      path: "0.2.11.2.11.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Frozen Shrimp",
      path: "0.2.11.2.11.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Osaka Corn",
      path: "0.2.11.2.11.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Osaka Corn75 Index",
      path: "0.2.11.2.11.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Osaka Rice",
      path: "0.2.11.2.11.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Raw Sugar",
      path: "0.2.11.2.11.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Tokyo Rice",
      path: "0.2.11.2.11.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "US Soybeans",
      path: "0.2.11.2.11.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "OSE",
      path: "0.2.11.2.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei 225",
      path: "0.2.11.2.12.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei 225 Mini",
      path: "0.2.11.2.12.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei 300",
      path: "0.2.11.2.12.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei Stock Average Volatility Index",
      path: "0.2.11.2.12.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Osaka DJIA",
      path: "0.2.11.2.12.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "SGX",
      path: "0.2.11.2.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "10-year Full-Sized Japanese Government Bond",
      path: "0.2.11.2.13.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "10-year Mini Japanese Government Bond",
      path: "0.2.11.2.13.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "China Coal Index",
      path: "0.2.11.2.13.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Eurodollar",
      path: "0.2.11.2.13.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euroyen LIBOR",
      path: "0.2.11.2.13.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Euroyen TIBOR",
      path: "0.2.11.2.13.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE China A50 Index",
      path: "0.2.11.2.13.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "FTSE Straits Times Index",
      path: "0.2.11.2.13.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Fuel Oil 380cst",
      path: "0.2.11.2.13.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "IHS McCloskey Indonesian Sub-Bit FOB Index",
      path: "0.2.11.2.13.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "Indonesia SICOM OTC TSR20 Rubber",
      path: "0.2.11.2.13.11"
    },
    model: "Category"
  },
  {
    data: {
      name: "Iron Ore",
      path: "0.2.11.2.13.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Asia APEX 50 Index",
      path: "0.2.11.2.13.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Hong Kong Index",
      path: "0.2.11.2.13.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Indonesia Index",
      path: "0.2.11.2.13.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Singapore Index",
      path: "0.2.11.2.13.16"
    },
    model: "Category"
  },
  {
    data: {
      name: "MSCI Taiwan Index",
      path: "0.2.11.2.13.17"
    },
    model: "Category"
  },
  {
    data: {
      name: "Malaysia SICOM OTC TSR20 Rubber",
      path: "0.2.11.2.13.18"
    },
    model: "Category"
  },
  {
    data: {
      name: "Mini Nikkei 225 Index",
      path: "0.2.11.2.13.19"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nifty Index",
      path: "0.2.11.2.13.20"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei 225 Index",
      path: "0.2.11.2.13.21"
    },
    model: "Category"
  },
  {
    data: {
      name: "Nikkei Stock Average Dividend Point Index",
      path: "0.2.11.2.13.22"
    },
    model: "Category"
  },
  {
    data: {
      name: "Platts Gasoil FOB Singapore Index",
      path: "0.2.11.2.13.23"
    },
    model: "Category"
  },
  {
    data: {
      name: "Platts Kerosene FOB Singapore Index",
      path: "0.2.11.2.13.24"
    },
    model: "Category"
  },
  {
    data: {
      name: "Platts Naphtha CFR Japan Index",
      path: "0.2.11.2.13.25"
    },
    model: "Category"
  },
  {
    data: {
      name: "Platts Singapore Fuel Oil 180cst Index",
      path: "0.2.11.2.13.26"
    },
    model: "Category"
  },
  {
    data: {
      name: "Platts Singapore Fuel Oil 380cst Index",
      path: "0.2.11.2.13.27"
    },
    model: "Category"
  },
  {
    data: {
      name: "SICOM RSS3 Rubber",
      path: "0.2.11.2.13.28"
    },
    model: "Category"
  },
  {
    data: {
      name: "SICOM Rubber",
      path: "0.2.11.2.13.29"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Regrade Spread",
      path: "0.2.11.2.13.30"
    },
    model: "Category"
  },
  {
    data: {
      name: "Singapore Visco Spread",
      path: "0.2.11.2.13.31"
    },
    model: "Category"
  },
  {
    data: {
      name: "Thailand SICOM OTC TSR20 Rubber",
      path: "0.2.11.2.13.32"
    },
    model: "Category"
  },
  {
    data: {
      name: "USD Nikkei 225 Index",
      path: "0.2.11.2.13.33"
    },
    model: "Category"
  },
  {
    data: {
      name: "SHFE",
      path: "0.2.11.2.14"
    },
    model: "Category"
  },
  {
    data: {
      name: "Aluminium",
      path: "0.2.11.2.14.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Copper",
      path: "0.2.11.2.14.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Fuel Oil",
      path: "0.2.11.2.14.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Gold",
      path: "0.2.11.2.14.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Lead",
      path: "0.2.11.2.14.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Natural Rubber",
      path: "0.2.11.2.14.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Silver",
      path: "0.2.11.2.14.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Steel Rebar",
      path: "0.2.11.2.14.8"
    },
    model: "Category"
  },
  {
    data: {
      name: "Steel Wire",
      path: "0.2.11.2.14.9"
    },
    model: "Category"
  },
  {
    data: {
      name: "Zinc",
      path: "0.2.11.2.14.10"
    },
    model: "Category"
  },
  {
    data: {
      name: "TFX",
      path: "0.2.11.2.15"
    },
    model: "Category"
  },
  {
    data: {
      name: "3-month Euroyen",
      path: "0.2.11.2.15.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Hang Seng Index",
      path: "0.2.11.2.15.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "TOPIX Index",
      path: "0.2.11.2.15.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Housing",
      path: "0.2.12"
    },
    model: "Category"
  },
  {
    data: {
      name: "90210",
      path: "0.2.12.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Atlantic City Metro Region",
      path: "0.2.12.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Bradford County",
      path: "0.2.12.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "California",
      path: "0.2.12.4"
    },
    model: "Category"
  },
  {
    data: {
      name: "Green Acres in Palo Alto",
      path: "0.2.12.5"
    },
    model: "Category"
  },
  {
    data: {
      name: "Providence",
      path: "0.2.12.6"
    },
    model: "Category"
  },
  {
    data: {
      name: "Click here for over 50000 geographical areas",
      path: "0.2.12.7"
    },
    model: "Category"
  },
  {
    data: {
      name: "Stocks",
      path: "0.2.13"
    },
    model: "Category"
  },
  {
    data: {
      name: "Apple",
      path: "0.2.13.1"
    },
    model: "Category"
  },
  {
    data: {
      name: "Ibm",
      path: "0.2.13.2"
    },
    model: "Category"
  },
  {
    data: {
      name: "Microsoft",
      path: "0.2.13.3"
    },
    model: "Category"
  },
  {
    data: {
      name: "Click here for over 15000 stocks",
      path: "0.2.13.4"
    },
    model: "Category"
  }
]
