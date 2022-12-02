import { SubTitle, TitleMd } from "./component.library"
import { Addbutton, CategoryCardSm, SkillCardSm } from "./custom.library"


export const ExploreCategory = ({category}) => {
    console.log(category)
    return (
        <>
            <TitleMd>{category.name}</TitleMd>
            <br/>

            <TitleMd>Parent Categories <span className="text-font-dark">{category.parentCategories.length}</span></TitleMd>
            <SubTitle>All predecessors of this category</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                <Addbutton />
                {category.parentCategories.map((category,index) => {
                    return <CategoryCardSm category={category} key={index}/>
                })}
            </div>
            <br/>

            <TitleMd>Sub-Categories <span className="text-font-dark">{category.childCategories.length}</span></TitleMd>
            <SubTitle>All decendants of this category</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                <Addbutton />
                {category.childCategories.map((category,index) => {
                    return <CategoryCardSm category={category} key={index}/>
                })}
            </div>
            <br/>

            <TitleMd>Skills Attached <span className="text-font-dark">{category.childSkills.length}</span></TitleMd>
            <SubTitle>All skills in this category</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                <Addbutton />
                {category.childSkills.map((skill,index) => {
                    return <SkillCardSm skill={skill} key={index}/>
                })}
            </div>
            <br/>

            <TitleMd>Sibling-Categories</TitleMd>
            <SubTitle>All categories related by parent to this category</SubTitle>
            <br/>

            <TitleMd>Cousin-Categories</TitleMd>
            <SubTitle>All categories related by grandparent to this category</SubTitle>
            <br/>


            <TitleMd>Users Attached</TitleMd>
            <SubTitle>All users with skills in this category</SubTitle>
            <br/>

            <TitleMd>Users in sub-categories</TitleMd>
            <SubTitle>All users with skills related to this category</SubTitle>
        </>
    )
}