%%********************************************************************
%% @title Module ems_portal_dashboard
%% @version 1.0.0
%% @doc Module dashboard
%% @author Everton de Vargas Agilar <evertonagilar@gmail.com>
%% @copyright ErlangMS Team
%%********************************************************************

-module(ems_portal_dashboard).

-export([dashboard/1, sobre/1, titulo/1, image_url/1]).

-record(?MODULE, {titulo, image_url}).
    
    
dashboard(_Request) -> 
	[{nome_sistema, "Portal ErlangMS"},
	 {breadcrumb, [<<"Portal ErlangMS">>, <<"Aplicativos">>]},
	 {webapps, [{?MODULE, <<"Simar">>, "img/pedidos.png"}, 
				{?MODULE, <<"Relatórios"/utf8>>, "img/relatorios.png"}]}
	 
	 ].

sobre(_Request) -> 
	[{nome_sistema, "Portal ErlangMS"}].

	
titulo(#?MODULE{titulo = Titulo}) -> 
	io:format("aqui\n"),
	Titulo.	

image_url(#?MODULE{image_url = Url}) -> 
	io:format("aqui2\n"),
	Url.	
	
	

