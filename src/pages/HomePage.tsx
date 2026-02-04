import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Key, BarChart3, Scale, Star, ChevronRight, MapPin, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';
import { properties, testimonials, blogPosts, agents } from '@/lib/data';

const HomePage = () => {
  const { t, i18n } = useTranslation();

  const featuredProperties = properties.slice(0, 6);

  const stats = [
    { value: '15+', label: t('stats.years') },
    { value: '500+', label: t('stats.transactions') },
    { value: '3', label: t('stats.cities') },
    { value: '1200+', label: t('stats.clients') },
  ];

  const services = [
    { icon: Home, title: t('services.buying'), desc: t('services.buyingDesc') },
    { icon: Key, title: t('services.selling'), desc: t('services.sellingDesc') },
    { icon: BarChart3, title: t('services.evaluation'), desc: t('services.evaluationDesc') },
    { icon: Scale, title: t('services.legal'), desc: t('services.legalDesc') },
  ];

  const zones = [
    { name: 'Chișinău', properties: properties.filter(p => p.city === 'Chișinău').length, image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop' },
    { name: 'Bălți', properties: properties.filter(p => p.city === 'Bălți').length, image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop' },
    { name: 'Cahul', properties: 12, image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop' },
  ];

  const getTestimonialText = (testimonial: typeof testimonials[0]) => {
    switch (i18n.language) {
      case 'ru': return testimonial.textRu;
      case 'en': return testimonial.textEn;
      default: return testimonial.text;
    }
  };

  const getBlogTitle = (post: typeof blogPosts[0]) => {
    switch (i18n.language) {
      case 'ru': return post.titleRu;
      case 'en': return post.titleEn;
      default: return post.title;
    }
  };

  const getBlogExcerpt = (post: typeof blogPosts[0]) => {
    switch (i18n.language) {
      case 'ru': return post.excerptRu;
      case 'en': return post.excerptEn;
      default: return post.excerpt;
    }
  };

  const getBlogCategory = (post: typeof blogPosts[0]) => {
    switch (i18n.language) {
      case 'ru': return post.categoryRu;
      case 'en': return post.categoryEn;
      default: return post.category;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop"
            alt="Luxury home"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Content */}
        <div className="relative z-10 container-custom text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full text-accent text-sm font-medium mb-6">
              Elite Home Real Estate
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 max-w-4xl mx-auto leading-tight"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/imobile">
              <Button size="lg" className="btn-gold text-lg px-8 py-6">
                {t('hero.cta1')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6">
                {t('hero.cta2')}
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-white/80 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-8 md:py-12">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="stat-number text-accent">{stat.value}</div>
                <div className="stat-label text-primary-foreground/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 heading-underline inline-block">
              {t('properties.featured')}
            </h2>
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
              {t('properties.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/imobile">
              <Button size="lg" className="btn-navy">
                {t('properties.viewAll')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 heading-underline inline-block">
              {t('services.title')}
            </h2>
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
              {t('services.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/servicii">
              <Button variant="link" className="text-primary font-semibold">
                {t('common.learnMore')}
                <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-accent font-medium uppercase tracking-wider text-sm">
                {t('about.title')}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                {t('about.subtitle')}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {t('about.missionText')}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {agents.slice(0, 4).map((agent) => (
                  <div key={agent.id} className="flex items-center gap-3">
                    <img
                      src={agent.image}
                      alt={agent.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-accent"
                    />
                    <div>
                      <div className="font-medium text-foreground text-sm">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">{agent.experience}+ ani exp.</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/despre">
                <Button size="lg" className="btn-navy">
                  {t('common.learnMore')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-luxury-xl">
                <img
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&h=600&fit=crop"
                  alt="Office"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-luxury-lg">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center">
                    <Star className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl font-bold text-foreground">4.9</div>
                    <div className="text-sm text-muted-foreground">500+ reviews</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Zones Covered */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('zones.title')}
            </h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">
              {t('zones.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {zones.map((zone, index) => (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden"
              >
                <img
                  src={zone.image}
                  alt={zone.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-white mb-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    <h3 className="font-serif text-2xl font-semibold">{zone.name}</h3>
                  </div>
                  <p className="text-white/70 text-sm">{zone.properties} {t('nav.properties').toLowerCase()}</p>
                </div>
                <Link to={`/imobile?city=${zone.name}`} className="absolute inset-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 heading-underline inline-block">
              {t('testimonials.title')}
            </h2>
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
              {t('testimonials.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="testimonial-card relative"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-accent/20" />
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-accent"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  "{getTestimonialText(testimonial)}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 heading-underline inline-block">
              {t('blog.title')}
            </h2>
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden shadow-luxury-md hover:-translate-y-2 transition-transform duration-300"
              >
                <Link to={`/blog/${post.id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={getBlogTitle(post)}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      {getBlogCategory(post)}
                    </span>
                  </div>
                </Link>
                <div className="p-6">
                  <time className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleDateString(i18n.language)}</time>
                  <Link to={`/blog/${post.id}`}>
                    <h3 className="font-serif text-lg font-semibold text-foreground mt-2 mb-3 line-clamp-2 hover:text-primary transition-colors">
                      {getBlogTitle(post)}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {getBlogExcerpt(post)}
                  </p>
                  <Link to={`/blog/${post.id}`} className="text-primary font-medium text-sm flex items-center hover:text-accent transition-colors">
                    {t('blog.readMore')}
                    <ChevronRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/blog">
              <Button size="lg" className="btn-navy">
                {t('properties.viewAll')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              {t('hero.cta2')}?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="btn-gold text-lg px-8 py-6">
                  {t('contact.title')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+37369123456">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6">
                  {t('common.callNow')}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
