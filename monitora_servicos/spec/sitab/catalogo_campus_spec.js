describe("Campus", function() {
 
 beforeEach(function() {

 });

 
 it("Verifica se consegue obter uma lista de campus cadastrados no Sitab", function() {
	var result = $.ajax({
					url:  "http://localhost:2301/sitab/campus",
					data : {},
					type: "GET",
					contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					dataType: "json",
					crossDomain: true,
					async: false
				});
	expect(result.status).toBe(200);
 });

 
});
