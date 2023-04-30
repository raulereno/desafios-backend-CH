const TicketRepository = require("./../dao/repositories/ticket.repository");

const ticketRepository = new TicketRepository();

const createTicketService = async (ticket) => {
  try {
    console.log(ticket);
    const newTicket = await ticketRepository.createTicket(ticket);
    return newTicket;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { createTicketService };
