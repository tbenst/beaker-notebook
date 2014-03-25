module.exports = [
  {
    model: 'Project',
    data: {
      name: "Bunsen tutorial project",
      description: "This is an example Bunsen project containing two Beaker notebooks",
      User: {email: "dummy@example.com"}
    }
  },
  {
    model: 'Project',
    data: {
      name: "Test project",
      description: "This is an empty Bunsen project",
      User: {email: "dummy@example.com"}
    }
  }
];
