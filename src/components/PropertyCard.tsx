import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Heart, Maximize2, Bed, Layers, MapPin } from 'lucide-react';
import { Property } from '@/lib/data';
import { useCurrency } from '@/hooks/useCurrency';
import { useFavorites } from '@/hooks/useFavorites';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  const { t, i18n } = useTranslation();
  const { format } = useCurrency();
  const { isFavorite, toggleFavorite } = useFavorites();

  const getTitle = () => {
    switch (i18n.language) {
      case 'ru': return property.titleRu;
      case 'en': return property.titleEn;
      default: return property.title;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="property-card group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Link to={`/imobile/${property.id}`}>
          <img
            src={property.images[0]}
            alt={getTitle()}
            className="property-image"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {property.isNew && (
            <span className="badge-new">{t('properties.new')}</span>
          )}
          {property.isUrgent && (
            <span className="badge-urgent">{t('properties.urgent')}</span>
          )}
          {property.isFixedPrice && (
            <span className="badge-fixed">{t('properties.fixedPrice')}</span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(property.id);
          }}
          className={`favorite-btn ${isFavorite(property.id) ? 'active' : ''}`}
        >
          <Heart className={`w-5 h-5 ${isFavorite(property.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
        </button>

        {/* View Details Overlay */}
        <Link
          to={`/imobile/${property.id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="bg-white/90 backdrop-blur-sm text-primary font-semibold px-6 py-3 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {t('properties.viewDetails')}
          </span>
        </Link>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="price-tag mb-2">{format(property.price)}</div>

        {/* Title */}
        <Link to={`/imobile/${property.id}`}>
          <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
            {getTitle()}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{property.address}, {property.sector}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4" />
            <span>{property.area} {t('properties.sqm')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            <span>{property.rooms} {t('properties.rooms')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            <span>{property.floor}/{property.totalFloors}</span>
          </div>
        </div>

        {/* Tags */}
        {property.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {property.features.slice(0, 2).map((feature, idx) => (
              <span key={idx} className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                {feature}
              </span>
            ))}
            {property.features.length > 2 && (
              <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                +{property.features.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyCard;
