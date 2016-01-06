describe("TipoQuestionario", function() {
 
 beforeEach(function() {

 });

 
 it("Verifica se consegue obter uma lista de tipos de questionários", function() {
	var result = $.ajax({
					url:  "http://localhost:2301/questionario/tipo_questionario",
					data : {},
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	if (result.status == 200){
		expect(result.responseJSON).toEqual(jasmine.any(Object));
	}
 });


 
 it("Verifica se consegue incluir, modificar e excluir um cadastro de tipos de questionário", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	// define os dados do cadastro
	var obj = {"denominacao":"Tipo de questionário teste "+ testeId}
	
	// tenta incluir		   
	var result = $.ajax({
					url:  "http://localhost:2301/questionario/tipo_questionario",
					data : JSON.stringify(obj),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();

	var objInserido = result.responseJSON;

	// se incluiu, tenta modificar o registro
	if (result.status == 201 && objInserido.id != undefined){
		
			// vamos fazer uma modificação no registro
			objUpdate = objInserido;
			objUpdate.denominacao = objUpdate.denominacao + "(update)";
			objUpdate.extinto = true;

			// tenta modificar		   
			var result = $.ajax({
							url:  "http://localhost:2301/questionario/tipo_questionario/"+ objUpdate.id,
							data : JSON.stringify(objUpdate),
							type: "PUT",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);

			// vamos apagar o registro do teste
			var result = $.ajax({
							url:  "http://localhost:2301/questionario/tipo_questionario/"+ objInserido.id,
							type: "DELETE",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);
	}
	
 });



 it("Verifica se consegue pesquisar um cadastro de tipo de questionário pelo id", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	// define os dados do cadastro
	var obj = {"denominacao":"Tipo de questionário teste "+ testeId}
	
	// tenta incluir um tipo de questionário para pesquisa		   
	var result = $.ajax({
					url:  "http://localhost:2301/questionario/tipo_questionario",
					data : JSON.stringify(obj),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();

	var idTipo = result.responseJSON.id;
	
	// faz a pesquisa
	result = $.ajax({
					url:  "http://localhost:2301/questionario/tipo_questionario/"+ idTipo,
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	
	// vamos apagar o registro do teste
	result = $.ajax({
					url:  "http://localhost:2301/questionario/tipo_questionario/"+ idTipo,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	
 });

 
});
