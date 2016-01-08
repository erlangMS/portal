describe("EstudoPreliminar", function() {
 
 beforeEach(function() {

 });

 
 it("Verifica se consegue obter uma lista de estudo preliminar do SAE", function() {
	var result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/preliminar",
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


 
 it("Verifica se consegue incluir, modificar, pesquisar e excluir um cadastro de estudo preliminar no SAE", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	// define os dados do aluno
	var objAluno = {"nome":"Aluno Teste "+ testeId,
					"cpf":"1111111111",
					"senha" : "10/10/2015"};
	
	// tenta incluir aluno
	var result = $.ajax({
					url:  "http://localhost:2301/sigra/aluno",
					data : JSON.stringify(objAluno),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();
	var idAluno = result.responseJSON.id;

	// define os dados do cadastro de questionário
	var objQuestionario = {"denominacao":"questionário de teste "+ testeId,
						   "dataInicio":"01/12/2015", 
						   "dataFim":"30/12/2015"}
	
	// tenta incluir questionario		   
	result = $.ajax({
					url:  "http://localhost:2301/questionario/questionario",
					data : JSON.stringify(objQuestionario),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});

	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();
	var idQuestionario = result.responseJSON.id;

	// define os dados do cadastro estudo preliminar
	var obj = {"periodo":"20141", 
			   "dataHora":"01/01/2014", 
			   "aluno":idAluno, 
			   "questionario":idQuestionario}
	
	// tenta incluir estudo preliminar	   
	var result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/preliminar",
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

			objUpdate = objInserido;
			objUpdate.dataHora = "01/01/2015";
			objUpdate.periodo = "20151";
			objUpdate.aluno = idAluno; 
			objUpdate.questionario = idQuestionario;


			// tenta incluir		   
			result = $.ajax({
							url:  "http://localhost:2301/sae/estudo/preliminar/"+ objInserido.id,
							data : JSON.stringify(objUpdate),
							type: "PUT",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);

			// faz a pesquisa
			result = $.ajax({
							url:  "http://localhost:2301/sae/estudo/preliminar/"+ objInserido.id,
							type: "GET",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);

			// modificação feita, vamos apagar o registro do estudo de teste
			result = $.ajax({
							url:  "http://localhost:2301/sae/estudo/preliminar/"+ objInserido.id,
							type: "DELETE",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);
			
			
	}

	// vamos apagar o registro do aluno de teste
	result = $.ajax({
					url:  "http://localhost:2301/sigra/aluno/"+ idAluno,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	
	// vamos apagar o registro do questionário de teste
	result = $.ajax({
					url:  "http://localhost:2301/questionario/questionario/"+ idQuestionario,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	
	
 });



 
});
