const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    const contacts = await ContactRepository.findAll();
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);
    if (!contact) return response.status(404).json({ error: 'Not Found' });

    return response.status(200).json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);
    if (!contact) return response.status(404).json({ error: 'Not Found' });
    await ContactRepository.deleteById(id);
    return response.sendStatus(204);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) return response.status(400).json({ error: 'Name is Required' });

    const contactExistes = await ContactRepository.findByEmail(email);
    if (contactExistes) return response.status(400).json({ error: 'This e-mail is already in use' });

    const contact = await ContactRepository.create(
      name, email, phone, category_id,
    );

    return response.json(contact);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExistes = await ContactRepository.findById(id);
    if (!contactExistes) return response.status(404).json({ error: 'User not found' });

    if (!name) return response.status(400).json({ error: 'Name is Required' });

    const contactExistesEmail = await ContactRepository.findByEmail(email);
    if (contactExistesEmail && contactExistesEmail.id !== id) return response.status(400).json({ error: 'This e-mail is already in use' });

    const contact = await ContactRepository.update(id, name, email, phone, category_id);
    return response.json(contact);
  }
}

module.exports = new ContactController();
