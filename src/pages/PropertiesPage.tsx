import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Grid, List, MapPin, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PropertyCard from '@/components/PropertyCard';
import { properties, cities, sectors, PropertyType, PropertyCondition } from '@/lib/data';
import { useCurrency } from '@/hooks/useCurrency';

const PropertiesPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { format } = useCurrency();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedType, setSelectedType] = useState<PropertyType | ''>('');
  const [selectedCondition, setSelectedCondition] = useState<PropertyCondition | ''>('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [areaMin, setAreaMin] = useState('');
  const [areaMax, setAreaMax] = useState('');
  const [rooms, setRooms] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const availableSectors = selectedCity ? sectors[selectedCity] || [] : [];

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (selectedCity) {
      result = result.filter(p => p.city === selectedCity);
    }
    if (selectedSector) {
      result = result.filter(p => p.sector === selectedSector);
    }
    if (selectedType) {
      result = result.filter(p => p.type === selectedType);
    }
    if (selectedCondition) {
      result = result.filter(p => p.condition === selectedCondition);
    }
    if (priceMin) {
      result = result.filter(p => p.price >= parseInt(priceMin));
    }
    if (priceMax) {
      result = result.filter(p => p.price <= parseInt(priceMax));
    }
    if (areaMin) {
      result = result.filter(p => p.area >= parseInt(areaMin));
    }
    if (areaMax) {
      result = result.filter(p => p.area <= parseInt(areaMax));
    }
    if (rooms) {
      result = result.filter(p => p.rooms === parseInt(rooms));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'area-desc':
        result.sort((a, b) => b.area - a.area);
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [selectedCity, selectedSector, selectedType, selectedCondition, priceMin, priceMax, areaMin, areaMax, rooms, sortBy]);

  const resetFilters = () => {
    setSelectedCity('');
    setSelectedSector('');
    setSelectedType('');
    setSelectedCondition('');
    setPriceMin('');
    setPriceMax('');
    setAreaMin('');
    setAreaMax('');
    setRooms('');
    setSortBy('newest');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCity || selectedSector || selectedType || selectedCondition || priceMin || priceMax || areaMin || areaMax || rooms;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative h-64 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=400&fit=crop"
            alt="Properties"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom h-full flex flex-col justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <nav className="text-primary-foreground/70 text-sm mb-4">
              <Link to="/" className="hover:text-accent transition-colors">{t('nav.home')}</Link>
              <span className="mx-2">/</span>
              <span className="text-primary-foreground">{t('nav.properties')}</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">
              {t('nav.properties')}
            </h1>
          </motion.div>
        </div>
      </section>

      <div className="container-custom py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant={showFilters ? 'default' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t('properties.filter')}
              {hasActiveFilters && (
                <span className="w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
            
            <span className="text-muted-foreground">
              {filteredProperties.length} {t('properties.results')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t('properties.sort')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Cele mai noi</SelectItem>
                <SelectItem value="price-asc">Preț crescător</SelectItem>
                <SelectItem value="price-desc">Preț descrescător</SelectItem>
                <SelectItem value="area-desc">Suprafață</SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden sm:flex border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-card rounded-2xl p-6 shadow-luxury-md border border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Type */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('properties.type')}
                    </label>
                    <Select value={selectedType} onValueChange={(v) => setSelectedType(v as PropertyType | '')}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('common.all')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">{t('common.all')}</SelectItem>
                        <SelectItem value="apartment">{t('properties.apartment')}</SelectItem>
                        <SelectItem value="house">{t('properties.house')}</SelectItem>
                        <SelectItem value="commercial">{t('properties.commercial')}</SelectItem>
                        <SelectItem value="land">{t('properties.land')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('properties.city')}
                    </label>
                    <Select value={selectedCity} onValueChange={(v) => { setSelectedCity(v); setSelectedSector(''); }}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('common.all')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">{t('common.all')}</SelectItem>
                        {cities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sector */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('properties.sector')}
                    </label>
                    <Select value={selectedSector} onValueChange={setSelectedSector} disabled={!selectedCity}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('common.all')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">{t('common.all')}</SelectItem>
                        {availableSectors.map(sector => (
                          <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Condition */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('properties.condition')}
                    </label>
                    <Select value={selectedCondition} onValueChange={(v) => setSelectedCondition(v as PropertyCondition | '')}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('common.all')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">{t('common.all')}</SelectItem>
                        <SelectItem value="euro">{t('properties.euroRenovation')}</SelectItem>
                        <SelectItem value="needs_repair">{t('properties.needsRenovation')}</SelectItem>
                        <SelectItem value="white_frame">{t('properties.whiteFrame')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('properties.priceRange')} (EUR)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder={t('common.from')}
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        placeholder={t('common.to')}
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Area Range */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('properties.area')} (m²)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder={t('common.from')}
                        value={areaMin}
                        onChange={(e) => setAreaMin(e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        type="number"
                        placeholder={t('common.to')}
                        value={areaMax}
                        onChange={(e) => setAreaMax(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  {/* Rooms */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('properties.rooms')}
                    </label>
                    <Select value={rooms} onValueChange={setRooms}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('common.all')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">{t('common.all')}</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Reset */}
                  <div className="flex items-end">
                    <Button variant="outline" onClick={resetFilters} className="w-full">
                      <X className="w-4 h-4 mr-2" />
                      {t('common.reset')}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
              {t('properties.noResults')}
            </h3>
            <p className="text-muted-foreground mb-6">
              Încercați să modificați filtrele pentru a găsi mai multe proprietăți.
            </p>
            <Button onClick={resetFilters} className="btn-navy">
              {t('common.reset')} {t('properties.filter').toLowerCase()}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
