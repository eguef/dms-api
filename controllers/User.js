import ControllerMethods from './ControllerMethods';
import AppError from '../helpers/AppError';
import validate from '../helpers/Validate';

class User extends ControllerMethods {
  constructor () {
    super('User', 'email');

    this.validateParams = this.validateParams.bind(this);
  }

  validateParams(params) {
    if (!validate.signup(params)) {
      throw new AppError('User cannot be created, Invalid parameters', 403);
    }
  }
};

export default new User();