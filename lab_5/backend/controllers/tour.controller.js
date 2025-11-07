const db = require('../models');
const Tour = db.Tour;

exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty!" });
    }

    Tour.create(req.body)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tour."
            });
        });
};

exports.findAll = async (req, res) => {
  try {
    const { search, orderBy, order } = req.query;

    const where = {};
    if (search) {
      where[db.Sequelize.Op.or] = [
        { title: { [db.Sequelize.Op.like]: `%${search}%` } },
        { description: { [db.Sequelize.Op.like]: `%${search}%` } },
        { country: { [db.Sequelize.Op.like]: `%${search}%` } },
      ];
    }

    const options = { where };

    if (orderBy) {
      options.order = [[orderBy, order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC']];
    }

    const data = await Tour.findAll(options);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tours.",
    });
  }
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tour.findByPk(id)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: `Cannot find Tour with id=${id}.` });
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving Tour with id=" + id });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Tour.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Tour was updated successfully." });
            } else {
                res.send({ message: `Cannot update Tour with id=${id}. Maybe Tour was not found or req.body is empty!` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating Tour with id=" + id });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tour.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Tour was deleted successfully." });
            } else {
                res.send({ message: `Cannot delete Tour with id=${id}. Maybe Tour was not found.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Could not delete Tour with id=" + id });
        });
};