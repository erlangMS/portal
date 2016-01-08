describe("EstudoSocioEconomico", function() {
 
 beforeEach(function() {

 });

 /*
 it("Verifica se consegue obter uma lista de estudo socioeconomico do SAE", function() {
	var result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico",
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
*/
/*
 
 it("Verifica se consegue incluir, modificar e excluir um cadastro de estudo socioeconomico no SAE", function() {

	// define os dados do cadastro aluno
	var objAluno = {"nome":"Aluno",
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
	expect(result.status).toBe(200);
	expect(result.responseJSON).toBeDefined();

	var idAluno = result.responseJSON.id;

	// define os dados do cadastro estudo socioeconomico
	var obj = {"periodo":"20141", "dataHora":"01/01/2014", "aluno":idAluno, "questionario":10}
	
	// tenta incluir		   
	var result = $.ajax({
					url:  "http://localhost:2301/sae/estudo/socioeconomico",
					data : JSON.stringify(obj),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	expect(result.responseJSON).toBeDefined();

	var objInserido = result.responseJSON;

	// se incluiu, tenta modificar o registro
	if (result.status == 200 && objInserido.id != undefined){

			objUpdate = objInserido;
			objUpdate.dataHora = "01/01/2015";
			objUpdate.periodo = "20151";

			// tenta incluir		   
			var result = $.ajax({
							url:  "http://localhost:2301/sae/estudo/socioeconomico/"+ objUpdate.id,
							data : JSON.stringify(objUpdate),
							type: "PUT",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);


			// modificação feita, vamos apagar o registro do estudo de teste
			var result = $.ajax({
							url:  "http://localhost:2301/sae/estudo/socioeconomico/"+ objInserido.id,
							type: "DELETE",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);
			
			// vamos apagar o registro do aluno de teste
			var result = $.ajax({
							url:  "http://localhost:2301/sigra/aluno/"+ idAluno,
							type: "DELETE",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);
			
	}
	
	
 });

*/
 
});
