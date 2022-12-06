import { gql } from "@apollo/client";


export const GetSkills = gql`
    query GetSkills($where: SkillWhere) {
        skills(where: $where) {
            name
            inCategory {
                name
            }
        }
    }
`

export const AttachSkillParentCategory = gql`
    mutation AttachSkillParent($where: SkillWhere, $connect: SkillConnectInput) {
        updateSkills(where: $where, connect: $connect) {
            skills {
                name
                inCategory {
                    name
                }
            }
        }
    }
`

export const RemoveSkillParentCategory = gql`
    mutation Mutation($disconnect: SkillDisconnectInput, $where: SkillWhere) {
        updateSkills(disconnect: $disconnect, where: $where) {
            skills {
                name
            }
        }
    }
`

export const AddSkill = gql`
    mutation Mutation($input: [SkillCreateInput!]!) {
        createSkills(input: $input) {
            skills {
                name
            }
        }
    }
`