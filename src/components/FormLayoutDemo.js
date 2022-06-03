import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import Project from '../model/Project';
import ProjectService from '../service/ProjectService';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

const FormLayoutDemo = () => {

    const [active, setActive] = useState(false);
    let projectService = new ProjectService();




    let [project, setProject] =
        useState(new Project());

    useEffect(() => {


        setActive(false);

    }, [])





    // function handleClick(e){

    //   let value=e.target.value
    //   setData(o => [...o,value]);
    //   setEmplooyes(value);

    //   console.log(data)
    // }



    function addProject(event) {
        projectService.addProject({ ...project })
            .then(response => {
                // let pro = [...project];
                // pro.push({ ...project });
                // setProject(pro);
                console.log(response.status);
                alert('Project Added.')

            }).catch(() => {
                alert('Error')
            })


    }



    function handleInputChange(event) {
        const { name, value } = event.target;
        let newProject = { ...project };
        if (name == "active") {
            setActive(o => !o);
            newProject["active"] = !active;
        }
        else {
            newProject[name] = value;
        }


        setProject(newProject);
    }

    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Add Your Project</h5>
                    <div className="projectName">
                        <label htmlFor="projectName">Project Name</label>
                        <InputText id="projectName" name='projectName'
                            type="text"
                            value={project.projectName}
                            onChange={(event) => handleInputChange(event)}
                        />
                    </div>
                    <div className="startDate">
                        <label htmlFor="startDate">Start Date</label>
                        <InputText name='startDate' value={project.startDate}
                            type="date" id="startDate"
                            onChange={(event) => handleInputChange(event)} />
                    </div>
                    <div className="endDate">
                        <label htmlFor="endDate">End Date</label>
                        <InputText name='endDate' type="date" id='endDate' value={project.endDate} onChange={(event) => handleInputChange(event)} ></InputText>
                    </div>
                    <div className="offer">
                        <label htmlFor="offer">Offer</label>
                        <InputText name='offer' id='offer' value={project.offer} onChange={(event) => handleInputChange(event)} ></InputText>
                    </div>
                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <Checkbox id='active' name="active" onChange={(event) => handleInputChange(event)} checked={active}></Checkbox>
                            <label htmlFor="offer">Active</label>
                        </div>
                    </div>
                    <div className='addButtonDiv'>
                        <Button onClick={addProject} className='project-button'>
                            Save
                        </Button>

                    </div>
                </div>
            </div>
        </div>

    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(FormLayoutDemo, comparisonFn);
