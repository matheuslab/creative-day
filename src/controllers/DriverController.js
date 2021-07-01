const connection = require('../database/connection');

module.exports = {

    async index(request, response){
        const {id} = request.params;

        const data = await connection('drivers')
        .select('*')
        .where('id', id)
        .first()

        if(!data){
            return response.status(404).json({
                error: 'No driver found with this id'
            })
        }

        return response.json(data);
    },

    async fetchDriver(request, response){

        const [count] = await connection('drivers').count();

        const data = await connection('drivers')
        .select('*')

        response.header('X-Total-Count', count['count(*)'])

        return response.json(data);
    },

    async create(request, response) {
        const {driver_code, name, licence_category, model_device, brand_device, vehicle_id, id} = request.body;

        const driver = await connection('drivers')
        .select('*')
        .where('id', id)
        .first()

        if(driver){
            await connection('drivers')
            .where('id', id)
            .update({
                name,
                driver_code,
                licence_category,
                model_device,
                brand_device,
                vehicle_id
            })
        } else {
            await connection('drivers').insert({
                id,
                driver_code,
                name,
                licence_category,
                model_device,
                brand_device,
                vehicle_id
            })
        }
        
        return response.json({
            driver_code,
            name,
            licence_category,
            model_device,
            brand_device,
            vehicle_id
        })
    }
}