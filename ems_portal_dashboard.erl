%%********************************************************************
%% @title Module ems_portal_dashboard
%% @version 1.0.0
%% @doc Module dashboard
%% @author Everton de Vargas Agilar <evertonagilar@gmail.com>
%% @copyright ErlangMS Team
%%********************************************************************

-module(ems_portal_dashboard).

-include("include/ems_schema.hrl").

-export([sobre/1]).

    
sobre(Request) -> 
	{ok, Request#request{code = 200, 
						 response_data = <<"{\"message\": \"Portal de serviços ERLANGMS\"}"/utf8>>}
	}.

	
	
	

