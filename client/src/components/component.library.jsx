import { useState } from "react"


export const TitleLg = ({children,className,...rest}) => {
    return (
        <p className={`text-5xl font-light ${className}`} {...rest}>{children}</p>
    )
}

export const TitleMd = ({children,className,...rest}) => {
    return (
        <p className={`text-3xl font-light ${className}`} {...rest}>{children}</p>
    )
}

export const SubTitle = ({children,className,...rest}) => {
    return (
        <p className={`text-xl italic text-font-dark font-light ${className}`} {...rest}>{children}</p>
    )
}

export const SearchSelect = ({className,options,...rest}) => {
    const [search,setSearch] = useState("")


    return (

        <div className="relative border-borders border rounded">
            <input placeholder="Search..." className="w-full p-2 bg-transparent" onFocus={()=>{}}/>
            <div className="absolute">
                {options.map(option =>{
                    return <p>{option}</p>
                })}
            </div>
        </div>
    )
}