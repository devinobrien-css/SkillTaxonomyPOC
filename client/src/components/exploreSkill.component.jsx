import { useState } from "react"
import { ButtonMd, Modal, SearchSelect, SubTitle, TitleMd, TitleSm } from "./component.library"
import { Addbutton } from "./custom.library"
import { Icon } from '@iconify/react';
import { tempCategoryData } from "../data";




export const AddCategoryModal = ({skill}) => {
    const [selectedCategory,setSelected] = useState()

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

export const ExploreSkill = ({skill}) => {
    const [addCategoryModal,setAddCategoryModal] = useState()

    return (
        <>
            <Modal
                display={addCategoryModal}
                setDisplay={setAddCategoryModal}
            >
                {/* <AddCategoryModal skill={skill}/> */}
            </Modal>
            <TitleMd>{skill.name}</TitleMd>
            <br/>
            
            <span className="text-font-dark"></span>
            <TitleMd>Parent Categories </TitleMd>
            <SubTitle>All categories this skill appears in</SubTitle>
            <div className="flex [&>*]:my-auto [&>*]:mx-2 w-full overflow-x-scroll">
                <Addbutton onClick={()=>setAddCategoryModal("add-parent")}/>
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