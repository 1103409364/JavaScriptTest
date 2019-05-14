import dva from 'dva';
import router from './router';
import example from './models/example'

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(example);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
