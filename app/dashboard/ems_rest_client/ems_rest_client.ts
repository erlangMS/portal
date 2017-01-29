export class EmsRestClient {
    private resource_url: string = null;

    constructor(){

    }

    from(url: string): EmsRestClient{
        let client : EmsRestClient = new EmsRestClient();
        client.resource_url = url;
        return client;
    }



}
