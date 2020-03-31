const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { name } = request.body;

    const ong = await connection('ongs').where('name', name).select('id').first();

    if (!ong) {
      return response.status(400).json({ error: 'No ONG found with this ID' });
    }

    return response.json(ong);
  },
}