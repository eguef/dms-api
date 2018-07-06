import userController from '../controllers/User';

export default (app) => {
  app.get('/', userController.details);

  app.post('/signup', userController.create);
}