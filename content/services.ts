export interface Service {
  slug: string;
  number: string;
  icon: string;
  titleEn: string;
  titleUr: string;
  titleAr: string;
  descriptionEn: string;
  descriptionUr: string;
  descriptionAr: string;
  sensitiveNote?: boolean;
}

export const services: Service[] = [
  {
    slug: "comprehensive-istikhara",
    number: "01",
    icon: "Moon",
    titleEn: "Comprehensive Istikhara",
    titleUr: "جامع شرعی استخارہ",
    titleAr: "الاستخارة الشاملة",
    descriptionEn:
      "Quranic, rosary-based, numerical, and geomantic Istikhara — seeking Allah's guidance before an important decision.",
    descriptionUr: "قرآنی، تسبیح، عددی اور رملی طریقوں سے جامع استخارہ — کسی اہم فیصلے سے پہلے اللہ کی رہنمائی طلب کرنا۔",
    descriptionAr: "الاستخارة بالقرآن والتسابيح والأعداد والرمل — طلب هداية الله قبل قرار مهم.",
  },
  {
    slug: "islamic-numerology",
    number: "02",
    icon: "Sparkles",
    titleEn: "Islamic Numerology & Science of Letters",
    titleUr: "علمِ جفر، اعداد و رمل",
    titleAr: "علم الجفر والأعداد والرمال",
    descriptionEn: "Classical ilm-e-jafr, numerological and geomantic insight drawn from traditional Islamic scholarship.",
    descriptionUr: "علمِ جفر، اعداد اور رمل — روایتی اسلامی علمِ باطن سے ماخوذ بصیرت۔",
    descriptionAr: "علم الجفر والأعداد والرمال المستمد من العلم الإسلامي التقليدي.",
  },
  {
    slug: "ruqyah-business-unblocking",
    number: "03",
    icon: "ShieldCheck",
    titleEn: "Quranic Ruqyah & Business Unblocking",
    titleUr: "حلِ بندش، تعویذاتِ شرعیہ و کاروباری بندش",
    titleAr: "الرقى والتعويذات الشرعية",
    descriptionEn: "Shariah-compliant Ruqyah and spiritual remedies for perceived obstacles in business and daily affairs.",
    descriptionUr: "کاروبار اور معاملات میں حائل رکاوٹوں کے لیے شرعی رقیہ اور روحانی تدابیر۔",
    descriptionAr: "الرقية الشرعية والعلاجات الروحية للعقبات المتصورة في التجارة والشؤون اليومية.",
  },
  {
    slug: "marriage-obstacles",
    number: "04",
    icon: "HeartHandshake",
    titleEn: "Spiritual Support for Marriage Obstacles & Delays",
    titleUr: "رشتوں و شادی کی رکاوٹ کا علاج",
    titleAr: "علاج موانع الزواج وتيسير الأمور",
    descriptionEn: "Quran-based spiritual support for those experiencing delays or difficulties in marriage matters.",
    descriptionUr: "شادی میں تاخیر یا رکاوٹ کا سامنا کرنے والوں کے لیے قرآن سے ماخوذ روحانی معاونت۔",
    descriptionAr: "دعم روحي قائم على القرآن لمن يواجهون تأخيراً أو صعوبات في أمور الزواج.",
  },
  {
    slug: "childbirth-support",
    number: "05",
    icon: "Sunrise",
    titleEn: "Spiritual Support for Childbirth & Infertility Delays",
    titleUr: "اولاد کی بندش کا روحانی حل",
    titleAr: "الدعم الروحي لتأخر الإنجاب والعقم",
    descriptionEn:
      "Prayer-based spiritual support alongside — never in place of — qualified medical care for those facing infertility or delays in childbirth.",
    descriptionUr:
      "اولاد میں تاخیر یا مشکلات کا سامنا کرنے والوں کے لیے دعائیہ روحانی معاونت، مستند طبی علاج کے ساتھ ساتھ، اس کے متبادل کے طور پر نہیں۔",
    descriptionAr: "دعم روحي قائم على الدعاء إلى جانب — وليس بدلاً عن — الرعاية الطبية المؤهلة لمن يواجهون العقم أو تأخر الإنجاب.",
    sensitiveNote: true,
  },
];
