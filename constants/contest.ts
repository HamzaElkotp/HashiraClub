const defaultContest = {
  name: '',
  about: '',
  description: '',
  content: '',
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
  registers: 0
};

const allRegions = ['Global', 'MENA', 'Africa', 'Gulf Countries', 'Arab', 'Egypt', 'Saudi Arabia', 'Competing Associations'];
export {
  defaultContest,
  allRegions,
}