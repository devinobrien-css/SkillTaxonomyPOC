import { SubTitle, TitleMd } from "./component.library"
import { Addbutton } from "./custom.library"


export const ExploreSkill = ({skill}) => {
    return (
        <>
            <TitleMd>{skill.name}</TitleMd>
            <br/>
            
            {/* <span className="text-font-dark">{skill.parentCategories.length}</span> */}
            <TitleMd>Parent Categories </TitleMd>
            <SubTitle>All categories this skill appears in</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                <Addbutton />
            </div>

            <TitleMd>Sibling-Skills</TitleMd>
            <SubTitle>All skills related by parent to this skill</SubTitle>
            <br/>

            <TitleMd>Sibling-Categories</TitleMd>
            <SubTitle>All categories related by parent to this skill</SubTitle>
            <br/>

            <TitleMd>Cousin-Skills</TitleMd>
            <SubTitle>All skills related by grandparent to this skill</SubTitle>
            <br/>


            <TitleMd>Users Attached</TitleMd>
            <SubTitle>All users with this skill</SubTitle>
            <br/>

            <TitleMd>Users in sub-categories</TitleMd>
            <SubTitle>All users with skills related to this skill</SubTitle>
        </>
    )
}