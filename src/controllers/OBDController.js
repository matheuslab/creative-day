const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const {id} = request.params;

        const data = await connection('devices')
        .select('*')
        .where('id', id)
        .first()

        if(!data){
            return response.status(404).json({
                error: 'No device found with this ID'
            })
        }

        return response.json(data);
    },

    async fetchDevice(request, response){

        const [count] = await connection('devices').count();

        const data = await connection('devices')
        .select('*')

        response.header('X-Total-Count', count['count(*)'])

        return response.json(data);
    },

    async create(request, response) {
        const {lat, lng, speed, driver_code, id} = request.body;

        const device = await connection('devices')
        .select('*')
        .where('id', id)
        .first()

        if(device){
            await connection('devices')
            .where('id', id)
            .update({
                lat,
                lng,
                speed,
                driver_code
            })
        } else {
            await connection('devices').insert({
                id,
                lat,
                lng,
                speed,
                driver_code
            })
        }

        return response.json({
            id,
            lat,
            lng,
            speed,
            driver_code
        })
    }
}