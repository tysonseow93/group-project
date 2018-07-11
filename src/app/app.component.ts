import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, NavController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import {AuthPage} from "../pages/auth/auth";
import { MainPage } from '../pages/main/main';
import { GenresProvider } from '../providers/genres/genres';
import { GameApi } from '../Services/game-api';
import { GenresPage } from '../pages/genres/genres';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  genres: any;
  genresArray = [];
  rootPage: any = MainPage;
  currentGenre;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public menuCtrl: MenuController, public statusBar: StatusBar, public splashScreen: SplashScreen, public gameApi: GameApi, public genresProvider: GenresProvider, public events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [

    ];
    this.gameApi.getGenres().subscribe(data =>{
      this.genres = data;
      console.log(this.genres);
      for(let i = 0; i < this.genres.length; i++){
        this.gameApi.getGenresDetails(this.genres[i].id).subscribe(data =>{
          this.genresArray.push(data[0])
        })
      }
      console.log(this.genresArray);
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // this.menuCtrl.open();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  genrePopulate(genreSelect){
    this.currentGenre = genreSelect.value;
    this.genresProvider.currentGenre = genreSelect.value;
    this.updateGenre(genreSelect.value);
    // this.nav.setRoot(GenresPage);
  }

  updateGenre(currentGenre){
    this.events.publish('updatedGenre', currentGenre);
    console.log(currentGenre);
  }
}
