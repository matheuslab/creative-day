const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const {id} = request.params;

        const data = await connection('devices')
        .select('*')
        .where('id', id)
        .first()

        if(!data.id){
            return response.status(404).json({
                error: 'No device found with this ID'
            })
        }

        return response.json(data);
    },

    async fetchDevice(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('devices').count();

        const data = await connection('devices')
        .select('*')
        .limit(5)
        .offset((page -1) * 5);

        response.header('X-Total-Count', count['count(*)'])

        return response.json(data);
    },

    async create(request, response) {
        const {lat, lng, hardwareModel, speed} = request.body;

        const [id] = await connection('devices').insert({
            lat,
            lng,
            hardwareModel,
            speed
        })

        return response.json({
            id,
            lat,
            lng,
            hardwareModel,
            speed
        })
    }
}