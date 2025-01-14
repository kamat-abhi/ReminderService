const { Op } = require('sequelize');
const { NotificationTicket } = require('../models/index');

class TicketRepository {
    async getAll(){
        try {
            const response = await NotificationTicket.findAll();
            return response; 
        } catch (error) {
            throw error;
        }
    }

    async create(data) {
        try {
            const response = await NotificationTicket.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async get(filter){
        try {
            const ticket = await NotificationTicket.findAll({
                where: {
                    status: filter.status,
                    notificationTime: {
                        [Op.lte]: new Date()
                    }
                }
            })
            return ticket;
        } catch (error) {
            throw error;
        }
    }

    async update(tickedId, data){
        try {
            const response = await NotificationTicket.findByPk(tickedId);
            if(data.status) {
                response.status = data.status;
            }
            await response.save(); 
            return response; 
        } catch (error) {
            throw error;
        }
    }
}

module.exports = TicketRepository;