import Response from '../helpers/Response';
import AppError from '../helpers/AppError';
import db from '../models';


class ControllerMethods {
  constructor (name, unique) {
    this.name = name;
    this.unique = unique;

    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.list = this.list.bind(this);
    this.details = this.details.bind(this);
    this.delete = this.delete.bind(this);
  }

  create (req, res) {
    const run_method = (record) => {
      if (record && this.unique) {
        throw new AppError(`${this.name} already exists for this ${this.unique}`, 409);
      }
      this.validateParams(req.body);
      db[this.name].create(req.body)
      .then((newRecord) => { res.status(200).send(newRecord); })
      .catch((err) => { res.send(err.message); });
    }
    if (this.unique) {
      const query = {};
      query[this.unique] = req.body[this.unique];
      this.findRecord(res, query, run_method);
    } else {
      run_method();
    }
  }

  update (req, res) {
    const run_method = (record) => {
      if (record == null) {
        throw new AppError(`${this.name} does not exist`, 404);
      }

      record.update(req.body)
      .then((updatedRecord) => { res.status(200).send(updatedRecord); })
      .catch((err) => { res.send(err.message); });
    }

    this.findRecord(res, {id: req.params.id}, run_method);
  }

  list (req, res) {
    db[this.name].findAll({where: { deprecated_at: null }})
    .then((records) => { res.status(200).send(records)})
    .catch((err) => { res.send(err); });
  }

  details (req, res) {
    const run_method = (record) => {
      if (record == null) {
        throw new AppError(`${this.name} does not exist`, 404);
      }
      res.status(200).send(record);
    }
    this.findRecord(res, {id: req.params.id}, run_method);
  }

  delete (req, res) {
    const run_method = (record) => {
      if (record == null) {
        throw new AppError(`${this.name} does not exist`, 404);
      }

      const currentTime = new Date();
      record.update({deprecated_at: currentTime.toISOString() })
      .then((deletedRecord) => { res.status(200).send(deletedRecord); })
      .catch((err) => { res.send(err); });
    }

    this.findRecord(res, {id: req.params.id}, run_method);
  }

  findRecord (res, query = {id: this.id}, run_method) {
    query['deprecated_at'] = null; 
    db[this.name].findOne({ where: query }).then((record) => {
      run_method(record);
    }).catch((err) => {
      res.status(err.status).send(Response.handleErrors(err));
    });
  }
  
}

export default ControllerMethods;