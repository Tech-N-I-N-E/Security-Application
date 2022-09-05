import {
    IonTabs,
  IonTabButton,
  IonLabel,
  IonApp,
  IonRouterOutlet,
  IonTabBar,

} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { supabase } from "../SupabaseClient";
import React, {useEffect, useState} from "react";

import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";

//Routes Component after authentication
const Home = () => {
  const [session, setSession] = useState(null);
  useEffect(() => {
    setSession(supabase.auth.session())
    console.log(session)
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session])
  return (
    <IonApp>
      <Tab1 />
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
          <Route exact path="/home" render={() => {
              return session ?<Redirect to="/tab1"/> : <Home/>;
            }} />
            <Route path="/tab1">
              <Tab1/>
            </Route>
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route path="/tab3">
              <Tab3 />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton selected tab="tab1" href="/tab1">
              {/* <IonIcon icon={triangle} /> */}
              <IonLabel>Tab 1</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              {/* <IonIcon icon={ellipse} /> */}
              <IonLabel>Tab 2</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              {/* <IonIcon icon={square} /> */}
              <IonLabel>Tab 3</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default Home;
