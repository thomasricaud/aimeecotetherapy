CMS.registerPreviewStyle("/admin/preview.css");

const BlogPreview = createClass({
  render: function() {
    const entry = this.props.entry;
    const image = entry.getIn(['data', 'image']);
    const imageUrl = image ? this.props.getAsset(image) : null;
    return h('div', {},
      h('div', { className: 'category' }, entry.getIn(['data', 'category'])),
      h('h1', { className: 'title' }, entry.getIn(['data', 'title'])),
      h('p', { className: 'author' }, entry.getIn(['data', 'author'])),
      h('div', { className: 'body' }, this.props.widgetFor('body')),
      imageUrl ? h('img', { className: 'image', src: imageUrl.toString(), alt: entry.getIn(['data', 'title']) }) : null
    );
  }
});

CMS.registerPreviewTemplate('blog', BlogPreview);
