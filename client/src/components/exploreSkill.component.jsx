import { useState } from "react"
import { ButtonMd, SearchSelect, SubTitle, TitleMd, TitleSm } from "./component.library"
import { Addbutton } from "./custom.library"
import { Icon } from '@iconify/react';
import { tempCategoryData } from "../data";




const AddCategoryModal = ({skill}) => {
    const [selectedCategory,setSelected] = useState()

    console.log(selectedCategory)
    return (
        <div className="p-4">
            <TitleMd>Add a Parent to this Skill</TitleMd>
            <SubTitle>Search and select a category to add this skill to</SubTitle>

            <br/>
            <br/>
            <TitleSm>Select a Category</TitleSm>
            <SearchSelect 
                options={tempCategoryData.map(category => {return category.name})}
                setSelected={setSelected}
            />
            <br/>
            <br/>

            {selectedCategory?(
                <>
                    <TitleSm>Confirm Selection</TitleSm>
                    <SubTitle>Add skill <span className="font-bold">{skill.name}</span> to category <span className="font-bold">{selectedCategory}</span>?</SubTitle>
                    <div className="[&>*]:mx-4">
                        <ButtonMd
                            color="blue"
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

const modalStates = {
    "add-parent":AddCategoryModal
}


export const ExploreSkill = ({skill}) => {
    const [modal,setModal] = useState()
    const ModalContent = modalStates[modal]

    return (
        <>
            {modal?(
                <div className="z-50 absolute h-full w-full bg-gray-400 bg-opacity-70 shadow top-0 left-0 flex flex-col items-center">
                    <div className="bg-white w-1/2 h-1/2 relative shadow-xl my-auto rounded">
                        <Icon icon={"mdi:alpha-x-box-outline"} className="absolute top-1 right-1" width={40} onClick={()=>setModal()}/>
                        <ModalContent skill={skill}/>
                    </div>
                </div>
            ):(
                <></>
            )}
            <TitleMd>{skill.name}</TitleMd>
            <br/>
            
            {/* <span className="text-font-dark">{skill.parentCategories.length}</span> */}
            <TitleMd>Parent Categories </TitleMd>
            <SubTitle>All categories this skill appears in</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                <Addbutton onClick={()=>setModal("add-parent")}/>
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