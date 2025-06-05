
export interface WOCAQuestion {
  id: number;
  text: string;
  domain: string;
  reversed: boolean;
}

export const wocaQuestions: WOCAQuestion[] = [
  {
    id: 1,
    text: "החלטות מתקבלות גם כשלא הושגו כל התשובות",
    domain: "Apathy",
    reversed: true,
  },
  {
    id: 2,
    text: "לעיתים שיחות בין מחלקות מרגישות כמו מאבק על שליטה במקום שותפות",
    domain: "War",
    reversed: false,
  },
  {
    id: 3,
    text: "לעיתים קשה להבין מהי ההיגיון שמאחורי החלטות ההנהלה",
    domain: "Comfort",
    reversed: true,
  },
  {
    id: 4,
    text: "חילוקי דעות נתפסים כהזדמנות ללמידה ולא כאיום",
    domain: "Opportunity",
    reversed: false,
  },
  {
    id: 5,
    text: "יוזמות חדשות מתקבלות בזהירות יתר או דחייה שקטה",
    domain: "Comfort",
    reversed: true,
  },
  {
    id: 6,
    text: "כשעולה רעיון חדש, התגובה הנפוצה היא \"זה לא יעבוד כאן\"",
    domain: "Apathy",
    reversed: true,
  },
  {
    id: 7,
    text: "במצבים משתנים, מתקיים דיון יזום על התאמות נדרשות",
    domain: "Opportunity",
    reversed: false,
  },
  {
    id: 8,
    text: "דיבור על ערכים או משמעות נתפס כ\"רוחני מדי\" ולא פרקטי",
    domain: "Apathy",
    reversed: true,
  },
  {
    id: 9,
    text: "מידע קריטי עובר בעיקר דרך גורמים בלתי רשמיים",
    domain: "War",
    reversed: true,
  },
  {
    id: 10,
    text: "יש פער קבוע בין הצהרות הנהלה לבין פעולתה בפועל",
    domain: "War",
    reversed: true,
  },
  {
    id: 11,
    text: "חדשנות מקבלת מקום בשיח גם כשלא בטוחים לגבי יישום מיידי",
    domain: "Opportunity",
    reversed: false,
  },
  {
    id: 12,
    text: "לעיתים העובדים חשים שפעילותם לא מחוברת לתמונה הגדולה",
    domain: "Apathy",
    reversed: true,
  },
  {
    id: 13,
    text: "כשיש מתחים – המענה הוא פתרונות מהירים ולא הבנה של עומק הבעיה",
    domain: "Comfort",
    reversed: true,
  },
  {
    id: 14,
    text: "קיימת פתיחות גם לעמדה מנוגדת של עובד מול הנהלה",
    domain: "Opportunity",
    reversed: false,
  },
  {
    id: 15,
    text: "בשינויים משמעותיים עולה תחושת בלבול ואובדן שליטה",
    domain: "War",
    reversed: true,
  },
  {
    id: 16,
    text: "שתיקה בארגון מתפרשת לעיתים כהסכמה, גם כשיש התנגדות",
    domain: "Apathy",
    reversed: true,
  },
  {
    id: 17,
    text: "יש מרחב אמיתי לחילוקי דעות בלי לחשוש ממיתוג שלילי",
    domain: "Opportunity",
    reversed: false,
  },
  {
    id: 18,
    text: "הצלחות נחגגות, אך לא תמיד מנותחות לעומק לצורכי למידה",
    domain: "Comfort",
    reversed: true,
  },
  {
    id: 19,
    text: "עובדים מרגישים שמהלכים אסטרטגיים מתרחשים \"מעל הראש שלהם\"",
    domain: "War",
    reversed: true,
  },
  {
    id: 20,
    text: "נושאים הקשורים לרווחת עובדים נדחקים לשוליים",
    domain: "Comfort",
    reversed: true,
  },
  {
    id: 21,
    text: "נהוג לקבל החלטות קריטיות מבלי להסביר את הרקע להן",
    domain: "War",
    reversed: true,
  },
  {
    id: 22,
    text: "שיתוף פעולה בין יחידות נובע גם מתחושת חזון משותף",
    domain: "Opportunity",
    reversed: false,
  },
  {
    id: 23,
    text: "כשיש חוסר ודאות, יש נטייה לחכות ולא לפעול",
    domain: "Apathy",
    reversed: true,
  },
  {
    id: 24,
    text: "יש תחושת שגרה ארוכה ללא שינוי משמעותי או מאמץ חידוש",
    domain: "Comfort",
    reversed: true,
  },
  {
    id: 25,
    text: "רעיונות של עובדים נשמעים רק אם הם מגיעים דרך דרג ניהולי",
    domain: "War",
    reversed: true,
  },
  {
    id: 26,
    text: "לעיתים נראה שהעובדים מגיעים לעבודה מתוך אינרציה בלבד",
    domain: "Apathy",
    reversed: true,
  },
  {
    id: 27,
    text: "יש נכונות אמיתית להיכנס לאתגרים, גם כשהם מורכבים",
    domain: "Opportunity",
    reversed: false,
  },
  {
    id: 28,
    text: "האמון ההדדי בין עובדים להנהלה דורש מאמץ תמידי",
    domain: "War",
    reversed: true,
  },
  {
    id: 29,
    text: "גם בזמני שינוי, גבולות האחריות נשמרים בצורה ברורה",
    domain: "Opportunity",
    reversed: false,
  },
  {
    id: 30,
    text: "שיח על מגבלות קיים יותר מאשר חיפוש פתרונות מעשיים",
    domain: "Comfort",
    reversed: true,
  },
  {
    id: 31,
    text: "הישגים מוכרים, אך לא תמיד מחוברים לרגש או משמעות",
    domain: "Comfort",
    reversed: true,
  },
  {
    id: 32,
    text: "עובדים אינם בטוחים האם ההנהלה תומכת בהם כשקשה",
    domain: "War",
    reversed: true,
  },
  {
    id: 33,
    text: "יש חוסר נכונות לקחת אחריות מעבר למה שנדרש",
    domain: "Apathy",
    reversed: true,
  },
  {
    id: 34,
    text: "פגישות רבות מסתובבות סביב אותן בעיות ללא תנועה קדימה",
    domain: "Apathy",
    reversed: true,
  },
  {
    id: 35,
    text: "יש מוכנות לגבש מסלול חדש כשהכיוון משתנה",
    domain: "Opportunity",
    reversed: false,
  },
  {
    id: 36,
    text: "ההובלה הארגונית מגיבה למציאות במקום ליצור אותה",
    domain: "Comfort",
    reversed: true,
  },
];
