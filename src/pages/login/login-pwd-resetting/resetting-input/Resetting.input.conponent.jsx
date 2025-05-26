import { InputPrimary } from "../../../../components";
import { ResttingTitle } from "../resetting-title/resetting.title.conponent";


export function ResettingInput({className, text, placeholder, onChange, type}) {
    return(

        <>
            <ResttingTitle className={className} text={text} />
            <InputPrimary type={type} placeholder={placeholder} onChange={onChange}/> <br/>
        </>
    )
}