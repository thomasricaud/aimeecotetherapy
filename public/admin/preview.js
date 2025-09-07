CMS.registerPreviewStyle('/admin/preview.css');

const BlogPreview = createClass({
  shouldComponentUpdate (nextProps) {
    const current = this.props.entry.get('data').delete('body');
    const next = nextProps.entry.get('data').delete('body');
    return !current.equals(next);
  },
  render () {
    const { entry, widgetFor, getAsset } = this.props;
    const data = entry.get('data');
    const image = data.get('image');
    const imageUrl = image && image !== 'hide' ? getAsset(image) : null;
    return h('div', {},
      h('div', { className: 'category' }, data.get('category')),
      h('h1', { className: 'title' }, data.get('title')),
      h('p', { className: 'author' }, data.get('author')),
      h('p', { className: 'description' }, data.get('description')),
      h('div', { className: 'body' }, widgetFor('body')),
      imageUrl ? h('img', { className: 'image', src: imageUrl.toString(), alt: data.get('title') }) : null
    );
  }
});

CMS.registerPreviewTemplate('blog', BlogPreview);
