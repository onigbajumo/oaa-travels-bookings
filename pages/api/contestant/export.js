import connectToMongoDB from '../../../libs/mongodb';
import Contestant from '../../../models/Contestant';
import { Parser } from 'json2csv';

export default async function handler(req, res) {
  await connectToMongoDB();

  try {
    const data = await Contestant.find({}, '-__v').lean();

    const parser = new Parser();
    const csv = parser.parse(data);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=contestants.csv');
    res.status(200).send(csv);
  } catch (error) {
    console.error('CSV Export Error:', error);
    res.status(500).json({ error: 'Failed to export CSV' });
  }
}
