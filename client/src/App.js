import { useState } from "react";
import { SubTitle, TitleLg, TitleMd } from "./components/component.library";
import { Addbutton, CategoryCardMd, SkillCardMd } from "./components/custom.library";
import { ExploreCategory } from "./components/exploreCategory.component";
import { ExploreSkill } from "./components/exploreSkill.component";
import { tempCategoryData, tempSkillsData } from "./data";
import { Icon } from '@iconify/react';

const App = () => {
  const [navToggle,setNavToggle] = useState("categories")
  const [selected,setSelected] = useState()
  const [search,setSearch] = useState("")

  

  return (
    <div className="bg-bg_lightgray h-screen relative">
      <div className="p-4">
        <TitleLg>Skill Taxonomy Example</TitleLg>

        <div className="flex mt-8">
          <div className="flex flex-col w-1/6">
            <button 
              className={`flex text-left text-xl p-2 my-2 rounded font-bold ${navToggle==="categories"?"bg-gray-300":""}`} 
              onClick={() => {
                setSelected()
                setNavToggle("categories")
              }}>
              <Icon icon={'carbon:category'} className="my-auto mr-2" width={30}/>categories
            </button>
            <button 
              className={`flex text-left text-xl p-2 my-2 rounded font-bold ${navToggle==="skills"?"bg-gray-300":""}`} 
              onClick={() => {
                setSelected()
                setNavToggle("skills")
              }}>
              <Icon icon={'ic:outline-assessment'} className="my-auto mr-2" width={30}/>skills
            </button>
          </div>
          <div className="relative p-4 w-1/4">
            <div className="w-full">
              <input className="w-full rounded p-4" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
            </div>
            <div className="h-[80vh] overflow-y-scroll">
              {navToggle==="skills"?(
                  tempSkillsData
                  .filter(skill => {return skill.name.toLowerCase().includes(search.toLowerCase())})
                  .map((skill,index) => {
                    return <SkillCardMd skill={skill} key={index} onClick={() => setSelected(skill)}/>
                  })
              ):(
                tempCategoryData
                .filter(category => {return category.name.toLowerCase().includes(search.toLowerCase())})
                .map((category,index) => {
                  return <CategoryCardMd category={category} key={index} onClick={() => setSelected(category)}/>
                })
              )}
            </div>

          </div>
          
            {selected?(
              navToggle==="skills"?(
                <div className="w-1/2 p-4 rounded bg-white">
                  <ExploreSkill skill={selected} />
                </div>
              ):(
                <div className="w-1/2 p-4 rounded bg-white">
                  <ExploreCategory category={selected}/>
                </div>
              )
            ):(
              <></>
            )}
        </div>
      </div>
    </div>
  );
}
export default App;