"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[676],{676:(C,d,l)=>{l.r(d),l.d(d,{ResetPassPageModule:()=>j});var P=l(177),a=l(4341),i=l(1075),m=l(8189),f=l(467),e=l(4438),p=l(9214);function g(t,o){1&t&&(e.j41(0,"ion-text")(1,"p",15),e.EFF(2,"El campo es obligatorio"),e.k0s()())}function v(t,o){1&t&&(e.j41(0,"ion-text")(1,"p",15),e.EFF(2,"El formato del correo no es v\xe1lido"),e.k0s()())}function F(t,o){if(1&t&&(e.j41(0,"div"),e.DNE(1,g,3,0,"ion-text",8)(2,v,3,0,"ion-text",8),e.k0s()),2&t){const r=e.XpG();e.R7$(),e.Y8G("ngIf",r.resetPassForm.controls.email.errors.required),e.R7$(),e.Y8G("ngIf",r.resetPassForm.controls.email.errors.email)}}function R(t,o){1&t&&(e.j41(0,"ion-text")(1,"p",15),e.EFF(2,"El campo es obligatorio"),e.k0s()())}function h(t,o){1&t&&(e.j41(0,"ion-text")(1,"p",15),e.EFF(2,"La contrase\xf1a debe contener al menos: una letra may\xfascula, un n\xfamero, un caracter especial y debe tener una longitud m\xednima de 8 d\xedgitos."),e.k0s()())}function x(t,o){if(1&t&&(e.j41(0,"div"),e.DNE(1,R,3,0,"ion-text",8)(2,h,3,0,"ion-text",8),e.k0s()),2&t){const r=e.XpG();e.R7$(),e.Y8G("ngIf",r.resetPassForm.controls.password.errors.required),e.R7$(),e.Y8G("ngIf",r.resetPassForm.controls.password.errors.pattern)}}function _(t,o){1&t&&(e.j41(0,"ion-text")(1,"p",15),e.EFF(2,"El campo es obligatorio"),e.k0s()())}function w(t,o){1&t&&(e.j41(0,"ion-text")(1,"p",15),e.EFF(2,"Las contrase\xf1as no coinciden"),e.k0s()())}function E(t,o){if(1&t&&(e.j41(0,"div"),e.DNE(1,_,3,0,"ion-text",8)(2,w,3,0,"ion-text",8),e.k0s()),2&t){const r=e.XpG();e.R7$(),e.Y8G("ngIf",r.resetPassForm.controls.confirmPassword.errors.required),e.R7$(),e.Y8G("ngIf",null==r.resetPassForm.controls.confirmPassword.errors?null:r.resetPassForm.controls.confirmPassword.errors.notEquivalent)}}const b=[{path:"",component:(()=>{var t;class o{constructor(s,n,c){this.router=s,this.authService=n,this.formBuilder=c}ngOnInit(){this.resetPassForm=this.formBuilder.group({email:["",[a.k0.required,a.k0.email]],password:["",[a.k0.required,a.k0.pattern("(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}")]],confirmPassword:["",a.k0.required]},{validator:this.passwordMatchValidator})}passwordMatchValidator(s){const n=s.get("password"),c=s.get("confirmPassword");n&&c&&c.setErrors(n.value===c.value?null:{notEquivalent:!0})}resetPassword(){var s=this;return(0,f.A)(function*(){if(s.resetPassForm.valid){const n=s.resetPassForm.value.email,c=s.resetPassForm.value.password;try{yield s.authService.resetPassword(n,c),s.router.navigate(["/login"])}catch(u){console.error("Error resetting password:",u)}}})()}}return(t=o).\u0275fac=function(s){return new(s||t)(e.rXU(m.Ix),e.rXU(p.k),e.rXU(a.ok))},t.\u0275cmp=e.VBU({type:t,selectors:[["app-reset-pass"]],decls:23,vars:5,consts:[[3,"fullscreen"],[1,"header"],[1,"title"],[1,"subTitle"],[3,"ngSubmit","formGroup"],[1,"ion-padding"],["formControlName","email","type","email","placeholder","Correo electr\xf3nico"],["name","mail-outline"],[4,"ngIf"],["formControlName","password","type","password","placeholder","Nueva contrase\xf1a"],["name","lock-closed-outline"],["formControlName","confirmPassword","type","password","placeholder","Confirmar nueva contrase\xf1a"],["vertical","bottom","horizontal","end",2,"margin-bottom","30px"],["type","submit","color","tertiary"],["name","chevron-forward"],[1,"text"]],template:function(s,n){1&s&&(e.j41(0,"ion-content",0)(1,"div",1)(2,"ion-title",2),e.EFF(3,"Escribe tu correo"),e.k0s(),e.j41(4,"p",3),e.EFF(5,"Para cambiar tu contrase\xf1a"),e.k0s()(),e.j41(6,"form",4),e.bIt("ngSubmit",function(){return n.resetPassword()}),e.j41(7,"div",5)(8,"ion-item"),e.nrm(9,"ion-input",6)(10,"ion-icon",7),e.k0s(),e.DNE(11,F,3,2,"div",8),e.j41(12,"ion-item"),e.nrm(13,"ion-input",9)(14,"ion-icon",10),e.k0s(),e.DNE(15,x,3,2,"div",8),e.j41(16,"ion-item"),e.nrm(17,"ion-input",11)(18,"ion-icon",10),e.k0s(),e.DNE(19,E,3,2,"div",8),e.j41(20,"ion-fab",12)(21,"ion-fab-button",13),e.nrm(22,"ion-icon",14),e.k0s()()()()()),2&s&&(e.Y8G("fullscreen",!0),e.R7$(6),e.Y8G("formGroup",n.resetPassForm),e.R7$(5),e.Y8G("ngIf",n.resetPassForm.controls.email.touched&&n.resetPassForm.controls.email.invalid),e.R7$(4),e.Y8G("ngIf",n.resetPassForm.controls.password.touched&&n.resetPassForm.controls.password.invalid),e.R7$(4),e.Y8G("ngIf",n.resetPassForm.controls.confirmPassword.touched&&n.resetPassForm.controls.confirmPassword.invalid))},dependencies:[P.bT,a.qT,a.BC,a.cb,i.W9,i.Q8,i.YW,i.iq,i.$w,i.uz,i.IO,i.BC,i.Gw,a.j4,a.JD],styles:[".input[_ngcontent-%COMP%]{font-weight:300}ion-item[_ngcontent-%COMP%]{--background:#fbdaff54;border-radius:10px;margin-bottom:16px}.header[_ngcontent-%COMP%]{margin-top:100px;margin-bottom:80px;text-align:center}.header[_ngcontent-%COMP%]   .subTitle[_ngcontent-%COMP%]{color:gray;font-size:.9rem}.header[_ngcontent-%COMP%]   title[_ngcontent-%COMP%]{font-size:2rem}"]}),o})()}];let k=(()=>{var t;class o{}return(t=o).\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[m.iI.forChild(b),m.iI,a.X1]}),o})(),j=(()=>{var t;class o{}return(t=o).\u0275fac=function(s){return new(s||t)},t.\u0275mod=e.$C({type:t}),t.\u0275inj=e.G2t({imports:[P.MD,a.YN,i.bv,k]}),o})()}}]);