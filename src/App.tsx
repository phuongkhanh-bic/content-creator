import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './index.css';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import { AppRoutes } from './constants/routes';
import Newsfeed from './pages/newsfeed';
import CreatePost from './pages/create_post';
import PostDetail from './pages/post_detail';
import Explore from './pages/explore';
import Profile from './pages/profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

setupIonicReact();

const queryClient = new QueryClient()

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <IonApp>
                <IonReactRouter>
                    <IonRouterOutlet>
                    <Route path={AppRoutes.Root} exact>
                        <Redirect to={AppRoutes.Newsfeed} />
                    </Route>
                    <Route path={AppRoutes.Newsfeed} exact component={Newsfeed} />
                    <Route path={AppRoutes.Explore} exact component={Explore} />
                    <Route path={AppRoutes.Profile} exact component={Profile} />
                    <Route path={AppRoutes.CreatePost} exact component={CreatePost} />
                    <Route path={`${AppRoutes.PostDetail}/:id`} exact component={PostDetail} />
                    <Route path={AppRoutes.EditPost} exact component={CreatePost} />
                    </IonRouterOutlet>
                </IonReactRouter>
                <Toaster richColors />
            </IonApp>
        </QueryClientProvider>
    );
}
