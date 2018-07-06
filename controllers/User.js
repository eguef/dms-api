import ControllerMethods from './ControllerMethods';

class User extends ControllerMethods {
  constructor () {
    super('User');
  }
};

export default new User();