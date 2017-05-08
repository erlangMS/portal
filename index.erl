-module(index).

-include("include/ems_schema.hrl").

-export([execute/1]).

    
execute(Request) -> 
	{ok, Request#request{code = 200, 
						 response_data = {title, <<"Portal API Management"/utf8>>}}
	}.

	
	
	

