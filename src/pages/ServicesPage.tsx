import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Key, BarChart3, Scale, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServicesPage = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Home,
      title: t('services.buying'),
      desc: t('services.buyingDesc'),
      features: ['Căutare personalizată', 'Vizionări organizate', 'Negociere profesională', 'Suport la tranzacție'],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
    },
    {
      icon: Key,
      title: t('services.selling'),
      desc: t('services.sellingDesc'),
      features: ['Evaluare gratuită', 'Fotografii profesionale', 'Marketing extins', 'Prezentări virtuale'],
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop',
    },
    {
      icon: BarChart3,
      title: t('services.evaluation'),
      desc: t('services.evaluationDesc'),
      features: ['Analiză de piață', 'Raport detaliat', 'Metodologii certificate', 'Consultanță gratuită'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    },
    {
      icon: Scale,
      title: t('services.legal'),
      desc: t('services.legalDesc'),
      features: ['Verificare acte', 'Asistență notarială', 'Credite ipotecare', 'Consultanță fiscală'],
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-64 bg-primary overflow-hidden">
        <div className="container-custom h-full flex flex-col justify-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="text-primary-foreground/70 text-sm mb-4">
              <Link to="/" className="hover:text-accent">{t('nav.home')}</Link>
              <span className="mx-2">/</span>
              <span className="text-primary-foreground">{t('nav.services')}</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">{t('services.title')}</h1>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-16">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`grid md:grid-cols-2 gap-12 items-center mb-20 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className={index % 2 === 1 ? 'md:order-2' : ''}>
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-accent" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">{service.title}</h2>
              <p className="text-muted-foreground mb-6">{service.desc}</p>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button className="btn-gold">{t('contact.title')}<ArrowRight className="ml-2 w-4 h-4" /></Button>
              </Link>
            </div>
            <div className={index % 2 === 1 ? 'md:order-1' : ''}>
              <img src={service.image} alt={service.title} className="rounded-2xl shadow-luxury-lg w-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
