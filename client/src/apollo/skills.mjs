import { gql } from "@apollo/client";


export const GetSkills = gql`
    query GetSkills($where: SkillWhere) {
        skills(where: $where) {
            name
        }
    }
`

export const AttachSkillParentCategory = gql`
    mutation UpdateSkills($where: SkillWhere, $connect: SkillConnectInput) {
        updateSkills(where: $where, connect: $connect) {
            skills {
                name
            }
        }
    }
`