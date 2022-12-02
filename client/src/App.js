import { useState } from "react";
import { SubTitle, TitleLg, TitleMd } from "./components/component.library";
import { Addbutton, CategoryCardMd } from "./components/custom.library";
import { ExploreCategory } from "./components/exploreCategory.component";
import { tempCategoryData } from "./data";
import { Icon } from '@iconify/react';

const App = () => {

  const [navToggle,setNavToggle] = useState("skills")
  const [selected,setSelected] = useState()

  return (
    <div className="bg-bg_lightgray h-screen">
      <div className="p-4">
        <TitleLg>Skill Taxonomy Example</TitleLg>

        <div className="flex mt-8">
          <div className="flex flex-col w-1/6">
            <button className={`flex text-left text-xl p-2 my-2 rounded font-bold ${navToggle==="categories"?"bg-gray-300":""}`} onClick={() => setNavToggle("categories")}>
              <Icon icon={'carbon:category'} className="my-auto mr-2" width={30}/>categories
            </button>
            <button className={`flex text-left text-xl p-2 my-2 rounded font-bold ${navToggle==="skills"?"bg-gray-300":""}`} onClick={() => setNavToggle("skills")}>
              <Icon icon={'ic:outline-assessment'} className="my-auto mr-2" width={30}/>skills
            </button>
          </div>
          <div className=" p-4 w-1/4">
            {navToggle==="skills"?(
                <></>
            ):(
              tempCategoryData.map((category,index) => {
                return <CategoryCardMd category={category} key={index} onClick={() => setSelected(category)}/>
              })
            )}
          </div>
          
            {selected?(
              navToggle==="skills"?(
                <div className="w-1/2 p-4 rounded bg-white"></div>
              ):(
                <div className="w-1/2 p-4 rounded bg-white"><ExploreCategory category={selected}/></div>
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