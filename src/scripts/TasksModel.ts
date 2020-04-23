import TasksStore from "../store/TasksStore";
import UserStore from "../store/UserStore";
import {_getDataFromLStorage} from "./BasicModel";
import {I_TASK} from "../interfaces/TasksInterfaces";

const STORAGE_KEY_TASKS = "tasks";

export function addTask(inText: string): boolean {
    const {user} = UserStore;
    let currentTime = new Date().getTime();
    let newId: number = currentTime;
    let rand: number = Math.floor(Math.random() * 10000);
    for(; rand > 0; rand = Math.floor(rand / 10)) {
        newId *= 10;
        newId += rand % 10;
    }
    let newTask: I_TASK = {
        id: newId,
        blocked: 0,
        text: inText,
        status: false,
        dateCreate: currentTime
    };
    let tasks: any = _getDataFromLStorage(STORAGE_KEY_TASKS);
    if (Array.isArray(tasks[user])) {
        tasks[user].unshift(newTask);
    } else {
        tasks[user] = [newTask];
    }
    localStorage[STORAGE_KEY_TASKS] = JSON.stringify(tasks);
    TasksStore.addTasks(newTask);
    return true;
}

export function getTasks(): I_TASK[] {
    const {user} = UserStore;
    let allTasks: any = _getDataFromLStorage(STORAGE_KEY_TASKS);
    if (typeof allTasks[user] !== "undefined") {
        if (Array.isArray(allTasks[user])) {
            return allTasks[user];
        }
    }
    return [];
}
