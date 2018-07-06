import Response from '../helpers/Response';
import AppError from '../helpers/AppError';
import db from '../models';


class ControllerMethods {
  constructor (name) {
    this.name = name;
    this.model = db[name];

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.list = this.list.bind(this);
    this.details = this.details.bind(this);
    this.delete = this.delete.bind(this);
  }

  create (req, res) {
    const { firstName, lastName, email, password } = req.body;
    const run_method = (record) => {
      if (record) {
        throw new AppError(`${this.name} already exists for this email`, 409);
      }
      console.log(firstName)
    }

    this.findRecord(res, {email: email}, run_method)
  }

  update (req, res) {

  }

  list (req, res) {
  }

  details (req, res) {
    const run_method = (record) => {
      if (record == null) {
        throw new AppError(`${this.name} already does not exist`, 404);
      }
      res.status(200).send(record);
    }
    this.findRecord(res, {id: 1}, run_method);
  }

  delete (req, res) {
  }

  findRecord (res, query, run_method) {
    db[this.name].findOne({ where: query }).then((record) => {
      run_method(record);
    }).catch((err) => {
      res.status(err.status).send(Response.handleErrors(err));
    });
  }
  
}

export default ControllerMethods;