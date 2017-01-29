
export class Catalogo {

	public id: number;
	public name: string;
	public lang: string = "erlang";
	public version: string = "1.0.0";
	public url: string;
	public comment: string;
	public owner: string = "ems-bus";
	public type: string = "GET";
	public authentication : "basic";
	public service: string = "br.unb.unb_aula.facade.PessoaFacade:findById";
	public debug: boolean = false;
	public public: boolean = true;

	constructor(){}

}
