export const config = {
    api: import.meta.env.DEV ? 'http://localhost:3000' : 'https://hot-runtime-app.onrender.com',
    workflowGenerateApkId: '115439875',
    socket: import.meta.env.DEV ? 'localhost:3000' : 'hot-runtime-app.onrender.com'
}