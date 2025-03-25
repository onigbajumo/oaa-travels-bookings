import connectToMongoDB from '../../../libs/mongodb';
import Contestant from '../../../models/Contestant';
import { startOfDay, subDays, format, startOfWeek, subWeeks, startOfMonth, subMonths, startOfYear, subYears } from 'date-fns';

export default async function handler(req, res) {
  await connectToMongoDB();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type } = req.query;

  if (!type) {
    return res.status(400).json({ error: 'Missing type parameter' });
  }

  const now = new Date();
  let groupFormat, startDate, intervalCount;

  switch (type) {
    case 'hourly':
      groupFormat = '%H:00'; // Hour format
      startDate = new Date(now.setHours(0, 0, 0, 0));
      intervalCount = 24;
      break;
    case 'daily':
      groupFormat = '%Y-%m-%d';
      startDate = subDays(now, 6);
      intervalCount = 7;
      break;
    case 'weekly':
      groupFormat = '%Y-%U'; // Year-week
      startDate = subWeeks(now, 3);
      intervalCount = 4;
      break;
    case 'monthly':
      groupFormat = '%Y-%m';
      startDate = subMonths(now, 11);
      intervalCount = 12;
      break;
    case 'yearly':
      groupFormat = '%Y';
      startDate = subYears(now, 4);
      intervalCount = 5;
      break;
    default:
      return res.status(400).json({ error: 'Invalid type parameter' });
  }

  try {
    const result = await Contestant.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: groupFormat,
              date: '$createdAt',
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Create a complete time range even for missing data
    const countsMap = Object.fromEntries(result.map((item) => [item._id, item.count]));
    const labels = [];
    const counts = [];

    for (let i = intervalCount - 1; i >= 0; i--) {
      let key;
      let date;

      if (type === 'hourly') {
        date = new Date();
        date.setHours(date.getHours() - i, 0, 0, 0);
        key = format(date, 'HH:00');
      } else if (type === 'daily') {
        date = subDays(new Date(), i);
        key = format(date, 'yyyy-MM-dd');
      } else if (type === 'weekly') {
        date = subWeeks(startOfWeek(new Date(), { weekStartsOn: 1 }), i);
        key = format(date, 'yyyy-ww');
      } else if (type === 'monthly') {
        date = subMonths(startOfMonth(new Date()), i);
        key = format(date, 'yyyy-MM');
      } else if (type === 'yearly') {
        date = subYears(startOfYear(new Date()), i);
        key = format(date, 'yyyy');
      }

      labels.push(key);
      counts.push(countsMap[key] || 0);
    }

    return res.status(200).json({ labels, counts });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
