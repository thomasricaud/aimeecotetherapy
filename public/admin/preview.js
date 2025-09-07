(function initPreview() {
  var CMSref = window.CMS || window.NetlifyCmsApp;
  if (!CMSref) { setTimeout(initPreview, 50); return; }

  var ReactRef = window.React;
  var h = window.h || (ReactRef && ReactRef.createElement);
  CMSref.registerPreviewStyle('./preview.css');

  // --- Hook utilitaire : expose une valeur "stable" après min-delay ---
  function useMinDelayDebouncedValue(value, delayMs) {
    // Fallback when React hooks are not available (older CMS preview runtime)
    if (!ReactRef || !ReactRef.useRef || !ReactRef.useState || !ReactRef.useEffect) {
      return value;
    }
    const useRef = ReactRef.useRef;
    const useState = ReactRef.useState;
    const useEffect = ReactRef.useEffect;

    const [stable, setStable] = useState(value);
    const lastRunRef = useRef(0);
    const timerRef = useRef(null);

    useEffect(() => {
      const now = Date.now();
      const sinceLast = now - lastRunRef.current;

      if (timerRef.current) clearTimeout(timerRef.current);

      const run = () => {
        lastRunRef.current = Date.now();
        setStable(value);
        timerRef.current = null;
      };

      if (sinceLast >= delayMs) run();
      else timerRef.current = setTimeout(run, delayMs - sinceLast);

      return () => { if (timerRef.current) { clearTimeout(timerRef.current); } };
    }, [value, delayMs]);

    return stable;
  }

  // Rendu Markdown optionnel (ici: simple texte; branche ton renderer si besoin)
  function BodyPreview({ raw }) {
    const debounced = useMinDelayDebouncedValue(raw, 15000);
    // ⚠️ Si tu as un renderer markdown, remplace la ligne suivante:
    return h('div', { className: 'body' }, debounced || '');
  }

  const BlogPreviewBase = (props) => {
    const { entry, getAsset, widgetFor } = props;
    const data = entry.get('data');
    const image = data.get('image');

    // Valeur "volatile" du body (change à chaque frappe)
    const rawBody = data.get('body') || '';

    let imageSrc = null;
    if (image && image !== 'hide') {
      const asset = getAsset(image);
      if (asset) {
        if (typeof asset === 'string') imageSrc = asset;
        else if (asset.url) imageSrc = asset.url;
        else if (typeof asset.toString === 'function') imageSrc = asset.toString();
      }
    }

    return h(
      'div',
      {},
      h('div', { className: 'category' }, data.get('category')),
      h('h1', { className: 'title' }, data.get('title')),
      h('p', { className: 'author' }, data.get('author')),
      h('div', { className: 'body' }, widgetFor && widgetFor('body')),
      imageSrc ? h('img', { className: 'image', src: imageSrc, alt: data.get('title') }) : null
    );
  };

  // Mémoïsation: comparer toutes les données pour permettre le live rendering
  const areEqual = (prevProps, nextProps) => {
    const prevData = prevProps.entry.get('data');
    const nextData = nextProps.entry.get('data');
    return prevData.equals(nextData);
  };

  const BlogPreview = (ReactRef && ReactRef.memo) ? ReactRef.memo(BlogPreviewBase, areEqual) : BlogPreviewBase;
  CMSref.registerPreviewTemplate('blog', BlogPreview);
})();
