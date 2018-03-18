import { app, router, store } from './app';

export default context => {
    router.push(context.url);
    context.title = router.currentRoute.meta.title;
    
    return Promise.all(router.getMatchedComponents().map(component => {
        if (component.preFetch){
            return component.preFetch(store, router.currentRoute)
        }
    })).then(() => {
        context.initialState = store.state;
        return app;
    })
}