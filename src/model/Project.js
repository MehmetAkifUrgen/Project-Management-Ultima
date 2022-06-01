export default class Project {
    constructor(pro = {
        active : ["No", "Yes"],
        description : "",
        endDate : "",
        offer:"",
        projectName:"",
        startDate:""
    }) {
        this.active = pro.active;
        this.description = pro.description;
        this.endDate = pro.endDate;
        this.offer = pro.offer;
        this.projectName = pro.projectName;
        this.startDate = pro.startDate;
    }
};