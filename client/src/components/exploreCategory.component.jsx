import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { AttachParentCategory, GetCategories } from "../apollo/categories.mjs"
import { AttachSkillParentCategory, GetSkills } from "../apollo/skills.mjs"
import { ButtonMd, Modal, SearchSelect, SubTitle, TitleMd, TitleSm } from "./component.library"
import { Addbutton, CategoryCardSm, SkillCardSm } from "./custom.library"

const AddSkillModal = ({category}) => {
    const [selectedSkill,setSelected] = useState()
    const {data:skillData} = useQuery(GetSkills)
    const [attachParent,{loading}] = useMutation(AttachSkillParentCategory)

    const onSubmit = async() => {
        await attachParent({
            variables:{
                where: {
                    name: selectedSkill
                },
                connect: {
                    inCategory: [
                        {
                            where: {
                                node: {
                                    name: category.name
                                }
                            }
                        }
                    ]
                }
            },
            refetchQueries:[GetCategories]
        })
    }

    return (
        <div className="p-4">
            <TitleMd>Add a Child to this Category</TitleMd>
            <SubTitle>Search and select a category to add this skill to</SubTitle>

            <br/>
            <br/>
            <TitleSm>Select a Skill</TitleSm>
            <SearchSelect 
                options={skillData?.skills.map(category => {return category.name})}
                setSelected={setSelected}
            />

            <br/>
            <br/>

            {selectedSkill?(
                <>
                    <TitleSm>Confirm Selection</TitleSm>
                    <SubTitle>Attach skill <span className="font-bold">{selectedSkill}</span> to parent <span className="font-bold">{category.name}</span>?</SubTitle>
                    <div className="[&>*]:mx-4">
                        <ButtonMd
                            color="blue"
                            onClick={onSubmit}
                        >
                            Confirm
                        </ButtonMd>
                        <ButtonMd
                            color="red"
                            onClick={()=>{
                                setSelected()
                            }}
                        >
                            Cancel
                        </ButtonMd>
                    </div>
                </>
            ):(
                <>
                </>
            )}  
        </div>
    )
}

const AddChildModal = ({category}) => {
    const [selectedChild,setSelected] = useState()
    const {data:categoryData} = useQuery(GetCategories)
    const [attachParent,{loading}] = useMutation(AttachParentCategory)

    const onSubmit = async() => {
        await attachParent({
            variables:{
                where: {
                    name: selectedChild
                },
                connect: {
                    parentCategories: [
                        {
                            where: {
                                node: {
                                    name: category.name
                                }
                            }
                        }
                    ]
                }
            },
            refetchQueries:[GetCategories]
        })
    }

    return (
        <div className="p-4">
            <TitleMd>Add a Child to this Category</TitleMd>
            <SubTitle>Search and select a category to add this skill to</SubTitle>

            <br/>
            <br/>
            <TitleSm>Select a Category</TitleSm>
            <SearchSelect 
                options={categoryData?.skillCategories.map(category => {return category.name})}
                setSelected={setSelected}
            />

            <br/>
            <br/>

            {selectedChild?(
                <>
                    <TitleSm>Confirm Selection</TitleSm>
                    <SubTitle>Attach category <span className="font-bold">{selectedChild}</span> to parent <span className="font-bold">{category.name}</span>?</SubTitle>
                    <div className="[&>*]:mx-4">
                        <ButtonMd
                            color="blue"
                            onClick={onSubmit}
                        >
                            Confirm
                        </ButtonMd>
                        <ButtonMd
                            color="red"
                            onClick={()=>{
                                setSelected()
                            }}
                        >
                            Cancel
                        </ButtonMd>
                    </div>
                </>
            ):(
                <>
                </>
            )}  
        </div>
    )
}

const AddParentModal = ({category}) => {
    const [selectedParent,setSelected] = useState()
    const {data:categoryData} = useQuery(GetCategories)
    const [attachParent,{loading}] = useMutation(AttachParentCategory)

    const onSubmit = async() => {
        await attachParent({
            variables:{
                where: {
                    name: category.name
                },
                connect: {
                    parentCategories: [
                        {
                            where: {
                                node: {
                                    name: selectedParent
                                }
                            }
                        }
                    ]
                }
            },
            refetchQueries:[GetCategories]
        })
    }

    return (
        <div className="p-4">
            <TitleMd>Add a Parent to this Category</TitleMd>
            <SubTitle>Search and select a category to add this skill to</SubTitle>

            <br/>
            <br/>
            <TitleSm>Select a Category</TitleSm>
            <SearchSelect 
                options={categoryData?.skillCategories.map(category => {return category.name})}
                setSelected={setSelected}
            />

            <br/>
            <br/>

            {selectedParent?(
                <>
                    <TitleSm>Confirm Selection</TitleSm>
                    <SubTitle>Attach category <span className="font-bold">{category.name}</span> to parent <span className="font-bold">{selectedParent}</span>?</SubTitle>
                    <div className="[&>*]:mx-4">
                        <ButtonMd
                            color="blue"
                            onClick={onSubmit}
                        >
                            Confirm
                        </ButtonMd>
                        <ButtonMd
                            color="red"
                            onClick={()=>{
                                setSelected()
                            }}
                        >
                            Cancel
                        </ButtonMd>
                    </div>
                </>
            ):(
                <>
                </>
            )}  
        </div>
    )
}

export const ExploreCategory = ({category}) => {
    const [addParent,setAddParent] = useState()
    const [addChild,setAddChild] = useState()
    const [addSkill,setAddSkill] = useState()

    const {data} = useQuery(GetCategories,{
        variables:{
            where:{
                name:category.name
            }
        }
    })

    return (
        <>
            <Modal
                display={addParent}
                setDisplay={setAddParent}
            >   
                <AddParentModal category={data?.skillCategories[0]} />
            </Modal>
            <Modal
                display={addChild}
                setDisplay={setAddChild}
            >
                <AddChildModal category={data?.skillCategories[0]}/>
            </Modal>
            <Modal
                display={addSkill}
                setDisplay={setAddSkill}
            >
                <AddSkillModal category={data?.skillCategories[0]} />
            </Modal>
            <TitleMd>{data?.skillCategories[0].name}</TitleMd>
            <br/>

            <TitleMd>Parent Categories <span className="text-font-dark">{data?.skillCategories[0].parentCategories.length}</span></TitleMd>
            <SubTitle>All predecessors of this category</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                <Addbutton onClick={() =>setAddParent(true)}/>
                {data?.skillCategories[0].parentCategories.map((category,index) => {
                    return <CategoryCardSm category={category} key={index} />
                })}
            </div>
            <br/>

            <TitleMd>Sub-Categories <span className="text-font-dark">{data?.skillCategories[0].childCategories.length}</span></TitleMd>
            <SubTitle>All decendants of this category</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                <Addbutton onClick={() => setAddChild(true)} />
                {data?.skillCategories[0].childCategories.map((category,index) => {
                    return <CategoryCardSm category={category} key={index}/>
                })}
            </div>
            <br/>

            <TitleMd>Skills Attached <span className="text-font-dark">{data?.skillCategories[0].childSkills.length}</span></TitleMd>
            <SubTitle>All skills in this category</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                <Addbutton onClick={() =>  setAddSkill(true)} />
                {data?.skillCategories[0].childSkills.map((skill,index) => {
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