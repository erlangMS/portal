"use strict";

function FpcError(message, url, params) {
    this.name = "FpcError";
    this.message = message + "\nRequest: " + url + "\nParams: "+ JSON.stringify(params) + ")";						
}
FpcError.prototype = Error.prototype;


var fpc = {
    csrftoken : "",
    lazyFields : null,

    
    postUrl : function (url, params) {
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
                input = doc.createElement('input');
                input.type = 'hidden';
                input.name = i;
                input.value = params[i];
                form.appendChild(input);
            }
        }
        doc.body.appendChild(form);
        form.submit();
    },

   	getJSON : function(url, params){
   		return $.getJSON(url, params
			).done(function(msg) {
				var doc = document;
				if (msg.tipo === "erro"){
					doc.body.style.cursor = "default"; 
					msg_erro = fpc.mensagem(msg.messages, "erro");
					throw new FpcError(JSON.stringify(msg.messages), url, params);
				}
		    }).fail(function(jqxhr, textStatus, error){
		    	document.body.style.cursor = "default";
				fpc.mensagem(error, "erro");
				throw new FpcError(error, url, params);
		    });			
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
		var s_form = fpc.serializeForm(f_login);
    	fpc.postUrl("/fpc.views.fpc_login", { form : s_form });
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
    		if (fpc.isFieldChanged(this)){
    			if (this.dataset.default != undefined && this.value === ""){
    				this.value = this.dataset.default;
    			}
    			this.dirty = true;
    			
    			var operacao = document.getElementById("barra_botao").dataset.tipo;
    			var field_name = this.dataset.field;
    			 
        		// sincroniza campos com o mesmo field
    			var list_fields = $.makeArray(this.form.getElementsByClassName("form-control"));
				for (var i = 0, len = list_fields.length; i < len; i++){
					var field = list_fields[i];
    				if (field != this && field.dataset.field === field_name){
    					field.value = this.value;
    					field.dataset.dirty = true;
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
		var js_class = document.getElementById("dados_pesquisa").dataset.jsclass;
		if (js_class != undefined){
			var js_obj = window[js_class];
			if (js_obj != undefined){
				js_obj.onchange(field, operacao);
			}
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
		var list_fields = $.makeArray(form.getElementsByClassName("form-control"));
    	for (field_update in update_fields){
    		var value = update_fields[field_update];
    		var is_object = typeof value  === "object";
			for (var i = 0, len = list_fields.length; i < len; i++){
				var field = list_fields[i];
				var field_name = field.dataset.field;
				if (field_name === field_update){
					if (is_object){
						field.value = value.desc;
						field.dataset.value = value.id;
					}else{
						field.value = value;	
					}
					field.dataset.dirty = true;
				}
			}
		}
    },
    
    resetFields : function(form){
		var list_fields = $.makeArray(form.getElementsByClassName("form-control"));
		for (var i = 0, len = list_fields.length; i < len; i++){
			var field = list_fields[i];
			field.dataset.value = field.value;
			if (field.dataset.dirty != undefined){
				field.removeAttribute("data-dirty"); 
			}
		}
    },

    fireOnReadyEvent : function(field, operacao){
		var js_class = document.getElementById("dados_pesquisa").dataset.jsclass;
		if (js_class != undefined){
			var js_obj = window[js_class];
			if (js_obj != undefined){
				js_obj.onready(field, operacao);
			}
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
	    				fpc.renderLazyField(field);
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
    
    configFields : function(f, operacao){
        var list_inputs = $.makeArray(f.getElementsByClassName("form-control"));
        var isEdicao = operacao === "edicao";
        var isInsert = operacao === "novo";
        var jdoc = $(document); 

        // Inicializa a lista de campos lazy e remove o handler scroll 
        fpc.lazyFields = new Array();
        jdoc.off('scroll', fpc.checkCheckRenderLazyFields);

        // Configura cada field conforme seu tipo 
        for (var i = 0, len = list_inputs.length; i < len; i++){
            var input = list_inputs[i];
            var data_type = input.dataset.type;
            var data_listener = input.dataset.listener;
            input.style.backgroundColor="white";
            if (data_type !== null && data_type != undefined){
              data_type = data_type.toLowerCase();
              if (data_type === "numero" || data_type === 'integer'){
                this.somenteNumeros(input);
              } 
              else if (data_type === 'decimal'){
            	  this.somenteDecimal(input);
              }
              else if (data_type === 'data'){
            	  $(input).mask("99/99/9999");
            	  input.setAttribute("size", 12);
            	  this.somenteData(input);
              }else if (data_type === "text"){
            	  if (input.dataset.caixaAlta != undefined){
            		  this.somenteCaixaAlta(input);
            	  }
            	  if (input.dataset.mascara != undefined){
            		  $(input).mask(input.dataset.mascara, {placeholder: input.dataset.mascaraPlaceholder});
            	  }
              }else if (data_type === "combobox"){
            	  var key = input.dataset.value;
            	  if (key != null || key != ""){ 
	            	  for (var j = 0, len_input = input.length; j < len_input; j++) {
	                      if (input[j].value == key) {
	                        input[j].selected = true;
	                        break;
	                      }
	                  }
            	  }
              } else if (data_type === "grid"){
            	  
              }
              
              if (input.dataset.lazy != undefined){
            	  fpc.lazyFields.push(input);
              }
              
              if (isEdicao && input.dataset.noEditable != undefined){
              	input.setAttribute("readonly", "readonly");
              	input.style.backgroundColor="LightYellow";
              }

              if (isInsert && input.dataset.noInsertable != undefined){
              	input.setAttribute("readonly", "readonly");
              	input.style.backgroundColor="LightYellow";
              }
              
              if (data_listener != undefined){
            	  if (data_listener.indexOf("onready") > -1){
                	  fpc.fireOnReadyEvent(input, operacao);
            	  } 
              }
              if (input.dataset.required != undefined){
            	  input.parentElement.firstElementChild.style.fontWeight="bold";
              }
              
              this.fieldChanged(input);
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
    
    validaForm : function (f){
        var fieldLabels = [];
        var fieldRequeridos = $(f).find(':input[data-required]');
        for (var i = 0, len = fieldRequeridos.length; i < len; i++){
            var field = fieldRequeridos[i];
            if (field.value === "" && field.dataset.autoIncrement == undefined){
            	if (field.parentElement.className === "input-group"){
            		var label = field.parentElement.parentElement;	
            	}else{
            		var label = field.parentElement;	
            	}
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
    		$(f).one("change", function(event){
    			$(this.getElementsByClassName('form-control-feedback')).remove();
    			$(this.getElementsByClassName('has-error')).removeClass("has-error has-feedback");
    			fpc.validaForm(this);
			});
            
            return false;
        }
        
        return true;
    },    
    
    getQueryStringFromForm : function(form){
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
    },

    isFieldChanged : function(field){
    	var dat = field.dataset;
    	if (dat.dirty){
    		return true;
    	}
    	if (dat.type === "lookup"){
			var dat_key = dat.key; 
    		if (dat_key != undefined && dat.value !== dat_key){
				return true;
			}
		}else {
			var field_value = field.value; 
    		if (field_value != undefined && field_value !== dat.value){
       			return true;
    		}
		}
		return false;
    },

    serializeForm : function(form){
    	var list_fields = $.makeArray(form.getElementsByClassName("form-control"));
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
	    			result.push(escape(field.value));
	    		}
	    		result.push("&");
	    		fields_dirty.push(dfield);
    		}
    	}
    	if (result.length > 0){
    		result.pop();
    	}
    	return result.join("");
    },
    
    serializeFormParaPesquisa : function(form){
    	var fields = $.makeArray(form.getElementsByClassName("form-control"));
    	var result = "";
    	for (var i = 0, len = fields.length; i < len; i++){
    		var f = fields[i];
    		var dat = f.dataset;
    		var dfield = dat.field;
    		if (dfield != undefined){
	    		if (dat.type === "lookup" && dat.value !== ""){
	     			result += dfield + ":" + escape(dat.key) + ".@.";
	    		}else {
		    		var value = f.value;
	    			if (value != undefined && value !== ""){
		       			result += dfield + ":" + escape(value) + ".@.";
		    		}
	    		} 
    		}
    	}
    	if (result !== ""){
    		result = result.slice(0, result.length-3);
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
    
    exibeForm : function exibeForm(url, data){
    	$.ajax({
			  type: "GET",
			  url: url,
			  data: data
			}).done(function(response) {
			  $("#painel_conteudo").html(response);
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
    	h_tab_a = $("#id_tab_registro li[class='active'").children().first(); 
    	h_tab_a[0].removeAttribute("data-ajax");
    	h_tab_a.click();    	
    },
    
    execTs : function execTs(ts){
		fpc.getJSON('/fpc.views.fpc_executa_transacao', { ts : ts }
			).done(function(msg) {
				var doc = document;
				var param = msg.params[0]; 
				var template = param.template;
				var ts_id = param.ts;
				var tipoTs = param.tipoTs;
				var jpainel_conteudo = $("#painel_conteudo"); 
				jpainel_conteudo.html(template);
				jpainel_conteudo.find("form").each(function(){ fpc.configFields(this); }); 
				$(function () {
			 	      $('#id_tab_registro a:first').tab('show'); // focu na primeira aba após renderizar
			 	      var dat = document.body.dataset;
			 	      dat.ts= ts_id;
			 	      dat.tipoTs = tipoTs;
				});
				
			});
    },

   
    exibeSistemas : function exibeSistemas(){
		$.ajax({
			  type: "GET",
			  url: '/fpc.views.fpc_exibe_sistemas'
			}).done(function(response) {
			  $("#painel_conteudo").html(response);
			  $("#barra_nav").html("");
			  $("#fpc_nome_sistema").html(""); 
			  $("#fpc_nome_sistema_menu").html("");
			});
    },

    mensagem : function mensagem(msg, tipo){
		var alerta = $("#alerta");
    	
		if (msg !== "") {
			var msg_text = "";
			
			// Cria a tag do alerta se necessário
			if (alerta.length === 0){
				$("#sep_breadcrumb").after("<div id='alerta' style='display:none'/>");
				alerta = $("#alerta");
			}

			// adiciona todas as mensagens na tag alerta
			if (msg instanceof Object){
				var warnings = msg.warnings; 
				if (warnings != undefined){
					for (i in warnings){
						str = '<i class="glyphicon glyphicon-warning-sign"/>' + warnings[i].msg;
						msg_text += "<span>"+ str + "</span>";
					}
				}

				var infos = msg.infos; 
				if (infos != undefined){
					for (i in infos){
						str = '<i class="glyphicon glyphicon-ok"/>' + infos[i].msg;
						msg_text += "<span>"+ str + "</span>";
					}
				}

				var errors = msg.errors; 
				if (errors != undefined){
					for (i in errors){
						str = '<i class="glyphicon glyphicon-remove" style="color: #a94442;"/>' + errors[i].msg;
						msg_text += "<span>"+ str + "</span>";
					}
				}
				
				if (msg_text != ""){
					alerta.append(msg_text);
				}
				
			}else {
				if (tipo === "info") {
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
   	},
   	
   	
   	limparMensagem : function(){
		var alerta = $("#alerta");
		if (alerta.length > 0){
			alerta.remove();
		}
   	},
   	
   	parcialUpdate : function parcialUpdate(parcial_update){
   		for (i in parcial_update){
   			var obj = parcial_update[i];
   			for (id in obj){
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
   	
    pesquisar : function pesquisar(ts, is_consulta){
    		var doc = document;
	    	var frmFiltro = is_consulta ? doc.getElementById("filtro_consulta") : doc.getElementById("filtro");
   			var filtro = this.serializeFormParaPesquisa(frmFiltro); 
			var id_dados_wrapper_jquery = null;
			var id_dados_pesquisa_jquery = null;
			var id_filtro_pesquisa_jquery = null;
			var id_dados_jquery = null;
			if (is_consulta){
   				id_dados_wrapper_jquery = "#dados_consulta_wrapper";
   				id_dados_pesquisa_jquery = "#dados_pesquisa_consulta";
   				id_filtro_pesquisa_jquery = "#filtro_pesquisa_consulta";
   				id_dados_jquery = "#dados_consulta";
   				event_selecionaRegistro = "' onclick='fpc.selecionaRegistroConsulta(this)'";
   			}else{
   				id_dados_wrapper_jquery = "#dados_wrapper";
   				id_dados_pesquisa_jquery = "#dados_pesquisa";
   				id_id_selecionado = "f_id";
   				id_filtro_pesquisa_jquery = "#filtro_pesquisa";
   				id_dados_jquery = "#dados";
   				event_selecionaRegistro = "' onclick='fpc.selecionaRegistro(this)'";
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
			
			
			fpcDataTable.createDataTable(
					tbl = tbl_dados,
					url = "/fpc.views.fpc_pesquisar?ts="+ ts + "&filtro='" + filtro + "'&filtroIds=''&isconsulta=" + is_consulta,
					is_consulta = is_consulta,
					row = function( nRow, aData, iDataIndex ) {
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
							}
			);

			if (is_consulta){
   				fpc.montaBarraBotaoConsulta("lista");
   			}else{
   				fpc.montaBarraBotao("lista");
   			}
	   					
   	},
   	
   	novaPesquisa : function novaPesquisa(){
   		var doc = document;
   		var dadosPesquisa = doc.getElementById("dados_pesquisa"); 
   		dadosPesquisa.style.display = "none";
   		dadosPesquisa.dataset.id = "";
   		doc.getElementById("filtro_pesquisa").style.display = "block";
   		doc.getElementById("f_cadastro").style.display = "none";
		fpc.montaBarraBotao("pesquisa");
		fpc.mensagem("", "");
   	},
   	
   	novaConsulta : function novaConsulta(){
   		var doc = document;
   		doc.getElementById("dados_pesquisa_consulta").style.display = "none";
		doc.getElementById("filtro_pesquisa_consulta").style.display = "block";
		fpc.montaBarraBotaoConsulta("pesquisa");
		fpc.mensagem("", "");
   	},

   	voltarParaLista : function voltarParaLista(){
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

   	voltarParaListaConsulta : function voltarParaListaConsulta(){
   		var doc = document;
   		doc.getElementById("dados_pesquisa").style.display = "block";
		doc.getElementById("f_cadastro").style.display = "none";
		fpc.montaBarraBotaoConsulta("lista");
		fpc.mensagem("", "");
   	},

   	novo : function novo(ts, inclusao_direta){
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
   	
   	editar : function editar(){
   		dados_pesquisa = document.getElementById("dados_pesquisa");
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
				fpc.updateFields(f_cadastro, update_fields);
				fpc.resetFields(f_cadastro);
				$("#dados_pesquisa").css("display", "none");
				$("#filtro_pesquisa").css("display", "none");
				$(f_cadastro).css("display", "block");
				fpc.montaBarraBotao("edicao");
				fpc.configFields(f_cadastro, "edicao");
				$(function () {
					  // seta o focu na primeira aba após renderizar 
			 	      $('#id_tab_registro a:first').tab('show');
				});
				  
			});
   		
   	},
   	
   	
   	salvar : function salvar(){
   		var divDadosPesquisa = document.getElementById("dados_pesquisa");
   		var s_form = fpc.serializeForm(f_cadastro);

		// limpa as mensagens anteriores
   		fpc.mensagem("");

   		if (divDadosPesquisa.dataset.id !== ""){
	   		if (s_form.length === 0){
	   			fpc.mensagem("Nenhuma alteração realizada no cadastro para salvar.", "info");
	   			return;
	   		}
   		}
   		
   		if (this.validaForm(f_cadastro)){
			fpc.getJSON("/fpc.views.fpc_salvar_cadastro", { ts : divDadosPesquisa.dataset.ts, 
														  id : divDadosPesquisa.dataset.id, 
														  form : s_form } 
			).done(function (msg) {
					if (msg.tipo === "info"){
						var doc = document;
						var param = msg.params[0]; 
						var update_fields = param.update_values;
						var idObj = param.id; 
						var divDadosPesquisa = doc.getElementById("dados_pesquisa");

						divDadosPesquisa.dataset.id = param.id;
						fpc.updateFields(f_cadastro, update_fields);
						fpc.resetFields(f_cadastro);
						fpc.configFields(f_cadastro, "edicao");

						
						// Força o focus para a primeira aba
						$('#id_tab_registro a:first').tab('show');

						// Atualiza a grid da pesquisa
						var grid_dados = JSON.parse(param.grid_dados);
						if (grid_dados != undefined){
							// Atualiza a linha do registro selecionado na grid sem fazer request
							var row_atual = null;
							// Se for uma edição atualiza o registro da grid com os dados atuais do registro   
							if (idObj !== ""){
								row_atual = $("input[value='" + idObj + "']").parent().parent();
								var idx_col = -1;
								row_atual.children("td").each(function(){ 
									if (idx_col > -1){
										$(this).text(grid_dados[idx_col]);
									}
									idx_col++;
								});
							}else{ // Se for inserção, adiciona o novo item na gride
								row_atual = doc.createElement("tr"); 
								var ts = msg.params[0].ts;
								fpcDataTable.forceRefresh = true;

								if ($("#dados").find("tbody").children().length > 0){
									if (fpcDataTable.idsNovos === ""){ 
										fpcDataTable.idsNovos = idObj;
									}else{
										fpcDataTable.idsNovos += "," + idObj;
									}
	
									if ($("#dados").find("tbody").children().first().hasClass("odd")){
										$(row_atual).addClass("even");
									}else{
										$(row_atual).addClass("odd");
									}
									$(row_atual).append('<td><input type="radio" name="f_id" onclick="fpc.selecionaRegistroConsultaEvent(this.value)" value="'+ idObj + '"></td>');
									for (i in grid_dados){
										$(row_atual).append("<td>" + grid_dados[i] + "</td>");
									}
								
									$("#dados").find("tbody").children().first().before($(row_atual));
									$("#dados").find("tbody").children().first().find("input").click();
								}
							}
						}
					}else if (msg.tipo === "erro"){
						fpc.mensagem("Verifique os erros abaixo e tente salvar novamente.", "warn");
					}
					fpc.mensagem(msg.messages, msg.tipo);
	        }).fail(function( jqxhr, textStatus, error ){
	        	fpc.mensagem(error, "error");        
	        });  
		}
   	}
   	
};



///////////////////////  	fpcDataTable  	///////////////////////   



var fpcDataTable = {
		forceRefresh: false,
		idsNovos: "",
		selecionaPrimeiroReg: false,
		is_consulta: false,
		
	    createDataTable : function(tbl, url, is_consulta, row){
			fpcDataTable.is_consulta = is_consulta;
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
		              url: url,
		              pages: 5 
		          }),
		          "autoWidth": false,
		          "createdRow": row
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
        xhr.setRequestHeader("Accept", "application/zip");
 	});
});