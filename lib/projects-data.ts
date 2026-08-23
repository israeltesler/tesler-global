export const PROJECTS_PAGE_ENABLED = false;

export const FEATURED_PROJECTS = PROJECTS_PAGE_ENABLED
  ? [
      {
        id: "cohen-co",
        number: "01",
        category: "משרד עורכי דין",
        name: "כהן ושות'",
        title: "כהן ושות' — בוטיק משפטי למשפחה, עבודה ונדל״ן.",
        description:
          "אתר תדמית מקצועי עם דגש על אמינות, בהירות ויצירת קשר — ייצוג משפטי שמחזיר תחושת שליטה לתהליך מורכב.",
        meta: "עיצוב ופיתוח, 2025",
        image: "/projects/cohen-co-hero.jpg",
        imageWidth: 1024,
        imageHeight: 587,
        imageAlt: "אתר כהן ושות' — משרד עורכי דין",
      },
      {
        id: "romema",
        number: "02",
        category: "בוטיק יוקרה",
        name: "ROMEMA",
        title: "ROMEMA — בוטיק יוקרה לכיסויי ראש.",
        description:
          "חנות אונליין אלגנטית עם עיצוב נשי ומינימליסטי, גלריית מוצרים מרשימה וחוויית קנייה ממירה.",
        meta: "חנות אונליין, 2025",
        image: "/projects/romema-hero.jpg",
        imageWidth: 1024,
        imageHeight: 585,
        imageAlt: "אתר ROMEMA — בוטיק יוקרה לכיסויי ראש",
      },
    ]
  : [];

export const COHEN_CO_IMAGE = "/projects/cohen-co-hero.jpg";
export const ROMEMA_IMAGE = "/projects/romema-hero.jpg";
