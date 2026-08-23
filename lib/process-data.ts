export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "know",
    title: "מכירים את העסק",
    description: "מבינים מי אתם, למי אתם מדברים ומה אתם רוצים להשיג.",
  },
  {
    id: "direction",
    title: "בונים כיוון",
    description: "מגדירים את המסר, המבנה והחוויה.",
  },
  {
    id: "design",
    title: "מעצבים",
    description: "הופכים את הכיוון לשפה ויזואלית מדויקת.",
  },
  {
    id: "build",
    title: "בונים",
    description: "הופכים את העיצוב לאתר אמיתי שעובד.",
  },
  {
    id: "launch",
    title: "עולים לאוויר",
    description: "בודקים, מלטשים ומשחררים את האתר לעולם.",
  },
];
