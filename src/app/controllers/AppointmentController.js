import { isBefore } from 'date-fns';
import Meetup from '../models/MeetUp';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';
import User from '../models/User';
import File from '../models/File';
import Mail from '../../lib/Mail';

class AppointmentController {
  async index(req, res) {
    const user_id = req.userId;

    const meetups = await Appointment.findAll({
      where: { user_id },
      attributes: ['id', 'provider_id', 'user_id', 'meetup_id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['title', 'description', 'date', 'localization'],
          include: [
            {
              model: File,
              as: 'banner',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    if (!meetups) {
      return res.status(400).json({ error: 'Appointment do not exist' });
    }

    return res.json(meetups);
  }

  async store(req, res) {
    //* Verificar se o usuário n é o próprio organizador *\\
    const { provider_id } = req.body;

    const meetUp = await Meetup.findOne({
      where: { provider_id, id: req.params.id },
    });

    if (meetUp.provider_id === req.userId) {
      return res.json({ error: 'You cannot register for your own event' });
    }

    //* Verificar se o evento ja passou *\\
    const hourPass = meetUp.date;

    if (isBefore(hourPass, new Date())) {
      return res.status(400).json({ error: 'past dates are not allowed' });
    }

    //* Verificar se o usuário já n se escreveu no evento*\\
    const appointmentCreated = await Appointment.findOne({
      where: { user_id: req.userId, meetup_id: req.params.id },
    });

    if (appointmentCreated) {
      return res
        .status(400)
        .json({ error: 'You are already registered for this event' });
    }

    //* Criando Compromisso *\\
    const appointments = await Appointment.create({
      provider_id,
      user_id: req.userId,
      meetup_id: req.params.id,
    });

    //* Notificando o provedor *\\
    const { name, email } = await User.findOne({ where: { id: req.userId } });
    await Notification.create({
      content: `Novo participante ${name}, do email ${email}`,
      user: provider_id,
    });

    return res.json(appointments);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id);

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: 'You do not have permission to cancel this appointment',
      });
    }

    await appointment.destroy();

    const user = await User.findOne({
      where: { id: appointment.provider_id },
    });

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Agentamento cancelado',
      text: 'Um usuario cancelou a inscrição no evento',
    });

    return res.json({ sms: 'your appointment has been canceled' });
  }
}

export default new AppointmentController();
