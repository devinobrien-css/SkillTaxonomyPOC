import { gql } from "@apollo/client";


export const GetCategories = gql`
    query GetCategories($where: SkillCategoryWhere) {
        skillCategories(where: $where) {
            childCategories {
                name
            }
            parentCategories {
                name
            }
            childSkills {
                name
            }
            name
        }
    }
`

export const AttachParentCategory = gql`
    mutation AttachParentCategory($where: SkillCategoryWhere, $connect: SkillCategoryConnectInput) {
        updateSkillCategories(where: $where, connect: $connect) {
            skillCategories {
                name
            }
        }
    }
`

export const AddCategory = gql`
    mutation CreateSkillCategories($input: [SkillCategoryCreateInput!]!) {
        createSkillCategories(input: $input) {
            skillCategories {
                name
            }
        }
    }
`