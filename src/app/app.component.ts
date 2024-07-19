import { Component, OnInit } from '@angular/core';
import * as SockJS from 'sockjs-client';

var SockJs = require("sockjs-client");
var Stomp = require("stompjs");

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private stompClient: any;
  notifications: string[] = [];

  ngOnInit() {
    const socket = new SockJS('http://localhost:8081/ws');
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe('/topic/notifications', (message: any) => {
        this.showNotification(message.body);
      });
    });
  }

  showNotification(message: string) {
    console.log('Received notification:', message);
    this.notifications.push(message);
  }
}
