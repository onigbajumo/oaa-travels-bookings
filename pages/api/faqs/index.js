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
  } else {
    res.status(405).json({ content: 'Method not allowed' });
  }
}
