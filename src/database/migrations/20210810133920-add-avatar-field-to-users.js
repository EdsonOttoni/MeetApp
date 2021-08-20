module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'avatar_id', {
      type: Sequelize.INTEGER,
      reference: { model: 'files', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    }),

  down: async (queryInterface) =>
    queryInterface.removeColumn('users', 'avatar_id'),
};
