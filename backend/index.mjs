import neo4j from 'neo4j-driver'
import {Neo4jGraphQL} from '@neo4j/graphql'
import {ApolloServer, gql} from "apollo-server"

const typeDefs = gql`
    type User{
        name: String
        knownSkills: [Skill!]! @relationship(type: "HAS_SKILL", direction: OUT)
    }

    type Skill {
        name: String
        inCategory: [SkillCategory!]! @relationship(type: "SUB_CLASS_OF", direction: OUT)
        knownBy: [User!]! @relationship(type: "HAS_SKILL", direction: IN)
    }

    type SkillCategory{
        name: String
        childSkills: [Skill!]! @relationship(type: "SUB_CLASS_OF", direction: IN)
        childCategories: [SkillCategory!]! @relationship(type: "SUB_CLASS_OF", direction: IN)
        parentCategories: [SkillCategory!]! @relationship(type: "SUB_CLASS_OF", direction: OUT)
    }

    type CategoryChild{
        name: String
        type: String
    }

    type Query{
        getSkillSiblings(skillName: String!): [Skill!]! @cypher(statement: """
            MATCH (n:Skill {name: $skillName})-[:SUB_CLASS_OF]->(p:SkillCategory)
            MATCH (p)<-[:SUB_CLASS_OF]-(k:Skill)
            WHERE k.name <> $skillName
            RETURN k
        """)

        getSkillCousins(skillName: String!): [Skill!]! @cypher(statement: """
            OPTIONAL MATCH (n:Skill {name: $skillName})-[:SUB_CLASS_OF*2]->(p:SkillCategory)
            MATCH (p)<-[:SUB_CLASS_OF]-(k:Skill)
            WHERE k.name <> $skillName
            RETURN k
        """)

        getAllChildren(name: String!): [CategoryChild!]! @cypher(statement: """
            MATCH (n:SkillCategory {name: $name})<-[:SUB_CLASS_OF*1..]-(k)   
            RETURN {name: k.name, type: labels(k)[0]}
        """)

        getDirectChildren(name: String!): [CategoryChild!]! @cypher(statement: """
            MATCH (n:SkillCategory {name: $name})<-[:SUB_CLASS_OF]-(k)   
            RETURN {name: k.name, type: labels(k)[0]}
        """)
    }

    type Mutation{
        deleteCategory(name: String!): Int @cypher(statement: """
        OPTIONAL MATCH (n:SkillCategory {name: $name})<-[:SUB_CLASS_OF*1..]-(k)
        DETACH DELETE k
        WITH count(k) as deleted
        MATCH (n:SkillCategory {name: $name})
        DETACH DELETE n
        RETURN deleted+1
        """)
    }
`

const driver = neo4j.driver(
    "bolt://localhost:11007",
    neo4j.auth.basic("neo4j", "1234")
)

const neoSchema = new Neo4jGraphQL({typeDefs, driver})

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({ schema });
  
    server.listen().then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
});