import userController from '../controllers/User';

export default (app) => {
  app.post('/api/v1/users', userController.create);
  app.put('/api/v1/users/:id', userController.update);
  app.get('/api/v1/users/:id', userController.details);
  app.get('/api/v1/users', userController.list);
  app.delete('/api/v1/users/:id', userController.delete);
}