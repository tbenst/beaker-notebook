module.exports = [
  {
    model: 'Project',
    data: {
      name: "Bunsen tutorial project",
      description: "This is an example Bunsen project containing two Beaker notebooks"
    },
    associations: [
      {
        foreignKey: "ownerId",
        lookup: {
          User: {email: "dummy@example.com"}
        }
      }
    ]
  },
  {
    model: 'Project',
    data: {
      name: "Test project",
      description: "This is an empty Bunsen project"
    },
    associations: [
      {
        foreignKey: "ownerId",
        lookup: {
          User: {email: "dummy@example.com"}
        }
      }
    ]
  }
];
