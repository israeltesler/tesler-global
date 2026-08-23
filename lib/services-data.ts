import {
  Globe,
  LayoutTemplate,
  Palette,
  RefreshCw,
  Search,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

export type ServiceItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: readonly string[];
};

export const SERVICES: ServiceItem[] = [
  {
    id: "website-design",
    icon: LayoutTemplate,
    title: "עיצוב ופיתוח Web",
    description:
      "חוויה דיגיטלית שלמה — מאפיון ועיצוב UI/UX ועד פיתוח מדויק, בנויה סביב המותג שלכם.",
    highlights: ["UI/UX", "פיתוח מלא", "מותאם לנייד"],
  },
  {
    id: "landing-pages",
    icon: Globe,
    title: "אתרי תדמית ודפי נחיתה",
    description:
      "מסר ברור, עיצוב מינימלי ומבנה שמוביל לפעולה — בלי רעש, בלי תבניות.",
    highlights: ["מסר מדויק", "המרה", "מהירות"],
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    title: "חנויות אונליין",
    description:
      "חוויית קנייה חלקה, עיצוב שמחזק אמון ומבנה שממיר מבקרים ללקוחות.",
    highlights: ["עגלת קניות", "תשלומים", "ניהול"],
  },
  {
    id: "branding",
    icon: Palette,
    title: "מיתוג ויזואלי",
    description:
      "שפה עיצובית עקבית — צבע, טיפוגרפיה ואלמנטים שמחזקים את הזהות ברשת.",
    highlights: ["זהות", "טיפוגרפיה", "מערכת"],
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO ואופטימיזציה",
    description:
      "בסיס טכני נכון — מהירות, מבנה, מטא-דאטה ונגישות שתומכים בדירוג ובחוויה.",
    highlights: ["מהירות", "מטא-דאטה", "מבנה"],
  },
  {
    id: "maintenance",
    icon: RefreshCw,
    title: "ליווי ותחזוקה",
    description:
      "עדכונים, שיפורים ותמיכה שוטפת — כדי שהאתר ימשיך לעבוד בשביל העסק.",
    highlights: ["עדכונים", "גיבויים", "תמיכה"],
  },
];
