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
  }
];
