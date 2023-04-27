const mongoose = require("mongoose");

class TicketDao {
  constructor(collection, schema) {
    this.ticketCollection = mongoose.model(collection, schema);
  }
  async createTicket(ticket) {
    console.log(ticket);
    const newTicket = await this.ticketCollection.create(ticket);

    return newTicket;
  }
}

module.exports = TicketDao;
