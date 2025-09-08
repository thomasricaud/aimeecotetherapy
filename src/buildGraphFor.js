export default function buildGraphFor (routeName = 'home', lang = 'en', t = k => k) {
  const base = 'https://aimeecotetherapy.com'
  const routes = {
    home: { navKey: 'nav.home', titleKey: 'meta.homeTitle', path: '' },
    blog: { navKey: 'nav.blog', titleKey: 'meta.blogTitle', path: '/blog' },
    book: { navKey: 'nav.book', titleKey: 'meta.bookTitle', path: '/book' },
    there: { navKey: 'nav.there', titleKey: 'meta.thereTitle', path: '/there' }
  }

  const info = routes[routeName] || routes.home
  const path = info.path
  const url = `${base}/${lang}${path}/`
  const breadcrumbs = [
    { '@type': 'ListItem', position: 1, name: t(routes.home.navKey), item: `${base}/${lang}/` }
  ]
  if (path) {
    breadcrumbs.push({ '@type': 'ListItem', position: 2, name: t(info.navKey), item: url })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: t(info.titleKey),
        isPartOf: {
          '@type': 'WebSite',
          name: 'Aimee Cote Therapy',
          url: base + '/'
        },
        about: {
          '@type': 'Organization',
          name: 'Aimee Cote Therapy'
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs
      }
    ]
  }
}
