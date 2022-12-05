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

export const TitleSm = ({children,className,...rest}) => {
    return (
        <p className={`text-xl font-light ${className}`} {...rest}>{children}</p>
    )
}

export const SubTitle = ({children,className,...rest}) => {
    return (
        <p className={`text-xl italic text-font-dark font-light ${className}`} {...rest}>{children}</p>
    )
}

export const ButtonMd = ({children,className,color,...rest}) => {
    const colorways = {
        red:"text-white bg-red-300",
        black:"text-white bg-black",
        blue:"text-white bg-blue-400",
    }

    return (
        <button
            className={`p-3 rounded text-bold text-lg my-2 shadow hover:scale-105 transform transition-all ${colorways[color]}`}
            {...rest}
        >
            {children}
        </button>
    )
}

export const SearchSelect = ({className,options,setSelected,...rest}) => {
    const [search,setSearch] = useState("")
    const [display,setDisplay] = useState("")


    return (

        <div className="relative border-borders border rounded">
            <input 
                className="z-50 w-full bg-transparent p-2" 
                placeholder="Search..." 
                value={search}
                onFocus={()=>{
                    setDisplay(true)
                }}
                onBlur={(e)=>{
                    e.preventDefault()
                    setTimeout(()=>{
                        setDisplay()
                    },"180")
                }}
                onChange={(e) => {
                    setSearch(e.target.value)
                }}
            />
            <div className={`z-30 bg-white top-full absolute p-4 transition-all w-full overflow-y-scroll ${display?"h-72":"h-0 p-0"}`}>
                {options
                .filter(option => {
                    return option.includes(search)
                })
                .map((option,index) =>{
                    return (
                        <p 
                            value={option}
                            key={`option-${index}`}
                            className="cursor-pointer font-light text-xl border-b p-2"
                            onClick={() => {
                                setSearch(option)
                                setSelected(option)
                            }}
                        >
                            {option}
                        </p>
                    )
                })}
            </div>
        </div>
    )
}


export const Modal = ({children,className,...rest}) => {


    return (
        <></>
    )
}