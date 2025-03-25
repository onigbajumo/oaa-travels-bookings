import mongoose from "mongoose";

const ContestantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    socialMediaHandles: [{
      platform: { type: String, trim: true },
      url: { type: String, trim: true }
    }],

    age: { type: Number, required: true },
    height: { type: Number },
    stateOfOrigin: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String },

    cherishedProfession: { type: String, trim: true },
    bestThingAboutAge: { type: String, trim: true },
    descriptiveWords: [{ type: String, trim: true }],
    embarrassingMoment: { type: String, trim: true },

    favoriteColor: { type: String, trim: true },
    dressSize: { type: String, trim: true },
    waistSize: { type: String, trim: true },
    shoeSize: { type: String, trim: true },

    bestAttribute: { type: String, trim: true },
    favoriteQuote: { type: String, trim: true },
    lifeAmbition: { type: String, trim: true },

    reasonForJoining: { type: String, trim: true },
    promotionPlan: { type: String, trim: true },

    schoolAchievements: { type: String, trim: true },
    activityInvolvements: { type: String, trim: true },
    leadershipRoles: { type: String, trim: true },
    workExperience: { type: String, trim: true },

    images: [{ type: String, required: true }], 
    attestation: { type: Boolean, required: true}, 

    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);
const Contestant = mongoose.models.Contestant || mongoose.model('Contestant', ContestantSchema);

export default Contestant;