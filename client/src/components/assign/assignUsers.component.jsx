import { TitleLg, TitleMd } from "../component.library"
import { SkillCardSm } from "../custom.library"


export const AssignUsers = ({selected,setSelected}) => {
    
    
    return (
        <div>
            <TitleLg>Draft Users based off of Selected Skills</TitleLg>
            <br/>

            <TitleMd>Selected Skills</TitleMd>
            <div className="flex">
                {selected.map((skill,index)=> {
                    return (
                        <SkillCardSm 
                            key={`skill-selected-${index}`}
                            skill={skill}
                            className=" mx-2"
                            onClick={()=>{
                                const out = selected.filter(selectedSkill => {
                                    return selectedSkill.name !== skill.name
                                })
                                setSelected(out)
                            }}
                        >{skill.name}</SkillCardSm>
                    )
                })}
            </div>
            <br/>
            
            <TitleMd>Recommended Users</TitleMd>
        </div>
    )
}