import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GameApi} from "../../Services/game-api";

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public gameApi: GameApi) {
  }
  gameData: any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
    this.gameApi.getGames().subscribe(data => {
      this.gameData = data;
      console.log(this.gameData);
    });

  }

}
