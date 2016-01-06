describe("Aluno", function() {
 
 beforeEach(function() {

 });

 
 it("Verifica se consegue obter uma lista de aluno do SAE", function() {
	var result = $.ajax({
					url:  "http://localhost:2301/sigra/aluno",
					data : {},
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
 });


 
 it("Verifica se consegue incluir, modificar e excluir um cadastro de aluno no SAE", function() {
	var testeId = Math.floor(Math.random() * 99999999);

	// define os dados do cadastro aluno
	var obj = {"nome":"Aluno "+ testeId,
			   "cpf":"1111111111",
			   "senha" : "10/10/2015"};
	
	// tenta incluir		   
	var result = $.ajax({
					url:  "http://localhost:2301/sigra/aluno",
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
			objUpdate.senha = "6546546";
			objUpdate.cpf = "22222222222";

			// tenta modificar
			var result = $.ajax({
							url:  "http://localhost:2301/sigra/aluno/"+ objUpdate.id,
							data : JSON.stringify(objUpdate),
							type: "PUT",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);


			// modificação feita, vamos apagar o registro do teste
			var result = $.ajax({
							url:  "http://localhost:2301/sigra/aluno/"+ objInserido.id,
							type: "DELETE",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);
	}
	
	
 });


 it("Verifica se consegue pesquisar um cadastro aluno pelo id no SAE", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	// define os dados do cadastro aluno
	var obj = {"nome":"Aluno "+ testeId,
			   "cpf":"1111111111",
			   "senha" : "10/10/2015"};
	
	// tenta incluir para pesquisar 	   
	var result = $.ajax({
					url:  "http://localhost:2301/sigra/aluno",
					data : JSON.stringify(obj),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();

	var idAluno = result.responseJSON.id;

	// faz a pesquisa
	result = $.ajax({
					url:  "http://localhost:2301/sigra/aluno/"+ idAluno,
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	
	// é esperado o retorno de um registro
	expect(result.status).toBe(200);
	
	// vamos apagar o registro do teste
	result = $.ajax({
					url:  "http://localhost:2301/sigra/aluno/"+ idAluno,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	
 });

 
});
