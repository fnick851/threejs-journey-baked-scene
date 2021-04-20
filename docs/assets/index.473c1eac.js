import{r as e,C as n,O as t,L as o,u as i,a as r,s as a,M as c,S as l,b as s,A as v,B as g,c as m,d,e as f,f as u}from"./vendor.9c7de3b4.js";!function(e=".",n="__import__"){try{self[n]=new Function("u","return import(u)")}catch(t){const o=new URL(e,location),i=e=>{URL.revokeObjectURL(e.src),e.remove()};self[n]=e=>new Promise(((t,r)=>{const a=new URL(e,o);if(self[n].moduleMap[a])return t(self[n].moduleMap[a]);const c=new Blob([`import * as m from '${a}';`,`${n}.moduleMap['${a}']=m;`],{type:"text/javascript"}),l=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(c),onerror(){r(new Error(`Failed to import: ${e}`)),i(l)},onload(){t(self[n].moduleMap[a]),i(l)}});document.head.appendChild(l)})),self[n].moduleMap={}}}("assets/");const x=()=>{const{portal_color_start:n,portal_color_end:t,clear_color:o,firefly_size:u}=i({portal_color_start:"#1f74d1",portal_color_end:"#a75217",clear_color:"#272525",firefly_size:150}),x=r("baked.jpg");x.flipY=!1,x.encoding=a;const y=new c({map:x}),p=new c({color:16777189}),P=new l({uniforms:{uTime:{value:0},uColorStart:{value:new s(n)},uColorEnd:{value:new s(t)}},vertexShader:"\nvarying vec2 vUv;\n\nvoid main()\n{\n    vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n    vec4 viewPosition = viewMatrix * modelPosition;\n    vec4 projectionPosition = projectionMatrix * viewPosition;\n\n    gl_Position = projectionPosition;\n\n    vUv = uv;\n}\n",fragmentShader:"\nuniform float uTime;\nuniform vec3 uColorStart;\nuniform vec3 uColorEnd;\n\nvarying vec2 vUv;\n\n//    Classic Perlin 3D Noise \n//    by Stefan Gustavson\n//\nvec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }\nvec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }\nvec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }\n\nfloat cnoise(vec3 P)\n{\n    vec3 Pi0 = floor(P); // Integer part for indexing\n    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n    Pi0 = mod(Pi0, 289.0);\n    Pi1 = mod(Pi1, 289.0);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n\n    vec4 gx0 = ixy0 / 7.0;\n    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n    vec4 gx1 = ixy1 / 7.0;\n    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); \n\n    return 2.2 * n_xyz;\n}\n\nvoid main()\n{\n    // Displace the UV\n    vec2 displacedUv = vUv + cnoise(vec3(vUv * 5.0, uTime * 0.1));\n\n    // Perlin noise\n    float strength = cnoise(vec3(displacedUv * 5.0, uTime * 0.2));\n\n    // Outer glow\n    float outerGlow = distance(vUv, vec2(0.5)) * 5.0 - 1.4;\n    strength += outerGlow;\n\n    // Apply cool step\n    strength += step(- 0.2, strength) * 0.8;\n\n    // // Clamp the value from 0 to 1\n    // strength = clamp(strength, 0.0, 1.0);\n\n    // Final color\n    vec3 color = mix(uColorStart, uColorEnd, strength);\n\n    gl_FragColor = vec4(color, 1.0);\n}\n"}),z=new Float32Array(90),w=new Float32Array(30);for(let e=0;e<30;e++)z[3*e+0]=4*(Math.random()-.5),z[3*e+1]=1.5*Math.random(),z[3*e+2]=4*(Math.random()-.5),w[e]=Math.random();const _=new l({uniforms:{uTime:{value:0},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uSize:{value:u}},vertexShader:"\nuniform float uTime;\nuniform float uPixelRatio;\nuniform float uSize;\n\nattribute float aScale;\n\nvoid main()\n{\n    vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n    modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;\n\n    vec4 viewPosition = viewMatrix * modelPosition;\n    vec4 projectionPosition = projectionMatrix * viewPosition;\n\n    gl_Position = projectionPosition;\n    \n    gl_PointSize = uSize * aScale * uPixelRatio;\n    gl_PointSize *= (1.0 / - viewPosition.z);\n}\n",fragmentShader:"\nvoid main()\n{\n    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));\n    float strength = 0.05 / distanceToCenter - 0.1;\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);\n}\n",transparent:!0,blending:v,depthWrite:!1}),h=e.useRef(null);e.useEffect((()=>{const e=h.current;e&&(e.setAttribute("position",new g(z,3)),e.setAttribute("aScale",new g(w,1)))}));const S=m("portal.glb"),b=S.scene.children.find((e=>"baked"===e.name)),E=S.scene.children.find((e=>"portalLight"===e.name)),M=S.scene.children.find((e=>"poleLightA"===e.name)),C=S.scene.children.find((e=>"poleLightB"===e.name));b.material=y,E.material=P,M.material=p,C.material=p;const{gl:U,scene:R}=d();return U.setClearColor(o),U.outputEncoding=a,U.setPixelRatio(Math.min(window.devicePixelRatio,2)),R.add(S.scene),f((e=>{const n=e.clock.getElapsedTime();P.uniforms.uTime.value=n,_.uniforms.uTime.value=n})),e.createElement(e.Fragment,null,e.createElement("points",{material:_},e.createElement("bufferGeometry",{ref:h})))};function y(){return e.createElement("div",{className:"scene-root"},e.createElement(n,{camera:{position:[2,2,3]}},e.createElement(e.Suspense,{fallback:null},e.createElement(x,null)),e.createElement(t,null)),e.createElement(o,{oneLineLabels:!0}))}u.render(e.createElement(e.StrictMode,null,e.createElement(y,null)),document.getElementById("root"));
