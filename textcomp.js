/*! jquery-textcomplete - v1.8.4 - 2017-08-29 */
!function(a){if("function"==typeof define&&define.amd)define(["jquery"],a);else if("object"==typeof module&&module.exports){var b=require("jquery");module.exports=a(b)}else a(jQuery)}(function(a){if("undefined"==typeof a)throw new Error("jQuery.textcomplete requires jQuery");return+function(a){"use strict";var b=function(a){console.warn&&console.warn(a)},c=1;a.fn.textcomplete=function(d,e){var f=Array.prototype.slice.call(arguments);return this.each(function(){var g=this,h=a(this),i=h.data("textComplete");if(i||(e||(e={}),e._oid=c++,i=new a.fn.textcomplete.Completer(this,e),h.data("textComplete",i)),"string"==typeof d){if(!i)return;f.shift(),i[d].apply(i,f),"destroy"===d&&h.removeData("textComplete")}else a.each(d,function(c){a.each(["header","footer","placement","maxCount"],function(a){c[a]&&(i.option[a]=c[a],b(a+"as a strategy param is deprecated. Use option."),delete c[a])})}),i.register(a.fn.textcomplete.Strategy.parse(d,{el:g,$el:h}))})}}(a),+function(a){"use strict";function b(c,d){if(this.$el=a(c),this.id="textcomplete"+e++,this.strategies=[],this.views=[],this.option=a.extend({},b.defaults,d),!(this.$el.is("input[type=text]")||this.$el.is("input[type=search]")||this.$el.is("textarea")||c.isContentEditable||"true"==c.contentEditable))throw new Error("textcomplete must be called on a Textarea or a ContentEditable.");if(c===c.ownerDocument.activeElement)this.initialize();else{var g=this;this.$el.one("focus."+this.id,function(){g.initialize()}),this.option.adapter&&"CKEditor"!=this.option.adapter||"undefined"==typeof CKEDITOR||!this.$el.is("textarea")||CKEDITOR.on("instanceReady",function(b){-1==a.inArray(b.editor.id,f)&&(f.push(b.editor.id),b.editor.on("focus",function(c){g.$el=a(b.editor.editable().$),g.option.adapter||(g.option.adapter=a.fn.textcomplete.CKEditor),g.option.ckeditor_instance=b.editor,g.initialize()}))})}}var c=function(a){var b,c;return function(){var d=Array.prototype.slice.call(arguments);if(b)return void(c=d);b=!0;var e=this;d.unshift(function f(){if(c){var d=c;c=void 0,d.unshift(f),a.apply(e,d)}else b=!1}),a.apply(this,d)}},d=function(a){return"[object String]"===Object.prototype.toString.call(a)},e=0,f=[];b.defaults={appendTo:"body",className:"",dropdownClassName:"dropdown-menu textcomplete-dropdown",maxCount:10,zIndex:"100",rightEdgeOffset:30},a.extend(b.prototype,{id:null,option:null,strategies:null,adapter:null,dropdown:null,$el:null,$iframe:null,initialize:function(){var b=this.$el.get(0);if(this.$el.prop("ownerDocument")!==document&&window.frames.length)for(var c=0;c<window.frames.length;c++)if(this.$el.prop("ownerDocument")===window.frames[c].document){this.$iframe=a(window.frames[c].frameElement);break}this.dropdown=new a.fn.textcomplete.Dropdown(b,this,this.option);var d,e;this.option.adapter?d=this.option.adapter:(e=this.$el.is("textarea")||this.$el.is("input[type=text]")||this.$el.is("input[type=search]")?"number"==typeof b.selectionEnd?"Textarea":"IETextarea":"ContentEditable",d=a.fn.textcomplete[e]),this.adapter=new d(b,this,this.option)},destroy:function(){this.$el.off("."+this.id),this.adapter&&this.adapter.destroy(),this.dropdown&&this.dropdown.destroy(),this.$el=this.adapter=this.dropdown=null},deactivate:function(){this.dropdown&&this.dropdown.deactivate()},trigger:function(a,b){this.dropdown||this.initialize(),null!=a||(a=this.adapter.getTextFromHeadToCaret());var c=this._extractSearchQuery(a);if(c.length){var d=c[1];if(b&&this._term===d&&""!==d)return;this._term=d,this._search.apply(this,c)}else this._term=null,this.dropdown.deactivate()},fire:function(a){var b=Array.prototype.slice.call(arguments,1);return this.$el.trigger(a,b),this},register:function(a){Array.prototype.push.apply(this.strategies,a)},select:function(a,b,c){this._term=null,this.adapter.select(a,b,c),this.fire("change").fire("textComplete:select",a,b),this.adapter.focus()},_clearAtNext:!0,_term:null,_extractSearchQuery:function(b){for(var c=0;c<this.strategies.length;c++){var e=this.strategies[c],f=e.context(b);if(f||""===f){var g=a.isFunction(e.match)?e.match(b):e.match;d(f)&&(b=f);var h=b.match(g);if(h)return[e,h[e.index],h]}}return[]},_search:c(function(a,b,c,d){var e=this;b.search(c,function(d,f){e.dropdown.shown||e.dropdown.activate(),e._clearAtNext&&(e.dropdown.clear(),e._clearAtNext=!1),e.dropdown.setPosition(e.adapter.getCaretPosition()),e.dropdown.render(e._zip(d,b,c)),f||(a(),e._clearAtNext=!0)},d)}),_zip:function(b,c,d){return a.map(b,function(a){return{value:a,strategy:c,term:d}})}}),a.fn.textcomplete.Completer=b}(a),+function(a){"use strict";function b(c,d,f){this.$el=b.createElement(f),this.completer=d,this.id=d.id+"dropdown",this._data=[],this.$inputEl=a(c),this.option=f,f.listPosition&&(this.setPosition=f.listPosition),f.height&&this.$el.height(f.height);var g=this;a.each(["maxCount","placement","footer","header","noResultsMessage","className"],function(a,b){null!=f[b]&&(g[b]=f[b])}),this._bindEvents(c),e[this.id]=this}var c=a(window),d=function(a,b){var c,d,e=b.strategy.idProperty;for(c=0;c<a.length;c++)if(d=a[c],d.strategy===b.strategy)if(e){if(d.value[e]===b.value[e])return!0}else if(d.value===b.value)return!0;return!1},e={};a(document).on("click",function(b){var c=b.originalEvent&&b.originalEvent.keepTextCompleteDropdown;a.each(e,function(a,b){a!==c&&b.deactivate()})});var f={SKIP_DEFAULT:0,KEY_UP:1,KEY_DOWN:2,KEY_ENTER:3,KEY_PAGEUP:4,KEY_PAGEDOWN:5,KEY_ESCAPE:6};a.extend(b,{createElement:function(b){var c=b.appendTo;c instanceof a||(c=a(c));var d=a("<ul></ul>").addClass(b.dropdownClassName).attr("id","textcomplete-dropdown-"+b._oid).css({display:"none",left:0,position:"absolute",zIndex:b.zIndex}).appendTo(c);return d}}),a.extend(b.prototype,{$el:null,$inputEl:null,completer:null,footer:null,header:null,id:null,maxCount:null,placement:"",shown:!1,data:[],className:"",destroy:function(){this.deactivate(),this.$el.off("."+this.id),this.$inputEl.off("."+this.id),this.clear(),this.$el.remove(),this.$el=this.$inputEl=this.completer=null,delete e[this.id]},render:function(b){var c=this._buildContents(b),d=a.map(b,function(a){return a.value});if(b.length){var e=b[0].strategy;e.id?this.$el.attr("data-strategy",e.id):this.$el.removeAttr("data-strategy"),this._renderHeader(d),this._renderFooter(d),c&&(this._renderContents(c),this._fitToBottom(),this._fitToRight(),this._activateIndexedItem()),this._setScroll()}else this.noResultsMessage?this._renderNoResultsMessage(d):this.shown&&this.deactivate()},setPosition:function(b){var d="absolute";return this.$inputEl.add(this.$inputEl.parents()).each(function(){return"absolute"===a(this).css("position")?!1:"fixed"===a(this).css("position")?(b.top-=c.scrollTop(),b.left-=c.scrollLeft(),d="fixed",!1):void 0}),this.$el.css(this._applyPlacement(b)),this.$el.css({position:d}),this},clear:function(){this.$el.html(""),this.data=[],this._index=0,this._$header=this._$footer=this._$noResultsMessage=null},activate:function(){return this.shown||(this.clear(),this.$el.show(),this.className&&this.$el.addClass(this.className),this.completer.fire("textComplete:show"),this.shown=!0),this},deactivate:function(){return this.shown&&(this.$el.hide(),this.className&&this.$el.removeClass(this.className),this.completer.fire("textComplete:hide"),this.shown=!1),this},isUp:function(a){return 38===a.keyCode||a.ctrlKey&&80===a.keyCode},isDown:function(a){return 40===a.keyCode||a.ctrlKey&&78===a.keyCode},isEnter:function(a){var b=a.ctrlKey||a.altKey||a.metaKey||a.shiftKey;return!b&&(13===a.keyCode||9===a.keyCode||this.option.completeOnSpace===!0&&32===a.keyCode)},isPageup:function(a){return 33===a.keyCode},isPagedown:function(a){return 34===a.keyCode},isEscape:function(a){return 27===a.keyCode},_data:null,_index:null,_$header:null,_$noResultsMessage:null,_$footer:null,_bindEvents:function(){this.$el.on("mousedown."+this.id,".textcomplete-item",a.proxy(this._onClick,this)),this.$el.on("touchstart."+this.id,".textcomplete-item",a.proxy(this._onClick,this)),this.$el.on("mouseover."+this.id,".textcomplete-item",a.proxy(this._onMouseover,this)),this.$inputEl.on("keydown."+this.id,a.proxy(this._onKeydown,this))},_onClick:function(b){var c=a(b.target);b.preventDefault(),b.originalEvent.keepTextCompleteDropdown=this.id,c.hasClass("textcomplete-item")||(c=c.closest(".textcomplete-item"));var d=this.data[parseInt(c.data("index"),10)];this.completer.select(d.value,d.strategy,b);var e=this;setTimeout(function(){e.deactivate(),"touchstart"===b.type&&e.$inputEl.focus()},0)},_onMouseover:function(b){var c=a(b.target);b.preventDefault(),c.hasClass("textcomplete-item")||(c=c.closest(".textcomplete-item")),this._index=parseInt(c.data("index"),10),this._activateIndexedItem()},_onKeydown:function(b){if(this.shown){var c;switch(a.isFunction(this.option.onKeydown)&&(c=this.option.onKeydown(b,f)),null==c&&(c=this._defaultKeydown(b)),c){case f.KEY_UP:b.preventDefault(),this._up();break;case f.KEY_DOWN:b.preventDefault(),this._down();break;case f.KEY_ENTER:b.preventDefault(),this._enter(b);break;case f.KEY_PAGEUP:b.preventDefault(),this._pageup();break;case f.KEY_PAGEDOWN:b.preventDefault(),this._pagedown();break;case f.KEY_ESCAPE:b.preventDefault(),this.deactivate()}}},_defaultKeydown:function(a){return this.isUp(a)?f.KEY_UP:this.isDown(a)?f.KEY_DOWN:this.isEnter(a)?f.KEY_ENTER:this.isPageup(a)?f.KEY_PAGEUP:this.isPagedown(a)?f.KEY_PAGEDOWN:this.isEscape(a)?f.KEY_ESCAPE:void 0},_up:function(){0===this._index?this._index=this.data.length-1:this._index-=1,this._activateIndexedItem(),this._setScroll()},_down:function(){this._index===this.data.length-1?this._index=0:this._index+=1,this._activateIndexedItem(),this._setScroll()},_enter:function(a){var b=this.data[parseInt(this._getActiveElement().data("index"),10)];this.completer.select(b.value,b.strategy,a),this.deactivate()},_pageup:function(){var b=0,c=this._getActiveElement().position().top-this.$el.innerHeight();this.$el.children().each(function(d){return a(this).position().top+a(this).outerHeight()>c?(b=d,!1):void 0}),this._index=b,this._activateIndexedItem(),this._setScroll()},_pagedown:function(){var b=this.data.length-1,c=this._getActiveElement().position().top+this.$el.innerHeight();this.$el.children().each(function(d){return a(this).position().top>c?(b=d,!1):void 0}),this._index=b,this._activateIndexedItem(),this._setScroll()},_activateIndexedItem:function(){this.$el.find(".textcomplete-item.active").removeClass("active"),this._getActiveElement().addClass("active")},_getActiveElement:function(){return this.$el.children(".textcomplete-item:nth("+this._index+")")},_setScroll:function(){var a=this._getActiveElement(),b=a.position().top,c=a.outerHeight(),d=this.$el.innerHeight(),e=this.$el.scrollTop();0===this._index||this._index==this.data.length-1||0>b?this.$el.scrollTop(b+e):b+c>d&&this.$el.scrollTop(b+c+e-d)},_buildContents:function(a){var b,c,e,f="";for(c=0;c<a.length&&this.data.length!==this.maxCount;c++)b=a[c],d(this.data,b)||(e=this.data.length,this.data.push(b),f+='<li class="textcomplete-item" data-index="'+e+'"><a>',f+=b.strategy.template(b.value,b.term),f+="</a></li>");return f},_renderHeader:function(b){if(this.header){this._$header||(this._$header=a('<li class="textcomplete-header"></li>').prependTo(this.$el));var c=a.isFunction(this.header)?this.header(b):this.header;this._$header.html(c)}},_renderFooter:function(b){if(this.footer){this._$footer||(this._$footer=a('<li class="textcomplete-footer"></li>').appendTo(this.$el));var c=a.isFunction(this.footer)?this.footer(b):this.footer;this._$footer.html(c)}},_renderNoResultsMessage:function(b){if(this.noResultsMessage){this._$noResultsMessage||(this._$noResultsMessage=a('<li class="textcomplete-no-results-message"></li>').appendTo(this.$el));var c=a.isFunction(this.noResultsMessage)?this.noResultsMessage(b):this.noResultsMessage;this._$noResultsMessage.html(c)}},_renderContents:function(a){this._$footer?this._$footer.before(a):this.$el.append(a)},_fitToBottom:function(){var a=c.scrollTop()+c.height(),b=this.$el.height();this.$el.position().top+b>a&&(this.completer.$iframe||this.$el.offset({top:a-b}))},_fitToRight:function(){for(var a,b=this.option.rightEdgeOffset,d=this.$el.offset().left,e=this.$el.width(),f=c.width()-b;d+e>f&&(this.$el.offset({left:d-b}),a=this.$el.offset().left,!(a>=d));)d=a},_applyPlacement:function(a){return-1!==this.placement.indexOf("top")?a={top:"auto",bottom:this.$el.parent().height()-a.top+a.lineHeight,left:a.left}:(a.bottom="auto",delete a.lineHeight),-1!==this.placement.indexOf("absleft")?a.left=0:-1!==this.placement.indexOf("absright")&&(a.right=0,a.left="auto"),a}}),a.fn.textcomplete.Dropdown=b,a.extend(a.fn.textcomplete,f)}(a),+function(a){"use strict";function b(b){a.extend(this,b),this.cache&&(this.search=c(this.search))}var c=function(a){var b={};return function(c,d){b[c]?d(b[c]):a.call(this,c,function(a){b[c]=(b[c]||[]).concat(a),d.apply(null,arguments)})}};b.parse=function(c,d){return a.map(c,function(a){var c=new b(a);return c.el=d.el,c.$el=d.$el,c})},a.extend(b.prototype,{match:null,replace:null,search:null,id:null,cache:!1,context:function(){return!0},index:2,template:function(a){return a},idProperty:null}),a.fn.textcomplete.Strategy=b}(a),+function(a){"use strict";function b(){}var c=Date.now||function(){return(new Date).getTime()},d=function(a,b){var d,e,f,g,h,i=function(){var j=c()-g;b>j?d=setTimeout(i,b-j):(d=null,h=a.apply(f,e),f=e=null)};return function(){return f=this,e=arguments,g=c(),d||(d=setTimeout(i,b)),h}};a.extend(b.prototype,{id:null,completer:null,el:null,$el:null,option:null,initialize:function(b,c,e){this.el=b,this.$el=a(b),this.id=c.id+this.constructor.name,this.completer=c,this.option=e,this.option.debounce&&(this._onKeyup=d(this._onKeyup,this.option.debounce)),this._bindEvents()},destroy:function(){this.$el.off("."+this.id),this.$el=this.el=this.completer=null},select:function(){throw new Error("Not implemented")},getCaretPosition:function(){var b=this._getCaretRelativePosition(),c=this.$el.offset(),d=this.option.appendTo;if(d){d instanceof a||(d=a(d));var e=d.offsetParent().offset();c.top-=e.top,c.left-=e.left}return b.top+=c.top,b.left+=c.left,b},focus:function(){this.$el.focus()},_bindEvents:function(){this.$el.on("keyup."+this.id,a.proxy(this._onKeyup,this))},_onKeyup:function(a){this._skipSearch(a)||this.completer.trigger(this.getTextFromHeadToCaret(),!0)},_skipSearch:function(a){switch(a.keyCode){case 9:case 13:case 16:case 17:case 18:case 33:case 34:case 40:case 38:case 27:return!0}if(a.ctrlKey)switch(a.keyCode){case 78:case 80:return!0}}}),a.fn.textcomplete.Adapter=b}(a),+function(a){"use strict";function b(a,b,c){this.initialize(a,b,c)}a.extend(b.prototype,a.fn.textcomplete.Adapter.prototype,{select:function(b,c,d){var e,f=this.getTextFromHeadToCaret(),g=this.el.value.substring(this.el.selectionEnd),h=c.replace(b,d);"undefined"!=typeof h&&(a.isArray(h)&&(g=h[1]+g,h=h[0]),e=a.isFunction(c.match)?c.match(f):c.match,f=f.replace(e,h),this.$el.val(f+g),this.el.selectionStart=this.el.selectionEnd=f.length)},getTextFromHeadToCaret:function(){return this.el.value.substring(0,this.el.selectionEnd)},_getCaretRelativePosition:function(){var b=a.fn.textcomplete.getCaretCoordinates(this.el,this.el.selectionStart);return{top:b.top+this._calculateLineHeight()-this.$el.scrollTop(),left:b.left-this.$el.scrollLeft(),lineHeight:this._calculateLineHeight()}},_calculateLineHeight:function(){var a=parseInt(this.$el.css("line-height"),10);if(isNaN(a)){var b=this.el.parentNode,c=document.createElement(this.el.nodeName),d=this.el.style;c.setAttribute("style","margin:0px;padding:0px;font-family:"+d.fontFamily+";font-size:"+d.fontSize),c.innerHTML="test",b.appendChild(c),a=c.clientHeight,b.removeChild(c)}return a}}),a.fn.textcomplete.Textarea=b}(a),+function(a){"use strict";function b(b,d,e){this.initialize(b,d,e),a("<span>"+c+"</span>").css({position:"absolute",top:-9999,left:-9999}).insertBefore(b)}var c="吶";a.extend(b.prototype,a.fn.textcomplete.Textarea.prototype,{select:function(b,c,d){var e,f=this.getTextFromHeadToCaret(),g=this.el.value.substring(f.length),h=c.replace(b,d);if("undefined"!=typeof h){a.isArray(h)&&(g=h[1]+g,h=h[0]),e=a.isFunction(c.match)?c.match(f):c.match,f=f.replace(e,h),this.$el.val(f+g),this.el.focus();var i=this.el.createTextRange();i.collapse(!0),i.moveEnd("character",f.length),i.moveStart("character",f.length),i.select()}},getTextFromHeadToCaret:function(){this.el.focus();var a=document.selection.createRange();a.moveStart("character",-this.el.value.length);var b=a.text.split(c);return 1===b.length?b[0]:b[1]}}),a.fn.textcomplete.IETextarea=b}(a),+function(a){"use strict";function b(a,b,c){this.initialize(a,b,c)}a.extend(b.prototype,a.fn.textcomplete.Adapter.prototype,{select:function(b,c,d){var e=this.getTextFromHeadToCaret(),f=this.el.ownerDocument.getSelection(),g=f.getRangeAt(0),h=g.cloneRange();h.selectNodeContents(g.startContainer);var i,j=h.toString(),k=j.substring(g.startOffset),l=c.replace(b,d);if("undefined"!=typeof l){a.isArray(l)&&(k=l[1]+k,l=l[0]),i=a.isFunction(c.match)?c.match(e):c.match,e=e.replace(i,l).replace(/ $/,"&nbsp"),g.selectNodeContents(g.startContainer),g.deleteContents();var m=this.el.ownerDocument.createElement("div");m.innerHTML=e;var n=this.el.ownerDocument.createElement("div");n.innerHTML=k;for(var o,p,q=this.el.ownerDocument.createDocumentFragment();o=m.firstChild;)p=q.appendChild(o);for(;o=n.firstChild;)q.appendChild(o);g.insertNode(q),g.setStartAfter(p),g.collapse(!0),f.removeAllRanges(),f.addRange(g)}},_getCaretRelativePosition:function(){var b=this.el.ownerDocument.getSelection().getRangeAt(0).cloneRange(),c=b.endContainer.parentNode,d=this.el.ownerDocument.createElement("span");b.insertNode(d),b.selectNodeContents(d),b.deleteContents(),setTimeout(function(){c.normalize()},0);var e=a(d),f=e.offset();if(f.left-=this.$el.offset().left,f.top+=e.height()-this.$el.offset().top,f.lineHeight=e.height(),this.completer.$iframe){var g=this.completer.$iframe.offset();f.top+=g.top,f.left+=g.left,f.top-=a(this.completer.$iframe[0].contentWindow.document).scrollTop()}return e.remove(),f},getTextFromHeadToCaret:function(){var a=this.el.ownerDocument.getSelection().getRangeAt(0),b=a.cloneRange();return b.selectNodeContents(a.startContainer),b.toString().substring(0,a.startOffset)}}),a.fn.textcomplete.ContentEditable=b}(a),+function(a){"use strict";function b(a,b,c){this.initialize(a,b,c)}a.extend(b.prototype,a.fn.textcomplete.ContentEditable.prototype,{_bindEvents:function(){var b=this;this.option.ckeditor_instance.on("key",function(a){var c=a.data;return b._onKeyup(c),b.completer.dropdown.shown&&b._skipSearch(c)?!1:void 0},null,null,1),this.$el.on("keyup."+this.id,a.proxy(this._onKeyup,this))}}),a.fn.textcomplete.CKEditor=b}(a),function(a){function b(a,b,f){if(!d)throw new Error("textarea-caret-position#getCaretCoordinates should only be called in a browser");var g=f&&f.debug||!1;if(g){var h=document.querySelector("#input-textarea-caret-position-mirror-div");h&&h.parentNode.removeChild(h)}var i=document.createElement("div");i.id="input-textarea-caret-position-mirror-div",document.body.appendChild(i);var j=i.style,k=window.getComputedStyle?getComputedStyle(a):a.currentStyle;j.whiteSpace="pre-wrap","INPUT"!==a.nodeName&&(j.wordWrap="break-word"),j.position="absolute",g||(j.visibility="hidden"),c.forEach(function(a){j[a]=k[a]}),e?a.scrollHeight>parseInt(k.height)&&(j.overflowY="scroll"):j.overflow="hidden",i.textContent=a.value.substring(0,b),"INPUT"===a.nodeName&&(i.textContent=i.textContent.replace(/\s/g," "));var l=document.createElement("span");l.textContent=a.value.substring(b)||".",i.appendChild(l);var m={top:l.offsetTop+parseInt(k.borderTopWidth),left:l.offsetLeft+parseInt(k.borderLeftWidth)};return g?l.style.backgroundColor="#aaa":document.body.removeChild(i),m}var c=["direction","boxSizing","width","height","overflowX","overflowY","borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","borderStyle","paddingTop","paddingRight","paddingBottom","paddingLeft","fontStyle","fontVariant","fontWeight","fontStretch","fontSize","fontSizeAdjust","lineHeight","fontFamily","textAlign","textTransform","textIndent","textDecoration","letterSpacing","wordSpacing","tabSize","MozTabSize"],d="undefined"!=typeof window,e=d&&null!=window.mozInnerScreenX;a.fn.textcomplete.getCaretCoordinates=b}(a),a});
//# sourceMappingURL=dist/jquery.textcomplete.min.map