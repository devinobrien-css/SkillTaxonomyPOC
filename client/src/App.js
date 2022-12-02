import { SubTitle, TitleLg, TitleMd } from "./components/component.library";
import { Addbutton } from "./components/custom.library";

const App = () => {
  return (
    <div className="bg-bg_lightgray h-screen">
      <div className="p-4">
        <TitleLg>Skill Taxonomy Example</TitleLg>

        <div className="flex mt-8">
          <div className="flex flex-col w-1/6">
            <button className="text-left p-2 my-2">
              skills
            </button>
            <button className="text-left p-2 my-2">
              categories
            </button>
          </div>
          <div className=" p-4 w-1/4">
            

            <div className="bg-white p-2 rounded my-2">
              <p className="uppercase text-2xl text-font-dark hover:shadow-3xl shadow-gray-900">DBMS</p>
              <p>5 sub-categories in this category</p>
              <p>0 skills in this category</p>
            </div>
          </div>
          <div className="w-1/2 p-4 rounded bg-white">
            <TitleMd>DBMS</TitleMd>
            <br/>

            <TitleMd>Sub-Categories</TitleMd>
            <SubTitle>All decendants of this category</SubTitle>
            <Addbutton />
            <br/>

            <TitleMd>Skills Attached</TitleMd>
            <SubTitle>All skills in this category</SubTitle>
            <Addbutton />
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

          </div>
        </div>
      </div>
    </div>
  );
}
export default App;