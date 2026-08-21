/* ==========================================
   GK_Gumus Master Application Logic Core
   ========================================== */

import { db, doc, getDoc } from './firebase.js';
import { 
  createIcons, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Menu, 
  X, 
  ArrowRight, 
  Check, 
  ChevronDown, 
  ShoppingBag, 
  ExternalLink 
} from 'lucide';

// Global state variables
let globalSettings = {};
let globalProducts = [];
let globalNotes = {};
let activeCategory = 'all';
let activeLang = localStorage.getItem('activeLang') || 'tr';

// ==========================================
// STATIC i18n DICTIONARY (STATIC TEXT BLOCKS)
// ==========================================
const translations = {
  tr: {
    nav_home: "Anasayfa",
    nav_monnica: "Monnica",
    nav_about: "Hakkımızda",
    nav_products: "Ürünlerimiz",
    nav_activities: "Faaliyetlerimiz",
    nav_faq: "Soru & Cevap",
    nav_contact: "İletişim",
    nav_language: "Dil Seçimi",
    support_whatsapp: "WhatsApp Destek",
    hero_badge_text: "Doğal & Premium Kozmetik",
    hero_explore_btn: "Ürünleri Keşfet",
    hero_contact_btn: "İletişime Geç",
    benefit_1_title: "Premium Esans Kalitesi",
    benefit_1_desc: "Dünyanın en seçkin üreticilerinden ithal edilen saf ve kalıcı hammaddeler.",
    benefit_2_title: "Dermatolojik Onay",
    benefit_2_desc: "Tüm cilt bakım ve kişisel bakım serilerimiz akredite laboratuvarlarda test edilmiştir.",
    benefit_3_title: "Sürdürülebilir Üretim",
    benefit_3_desc: "Doğaya saygılı, çevre dostu paketleme ve üretim bilinci.",
    monnica_badge: "Lüks Cilt Bakımı",
    about_badge: "Biz Kimiz?",
    about_title: "Kurumsal Değerlerimiz ve İlkelerimiz",
    products_badge: "Özenle Seçilmiş",
    products_title: "Koleksiyonlarımızı Keşfedin",
    products_subtitle: "Sizin için Google Sheets üzerinden anlık olarak güncellenen, en popüler ve yeni ürünlerimiz.",
    products_all: "Tüm Ürünler",
    products_empty_title: "Aradığınız Kriterde Ürün Bulunmamaktadır",
    products_empty_desc: "Lütfen daha sonra tekrar kontrol edin veya bizimle WhatsApp üzerinden iletişime geçin.",
    activities_badge: "Neler Yapıyoruz?",
    activities_title: "Faaliyet Alanlarımız",
    activities_subtitle: "Gümüş Kozmetik olarak sektörde sunduğumuz hizmetler ve uzmanlık alanlarımız.",
    references_title: "Referanslarımız ve Ortaklarımız",
    faq_badge: "Soru & Cevap",
    faq_title: "Sıkça Sorulan Sorular",
    faq_subtitle: "Gümüş Kozmetik, sipariş, kargo ve kalite politikamız ile ilgili en çok merak edilen konular.",
    contact_badge: "Bize Ulaşın",
    contact_title: "İletişim & Mağaza Konumu",
    contact_subtitle: "Soru, görüş ve toptan/perakende sipariş talepleriniz için bizimle irtibata geçebilirsiniz.",
    contact_card_intro: "Ofisimizi ziyaret edebilir, bizi arayabilir ya da WhatsApp üzerinden doğrudan sipariş kaydı oluşturabilirsiniz.",
    contact_address_label: "Adres",
    contact_phone_label: "Telefon",
    contact_email_label: "E-Posta",
    contact_follow_us: "Bizi Takip Edin",
    footer_moto: "Doğal güzelliğin adresi. Google Sheets üzerinden Firebase altyapısı ile beslenen akıllı içerik yönetim sistemi.",
    footer_copyright: "Tüm Hakları Saklıdır.",
    footer_credit: "Bu site CTY - Chook Temiz Yalova tarafından kodlanmıştır.",
    modal_price_label: "Fiyat:",
    modal_order_btn: "WhatsApp ile Sipariş Ver"
  },
  en: {
    nav_home: "Home",
    nav_monnica: "Monnica",
    nav_about: "About Us",
    nav_products: "Products",
    nav_activities: "Our Activities",
    nav_faq: "FAQ",
    nav_contact: "Contact",
    nav_language: "Language",
    support_whatsapp: "WhatsApp Support",
    hero_badge_text: "Natural & Premium Cosmetics",
    hero_explore_btn: "Explore Products",
    hero_contact_btn: "Contact Us",
    benefit_1_title: "Premium Essence Quality",
    benefit_1_desc: "Pure and long-lasting ingredients imported from the world's most exclusive producers.",
    benefit_2_title: "Dermatological Approval",
    benefit_2_desc: "All our skin care and personal care series have been tested in accredited laboratories.",
    benefit_3_title: "Sustainable Production",
    benefit_3_desc: "Respectful of nature, conscious of eco-friendly packaging and green production.",
    monnica_badge: "Luxury Skin Care",
    about_badge: "Who Are We?",
    about_title: "Corporate Values & Principles",
    products_badge: "Curated Selection",
    products_title: "Discover Our Collections",
    products_subtitle: "Our most popular and newest products, updated in real-time via Google Sheets.",
    products_all: "All Products",
    products_empty_title: "No Products Found",
    products_empty_desc: "Please check back later or contact us directly on WhatsApp.",
    activities_badge: "What We Do",
    activities_title: "Fields of Activity",
    activities_subtitle: "Our services and areas of expertise in the cosmetics and chemical sectors.",
    references_title: "References & Partners",
    faq_badge: "FAQ",
    faq_title: "Frequently Asked Questions",
    faq_subtitle: "Most frequently asked topics regarding Gümüş Kozmetik, orders, shipping, and quality policy.",
    contact_badge: "Get in Touch",
    contact_title: "Contact & Store Location",
    contact_subtitle: "Feel free to contact us for inquiries, feedback, or wholesale/retail order requests.",
    contact_card_intro: "You can visit our office, call us, or place an order directly via WhatsApp.",
    contact_address_label: "Address",
    contact_phone_label: "Phone",
    contact_email_label: "E-Mail",
    contact_follow_us: "Follow Us",
    footer_moto: "The home of natural beauty. Smart content management system powered by Firebase and synced directly with Google Sheets.",
    footer_copyright: "All Rights Reserved.",
    footer_credit: "This site has been coded by CTY - Chook Temiz Yalova.",
    modal_price_label: "Price:",
    modal_order_btn: "Order via WhatsApp"
  },
  ar: {
    nav_home: "الرئيسية",
    nav_monnica: "مونيكا",
    nav_about: "من نحن",
    nav_products: "منتجاتنا",
    nav_activities: "مجالات عملنا",
    nav_faq: "الأسئلة الشائعة",
    nav_contact: "اتصل بنا",
    nav_language: "اللغة",
    support_whatsapp: "الدعم عبر واتساب",
    hero_badge_text: "مستحضرات تجميل طبيعية وفاخرة",
    hero_explore_btn: "اكتشف المنتجات",
    hero_contact_btn: "تواصل معنا",
    benefit_1_title: "جودة عطور فائقة",
    benefit_1_desc: "مكونات نقية وتدوم طويلاً مستوردة من نخبة المنتجين حول العالم.",
    benefit_2_title: "معتمد من أطباء الجلد",
    benefit_2_desc: "تم اختبار جميع مجموعات العناية بالبشرة والعناية الشخصية في مختبرات معتمدة.",
    benefit_3_title: "إنتاج مستدام",
    benefit_3_desc: "نحترم الطبيعة، مع مراعاة التغليف الصديق للبيئة والإنتاج الأخضر.",
    monnica_badge: "عناية فاخرة بالبشرة",
    about_badge: "من نحن؟",
    about_title: "القيم والمبادئ المؤسسية",
    products_badge: "مجموعة مختارة",
    products_title: "اكتشف مجموعتنا المميزة",
    products_subtitle: "أحدث منتجاتنا وأكثرها رواجاً، يتم تحديثها تلقائياً عبر جداول بيانات جوجل.",
    products_all: "جميع المنتجات",
    products_empty_title: "لا توجد منتجات مطابقة",
    products_empty_desc: "يرجى التحقق مرة أخرى لاحقاً أو الاتصال بنا مباشرة عبر واتساب.",
    activities_badge: "ماذا نفعل؟",
    activities_title: "مجالات أنشطتنا",
    activities_subtitle: "خدماتنا ومجالات خبرتنا في قطاعي مستحضرات التجميل والصناعات الكيميائية.",
    references_title: "شركاؤنا وعملاؤنا",
    faq_badge: "الأسئلة والأجوبة",
    faq_title: "الأسئلة الشائعة",
    faq_subtitle: "المواضيع الأكثر استفساراً حول جوموش كوزميتيك، والطلبات، والشحن، وسياسة الجودة.",
    contact_badge: "اتصل بنا",
    contact_title: "الاتصال وموقع المعرض",
    contact_subtitle: "لا تتردد في الاتصال بنا للاستفسارات، وملاحظاتكم، أو طلبات البيع بالجملة والتجزئة.",
    contact_card_intro: "يمكنك زيارة مكتبنا، الاتصال بنا، أو تقديم طلب مباشرة عبر واتساب.",
    contact_address_label: "العنوان",
    contact_phone_label: "الهاتف",
    contact_email_label: "البريد الإلكتروني",
    contact_follow_us: "تابعونا على",
    footer_moto: "عنوان الجمال الطبيعي. نظام إدارة محتوى ذكي مدعوم بقاعدة بيانات فايربيس ويتزامن مباشرة مع جداول بيانات جوجل.",
    footer_copyright: "جميع الحقوق محفوظة.",
    footer_credit: "تم تصميم هذا الموقع وتطويره بواسطة CTY - Chook Temiz Yalova.",
    modal_price_label: "السعر:",
    modal_order_btn: "اطلب الآن عبر واتساب"
  },
  ru: {
    nav_home: "Главная",
    nav_monnica: "Monnica",
    nav_about: "О нас",
    nav_products: "Продукция",
    nav_activities: "Наша деятельность",
    nav_faq: "Вопросы и ответы",
    nav_contact: "Контакты",
    nav_language: "Язык",
    support_whatsapp: "Поддержка WhatsApp",
    hero_badge_text: "Натуральная и премиум косметика",
    hero_explore_btn: "Каталог продукции",
    hero_contact_btn: "Связаться с нами",
    benefit_1_title: "Премиальное качество эссенций",
    benefit_1_desc: "Чистые и стойкие ингредиенты, импортируемые от самых эксклюзивных мировых производителей.",
    benefit_2_title: "Дерматологическое одобрение",
    benefit_2_desc: "Все наши серии по уходу за кожей и личной гигиене протестированы в аккредитованных лабораториях.",
    benefit_3_title: "Экологичное производство",
    benefit_3_desc: "Бережное отношение к природе, экологичная упаковка и забота об окружающей среде.",
    monnica_badge: "Роскошный уход за кожей",
    about_badge: "Кто мы?",
    about_title: "Корпоративные ценности и принципы",
    products_badge: "Выбор экспертов",
    products_title: "Посмотрите наши коллекции",
    products_subtitle: "Самые популярные и новые товары, обновляемые в реальном времени через Google Таблицы.",
    products_all: "Все товары",
    products_empty_title: "Товары не найдены",
    products_empty_desc: "Пожалуйста, проверьте позже или свяжитесь с нами напрямую через WhatsApp.",
    activities_badge: "Что мы делаем?",
    activities_title: "Направления деятельности",
    activities_subtitle: "Услуги и сферы экспертизы Gümüş Kozmetik в косметическом и химическом секторах.",
    references_title: "Наши партнеры и клиенты",
    faq_badge: "Вопросы и ответы",
    faq_title: "Часто задаваемые вопросы",
    faq_subtitle: "Самые популярные вопросы о Gümüş Kozmetik, заказах, доставке и нашей политике качества.",
    contact_badge: "Связаться с нами",
    contact_title: "Контакты и карта проезда",
    contact_subtitle: "Свяжитесь с нами по любым вопросам, отзывам или оптовым и розничным заказам.",
    contact_card_intro: "Вы можете посетить наш офис, позвонить нам или сделать заказ прямо через WhatsApp.",
    contact_address_label: "Адрес",
    contact_phone_label: "Телефон",
    contact_email_label: "Эл. почта",
    contact_follow_us: "Подписывайтесь на нас",
    footer_moto: "Адрес естественной красоты. Умная система управления контентом, работающая на базе Firebase и синхронизируемая с Google Таблицами.",
    footer_copyright: "Все права защищены.",
    footer_credit: "Этот сайт был разработан CTY - Chook Temiz Yalova.",
    modal_price_label: "Цена:",
    modal_order_btn: "Заказать через WhatsApp"
  }
};

// ==========================================
// MULTILINGUAL FALLBACK CORPORATE METINLERI
// ==========================================
const mockNotes = {
  tr: {
    hakkimizda: {
      title: "Hakkımızda",
      content: "Kalite, tecrübe ve günün teknolojisini de kullanarak siz değerli müşterilerimize hizmet vermeye çalışan firmamız 2004 yılında BURSA'da kurulmuş olup; kimya, kozmetik ve parfüm sektörlerine hizmet vermektedir. Bunu yaparken, kaliteli doğru hammaddeler ile kalite vazgeçilmez temel prensibimizdir. Mantalitemiz insana değer verme, insana yatırım yapma, onların taleplerini en kısa sürede ve en ekonomik biçimde karşılayarak memnuniyetlerini sağlamaktır.\n\nÇevre ile ilgili tüm mevzuat ve yasal düzenlemelere uymayı, enerji ve doğal kaynakları tasarruflu kullanmayı, hammadde seçiminde çevre duyarlılıklarına önem vermeyi ve bu maddelerin olumsuz etkilerini kontrol altına almayı, çevre kirliliğinin önlenmesini, çevrenin korunmasını, “Sıfır Atık” prensibi ile atıkların en aza indirilmesini ve kaynağında ayırarak en verimli geri dönüşümü sağlamayı, çalışanlarımızı çevre eğitimleriyle bilinçlendirmeyi, çevre performansının arttırılması için çevre yönetim sisteminin sürekli iyileştirilmesini ve bu uygulamaların devamını sağlamayı taahhüt ederiz.\n\nÇalışanlarımıza uygun ve güvenli çalışma ortamları hazırlayarak, sürekli gelişmeleri ve kendilerini yenileyebilmeleri için onları eğitim, seminer ve sosyal aktivitelerle desteklemek, tüm alanlarımızda “Sıfır Kaza” hedefi ile çalışmak, yaralanmaları ve sağlık bozulmalarını önlenmek ve iş sağlığı ve güvenliği kurallarının ve yasal yükümlülüklerinin eksiksiz olarak uygulanmasını sağlamak şirketimizin teminatı altındadır."
    },
    vizyon_misyon: {
      title: "Vizyon & Misyon",
      content: "### Vizyonumuz\nSürekli gelişim odaklı yapımızla TEMİZLİK ve KOZMETİK sektörlerinde farklılığı, uzmanlığı, güvenirliğiyle, kaliteden asla ödün vermeden, sosyal sorumluluk bilinciyle, müşteri hayallerini kusursuzlukla gerçeğe taşıyıp, ödülünü müşterilerinden (paydaşlarından) alan lider bir firma olmaktır.\n\n### Misyonumuz\nÜstün kalite ve uygun fiyatta, güvenilir ürünler ve hizmetleri ile paydaşlarımızın beklentilerini aşarak; üretim ve araştırmalarımızı sürekli arttırarak; insan ve çevre bilincini sürekli ön planda tutarak sektör ve ülke gelişimine katkıda bulunmaktır."
    },
    kalite_politikasi: {
      title: "Kalite Politikamız",
      content: "GK GÜMÜŞ KOZMETİK Kimya olarak Ulusal ve Uluslararası Mevzuatlar, Etik İlkeler ve ISO Kalite Yönetim Sistemleri doğrultusunda;\n\n- Müşterilerimizin mevcut ve muhtemel beklentilerini karşılayacak şekilde uygun ve ekonomik çözümler üreterek ürün ve hizmetler sunmayı,\n- Ürün/hizmet kalitemizi sürekli olarak iyileştirerek müşteri memnuniyetinin devamlılığını sağlamayı,\n- Teknolojik ve sektörel gelişmeleri yakından takip ederek süreçlerimizin daha verimli olmasını sağlamayı,\n- Kalite sistemleri çerçevesinde tüm çalışanların daha yetkin ve yeteneklerini en üst seviyede kullanabilen kişiler haline gelmeleri için ekip çalışmasına önem vererek kalite düzeyini sürekli yükseltmeyi,\n- Toplumsal ve çevresel duyarlılık, uluslararası iş birliği ve paydaşlarla güçlü ve sürekli ilişkiler geliştirme ve yenilikçi olma konularına öncelik vermeyi,\n\nTaahhüt etmekteyiz."
    },
    private_label: {
      title: "Private Label",
      content: "GK GÜMÜŞ KOZMETİK Kimya üretim faaliyetlerini sadece kendi markalarıyla değil, yurt içinde ve yurt dışı Private Label üretim yaparak tüketicinin “Kaliteli ürün” ve “Uygun Fiyat” ile ulaşmasına katkı sağlamakta ve hayatın her anındaki ihtiyaçlara yönelik ürünler geliştirmektedir.\n\nGüçlü ARGE altyapımız ve teknik ekibimiz ile sizin markanıza, marka değerinize gereken hassasiyeti gösteriyor, ürün formülünden ambalaj seçimine her türlü görsel dizaynında kalite anlayışımızdan asla ödün vermeden özveri ile çalışıyoruz. Rekabetçi fiyat politikamız ile iş ortağımıza gereken her türlü desteği sağlıyor, satış sonrası teknik destek ile de yanında oluyoruz.\n\nMüşteri odaklı çalışma sistemimiz, ulaşılabilir fiyatta hem kaliteli hem de inovatif ürün yelpazesi sunmamız, lojistik desteği ve hızlı teslimat sürelerimiz, Gümüş Kozmetik'i özel markalı ürünlerde güvenilir ve uzun süreli iş ortağınız yapan başarı faktörleri arasındadır.\n\n**Markanız Bizim İçin Değerlidir!**"
    },
    faaliyetlerimiz: {
      title: "Faaliyet Alanlarımız",
      content: "Gümüş Kozmetik, kişisel bakım, endüstriyel kozmetik, özel markalı üretim (Private Label) ve ortam kokulandırma alanlarında geniş bir yelpazede hizmet sunmaktadır:\n\n- **Özel Esans Tasarımları**: Markalara ve kişiye özel imza koku tasarımları oluşturuyoruz.\n- **Premium Cilt Bakım Formülleri**: Doğal özler, hyaluronik asit ve vitamin kompleksleri ile yaşlanma karşıtı ve nemlendirici serumlar üretiyoruz.\n- **Ev & Ofis Kokulandırma**: Bambu çubuklu oda kokuları ve özel sprey formülleriyle yaşam alanlarınızın atmosferini değiştiriyoruz.\n- **Toptan & Özel Markalı Üretim**: Yurt içi ve yurt dışı markalar için fason kozmetik ve kimya üretimi (Private Label) çözümleri sunuyoruz."
    },
    yardim: {
      title: "Sıkça Sorulan Sorular",
      content: "Soru: Siparişimi nasıl oluşturabilirim?\nCevap: Sitemizde beğendiğiniz ürünün altındaki 'WhatsApp ile Sipariş Ver' butonuna tıklayarak doğrudan destek ekibimizle görüşebilir ve siparişinizi hızlıca tamamlayabilirsiniz.\n---\nSoru: Hayvanlar üzerinde test yapıyor musunuz?\nCevap: Hayır, MONNICA SKIN CARE olarak dünyanın hiçbir yerinde hayvanlar üzerinde test yapmıyor, doğaya ve tüm canlılara azami saygı gösteriyoruz.\n---\nSoru: Özel markalı fason (Private Label) üretim yapıyor musunuz?\nCevap: Evet, güçlü AR-GE ekibimiz ve uluslararası sertifikalı tesislerimizde kendi markanız için fason kozmetik ve kimya üretimi gerçekleştiriyor, ambalajdan formüle her adımda destek sunuyoruz.\n---\nSoru: Ürünlerinizin kalite sertifikaları nelerdir?\nCevap: Ürünlerimiz ilgili yasal yönetmeliklere, ISO Kalite Yönetim Sistemlerine ve uluslararası sağlık standartlarına uygun tesislerde yüksek kalite kontrol altında üretilmektedir."
    }
  },
  en: {
    hakkimizda: {
      title: "About Us",
      content: "Serving our valued customers with quality, experience, and current technologies, our company was founded in BURSA in 2004, serving the chemical, cosmetics, and perfume sectors. In doing so, our essential basic principle is quality with the right, high-grade raw materials. Our mentality is to value people, invest in people, and ensure their satisfaction by meeting their demands in the shortest time and in the most economical way.\n\nWe commit to complying with all environmental regulations, using energy and natural resources sparingly, prioritizing environmental sensitivity in raw material selection, preventing environmental pollution, minimizing waste with the 'Zero Waste' principle, and ensuring the most efficient recycling, raising awareness among employees, and continuously improving the environmental management system.\n\nWe guarantee to prepare appropriate and safe working environments, supporting employees through training, seminars, and social activities with the goal of 'Zero Accident' in all areas."
    },
    vizyon_misyon: {
      title: "Vision & Mission",
      content: "### Our Vision\nTo be a leading company in the CLEANING and COSMETICS sectors with our continuous development-oriented structure, known for our difference, expertise, and reliability, without ever compromising on quality, carrying customer dreams to reality with perfection, and receiving our award from our customers.\n\n### Our Mission\nTo exceed the expectations of our stakeholders with superior quality and reasonable prices, reliable products, and services; continuously increasing our production and research; and contributing to the sector and country development by always prioritizing human and environmental awareness."
    },
    kalite_politikasi: {
      title: "Quality Policy",
      content: "As GK GÜMÜŞ KOZMETİK Kimya, in line with National and International Regulations, Ethical Principles, and ISO Quality Management Systems, we commit to:\n\n- Providing products and services by producing appropriate and economical solutions to meet current and potential expectations of our customers,\n- Ensuring the continuity of customer satisfaction by continuously improving our product/service quality,\n- Keeping close track of technological and sectoral developments to make our processes more efficient,\n- Continuously raising the quality level by giving importance to teamwork so that all employees become more competent and able to use their skills at the highest level,\n- Prioritizing social and environmental awareness, international cooperation, and developing strong and continuous relations with stakeholders."
    },
    private_label: {
      title: "Private Label",
      content: "GK GÜMÜŞ KOZMETİK Kimya contributes to consumers' access to high-quality products at reasonable prices by carrying out Private Label manufacturing both domestically and internationally, developing products for needs in every moment of life.\n\nWith our strong R&D infrastructure and technical team, we show the necessary sensitivity to your brand and brand value, and work diligently from product formulation to packaging selection without compromising our understanding of quality. We support our partners with our competitive price policy and after-sales technical support.\n\nOur customer-oriented working system, high quality, and innovative product range, fast delivery, and logistics support are among the success factors that make Gümüş Kozmetik your reliable, long-term private label partner.\n\n**Your Brand Is Valuable To Us!**"
    },
    faaliyetlerimiz: {
      title: "Our Fields of Activity",
      content: "Gümüş Kozmetik offers a wide range of services in personal care, industrial cosmetics, private label production, and ambient scenting:\n\n- **Custom Essence Designs**: We create signature fragrance designs for brands and individuals.\n- **Premium Skin Care Formulas**: We produce anti-aging and moisturizing serums with natural extracts, hyaluronic acid, and vitamin complexes.\n- **Home & Office Fragrances**: We change the atmosphere of your living spaces with reed diffusers and custom spray formulations.\n- **Wholesale & Private Label**: We offer contract cosmetics and chemical manufacturing (Private Label) solutions for domestic and international brands."
    },
    yardim: {
      title: "Frequently Asked Questions",
      content: "Question: How can I place my order?\nAnswer: By clicking the 'Order via WhatsApp' button under the product you like on our website, you can contact our support team directly and complete your order quickly.\n---\nQuestion: Do you test on animals?\nAnswer: No, as MONNICA SKIN CARE, we do not test on animals anywhere in the world, and show utmost respect to nature and all living beings.\n---\nQuestion: Do you offer private label manufacturing?\nAnswer: Yes, in our internationally certified facilities and with our strong R&D team, we carry out contract cosmetics and chemical manufacturing for your own brand, offering support from packaging to formula.\n---\nQuestion: What are your product quality certificates?\nAnswer: Our products are manufactured under strict quality control in facilities complying with relevant legal regulations, ISO Quality Management Systems, and international health standards."
    }
  },
  ar: {
    hakkimizda: {
      title: "من نحن",
      content: "تأسست شركتنا في عام 2004 في مدينة بورصة، وهي تسعى لتقديم أفضل الخدمات لعملائنا الكرام بالاستفادة من الجودة والخبرة وأحدث التقنيات في قطاعات الكيماويات ومستحضرات التجميل والعطور. إن مبدأنا الأساسي الذي لا غنى عنه هو تقديم الجودة الفائقة باستخدام المواد الخام المناسبة والآمنة. نؤمن بتقدير الإنسان والاستثمار فيه، وتلبية تطلعات عملائنا في أسرع وقت وبأكثر الطرق اقتصادية لضمان رضاهم التام.\n\nنحن ملتزمون بالامتثال لجميع القوانين واللوائح البيئية، وترشيد استهلاك الطاقة والموارد الطبيعية، وإعطاء الأولوية للحفاظ على البيئة عند اختيار المواد الخام، ومنع التلوث البيئي، وتقليل النفايات باتباع مبدأ \"صفر نفايات\"، وتوعية موظفينا بالتدريب البيئي المستمر.\n\nكما نلتزم بتوفير بيئات عمل آمنة وصحية لجميع موظفينا ودعمهم بالتدريب والأنشطة الاجتماعية والمهنية للعمل بهدف \"صفر حوادث\" في جميع منشآتنا."
    },
    vizyon_misyon: {
      title: "الرؤية والرسالة",
      content: "### رؤيتنا\nأن نكون الشركة الرائدة والمفضلة في قطاعي التنظيف ومستحضرات التجميل بفضل هيكلنا القائم على التطوير المستمر وخبرتنا وموثوقيتنا، دون المساومة على الجودة، وتحويل تطلعات عملائنا إلى واقع ملموس بكل إتقان.\n\n### رسالتنا\nتجاوز توقعات شركائنا وعملائنا بتقديم منتجات وخدمات موثوقة ذات جودة عالية وأسعار منافسة، ومواصلة أبحاثنا وتطوير إنتاجنا مع الحفاظ دائماً على الوعي البيئي والصحي والمساهمة في تنمية مجتمعنا وبلدنا."
    },
    kalite_politikasi: {
      title: "سياسة الجودة",
      content: "بصفتنا شركة GK GÜMÜŞ KOZMETİK Kimya، وتماشياً مع اللوائح الوطنية والدولية، والمبادئ الأخلاقية، ونظم إدارة الجودة ISO، فإننا نلتزم بـ:\n\n- تقديم منتجات وخدمات مبتكرة واقتصادية تلبي توقعات عملائنا الحالية والمستقبلية بالكامل.\n- تحسين جودة منتجاتنا وخدماتنا باستمرار لضمان استدامة رضا العملاء.\n- متابعة التطورات التكنولوجية والصناعية عن كثب لزيادة كفاءة عملياتنا الإنتاجية.\n- الارتقاء بمستوى كفاءة جميع الموظفين من خلال العمل الجماعي والتدريب المستمر وتمكينهم من استخدام مهاراتهم على أكمل وجه.\n- إعطاء الأولوية للمسؤولية المجتمعية والبيئية، وتطوير علاقات شراكة قوية ومستدامة مع جميع الأطراف المعنية."
    },
    private_label: {
      title: "التصنيع للغير",
      content: "تساهم شركة GK GÜMÜŞ KOZMETİK في تمكين المستهلكين من الحصول على منتجات عالية الجودة بأسعار مناسبة من خلال تقديم خدمات التصنيع للغير (Private Label) للأسواق المحلية والدولية وتطوير منتجات تلبي الاحتياجات اليومية.\n\nمن خلال بنيتنا التحتية القوية في البحث والتطوير (R&D) وفريقنا التقني المتخصص، نولي اهتماماً فائقاً لقيمة علامتكم التجارية، ونعمل بإخلاص لتطوير الصيغ وتصميم العبوات دون أي مساومة على معايير الجودة. كما ندعم شركاءنا بأسعارنا التنافسية وخدمات الدعم الفني بعد البيع.\n\nإن نظام عملنا الموجه لخدمة العملاء، وتوفير منتجات مبتكرة وعالية الجودة بأسعار معقولة، بالإضافة إلى الدعم اللوجستي وسرعة التسليم، هي العوامل الرئيسية التي تجعل من Gümüş Kozmetik شريككم الموثوق والمثالي على المدى الطويل.\n\n**علامتكم التجارية في أيدٍ أمينة وذات قيمة عالية لدينا!**"
    },
    faaliyetlerimiz: {
      title: "مجالات أنشطتنا",
      content: "تقدم شركة Gümüş Kozmetik مجموعة واسعة من الخدمات والمنتجات الفاخرة في مجالات العناية الشخصية، ومستحضرات التجميل الصناعية، والتصنيع للغير (Private Label)، وتعطير الأجواء:\n\n- **تصميم العطور المخصصة**: نبتكر عطوراً وتصاميم مميزة وفريدة للعلامات التجارية والأفراد لتعبر عن هويتهم الخاصة.\n- **تركيبات العناية بالبشرة الفاخرة**: ننتج سيرومات مرطبة ومضادة للشيخوخة غنية بالمستخلصات الطبيعية وحمض الهيالورونيك وفيتامينات مغذية.\n- **تعطير المنازل والمكاتب**: نغير أجواء مساحاتكم الخاصة باستخدام المعطرات الفاخرة وأعواد الخيزران الطبيعية والرشاشات المبتكرة.\n- **التصنيع والإنتاج بالجملة**: نقدم حلولاً متكاملة لتصنيع مستحضرات التجميل والمنتجات الكيميائية للغير (Private Label) للعلامات المحلية والعالمية."
    },
    yardim: {
      title: "الأسئلة الشائعة",
      content: "سؤال: كيف يمكنني تقديم طلب شراء؟\nجواب: من خلال النقر على زر 'اطلب الآن عبر واتساب' الموجود أسفل المنتج الذي يعجبكم على موقعنا، يمكنكم التواصل مباشرة مع فريق الدعم لدينا وإتمام طلبكم بسرعة وسهولة.\n---\nسؤال: هل تجرون تجارب على الحيوانات؟\nجواب: لا، بصفتنا MONNICA SKIN CARE، نحن لا نجري أي تجارب على الحيوانات في أي مكان في العالم، ونولي أقصى درجات الاحترام للطبيعة وجميع الكائنات الحية.\n---\nسؤال: هل تقدمون خدمات التصنيع للغير (Private Label)؟\nجواب: نعم، من خلال فريق البحث والتطوير المتميز ومصانعنا المعتمدة دولياً، نقوم بتصنيع مستحضرات التجميل والمنتجات الكيميائية لحساب علامتكم التجارية الخاصة، مع تقديم الدعم الكامل من الصيغة حتى التغليف.\n---\nسؤال: ما هي شهادات الجودة التي تمتلكونها؟\nجواب: يتم إنتاج جميع منتجاتنا تحت رقابة صارمة على الجودة في منشآت متوافقة مع القوانين الوطنية، ونظم إدارة الجودة ISO، والمعايير الصحية العالمية."
    }
  },
  ru: {
    hakkimizda: {
      title: "О нас",
      content: "Наша компания была основана в Бурсе в 2004 году и предоставляет высококачественные услуги в области химии, косметики и парфюмерии, используя многолетний опыт и передовые технологии. Нашим главным и неизменным принципом является использование только качественного и безопасного сырья. Наша философия — ценить людей, инвестировать в развитие сотрудников и удовлетворять потребности клиентов в кратчайшие сроки и с максимальной экономической выгодой.\n\nМы обязуемся соблюдать все экологические стандарты и законодательные нормы, бережно расходовать ресурсы, минимизировать количество отходов по принципу «Zero Waste», сортировать мусор для вторичной переработки и повышать экологическую грамотность сотрудников.\n\nКомпания гарантирует создание безопасных условий труда и стремится к достижению цели «Ноль несчастных случаев» во всех подразделениях."
    },
    vizyon_misyon: {
      title: "Видение и миссия",
      content: "### Наше видение\nБыть ведущим производителем в секторах бытовой химии и косметики за счет непрерывного развития, экспертизы и надежности, без какого-либо компромисса в качестве, воплощая мечты клиентов в жизнь и заслуживая их доверие.\n\n### Наша миссия\nПревосходить ожидания наших партнеров, предлагая безопасные и качественные продукты по доступным ценам, расширять исследования и разработки, заботясь об экологии и внося вклад в развитие отрасли и страны."
    },
    kalite_politikasi: {
      title: "Политика качества",
      content: "Компания GK GÜMÜŞ KOZMETİK Kimya в соответствии с национальными и международными регламентами, этическими принципами и стандартами управления качеством ISO обязуется:\n\n- Предлагать экономичные и эффективные решения, полностью удовлетворяющие текущие и будущие ожидания наших клиентов,\n- Постоянно повышать качество продукции и услуг для долгосрочного сотрудничества и лояльности клиентов,\n- Отслеживать технологические инновации для повышения производительности процессов,\n- Поощрять командную работу и повышать квалификацию сотрудников,\n- Уделять приоритетное внимание экологической ответственности и укреплению доверительных связей с партнерами."
    },
    private_label: {
      title: "Контрактное производство (Private Label)",
      content: "GK GÜMÜŞ KOZMETİK Kimya осуществляет контрактное производство продукции под торговыми марками заказчиков как на внутреннем, так и на зарубежных рынках. Мы помогаем потребителям получать качественные товары по доступным ценам для любых повседневных нужд.\n\nБлагодаря мощной научно-исследовательской базе (R&D) и квалифицированной команде мы бережно относимся к ценности вашего бренда и работаем над формулами и дизайном упаковки без компромиссов в вопросах качества. Конкурентное ценообразование и всесторонняя техническая поддержка делают нас вашим надежным партнером.\n\nОриентированность на клиента, инновационный ассортимент, быстрая доставка и отлаженная логистика — ключевые факторы нашего совместного успеха.\n\n**Ваш бренд — наша главная ценность!**"
    },
    faaliyetlerimiz: {
      title: "Направления деятельности",
      content: "Gümüş Kozmetik предлагает широкий спектр услуг в области личной гигиены, промышленной косметики, контрактного производства (Private Label) и ароматизации помещений:\n\n- **Эксклюзивная парфюмерия**: Создаем уникальные фирменные ароматы для брендов и индивидуальных заказчиков.\n- **Премиальный уход за кожей**: Производим омолаживающие и увлажняющие сыворотки с натуральными экстрактами, гиалуроновой кислотой и витаминными комплексами.\n- **Ароматы для дома и офиса**: Преображаем атмосферу ваших помещений с помощью диффузоров с бамбуковыми палочками и интерьерных спреев.\n- **Оптовое контрактное производство**: Предлагаем комплексные решения по выпуску косметической и химической продукции под вашей торговой маркой (Private Label)."
    },
    yardim: {
      title: "Часто задаваемые вопросы",
      content: "Вопрос: Как я могу оформить заказ?\nОтвет: Нажмите кнопку «Заказать через WhatsApp» под выбранным товаром, чтобы связаться с нашей службой поддержки напрямую и быстро завершить покупку.\n---\nВопрос: Тестируете ли вы продукцию на животных?\nОтвет: Нет, бренд MONNICA SKIN CARE категорически не тестирует продукцию на животных ни в одной стране мира, проявляя максимальную заботу о природе.\n---\nВопрос: Осуществляете ли вы контрактное производство (Private Label)?\nОтвет: Да, на наших сертифицированных предприятиях мы разрабатываем формулы и производим косметическую и химическую продукцию под вашим брендом под ключ.\n---\nВопрос: Каковы ваши сертификаты качества?\nОтвет: Продукция выпускается под строгим лабораторным контролем в соответствии с международными регламентами, стандартами ISO и медицинскими нормами."
    }
  }
};

// Default Fallback Settings
const mockSettings = {
  site_title: "MONNICA SKIN CARE & CLEAN END | GK GÜMÜŞ KOZMETİK",
  site_description: "Premium Cilt Bakım Formülleri, Private Label ve İleri Seviye Kozmetik Çözümleri.",
  primary_color: "#C5A880",
  secondary_color: "#9C866B",
  background_theme: "dark",
  hero_title: "MONNICA SKIN CARE",
  hero_subtitle: "FRESH CLEAN Every Day — Natural, Pure, Organic. İleri teknoloji ve binlerce yıllık güzellik sırları MONNICA laboratuvarlarında buluştu.",
  hero_bg_image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80&w=1600",
  whatsapp_no: "905000000000",
  instagram: "monnicaskincare",
  contact_email: "info@gkgumuskozmetik.com",
  contact_phone: "",
  address: "Samanlı Mah. 7. Sevinç Sok. No:17 YILDIRIM / BURSA",
  maps_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.882194519965!2d29.123287311756578!3d40.18941057134375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3f5e55555555%3A0x5555555555555555!2sSamanl%C4%B1%2C%207.%20Sevin%C3%A7%20Sk.%20No%3A17%2C%2016280%20Y%C4%B1ld%C4%B1r%C4%B1m%2FBursa!5e0!3m2!1str!2str!4v1715600000000!5m2!1str!2str"
};

const mockProducts = [
  { id: "P001", category: "Parfüm", name: "Imperial Gold Oud", description: "Oryantal ve sıcak baharat esintileriyle harmanlanmış, gün boyu kalıcılık sunan imza parfümdür. Üst notalarda safran ve kakule, dip notalarda ise zengin amber ve oud esansı taşır.", imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600", price: "480 TL", order: 1, location: "Öne Çıkanlar" },
  { id: "P002", category: "Cilt Bakımı", name: "Hyaluronic Intense Serum", description: "Hücre yenileyici Hyaluronik Asit ve B5 Vitamini içeren derinlemesine nemlendirici cilt serumu. İnce kırışıklık görünümünü azaltır, cilde parlak ve dolgun bir görünüm kazandırır.", imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600", price: "340 TL", order: 2, location: "Öne Çıkanlar" },
  { id: "P003", category: "Oda Kokusu", name: "Lavender Fields Reed Diffuser", description: "Sakinleştirici Lavanta ve taze Okaliptüs aromaları içeren bambu çubuklu lüks oda kokusu. Evinizde ve ofisinizde 45 güne varan sürekli ve canlandırıcı bir ferahlık sağlar.", imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600", price: "260 TL", order: 3, location: "Anasayfa" },
  { id: "P004", category: "Parfüm", name: "Violet Petals Blossom", description: "Zarif mor menekşeler, yasemin ve beyaz misk içeren hafif, pudralı taze çiçek kokusu. Bahar tazeliğini teninizde hissetmek isteyenler için ideal bir günlük koku seçeneğidir.", imageUrl: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600", price: "450 TL", order: 4, location: "Anasayfa" },
  { id: "P005", category: "Cilt Bakımı", name: "C-Vitamin Radiance Glow", description: "%10 Saf C Vitamini ve antioksidan yeşil çay özleriyle formüle edilmiş aydınlatıcı serum. Cilt tonunu eşitler, güneş lekelerinin görünümünü azaltır..." , imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600", price: "380 TL", order: 5, location: "Anasayfa" }
];

// Document Elements
const loaderEl = document.getElementById('page-loader');
const mobileDrawerEl = document.getElementById('mobile-drawer');
const drawerOverlayEl = document.getElementById('drawer-overlay');
const productModalEl = document.getElementById('product-modal');
const modalCloseBtn = document.getElementById('modal-close');
const modalOverlayEl = document.getElementById('modal-overlay');

/* ==========================================
   INITIALIZATION & FIREBASE DATA FETCH
   ========================================== */

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Lucide Icons initially with placeholders
  triggerLucide();
  
  // Set up event listeners immediately for UI navigation
  initNavigation();
  initAboutTabs();
  initModalListeners();
  
  try {
    // 1. Fetch settings
    const settingsDoc = await getDoc(doc(db, "settings", "data"));
    if (settingsDoc.exists()) {
      globalSettings = settingsDoc.data();
    } else {
      console.log("Firestore 'settings/data' not found, using premium fallback mock data.");
      globalSettings = mockSettings;
    }
    
    // 2. Fetch notes
    const notesDoc = await getDoc(doc(db, "notes", "data"));
    if (notesDoc.exists()) {
      globalNotes = notesDoc.data();
    } else {
      console.log("Firestore 'notes/data' not found, using premium fallback mock notes.");
      globalNotes = mockNotes;
    }

    // 3. Fetch products
    const productsDoc = await getDoc(doc(db, "products", "data"));
    if (productsDoc.exists() && productsDoc.data().list) {
      globalProducts = productsDoc.data().list;
    } else {
      console.log("Firestore 'products/data' not found, using premium fallback products list.");
      globalProducts = mockProducts;
    }
  } catch (error) {
    console.error("Firestore loading error, running in premium fallback preview mode:", error);
    // Use fallback data to guarantee 100% operation
    globalSettings = mockSettings;
    globalNotes = mockNotes;
    globalProducts = mockProducts;
  }

  // Bind and Render everything!
  applyThemeSettings();
  initLanguageSelector(); // Handles initial rendering with the correct language
  
  // Hide loading spinner after brief smooth delay
  setTimeout(() => {
    loaderEl.classList.add('fade-out');
  }, 400);
});

/* ==========================================
   DYNAMIC THEME & GENERAL SETTINGS ENGINE
   ========================================== */

function applyThemeSettings() {
  const root = document.documentElement;
  
  // 1. Dynamic Primary Color (Hex to CSS variables)
  if (globalSettings.primary_color) {
    root.style.setProperty('--color-primary', globalSettings.primary_color);
    const rgb = hexToRgb(globalSettings.primary_color);
    if (rgb) root.style.setProperty('--color-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  }
  
  // 2. Dynamic Secondary Color
  if (globalSettings.secondary_color) {
    root.style.setProperty('--color-secondary', globalSettings.secondary_color);
    const rgb = hexToRgb(globalSettings.secondary_color);
    if (rgb) root.style.setProperty('--color-secondary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
  }
  
  // 3. Background Theme Toggle (Light / Dark)
  if (globalSettings.background_theme && globalSettings.background_theme.toLowerCase() === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
  
  // 4. Header Titles & Branding (Localized dynamically)
  const siteTitle = getLocalizedSetting('site_title');
  if (siteTitle) {
    document.title = siteTitle;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    const siteDesc = getLocalizedSetting('site_description');
    if (metaDescription && siteDesc) {
      metaDescription.setAttribute('content', siteDesc);
    } else if (siteDesc) {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = siteDesc;
      document.head.appendChild(meta);
    }
  }

  const brandName = siteTitle ? siteTitle.split('|')[0].trim() : "Gümüş Kozmetik";
  
  document.getElementById('header-brand-name').innerText = brandName;
  document.getElementById('drawer-brand-name').innerText = brandName;
  document.getElementById('footer-brand-name').innerText = brandName;
  document.getElementById('copyright-brand').innerText = brandName;
  document.getElementById('copyright-year').innerText = new Date().getFullYear();
  
  // 5. Hero Banner Customization (Localized dynamically)
  const heroTitle = getLocalizedSetting('hero_title');
  const heroSubtitle = getLocalizedSetting('hero_subtitle');
  if (heroTitle) document.getElementById('hero-title').innerText = heroTitle;
  if (heroSubtitle) document.getElementById('hero-subtitle').innerText = heroSubtitle;
  if (globalSettings.hero_bg_image) {
    document.getElementById('hero-bg').style.backgroundImage = `url('${globalSettings.hero_bg_image}')`;
  }
  
  // 6. Announcement Bar (Localized dynamically)
  const announceBar = document.getElementById('announcement-bar');
  const announceText = getLocalizedSetting('announcement_text');
  if (announceText && announceText.trim() !== '') {
    document.getElementById('announcement-text').innerText = announceText;
    announceBar.classList.remove('hidden');
  } else {
    announceBar.classList.add('hidden');
  }
  
  // 7. Contact Details Integration
  if (globalSettings.address) document.getElementById('contact-address-text').innerText = globalSettings.address;
  
  const phoneEl = document.getElementById('contact-phone-item');
  if (globalSettings.contact_phone && globalSettings.contact_phone.trim() !== '') {
    document.getElementById('contact-phone-text').innerText = globalSettings.contact_phone;
    phoneEl.style.display = 'flex';
  } else {
    phoneEl.style.display = 'none';
  }
  
  if (globalSettings.contact_email) {
    let emailsHtml = globalSettings.contact_email;
    if (globalSettings.contact_email.includes('gkgumuskozmetik.com') && !globalSettings.contact_email.includes('muhasebe')) {
      emailsHtml = `${globalSettings.contact_email}<br><span style="font-size:0.9em;color:var(--color-text-muted)">muhasebe@gkgumuskozmetik.com</span>`;
    }
    document.getElementById('contact-email-text').innerHTML = emailsHtml;
  }
  
  // 8. Call To Action (WhatsApp Hooks)
  const phoneFormatted = globalSettings.whatsapp_no ? globalSettings.whatsapp_no.replace(/[^0-9]/g, '') : '905000000000';
  const whatsappWelcomeText = encodeURIComponent(`Merhaba, web sitenizden ulaşıyorum. Ürünleriniz ve hizmetleriniz hakkında detaylı bilgi almak istiyorum.`);
  const whatsappUrl = `https://wa.me/${phoneFormatted}?text=${whatsappWelcomeText}`;
  
  document.getElementById('header-whatsapp-btn').href = whatsappUrl;
  document.getElementById('drawer-whatsapp-btn').href = whatsappUrl;
  document.getElementById('social-whatsapp').href = whatsappUrl;
  
  // Instagram URL
  const instaUsername = globalSettings.instagram ? globalSettings.instagram.replace('@', '').trim() : 'gk_gumus';
  document.getElementById('social-instagram').href = `https://instagram.com/${instaUsername}`;
  
  // Google Maps Frame
  const mapContainer = document.getElementById('map-iframe-container');
  if (globalSettings.maps_embed_url && globalSettings.maps_embed_url.trim() !== '') {
    mapContainer.innerHTML = `<iframe src="${globalSettings.maps_embed_url}" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Gümüş Kozmetik Mağazası"></iframe>`;
  } else {
    // If maps embed URL is missing, show a beautiful visual placeholder card
    mapContainer.innerHTML = `
      <div class="map-placeholder">
        <div class="text-center" style="padding: 40px;">
          <i data-lucide="map-pin" style="width: 48px; height: 48px; color: var(--color-primary); margin-bottom: 16px;"></i>
          <h3>Mağaza Lokasyonumuz</h3>
          <p style="color: var(--color-text-muted); margin-top: 8px;">${globalSettings.address || 'samalli'}</p>
        </div>
      </div>
    `;
  }
}

// ==========================================
// DYNAMIC MULTI-LANGUAGE (i18n) ENGINES
// ==========================================

function initLanguageSelector() {
  // Desktop selection buttons
  document.querySelectorAll('#lang-menu-desktop .lang-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = item.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });
  
  // Mobile selection buttons
  document.querySelectorAll('#lang-menu-mobile .lang-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = item.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });
  
  // Initial switch trigger
  switchLanguage(activeLang);
}

function switchLanguage(lang) {
  activeLang = lang;
  localStorage.setItem('activeLang', lang);
  
  // Set global HTML direction and language tags
  document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  
  // Update desktop selector current label
  const dropdownLabel = document.getElementById('current-lang-text');
  if (dropdownLabel) {
    dropdownLabel.innerText = lang.toUpperCase();
  }
  
  // Update active state class on selection buttons
  document.querySelectorAll('.lang-item').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Toggle Brand bilingual blocks
  document.querySelectorAll('.brand-lang-block').forEach(block => {
    if (block.classList.contains(lang.toUpperCase())) {
      block.style.display = 'block';
    } else {
      block.style.display = 'none';
    }
  });
  
  // Translate Static Text Elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  
  // Re-run theme settings to apply localized settings (site_title, hero, announcement etc)
  applyThemeSettings();
  
  // Render localized dynamic components
  renderTexts();
  renderFAQ();
  renderProducts();
  
  // Initialize Scroll Reveals (Intersection Observer)
  initScrollReveals();
}

// Localization fallbacks
function getLocalizedSetting(key) {
  if (activeLang === 'tr') return globalSettings[key] || mockSettings[key];
  return globalSettings[`${key}_${activeLang}`] || globalSettings[key] || mockSettings[key];
}

function getLocalizedNote(key) {
  if (activeLang === 'tr') return globalNotes[key] || mockNotes.tr[key];
  
  const localizedKey = `${key}_${activeLang}`;
  if (globalNotes[localizedKey] && globalNotes[localizedKey].content) {
    return globalNotes[localizedKey];
  }
  
  return mockNotes[activeLang] ? mockNotes[activeLang][key] : (globalNotes[key] || mockNotes.tr[key]);
}

function getLocalizedProduct(product) {
  if (activeLang === 'tr') return product;
  return {
    ...product,
    category: product[`category_${activeLang}`] || product.category,
    name: product[`name_${activeLang}`] || product.name,
    description: product[`description_${activeLang}`] || product.description,
    price: product[`price_${activeLang}`] || product.price,
    location: product[`location_${activeLang}`] || product.location
  };
}

/* ==========================================
   TEXTS & ANCHORS RENDERING (NOTLAR)
   ========================================== */

function renderTexts() {
  // 1. Hakkımızda, Vizyon, Kalite, Private Label
  const hakkimizda = getLocalizedNote('hakkimizda');
  if (hakkimizda) {
    document.getElementById('tab-hakkimizda-btn').innerText = hakkimizda.title || "Hakkımızda";
    document.getElementById('pane-hakkimizda').innerHTML = parseMarkdown(hakkimizda.content);
  }
  
  const vizyon = getLocalizedNote('vizyon_misyon');
  if (vizyon) {
    document.getElementById('tab-vizyonmisyon-btn').innerText = vizyon.title || "Vizyon & Misyon";
    document.getElementById('pane-vizyonmisyon').innerHTML = parseMarkdown(vizyon.content);
  }
  
  const kalite = getLocalizedNote('kalite_politikasi');
  if (kalite) {
    document.getElementById('tab-kalite-btn').innerText = kalite.title || "Kalite Politikamız";
    document.getElementById('pane-kalite').innerHTML = parseMarkdown(kalite.content);
  }
  
  const privateLabel = getLocalizedNote('private_label');
  if (privateLabel) {
    document.getElementById('tab-privatelabel-btn').innerText = privateLabel.title || "Private Label";
    document.getElementById('pane-privatelabel').innerHTML = parseMarkdown(privateLabel.content);
  }
  
  // 2. Faaliyetlerimiz
  const faaliyetlerimiz = getLocalizedNote('faaliyetlerimiz');
  if (faaliyetlerimiz) {
    document.getElementById('activities-title').innerText = faaliyetlerimiz.title || "Faaliyet Alanlarımız";
    document.getElementById('activities-content').innerHTML = parseMarkdown(faaliyetlerimiz.content);
  }
  
  // 3. Referanslarımız
  const referanslar = getLocalizedNote('referanslarimiz') || globalNotes.referanslarimiz;
  if (referanslar && referanslar.content) {
    const refsList = document.getElementById('references-list');
    refsList.innerHTML = '';
    
    // Split references text by comma or newline
    const references = referanslar.content.split(/[,\n]+/).map(r => r.trim()).filter(r => r !== '');
    
    if (references.length > 0) {
      references.forEach(ref => {
        const item = document.createElement('div');
        item.className = 'reference-item';
        item.innerText = ref;
        refsList.appendChild(item);
      });
      document.getElementById('referanslar-container').classList.remove('hidden');
    } else {
      document.getElementById('referanslar-container').classList.add('hidden');
    }
  }
}

/* ==========================================
   SSS / FAQ BUILDER (NOTLAR -> YARDIM)
   ========================================== */

function renderFAQ() {
  const faqAccordion = document.getElementById('faq-accordion');
  faqAccordion.innerHTML = '';
  
  const yardim = getLocalizedNote('yardim');
  if (!yardim || !yardim.content) {
    const defaultTxt = activeLang === 'ar' ? 'لا توجد أسئلة شائعة.' : (activeLang === 'ru' ? 'Вопросы и ответы отсутствуют.' : (activeLang === 'en' ? 'No FAQs available.' : 'Yardım metni bulunmamaktadır.'));
    faqAccordion.innerHTML = `<p class="text-center" style="color: var(--color-text-muted);">${defaultTxt}</p>`;
    return;
  }
  
  document.getElementById('help-title').innerText = yardim.title || (activeLang === 'en' ? 'Frequently Asked Questions' : (activeLang === 'ar' ? 'الأسئلة الشائعة' : (activeLang === 'ru' ? 'Часто задаваемые вопросы' : 'Sıkça Sorulan Sorular')));
  
  // Split SSS block by "---" delimiter
  const faqBlocks = yardim.content.split(/---+/);
  let hasValidFaq = false;
  
  faqBlocks.forEach((block, index) => {
    const lines = block.trim().split('\n');
    let question = "";
    let answer = "";
    
    lines.forEach(line => {
      const qMatch = line.match(/^(Soru:|Q:|S:|Вопрос:|س:)\s*(.*)$/i);
      const aMatch = line.match(/^(Cevap:|A:|C:|Ответ:|ج:)\s*(.*)$/i);
      if (qMatch) question = qMatch[2].trim();
      else if (aMatch) answer = aMatch[2].trim();
      else if (question && !answer) {
        question += " " + line.trim();
      } else if (question && answer) {
        answer += "<br>" + line.trim();
      }
    });
    
    if (question && answer) {
      hasValidFaq = true;
      const faqItem = document.createElement('div');
      faqItem.className = 'faq-item reveal';
      faqItem.innerHTML = `
        <button class="faq-header" aria-expanded="false">
          <span>${question}</span>
          <i data-lucide="chevron-down" class="faq-icon-arrow"></i>
        </button>
        <div class="faq-body">
          <div class="faq-content">
            <p>${answer}</p>
          </div>
        </div>
      `;
      
      // Accordion Click Handler
      const headerBtn = faqItem.querySelector('.faq-header');
      headerBtn.addEventListener('click', () => {
        const isOpen = faqItem.classList.contains('open');
        
        // Close other active accordions
        document.querySelectorAll('.faq-item').forEach(item => {
          item.classList.remove('open');
          item.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
        });
        
        if (!isOpen) {
          faqItem.classList.add('open');
          headerBtn.setAttribute('aria-expanded', 'true');
        }
      });
      
      faqAccordion.appendChild(faqItem);
    }
  });
  
  if (!hasValidFaq) {
    faqAccordion.innerHTML = `
      <div class="activities-content-box reveal" style="padding: 30px;">
        ${parseMarkdown(yardim.content)}
      </div>
    `;
  }
}

/* ==========================================
   DYNAMIC PRODUCTS RENDERING ENGINE
   ========================================== */

function renderProducts() {
  const categoriesTabs = document.getElementById('product-categories');
  const productsGrid = document.getElementById('products-grid');
  const emptyState = document.getElementById('products-empty');
  
  productsGrid.innerHTML = '';
  
  if (!globalProducts || globalProducts.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  
  emptyState.classList.add('hidden');
  
  // 1. Extract Unique Categories Dynamically from localized versions!
  const categories = ['all'];
  globalProducts.forEach(prod => {
    const locProd = getLocalizedProduct(prod);
    if (locProd.category && !categories.includes(locProd.category)) {
      categories.push(locProd.category);
    }
  });
  
  // 2. Render Category Navigation Buttons
  categoriesTabs.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `category-btn ${activeCategory === cat ? 'active' : ''}`;
    btn.setAttribute('data-category', cat);
    
    if (cat === 'all') {
      btn.setAttribute('data-i18n', 'products_all');
      btn.innerText = translations[activeLang]['products_all'] || 'Tüm Ürünler';
    } else {
      btn.innerText = cat;
    }
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = cat;
      filterAndRenderProducts();
    });
    
    categoriesTabs.appendChild(btn);
  });
  
  // 3. Filter & Render Cards
  filterAndRenderProducts();
}

function filterAndRenderProducts() {
  const productsGrid = document.getElementById('products-grid');
  const emptyState = document.getElementById('products-empty');
  productsGrid.innerHTML = '';
  
  // Localize whole list first
  const localizedList = globalProducts.map(p => getLocalizedProduct(p));
  
  // Filter products by active category
  const filtered = activeCategory === 'all' 
    ? localizedList 
    : localizedList.filter(p => p.category === activeCategory);
    
  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  
  emptyState.classList.add('hidden');
  
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    
    const viewLabel = activeLang === 'en' ? 'Details' : (activeLang === 'ar' ? 'تفاصيل' : (activeLang === 'ru' ? 'Подробнее' : 'İncele'));
    const emptyDesc = activeLang === 'en' ? 'No description available for this product.' : (activeLang === 'ar' ? 'لا يوجد وصف متاح لهذا المنتج.' : (activeLang === 'ru' ? 'Для этого товара нет описания.' : 'Bu ürün için açıklama bulunmamaktadır.'));
    const priceText = product.price ? product.price : (activeLang === 'en' ? 'Get Price' : (activeLang === 'ar' ? 'طلب السعر' : (activeLang === 'ru' ? 'Запросить цену' : 'Fiyat Alın')));
    
    const isFeatured = product.location && product.location !== "Anasayfa" && product.location !== "Normal";
    let locBadgeText = product.location;
    if (isFeatured) {
      if (product.location === 'Öne Çıkanlar' || product.location === 'Featured') {
        locBadgeText = activeLang === 'en' ? 'Featured' : (activeLang === 'ar' ? 'مميز' : (activeLang === 'ru' ? 'Рекомендуемые' : 'Öne Çıkanlar'));
      }
    }
    
    const locationBadge = isFeatured
      ? `<span class="product-location-badge">${locBadgeText}</span>` 
      : '';
      
    card.innerHTML = `
      <div class="product-image-wrapper">
        ${locationBadge}
        <img src="${product.imageUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400'}" alt="${product.name}" class="product-img" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description || emptyDesc}</p>
        <div class="product-footer">
          <span class="product-price">${priceText}</span>
          <button class="btn-view" data-id="${product.id}">
            <span>${viewLabel}</span>
            <i data-lucide="arrow-right"></i>
          </button>
        </div>
      </div>
    `;
    
    // Bind modal inspector click
    card.querySelector('.btn-view').addEventListener('click', () => {
      openProductModal(product);
    });
    
    productsGrid.appendChild(card);
  });
  
  // Re-trigger Lucide for the newly loaded list items
  triggerLucide();
}

/* ==========================================
   PRODUCT DETAILS DIALOG MODAL CONTROLLER
   ========================================== */

function openProductModal(product) {
  const locProd = getLocalizedProduct(product);
  
  document.getElementById('modal-product-img').src = locProd.imageUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600';
  document.getElementById('modal-product-img').alt = locProd.name;
  document.getElementById('modal-product-category').innerText = locProd.category;
  document.getElementById('modal-product-name').innerText = locProd.name;
  
  const defaultDesc = activeLang === 'en' 
    ? 'No special description available for this product. You can get detailed information via our WhatsApp line.' 
    : (activeLang === 'ar' 
      ? 'لا يوجد وصف خاص متاح لهذا المنتج. يمكنك الحصول على معلومات مفصلة عبر خط الواتساب الخاص بنا.' 
      : (activeLang === 'ru' 
        ? 'Специальное описание для этого товара отсутствует. Вы можете получить подробную информацию через нашу линию WhatsApp.' 
        : 'Bu ürün için özel bir açıklama bulunmamaktadır. WhatsApp hattımız üzerinden detaylı bilgi alabilirsiniz.'));
        
  document.getElementById('modal-product-desc').innerText = locProd.description || defaultDesc;
  
  const defaultPrice = activeLang === 'en' ? 'Ask for Price' : (activeLang === 'ar' ? 'طلب السعر' : (activeLang === 'ru' ? 'Уточнить цену' : 'Fiyat Sorun'));
  document.getElementById('modal-product-price').innerText = locProd.price || defaultPrice;
  
  // Configure custom WhatsApp order link
  const phoneFormatted = globalSettings.whatsapp_no ? globalSettings.whatsapp_no.replace(/[^0-9]/g, '') : '905000000000';
  
  const waMsg = activeLang === 'en'
    ? `Hello Gümüş Kozmetik, I reviewed your product "${locProd.name}" (${locProd.category}) on your website and would like to order / get more information. Thank you.`
    : (activeLang === 'ar'
      ? `مرحباً جوموش كوزميتيك، لقد تصفحت منتجكم "${locProd.name}" (${locProd.category}) على موقعكم الإلكتروني وأود الطلب / الحصول على مزيد من التفاصيل. شكراً لكم.`
      : (activeLang === 'ru'
        ? `Здравствуйте, Gümüş Kozmetik! Я ознакомился с вашим продуктом "${locProd.name}" (${locProd.category}) на сайте и хотел бы сделать заказ / получить подробную информацию. Спасибо.`
        : `Merhaba Gümüş Kozmetik, "${locProd.name}" (${locProd.category}) ürününüzü inceledim ve sipariş vermek / detaylı bilgi almak istiyorum. Teşekkürler.`));
        
  const orderText = encodeURIComponent(waMsg);
  document.getElementById('modal-order-btn').href = `https://wa.me/${phoneFormatted}?text=${orderText}`;
  
  // Open modal
  productModalEl.classList.add('open');
  document.body.style.overflow = 'hidden'; // Lock main scroll
  triggerLucide();
}

function closeProductModal() {
  productModalEl.classList.remove('open');
  document.body.style.overflow = ''; // Unlock main scroll
}

function initModalListeners() {
  modalCloseBtn.addEventListener('click', closeProductModal);
  modalOverlayEl.addEventListener('click', closeProductModal);
  
  // Esc key closure
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productModalEl.classList.contains('open')) {
      closeProductModal();
    }
  });
}

/* ==========================================
   RESPONSIVE NAVIGATION ACTIONS
   ========================================== */

function initNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const header = document.getElementById('main-header');
  
  // Scroll Listener for Sticky header blur
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Highlight Active Link on Scroll
    trackScrollActiveSection();
  });
  
  // Drawer Open
  menuToggle.addEventListener('click', () => {
    mobileDrawerEl.classList.add('open');
    drawerOverlayEl.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
  
  // Drawer Close
  const closeDrawer = () => {
    mobileDrawerEl.classList.remove('open');
    drawerOverlayEl.classList.remove('open');
    document.body.style.overflow = '';
  };
  
  menuClose.addEventListener('click', closeDrawer);
  drawerOverlayEl.addEventListener('click', closeDrawer);
  
  // Mobile drawer link click close drawer
  document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

function trackScrollActiveSection() {
  const sections = document.querySelectorAll('section[id], header');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    if (section.id === 'main-header') return;
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.id;
    
    if (scrollPosition >= top && scrollPosition < top + height) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
      document.querySelectorAll('.drawer-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================
   ABOUT US INTERACTIVE TABS CONTROLLER
   ========================================== */

function initAboutTabs() {
  const tabs = document.querySelectorAll('.about-tab-btn');
  const panes = document.querySelectorAll('.about-pane');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      
      tab.classList.add('active');
      const targetId = `pane-${tab.getAttribute('data-tab')}`;
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/* ==========================================
   MICRO-MARKDOWN CONVERTER HELPER
   ========================================== */

function parseMarkdown(mdText) {
  if (!mdText) return "";
  
  let html = String(mdText)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;"); // prevent breaking html entities
    
  // Restore basic safe tags
  html = html.replace(/&amp;nbsp;/g, '&nbsp;');

  // Parse Headers (### Header)
  html = html.replace(/^### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2>$1</h2>');
  
  // Parse Bold (**text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Parse Italic (*text*)
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Parse List items (- text)
  html = html.replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>');
  
  // Wrap list items in <ul> tags (runs block-by-block)
  // Split paragraphs by double newline
  const paragraphs = html.split(/\n\n+/);
  const formattedParagraphs = paragraphs.map(p => {
    let trimmed = p.trim();
    if (trimmed.startsWith('<li>')) {
      return `<ul>${trimmed}</ul>`;
    } else if (trimmed.startsWith('<h4>') || trimmed.startsWith('<h3>') || trimmed.startsWith('<h2>')) {
      return trimmed;
    } else if (trimmed.trim() !== "") {
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
    }
    return "";
  });
  
  return formattedParagraphs.join('\n');
}

/* ==========================================
   SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================== */

function initScrollReveals() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================
   HELPER UTILS & LUCIDE CONTROLLERS
   ========================================== */

function triggerLucide() {
  createIcons({
    icons: { 
      Phone, 
      Mail, 
      MapPin, 
      Instagram, 
      Menu, 
      X, 
      ArrowRight, 
      Check, 
      ChevronDown, 
      ShoppingBag, 
      ExternalLink 
    }
  });
}

function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
