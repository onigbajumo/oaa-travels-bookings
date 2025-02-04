import connectToMongoDB from '../../../libs/mongodb';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await connectToMongoDB();

  if (req.method === 'POST') {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
      }

      const newCategory = new Category({ name });
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const categories = await Category.find();
      return res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    
    try {
      const { id, name } = req.body;

      if (!id || !name) {
        return res.status(400).json({ error: 'Category ID and name are required' });
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { name },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.status(200).json(updatedCategory);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Category ID is required' });
      }

      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
