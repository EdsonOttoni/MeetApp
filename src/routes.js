import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import MeetupController from './app/controllers/MeetupController';
import AppointmentController from './app/controllers/AppointmentController';
import NotificationController from './app/controllers/NotificationController';
import ListMeetUpsController from './app/controllers/ListMeetUpsController';

import auth from './app/middlewares/auth';

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);

routes.use(auth);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.post('/files', uploads.single('file'), FileController.store);

routes.post('/meetups', MeetupController.store);
routes.put('/meetups/:id', MeetupController.update);
routes.get('/meetups', MeetupController.index);
routes.delete('/meetups/:id', MeetupController.delete);

routes.get('/list/meetups', ListMeetUpsController.index);

routes.get('/appointments/', AppointmentController.index);
routes.post('/appointments/:id', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/notification/', NotificationController.index);
routes.put('/notification/:id', NotificationController.update);

export default routes;
