"use strict";

var ems_analytics = {

	dominio : "http://127.0.0.1:2301",

	grafico_top_services : function (Id, Label, Periodo) {
	      
	    $.ajax({
            url:  this.dominio + "/health/top_services/10?periodo=" + Periodo,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            dataType: "json",
            timeout: 65000,
            success: function(Values) {

				$.jqplot(Id, [Values], {
						  series:[{renderer:$.jqplot.BarRenderer}],
						  axes: {
							xaxis: {
							  renderer: $.jqplot.CategoryAxisRenderer,
							  label: Label,
							  labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
							  tickRenderer: $.jqplot.CanvasAxisTickRenderer,
							  tickOptions: {
								  angle: -15,
								  fontFamily: 'Courier New',
								  fontSize: '9pt',
							  }
							   
							},
							yaxis: {
							  label: 'Quantidade',
							  labelRenderer: $.jqplot.CanvasAxisLabelRenderer
							},
						  },
									  
						seriesDefaults:{
									renderer:$.jqplot.BarRenderer,
									rendererOptions: {fillToZero: true, varyBarColor: true}
						}
											  
					});

            },
            error: function(xhr, textStatus, errorThrown) {
               //alert(xhr +" "+ textStatus +" "+errorThrown);
               console.log(xhr + " " + textStatus);
            }
		});

	   },
	   
	grafico_requisicoes : function (Id, Label) {

			$.ajax({
				url:  this.dominio + "/health/qtd_requests_by_date/10?periodo=month",
				type: "GET",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				dataType: "json",
				timeout: 65000,
				success: function(Values) {


						var V = [ ["01/01/2015",5], ["01/05/2015",500], ["01/10/2015",14],["01/11/2015",79], ["01/16/2015",30], ["01/22/2015",68], ["01/30/2015",28] ];

						var V2 = [ ["01/01/2015",0], ["01/05/2015",5], ["01/10/2015",28],["01/11/2015",30], ["01/16/2015",3], ["01/22/2015",6], ["01/30/2015",28] ];

						
					 $.jqplot(Id, [V, V2], {
						  axes: {
							xaxis: {
							  renderer: $.jqplot.DateAxisRenderer,
							  label: Label,
							  labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
							  tickRenderer: $.jqplot.CanvasAxisTickRenderer,
							  tickOptions: {
								  // labelPosition: 'middle',
								  angle: 15
							  }
							   
							},
							yaxis: {
							  label: 'Quantidade',
							  labelRenderer: $.jqplot.CanvasAxisLabelRenderer
							}
						  },

						 seriesColors:['#00749F', '#FF0000'],

						 series:[
							{label:'&nbsp;Quantidade de acessos&nbsp;'},
							{label:'&nbsp;Quantidade de erros&nbsp;'},
						 ],

						 legend: {
								  show: true,
								  location: 'e',
								  placement: 'outside'
								} 

						});
				
            },
            error: function(xhr, textStatus, errorThrown) {
               //alert(xhr +" "+ textStatus +" "+errorThrown);
               console.log(xhr +" "+ textStatus);
            }
		});

	   },
	   
	exibeGraficos : function (tipo){
		switch (tipo) {
			case "top_services" :
				$("#top_10_min").html();
				$("#top_10_hour").html();
				$("#top_10_day").html();
				$("#top_10_month").html();
				this.grafico_top_services("top_10_hour", "Acessos x hora", "hour");
				this.grafico_top_services("top_10_day", "Acessos x dia", "day");
				this.grafico_top_services("top_10_month", "Acessos x mês", "month");
				break;
			case "qtd_req":
				this.grafico_requisicoes("qtd_req_mes", 'Quantidade de requisições no mês atual');
				this.grafico_requisicoes("qtd_req_mes_ant", 'Quantidade de requisições no mês anterior');
				break;
		}
	}
	   
	   

};

 

