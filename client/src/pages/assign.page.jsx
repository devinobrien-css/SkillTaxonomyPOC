import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { GetCategories } from "../apollo/categories.mjs"
import { AddSkill, GetSkills } from "../apollo/skills.mjs"
import { AssignUsers } from "../components/assign/assignUsers.component.jsx"
import { ButtonMd, TitleLg } from "../components/component.library"
import { SkillCardMd, SkillCardSm } from "../components/custom.library"
import { ExploreSkill } from "../components/skills/exploreSkill.component"



export const Assign = () => {
    const [selected,setSelected] = useState([])
    const [search,setSearch] = useState("")
    const [newNode,setNewNode] = useState("")

    const {data:skillsData} = useQuery(GetSkills)

    const [addSkill,{data,loading}] = useMutation(AddSkill,{
        refetchQueries:[GetSkills,GetCategories]
    })

    const onAddSkill = async() => {
        if(newNode){
            await addSkill({
                variables:{
                input: [
                    {
                    name: newNode
                    }
                ]
                }
            })
        }
    }

    return (
        <>
            <div className="relative px-4 w-1/6">
                <div className="w-full">
                    <input className="w-full rounded p-4 shadow" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
                </div>

                <div className="h-[72vh] overflow-y-scroll">
                    {skillsData?.skills
                    .filter(skill => {return skill.name.toLowerCase().includes(search.toLowerCase())})
                    .filter(skill => {return !selected.map(selectedSkill => {return skill.name === selectedSkill.name}).includes(true)})
                    .map((skill,index) => {
                        return <SkillCardMd skill={skill} key={index} onClick={() => setSelected([...selected,skill])}/>
                    })}
                </div>

            </div>

            <div className="p-4 w-4/6 rounded bg-white shadow relative">
                {selected?(
                    <AssignUsers selected={selected} setSelected={setSelected} />
                ):(
                    <TitleLg className="my-48 text-center">Select a skill to begin</TitleLg>
                )}
            </div>
        </>
    )

}