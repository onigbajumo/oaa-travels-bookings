import connectToMongoDB from '../../../libs/mongodb';
import Portfolio from '../../../models/Portfolio';
import slugify from 'slugify';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const generateUniqueSlug = async (title) => {
  let slug = slugify(title, { lower: true, strict: true });
  let existingPortfolio = await Portfolio.findOne({ slug });

  if (!existingPortfolio) return slug;

  let count = 1;
  let newSlug = `${slug}-${count}`;

  while (await Portfolio.findOne({ slug: newSlug })) {
    count++;
    newSlug = `${slug}-${count}`;
  }

  return newSlug;
};

export default async function handler(req, res) {
  await connectToMongoDB();

  if (req.method === 'POST') {
    try {
      let { title, industry, year, location, description, coverImage, logo, type, client, projectLink, teamNumber, features, challenges, technology, team, gallery, conclusion } = req.body;

      if (!title || !industry || !year || !location || !description || !coverImage || !logo || !type || !client || !projectLink ) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const slug = await generateUniqueSlug(title);

      let coverImageUrl = '';
      if (coverImage) {
        const uploadedCoverImage = await cloudinary.uploader.upload(coverImage, {
          folder: 'ehizuahub/portfolio',
        });
        coverImageUrl = uploadedCoverImage.secure_url;
      }

      let logoUrl = '';
      if (logo) {
        const uploadedLogo = await cloudinary.uploader.upload(logo, {
          folder: 'ehizuahub/portfolio/logos',
        });
        logoUrl = uploadedLogo.secure_url;
      }

      let galleryUrls = [];
      if (gallery && gallery.length > 0) {
        for (let img of gallery) {
          const uploadedGallery = await cloudinary.uploader.upload(img, {
            folder: 'ehizuahub/portfolio/gallery',
          });
          galleryUrls.push(uploadedGallery.secure_url);
        }
      }

      const newPortfolio = new Portfolio({
        title,
        industry,
        year,
        location,
        description,
        coverImage: coverImageUrl,
        slug,
        logo: logoUrl,
        type,
        teamNumber,
        client,
        projectLink,
        features,
        challenges,
        technology,
        team,
        gallery: galleryUrls,
        conclusion,
      });

      await newPortfolio.save();
      res.status(201).json(newPortfolio);
    } catch (error) {
      console.error('Error creating portfolio:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'GET') {
    try {
      const { slug } = req.query;

      if (slug) {
        const portfolio = await Portfolio.findOne({ slug });
        if (!portfolio) {
          return res.status(404).json({ error: 'Portfolio not found' });
        }
        return res.status(200).json(portfolio);
      } else {
        const portfolio = await Portfolio.find();
        return res.status(200).json(portfolio);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { id, title, coverImage, logo, gallery, ...updates } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Portfolio ID is required' });
      }

      if (title) {
        updates.slug = await generateUniqueSlug(title);
      }

      if (coverImage) {
        const uploadedCoverImage = await cloudinary.uploader.upload(coverImage, {
          folder: 'ehizuahub/portfolio',
        });
        updates.coverImage = uploadedCoverImage.secure_url;
      }

      if (logo) {
        const uploadedLogo = await cloudinary.uploader.upload(logo, {
          folder: 'ehizuahub/portfolio/logos',
        });
        updates.logo = uploadedLogo.secure_url;
      }

      if (gallery && gallery.length > 0) {
        let galleryUrls = [];
        for (let img of gallery) {
          const uploadedGallery = await cloudinary.uploader.upload(img, {
            folder: 'ehizuahub/portfolio/gallery',
          });
          galleryUrls.push(uploadedGallery.secure_url);
        }
        updates.gallery = galleryUrls;
      }

      const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, updates, { new: true });

      if (!updatedPortfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }

      res.status(200).json(updatedPortfolio);
    } catch (error) {
      console.error('Error updating portolio:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Portfolio ID is required' });
      }

      const deletedPortfolio = await Portfolio.findByIdAndDelete(id);
      if (!deletedPortfolio) {
        return res.status(404).json({ error: 'Portfolio not found' });
      }

      res.status(200).json({ message: 'Portfolio deleted successfully' });
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
