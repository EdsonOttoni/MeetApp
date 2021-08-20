module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.createTable('appointments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      provider_id: {
        type: Sequelize.INTEGER,
        reference: { model: 'meetups', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        reference: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: true,
      },
      meetup_id: {
        type: Sequelize.INTEGER,
        reference: { model: 'meetups', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }),

  down: async (queryInterface) => queryInterface.dropTable('appointments'),
};
