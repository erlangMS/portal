'use strict';



/*!
 * fpc -- Framework de primeira camada
 * Copyright 2011-2015 Everton de Vargas Agilar.
 * Project: https://github.com/eliot-framework/eliot
 */


function FpcError(message, url, params) {
    this.name = "FpcError";
    this.message = message + "\nRequest: " + url + "\nParams: "+ JSON.stringify(params) + ")";						
}
FpcError.prototype = Error.prototype;


class FpcCrudController {
		constructor(){
			this.about = "Controller for cruds";
	} 
};
  

var fpc = {
    csrftoken : "",
    lazyFields : null,
    erlangms_url: "http://localhost:2301",
    username : "everton",
    password : "123456",

    callRest : function(url, params, method){
    	if (!url.startsWith("/")){
    		var url = this.erlangms_url + url;
    	}
    	var params = (params == undefined ? {} : params);
    	var method = (method == undefined ? "GET" : method);
	    return $.ajax({
            url:  url,
            data : params,
            type: method,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            crossDomain: true,
            success: function(response) {
				return response;
            },
            error: function(xhr, textStatus) {
		    	var error = xhr.responseJSON;
		    	document.body.style.cursor = "default";
				fpc.mensagem(error, "erro");
				throw new FpcError(error, url, params);
            }
		});
    },

    callRestIfNull : function(value, url, params){
    	if (value == null){
    		return this.callRest(url, params);
    	}else{
    		var ret = {
    			done : function(obj){
    				return function(fn) {
    					return fn(value);
    				}
    			}(value)
    		};
    		return ret;
    	}
    },
    
   	getJSON : function(url, params){
	    return $.ajax({
            url:  url,
            data : params,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            //timeout: 6500,
            crossDomain: true,
            success: function(msg) {
				var doc = document;
				if (msg.tipo === "erro" || msg.erro != undefined){
					doc.body.style.cursor = "default"; 
					var msg_erro = fpc.mensagem(msg.message, "erro");
					throw new FpcError(JSON.stringify(msg.message), url, params);
				}
            },
            error: function(xhr, textStatus, error) {
		    	document.body.style.cursor = "default";
				fpc.mensagem(error, "erro");
				throw new FpcError(error, url, params);
            }
		});
   	},
    
    fillComboboxFromArray : function(combobox, obj){
    	if (obj instanceof Array){
    		var jCombobox = $(combobox); 
	    	for (var i=0; i < obj.length; i++) {
	    		var item = obj[i];
	    		if (item instanceof Object){
	    			var keys = Object.keys(item);
	    			jCombobox.append("<option value='"+ item[keys[0]]+ "'>" + item[keys[1]] + "</option>");
	    		}else{
	    			jCombobox.append("<option value='"+ item[0]+ "'>" + item[1] + "</option>");	
	    		}
	    		
	        }
    	}
    },
    
    setComboboxValue : function(field, value){
    	if (typeof value != "string"){
        	value = value.toString()
    	}
    	if (field != null && value != null && value != ""){ 
        	  for (var j = 0, len_field = field.length; j < len_field; j++) {
                  if (field[j].value === value) {
                    field[j].selected = true;
                    break;
                  }
              }
    	}
    },
    
    getValueFromCombobox : function (field){
        if (field != undefined){
	    	for (var i=0; i < field.length; i++) {
	            if (field[i].selected) {
	            	var result = field[i].value;    
	            	return result === "-" ? undefined : result;
	            }
	        }
        }
        return undefined;
    },    

    getValueFromRadio : function(radio, form){
    	if (radio != undefined){
	    	var tipo = typeof radio;
	    	if (tipo === "object"){
	    		var inputName = radio.name;
	    	}else if (tipo === "string"){
	    		var inputName = radio;
	    	}else{
	    		throw new Error("Argumento inválido para getValueFromRadio: deve ser um radio ou nome do radio.");
	    	}
	    	if (form != undefined){
	    		var radios = form.querySelectorAll('[name='+ inputName + ']')	
	    	}else{
	    		var radios = document.getElementsByName(inputName);
	    	}
	    	for (var i = 0, length = radios.length; i < length; i++) {
	    	    if (radios[i].checked) {
	    	        return radios[i].value;
	    	    }
	    	}
    	}
    	return undefined;
    },

    getValueFromRadioAsBoolean : function(radio, form){
    	var value = fpc.getValueFromRadio(radio, form);
    	if (value != undefined){
    		return value == true || value === "true" || value === "1" || value === "sim" || value === "yes";
    	}else{
    		return undefined;
    	}
    },

    setRadioValue : function(field, value){
    	if (field != null && value != null && value != ""){
    		var inputName = field.name;
    		var fields = field.form.querySelectorAll('[name='+ inputName + ']')	
	    	for (var i = 0, length = fields.length; i < length; i++) {
	    	    if (fields[i].value === value) {
	    	        fields[i].checked = true;
	    	        break;
	    	    }
	    	}
    	}
    },

    postUrl : function (url, params) {
       if (url != undefined){
	    	var doc = document;
	    	var form = doc.createElement('form');
	        form.action = url;
	        form.method = 'POST';
	        var input = doc.createElement('input');
	        input.type = 'hidden';
	        input.name = "csrfmiddlewaretoken";
	        input.value = fpc.csrftoken;
	        form.appendChild(input);
	        for (var i in params) {
	            if (params.hasOwnProperty(i)) {
	                var input = doc.createElement('input');
	                input.type = 'hidden';
	                input.name = i;
	                input.value = params[i];
	                form.appendChild(input);
	            }
	        }
	        doc.body.appendChild(form);
	        form.submit();
       }else{
    	   throw new Error("Erro no método postUrl. Informa a url!");
       }
    },

    consultar : function (ts, lookup){
    	document.getElementById("f_dialog").dataset.lookup = lookup;
    	fpc.getJSON('/fpc.views.fpc_consultar', { ts : ts }
			).done(function(msg) {
				var doc = document;
				var param = msg.params[0]; 
				var template = param.template;
				var dlg = $("#f_dialog"); 
				dlg.html(template);
				$("#janela_modal").drags({ "handle" : "#header_modal"});
				fpcDataTable.forceRefresh = true;
				doc.getElementById("btn_abrir_dialog").click();
				$(doc.getElementById("btn_close_consulta")).on("click", function(){
					var dlg = doc.getElementById("f_dialog");
			   		dlg.removeAttribute("data-lookup");
			   		$(dlg).empty();
				})
			});
    	
    },
    
    login : function login(){
    	var doc = document;
		var f_login = doc.getElementById("f_login");
		var user = fpc.getObject(f_login);
    	fpc.postUrl("/fpc.views.fpc_login", user);
    },

   	retornaRegistroConsulta : function (){
   		var doc = document;
   		var dat = doc.getElementById("dados_pesquisa_consulta").dataset; 
   		var lookup_key = dat.id;
   		if (lookup_key === ""){
   			alert('Selecione um registro primeiro!');
   			return;
   		}
   		var dlg = doc.getElementById("f_dialog");
   		var lookup = doc.getElementById(dlg.dataset.lookup);
   		lookup.dataset.key = lookup_key;
   		lookup.value = dat.value;
   		doc.getElementById("btn_close_consulta").click();
   	},
  	
   	selecionaRegistroConsultaEvent : function selecionaRegistroConsultaEvent(id){
		document.getElementById("dados_pesquisa").dataset.id = id;
	},
    
        
    getCookie : function (name) {
        var doc = document;
    	var cookieValue = null;
        if (doc.cookie && doc.cookie !== '') {
            var cookies = doc.cookie.split(';');
            for (var i = 0, len = cookies.length; i < len; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },    

    somenteNumeros : function (field){
        $(field).on('keypress', function(event){
    		var charCode = event.charCode;
    		var keyCode = event.keyCode;
        	if (charCode === 0 && keyCode > 0){ 
    			return true;
    		}
    		if (!(charCode >= 48 && charCode <= 57)){
                return false;
            }
            return true;
        });
    },

    formatDecimal : function (field){
    	try{
    		var field_value = field.value; 
			if (field_value === ""){
				return;
			}
    		if (field_value.charAt(field_value.length-1) === ","){
        		field.value = field_value.substring(0, field_value.length-1);
        	}
        	field.value = parseFloat(field_value.replace(",", ".")).toFixed(field.dataset.decimalPlaces).replace(".", ",");
        	if (field.value.length > this.maxLength){
        		alert("Valor " + field.value + " maior que o tamanho do campo!");
        		field.value = "";
        	}
    	}catch (e){
    		// ignora qualquer erro de processamento
    	}
    },
    
    somenteCaixaAlta : function (field){
    	$(field).focusout(function() {
            this.value = this.value.toLocaleUpperCase();
        });
    },
    
    somenteDecimal : function (field){
    	 $(field).on('keypress', function(event){
        	if (event.charCode === 0 && event.keyCode > 0){ 
        			return true;
        	}
         	var charCode = event.charCode;
             if ((charCode >= 48 && charCode <= 57) || (charCode == 44)){
             	var value = field.value;
             	var idxVirgula = value.indexOf(",", 0);

                 // Digitou separador decimal
                 if (charCode == 44){
                     if (idxVirgula == -1){
                         return true;
                     }
                     else{
                         return false;
                     }
                 }

                 if (idxVirgula != -1){
                     var sCentavos = value.substring(idxVirgula+1);
                     if (sCentavos.length == this.dataset.decimalPlaces && value.selectionStart == value.length){
                         return false;
                     }
                 }

                 return true;
             }
             return false;
         });
         
         $(field).on('change', function (event){
     		if (this.value.length !== 0){
	        	fpc.formatDecimal(this);
        	}
         }); 
    },

    somenteData : function (field){
    	$(field).on('keydown', function (event){
        	try{
        		if (event.charCode === 0 && event.keyCode === 9 && field.value.length !== 0 && field.value !== "" && field.value !== "__/__/____"){
		        	fastForm.isDate(field.value);
	        	}
	        	return true;
        	}catch (e){
        		// ignora qualquer erro de processamento
        		return true;
        	}
    	});
	},
    
    isDate : function(txtDate)
    {
      var currVal = txtDate;
      if(currVal === '' || currVal.length !== 10){
        return false;
      }
       
      // Regex 
      var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
      var dtArray = currVal.match(rxDatePattern); // is format OK?
     
      if (dtArray === null){
         return false;
      }
      
      // Verifica para mm/dd/yyyy format.
      var dtDay = dtArray[1];
      var dtMonth= dtArray[3];
      var dtYear = dtArray[5];
     
      if (dtMonth < 1 || dtMonth > 12){
    	  alert("Atenção: A data " + currVal + " não é válida!");
          return false;
      }
      else if (dtDay < 1 || dtDay> 31){
    	  alert("Atenção: A data " + currVal + " não é válida!");
          return false;
      }
      else if ((dtMonth === 4 || dtMonth === 6 || dtMonth === 9 || dtMonth === 11) && dtDay === 31){
    	  alert("Atenção: A data " + currVal + " não é válida!");
          return false;
      }
      else if (dtMonth == 2)
      {
         var isleap = (dtYear % 4 === 0 && (dtYear % 100 !== 0 || dtYear % 400 === 0));
         if (dtDay> 29 || (dtDay === 29 && !isleap)){
        	 alert("Atenção: A data " + currVal + " não é válida!");
              return false;
         }
      }
      
      // Limite inferior
      if (dtYear < 1900){
    	  alert("Atenção: Você informou uma data muito antiga!");
      }
      
      var anoFuturo = new Date().getFullYear()+10;
      
      // Avisa se informado uma data futura
      if (dtYear > anoFuturo){
    	alert("Atenção: Você informou uma data superior a 10 anos!");
      }
      
      return true;
    },

   
    fieldChanged : function (field){
    	$(field).on("change", function() {
    		if (fpc.isFieldChanged(this) || this.type == "radio"){
    			if (this.dataset.default != undefined && this.value === ""){
    				this.value = this.dataset.default;
    			}
    			this.dataset.dirty = true;
    			
    			var operacao = document.getElementById("barra_botao").dataset.tipo;
    			var field_name = this.dataset.field;
    			 
        		// sincroniza campos com o mesmo field (não para radio)
    			if (this.type != "radio"){
	    			var list_fields = $.makeArray(this.form.querySelectorAll('[data-field]'));
					for (var i = 0, len = list_fields.length; i < len; i++){
						var field = list_fields[i];
	    				if (field != this && field.dataset.field === field_name){
	    					field.value = this.value;
	    					field.dataset.dirty = true;
	    				}
	    			}
    			}
    			
    			// dispara o evento onchange no servidor e depois onchange no cliente
    			if (this.dataset.onChange != undefined){
    				fpc.fieldChangedServer(this, operacao);
    		    }else{
    		    	fpc.fieldChangedClient(this, operacao);
    		    }
    		}
		});
    },
    
    fieldChangedClient : function(field, operacao){
		var doc = document;
		var form = field.form;
		if (form.dataset.jsclass == undefined){
			form = doc.querySelectorAll('[data-jsclass]')[0];
		}
    	if (form != undefined){
    		var js_class = form.dataset.jsclass;
			this.fireOnChange(js_class, field, operacao);
		}
    },

    fieldChangedServer : function (field, operacao){
    	var doc = document;
    	var dat = doc.getElementById("dados_pesquisa").dataset;
		var f_cadastro = doc.getElementById("f_cadastro");
		var s_form = fpc.serializeForm(f_cadastro);
    	doc.body.style.cursor = "wait"; 
		fpc.getJSON("/fpc.views.fpc_field_onchange", { ts : dat.ts, 
		 											   id : dat.id, 
													   form : s_form,
													   field : field.dataset.field,
													   field_id : field.id,
													   operacao : operacao}
		).done(function (msg) {
			var doc = document;
			doc.body.style.cursor = "default"; 
			var param = msg.params[0];
			var field = doc.getElementById(param.field_id);
			var operacao = param.operacao;
			var update_fields = param.update_values;
			fpc.updateFields(field.form, update_fields);
			fpc.fieldChangedClient(field, operacao);
        });
    },

    updateFields : function(form, update_fields){
    	if (form != undefined && update_fields != undefined){
	    	try{
		    	var list_fields = $.makeArray(form.querySelectorAll('[data-field]'));
		    	for (var field_update in update_fields){
		    		var value = update_fields[field_update];
		    		var is_object = typeof value  === "object";
					for (var i = 0, len = list_fields.length; i < len; i++){
						var field = list_fields[i];
						var dat = field.dataset;
						var field_name = field.dataset.field;
						if (field_name === field_update || ((field_name === "id" && field_update == "pk") || (field_name === "pk" && field_update == "id"))){
							if (is_object){
								field.value = value.desc;
								field.dataset.value = value.id;
							}else{
								switch (dat.type){
									case "radio":
										fpc.setRadioValue(field, value);
										break;
									case "combobox", "dropdown", "select":
						            	value = dat.key;
										fpc.setComboboxValue(field, value);
							            break;
							         default:
							        	field.value = value;
								}
									
							}
							field.dataset.dirty = true;
						}
					}
				}
			}catch (e){
				fpc.mensagem("Erro no método updateFields do formulário "+ form.id  + ". " + e + ".", "erro");
			}
    	}
    },
    
    resetFields : function(form){
    	if (form != undefined){
	    	var list_fields = $.makeArray(form.querySelectorAll('[data-field]'));
			for (var i = 0, len = list_fields.length; i < len; i++){
				var field = list_fields[i];
				field.dataset.value = fpc.getFieldValue(field);
				if (field.dataset.dirty != undefined){
					field.removeAttribute("data-dirty"); 
				}
			}
    	}
    },

    fireOnReadyEvent : function(field, operacao){
		var controller = fpc.findController();
		if (controller != undefined && controller.onready != undefined){
			try{
				controller.onready(field, operacao);
			}catch (e){
				fpc.mensagem("Erro no evento onready do campo " + field + ". " + e + ".", "erro");
			}
		}
    },
    
    fireOnGetFiltroPesquisa : function(controller, filtro_atual){
		if (controller != undefined && controller.ongetfiltropesquisa != undefined){
			try{
				return controller.ongetfiltropesquisa(filtro_atual);
			}catch (e){
				fpc.mensagem("Erro no evento ongetfiltropesquisa:" + e + ".", "erro");
			}
		}else{
			return filtro_atual;
		}
    },
    
    fireOnChange : function(js_class, field, operacao){
		if (js_class != undefined && field != undefined){
			var controller = fpc.findController(js_class);
			if (controller != undefined && controller.onchange != undefined){
				try{
					controller.onchange(field, operacao);
				}catch (e){
					fpc.mensagem("Erro no evento onchange do campo " + field + ". " + e + ".", "erro");
				}
			}
		}
    },

    fireOnFormatObject : function(obj, controller){
		if (obj != undefined){
	    	if (controller == undefined){
				var controller = fpc.findController(js_class);
			}
			if (controller != undefined && controller.on_format_object != undefined){
				try{
					controller.on_format_object(obj);
				}catch (e){
					fpc.mensagem("Erro na formatação dos campos do objeto (no evento on_format_object). " + e + ".", "erro");
				}
			}
		}
    },
    
    fireOnFormatCellDataTable : function(field, type, value, row, col, html_row, controller){
    	if (field != undefined && value != undefined){ 
	    	if (controller == undefined){
				var controller = fpc.findController(js_class);
			}
			if (controller != undefined && controller.on_format_cell_datable != undefined){
				try{
					return controller.on_format_cell_datable(field, type, value, row, col, html_row);
				}catch (e){
					fpc.mensagem("Erro na formatação dos dados ("+ value + ") do campo "+ field + " da grid (no evento on_format_cell_datable). " + e + ".", "erro");
				}
			}
			return value;
    	}else{
    		return "";
    	}
    },    

    fireOnOpenForm : function(js_class, response){
    	if (js_class != undefined){
			var controller = fpc.findController(js_class);
			if (controller != undefined && controller.on_open_form != undefined){
				try{
					controller.on_open_form(response);
				}catch (e){
					fpc.mensagem("Erro ao abrir formulário (no evento on_open_form). " + e + ".", "erro");
				}
			}
    	}
    },
    
    fireOnRenderLazyField : function(field){
		var controller = fpc.findController();
		if (controller != undefined && controller.on_render_lazy_field != undefined){
			try{
				controller.on_render_lazy_field(field);
			}catch (e){
				fpc.mensagem("Erro ao renderizar campo lazy (no evento on_render_lazy_field). " + e + ".", "erro");
			}
		}
    },

    findController : function(js_class){
		var doc = document;
		try{
			if (js_class == undefined){
	    		var f_state = doc.getElementById("f_state");
	    		if (f_state != undefined){
	    			var js_class = f_state.dataset.jsclass;
	    		}
			}
	    	if (js_class != undefined && js_class.length > 4){
				var js_var = js_class.substr(0,1).toLowerCase() + js_class.substr(1); 
				var js_obj = window[js_var];
				if (js_obj == undefined){
					js_var = js_class.substr(0,1).toLowerCase() + js_class.substr(1,js_class.length-5) + "Controller";
					var js_obj = window[js_var];
					if (js_obj == undefined){
						var js_obj = window[js_class];
					}
				}
				return js_obj;
			}
		}catch (e){
			fpc.mensagem("Erro ao localizar controller do formulário. " + e + ".", "erro");
			return undefined;
		}
    },
    
    findBaseController : function(js_class){
		var doc = document;
		try{
			if (js_class == undefined){
	    		var f_state = doc.getElementById("f_state");
	    		if (f_state != undefined){
	    			var js_class = f_state.dataset.jsclassBase;
	    		}
			}
	    	if (js_class != undefined && js_class.length > 4){
				var js_var = js_class.substr(0,1).toLowerCase() + js_class.substr(1); 
				var js_obj = window[js_var];
				if (js_obj == undefined){
					js_var = js_class.substr(0,1).toLowerCase() + js_class.substr(1,js_class.length-5) + "Controller";
					var js_obj = window[js_var];
					if (js_obj == undefined){
						var js_obj = window[js_class];
					}
				}
				return js_obj;
			}
		}catch (e){
			fpc.mensagem("Erro ao localizar controller do formulário. " + e + ".", "erro");
			return undefined;
		}
    },
    
    checkRenderLazyFields : function(){
    	var lazyFields = fpc.lazyFields;
    	if (lazyFields != null){
	    	var jwin = $(window);
	    	var heightWin = jwin.scrollTop() + jwin.height();
	    	for (var i = 0, j = 0, len = lazyFields.length; i < len; i++){
	    		var field = lazyFields[i-j];
	    		if (field.dataset.lazy != undefined){
		    		var jfield = $(field);
	    			if (heightWin >= jfield.position().top && jfield.is(':visible')){
	    				field.removeAttribute("data-lazy");
	    				lazyFields.splice(i, 1);
	    				++j;
	    				fpc.fireOnRenderLazyField(field);
	    				//fpc.renderLazyField(field);
	    			}
	    		}
	    	}
	    	if (lazyFields.length == 0){
	    		fpc.lazyFields = null;
	    		$(document).off("scroll", fpc.checkRenderLazyFields);
	    	}
    	}
    	
    },
    
    
    renderLazyField : function(field){
    	var doc = document;
    	var dat = doc.getElementById("dados_pesquisa").dataset;
		var f_cadastro = doc.getElementById("f_cadastro");
		var s_form = fpc.serializeForm(f_cadastro);
		var operacao = doc.getElementById("barra_botao").dataset.tipo;
    	doc.body.style.cursor = "wait"; 
		fpc.getJSON("/fpc.views.fpc_lazy_field", { ts : dat.ts, 
												 id : dat.id, 
												 form : s_form,
												 field : field.dataset.field,
												 field_id : field.id,
												 operacao : operacao}
		).done(function (msg) {
			var doc = document;
			doc.body.style.cursor = "default"; 
			var param = msg.params[0];
			var field = doc.getElementById(param.field_id);
			var operacao = param.operacao;
			var content = param.content;
			$(field).html(content);  
        });
    },
    
    configFields : function(form, operacao){
		var list_fields = $.makeArray(form.querySelectorAll('[data-field]'));
        if (operacao === "edicao" || operacao === "update" || operacao === "put"){
        	operacao = "put";
        }else if (operacao === "novo" || operacao === "insert" || operacao === "post"){
        	operacao = "post";
        }
        var jdoc = $(document); 

        // Inicializa a lista de campos lazy e remove o handler scroll 
        fpc.lazyFields = new Array();
        jdoc.off('scroll', fpc.checkCheckRenderLazyFields);

        // Configura cada field conforme seu tipo (data-type) 
        for (var i = 0, len = list_fields.length; i < len; i++){
        	var input = list_fields[i];
            if (input.type != undefined){
	        	try{
		        	var dat = input.dataset;
		            var data_type = dat.type;
		            input.style.backgroundColor="white";
		            if (data_type != undefined && data_type !== null){
			              data_type = data_type.toLowerCase();
			              if (data_type === "numero"  || 
			            	  data_type === "number"  || 
			            	  data_type === "integer" || 
			            	  data_type === "int"){
			            	  	dat.type = "numero";
				 	         	this.somenteNumeros(input);
			              } 
			              else if (data_type === "decimal"  || 
			            		   data_type === "money"    || 
			            		   data_type === "currency" || 
			            		   data_type === "real"     || 
			            		   data_type === "double") {
			            	  dat.type = "decimal";
			        	  	  this.somenteDecimal(input);
			              }
			              else if (data_type === "data" || data_type === "date"){
			            	  $(input).mask("99/99/9999");
			            	  dat.type = "data";
			            	  input.setAttribute("size", 12);
			            	  this.somenteData(input);
			              }else if (data_type === "text"    || 
			            		  	data_type === "texto"   || 
			            		  	data_type === "string"  ||
			            		  	data_type === "char"){
			            	  dat.type = "text";
			            	  if (dat.caixaAlta != undefined){
			            		  this.somenteCaixaAlta(input);
			            	  }
			            	  if (dat.mascara != undefined){
			            		  $(input).mask(dat.mascara, {placeholder: dat.mascaraPlaceholder});
			            	  }
			              }else if (data_type === "combobox" || 
			            		  	data_type === "dropdown" || 
			            		  	data_type === "select"){
			            	  dat.type = "combobox";
			              } else if (data_type === "grid"){
			            	  
			              }
		            } 
		
		           if (dat.lazy != undefined){
		        	  fpc.lazyFields.push(input);
		           }
		          
		           if (operacao === "put" && dat.noEditable != undefined){
		            	input.setAttribute("readonly", "readonly");
		            	input.style.backgroundColor="LightYellow";
		           }
		
		           if (operacao === "post" && dat.noInsertable != undefined){
		            	input.setAttribute("readonly", "readonly");
		          	    input.style.backgroundColor="LightYellow";
		           }
		          
	           	  fpc.fireOnReadyEvent(input, operacao);
		
	        	  var label = fpc.getLabelFromField(input);
	           	  if (label != undefined){
	        	      label.style.fontWeight="";
	        	  }
	           	  if (dat.required != undefined && (operacao == "post" || operacao == "putt")){
		        	  if (label != undefined){
		        	      label.style.fontWeight="bold";
		        	  }
		           }
		          
		           this.fieldChanged(input);
	
	            }catch (e){
					fpc.mensagem("Erro ao configurar campo " + input.id + " (no metodo configFields). " + e + ".", "erro");
				}
            }
        }

        // Configura datatimepicker
        $('.form_datetime').datetimepicker({
        	language: 'pt-BR',
            weekStart: 1,
            todayBtn:  1,
    		autoclose: 1,
    		todayHighlight: 1,
    		startView: 2,
    		forceParse: 0,
            showMeridian: 1
        });
    	$('.form_date').datetimepicker({
            language:  'pt-BR',
            weekStart: 1,
            todayBtn:  1,
    		autoclose: 1,
    		todayHighlight: 1,
    		startView: 2,
    		minView: 2,
    		forceParse: 0
        });
    	$('.form_time').datetimepicker({
            language:  'pt-BR',
            weekStart: 1,
            todayBtn:  1,
    		autoclose: 1,
    		todayHighlight: 1,
    		startView: 1,
    		minView: 0,
    		maxView: 1,
    		forceParse: 0
        });

    	
    	// Se existe algum campo lazy devemos monitorar quando carrega-lo
    	if (fpc.lazyFields.length > 0){
    		fpc.checkRenderLazyFields();
            jdoc.on('scroll', fpc.checkRenderLazyFields);
    	}else{
    		fpc.lazyFields = null;
    	}
    	
    },
    
    getLabelFromField : function(field){
    	var label = undefined;
    	if (field != undefined){
	    	if (field.id != undefined){
	    		label = field.form.querySelector('label[for="'+ field.id + '"]');
	    	}else if (field.name != undefined){
	    		label = field.form.querySelector('label[for="'+ field.name + '"]');
	    	}
    	}
    	return label;
    },
    
    validaForm : function (form){
    	if (form != undefined){
	        var fieldLabels = [];
	        var fieldRequeridos = $(form).find(':input[data-required]');
	        for (var i = 0, len = fieldRequeridos.length; i < len; i++){
	            var field = fieldRequeridos[i];
	            var field_value = fpc.getFieldValue(field);
	            if ((field_value === "" || field_value == undefined) && field.dataset.autoIncrement == undefined){
	            	var label = this.getLabelFromField(field);
	                if (label !== undefined && label !== null){
	                	var titulo = label.firstChild.textContent;
	                	if (fieldLabels.indexOf(titulo) == -1){
	                		fieldLabels.push(titulo);
	                		
	                		// Adiciona o marcador de erro no input
	                		$(field.parentElement.parentElement).addClass("has-error");
	                		$(field.parentElement.parentElement).addClass("has-feedback");
	                		$(field).after('<span class="glyphicon glyphicon-remove form-control-feedback"></span>')
	                	}
	                }
	            }
	        }
	
	        // limpar as mensagens anteriores se existir
	        fpc.mensagem(""); 
	
	        if (fieldLabels.length > 0){
	        	fpc.mensagem("Campos com o título em negrito são obrigatórios.", "warn");
	            if (fieldLabels.length == 1){
	            	fpc.mensagem(fieldLabels + ' não foi informado.', "erro");
	            }else{
	                fieldLabels = fieldLabels.join(", ");
	            	fpc.mensagem(fieldLabels + ' não foram informados.', "erro");
	            }
	
				// Refaz a validação após realizada edição
	    		$(form).one("change", function(event){
	    			$(this.getElementsByClassName('form-control-feedback')).remove();
	    			$(this.getElementsByClassName('has-error')).removeClass("has-error has-feedback");
	    			fpc.validaForm(this);
				});
	            
	            return false;
	        }
	        
	        return true;
    	}else{
    		return undefined;
    	}
    },    
    
    getQueryStringFromForm : function(form){
    	if (form != undefined){
	    	var fields = $(form).find("input[type='text']");
	    	var result = "";
	    	for (var i = 0, len = fields.size(); i < len; i++){
	    		var f = fields[i];
	    		if (f.value.trim() !== ""){ 
	    			result += f.id + "=" + escape(f.value) + "&";
	    		}
	    	}
	    	if (result !== ""){
	    		result = result.slice(0, result.length-1);
	    	}
	    	return result;
    	}else{
    		return undefined;
    	}
    },

    isFieldChanged : function(field){
    	if (field != undefined){
	    	var dat = field.dataset;
	    	var dfield = dat.field;
	    	if (dfield === "id" || dfield === "pk"){
	    		return true;
	    	}
			var field_type = field.type;
			if (field_type === "radio"){
				var field_value = fpc.getValueFromRadio(field.name, field.form); 
	    		if (field_value != undefined && field_value !== dat.value){
	       			return true;
	    		}
			} else if (field_type === "select-one"){
				var field_value = fpc.getValueFromCombobox(field);
	    		if (field_value != undefined && field_value !== dat.value){
	       			return true;
	    		}
			}else{
		    	if (dat.type === "lookup"){
					var dat_key = dat.key; 
		    		if (dat_key != undefined && dat.value !== dat_key){
						return true;
					}
				}else {
					var field_value = field.value;
					if (dat.type === "data" && field_value !== dat.value){
						return true;
					}else if (field_value != undefined && field_value !== dat.value){
		       			return true;
		    		}
				}
			}
			return false;
    	}else{
    		return undefined;
    	}
    },

    getFieldValue : function(field){
    	var dat = field.dataset;
		var field_type = field.type;
		if (field_type === "radio"){
			var field_value = fpc.getValueFromRadio(field.name, field.form); 
    		return field_value;
		} else if (field_type === "select-one"){
			var field_value = fpc.getValueFromCombobox(field);
    		return field_value;
		}else{
	    	if (dat.type === "lookup"){
				var dat_key = dat.key; 
	    		return dat_key;
			}else {
				var field_value = field.value;
				if (dat.type === "data" && field_value === "__/__/____"){
					return undefined;
				}
				return field_value;
			}
		}
		return false;
    },
    
    getObjectAsJson : function(form, all_fields){
    	var obj = this.getObject(form, all_fields);
    	return obj == undefined ? "{}" : JSON.stringify(obj);
    },
    
    getObject : function(form, all_fields){
    	if (form != undefined){
	    	try{
		    	var list_fields = $.makeArray(form.querySelectorAll('[data-field]'));
		    	var obj = {};
		    	var fields_dirty = [];
		    	var all_fields = all_fields != undefined && all_fields;
		    	for (var i = 0, len = list_fields.length; i < len; i++){
		    		var field = list_fields[i];
		    		// se o field estiver em outro form ou for undefined não serializar 
		    		if (field.form != form || field.type == undefined){
		    			continue; 
		    		}
		    		var dat = field.dataset;
		    		var dfield = dat.field;
		    		var dtype = dat.type;
		    		if (dfield != undefined && (fpc.isFieldChanged(field) || all_fields) && fields_dirty.indexOf(dfield) == -1) {
		    			if (dtype === "lookup"){
		    				obj[dfield] = escape(dat.key);
			    		}else {
			    			var field_type = field.type;
			    			if (field_type === "radio"){
			    				var value = fpc.getValueFromRadio(field.name, form);
			    				if (value != undefined){ 
			    					obj[dfield] = value;
			    				}
			    			} else if (field_type === "select-one"){
			    				var value = fpc.getValueFromCombobox(field);
			    				if (value != undefined){
			    					obj[dfield] = value;
			    				}
			    			}else{
			    				if (dtype === "decimal"){
			    					obj[dfield] = field.value.replace(",", ".");
			    				}else{
			    					obj[dfield] = field.value;
			    				}
			    			}
			    		}
			    		fields_dirty.push(dfield);
		    		}
		    	}
		    	if (fields_dirty.length > 0){
		    		return obj;
		    	}else{
		    		return undefined;
		    	}
	        }catch (e){
				fpc.mensagem("Erro ao serializar objeto do form "+ form.id + "(no metodo getObject). " + e + ".", "erro");
			}
    	}else{
    		return undefined;
    	}
    },
    
    serializeForm : function(form){
    	if (form != undefined){
    		try{
	    		var list_fields = $.makeArray(form.querySelectorAll('[data-field]'));
		    	var result = [];
		    	var fields_dirty = [];
		    	for (var i = 0, len = list_fields.length; i < len; i++){
		    		var field = list_fields[i];
		    		// se o field estiver em outro form não serialize 
		    		if (field.form != form){
		    			continue; 
		    		}
		    		var dat = field.dataset;
		    		var dfield = dat.field;
		    		if (dfield != undefined && fpc.isFieldChanged(field) && fields_dirty.indexOf(dfield) == -1) {
		    			result.push(dfield);
		    			result.push("=");
		    			if (dat.type === "lookup"){
			    			result.push(escape(dat.key));
			    		}else {
			    			var field_type = field.type; 
			    			if (field_type === "radio"){
			    				value = fpc.getValueFromRadio(field.name);
			    				if (value != undefined){ 
			    					result.push(escape(value));
			    				}
			    			} else if (field_type === "select-one"){
			    				value = fpc.getValueFromCombobox(field);
			    				if (value != undefined){
			    					result.push(escape(value));
			    				}
			    			}else{
			    				if (dtype === "decimal"){
			    					result.pusth(field.value.replace(",", "."));
			    				}else{
				    				result.push(escape(field.value));
			    				}
			    			}
			    		}
			    		result.push("&");
			    		fields_dirty.push(dfield);
		    		}
		    	}
		    	if (result.length > 0){
		    		result.pop();
		    	}
		    	return result.join("");
	        }catch (e){
				fpc.mensagem("Erro ao serializar objeto do form "+ form.id + "(no metodo serializeForm). " + e + ".", "erro");
			}
    	}else{
    		return "";
    	}
    },
    
    serializeFormParaPesquisa : function(form){
    	var fields = $.makeArray(form.getElementsByClassName("form-control"));
    	var result = "";
    	if (fields.length > 0){
	    	for (var i = 0, len = fields.length; i < len; i++){
	    		var f = fields[i];
	    		var dat = f.dataset;
	    		var dfield = dat.field;
	    		if (dfield != undefined){
	        		var dtype = dat.type; 
	    			var value = f.value;
	    			if (dtype != undefined && value != undefined){
			    		if (dtype === "lookup"){
			    			var dkey = dat.key;
			    			if (dkey != undefined && value.trim() !== ""){
			    				result += dfield + ":" + escape(dkey) + ".@.";
			    			}
			     		}else {
			    			if (value.trim() !== "" && value !== "-" && value !== "-1"){
				       			result += dfield + ":" + escape(value) + ".@.";
				    		}
			    		} 
	    			}
	    		}
	    	}
	    	if (result !== ""){
	    		result = result.slice(0, result.length-3);
	    	}
    	}
    	return result;
    },

    exibeMenu : function exibeMenu(sistema){
    	fpc.getJSON("/fpc.views.fpc_exibe_menu", { sistema: sistema })
    		.done(function(msg) {
			  var doc = document;
			  var param = msg.params[0]; 
			  var template = param.template;
			  var barra_nav = doc.getElementById("barra_nav");
			  $(barra_nav).html(template);
			  doc.getElementById("nome_sistema").textContent = param.nome_sistema;
			  $(doc.getElementById("painel_conteudo")).html('<h4 class="text-center">'+ param.nome_sistema + '<br><small>CPD</small><h4>');
			});
	},
    
    exibeAjaxTab : function exibeAjaxTab(h_tab, ts, urlOrTemplate, id_tab){
    	if (h_tab.dataset.ajax != undefined){
    		return;
    	}
    	var doc = document;
    	doc.body.style.cursor = "wait"; 

    	var url = "/fpc.views.fpc_exibe_ajax_tab";
    	var operacao = doc.getElementById("barra_botao").dataset.tipo;
		var f_cadastro = doc.getElementById("f_cadastro");
		var s_form = fpc.serializeForm(f_cadastro);
		var id_obj = doc.getElementById("dados_pesquisa").dataset.id;

    	fpc.getJSON(url, { ts : ts, 
    		  			   id_tab : id_tab, 
    					   h_tab : h_tab.id, 
    					   id_obj : id_obj, 
    					   template : urlOrTemplate, 
    					   operacao : operacao, 
    					   form : s_form }
			).done(function(msg) {
				var doc = document;
				doc.body.style.cursor = "default"; 
				var param = msg.params[0]; 
				var template = param.template;
				var id_tab = doc.getElementById(param.id_tab);
				var h_tab = doc.getElementById(param.h_tab);
				$(id_tab).html(template);
				h_tab.dataset.ajax = true;
		    });			
    },
    
    refreshCurrentTab : function(){
    	var h_tab_a = $("#id_tab_registro li[class='active'").children().first(); 
    	h_tab_a[0].removeAttribute("data-ajax");
    	h_tab_a.click();    	
    },
    
    execTs : function execTs(ts){
    	this.exibeForm('/fpc.views.fpc_executa_transacao', { ts : ts });
    },

    exibeForm : function exibeForm(url, params){
		fpc.getJSON(url, params
			).done(function(msg) {
				var doc = document;
				var param = msg.params[0]; 
				var template = param.template;
				var ts_id = param.ts;
				var tipoTs = param.tipoTs;
				var operacao = param.operacao;
				var isPage = param.isPage;
				var jpainel_conteudo = $("#painel_conteudo");
				jpainel_conteudo.html(template);
				if (!isPage){
					jpainel_conteudo.find("form").each(function(){ 
						fpc.configFields(this, operacao); 
					}); 
					$(function () {
				 	      $('#id_tab_registro a:first').tab('show');
				 	      var dat = document.body.dataset;
				 	      var f_state = doc.getElementById("f_state");
				 	      dat.ts = ts_id;
				 	      dat.tipoTs = tipoTs;
				 	      if (f_state != undefined){
							 var js_class = f_state.dataset.jsclass;
							 var js_class_base = f_state.dataset.jsclassBase;
							 if (js_class_base != undefined && js_class_base === "FpcCrud"){
								fpc.montaBarraBotao("pesquisa"); 
							 }
							 if (js_class != undefined){
								fpc.fireOnOpenForm(js_class, msg);		
							 }
				 	      }
					});
				}else{
					System.import('app/main')
				        .then(null, console.error.bind(console));

				}
			});
    },
   
    mensagem : function mensagem(msg, tipo){
		var alerta = $("#alerta");
    	if (alerta != undefined) {
			if (msg != undefined && msg !== "") {
				var msg_text = "";
				
				// Cria a tag do alerta se necessário
				if (alerta.length === 0){
					$("#sep_breadcrumb").after("<div id='alerta' style='display:none'/>");
					alerta = $("#alerta");
				}
	
				// adiciona todas as mensagens na tag alerta
				if (msg instanceof Array){
					for (var i in msg){
						var str = '<i class="glyphicon glyphicon-remove" style="color: #a94442;"/>' + msg[i];
						msg_text += "<span>"+ str + "</span>";
					}
					if (msg_text != ""){
						alerta.append(unescape(msg_text));
					}
				}else if (msg instanceof Object){
					var message = msg.message;
					if (message != undefined){
						var msg_text = '<span><i class="glyphicon glyphicon-remove" style="color: #a94442;"/>' + message + '</span>';
					}else{
						var warnings = msg.warnings; 
						if (warnings != undefined){
							for (var i in warnings){
								var str = '<i class="glyphicon glyphicon-warning-sign"/>' + warnings[i].msg;
								msg_text += "<span>"+ str + "</span>";
							}
						}
		
						var infos = msg.infos; 
						if (infos != undefined){
							for (var i in infos){
								var str = '<i class="glyphicon glyphicon-ok"/>' + infos[i].msg;
								msg_text += "<span>"+ str + "</span>";
							}
						}
		
						var errors = msg.errors; 
						if (errors != undefined){
							for (var i in errors){
								var str = '<i class="glyphicon glyphicon-remove" style="color: #a94442;"/>' + errors[i].msg;
								msg_text += "<span>"+ str + "</span>";
							}
						}
					}
					
					if (msg_text != ""){
						alerta.append(unescape(msg_text));
					}
					
				}else {
					msg = unescape(msg);
					if (tipo === "info" || tipo == undefined || tipo === "") {
						msg_text = '<i class="glyphicon glyphicon-ok"/>' + msg;
					} else if (tipo === "erro" || tipo === "error") { 
						msg_text = '<i class="glyphicon glyphicon-remove" style="color: #a94442;"/>' + msg;
					} else if (tipo === "warn" || tipo === "atencao") { 
						msg_text = '<i class="glyphicon glyphicon-warning-sign"/>' + msg;
					}
					alerta.append("<span>"+ msg_text + "</span>");
				}
				
				
				alerta.css("display", "block");
	            $('html, body').animate({
	                scrollTop: $("#painel_conteudo").offset().top-80}, 700);
				$("#f_cadastro").one("change", function(event){
					fpc.mensagem("");
				});
				
				return msg_text;
	   		}
	   		else
	   		{
				if (alerta.length > 0){
					alerta.remove();
	   			}
				return "";
	   		}
    	}
   	},
   	
   	
   	limparMensagem : function(){
		var alerta = $("#alerta");
		if (alerta != undefined && alerta.length > 0){
			alerta.remove();
		}
   	},
   	
   	parcialUpdate : function parcialUpdate(parcial_update){
   		for (i in parcial_update){
   			var obj = parcial_update[i];
   			for (var id in obj){
   				$("#"+ id).html(obj[id]);
   			}
   		}
   	},
    
   	ocultaMensagem : function ocultaMensagem(){
   		$("#alerta").css("display", "none");
   	},
   	
   	montaBarraBotao : function montaBarraBotao(tipo, param){
   		var doc = document;
   		var btnEditar = $("#btn_editar");
   		var btnVoltaLista = $("#btn_volta_lista");
   		var btnNovaPesquisa = $("#btn_nova_pesquisa");
   		var btnImprimir = $("#btn_imprimir");
   		var btnCancelar = $("#btn_cancelar");
   		var btnExcluir = $("#btn_excluir");
   		var btnExportar = $("#btn_exportar");
   		var btnPesquisar = $("#btn_pesquisar");
   		var btnNovo = $("#btn_novo");
   		var btnSalvar = $("#btn_salvar");
   		var btnVisualizar = $("#btn_visualizar");
   		var ts_id = doc.getElementById("dados_pesquisa").dataset.ts;
   		
   		btnVisualizar.hide();
   		
   		if (tipo === "pesquisa"){
   				btnVoltaLista.hide();
	   			btnSalvar.hide();
	   		   	btnNovaPesquisa.hide();
	   			btnImprimir.hide();
	   			btnEditar.hide();
	   			btnCancelar.hide();
	   			btnExcluir.hide();
	   			btnExportar.hide();
	   			btnPesquisar.show();
	   			btnNovo.show();
	   			btnNovo[0].setAttribute("onclick", "fpc.novo('"+ ts_id + "', true)");
   		}
	   	else if (tipo === "consulta"){
			btnVoltaLista.hide();
   		   	btnNovaPesquisa.hide();
   			btnPesquisar.show();
   		}else if (tipo === "lista"){
   	   			btnPesquisar.hide();
	   			btnSalvar.hide();
	   			btnVoltaLista.hide();
	   			btnImprimir.hide();
	   			btnCancelar.hide();
	   			btnExcluir.show();
	   			btnNovaPesquisa.show();
	   			btnNovo.show();
	   			btnEditar.show();
	   			btnExportar.show();
	   			btnNovo[0].setAttribute("onclick", "fpc.novo('"+ ts_id + "', false)");
   		}else if (tipo === "edicao"){
		  		btnNovaPesquisa.hide();
				btnPesquisar.hide();
				btnNovo.hide();
	   			btnImprimir.show();
	   			btnExcluir.show();
	   			btnExportar.hide();
	   			btnEditar.hide();
	   			btnVoltaLista.show();
				btnSalvar.show();
	   			btnCancelar.show();
   		}else if (tipo === "novo"){
		  		btnNovaPesquisa.hide();
				btnPesquisar.hide();
				btnNovo.hide();
	   			btnImprimir.hide();
	   			btnExcluir.hide();
	   			btnExportar.hide();
	   			// param = inclusao_direta
	   			if (param === true){
	   				btnNovaPesquisa.show();
	   			}else{
	   				btnVoltaLista.show();	
	   			}
				btnSalvar.show();
	   			btnCancelar.show();
	   			btnEditar.hide();
   		}
   		
   		var divBarraBotao = doc.getElementById("barra_botao");
   		var dat = divBarraBotao.dataset;
   		var perm = dat.perm;
   		if (perm[0] === "0"){
   			btnEditar.hide();
   			if (perm[3] === "1"){
   				if (tipo === "lista"){
   					btnVisualizar.show();
   				}
   				if (tipo === "edicao" || tipo === "novo"){
   					btnSalvar.hide();
   					btnCancelar.hide();
   				}
   			}
   		}
   		if (perm[1] === "0"){
   			btnNovo.hide();
   		}
   		if (perm[2] === "0"){
   			btnExcluir.hide();
   		}
   		dat.tipo = tipo;
   	},
   	
   	montaBarraBotaoConsulta : function montaBarraBotaoConsulta(tipo){
   		var btnNovaPesquisa = $("#btn_nova_pesquisa_consulta");
   		var btnPesquisar = $("#btn_pesquisar_consulta");
   		var btnRetornar = $("#btn_retornar_consulta");
   		
	   	if (tipo === "pesquisa"){
   		   	btnNovaPesquisa.hide();
   			btnRetornar.hide();
   		   	btnPesquisar.show();
   		}else if (tipo === "lista"){
   	   		btnPesquisar.hide();
	   		btnNovaPesquisa.show();
	   		btnRetornar.show();
   		}
   		
   	},
   	
   	novaPesquisa : function (){
   		var doc = document;
   		var dadosPesquisa = doc.getElementById("dados_pesquisa"); 
   		dadosPesquisa.style.display = "none";
   		dadosPesquisa.dataset.id = "";
   		doc.getElementById("filtro_pesquisa").style.display = "block";
   		doc.getElementById("f_cadastro").style.display = "none";
		fpc.montaBarraBotao("pesquisa");
		fpc.mensagem("", "");
   	},
   	
   	novaConsulta : function (){
   		var doc = document;
   		doc.getElementById("dados_pesquisa_consulta").style.display = "none";
		doc.getElementById("filtro_pesquisa_consulta").style.display = "block";
		fpc.montaBarraBotaoConsulta("pesquisa");
		fpc.mensagem("", "");
   	},

   	voltarParaLista : function (){
   		var doc = document;
   		var dat = dados_pesquisa.dataset;
   		if (dat.ult_id !== "" && dat.id === ""){
   			dat.id = dat.ult_id;
   			dat.ult_id = "";
   		}
   		doc.getElementById("dados_pesquisa").style.display = "block";
		doc.getElementById("f_cadastro").style.display = "none";
		fpc.montaBarraBotao("lista");
		fpc.mensagem("", "");
   	},

   	voltarParaListaConsulta : function (){
   		var doc = document;
   		doc.getElementById("dados_pesquisa").style.display = "block";
		doc.getElementById("f_cadastro").style.display = "none";
		fpc.montaBarraBotaoConsulta("lista");
		fpc.mensagem("", "");
   	},

   	novo : function (ts, inclusao_direta){
   		fpc.getJSON("/fpc.views.fpc_novo_cadastro", {ts : ts}
			).done(function(msg) {
				var doc = document;
				var param = msg.params[0]; 
				var update_fields = param.update_values;
				var template = param.template;
				var f_cadastro = doc.getElementById("f_cadastro");
				f_cadastro.innerHTML = template;
				fpc.updateFields(f_cadastro, update_fields);
				fpc.resetFields(f_cadastro);
				f_cadastro.style.display = "block";
				doc.getElementById("dados_pesquisa").style.display = "none";
				doc.getElementById("filtro_pesquisa").style.display = "none";
				fpc.montaBarraBotao("novo", inclusao_direta);
				fpc.configFields(f_cadastro, "novo");
				$(function () {
			 	      $('#id_tab_registro a:first').tab('show'); // focu na primeira aba após renderizar
			 	      var dados_pesquisa = document.getElementById("dados_pesquisa");
			 	      var dat = dados_pesquisa.dataset; 
			 	      dat.ult_id = dat.id;
			 	      dat.id = "";
				});
				  
			});
   	},
   	
   	editar : function (){
   		var dados_pesquisa = document.getElementById("dados_pesquisa");
   		if (dados_pesquisa.dataset.id === ""){
   			alert('Selecione um registro primeiro!');
   			return;
   		}

   		fpc.getJSON("/fpc.views.fpc_manter_cadastro", {ts : dados_pesquisa.dataset.ts, 
   													   id : dados_pesquisa.dataset.id}
			).done(function(msg) {
				var doc = document;
				var param = msg.params[0]; 
				var update_fields = param.update_values;
				var template = param.template;
				var f_cadastro = document.getElementById("f_cadastro");
				$(f_cadastro).html(template);
				$("#dados_pesquisa").css("display", "none");
				$("#filtro_pesquisa").css("display", "none");
				$(f_cadastro).css("display", "block");
				fpc.montaBarraBotao("edicao");
				fpc.configFields(f_cadastro, "edicao");
				$(function () {
					// seta o focu na primeira aba após renderizar 
  		 	        $('#id_tab_registro a:first').tab('show');
		 	        fpc.updateFields(f_cadastro, update_fields);
					fpc.resetFields(f_cadastro);

				});
				  
			});
   		
   	},
   	
   	updateGrid : function(obj_id, grid_dados){
		// Atualiza a linha do registro selecionado na grid sem fazer request
		var row_atual = null;
		var doc = document;
		// Se for uma edição atualiza o registro da grid com os dados atuais do registro   
		if (obj_id !== ""){
			row_atual = $("input[value='" + obj_id + "']").parent().parent();
			var idx_col = -1;
			row_atual.children("td").each(function(){ 
				if (idx_col > -1){
					$(this).text(grid_dados[idx_col]);
				}
				idx_col++;
			});
		}else{ // Se for inserção, adiciona o novo item na gride
			row_atual = doc.createElement("tr"); 
			fpcDataTable.forceRefresh = true;

			if ($("#dados").find("tbody").children().length > 0){
				if (fpcDataTable.idsNovos === ""){ 
					fpcDataTable.idsNovos = obj_id;
				}else{
					fpcDataTable.idsNovos += "," + obj_id;
				}

				if ($("#dados").find("tbody").children().first().hasClass("odd")){
					$(row_atual).addClass("even");
				}else{
					$(row_atual).addClass("odd");
				}
				$(row_atual).append('<td><input type="radio" name="f_id" onclick="fpc.selecionaRegistroConsultaEvent(this.value)" value="'+ obj_id + '"></td>');
				for (i in grid_dados){
					$(row_atual).append("<td>" + grid_dados[i] + "</td>");
				}
			
				$("#dados").find("tbody").children().first().before($(row_atual));
				$("#dados").find("tbody").children().first().find("input").click();
			}
		}
   	},
   	
   	excluir : function(){
   		var doc = document;
   		var divDadosPesquisa = document.getElementById("dados_pesquisa");
   		var dat = divDadosPesquisa.dataset;
   		var obj_id = dat.id;
		var f_state = doc.getElementById("f_state");
		var  service_url = f_state.dataset.serviceUrl;

		if (obj_id === "" || obj_id === "undefined"){
   			alert('Selecione um registro primeiro!');
   		}

		if (confirm("Confirma a exclusão?")){
			if (service_url != "" && service_url != undefined){
				service_url += "/" + obj_id;
				var params = {};
			}else{
				service_url = "/fpc.views.fpc_excluir_cadastro";
				var params = { ts : dat.ts, 
						   	   id : obj_id};			
			}
			
			fpc.callRest(service_url, params, "DELETE" 
				).done(function (msg) {
						var doc = document;
						if (msg.tipo === "erro" || msg.erro != undefined){
							fpc.mensagem(msg.message, "erro");
						}else{
							fpc.mensagem("Registro excluído com sucesso!", "info");
						}
				}).fail(function( jqxhr, textStatus, error ){
					fpc.mensagem(error, "error");        
			});
		}
		
   	},
   	
   	salvar : function (){
   		var doc = document;
   		var divDadosPesquisa = document.getElementById("dados_pesquisa");
   		var dat = divDadosPesquisa.dataset;
   		var obj_id = dat.id;

   		if (obj_id === "undefined" || obj_id === ""){
   			obj_id = undefined;
   		}

   		var is_edicao = (obj_id != undefined);
   		var obj = fpc.getObject(f_cadastro, !is_edicao);

		// limpa as mensagens anteriores
   		fpc.mensagem("");

   		if (obj == undefined){
   			fpc.mensagem("Nenhuma alteração realizada no cadastro para salvar.", "info");
   			return;
		}

   		if (this.validaForm(f_cadastro)){
   			var f_state = doc.getElementById("f_state");
   			var  service_url = f_state.dataset.serviceUrl;
   			var obj = JSON.stringify(obj);
			var metodo = "GET";

   			if (service_url != "" && service_url != undefined){
   				var params = obj;
   				// Eh uma edição se possui id
   				if (is_edicao){
   					service_url += "/" + obj_id;
   					metodo = "PUT";
   				}else{
					metodo = "POST";
				}
   			}else{
   				service_url = "/fpc.views.fpc_salvar_cadastro";
   				var params = { ts : dat.ts, 
   							   id : obj_id, 
   							   form : obj };
   			}
   			
   			fpc.callRest(service_url, params, metodo 
				).done(function (msg) {
						var doc = document;
						if (msg.tipo === "erro" || msg.erro != undefined){
							fpc.mensagem(msg.message, "erro");
						}else{
							if (msg.tipo == undefined){
								var update_fields = msg;
								var obj_id = msg.id; 
							}else{
								var param = msg.params[0]; 
								var update_fields = param.update_values;
								var obj_id = param.id; 
							}
							var divDadosPesquisa = doc.getElementById("dados_pesquisa");
							var is_insert = divDadosPesquisa.dataset.id == ""
							divDadosPesquisa.dataset.id = obj_id;
							fpc.updateFields(f_cadastro, update_fields);
							fpc.resetFields(f_cadastro);
							fpc.configFields(f_cadastro, "edicao");
							
							if (msg.message != undefined){
								fpc.mensagem(msg.message, "info");
							}else{
								fpc.mensagem("Registro salvo com sucesso!", "info");
							}
							
							// Força o focus para a primeira aba
							$('#id_tab_registro a:first').tab('show');

							// Atualiza a grid da pesquisa
							if (param != undefined && param.grid_dados != undefined){
								var grid_dados = JSON.parse(param.grid_dados);
								if (grid_dados != undefined){
									if (is_insert){
										fpc.updateGrid("", grid_dados);	
									}else{
										fpc.updateGrid(obj_id, grid_dados);
									}
								}
							}
						}
				}).fail(function( jqxhr, textStatus, error ){
					fpc.mensagem(error, "error");        
			});  
		}
   	},

    pesquisar : function (ts, is_consulta){
		var doc = document;
    	var frmFiltro = is_consulta ? doc.getElementById("filtro_consulta") : doc.getElementById("filtro");
    	var controller = fpc.findController();
    	var filtro = this.getObjectAsJson(frmFiltro);
		if (is_consulta){
				var id_dados_wrapper_jquery = "#dados_consulta_wrapper";
				var id_dados_pesquisa_jquery = "#dados_pesquisa_consulta";
				var id_filtro_pesquisa_jquery = "#filtro_pesquisa_consulta";
				var id_dados_jquery = "#dados_consulta";
				var event_selecionaRegistro = "' onclick='fpc.selecionaRegistroConsulta(this)'";
			}else{
				var id_dados_wrapper_jquery = "#dados_wrapper";
				var id_dados_pesquisa_jquery = "#dados_pesquisa";
				var id_filtro_pesquisa_jquery = "#filtro_pesquisa";
				var id_dados_jquery = "#dados";
				var event_selecionaRegistro = "' onclick='fpc.selecionaRegistro(this)'";
			}
		
		var tbl_dados = $(id_dados_jquery);
		var dadospesquisa = $(id_dados_pesquisa_jquery);
		dadospesquisa[0].dataset.id = "";
		dadospesquisa.css("display", "block");
		$(id_filtro_pesquisa_jquery).css("display", "none");

		if (!$(id_dados_wrapper_jquery).length){
			tbl_dados[0].dataset.html_orig = tbl_dados.html(); 
			fpcDataTable.idsNovos = "";
		}else{
			tbl_dados.dataTable().fnDestroy();
			var tbl = tbl_dados[0];
			dadospesquisa = tbl.parentNode;
			var html_tbl = tbl.dataset.html_orig; 
			var nova_tbl = doc.createElement("table");
			if (is_consulta){
				nova_tbl.setAttribute("id", "dados_consulta");
			}else{
				nova_tbl.setAttribute("id", "dados");
			}
			nova_tbl.dataset.html_orig = html_tbl;
			dadospesquisa.removeChild(tbl);
			dadospesquisa.appendChild(nova_tbl);
			tbl_dados = $(id_dados_jquery);
			tbl_dados.html(html_tbl);
			fpcDataTable.forceRefresh = true;
			fpcDataTable.idsNovos = "";
		}
		
		var f_state = doc.getElementById("f_state");
		var service_url = f_state.dataset.serviceUrl;
		if (service_url != "" && service_url != undefined){
			filtro = this.fireOnGetFiltroPesquisa(controller, filtro);
			service_url += "?ts="+ ts + "&filtro=" + filtro + "&fields=" + f_state.dataset.fieldsGrid;
			service_url = this.erlangms_url + service_url;
		}else{
			service_url = "/fpc.views.fpc_pesquisar?ts="+ ts + "&filtro='" + filtro + "'&filtroIds=''&isconsulta=" + is_consulta;
		}
		
		fpcDataTable.createDataTable(
				tbl_dados,
				service_url,
				is_consulta,
				function( nRow, aData, iDataIndex ) {
					if (nRow.firstChild != undefined){
						if (fpcDataTable.is_consulta){
			        		  nRow.onclick = function(){
			   				    	var divDadosPesquisaConsulta = document.getElementById("dados_pesquisa_consulta");  
			   				    	var chkSeleciona = this.firstChild.firstChild;
			   				    	var dat = divDadosPesquisaConsulta.dataset; 
			   				    	dat.id = chkSeleciona.value;
			   				    	dat.value = chkSeleciona.dataset.str;
			   				    	chkSeleciona.checked = true;
			   	   				};
			   	   			}else{
			   	   				nRow.onclick = function(){
			   	   					var divDadosPesquisa = document.getElementById("dados_pesquisa");
			   	   					var chkSeleciona = this.firstChild.firstChild;
			   	   					divDadosPesquisa.dataset.id = chkSeleciona.value;
			   	   					chkSeleciona.checked = true;
			   	   				};
			   	   			}
						}
					},
				function ( data, type, row, meta ) {
						var dat = meta.settings.aoHeader[0][meta.col].cell.dataset;
						var tipo = dat.type;
						if (meta.col == 0){
							return "<input class='fpc-option-grid' type='radio' name='f_id' value='"+ data + "'/>";
						}else{
							if (fpcDataTable.hasOnFormatCellDatatable){
								return fpc.fireOnFormatCellDataTable(dat.field, dat.type, data, meta.row, meta.col, row, fpcDataTable.controller);
							}else{
								var type_data = typeof data;
								switch (type_data){
									case "boolean": return data == true || data === "true" || data === "1" || data === "sim" || data === "yes" ? "Sim" : "Não";
									default: return data;
 								}
							}
						}
					},
					fpc.findController()
		);

		if (is_consulta){
				fpc.montaBarraBotaoConsulta("lista");
			}else{
				fpc.montaBarraBotao("lista");
			}
   					
	}
   	
};



///////////////////////  	fpcDataTable  	///////////////////////   



var fpcDataTable = {
		forceRefresh: false,
		idsNovos: "",
		selecionaPrimeiroReg: false,
		is_consulta: false,
		controller: undefined,
		hasOnFormatCellDatatable : false,
		
	    createDataTable : function(tbl, a_url, is_consulta, row, col, controller){
			fpcDataTable.is_consulta = is_consulta;
			fpcDataTable.controller = controller;
			fpcDataTable.hasOnFormatCellDatatable = controller != undefined && controller.on_format_cell_datable != undefined ? true : false;
			
			tbl.dataTable( {
				"deferRender": true,
				"processing": false,
				"serverSide": true,
	   	        "paginationType": "full_numbers",
		   	    "language": {
		   	    	  "processing":     "Pesquisando...",
		              "lengthMenu": "Exibir _MENU_ registros por página",
		              "zeroRecords": "Nenhum registro encontrado",
		              "info": "Exibindo _START_ até _END_ de _TOTAL_ registros",
		              "infoEmpty": "Exibindo 0 até 0 de 0 registros",
		              "infoFiltered": "(Filtrado de _MAX_ registros totais)",
		              "search": "Filtro ",
		              "paginate": {
		                  "first": "Primeira página",
		                  "last": "Última página",
		                  "next": "Próxima",
		                  "previous": "Anterior"
		                },
				   	   "aria": {
					        "sortAscending": "Ativando ordenação ascendente para a coluna",
					        "sortDescending": "Ativando ordenação decrescente para a coluna",
					    }
		          },
		          "ajax": $.fn.dataTable.pipeline( {
		              url: a_url,
		              pages: 5 
		          }),
		          "autoWidth": false,
		          "createdRow": row,
		          "columnDefs": [
		                         {
		                             // The `data` parameter refers to the data for the cell (defined by the
		                             // `data` option, which defaults to the column being worked with, in
		                             // this case `data: 0`.
		                             "render": col,
		                             "targets": "_all"
		                         },
		                     ]		          
		          
			});
	    },
		
};
 
 
$.fn.dataTable.pipeline = function ( opts ) {
    // Configuration options
    var conf = $.extend( {
        pages: 5, // number of pages to cache
        url: ''   // script url
    }, opts );
 
    // Private variables for storing the cache
    var cacheLower = -1;
    var cacheUpper = null;
    var cacheLastRequest = null;
    var cacheLastJson = null;
 
    return function ( request, drawCallback, settings ) {
        var ajax          = false;
        var requestStart  = request.start;
        var requestLength = request.length;
        var requestEnd    = requestStart + requestLength;
         
        if ( cacheLower < 0 || requestStart < cacheLower || requestEnd > cacheUpper  || fpcDataTable.forceRefresh) {
            // outside cached data - need to make a request
            ajax = true;
            fpcDataTable.forceRefresh = false;
        }
        else if ( JSON.stringify( request.order )   !== JSON.stringify( cacheLastRequest.order ) ||
                  JSON.stringify( request.columns ) !== JSON.stringify( cacheLastRequest.columns ) ||
                  JSON.stringify( request.search )  !== JSON.stringify( cacheLastRequest.search )
        ) {
            // properties changed (ordering, columns, searching)
            ajax = true;
        }
         
        // Store the request for checking next time around
        cacheLastRequest = $.extend( true, {}, request );
 
        if ( ajax ) {
            // Need data from the server
            if ( requestStart < cacheLower ) {
                requestStart = requestStart - (requestLength*(conf.pages-1));
 
                if ( requestStart < 0 ) {
                    requestStart = 0;
                }
            }
             
            cacheLower = requestStart;
            cacheUpper = requestStart + (requestLength * conf.pages);
 
            request.start = requestStart;
            request.length = requestLength*conf.pages;
 
            /* Altera o filtroIds se necessário */
    		if (fpcDataTable.idsNovos !== ""){
    			var pIdsIni = conf.url.indexOf("&filtroIds");
    			if (pIdsIni > 0){
    				var pIdsFim = conf.url.indexOf("&", pIdsIni+10);
    				if (pIdsFim == -1){
    					pIdsFim = conf.url.length;
    				}
    				var filtroIdsAntigo = conf.url.substring(pIdsIni, pIdsFim);
    				var filtroIdsNovo = "&filtroIds='"+ fpcDataTable.idsNovos + "'";
    				conf.url = conf.url.replace(filtroIdsAntigo, filtroIdsNovo);
    			}
    		}
            
            settings.jqXHR = $.ajax( {
                "url":      conf.url,
                "data":     request,
                "dataType": "json",
                "cache":    false,
                "success":  function ( json ) {
                    var controller = fpc.findController();
                    var hasOnFormatObject = (controller != undefined && controller.on_format_object != undefined);
                	var obj_json = new Object();
                    obj_json.draw = 1;
                    obj_json.recordsTotal = 1;
                    obj_json.recordsFiltered = 1;
                    /*for (row in json){
                    	if (hasOnFormatObject){
                    		fpc.fireOnFormatObject(json[row], controller);
                    	}	
                    	json[row][0] = "<input class='fpc-option-grid' type='radio' name='f_id' value='"+ json[row][0] + "'/>"; 
                    }*/
                    obj_json.data = json;
                    json = obj_json;
                	
                	cacheLastJson = $.extend(true, {}, json);
 
                    if ( cacheLower != requestStart ) {
                        json.data.splice( 0, requestStart-cacheLower );
                    }
                    json.data.splice( requestLength, json.data.length );
                     
                    drawCallback( json );
                }
            } );
        }
        else {
            json = $.extend( true, {}, cacheLastJson );
            json.draw = request.draw; // Update the echo for each response
            json.data.splice( 0, requestStart-cacheLower );
            json.data.splice( requestLength, json.data.length );
 
            drawCallback(json);
        }
    }
};
 

/////////////////////  	draggable  	///////////////////////    

(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                $('.draggable').offset({
                    top:e.pageY + pos_y - drg_h,
                    left:e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
})(jQuery);

/////////////////////  	ready  	///////////////////////

$(this).ready(function(){
  fpc.csrftoken = fpc.getCookie('csrftoken');
  $(document).ajaxSend(function(event, xhr, settings) {
        xhr.setRequestHeader("X-CSRFToken", fpc.csrftoken);
        xhr.setRequestHeader("Accept", "application/json,application/zip");
        xhr.setRequestHeader ("Authorization", "Basic " + btoa(fpc.username + ":" + fpc.password));
 	});
  System.config({
    transpiler: 'typescript', 
    typescriptOptions: { emitDecoratorMetadata: true }, 
    packages: {'app': {defaultExtension: 'ts'}} 
  });
});

var fpcConfigForm = {

	on_open_form : function(response){
		var doc = document;
		var param = response.params[0]; 
		var update_fields = param.update_fields;
		var f_form = doc.getElementById("f_form");
		fpc.updateFields(f_form, update_fields);
		fpc.resetFields(f_form);
	},
		
	salva : function(ts_id){
		fpc.mensagem("");
		var doc = document;
		var form =  doc.getElementById("f_form");
		var obj = fpc.getObject(form);
		if (obj != undefined){
			fpc.getJSON("/eliot/api1/adm/config_framework/update", {"obj" : JSON.stringify(obj)});
			fpc.mensagem("Atenção: As novas configurações somente entraram em vigor após reiniciar o servidor!", "info");
		}else{
			fpc.mensagem("Nenhuma alteração realizada nas configurações para salvar.", "info");
		}
	}

};    


var produtoForm = {

    onchange : function(field, operacao) {
        var op = operacao;
        if (op === "novo"){
        		op = "inclusão";
        }
    	//alert('O Campo "' + field.dataset.field + '" com id ' + field.id + ' foi alterado em uma '+ op + '.');
    },

    
    onready : function(field, operacao) {
        var op = operacao;
        if (op === "novo"){
        		op = "inclusão";
        }
    	//alert('O elemento "' + field.id + '" foi carregado. Operacao:  ' + op + '.');
    },
    
};    
/*
 * 
 * Classe controladora para o cadastro de valor alimentação
 * 
 */ 
class ValorAlimentacaoController extends FpcCrudController {
	 constructor() {
		    super();
		    this.type = 'basic';

			/*
			 * Cache para listas de combobox. Assim não é necessário buscar todas as vezes que a tela sofre refresh 
			 * 
			 */ 
			this.lista_campus = null;

	 }
	 
	
	/*
	 * Invocado "após" exibir o formulário. Útil para programar algo necessário após a tela já estar visível 
	 * 
	 */ 
	on_open_form(response){

	}
	
	on_format_object(obj){
		obj.pagaBeneficio = obj.pagaBeneficio ? "Sim" : "Não";  
	}


	/*
	 * Invocado para renderizar as celulas da grade de dados. Útil para formatar dados  
	 * 
	 */ 
	on_format_cell_datable(field, type, value, row, col, html_row){
		switch (field) {
			case "pagaBeneficio":  return (value || value === "true" || value === "1") ? "Sim" : "Não";
			default: return value;
		}
	}

	
	/*
	 * Invocado para renderizar o conteúdo de campos marcado como lazy. Útil para trazer os dados sem segundo plano de combobox, grids  
	 * 
	 */ 
	on_render_lazy_field(field){
		if (field.dataset.field === "campus"){
			fpc.callRestIfNull(this.lista_campus, '/sitab/campus')
				.done(function(result) {
					valorAlimentacaoController.lista_campus = result;
					fpc.fillComboboxFromArray(field, valorAlimentacaoController.lista_campus);
				});
			
		}
	}
	
    onchange(field, operacao) {
    	if (operacao != "pesquisa"){
    		// Informar valor do benefício se paga benefício está habilitado
	    	if (field.dataset.field === "pagaBeneficio"){
	    		var f_valorBeneficio = f_cadastro.querySelector('[data-field=valorBeneficio]');
	    		var b_pagaBeneficio = fpc.getValueFromRadioAsBoolean(field);
	    		f_valorBeneficio.disabled = !b_pagaBeneficio;
	    		f_valorBeneficio.value = "0.00";
	    	}
    	}
    }
    
	/*
	 * Invocado antes de realizar a pesquisa do cadastro. Pode ser utilizado para modificar o filtro antes de enviar a requisição.  
	 * 
	 */ 
    ongetfiltropesquisa(filtro_atual) {
    	return filtro_atual;
    }
    
    

};

var valorAlimentacaoController = new ValorAlimentacaoController(); 


var estudoSocioEconomicoForm = {

	on_open_form : function(response){
		var doc = document;
		var param = response.params[0]; 
		var update_fields = param.update_fields;
		var f_form = doc.getElementById("f_form");
		//fpc.updateFields(f_form, update_fields);
		//fpc.resetFields(f_form);
	},
		
		
	salva_e_avanca : function(){
    	var doc = document;
    	var f_estudo = doc.getElementById("f_estudo");
    	var dat_estudo = f_estudo.dataset;
    	switch (dat_estudo.passoAtual) {
    		case "ler_edital":
    			this.avanca_etapa();
    			break;
    		case ("estudo_preliminar"):
    			var frm = doc.getElementById('f_estudo_preliminar'); 
    			var obj = fpc.getObject(frm);
    			this.avanca_etapa();
    			break;
    		case ("dados_pessoais"):
    			var frm = doc.getElementById('f_dados_pessoais'); 
				var obj = fpc.getObject(frm);
				this.avanca_etapa();
				break;
    		case ("dados_familiares"):
    			var frm = doc.getElementById('f_dados_familiares'); 
				var obj = fpc.getObject(frm);
				this.avanca_etapa();
    			break;
    		default:
    			throw new Error("Erro ao obter o formulário atual do questionário socioeconômico");
    	}
	},
		
    avanca_etapa : function(){
    	var doc = document;
    	var f_estudo = doc.getElementById("f_estudo");
    	var dat_estudo = f_estudo.dataset;
    	switch (dat_estudo.passoAtual) {
    		case "ler_edital":
    		    if (doc.getElementById('f_aceite').checked){
    		        doc.getElementById('f_estudo_preliminar').style.display = '';
    		        doc.getElementById('f_ler_edital').style.display = 'none';
    		        doc.getElementById("f_estudo").dataset.passoAtual = "estudo_preliminar";
    		    }else{
    		    	alert("Você deve ler o edital primeiro!");
    		    }
    		    break;
    		case ("estudo_preliminar"):
    			doc.getElementById('f_dados_pessoais').style.display = '';
    			doc.getElementById('f_estudo_preliminar').style.display = 'none';
    			doc.getElementById("f_estudo").dataset.passoAtual = "dados_pessoais";
    			break;
    		case ("dados_pessoais"):
    			doc.getElementById('f_dados_familiares').style.display = '';
    			doc.getElementById('f_dados_pessoais').style.display = 'none';
    			doc.getElementById("f_estudo").dataset.passoAtual = "dados_familiares";
    			break;
    		case ("dados_familiares"):
    			doc.getElementById('f_bens').style.display = '';
    			doc.getElementById('f_dados_familiares').style.display = 'none';
    			doc.getElementById("f_estudo").dataset.passoAtual = "bens";
    			break;
    		default:
    			throw new Error("Erro ao obter o formulário atual do questionário socioeconômico");
    	}
    },
    
    volta_etapa : function(){
    	var doc = document;
    	var f_estudo = doc.getElementById("f_estudo");
    	var dat_estudo = f_estudo.dataset;

    	switch (dat_estudo.passoAtual) {
    		case "ler_edital":
    			 window.history.back();
    		    break;
    		case ("estudo_preliminar"):
    			doc.getElementById('f_ler_edital').style.display = '';
    			doc.getElementById('f_estudo_preliminar').style.display = 'none';
    			doc.getElementById("f_estudo").dataset.passoAtual = "ler_edital";
    			break;
    		case ("dados_pessoais"):
    			doc.getElementById('f_estudo_preliminar').style.display = '';
    			doc.getElementById('f_dados_pessoais').style.display = 'none';
    			doc.getElementById("f_estudo").dataset.passoAtual = "estudo_preliminar";
    			break;
    		case ("dados_familiares"):
    			doc.getElementById('f_dados_pessoais').style.display = '';
    			doc.getElementById('f_dados_familiares').style.display = 'none';
    			doc.getElementById("f_estudo").dataset.passoAtual = "dados_pessoais";
    			break;
    		case ("bens"):
    			doc.getElementById('f_dados_familiares').style.display = '';
    			doc.getElementById('f_bens').style.display = 'none';
    			doc.getElementById("f_estudo").dataset.passoAtual = "dados_familiares";
    			break;
    		default:
    			throw new Error("Erro ao obter o formulário atual do questionário socioeconômico");
    	}
    },
    
    get_form_etapa_atual : function(){
    	var doc = document;
    	var f_estudo = doc.getElementById("f_estudo");
    	var dat_estudo = f_estudo.dataset;
    	switch (dat_estudo.passoAtual) {
    		case "ler_edital":	return doc.getElementById('f_ler_edital'); 
    		case ("estudo_preliminar"): return doc.getElementById('f_estudo_preliminar'); 
    		case ("dados_pessoais"): return doc.getElementById('f_dados_pessoais'); 
    		case ("dados_familiares"): return doc.getElementById('f_dados_familiares');
    		case ("bens"): return doc.getElementById('f_bens'); 
    		default: throw new Error("Erro ao obter o formulário atual do questionário socioeconômico");
    	}
    }
    
};    

