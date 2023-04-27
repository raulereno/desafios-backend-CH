const TicketDao = require("../dao/ticket.dao");
const ticketSchema = require("../models/ticket.model");

const ticketDao = new TicketDao("Ticket", ticketSchema);

const createTicketService = async (ticket) => {
  try {
    console.log(ticket);
    const newTicket = await ticketDao.createTicket(ticket);
    return newTicket;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { createTicketService };
