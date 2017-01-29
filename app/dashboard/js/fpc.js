'use strict';



/*!
 * fpc -- Framework de primeira camada
 * Copyright 2011-2015 Everton de Vargas Agilar.
 */


function FpcError(message, url, params) {
    this.name = "FpcError";
    this.message = message + "\nRequest: " + url + "\nParams: "+ JSON.stringify(params) + ")";						
}
FpcError.prototype = Error.prototype;


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

    configFields : function(){
		// Pesquisa todos os campos com a tag data-type 
		// mas que ainda não foram configuradas pela biblioteca fpc
		// A configuração a realizada apenas uma vez por campo
		var list_fields = $.makeArray(document.querySelectorAll('[data-type'));
		var qtd_fields = list_fields.length;
		var doc=document;
		if (qtd_fields > 0) {
			var jdoc = $(document); 
			for (var i = 0, len = qtd_fields; i < len; i++){
				var input = list_fields[i];
				if (input.type != undefined){
					var dat = input.dataset;
					var data_type = dat.type;
					if (!dat.fpc && data_type != undefined){
						input.style.backgroundColor="white";
						dat.fpc=true;
						if (data_type === "number"){
								dat.type = "number";
								this.somenteNumeros(input);
						} 
						else if (data_type === "decimal") {
							  dat.type = "decimal";
							  if (dat.decimalPlaces == undefined){
								  dat.decimalPlaces = 2;
							  }
							  this.somenteDecimal(input);
						}
						else if (data_type === "date" || data_type === "datetime"){
							  this.somenteData(input);
							  var input_ant=input.previousElementSibling;
							  var parent_input=input.parentNode;

							  //if (input_ant != undefined && input.previousElementSibling.classList.contains("form-group")){
							  if (parent_input != undefined && parent_input.classList.contains("form-group")){
								  var new_form_group=false;
								  var form_group=parent_input;
								  form_group.classList.remove("form-group");
							  }else{
								  var new_form_group=true;
								  var form_group=doc.createElement("div");
							  }

							  form_group.classList.add("input-group");
							  form_group.classList.add("date");
							  
							  // Cria a span para o botão do calendário
							  var span_input_group=doc.createElement("span");
							  span_input_group.classList.add("input-group-addon");
							  //span_input_group.classList.add("btn"); 
							  //span_input_group.classList.add("btn-default"); 
							  //span_input_group.classList.add("btn-xs"); 
							  //span_input_group.style.height = "10px";
							  //span_input_group.style.min_height = "10px";
							  var span_input_glyphicon=doc.createElement("span");
							  span_input_glyphicon.classList.add("glyphicon");
							  span_input_glyphicon.classList.add("glyphicon-calendar");
							  //span_input_glyphicon.style.height = "10px";
							  span_input_group.appendChild(span_input_glyphicon);
							  form_group.appendChild(span_input_group);
							  
							  if (new_form_group){
								form_group.appendChild(input);
								parent_input.appendChild(form_group);
							  }
							  
							  switch (data_type) {
								  case "date" :
		  							  $(input).mask("99/99/9999");
									  input.style.width="80px";
									  $(form_group).datetimepicker({
											language:  'pt-BR',
											format: 'dd/mm/yyyy',
											weekStart: 1,
											todayBtn:  1,
											autoclose: 1,
											todayHighlight: 1,
											startView: 2,
											minView: 2,
											forceParse: 0
										}); 
										break;
									case "datetime" :
										$(input).mask("99/99/9999 99:99");
									    input.style.width="110px";
										$(form_group).datetimepicker({
											language:  'pt-BR',
											format: 'dd/mm/yyyy hh:ii',
											weekStart: 1,
											todayBtn:  1,
											autoclose: 1,
											todayHighlight: 1,
											startView: 2,
											minView: 2,
											forceParse: 0,
											showMeridian: 1
										});		
										break
								}
										

						}else if (data_type === "text"){
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
						}
						  
						if (dat.noEditable != undefined){
							input.setAttribute("readonly", "readonly");
							input.style.backgroundColor="LightYellow";
						}
			
						if (dat.noInsertable != undefined){
							input.setAttribute("readonly", "readonly");
							input.style.backgroundColor="LightYellow";
						}
					  
						var label = fpc.getLabelFromField(input);
						if (label != undefined){
							if (dat.required != undefined){
								label.style.fontWeight="bold";
							}else{
								label.style.fontWeight="";
							}
						}
					}
				}
			}
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

    mensagem : function mensagem(msg, tipo){
		var	 alerta = $("#f_alert");
    	if (alerta != undefined) {
			if (msg != undefined && msg !== "") {
				var msg_text = "";
	
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
					var err = msg.error;
					if (err != undefined){
						if (err instanceof Object){
							msg_text = err.reason || err.message;
							if (err.schema != undefined && err.schema.required != undefined && err.schema.required instanceof Array){
								msg_text += ": " + err.schema.required.toString()
							}
							msg_text = '<span><i class="glyphicon glyphicon-remove" style="color: #a94442;"/>' + msg_text + '</span>';
						}else{
							if (err === "validation" && msg.message != undefined){
								if (msg.message instanceof Array){
									var errors = msg.message; 
									for (var i in errors){
										var str_temp = '<i class="glyphicon glyphicon-remove" style="color: #a94442;"/>' + errors[i];
										msg_text += "<span>"+ str_temp + "</span>";
									}
								}else{
									msg_text = msg.message;
									msg_text = '<span><i class="glyphicon glyphicon-remove" style="color: #a94442;"/>' + msg_text + '</span>';
								}
							}else{
								msg_text = "Ocorreu o seguinte erro: " + err;
								msg_text = '<span><i class="glyphicon glyphicon-remove" style="color: #a94442;"/>' + msg_text + '</span>';
							}
						}
					}else if (msg.message != undefined){
						var message = msg.message;
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
	            $("html, body").animate({
						scrollTop: 1
	                }, 700);
				$(document).one("change", function(){
					fpc.mensagem("");
				});
				$("button").one("click", function(){
					fpc.mensagem("");
				});
				
				return msg_text;
	   		}
	   		else
	   		{
				if (alerta.length > 0){
					alerta.hide("fast", function(){
						alerta.html("<div id='f_alert' style='display:none'/>");	
					});
	   			}
				return "";
	   		}
    	}
   	}
   	

};


/////////////////////  	ready  	///////////////////////

$(this).ready(function(){
	fpc.csrftoken = fpc.getCookie('csrftoken');
	$(document).ajaxSend(function(event, xhr, settings) {
        xhr.setRequestHeader("X-CSRFToken", fpc.csrftoken);
        xhr.setRequestHeader("Accept", "application/json,application/zip");
        xhr.setRequestHeader ("Authorization", "Basic " + btoa(fpc.username + ":" + fpc.password));
 	});

	// Registra uma thread para configurar os inputs a cada 1 segundo
	//setTimeout(function(){
	//	setInterval(function(){ fpc.configFields() }, 3000);
	//}, 4000);
});
