(function(t){function e(e){for(var s,r,o=e[0],c=e[1],l=e[2],d=0,m=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(i,r)&&i[r]&&m.push(i[r][0]),i[r]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);u&&u(e);while(m.length)m.shift()();return n.push.apply(n,l||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],s=!0,o=1;o<a.length;o++){var c=a[o];0!==i[c]&&(s=!1)}s&&(n.splice(e--,1),t=r(r.s=a[0]))}return t}var s={},i={app:0},n=[];function r(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=s,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(a,s,function(e){return t[e]}.bind(null,s));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"017a":function(t,e,a){},"0f49":function(t,e,a){},"1df1":function(t,e,a){"use strict";a("017a")},2131:function(t,e,a){"use strict";a("bc54")},2336:function(t,e,a){},"3a68":function(t,e,a){"use strict";a("eb4e")},"3d11":function(t,e,a){"use strict";a("8eab")},"544b":function(t,e,a){"use strict";a("0f49")},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},n=[],r={name:"App"},o=r,c=a("2877"),l=Object(c["a"])(o,i,n,!1,null,null,null),u=l.exports,d=a("8c4f"),m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"home"}},[a("h1",[t._v("SpotiList")]),a("p",[t._v("SpotiListは、あなたのSpotifyのお気に入りの曲を分析し、類似した曲のプレイリストを作成するアプリです。")]),t.authorized?t._e():a("Login",{attrs:{redirectURI:t.redirectURI}})],1)},p=[],f=(a("ac1f"),a("5319"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"login"}},[a("div",{staticClass:"button_container"},[a("button",{staticClass:"operator",attrs:{id:"operator_auth"},on:{click:t.login}},[t._v(" さあ、はじめましょう ")])])])}),h=[],v={name:"Login",props:{redirectURI:String},methods:{login:function(){var t="https://accounts.spotify.com/authorize",e="token",a="74bf37f991444e03b6a910d9078615b6",s="user-library-read playlist-modify-private";location.href=t+"?response_type="+e+"&client_id="+a+"&redirect_uri="+this.redirectURI+"&scope="+s}}},g=v,y=(a("716b"),Object(c["a"])(g,f,h,!1,null,"39ddaff3",null)),b=y.exports,_={name:"Home",components:{Login:b},props:{routeParams:Object},data:function(){return{authorized:!1,redirectURI:"https://spotilist-b5e14.web.app/"}},created:function(){this.$route.hash&&(this.$router.push(this.$route.fullPath.replace("#","?")),this.authorized=!0,this.$router.push({name:"Visualize",params:{routeParams:this.$route.query}}))}},x=_,k=(a("ffa1"),Object(c["a"])(x,m,p,!1,null,"836d748e",null)),w=k.exports,C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"visualize"}},[a("header-comp",{attrs:{message:"曲同士の類似度に基づいてビジュアライズします。"}}),t.isExistingAudioFeatures||t.displayExplanation?t._e():a("get-tracks-information",{attrs:{routeParams:t.routeParams},on:{finished_clustering:t.onFinishedClustering}}),t.displayExplanation?a("params-explanation",{on:{close:t.closeExplanation}}):t._e(),t.displayExplanation?t._e():a("div",{staticClass:"button_container explanation"},[a("button",{staticClass:"operator explanation",on:{click:t.toggleParamsExplanation}},[t._v(" パラメータの説明 ")])]),t.displayExplanation||0===t.centroids.length||t.isVisualizing?t._e():a("div",{staticClass:"centroids_container"},t._l(t.centroids,(function(e,s){return a("centroid",{key:e.id,attrs:{centroid:e,color:t.colors[s],id:s},nativeOn:{click:function(e){return t.render(s)}}})})),1),t.isVisualizing&&!t.displayExplanation?a("songs",{attrs:{id:t.target,classifiedSongs:t.classifiedSongs,centroids:t.centroids,colors:t.colors},on:{back:t.toggleVisualize}}):t._e(),t.displayExplanation||!t.isExistingAudioFeatures||t.isVisualizing?t._e():a("div",{staticClass:"button_container playlist"},[a("button",{staticClass:"operator playlist",on:{click:t.pushToPlaylist}},[t._v(" プレイリストを作成 ")])])],1)},P=[],E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"get_tracks_information"},[a("div",{staticClass:"button_container visualize"},[a("button",{staticClass:"operator visualize",on:{click:t.visualize}},[t._v(" 曲の詳細、類似度を可視化 ")])])])},O=[],S=a("1da1"),j=(a("d3b7"),a("159b"),a("99af"),a("d81d"),a("cb29"),a("fb6a"),a("b0c0"),a("a9e3"),a("b64b"),a("b680"),a("96cf"),a("8041")),I=a.n(j),N=a("bc3a"),$=a.n(N),F={name:"GetTracksInformation",props:{routeParams:Object},data:function(){return{userId:"",axios:$.a,favoriteTracksLimit:50,featuresLimit:100,total:0,favorites:[],audioFeatures:[]}},computed:{data:function(){return{headers:{Authorization:this.routeParams.token_type+" "+this.routeParams.access_token},data:{}}}},methods:{visualize:function(){var t=this;return Object(S["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getUserId();case 2:return e.next=4,t.getTotalNumber();case 4:return e.next=6,t.getTracks();case 6:return e.next=8,t.getAudioFeatures();case 8:return e.next=10,t.kmeans();case 10:console.log("finished");case 11:case"end":return e.stop()}}),e)})))()},getUserId:function(){var t=this;return new Promise((function(e,a){var s="https://api.spotify.com/v1/me/";t.axios.get(s,t.data).then((function(a){t.userId=a.data.id,console.log("get userId"),e("get userId")})).catch((function(e){console.error(e+": get userId"),alert("エラーが発生しました"),t.$router.push("/"),a(e)}))}))},getTotalNumber:function(){var t=this;return new Promise((function(e,a){var s="https://api.spotify.com/v1/me/tracks?limit="+String(t.favoriteTracksLimit)+"&market=JP";t.axios.get(s,t.data).then((function(a){t.favorites=a.data.items,t.total=a.data.total,console.log("total: "+String(t.total)),e("get total number")})).catch((function(e){console.error(e+": get total number"),alert("エラーが発生しました"),t.$router.push("/"),a(e)}))}))},getTracks:function(){var t=this;return new Promise((function(e,a){var s=0;if(0!==t.total){for(var i=[],n=Math.floor(t.total/t.favoriteTracksLimit)+1,r=0;r<n;r++){s+=t.favoriteTracksLimit;var o="https://api.spotify.com/v1/me/tracks?offset="+String(s)+"&limit=50&market=JP";i.push(t.axios.get(o,t.data))}t.axios.all(i).then((function(a){a.forEach((function(e){t.favorites=t.favorites.concat(e.data.items)})),console.log("get tracks"),e("get tracks")})).catch((function(e){console.error(e+": get tracks"),alert("エラーが発生しました"),t.$router.push("/"),a(e)}))}}))},getAudioFeatures:function(){var t=this;return new Promise((function(e,a){for(var s=[],i=[],n=Math.floor(t.total/t.featuresLimit)+1,r=0;r<n;r++){t.featuresLimit,s=z(t.favorites,t.featuresLimit);var o="https://api.spotify.com/v1/audio-features?ids="+s[r].map((function(t){return t.track.id}));i.push(t.axios.get(o,t.data))}t.axios.all(i).then((function(a){a.forEach((function(e){t.audioFeatures=t.audioFeatures.concat(e.data.audio_features)})),console.log("get audio features"),e("get audio features"),t.kmeans()})).catch((function(e){console.error(e+": audio features"),alert("エラーが発生しました"),t.$router.push("/"),a(e)}))}))},kmeans:function(){var t=this;return new Promise((function(e,a){var s=[],i=[],n=[],r=[],o=[],c={id:0,acousticness:0,danceability:0,energy:0,instrumentalness:0,key:0,liveness:0,loudness:0,mode:0,speechiness:0,tempo:0,time_signature:0,valence:0,distance:0};for(var l in t.audioFeatures){var u={};A(u,t.favorites,t.audioFeatures,l),i.push(u),D(s,u)}for(var d=[],m=I()(s,10,(function(e,s){e&&(console.error(e),t.$router.push("/"),a(e));for(var r=0;r<s.length;r++){var o=[];d.push([]);for(var c=0;c<s[r].length;c++){d[r].push(s[r][c][s[r][c].length-1]);var l=s[r][c][0];delete i["distance"],o.push(i[l])}n.push(o)}})),p=0;p<m.centroids.length;p++){var f={};L(f,c,m.centroids[p]),r.push(f)}for(var h=0;h<m.k;h++){var v=h/m.k*360,g="hsl("+v+", 100%, 50%)";o.push(g)}t.$emit("finished_clustering",n,r,d,o,t.favorites,t.userId),e("finished clustering")}))}}},z=function(t,e){var a=Math.ceil(t.length/e);return new Array(a).fill().map((function(a,s){return t.slice(s*e,(s+1)*e)}))};function A(t,e,a,s){t.name=e[s].track.name,t.artist=e[s].track.artists[0].name,t.thumbnailUrl=e[s].track.album.images[0].url,t.id=Number(s),t.acousticness=a[s].acousticness,t.danceability=a[s].danceability,t.energy=a[s].energy,t.instrumentalness=a[s].instrumentalness,t.key=a[s].key,t.liveness=a[s].liveness,t.loudness=a[s].loudness,t.mode=a[s].mode,t.speechiness=a[s].speechiness,t.tempo=a[s].tempo,t.time_signature=a[s].time_signature,t.valence=a[s].valence,t.distance=0}function L(t,e,a){for(var s=0;s<Object.keys(e).length;s++)"loudness"!==Object.keys(e)[s]?t[Object.keys(e)[s]]=Number(a[s].toFixed(3)):t[Object.keys(e)[s]]=Number(a[s].toFixed(2));delete t.distance,delete t.id}function D(t,e){for(var a=[],s=3;s<Object.keys(e).length;s++)a.push(e[Object.keys(e)[s]]);t.push(a)}var M=F,T=(a("1df1"),Object(c["a"])(M,E,O,!1,null,"10bb29da",null)),V=T.exports,B=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"params_explanation"},[t._l(t.params,(function(e){return a("ul",{key:e.id},[a("li",{staticClass:"param"},[a("p",{staticClass:"param_name"},[t._v(t._s(e.name))]),a("p",{staticClass:"param_exp"},[t._v(t._s(e.exp))])])])})),a("div",{staticClass:"button_container close_exp"},[a("button",{staticClass:"operator close_exp",on:{click:t.close}},[t._v("閉じる")])])],2)},R=[],U={name:"ParamsExplanation",data:function(){return{params:[{name:"Acousticness",exp:"トラックがアコースティック(電気を使用しない楽器を用いた演奏)であるかどうかを表します。"},{name:"Danceability",exp:"テンポ、リズムの安定性、ビートの強さ、全体的な規則性などの音楽的要素の組み合わせによって、楽曲がダンスにどの程度適しているかを表します。"},{name:"Energy",exp:"エネルギーは0.0から1.0までの値で、強度と活動性の知覚的な指標を表します。一般的に、エネルギー感のある曲は、速く、うるさく、騒がしいと感じられます。"},{name:"Instrumentalness",exp:"ボーカルがないトラックかどうかを予測します。インストゥルメンタルネス値が1.0に近いほど、そのトラックにはボーカルコンテンツが含まれない可能性が高くなります。"},{name:"Liveness",exp:"録音に観客がいることを検出します。Livenessの値が高いほど、そのトラックがライブで演奏された可能性が高くなります。"},{name:"Loudness",exp:"トラックの全体的なラウドネスをデシベル(dB)で表示します。値は通常、-60～0dbの範囲です。"},{name:"Speechiness",exp:"トラック内の話し言葉の存在を検出します。音声のみの録音(トークショー、オーディオブック、詩など)であればあるほど、属性値は1.0に近くなります。"},{name:"Valence",exp:"楽曲が持つ音楽的なポジティブさを0.0から1.0までの数値で表します。"}]}},destroyed:function(){window.scroll({top:0})},methods:{close:function(){this.$emit("close")}}},H=U,J=(a("e624"),Object(c["a"])(H,B,R,!1,null,"62fccb08",null)),W=J.exports,q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"header"},[a("h1",[t._v("SpotiList")]),a("p",[t._v(t._s(t.message))])])},G=[],K={name:"HeaderComp",props:{message:String}},Q=K,X=(a("abba"),Object(c["a"])(Q,q,G,!1,null,"019520bc",null)),Y=X.exports,Z=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"centroid",attrs:{id:"centroid"+t.id}},[a("div",{staticClass:"audio_features",attrs:{id:"centroid"+t.id+"_features"}},[t.isAverage?t._e():a("div",{staticClass:"title"},[t._v(" Centroid No."+t._s(t.id+1)+" ")]),t.isAverage?a("div",{staticClass:"title"},[t._v(" Average ")]):t._e(),a("parameter",{attrs:{paramName:"Acousticness",value:t.centroid.acousticness,min:0,max:1}}),a("parameter",{attrs:{paramName:"Danceability",value:t.centroid.danceability,min:0,max:1}}),a("parameter",{attrs:{paramName:"Enegy",value:t.centroid.energy,min:0,max:1}}),a("parameter",{attrs:{paramName:"Instrumentalness",value:t.centroid.instrumentalness,min:0,max:1}}),a("parameter",{attrs:{paramName:"Liveness",value:t.centroid.liveness,min:0,max:1}}),a("parameter",{attrs:{paramName:"Loudness",value:t.centroid.loudness,min:-60,max:0}}),a("parameter",{attrs:{paramName:"Speechiness",value:t.centroid.speechiness,min:0,max:1}}),a("parameter",{attrs:{paramName:"Valence",value:t.centroid.valence,min:0,max:1}})],1)])},tt=[],et=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"parameter"},[a("p",{staticClass:"param_name"},[t._v(t._s(t.paramName))]),a("div",{staticClass:"bar_container"},[a("div",{staticClass:"bar part",style:t.barWidth,attrs:{id:"bar_"+t.paramName}}),a("div",{staticClass:"bar hole"})]),a("p",{staticClass:"value + paramName"},[t._v(t._s(t.value))])])},at=[],st={name:"Parameter",props:{paramName:String,value:Number,min:Number,max:Number},data:function(){return{bar:null}},mounted:function(){this.bar=document.getElementById("bar_"+this.paramName)},computed:{barWidth:function(){return{"--bar-width":Math.abs(this.value)/Math.max(Math.abs(this.min),Math.abs(this.max))*200+"px"}}}},it=st,nt=(a("cd2c"),Object(c["a"])(it,et,at,!1,null,"59529d63",null)),rt=nt.exports,ot={name:"Centroid",components:{Parameter:rt},props:{centroid:Object,id:Number,color:String},data:function(){return{isDisplayed:!0,isAverage:!1}},created:function(){9999===this.id&&(this.isAverage=!0)},mounted:function(){var t=document.getElementById("centroid"+this.id+"_features");t.style.transitionDuration="1.0s, 0.5s",t.style.transitionTimingFunction="ease-in-out",t.style.transitionDelay="0.0s, 0.5s",t.classList.add("displayed_audio_features");var e=document.getElementById("centroid"+this.id);e.style.borderColor=this.color}},ct=ot,lt=(a("544b"),Object(c["a"])(ct,Z,tt,!1,null,"8029d1a8",null)),ut=lt.exports,dt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"songs"},[a("centroid",{attrs:{centroid:t.centroids[t.id],color:t.colors[t.id],id:t.id}}),a("canvas",{attrs:{id:"canvas"}}),a("div",{attrs:{id:"songs_container"}},t._l(t.classifiedSongs[t.id].slice(0,15),(function(t){return a("song",{key:t.id,staticClass:"song",attrs:{song:t}})})),1),a("div",{staticClass:"button_container back"},[a("button",{staticClass:"operator back",on:{click:t.back}},[t._v("戻る")])])],1)},mt=[],pt=a("5a89"),ft=a("32ab"),ht=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"song",attrs:{id:this.song.name}},[a("img",{attrs:{id:this.song.name+"_thumbnail",src:this.song.thumbnailUrl,alt:"thumbnail"},on:{click:t.toggleDisplayParams}}),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isDisplayed,expression:"isDisplayed"}],staticClass:"audio_features",attrs:{id:this.song.name+"_features"}},[a("div",{staticClass:"title"},[a("p",{staticClass:"song_name"},[t._v(t._s(t.song.name))]),a("p",{staticClass:"artist"},[t._v(t._s(t.song.artist))])]),a("parameter",{attrs:{paramName:"Acousticness",value:t.song.acousticness,min:0,max:1}}),a("parameter",{attrs:{paramName:"Danceability",value:t.song.danceability,min:0,max:1}}),a("parameter",{attrs:{paramName:"Enegy",value:t.song.energy,min:0,max:1}}),a("parameter",{attrs:{paramName:"Instrumentalness",value:t.song.instrumentalness,min:0,max:1}}),a("parameter",{attrs:{paramName:"Liveness",value:t.song.liveness,min:0,max:1}}),a("parameter",{attrs:{paramName:"Loudness",value:t.song.loudness,min:-60,max:0}}),a("parameter",{attrs:{paramName:"Speechiness",value:t.song.speechiness,min:0,max:1}}),a("parameter",{attrs:{paramName:"Valence",value:t.song.valence,min:0,max:1}})],1)])},vt=[],gt={name:"Song",components:{Parameter:rt},props:{song:Object},data:function(){return{isDisplayed:!1}},mounted:function(){this.toggleDisplayParams()},methods:{toggleDisplayParams:function(){this.isDisplayed=!this.isDisplayed;var t=document.getElementById(this.song.name+"_features"),e=document.getElementById(this.song.name+"_thumbnail"),a=document.getElementById(this.song.name);!0===this.isDisplayed?(t.style.transitionDuration="1.0s, 0.5s",t.style.transitionTimingFunction="ease-in-out",t.style.transitionDelay="0.0s, 0.5s",t.classList.add("displayed_audio_features"),e.classList.add("displayed_img"),a.style.background="rgba(0, 0, 0, 0.5)"):(t.style.transitionDuration="1.0s, 0.5s",t.style.transitionTimingFunction="ease-out",t.style.transitionDelay="0.0s",t.classList.remove("displayed_audio_features"),e.classList.remove("displayed_img"),a.style.background="rgba(0, 0, 0, 0)")}}},yt=gt,bt=(a("3a68"),Object(c["a"])(yt,ht,vt,!1,null,"b297b904",null)),_t=bt.exports,xt={name:"Songs",components:{Centroid:ut,Song:_t},props:{id:Number,colors:Array,centroids:Array,classifiedSongs:Array},mounted:function(){var t,e,a,s,i,n;console.log(this.centroids[this.id]),document.body.style.overflow="hidden",this.target=this.id;var r=window.innerWidth,o=window.innerHeight,c=document.getElementById("songs_container"),l=document.getElementsByClassName("song");function u(){t=new pt["g"](75,r/o,1,5e3),t.position.set(0,0,1e3),t.lookAt(0,0,0),e=new pt["i"],a=new pt["i"],n=new pt["b"];for(var u=[],m=0;m<l.length;m++){var p=[],f=new ft["a"](l[m]);f.position.x=1100*Math.cos((m+1)/l.length*2*Math.PI)+100*Math.random()-50,f.position.y=600*Math.sin((m+1)/l.length*2*Math.PI)+200*Math.random()-100,f.position.z=100*Math.random()-50,p.push(new pt["j"](0,0,0)),p.push(new pt["j"](f.position.x,f.position.y,f.position.z)),n.add(f),u.push(p)}e.add(n),s=new ft["b"],s.setSize(r,o),s.domElement.firstChild.style.perspective="600px";for(var h=new pt["d"]({transparent:!0,color:16777215,opacity:.5}),v=0;v<u.length;v++){var g=(new pt["a"]).setFromPoints(u[v]),y=new pt["c"](g,h);a.add(y)}i=new pt["k"]({canvas:document.getElementById("canvas"),antialias:!0,alpha:1}),i.setSize(r,o),window.addEventListener("resize",d,!1);while(c.firstChild)c.removeChild(c.firstChild);c.appendChild(s.domElement)}function d(){t.aspect=window.innerWidth/window.innerHeight,t.updateProjectionMatrix(),s.setSize(window.innerWidth,window.innerHeight)}function m(){requestAnimationFrame(m),p()}function p(){s.render(e,t),i.render(a,t)}u(),m(),s.domElement.firstChild.style.transformStyle="flat"},destroyed:function(){document.body.style.overflow="auto"},methods:{back:function(){this.$emit("back")}}},kt=xt,wt=(a("3d11"),Object(c["a"])(kt,dt,mt,!1,null,"3f4175ef",null)),Ct=wt.exports,Pt={name:"Visualize",components:{GetTracksInformation:V,ParamsExplanation:W,HeaderComp:Y,Centroid:ut,Songs:Ct},props:{routeParams:Object},data:function(){return{userId:"",isExistingAudioFeatures:!1,isVisualizing:!1,displayExplanation:!1,target:0,favorites:[],classifiedSongs:[],colors:[],centroids:[],distanecs:[]}},created:function(){void 0===this.routeParams&&this.$router.push("/")},methods:{toggleParamsExplanation:function(){this.displayExplanation=!this.displayExplanation},render:function(t){window.scroll({top:0}),this.target=t,this.isVisualizing=!0},onFinishedClustering:function(){for(var t=arguments.length,e=new Array(t),a=0;a<t;a++)e[a]=arguments[a];var s=e[0],i=e[1],n=e[2],r=e[3],o=e[4],c=e[5];this.classifiedSongs=s,this.centroids=i,this.distances=n,this.colors=r,this.favorites=o,this.userId=c,this.isExistingAudioFeatures=!0},toggleVisualize:function(){this.isVisualizing=!this.isVisualizing},closeExplanation:function(){this.displayExplanation=!1},pushToPlaylist:function(){this.$router.push({name:"Playlist",params:{centroids:this.centroids,classifiedSongs:this.classifiedSongs,routeParams:this.routeParams,favorites:this.favorites,userId:this.userId}})}}},Et=Pt,Ot=(a("2131"),Object(c["a"])(Et,C,P,!1,null,"24f508dc",null)),St=Ot.exports,jt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"playlist"}},[a("header-comp",{attrs:{message:"分類されたお気に入りの曲からプレイリストを作成します。"}}),a("div",{staticClass:"container"},[a("p",[t._v("あなたのお気に入りの曲はこんな感じ")]),a("centroid",{attrs:{centroid:t.average,color:"#ffffff",id:9999}}),a("p",[t._v("類似度の高い曲からプレイリストを作成しました！")]),t._m(0)],1)],1)},It=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"button_container save"},[a("button",{staticClass:"operator save"},[t._v(" プレイリストを保存 ")])])}],Nt=(a("e9c4"),{name:"Playlist",components:{HeaderComp:Y,Centroid:ut},props:{routeParams:Object,classifiedSongs:Array,centroids:Array,favorites:Array,userId:String},data:function(){return{axios:$.a,playlistIds:[],classifiedFavorites:[],average:{acousticness:0,danceability:0,energy:0,instrumentalness:0,key:0,liveness:0,loudness:0,mode:0,speechiness:0,tempo:0,time_signature:0,valence:0}}},created:function(){void 0===this.routeParams&&this.$router.push("/");for(var t=0;t<this.centroids.length;t++)for(var e=this.centroids[t],a=0;a<Object.keys(e).length;a++){var s=Object.keys(e)[a];this.average[s]+=e[s]/this.centroids.length,this.average[s]=Number("loudness"!==s?e[s].toFixed(3):e[s].toFixed(2))}for(var i=0;i<this.classifiedSongs.length;i++){this.classifiedFavorites.push([]);for(var n=0;n<this.classifiedSongs[i].length;n++){this.classifiedFavorites[i].push([]);var r=this.classifiedSongs[i][n].id;this.classifiedFavorites[i][n].push(this.favorites[r])}}console.log(this.classifiedFavorites)},computed:{config:function(){return{headers:{Authorization:this.routeParams.token_type+" "+this.routeParams.access_token,"Content-Type":"application/json"}}}},methods:{doAxios:function(){var t=this;return Object(S["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.makePlaylists();case 2:return e.next=4,t.savePlaylists();case 4:case"end":return e.stop()}}),e)})))()},makePlaylists:function(){var t=this;return new Promise((function(e,a){for(var s=[],i=0;i<t.classifiedFavorites.length;i++){var n="https://api.spotify.com/v1/users/"+t.userId+"/playlists",r={name:"Playlist #"+(i+1),public:!1};s.push(t.axios.post(n,JSON.stringify(r),t.config))}t.axios.all(s).then((function(a){for(var s=0;s<a.length;s++){var i=a[s].data.id;t.playlistIds.push(i)}console.log("make playlists"),e("make playlists")})).catch((function(e){console.error(e+": make playlists"),alert("エラーが発生しました"),t.$router.push("/"),a(e)}))}))},savePlaylists:function(){var t=this;return new Promise((function(e,a){for(var s=[],i=0;i<t.classifiedFavorites.length;i++){for(var n="https://api.spotify.com/v1/playlists/"+t.playlistIds[i]+"/tracks",r={uris:[]},o=0;o<t.classifiedFavorites[i].length;o++)r.uris.push(t.classifiedFavorites[i][o][0].track.uri);s.push(t.axios.post(n,JSON.stringify(r),t.config))}t.axios.all(s).then((function(){console.log("save playlists"),alert("プレイリストを保存しました"),e("save playlists")})).catch((function(e){console.error(e+": save playlists"),alert("エラーが発生しました"),t.$router.push("/"),a(e)}))}))}}}),$t=Nt,Ft=(a("b48c"),Object(c["a"])($t,jt,It,!1,null,"4ea3e775",null)),zt=Ft.exports;s["a"].use(d["a"]);var At=[{path:"/",name:"Home",component:w,props:function(t){return{routeParams:t.query}}},{path:"/visualize",name:"Visualize",component:St,props:!0},{path:"/playlist",name:"Playlist",component:zt,props:!0}],Lt=new d["a"]({mode:"history",base:"/",routes:At}),Dt=Lt;a("d43b");s["a"].config.productionTip=!1,new s["a"]({router:Dt,render:function(t){return t(u)}}).$mount("#app")},"716b":function(t,e,a){"use strict";a("9b01")},"8b86":function(t,e,a){},"8eab":function(t,e,a){},"91cc":function(t,e,a){},"9b01":function(t,e,a){},a800:function(t,e,a){},abba:function(t,e,a){"use strict";a("91cc")},b48c:function(t,e,a){"use strict";a("8b86")},bc54:function(t,e,a){},c830:function(t,e,a){},cd2c:function(t,e,a){"use strict";a("a800")},d43b:function(t,e,a){},e624:function(t,e,a){"use strict";a("c830")},eb4e:function(t,e,a){},ffa1:function(t,e,a){"use strict";a("2336")}});
//# sourceMappingURL=app.856ea09c.js.map