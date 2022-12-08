import { ButtonMd, NumericalInput, TitleLg, TitleMd, TitleSm } from "../component.library"
import { SkillCardSm } from "../custom.library"


export const AssignUsers = ({selected,setSelected}) => {

    const onFindUsers = async() => {


    }
    
    
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

            <TitleMd>Search Specifications</TitleMd>
            <TitleSm>Minimum Skills Required</TitleSm>
            <NumericalInput defaultValue={selected.length} max={selected.length} min={0}/>

            <TitleSm>Number of Users to Return</TitleSm>
            <NumericalInput defaultValue={5} max={15} min={0}/>
            <br/>
            <br/>

            <div className="[&>*]:mx-2">
                <ButtonMd color={"blue"} onClick={onFindUsers}>Find Users</ButtonMd>
                <ButtonMd color={"red"} onClick={()=>setSelected([])}>Clear Selected</ButtonMd>
            </div>
            <br/>


            <div className={` `}>
                <TitleMd>Recommended Users</TitleMd>
            </div>
        </div>
    )
}