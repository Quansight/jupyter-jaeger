(self.webpackChunkjupyter_jaeger=self.webpackChunkjupyter_jaeger||[]).push([[177],{177:(t,a,r)=>{"use strict";r.r(a),r.d(a,{Client:()=>e});class e{constructor(t){this.url=t}async callServer(t,a){const r=await fetch(String(new URL(t,this.url)),{body:JSON.stringify(a),method:"POST",mode:"cors",headers:{"Content-Type":"application/json"}});return await r.json()}async startSpanExtract(t){return this.callServer("start-span-extract",t)}async startSpan(t){return this.callServer("start-span",t)}async injectSpan(t){return this.callServer("inject-span",t)}async finishSpan(t){await this.callServer("finish-span",t)}}}}]);