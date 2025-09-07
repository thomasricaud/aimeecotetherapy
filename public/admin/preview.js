(function initPreview() {
  var LOG_PREFIX = '[Preview]';
  var dlog = function () { try { console.log.apply(console, [LOG_PREFIX].concat([].slice.call(arguments))) } catch (e) {} };
  dlog('script start');
  var CMSref = window.CMS || window.NetlifyCmsApp;
  if (!CMSref) { dlog('CMS not ready, retry...'); setTimeout(initPreview, 50); return; }

  var ReactRef = window.React;
  var h = window.h || (ReactRef && ReactRef.createElement);
  dlog('React available:', !!ReactRef, 'h factory:', !!h);
  CMSref.registerPreviewStyle('./preview.css');
  dlog('registered preview style');

  // --- Hook utilitaire : expose une valeur "stable" après min-delay ---
  function useMinDelayDebouncedValue(value, delayMs) {
    try { dlog('useMinDelayDebouncedValue input len:', (value || '').length, 'delayMs:', delayMs); } catch (e) {}
    const useRef = ReactRef.useRef;
    const useState = ReactRef.useState;
    const useEffect = ReactRef.useEffect;

    const [stable, setStable] = useState(value);
    const lastRunRef = useRef(0);
    const timerRef = useRef(null);

    useEffect(() => {
      const now = Date.now();
      const sinceLast = now - lastRunRef.current;
      try { dlog('debounce effect run, sinceLast(ms):', sinceLast); } catch (e) {}

      if (timerRef.current) clearTimeout(timerRef.current);

      const run = () => {
        lastRunRef.current = Date.now();
        setStable(value);
        timerRef.current = null;
        try { dlog('debounced update -> len:', (value || '').length); } catch (e) {}
      };

      if (sinceLast >= delayMs) run();
      else timerRef.current = setTimeout(run, delayMs - sinceLast);

      return () => { if (timerRef.current) { clearTimeout(timerRef.current); try { dlog('debounce cleanup'); } catch (e) {} } };
    }, [value, delayMs]);

    return stable;
  }

  // Rendu Markdown optionnel (ici: simple texte; branche ton renderer si besoin)
  function BodyPreview({ raw }) {
    const debounced = useMinDelayDebouncedValue(raw, 15000); try { dlog('BodyPreview render', { rawLen: (raw || '').length, debouncedLen: (debounced || '').length }); } catch (e) {}
    // ⚠️ Si tu as un renderer markdown, remplace la ligne suivante:
    return h('div', { className: 'body' }, debounced || '');
  }

  const BlogPreviewBase = (props) => {
    const { entry, getAsset } = props;
    const data = entry.get('data');
    const image = data.get('image');

    // Valeur "volatile" du body (change à chaque frappe)
    const rawBody = data.get('body') || ''; try { dlog('BlogPreviewBase render', { title: data.get('title'), bodyLen: (rawBody || '').length }); } catch (e) {}

    let imageSrc = null;
    if (image && image !== 'hide') {
      const asset = getAsset(image);
      if (asset) {
        if (typeof asset === 'string') imageSrc = asset;
        else if (asset.url) imageSrc = asset.url;
        else if (typeof asset.toString === 'function') imageSrc = asset.toString();
        try { dlog('image resolved', { srcLen: (imageSrc || '').length }); } catch (e) {}
      }
    }

    return h(
      'div',
      {},
      h('div', { className: 'category' }, data.get('category')),
      h('h1', { className: 'title' }, data.get('title')),
      h('p', { className: 'author' }, data.get('author')),
      // ⬇️ Aperçu du body avec min-wait 15s et no-op si pas de changement
      h(BodyPreview, { raw: rawBody }),
      imageSrc ? h('img', { className: 'image', src: imageSrc, alt: data.get('title') }) : null
    );
  };

  // Mémoïsation : on ignore body/description pour éviter les re-renders inutiles
  const areEqual = (prevProps, nextProps) => {
    try {
      var prevBodyLen = (prevProps.entry && prevProps.entry.getIn && (prevProps.entry.getIn(['data', 'body']) || '')).length || 0;
      var nextBodyLen = (nextProps.entry && nextProps.entry.getIn && (nextProps.entry.getIn(['data', 'body']) || '')).length || 0;
      dlog('compare props (ignoring body/description)', { prevBodyLen: prevBodyLen, nextBodyLen: nextBodyLen });
    } catch (e) {}
    const prevData = prevProps.entry.get('data').delete('body').delete('description');
    const nextData = nextProps.entry.get('data').delete('body').delete('description');
    const eq = prevData.equals(nextData);
    try { dlog('props equal?', eq); } catch (e) {}
    return eq;
  };

  const BlogPreview = (ReactRef && ReactRef.memo) ? ReactRef.memo(BlogPreviewBase, areEqual) : BlogPreviewBase;
  CMSref.registerPreviewTemplate('blog', BlogPreview);
  dlog('registered preview template for blog');
})();
