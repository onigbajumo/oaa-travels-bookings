import connectToMongoDB from '../../../libs/mongodb';
import Contact from '../../../models/Contact';

export default async function handler(req, res) {
  await connectToMongoDB();

  if (req.method === 'POST') {
    try {
      const { name, lastName, email, phoneNumber, projectDetails, reasonsForContact } = req.body;

      if (!name || !lastName || !email || !phoneNumber || !projectDetails) {
        return res.status(400).json({ error: 'All required fields must be provided' });
      }

      const newContact = new Contact({
        name,
        lastName,
        email,
        phoneNumber,
        projectDetails,
        reasonsForContact: reasonsForContact || [],
      });

      await newContact.save();
      res.status(201).json(newContact);
    } catch (error) {
      console.error('Error creating contact:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const { id } = req.query;

      if (id) {
        const contact = await Contact.findById(id);
        if (!contact) {
          return res.status(404).json({ error: 'Contact not found' });
        }
        return res.status(200).json(contact);
      } else {
        const contacts = await Contact.find(); 
        return res.status(200).json(contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, name, lastName, email, phoneNumber, projectDetails, reasonsForContact } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Contact ID is required for updating' });
      }

      const updatedContact = await Contact.findByIdAndUpdate(
        id,
        {
          name,
          lastName,
          email,
          phoneNumber,
          projectDetails,
          reasonsForContact,
        },
        { new: true }
      );

      if (!updatedContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      res.status(200).json(updatedContact);
    } catch (error) {
      console.error('Error updating contact:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Contact ID is required for deletion' });
      }

      const deletedContact = await Contact.findByIdAndDelete(id);
      if (!deletedContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
      console.error('Error deleting contact:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    
    res.status(405).json({ error: 'Method not allowed' });
  }
}
