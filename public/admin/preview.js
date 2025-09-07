CMS.registerPreviewStyle('/admin/preview.css');

// Passive, memoized preview component (no side effects)
const BlogPreviewBase = (props) => {
  const { entry, widgetFor, getAsset } = props;
  const data = entry.get('data');
  const image = data.get('image');

  let imageSrc = null;
  if (image && image !== 'hide') {
    const asset = getAsset(image);
    if (asset) {
      if (typeof asset === 'string') imageSrc = asset;
      else if (asset.url) imageSrc = asset.url;
      else if (typeof asset.toString === 'function') imageSrc = asset.toString();
    }
  }

  return h('div', {},
    h('div', { className: 'category' }, data.get('category')),
    h('h1', { className: 'title' }, data.get('title')),
    h('p', { className: 'author' }, data.get('author')),
    h('div', { className: 'body' }, widgetFor('body')),
    imageSrc ? h('img', { className: 'image', src: imageSrc, alt: data.get('title') }) : null
  );
};

// Custom props equality: ignore body/description to avoid cursor jumps
const areEqual = (prevProps, nextProps) => {
  const prevData = prevProps.entry.get('data').delete('body').delete('description');
  const nextData = nextProps.entry.get('data').delete('body').delete('description');
  return prevData.equals(nextData);
};

const BlogPreview = React.memo(BlogPreviewBase, areEqual);

CMS.registerPreviewTemplate('blog', BlogPreview);
