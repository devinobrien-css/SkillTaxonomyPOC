

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