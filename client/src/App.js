import { useState } from "react";
import { ButtonMd, SubTitle, TitleLg, TitleMd } from "./components/component.library";
import { Addbutton, CategoryCardMd, SkillCardMd } from "./components/custom.library";
import { ExploreCategory } from "./components/categories/exploreCategory.component";
import { ExploreSkill } from "./components/skills/exploreSkill.component";
import { tempCategoryData, tempSkillsData } from "./data";
import { Icon } from '@iconify/react';
import { useMutation, useQuery } from "@apollo/client";
import { AddSkill, GetSkills } from "./apollo/skills.mjs";
import { AddCategory, GetCategories } from "./apollo/categories.mjs";

const Toast = ({flag}) => {
  return (
    <div>

    </div>
  )
}

const App = () => {
  const [navToggle,setNavToggle] = useState("categories")
  const [selected,setSelected] = useState()
  const [search,setSearch] = useState("")
  const [toastMessage,setToastMessage] = useState()
  const [toastStatus,setToastStatus] = useState()

  const [newNodeName,setNewNode] = useState()

  const {data:skillsData} = useQuery(GetSkills)
  const {data:categoriesData} = useQuery(GetCategories)

  const [addSkill,{data,loading}] = useMutation(AddSkill,{
      refetchQueries:[GetSkills,GetCategories]
  })

  const [addCategory,{data:newCategory,loading:newCategoryLoading}] = useMutation(AddCategory,{
    refetchQueries:[GetSkills,GetCategories]
  })

  const Toast = () => {
    setTimeout(() => {
      setToastStatus()
      setToastMessage()
    },1200)

    return (
      <div className={`absolute w-full flex flex-col items-center overflow-hidden transition-all transform border ${toastStatus?"h-full":"h-0"}`}>
        <p className="bg-gray-600 p-4 text-white rounded shadow">{toastMessage}</p>
      </div>
    )
  }

  const onAddSkill = async() => {
      if(newNodeName){
        await addSkill({
          variables:{
            input: [
              {
                name: newNodeName
              }
            ]
          }
        })

      }
  }

  const onAddCategory = async() => {
    if(newNodeName){
      await addCategory({
        variables:{
          input: [
            {
              name: newNodeName
            }
          ]
        }
      })
    }
  }


  return (
    <div className="bg-bg_lightgray h-screen relative">
      <Toast />
      <div className="p-4">
        <TitleLg><span className="flex">Skill Taxonomy Example (the skill family tree <Icon icon={"noto:deciduous-tree"} />)</span></TitleLg>

        <div className="flex mt-8">
          <div className="flex flex-col w-1/6">
            <button 
              className={`flex text-left text-2xl p-2 rounded transition-all ${navToggle==="categories"?"bg-gray-300 font-bold":"bg-white font-light text-font-dark"}`} 
              onClick={() => {
                setSelected()
                setNavToggle("categories")
              }}>
              <Icon icon={'carbon:category'} className="my-auto mr-2" width={30}/>categories
            </button>
            <button 
              className={`flex text-left text-2xl p-2 my-2 rounded transition-all ${navToggle==="skills"?"bg-gray-300 font-bold":"bg-white font-light text-font-dark"}`} 
              onClick={() => {
                setSelected()
                setNavToggle("skills")
              }}>
              <Icon icon={'ic:outline-assessment'} className="my-auto mr-2" width={30}/>skills
            </button>
          </div>


          <div className="relative px-4 w-1/6">
            <div className="w-full">
              <input className="w-full rounded p-4 shadow" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className="flex bg-white p-2 mt-2 rounded shadow">
              <input className="w-full p-4 focus:ring-0 outline-none" placeholder="add new..." value={newNodeName} onChange={(e) => setNewNode(e.target.value)}/>
              <ButtonMd  
                color={"blue"}
                onClick={() => {
                    if(navToggle==="skills"){
                        onAddSkill()
                        setToastMessage("New Skill Added")
                        setToastStatus(true)
                    }
                    else{
                      onAddCategory()
                    }
                    setNewNode("")
                }}  
              >Add</ButtonMd>
            </div>

            <div className="h-[72vh] overflow-y-scroll">
              {navToggle==="skills"?(
                  skillsData?.skills
                  .filter(skill => {return skill.name.toLowerCase().includes(search.toLowerCase())})
                  .map((skill,index) => {
                    return <SkillCardMd skill={skill} key={index} onClick={() => setSelected(skill)}/>
                  })
              ):(
                categoriesData?.skillCategories
                .filter(category => {return category.name.toLowerCase().includes(search.toLowerCase())})
                .map((category,index) => {
                  return <CategoryCardMd category={category} key={index} onClick={() => setSelected(category)}/>
                })
              )}
            </div>

          </div>

          <div className="p-4 w-4/6 rounded bg-white shadow relative">
            {selected?(
              navToggle==="skills"?(
                  <ExploreSkill skill={selected} />
              ):(
                  <ExploreCategory category={selected}/>
              )
            ):(<>
              <TitleLg className={"text-center flex flex-col items-center h-full"}><span className="my-auto">Select from the {navToggle}</span></TitleLg>
            </>)}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;