export type ContestForm = {
  name: string;
  about: String,
  description: string;
  content: string;
  banner: string;
  image: string;
  publishDate: string;
  registrationEndDate: string;
  startDateTime: string;
  period: {
    value: number;
    unit: string;
  };
  maxContestants: number;
  isOnline: boolean;
  regions: string[];
  category: string;
  organizingPlace: string;
  externalLink: string;
  externalMessage: string;
  minTeamSize: number;
  maxTeamSize: number;
  teamCondition: string;
  teamCoach: string,
  hasPenalty: boolean;
  rateMethod: string;
  resultVisibility: string;
  resultPublishing: string;
  standingStyle: string;
  questionType: string;
  registers: Number;
};


export type googleCalendar = {
  name: string;
  description: string;
  startDateTime: Date;
  period: {
    value: number;
    unit: string;
  };
  isOnline: Boolean;
}