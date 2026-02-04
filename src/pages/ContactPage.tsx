import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { agents } from '@/lib/data';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-64 bg-primary">
        <div className="container-custom h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="text-primary-foreground/70 text-sm mb-4">
              <Link to="/" className="hover:text-accent">{t('nav.home')}</Link>
              <span className="mx-2">/</span>
              <span className="text-primary-foreground">{t('nav.contact')}</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">{t('contact.title')}</h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-8">{t('contact.subtitle')}</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('contact.address')}</h3>
                    <p className="text-muted-foreground">bd. Ștefan cel Mare și Sfânt 123, of. 45<br />Chișinău, Moldova</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('contact.phone')}</h3>
                    <a href="tel:+37369123456" className="text-muted-foreground hover:text-accent">+373 69 123 456</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('contact.email')}</h3>
                    <a href="mailto:info@elitehome.md" className="text-muted-foreground hover:text-accent">info@elitehome.md</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{t('contact.schedule')}</h3>
                    <p className="text-muted-foreground">{t('contact.weekdays')}<br />{t('contact.saturday')}</p>
                  </div>
                </div>
              </div>

              <div className="h-64 bg-muted rounded-xl flex items-center justify-center">
                <MapPin className="w-12 h-12 text-muted-foreground" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-card rounded-2xl p-8 shadow-luxury-lg">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-6">{t('contact.form.send')}</h3>
                <form className="space-y-4">
                  <Input placeholder={t('contact.form.name')} className="luxury-input" />
                  <Input placeholder={t('contact.form.email')} type="email" className="luxury-input" />
                  <Input placeholder={t('contact.form.phone')} className="luxury-input" />
                  <select className="luxury-input w-full">
                    <option value="">{t('contact.form.subject')}</option>
                    <option value="buy">{t('contact.form.buying')}</option>
                    <option value="sell">{t('contact.form.selling')}</option>
                    <option value="question">{t('contact.form.question')}</option>
                  </select>
                  <Textarea placeholder={t('contact.form.message')} className="luxury-input min-h-[120px]" />
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" className="rounded" />
                    {t('contact.form.gdpr')}
                  </label>
                  <Button type="submit" className="w-full btn-gold">{t('contact.form.send')}</Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
