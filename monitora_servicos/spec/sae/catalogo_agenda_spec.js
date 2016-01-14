describe("Agenda", function() {
 
 beforeEach(function() {

 });

 
 it("Verifica se consegue obter uma lista de agenda do SAE", function() {
	var result = $.ajax({
					url:  "http://localhost:2301/sae/agenda",
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


 
 it("Verifica se consegue incluir, modificar, pesquisar e excluir agenda no SAE", function() {

	// define os dados do cadastro agenda
	var objAgenda = {"periodo":"20151",
				     "dataHora" : "01/10/2015",
				     "campus" : 1,
				     "quantidadeAtendentes" : 3};
	
	// tenta incluir agenda		   
	var result = $.ajax({
					url:  "http://localhost:2301/sae/agenda",
					data : JSON.stringify(objAgenda),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	var objAgendaInserido = result.responseJSON;
	var idAgenda = objAgendaInserido.id;

	objAgendaUpdate = objAgendaInserido;
	objAgendaUpdate.quantidadeAtendentes = 4;

	// tenta modificar agenda
	result = $.ajax({
					url:  "http://localhost:2301/sae/agenda/"+ idAgenda,
					data : JSON.stringify(objAgendaUpdate),
					type: "PUT",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// faz a pesquisa da agenda
	result = $.ajax({
					url:  "http://localhost:2301/sae/agenda/"+ idAgenda,
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// modificação feita, vamos apagar o registro do teste
	result = $.ajax({
					url:  "http://localhost:2301/sae/agenda/"+ idAgenda,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
 });

 
});
