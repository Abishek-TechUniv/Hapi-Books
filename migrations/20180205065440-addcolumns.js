

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Books', 'Author', { type: Sequelize.STRING });
    queryInterface.addColumn('Books', 'liked', { type: Sequelize.BOOLEAN });
    queryInterface.addColumn('Books', 'rating', { type: Sequelize.STRING });
    queryInterface.addColumn('Books', 'disliked', { type: Sequelize.BOOLEAN });
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Books', 'Author');
    queryInterface.removeColumn('Books', 'liked');
    queryInterface.removeColumn('Books', 'rating');
    queryInterface.removeColumn('Books', 'disliked');

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  },
};
