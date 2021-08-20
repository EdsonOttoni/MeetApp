import { isBefore, parseISO } from 'date-fns';
import * as Yup from 'yup';
import MeetUp from '../models/MeetUp';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const meetUps = await MeetUp.findAll({
      where: { provider_id: req.userId },
      order: ['date'],
      attributes: ['id', 'title', 'description', 'localization', 'date'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });
    return res.json(meetUps);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const provider_id = req.userId;

    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'you can only create appointments with providers' });
    }

    //* Certificar que q data n passou *\\
    const { date } = req.body;
    const datePass = parseISO(date);

    if (isBefore(datePass, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const meetup = await MeetUp.create({
      provider_id,
      ...req.body,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const meetup = await MeetUp.findOne({
      where: { id: req.params.id, provider_id: req.userId },
    });

    if (!meetup) {
      return res.status(400).json({ error: 'You have not permission' });
    }

    const { title, description, localization, date, banner } =
      await meetup.update(req.body);

    return res.json({ title, description, localization, date, banner });
  }

  async delete(req, res) {
    const meetUps = await MeetUp.findByPk(req.params.id);

    if (meetUps.provider_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'You do not have permission to cancel this MeetUp' });
    }

    await meetUps.destroy();

    return res.json({ sms: 'your event has been canceled' });
  }
}

export default new MeetupController();
