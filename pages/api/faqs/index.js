import connectToMongoDB from '../../../libs/mongodb';
import FAQs from '../../../models/Faqs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      await connectToMongoDB();

      const newFaq = new FAQs({ title, content });
      await newFaq.save();

      res.status(201).json({ content: 'New Faq created succesfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error, please try again later.' });
    }
  } else if (req.method === 'GET') {
    try {
      await connectToMongoDB();
      const faqs = await FAQs.find();
      res.status(200).json(faqs);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, title, content, } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'FAQs ID is required for updating' });
      }

      const updatedFAQs = await FAQs.findByIdAndUpdate(
        id,
        {
          title,
          content
        },
        { new: true }
      );

      if (!updatedFAQs) {
        return res.status(404).json({ error: 'FAQs not found' });
      }

      res.status(200).json(updatedFAQs);
    } catch (error) {
      console.error('Error updating FAQs:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'FAQs ID is required for deletion' });
      }

      const deletedFAQs = await FAQs.findByIdAndDelete(id);
      if (!deletedFAQs) {
        return res.status(404).json({ error: 'FAQs not found' });
      }

      res.status(200).json({ message: 'FAQs deleted successfully' });
    } catch (error) {
      console.error('Error deleting FAQs:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    
    res.status(405).json({ error: 'Method not allowed' });
  }
}
