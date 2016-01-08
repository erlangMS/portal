describe("ValorAlimentacao", function() {
 
 beforeEach(function() {

 });

 
 it("Verifica se consegue obter uma lista de valor alimentação do SAE", function() {
	var result = $.ajax({
					url:  "http://localhost:2301/sae/valoralimentacao",
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


 
 it("Verifica se consegue incluir, modificar e excluir um cadastro de valor alimentação no SAE", function() {

	// define os dados do cadastro valor alimentação
	var obj = {"campus":1,
			   "inicioVigencia" : "01/10/2015",
			   "fimVigencia" : "10/10/2015",
			   "pagaBeneficio" : true,
			   "valorBeneficio" : "12.57"};
	
	// tenta incluir		   
	var result = $.ajax({
					url:  "http://localhost:2301/sae/valoralimentacao",
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
			objUpdate.pagaBeneficio = false;
			objUpdate.valorBeneficio = 20.50;

			// tenta modificar
			var result = $.ajax({
							url:  "http://localhost:2301/sae/valoralimentacao/"+ objUpdate.id,
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
							url:  "http://localhost:2301/sae/valoralimentacao/"+ objInserido.id,
							type: "DELETE",
							contentType: "application/x-www-form-urlencoded; charset=UTF-8",
							dataType: "json",
							crossDomain: true,
							async: false
						});
			expect(result.status).toBe(200);
	}
	
	
 });


 it("Verifica se consegue pesquisar um cadastro valor alimentação pelo id no SAE", function() {

	// define os dados do cadastro valor alimentação
	var obj = {"campus":1,
			   "inicioVigencia" : "01/10/2015",
			   "fimVigencia" : "10/10/2015",
			   "pagaBeneficio" : true,
			   "valorBeneficio" : "12.57"};
	
	// inclui um valor alimentacao para pesquisar
	var result = $.ajax({
					url:  "http://localhost:2301/sae/valoralimentacao",
					data : JSON.stringify(obj),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	expect(result.responseJSON).toBeDefined();
	
	var idValorAlimentacao = result.responseJSON.id;

	// faz a pesquisa
	result = $.ajax({
					url:  "http://localhost:2301/sae/valoralimentacao/"+ idValorAlimentacao,
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	
	// é esperado o retorno de um registro
	expect(result.status).toBe(200);
	
	// vamos apagar o registro do valor alimentacao de teste
	result = $.ajax({
					url:  "http://localhost:2301/sae/valoralimentacao/"+ idValorAlimentacao,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

 });

 
});
