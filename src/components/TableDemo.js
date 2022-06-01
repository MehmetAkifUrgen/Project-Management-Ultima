import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import ProjectService from '../../src/service/ProjectService';
import Project from '../model/Project';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';


const TableDemo = () => {

    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [proj, setProj] = useState(new Project());
    const [expandedRows, setExpandedRows] = useState(null);
    const [project, setProject] = useState([]);
    const [selectedProject, setSelectedProject] = useState(new Array());
    const [updateProject, setUpdateProject] = useState(null);
    const [id, setId] = useState("");
    const [checkboxValue, setCheckboxValue] = useState(null);

    


    let projectService = new ProjectService();

    async function getAll() {
        setProject(await projectService.getAllProjects());
    }

    async function getById() {
        setUpdateProject(await projectService.getById(id));
    }




    useEffect(() => {
        setLoading2(true);
        setLoading1(false)
        getAll();


    }, []);



    const activeBody = (rowData) => {
        let value = rowData.active.toString();
        return <span className='customer-badge'>{value}</span>
    }
    function deleteProjectById(event, id) {
        projectService.deleteProject(id)
            .then(pro => {
                setProj(pro);
                setProject([...project].filter(pro => pro.id !== id));
                getAll();
            });
    }

    function updateProjectById(event, id) {
        projectService.updateProjectbyId({ ...selectedProject }, id)
            .then(pro => {
                setUpdateProject(pro);
                setProj([...proj]);
                console.log(pro);
            });
    }

    const deleteItem = (rowData) => {

        return <i onClick={(event) => deleteProjectById(event, rowData.id)} className='pi pi-times' ></i>
    }


    const updatededProject = (rowData) => {

        return <Button onClick={() => { setSelectedProject(rowData); setId(rowData.id); setCheckboxValue(rowData.active) }} label='Update' className='mr-2 mb-2'></Button>
    }
    

    console.log(selectedProject);

    function handleInputChange(event) {
        const { name, value } = event.target;
        console.log(value);
        let newProject = { ...selectedProject };
        // newProject["active"] = checkboxValue;
        newProject[name] = value;
        setSelectedProject(newProject);

    }





    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card p-fluid">
                    <h5>Update Project</h5>
                    <div className="projectName">
                        <label htmlFor="projectName">Project Name</label>
                        <InputText id="projectName" name='projectName'
                            type="text"
                            value={selectedProject.projectName}
                            onChange={(event) => handleInputChange(event)}
                        />
                    </div>
                    <div className="startDate">
                        <label htmlFor="startDate">Start Date</label>
                        <InputText name='startDate' value={selectedProject.startDate}
                            type="date" id="startDate"
                            onChange={(event) => handleInputChange(event)} />
                    </div>
                    <div className="endDate">
                        <label htmlFor="endDate">End Date</label>
                        <InputText name='endDate' type="date" id='endDate' value={selectedProject.endDate} onChange={(event) => handleInputChange(event)} ></InputText>
                    </div>
                    <div className="status">
                    <h5>Status</h5>
                    <div className="grid">
                        <div className="col-12 md:col-4">
                            <div className="field-checkbox">
                            <Checkbox id='active' name='active' onChange={e => setCheckboxValue(e.checked)} checked={checkboxValue}></Checkbox>
                            </div>
                        </div>
                        </div>
                        </div>
                    <div className='addButtonDiv'>
                        <Button onClick={(event) => updateProjectById(event, id)} className='project-button'>
                            Update
                        </Button>

                    </div>
                </div>
                <div className="card">
                    <h5>Project List</h5>
                    <DataTable onRowSelect={(data) => console.log(data)} value={project} paginator className="p-datatable-gridlines" showGridlines rows={10}
                        dataKey="id" filterDisplay="menu" loading={loading1} responsiveLayout="scroll"
                        emptyMessage="No Project found.">
                        <Column field="projectName" header="Name" filter filterPlaceholder="Search by Project Name" style={{ minWidth: '12rem' }} sortable />
                        <Column field="startDate" header="Start Date" style={{ minWidth: '12rem' }} filter filterPlaceholder="Search by Start Date" sortable
                        />
                        <Column field="endDate" filterPlaceholder="Search by End Date" header="End Date" filterField="endDate" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }}
                            filter sortable />
                        <Column field="offer" filterPlaceholder="Search by Offer" header="Offer" filterField="offer" dataType="date" style={{ minWidth: '10rem' }}
                            filter sortable />
                        <Column body={activeBody} field="active" header="Status" filterPlaceholder="Search by Is Active" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} filter sortable />
                        <div body={deleteItem} filter ></div>
                        <div body={updatededProject} filter />
                    </DataTable>
                    <div align="right" >
                        <Button label='Add Project' className='mr-2 mb-2'></Button>
                    </div>
                </div>
            </div>


        </div>

    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(TableDemo, comparisonFn);
