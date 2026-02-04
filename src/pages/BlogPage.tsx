import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { blogPosts } from '@/lib/data';

const BlogPage = () => {
  const { t, i18n } = useTranslation();

  const getTitle = (post: typeof blogPosts[0]) => i18n.language === 'ru' ? post.titleRu : post.title;
  const getExcerpt = (post: typeof blogPosts[0]) => i18n.language === 'ru' ? post.excerptRu : post.excerpt;
  const getCategory = (post: typeof blogPosts[0]) => i18n.language === 'ru' ? post.categoryRu : post.category;

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-64 bg-primary">
        <div className="container-custom h-full flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <nav className="text-primary-foreground/70 text-sm mb-4">
              <Link to="/" className="hover:text-accent">{t('nav.home')}</Link>
              <span className="mx-2">/</span>
              <span className="text-primary-foreground">{t('nav.blog')}</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground">{t('blog.title')}</h1>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card rounded-2xl overflow-hidden shadow-luxury-md hover:-translate-y-2 transition-transform">
                <Link to={`/blog/${post.id}`}>
                  <div className="h-48 overflow-hidden">
                    <img src={post.image} alt={getTitle(post)} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                </Link>
                <div className="p-6">
                  <span className="text-xs px-3 py-1 bg-accent text-accent-foreground rounded-full">{getCategory(post)}</span>
                  <Link to={`/blog/${post.id}`}>
                    <h2 className="font-serif text-xl font-semibold text-foreground mt-4 mb-3 hover:text-primary">{getTitle(post)}</h2>
                  </Link>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{getExcerpt(post)}</p>
                  <Link to={`/blog/${post.id}`} className="text-primary font-medium text-sm flex items-center hover:text-accent">
                    {t('blog.readMore')}<ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
