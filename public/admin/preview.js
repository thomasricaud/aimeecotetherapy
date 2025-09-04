CMS.registerPreviewStyle("/admin/preview.css");

const BlogPreview = createClass({
  render: function() {
    const entry = this.props.entry;
    return h('div', {},
      h('div', { className: 'category' }, entry.getIn(['data', 'category'])),
      h('h1', { className: 'title' }, entry.getIn(['data', 'title'])),
      h('p', { className: 'author' }, entry.getIn(['data', 'author'])),
      h('div', { className: 'body' }, this.props.widgetFor('body'))
    );
  }
});

CMS.registerPreviewTemplate('blog', BlogPreview);
