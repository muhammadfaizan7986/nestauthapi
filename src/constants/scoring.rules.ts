export const scoringRules = {
  // Passing stats
  passingYards: 0.04, // 1 point per 25 passing yards
  passingTDs: 4, // 4 points per passing touchdown
  interceptionsThrown: -2, // -2 points per interception thrown
  twoPtPassingConversions: 2, // 2 points per 2-point conversion
  threeHundredYardPassingGame: 2, // 2 bonus points for 300+ yard passing games
  fourHundredYardPassingGame: 3, // 3 bonus points for 400+ yard passing games
  // Rushing stats
  rushingYards: 0.1, // 1 point per 10 rushing yards
  rushingTDs: 6, // 6 points per rushing touchdown
  twoPtRushingConversions: 2, // 2 points per 2-point conversion
  oneHundredYardRushingGame: 2, // 2 bonus points for 100+ rushing yards
  twoHundredYardRushingGame: 3, // 3 bonus points for 200+ rushing yards
  // Receiving stats
  receivingYards: 0.1, // 1 point per 10 receiving yards
  receptions: 1, // 1 point per reception (PPR)
  receivingTDs: 6, // 6 points per receiving touchdown
  twoPtReceivingConversions: 2, // 2 points per 2-point conversion
  oneHundredYardReceivingGame: 2, // 2 bonus points for 100+ receiving yards
  twoHundredYardReceivingGame: 3, // 3 bonus points for 200+ receiving yards
  // Kicking stats
  PATsMade: 1, // 1 point per PAT made
  PATsMissed: -1, // -1 point per PAT missed
  fieldGoalYards: 0.1, // 1 point per 10 field goal yards
  // Defensive stats (Team)
  kickoffReturnTDs: 6, // 6 points per kickoff return touchdown
  puntReturnTDs: 6, // 6 points per punt return touchdown
  interceptionReturnTDs: 6, // 6 points per interception return touchdown
  fumbleReturnTDs: 6, // 6 points per fumble return touchdown
  blockedKickReturnTDs: 6, // 6 points per blocked kick return touchdown
  sacks: 1, // 1 point per sack
  blockedKicks: 2, // 2 points per blocked kick
  interceptions: 2, // 2 points per interception
  fumblesRecovered: 2, // 2 points per fumble recovery
  fumblesForced: 1, // 1 point per forced fumble
  safeties: 2, // 2 points per safety
  pointsAllowed: 0, // Custom scoring for points allowed (see below)
  totalYardsAllowed: 0, // Custom scoring for yards allowed (see below)
  // Defensive Player stats
  assistedTackles: 0.5, // 0.5 points per assisted tackle
  soloTackles: 1, // 1 point per solo tackle
};
