import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
  static init(sequelize) {
    super.init(
      {
        provider_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER,
        meetup_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Meetup, {
      foreignKey: 'provider_id',
      as: 'provider',
    });
    this.belongsTo(models.Meetup, { foreignKey: 'meetup_id', as: 'meetup' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Appointment;
