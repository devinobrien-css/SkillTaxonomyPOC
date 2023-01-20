# SkillTaxonomyPOC - Server

## Description
The following repo contains a server connecting to a local instance of Neo4J 

## Local Set-up 

### Install Neo4J Desktop 

A running local neo4j instance is required to launch this server. If you haven't previously installed this software, a download [can be found here](https://neo4j.com/download/)

### Create a local database instance

Once Neo4J is open, create new project in the left menu. In this instance, ours is named Taxonomy

<img width="342" alt="Screenshot 2023-01-20 at 11 36 39 AM" src="https://user-images.githubusercontent.com/61803565/213753726-2425f29c-d183-412a-905f-1d011caeaf24.png">

Next, begin creation of a DBMS instance

<img width="854" alt="Screenshot 2023-01-20 at 11 40 57 AM" src="https://user-images.githubusercontent.com/61803565/213754378-bc74e6cf-3e73-42e1-8f74-59db03edb98c.png">

Name the DBMS, give it password of `1234`, and ensure the selected version is 4.4.5

<img width="836" alt="Screenshot 2023-01-20 at 11 42 32 AM" src="https://user-images.githubusercontent.com/61803565/213755771-9102452d-7d04-405f-aadb-73aa0c0a4bda.png">

Next, change the permissions to allow unauthorized access to the database. In the configuration folder, open `neo4j.conf` and alter the following attribute: `dbms.security.auth_enabled=false`

<img width="832" alt="Screenshot 2023-01-20 at 11 57 01 AM" src="https://user-images.githubusercontent.com/61803565/213757699-a8e378af-df15-44ea-b27c-c3c65de3e4ca.png">

Then, import the dataset by opening the DBMS folder and replacing the directory `/data` with the directory in this repo, `/server/data`

<img width="657" alt="Screenshot 2023-01-20 at 11 47 48 AM" src="https://user-images.githubusercontent.com/61803565/213755703-b3e91eba-d5a4-4e17-a268-8ff1dddfc6ca.png">

Lastly, we should install the APOC library, a required dependency

<img width="410" alt="Screenshot 2023-01-20 at 12 11 27 PM" src="https://user-images.githubusercontent.com/61803565/213762234-5d84245f-d842-441d-aa62-3e721a197239.png">

Now, restart your database. The following warning will be prompted- this is because we reduced authentication in the previous step. Click `Continue Anyway`

<img width="905" alt="Screenshot 2023-01-20 at 12 13 37 PM" src="https://user-images.githubusercontent.com/61803565/213762016-f2e3d1b2-69b3-4a9c-8dc5-32a78fc06139.png">


Run the query `MATCH(n) RETURN (n)`; if nodes return, you've successfully set up the DBMS. Now, ensure on the right menu on Neo4J desktop, the port specified is 7687

### Launch Apollo Server

Start the local instance of this server by running `npm start`
