import React from "react";
import axios from "axios";
import ProjectToolList from "./ProjectToolList";
import AddProjectFormPhotos from "./AddProjectFormPhotos";

class AddProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project_name: "",
      project_description: "",
      needed_tool: "",
      project_photo: "",
      help: false,
      needed_tools: [],
      project_photos: [],
    };
    this.handleGetFields = this.handleGetFields.bind(this);
    this.handleToggleNeedHelp = this.handleToggleNeedHelp.bind(this);
    this.handleAddToolToProjectToolList = this.handleAddToolToProjectToolList.bind(
      this
    );
    this.handleAddPhotoToProjectPhotoList = this.handleAddPhotoToProjectPhotoList.bind(
      this
    );
    this.handleDeleteFromProjectToolList = this.handleDeleteFromProjectToolList.bind(
      this
    );
    this.handleDeleteFromProjectPhotoList = this.handleDeleteFromProjectPhotoList.bind(
      this
    );
    this.handleSubmitNewProject = this.handleSubmitNewProject.bind(this);
  }

  handleGetFields(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleToggleNeedHelp() {
    const { help } = this.state;
    this.setState({ help: !help });
  }

  handleAddToolToProjectToolList() {
    const { needed_tool, needed_tools } = this.state;
    if (needed_tools.indexOf(needed_tool) === -1 && needed_tool.length > 1) {
      const revisedTools = needed_tools.concat(needed_tool);
      this.setState({
        needed_tools: revisedTools,
      });
    }
    let inputField = document.querySelector('input[name="needed_tool"]');
    inputField.value = "";
  }

  handleAddPhotoToProjectPhotoList() {
    const { project_photo, project_photos } = this.state;
    if (
      project_photos.indexOf(project_photo) === -1 &&
      project_photo.length > 3
    ) {
      const revisedPhotos = project_photos.concat(project_photo);
      this.setState({ project_photos: revisedPhotos });
      let inputField = document.querySelector('input[name="project_photo"]');
      inputField.value = "";
    }
  }

  handleDeleteFromProjectToolList(e) {
    const { needed_tools } = this.state;
    let v = e.target.name;
    let updatedTools = [];
    needed_tools.forEach((tool) => {
      if (tool !== v) {
        updatedTools.push(tool);
      }
    });
    this.setState({ needed_tools: updatedTools });
  }

  handleDeleteFromProjectPhotoList() {
    const { project_photos } = this.state;
    let v = e.target.name;
    let updatedPhotos = [];
    project_photos.forEach((photo) => {
      if (photo !== v) {
        updatedPhotos.push(photo);
      }
    });
    this.setState({ project_photos: updatedPhotos });
  }

  handleSubmitNewProject() {
    const {
      user_id,
      project_name,
      project_description,
      help,
      needed_tools,
      project_photos,
    } = this.state;
    let newUserProjectObj = {
      project_name: project_name,
      project_description: project_description,
      help: help,
      project_photos: project_photos,
      needed_tools: needed_tools,
    };
    console.log(newUserProjectObj);
    axios
      .post(`/users/${user_id}/projects`, newUserProjectObj)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const { toggleAddProjectForm } = this.props;
    const { needed_tools, project_photos } = this.state;
    return (
      <div>
        Project Name:{" "}
        <input
          type="text"
          name="project_name"
          onChange={this.handleGetFields}
        />
        Project Description:{" "}
        <input
          type="text"
          name="project_description"
          onChange={this.handleGetFields}
        />
        {needed_tools.length > 0 && (
          <ProjectToolList
            needed_tools={needed_tools}
            handleDeleteFromProjectToolList={
              this.handleDeleteFromProjectToolList
            }
          />
        )}
        Needed Tools:
        <input type="text" name="needed_tool" onChange={this.handleGetFields} />
        <button onClick={this.handleAddToolToProjectToolList}>Add Tool</button>
        {project_photos.length > 0 && (
          <AddProjectFormPhotos
            project_photos={project_photos}
            handleDeleteFromProjectPhotoList={
              this.handleDeleteFromProjectPhotoList
            }
          />
        )}
        Project Photos:{" "}
        <input
          type="text"
          name="project_photo"
          onChange={this.handleGetFields}
        />
        <button onClick={this.handleAddPhotoToProjectPhotoList}>
          Add Photo
        </button>
        Need Help?:{" "}
        <input type="checkbox" onChange={this.handleToggleNeedHelp} />
        <button onClick={this.handleSubmitNewProject}>Add Project</button>
        <button onClick={toggleAddProjectForm}>Cancel</button>
      </div>
    );
  }
}

export default AddProjectForm;
