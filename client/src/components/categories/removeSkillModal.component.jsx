import { ButtonMd, SubTitle, TitleMd } from "../component.library"
import { Icon } from '@iconify/react';
import { useMutation } from "@apollo/client";
import {  GetSkills, RemoveSkillParentCategory } from "../../apollo/skills.mjs";
import { GetCategories } from "../../apollo/categories.mjs";

export const RemoveSkillModal = ({skill,category,setModal}) => {
    const [removeChild, {data,loading}] = useMutation(RemoveSkillParentCategory,{
        variables:{
            disconnect: {
                inCategory: [
                    {
                        where: {
                            node: {
                                name: category?.name
                            }
                        }
                    }
                ]
            },
            where: {
                name: skill?.name
            }
        },
        refetchQueries:[GetSkills,GetCategories]
    })

    const onSubmit = async() => {
        await removeChild()
    }

    return (
        <div className="p-4 relative flex flex-col items-center">
            {loading?(
                <div className="bg-white absolute h-full w-full z-40 top-0 left-0 flex flex-col items-center">
                    <Icon icon={"eos-icons:loading"}  className="my-auto" width={50} />
                </div>
            ):(<></>)}
            {data?(
                <div className="bg-white absolute h-full w-full z-40 top-0 left-0 flex flex-col items-center">
                    <div className={"my-auto"}>
                        <TitleMd className={"text-center"}>Skill removed from Parent</TitleMd>
                        <SubTitle className={"text-center"}>You can now close this window</SubTitle>
                    </div>
                </div>
            ):(<></>)}


            <div className="h-full py-16 w-full flex flex-col items-center top-0 left-0">
                <div className="my-auto">
                    <TitleMd>Disconnect <span className="font-bold italic text-font-dark">{skill?.name}</span> from <span className="font-bold italic text-font-dark">{category?.name}</span>?</TitleMd>
                    
                    <br/>
                    <div className="flex justify-evenly">
                        <ButtonMd
                            color="blue"
                            onClick={onSubmit}
                        >
                            Confirm
                        </ButtonMd>
                        <ButtonMd
                            color="red"
                            onClick={()=>setModal()}
                        >
                            Cancel
                        </ButtonMd>
                    </div>
                </div>
            </div>
        </div>
    )
}