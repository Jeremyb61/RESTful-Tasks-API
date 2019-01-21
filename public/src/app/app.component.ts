import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Tasks';
    tasks: any;
    desc: any;
    id;
    task;
    edit: any = null;
    newTask: any;
    constructor(private _httpService: HttpService) { }
    ngOnInit() {
        this.id = null;
        this.newTask = { title: '', description: '' }
    }
    getTasksFromService() {
        let observable = this._httpService.getTasks();
        observable.subscribe(data => {
            console.log("Got our Tasks!", data)
            this.tasks = data;
        });
    }
    delTask(id) {
        let observable = this._httpService.deleteTask(id);
        observable.subscribe(data => {
            console.log(`task number ${id} has been deleted`);
            this.getTasksFromService()
        })
    }
    editTask(edit) {
        let observable = this._httpService.editTask(edit);
        observable.subscribe(data => {
            console.log(`task number ${edit._id} has been EDITED`);
            this.getTasksFromService();
        })

    }
    onSubmit() {
        let observable = this._httpService.addTask(this.newTask)
        observable.subscribe(data => {
            console.log("Got data from post form", data);
            this.newTask = { title: "", description: "" }
            this.getTasksFromService()
        });
    }
}
