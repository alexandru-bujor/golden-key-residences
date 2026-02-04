import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Heart, Share2, Phone, MessageCircle, Mail,
  Maximize2, Bed, Layers, Bath, Calendar, Thermometer, Car, Building,
  Armchair, ChevronLeft, ChevronRight, X, MapPin, Check, Facebook, Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PropertyCard from '@/components/PropertyCard';
import { properties, agents } from '@/lib/data';
import { useCurrency } from '@/hooks/useCurrency';
import { useFavorites } from '@/hooks/useFavorites';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { format } = useCurrency();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    message: '',
  });

  const property = properties.find(p => p.id === id);
  
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">
            Proprietate negăsită
          </h1>
          <Link to="/imobile">
            <Button className="btn-navy">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Înapoi la proprietăți
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const agent = agents.find(a => a.id === property.agentId) || agents[0];

  const getTitle = () => {
    switch (i18n.language) {
      case 'ru': return property.titleRu;
      case 'en': return property.titleEn;
      default: return property.title;
    }
  };

  const getDescription = () => {
    switch (i18n.language) {
      case 'ru': return property.descriptionRu;
      case 'en': return property.descriptionEn;
      default: return property.description;
    }
  };

  const getAgentPosition = () => {
    switch (i18n.language) {
      case 'ru': return agent.positionRu;
      case 'en': return agent.positionEn;
      default: return agent.position;
    }
  };

  const similarProperties = properties
    .filter(p => p.id !== property.id && (p.sector === property.sector || Math.abs(p.price - property.price) < 20000))
    .slice(0, 3);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const specs = [
    { icon: Maximize2, label: 'Suprafață', value: `${property.area} m²` },
    { icon: Bed, label: 'Camere', value: property.rooms },
    { icon: Layers, label: 'Etaj', value: `${property.floor} / ${property.totalFloors}` },
    { icon: Bath, label: 'Băi', value: property.bathrooms },
    { icon: Calendar, label: 'An construcție', value: property.yearBuilt },
    { icon: Thermometer, label: 'Încălzire', value: property.heating },
    { icon: Car, label: 'Parcare', value: property.parking ? 'Da' : 'Nu' },
    { icon: Building, label: 'Lift', value: property.elevator ? 'Da' : 'Nu' },
    { icon: Armchair, label: 'Mobilat', value: property.furnished ? 'Da' : 'Nu' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container-custom">
          <nav className="text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link>
            <span className="mx-2">/</span>
            <Link to="/imobile" className="hover:text-primary transition-colors">{t('nav.properties')}</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{property.id}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-2xl overflow-hidden mb-8"
            >
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={property.images[currentImageIndex]}
                  alt={getTitle()}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setShowLightbox(true)}
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.isNew && <span className="badge-new">{t('properties.new')}</span>}
                  {property.isUrgent && <span className="badge-urgent">{t('properties.urgent')}</span>}
                  {property.isFixedPrice && <span className="badge-fixed">{t('properties.fixedPrice')}</span>}
                </div>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 p-4 bg-card">
                {property.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === currentImageIndex ? 'border-accent' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Header Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="price-tag text-3xl md:text-4xl mb-2">{format(property.price)}</div>
                  <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                    {getTitle()}
                  </h1>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isFavorite(property.id) 
                        ? 'border-destructive bg-destructive/10 text-destructive' 
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite(property.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="w-12 h-12 rounded-full border-2 border-border flex items-center justify-center hover:border-primary transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="w-5 h-5 text-accent" />
                <span>{property.address}, {property.sector}, {property.city}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm px-3 py-1 bg-muted rounded-full">Cod: {property.id}</span>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a href={`tel:${agent.phone}`}>
                <Button className="btn-gold">
                  <Phone className="w-4 h-4 mr-2" />
                  {t('common.callNow')}
                </Button>
              </a>
              <a href={`https://wa.me/${agent.phone.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </a>
              <a href={`mailto:${agent.email}`}>
                <Button variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
              </a>
            </motion.div>

            {/* Specs Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
            >
              {specs.map((spec, idx) => (
                <div key={idx} className="bg-card rounded-xl p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <spec.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{spec.label}</div>
                      <div className="font-semibold text-foreground">{spec.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-8"
            >
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Descriere</h2>
              <p className="text-muted-foreground leading-relaxed">
                {getDescription()}
              </p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-8"
            >
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Dotări</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mb-8"
            >
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Locație</h2>
              <div className="h-64 bg-muted rounded-xl flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>{property.address}, {property.sector}</p>
                  <p>{property.city}, Moldova</p>
                </div>
              </div>
            </motion.div>

            {/* Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-foreground font-medium">{t('common.share')}:</span>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#0088cc] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                  <Send className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#7360F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Agent Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-2xl p-6 shadow-luxury-md border border-border sticky top-24 mb-8"
            >
              <h3 className="font-serif text-lg font-semibold text-foreground mb-4">Agent responsabil</h3>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                />
                <div>
                  <div className="font-semibold text-foreground">{agent.name}</div>
                  <div className="text-sm text-muted-foreground">{getAgentPosition()}</div>
                  <div className="text-sm text-accent">{agent.experience}+ ani experiență</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a href={`tel:${agent.phone}`} className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
                  <Phone className="w-4 h-4" />
                  {agent.phone}
                </a>
                <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-foreground hover:text-accent transition-colors">
                  <Mail className="w-4 h-4" />
                  {agent.email}
                </a>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="font-semibold text-foreground">{t('properties.scheduleViewing')}</h4>
                <Input
                  placeholder={t('contact.form.name')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="luxury-input"
                />
                <Input
                  placeholder={t('contact.form.phone')}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="luxury-input"
                />
                <Input
                  placeholder={t('contact.form.email')}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="luxury-input"
                />
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="luxury-input"
                />
                <Textarea
                  placeholder={t('contact.form.message')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="luxury-input min-h-[100px]"
                />
                <Button type="submit" className="w-full btn-gold">
                  {t('contact.form.send')}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
              Proprietăți similare
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((prop, index) => (
                <PropertyCard key={prop.id} property={prop} index={index} />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <img
            src={property.images[currentImageIndex]}
            alt=""
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default PropertyDetailPage;
