



export const CategoryCardMd = ({category,className,...rest}) => {
    return (
        <div className={`bg-white p-2 rounded my-2 ${className}`} {...rest}>
            <p className="uppercase text-2xl text-font-dark hover:shadow-3xl shadow-gray-900">{category.name}</p>
            <p>{category.categoryConnections.length} sub-categories in this category</p>
            <p>35 skills in this category</p>
        </div>
    )
}