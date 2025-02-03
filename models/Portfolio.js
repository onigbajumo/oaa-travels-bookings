import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    industry: { type: String, required: true },
    year: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    logo: { type: String, required: true },
    type: { type: String, required: true },
    client: { type: String, required: true },
    teamNumber: { type: String,  },
    projectLink: { type: String, required: true },
    features: { type: [String], required: true },
    challenges: {
      heading: { type: String, },
      data: [
        {
          problem: { title: String, description: String },
          solution: [String],
        },
      ],
    },
    technology: { type: [String], },
    team: [
      {
        title: { type: String, },
        role: { type: String, },
      },
    ],
    gallery: { type: [String], },
    conclusion: { type: String, },
  },
  { timestamps: true }
);

const Portfolio = mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
export default Portfolio;
