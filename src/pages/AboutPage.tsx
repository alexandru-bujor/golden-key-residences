import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Award, Users, Building } from 'lucide-react';
import { agents } from '@/lib/data';

const AboutPage = () => {
  const { t, i18n } = useTranslation();

  const stats = [
    { icon: Star, value: '15+', label: t('stats.years') },
    { icon: Building, value: '500+', label: t('stats.transactions') },
    { icon: Users, value: '1200+', label: t('stats.clients') },
    { icon: Award, value: '4.9', label: 'Rating' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-64 bg-primary">
        <div className="container-custom h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="text-primary-foreground/70 text-sm mb-4">
              <Link to="/" className="hover:text-accent">{t('nav.home')}</Link>
              <span className="mx-2">/</span>
              <span className="text-primary-foreground">{t('nav.about')}</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">{t('about.title')}</h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">{t('about.story')}</h2>
              <p className="text-muted-foreground mb-4">{t('about.missionText')}</p>
              <p className="text-muted-foreground">Cu o echipă de profesioniști dedicați, oferim servicii complete pentru cumpărarea, vânzarea și evaluarea imobilelor din Moldova.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&h=400&fit=crop" alt="Office" className="rounded-2xl shadow-luxury-lg" />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="text-center p-6 bg-card rounded-2xl shadow-luxury-md">
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-4" />
                <div className="font-serif text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-12">{t('about.team')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agents.map((agent, idx) => (
              <motion.div key={agent.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-card rounded-2xl overflow-hidden shadow-luxury-md">
                <img src={agent.image} alt={agent.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="font-serif text-xl font-semibold text-foreground">{agent.name}</h3>
                  <p className="text-accent text-sm mb-2">{i18n.language === 'ru' ? agent.positionRu : agent.position}</p>
                  <p className="text-muted-foreground text-sm">{agent.experience}+ ani experiență</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
