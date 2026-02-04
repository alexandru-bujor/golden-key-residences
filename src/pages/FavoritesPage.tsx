import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/lib/data';
import { useFavorites } from '@/hooks/useFavorites';

const FavoritesPage = () => {
  const { t } = useTranslation();
  const { favorites, clearFavorites } = useFavorites();

  const favoriteProperties = properties.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-64 bg-primary">
        <div className="container-custom h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="text-primary-foreground/70 text-sm mb-4">
              <Link to="/" className="hover:text-accent">{t('nav.home')}</Link>
              <span className="mx-2">/</span>
              <span className="text-primary-foreground">{t('nav.favorites')}</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">{t('nav.favorites')}</h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          {favoriteProperties.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-8">
                <p className="text-muted-foreground">{favoriteProperties.length} {t('nav.properties').toLowerCase()}</p>
                <Button variant="outline" onClick={clearFavorites} className="text-destructive border-destructive hover:bg-destructive hover:text-white">
                  <Trash2 className="w-4 h-4 mr-2" />Șterge toate
                </Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {favoriteProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Nu aveți favorite</h2>
              <p className="text-muted-foreground mb-8">Adăugați proprietăți la favorite pentru a le găsi mai ușor.</p>
              <Link to="/imobile"><Button className="btn-navy">{t('properties.viewAll')}</Button></Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FavoritesPage;
