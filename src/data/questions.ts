// input: None (static test questions data source)
// output: Exported QUESTIONS array of 66 items with weights and labels
// pos: src/data/questions.ts (更新规则：文件变更需同步本注释与所属目录 README)

export interface QuestionItem {
  id: number;
  q: string;
  load: Record<string, number>;
  labels: string[];
  likert: boolean;
}

export const QUESTIONS: QuestionItem[] = [
  {
    "id": 1,
    "q": "You often feel like you can't simply be yourself in a group.",
    "load": {
      "INT": -3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 2,
    "q": "Once you decide you want something, talking you out of it is close to impossible.",
    "load": {
      "DET": 3,
      "PER": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 3,
    "q": "You believe that some things only get through to a person once they hurt them.",
    "load": {
      "KND": 3,
      "JUS": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 4,
    "q": "If someone has something to tell you, you don't get anxious while waiting to know what it is.",
    "load": {
      "PAT": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 5,
    "q": "You tend to avoid doing things that make you uncomfortable.",
    "load": {
      "BRV": -3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 6,
    "q": "You have a hard time forgiving people.",
    "load": {
      "JUS": 3,
      "KND": -2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 7,
    "q": "You do what you have to, even when the motivation isn't there.",
    "load": {
      "PER": 3,
      "DET": -1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 8,
    "q": "You believe you can be trusted with secrets.",
    "load": {
      "INT": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 9,
    "q": "You can tell when things are over.",
    "load": {
      "DET": -3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 10,
    "q": "You are often told you have a tendency to pry too much.",
    "load": {
      "KND": 2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 11,
    "q": "You believe time heals all wounds.",
    "load": {
      "PAT": 3,
      "DET": -1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 12,
    "q": "You could use being more open about the things that make you hurt.",
    "load": {
      "BRV": -3,
      "KND": 2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 13,
    "q": "You believe that everyone should be held to the same standards.",
    "load": {
      "JUS": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 14,
    "q": "You often regret things you've said in the heat of the moment.",
    "load": {
      "BRV": 2,
      "PAT": -1,
      "KND": -2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 15,
    "q": "You adjust the way you act and talk depending on who you are with.",
    "load": {
      "INT": -3,
      "KND": 2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 16,
    "q": "You feel uncomfortable talking about your worries to other people, but want others to tell you theirs.",
    "load": {
      "KND": 2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 17,
    "q": "You believe asking others for help equates to failing.",
    "load": {
      "INT": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 18,
    "q": "You would tell a friend they're in the wrong even if it meant hurting their feelings.",
    "load": {
      "JUS": 3,
      "KND": 1.5,
      "INT": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 19,
    "q": "~ do you think that even the worst person can change...? that everybody can be a good person, if they just tried?",
    "load": {
      "KND": 3,
      "PAT": 3,
      "INT": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 20,
    "q": "When you lose interest in something, you abandon it entirely.",
    "load": {
      "PER": -3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 21,
    "q": "You need things resolved quickly, otherwise you get anxious.",
    "load": {
      "PAT": -3,
      "BRV": 3,
      "DET": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 22,
    "q": "You enjoy trying out new things that pique your interest, especially if they get you out of your comfort zone.",
    "load": {
      "BRV": 3,
      "INT": 1,
      "DET": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 23,
    "q": "When you know someone is wrong, you can't help but correct them.",
    "load": {
      "JUS": 3,
      "KND": 1.5
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 24,
    "q": "Regardless of what other people do, you have your own set of rules you won't break.",
    "load": {
      "INT": 3,
      "JUS": -1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 25,
    "q": "You often procrastinate until the last possible second before a deadline.",
    "load": {
      "PAT": 3,
      "PER": -3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 26,
    "q": "You dislike owing people, and try to pay back any favors as soon as you can.",
    "load": {
      "JUS": 3,
      "KND": 1.5
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 27,
    "q": "When something you cared about fails or ends, it takes you a long time to find something new to care about.",
    "load": {
      "DET": 2,
      "PER": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 28,
    "q": "You regularly question your identity, and try to get to know yourself better.",
    "load": {
      "INT": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 29,
    "q": "If someone you hold dear asked you for help, you'd see it through to the end even if that meant hurting yourself in the process.",
    "load": {
      "PER": 3,
      "KND": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 30,
    "q": "You would turn down an opportunity if you knew someone who would be a better fit.",
    "load": {
      "JUS": 3,
      "KND": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 31,
    "q": "You believe that the end justifies the means.",
    "load": {
      "DET": 3,
      "PER": -2,
      "JUS": -2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 32,
    "q": "You have a hard time believing you're worth the effort it takes to be with you, if not for convenience.",
    "load": {
      "KND": 2,
      "INT": -1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 33,
    "q": "Others say you speak without thinking.",
    "load": {
      "BRV": 3,
      "INT": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 34,
    "q": "You need to have things planned out before you feel ready to do something.",
    "load": {
      "BRV": -3,
      "PAT": 2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 35,
    "q": "You consider yourself to be driven more by your emotions than by facts.",
    "load": {
      "JUS": -3,
      "INT": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 36,
    "q": "When faced with a difficult choice, you'd rather ask someone for input than choosing on your own.",
    "load": {
      "INT": -3,
      "BRV": -1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 37,
    "q": "You would like to love yourself the way you are, but you rarely can.",
    "load": {
      "KND": 3,
      "INT": -2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 38,
    "q": "You perform poorly when you can't tell if you're doing well or not.",
    "load": {
      "PER": -3,
      "BRV": -1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 39,
    "q": "You've stuck with things long after they stopped being good for you, because quitting felt like betrayal.",
    "load": {
      "DET": 3,
      "KND": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 40,
    "q": "You would rather be hated than having to pretend you're someone else.",
    "load": {
      "INT": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 41,
    "q": "When something looks unlikely to work, you would rather put your efforts somewhere it will.",
    "load": {
      "DET": -3,
      "PER": -3,
      "KND": -1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 42,
    "q": "You believe that solving someone's issues for them would be doing a disservice to them.",
    "load": {
      "KND": 3,
      "INT": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 43,
    "q": "If someone says you wouldn't dare do something, you need to prove them wrong.",
    "load": {
      "BRV": 3,
      "PAT": -1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 44,
    "q": "You keep quiet about things that bother you until they become unbearable.",
    "load": {
      "PER": 3,
      "BRV": -1,
      "KND": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 45,
    "q": "You don't mind sitting in silence with someone for a long time.",
    "load": {
      "PAT": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 46,
    "q": "You often interrupt people when talking about something that excites you.",
    "load": {
      "BRV": 3,
      "PAT": -2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 47,
    "q": "You think some of your interests are embarrassing, and avoid talking about them in front of people you're not close with.",
    "load": {
      "INT": -3,
      "BRV": -2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 48,
    "q": "You believe that sugarcoating things can only make them worse in the long term.",
    "load": {
      "BRV": 3,
      "KND": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 49,
    "q": "Difficult situations hardly stress you out.",
    "load": {
      "PAT": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 50,
    "q": "You believe some things are unattainable even if you want them, and that settling for what is is acceptable.",
    "load": {
      "DET": -3,
      "PAT": 2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 51,
    "q": "Being liked matters more to you than being understood.",
    "load": {
      "INT": -3,
      "KND": 1.5
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 52,
    "q": "You are comfortable putting your own needs first when they clash with someone else's.",
    "load": {
      "INT": 2,
      "DET": 2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 53,
    "q": "You tend to endure difficult situations rather than be the one to end them.",
    "load": {
      "PER": 3,
      "DET": -1,
      "KND": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 54,
    "q": "You avoid intervening in matters that don't concern you directly.",
    "load": {
      "BRV": -3,
      "JUS": -3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 55,
    "q": "Seeing someone being treated unfairly angers you deeply.",
    "load": {
      "JUS": 3,
      "KND": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 56,
    "q": "You value the journey more than you do the destination.",
    "load": {
      "DET": -3,
      "PER": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 57,
    "q": "When someone is struggling, letting them fail and learn from the experience is sometimes for the best.",
    "load": {
      "KND": 3,
      "PAT": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 58,
    "q": "You are more critical of yourself than you are of others.",
    "load": {
      "INT": 3,
      "JUS": -1.5
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 59,
    "q": "You would put yourself in harm's way if it meant helping someone you hold dear.",
    "load": {
      "BRV": 3,
      "KND": 2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 60,
    "q": "You sometimes think of yourself as better than other people.",
    "load": {
      "INT": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 61,
    "q": "Others would say you're close-minded, or stuck in your ways.",
    "load": {
      "JUS": 3,
      "INT": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 62,
    "q": "When faced with hardships, your first instinct is to keep going no matter what.",
    "load": {
      "PER": 3,
      "BRV": 2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 63,
    "q": "You usually prefer having difficult conversations once the heat of the moment has passed.",
    "load": {
      "PAT": 3
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 64,
    "q": "You would happily accept a flattering description of yourself that isn't quite accurate.",
    "load": {
      "INT": -3,
      "KND": 1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 65,
    "q": "You have taken up many things that you haven't seen through to the end.",
    "load": {
      "PER": -3,
      "DET": -1
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  },
  {
    "id": 66,
    "q": "Having done something and failed is still better than not having done anything at all.",
    "load": {
      "BRV": 3,
      "DET": 2
    },
    "labels": [
      "Strongly disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly agree"
    ],
    "likert": true
  }
];
