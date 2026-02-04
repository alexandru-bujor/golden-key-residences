export type PropertyType = 'apartment' | 'house' | 'commercial' | 'land';
export type PropertyCondition = 'euro' | 'needs_repair' | 'white_frame';
export type Currency = 'MDL' | 'EUR' | 'USD';

export interface Property {
  id: string;
  title: string;
  titleRu: string;
  titleEn: string;
  type: PropertyType;
  price: number; // Base price in EUR
  currency: Currency;
  city: string;
  sector: string;
  address: string;
  area: number; // m²
  rooms: number;
  floor: number;
  totalFloors: number;
  yearBuilt: number;
  condition: PropertyCondition;
  description: string;
  descriptionRu: string;
  descriptionEn: string;
  features: string[];
  images: string[];
  isNew: boolean;
  isUrgent: boolean;
  isFixedPrice: boolean;
  agentId: string;
  createdAt: string;
  balconies: number;
  bathrooms: number;
  heating: string;
  parking: boolean;
  elevator: boolean;
  furnished: boolean;
}

export interface Agent {
  id: string;
  name: string;
  position: string;
  positionRu: string;
  positionEn: string;
  phone: string;
  email: string;
  image: string;
  experience: number;
}

export interface BlogPost {
  id: string;
  title: string;
  titleRu: string;
  titleEn: string;
  excerpt: string;
  excerptRu: string;
  excerptEn: string;
  content: string;
  category: string;
  categoryRu: string;
  categoryEn: string;
  image: string;
  author: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  textRu: string;
  textEn: string;
  rating: number;
  image: string;
}

// Currency conversion rates (1 EUR = X)
export const exchangeRates: Record<Currency, number> = {
  EUR: 1,
  MDL: 19.5,
  USD: 1.08,
};

export const convertPrice = (priceEur: number, toCurrency: Currency): number => {
  return Math.round(priceEur * exchangeRates[toCurrency]);
};

export const formatPrice = (price: number, currency: Currency): string => {
  const formatted = new Intl.NumberFormat('ro-MD').format(price);
  const symbols: Record<Currency, string> = {
    EUR: '€',
    MDL: 'MDL',
    USD: '$',
  };
  return currency === 'MDL' ? `${formatted} ${symbols[currency]}` : `${symbols[currency]}${formatted}`;
};

export const agents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Maria Popescu',
    position: 'Director General',
    positionRu: 'Генеральный директор',
    positionEn: 'General Director',
    phone: '+373 69 123 456',
    email: 'maria@elitehome.md',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    experience: 15,
  },
  {
    id: 'agent-2',
    name: 'Ion Munteanu',
    position: 'Agent Senior',
    positionRu: 'Старший агент',
    positionEn: 'Senior Agent',
    phone: '+373 69 234 567',
    email: 'ion@elitehome.md',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    experience: 10,
  },
  {
    id: 'agent-3',
    name: 'Ana Rusu',
    position: 'Agent Imobiliar',
    positionRu: 'Агент по недвижимости',
    positionEn: 'Real Estate Agent',
    phone: '+373 69 345 678',
    email: 'ana@elitehome.md',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
    experience: 7,
  },
  {
    id: 'agent-4',
    name: 'Andrei Cojocaru',
    position: 'Agent Imobiliar',
    positionRu: 'Агент по недвижимости',
    positionEn: 'Real Estate Agent',
    phone: '+373 69 456 789',
    email: 'andrei@elitehome.md',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    experience: 5,
  },
];

export const properties: Property[] = [
  {
    id: 'CH-2451',
    title: 'Apartament modern în Buiucani',
    titleRu: 'Современная квартира в Буюканах',
    titleEn: 'Modern Apartment in Buiucani',
    type: 'apartment',
    price: 65000,
    currency: 'EUR',
    city: 'Chișinău',
    sector: 'Buiucani',
    address: 'str. Alba-Iulia 75, ap. 24',
    area: 65,
    rooms: 2,
    floor: 5,
    totalFloors: 9,
    yearBuilt: 2019,
    condition: 'euro',
    description: 'Apartament spațios cu 2 camere, reparație euro de calitate superioară. Vedere panoramică spre parc. Bloc nou cu infrastructură dezvoltată, parcare subterană inclusă. Aproape de Mall și transport public.',
    descriptionRu: 'Просторная 2-комнатная квартира с качественным евроремонтом. Панорамный вид на парк. Новый дом с развитой инфраструктурой, подземная парковка включена.',
    descriptionEn: 'Spacious 2-room apartment with high-quality euro renovation. Panoramic park view. New building with developed infrastructure, underground parking included.',
    features: ['Încălzire autonomă', 'Aer condiționat', 'Mobilat', 'Parcare subterană', 'Video interfon', 'Lift'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop',
    ],
    isNew: true,
    isUrgent: false,
    isFixedPrice: false,
    agentId: 'agent-2',
    createdAt: '2024-01-15',
    balconies: 1,
    bathrooms: 1,
    heating: 'autonomă',
    parking: true,
    elevator: true,
    furnished: true,
  },
  {
    id: 'CH-3892',
    title: 'Casă cu teren în Durlești',
    titleRu: 'Дом с участком в Дурлештах',
    titleEn: 'House with Land in Durlești',
    type: 'house',
    price: 95000,
    currency: 'EUR',
    city: 'Chișinău',
    sector: 'Durlești',
    address: 'str. Livezilor 23',
    area: 120,
    rooms: 4,
    floor: 2,
    totalFloors: 2,
    yearBuilt: 2015,
    condition: 'euro',
    description: 'Casă individuală pe 2 nivele cu teren de 4 ari. Reparație euro, toate comunicațiile conectate. Garaj pentru 2 mașini, grădină amenajată cu fântână arteziană.',
    descriptionRu: 'Индивидуальный дом на 2 уровня с участком 4 сотки. Евроремонт, все коммуникации подключены. Гараж на 2 машины, ухоженный сад с артезианским колодцем.',
    descriptionEn: 'Individual 2-story house with 4 ares of land. Euro renovation, all utilities connected. Garage for 2 cars, landscaped garden with artesian well.',
    features: ['Încălzire pe gaz', 'Garaj', 'Grădină', 'Fântână arteziană', 'Sistem de securitate', 'Terasă'],
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop',
    ],
    isNew: false,
    isUrgent: false,
    isFixedPrice: true,
    agentId: 'agent-1',
    createdAt: '2024-01-10',
    balconies: 2,
    bathrooms: 2,
    heating: 'pe gaz',
    parking: true,
    elevator: false,
    furnished: false,
  },
  {
    id: 'CH-1567',
    title: 'Apartament în Centru Istoric',
    titleRu: 'Квартира в Историческом Центре',
    titleEn: 'Apartment in Historic Center',
    type: 'apartment',
    price: 55000,
    currency: 'EUR',
    city: 'Chișinău',
    sector: 'Centru',
    address: 'bd. Ștefan cel Mare 123, ap. 8',
    area: 45,
    rooms: 1,
    floor: 3,
    totalFloors: 5,
    yearBuilt: 1975,
    condition: 'euro',
    description: 'Garsonieră renovată în inima capitalei, pe bulevardul principal. Locație excelentă cu acces rapid la toate facilitățile. Ideal pentru tineri profesioniști sau investiție.',
    descriptionRu: 'Обновленная студия в сердце столицы, на главном бульваре. Отличное расположение с быстрым доступом ко всем удобствам.',
    descriptionEn: 'Renovated studio in the heart of the capital, on the main boulevard. Excellent location with quick access to all amenities.',
    features: ['Încălzire centrală', 'Renovat', 'Locație premium', 'Aproape de metrou', 'Balcon'],
    images: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560185008-b033106af5c3?w=800&h=600&fit=crop',
    ],
    isNew: false,
    isUrgent: true,
    isFixedPrice: false,
    agentId: 'agent-3',
    createdAt: '2024-01-12',
    balconies: 1,
    bathrooms: 1,
    heating: 'centrală',
    parking: false,
    elevator: false,
    furnished: true,
  },
  {
    id: 'CH-4521',
    title: 'Spațiu comercial în Râșcani',
    titleRu: 'Коммерческое помещение в Рышкановке',
    titleEn: 'Commercial Space in Râșcani',
    type: 'commercial',
    price: 120000,
    currency: 'EUR',
    city: 'Chișinău',
    sector: 'Râșcani',
    address: 'bd. Moscova 15',
    area: 100,
    rooms: 3,
    floor: 1,
    totalFloors: 9,
    yearBuilt: 2010,
    condition: 'euro',
    description: 'Spațiu comercial la parter cu vitrină mare pe bulevardul principal. Ideal pentru magazin, showroom sau birou. Trafic pietonal intens.',
    descriptionRu: 'Коммерческое помещение на первом этаже с большой витриной на главном бульваре. Идеально для магазина, шоурума или офиса.',
    descriptionEn: 'Commercial space on the ground floor with large storefront on the main boulevard. Ideal for store, showroom, or office.',
    features: ['Vitrină mare', 'Intrare separată', 'Sistem alarmă', 'Aer condiționat', 'Acces livrări'],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&h=600&fit=crop',
    ],
    isNew: true,
    isUrgent: false,
    isFixedPrice: true,
    agentId: 'agent-4',
    createdAt: '2024-01-18',
    balconies: 0,
    bathrooms: 1,
    heating: 'autonomă',
    parking: true,
    elevator: true,
    furnished: false,
  },
  {
    id: 'CH-7823',
    title: 'Apartament premium Botanica',
    titleRu: 'Премиум квартира Ботаника',
    titleEn: 'Premium Apartment Botanica',
    type: 'apartment',
    price: 85000,
    currency: 'EUR',
    city: 'Chișinău',
    sector: 'Botanica',
    address: 'str. Dacia 42, ap. 56',
    area: 82,
    rooms: 3,
    floor: 8,
    totalFloors: 12,
    yearBuilt: 2021,
    condition: 'euro',
    description: 'Apartament de lux cu 3 camere în bloc nou exclusivist. Design modern, materiale premium, vedere spectaculoasă. Smart home integrat.',
    descriptionRu: 'Роскошная 3-комнатная квартира в новом эксклюзивном доме. Современный дизайн, премиальные материалы, потрясающий вид.',
    descriptionEn: 'Luxury 3-room apartment in new exclusive building. Modern design, premium materials, spectacular view. Smart home integrated.',
    features: ['Smart Home', 'Încălzire prin pardoseală', 'Jacuzzi', 'Walk-in closet', 'Terasă', 'Parcare subterană', '2 băi'],
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600573472591-ee6981cf35a6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
    ],
    isNew: true,
    isUrgent: false,
    isFixedPrice: false,
    agentId: 'agent-1',
    createdAt: '2024-01-20',
    balconies: 2,
    bathrooms: 2,
    heating: 'autonomă',
    parking: true,
    elevator: true,
    furnished: true,
  },
  {
    id: 'CH-9102',
    title: 'Apartament Ciocana',
    titleRu: 'Квартира Чеканы',
    titleEn: 'Ciocana Apartment',
    type: 'apartment',
    price: 48000,
    currency: 'EUR',
    city: 'Chișinău',
    sector: 'Ciocana',
    address: 'str. Mircea cel Bătrân 18, ap. 45',
    area: 54,
    rooms: 2,
    floor: 4,
    totalFloors: 9,
    yearBuilt: 1985,
    condition: 'needs_repair',
    description: 'Apartament cu 2 camere, necesită renovare. Preț atractiv pentru investitori. Locație bună cu infrastructură dezvoltată.',
    descriptionRu: '2-комнатная квартира, требует ремонта. Привлекательная цена для инвесторов. Хорошее расположение с развитой инфраструктурой.',
    descriptionEn: '2-room apartment, needs renovation. Attractive price for investors. Good location with developed infrastructure.',
    features: ['Încălzire centrală', 'Balcon', 'Lift', 'Aproape de piață'],
    images: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop',
    ],
    isNew: false,
    isUrgent: true,
    isFixedPrice: false,
    agentId: 'agent-2',
    createdAt: '2024-01-08',
    balconies: 1,
    bathrooms: 1,
    heating: 'centrală',
    parking: false,
    elevator: true,
    furnished: false,
  },
  {
    id: 'BL-1234',
    title: 'Apartament centru Bălți',
    titleRu: 'Квартира центр Бельцы',
    titleEn: 'Bălți Center Apartment',
    type: 'apartment',
    price: 38000,
    currency: 'EUR',
    city: 'Bălți',
    sector: 'Centru',
    address: 'str. Independenței 45, ap. 12',
    area: 58,
    rooms: 2,
    floor: 3,
    totalFloors: 5,
    yearBuilt: 2005,
    condition: 'euro',
    description: 'Apartament confortabil în centrul orașului Bălți. Renovare recentă, mobilat complet. Aproape de toate facilitățile.',
    descriptionRu: 'Комфортная квартира в центре города Бельцы. Недавний ремонт, полностью меблирована.',
    descriptionEn: 'Comfortable apartment in the center of Bălți. Recent renovation, fully furnished.',
    features: ['Renovat recent', 'Mobilat', 'Încălzire autonomă', 'Balcon'],
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&h=600&fit=crop',
    ],
    isNew: false,
    isUrgent: false,
    isFixedPrice: false,
    agentId: 'agent-3',
    createdAt: '2024-01-05',
    balconies: 1,
    bathrooms: 1,
    heating: 'autonomă',
    parking: false,
    elevator: false,
    furnished: true,
  },
  {
    id: 'CH-5678',
    title: 'Penthouse exclusivist Centru',
    titleRu: 'Эксклюзивный пентхаус Центр',
    titleEn: 'Exclusive Penthouse Center',
    type: 'apartment',
    price: 185000,
    currency: 'EUR',
    city: 'Chișinău',
    sector: 'Centru',
    address: 'bd. Negruzzi 8',
    area: 150,
    rooms: 4,
    floor: 16,
    totalFloors: 16,
    yearBuilt: 2022,
    condition: 'euro',
    description: 'Penthouse de excepție cu terasă panoramică și vedere 360° asupra capitalei. Finisaje de lux, jacuzzi, smart home. Exclusivitate și rafinament.',
    descriptionRu: 'Исключительный пентхаус с панорамной террасой и видом 360° на столицу. Роскошная отделка, джакузи, умный дом.',
    descriptionEn: 'Exceptional penthouse with panoramic terrace and 360° view of the capital. Luxury finishes, jacuzzi, smart home.',
    features: ['Terasă 50m²', 'Jacuzzi', 'Smart Home', 'Lift privat', '3 băi', 'Wine cellar', 'Cinema room'],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
    ],
    isNew: true,
    isUrgent: false,
    isFixedPrice: true,
    agentId: 'agent-1',
    createdAt: '2024-01-22',
    balconies: 0,
    bathrooms: 3,
    heating: 'autonomă',
    parking: true,
    elevator: true,
    furnished: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Elena și Mihai Moraru',
    location: 'Buiucani, Chișinău',
    text: 'Am găsit apartamentul visurilor noastre datorită echipei Elite Home. Profesionalism desăvârșit și suport la fiecare pas al procesului.',
    textRu: 'Мы нашли квартиру нашей мечты благодаря команде Elite Home. Безупречный профессионализм и поддержка на каждом этапе.',
    textEn: 'We found our dream apartment thanks to the Elite Home team. Perfect professionalism and support at every step of the process.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    name: 'Семья Иванов',
    location: 'Ботаника, Кишинёв',
    text: 'Отличное агентство! Помогли продать квартиру быстро и по хорошей цене. Рекомендуем всем!',
    textRu: 'Отличное агентство! Помогли продать квартиру быстро и по хорошей цене. Рекомендуем всем!',
    textEn: 'Excellent agency! Helped us sell the apartment quickly and at a good price. We recommend them to everyone!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    name: 'Natalia Rotaru',
    location: 'Centru, Chișinău',
    text: 'Servicii impecabile! M-au ajutat să înțeleg toate aspectele juridice și să finalizez tranzacția fără griji.',
    textRu: 'Безупречный сервис! Помогли разобраться во всех юридических аспектах и завершить сделку без проблем.',
    textEn: 'Impeccable services! They helped me understand all legal aspects and complete the transaction without worries.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Cum să cumperi un apartament în Chișinău: Ghid complet 2024',
    titleRu: 'Как купить квартиру в Кишинёве: Полное руководство 2024',
    titleEn: 'How to Buy an Apartment in Chișinău: Complete Guide 2024',
    excerpt: 'Tot ce trebuie să știi despre procesul de achiziție a unui apartament în capitală, de la căutare până la înregistrare.',
    excerptRu: 'Всё, что нужно знать о процессе покупки квартиры в столице, от поиска до регистрации.',
    excerptEn: 'Everything you need to know about the apartment purchasing process in the capital, from search to registration.',
    content: '',
    category: 'Ghid',
    categoryRu: 'Руководство',
    categoryEn: 'Guide',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
    author: 'Maria Popescu',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Documentele necesare pentru vânzarea unui imobil în Moldova',
    titleRu: 'Документы, необходимые для продажи недвижимости в Молдове',
    titleEn: 'Documents Required for Selling Real Estate in Moldova',
    excerpt: 'Lista completă a documentelor necesare și sfaturi pentru pregătirea dosarului de vânzare.',
    excerptRu: 'Полный список необходимых документов и советы по подготовке досье для продажи.',
    excerptEn: 'Complete list of required documents and tips for preparing the sales file.',
    content: '',
    category: 'Juridic',
    categoryRu: 'Юридические',
    categoryEn: 'Legal',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop',
    author: 'Ion Munteanu',
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'Tendințe pe piața imobiliară din Moldova în 2024',
    titleRu: 'Тенденции на рынке недвижимости Молдовы в 2024 году',
    titleEn: 'Real Estate Market Trends in Moldova in 2024',
    excerpt: 'Analiză detaliată a pieței imobiliare: prețuri, cerere, zone în dezvoltare și prognoze.',
    excerptRu: 'Детальный анализ рынка недвижимости: цены, спрос, развивающиеся районы и прогнозы.',
    excerptEn: 'Detailed analysis of the real estate market: prices, demand, developing areas, and forecasts.',
    content: '',
    category: 'Piață',
    categoryRu: 'Рынок',
    categoryEn: 'Market',
    image: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&h=500&fit=crop',
    author: 'Ana Rusu',
    createdAt: '2024-01-05',
  },
];

export const cities = ['Chișinău', 'Bălți', 'Cahul', 'Orhei', 'Ungheni'];

export const sectors: Record<string, string[]> = {
  'Chișinău': ['Centru', 'Buiucani', 'Botanica', 'Râșcani', 'Ciocana', 'Telecentru', 'Durlești', 'Sculeni'],
  'Bălți': ['Centru', 'Dacia', 'Slobozia'],
  'Cahul': ['Centru'],
  'Orhei': ['Centru'],
  'Ungheni': ['Centru'],
};
