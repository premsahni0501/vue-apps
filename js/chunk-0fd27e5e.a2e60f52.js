(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0fd27e5e"],{2655:function(t,e,r){"use strict";var a=r("c5b6"),n=r.n(a);n.a},"294d":function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"actionbar"},[a("button",{staticClass:"btn btn-link",on:{click:t.goBack}},[a("img",{staticClass:"img-fluid",attrs:{src:r("67d4"),alt:"back"}})]),a("h3",{staticClass:"m-0"},[t._v(t._s(t.title))])])},n=[],i=r("d225"),o=r("b0b4"),s=r("308d"),c=r("6bb5"),u=r("4e2b"),p=r("9ab4"),l=r("60a3"),d=function(t){function e(){return Object(i["a"])(this,e),Object(s["a"])(this,Object(c["a"])(e).apply(this,arguments))}return Object(u["a"])(e,t),Object(o["a"])(e,[{key:"goBack",value:function(){window.history.length>1?this.$router.back():this.$router.push({path:"/"})}}]),e}(l["c"]);p["a"]([Object(l["b"])()],d.prototype,"title",void 0),d=p["a"]([l["a"]],d);var h=d,f=h,b=r("2877"),m=Object(b["a"])(f,a,n,!1,null,null,null);e["a"]=m.exports},3036:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container-fluid"},[r("ActionBar",{attrs:{title:"Calculator"}}),r("div",{staticClass:"container mt-3 home",staticStyle:{"max-width":"500px"}},[r("div",{staticClass:"calculatorBase"},[r("div",{staticClass:"form-group"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.result,expression:"result"}],staticClass:"form-control",attrs:{type:"text",readonly:"",placeholder:"0"},domProps:{value:t.result},on:{input:function(e){e.target.composing||(t.result=e.target.value)}}})]),r("ul",{staticClass:"calculatorButtons btn-group"},[r("div",[t._l(t.calcButtons.operation,function(e,a){return r("button",{key:"operation_"+a,staticClass:"btn btn-default operation",on:{click:function(r){return t.onInput(e)}}},[t._v("\n                        "+t._s(e.title)+"\n                    ")])}),t._l(t.calcButtons.operand,function(e,a){return r("button",{key:"operand_"+a,staticClass:"btn btn-default operand",style:{flexBasis:"zero"===e.name?"65%":"30%"},on:{click:function(r){return t.onInput(e)}}},[t._v("\n                        "+t._s(e.title)+"\n                    ")])})],2),r("div",t._l(t.calcButtons.operator,function(e,a){return r("button",{key:"operator_"+a,staticClass:"btn btn-default operator",class:[{active:e.name===t.currentOperator}],on:{click:function(r){return t.onInput(e)}}},[t._v("\n                        "+t._s(e.title)+"\n                    ")])}),0)])])])],1)},n=[],i=(r("7f7f"),r("d225")),o=r("b0b4"),s=r("308d"),c=r("6bb5"),u=r("4e2b"),p=r("9ab4"),l=r("60a3"),d=[{title:"%",type:"operation",name:"percentage"},{title:"+/-",type:"operation",name:"negate"},{title:"C",type:"operation",name:"clear"},{title:"÷",type:"operator",name:"divide"},{title:"×",type:"operator",name:"multiply"},{title:"-",type:"operator",name:"subtract"},{title:"+",type:"operator",name:"add"},{title:"=",type:"operator",name:"equal"},{title:"0",type:"operand",name:"zero"},{title:".",type:"operand",name:"decimal"},{title:"1",type:"operand",name:"one"},{title:"2",type:"operand",name:"two"},{title:"3",type:"operand",name:"three"},{title:"4",type:"operand",name:"four"},{title:"5",type:"operand",name:"five"},{title:"6",type:"operand",name:"six"},{title:"7",type:"operand",name:"seven"},{title:"8",type:"operand",name:"eight"},{title:"9",type:"operand",name:"nine"}],h=r("294d"),f=function(t){function e(){var t;return Object(i["a"])(this,e),t=Object(s["a"])(this,Object(c["a"])(e).apply(this,arguments)),t.calcButtons={operation:[],operator:[],operand:[]},t.currentOperand="",t.currentOperator="",t.result="",t.operands=new Array,t}return Object(u["a"])(e,t),Object(o["a"])(e,[{key:"created",value:function(){this.calcButtons.operation=d.filter(function(t){return"operation"===t.type}),this.calcButtons.operator=d.filter(function(t){return"operator"===t.type}),this.calcButtons.operand=d.filter(function(t){return"operand"===t.type}),this.calcButtons.operand=this.calcButtons.operand.reverse()}},{key:"onInput",value:function(t){switch(console.log(t.title),t.type){case"operation":this.performOperation(t);break;case"operator":this.addOperator(t);break;case"operand":this.appendOperand(t);break}}},{key:"performOperation",value:function(t){switch(t.name){case"percentage":if("divide"==this.currentOperator||"multiply"==this.currentOperator){var e=parseInt(this.currentOperand);this.operands.push(e),"divide"==this.currentOperator?e=this.calculate(this.operands,"percentageBy"):"multiply"==this.currentOperator&&(e=this.calculate(this.operands,"percentageOf")),this.result=e+"",this.operands=[],this.operands.push(e),this.currentOperand=""}break;case"negate":this.result=this.currentOperand=-1*parseFloat(this.result)+"";break;case"clear":this.result="",this.operands=[],this.currentOperand="",this.currentOperator="";break}}},{key:"addOperator",value:function(t){if(console.log(this.currentOperand),""!==this.currentOperand){var e=parseInt(this.currentOperand);this.operands.push(e)}if(this.operands.length>1&&""!==this.currentOperator){var r=this.calculate(this.operands,this.currentOperator);this.result=r+"",this.operands=[],this.operands.push(r)}"equal"!==t.name?(this.currentOperator=t.name,this.currentOperand=""):(this.currentOperator="",this.currentOperand=this.result,this.operands=[])}},{key:"calculate",value:function(t,e){switch(console.log(t[0],t[1],e),e){case"add":return t[0]+t[1];case"subtract":return t[0]-t[1];case"multiply":return t[0]*t[1];case"divide":return t[0]/t[1];case"percentageBy":return t[0]/t[1]*100;case"percentageOf":return t[0]*t[1]/100;case"equal":console.log(t[0],t[1],e);break}return 0}},{key:"appendOperand",value:function(t){this.currentOperand+=t.title,this.result=this.currentOperand}}]),e}(l["c"]);f=p["a"]([Object(l["a"])({components:{ActionBar:h["a"]}})],f);var b=f,m=b,y=(r("2655"),r("2877")),O=Object(y["a"])(m,a,n,!1,null,"39be698f",null);e["default"]=O.exports},"7f7f":function(t,e,r){var a=r("86cc").f,n=Function.prototype,i=/^\s*function ([^ (]*)/,o="name";o in n||r("9e1e")&&a(n,o,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},c5b6:function(t,e,r){}}]);
//# sourceMappingURL=chunk-0fd27e5e.a2e60f52.js.map