import { Component, ReactNode } from "react";
import { CatClient, Fact } from "./client";
import { CatComponentProps } from "./component";

interface CatComponentState {
    fact: Fact | null | Error
}

export class CatClassComponent extends Component<any, CatComponentState> {
    constructor(props: any) {
        super(props)
        this.state = {
            fact: null
        }
    }

    componentDidMount(): void {
        ( new CatClient ).getFact().then( (res: Fact) => this.setState( { fact: res } ) )    

        console.log( "created" )
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<CatComponentState>, snapshot?: any): void {
        console.log ( "update" ) 
    }

    render(): ReactNode {
        if ( this.state.fact === null ) {
            return <div> Loading... </div>
        }

        if ( this.state.fact instanceof Error ) {
            return <div>
                Error: {this.state.fact.message}
            </div>
        }

        return <div>
            {this.state.fact.fact}
        </div>
    }
}