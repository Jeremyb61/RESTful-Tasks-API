import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private _http: HttpClient) { }
    getTasks() {
        return this._http.get('/tasks');
    }
    getDetails(id) {
        return this._http.get('/task/' + id);
    }
    addTask(newTask) {
        return this._http.post('/task', newTask);
    }
    deleteTask(id) {
        return this._http.delete('/task/' + id);
    }
    openEdit(id) {
        return this._http.get('/task/' + id);
    }
    editTask(edit) {
        return this._http.put('/task/' + edit._id, edit)
    }

}
