"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[8676],{8676:(x,d,s)=>{s.r(d),s.d(d,{Tab2PageModule:()=>I});var c=s(1075),g=s(177),f=s(4341),y=s(1307),h=s(8189),u=s(467),e=s(4438),v=s(5312),b=s(9437),T=s(8810),C=s(1626);const m=v.c.apiRestUrl;let P=(()=>{var o;class n{constructor(t){this.http=t}getAllCategories(){return this.http.get(`${m}category/all`)}addSurvey(t,r){return console.log("a\xf1adiendo encuesta a id_user: "+t),this.http.post(`${m}user/${t}/encuestas/${r}`,{observe:"response"}).pipe((0,b.W)(i=>{let l="";switch(i.status){case 400:l="Solo puedes hacer la encuesta una vez";break;case 404:l="Usuario o categoria no encontrada";break;default:l="Error al agregar encuesta"}return(0,T.$)(()=>new Error(l))}))}}return(o=n).\u0275fac=function(t){return new(t||o)(e.KVO(C.Qq))},o.\u0275prov=e.jDH({token:o,factory:o.\u0275fac,providedIn:"root"}),n})();var E=s(1670),S=s(2872),$=s(9214);function F(o,n){if(1&o){const a=e.RV6();e.j41(0,"ion-button",7),e.bIt("click",function(){e.eBV(a);const r=e.XpG();return e.Njj(r.goBack())}),e.EFF(1," Volver atr\xe1s "),e.k0s()}}function R(o,n){if(1&o&&e.nrm(0,"img",14),2&o){const a=e.XpG().$implicit;e.Y8G("src",a.url_img,e.B4B)}}function j(o,n){if(1&o&&(e.j41(0,"ion-card-content")(1,"p"),e.EFF(2),e.k0s()()),2&o){const a=e.XpG().$implicit;e.R7$(2),e.JRh(a.description)}}function k(o,n){if(1&o){const a=e.RV6();e.j41(0,"ion-col",8)(1,"ion-card",9),e.bIt("click",function(){const r=e.eBV(a).$implicit,i=e.XpG();return e.Njj(i.cardClick(r.name))}),e.DNE(2,R,1,1,"img",10),e.j41(3,"ion-card-header",11)(4,"ion-card-title",12),e.EFF(5),e.k0s()(),e.DNE(6,j,3,1,"ion-card-content",13),e.k0s()()}if(2&o){const a=n.$implicit;e.R7$(2),e.Y8G("ngIf",a.url_img),e.R7$(3),e.JRh(a.name),e.R7$(),e.Y8G("ngIf",a.description)}}const G=[{path:"",component:(()=>{var o;class n{constructor(t,r,i,l,p){this.categoriesService=t,this.iab=r,this.platform=i,this.authService=l,this.toastController=p,this.all_categories=[],this.category_names=[],this.category_children=[],this.displayedCategories=[],this.categoryHistory=[],this.inCategory=!1}ngOnInit(){this.displayedCategories=[],this.categoriesService.getAllCategories().subscribe(t=>{this.all_categories.push(...t),console.log(t);let r=[];for(let i of t)0==i.level&&r.push(i);this.category_names.push(...r),this.displayedCategories=this.category_names}),this.authService.getCurrentUser().subscribe(t=>{this.currentUser=t})}cardClick(t){this.category_children=[];const r=this.all_categories.filter(i=>i.parent===t);if(0===r.length){const i=this.all_categories.find(l=>l.name===t);console.log("Has pulsado sobre la categoria "+i.name+" con el id "+i._id),i.url_survey?(this.selectedSurvey=i,this.confirmSurvey()):this.presentToast(`No hay encuestas disponibles para ${i.name} por el momento.`,"bottom","warning")}else this.category_children.push(...r),console.log(`Categor\xedas hija de ${t}:`,r),this.categoryHistory.push(this.displayedCategories),this.displayedCategories=this.category_children,this.inCategory=!0}confirmSurvey(){var t=this;return(0,u.A)(function*(){var r;t.selectedSurvey&&t.currentUser&&t.categoriesService.addSurvey(t.currentUser._id,t.selectedSurvey._id).subscribe({next:()=>{console.log("Encuesta a\xf1adida exitosamente"),t.platform.is("ios")||t.platform.is("android")?t.iab.create(t.selectedSurvey.url_survey).show():window.open(t.selectedSurvey.url_survey,"_blank")},error:(r=(0,u.A)(function*(i){console.error("Error al a\xf1adir la encuesta:",i),yield t.presentToast(i.message,"bottom","danger")}),function(l){return r.apply(this,arguments)})})})()}goBack(){if(this.categoryHistory.length>0){const t=this.categoryHistory.pop();t&&(this.displayedCategories=t,this.inCategory=this.categoryHistory.length>0)}}presentToast(t,r,i){var l=this;return(0,u.A)(function*(){yield(yield l.toastController.create({message:t,duration:3e3,position:r,color:i,mode:"ios",translucent:!0,swipeGesture:"vertical"})).present()})()}}return(o=n).\u0275fac=function(t){return new(t||o)(e.rXU(P),e.rXU(E.N),e.rXU(S.OD),e.rXU($.k),e.rXU(c.K_))},o.\u0275cmp=e.VBU({type:o,selectors:[["app-tab2"]],decls:13,vars:4,consts:[["mode","ios",1,"ion-no-border",3,"translucent"],["mode","ios",1,"ion-no-border",3,"fullscreen"],["collapse","condense"],["size","large"],["class","ion-margin","expand","block",3,"click",4,"ngIf"],[1,"ion-margin"],["size","12","size-lg","3","size-md","4","size-sm","6","size-xs","12",4,"ngFor","ngForOf"],["expand","block",1,"ion-margin",3,"click"],["size","12","size-lg","3","size-md","4","size-sm","6","size-xs","12"],[3,"click"],[3,"src",4,"ngIf"],[1,"ion-align-items-center"],[1,"ion-padding-horizontal","ion-margin-bottom"],[4,"ngIf"],[3,"src"]],template:function(t,r){1&t&&(e.j41(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),e.EFF(3," Estudios en Psicolog\xeda "),e.k0s()()(),e.j41(4,"ion-content",1)(5,"ion-header",2)(6,"ion-toolbar")(7,"ion-title",3),e.EFF(8,"Estudios en Psicolog\xeda"),e.k0s()(),e.DNE(9,F,2,0,"ion-button",4),e.k0s(),e.j41(10,"ion-grid")(11,"ion-row",5),e.DNE(12,k,7,3,"ion-col",6),e.k0s()()()),2&t&&(e.Y8G("translucent",!0),e.R7$(4),e.Y8G("fullscreen",!0),e.R7$(5),e.Y8G("ngIf",r.inCategory),e.R7$(3),e.Y8G("ngForOf",r.displayedCategories))},dependencies:[c.Jm,c.b_,c.I9,c.ME,c.tN,c.hU,c.W9,c.lO,c.eU,c.ln,c.BC,c.ai,g.Sq,g.bT]}),n})()}];let U=(()=>{var o;class n{}return(o=n).\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[h.iI.forChild(G),h.iI]}),n})();var z=s(5553);let I=(()=>{var o;class n{}return(o=n).\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.$C({type:o}),o.\u0275inj=e.G2t({imports:[c.bv,g.MD,f.YN,y.S,U,z.h]}),n})()}}]);