import dva from 'dva';
import router from './router';
import albumModel from './models/albumModel.js'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(albumModel);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
