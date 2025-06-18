const defaultContest = {
  name: '',
  description: '',
  banner: '',
  image: '',
  publishDate: '',
  registrationEndDate: '',
  startDateTime: '',
  period: {
    value: 1,
    unit: 'days',
  },
  maxContestants: 100,
  isOnline: true,
  regions: [],
  category: '',
  organizingPlace: '',
  externalLink: '',
  externalMessage: '',
  minTeamSize: 1,
  maxTeamSize: 1,
  teamCondition: '',
  teamCoach: '',
  hasPenalty: false,
  rateMethod: '',
  resultVisibility: '',
  resultPublishing: '',
  standingStyle: '',
  questionType: '',
};

const allRegions = ['Global', 'MENA', 'Africa', 'Gulf Countries', 'Arab', 'Egypt', 'Saudi Arabia'];
const categories = ['Math', 'Science', 'Coding', 'Design'];

// const defaultContest = {
//   name: 'Global Code Championship 2025',
//   description: 'An international programming contest open to all regions. Solve problems, win prizes, and gain recognition. Supports Markdown formatting.',
//   banner: 'https://example.com/images/contest-banner.jpg',
//   image: 'https://example.com/images/contest-logo.png',
//   publishDate: '2025-06-15T00:00',
//   registrationEndDate: '2025-06-30T23:59',
//   startDateTime: '2025-07-05T09:00',
//   period: {
//     value: 3,
//     unit: 'days',
//   },
//   maxContestants: 500,
//   isOnline: true,
//   regions: ['Global', 'MENA', 'Africa'],
//   category: 'Programming',
//   organizingPlace: 'inside',
//   externalLink: '',
//   externalMessage: '',
//   minTeamSize: 2,
//   maxTeamSize: 4,
//   teamCondition: 'sameRegion',
//   hasPenalty: true,
//   rateMethod: 'time',
//   resultVisibility: 'realTime',
//   resultPublishing: 'automatic',
//   standingStyle: 'text',
//   questionType: 'form',
// };

export {
  defaultContest,
  allRegions,
  categories
}