%%********************************************************************
%% @title Module ems_portal_dashboard
%% @version 1.0.0
%% @doc Module dashboard
%% @author Everton de Vargas Agilar <evertonagilar@gmail.com>
%% @copyright ErlangMS Team
%%********************************************************************

-module(index).

-include("include/ems_schema.hrl").

-export([execute/1]).

    
execute(Request) -> 
	{ok, Request#request{code = 200, 
						 response_data = [{title,  <<"Bem vindo Danilo"/utf8>>}] }
	}.

	
	
	

