"use strict";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */function e(e,t,a,n){return new(a||(a=Promise))((function(i,o){function r(e){try{s(n.next(e))}catch(e){o(e)}}function l(e){try{s(n.throw(e))}catch(e){o(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof a?t:new a((function(e){e(t)}))).then(r,l)}s((n=n.apply(e,t||[])).next())}))}let t=210,a=0,n=0;function i(e){let t=[];return e&&e.forEach((e=>{e.parent===figma.currentPage&&("COMPONENT"!==e.type&&"COMPONENT_SET"!==e.type&&"FRAME"!==e.type&&"INSTANCE"!==e.type&&"GROUP"!==e.type||t.push(e))})),t}function o(e){let t=e.id,a=figma.currentPage.findOne((e=>"GROUP"===e.type&&"status_annotations"===e.name));e.setSharedPluginData("statusannotations","status",""),a&&a.children.forEach((e=>{let a=e.getPluginData("frameId");t===a&&(e.remove(),n++)}))}function r(){let e=figma.currentPage.findOne((e=>"GROUP"===e.type&&"status_annotations"===e.name));e&&(e.children.forEach((e=>{let t=e.getPluginData("frameId"),n=figma.getNodeById(t);if(n){let t=n.y-e.height-8,i=n.x+n.width-e.width;e.x!=i&&e.y!=t&&a++,e.x=i,e.y=t}else e.remove(),a++})),1===a?figma.notify("1 annotation updated"):a>1&&figma.notify(a+" annotations updated"),e.parent.insertChild(e.parent.children.length,e)),a=0}function l(e){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16)/255,g:parseInt(t[2],16)/255,b:parseInt(t[3],16)/255}:null}r(),"refresh"===figma.command?(r(),figma.closePlugin()):figma.showUI(__html__,{width:184,height:t}),figma.ui.onmessage=a=>{switch(a.type){case"height":t=a.height,figma.ui.resize(184,t);break;case"addStatus":!function(t){e(this,void 0,void 0,(function*(){let e=i(figma.currentPage.selection);if(0!==e.length){let a=0,n=figma.createFrame();n.counterAxisSizingMode="AUTO",n.layoutMode="HORIZONTAL",n.itemSpacing=4,n.horizontalPadding=6,n.verticalPadding=4,n.name="annotation",n.topLeftRadius=3,n.topRightRadius=3,n.strokes=[{type:"SOLID",visible:!0,opacity:1,blendMode:"NORMAL",color:l("#DBDBDB")}],n.strokeWeight=1;let i=figma.createText();i.name=t.title;let r={family:"Inter",style:"Regular"};yield figma.loadFontAsync(r),i.fontName=r,i.fontSize=12,i.lineHeight={value:14,unit:"PIXELS"},i.characters=t.title;let s=figma.createNodeFromSvg(t.icon);s.name="icon-"+t.slug,s.layoutAlign="CENTER",n.insertChild(0,s),n.insertChild(1,i);let f=[];f.push(n);let c=figma.group(f,figma.currentPage);c.name=t.title;let g=l(t.color);g=Object.assign({a:1},g),c.effects=[{blendMode:"NORMAL",color:g,offset:{x:0,y:-2},radius:0,spread:0,type:"INNER_SHADOW",visible:!0}],e.forEach((e=>{let n;o(e),n=0===a?c:c.clone();let i=e.id,r=e.y-n.height-8,l=e.x+e.width-n.width;n.x=l,n.y=r,n.setPluginData("frameId",i);let s=figma.currentPage.findOne((e=>"GROUP"===e.type&&"status_annotations"===e.name));if(s)s.appendChild(n),s.parent.insertChild(0,s);else{let e=[];e.push(n);let t=figma.group(e,figma.currentPage);t.name="status_annotations",t.locked=!0,t.expanded=!1,t.parent.insertChild(t.parent.children.length,t),console.log("hello")}"INSTANCE"!=e.type&&e.setRelaunchData({status:t.title}),e.setSharedPluginData("statusannotations","status",t.title),figma.currentPage.setRelaunchData({refresh:""}),a++}))}else figma.notify("Please select a top level frame, component, or group")}))}(a.status);break;case"delete":!function(){let e=i(figma.currentPage.selection);0!==e.length?(e.forEach((e=>{o(e),"INSTANCE"!=e.type&&e.setRelaunchData({})})),1===n?figma.notify("1 annotation removed"):n>1&&figma.notify(n+" annotations removed")):figma.notify("Please select a frame, component, or group with a status");n=0}();break;case"deleteAll":!function(){let e=figma.currentPage.findOne((e=>"GROUP"===e.type&&"status_annotations"===e.name));e&&e.remove();i(figma.currentPage.children).forEach((e=>{"INSTANCE"!=e.type&&e.setRelaunchData({})})),figma.currentPage.setRelaunchData({}),figma.notify("All annotations removed")}();break;case"refresh":r()}};
