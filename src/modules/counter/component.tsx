import { ChangeEvent, EventHandler, ReactEventHandler } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ApplicationState } from "../../store"
import { increment, decrement, setAmount } from "./counterSlice"

export const CountComponent: React.FC = () => {
    const dispatch = useDispatch()
    return <div>
        <button onClick={ () => dispatch( increment() )} > Add </button>
        <button onClick={ () => dispatch( decrement() ) }> Sub </button>

        <input type={"number"} onChange={ (event: React.ChangeEvent<HTMLInputElement>)  => dispatch( setAmount( Number( event.target.value ) ) ) }></input>
    </div>
}