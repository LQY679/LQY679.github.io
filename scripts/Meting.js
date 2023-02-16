const css = hexo.extend.helper.get('css').bind(hexo);
const js = hexo.extend.helper.get('js').bind(hexo);

hexo.extend.injector.register('head_end', () => {
  return css('https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css');
}, 'default');

hexo.extend.injector.register('body_end', js('https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js')
, 'default');

hexo.extend.injector.register('body_end', js('https://cdn.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js')
, 'default');

hexo.extend.injector.register('body_end',()=>{
    str = '<meting-js '+
	'server="tencent" '+
	'type="playlist" '+
	'id="8388941837" '+
	'fixed="true"  '+
	'autoplay="false" '+
	'loop="all" '+
	'order="list" '+
	'list-folded="ture" '+
	'list-max-height="500px" '+
    '>'
    console.log(str);
    return str
}
, 'default');

