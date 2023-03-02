import { useEffect } from "react"
import { useSelector } from "react-redux"
import { ApplicationState } from "../../store"
import { selectValue } from "../counter/counterSlice"

export interface CatComponentProps {
    fact: String
}

export const CatComponent: React.FC<CatComponentProps> = (props) => {
    useEffect(() => {
        console.log("child created")
    }, [])

    const count = useSelector(selectValue)

    return <>
        <div>
            {count}
        </div>
        {props.fact}
    </>
} 