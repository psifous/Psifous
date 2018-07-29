const db = require('../models');

module.exports = {
  createElection: async (req, res) => {
    try {
      const election = await db.Election.create({
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        blockchainAddress: req.body.blockchainAddress,
        CommunityId: req.body.CommunityId
      });

      res.status(200).json({
        message: 'berhasil create election',
        value: election
      });
    } catch (err) {
      res.status(400).json({
        message: 'gagal create election',
        err
      });
    }
  },

  getAllElection: async (req, res) => {
    try {
      const elections = await db.Election.findAll({
        order: [['createdAt', 'DESC']]
      });
      res.status(200).json({
        message: 'Fetched all election data successfully',
        value: elections
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error: Failed to fetch all election data',
        err
      });
    }
  },

  getOneElection: async (req, res) => {
    try {
      const election = await db.Election.find({
        where: { id: req.params.id },
        include: [db.Candidate]
      });

      res.status(200).json({
        message: 'Fetched election data successfully',
        value: election
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: 'Error: Failed to fetch election data',
        err
      });
    }
  },

  updateElection: async (req, res) => {
    try {
      const [_, election] = await db.Election.update(req.body, {
        where: { id: req.params.id },
        returning: true
      });
      if (election[0]) {
        res.status(200).json({
          message: 'Election updated successfully',
          value: election[0].dataValues
        });
      } else {
        res.status(404).json({
          message: 'Election not found'
        });
      }
    } catch (err) {
      res.status(500).json({
        message: 'Error: Failed to update election',
        err
      });
    }
  },

  deleteElection: async (req, res) => {
    try {
      const election = await db.Election.destroy({
        where: { id: req.params.id },
        returning: true,
        plain: true
      });
      res.status(200).json({
        message: 'berhasil delete data election',
        value: election
      });
    } catch (err) {
      res.status(400).json({
        message: 'gagal delete data election',
        err
      });
    }
  }
};
