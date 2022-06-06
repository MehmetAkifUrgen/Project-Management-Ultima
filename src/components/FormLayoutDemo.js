import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import Project from '../model/Project';
import ProjectService from '../service/ProjectService';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Message } from 'primereact/message';
import { MultiSelect } from 'primereact/multiselect';

const FormLayoutDemo = () => {

    const [active, setActive] = useState(false);
    let projectService = new ProjectService();
    const [multiselectValue, setMultiselectValue] = useState(null);
    



    let [project, setProject] =
        useState(new Project());

    useEffect(() => {


        setActive(false);

    }, [])

    const multiselectValues = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];





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
                console.log(response);
            })


    }
    const itemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <span className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px', height: '12px' }} />
                <span>{option.name}</span>
            </div>
        );
    };
    const selectedItemTemplate = (option) => {
        if (option) {
            return (
                <div className="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2">
                    <span className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px', height: '12px' }} />
                    <span>{option.name}</span>
                </div>
            );
        }

        return 'Select Countries';
    };



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
        console.log(project)
    }

    return (
        <div className="grid d-flex justify-content-center align-items-center">
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
                         {project.projectName.length <1 ? <Message   severity="error" text="Username is required" /> : null}
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
                    <MultiSelect value={multiselectValue} onChange={(e) => setMultiselectValue(e.value)} options={multiselectValues} optionLabel="name" placeholder="Select Countries" filter
                        itemTemplate={itemTemplate} selectedItemTemplate={selectedItemTemplate} />
                    <div className="col-12 md:col-4">
                        <div className="field-checkbox">
                            <Checkbox id='active' name="active" onChange={(event) => handleInputChange(event)} checked={active}></Checkbox>
                            <label htmlFor="offer">Active</label>
                        </div>
                    </div>
                    <div className='addButtonDiv'>
                        <Button onClick={addProject} className='project-button justify-content-center'>
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
