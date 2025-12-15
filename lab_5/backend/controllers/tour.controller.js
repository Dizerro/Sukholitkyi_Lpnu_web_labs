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
    const { search, priceMin, priceMax, durationMin, durationMax, country } = req.query;

    const where = {};
    const Op = db.Sequelize.Op;

    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { country: { [Op.like]: `%${search}%` } },
      ];
    }

    if (priceMin || priceMax) {
      where.price = {};
      if (priceMin) where.price[Op.gte] = Number(priceMin);
      if (priceMax) where.price[Op.lte] = Number(priceMax);
    }

    if (durationMin || durationMax) {
      where.duration = {};
      if (durationMin) where.duration[Op.gte] = Number(durationMin);
      if (durationMax) where.duration[Op.lte] = Number(durationMax);
    }

    if (country && country !== "all") {
      where.country = country;
    }

    const tours = await Tour.findAll({ where });
    res.send(tours);

  } catch (err) {
    res.status(500).send({ message: err.message || "Error retrieving tours." });
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