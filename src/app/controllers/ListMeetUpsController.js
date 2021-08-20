import { parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';
import File from '../models/File';
import Meetup from '../models/MeetUp';
import User from '../models/User';

class ListMeetUpController {
  async index(req, res) {
    const { pag } = req.query;

    const searchDate = parseISO(req.query.date);

    const meetup = await Meetup.findAll({
      where: {
        date: { [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)] },
      },
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name', 'email'],
          include: [
            { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
          ],
        },
      ],
      limit: 10,
      offset: (pag - 1) * 10,
    });

    return res.json(meetup);
  }
}

export default new ListMeetUpController();
