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

// Fallback Mock Data (Displays a beautiful layout before the first Google Sheet sync)
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

const mockNotes = {
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
    content: "GK GÜMÜŞ KOZMETİK Kimya üretim faaliyetlerini sadece kendi markalarıyla değil, yurt içinde ve yurt dışında Private Label üretim yaparak tüketicinin “Kaliteli ürün” ve “Uygun Fiyat” ile ulaşmasına katkı sağlamakta ve hayatın her anındaki ihtiyaçlara yönelik ürünler geliştirmektedir.\n\nGüçlü ARGE altyapımız ve teknik ekibimiz ile sizin markanıza, marka değerinize gereken hassasiyeti gösteriyor, ürün formülünden ambalaj seçimine her türlü görsel dizaynında kalite anlayışımızdan asla ödün vermeden özveri ile çalışıyoruz. Rekabetçi fiyat politikamız ile iş ortağımıza gereken her türlü desteği sağlıyor, satış sonrası teknik destek ile de yanında oluyoruz.\n\nMüşteri odaklı çalışma sistemimiz, ulaşılabilir fiyatta hem kaliteli hem de inovatif ürün yelpazesi sunmamız, lojistik desteği ve hızlı teslimat sürelerimiz, Gümüş Kozmetik'i özel markalı ürünlerde güvenilir ve uzun süreli iş ortağınız yapan başarı faktörleri arasındadır.\n\n**Markanız Bizim İçin Değerlidir!**"
  },
  faaliyetlerimiz: {
    title: "Faaliyet Alanlarımız",
    content: "Gümüş Kozmetik, kişisel bakım, endüstriyel kozmetik, özel markalı üretim (Private Label) ve ortam kokulandırma alanlarında geniş bir yelpazede hizmet sunmaktadır:\n\n- **Özel Esans Tasarımları**: Markalara ve kişiye özel imza koku tasarımları oluşturuyoruz.\n- **Premium Cilt Bakım Formülleri**: Doğal özler, hyaluronik asit ve vitamin kompleksleri ile yaşlanma karşıtı ve nemlendirici serumlar üretiyoruz.\n- **Ev & Ofis Kokulandırma**: Bambu çubuklu oda kokuları ve özel sprey formülleriyle yaşam alanlarınızın atmosferini değiştiriyoruz.\n- **Toptan & Özel Markalı Üretim**: Yurt içi ve yurt dışı markalar için fason kozmetik ve kimya üretimi (Private Label) çözümleri sunuyoruz."
  },
  yardim: {
    title: "Sıkça Sorulan Sorular",
    content: "Soru: Siparişimi nasıl oluşturabilirim?\nCevap: Sitemizde beğendiğiniz ürünün altındaki 'WhatsApp ile Sipariş Ver' butonuna tıklayarak doğrudan destek ekibimizle görüşebilir ve siparişinizi hızlıca tamamlayabilirsiniz.\n---\nSoru: Hayvanlar üzerinde test yapıyor musunuz?\nCevap: Hayır, MONNICA SKIN CARE olarak dünyanın hiçbir yerinde hayvanlar üzerinde test yapmıyor, doğaya ve tüm canlılara azami saygı gösteriyoruz.\n---\nSoru: Özel markalı fason (Private Label) üretim yapıyor musunuz?\nCevap: Evet, güçlü AR-GE ekibimiz ve uluslararası sertifikalı tesislerimizde kendi markanız için fason kozmetik ve kimya üretimi gerçekleştiriyor, ambalajdan formüle her adımda destek sunuyoruz.\n---\nSoru: Ürünlerinizin kalite sertifikaları nelerdir?\nCevap: Ürünlerimiz ilgili yasal yönetmeliklere, ISO Kalite Yönetim Sistemlerine ve uluslararası sağlık standartlarına uygun tesislerde yüksek kalite kontrol altında üretilmektedir."
  }
};

const mockProducts = [
  { id: "P001", category: "Parfüm", name: "Imperial Gold Oud", description: "Oryantal ve sıcak baharat esintileriyle harmanlanmış, gün boyu kalıcılık sunan imza parfümdür. Üst notalarda safran ve kakule, dip notalarda ise zengin amber ve oud esansı taşır.", imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600", price: "480 TL", order: 1, location: "Öne Çıkanlar" },
  { id: "P002", category: "Cilt Bakımı", name: "Hyaluronic Intense Serum", description: "Hücre yenileyici Hyaluronik Asit ve B5 Vitamini içeren derinlemesine nemlendirici cilt serumu. İnce kırışıklık görünümünü azaltır, cilde parlak ve dolgun bir görünüm kazandırır.", imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600", price: "340 TL", order: 2, location: "Öne Çıkanlar" },
  { id: "P003", category: "Oda Kokusu", name: "Lavender Fields Reed Diffuser", description: "Sakinleştirici Lavanta ve taze Okaliptüs aromaları içeren bambu çubuklu lüks oda kokusu. Evinizde ve ofisinizde 45 güne varan sürekli ve canlandırıcı bir ferahlık sağlar.", imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600", price: "260 TL", order: 3, location: "Anasayfa" },
  { id: "P004", category: "Parfüm", name: "Violet Petals Blossom", description: "Zarif mor menekşeler, yasemin ve beyaz misk içeren hafif, pudralı taze çiçek kokusu. Bahar tazeliğini teninizde hissetmek isteyenler için ideal bir günlük koku seçeneğidir.", imageUrl: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600", price: "450 TL", order: 4, location: "Anasayfa" },
  { id: "P005", category: "Cilt Bakımı", name: "C-Vitamin Radiance Glow", description: "%10 Saf C Vitamini ve antioksidan yeşil çay özleriyle formüle edilmiş aydınlatıcı serum. Cilt tonunu eşitler, güneş lekelerinin görünümünü azaltır ve cildi canlandırır.", imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600", price: "380 TL", order: 5, location: "Anasayfa" }
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
  renderTexts();
  renderFAQ();
  renderProducts();
  
  // Refresh Lucide to replace dynamic SVG icons
  triggerLucide();
  
  // Initialize Scroll Reveals (Intersection Observer)
  initScrollReveals();
  
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
  
  // 4. Header Titles & Branding
  if (globalSettings.site_title) {
    document.title = globalSettings.site_title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && globalSettings.site_description) {
      metaDescription.setAttribute('content', globalSettings.site_description);
    } else if (globalSettings.site_description) {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = globalSettings.site_description;
      document.head.appendChild(meta);
    }
  }

  const brandName = globalSettings.site_title ? globalSettings.site_title.split('|')[0].trim() : "Gümüş Kozmetik";
  
  document.getElementById('header-brand-name').innerText = brandName;
  document.getElementById('drawer-brand-name').innerText = brandName;
  document.getElementById('footer-brand-name').innerText = brandName;
  document.getElementById('copyright-brand').innerText = brandName;
  document.getElementById('copyright-year').innerText = new Date().getFullYear();
  
  // 5. Hero Banner Customization
  if (globalSettings.hero_title) document.getElementById('hero-title').innerText = globalSettings.hero_title;
  if (globalSettings.hero_subtitle) document.getElementById('hero-subtitle').innerText = globalSettings.hero_subtitle;
  if (globalSettings.hero_bg_image) {
    document.getElementById('hero-bg').style.backgroundImage = `url('${globalSettings.hero_bg_image}')`;
  }
  
  // 6. Announcement Bar
  const announceBar = document.getElementById('announcement-bar');
  if (globalSettings.announcement_text && globalSettings.announcement_text.trim() !== '') {
    document.getElementById('announcement-text').innerText = globalSettings.announcement_text;
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
          <p style="color: var(--color-text-muted); margin-top: 8px;">${globalSettings.address || 'İstanbul, Türkiye'}</p>
        </div>
      </div>
    `;
  }
}

/* ==========================================
   TEXTS & ANCHORS RENDERING (NOTLAR)
   ========================================== */

function renderTexts() {
  // 1. Hakkımızda, Vizyon, Kalite, Private Label
  if (globalNotes.hakkimizda) {
    document.getElementById('tab-hakkimizda-btn').innerText = globalNotes.hakkimizda.title || "Hakkımızda";
    document.getElementById('pane-hakkimizda').innerHTML = parseMarkdown(globalNotes.hakkimizda.content);
  }
  if (globalNotes.vizyon_misyon) {
    document.getElementById('tab-vizyonmisyon-btn').innerText = globalNotes.vizyon_misyon.title || "Vizyon & Misyon";
    document.getElementById('pane-vizyonmisyon').innerHTML = parseMarkdown(globalNotes.vizyon_misyon.content);
  }
  if (globalNotes.kalite_politikasi) {
    document.getElementById('tab-kalite-btn').innerText = globalNotes.kalite_politikasi.title || "Kalite Politikamız";
    document.getElementById('pane-kalite').innerHTML = parseMarkdown(globalNotes.kalite_politikasi.content);
  }
  if (globalNotes.private_label) {
    document.getElementById('tab-privatelabel-btn').innerText = globalNotes.private_label.title || "Private Label";
    document.getElementById('pane-privatelabel').innerHTML = parseMarkdown(globalNotes.private_label.content);
  }
  
  // 2. Faaliyetlerimiz
  if (globalNotes.faaliyetlerimiz) {
    document.getElementById('activities-title').innerText = globalNotes.faaliyetlerimiz.title || "Faaliyet Alanlarımız";
    document.getElementById('activities-content').innerHTML = parseMarkdown(globalNotes.faaliyetlerimiz.content);
  }
  
  // 3. Referanslarımız
  if (globalNotes.referanslarimiz) {
    const refsList = document.getElementById('references-list');
    refsList.innerHTML = '';
    
    // Split references text by comma or newline
    const references = globalNotes.referanslarimiz.content.split(/[,\n]+/).map(r => r.trim()).filter(r => r !== '');
    
    if (references.length > 0) {
      references.forEach(ref => {
        const item = document.createElement('div');
        item.className = 'reference-item';
        item.innerText = ref;
        refsList.appendChild(item);
      });
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
  
  if (!globalNotes.yardim || !globalNotes.yardim.content) {
    faqAccordion.innerHTML = `<p class="text-center" style="color: var(--color-text-muted);">Yardım metni bulunmamaktadır.</p>`;
    return;
  }
  
  document.getElementById('help-title').innerText = globalNotes.yardim.title || "Sıkça Sorulan Sorular";
  
  // Split SSS block by "---" delimiter
  const faqBlocks = globalNotes.yardim.content.split(/---+/);
  let hasValidFaq = false;
  
  faqBlocks.forEach((block, index) => {
    const lines = block.trim().split('\n');
    let question = "";
    let answer = "";
    
    lines.forEach(line => {
      const qMatch = line.match(/^(Soru:|Q:|S:)\s*(.*)$/i);
      const aMatch = line.match(/^(Cevap:|A:|C:)\s*(.*)$/i);
      if (qMatch) question = qMatch[2].trim();
      else if (aMatch) answer = aMatch[2].trim();
      else if (question && !answer) {
        // Append extra lines to question
        question += " " + line.trim();
      } else if (question && answer) {
        // Append extra lines to answer
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
    // If the content is just general help paragraphs
    faqAccordion.innerHTML = `
      <div class="activities-content-box reveal" style="padding: 30px;">
        ${parseMarkdown(globalNotes.yardim.content)}
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
  
  // 1. Extract Unique Categories Dynamically!
  const categories = ['all'];
  globalProducts.forEach(prod => {
    if (prod.category && !categories.includes(prod.category)) {
      categories.push(prod.category);
    }
  });
  
  // 2. Render Category Navigation Buttons
  categoriesTabs.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `category-btn ${activeCategory === cat ? 'active' : ''}`;
    btn.setAttribute('data-category', cat);
    btn.innerText = cat === 'all' ? 'Tüm Ürünler' : cat;
    
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
  
  // Filter products by active category
  const filtered = activeCategory === 'all' 
    ? globalProducts 
    : globalProducts.filter(p => p.category === activeCategory);
    
  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  
  emptyState.classList.add('hidden');
  
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    
    const locationBadge = product.location && product.location !== "Anasayfa" && product.location !== "Normal"
      ? `<span class="product-location-badge">${product.location}</span>` 
      : '';
      
    card.innerHTML = `
      <div class="product-image-wrapper">
        ${locationBadge}
        <img src="${product.imageUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400'}" alt="${product.name}" class="product-img" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description || 'Bu ürün için açıklama bulunmamaktadır.'}</p>
        <div class="product-footer">
          <span class="product-price">${product.price || 'Fiyat Alın'}</span>
          <button class="btn-view" data-id="${product.id}">
            <span>İncele</span>
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
  document.getElementById('modal-product-img').src = product.imageUrl || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600';
  document.getElementById('modal-product-img').alt = product.name;
  document.getElementById('modal-product-category').innerText = product.category;
  document.getElementById('modal-product-name').innerText = product.name;
  document.getElementById('modal-product-desc').innerText = product.description || 'Bu ürün için özel bir açıklama bulunmamaktadır. WhatsApp hattımız üzerinden detaylı bilgi alabilirsiniz.';
  document.getElementById('modal-product-price').innerText = product.price || 'Fiyat Sorun';
  
  // Configure custom WhatsApp order link
  const phoneFormatted = globalSettings.whatsapp_no ? globalSettings.whatsapp_no.replace(/[^0-9]/g, '') : '905000000000';
  const orderText = encodeURIComponent(`Merhaba Gümüş Kozmetik, "${product.name}" (${product.category}) ürününüzü inceledim ve sipariş vermek / detaylı bilgi almak istiyorum. Teşekkürler.`);
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
    .replace(/>/g, "&gt;");
    
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
        // Stop observing once animation has triggered
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
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
