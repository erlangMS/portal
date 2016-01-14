describe("AlunoSae", function() {
 
 beforeEach(function() {

 });

 
 it("Verifica se consegue registrar, pesquisar e excluir ocorrência para aluno no SAE", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	//
	// Cadastra aluno de teste para incluir ocorrência
	//

	// define os dados do cadastro aluno
	var obj = {"nome":"Aluno "+ testeId,
			   "cpf":"1111111111",
			   "senha" : "10/10/2015"};
	
	// tenta incluir aluno de teste		   
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
	var objAlunoInserido = result.responseJSON;
	var idAluno = objAlunoInserido.id;

	
	//
	// Incluir ocorrência para o aluno
	//

	// define os dados do cadastro da ocorrência
	var objOcorrencia = {"periodo": "20151",
						 "dataInicio": "10/05/2015", 
						 "dataFim": "10/08/2015",
						 "justificativa": "Ocorrencia lançada porque o aluno...",
						 "suspendeBolsaAlimentacao": true};
	
	// tenta incluir ocorrência
	var result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/ocorrencia",
					data : JSON.stringify(objOcorrencia),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	var objOcorrenciaInserido = result.responseJSON;
	var idOcorrencia = objOcorrenciaInserido.id;


	//
	// Modifica ocorrencia do aluno
	//

	var objOcorrenciaUpdate = {"periodo": "20151",
							   "dataInicio": "15/05/2015", 
							   "dataFim": "30/05/2015",
							   "suspendeBolsaAlimentacao": false};
						 	
	// tenta modificar ocorrência de teste
	result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/ocorrencia/"+ idOcorrencia,
					data : JSON.stringify(objOcorrenciaUpdate),
					type: "PUT",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);


	//
	// Pesquisa ocorrencia do aluno de teste
	//

	// pesquisa registro da ocorrência
	result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/ocorrencia/"+ idOcorrencia,
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	
	
	//
	// Remove ocorrência do aluno de teste
	//

	// vamos apagar o registro da ocorrência de teste
	result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/ocorrencia/"+ idOcorrencia,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	
	
	//
	// Remove aluno de teste
	//

	// vamos apagar o registro do aluno
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


 it("Verifica se consegue assinar termo de concessão de vale alimentação para aluno no SAE", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	//
	// Cadastra aluno de teste
	//

	// define os dados do cadastro aluno
	var objAluno = {"nome":"Aluno "+ testeId,
				    "cpf":"1111111111",
					"senha" : "10/10/2015"};
	
	// tenta incluir aluno de teste		   
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
	var objAlunoInserido = result.responseJSON;
	var idAluno = objAlunoInserido.id;

	
	//
	// Assina termo de concessão
	//

	// define os dados do cadastro da ocorrência
	var objTermo = {"periodo": "20151",
					"dataAssinatura": "10/05/2015", 
					"valorAlimentacao": true,
					"banco": "041",
					"agencia": "0350",
					"conta":"99999"
					};
	
	// tenta incluir termo de concessão
	var result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/assinatura_termo_concessao_vale_alimentacao",
					data : JSON.stringify(objTermo),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	var objTermoInserido = result.responseJSON;
	var idTermo = objTermoInserido.id;

	//
	// Modifica ocorrencia do aluno
	//

	var objTermoUpdate = {"periodo": "20151",
						"dataAssinatura": "10/05/2015", 
						"valorAlimentacao": false
						};
						 	
	// tenta modificar ocorrência de teste
	result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/assinatura_termo_concessao_vale_alimentacao/"+ idTermo,
					data : JSON.stringify(objTermoUpdate),
					type: "PUT",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);


	//
	// Pesquisa termo de concessão de teste
	//

	// pesquisa registro
	result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/assinatura_termo_concessao_vale_alimentacao/"+ idTermo,
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	
	
	//
	// Remove termo do aluno de teste
	//

	// vamos apagar o termo de concessão de teste
	result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/assinatura_termo_concessao_vale_alimentacao/"+ idTermo,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
	
	
	//
	// Remove aluno de teste
	//

	// vamos apagar o registro do aluno
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

 
 it("Verifica se consegue agendar, pesquisar e excluir entrevista para aluno no Sae", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	//
	// Cadastra aluno de teste
	//

	// define os dados do cadastro aluno
	var objAluno = {"nome":"Aluno "+ testeId,
				    "cpf":"1111111111",
					"senha" : "10/10/2015"};
	
	// tenta incluir aluno de teste		   
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
	var objAlunoInserido = result.responseJSON;
	var idAluno = objAlunoInserido.id;


	//
	// Cadastrar agenda para teste
	//

	// define os dados do cadastro agenda para teste
	var objAgenda = {"periodo":"20151",
				     "dataHora" : "01/10/2015",
				     "campus" : 1,
				     "quantidadeAtendentes" : 3};
	
	// tenta incluir agenda de teste		   
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

	//
	// Fazer agendamento da entrevista
	//

	// define os dados do cadastro agenda para teste
	var objAgendamento = {"agenda":idAgenda};

	// tenta agendar
	result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/agendamento_entrevista",
					data : JSON.stringify(objAgendamento),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	var idAgendamento = result.responseJSON.id;

	// faz a pesquisa do agendamento feito
	result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/agendamento_entrevista/"+ idAgendamento,
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	//
	// Apagar os registros de teste
	//

	// vamos apagar o registro do agendamento
	result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/agendamento_entrevista/"+ idAgendamento,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// vamos apagar o registro do teste
	result = $.ajax({
					url:  "http://localhost:2301/sae/agenda/"+ idAgenda,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// vamos apagar o registro do aluno
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


 it("Verifica se consegue listar agendamentos de entrevista de aluno no Sae", function() {

	var testeId = Math.floor(Math.random() * 99999999);

	//
	// Cadastra aluno de teste
	//

	// define os dados do cadastro aluno
	var objAluno = {"nome":"Aluno "+ testeId,
				    "cpf":"1111111111",
					"senha" : "10/10/2015"};
	
	// tenta incluir aluno de teste		   
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
	var objAlunoInserido = result.responseJSON;
	var idAluno = objAlunoInserido.id;


	//
	// Cadastrar agenda para teste
	//

	// define os dados do cadastro agenda para teste
	var objAgenda = {"periodo":"20151",
				     "dataHora" : "01/10/2015",
				     "campus" : 1,
				     "quantidadeAtendentes" : 3};
	
	// tenta incluir agenda de teste		   
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

	//
	// Fazer agendamento da entrevista de teste
	//

	// define os dados do cadastro agenda para teste
	var objAgendamento = {"agenda":idAgenda};

	// tenta agendar
	result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/agendamento_entrevista",
					data : JSON.stringify(objAgendamento),
					type: "POST",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(201);
	var idAgendamento = result.responseJSON.id;

	// lista os agendamentos (tem que listar o que foi cadastrado)
	result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/agendamento_entrevista",
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	//
	// Apagar os registros de teste
	//

	// vamos apagar o registro do agendamento
	result = $.ajax({
					url:  "http://localhost:2301/sae/aluno/"+ idAluno + "/agendamento_entrevista/"+ idAgendamento,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// vamos apagar o registro do teste
	result = $.ajax({
					url:  "http://localhost:2301/sae/agenda/"+ idAgenda,
					type: "DELETE",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);

	// vamos apagar o registro do aluno
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
