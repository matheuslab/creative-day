const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const {id} = request.params;

        const data = await connection('vehicles')
        .select('*')
        .where('id', id)
        .first()

        if(!data){
            return response.status(404).json({
                error: 'No vehicle found with this id'
            })
        }

        return response.json(data);
    },

    async fetchVehicle(request, response){

        const [count] = await connection('vehicles').count();

        const data = await connection('vehicles')
        .select('*')

        response.header('X-Total-Count', count['count(*)'])

        return response.json(data);
    },

    async create(request, response) {
        const {id, license_plate, brand, model} = request.body;

        await connection('vehicles').insert({
            id,
            license_plate,
            brand,
            model
        })

        return response.json({
            id,
            license_plate,
            brand,
            model
        })
    }
}