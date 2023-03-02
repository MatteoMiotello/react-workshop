
export interface Fact {
    fact: String,
    length: Number
}

export class CatClient {
    private baseUrl: String

    constructor() {
        this.baseUrl = "https://catfact.ninja"
    }

    public getFact(): Promise<Fact> {
        return fetch( this.baseUrl + "/fact" ).then<Fact>( res => res.json() )       
    }

}