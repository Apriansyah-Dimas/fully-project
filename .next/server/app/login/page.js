(()=>{var e={};e.id=520,e.ids=[520],e.modules={27:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,6346,23)),Promise.resolve().then(t.t.bind(t,7924,23)),Promise.resolve().then(t.t.bind(t,5656,23)),Promise.resolve().then(t.t.bind(t,99,23)),Promise.resolve().then(t.t.bind(t,8243,23)),Promise.resolve().then(t.t.bind(t,8827,23)),Promise.resolve().then(t.t.bind(t,2763,23)),Promise.resolve().then(t.t.bind(t,7173,23))},846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1450:(e,r,t)=>{Promise.resolve().then(t.bind(t,6387))},1618:(e,r,t)=>{Promise.resolve().then(t.bind(t,6501))},2261:(e,r,t)=>{Promise.resolve().then(t.bind(t,2517))},2517:(e,r,t)=>{"use strict";t.d(r,{SessionProvider:()=>s});var o=t(2907);(0,o.registerClientReference)(function(){throw Error("Attempted to call useSupabase() from the server but useSupabase is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"J:\\Project\\fully project\\components\\providers\\SessionProvider.tsx","useSupabase");let s=(0,o.registerClientReference)(function(){throw Error("Attempted to call SessionProvider() from the server but SessionProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"J:\\Project\\fully project\\components\\providers\\SessionProvider.tsx","SessionProvider")},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3075:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,6444,23)),Promise.resolve().then(t.t.bind(t,6042,23)),Promise.resolve().then(t.t.bind(t,8170,23)),Promise.resolve().then(t.t.bind(t,9477,23)),Promise.resolve().then(t.t.bind(t,9345,23)),Promise.resolve().then(t.t.bind(t,2089,23)),Promise.resolve().then(t.t.bind(t,6577,23)),Promise.resolve().then(t.t.bind(t,1307,23))},3141:()=>{},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3873:e=>{"use strict";e.exports=require("path")},4117:(e,r,t)=>{Promise.resolve().then(t.bind(t,6967))},6189:(e,r,t)=>{"use strict";var o=t(5773);t.o(o,"useRouter")&&t.d(r,{useRouter:function(){return o.useRouter}}),t.o(o,"useSearchParams")&&t.d(r,{useSearchParams:function(){return o.useSearchParams}})},6387:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>o});let o=(0,t(2907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"J:\\\\Project\\\\fully project\\\\app\\\\login\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"J:\\Project\\fully project\\app\\login\\page.tsx","default")},6501:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>a});var o=t(687),s=t(3210),n=t(6967),i=t(6189);function a(){let{supabase:e}=(0,n._)(),r=(0,i.useRouter)(),t=(0,s.useRef)(null),[a,l]=(0,s.useState)(""),[c,d]=(0,s.useState)(""),[p,u]=(0,s.useState)(!1),[m,h]=(0,s.useState)(!1),[x,b]=(0,s.useState)(""),[g,v]=(0,s.useState)(""),[f,j]=(0,s.useState)(!1),[k,w]=(0,s.useState)("Sign In"),y=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim()),P=e=>e.length>=6,S=async t=>{if(t.preventDefault(),f)return;let o=!0;if(b(""),v(""),y(a)||(b("Please enter a valid email address."),o=!1),P(c)||(v("Password must be at least 6 characters."),o=!1),!o)return;j(!0);let{data:s,error:n}=await e.auth.signInWithPassword({email:a,password:c});if(!n&&m&&await e.auth.setSession({access_token:s.session.access_token,refresh_token:s.session.refresh_token}),j(!1),n){v("Invalid email or password.");return}r.push("/?view=home")};return(0,o.jsxs)("main",{className:"login-page min-h-[100dvh] flex items-center justify-center px-4 py-6 relative",children:[(0,o.jsx)("div",{className:"w-full flex justify-center",children:(0,o.jsxs)("div",{className:"card",children:[(0,o.jsxs)("header",{className:"text-center mb-2",children:[(0,o.jsx)("h1",{ref:t,className:"scramble-text",children:k}),(0,o.jsx)("p",{children:"Enter your credentials to access your account."})]}),(0,o.jsxs)("form",{onSubmit:S,noValidate:!0,className:"flex flex-col gap-4",children:[(0,o.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,o.jsx)("label",{htmlFor:"email",children:"Email Address"}),(0,o.jsx)("div",{className:"relative",children:(0,o.jsx)("input",{id:"email",name:"email",type:"email",placeholder:"name@company.com",autoComplete:"email",value:a,onChange:e=>{l(e.target.value),x&&b("")},onBlur:()=>{a&&!y(a)&&b("Please enter a valid email address.")},className:x?"input-error":"",disabled:f})}),(0,o.jsx)("span",{className:`error-message ${x?"visible":""}`,children:x})]}),(0,o.jsxs)("div",{className:"flex flex-col gap-2",children:[(0,o.jsx)("label",{htmlFor:"password",children:"Password"}),(0,o.jsxs)("div",{className:"relative",children:[(0,o.jsx)("input",{id:"password",name:"password",type:p?"text":"password",placeholder:"••••••••",autoComplete:"current-password",value:c,onChange:e=>{d(e.target.value),g&&v("")},onBlur:()=>{c&&!P(c)&&v("Password must be at least 6 characters.")},className:g?"input-error":"",disabled:f}),(0,o.jsx)("button",{type:"button",className:"password-toggle","aria-label":p?"Hide password":"Show password",onClick:()=>u(e=>!e),disabled:f,children:p?(0,o.jsxs)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,o.jsx)("path",{d:"M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.77 21.77 0 0 1 5.06-5.94"}),(0,o.jsx)("path",{d:"M9.9 4.24A10.93 10.93 0 0 1 12 4c7 0 11 8 11 8a21.73 21.73 0 0 1-3.17 4.36"}),(0,o.jsx)("path",{d:"M14.12 14.12a3 3 0 1 1-4.24-4.24"}),(0,o.jsx)("path",{d:"M1 1l22 22"})]}):(0,o.jsxs)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",children:[(0,o.jsx)("path",{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"}),(0,o.jsx)("circle",{cx:"12",cy:"12",r:"3"})]})})]}),(0,o.jsx)("span",{className:`error-message ${g?"visible":""}`,children:g})]}),(0,o.jsx)("div",{className:"remember-row flex items-center justify-between",children:(0,o.jsxs)("label",{className:"remember-me flex items-center gap-2.5 cursor-pointer group",children:[(0,o.jsxs)("div",{className:"checkbox-wrapper relative",children:[(0,o.jsx)("input",{type:"checkbox",checked:m,onChange:e=>h(e.target.checked),className:"checkbox-input",disabled:f}),(0,o.jsx)("div",{className:"checkbox-custom",children:(0,o.jsx)("svg",{className:"checkmark",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"3",children:(0,o.jsx)("polyline",{points:"20 6 9 17 4 12"})})})]}),(0,o.jsx)("span",{className:"checkbox-label",children:"Remember me"})]})}),(0,o.jsxs)("div",{className:"actions flex gap-2.5 items-center mt-1",children:[(0,o.jsx)("button",{type:"button",className:"secondary-action",onClick:()=>{f||r.back()},disabled:f,children:"Cancel"}),(0,o.jsxs)("button",{type:"submit",className:f?"loading":"",disabled:f,children:[(0,o.jsx)("span",{className:"spinner"}),(0,o.jsx)("span",{children:f?"Signing in...":"Sign In"})]})]})]}),(0,o.jsx)("footer",{className:"text-center",children:"Contact your administrator to request access."})]})}),(0,o.jsx)("style",{children:`
        .login-page {
          background-color: var(--login-bg-color);
          color: var(--login-text-main);
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }

        .login-page * {
          box-sizing: border-box;
        }

        .card {
          background: var(--login-card-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--login-card-border);
          border-radius: var(--login-radius-card);
          padding: 36px;
          width: 100%;
          max-width: 420px;
          box-shadow: var(--login-shadow-card);
          display: flex;
          flex-direction: column;
          gap: 22px;
          opacity: 0;
          transform: translateY(20px);
          animation: login-fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .card h1 {
          font-size: 24px;
          font-weight: 600;
          color: var(--login-text-main);
          margin: 0 0 8px;
          letter-spacing: -0.02em;
          display: inline-block;
          min-height: 36px;
        }

        .scramble-text .dud {
          color: var(--login-accent-primary);
          opacity: 0.8;
          display: inline-block;
        }

        .card p {
          font-size: 14px;
          color: var(--login-text-muted);
          font-weight: 400;
          margin: 0;
        }

        .login-page label {
          font-size: 13px;
          font-weight: 500;
          color: var(--login-text-muted);
          margin-left: 2px;
        }

        .login-page input {
          width: 100%;
          background-color: var(--login-input-bg);
          border: 1px solid var(--login-input-border);
          border-radius: var(--login-radius-input);
          padding: 12px 44px 12px 14px;
          font-size: 15px;
          color: var(--login-text-main);
          outline: none;
          transition: all 0.2s ease;
        }

        .login-page input:hover {
          border-color: var(--login-input-border-hover);
        }

        .login-page input:focus {
          border-color: var(--login-accent-primary);
          box-shadow: 0 0 0 3px var(--login-accent-focus-ring);
        }

        .login-page input:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .password-toggle {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: #8a8898;
          cursor: pointer;
          transition: background-color 0.2s ease, color 0.2s ease;
        }

        .password-toggle:hover:not(:disabled) {
          background: rgba(0, 0, 0, 0.04);
          color: var(--login-text-main);
        }

        .password-toggle:focus-visible {
          outline: none;
          box-shadow: 0 0 0 3px var(--login-accent-focus-ring);
        }

        .password-toggle:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .input-error {
          border-color: var(--login-text-error) !important;
        }

        .input-error:focus {
          box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.2) !important;
        }

        .error-message {
          font-size: 12px;
          color: var(--login-text-error);
          min-height: 18px;
          opacity: 0;
          transform: translateY(-5px);
          transition: all 0.2s ease;
          margin-left: 2px;
        }

        .error-message.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .actions button[type='submit'] {
          flex: 1;
          background-color: var(--login-accent-primary);
          color: white;
          border: none;
          border-radius: var(--login-radius-input);
          padding: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .actions button[type='submit']:hover:not(:disabled) {
          background-color: var(--login-accent-hover);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(99, 101, 185, 0.3);
        }

        .actions button[type='submit']:active:not(:disabled) {
          transform: translateY(0);
        }

        .actions button[type='submit']:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .footer {
          text-align: center;
          font-size: 13px;
          color: var(--login-text-muted);
          line-height: 1.6;
        }

        .spinner {
          display: none;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: login-spin 0.8s linear infinite;
          margin-right: 2px;
          vertical-align: middle;
        }

        .loading .spinner {
          display: inline-block;
        }

        .secondary-action {
          flex: 1;
          background: transparent;
          border: 1px solid var(--login-input-border);
          border-radius: var(--login-radius-input);
          color: var(--login-text-main);
          padding: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease;
        }

        .secondary-action:hover:not(:disabled) {
          border-color: var(--login-input-border-hover);
          background-color: rgba(0, 0, 0, 0.03);
        }

        .secondary-action:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .remember-row {
          margin-top: -4px;
        }

        .remember-me {
          font-size: 13px;
          color: var(--login-text-muted);
          user-select: none;
        }

        .checkbox-wrapper {
          position: relative;
        }

        .checkbox-input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }

        .checkbox-custom {
          width: 20px;
          height: 20px;
          border: 2px solid var(--login-input-border);
          border-radius: 6px;
          background-color: var(--login-input-bg);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .checkbox-custom .checkmark {
          width: 12px;
          height: 12px;
          stroke: white;
          opacity: 0;
          transform: scale(0.5);
          transition: all 0.2s ease;
        }

        .remember-me:hover .checkbox-custom {
          border-color: var(--login-input-border-hover);
          transform: scale(1.05);
        }

        .checkbox-input:checked + .checkbox-custom {
          background: linear-gradient(135deg, var(--login-accent-primary) 0%, #4a4d8a 100%);
          border-color: var(--login-accent-primary);
          box-shadow: 0 2px 8px rgba(99, 101, 185, 0.4);
        }

        .checkbox-input:checked + .checkbox-custom .checkmark {
          opacity: 1;
          transform: scale(1);
        }

        .checkbox-input:disabled + .checkbox-custom {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .checkbox-label {
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .remember-me:hover .checkbox-label {
          color: var(--login-text-main);
        }
      `})]})}},6967:(e,r,t)=>{"use strict";t.d(r,{SessionProvider:()=>l,_:()=>a});var o=t(687),s=t(3210),n=t(9605);let i=(0,s.createContext)({supabase:null,user:null,loading:!0});function a(){return(0,s.useContext)(i)}function l({children:e}){let[r]=(0,s.useState)(()=>(0,n.createBrowserClient)("https://vuqxmehgwbfklwjjburk.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1cXhtZWhnd2Jma2x3ampidXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwMzc0NDgsImV4cCI6MjA5MDYxMzQ0OH0.8rR23cqn1-00Uep0nl0vAqrA48SSZdK_Zitg2N1bmpI",{cookies:{getAll:()=>"undefined"==typeof document?[]:document.cookie.split(";").reduce((e,r)=>{let[t,...o]=r.trim().split("=");return t&&e.push({name:t,value:o.join("=")}),e},[]),setAll(e){e.forEach(({name:e,value:r,options:t})=>{var o;let s=(o=t?.maxAge)&&o>0?{path:"/",sameSite:"lax",maxAge:o}:{path:"/",sameSite:"lax"},n=s.maxAge?`; max-age=${s.maxAge}`:"";document.cookie=`${e}=${r}; path=${s.path}${n}; sameSite=${s.sameSite}`})}}})),[t,a]=(0,s.useState)(null),[l,c]=(0,s.useState)(!0);return(0,o.jsx)(i.Provider,{value:{supabase:r,user:t,loading:l},children:e})}},8014:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>i,metadata:()=>n});var o=t(7413);t(3141);var s=t(2517);let n={title:"HR Imajin - Internal Portal",description:"HR Imajin Internal Portal"};function i({children:e}){return(0,o.jsx)("html",{lang:"en",children:(0,o.jsx)("body",{children:(0,o.jsx)(s.SessionProvider,{children:e})})})}},8666:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>i.a,__next_app__:()=>p,pages:()=>d,routeModule:()=>u,tree:()=>c});var o=t(5239),s=t(8088),n=t(8170),i=t.n(n),a=t(893),l={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);t.d(r,l);let c={children:["",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,6387)),"J:\\Project\\fully project\\app\\login\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,8014)),"J:\\Project\\fully project\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,7398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(t.t.bind(t,9999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(t.t.bind(t,5284,23)),"next/dist/client/components/unauthorized-error"]}]}.children,d=["J:\\Project\\fully project\\app\\login\\page.tsx"],p={require:t,loadChunk:()=>Promise.resolve()},u=new o.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/login/page",pathname:"/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[941],()=>t(8666));module.exports=o})();