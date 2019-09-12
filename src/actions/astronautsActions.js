import { gql } from "apollo-boost";
import moment from "moment"

export const startPopulateAstronauts = (client, dispatch) => {
    client.query({
        query: gql`
            {
                astronauts{
                    id
                    name
                    surname
                    superPower
                    birthDate
                }
            }
        `
    }).then(res => {
        dispatch(populateAstronauts(res))
    })
}

const populateAstronauts = (res) => {
    const transformed = res.data.astronauts.map(astronaut => {
        return {
            ...astronaut,
            birthDate: moment.unix(astronaut.birthDate).toDate()
        }
    })
    return {
        type: "POPULATE_ASTRONAUTS",
        astronauts: transformed
    }
}

export const startDeleteAstronaut = (id, client, dispatch) => {

    client.mutate({
        variables: { id },
        mutation: gql`
          mutation deleteAstronaut($id: String!){
            deleteAstronaut(id: $id) {
              name
            }
          }
        `,
    }).then(res => {
        dispatch(deleteAstronaut(id))
    })

}

const deleteAstronaut = (id) => ({
    type: "DELETE_ASTRONAUT",
    id
})

export const startUpdateAstronaut = (data, client, dispatch) => {

    client.mutate({
        variables: {
            ...data
        },
        mutation: gql`
          mutation updateAstronaut($id: String!, $name: String, $superPower: String, $surname: String, $birthDate: Int){
            updateAstronaut(id: $id, data:{
                name: $name,
                surname: $surname,
                superPower: $superPower,
                birthDate: $birthDate
                }) {
              name
            }
          }
        `,
    }).then(res => {
        dispatch(updateAstronaut(data))
    })

}

const updateAstronaut = (data) => {

    const transformed = {
        ...data,
        birthDate: moment.unix(data.birthDate).toDate()
    }

    return {
        type: "UPDATE_ASTRONAUT",
        data: transformed
    }
}

export const startCreateAstronaut = (data, client, dispatch) => {
    client.mutate({
        variables: {
            ...data
        },
        mutation: gql`
          mutation createAstronaut($name: String!, $superPower: String!, $surname: String!, $birthDate: Int!){
            createAstronaut(data:{
                name: $name,
                surname: $surname,
                superPower: $superPower,
                birthDate: $birthDate
                }) {
              id      
              name
              surname
              superPower
              birthDate
            }
          }
        `,
    }).then(res => {
        dispatch(createAstronaut(res.data.createAstronaut))
    })

}

const createAstronaut = (data) => {
    const transformed = {
        ...data,
        birthDate: moment.unix(data.birthDate).toDate()
    }

    return {
        type: "CREATE_ASTRONAUT",
        data: transformed
    }
}