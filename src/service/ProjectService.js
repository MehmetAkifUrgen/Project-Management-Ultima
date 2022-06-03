import Axios from "axios";

const BASE_URL =
    "http://localhost:8082/project";

export default class ProjectService {



    addProject = async (pro) => {
        let data = JSON.stringify(pro);
        let headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        return Axios.post(BASE_URL + '/addProject', data,{headers}).then(response => response.data).catch(function (error) {
            console.log(error);
        })
    }

    getAllProjects = async () => {
        return fetch(BASE_URL + "/getAll", {
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json());
    }

    getById = async (id) => {
        return fetch(BASE_URL + "/getById/" + id, {
            headers: {
                "Accept": "application/json"
            }
        }).then(res => res.json());
    }
    updateProjectbyId(bk, id) {
        return fetch(`${BASE_URL + "/updateProject"}/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bk)
        }).then(response => response.json())
    }
    deleteProject = async (id) => {
        return fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json"
            }
        }).then(response => response.json())
    }
}